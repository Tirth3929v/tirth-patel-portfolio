"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Copy, 
  Check, 
  Send, 
  Sparkles, 
  ExternalLink 
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import confetti from "canvas-confetti";
import { profileData } from "@/data/profile";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    // Launch mailto client safely without backend dependency
    const mailtoUrl = `mailto:${profileData.socials.email}?subject=${encodeURIComponent(
      subject || "Opportunity / Academic Inquiry for Tirth Patel"
    )}&body=${encodeURIComponent(message)}`;

    window.location.href = mailtoUrl;
    setFormSubmitted(true);
    try {
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.8 } });
    } catch {}
  };

  return (
    <section id="contact" className="py-20 relative bg-grid-pattern border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Inquiries & Professional Links */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-600 dark:text-cyan-300">
                <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                <span>Get In Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Let&apos;s discuss AI engineering & graduate research.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Whether you are reaching out regarding AI engineering opportunities, distributed machine learning systems, or graduate academic research collaboration, my inbox is open.
              </p>
            </div>

            {/* Direct Connect Options */}
            <div className="space-y-3 pt-2">
              {/* Copy Email Button Card */}
              <div className="p-4 rounded-xl bg-card border border-border flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-muted-foreground">Primary Inquiries</div>
                    <div className="text-sm font-bold font-mono text-foreground">
                      {profileData.socials.email}
                    </div>
                  </div>
                </div>

                <button
                  suppressHydrationWarning
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors border border-border"
                  title="Copy email to clipboard"
                  aria-label="Copy Email"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* GitHub Link Card */}
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-card hover:bg-card-hover border border-border hover:border-cyan-500/30 transition-all flex items-center justify-between group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-foreground group-hover:text-cyan-500 transition-colors" />
                  <div>
                    <div className="text-xs font-bold text-foreground">GitHub Profile</div>
                    <div className="text-[11px] font-mono text-muted-foreground">/Tirth3929v</div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-cyan-500" />
              </a>

              {/* LinkedIn Link Card */}
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-card hover:bg-card-hover border border-border hover:border-cyan-500/30 transition-all flex items-center justify-between group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-sky-500 group-hover:text-sky-400 transition-colors" />
                  <div>
                    <div className="text-xs font-bold text-foreground">LinkedIn</div>
                    <div className="text-[11px] font-mono text-muted-foreground">/in/tirth-patel-ai</div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-sky-500" />
              </a>
            </div>

          </div>

          {/* Right Column: Mailto Client Form */}
          <div className="lg:col-span-6">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-500" />
                  <span>Draft a Direct Message</span>
                </h3>
                <p className="text-xs text-muted-foreground font-mono">
                  Generates an RFC-compliant mailto package directly in your preferred email client.
                </p>
              </div>

              <form onSubmit={handleSendMail} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Master's Admissions Inquiry / AI Engineering Role"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    suppressHydrationWarning
                    className="w-full px-3.5 py-2.5 rounded-xl bg-input border border-input-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500 font-mono shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                    Message Body
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your inquiry, project scope, or opportunity..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    suppressHydrationWarning
                    className="w-full px-3.5 py-2.5 rounded-xl bg-input border border-input-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500 font-mono shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  suppressHydrationWarning
                  className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Open in Mail Client</span>
                </button>

                {formSubmitted && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono text-center">
                    ✓ Mail client initiated! Thank you for reaching out.
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
