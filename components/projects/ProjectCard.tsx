import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Layers, 
  Clock, 
  ArrowUpRight
} from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { ProjectDetail, ProjectStatus } from "@/data/projects";

import { FormattedText } from "@/components/ui/FormattedText";

interface ProjectCardProps {
  project: ProjectDetail;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case "LIVE":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            LIVE
          </span>
        );
      case "FRONTEND DEMO":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            FRONTEND DEMO
          </span>
        );
      case "IN DEVELOPMENT":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30">
            <Clock className="w-2.5 h-2.5" />
            IN DEVELOPMENT
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-muted text-muted-foreground border border-border">
            ARCHIVED
          </span>
        );
    }
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden">
      {/* Top accent highlight */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="space-y-4">
        {/* Category & Status Bar */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-medium">
            {project.category}
          </span>
          {getStatusBadge(project.status)}
        </div>

        {/* Project Title & Tagline */}
        <div>
          <Link href={`/projects/${project.slug}`} className="focus:outline-none">
            <h3 className="text-xl font-bold text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors flex items-center gap-2">
              <span>{project.title}</span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-cyan-500 transition-colors" />
            </h3>
          </Link>
          <p className="text-xs font-mono text-muted-foreground mt-1">
            {project.tagline}
          </p>
        </div>

        {/* Description with technical terms highlighted */}
        <div className="text-sm leading-relaxed line-clamp-3">
          <FormattedText text={project.problem} />
        </div>

        {/* Architecture snippet badge */}
        <div className="p-3 rounded-xl bg-muted/60 border border-border font-mono text-xs text-muted-foreground space-y-1">
          <div className="text-[10px] uppercase text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5 font-bold">
            <Layers className="w-3 h-3" />
            <span>Architecture Flow</span>
          </div>
          <p className="text-[11px] text-foreground/90 truncate">
            {project.architecture.diagramSummary}
          </p>
        </div>

        {/* Technologies Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="text-[11px] font-mono px-1.5 py-0.5 text-muted-foreground">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-6 mt-4 border-t border-border flex items-center justify-between gap-4 text-xs font-mono">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:underline font-bold"
        >
          <span>View Deep Dive</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border"
              title="Inspect Source Code on GitHub"
              aria-label="GitHub Repository"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
