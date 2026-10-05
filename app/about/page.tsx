"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Award, 
  ExternalLink 
} from "lucide-react";
import { profileData } from "@/data/profile";
import { certificationsData, CertificationItem } from "@/data/certifications";
import { AcademicDirectionSection } from "@/components/academic/AcademicDirectionSection";
import { CertificateModal } from "@/components/certificates/CertificateModal";

export default function AboutPage() {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background bg-grid-pattern text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-600 dark:text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>Developer Journey & Vision</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
            About Tirth Patel
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-mono">
            {profileData.role} • BCA Graduate • Applied AI Researcher
          </p>
        </div>

        {/* Narrative Section: Foundation to AI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Bridging Rigorous Backend Engineering with Applied Intelligence
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed">
              My engineering trajectory began with a strong undergraduate degree in Computer Applications (BCA), where I immersed myself in core algorithms, object-oriented systems, and relational databases. Rather than approaching software merely as code syntax, I treat every project as an end-to-end system where data flow, computational efficiency, and maintainability govern performance.
            </p>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Over the past several years, I have channeled this software engineering foundation into the domain of Artificial Intelligence and Machine Learning. By building concrete systems—such as <Link href="/projects/skillsync-ai" className="text-cyan-600 dark:text-cyan-400 underline">SkillSync AI</Link> for vector similarity gap analytics, multi-agent frameworks in <Link href="/projects/careercompass-ai" className="text-cyan-600 dark:text-cyan-400 underline">CareerCompass AI</Link>, and the <Link href="/python-lab" className="text-emerald-600 dark:text-emerald-400 underline">100 Days of Code Python Studio</Link>—I have systematically transitioned from theoretical fundamentals to high-performance production implementations.
            </p>

            <div className="p-4 rounded-xl bg-muted/60 border border-border space-y-2">
              <span className="text-xs font-mono uppercase text-cyan-600 dark:text-cyan-400 font-bold">
                Core Engineering Philosophies:
              </span>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span><strong className="text-foreground">Determinism First:</strong> Use classical ML and mathematical scoring where possible to prevent LLM hallucinations.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span><strong className="text-foreground">Decoupled Microservices:</strong> Offload long-running tasks into Celery & Redis background queues.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span><strong className="text-foreground">Honest System Presentation:</strong> Label simulated environments clearly and document architecture decisions transparently.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Profile Summary Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel rounded-2xl p-6 space-y-4 shadow-sm">
              <span className="text-xs font-mono uppercase text-cyan-600 dark:text-cyan-400 font-bold">
                Profile Highlights
              </span>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between pb-2 border-b border-border">
                  <span className="text-muted-foreground">Primary Discipline</span>
                  <span className="text-foreground font-semibold">AI / ML & Python Systems</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-border">
                  <span className="text-muted-foreground">Undergraduate Degree</span>
                  <span className="text-foreground font-semibold">BCA • CGPA 7.52 (Distinction)</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-border">
                  <span className="text-muted-foreground">University & College</span>
                  <span className="text-foreground">VNSGU • Sutex Bank College</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-border">
                  <span className="text-muted-foreground">Industry Experience</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Creative Web, 2x YuvaIntern, IBM, UptoSkills</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-border">
                  <span className="text-muted-foreground">Target Graduate Degree</span>
                  <span className="text-violet-600 dark:text-violet-400 font-semibold">M.S. in CS / AI</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="text-foreground">Surat, Gujarat, India</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors shadow-sm shadow-cyan-500/20"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Resume (PDF)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Academic Direction Section */}
        <AcademicDirectionSection />

        {/* Certifications & Formal Milestones */}
        <div className="space-y-6 pt-4">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-[11px] font-mono text-violet-600 dark:text-violet-300">
              <Award className="w-3.5 h-3.5 text-violet-500" />
              <span>Verified Milestones</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Certifications, Offer Letters & Credentials
            </h2>
            <p className="text-xs text-muted-foreground font-mono">
              Click any credential to inspect verification details, official scanned documents, Credly badges, and issuer records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificationsData.map((cert) => (
              <div
                key={cert.id}
                className="p-5 rounded-2xl bg-card hover:bg-card-hover border border-border hover:border-cyan-500/30 transition-all flex flex-col justify-between group shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase">
                      {cert.issuer}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      cert.verificationStatus === "Verified"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                        : cert.verificationStatus === "Official Certificate"
                        ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                    }`}>
                      {cert.verificationStatus}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    {cert.previewImage && (
                      <div className="w-14 h-14 rounded-lg bg-muted border border-border overflow-hidden shrink-0 hidden sm:block">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={cert.previewImage}
                          alt={cert.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    )}
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground font-mono">
                        {cert.issueDate}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-border flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.slice(0, 3).map((s) => (
                      <span key={s} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border">
                        {s}
                      </span>
                    ))}
                  </div>

                  <button
                    suppressHydrationWarning
                    onClick={() => setSelectedCert(cert)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors cursor-pointer"
                  >
                    <span>Inspect Document</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
}
