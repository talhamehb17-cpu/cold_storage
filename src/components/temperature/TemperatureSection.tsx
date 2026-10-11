"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import { cn, mapRange, seededRandom } from "@/lib/utils";
import { HudLabel, TextReveal } from "@/components/ui/Text";
import { Reveal } from "@/components/ui/Reveal";
import { HudRule, Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/ui/SmartImage";

const MIN = -25;
const MAX = 8;

const PROFILES = [
  { max: 2, min: 8, name: "Mild", note: "Soft cooling — gentle airflow, low frost." },
  { max: -2, min: 2, name: "Cool", note: "Steady chilled profile with firmer air." },
  { max: -12, min: -2, name: "Cold", note: "Deepening cold — mist and frost begin." },
  { max: -25, min: -12, name: "Frozen", note: "Hard freeze environment — heavy frost." },
];

export function TemperatureSection() {
  const [temp, setTemp] = useState(-4);

  // Frost intensity 0 → 1 (colder = denser frost)
  const frost = useMemo(() => mapRange(temp, MAX, MIN, 0, 1), [temp]);

  const profile = useMemo(
    () => PROFILES.find((p) => temp <= p.max && temp > p.min) ?? PROFILES[0],
    [temp],
  );

  // Environment grade (subtle — warm-slate → ice)
  const envStyle = {
    "--env-tint": `rgba(${Math.round(mapRange(frost, 0, 1, 120, 69))}, ${Math.round(
      mapRange(frost, 0, 1, 148, 173),
    )}, ${Math.round(mapRange(frost, 0, 1, 176, 236))}, ${mapRange(frost, 0, 1, 0.05, 0.17)})`,
    "--env-frost": frost,
  } as React.CSSProperties;

  return (
    <Section
      id="temperature"
      tone="frost"
      labelledBy="temperature-title"
      className="relative overflow-hidden py-28 lg:py-40"
    >
      {/* Environment tint layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(120% 90% at 85% 15%, var(--env-tint) 0%, rgba(255,255,255,0) 62%)`,
        }}
      />

      <div style={envStyle} className="relative">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-20">
          {/* ---------- Left: controls ---------- */}
          <div>
            <Reveal>
              <HudLabel>Temperature experience</HudLabel>
            </Reveal>
            <TextReveal
              as="h2"
              id="temperature-title"
              className="mt-6 display-lg text-[clamp(2.35rem,5.4vw,4.6rem)] text-metal-navy"
            >
              Feel the cold change.
            </TextReveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.85] text-ink-500">
                Move the control and watch the environment respond — a simple way to feel what
                temperature management means inside a cold-storage facility.
              </p>
            </Reveal>

            {/* Big readout */}
            <Reveal delay={0.18}>
              <div className="mt-12">
                <div className="flex items-end gap-3">
                  <motion.span
                    key={Math.round(temp * 10)}
                    initial={{ opacity: 0.6, y: 6, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.3 }}
                    className="font-mono text-[clamp(4.2rem,10vw,7.2rem)] font-medium leading-none tracking-tight text-ink-900 tabular-nums"
                  >
                    {temp > 0 ? "+" : ""}
                    {temp.toFixed(1)}
                  </motion.span>
                  <span className="mb-3 font-mono text-[clamp(1.6rem,3vw,2.4rem)] font-medium text-ice-600">
                    °C
                  </span>
                  <div className="mb-4 ml-2">
                    <span className="hud inline-flex items-center gap-2 rounded-full border border-ice-500/30 bg-white/70 px-3.5 py-1.5 text-ice-700">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-ice-500"
                        style={{ opacity: 0.4 + frost * 0.6 }}
                      />
                      {profile.name} profile
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-[0.92rem] text-ink-500">{profile.note}</p>

                {/* Slider */}
                <div className="mt-8">
                  <label htmlFor="temp-slider" className="sr-only">
                    Demonstrative temperature control in degrees Celsius, from {MAX} to {MIN}
                  </label>
                  <input
                    id="temp-slider"
                    type="range"
                    min={MIN}
                    max={MAX}
                    step={0.5}
                    value={temp}
                    onChange={(e) => setTemp(Number(e.target.value))}
                    className="temp-slider w-full"
                    aria-valuetext={`${temp.toFixed(1)} degrees Celsius, ${profile.name} profile`}
                  />
                  <div className="mt-3 flex justify-between">
                    {[MAX, 0, -10, MIN].map((t) => (
                      <span key={t} className="font-mono text-[0.68rem] tracking-wider text-ink-400">
                        {t > 0 ? `+${t}` : t}°
                      </span>
                    ))}
                  </div>
                </div>

                <HudRule left="Illustrative control" right="Demo values" className="mt-8" />
                <p className="mt-3 max-w-md text-[0.82rem] leading-relaxed text-ink-400">
                  This control demonstrates environment storytelling only. Exact storage
                  conditions are configured for each requirement with our team.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ---------- Right: visual that "freezes" ---------- */}
          <Reveal variant="scale" delay={0.1} className="relative">
            <div data-cursor="visual" className="group/vis relative overflow-hidden rounded-[26px] shadow-panel">
              <SmartImage
                src="/images/coldroom-aisle.jpg"
                alt="Aisle inside a cold storage room with frost-covered racking and cool blue lighting"
                ratio="aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5]"
                sizes="(max-width: 1024px) 100vw, 40rem"
                className="rounded-[26px]"
              />

              {/* Frost overlay — intensifies as temperature drops */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(215deg, rgba(179,225,255,0.32) 0%, rgba(122,200,245,0.12) 38%, rgba(10,23,40,0.42) 100%)",
                  opacity: 0.18 + frost * 0.62,
                  transition: "opacity 0.45s ease",
                }}
              />
              {/* Frost crystal vignette */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(115% 105% at 8% -5%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 45%)",
                  opacity: 0.25 + frost * 0.75,
                  transition: "opacity 0.45s ease",
                }}
              />

              {/* Snow dust */}
              <FrostDust density={frost} />

              {/* Corner HUD */}
              <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-ink-950/45 px-3.5 py-2 backdrop-blur-md">
                <span className="hud-sm text-white/85">Chamber view · demo</span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 rounded-2xl border border-white/20 bg-ink-950/55 p-4 backdrop-blur-md">
                <div>
                  <p className="hud-sm text-white/60">Environment</p>
                  <p className="mt-1 font-mono text-sm text-glow-300">{profile.name.toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="hud-sm text-white/60">Readout</p>
                  <p className="mt-1 font-mono text-sm text-white">
                    {temp > 0 ? "+" : ""}
                    {temp.toFixed(1)}°C
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/** Procedural frost dust — density scales 0 → 1 with coldness. */
function FrostDust({ density }: { density: number }) {
  const flakes = useMemo(() => {
    const rnd = seededRandom(20261011);
    return Array.from({ length: 34 }, (_, i) => ({
      key: i,
      left: `${rnd() * 100}%`,
      top: `${rnd() * 100}%`,
      size: 1.2 + rnd() * 3.2,
      drift: (rnd() - 0.5) * 40,
      duration: 12 + rnd() * 18,
    }));
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {flakes.map((f) => (
        <span
          key={f.key}
          className="absolute rounded-full bg-white animate-frost-drift motion-reduce:hidden"
          style={{
            left: f.left,
            top: f.top,
            width: f.size,
            height: f.size,
            opacity: 0.12 + density * 0.55,
            filter: "blur(0.4px)",
            animationDuration: `${f.duration}s`,
            animationDelay: `-${f.duration / 2}s`,
          }}
        />
      ))}
    </div>
  );
}
