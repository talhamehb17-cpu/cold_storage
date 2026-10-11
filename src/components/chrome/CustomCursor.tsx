"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type CursorState = "default" | "hover" | "visual" | "text";

/**
 * Minimal custom cursor — desktop pointers only.
 * Disabled entirely on touch devices and for reduced-motion users.
 */
export function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const stateRef = useRef<CursorState>("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.55 });

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      const hit = target?.closest("[data-cursor]") as HTMLElement | null;
      const next: CursorState = (hit?.dataset.cursor as CursorState) ?? "default";
      if (next !== stateRef.current) {
        stateRef.current = next;
        setState(next);
      }
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  const ringSize =
    state === "visual" ? 84 : state === "hover" ? 56 : state === "text" ? 34 : 32;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120] hidden lg:block">
      {/* Ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className={cn(
          "fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,border-color,background-color,opacity] duration-300",
          state === "visual" && "border-glow-400/40 bg-ice-500/10",
          state === "hover" && "border-ice-500/60 bg-ice-400/10",
          state === "default" && "border-ink-800/25 bg-transparent",
          !visible && "opacity-0",
        )}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      />
      {/* Dot */}
      <motion.div
        style={{ x, y }}
        className={cn(
          "fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full",
          state === "hover" || state === "visual" ? "bg-ice-500" : "bg-ink-900",
          !visible && "opacity-0",
        )}
        animate={{
          width: pressed ? 5 : state === "visual" ? 7 : 6,
          height: pressed ? 5 : state === "visual" ? 7 : 6,
          scale: pressed ? 0.8 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.18 }}
      />
    </div>
  );
}
