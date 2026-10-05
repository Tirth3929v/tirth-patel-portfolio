import React from "react";

interface FormattedTextProps {
  text: string;
  className?: string;
  highlightClassName?: string;
}

/**
 * Parses markdown bold (**term**) into semantically highlighted typography tokens.
 * Allows visitors to instantly scan technical concepts, algorithms, frameworks, and outcomes.
 */
export function FormattedText({
  text,
  className = "text-muted-foreground",
  highlightClassName = "font-semibold text-cyan-900 dark:text-cyan-200 bg-cyan-500/10 dark:bg-cyan-500/15 px-1 py-0.5 rounded text-[0.95em]",
}: FormattedTextProps) {
  if (!text) return null;

  // Split by markdown bold syntax **term**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          const content = part.slice(2, -2);
          return (
            <strong key={index} className={highlightClassName}>
              {content}
            </strong>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}
