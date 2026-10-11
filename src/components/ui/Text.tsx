"use client";

import { motion } from "framer-motion";
import { createElement, type ReactNode, type Ref, useRef } from "react";

import { EASE_OUT } from "@/lib/animations/variants";
import { cn, prefersReducedMotion } from "@/lib/utils";

/**
 * Word-by-word editorial text reveal (blur → sharp). Fires once in view.
 * Uses `whileInView` on each word (same mechanism as Reveal) and
 * respects reduced-motion by rendering the text statically.
 */
export function TextReveal({
  children,
  className,
  id,
  delay = 0,
  duration = 0.62,
  stagger = 0.052,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = typeof window !== "undefined" && prefersReducedMotion();

  const text = String(children);
  const words = text.split(/\s+/);

  return createElement(
    as,
    { ref: ref as Ref<HTMLDivElement>, className: cn("relative", className), id, "aria-label": text },
    <span aria-hidden className="inline">
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={reduce ? undefined : { opacity: 0, y: "0.85em" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration, ease: EASE_OUT, delay: delay + i * stagger }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>,
  );
}

/** Small uppercase technical label with an optional leading tick. */
export function HudLabel({
  children,
  tone = "navy",
  tick = true,
  className,
}: {
  children: ReactNode;
  tone?: "navy" | "ice" | "white" | "muted";
  tick?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "hud inline-flex items-center gap-2.5",
        tone === "navy" && "text-ice-800",
        tone === "ice" && "text-glow-300",
        tone === "white" && "text-white/85",
        tone === "muted" && "text-ink-500",
        className,
      )}
    >
      {tick && (
        <span
          aria-hidden
          className={cn(
            "inline-block h-[1px] w-7",
            tone === "ice" || tone === "white" ? "bg-glow-400/80" : "bg-ice-500/70",
          )}
        />
      )}
      {children}
    </span>
  );
}
