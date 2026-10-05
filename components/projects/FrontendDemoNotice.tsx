import React from "react";
import { Sparkles, Code, Layers, FileText } from "lucide-react";

interface FrontendDemoNoticeProps {
  customMessage?: string;
  githubUrl?: string;
  onViewArchitecture?: () => void;
  onReadDetails?: () => void;
}

export function FrontendDemoNotice({
  customMessage,
  githubUrl,
  onViewArchitecture,
  onReadDetails,
}: FrontendDemoNoticeProps) {
  return (
    <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4 sm:p-5 text-foreground backdrop-blur-sm space-y-3 shadow-xs">
      <div className="flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-cyan-700 dark:text-cyan-300 font-mono tracking-wide uppercase">
              Interactive Frontend Environment
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/15 text-cyan-800 dark:text-cyan-200 border border-cyan-500/30">
              Live Preview
            </span>
          </div>
          <p className="text-xs text-foreground/90 leading-relaxed">
            {customMessage ||
              "This interactive preview demonstrates the frontend user experience, state management, and interface workflows directly in your browser. Complete backend microservices, inference pipelines, and test suites are available in the project source repository."}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-cyan-500/20">
        {onViewArchitecture && (
          <button
            onClick={onViewArchitecture}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-700 dark:text-cyan-300 text-xs font-mono transition-colors border border-cyan-500/30"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>View Architecture</span>
          </button>
        )}

        {onReadDetails && (
          <button
            onClick={onReadDetails}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-700 dark:text-cyan-300 text-xs font-mono transition-colors border border-cyan-500/30"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Technical Details</span>
          </button>
        )}

        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card hover:bg-muted text-foreground text-xs font-mono transition-colors ml-auto border border-border"
          >
            <Code className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Check Code</span>
          </a>
        )}
      </div>
    </div>
  );
}
