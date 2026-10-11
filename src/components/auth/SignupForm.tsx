"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, UserPlus } from "lucide-react";

import {
  AuthPasswordField,
  AuthSubmitButton,
  AuthTextField,
  PasswordStrength,
} from "./AuthFields";
import { HudLabel } from "@/components/ui/Text";
import { EASE_OUT } from "@/lib/animations/variants";

type Values = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
};

const EMPTY: Values = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  password: "",
  confirm: "",
};

type Errors = Partial<Record<keyof Values, string>>;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (v.phone && v.phone.replace(/[^\d]/g, "").length < 7) e.phone = "Enter a valid phone number.";
  if (v.password.length < 8) e.password = "Use at least 8 characters.";
  if (v.confirm !== v.password) e.confirm = "Passwords do not match.";
  return e;
}

export function SignupForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (Object.keys(errors).length) setErrors(validate(next));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setStatus("idle");
      return;
    }
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.12 }}
    >
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            className="flex min-h-[26rem] flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.12 }}
              className="flex h-20 w-20 items-center justify-center rounded-full border border-ice-500/40 bg-ice-50"
            >
              <CheckCircle2 size={36} className="text-ice-600" aria-hidden />
            </motion.div>
            <h1 className="mt-7 display-md text-[1.95rem] text-ink-950">Account created.</h1>
            <p className="mt-4 max-w-sm text-[1rem] leading-[1.8] text-ink-500">
              Welcome to Tahseen Jaber — your cold-chain workspace is ready to be connected in
              the next phase.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2.5 rounded-full bg-ink-900 px-8 py-4 text-[0.95rem] font-semibold text-white transition-all hover:bg-ink-800 hover:shadow-[0_20px_50px_-18px_rgba(8,32,60,0.7)]"
              >
                Continue to Sign In
              </Link>
              <button
                type="button"
                onClick={() => {
                  setValues(EMPTY);
                  setErrors({});
                  setStatus("idle");
                }}
                className="text-[0.88rem] font-semibold text-ice-700 hover:text-ice-800"
              >
                Create another account
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            transition={{ duration: 0.35 }}
          >
            <HudLabel>Join the platform</HudLabel>
            <h1 className="mt-5 display-lg text-[clamp(2.35rem,4.4vw,3.35rem)] text-metal-navy">
              Create account
            </h1>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-500">
              Start your temperature-controlled storage journey with us.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <AuthTextField
                id="fullName"
                label="Full Name"
                required
                value={values.fullName}
                onChange={set("fullName")}
                onBlur={() => setErrors(validate(values))}
                error={errors.fullName}
                placeholder="Your name"
                autoComplete="name"
              />
              <AuthTextField
                id="company"
                label="Company"
                value={values.company}
                onChange={set("company")}
                placeholder="Company name"
                autoComplete="organization"
              />
              <AuthTextField
                id="email"
                label="Email"
                type="email"
                required
                value={values.email}
                onChange={set("email")}
                onBlur={() => setErrors(validate(values))}
                error={errors.email}
                placeholder="you@company.com"
                autoComplete="email"
              />
              <AuthTextField
                id="phone"
                label="Phone"
                type="tel"
                value={values.phone}
                onChange={set("phone")}
                onBlur={() => setErrors(validate(values))}
                error={errors.phone}
                placeholder="+000 000 0000"
                autoComplete="tel"
              />
            </div>

            <div className="mt-5">
              <AuthPasswordField
                id="password"
                required
                value={values.password}
                onChange={set("password")}
                onBlur={() => setErrors(validate(values))}
                error={errors.password}
                placeholder="At least 8 characters"
                autoComplete="new-password"
              />
              <PasswordStrength password={values.password} />
            </div>

            <div className="mt-5">
              <AuthPasswordField
                id="confirm"
                label="Confirm Password"
                required
                value={values.confirm}
                onChange={set("confirm")}
                onBlur={() => setErrors(validate(values))}
                error={errors.confirm}
                placeholder="Repeat your password"
                autoComplete="new-password"
              />
            </div>

            <div className="mt-8">
              <AuthSubmitButton loading={status === "loading"}>
                <UserPlus size={17} aria-hidden />
                Create Account
              </AuthSubmitButton>
            </div>

            <p className="mt-8 text-center text-[0.92rem] text-ink-500">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-ice-700 hover:text-ice-800">
                Sign in
              </Link>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
