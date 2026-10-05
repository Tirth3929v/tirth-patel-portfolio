"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  FileDown, 
  Code2 
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { profileData } from "@/data/profile";
import { InteractiveTerminal } from "./InteractiveTerminal";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Subtle radial ambient gradients (sparingly applied) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-violet-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-cyan-500/5 blur-[90px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Positioning & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Small Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-600 dark:text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="tracking-wide uppercase font-semibold">
                {profileData.statusBadge}
              </span>
            </div>

            {/* Developer Identity & Headline */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
                  {profileData.name}
                </h1>
                <span className="px-2.5 py-1 rounded text-xs font-mono bg-muted border border-border text-cyan-600 dark:text-cyan-400">
                  BCA Graduate
                </span>
              </div>
              
              <p className="text-lg sm:text-xl font-semibold text-cyan-600 dark:text-cyan-400 font-mono">
                {profileData.role}
              </p>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
                Building intelligent software with Python, AI, and modern web architectures.
              </h2>
            </div>

            {/* Supporting Bio Description */}
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
              {profileData.summary}
            </p>

            {/* Quick Proof Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
              {profileData.metrics.map((m) => (
                <div 
                  key={m.label} 
                  className="p-3 rounded-xl bg-card border border-border backdrop-blur-sm space-y-1 shadow-xs"
                >
                  <div className="text-xs font-mono uppercase text-muted-foreground">{m.label}</div>
                  <div className="text-base font-bold text-foreground font-mono">{m.value}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/python-lab"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-card hover:bg-muted text-foreground font-semibold text-sm transition-all border border-border shadow-xs hover:-translate-y-0.5"
              >
                <Code2 className="w-4 h-4 text-emerald-500" />
                <span>100 Days Python Lab</span>
              </Link>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-card hover:bg-muted text-muted-foreground hover:text-foreground text-sm font-mono transition-all border border-border shadow-xs"
              >
                <FileDown className="w-4 h-4 text-cyan-500" />
                <span>Resume (PDF)</span>
              </a>
            </div>

            {/* Social Links Bar */}
            <div className="flex items-center gap-4 pt-2 text-xs font-mono text-muted-foreground">
              <span>Find me online:</span>
              <div className="flex items-center gap-2">
                <a
                  href={profileData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={profileData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-card hover:bg-muted text-muted-foreground hover:text-sky-500 transition-colors border border-border"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Terminal */}
          <div className="lg:col-span-5">
            <InteractiveTerminal />
          </div>

        </div>
      </div>
    </section>
  );
}
