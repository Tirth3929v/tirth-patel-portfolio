/**
 * Client-Side Pyodide / CPython WebAssembly Dedicated Web Worker Execution Engine
 *
 * Security & Architecture Hardening:
 * - Runs 100% inside a dedicated background Web Worker off the main browser UI thread.
 * - Guarantees zero UI freezing, even during synchronous infinite loops (e.g. while True: pass).
 * - Immediate termination via worker.terminate() on watchdog timeout or user cancellation.
 * - Streams live sys.stdout and sys.stderr in real time with 100,000 char flood protection.
 * - Isolated user environment per run to prevent global state pollution.
 * - Restricts direct JavaScript/DOM bridge (js, pyodide_js) inside user code.
 * - Supports real interactive Python input() with asynchronous suspension.
 * - Mounts auxiliary project files into Pyodide virtual in-memory FS.
 */

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTimeMs: number;
  isError: boolean;
}

export type PyodideStatus = "idle" | "loading" | "ready" | "running" | "waiting_input" | "error";

export interface RunPythonOptions {
  code: string;
  auxiliaryFiles?: { name: string; content: string }[];
  onStdout?: (text: string) => void;
  onStderr?: (text: string) => void;
  onRequestInput?: (prompt: string) => Promise<string>;
  onProgress?: (msg: string) => void;
  timeoutMs?: number;
}

let activeWorker: Worker | null = null;
let activeExecutionResolve: ((result: ExecutionResult) => void) | null = null;
let activeTimeoutHandle: ReturnType<typeof setTimeout> | null = null;
let isCurrentlyExecuting = false;

/**
 * Returns whether a Python execution is currently in progress.
 */
export function isPythonRunning(): boolean {
  return isCurrentlyExecuting;
}

/**
 * Immediately terminates the dedicated Web Worker running Pyodide.
 * Used for manual user cancellation or automatic watchdog timeout.
 * Terminates any synchronous infinite loops (e.g., `while True: pass`) without blocking the UI.
 */
export function stopPythonExecution(reason = "Execution terminated: Web Worker stopped."): void {
  if (activeTimeoutHandle) {
    clearTimeout(activeTimeoutHandle);
    activeTimeoutHandle = null;
  }

  if (activeWorker) {
    try {
      activeWorker.terminate();
    } catch (e) {
      console.warn("Failed to cleanly terminate Pyodide worker:", e);
    }
    activeWorker = null;
  }

  isCurrentlyExecuting = false;

  if (activeExecutionResolve) {
    const resolve = activeExecutionResolve;
    activeExecutionResolve = null;
    resolve({
      stdout: "",
      stderr: `[!] ${reason}\n`,
      exitCode: 1,
      executionTimeMs: 0,
      isError: true,
    });
  }
}

/**
 * Spawns or retrieves the active Pyodide Web Worker instance.
 */
function getOrCreateWorker(
  onStdout?: (text: string) => void,
  onStderr?: (text: string) => void,
  onRequestInput?: (prompt: string) => Promise<string>,
  onProgress?: (msg: string) => void
): Worker {
  if (activeWorker) {
    return activeWorker;
  }

  if (typeof window === "undefined" || typeof Worker === "undefined") {
    throw new Error("Pyodide Web Worker can only run in a browser environment.");
  }

  const worker = new Worker("/pyodide.worker.js");

  worker.onmessage = (e: MessageEvent) => {
    const data = e.data;
    if (!data || !data.type) return;

    switch (data.type) {
      case "progress":
        onProgress?.(data.message);
        break;

      case "stdout":
        onStdout?.(data.text);
        break;

      case "stderr":
        onStderr?.(data.text);
        break;

      case "request_input":
        if (onRequestInput) {
          onRequestInput(data.prompt)
            .then((userInput) => {
              if (activeWorker) {
                activeWorker.postMessage({
                  type: "input_response",
                  value: userInput != null ? String(userInput) : "",
                });
              }
            })
            .catch(() => {
              if (activeWorker) {
                activeWorker.postMessage({
                  type: "input_response",
                  value: "",
                });
              }
            });
        } else {
          // If no handler provided, respond with empty string
          if (activeWorker) {
            activeWorker.postMessage({
              type: "input_response",
              value: "",
            });
          }
        }
        break;

      case "complete":
        if (activeTimeoutHandle) {
          clearTimeout(activeTimeoutHandle);
          activeTimeoutHandle = null;
        }
        isCurrentlyExecuting = false;
        if (activeExecutionResolve) {
          const resolve = activeExecutionResolve;
          activeExecutionResolve = null;
          resolve(data.result);
        }
        break;

      default:
        break;
    }
  };

  worker.onerror = (err) => {
    console.error("Pyodide Web Worker encountered an unhandled error:", err);
    stopPythonExecution("Pyodide Web Worker crashed or encountered an unhandled error.");
  };

  activeWorker = worker;
  return worker;
}

/**
 * Runs Python code in a dedicated Web Worker sandbox.
 */
export async function runPythonCode(
  optionsOrCode: string | RunPythonOptions,
  auxiliaryFiles: { name: string; content: string }[] = [],
  onProgress?: (msg: string) => void
): Promise<ExecutionResult> {
  let code = "";
  let files: { name: string; content: string }[] = [];
  let onStdout: ((text: string) => void) | undefined;
  let onStderr: ((text: string) => void) | undefined;
  let onRequestInput: ((prompt: string) => Promise<string>) | undefined;
  let progressFn: ((msg: string) => void) | undefined = onProgress;
  let timeoutMs = 25000; // 25s watchdog protection

  if (typeof optionsOrCode === "string") {
    code = optionsOrCode;
    files = auxiliaryFiles;
  } else {
    code = optionsOrCode.code;
    files = optionsOrCode.auxiliaryFiles || [];
    onStdout = optionsOrCode.onStdout;
    onStderr = optionsOrCode.onStderr;
    onRequestInput = optionsOrCode.onRequestInput;
    progressFn = optionsOrCode.onProgress || onProgress;
    timeoutMs = optionsOrCode.timeoutMs || 25000;
  }

  // If a previous execution is still running, terminate it first
  if (isCurrentlyExecuting) {
    stopPythonExecution("Previous execution aborted to start new run.");
  }

  isCurrentlyExecuting = true;

  return new Promise<ExecutionResult>((resolve) => {
    activeExecutionResolve = resolve;

    try {
      const worker = getOrCreateWorker(onStdout, onStderr, onRequestInput, progressFn);

      // Setup watchdog timer
      activeTimeoutHandle = setTimeout(() => {
        stopPythonExecution(
          `Execution timed out: Program exceeded maximum runtime limit (${Math.round(
            timeoutMs / 1000
          )}s). Worker terminated to prevent infinite loop.`
        );
      }, timeoutMs);

      // Post execution message to worker
      worker.postMessage({
        type: "run",
        code,
        auxiliaryFiles: files,
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      isCurrentlyExecuting = false;
      activeExecutionResolve = null;
      resolve({
        stdout: "",
        stderr: errorMsg,
        exitCode: 1,
        executionTimeMs: 0,
        isError: true,
      });
    }
  });
}
