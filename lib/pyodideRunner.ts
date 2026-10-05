/**
 * Client-Side In-Browser Pyodide / CPython WebAssembly Execution Engine
 *
 * Security & Architecture:
 * - Runs 100% inside the user's browser sandbox via WebAssembly (Pyodide).
 * - Zero server-side eval() or exec() execution.
 * - Streams live sys.stdout and sys.stderr in real time.
 * - Supports real interactive Python input() with asynchronous suspension.
 * - Mounts auxiliary project files (art.py, helper modules) to Pyodide virtual FS.
 */

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTimeMs: number;
  isError: boolean;
}

export type PyodideStatus = "idle" | "loading" | "ready" | "running" | "waiting_input" | "error";

interface PyProxy {
  toJs: (options?: { dict_converter?: unknown }) => unknown;
  destroy: () => void;
}

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  runPython: (code: string) => unknown;
  globals: {
    get: (name: string) => ((...args: unknown[]) => Promise<PyProxy>) | unknown;
    set: (name: string, value: unknown) => void;
  };
  FS: {
    writeFile: (path: string, data: string, options?: { encoding?: string }) => void;
    unlink?: (path: string) => void;
  };
  loadPackage?: (packages: string | string[]) => Promise<void>;
}

declare global {
  interface Window {
    loadPyodide?: (config: { indexURL: string }) => Promise<PyodideInterface>;
    __pyodideInstance?: PyodideInterface;
    __pyodide_on_stdout?: (text: string) => void;
    __pyodide_on_stderr?: (text: string) => void;
    __pyodide_request_input?: (prompt: string) => Promise<string>;
  }
}

let pyodidePromise: Promise<PyodideInterface> | null = null;
let harnessInitialized = false;

export async function loadPyodideRuntime(
  onProgress?: (msg: string) => void
): Promise<PyodideInterface> {
  if (typeof window === "undefined") {
    throw new Error("Pyodide can only run in a browser environment.");
  }

  if (window.__pyodideInstance) {
    return window.__pyodideInstance;
  }

  if (pyodidePromise) {
    return pyodidePromise;
  }

  pyodidePromise = new Promise(async (resolve, reject) => {
    try {
      onProgress?.("Loading Pyodide WebAssembly script from CDN...");

      // Inject script tag if not present
      if (!window.loadPyodide) {
        await new Promise<void>((res, rej) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
          script.async = true;
          script.onload = () => res();
          script.onerror = () => rej(new Error("Failed to load Pyodide WebAssembly script."));
          document.head.appendChild(script);
        });
      }

      onProgress?.("Initializing CPython WebAssembly runtime...");
      if (!window.loadPyodide) {
        throw new Error("loadPyodide was not defined after loading script.");
      }

      const pyodide = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
      });

      window.__pyodideInstance = pyodide;
      onProgress?.("Python WebAssembly runtime ready.");
      resolve(pyodide);
    } catch (err) {
      pyodidePromise = null;
      reject(err);
    }
  });

  return pyodidePromise;
}

/**
 * Initializes the Python asynchronous execution and input() interception harness
 */
