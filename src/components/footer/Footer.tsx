"use client";

import Link from "next/link";

import { COMPANY, NAV_ITEMS, SOCIAL_LINKS } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/Button";
import { HudRule } from "@/components/ui/Section";
import { FrostParticles } from "@/components/ui/FrostParticles";
import { scrollToTarget } from "@/components/chrome/SmoothScroll";

const QUICK_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Solutions", href: "#solutions" },
  { label: "Facility", href: "#facility" },
  { label: "Security", href: "#security" },
  { label: "Logistics", href: "#logistics" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="relative overflow-hidden bg-ink-950 text-white">
      <FrostParticles id="footer-frost" count={18} tone="ice" className="opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 55% at 50% -8%, rgba(24,144,214,0.2) 0%, rgba(5,13,25,0) 62%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[92rem] px-6 pb-10 pt-24 sm:px-10 lg:px-16 lg:pt-32">
        {/* Grid */}
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-7">
            <Logo tone="white" />
            <p className="max-w-xs text-[0.95rem] leading-relaxed text-ink-300">
              Premium cold storage and temperature-controlled logistics — precision cooling and
              controlled handling from arrival to delivery.
            </p>
            {SOCIAL_LINKS.length > 0 && (
              <ul className="flex gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/70 transition hover:border-glow-400/60 hover:text-glow-300"
                    >
                      <span className="sr-only">{s.label}</span>
                      <span aria-hidden>{s.label.slice(0, 2)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer — quick links">
            <p className="hud-sm mb-6 text-white/45">Explore</p>
            <ul className="space-y-3.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      if (l.href === "#top") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        scrollToTarget(l.href, 88);
                      }
                    }}
                    className="group inline-flex items-center gap-2 text-[0.95rem] text-ink-200/90 transition-colors hover:text-white"
                  >
                    <span
                      aria-hidden
                      className="h-[1px] w-4 bg-white/25 transition-all duration-300 group-hover:w-7 group-hover:bg-glow-400"
                    />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — company">
            <p className="hud-sm mb-6 text-white/45">Company</p>
            <ul className="space-y-3.5">
              {NAV_ITEMS.filter((n) => n.id !== "top" && n.id !== "contact").slice(0, 5).map((n) => (
                <li key={n.id}>
                  <a
                    href={n.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToTarget(n.href, 88);
                    }}
                    className="text-[0.95rem] text-ink-200/90 transition-colors hover:text-white"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/login" className="text-[0.95rem] text-ink-200/90 transition-colors hover:text-white">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-[0.95rem] text-ink-200/90 transition-colors hover:text-white">
                  Create Account
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="hud-sm mb-6 text-white/45">Contact</p>
            <address className="not-italic">
              <p className="display-md text-[1.15rem] text-white">{COMPANY.name}</p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-300">
                {COMPANY.address.area}
                <br />
                {COMPANY.address.city}, {COMPANY.address.country}
              </p>
            </address>
            <div className="mt-6 flex flex-col items-start gap-3">
              <MagneticButton href="#contact" size="sm" variant="onDarkGhost">
                Request Storage
              </MagneticButton>
            </div>
          </div>
        </div>

        <HudRule tone="white" left="Precision cooling · Controlled handling" right="Baghdad · Iraq" />

        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-[0.8rem] text-white/45 sm:flex-row sm:items-center">
          <p>
            © {year} {COMPANY.name}. All rights reserved.
          </p>
          <p className="max-w-md text-white/35 sm:text-right">
            Website presentation only — capability details will be confirmed with our team.
          </p>
        </div>
      </div>
    </footer>
  );
}
