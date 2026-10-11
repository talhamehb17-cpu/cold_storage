"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Loader2, MapPin, Send, TriangleAlert } from "lucide-react";

import { PRODUCT_TYPES, STORAGE_REQUIREMENTS, COMPANY } from "@/lib/site";
import { cn } from "@/lib/utils";
import { HudLabel, TextReveal } from "@/components/ui/Text";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/Button";
import { FrostParticles, MistBand } from "@/components/ui/FrostParticles";
import { EASE_OUT } from "@/lib/animations/variants";

type Fields = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  productType: string;
  storageNeed: string;
  message: string;
};

const EMPTY: Fields = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  productType: "",
  storageNeed: "",
  message: "",
};

type Errors = Partial<Record<keyof Fields, string>>;

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (values.fullName.trim().length < 2) errors.fullName = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (values.phone && values.phone.replace(/[^\d]/g, "").length < 7)
    errors.phone = "Please enter a valid phone number.";
  if (values.message.trim().length < 10)
    errors.message = "Please tell us a little more (at least 10 characters).";
  return errors;
}

/**
 * CTA + INQUIRY — "KEEP YOUR SUPPLY CHAIN COLD. KEEP IT MOVING."
 * Frontend-only form: full validation, loading / success / error states.
 * (No backend in this phase.)
 */
