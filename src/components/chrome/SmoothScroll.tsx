"use client";

import { useEffect } from "react";
import Lenis from "lenis";

import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

/**
 * Global smooth scrolling (Lenis) wired into GSAP's ticker so ScrollTrigger
 * and scrubbed animations stay perfectly in sync. Honours reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // Expose for anchor navigation / focus management.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onChange = () => {
      if (mq.matches) lenis.destroy();
    };
    mq.addEventListener("change", onChange);

    return () => {
      mq.removeEventListener("change", onChange);
      gsap.ticker.remove(raf);
      lenis.destroy();
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
    };
  }, []);

  return null;
}

/** Scroll an element into view using Lenis when available. */
export function scrollToTarget(target: string | HTMLElement, offset = 0) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: -offset, duration: 1.25 });
  } else {
    const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}
