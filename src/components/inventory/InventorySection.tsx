"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Barcode, CheckCircle2, MapPin, PackageSearch, Radar, Thermometer } from "lucide-react";

import { cn } from "@/lib/utils";
import { HudLabel, TextReveal } from "@/components/ui/Text";
import { Reveal } from "@/components/ui/Reveal";
import { HudRule, Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/ui/SmartImage";
import { FrostParticles } from "@/components/ui/FrostParticles";
import { EASE_OUT } from "@/lib/animations/variants";

/** Demonstration scan sequence — interface simulation only. */
const SCAN_SEQUENCE = [
  "SCANNING…",
  "ITEM VERIFIED",
  "ZONE C-04",
  "TEMPERATURE STABLE",
] as const;

const DEMO_ROWS = [
  { k: "Product ID", v: "TJ-2841-C" },
  { k: "Barcode", v: "TJ 2841 0077 31" },
  { k: "Storage zone", v: "C-04" },
  { k: "Status", v: "In storage" },
  { k: "Temperature", v: "Stable" },
  { k: "Last movement", v: "Zone B → Zone C" },
];

/**
 * INVENTORY TRACKING — futuristic (but clearly labelled) interface demo.
 * Runs an animated barcode scan loop: SCANNING → VERIFIED → ZONE → STABLE.
 */
export function InventorySection() {
  const [phase, setPhase] = useState(0); // 0..3 = SCAN_SEQUENCE index, 4 = done
  const [running, setRunning] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // Run the demo when the section first enters view.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !running) {
          setRunning(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);

    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!running) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase(SCAN_SEQUENCE.length);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    SCAN_SEQUENCE.forEach((_, i) => {
      timers.push(setTimeout(() => setPhase(i + 1), 650 * (i + 1)));
    });
    return () => timers.forEach(clearTimeout);
  }, [running]);

  return (
    <Section
      id="inventory"
      tone="navy"
      labelledBy="inventory-title"
      className="relative overflow-hidden py-28 lg:py-40"
    >
      {/* Background visual */}
      <div aria-hidden className="absolute inset-0">
        <SmartImage
          src="/images/ops-detail.jpg"
          alt=""
          ratio="aspect-auto h-full w-full"
          hoverZoom={false}
          className="opacity-[0.16]"
          imgClassName="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(5,13,25,0.94)_28%,rgba(5,13,25,0.55)_100%)]" />
      </div>
      <FrostParticles id="inv-frost" count={12} tone="ice" className="opacity-40" />
      <div aria-hidden className="grid-lines-dark-layer absolute inset-0 opacity-40" />

      <div ref={root} className="relative mx-auto w-full max-w-[92rem] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
          {/* ---------- Copy + scan terminal ---------- */}
          <div>
            <Reveal>
              <HudLabel tone="ice">Inventory system</HudLabel>
            </Reveal>
            <TextReveal
              as="h2"
              id="inventory-title"
              className="mt-6 display-lg text-[clamp(2.35rem,5.4vw,4.6rem)] text-metal-frost"
            >
              Every item accounted for.
            </TextReveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-xl text-[1.05rem] leading-[1.85] text-ink-200/85">
                Organised inventory visibility keeps product identifiable, locatable and
                traceable across the facility — from intake to dispatch.
              </p>
            </Reveal>

            {/* Terminal */}
            <Reveal delay={0.18}>
              <div
                data-cursor="default"
                className="glass-dark mt-10 overflow-hidden rounded-[22px]"
              >
                {/* Terminal top bar */}
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-glow-400/80" />
                  </div>
                  <span className="hud-sm text-white/55">Interface demonstration</span>
                </div>

                {/* Barcode + scan */}
                <div className="px-6 py-7 sm:px-8">
                  <div className="flex items-center gap-4">
                    <Barcode size={20} className="text-glow-300" aria-hidden />
                    <div className="relative h-12 flex-1 overflow-hidden rounded-lg bg-white/[0.06]">
                      {/* barcode bars */}
                      <div className="absolute inset-0 flex items-center gap-[3px] px-3">
                        {Array.from({ length: 38 }).map((_, i) => (
                          <span
                            key={i}
                            className="h-8 rounded-[1px] bg-white/70"
                            style={{
                              width: (i * 7) % 3 === 0 ? 3.5 : (i * 5) % 3 === 0 ? 2 : 1.4,
                              opacity: phase >= 2 ? 0.95 : 0.45,
                              transition: "opacity 0.5s ease",
                            }}
                          />
                        ))}
                      </div>
                      {/* scan line */}
                      {running && phase < 4 && (
                        <div className="absolute inset-y-0 w-[2px] animate-scan bg-glow-400 shadow-[0_0_18px_2px_rgba(95,230,245,0.8)]" />
                      )}
                    </div>
                  </div>

                  {/* Sequence log */}
                  <div className="mt-6 min-h-[8.5rem] space-y-2.5">
                    {SCAN_SEQUENCE.map((step, i) => (
                      <AnimatePresence key={step}>
                        {phase > i && (
                          <motion.div
                            initial={{ opacity: 0, x: -14 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, ease: EASE_OUT }}
                            className="flex items-center gap-3 font-mono text-[0.82rem] tracking-[0.14em] text-glow-300"
                          >
                            <CheckCircle2 size={15} aria-hidden />
                            {step}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    ))}
                    {!running && (
                      <p className="font-mono text-[0.82rem] tracking-[0.14em] text-white/45">
                        READY — awaiting scan…
                      </p>
                    )}
                  </div>
                </div>

                {/* Data rows */}
                <div className="border-t border-white/10 px-6 py-6 sm:px-8">
                  <dl className="grid grid-cols-1 gap-x-10 gap-y-3.5 sm:grid-cols-2">
                    {DEMO_ROWS.map((row, i) => (
                      <div key={row.k} className="flex items-center justify-between gap-4">
                        <dt className="text-[0.85rem] text-white/55">{row.k}</dt>
                        <dd
                          className={cn(
                            "font-mono text-[0.85rem] tracking-wide transition-colors duration-500",
                            phase > i * 0.8 ? "text-white" : "text-white/35",
                          )}
                        >
                          {row.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-5 text-[0.78rem] leading-relaxed text-white/45">
                    Demonstration interface. Real inventory systems are configured during the
                    implementation phase.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---------- Visual side ---------- */}
          <div className="space-y-6">
            <Reveal variant="scale">
              <div className="relative overflow-hidden rounded-[24px]">
                <SmartImage
                  src="/images/control-room.jpg"
                  alt="Cold-chain operations control room with monitoring screens and temperature graphs"
                  ratio="aspect-[16/11]"
                  sizes="(max-width: 1024px) 100vw, 42rem"
                  className="rounded-[24px]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(190deg, rgba(5,13,25,0) 45%, rgba(5,13,25,0.8) 100%)",
                  }}
                />
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center gap-2.5">
                  {[
                    { Icon: PackageSearch, label: "Item identity" },
                    { Icon: MapPin, label: "Zone visibility" },
                    { Icon: Thermometer, label: "Condition status" },
                    { Icon: Radar, label: "Movement history" },
                  ].map(({ Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[0.78rem] font-medium text-white backdrop-blur-md"
                    >
                      <Icon size={14} aria-hidden className="text-glow-300" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-4">
              {[
                { v: "ID", k: "Product identity maintained" },
                { v: "ZONE", k: "Location structured & visible" },
              ].map((c, idx) => (
                <Reveal key={c.v} delay={0.1 + idx * 0.08}>
                  <div className="glass-dark h-full rounded-[18px] p-6">
                    <p className="display-md text-[1.5rem] text-glow-300">{c.v}</p>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-white/70">{c.k}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <HudRule tone="white" left="Scan demo" right="Frontend presentation only" className="mt-16" />
      </div>
    </Section>
  );
}
