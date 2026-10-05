import React from "react";
import { Metadata } from "next";
import { AcademicDirectionSection } from "@/components/academic/AcademicDirectionSection";
import { QuickProofSection } from "@/components/proof/QuickProofSection";
import Link from "next/link";
import { ArrowLeft, Sparkles, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Academic Direction & Master's Statement | Tirth Patel - AI Engineer",
  description:
    "Curated academic statement, preparation pillars, and research direction for Master's admissions in Computer Science and Artificial Intelligence.",
};

export default function AcademicsPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-background bg-grid-pattern text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Overview</span>
          </Link>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card hover:bg-muted text-xs font-mono text-muted-foreground hover:text-foreground border border-border transition-colors shadow-xs"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-500" />
            <span>Academic Resume (PDF)</span>
          </a>
        </div>

        {/* Dedicated Academic Direction Section */}
        <AcademicDirectionSection />

        {/* Supporting Evidence Strip */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-600 dark:text-cyan-400 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Verified Undergraduate & Research Credentials</span>
          </div>
          <QuickProofSection />
        </div>

        {/* Cross-linking to projects and Python Lab */}
        <div className="p-8 rounded-2xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">
              Inspect Applied AI Architecture & Code
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Academic statements are grounded in empirical systems. Explore our documented ML pipelines, multi-agent frameworks, and 100 days of algorithmic Python.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors shadow-sm shadow-cyan-500/20"
            >
              <span>Explore Projects</span>
            </Link>
            <Link
              href="/python-lab"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-semibold text-xs font-mono border border-border transition-colors"
            >
              <span>Python Lab</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
