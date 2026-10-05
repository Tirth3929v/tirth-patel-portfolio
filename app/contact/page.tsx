import React from "react";
import { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact & Research Inquiries | Tirth Patel - AI Engineer",
  description: "Direct email contact and academic research inquiries for Tirth Patel.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-background bg-grid-pattern">
      <ContactSection />
    </div>
  );
}
