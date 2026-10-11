"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { HudLabel, TextReveal } from "./Text";
import { Reveal } from "./Reveal";

/**
 * Section shell — consistent rhythm, container widths and anchor handling.
 */
export function Section({
  id,
  children,
  className,
  tone = "light",
  container = "wide",
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "frost" | "navy" | "deep";
  container?: "wide" | "narrow" | "full";
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative scroll-mt-28",
        tone === "light" && "bg-white text-ink-800",
        tone === "frost" && "bg-frost text-ink-800",
        tone === "navy" && "bg-ink-900 text-white",
        tone === "deep" && "bg-ink-950 text-white",
        className,
      )}
    >
      <div
        className={cn(
          container === "wide" && "mx-auto w-full max-w-[92rem] px-6 sm:px-10 lg:px-16",
          container === "narrow" && "mx-auto w-full max-w-6xl px-6 sm:px-10",
          container === "full" && "w-full",
        )}
      >
        {children}
      </div>
    </section>
  );
}

/**
 * Editorial section header: HUD kicker → oversized display headline → support.
 */
export function SectionHeader({
  kicker,
  title,
  titleAccent,
  description,
  align = "left",
  tone = "navy",
  className,
  id,
}: {
  kicker: string;
  title: string;
  titleAccent?: string;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "navy" | "white";
  className?: string;
  id?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal variant="up">
        <HudLabel tone={tone === "white" ? "ice" : "navy"}>{kicker}</HudLabel>
      </Reveal>

      <TextReveal
        as="h2"
        className={cn(
          "display-lg text-[clamp(2.35rem,5.6vw,4.9rem)]",
          tone === "white" ? "text-metal-frost" : "text-metal-navy",
        )}
      >
        {title}
      </TextReveal>

      {titleAccent && (
        <Reveal variant="up" delay={0.12}>
          <p
            className={cn(
              "display-md text-[clamp(1.35rem,2.6vw,2.15rem)]",
              tone === "white" ? "text-glow-300/90" : "text-ice-600",
            )}
          >
            {titleAccent}
          </p>
        </Reveal>
      )}

      {description && (
        <Reveal variant="up" delay={0.16}>
          <div
            className={cn(
              "max-w-2xl text-[1.02rem] leading-[1.8] sm:text-[1.12rem]",
              tone === "white" ? "text-ink-200/90" : "text-ink-500",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </div>
        </Reveal>
      )}
    </div>
  );
}

/** Thin technical rule with optional end labels. */
export function HudRule({
  left,
  right,
  className,
  tone = "navy",
}: {
  left?: string;
  right?: string;
  className?: string;
  tone?: "navy" | "white";
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {left && (
        <span className={cn("hud-sm whitespace-nowrap", tone === "white" ? "text-white/45" : "text-ink-400")}>
          {left}
        </span>
      )}
      <span className={cn("h-[1px] flex-1", tone === "white" ? "bg-white/15" : "bg-hairline")} />
      {right && (
        <span className={cn("hud-sm whitespace-nowrap", tone === "white" ? "text-white/45" : "text-ink-400")}>
          {right}
        </span>
      )}
    </div>
  );
}