async function initializeHarness(pyodide: PyodideInterface) {
  if (harnessInitialized) return;

  const harnessPython = `
import sys
import ast
import traceback
from js import window

class _StreamCapture:
    def __init__(self, is_stderr=False):
        self.is_stderr = is_stderr
        self.buffer = []

    def write(self, s):
        if s is None:
            return
        str_val = str(s)
        self.buffer.append(str_val)
        try:
            if self.is_stderr:
                if hasattr(window, "__pyodide_on_stderr") and window.__pyodide_on_stderr:
                    window.__pyodide_on_stderr(str_val)
            else:
                if hasattr(window, "__pyodide_on_stdout") and window.__pyodide_on_stdout:
                    window.__pyodide_on_stdout(str_val)
        except Exception:
            pass

    def flush(self):
        pass

    def getvalue(self):
        return "".join(self.buffer)

class _AsyncInputTransformer(ast.NodeTransformer):
    def __init__(self):
        super().__init__()
        self.async_functions = set()
        self.has_input = False

    def find_async_functions(self, tree):
        changed = True
        while changed:
            changed = False
            for node in ast.walk(tree):
                if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
                    name = node.name
                    if name in self.async_functions:
                        continue
                    for child in ast.walk(node):
                        if isinstance(child, ast.Call):
                            c_name = None
                            if isinstance(child.func, ast.Name):
                                c_name = child.func.id
                            elif isinstance(child.func, ast.Attribute):
                                c_name = child.func.attr
                            if c_name == "input" or c_name in self.async_functions:
                                self.async_functions.add(name)
                                self.has_input = True
                                changed = True
                                break
        for node in tree.body:
            for child in ast.walk(node):
                if isinstance(child, ast.Call):
                    if isinstance(child.func, ast.Name) and child.func.id == "input":
                        self.has_input = True

    def visit_FunctionDef(self, node):
        self.generic_visit(node)
        if node.name in self.async_functions:
            new_node = ast.AsyncFunctionDef(
                name=node.name,
                args=node.args,
                body=node.body,
                decorator_list=node.decorator_list,
                returns=node.returns,
                type_comment=node.type_comment if hasattr(node, "type_comment") else None,
            )
            return ast.copy_location(new_node, node)
        return node

    def visit_Call(self, node):
        self.generic_visit(node)
        called_name = None
        if isinstance(node.func, ast.Name):
            called_name = node.func.id
        elif isinstance(node.func, ast.Attribute):
            called_name = node.func.attr

        if called_name == "input":
            new_call = ast.Call(
                func=ast.Name(id="_py_async_input", ctx=ast.Load()),
                args=node.args,
                keywords=node.keywords
            )
            return ast.copy_location(ast.Await(value=new_call), node)
        elif called_name in self.async_functions:
            return ast.copy_location(ast.Await(value=node), node)
        return node

async def _execute_user_script(code_str, on_stdout_cb=None, on_stderr_cb=None, on_input_cb=None):
    class _DirectStream:
        def __init__(self, callback, is_stderr=False):
            self.callback = callback
            self.is_stderr = is_stderr
            self.buffer = []

        def write(self, s):
            if s is None:
                return
            str_val = str(s)
            self.buffer.append(str_val)
            if self.callback:
                try:
                    self.callback(str_val)
                except Exception:
                    pass

        def flush(self):
            pass

        def getvalue(self):
            return "".join(self.buffer)

    _stdout_cap = _DirectStream(on_stdout_cb, is_stderr=False)
    _stderr_cap = _DirectStream(on_stderr_cb, is_stderr=True)
    _old_stdout, _old_stderr = sys.stdout, sys.stderr
    sys.stdout, sys.stderr = _stdout_cap, _stderr_cap
    _exit_code = 0

    async def _py_async_input(prompt=""):
        if prompt:
            sys.stdout.write(str(prompt))
            sys.stdout.flush()
        if on_input_cb:
            res = await on_input_cb(str(prompt))
            return str(res) if res is not None else ""
        return ""

    try:
        tree = ast.parse(code_str)
        transformer = _AsyncInputTransformer()
        transformer.find_async_functions(tree)

        if transformer.has_input:
            transformed_tree = transformer.visit(tree)
            ast.fix_missing_locations(transformed_tree)
            main_func = ast.AsyncFunctionDef(
                name="_auto_main",
                args=ast.arguments(
                    posonlyargs=[],
                    args=[],
                    kwonlyargs=[],
                    kw_defaults=[],
                    defaults=[]
                ),
                body=transformed_tree.body,
                decorator_list=[],
                returns=None
            )
            module = ast.Module(body=[main_func], type_ignores=[])
            ast.fix_missing_locations(module)
            compiled = compile(module, "<user_code>", "exec")
            user_env = dict(globals())
            user_env["_py_async_input"] = _py_async_input
            exec(compiled, user_env)
            await user_env["_auto_main"]()
        else:
            compiled = compile(tree, "<user_code>", "exec")
            exec(compiled, globals())

    except SystemExit as e:
        _exit_code = e.code if isinstance(e.code, int) else 0
    except Exception:
        traceback.print_exc(file=sys.stderr)
        _exit_code = 1
    finally:
        sys.stdout = _old_stdout
        sys.stderr = _old_stderr

    return {
        "stdout": _stdout_cap.getvalue(),
        "stderr": _stderr_cap.getvalue(),
        "exitCode": _exit_code,
    }
`;

  await pyodide.runPythonAsync(harnessPython);
  harnessInitialized = true;
}

export interface RunPythonOptions {
  code: string;
  auxiliaryFiles?: { name: string; content: string }[];
  onStdout?: (text: string) => void;
  onStderr?: (text: string) => void;
  onRequestInput?: (prompt: string) => Promise<string>;
  onProgress?: (msg: string) => void;
}

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
  }

  const startTime = performance.now();

  try {
    const pyodide = await loadPyodideRuntime(progressFn);
    await initializeHarness(pyodide);

    progressFn?.("Mounting auxiliary project files into virtual filesystem...");
    for (const file of files) {
      if (file.name && file.content) {
        try {
          pyodide.FS.writeFile(file.name, file.content, { encoding: "utf8" });
        } catch (e) {
          console.warn(`Failed to write virtual file ${file.name}:`, e);
        }
      }
    }

    progressFn?.("Executing Python program in browser WASM...");

    // Wire live callbacks to window for Python StreamCapture and _py_async_input
    window.__pyodide_on_stdout = onStdout;
    window.__pyodide_on_stderr = onStderr;
    window.__pyodide_request_input = onRequestInput;

    const runner = pyodide.globals.get("_execute_user_script") as (
      codeStr: string,
      onStdout?: (text: string) => void,
      onStderr?: (text: string) => void,
      onRequestInput?: (prompt: string) => Promise<string>
    ) => Promise<PyProxy>;

    const pyResultProxy = await runner(
      code,
      onStdout ? (text: string) => onStdout(text) : undefined,
      onStderr ? (text: string) => onStderr(text) : undefined,
      onRequestInput ? (prompt: string) => onRequestInput(prompt) : undefined
    );
    const pyResult = pyResultProxy.toJs({ dict_converter: Object.fromEntries }) as {
      stdout: string;
      stderr: string;
      exitCode: number;
    };
    pyResultProxy.destroy();

    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);

    return {
      stdout: pyResult.stdout || "",
      stderr: pyResult.stderr || "",
      exitCode: pyResult.exitCode || 0,
      executionTimeMs: duration,
      isError: pyResult.exitCode !== 0 || Boolean(pyResult.stderr && pyResult.stderr.length > 0),
    };
  } catch (err: unknown) {
    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);
    const errorMsg = err instanceof Error ? err.message : String(err);

    onStderr?.(errorMsg + "\n");

    return {
      stdout: "",
      stderr: errorMsg,
      exitCode: 1,
      executionTimeMs: duration,
      isError: true,
    };
  } finally {
    window.__pyodide_on_stdout = undefined;
    window.__pyodide_on_stderr = undefined;
    window.__pyodide_request_input = undefined;
  }
}
