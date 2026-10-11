"use client";

import { useRef } from "react";
import {
  ArrowDown,
  Boxes,
  ClipboardCheck,
  PackageCheck,
  Radar,
  Snowflake,
  ThermometerSnowflake,
  Truck,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils";
import { HudLabel, TextReveal } from "@/components/ui/Text";
import { Reveal } from "@/components/ui/Reveal";
import { FrostParticles } from "@/components/ui/FrostParticles";
import { SmartImage } from "@/components/ui/SmartImage";

const STAGES = [
  {
    id: "supplier",
    title: "Supplier",
    caption: "Origins of the chain",
    desc: "Product handover begins with clear coordination at the source.",
    Icon: ClipboardCheck,
  },
  {
    id: "receiving",
    title: "Receiving",
    caption: "Controlled intake",
    desc: "Inbound arrivals are checked and routed straight into the cold environment.",
    Icon: PackageCheck,
  },
  {
    id: "cold-storage",
    title: "Cold Storage",
    caption: "Protected holding",
    desc: "Product is placed in monitored, temperature-controlled storage rooms.",
    Icon: Snowflake,
  },
  {
    id: "inventory",
    title: "Inventory",
    caption: "Organised visibility",
    desc: "Stock stays structured and traceable across storage zones.",
    Icon: Boxes,
  },
  {
    id: "monitoring",
    title: "Temperature Monitoring",
    caption: "Continuous oversight",
    desc: "Conditions across the facility are monitored continuously.",
    Icon: Radar,
  },
  {
    id: "dispatch",
    title: "Dispatch",
    caption: "Controlled loading",
    desc: "Loading and handover follow the same controlled process as intake.",
    Icon: ThermometerSnowflake,
  },
  {
    id: "delivery",
    title: "Delivery",
    caption: "Cold to the destination",
    desc: "Temperature-controlled transport carries product toward its destination.",
    Icon: Truck,
  },
];

/**
 * COLD CHAIN — "FROM ARRIVAL TO DELIVERY"
 * Scroll-activated journey with a scroll-driven temperature narrative
 * (+4°C → −18°C) told through the big readout and the environment grade.
 */
export function ColdChainSection() {
  const root = useRef<HTMLElement>(null);
  const tempEl = useRef<HTMLSpanElement>(null);
  const glowEl = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Scroll-driven temperature narrative: +4 → -18 across the section.
      const state = { t: 4 };
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 72%",
        end: "bottom 60%",
        scrub: 0.8,
        onUpdate: (self) => {
          const v = 4 + (-18 - 4) * self.progress;
          state.t = v;
          if (tempEl.current) {
            tempEl.current.textContent = `${v > 0 ? "+" : ""}${v.toFixed(1)}`;
          }
          if (glowEl.current) {
            glowEl.current.style.opacity = `${0.25 + self.progress * 0.75}`;
          }
        },
      });

      // Journey spine draw
      if (!reduce) {
        gsap.fromTo(
          "[data-spine-fill]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-journey]",
              start: "top 68%",
              end: "bottom 72%",
              scrub: 0.5,
            },
          },
        );

        gsap.to("[data-parallax-frost]", {
          yPercent: -14,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
        });
      }
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="cold-chain"
      aria-labelledby="cold-chain-title"
      className="relative overflow-hidden bg-ink-950 py-28 text-white lg:py-40"
    >
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(85% 55% at 78% 18%, rgba(24,144,214,0.24) 0%, rgba(5,13,25,0) 58%)",
        }}
      />
      <div
        ref={glowEl}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] opacity-25"
        style={{
          background:
            "radial-gradient(75% 70% at 30% 100%, rgba(69,173,236,0.3) 0%, rgba(5,13,25,0) 70%)",
          filter: "blur(10px)",
        }}
      />
      <FrostParticles id="chain-frost" count={18} tone="ice" className="opacity-60" />
      <div data-parallax-frost className="grid-lines-dark-layer absolute inset-0 opacity-40" />

      <div className="relative mx-auto w-full max-w-[92rem] px-6 sm:px-10 lg:px-16">
        {/* ---------- Header ---------- */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-end">
          <div>
            <Reveal>
              <HudLabel tone="ice">The cold chain</HudLabel>
            </Reveal>
            <TextReveal
              as="h2"
              id="cold-chain-title"
              className="mt-6 display-lg text-[clamp(2.4rem,5.8vw,5.1rem)] text-metal-frost"
            >
              From arrival to delivery.
            </TextReveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-xl text-[1.05rem] leading-[1.85] text-ink-200/85">
                Every stage of the journey is treated as part of one continuous, controlled
                environment — from the moment product arrives to the moment it leaves.
              </p>
            </Reveal>
          </div>

          {/* Temperature narrative readout */}
          <Reveal delay={0.18} className="lg:justify-self-end">
            <div className="glass-dark w-full max-w-[26rem] rounded-2xl p-8">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <HudLabel tone="ice" tick={false}>
                  Environment
                </HudLabel>
                <span className="hud-sm text-white/50">Arrival → storage</span>
              </div>

              <div className="mt-6 flex items-end gap-2">
                <span
                  ref={tempEl}
                  className="font-mono text-[3.6rem] font-medium leading-none tracking-tight text-white"
                >
                  +4.0
                </span>
                <span className="mb-1 font-mono text-2xl font-medium text-glow-300">°C</span>
              </div>

              {/* Traveling scale: +4 → -18 */}
              <div className="mt-7 space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="hud-sm w-8 text-white/55">+4°</span>
                  <div className="relative h-[5px] flex-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-ice-300 via-glow-400 to-ice-500"
                      initial={{ width: "4%" }}
                      whileInView={{ width: "62%" }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 2, ease: [0.65, 0, 0.35, 1] }}
                    />
                  </div>
                  <span className="hud-sm w-10 text-right text-white/55">-18°</span>
                </div>
                <p className="text-[0.85rem] leading-relaxed text-ink-300/80">
                  As product moves deeper into the chain, the environment turns colder — the
                  story of temperature control, told as you scroll.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------- Journey ---------- */}
        <div data-journey className="relative mt-24 lg:mt-32">
          {/* Spine */}
          <div
            aria-hidden
            className="absolute left-[27px] top-3 bottom-3 w-[2px] bg-white/10 lg:left-1/2 lg:-translate-x-1/2"
          >
            <div
              data-spine-fill
              className="h-full w-full origin-top bg-gradient-to-b from-ice-300 via-glow-400 to-ice-500"
            />
          </div>

          <ol className="space-y-6 lg:space-y-2">
            {STAGES.map((stage, i) => (
              <JourneyStage key={stage.id} stage={stage} index={i} />
            ))}
          </ol>
        </div>

        {/* Closing visual */}
        <Reveal soft className="mt-24 lg:mt-32">
          <div className="relative overflow-hidden rounded-[28px]">
            <SmartImage
              src="/images/loading-bay.jpg"
              alt="Refrigerated truck docked at a cold-storage loading bay with cold vapor rolling across the floor"
              ratio="aspect-[21/9]"
              sizes="(max-width: 1024px) 100vw, 60rem"
              hoverZoom
              className="rounded-[28px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[28px]"
              style={{
                background:
                  "linear-gradient(200deg, rgba(5,13,25,0.12) 30%, rgba(5,13,25,0.78) 100%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-10">
              <HudLabel tone="ice">Loading bay</HudLabel>
              <p className="mt-3 max-w-lg display-md text-[clamp(1.25rem,2.4vw,1.9rem)] text-metal-frost">
                The point where storage meets the road.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Journey stage row                                                    */
/* ================================================================== */

function JourneyStage({
  stage,
  index,
}: {
  stage: (typeof STAGES)[number];
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-38% 0px -38% 0px" });

  return (
    <li ref={ref} className="relative">
      <div
        className={cn(
          "grid grid-cols-1 items-start gap-4 transition-colors duration-500 lg:grid-cols-2 lg:gap-16",
        )}
      >
        {/* Alternating content */}
        <div
          className={cn(
            "flex items-start gap-5 pl-0 lg:pl-0",
            index % 2 === 1 ? "lg:col-start-2 lg:flex-row-reverse lg:text-right" : "lg:col-start-1 lg:pr-10 lg:text-right lg:flex-row-reverse lg:justify-end",
            index % 2 === 1 && "lg:pl-10",
          )}
        >
          {/* Node */}
          <div className="relative z-10 flex shrink-0 flex-col items-center">
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-500",
                inView
                  ? "scale-110 border-glow-400/80 bg-ink-900 text-glow-300 shadow-[0_0_36px_-6px_rgba(95,230,245,0.55)]"
                  : "border-white/15 bg-ink-950 text-white/55",
              )}
            >
              <stage.Icon size={22} strokeWidth={1.7} />
            </div>
            <span
              className={cn(
                "hud-sm mt-3 transition-colors duration-500",
                inView ? "text-glow-300" : "text-white/35",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Copy */}
          <div className="min-w-0 pt-1">
            <h3
              className={cn(
                "display-md text-[clamp(1.35rem,2.6vw,2rem)] transition-colors duration-500",
                inView ? "text-white" : "text-white/55",
              )}
            >
              {stage.title}
            </h3>
            <p
              className={cn(
                "mt-2 text-[0.98rem] leading-relaxed transition-colors duration-500",
                inView ? "text-ink-100/90" : "text-ink-300/55",
              )}
            >
              {stage.desc}
            </p>
          </div>
        </div>

        {/* Opposite side marker */}
        <div
          className={cn(
            "hidden lg:flex lg:items-center lg:gap-4",
            index % 2 === 1 ? "lg:col-start-1 lg:row-start-1 lg:justify-end lg:pr-10" : "lg:col-start-2 lg:pl-10",
          )}
        >
          <motion.span
            aria-hidden
            initial={{ opacity: 0, x: index % 2 === 1 ? 18 : -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className={cn(
              "hud-sm flex items-center gap-3 whitespace-nowrap",
              inView ? "text-white/80" : "text-white/35",
            )}
          >
            <span className="h-[1px] w-14 bg-gradient-to-r from-transparent to-glow-400/70" />
            {stage.caption}
          </motion.span>
        </div>
      </div>

      {/* Separator */}
      {index < STAGES.length - 1 && (
        <div className="my-6 flex justify-center lg:my-8">
          <ArrowDown
            size={16}
            aria-hidden
            className={cn("transition-colors duration-500", inView ? "text-glow-400/80" : "text-white/25")}
          />
        </div>
      )}
    </li>
  );
}
