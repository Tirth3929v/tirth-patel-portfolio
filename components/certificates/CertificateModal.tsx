"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  FileText, 
  ExternalLink, 
  ShieldCheck, 
  FileCheck 
} from "lucide-react";
import { CertificationItem } from "@/data/certifications";

interface CertificateModalProps {
  certificate: CertificationItem | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  const [zoom, setZoom] = useState(1);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  // Lock body scroll, listen for Escape key, and set initial focus
  useEffect(() => {
    if (!certificate) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Set initial focus to close button for keyboard accessibility
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoom(1);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-3 h-3" />
            <span>Verified</span>
          </span>
        );
      case "Official Certificate":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30">
            <FileCheck className="w-3 h-3" />
            <span>Official Certificate</span>
          </span>
        );
      case "Document":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            <FileText className="w-3 h-3" />
            <span>Official Document / Letter</span>
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground border border-border">
            {status}
          </span>
        );
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate: ${certificate.title}`}
    >
      <div 
        className="w-full max-w-3xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col text-card-foreground animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/60">
          <div className="space-y-0.5 max-w-[80%]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase">
                {certificate.issuer}
              </span>
              {getStatusBadge(certificate.verificationStatus)}
            </div>
            <h3 className="text-sm sm:text-base font-bold text-foreground truncate">
              {certificate.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {certificate.certificateFile && (
              <a
                href={certificate.certificateFile}
                download
                className="p-1.5 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title="Download Document PDF"
                aria-label="Download Document"
              >
                <Download className="w-4 h-4" />
              </a>
            )}

            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="p-1.5 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Viewer Canvas */}
        <div className="relative p-4 sm:p-6 bg-muted/20 min-h-[380px] max-h-[70vh] flex items-center justify-center overflow-auto">
          {certificate.previewImage ? (
            <div 
              className="transition-transform duration-150 origin-center flex items-center justify-center shadow-lg rounded-lg overflow-hidden border border-border"
              style={{ transform: `scale(${zoom})` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={certificate.previewImage}
                alt={certificate.title}
                className="max-h-[60vh] max-w-full object-contain rounded-lg"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
              <FileText className="w-12 h-12 text-muted-foreground/60" />
              <p className="text-sm font-mono text-muted-foreground">
                Certificate document not added
              </p>
              {certificate.credentialUrl && (
                <a
                  href={certificate.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-mono font-medium"
                >
                  <span>Verify on Issuer Platform</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

          {/* Floating Zoom Controls (when image is present) */}
          {certificate.previewImage && (
            <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-card/90 border border-border rounded-lg p-1 backdrop-blur-md shadow-lg">
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 0.75}
                className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
                title="Zoom Out"
                aria-label="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono text-muted-foreground px-1 select-none">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoom >= 2.5}
                className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
                title="Zoom In"
                aria-label="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors ml-1 border-l border-border pl-2"
                title="Reset Zoom"
                aria-label="Reset Zoom"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer / Verification Metadata */}
        <div className="px-6 py-3.5 border-t border-border flex flex-wrap items-center justify-between gap-3 bg-muted/60 text-xs font-mono text-muted-foreground">
          <div className="flex flex-wrap items-center gap-3">
            <span>Issue Date: <strong className="text-foreground">{certificate.issueDate}</strong></span>
            {certificate.credentialId && (
              <span className="hidden sm:inline">
                ID: <code className="text-foreground">{certificate.credentialId}</code>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {certificate.credentialUrl && (
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                <span>External Record</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
