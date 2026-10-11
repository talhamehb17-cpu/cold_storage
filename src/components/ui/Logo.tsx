import { cn } from "@/lib/utils";

/**
 * Brand mark — isometric cold-chain crystal + wordmark.
 * Pure SVG so it stays razor sharp at any size.
 */
export function Logo({
  tone = "navy",
  className,
  compact = false,
}: {
  tone?: "navy" | "white";
  className?: string;
  compact?: boolean;
}) {
  const dark = tone === "white";
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      {/* Mark */}
      <svg
        width="38"
        height="38"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <rect
          x="1"
          y="1"
          width="46"
          height="46"
          rx="12"
          fill={dark ? "rgba(255,255,255,0.08)" : "#0a1728"}
          stroke={dark ? "rgba(255,255,255,0.22)" : "rgba(10,23,40,0.08)"}
          strokeWidth="1"
        />
        {/* Crystal */}
        <path
          d="M24 8.5 L34.5 14.6 L34.5 27.4 L24 33.5 L13.5 27.4 L13.5 14.6 Z"
          fill={dark ? "rgba(95,230,245,0.14)" : "rgba(24,144,214,0.12)"}
          stroke={dark ? "#8beef9" : "#1890d6"}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* Snowflake star */}
        <g stroke={dark ? "#ffffff" : "#0a1728"} strokeWidth="1.5" strokeLinecap="round">
          <path d="M24 14.6 V27.4" />
          <path d="M18.1 18.0 L29.9 24.0" />
          <path d="M29.9 18.0 L18.1 24.0" />
          <path d="M24 14.6 l-2.2 2.1 M24 14.6 l2.2 2.1" />
          <path d="M24 27.4 l-2.2-2.1 M24 27.4 l2.2-2.1" />
        </g>
        {/* Base bar */}
        <rect x="16" y="36.5" width="16" height="3" rx="1.5" fill={dark ? "#8beef9" : "#1890d6"} opacity="0.85" />
      </svg>

      {!compact && (
        <span className="flex flex-col leading-tight">
          <span
            className={cn(
              "font-display text-[0.95rem] font-bold uppercase leading-none tracking-[0.14em]",
              dark ? "text-white" : "text-ink-900",
            )}
          >
            Tahseen Jaber
          </span>
          <span
            className={cn(
              "hud-sm mt-[0.32rem] leading-none",
              dark ? "text-white/55" : "text-ink-500",
            )}
          >
            Cold Storage &amp; Logistics
          </span>
        </span>
      )}
    </span>
  );
}
