import React from "react";
import { Metadata } from "next";
import { ExperienceSection } from "@/components/experience/ExperienceSection";

export const metadata: Metadata = {
  title: "Experience & Hackathons | Tirth Patel - AI Engineer",
  description: "Industry engineering internship at UptoSkills, hackathon submissions, and backend microservice milestones.",
};

export default function ExperiencePage() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-background bg-grid-pattern">
      <ExperienceSection />
    </div>
  );
}
