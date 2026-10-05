"use client";

import React, { useState } from "react";
import { 
  Brain, 
  Code, 
  Server, 
  Database, 
  Terminal, 
  Search, 
  Sparkles 
} from "lucide-react";
import { skillCategories, SkillCategory } from "@/data/skills";

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Brain":
        return <Brain className="w-4 h-4 text-cyan-500" />;
      case "Code":
        return <Code className="w-4 h-4 text-blue-500" />;
      case "Server":
        return <Server className="w-4 h-4 text-violet-500" />;
      case "Database":
        return <Database className="w-4 h-4 text-emerald-500" />;
      default:
        return <Terminal className="w-4 h-4 text-amber-500" />;
    }
  };

  const filteredCategories = skillCategories.map((category) => {
    if (activeCategory !== "all" && category.id !== activeCategory) {
      return null;
    }

    const filteredSkills = category.skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (filteredSkills.length === 0) return null;

    return {
      ...category,
      skills: filteredSkills,
    };
  }).filter(Boolean) as SkillCategory[];

  return (
    <section id="skills" className="py-20 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-600 dark:text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>Competency Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Technical Skill Architecture
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              Categorized by practical application, systems engineering, and algorithmic mastery. Grounded in actual production code and project repositories—free from subjective fake percentage bars.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill, tool or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              suppressHydrationWarning
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-card border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500 font-mono shadow-xs"
            />
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            suppressHydrationWarning
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeCategory === "all"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border"
            }`}
          >
            All Disciplines
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              suppressHydrationWarning
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                activeCategory === cat.id
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border"
              }`}
            >
              {getCategoryIcon(cat.icon)}
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="space-y-8">
          {filteredCategories.map((category) => (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-border">
                <div className="p-1.5 rounded-lg bg-muted border border-border">
                  {getCategoryIcon(category.icon)}
                </div>
                <h3 className="text-lg font-bold text-foreground tracking-tight">
                  {category.title}
                </h3>
                <span className="text-xs font-mono text-muted-foreground ml-auto">
                  {category.skills.length} core competencies
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="glass-panel glass-panel-hover rounded-2xl p-5 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-foreground">
                          {skill.name}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                          {skill.level}
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {skill.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
