import React from "react";
import { 
  GraduationCap, 
  BookOpen, 
  Cpu, 
  Server, 
  Flame, 
  Compass, 
  CheckCircle2 
} from "lucide-react";
import { profileData } from "@/data/profile";

export function AcademicDirectionSection() {
  const getIcon = (name: string) => {
    switch (name) {
      case "BookOpen":
        return <BookOpen className="w-5 h-5 text-cyan-500" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-blue-500" />;
      case "Server":
        return <Server className="w-5 h-5 text-violet-500" />;
      case "Flame":
        return <Flame className="w-5 h-5 text-amber-500" />;
      default:
        return <Compass className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <section id="academic-direction" className="py-20 bg-card/20 border-t border-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-600 dark:text-cyan-300">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-500" />
            <span>Academic Focus & Graduate Preparation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Academic Direction & Master&apos;s Statement
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {profileData.academicStatement}
          </p>
        </div>

        {/* Two-Column Grid: Academic Foundation & Research Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Degree & Research Interests */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Degree Card */}
            <div className="glass-panel rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase">
                  Undergraduate Foundation
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  Completed
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Bachelor of Computer Applications (BCA)
                </h3>
                <p className="text-xs font-mono text-muted-foreground mt-0.5">
                  Veer Narmad South Gujarat University (2021 – 2024)
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-muted/60 border border-border space-y-1 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cumulative Grade:</span>
                  <span className="font-bold text-foreground">CGPA 7.52 (First Class with Distinction)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Final Semester SGPA:</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">8.27 (462 / 550 Marks)</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Core coursework encompassed Data Structures, Design and Analysis of Algorithms, Object-Oriented Software Engineering, Discrete Mathematics, Relational Database Management Systems, and Web Architectures.
              </p>
            </div>

            {/* Target Program & Research Areas */}
            <div className="glass-panel rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-600 dark:text-cyan-400 font-bold">
                <Compass className="w-4 h-4" />
                <span>Target Program: {profileData.academicGoals.targetProgram}</span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-muted-foreground">
                  Specific Research Interests:
                </span>
                <div className="flex flex-wrap gap-2">
                  {profileData.academicGoals.researchInterests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-muted text-foreground border border-border"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <blockquote className="p-4 rounded-xl bg-cyan-500/10 border-l-2 border-cyan-500 text-xs text-foreground/90 italic leading-relaxed">
                &ldquo;{profileData.academicGoals.academicQuote}&rdquo;
              </blockquote>
            </div>

          </div>

          {/* Right Column: 4 Preparation Pillars */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span>Preparation Pillars for Advanced Research</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profileData.academicGoals.preparationPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="glass-panel glass-panel-hover rounded-2xl p-5 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="p-2 rounded-xl bg-muted border border-border w-fit">
                      {getIcon(pillar.icon)}
                    </div>
                    <h4 className="text-sm font-bold text-foreground">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active Preparation</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
