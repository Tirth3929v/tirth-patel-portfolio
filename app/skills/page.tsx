import React from "react";
import { Metadata } from "next";
import { SkillsSection } from "@/components/skills/SkillsSection";

export const metadata: Metadata = {
  title: "Skills & Technical Competency Architecture | Tirth Patel - AI Engineer",
  description:
    "Comprehensive technical competency matrix of Tirth Patel: Machine Learning, Python systems, backend architectures, databases, and DevOps practices.",
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-background bg-grid-pattern">
      <SkillsSection />
    </div>
  );
}
