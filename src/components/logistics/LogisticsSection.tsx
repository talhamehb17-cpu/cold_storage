"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Warehouse, Truck, Flag, Thermometer, Route, Clock3 } from "lucide-react";

import { HudLabel, TextReveal } from "@/components/ui/Text";
import { Reveal, RevealItem, StaggerGroup } from "@/components/ui/Reveal";
import { HudRule, Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/ui/SmartImage";

const STOPS = [
  {
    Icon: Warehouse,
    title: "Warehouse",
    desc: "Product begins inside the controlled environment of the facility.",
  },
  {
    Icon: Truck,
    title: "Transport",
    desc: "Temperature-controlled movement keeps the chain intact on the road.",
  },
  {
    Icon: Flag,
    title: "Destination",
    desc: "Arrival handover completes the journey — cold from end to end.",
  },
];

export function LogisticsSection() {
  const routeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(routeRef, { once: true, amount: 0.3 });

  return (
    <Section
      id="logistics"
      tone="light"
      labelledBy="logistics-title"
      className="relative overflow-hidden py-28 lg:py-40"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end">
        <div>
          <Reveal>
            <HudLabel>Logistics</HudLabel>
          </Reveal>
          <TextReveal
            as="h2"
            id="logistics-title"
            className="mt-6 display-lg text-[clamp(2.35rem,5.6vw,4.9rem)] text-metal-navy"
          >
            The cold chain keeps moving.
          </TextReveal>
        </div>
        <Reveal delay={0.14}>
          <p className="max-w-xl text-[1.02rem] leading-[1.8] text-ink-500">
            Storage is only half the story. Temperature-controlled logistics connects the
            facility to the destination as one continuous operation.
          </p>
        </Reveal>
      </div>

      {/* ---------- Route visualization ---------- */}
      <div ref={routeRef} className="relative mt-14 lg:mt-20">
        <div className="relative overflow-hidden rounded-[28px]">
          <SmartImage
            src="/images/logistics-network.jpg"
            alt="Night aerial view of a highway interchange with long-exposure light trails"
            ratio="aspect-[16/9] lg:aspect-[21/9]"
            sizes="100vw"
            className="rounded-[28px]"
          />
          {/* Grade */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(185deg, rgba(5,13,25,0.55) 0%, rgba(5,13,25,0.25) 40%, rgba(5,13,25,0.82) 100%)",
            }}
          />

          {/* Animated route line */}
          <svg
            viewBox="0 0 1200 500"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7bc9f8" />
                <stop offset="55%" stopColor="#5fe6f5" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>

            {/* Base route */}
            <path
              d="M 130 370 C 320 370, 330 240, 520 240 S 780 190, 900 160 S 1080 130, 1120 120"
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="3"
            />
            {/* Animated dashes */}
            <path
              d="M 130 370 C 320 370, 330 240, 520 240 S 780 190, 900 160 S 1080 130, 1120 120"
              fill="none"
              stroke="url(#routeGrad)"
              strokeWidth="3"
              strokeDasharray="14 18"
              opacity="0.9"
              style={{
                animation: "route-dash 26s linear infinite",
                strokeDashoffset: 0,
              }}
            />

            {/* Stop markers */}
            {[
              { x: 130, y: 370, label: "W" },
              { x: 520, y: 240, label: "T" },
              { x: 1120, y: 120, label: "D" },
            ].map((s, i) => (
              <g key={s.label}>
                {inView && (
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r="14"
                    fill="none"
                    stroke="#5fe6f5"
                    strokeWidth="1.5"
                    opacity="0.7"
                  >
                    <animate
                      attributeName="r"
                      values="10;30;10"
                      dur="3.4s"
                      begin={`${i * 0.7}s`}
                      repeatCount="indefinite"
                    />
                    <animate attributeName="opacity" values="0.8;0;0.8" dur="3.4s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={s.x} cy={s.y} r="8" fill="#0a1728" stroke="#5fe6f5" strokeWidth="2" />
              </g>
            ))}

            {/* Moving vehicle dot */}
            <circle r="7" fill="#5fe6f5">
              <animateMotion
                dur="14s"
                repeatCount="indefinite"
                path="M 130 370 C 320 370, 330 240, 520 240 S 780 190, 900 160 S 1080 130, 1120 120"
              />
            </circle>
            <circle r="14" fill="rgba(95,230,245,0.25)">
              <animateMotion
                dur="14s"
                repeatCount="indefinite"
                path="M 130 370 C 320 370, 330 240, 520 240 S 780 190, 900 160 S 1080 130, 1120 120"
              />
            </circle>
          </svg>

          {/* Labels */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-10">
            <div className="glass-dark rounded-2xl px-5 py-4">
              <HudLabel tone="ice" tick={false}>
                Route experience · illustrative
              </HudLabel>
              <p className="mt-2 display-md text-[clamp(1.1rem,2.2vw,1.55rem)] text-metal-frost">
                Warehouse → Transport → Destination
              </p>
            </div>
            <div className="hidden rounded-2xl border border-white/15 bg-ink-950/50 px-5 py-4 backdrop-blur-md sm:block">
              <p className="hud-sm text-white/60">Vehicle</p>
              <p className="mt-1.5 flex items-center gap-2 font-mono text-[0.85rem] text-glow-300">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-glow-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                IN TRANSIT
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Stops ---------- */}
      <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {STOPS.map((s, i) => (
          <RevealItem key={s.title}>
            <div className="group h-full rounded-[20px] border border-ink-900/8 bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-ice-400/40 hover:shadow-lift">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ice-50 text-ice-700 transition-colors duration-500 group-hover:bg-ice-500 group-hover:text-white">
                  <s.Icon size={20} strokeWidth={1.7} aria-hidden />
                </div>
                <span className="hud-sm text-ink-300">0{i + 1}</span>
              </div>
              <h3 className="mt-6 display-md text-[1.5rem] text-ink-950">{s.title}</h3>
              <p className="mt-3 text-[0.97rem] leading-[1.75] text-ink-500">{s.desc}</p>
            </div>
          </RevealItem>
        ))}
      </StaggerGroup>

      {/* ---------- Values ---------- */}
      <div className="mt-20">
        <HudRule left="Temperature-controlled movement" right="On the road" />
        <StaggerGroup className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {[
            { Icon: Thermometer, t: "Controlled environments", d: "Transport is treated as part of the cold chain, not outside it." },
            { Icon: Route, t: "Structured movement", d: "Handovers follow the same organised process at every stage." },
            { Icon: Clock3, t: "Planned dispatch", d: "Departures are coordinated with storage and handling operations." },
          ].map((v) => (
            <RevealItem key={v.t}>
              <div className="flex gap-5">
                <v.Icon size={22} strokeWidth={1.6} className="mt-1 shrink-0 text-ice-600" aria-hidden />
                <div>
                  <h3 className="text-[1.05rem] font-semibold text-ink-900">{v.t}</h3>
                  <p className="mt-2 text-[0.95rem] leading-[1.75] text-ink-500">{v.d}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}
