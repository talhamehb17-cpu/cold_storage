"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, LogIn, TriangleAlert } from "lucide-react";

import { AuthPasswordField, AuthSubmitButton, AuthTextField } from "./AuthFields";
import { HudLabel } from "@/components/ui/Text";
import { EASE_OUT } from "@/lib/animations/variants";

type Errors = { identity?: string; password?: string };

export function LoginForm() {
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "notice">("idle");
  const [remember, setRemember] = useState(true);

  const validate = (): Errors => {
    const e: Errors = {};
    if (identity.trim().length < 3) e.identity = "Enter your email or username.";
    if (password.length < 6) e.password = "Password must be at least 6 characters.";
    return e;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setStatus("idle");
      return;
    }
    setStatus("loading");
    window.setTimeout(() => setStatus("notice"), 1100);
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      noValidate
      initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.12 }}
    >
      <HudLabel>Secure access</HudLabel>
      <h1 className="mt-5 display-lg text-[clamp(2.35rem,4.4vw,3.35rem)] text-metal-navy">
        Welcome back
      </h1>
      <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-500">
        Sign in to your cold-chain workspace.
      </p>

      <div className="mt-9 flex flex-col gap-5">
        <AuthTextField
          id="identity"
          label="Email / Username"
          required
          value={identity}
          onChange={(e) => setIdentity(e.target.value)}
          onBlur={() => setErrors(validate())}
          error={errors.identity}
          placeholder="you@company.com"
          autoComplete="username"
        />
        <AuthPasswordField
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setErrors(validate())}
          error={errors.password}
          placeholder="••••••••"
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <label className="inline-flex cursor-pointer items-center gap-2.5 text-[0.88rem] text-ink-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="peer sr-only"
            />
            <span
              aria-hidden
              className="flex h-5 w-5 items-center justify-center rounded-md border border-ink-900/15 bg-white transition-colors peer-checked:border-ice-500 peer-checked:bg-ice-500 peer-focus-visible:ring-4 peer-focus-visible:ring-ice-500/25"
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2 6.2 4.7 9 10 3.4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Remember me
          </label>

          <button
            type="button"
            className="text-[0.88rem] font-semibold text-ice-700 transition-colors hover:text-ice-800"
            onClick={() => {
              setErrors({});
              setStatus("notice");
            }}
          >
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Demo notice / error states */}
      <AnimatePresence>
        {status === "notice" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="mt-6 flex items-start gap-3 rounded-xl border border-ice-500/30 bg-ice-50 p-4"
          >
            <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-ice-600" aria-hidden />
            <p className="text-[0.88rem] leading-relaxed text-ink-700">
              Frontend demonstration — account access is not connected yet. Authentication
              arrives in the next development phase.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8">
        <AuthSubmitButton loading={status === "loading"}>
          <LogIn size={17} aria-hidden />
          Sign In
        </AuthSubmitButton>
      </div>

      <p className="mt-8 text-center text-[0.92rem] text-ink-500">
        New to Tahseen Jaber?{" "}
        <Link href="/signup" className="font-semibold text-ice-700 hover:text-ice-800">
          Create Account
        </Link>
      </p>
    </motion.form>
  );
}
