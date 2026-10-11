"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Activity,
  Boxes,
  Fingerprint,
  Snowflake,
  ThermometerSnowflake,
  Eye,
} from "lucide-react";

import { HudLabel, TextReveal } from "@/components/ui/Text";
import { Reveal, RevealItem, StaggerGroup } from "@/components/ui/Reveal";
import { HudRule } from "@/components/ui/Section";
import { FrostParticles, MistBand } from "@/components/ui/FrostParticles";

const PILLARS = [
  {
    title: "Precision cooling",
    desc: "Temperature-controlled environments designed around consistency.",
    Icon: Snowflake,
  },
  {
    title: "Secure facility",
    desc: "A protected operation with controlled access and oversight.",
    Icon: Fingerprint,
  },
  {
    title: "24/7 monitoring",
    desc: "Continuous attention to the conditions that matter.",
    Icon: Activity,
  },
  {
    title: "Inventory visibility",
    desc: "Organised tracking keeps product identifiable and locatable.",
    Icon: Eye,
  },
  {
    title: "Flexible storage",
    desc: "Short-term or long-term requirements, structured to fit.",
    Icon: Boxes,
  },
  {
    title: "Controlled operations",
    desc: "Handling and movement follow defined, careful processes.",
    Icon: ThermometerSnowflake,
  },
];

/**
 * TRUST — corporate credibility through principles, not invented statistics.
 * Animated ring indicators count through 0→100% as decorative "integrity" meters.
 */
export function TrustSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="trust"
      aria-labelledby="trust-title"
      className="relative overflow-hidden bg-ink-900 py-28 text-white lg:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 75% at 80% 0%, rgba(24,144,214,0.22) 0%, rgba(10,23,40,0) 55%)",
        }}
      />
      <MistBand className="opacity-50" />
      <FrostParticles id="trust-frost" count={12} tone="ice" className="opacity-40" />

      <div ref={ref} className="relative mx-auto w-full max-w-[92rem] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <HudLabel tone="ice">Why Tahseen Jaber</HudLabel>
            </Reveal>
            <TextReveal
              as="h2"
              id="trust-title"
              className="mt-6 display-lg text-[clamp(2.45rem,6vw,5.25rem)] text-metal-frost"
            >
              Built around control.
            </TextReveal>
            <Reveal delay={0.1}>
              <p className="display-lg mt-2 text-[clamp(2.45rem,6vw,5.25rem)] text-glow-300">
                Designed for confidence.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-8 max-w-xl text-[1.05rem] leading-[1.85] text-ink-200/85">
                Confidence in a cold chain comes from control — over temperature, over access,
                over handling, and over every movement between arrival and delivery.
              </p>
            </Reveal>

            {/* Decorative integrity meters */}
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-5">
              {[
                { label: "Cooling control", value: 100 },
                { label: "Monitoring", value: 100 },
                { label: "Handling care", value: 100 },
              ].map((m, i) => (
                <Reveal key={m.label} delay={0.2 + i * 0.1}>
                  <div className="flex flex-col items-center">
                    <Ring value={m.value} active={inView} index={i} />
                    <p className="mt-3 text-center text-[0.82rem] leading-snug text-white/70">
                      {m.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-5 max-w-md text-[0.82rem] leading-relaxed text-white/45">
              Indicators represent operating principles, not measured statistics.
            </p>
          </div>

          {/* ---------- Pillars ---------- */}
          <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.07}>
            {PILLARS.map((p) => (
              <RevealItem key={p.title}>
                <div className="group h-full rounded-[18px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-glow-400/35 hover:bg-white/[0.07]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 transition-colors duration-500 group-hover:border-glow-400/50 group-hover:bg-glow-500/10">
                    <p.Icon size={18} strokeWidth={1.7} className="text-glow-300" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-[1.08rem] font-semibold tracking-tight text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[0.92rem] leading-[1.7] text-white/65">{p.desc}</p>
                </div>
              </RevealItem>
            ))}
          </StaggerGroup>
        </div>

        <HudRule
          tone="white"
          left="Precision · Security · Continuity"
          right="Tahseen Jaber · Baghdad"
          className="mt-20"
        />
      </div>
    </section>
  );
}

/** Animated circular progress ring (decorative). */
function Ring({ value, active, index }: { value: number; active: boolean; index: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-[6.25rem] w-[6.25rem]">
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="5" />
        <motion.circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: active ? c - (c * value) / 100 : c }}
          transition={{ duration: 1.6, delay: 0.25 + index * 0.22, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#45adec" />
            <stop offset="100%" stopColor="#5fe6f5" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-[1.05rem] font-medium text-white">
          {active ? value : 0}%
        </span>
      </div>
    </div>
  );
}
