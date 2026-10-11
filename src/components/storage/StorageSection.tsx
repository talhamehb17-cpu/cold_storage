"use client";

import { ArrowUpRight, Boxes, CalendarRange, Thermometer, Eye } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { HudLabel, TextReveal } from "@/components/ui/Text";
import { Reveal, RevealItem, StaggerGroup } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/ui/SmartImage";
import { scrollToTarget } from "@/components/chrome/SmoothScroll";

const SOLUTIONS = [
  {
    num: "01",
    title: "Short-Term Storage",
    desc: "Flexible cold storage for temporary requirements — space that adapts to the rhythm of your operation.",
    Icon: CalendarRange,
    image: "/images/loading-bay.jpg",
    alt: "Refrigerated truck at a cold-storage loading bay",
  },
  {
    num: "02",
    title: "Long-Term Storage",
    desc: "Reliable controlled storage for ongoing operations — a steady environment for the long run.",
    Icon: Boxes,
    image: "/images/coldroom-detail.jpg",
    alt: "Frost-covered pallets in long-term cold storage racking",
  },
  {
    num: "03",
    title: "Temperature-Controlled Logistics",
    desc: "Cold-chain support throughout movement and handling — the environment travels with the product.",
    Icon: Thermometer,
    image: "/images/truck-highway.jpg",
    alt: "Refrigerated truck travelling on a highway at dusk",
  },
  {
    num: "04",
    title: "Inventory Visibility",
    desc: "Organised tracking and monitoring — product stays identifiable and locatable at every step.",
    Icon: Eye,
    image: "/images/ops-detail.jpg",
    alt: "Operations monitoring screens showing inventory and facility data",
  },
];

export function StorageSection() {
  return (
    <Section
      id="solutions"
      tone="frost"
      labelledBy="solutions-title"
      className="relative overflow-hidden py-28 lg:py-40"
    >
      <div aria-hidden className="grid-lines-layer pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
          <div>
            <Reveal>
              <HudLabel>Storage solutions</HudLabel>
            </Reveal>
            <TextReveal
              as="h2"
              id="solutions-title"
              className="mt-6 display-lg text-[clamp(2.35rem,5.6vw,4.9rem)] text-metal-navy"
            >
              Space that adapts. Cold that holds.
            </TextReveal>
          </div>
          <Reveal delay={0.14}>
            <p className="max-w-xl text-[1.02rem] leading-[1.8] text-ink-500">
              From a single week of overflow to a permanent cold-storage partner — four ways we
              keep product protected.
            </p>
          </Reveal>
        </div>

        {/* ---------- Editorial rows ---------- */}
        <StaggerGroup className="mt-16 space-y-4 lg:mt-20">
          {SOLUTIONS.map((s, i) => (
            <RevealItem key={s.num}>
              <button
                type="button"
                data-cursor="hover"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget("#contact", 96);
                }}
                className="group block w-full rounded-[22px] border border-ink-900/8 bg-white text-left transition-all duration-500 hover:-translate-y-1 hover:border-ice-400/45 hover:shadow-lift"
              >
                <div className="flex flex-col items-stretch gap-0 sm:flex-row">
                  {/* Image strip */}
                  <div className="relative w-full shrink-0 overflow-hidden rounded-t-[21px] sm:w-40 sm:rounded-l-[21px] sm:rounded-tr-none lg:w-52">
                    <SmartImage
                      src={s.image}
                      alt={s.alt}
                      ratio="aspect-[16/7] sm:aspect-[3/4]"
                      sizes="(max-width: 640px) 100vw, 13rem"
                      className="h-full"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
                      style={{
                        background:
                          "linear-gradient(185deg, rgba(5,13,25,0.12) 20%, rgba(5,13,25,0.5) 100%)",
                      }}
                    />
                    <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-ink-950/50 px-3 py-1.5 font-mono text-[0.68rem] tracking-[0.22em] text-white backdrop-blur-md">
                      {s.num}
                    </span>
                  </div>

                  {/* Copy */}
                  <div className="flex flex-1 flex-col justify-center gap-4 p-7 sm:flex-row sm:items-center sm:gap-8 sm:p-9">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ice-50 text-ice-700 transition-colors duration-500 group-hover:bg-ice-500 group-hover:text-white">
                      <s.Icon size={19} strokeWidth={1.7} aria-hidden />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="display-md text-[clamp(1.35rem,3vw,2.15rem)] text-ink-950">
                        {s.title}
                      </h3>
                      <p className="mt-2.5 max-w-2xl text-[0.98rem] leading-[1.75] text-ink-500">
                        {s.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 self-start sm:self-auto">
                      <span className="hud-sm hidden text-ice-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:inline">
                        Discuss this solution
                      </span>
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink-900/10 text-ink-700 transition-all duration-500 group-hover:rotate-45 group-hover:border-ice-500 group-hover:bg-ice-500 group-hover:text-white">
                        <ArrowUpRight size={18} aria-hidden />
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </RevealItem>
          ))}
        </StaggerGroup>

        {/* Bottom strip */}
        <Reveal delay={0.1} className="mt-14">
          <motion.div
            className="relative overflow-hidden rounded-[22px]"
            whileHover="hover"
            initial="rest"
            animate="rest"
          >
            <SmartImage
              src="/images/freezer-coils.jpg"
              alt="Frost forming on the steel coils of an industrial refrigeration unit"
              ratio="aspect-[21/8]"
              sizes="100vw"
              className="rounded-[22px]"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(95deg, rgba(5,13,25,0.82) 0%, rgba(5,13,25,0.25) 55%, rgba(5,13,25,0.05) 100%)",
              }}
            />
            <div className="absolute inset-y-0 left-0 flex max-w-xl flex-col justify-center p-8 sm:p-12">
              <HudLabel tone="ice">Precision cooling</HudLabel>
              <p className="mt-3 display-md text-[clamp(1.3rem,2.6vw,2.05rem)] text-metal-frost">
                The technology behind the temperature.
              </p>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </Section>
  );
}
