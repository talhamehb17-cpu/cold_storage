"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import {
  fadeUp,
  revealMask,
  scaleIn,
  staggerParent,
  viewportOnce,
  viewportSoft,
} from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "mask" | "scale" | "fade";
  soft?: boolean;
  as?: "div" | "section" | "li" | "article" | "span";
};

/** Scroll-triggered reveal wrapper with a few tasteful presets. */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  soft = false,
  as = "div",
}: RevealProps) {
  const variants: Variants =
    variant === "mask" ? revealMask : variant === "scale" ? scaleIn : variant === "fade" ? fadeUp : fadeUp;

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={soft ? viewportSoft : viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Stagger container: children should each be wrapped in `RevealItem`. */
export function StaggerGroup({
  children,
  className,
  stagger = 0.09,
  delay = 0.05,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={staggerParent(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewportSoft}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  variant?: "up" | "mask" | "scale" | "fade";
}) {
  const variants: Variants =
    variant === "mask" ? revealMask : variant === "scale" ? scaleIn : fadeUp;
  return (
    <motion.div variants={variants} className={cn(className)}>
      {children}
    </motion.div>
  );
}
