"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { COMPANY } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { FrostParticles, MistBand } from "@/components/ui/FrostParticles";
import { EASE_OUT } from "@/lib/animations/variants";
import { scrollToTarget } from "@/components/chrome/SmoothScroll";

/**
 * Shared auth layout — cinematic image panel + glass form panel.
 * Used by /login and /signup; the route template animates the swap.
 */
export function AuthShell({
  side,
  children,
}: {
  side: "login" | "signup";
  children: React.ReactNode;
}) {
  return (
    <main id="main" className="relative min-h-[100svh] overflow-hidden bg-frost">
      {/* Ambient cold background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 90% 0%, rgba(24,144,214,0.14) 0%, rgba(246,250,253,0) 55%)",
        }}
      />

      <div className="grid min-h-[100svh] grid-cols-1 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
        {/* ---------- Visual side ---------- */}
        <aside className="relative hidden overflow-hidden lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/auth-visual.jpg"
            alt="Refrigerated trailer docked at a cold-storage facility at night with cold mist"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(195deg, rgba(5,13,25,0.55) 0%, rgba(5,13,25,0.3) 42%, rgba(5,13,25,0.88) 100%)",
            }}
          />
          <MistBand flipped className="h-[45%] opacity-70" />
          <FrostParticles id={`auth-frost-${side}`} count={22} />
          <div aria-hidden className="grid-lines-dark-layer absolute inset-0 opacity-30" />

          <div className="relative flex h-full flex-col justify-between p-12 text-white">
            <Link href="/" aria-label="Back to the homepage" className="w-fit">
              <Logo tone="white" />
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT }}
              className="max-w-md"
            >
              <p className="hud text-glow-300">Cold chain platform</p>
              <h2 className="mt-5 display-lg text-[clamp(2.4rem,3.6vw,3.6rem)] text-metal-frost">
                {side === "login" ? (
                  <>
                    Control starts
                    <br />
                    at the door.
                  </>
                ) : (
                  <>
                    Join the
                    <br />
                    cold chain.
                  </>
                )}
              </h2>
              <p className="mt-6 text-[1.02rem] leading-[1.8] text-ink-100/80">
                {side === "login"
                  ? "Access your temperature-controlled storage workspace — monitoring, inventory and logistics in one place."
                  : "Create an account to start managing storage requirements and cold-chain operations with our team."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE_OUT }}
              className="flex items-center gap-3"
            >
              {["Receiving", "Storage", "Monitoring", "Dispatch"].map((chip, i) => (
                <span
                  key={chip}
                  className="glass-dark rounded-full px-4 py-2 text-[0.78rem] font-medium text-white/85"
                >
                  {chip}
                </span>
              ))}
            </motion.div>
          </div>
        </aside>

        {/* ---------- Form side ---------- */}
        <section className="relative flex flex-col">
          {/* Top bar (mobile & desktop) */}
          <div className="flex items-center justify-between px-6 pt-8 sm:px-10 lg:px-14 lg:pt-10">
            <Link href="/" className="lg:hidden" aria-label="Back to the homepage">
              <Logo tone="navy" />
            </Link>
            <Link
              href="/"
              className="hidden items-center gap-2 text-[0.85rem] font-medium text-ink-500 transition-colors hover:text-ice-700 lg:flex"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to website
            </Link>

            <p className="text-[0.85rem] text-ink-500">
              {side === "login" ? (
                <>
                  New here?{" "}
                  <Link href="/signup" className="font-semibold text-ice-700 hover:text-ice-800">
                    Create account
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link href="/login" className="font-semibold text-ice-700 hover:text-ice-800">
                    Sign in
                  </Link>
                </>
              )}
            </p>
          </div>

          {/* Form container */}
          <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:px-14">
            <div className="w-full max-w-[30rem]">{children}</div>
          </div>

          {/* Bottom note */}
          <div className="px-6 pb-8 sm:px-10 lg:px-14">
            <p className="text-center text-[0.78rem] leading-relaxed text-ink-400 lg:text-left">
              {COMPANY.name} · {COMPANY.address.display} — frontend demonstration. Authentication
              is not connected yet.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

/** Route transition wrapper — branded glass slide between /login and /signup. */
export function AuthTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 26, filter: "blur(10px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
