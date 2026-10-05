"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Terminal, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  FileDown, 
  Search 
} from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";
import { MAIN_NAV_ITEMS, NavItem } from "@/data/navigation";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  // Track window scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock body scroll and listen for Escape key on mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Deterministic, route-first active link detection from CURRENT ROUTE
  const isLinkActive = (link: NavItem): boolean => {
    if (link.href === "/") {
      return pathname === "/";
    }
    return pathname === link.href || pathname.startsWith(link.href + "/");
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const openCommandPalette = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
    );
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled 
          ? "bg-nav-bg backdrop-blur-md border-b border-nav-border shadow-xs py-2.5" 
          : "bg-nav-bg/75 backdrop-blur-sm py-3.5 border-b border-nav-border/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand / Logo - Always returns to Home and scrolls to top */}
        <Link 
          href="/" 
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2.5 group focus:outline-none cursor-pointer"
          aria-label="Tirth Patel - Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-sm shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
              Tirth Patel
            </span>
            <span className="text-[10px] font-mono text-primary -mt-1 tracking-wider uppercase font-semibold">
              AI Engineer
            </span>
          </div>
        </Link>

        {/* Standardized Desktop Navigation with ONE unified active indicator */}
        <nav 
          aria-label="Primary"
          className="hidden lg:flex items-center gap-1 bg-nav-pill-bg border border-nav-pill-border px-1.5 py-1 rounded-full backdrop-blur-md shadow-xs"
        >
          {MAIN_NAV_ITEMS.map((link) => {
            const active = isLinkActive(link);

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className={`relative px-3.5 py-1.5 rounded-full text-xs transition-colors duration-200 z-10 select-none ${
                  active 
                    ? "text-nav-link-active font-bold" 
                    : "text-nav-link hover:text-nav-link-hover hover:bg-nav-link-hover-bg font-medium"
                }`}
              >
                {/* ONE single shared active indicator with smooth non-bouncing transition */}
                {active && (
                  <motion.div
                    layoutId="active-nav"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.22,
                            ease: [0.25, 0.1, 0.25, 1.0],
                          }
                    }
                    className="absolute inset-0 rounded-full bg-nav-active-pill-bg border border-nav-active-pill-border shadow-xs -z-10"
                  />
                )}

                <span className="relative z-10 whitespace-nowrap">
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Action Buttons (lg and above only) */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Command Palette Button */}
          <button
            onClick={openCommandPalette}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-nav-button-border bg-nav-button-bg text-xs text-nav-button-text hover:text-nav-button-hover-text hover:border-nav-button-hover-border transition-colors duration-200 font-mono shadow-xs cursor-pointer min-h-[36px]"
            title="Open Command Palette"
            aria-label="Open Command Palette"
          >
            <Search className="w-3.5 h-3.5 text-primary" />
            <span className="font-medium">Command</span>
            <kbd className="text-[10px] bg-muted px-1 py-0.5 rounded text-muted-foreground border border-border font-semibold">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-nav-button-border bg-nav-button-bg text-nav-button-text hover:text-primary hover:border-nav-button-hover-border transition-colors duration-200 shadow-xs cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
            aria-label="Toggle Theme"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-primary" />}
          </button>

          {/* Resume Download CTA */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors duration-200 shadow-sm shadow-cyan-500/20 focus:outline-none min-h-[36px]"
            title="Download Resume PDF"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile & Tablet Action Bar (< lg) */}
        <div className="flex items-center gap-1.5 lg:hidden">
          {/* Mobile Command Palette Trigger */}
          <button
            onClick={openCommandPalette}
            className="p-2 rounded-lg border border-nav-button-border bg-nav-button-bg text-nav-button-text hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Open Search Command Palette"
            title="Search"
          >
            <Search className="w-4 h-4 text-primary" />
          </button>

          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-nav-button-border bg-nav-button-bg text-nav-button-text min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle Dark and Light Theme"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-primary" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-nav-button-border bg-nav-button-bg text-nav-button-text hover:text-nav-button-hover-text transition-colors duration-200 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle Mobile Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation-menu"
          role="region"
          aria-label="Mobile Navigation"
          className="lg:hidden fixed inset-x-0 top-[56px] bg-nav-bg backdrop-blur-2xl border-b border-nav-border p-4 space-y-3 animate-in slide-in-from-top-4 duration-200 shadow-2xl max-h-[calc(100vh-60px)] overflow-y-auto"
        >
          <div className="grid grid-cols-2 gap-2">
            {MAIN_NAV_ITEMS.map((link) => {
              const active = isLinkActive(link);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`px-3 py-2.5 rounded-lg text-xs font-mono transition-colors min-h-[44px] flex items-center ${
                    active
                      ? "bg-nav-active-pill-bg text-nav-link-active border border-nav-active-pill-border font-bold"
                      : "text-nav-link hover:text-nav-link-hover hover:bg-nav-link-hover-bg font-medium bg-card/60 border border-border/40"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-nav-border flex flex-wrap items-center justify-between gap-2">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs min-h-[44px]"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
            <span className="text-[11px] font-mono text-muted-foreground">
              BCA • AI Engineer
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
