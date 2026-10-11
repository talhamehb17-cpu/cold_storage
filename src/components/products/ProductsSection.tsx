"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Leaf, Pill, Shell, Beef } from "lucide-react";

import { cn } from "@/lib/utils";
import { HudLabel, TextReveal } from "@/components/ui/Text";
import { Reveal } from "@/components/ui/Reveal";
import { FrostParticles, MistBand } from "@/components/ui/FrostParticles";
import { EASE_OUT } from "@/lib/animations/variants";

type Product = {
  id: string;
  title: string;
  headline: string;
  desc: string;
  mode: string;
  image: string;
  alt: string;
  accent: string;
  accentGlow: string;
  Icon: typeof Leaf;
};

const PRODUCTS: Product[] = [
  {
    id: "produce",
    title: "Fruits & Vegetables",
    headline: "Freshness held in place.",
    desc: "Fresh produce protected through controlled storage — organised handling keeps product moving while the environment stays steady.",
    mode: "Chilled profile",
    image: "/images/products-produce.jpg",
    alt: "Fresh fruits and vegetables in crates inside a cold storage room with frost and cool lighting",
    accent: "#34d399",
    accentGlow: "rgba(52,211,153,0.22)",
    Icon: Leaf,
  },
  {
    id: "meat",
    title: "Meat & Chicken",
    headline: "Protected at every stage.",
    desc: "Secure temperature-controlled storage for meat and poultry, with controlled handling from intake to dispatch.",
    mode: "Frozen profile",
    image: "/images/products-meat.jpg",
    alt: "Vacuum-sealed fresh meat and chicken on steel trays with crushed ice in a cold room",
    accent: "#fb7185",
    accentGlow: "rgba(251,113,133,0.2)",
    Icon: Beef,
  },
  {
    id: "seafood",
    title: "Seafood",
    headline: "Cold-chain, end to end.",
    desc: "Cold-chain protection for seafood from storage to dispatch, keeping the chain unbroken as product moves.",
    mode: "Frozen profile",
    image: "/images/products-seafood.jpg",
    alt: "Fresh fish and shellfish on glistening crushed ice with cold vapor in a cold store",
    accent: "#38bdf8",
    accentGlow: "rgba(56,189,248,0.22)",
    Icon: Shell,
  },
  {
    id: "pharma",
    title: "Pharmaceuticals",
    headline: "Control where it matters.",
    desc: "Controlled environments for temperature-sensitive products, designed around consistency, oversight and careful handling.",
    mode: "Controlled profile",
    image: "/images/products-pharma.jpg",
    alt: "Clean pharmaceutical packaging and glass vials on brushed steel shelving in a temperature-controlled room",
    accent: "#a5b4fc",
    accentGlow: "rgba(165,180,252,0.2)",
    Icon: Pill,
  },
];

