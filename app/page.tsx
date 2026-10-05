import React from "react";
import Link from "next/link";
import { ArrowRight, FolderGit2, Code2 } from "lucide-react";
import { Hero } from "@/components/hero/Hero";
import { QuickProofSection } from "@/components/proof/QuickProofSection";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projectsData } from "@/data/projects";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { AcademicDirectionSection } from "@/components/academic/AcademicDirectionSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  const featuredProjects = projectsData.filter((p) => p.featured);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero with Interactive Terminal & Proof Strip */}
      <Hero />

      {/* 2. Compact Proof of Work Strip */}
      <QuickProofSection />

      {/* 3. Featured Production Projects Showcase */}
      <section id="featured-projects" className="py-20 relative bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-600 dark:text-cyan-300">
                <FolderGit2 className="w-3.5 h-3.5 text-cyan-500" />
                <span>Featured Engineering Work</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Production AI & Software Systems
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl">
                Every project is accompanied by its underlying architectural dataflow, technical specifications, and explicit engineering decisions.
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 hover:underline transition-colors"
            >
              <span>View All Projects ({projectsData.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. 100 Days Python Lab Banner Callout */}
      <section className="py-12 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">
              <Code2 className="w-4 h-4" />
              <span>Interactive Python Code Explorer</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground tracking-tight">
              100 Days of Code: Complete Python Architecture Studio
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Explore 100 structured days of verified Python implementations featuring an in-browser Pyodide WebAssembly runner, real stdout/stderr execution, line numbers, and multi-format outputs.
            </p>
          </div>

          <Link
            href="/python-lab"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-lg shadow-emerald-500/20 shrink-0"
          >
            <span>Launch Python Lab</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. Modern Technical Skills Matrix */}
      <SkillsSection />

      {/* 6. Academic Direction for Master's Programs */}
      <AcademicDirectionSection />

      {/* 7. Experience, Roles & Hackathons */}
      <ExperienceSection />

      {/* 8. Professional Contact Section */}
      <ContactSection />
    </div>
  );
}
