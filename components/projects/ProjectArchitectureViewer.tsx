import React from "react";
import { ProjectArchitectureStep } from "@/data/projects";
import { ArrowDown, Cpu, Database, Server, Smartphone } from "lucide-react";

interface ProjectArchitectureViewerProps {
  steps: ProjectArchitectureStep[];
  summary: string;
}

export function ProjectArchitectureViewer({ steps, summary }: ProjectArchitectureViewerProps) {
  const getStepIcon = (role: string) => {
    const r = role.toLowerCase();
    if (r.includes("input") || r.includes("front") || r.includes("client")) {
      return <Smartphone className="w-4 h-4 text-cyan-500" />;
    }
    if (r.includes("api") || r.includes("gate") || r.includes("server") || r.includes("router")) {
      return <Server className="w-4 h-4 text-blue-500" />;
    }
    if (r.includes("vector") || r.includes("ai") || r.includes("model") || r.includes("similarity") || r.includes("agent")) {
      return <Cpu className="w-4 h-4 text-violet-500" />;
    }
    return <Database className="w-4 h-4 text-emerald-500" />;
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 text-card-foreground shadow-sm">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500" />
          <h4 className="text-sm font-bold text-foreground font-mono uppercase tracking-wider">
            System Architecture & Dataflow
          </h4>
        </div>
        <p className="text-xs text-muted-foreground font-mono">
          {summary}
        </p>
      </div>

      {/* Structured Pipeline Visualization */}
      <div className="space-y-3">
        {steps.map((step, idx) => (
          <React.Fragment key={step.name}>
            <div className="p-4 rounded-xl bg-muted/60 border border-border hover:border-cyan-500/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-card border border-border group-hover:scale-105 transition-transform shadow-xs">
                  {getStepIcon(step.role)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-muted-foreground">
                      Phase 0{idx + 1}:
                    </span>
                    <span className="text-sm font-bold text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {step.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {step.details}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:items-end text-xs font-mono shrink-0 pl-11 sm:pl-0">
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{step.role}</span>
                <span className="text-[11px] text-muted-foreground bg-card border border-border px-2 py-0.5 rounded mt-1">
                  {step.tech}
                </span>
              </div>
            </div>

            {idx < steps.length - 1 && (
              <div className="flex items-center justify-center py-0.5">
                <ArrowDown className="w-4 h-4 text-cyan-500/60" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