export function ProductsSection() {
  const [active, setActive] = useState(0);
  const product = PRODUCTS[active];

  return (
    <section
      id="products"
      aria-labelledby="products-title"
      className="relative overflow-hidden bg-ink-900 py-28 text-white lg:py-40"
    >
      {/* Accent environment */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-all duration-700"
        style={{
          background: `radial-gradient(100% 80% at 82% 18%, ${product.accentGlow} 0%, rgba(10,23,40,0) 55%)`,
        }}
      />
      <MistBand className="opacity-60" />
      <FrostParticles id="products-frost" count={14} tone="ice" className="opacity-50" />
      <div aria-hidden className="grid-lines-dark-layer absolute inset-0 opacity-30" />

      <div className="relative mx-auto w-full max-w-[92rem] px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <HudLabel tone="ice">Products &amp; industries</HudLabel>
            </Reveal>
            <TextReveal
              as="h2"
              id="products-title"
              className="mt-6 display-lg text-[clamp(2.35rem,5.6vw,4.9rem)] text-metal-frost"
            >
              Four worlds. One cold standard.
            </TextReveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md text-[1.02rem] leading-[1.8] text-ink-200/80">
              Explore the categories we are built to serve — each with its own environment,
              handled inside one continuous cold chain.
            </p>
          </Reveal>
        </div>

        {/* ---------- Showcase ---------- */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:mt-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Selector */}
          <div role="tablist" aria-label="Product categories" className="flex flex-col gap-3">
            {PRODUCTS.map((p, i) => {
              const isActive = i === active;
              return (
                <div key={p.id} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="product-tab-glow"
                      transition={{ type: "spring", stiffness: 320, damping: 34 }}
                      className="absolute inset-0 rounded-2xl border border-white/12 bg-white/[0.07]"
                      style={{ boxShadow: `0 24px 60px -32px ${p.accentGlow}` }}
                    />
                  )}
                  <button
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`product-panel-${p.id}`}
                    id={`product-tab-${p.id}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    data-cursor="hover"
                    className={cn(
                      "relative z-10 flex w-full items-center gap-5 rounded-2xl px-5 py-5 text-left transition-colors duration-500 sm:px-7",
                      isActive ? "text-white" : "text-white/60 hover:text-white/90",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                        isActive ? "border-white/25 bg-white/10" : "border-white/12 bg-transparent",
                      )}
                    >
                      <p.Icon size={20} strokeWidth={1.7} style={{ color: isActive ? p.accent : undefined }} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-3">
                        <span className="hud-sm text-white/40">0{i + 1}</span>
                        <span className="display-md text-[clamp(1.15rem,2.3vw,1.65rem)]">{p.title}</span>
                      </span>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            key="desc"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: EASE_OUT }}
                            className="block overflow-hidden"
                          >
                            <span className="mt-2.5 block max-w-md text-[0.95rem] leading-relaxed text-ink-200/85">
                              {p.desc}
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>

                    <ArrowUpRight
                      size={18}
                      aria-hidden
                      className={cn(
                        "shrink-0 transition-all duration-500",
                        isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
                      )}
                      style={{ color: p.accent }}
                    />
                  </button>
                </div>
              );
            })}

            {/* Profile HUD */}
            <Reveal delay={0.1}>
              <div className="glass-dark mt-4 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <HudLabel tone="ice" tick={false}>
                    Environment mode
                  </HudLabel>
                  <span
                    className="hud-sm rounded-full px-3 py-1.5"
                    style={{ color: product.accent, background: product.accentGlow }}
                  >
                    {product.mode}
                  </span>
                </div>
                {/* Decorative meter */}
                <div className="mt-5 flex items-center gap-1.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="h-8 flex-1 rounded-sm"
                      animate={{
                        backgroundColor: i <= 3 + active * 2 ? product.accent : "rgba(255,255,255,0.1)",
                        opacity: i <= 3 + active * 2 ? 0.9 : 1,
                      }}
                      transition={{ duration: 0.4, delay: i * 0.03 }}
                    />
                  ))}
                </div>
                <p className="mt-4 text-[0.82rem] leading-relaxed text-white/55">
                  Modes are illustrative. Final storage profiles are defined per product
                  requirement.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Visual */}
          <div
            id={`product-panel-${product.id}`}
            role="tabpanel"
            aria-labelledby={`product-tab-${product.id}`}
            data-cursor="visual"
            className="relative min-h-[24rem] overflow-hidden rounded-[26px] lg:min-h-[34rem]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.75, ease: EASE_OUT }}
                className="absolute inset-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(195deg, rgba(5,13,25,0) 32%, rgba(5,13,25,0.82) 100%)`,
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(90% 70% at 80% 10%, ${product.accentGlow} 0%, rgba(5,13,25,0) 60%)`,
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Floating caption */}
            <div className="absolute inset-x-6 bottom-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={product.id + "-cap"}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  className="glass-dark rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3">
                    <product.Icon size={17} style={{ color: product.accent }} aria-hidden />
                    <span className="hud-sm text-white/75">{product.title}</span>
                  </div>
                  <p className="mt-2.5 display-md text-[clamp(1.15rem,2.2vw,1.6rem)] text-metal-frost">
                    {product.headline}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Corner index */}
            <div className="absolute right-6 top-6 rounded-full border border-white/15 bg-ink-950/50 px-4 py-2 backdrop-blur-md">
              <span className="font-mono text-[0.72rem] tracking-[0.22em] text-white/85">
                0{active + 1} / 0{PRODUCTS.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
