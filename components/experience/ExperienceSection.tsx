"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Award, 
  Trophy, 
  FileText, 
  ArrowUpRight 
} from "lucide-react";
import { experienceData } from "@/data/experience";
import { hackathonsData } from "@/data/hackathons";
import { certificationsData, CertificationItem } from "@/data/certifications";
import { CertificateModal } from "../certificates/CertificateModal";
import { FormattedText } from "@/components/ui/FormattedText";

export function ExperienceSection() {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  const openCertByTitle = (titleKeyword: string, certUrl?: string) => {
    // 1. If an exact certificate URL is passed, prioritize matching that specific document
    if (certUrl) {
      const matchByUrl = certificationsData.find(
        (c) => c.certificateFile === certUrl || c.credentialUrl === certUrl
      );
      if (matchByUrl) {
        setSelectedCert(matchByUrl);
        return;
      }
    }

    // 2. Otherwise search by title or issuer keyword
    const cert = certificationsData.find((c) =>
      c.title.toLowerCase().includes(titleKeyword.toLowerCase()) ||
      c.issuer.toLowerCase().includes(titleKeyword.toLowerCase())
    );
    if (cert) {
      setSelectedCert(cert);
    } else if (certUrl) {
      setSelectedCert({
        id: "doc-" + titleKeyword,
        title: titleKeyword,
        issuer: "Document on File",
        issueDate: "On File",
        skills: ["Technical Practice", "Documentation"],
        certificateFile: certUrl,
        verificationStatus: "Document",
        description: `Official documentation record for ${titleKeyword}.`,
      });
    } else {
      setSelectedCert({
        id: "missing-" + titleKeyword,
        title: titleKeyword,
        issuer: "Document Registry",
        issueDate: "Status: Not Attached",
        skills: [],
        verificationStatus: "Not publicly verifiable",
        description: "Certificate document not added. The completion document has not been attached for public viewing.",
      });
    }
  };

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Experience Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-600 dark:text-cyan-300">
            <Briefcase className="w-3.5 h-3.5 text-cyan-500" />
            <span>Industry Practice & Roles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Work Experience & Engineering Milestones
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-world backend software development, high-throughput microservices, and applied AI systems.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experienceData.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-2xl p-6 sm:p-8 space-y-5 relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-foreground">
                      {item.role}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground mt-1">
                    <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{item.company}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.period}
                    </span>
                  </div>
                </div>

                {item.certificateUrl && (
                  <button
                    suppressHydrationWarning
                    onClick={() => openCertByTitle(item.role, item.certificateUrl)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-xs font-mono text-cyan-600 dark:text-cyan-400 border border-border hover:border-cyan-500/40 transition-colors w-fit"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Credential / Offer</span>
                  </button>
                )}
              </div>

              <div className="text-sm leading-relaxed">
                <FormattedText text={item.description} />
              </div>

              {/* Responsibilities list */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-muted-foreground font-semibold">
                  Core Engineering Contributions:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground/90">
                  {item.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                      <div>
                        <FormattedText text={resp} className="text-foreground/90" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements if verified */}
              {item.achievements.length > 0 && (
                <div className="p-4 rounded-xl bg-muted/60 border border-border space-y-2">
                  <h4 className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-bold">
                    <Award className="w-3.5 h-3.5" />
                    <span>Verified Deliverables</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-foreground/90">
                    {item.achievements.map((ach, i) => (
                      <li key={i}>
                        <FormattedText text={`• ${ach}`} className="text-foreground/90" />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Hackathons Section */}
        <div className="space-y-6 pt-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono text-amber-600 dark:text-amber-300">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Competitive Hackathons</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Hackathon Submissions & Track Recognitions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hackathonsData.map((hack) => (
              <div
                key={hack.id}
                className="glass-panel rounded-2xl p-6 sm:p-7 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">
                      {hack.track}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                      {hack.statusOrResult}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-foreground">
                      {hack.name}
                    </h4>
                    <p className="text-xs font-mono text-muted-foreground">
                      Project: <span className="text-cyan-600 dark:text-cyan-400">{hack.projectName}</span> • {hack.date}
                    </p>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Problem & Solution: </strong>
                    {hack.solution}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {hack.technologies.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-border flex items-center justify-between text-xs font-mono">
                  <Link
                    href={`/projects/${hack.projectSlug}`}
                    className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:underline"
                  >
                    <span>Inspect Hackathon Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  {hack.certificateUrl && (
                    <button
                      suppressHydrationWarning
                      onClick={() => openCertByTitle(hack.name, hack.certificateUrl)}
                      className="text-muted-foreground hover:text-foreground underline"
                    >
                      Certificate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Certificate Modal */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}
