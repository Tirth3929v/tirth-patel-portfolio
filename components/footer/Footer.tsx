"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { profileData } from "@/data/profile";
import { MAIN_NAV_ITEMS } from "@/data/navigation";

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-t border-border bg-card py-12 text-muted-foreground text-xs font-mono transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Identity */}
          <div className="space-y-1.5">
            <Link 
              href="/" 
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center gap-2 group focus:outline-none cursor-pointer"
            >
              <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-xs">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <span className="text-foreground font-bold text-sm tracking-tight font-sans group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {profileData.name}
              </span>
            </Link>
            <p className="text-muted-foreground text-xs">
              {profileData.role} • BCA Graduate
            </p>
          </div>

          {/* Unified Navigation Links from Shared Config */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
            {MAIN_NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground hover:underline transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
            >
              Resume (PDF)
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5">
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors border border-border"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-sky-500 transition-colors border border-border"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profileData.socials.email}`}
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-cyan-500 transition-colors border border-border"
              aria-label="Email Contact"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Technical Architecture & Copyright Bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Built with Next.js App Router, TypeScript, Pyodide WASM, and Tailwind CSS</span>
          </div>

          <div>
            © {new Date().getFullYear()} {profileData.name}. Personal engineering portfolio & project showcase.
          </div>
        </div>

      </div>
    </footer>
  );
}
