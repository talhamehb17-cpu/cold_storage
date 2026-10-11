"use client";

import { motion } from "framer-motion";

import { EASE_OUT } from "@/lib/animations/variants";

/**
 * Route template for /login ⇄ /signup — plays a subtle branded
 * glass-slide transition whenever the route changes.
 */
export default function AuthTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 36, filter: "blur(12px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: -24, filter: "blur(12px)" }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
