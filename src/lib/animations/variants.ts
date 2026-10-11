"use client";

import type { Transition, Variants } from "framer-motion";

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const springSoft: Transition = { type: "spring", stiffness: 220, damping: 30, mass: 0.8 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

export const revealMask: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)", y: 14 },
  show: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    y: 0,
    transition: { duration: 0.85, ease: EASE_OUT },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE_OUT } },
};

export const staggerParent = (stagger = 0.08, delayChildren = 0.05): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Default viewport config for scroll-triggered reveals. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
export const viewportSoft = { once: true, amount: 0.15 } as const;
