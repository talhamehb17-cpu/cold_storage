import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation. */
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Remap a value from one range to another with optional clamping. */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  clamped = true,
) {
  if (inMax === inMin) return outMin;
  let t = (value - inMin) / (inMax - inMin);
  if (clamped) t = clamp(t, 0, 1);
  return outMin + (outMax - outMin) * t;
}

/** Deterministic pseudo random in [0,1) — used for generated particle fields. */
export function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export type Bounds = { top: number; bottom: number; height: number };

export function emptyBounds(): Bounds {
  return { top: 0, bottom: 0, height: 1 };
}

/** Map a scroll position to 0 → 1 progress through an element's bounds. */
export function boundsProgress(bounds: Bounds, scrollY: number) {
  return clamp((scrollY - bounds.top) / Math.max(bounds.height, 1), 0, 1);
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
