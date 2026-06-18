"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

interface TextScrambleProps {
  text: string;
  className?: string;
  /**
   * Classes applied to the inner text span. Override to match the host
   * surface's typography (e.g. a small mono wordmark in a nav). Default
   * preserves the supplied component's original styling so other consumers
   * can drop it in unchanged.
   */
  textClassName?: string;
}

export function TextScramble({
  text,
  className = "",
  textClassName = "font-mono text-lg tracking-widest uppercase",
}: TextScrambleProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const frameRef = useRef(0);

  const scramble = useCallback(() => {
    // Reduced motion: the underline crossfade still carries the hover state;
    // the per-character scramble is suppressed entirely.
    if (prefersReducedMotion) return;
    setIsScrambling(true);
    frameRef.current = 0;
    const duration = text.length * 3;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      frameRef.current++;

      const progress = frameRef.current / duration;
      const revealedLength = Math.floor(progress * text.length);

      const newText = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealedLength) return text[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(newText);

      if (frameRef.current >= duration) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 30);
  }, [text, prefersReducedMotion]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    scramble();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      className={`group relative inline-flex flex-col cursor-pointer select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={`relative ${textClassName}`}>
        {displayText.split("").map((char, i) => (
          <span
            key={i}
            className={`inline-block transition-all duration-150 ${
              isScrambling && char !== text[i]
                ? "text-primary scale-110"
                : "text-foreground"
            }`}
            style={{
              transitionDelay: `${i * 10}ms`,
            }}
          >
            {char}
          </span>
        ))}
      </span>

      {/* Animated underline */}
      <span className="relative mt-2 h-px w-full overflow-hidden">
        <span
          className={`absolute inset-0 origin-left bg-foreground transition-transform duration-500 ease-out ${
            isHovering ? "scale-x-100" : "scale-x-0"
          }`}
        />
        <span className="absolute inset-0 bg-border" />
      </span>

      {/* Subtle glow on hover */}
      <span
        className={`absolute -inset-4 -z-10 rounded-lg bg-primary/5 transition-opacity duration-300 ${
          isHovering ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
