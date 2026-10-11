"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { HudLabel, TextReveal } from "@/components/ui/Text";
import { Reveal, StaggerGroup, RevealItem } from "@/components/ui/Reveal";
import { HudRule, Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/ui/SmartImage";
import { EASE_OUT } from "@/lib/animations/variants";

type Zone = {
  id: string;
  code: string;
  title: string;
  desc: string;
  points: string[];
  /** SVG hotspot center (percent) for the connector line. */
  anchor: { x: number; y: number };
};

const ZONES: Zone[] = [
  {
    id: "receiving",
    code: "ZN-01",
    title: "Receiving",
    desc: "Inbound arrivals enter through a controlled intake area where handling starts immediately inside the cold environment.",
    points: ["Controlled intake", "Inbound coordination", "Direct-to-cold routing"],
    anchor: { x: 17, y: 52 },
  },
  {
    id: "cold-rooms",
    code: "ZN-02",
    title: "Cold Rooms",
    desc: "Monitored temperature-controlled rooms form the core of the facility — the protected heart of the operation.",
    points: ["Temperature-controlled rooms", "Continuous monitoring", "Organised racking"],
    anchor: { x: 42, y: 45 },
  },
  {
    id: "storage",
    code: "ZN-03",
    title: "Storage",
    desc: "Structured storage zones keep product organised, visible and ready for its next movement.",
    points: ["Zoned storage", "Organised placement", "Movement visibility"],
    anchor: { x: 62, y: 52 },
  },
  {
    id: "monitoring",
    code: "ZN-04",
    title: "Monitoring",
    desc: "A central oversight area keeps the whole facility visible — conditions, access and operations in one view.",
    points: ["Central oversight", "Status visibility", "Continuous attention"],
    anchor: { x: 79, y: 26 },
  },
  {
    id: "loading-bay",
    code: "ZN-05",
    title: "Loading Bay",
    desc: "Sealed dock positions keep the cold environment intact while product moves in and out.",
    points: ["Dock-level control", "Protected transfer", "Scheduled handling"],
    anchor: { x: 27, y: 78 },
  },
  {
    id: "dispatch",
    code: "ZN-06",
    title: "Dispatch",
    desc: "Outbound product leaves through controlled handover — the chain continues past the facility gates.",
    points: ["Controlled handover", "Route readiness", "Chain continuity"],
    anchor: { x: 84, y: 72 },
  },
];

export function FacilitySection() {
  const [active, setActive] = useState<string>("cold-rooms");
  const zone = ZONES.find((z) => z.id === active)!;

  return (
    <Section
      id="facility"
      tone="frost"
      labelledBy="facility-title"
      className="relative overflow-hidden py-28 lg:py-40"
    >
      <div aria-hidden className="grid-lines-layer pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end">
          <div>
            <Reveal>
              <HudLabel>Facility experience</HudLabel>
            </Reveal>
            <TextReveal
              as="h2"
              id="facility-title"
              className="mt-6 display-lg text-[clamp(2.35rem,5.6vw,4.9rem)] text-metal-navy"
            >
              Explore the facility.
            </TextReveal>
          </div>
          <Reveal delay={0.14}>
            <p className="max-w-xl text-[1.02rem] leading-[1.8] text-ink-500">
              Move across the plan to see how a cold-storage facility works as one connected
              system — intake, storage, oversight and dispatch.
            </p>
          </Reveal>
        </div>

        {/* ---------- Interactive plan ---------- */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:mt-20 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.75fr)] lg:gap-12">
          {/* Plan */}
          <Reveal variant="up">
            <div className="panel-light relative overflow-hidden rounded-[26px] p-4 sm:p-6">
              {/* Plan header */}
              <div className="mb-4 flex items-center justify-between px-2">
                <span className="hud-sm text-ink-400">Facility plan · schematic</span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-glow-500 animate-blip" />
                  <span className="hud-sm text-ice-700">Interactive</span>
                </span>
              </div>

              <svg
                viewBox="0 0 960 560"
                className="w-full select-none"
                role="img"
                aria-label="Interactive schematic of the cold-storage facility with six zones: receiving, cold rooms, storage, monitoring, loading bay and dispatch"
              >
                <defs>
                  <linearGradient id="shellFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#eef4f9" />
                    <stop offset="100%" stopColor="#dce8f1" />
                  </linearGradient>
                  <linearGradient id="bayFill" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#cfe3f0" />
                    <stop offset="100%" stopColor="#e8f2f9" />
                  </linearGradient>
                  <radialGradient id="activeGlow" cx="0.5" cy="0.5" r="0.7">
                    <stop offset="0%" stopColor="rgba(69,173,236,0.32)" />
                    <stop offset="100%" stopColor="rgba(69,173,236,0)" />
                  </radialGradient>
                </defs>

                {/* Yard ground */}
                <rect x="0" y="430" width="960" height="130" fill="#eaf1f7" />
                <line x1="0" y1="430" x2="960" y2="430" stroke="#c8d8e6" strokeWidth="2" />

                {/* Building shell */}
                <rect x="80" y="120" width="800" height="320" rx="18" fill="url(#shellFill)" stroke="#b7cbdc" strokeWidth="2" />
                {/* Roof ridge */}
                <path d="M80 120 L480 60 L880 120" fill="none" stroke="#9db4c9" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M80 120 L480 60 L880 120 L880 138 L480 78 L80 138 Z" fill="#dae8f2" stroke="#b7cbdc" strokeWidth="1.5" />

                {/* ===================== ZONES ===================== */}

                {/* ZN-01 Receiving */}
                <g
                  className="cursor-pointer"
                  tabIndex={0}
                  role="button"
                  aria-label="Receiving zone"
                  onMouseEnter={() => setActive("receiving")}
                  onFocus={() => setActive("receiving")}
                  onClick={() => setActive("receiving")}
                >
                  {active === "receiving" && <rect x="96" y="200" width="200" height="190" rx="12" fill="url(#activeGlow)" />}
                  <rect
                    x="96"
                    y="200"
                    width="200"
                    height="190"
                    rx="12"
                    fill={active === "receiving" ? "rgba(24,144,214,0.14)" : "rgba(24,144,214,0.05)"}
                    stroke={active === "receiving" ? "#1890d6" : "#a9c2d4"}
                    strokeWidth={active === "receiving" ? 2.5 : 1.5}
                    className="transition-all duration-300"
                  />
                  {/* Dock doors */}
                  {[0, 1, 2].map((i) => (
                    <rect key={i} x={112 + i * 58} y="352" width="42" height="38" rx="4"
                      fill={active === "receiving" ? "#1890d6" : "#b7cbdc"} className="transition-all duration-300" />
                  ))}
                  <text x="196" y="272" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="13" letterSpacing="3" fill="#456783">01</text>
                  <text x="196" y="302" textAnchor="middle" fontFamily="Archivo, sans-serif" fontWeight="700" fontSize="22" fill="#0a1728">RECEIVING</text>
                </g>

                {/* ZN-02 Cold Rooms */}
                <g
                  className="cursor-pointer"
                  tabIndex={0}
                  role="button"
                  aria-label="Cold rooms zone"
                  onMouseEnter={() => setActive("cold-rooms")}
                  onFocus={() => setActive("cold-rooms")}
                  onClick={() => setActive("cold-rooms")}
                >
                  {active === "cold-rooms" && <rect x="316" y="170" width="230" height="160" rx="12" fill="url(#activeGlow)" />}
                  <rect
                    x="316"
                    y="170"
                    width="230"
                    height="160"
                    rx="12"
                    fill={active === "cold-rooms" ? "rgba(24,144,214,0.14)" : "rgba(24,144,214,0.05)"}
                    stroke={active === "cold-rooms" ? "#1890d6" : "#a9c2d4"}
                    strokeWidth={active === "cold-rooms" ? 2.5 : 1.5}
                    className="transition-all duration-300"
                  />
                  {/* Snowflake */}
                  <g transform="translate(431 218)" stroke={active === "cold-rooms" ? "#0b71b4" : "#7fa3bc"} strokeWidth="2.2" strokeLinecap="round">
                    <line x1="0" y1="-16" x2="0" y2="16" />
                    <line x1="-14" y1="-8" x2="14" y2="8" />
                    <line x1="-14" y1="8" x2="14" y2="-8" />
                  </g>
                  <text x="431" y="272" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="13" letterSpacing="3" fill="#456783">02</text>
                  <text x="431" y="302" textAnchor="middle" fontFamily="Archivo, sans-serif" fontWeight="700" fontSize="22" fill="#0a1728">COLD ROOMS</text>
                </g>

                {/* ZN-03 Storage */}
                <g
                  className="cursor-pointer"
                  tabIndex={0}
                  role="button"
                  aria-label="Storage zone"
                  onMouseEnter={() => setActive("storage")}
                  onFocus={() => setActive("storage")}
                  onClick={() => setActive("storage")}
                >
                  {active === "storage" && <rect x="566" y="200" width="180" height="190" rx="12" fill="url(#activeGlow)" />}
                  <rect
                    x="566"
                    y="200"
                    width="180"
                    height="190"
                    rx="12"
                    fill={active === "storage" ? "rgba(24,144,214,0.14)" : "rgba(24,144,214,0.05)"}
                    stroke={active === "storage" ? "#1890d6" : "#a9c2d4"}
                    strokeWidth={active === "storage" ? 2.5 : 1.5}
                    className="transition-all duration-300"
                  />
                  {/* Racks */}
                  {[0, 1, 2, 3].map((i) => (
                    <rect key={i} x={586 + i * 38} y="228" width="26" height="86" rx="3"
                      fill={active === "storage" ? "rgba(24,144,214,0.55)" : "rgba(127,163,188,0.5)"}
                      className="transition-all duration-300" />
                  ))}
                  <text x="656" y="348" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="13" letterSpacing="3" fill="#456783">03</text>
                  <text x="656" y="376" textAnchor="middle" fontFamily="Archivo, sans-serif" fontWeight="700" fontSize="22" fill="#0a1728">STORAGE</text>
                </g>

                {/* ZN-04 Monitoring */}
                <g
                  className="cursor-pointer"
                  tabIndex={0}
                  role="button"
                  aria-label="Monitoring zone"
                  onMouseEnter={() => setActive("monitoring")}
                  onFocus={() => setActive("monitoring")}
                  onClick={() => setActive("monitoring")}
                >
                  {active === "monitoring" && <rect x="766" y="140" width="100" height="110" rx="12" fill="url(#activeGlow)" />}
                  <rect
                    x="766"
                    y="140"
                    width="100"
                    height="110"
                    rx="12"
                    fill={active === "monitoring" ? "rgba(24,144,214,0.16)" : "rgba(24,144,214,0.06)"}
                    stroke={active === "monitoring" ? "#1890d6" : "#a9c2d4"}
                    strokeWidth={active === "monitoring" ? 2.5 : 1.5}
                    className="transition-all duration-300"
                  />
                  {/* Screens */}
                  <rect x="782" y="158" width="30" height="20" rx="3" fill={active === "monitoring" ? "#0b71b4" : "#9db4c9"} className="transition-all duration-300" />
                  <rect x="818" y="158" width="30" height="20" rx="3" fill={active === "monitoring" ? "#0b71b4" : "#9db4c9"} className="transition-all duration-300" />
                  <text x="816" y="212" textAnchor="middle" fontFamily="Archivo, sans-serif" fontWeight="700" fontSize="14" fill="#0a1728">MONITORING</text>
                </g>

                {/* ZN-05 Loading Bay */}
                <g
                  className="cursor-pointer"
                  tabIndex={0}
                  role="button"
                  aria-label="Loading bay zone"
                  onMouseEnter={() => setActive("loading-bay")}
                  onFocus={() => setActive("loading-bay")}
                  onClick={() => setActive("loading-bay")}
                >
                  {active === "loading-bay" && <rect x="96" y="430" width="300" height="100" rx="12" fill="url(#activeGlow)" />}
                  <rect
                    x="96"
                    y="430"
                    width="300"
                    height="100"
                    rx="12"
                    fill={active === "loading-bay" ? "rgba(24,144,214,0.12)" : "rgba(24,144,214,0.04)"}
                    stroke={active === "loading-bay" ? "#1890d6" : "#a9c2d4"}
                    strokeWidth={active === "loading-bay" ? 2.5 : 1.5}
                    strokeDasharray="6 5"
                    className="transition-all duration-300"
                  />
                  {/* Truck silhouette */}
                  <g fill={active === "loading-bay" ? "#0b71b4" : "#9db4c9"} className="transition-all duration-300">
                    <rect x="128" y="452" width="120" height="52" rx="6" />
                    <rect x="252" y="468" width="52" height="36" rx="5" />
                    <circle cx="164" cy="510" r="11" fill="#456783" />
                    <circle cx="286" cy="510" r="11" fill="#456783" />
                  </g>
                  <text x="352" y="472" textAnchor="middle" fontFamily="Archivo, sans-serif" fontWeight="700" fontSize="17" fill="#0a1728">LOADING BAY</text>
                  <text x="352" y="496" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="3" fill="#456783">ZN-05</text>
                </g>

                {/* ZN-06 Dispatch */}
                <g
                  className="cursor-pointer"
                  tabIndex={0}
                  role="button"
                  aria-label="Dispatch zone"
                  onMouseEnter={() => setActive("dispatch")}
                  onFocus={() => setActive("dispatch")}
                  onClick={() => setActive("dispatch")}
                >
                  {active === "dispatch" && <rect x="600" y="430" width="290" height="100" rx="12" fill="url(#activeGlow)" />}
                  <rect
                    x="600"
                    y="430"
                    width="290"
                    height="100"
                    rx="12"
                    fill={active === "dispatch" ? "rgba(24,144,214,0.12)" : "rgba(24,144,214,0.04)"}
                    stroke={active === "dispatch" ? "#1890d6" : "#a9c2d4"}
                    strokeWidth={active === "dispatch" ? 2.5 : 1.5}
                    strokeDasharray="6 5"
                    className="transition-all duration-300"
                  />
                  {/* Route arrow */}
                  <path
                    d="M628 480 H 760 M 760 480 L 736 462 M 760 480 L 736 498"
                    stroke={active === "dispatch" ? "#1890d6" : "#9db4c9"}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    className="transition-all duration-300"
                  />
                  <text x="822" y="472" textAnchor="middle" fontFamily="Archivo, sans-serif" fontWeight="700" fontSize="17" fill="#0a1728">DISPATCH</text>
                  <text x="822" y="496" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="3" fill="#456783">ZN-06</text>
                </g>

                {/* Connector line from active zone to right edge */}
                <AnimatePresence>
                  <motion.line
                    key={zone.id + "-link"}
                    x1={`${zone.anchor.x}%`}
                    y1={`${zone.anchor.y}%`}
                    x2="960"
                    y2={`${zone.anchor.y}%`}
                    stroke="#45adec"
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 0.85, pathLength: 1 }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                  />
                </AnimatePresence>

                {/* Compass */}
                <g transform="translate(46 56)">
                  <circle r="18" fill="rgba(255,255,255,0.8)" stroke="#c8d8e6" />
                  <path d="M0 -10 L5 4 L0 1 L-5 4 Z" fill="#0b71b4" />
                  <text y="-26" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="2" fill="#6d89a5">N</text>
                </g>
              </svg>

              {/* Zone chips (touch / keyboard) */}
              <div className="mt-4 flex flex-wrap gap-2 px-1">
                {ZONES.map((z) => (
                  <button
                    key={z.id}
                    type="button"
                    onMouseEnter={() => setActive(z.id)}
                    onFocus={() => setActive(z.id)}
                    onClick={() => setActive(z.id)}
                    data-cursor="hover"
                    className={cn(
                      "rounded-full border px-4 py-2 text-[0.78rem] font-medium transition-all duration-300",
                      active === z.id
                        ? "border-ice-500 bg-ice-500 text-white shadow-[0_12px_28px_-12px_rgba(24,144,214,0.7)]"
                        : "border-ink-900/10 bg-white text-ink-600 hover:border-ice-400/60 hover:text-ice-700",
                    )}
                    aria-pressed={active === z.id}
                  >
                    {z.title}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Info panel */}
          <div className="flex flex-col gap-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="panel-light rounded-[22px] p-8"
              >
                <div className="flex items-center justify-between">
                  <HudLabel>{zone.code}</HudLabel>
                  <span className="hud-sm inline-flex items-center gap-2 rounded-full border border-ice-500/25 bg-ice-50 px-3 py-1.5 text-ice-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-ice-500 animate-blip" />
                    Zone info
                  </span>
                </div>

                <h3 className="mt-5 display-md text-[clamp(1.6rem,3vw,2.3rem)] text-ink-950">
                  {zone.title}
                </h3>
                <p className="mt-4 text-[1rem] leading-[1.8] text-ink-500">{zone.desc}</p>

                <ul className="mt-6 space-y-3">
                  {zone.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[0.95rem] text-ink-700">
                      <span className="h-[1px] w-6 bg-ice-500/70" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <Reveal delay={0.12}>
              <div className="rounded-[22px] bg-ink-950 p-7 text-white">
                <HudLabel tone="ice">Principle</HudLabel>
                <p className="mt-4 text-[1.02rem] leading-[1.8] text-ink-100/90">
                  Zones are not isolated rooms — they are stages of one continuous, controlled
                  environment.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ---------- Photo strip ---------- */}
        <HudRule left="Inside the facility" right="Visual gallery" className="mt-20" />
        <StaggerGroup className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              src: "/images/facility-exterior.jpg",
              alt: "Modern cold-storage facility exterior at night with illuminated loading docks",
              caption: "Facility exterior",
              sub: "Purpose-built cold storage",
              ratio: "aspect-[4/3]",
            },
            {
              src: "/images/coldroom-detail.jpg",
              alt: "Frost-covered racking and pallets inside a cold storage room",
              caption: "Cold-room operations",
              sub: "Handling inside the chain",
              ratio: "aspect-[4/3]",
            },
            {
              src: "/images/loading-bay.jpg",
              alt: "Refrigerated truck docked at a cold-storage loading bay with cold vapor",
              caption: "Loading bay",
              sub: "Controlled dock transfer",
              ratio: "aspect-[4/3]",
            },
          ].map((img) => (
            <RevealItem key={img.src}>
              <figure data-cursor="visual" className="group relative overflow-hidden rounded-[20px]">
                <SmartImage
                  src={img.src}
                  alt={img.alt}
                  ratio={img.ratio}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 28rem"
                />
                <figcaption className="absolute inset-x-4 bottom-4">
                  <div className="rounded-2xl border border-white/25 bg-ink-950/55 px-5 py-4 backdrop-blur-md">
                    <p className="display-md text-[1.02rem] text-white">{img.caption}</p>
                    <p className="mt-1 text-[0.82rem] text-white/70">{img.sub}</p>
                  </div>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}
