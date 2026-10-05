"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft } from "lucide-react";
import confetti from "canvas-confetti";
import { profileData } from "@/data/profile";

interface CommandOutput {
  command: string;
  response: React.ReactNode;
}

export function InteractiveTerminal() {
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "whoami",
      response: (
        <div className="text-slate-300 font-mono text-xs space-y-1">
          <p className="text-cyan-400 font-semibold">{profileData.name}</p>
          <p className="text-slate-400">{profileData.role}</p>
        </div>
      ),
    },
    {
      command: "focus",
      response: (
        <div className="text-slate-300 font-mono text-xs flex flex-wrap gap-2">
          {["Applied AI & NLP", "Machine Learning Pipelines", "Python 3.11+", "FastAPI & Microservices"].map((item) => (
            <span key={item} className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40 text-cyan-300">
              {item}
            </span>
          ))}
        </div>
      ),
    },
    {
      command: "status",
      response: (
        <div className="text-emerald-400 font-mono text-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Building AI systems → 100 Days Python Lab → Preparing Master&apos;s Research</span>
        </div>
      ),
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let responseNode: React.ReactNode = null;

    switch (cmd) {
      case "help":
        responseNode = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p className="text-cyan-400 font-bold">Available Commands:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 pl-2">
              <div><strong className="text-slate-200">whoami</strong> - Profile & role</div>
              <div><strong className="text-slate-200">focus</strong> - Core AI/ML areas</div>
              <div><strong className="text-slate-200">projects</strong> - Featured systems</div>
              <div><strong className="text-slate-200">skills</strong> - Technical stack</div>
              <div><strong className="text-slate-200">education</strong> - Degree & honors</div>
              <div><strong className="text-slate-200">python100</strong> - 100 Days Python Lab</div>
              <div><strong className="text-slate-200">clear</strong> - Reset terminal</div>
              <div><strong className="text-slate-200">sudo hire-tirth</strong> - Confidential ;-)</div>
            </div>
          </div>
        );
        break;

      case "whoami":
        responseNode = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p className="text-cyan-400 font-bold">{profileData.name} ({profileData.location})</p>
            <p className="text-slate-400">{profileData.role} • BCA Graduate (SGPA 8.27)</p>
            <p className="text-slate-300">{profileData.headline}</p>
          </div>
        );
        break;

      case "focus":
        responseNode = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p className="text-cyan-400 font-semibold">Active Research & Engineering Pillars:</p>
            <p>1. Mathematical Modeling & Cosine Vector Sim (TF-IDF)</p>
            <p>2. Multi-Agent Agentic Workflows (Gemini 1.5 Pro)</p>
            <p>3. Enterprise Cloud ML Pipelines (IBM watsonx.ai Granite 4)</p>
            <p>4. 100 Days Python Algorithm Studio</p>
          </div>
        );
        break;

      case "projects":
        responseNode = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p className="text-cyan-400 font-semibold">Featured Architectures:</p>
            <p>• <span className="text-emerald-400">SkillSync AI:</span> Talent vector matching (Hacklabify Top 200)</p>
            <p>• <span className="text-blue-400">CareerCompass AI:</span> 3-agent orchestration (Counselor, Verifier, Roadmap)</p>
            <p>• <span className="text-violet-400">PMGSY Classifier:</span> Random Forest + watsonx.ai Granite 4</p>
            <p className="text-[11px] text-slate-400 pt-1">Type or visit &ldquo;/projects&rdquo; to test full interactive environments.</p>
          </div>
        );
        break;

      case "skills":
        responseNode = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p className="text-cyan-400 font-semibold">Core Technical Stack:</p>
            <p>Python 3.11+, Scikit-Learn, FastAPI, Next.js 16, TypeScript, Tailwind CSS, Pyodide WASM, Docker, MySQL, Redis.</p>
          </div>
        );
        break;

      case "education":
        responseNode = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p className="text-cyan-400 font-semibold">Undergraduate Degree:</p>
            <p>Bachelor of Computer Applications (BCA) - First Class with Distinction</p>
            <p className="text-emerald-400 font-bold">CGPA: 7.52 • Final Semester SGPA: 8.27 (462/550)</p>
            <p className="text-slate-400">Veer Narmad South Gujarat University (2021 - 2024)</p>
          </div>
        );
        break;

      case "python100":
        responseNode = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p className="text-emerald-400 font-semibold">100 Days of Code • Python Studio:</p>
            <p>100 / 100 Days Completed with real in-browser Pyodide WASM execution.</p>
            <p className="text-slate-400">Visit /python-lab to run pure Python algorithms in your browser.</p>
          </div>
        );
        break;

      case "sudo hire-tirth":
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {}
        responseNode = (
          <div className="text-xs font-mono text-emerald-400 space-y-1 p-2 bg-emerald-950/40 border border-emerald-500/40 rounded-lg">
            <p className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Permission Granted: Superuser authorization verified!</span>
            </p>
            <p className="text-slate-200">
              Direct Contact: <a href="mailto:tirthpatel82032@gmail.com" className="text-cyan-300 underline">tirthpatel82032@gmail.com</a>
            </p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        responseNode = (
          <div className="text-xs font-mono text-rose-400">
            Command not recognized: <span className="text-slate-200">&ldquo;{cmd}&rdquo;</span>. Type <span className="text-cyan-400 font-bold">help</span> to view all safe UI commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: inputVal, response: responseNode }]);
    setInputVal("");
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div className="w-full rounded-2xl border border-border bg-[#070a12] shadow-2xl overflow-hidden flex flex-col font-mono text-sm">
      {/* Terminal Header Bar */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/40" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/40" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/40" />
          <span className="ml-2 text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
            <TerminalIcon className="w-3 h-3 text-cyan-400" />
            tirth@ai-workstation: ~
          </span>
        </div>
        <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Interactive Shell</span>
        </div>
      </div>

      {/* Terminal History */}
      <div 
        className="p-4 space-y-3 min-h-[220px] max-h-[300px] overflow-y-auto text-xs leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="text-[11px] text-slate-400 pb-1 border-b border-white/5">
          Type <code className="text-cyan-400 font-bold">help</code> to list commands • Safe client UI terminal
        </div>

        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-cyan-400 font-bold">$</span>
              <span className="text-slate-100 font-semibold">{item.command}</span>
            </div>
            <div className="pl-4">{item.response}</div>
          </div>
        ))}

        <div ref={terminalEndRef} />
      </div>

      {/* Interactive Command Input */}
      <form 
        onSubmit={handleCommand}
        className="px-4 py-2.5 bg-slate-950/90 border-t border-white/10 flex items-center gap-2"
      >
        <span className="text-cyan-400 font-bold">$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="type 'help', 'whoami', 'projects', 'sudo hire-tirth'..."
          suppressHydrationWarning
          className="w-full bg-transparent text-xs text-slate-100 focus:outline-none placeholder:text-slate-500 font-mono"
        />
        <button
          type="submit"
          aria-label="Execute command"
          suppressHydrationWarning
          className="p-1 rounded text-slate-400 hover:text-cyan-400 hover:bg-white/10"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
