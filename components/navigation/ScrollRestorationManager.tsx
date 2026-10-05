"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Manages clean, deterministic scroll positioning across the portfolio:
 * - Refresh (Reload) -> starts at top of current route
 * - New route navigation -> starts at top of destination route
 * - Logo click -> returns to Home and starts at top
 * - Browser Back/Forward -> preserves sensible browser history scroll position
 * - In-page hash anchors -> respected and preserved
 */
export function ScrollRestorationManager() {
  const pathname = usePathname();
  const isPopStateRef = useRef(false);
  const scrollPositionsRef = useRef<Record<string, number>>({});
  const prevPathnameRef = useRef<string>(pathname);

  // 1. Configure history restoration and reload handling
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Prevent default browser jump on reload before DOM finishes hydrating
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handlePopState = () => {
      isPopStateRef.current = true;
    };

    const handleScroll = () => {
      if (typeof window !== "undefined" && !window.location.hash) {
        scrollPositionsRef.current[window.location.pathname] = window.scrollY;
      }
    };

    // On page reload or fresh document load: ensure top of page
    if (window.performance) {
      const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
      const isReload = navEntries.length > 0 && navEntries[0].type === "reload";

      if (isReload && !window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    }

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 2. Deterministic route change scroll behavior
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isPopStateRef.current) {
      // Browser Back/Forward navigation -> restore saved position if recorded
      const savedPosition = scrollPositionsRef.current[pathname];
      if (typeof savedPosition === "number") {
        window.scrollTo({ top: savedPosition, left: 0, behavior: "instant" });
      }
      isPopStateRef.current = false;
    } else {
      // New route navigation (Link click) -> scroll to top unless hash anchor is present
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    }

    prevPathnameRef.current = pathname;
  }, [pathname]);

  return null;
}
