"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";

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

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = localStorage.getItem("tirth-portfolio-theme");
    return stored === "light" || stored === "dark" ? stored : "dark";
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
  React.useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

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