export function InquirySection() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched.has(k)) setErrors(validate(next));
  };

  const blur = (k: keyof Fields) => () => {
    const nextTouched = new Set(touched).add(k);
    setTouched(nextTouched);
    setErrors(validate(values));
  };

  const focusForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      const first = formRef.current?.querySelector<HTMLElement>("#fullName");
      first?.focus();
    }, 550);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched(new Set(Object.keys(values)));
    if (Object.keys(errs).length > 0) {
      setStatus("idle");
      const firstKey = Object.keys(errs)[0];
      document.getElementById(firstKey)?.focus();
      return;
    }

    setStatus("loading");
    // Simulated submission — replace with a real endpoint in the next phase.
    window.setTimeout(() => {
      if (values.email.trim().toLowerCase().includes("fail")) {
        setStatus("error"); // Demonstration of the error state.
      } else {
        setStatus("success");
      }
    }, 1400);
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setTouched(new Set());
    setStatus("idle");
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-ink-950 pb-2 pt-28 text-white lg:pt-40"
    >
      {/* Atmosphere — continues visually into the footer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(105% 80% at 12% 0%, rgba(24,144,214,0.24) 0%, rgba(5,13,25,0) 52%), radial-gradient(85% 60% at 95% 30%, rgba(95,230,245,0.12) 0%, rgba(5,13,25,0) 55%)",
        }}
      />
      <MistBand flipped className="opacity-60" />
      <FrostParticles id="cta-frost" count={16} tone="ice" className="opacity-45" />
      <div aria-hidden className="grid-lines-dark-layer absolute inset-0 opacity-30" />

      <div className="relative mx-auto w-full max-w-[92rem] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
          {/* ---------- CTA copy ---------- */}
          <div>
            <Reveal>
              <HudLabel tone="ice">Request storage</HudLabel>
            </Reveal>

            <TextReveal
              as="h2"
              id="contact-title"
              className="mt-6 display-lg text-[clamp(2.6rem,6.4vw,5.5rem)] text-metal-frost"
            >
              Keep your supply chain cold.
            </TextReveal>
            <Reveal delay={0.1}>
              <p className="display-lg mt-2 text-[clamp(2.6rem,6.4vw,5.5rem)] text-glow-300">
                Keep it moving.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-8 max-w-xl text-[1.08rem] leading-[1.85] text-ink-200/85">
                Talk to our team about your storage and temperature-controlled logistics
                requirements.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <MagneticButton
                  size="lg"
                  variant="onDark"
                  onClick={focusForm}
                >
                  Request Storage
                  <Send size={16} aria-hidden />
                </MagneticButton>
                <MagneticButton size="lg" variant="onDarkGhost" onClick={focusForm}>
                  Contact Us
                </MagneticButton>
              </div>
            </Reveal>

            {/* Address */}
            <Reveal delay={0.3}>
              <div className="mt-12 flex items-start gap-5 rounded-[20px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/5">
                  <MapPin size={18} className="text-glow-300" aria-hidden />
                </div>
                <div>
                  <p className="hud-sm text-white/55">Facility</p>
                  <p className="mt-2 text-[1.02rem] leading-relaxed text-white">
                    {COMPANY.address.area}
                    <br />
                    {COMPANY.address.city}, {COMPANY.address.country}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---------- Form ---------- */}
          <Reveal variant="up" delay={0.12}>
            <div className="glass-dark rounded-[26px] p-7 sm:p-9">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.55, ease: EASE_OUT }}
                    className="flex min-h-[30rem] flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.12 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full border border-glow-400/50 bg-glow-500/15"
                    >
                      <CheckCircle2 size={36} className="text-glow-300" aria-hidden />
                    </motion.div>
                    <h3 className="mt-7 display-md text-[1.9rem] text-metal-frost">
                      Request received.
                    </h3>
                    <p className="mt-4 max-w-sm text-[1rem] leading-[1.8] text-ink-200/85">
                      Thank you — our team will review your requirements and follow up with you
                      shortly.
                    </p>
                    <div className="mt-8">
                      <MagneticButton variant="onDarkGhost" onClick={reset}>
                        Send another request
                      </MagneticButton>
                    </div>
                    <p className="mt-6 text-[0.78rem] text-white/45">
                      Demonstration flow — no data leaves this page in the frontend phase.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={onSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    aria-label="Storage inquiry form"
                  >
                    <div className="flex items-center justify-between">
                      <HudLabel tone="ice" tick={false}>
                        Inquiry
                      </HudLabel>
                      <span className="hud-sm text-white/50">All fields marked * required</span>
                    </div>

                    <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <TextField
                        id="fullName"
                        label="Full Name"
                        required
                        value={values.fullName}
                        onChange={set("fullName")}
                        onBlur={blur("fullName")}
                        error={errors.fullName}
                        placeholder="Your name"
                        autoComplete="name"
                      />
                      <TextField
                        id="company"
                        label="Company"
                        value={values.company}
                        onChange={set("company")}
                        onBlur={blur("company")}
                        placeholder="Company name"
                        autoComplete="organization"
                      />
                      <TextField
                        id="email"
                        label="Email"
                        type="email"
                        required
                        value={values.email}
                        onChange={set("email")}
                        onBlur={blur("email")}
                        error={errors.email}
                        placeholder="you@company.com"
                        autoComplete="email"
                      />
                      <TextField
                        id="phone"
                        label="Phone"
                        type="tel"
                        value={values.phone}
                        onChange={set("phone")}
                        onBlur={blur("phone")}
                        error={errors.phone}
                        placeholder="+000 000 0000"
                        autoComplete="tel"
                      />

                      <SelectField
                        id="productType"
                        label="Product Type"
                        value={values.productType}
                        onChange={set("productType")}
                        options={PRODUCT_TYPES as unknown as string[]}
                        placeholder="Select a category"
                      />
                      <SelectField
                        id="storageNeed"
                        label="Storage Requirement"
                        value={values.storageNeed}
                        onChange={set("storageNeed")}
                        options={STORAGE_REQUIREMENTS as unknown as string[]}
                        placeholder="Select a requirement"
                      />
                    </div>

                    <div className="mt-5">
                      <TextAreaField
                        id="message"
                        label="Message"
                        required
                        value={values.message}
                        onChange={set("message")}
                        onBlur={blur("message")}
                        error={errors.message}
                        placeholder="Tell us about your storage or logistics requirements…"
                      />
                    </div>

                    {/* Error banner */}
                    <AnimatePresence>
                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          role="alert"
                          className="mt-5 flex items-start gap-3 rounded-xl border border-rose-400/35 bg-rose-400/10 p-4"
                        >
                          <TriangleAlert size={17} className="mt-0.5 shrink-0 text-rose-300" aria-hidden />
                          <p className="text-[0.88rem] leading-relaxed text-rose-100">
                            Something went wrong while sending your request. Please review your
                            details and try again.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-8">
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        data-cursor="hover"
                        className={cn(
                          "group inline-flex w-full items-center justify-center gap-3 rounded-full px-8 py-4.5 text-[0.98rem] font-semibold tracking-tight transition-all duration-300",
                          "py-[1.15rem]",
                          status === "loading"
                            ? "cursor-wait bg-white/25 text-white"
                            : "bg-white text-ink-950 hover:shadow-[0_24px_60px_-18px_rgba(95,230,245,0.55)] hover:bg-ice-50",
                        )}
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 size={17} className="animate-spin" aria-hidden />
                            Sending request…
                          </>
                        ) : (
                          <>
                            Request Storage
                            <Send size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </div>

                    <p className="mt-5 text-center text-[0.78rem] leading-relaxed text-white/45">
                      Frontend demonstration — submissions are not stored or transmitted yet.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Field primitives                                                     */
/* ================================================================== */

const fieldBase =
  "peer w-full rounded-xl border bg-white/[0.06] px-4.5 py-3.5 text-[0.95rem] text-white placeholder:text-white/35 outline-none transition-[border-color,background-color,box-shadow] duration-300 focus:border-glow-400/70 focus:bg-white/[0.1] focus:shadow-[0_0_0_4px_rgba(95,230,245,0.14)]";

function FieldShell({
  id,
  label,
  required,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="hud-sm text-white/60">
        {label}
        {required && <span className="ml-1 text-glow-300">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-[0.8rem] text-rose-300">
          {error}
        </p>
      )}
    </div>
  );
}

function TextField({
  id,
  label,
  required,
  error,
  className,
  type = "text",
  ...rest
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} className={className}>
      <input
        id={id}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldBase, error && "border-rose-400/60")}
        {...rest}
      />
    </FieldShell>
  );
}

function SelectField({
  id,
  label,
  options,
  placeholder,
  error,
  className,
  ...rest
}: {
  id: string;
  label: string;
  options: string[];
  placeholder: string;
  error?: string;
  className?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldShell id={id} label={label} error={error} className={className}>
      <div className="relative">
        <select
          id={id}
          className={cn(fieldBase, "appearance-none pr-10", error && "border-rose-400/60")}
          {...rest}
        >
          <option value="" className="bg-ink-900 text-white">
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-ink-900 text-white">
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50"
        />
      </div>
    </FieldShell>
  );
}

function TextAreaField({
  id,
  label,
  required,
  error,
  ...rest
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell id={id} label={label} required={required} error={error}>
      <textarea
        id={id}
        rows={4}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldBase, "resize-none", error && "border-rose-400/60")}
        {...rest}
      />
    </FieldShell>
  );
}
