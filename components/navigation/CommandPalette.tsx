"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Terminal, 
  Code, 
  FolderGit2, 
  Briefcase, 
  Sparkles, 
  FileText, 
  Mail, 
  Moon, 
  Sun,
  X
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { useTheme } from "../theme/ThemeProvider";
import { profileData } from "@/data/profile";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Developer" | "Social & Documents";
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const commands: CommandItem[] = [
    {
      id: "home",
      title: "Go to Home / Overview",
      category: "Navigation",
      icon: <Terminal className="w-4 h-4 text-cyan-500" />,
      action: () => { router.push("/"); setIsOpen(false); },
    },
    {
      id: "projects",
      title: "Explore Featured Projects",
      category: "Navigation",
      icon: <FolderGit2 className="w-4 h-4 text-blue-500" />,
      shortcut: "G P",
      action: () => { router.push("/projects"); setIsOpen(false); },
    },
    {
      id: "python-lab",
      title: "Launch 100 Days Python Lab (VS Code view)",
      category: "Navigation",
      icon: <Code className="w-4 h-4 text-emerald-500" />,
      shortcut: "G L",
      action: () => { router.push("/python-lab"); setIsOpen(false); },
    },
    {
      id: "experience",
      title: "View Experience & Industry Milestones",
      category: "Navigation",
      icon: <Briefcase className="w-4 h-4 text-violet-500" />,
      action: () => { router.push("/experience"); setIsOpen(false); },
    },
    {
      id: "skills",
      title: "Technical Skills & Competency Matrix",
      category: "Navigation",
      icon: <Sparkles className="w-4 h-4 text-cyan-500" />,
      shortcut: "G S",
      action: () => { router.push("/skills"); setIsOpen(false); },
    },
    {
      id: "about",
      title: "About & Engineering Narrative",
      category: "Navigation",
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      action: () => { router.push("/about"); setIsOpen(false); },
    },
    {
      id: "academics",
      title: "Academic Direction & Master's Statement",
      category: "Navigation",
      icon: <Sparkles className="w-4 h-4 text-cyan-500" />,
      action: () => { router.push("/academics"); setIsOpen(false); },
    },
    {
      id: "contact",
      title: "Get in Touch / Send Email",
      category: "Navigation",
      icon: <Mail className="w-4 h-4 text-emerald-500" />,
      shortcut: "G C",
      action: () => { router.push("/contact"); setIsOpen(false); },
    },
    {
      id: "resume",
      title: "Download Resume (PDF)",
      category: "Social & Documents",
      icon: <FileText className="w-4 h-4 text-cyan-500" />,
      action: () => { window.open("/resume.pdf", "_blank", "noopener,noreferrer"); setIsOpen(false); },
    },
    {
      id: "theme",
      title: `Switch to ${theme === "dark" ? "Light" : "Dark"} Theme`,
      category: "Developer",
      icon: theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-500" />,
      action: () => { toggleTheme(); setIsOpen(false); },
    },
    {
      id: "github",
      title: "Open GitHub Profile",
      category: "Social & Documents",
      icon: <Github className="w-4 h-4 text-foreground" />,
      action: () => { window.open(profileData.socials.github, "_blank", "noopener,noreferrer"); setIsOpen(false); },
    },
    {
      id: "linkedin",
      title: "Connect on LinkedIn",
      category: "Social & Documents",
      icon: <Linkedin className="w-4 h-4 text-sky-500" />,
      action: () => { window.open(profileData.socials.linkedin, "_blank", "noopener,noreferrer"); setIsOpen(false); },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div 
        className="w-full max-w-xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden text-card-foreground flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3.5 border-b border-border gap-3">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Type a command or search sections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            suppressHydrationWarning
            className="w-full bg-transparent text-sm focus:outline-none text-foreground placeholder:text-muted-foreground font-mono"
            autoFocus
          />
          <button 
            suppressHydrationWarning
            onClick={() => setIsOpen(false)}
            aria-label="Close Command Palette"
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground font-mono">
              No matching commands found.
            </div>
          ) : (
            filteredCommands.map((cmd) => (
              <button
                key={cmd.id}
                onClick={cmd.action}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm hover:bg-muted transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="p-1.5 rounded-lg bg-muted border border-border group-hover:border-cyan-500/40 transition-colors">
                    {cmd.icon}
                  </span>
                  <span className="font-medium text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                    {cmd.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border">
                    {cmd.category}
                  </span>
                  {cmd.shortcut && (
                    <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-1.5 py-0.5 rounded">
                      {cmd.shortcut}
                    </span>
                  )}
                </div>
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2.5 bg-muted/50 border-t border-border flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <span>Navigate with mouse or arrow keys</span>
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-foreground">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
