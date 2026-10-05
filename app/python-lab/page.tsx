"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Code2, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  Play, 
  Search, 
  FileCode, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle, 
  HelpCircle, 
  Sparkles,
  CornerDownLeft
} from "lucide-react";
import { 
  pythonProjectsData, 
  PythonProject, 
  ProjectCompatibility 
} from "@/data/pythonProjects";
import { runPythonCode, ExecutionResult } from "@/lib/pyodideRunner";

interface TerminalStreamItem {
  id: string;
  type: "stdout" | "stderr" | "input" | "system";
  content: string;
}

export default function PythonLabPage() {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [searchDay, setSearchDay] = useState("");
  const [activePhase, setActivePhase] = useState<string>("All");
  const [activeCompatFilter, setActiveCompatFilter] = useState<string>("All");
  const [copied, setCopied] = useState(false);
  
  // Real Pyodide execution state
  const [isRunning, setIsRunning] = useState(false);
  const [wasmStatusMessage, setWasmStatusMessage] = useState<string>("");
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);

  // Live Terminal Stream & Interactive input() state
  const [terminalStream, setTerminalStream] = useState<TerminalStreamItem[]>([]);
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);
  const [currentInputValue, setCurrentInputValue] = useState("");
  
  const pendingInputResolverRef = useRef<((val: string) => void) | null>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);
  const msgSeqRef = useRef(0);
  const getNextId = (prefix: string) => `${prefix}-${++msgSeqRef.current}`;

  // Code editor state (supports multi-file tab switching & custom edits)
  const currentProject: PythonProject = 
    pythonProjectsData.find((p) => p.day === selectedDay) || pythonProjectsData[0];

  const [activeFileName, setActiveFileName] = useState<string>(
    currentProject.entrypoint || "main.py"
  );
  const [editableCode, setEditableCode] = useState<string>(currentProject.code);

  const handleSelectDay = (day: number) => {
    // If input is pending from a previous project, resolve cleanly before switching
    if (pendingInputResolverRef.current) {
      pendingInputResolverRef.current("");
      pendingInputResolverRef.current = null;
    }
    setIsWaitingForInput(false);
    setCurrentInputValue("");
    setSelectedDay(day);
    const p = pythonProjectsData.find((item) => item.day === day) || pythonProjectsData[0];
    setActiveFileName(p.entrypoint || "main.py");
    setEditableCode(p.code);
    setExecutionResult(null);
    setTerminalStream([]);
  };

  // When active file changes in multi-file days
  const handleSelectFile = (fileName: string) => {
    setActiveFileName(fileName);
    const file = currentProject.files?.find((f) => f.name === fileName);
    if (file) {
      setEditableCode(file.content);
    }
  };

  const phases = ["All", "Fundamentals", "Intermediate & OOP", "Web & APIs", "Data Science & ML", "Capstones"];

  // Real dataset metrics calculation
  const totalDaysInDataset = 100;
  const completedProjectsCount = pythonProjectsData.filter(
    (p) => p.code && p.code.trim().length > 0
  ).length;
  const completionPercentage = Math.round((completedProjectsCount / totalDaysInDataset) * 100);

  const filteredProjects = pythonProjectsData.filter((p) => {
    const matchesPhase = activePhase === "All" || p.phase === activePhase;
    const matchesCompat = 
      activeCompatFilter === "All" ||
      (activeCompatFilter === "Runnable" && p.compatibility === "BROWSER RUNNABLE") ||
      (activeCompatFilter === "Desktop Required" && p.compatibility === "NOT BROWSER COMPATIBLE");

    const matchesSearch = 
      p.title.toLowerCase().includes(searchDay.toLowerCase()) ||
      p.description.toLowerCase().includes(searchDay.toLowerCase()) ||
      p.day.toString().includes(searchDay) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchDay.toLowerCase()));
    
    return matchesPhase && matchesCompat && matchesSearch;
  });

  const handleCopyCode = () => {
    navigator.clipboard.writeText(editableCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Focus terminal input when Python enters input() prompt WITHOUT triggering window scroll
  useEffect(() => {
    if (isWaitingForInput && terminalInputRef.current) {
      terminalInputRef.current.focus({ preventScroll: true });
    }
  }, [isWaitingForInput]);

  // INTERNAL terminal auto-scroll ONLY — does NOT touch page-level scroll position
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalStream, isWaitingForInput]);

  // Interactive input submit handler
  const handleInputSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isWaitingForInput || !pendingInputResolverRef.current) return;

    const submittedText = currentInputValue;
    setCurrentInputValue("");
    setIsWaitingForInput(false);

    // Echo user input into terminal stream
    setTerminalStream((prev) => [
      ...prev,
      {
        id: getNextId("in"),
        type: "input",
        content: `❯ ${submittedText}\n`,
      },
    ]);

    const resolver = pendingInputResolverRef.current;
    pendingInputResolverRef.current = null;
    resolver(submittedText);
  };

  // REAL In-Browser Pyodide Execution with live streaming & async input()
  const handleExecutePython = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    // Unfocus button immediately to prevent browser resetting focus/scrolling
    if (e) {
      e.currentTarget.blur();
    }

    // Cancel any previous input prompt
    if (pendingInputResolverRef.current) {
      pendingInputResolverRef.current("");
      pendingInputResolverRef.current = null;
    }

    setIsRunning(true);
    setIsWaitingForInput(false);
    setExecutionResult(null);
    setWasmStatusMessage("Booting Pyodide WebAssembly runtime...");

    // Initial technical header in terminal
    setTerminalStream([
      {
        id: getNextId("sys-start"),
        type: "system",
        content: `> Running ${activeFileName} in CPython 3.12 WebAssembly...\n`,
      },
    ]);

    const filesToMount = currentProject.files?.map((f) => ({
      name: f.name,
      content: f.name === activeFileName ? editableCode : f.content,
    })) || [{ name: activeFileName, content: editableCode }];

    try {
      const res = await runPythonCode({
        code: editableCode,
        auxiliaryFiles: filesToMount,
        onStdout: (text) => {
          setTerminalStream((prev) => [
            ...prev,
            { id: getNextId("out"), type: "stdout", content: text },
          ]);
        },
        onStderr: (text) => {
          setTerminalStream((prev) => [
            ...prev,
            { id: getNextId("err"), type: "stderr", content: text },
          ]);
        },
        onRequestInput: (promptText?: string) => {
          if (promptText) {
            setTerminalStream((prev) => {
              const last = prev[prev.length - 1];
              if (!last || !last.content.endsWith(promptText)) {
                return [
                  ...prev,
                  { id: getNextId("prompt"), type: "stdout", content: promptText },
                ];
              }
              return prev;
            });
          }
          return new Promise<string>((resolve) => {
            setIsWaitingForInput(true);
            pendingInputResolverRef.current = resolve;
          });
        },
        onProgress: (statusMsg) => setWasmStatusMessage(statusMsg),
      });

      setExecutionResult(res);

      // Ensure any output captured in execution result is fully rendered
      if (res.stdout) {
        setTerminalStream((prev) => {
          const hasStdout = prev.some((p) => p.type === "stdout" && p.content.trim().length > 0);
          if (!hasStdout) {
            return [
              ...prev,
              { id: getNextId("stdout-final"), type: "stdout", content: res.stdout },
            ];
          }
          return prev;
        });
      }

      setTerminalStream((prev) => [
        ...prev,
        {
          id: getNextId("sys-end"),
          type: "system",
          content: res.isError
            ? `\n> Process exited with code ${res.exitCode} (${res.executionTimeMs}ms)\n`
            : `\n> Process exited with code 0 (${res.executionTimeMs}ms)\n`,
        },
      ]);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      setExecutionResult({
        stdout: "",
        stderr: errMsg,
        exitCode: 1,
        executionTimeMs: 0,
        isError: true,
      });
      setTerminalStream((prev) => [
        ...prev,
        { id: getNextId("err"), type: "stderr", content: `${errMsg}\n` },
        { id: getNextId("sys-end"), type: "system", content: "\n> Process exited with code 1\n" },
      ]);
    } finally {
      setIsRunning(false);
      setIsWaitingForInput(false);
      setWasmStatusMessage("");
    }
  };

  const getCompatibilityBadge = (compat: ProjectCompatibility) => {
    switch (compat) {
      case "BROWSER RUNNABLE":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <CheckCircle className="w-3 h-3" />
            <span>BROWSER RUNNABLE</span>
          </span>
        );
      case "NOT BROWSER COMPATIBLE":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3 h-3" />
            <span>DESKTOP ONLY</span>
          </span>
        );
      case "BROWSER DEMO":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30">
            <Sparkles className="w-3 h-3" />
            <span>BROWSER DEMO</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/30">
            <HelpCircle className="w-3 h-3" />
            <span>OUTPUT PREVIEW</span>
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 bg-background bg-grid-pattern text-foreground [overflow-anchor:none]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Lab Header & Genuine Progress Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-600 dark:text-emerald-300">
              <Code2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>100 Days of Code • CPython WebAssembly Runtime</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Python Systems & Algorithm Studio
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-mono max-w-2xl leading-relaxed">
              Live in-browser WebAssembly IDE executing 100 days of verified Python implementations—from syntax foundations and object-oriented systems to data pipelines and CLI tools.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            {/* Real 100 Days Metric */}
            <div className="flex items-center gap-3 bg-card border border-border p-3 rounded-xl shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Curriculum Progress:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-bold ml-2">
                    {completedProjectsCount} / {totalDaysInDataset} Days Completed
                  </strong>
                </div>
                {/* Progress bar */}
                <div className="w-48 h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>

              <a
                href="https://github.com/Tirth3929v/Beginner-to-Advanced-Python"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground border border-border transition-colors ml-2"
                title="View full repository on GitHub"
                aria-label="GitHub Repository"
              >
                <ExternalLink className="w-4 h-4 text-emerald-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Phase Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {phases.map((phase) => (
              <button
                key={phase}
                onClick={() => setActivePhase(phase)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activePhase === phase
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-xs"
                    : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border"
                }`}
              >
                {phase}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-muted-foreground hidden sm:inline">Execution Filter:</span>
            <button
              onClick={() => setActiveCompatFilter(activeCompatFilter === "Runnable" ? "All" : "Runnable")}
              className={`px-2.5 py-1 rounded-md text-[11px] transition-colors border ${
                activeCompatFilter === "Runnable"
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 font-bold"
                  : "bg-card text-muted-foreground border-border hover:bg-muted"
              }`}
            >
              WASM Runnable
            </button>
            <button
              onClick={() => setActiveCompatFilter(activeCompatFilter === "Desktop Required" ? "All" : "Desktop Required")}
              className={`px-2.5 py-1 rounded-md text-[11px] transition-colors border ${
                activeCompatFilter === "Desktop Required"
                  ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/40 font-bold"
                  : "bg-card text-muted-foreground border-border hover:bg-muted"
              }`}
            >
              Desktop Only
            </button>
          </div>
        </div>

        {/* IDE Main Shell (Optimized 3-panel layout: 25% Explorer / 41.7% Editor / 33.3% Terminal) */}
        <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[660px] [overflow-anchor:none]">
          
          {/* PANEL 1: Left Day Selector / Explorer (Col 3 -> ~25%) */}
          <div className="lg:col-span-3 border-r border-border flex flex-col bg-muted/40">
            {/* Explorer Header */}
            <div className="p-3 border-b border-border flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-muted-foreground font-bold tracking-wider flex items-center gap-2">
                <FileCode className="w-3.5 h-3.5 text-emerald-500" />
                <span>Project Index ({filteredProjects.length})</span>
              </span>
            </div>

            {/* Day Search input */}
            <div className="p-2 border-b border-border">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter day or topic..."
                  value={searchDay}
                  onChange={(e) => setSearchDay(e.target.value)}
                  suppressHydrationWarning
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-card border border-border text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Scrollable Day List */}
            <div className="flex-1 overflow-y-auto max-h-[580px] p-2 space-y-1">
              {filteredProjects.map((p) => {
                const isSelected = p.day === selectedDay;
                return (
                  <button
                    key={p.day}
                    type="button"
                    onClick={() => handleSelectDay(p.day)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between transition-colors ${
                      isSelected
                        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-card"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                        isSelected 
                          ? "bg-emerald-500 text-slate-950" 
                          : "bg-muted text-muted-foreground border border-border"
                      }`}>
                        D{p.day < 10 ? `0${p.day}` : p.day}
                      </span>
                      <span className="truncate">{p.title}</span>
                    </div>

                    {p.compatibility === "BROWSER RUNNABLE" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="Browser Runnable" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PANEL 2: Center Code Viewer (Col 5 -> ~41.7%) */}
          <div className="lg:col-span-5 border-r border-border flex flex-col bg-card">
            {/* Editor File Tabs */}
            <div className="px-3 py-2 bg-muted/60 border-b border-border flex items-center justify-between overflow-x-auto gap-2">
              <div className="flex items-center gap-1 overflow-x-auto">
                {currentProject.files && currentProject.files.length > 0 ? (
                  currentProject.files.map((file) => {
                    const isTabActive = file.name === activeFileName;
                    return (
                      <button
                        key={file.name}
                        type="button"
                        onClick={() => handleSelectFile(file.name)}
                        className={`px-2.5 py-1 rounded-md text-xs font-mono flex items-center gap-1.5 whitespace-nowrap transition-colors border ${
                          isTabActive
                            ? "bg-card text-emerald-600 dark:text-emerald-400 border-border font-semibold shadow-xs"
                            : "bg-transparent text-muted-foreground hover:text-foreground border-transparent"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isTabActive ? "bg-emerald-500" : "bg-muted-foreground/40"}`} />
                        <span>{file.name}</span>
                      </button>
                    );
                  })
                ) : (
                  <div className="text-xs font-mono text-foreground font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>day_{currentProject.day < 10 ? `0${currentProject.day}` : currentProject.day}_solution.py</span>
                  </div>
                )}
              </div>

              {/* Action Buttons: Copy & Run/Check Code */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border bg-card cursor-pointer"
                  title="Copy Python Code"
                  aria-label="Copy Code"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>

                {currentProject.compatibility === "NOT BROWSER COMPATIBLE" ? (
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card hover:bg-muted text-foreground border border-border text-xs font-mono font-bold transition-all shadow-xs cursor-pointer"
                    title="Inspect full source on GitHub"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>Check Code</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => handleExecutePython(e)}
                    disabled={isRunning}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-mono font-bold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                    title="Execute code in Pyodide WebAssembly"
                  >
                    {isRunning ? (
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current" />
                    )}
                    <span>{isRunning ? "Running..." : "Run Python"}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Code Content with Line Numbers */}
            <div className="flex-1 overflow-x-auto p-4 font-mono text-xs leading-relaxed text-foreground bg-code-bg">
              <div className="flex gap-3">
                {/* Line numbers column */}
                <div className="text-muted-foreground/60 select-none text-right pr-2 border-r border-border space-y-0.5 font-mono">
                  {editableCode.split("\n").map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>

                {/* Editable / Viewer Code block */}
                <textarea
                  value={editableCode}
                  onChange={(e) => setEditableCode(e.target.value)}
                  spellCheck={false}
                  className="flex-1 bg-transparent text-foreground font-mono text-xs leading-relaxed resize-none focus:outline-none overflow-x-auto min-h-[460px]"
                />
              </div>
            </div>

            {/* Editor Footer / Technologies Bar */}
            <div className="p-3 bg-muted/50 border-t border-border flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-muted-foreground">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-foreground font-semibold">Stack:</span>
                {currentProject.technologies.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-card text-foreground border border-border">
                    {t}
                  </span>
                ))}
              </div>

              <span>{editableCode.split("\n").length} lines</span>
            </div>
          </div>

          {/* PANEL 3: Dominant Interactive WASM Terminal + Compact Project Info (Col 4 -> ~33.3%) */}
          <div className="lg:col-span-4 flex flex-col bg-card border-t lg:border-t-0 border-border">
            
            {/* 1. Compact Context Header */}
            <div className="p-3.5 bg-muted/30 border-b border-border space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-foreground truncate">
                  Day {currentProject.day}: {currentProject.title}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    {currentProject.phase}
                  </span>
                  {getCompatibilityBadge(currentProject.compatibility)}
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {currentProject.description}
              </p>

              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-0.5">
                <span className="truncate pr-2 text-muted-foreground/80">
                  {currentProject.compatibility === "BROWSER RUNNABLE" 
                    ? "Interactive WebAssembly Sandbox" 
                    : "Desktop System Environment"}
                </span>
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold shrink-0"
                  title="Inspect source on GitHub"
                >
                  <span>Day {currentProject.day} Repo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* 2. Dominant WebAssembly Terminal Container (Expanded Height, Zero Void Space) */}
            <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 min-h-[460px] lg:min-h-[500px] overflow-hidden">
              
              {/* Terminal Top Window Bar */}
              <div className="px-3.5 py-2 bg-slate-900 border-b border-white/10 flex items-center justify-between text-xs font-mono select-none">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-slate-300 font-semibold ml-1.5 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Python 3.12 · Pyodide Runtime</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[10px]">
                  {isWaitingForInput ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse font-bold">
                      Awaiting Input
                    </span>
                  ) : isRunning ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      <RotateCcw className="w-2.5 h-2.5 animate-spin" />
                      <span>Running</span>
                    </span>
                  ) : executionResult ? (
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded ${
                      executionResult.isError 
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/40" 
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    }`}>
                      {executionResult.isError ? "Exit 1" : "Exit 0"}
                    </span>
                  ) : (
                    <span className="text-slate-400">Ready</span>
                  )}
                  {executionResult && (
                    <span className="text-slate-400 font-mono">
                      {executionResult.executionTimeMs}ms
                    </span>
                  )}
                </div>
              </div>

              {/* Scrollable Terminal Output Body (Top-Aligned Flow) */}
              <div
                ref={terminalBodyRef}
                className="flex-1 p-4 font-mono text-xs leading-relaxed overflow-y-auto space-y-1.5 select-text [overflow-anchor:none]"
              >
                {terminalStream.length === 0 && !isRunning && !executionResult ? (
                  currentProject.compatibility === "NOT BROWSER COMPATIBLE" ? (
                    <div className="py-2 text-slate-400 space-y-2 font-mono text-xs leading-relaxed">
                      <p className="text-cyan-400 font-semibold">
                        &gt; Desktop / OS Environment Project
                      </p>
                      <p className="text-slate-300">
                        This project requires native OS GUI libraries ({currentProject.technologies.filter(t => ["Tkinter", "Turtle", "Pygame", "Selenium"].includes(t)).join(", ") || "native GUI"}).
                      </p>
                      <p className="text-[11px] text-slate-400 pt-1">
                        Inspect the complete modular source code in the editor or view the standalone repository on GitHub.
                      </p>
                      <div className="pt-2">
                        <a
                          href={currentProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-300 text-xs font-mono transition-colors border border-white/20"
                        >
                          <span>Check Code on GitHub</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="py-2 text-slate-400 space-y-1.5 font-mono text-xs leading-relaxed">
                      <p className="text-cyan-400 font-medium">
                        &gt; Ready to execute: {activeFileName}
                      </p>
                      <p className="text-slate-300">
                        &gt; Click <strong className="text-emerald-400">&ldquo;Run Python&rdquo;</strong> to execute this program in the browser.
                      </p>
                      <p className="text-[11px] text-slate-500 pt-1">
                        &gt; Real CPython 3.12 WebAssembly sandbox with interactive sys.stdin and live sys.stdout.
                      </p>
                    </div>
                  )
                ) : (
                  <>
                    {terminalStream.map((entry) => {
                      if (entry.type === "stdout") {
                        return (
                          <span
                            key={entry.id}
                            className="text-emerald-400 dark:text-emerald-300 whitespace-pre-wrap font-mono inline"
                          >
                            {entry.content}
                          </span>
                        );
                      }
                      if (entry.type === "stderr") {
                        return (
                          <span
                            key={entry.id}
                            className="text-rose-400 whitespace-pre-wrap font-mono inline"
                          >
                            {entry.content}
                          </span>
                        );
                      }
                      if (entry.type === "input") {
                        return (
                          <div
                            key={entry.id}
                            className="text-cyan-300 font-semibold whitespace-pre-wrap font-mono"
                          >
                            {entry.content}
                          </div>
                        );
                      }
                      return (
                        <div
                          key={entry.id}
                          className="text-slate-400 italic text-[11px] font-mono py-0.5"
                        >
                          {entry.content}
                        </div>
                      );
                    })}

                    {/* Real Interactive Terminal input() Control */}
                    {isWaitingForInput && (
                      <form
                        onSubmit={handleInputSubmit}
                        className="flex items-center gap-2 pt-1 font-mono border-t border-cyan-500/20 mt-2"
                      >
                        <span className="text-cyan-400 font-bold select-none text-sm">❯</span>
                        <input
                          ref={terminalInputRef}
                          type="text"
                          value={currentInputValue}
                          onChange={(e) => setCurrentInputValue(e.target.value)}
                          placeholder="Type input and press Enter..."
                          className="flex-1 bg-transparent text-cyan-200 font-mono text-xs focus:outline-none border-b border-cyan-500/50 pb-0.5 placeholder:text-slate-500 caret-cyan-400"
                        />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors shrink-0"
                        >
                          <span>Submit</span>
                          <CornerDownLeft className="w-2.5 h-2.5" />
                        </button>
                      </form>
                    )}

                    {/* Running Indicator */}
                    {isRunning && !isWaitingForInput && (
                      <div className="flex items-center gap-2 text-slate-400 py-1">
                        <RotateCcw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                        <span className="text-[11px] font-mono">
                          {wasmStatusMessage || "Executing Python program in browser..."}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Terminal Bottom Action & Status Footer */}
              <div className="px-3.5 py-2 bg-slate-900 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none">
                <span className="truncate pr-2">
                  {executionResult
                    ? executionResult.isError
                      ? "Process exited with error code 1"
                      : "Process exited with code 0"
                    : isWaitingForInput
                    ? "Program paused awaiting input..."
                    : isRunning
                    ? "Running in Pyodide WASM..."
                    : "Process status: Ready"}
                </span>

                <div className="flex items-center gap-3 shrink-0">
                  {terminalStream.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setTerminalStream([]);
                        setExecutionResult(null);
                      }}
                      className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                      title="Clear terminal output"
                    >
                      Clear
                    </button>
                  )}

                  {currentProject.compatibility === "BROWSER RUNNABLE" && (
                    <button
                      type="button"
                      onClick={(e) => handleExecutePython(e)}
                      disabled={isRunning}
                      className="text-cyan-400 hover:text-cyan-300 underline disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      {executionResult ? "Re-run" : "Run"}
                    </button>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
