"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "onDark" | "onDarkGhost";
type ButtonSize = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold tracking-tight transition-[transform,box-shadow,border-color,background-color,color] duration-300 will-change-transform";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-ink-900 text-white shadow-[0_18px_42px_-18px_rgba(8,32,60,0.75)] hover:shadow-[0_24px_56px_-16px_rgba(11,69,112,0.8)] hover:bg-ink-800",
  secondary:
    "border border-ink-900/15 bg-white/70 text-ink-800 backdrop-blur-md hover:border-ice-500/50 hover:text-ice-700 hover:shadow-[0_18px_44px_-22px_rgba(11,69,112,0.5)]",
  ghost: "text-ink-800 hover:text-ice-700",
  onDark:
    "bg-white text-ink-900 shadow-[0_18px_42px_-18px_rgba(255,255,255,0.35)] hover:bg-ice-50 hover:shadow-[0_24px_56px_-16px_rgba(69,173,236,0.55)]",
  onDarkGhost:
    "border border-white/25 bg-white/5 text-white backdrop-blur-md hover:border-glow-400/70 hover:bg-white/10",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-[0.82rem]",
  md: "px-7 py-3.5 text-[0.92rem]",
  lg: "px-9 py-4.5 text-[1rem] py-[1.15rem]",
};

export type MagneticButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  /** Extra glow highlight sweeping across the fill on hover. */
  sheen?: boolean;
  ariaLabel?: string;
  dataCursor?: string;
};

/**
 * Premium magnetic button — subtle pull toward the cursor, sheen sweep,
 * and accessible focus ring. Falls back to a plain button on touch/reduced-motion.
 */
export function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  onClick,
  type = "button",
  disabled,
  className,
  sheen = true,
  ariaLabel,
  dataCursor = "hover",
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 22, mass: 0.35 });
  const sy = useSpring(my, { stiffness: 260, damping: 22, mass: 0.35 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    mx.set(dx * 0.22);
    my.set(dy * 0.3);
  };

  const onLeave = () => {
    setHovered(false);
    mx.set(0);
    my.set(0);
  };

  const inner = (
    <span
      className={cn(
        base,
        variants[variant],
        sizes[size],
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      {/* Sheen sweep */}
      {sheen && (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 -left-1/3 w-1/2 -skew-x-12 blur-[2px] transition-transform duration-700",
            variant === "primary" || variant === "onDark"
              ? "bg-gradient-to-r from-transparent via-white/40 to-transparent"
              : "bg-gradient-to-r from-transparent via-ice-300/40 to-transparent",
            hovered ? "translate-x-[280%]" : "translate-x-0",
          )}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </span>
  );

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={onLeave}
      data-cursor={dataCursor}
      className="inline-block"
    >
      {href ? (
        external ? (
          <a href={href} aria-label={ariaLabel} target="_blank" rel="noreferrer">
            {inner}
          </a>
        ) : (
          <Link href={href} aria-label={ariaLabel} onClick={onClick}>
            {inner}
          </Link>
        )
      ) : (
        <button type={type} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
