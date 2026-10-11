"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Camera, Fingerprint, ShieldCheck, Cctv, Lock, Activity } from "lucide-react";

import { cn } from "@/lib/utils";
import { HudLabel, TextReveal } from "@/components/ui/Text";
import { Reveal, RevealItem, StaggerGroup } from "@/components/ui/Reveal";
import { FrostParticles, MistBand } from "@/components/ui/FrostParticles";

const FEATURES = [
  {
    title: "24/7 surveillance",
    desc: "Facility oversight that continues through the night.",
    Icon: Cctv,
  },
  {
    title: "Controlled access",
    desc: "Movement in and out of the facility stays managed.",
    Icon: Fingerprint,
  },
  {
    title: "Monitored facility",
    desc: "Key zones remain visible across the operation.",
    Icon: Camera,
  },
  {
    title: "Secure storage",
    desc: "Product is held inside protected, controlled areas.",
    Icon: Lock,
  },
  {
    title: "Continuous monitoring",
    desc: "Conditions and activity stay under watch.",
    Icon: Activity,
  },
  {
    title: "Operational control",
    desc: "Security is designed into the daily process.",
    Icon: ShieldCheck,
  },
];

/** Monitoring points on the schematic map (percent coordinates). */
const NODES = [
  { id: 1, x: 22, y: 34, label: "Camera node · perimeter" },
  { id: 2, x: 47, y: 22, label: "Camera node · north hall" },
  { id: 3, x: 71, y: 38, label: "Access point · office" },
  { id: 4, x: 34, y: 66, label: "Camera node · loading bay" },
  { id: 5, x: 62, y: 72, label: "Camera node · dispatch" },
  { id: 6, x: 84, y: 58, label: "Access point · gate" },
];

