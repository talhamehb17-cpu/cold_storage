"use client";

import { useMemo } from "react";

import { cn, seededRandom } from "@/lib/utils";

/**
 * Lightweight CSS/SVG frost particle field — zero JS animation cost,
 * auto-simplified on small screens and disabled for reduced motion.
 */
export function FrostParticles({
  className,
  count = 26,
  tone = "white",
  id = "frost",
}: {
  className?: string;
  count?: number;
  tone?: "white" | "ice";
  id?: string;
}) {
  const particles = useMemo(() => {
    const rnd = seededRandom(id.split("").reduce((a, c) => a + c.charCodeAt(0), 7) * 97);
    return Array.from({ length: count }, (_, i) => {
      const size = 1.6 + rnd() * 3.6;
      return {
        key: i,
        left: `${rnd() * 100}%`,
        top: `${rnd() * 100}%`,
        size,
        duration: `${14 + rnd() * 22}s`,
        delay: `${-rnd() * 26}s`,
        drift: `${(rnd() - 0.5) * 60}px`,
        opacity: 0.18 + rnd() * 0.5,
      };
    });
  }, [count, id]);

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {particles.map((p) => (
        <span
          key={p.key}
          className="absolute rounded-full animate-frost-drift motion-reduce:hidden"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background:
              tone === "white"
                ? "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%)"
                : "radial-gradient(circle, rgba(139,238,249,0.95) 0%, rgba(69,173,236,0) 70%)",
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/** Soft drifting mist band used on dark sections. */
export function MistBand({ className, flipped = false }: { className?: string; flipped?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 h-[42%] animate-mist motion-reduce:hidden",
        flipped ? "bottom-0" : "top-0",
        className,
      )}
      style={{
        background: flipped
          ? "radial-gradient(70% 100% at 50% 100%, rgba(155,214,248,0.16) 0%, rgba(155,214,248,0) 72%)"
          : "radial-gradient(70% 100% at 50% 0%, rgba(155,214,248,0.14) 0%, rgba(155,214,248,0) 72%)",
        filter: "blur(6px)",
      }}
    />
  );
}
