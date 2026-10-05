"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.25,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      className="flex-1 flex flex-col w-full"
    >
      {children}
    </motion.div>
  );
}