export function SecuritySection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mapRef, { once: true, amount: 0.35 });

  return (
    <section
      id="security"
      aria-labelledby="security-title"
      className="relative overflow-hidden bg-ink-950 py-28 text-white lg:py-40"
    >
      {/* Deep atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(95% 70% at 20% 0%, rgba(24,144,214,0.2) 0%, rgba(5,13,25,0) 52%), radial-gradient(70% 55% at 90% 100%, rgba(95,230,245,0.1) 0%, rgba(5,13,25,0) 60%)",
        }}
      />
      <MistBand flipped className="opacity-50" />
      <FrostParticles id="sec-frost" count={12} tone="ice" className="opacity-40" />
      <div aria-hidden className="grid-lines-dark-layer absolute inset-0 opacity-35" />

      <div className="relative mx-auto w-full max-w-[92rem] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
          <div>
            <Reveal>
              <HudLabel tone="ice">Security &amp; monitoring</HudLabel>
            </Reveal>
            <TextReveal
              as="h2"
              id="security-title"
              className="mt-6 display-lg text-[clamp(2.35rem,5.6vw,4.9rem)] text-metal-frost"
            >
              Watched. Guarded. Controlled.
            </TextReveal>
          </div>
          <Reveal delay={0.14}>
            <p className="max-w-xl text-[1.02rem] leading-[1.8] text-ink-200/80">
              A cold chain only works if the facility around it stays secure — surveillance,
              access control and monitoring built into the everyday operation.
            </p>
          </Reveal>
        </div>

        {/* ---------- Map + status ---------- */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:mt-20 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.7fr)] lg:gap-12">
          {/* Monitoring map */}
          <Reveal>
            <div
              ref={mapRef}
              data-cursor="visual"
              className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#071120]"
            >
              {/* Schematic grid */}
              <div aria-hidden className="grid-lines-dark-layer absolute inset-0 opacity-70" />
              {/* Faint facility plan */}
              <svg viewBox="0 0 1000 560" className="relative w-full" aria-hidden>
                <defs>
                  <linearGradient id="secPlan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(126,200,240,0.12)" />
                    <stop offset="100%" stopColor="rgba(126,200,240,0.03)" />
                  </linearGradient>
                </defs>
                {/* Building blocks */}
                <rect x="120" y="120" width="480" height="300" rx="16" fill="url(#secPlan)" stroke="rgba(126,200,240,0.28)" strokeWidth="1.5" />
                <rect x="640" y="170" width="230" height="150" rx="14" fill="url(#secPlan)" stroke="rgba(126,200,240,0.22)" strokeWidth="1.5" />
                <rect x="180" y="450" width="320" height="70" rx="12" fill="url(#secPlan)" stroke="rgba(126,200,240,0.18)" strokeWidth="1.5" strokeDasharray="6 6" />
                {/* Roads */}
                <path d="M0 500 H 1000" stroke="rgba(126,200,240,0.16)" strokeWidth="10" />
                <path d="M0 500 H 1000" stroke="rgba(126,200,240,0.3)" strokeWidth="1.2" strokeDasharray="10 14" />
                <path d="M620 80 V 500" stroke="rgba(126,200,240,0.12)" strokeWidth="8" />
              </svg>

              {/* Monitoring nodes */}
              {NODES.map((n, i) => (
                <div
                  key={n.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  <div className="group/node relative">
                    {/* Pulse ring */}
                    {inView && (
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-0 rounded-full border border-glow-400/70 animate-pulse-ring motion-reduce:hidden",
                        )}
                        style={{ animationDelay: `${i * 0.55}s` }}
                      />
                    )}
                    <span
                      className={cn(
                        "relative flex h-8 w-8 items-center justify-center rounded-full border border-glow-400/60 bg-glow-500/15 backdrop-blur-sm transition-transform duration-500 group-hover/node:scale-125",
                      )}
                    >
                      <Camera size={13} className="text-glow-300" aria-hidden />
                    </span>
                    {/* Label */}
                    <span className="pointer-events-none absolute left-11 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-white/12 bg-ink-950/80 px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.16em] text-white/85 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover/node:opacity-100 lg:block">
                      {n.label}
                    </span>
                    <span className="sr-only">{n.label}</span>
                  </div>
                </div>
              ))}

              {/* Map HUD corners */}
              <div className="absolute left-5 top-5 flex items-center gap-2.5 rounded-full border border-white/12 bg-ink-950/70 px-4 py-2 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-glow-400 animate-blip" />
                <span className="hud-sm text-white/80">Monitoring map · schematic</span>
              </div>
              <div className="absolute bottom-5 left-5 rounded-2xl border border-white/12 bg-ink-950/70 px-5 py-4 backdrop-blur-md">
                <p className="hud-sm text-white/50">Facility status</p>
                <p className="mt-1.5 font-mono text-[0.95rem] tracking-[0.18em] text-glow-300">SECURE</p>
              </div>
            </div>
          </Reveal>

          {/* Status panel */}
          <div className="flex flex-col gap-5">
            <Reveal delay={0.1}>
              <div className="glass-dark rounded-[22px] p-8">
                <HudLabel tone="ice">Facility status</HudLabel>

                <div className="mt-6 space-y-4">
                  {[
                    { k: "Monitoring", v: "Active" },
                    { k: "Access control", v: "Active" },
                    { k: "Surveillance", v: "Continuous" },
                    { k: "Environment", v: "Under control" },
                  ].map((row, i) => (
                    <div key={row.k} className="flex items-center justify-between gap-4 border-b border-white/8 pb-3.5 last:border-0">
                      <span className="text-[0.92rem] text-white/65">{row.k}</span>
                      <span className="flex items-center gap-2.5">
                        <motion.span
                          className="h-1.5 w-1.5 rounded-full bg-glow-400"
                          animate={{ opacity: [1, 0.35, 1] }}
                          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35 }}
                        />
                        <span className="font-mono text-[0.82rem] tracking-[0.14em] text-white">
                          {row.v.toUpperCase()}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-glow-400/25 bg-glow-500/[0.07] p-4">
                  <p className="text-[0.86rem] leading-relaxed text-white/75">
                    Status indicators illustrate the monitoring experience. Live systems are
                    connected in the implementation phase.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="relative overflow-hidden rounded-[22px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/ops-detail.jpg"
                  alt="Monitoring screens in the operations control room"
                  loading="lazy"
                  className="h-52 w-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(185deg, rgba(5,13,25,0.15) 30%, rgba(5,13,25,0.85) 100%)",
                  }}
                />
                <p className="absolute bottom-4 left-5 right-5 text-[0.9rem] text-white/85">
                  Oversight that never sleeps.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ---------- Feature grid ---------- */}
        <StaggerGroup className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[22px] bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <RevealItem key={f.title}>
              <div className="group h-full bg-ink-950 p-8 transition-colors duration-500 hover:bg-[#0b1c31]">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 transition-colors duration-500 group-hover:border-glow-400/50 group-hover:bg-glow-500/10">
                  <f.Icon size={18} strokeWidth={1.7} className="text-glow-300" aria-hidden />
                </div>
                <h3 className="mt-5 display-md text-[1.25rem] text-white">{f.title}</h3>
                <p className="mt-2.5 text-[0.94rem] leading-relaxed text-ink-200/70">{f.desc}</p>
              </div>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
