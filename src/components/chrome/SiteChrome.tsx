"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { CustomCursor } from "./CustomCursor";
import { ScrollProgress } from "./ScrollProgress";
import { SmoothScroll } from "./SmoothScroll";

/**
 * Persistent, page-level chrome: smooth scrolling, scroll progress and cursor.
 * Mounted once around the entire app so auth pages inherit the same feel.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Reset scroll position on route change (login ⇄ signup).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
      {children}
    </>
  );
}
