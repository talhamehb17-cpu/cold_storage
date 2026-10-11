"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Image with a fixed aspect box (prevents CLS), frosted skeleton while
 * loading, and an optional zoom-on-hover treatment.
 */
export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  ratio = "aspect-[3/2]",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  hoverZoom = true,
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
  hoverZoom?: boolean;
  objectPosition?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      data-cursor="visual"
      className={cn(
        "group/img relative overflow-hidden bg-ink-900/10",
        ratio,
        className,
      )}
    >
      {/* Skeleton shimmer */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-ink-100 via-white/60 to-ink-100 transition-opacity duration-700",
          loaded ? "opacity-0" : "opacity-100",
        )}
      >
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent" />
      </div>

      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        onLoadingComplete={() => setLoaded(true)}
        className={cn(
          "object-cover transition-[transform,opacity] duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]",
          loaded ? "opacity-100" : "opacity-0",
          hoverZoom && "group-hover/img:scale-[1.055]",
          imgClassName,
        )}
        style={{ objectPosition }}
      />

      {/* Frost frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 mix-blend-overlay"
      />
    </div>
  );
}
