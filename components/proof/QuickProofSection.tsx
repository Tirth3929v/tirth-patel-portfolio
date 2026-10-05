import React from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  BrainCircuit, 
  Code2, 
  Briefcase, 
  Trophy, 
  Award, 
  ArrowUpRight 
} from "lucide-react";

export function QuickProofSection() {
  const proofCards = [
    {
      title: "BCA Computer Science",
      subtitle: "Academic Foundation",
      description: "Rigorous undergraduate training in algorithms, discrete mathematics, OOP, and relational database systems.",
      icon: <GraduationCap className="w-5 h-5 text-cyan-500" />,
      tag: "Degree Verified",
      link: "/about#academic-direction",
    },
    {
      title: "Production AI & NLP Systems",
      subtitle: "Applied Engineering",
      description: "Built multi-agent platforms with Gemini API, Random Forest with watsonx.ai, and TF-IDF skill gap analytics.",
      icon: <BrainCircuit className="w-5 h-5 text-blue-500" />,
      tag: "3 AI Projects",
      link: "/projects",
    },
    {
      title: "100 Days Python Lab",
      subtitle: "Systematic Code Journey",
      description: "100 distinct Python problem sets spanning classical algorithms, Tkinter GUIs, Flask APIs, and Scikit-learn pipelines.",
      icon: <Code2 className="w-5 h-5 text-emerald-500" />,
      tag: "100 / 100 Days",
      link: "/python-lab",
    },
    {
      title: "AI Research Internship",
      subtitle: "Industry Appointment",
      description: "Appointed at UptoSkills focusing on applied AI research, API integrations, and machine learning pipeline development.",
      icon: <Briefcase className="w-5 h-5 text-violet-500" />,
      tag: "Appointment on File",
      link: "/experience",
    },
    {
      title: "Hacklabify Hackathon",
      subtitle: "AI/ML Track Participant",
      description: "Built and submitted SkillSync AI, an intelligent talent match and predictive skill gap analytics system.",
      icon: <Trophy className="w-5 h-5 text-amber-500" />,
      tag: "Hackathon Project",
      link: "/projects/skillsync-ai",
    },
    {
      title: "Academic Focus for Master's",
      subtitle: "Graduate Preparation",
      description: "Focusing on multi-agent systems, scalable inference pipelines, and mathematical foundations for M.S. programs.",
      icon: <Award className="w-5 h-5 text-rose-500" />,
      tag: "Research Aspirant",
      link: "/about#academic-direction",
    },
  ];

  return (
    <section className="py-12 border-y border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono uppercase text-cyan-600 dark:text-cyan-400 tracking-wider font-semibold">
              Empirical Track Record
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              Verified Technical Background
            </h2>
          </div>
          <div className="text-xs font-mono text-muted-foreground">
            Backed by real repositories, project code & documented implementations
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {proofCards.map((card) => (
            <Link
              key={card.title}
              href={card.link}
              className="p-5 rounded-2xl bg-card hover:bg-card-hover border border-border hover:border-cyan-500/30 transition-all duration-200 group flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-muted border border-border group-hover:scale-105 transition-transform">
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                    {card.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground">
                    {card.subtitle}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-border flex items-center justify-between text-xs font-mono text-cyan-600 dark:text-cyan-400 group-hover:underline">
                <span>View evidence</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
