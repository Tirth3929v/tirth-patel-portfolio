/**
 * Dedicated Pyodide Web Worker Execution Engine
 *
 * Security & Architecture:
 * - Runs 100% off the browser main UI thread in a dedicated background Web Worker.
 * - Prevents UI freezes even on synchronous infinite loops (e.g., while True: pass).
 * - Can be terminated instantaneously via worker.terminate() by user or watchdog.
 * - AST transformation for non-blocking asynchronous input() suspension.
 * - Real-time streaming for stdout and stderr with 100,000 char flood protection.
 * - Restricts direct access to the JavaScript/DOM bridge (js, pyodide_js) inside user code.
 * - In-memory virtual filesystem for multi-file project execution.
 */

/* global importScripts */
importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js");

let pyodideInstance = null;
let pyodideInitPromise = null;
let pendingInputResolve = null;

const HARNESS_PYTHON = `
import sys
import ast
import traceback
import builtins

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

MAX_OUTPUT_CHARS = 100_000

class _DirectStream:
    def __init__(self, callback, is_stderr=False):
        self.callback = callback
        self.is_stderr = is_stderr
        self.buffer = []
        self.total_chars = 0
        self.truncated = False

    def write(self, s):
        if s is None or self.truncated:
            return
        str_val = str(s)
        if self.total_chars + len(str_val) > MAX_OUTPUT_CHARS:
            remain = max(0, MAX_OUTPUT_CHARS - self.total_chars)
            if remain > 0:
                self.buffer.append(str_val[:remain])
                self.total_chars += remain
                if self.callback:
                    try:
                        self.callback(str_val[:remain])
                    except Exception:
                        pass
            trunc_msg = "\\n[!] Output limit (100,000 characters) reached. Stream truncated to protect browser responsiveness.\\n"
            self.buffer.append(trunc_msg)
            self.truncated = True
            if self.callback:
                try:
                    self.callback(trunc_msg)
                except Exception:
                    pass
            return

        self.total_chars += len(str_val)
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

async def _execute_user_script(code_str, on_stdout_cb=None, on_stderr_cb=None, on_input_cb=None):
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

        # Build hardened sandbox environment
        user_builtins = dict(builtins.__dict__)
        _orig_import = user_builtins["__import__"]

        def _sandboxed_import(name, *args, **kwargs):
            if name in ("js", "pyodide_js") or name.startswith(("js.", "pyodide_js.")):
                raise ImportError(f"Access to '{name}' is restricted in the browser sandbox for security.")
            return _orig_import(name, *args, **kwargs)

        user_builtins["__import__"] = _sandboxed_import

        user_env = {
            "__name__": "__main__",
            "__doc__": None,
            "__package__": None,
            "__builtins__": user_builtins,
            "_py_async_input": _py_async_input,
        }

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
            exec(compiled, user_env)
            await user_env["_auto_main"]()
        else:
            compiled = compile(tree, "<user_code>", "exec")
            exec(compiled, user_env)

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

async function getOrInitPyodide() {
  if (pyodideInstance) {
    return pyodideInstance;
  }
  if (!pyodideInitPromise) {
    pyodideInitPromise = (async () => {
      self.postMessage({
        type: "progress",
        message: "Loading Pyodide CPython WebAssembly in background Web Worker...",
      });
      const pyodide = await self.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
      });
      self.postMessage({
        type: "progress",
        message: "Initializing Python execution harness in Web Worker...",
      });
      await pyodide.runPythonAsync(HARNESS_PYTHON);
      pyodideInstance = pyodide;
      self.postMessage({
        type: "progress",
        message: "Pyodide Web Worker runtime ready.",
      });
      return pyodide;
    })();
  }
  return pyodideInitPromise;
}

self.onmessage = async function (e) {
  const data = e.data;
  if (!data) return;

  if (data.type === "input_response") {
    if (pendingInputResolve) {
      const resolve = pendingInputResolve;
      pendingInputResolve = null;
      resolve(data.value != null ? String(data.value) : "");
    }
    return;
  }

  if (data.type === "run") {
    const startTime = performance.now();
    try {
      const pyodide = await getOrInitPyodide();

      // Mount auxiliary files into Pyodide virtual in-memory FS
      if (Array.isArray(data.auxiliaryFiles)) {
        for (const file of data.auxiliaryFiles) {
          if (file && file.name && file.content != null) {
            try {
              pyodide.FS.writeFile(file.name, file.content, { encoding: "utf8" });
            } catch (err) {
              console.warn("Failed to write virtual file", file.name, err);
            }
          }
        }
      }

      self.postMessage({
        type: "progress",
        message: "Executing Python script in Web Worker sandbox...",
      });

      const onStdoutCb = (text) => {
        self.postMessage({ type: "stdout", text: String(text) });
      };

      const onStderrCb = (text) => {
        self.postMessage({ type: "stderr", text: String(text) });
      };

      const onInputCb = (prompt) => {
        return new Promise((resolve) => {
          pendingInputResolve = resolve;
          self.postMessage({
            type: "request_input",
            prompt: String(prompt || ""),
          });
        });
      };

      const runner = pyodide.globals.get("_execute_user_script");
      const pyResultProxy = await runner(data.code, onStdoutCb, onStderrCb, onInputCb);
      const pyResult = pyResultProxy.toJs({ dict_converter: Object.fromEntries });
      pyResultProxy.destroy();

      const endTime = performance.now();
      const executionTimeMs = Math.round(endTime - startTime);

      self.postMessage({
        type: "complete",
        result: {
          stdout: pyResult.stdout || "",
          stderr: pyResult.stderr || "",
          exitCode: pyResult.exitCode || 0,
          executionTimeMs,
          isError: pyResult.exitCode !== 0 || Boolean(pyResult.stderr && pyResult.stderr.length > 0),
        },
      });
    } catch (err) {
      const endTime = performance.now();
      const executionTimeMs = Math.round(endTime - startTime);
      const errorMsg = err instanceof Error ? err.message : String(err);

      self.postMessage({
        type: "complete",
        result: {
          stdout: "",
          stderr: errorMsg,
          exitCode: 1,
          executionTimeMs,
          isError: true,
        },
      });
    }
  }
};
