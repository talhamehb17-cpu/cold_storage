"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { NAV_ITEMS, SPY_SECTIONS } from "@/lib/site";
import { cn } from "@/lib/utils";

import { scrollToTarget } from "@/components/chrome/SmoothScroll";
import { MagneticButton } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

const NAV_OFFSET = 96;

/**
 * Floating premium navigation.
 * - Transparent over the hero → frosted glass once scrolled
 * - Scroll-spy active states
 * - Full-screen mobile overlay menu
 */
export function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("top");

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = Number(scrollY.getPrevious());
    setScrolled(y > 40);
    // Hide on scroll down (desktop only), reveal on scroll up.
    setHidden(y > 560 && y > prev + 6 && !menuOpen);
    if (y < prev - 6) setHidden(false);
  });

  // Scroll spy
  useEffect(() => {
    if (!isHome) return;
    const targets = SPY_SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.05, 0.25, 0.6] },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [isHome, pathname]);

  // Lock body scroll while menu open
  useEffect(() => {
    document.documentElement.classList.toggle("overflow-locked", menuOpen);
    if (menuOpen) {
      (window as unknown as { __lenis?: { stop: () => void } }).__lenis?.stop();
    } else {
      (window as unknown as { __lenis?: { start: () => void } }).__lenis?.start();
    }
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("#")) {
        e.preventDefault();
        setMenuOpen(false);
        const id = href === "#top" ? "#top" : href;
        if (id === "#top") {
          const lenis = (window as unknown as { __lenis?: { scrollTo: (v: number, o?: object) => void } })
            .__lenis;
          if (lenis) lenis.scrollTo(0, { duration: 1.2 });
          else window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          scrollToTarget(id, NAV_OFFSET);
        }
      }
    },
    [],
  );

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          y: hidden ? -130 : 0,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 32 }}
        className="fixed inset-x-0 top-0 z-[90] px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8 lg:pt-6"
      >
        <nav
          aria-label="Primary"
          data-cursor="default"
          className={cn(
            "mx-auto flex w-full max-w-[88rem] items-center justify-between rounded-2xl border px-5 py-3 transition-[background,box-shadow,border-color,backdrop-filter] duration-500 sm:px-6",
            scrolled || !isHome
              ? "border-white/60 bg-white/80 shadow-[0_26px_70px_-32px_rgba(8,32,60,0.55)] backdrop-blur-xl"
              : "border-white/10 bg-transparent",
          )}
        >
          <Link
            href="/"
            onClick={(e) => {
              if (isHome) handleNavClick(e, "#top");
            }}
            className="group relative z-10 shrink-0"
            aria-label="Tahseen Jaber Cold Storage & Logistics — home"
          >
            <Logo
              tone={scrolled || !isHome ? "navy" : "white"}
              className="transition-colors duration-500"
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 xl:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = isHome && active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={isHome ? item.href : `/${item.href}`}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "group relative inline-flex items-center px-3.5 py-2 text-[0.82rem] font-medium tracking-tight transition-colors duration-300",
                      scrolled || !isHome
                        ? isActive
                          ? "text-ice-700"
                          : "text-ink-800/80 hover:text-ink-950"
                        : isActive
                          ? "text-white"
                          : "text-white/75 hover:text-white",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-[1.5px] rounded-full bg-gradient-to-r from-ice-400 to-glow-400 transition-[transform,opacity] duration-300",
                        isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 xl:flex">
            <MagneticButton
              href="/login"
              size="sm"
              variant={scrolled || !isHome ? "secondary" : "onDarkGhost"}
              sheen={false}
            >
              Sign In
            </MagneticButton>
            <MagneticButton
              href={isHome ? "#contact" : "/#contact"}
              size="sm"
              variant={scrolled || !isHome ? "primary" : "onDark"}
            >
              Request Storage
            </MagneticButton>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={cn(
              "relative z-[95] flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 xl:hidden",
              scrolled || !isHome
                ? "border-ink-900/12 bg-white/70"
                : "border-white/25 bg-white/10 backdrop-blur-md",
            )}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span
              className={cn(
                "absolute h-[1.5px] w-5 transition-[transform,background-color] duration-300",
                scrolled || !isHome ? "bg-ink-900" : "bg-white",
                menuOpen ? "rotate-45" : "-translate-y-[4.5px]",
              )}
            />
            <span
              className={cn(
                "absolute h-[1.5px] w-5 transition-[transform,background-color,opacity] duration-300",
                scrolled || !isHome ? "bg-ink-900" : "bg-white",
                menuOpen ? "-rotate-45" : "translate-y-[4.5px]",
              )}
            />
          </button>
        </nav>
      </motion.header>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[92] overflow-hidden bg-ink-950/96 backdrop-blur-2xl xl:hidden"
          >
            {/* Decorative cold atmosphere */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 80% at 85% -10%, rgba(24,144,214,0.35) 0%, rgba(5,13,25,0) 58%), radial-gradient(90% 60% at 10% 110%, rgba(95,230,245,0.16) 0%, rgba(5,13,25,0) 55%)",
              }}
            />

            <div className="relative flex h-full flex-col justify-between px-6 pb-8 pt-28 sm:px-10">
              <nav aria-label="Mobile">
                <motion.ul
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: 0.12 } } }}
                  className="flex flex-col gap-1"
                >
                  {NAV_ITEMS.map((item) => (
                    <motion.li
                      key={item.id}
                      variants={{
                        hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
                        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55 } },
                      }}
                    >
                      <a
                        href={isHome ? item.href : `/${item.href}`}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={cn(
                          "group flex items-center gap-4 py-2.5",
                          active === item.id ? "text-white" : "text-white/60",
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "h-[1px] transition-all duration-500",
                            active === item.id ? "w-10 bg-glow-400" : "w-4 bg-white/30",
                          )}
                        />
                        <span className="display-md text-[clamp(1.9rem,8.5vw,2.75rem)]">{item.label}</span>
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5 } }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-3"
              >
                <MagneticButton
                  href={isHome ? "#contact" : "/#contact"}
                  size="lg"
                  variant="onDark"
                  className="w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Request Storage
                </MagneticButton>
                <div className="flex gap-3">
                  <MagneticButton href="/login" variant="onDarkGhost" className="flex-1" onClick={() => setMenuOpen(false)}>
                    Sign In
                  </MagneticButton>
                  <MagneticButton href="/signup" variant="onDarkGhost" className="flex-1" onClick={() => setMenuOpen(false)}>
                    Create Account
                  </MagneticButton>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
