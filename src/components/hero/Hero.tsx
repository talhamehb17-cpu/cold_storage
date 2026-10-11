"use client";

import Image from "next/image";
import { useRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils";
import { FrostParticles, MistBand } from "@/components/ui/FrostParticles";
import { MagneticButton } from "@/components/ui/Button";
import { scrollToTarget } from "@/components/chrome/SmoothScroll";

const TICKER_ITEMS = [
  "Continuous temperature monitoring",
  "Refrigerated storage",
  "Controlled dock handling",
  "Temperature-controlled transport",
  "Inventory visibility",
  "Cold-chain operations",
  "24/7 facility oversight",
];

/**
 * CINEMATIC HERO
 * Layered image reveal, frost atmosphere, animated temperature HUD and
 * an editorial headline sequence — then subtle scroll parallax.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // ---------- Entrance sequence ----------
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero-image]",
        {
          clipPath: "inset(12% 5% 12% 5% round 18px)",
          scale: 1.16,
          filter: "brightness(0.4) saturate(0.7)",
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          scale: 1,
          filter: "brightness(1) saturate(1)",
          duration: reduce ? 0 : 1.65,
          ease: "expo.out",
        },
        0,
      )
        .from("[data-hero-scrim]", { opacity: 0, duration: reduce ? 0 : 1.2 }, 0.35)
        .from(
          "[data-hero-hud]",
          { y: 26, opacity: 0, duration: reduce ? 0 : 0.9 },
          reduce ? 0 : 0.75,
        )
        .from(
          "[data-hero-line] > span",
          { yPercent: 112, duration: reduce ? 0 : 1.05, stagger: 0.1, ease: "expo.out" },
          reduce ? 0 : 0.55,
        )
        .from(
          "[data-hero-support]",
          { y: 22, opacity: 0, duration: reduce ? 0 : 0.85 },
          reduce ? 0 : 0.95,
        )
        .from(
          "[data-hero-cta]",
          { y: 18, opacity: 0, duration: reduce ? 0 : 0.75, stagger: 0.09 },
          reduce ? 0 : 1.1,
        )
        .from(
          "[data-hero-bottom]",
          { y: 18, opacity: 0, duration: reduce ? 0 : 0.8 },
          reduce ? 0 : 1.3,
        );

      // ---------- Temperature HUD counter ----------
      const counter = { value: 0 };
      const numEl = document.querySelector<HTMLElement>("[data-hero-temp]");
      const barEl = document.querySelector<HTMLElement>("[data-hero-temp-bar]");
      if (numEl) {
        tl.to(
          counter,
          {
            value: -18,
            duration: reduce ? 0 : 1.8,
            ease: "power2.inOut",
            onUpdate: () => {
              const v = counter.value;
              numEl.textContent = `${v <= -0.05 ? "" : ""}${v.toFixed(1)}`;
              if (barEl) barEl.style.width = `${Math.min(100, Math.abs(v) * (100 / 24))}%`;
            },
          },
          reduce ? 0 : 0.85,
        );
      }

      // ---------- Scroll parallax ----------
      if (!reduce) {
        const section = root.current;
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          animation: gsap
            .timeline()
            .to("[data-hero-image]", { yPercent: 14, scale: 1.08, ease: "none" }, 0)
            .to("[data-hero-copy]", { yPercent: -10, opacity: 0.25, ease: "none" }, 0)
            .to("[data-hero-hud]", { yPercent: -34, opacity: 0, ease: "none" }, 0)
            .to("[data-hero-vignette]", { opacity: 0.85, ease: "none" }, 0),
        });
      }
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      aria-label="Tahseen Jaber Cold Storage & Logistics — premium cold storage and temperature-controlled logistics in Baghdad, Iraq"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink-950 text-white"
    >
      {/* ============ LAYER 1 — Facility image ============ */}
      <div data-hero-image className="absolute inset-0 will-change-transform">
        <Image
          src="/images/hero-facility.jpg"
          alt="Modern cold-storage facility at night with refrigerated trailers at the loading docks and cold mist across the yard"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[52%_58%]"
        />
      </div>

      {/* ============ LAYER 2 — Scrims ============ */}
      <div data-hero-scrim aria-hidden className="absolute inset-0">
        {/* Left readability column */}
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(5,13,25,0.92)_0%,rgba(5,13,25,0.62)_34%,rgba(5,13,25,0.18)_62%,rgba(5,13,25,0.34)_100%)]" />
        {/* Top (nav) + bottom (ticker) fades */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-ink-950/85 via-ink-950/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink-950 via-ink-950/55 to-transparent" />
        {/* Cool grade */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_85%_15%,rgba(24,144,214,0.22)_0%,rgba(5,13,25,0)_55%)] mix-blend-screen" />
      </div>

      {/* ============ LAYER 3 — Atmosphere ============ */}
      <MistBand flipped className="h-[38%] opacity-80" />
      <FrostParticles id="hero-frost" count={30} />
      <div
        data-hero-vignette
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ boxShadow: "inset 0 0 220px 60px rgba(5,13,25,0.75)" }}
      />
      {/* Technical grid */}
      <div aria-hidden className="grid-lines-dark-layer absolute inset-0 opacity-[0.35] mix-blend-overlay" />

      {/* ============ CONTENT ============ */}
      <div className="relative z-10 mx-auto flex w-full max-w-[92rem] flex-1 flex-col px-6 pb-28 pt-32 sm:px-10 sm:pt-36 lg:px-16 lg:pb-32 lg:pt-40">
        <div className="flex flex-1 items-center">
          <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.62fr)] lg:gap-8">
            {/* ---- Copy ---- */}
            <div data-hero-copy className="max-w-[52rem]">
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-glow-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-glow-400" />
                </span>
                <span className="hud-sm text-white/85">Baghdad · Iraq</span>
                <span aria-hidden className="h-3 w-[1px] bg-white/25" />
                <span className="hud-sm text-white/60">Cold chain operations</span>
              </div>

              <h1 className="display-xl text-[clamp(2.5rem,5.4vw,4.85rem)] text-metal-frost [font-stretch:100%]">
                <span data-hero-line className="block overflow-hidden pb-[0.06em] -mb-[0.06em] lg:whitespace-nowrap">
                  <span className="block">Precision storage.</span>
                </span>
                <span data-hero-line className="block overflow-hidden pb-[0.06em] -mb-[0.06em] lg:whitespace-nowrap">
                  <span className="block">Controlled from</span>
                </span>
                <span data-hero-line className="block overflow-hidden pb-[0.06em] -mb-[0.06em] lg:whitespace-nowrap">
                  <span className="block text-gradient-ice">cold to delivery.</span>
                </span>
              </h1>

              <p
                data-hero-support
                className="mt-6 max-w-xl text-[1.02rem] leading-[1.8] text-ink-100/85 sm:text-[1.12rem]"
              >
                Premium cold storage and temperature-controlled logistics designed to protect
                critical products throughout the supply chain.
              </p>

              <div data-hero-cta className="mt-8 flex flex-wrap items-center gap-4">
                <MagneticButton
                  href="#facility"
                  size="lg"
                  variant="onDark"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget("#facility", 96);
                  }}
                >
                  Explore Facility
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 3v10m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </MagneticButton>
                <MagneticButton
                  href="#contact"
                  size="lg"
                  variant="onDarkGhost"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget("#contact", 96);
                  }}
                >
                  Request Storage
                </MagneticButton>
              </div>
            </div>

            {/* ---- Temperature HUD (desktop) ---- */}
            <div data-hero-hud className="hidden lg:flex lg:justify-end">
              <TempHud />
            </div>
          </div>
        </div>

        {/* ---- Bottom rail ---- */}
        <div data-hero-bottom className="mt-10">
          {/* Compact HUD chips (mobile/tablet) */}
          <div className="mb-8 flex flex-wrap gap-2.5 lg:hidden">
            {[
              { k: "Target", v: "-18.0°C" },
              { k: "Monitoring", v: "24/7" },
              { k: "Status", v: "Temperature controlled" },
            ].map((c) => (
              <div key={c.k} className="glass-dark rounded-full px-4 py-2">
                <span className="hud-sm text-white/50">{c.k} — </span>
                <span className="font-mono text-[0.78rem] font-medium text-glow-300">{c.v}</span>
              </div>
            ))}
          </div>

          <div className="flex items-end justify-between gap-8">
            {/* Scroll cue */}
            <a
              href="#cold-chain"
              className="group hidden items-center gap-4 sm:flex"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#cold-chain", 96);
              }}
            >
              <span className="relative flex h-12 w-8 items-start justify-center overflow-hidden rounded-full border border-white/25">
                <span className="absolute top-2 h-2.5 w-[1.5px] rounded-full bg-glow-400 animate-scroll-dot" />
              </span>
              <span className="hud-sm text-white/60 transition-colors group-hover:text-white/90">
                Scroll to explore
              </span>
            </a>

            {/* Status ticker */}
            <div className="mask-fade-x w-full max-w-[34rem] overflow-hidden sm:w-[32rem]">
              <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
                {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                  <span key={i} className="hud-sm flex items-center gap-10 text-white/55">
                    {item}
                    <span aria-hidden className="h-1 w-1 rounded-full bg-glow-400/80" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Temperature HUD panel                                                */
/* ================================================================== */

function TempHud() {
  return (
    <div
      data-cursor="default"
      className="glass-dark w-full max-w-[22rem] rounded-2xl p-7 text-white"
    >
      <div className="flex items-center justify-between">
        <span className="hud-sm text-white/55">Chamber setpoint</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-glow-400 animate-blip" />
          <span className="hud-sm text-glow-300">Live</span>
        </span>
      </div>

      <div className="mt-5 flex items-end gap-2">
        <span data-hero-temp className="font-mono text-[3.4rem] font-medium leading-none tracking-tight text-white">
          0.0
        </span>
        <span className="mb-1 font-mono text-2xl font-medium text-glow-300">°C</span>
      </div>

      {/* Scale */}
      <div className="mt-6">
        <div className="relative h-[5px] w-full overflow-hidden rounded-full bg-white/10">
          <div
            data-hero-temp-bar
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-ice-400 via-glow-400 to-glow-300"
            style={{ width: "0%" }}
          />
        </div>
        <div className="mt-2.5 flex justify-between">
          {["+4°", "0°", "-8°", "-18°", "-24°"].map((t) => (
            <span key={t} className="font-mono text-[0.62rem] tracking-wider text-white/45">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
        {[
          ["Monitoring", "24/7 active"],
          ["Environment", "Temperature controlled"],
          ["Location", "Baghdad · Iraq"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4">
            <span className="text-[0.82rem] text-white/55">{k}</span>
            <span className="font-mono text-[0.8rem] tracking-wide text-white/95">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
