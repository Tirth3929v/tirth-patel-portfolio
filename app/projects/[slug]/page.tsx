import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Sparkles, 
  HelpCircle, 
  Lightbulb, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  BrainCircuit 
} from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { projectsData } from "@/data/projects";
import { ProjectArchitectureViewer } from "@/components/projects/ProjectArchitectureViewer";
import { FrontendDemoNotice } from "@/components/projects/FrontendDemoNotice";
import { ProjectLiveSimulator } from "@/components/projects/ProjectLiveSimulator";
import { FormattedText } from "@/components/ui/FormattedText";

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background bg-grid-pattern">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Back Link */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* 1. Project Header */}
        <div className="space-y-4 pb-8 border-b border-border">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 rounded text-xs font-mono uppercase bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
              {project.category}
            </span>
            <span className="px-2.5 py-1 rounded text-xs font-mono uppercase bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
              {project.status}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-mono">
            {project.tagline}
          </p>

          {/* Technologies Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-muted border border-border text-xs font-mono text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card hover:bg-muted text-foreground font-mono text-xs transition-colors border border-border shadow-xs"
              >
                <Github className="w-4 h-4" />
                <span>Source Code (GitHub)</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href="#live-demonstration"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs transition-colors shadow-md shadow-cyan-500/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>Jump to Interactive Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Frontend Demo Notice (if applicable) */}
        {project.status !== "LIVE" && (
          <FrontendDemoNotice
            customMessage={project.frontendNotice}
            githubUrl={project.githubUrl}
          />
        )}

        {/* 2. The Problem */}
        <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-rose-500 font-mono text-xs uppercase font-bold">
            <HelpCircle className="w-4 h-4" />
            <span>The Problem Statement</span>
          </div>
          <h2 className="text-xl font-bold text-foreground">
            What real-world challenge does this system address?
          </h2>
          <div className="text-sm leading-relaxed">
            <FormattedText text={project.problem} />
          </div>
        </section>

        {/* 3. The Solution */}
        <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-emerald-500 font-mono text-xs uppercase font-bold">
            <Lightbulb className="w-4 h-4" />
            <span>The Engineering Solution</span>
          </div>
          <h2 className="text-xl font-bold text-foreground">
            System Design & Approach
          </h2>
          <div className="text-sm leading-relaxed">
            <FormattedText text={project.solution} />
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono uppercase text-muted-foreground font-bold">
              Key Capabilities:
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
              {project.keyFeatures.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 bg-muted/60 p-2.5 rounded-lg border border-border text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. Architecture Visualization */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-xs uppercase font-bold">
            <Layers className="w-4 h-4" />
            <span>System Architecture Flow</span>
          </div>
          <ProjectArchitectureViewer
            steps={project.architecture.flow}
            summary={project.architecture.diagramSummary}
          />
        </section>

        {/* 5. Technical Implementation Details */}
        <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-violet-500 font-mono text-xs uppercase font-bold">
            <Cpu className="w-4 h-4" />
            <span>Technical Implementation</span>
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Stack Specification & Components
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-muted/60 border border-border space-y-1">
              <span className="text-muted-foreground uppercase text-[10px]">Language & Runtime</span>
              <p className="font-bold text-foreground">{project.technicalImplementation.language}</p>
            </div>

            <div className="p-4 rounded-xl bg-muted/60 border border-border space-y-1">
              <span className="text-muted-foreground uppercase text-[10px]">Framework</span>
              <p className="font-bold text-cyan-600 dark:text-cyan-400">{project.technicalImplementation.framework}</p>
            </div>

            {project.technicalImplementation.database && (
              <div className="p-4 rounded-xl bg-muted/60 border border-border space-y-1">
                <span className="text-muted-foreground uppercase text-[10px]">Database / Storage</span>
                <p className="font-bold text-emerald-600 dark:text-emerald-400">{project.technicalImplementation.database}</p>
              </div>
            )}

            {project.technicalImplementation.deployment && (
              <div className="p-4 rounded-xl bg-muted/60 border border-border space-y-1">
                <span className="text-muted-foreground uppercase text-[10px]">Deployment Target</span>
                <p className="font-bold text-foreground">{project.technicalImplementation.deployment}</p>
              </div>
            )}

            <div className="p-4 rounded-xl bg-muted/60 border border-border space-y-1 sm:col-span-2">
              <span className="text-muted-foreground uppercase text-[10px]">Key Libraries</span>
              <div className="flex flex-wrap gap-1 pt-1">
                {project.technicalImplementation.libraries.map((lib) => (
                  <span key={lib} className="px-2 py-0.5 rounded bg-card border border-border text-foreground text-[11px]">
                    {lib}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Live Interactive Demonstration */}
        <section id="live-demonstration" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-xs uppercase font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Demonstration Sandbox</span>
            </div>
            <span className="text-xs font-mono text-muted-foreground">Client-Side Simulation</span>
          </div>

          <ProjectLiveSimulator slug={project.slug} />
        </section>

        {/* 7. Engineering Decisions */}
        <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-xs uppercase font-bold">
              <BrainCircuit className="w-4 h-4" />
              <span>Architectural Rationale & Tradeoffs</span>
            </div>
            <h2 className="text-xl font-bold text-foreground">
              Engineering Decisions
            </h2>
            <p className="text-xs text-muted-foreground font-mono">
              Key design choices, constraints, and solutions formulated during development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.engineeringDecisions.map((dec, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-muted/60 border border-border space-y-3"
              >
                <h3 className="text-sm font-bold text-foreground">
                  {dec.title}
                </h3>
                
                <div className="text-xs font-mono space-y-1 text-muted-foreground">
                  <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Decision:</span>
                  <p className="text-foreground/90">{dec.decision}</p>
                </div>

                <div className="text-xs font-mono space-y-1 text-muted-foreground pt-1 border-t border-border">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Engineering Rationale:</span>
                  <p className="text-muted-foreground leading-relaxed">{dec.rationale}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Navigation */}
        <div className="pt-8 border-t border-border flex items-center justify-between text-xs font-mono">
          <Link
            href="/projects"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← View All Projects
          </Link>
          <Link
            href="/python-lab"
            className="text-emerald-600 dark:text-emerald-400 hover:underline transition-colors"
          >
            Explore 100 Days Python Lab →
          </Link>
        </div>

      </div>
    </div>
  );
}
