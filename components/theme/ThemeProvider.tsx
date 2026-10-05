"use client";

import React, { createContext, useContext, useSyncExternalStore, useEffect } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined" || !window.matchMedia) return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = localStorage.getItem("tirth-portfolio-theme");
    if (stored === "light" || stored === "dark") return stored;
    return getSystemTheme();
  } catch {
    return "dark";
  }
}

function getThemeServerSnapshot(): Theme {
  return "dark";
}

function applyThemeToDOM(t: Theme) {
  if (typeof document !== "undefined") {
    const root = document.documentElement;
    if (t === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      root.style.colorScheme = "light";
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
      root.setAttribute("data-theme", "dark");
      root.style.colorScheme = "dark";
    }
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getThemeServerSnapshot);

  // Synchronize external DOM system with theme state
  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  // Listen to OS prefers-color-scheme changes when user hasn't overridden
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handleSystemChange = () => {
      const stored = localStorage.getItem("tirth-portfolio-theme");
      if (!stored) {
        emitChange();
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("tirth-portfolio-theme", next);
    } catch {}
    applyThemeToDOM(next);
    emitChange();
  };

  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem("tirth-portfolio-theme", newTheme);
    } catch {}
    applyThemeToDOM(newTheme);
    emitChange();
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
