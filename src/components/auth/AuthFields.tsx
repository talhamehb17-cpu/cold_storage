"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";

const base =
  "peer w-full rounded-xl border border-ink-900/12 bg-white px-4.5 py-3.5 text-[0.95rem] text-ink-900 placeholder:text-ink-300 outline-none transition-[border-color,box-shadow,background-color] duration-300 focus:border-ice-500/80 focus:shadow-[0_0_0_4px_rgba(24,144,214,0.14)]";

export function AuthFieldShell({
  id,
  label,
  required,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-[0.82rem] font-semibold tracking-tight text-ink-700">
        {label}
        {required && <span className="ml-1 text-ice-600">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-[0.78rem] text-ink-400">{hint}</p>}
      {error && (
        <p role="alert" className="text-[0.8rem] font-medium text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function AuthTextField({
  id,
  label,
  required,
  error,
  hint,
  className,
  type = "text",
  ...rest
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <AuthFieldShell id={id} label={label} required={required} error={error} hint={hint} className={className}>
      <input
        id={id}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(base, error && "border-rose-400")}
        {...rest}
      />
    </AuthFieldShell>
  );
}

export function AuthPasswordField({
  id,
  label = "Password",
  required,
  error,
  hint,
  className,
  ...rest
}: {
  id: string;
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false);
  return (
    <AuthFieldShell id={id} label={label} required={required} error={error} hint={hint} className={className}>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(base, "pr-12", error && "border-rose-400")}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-ink-400 transition-colors hover:text-ice-700"
        >
          {visible ? <EyeOff size={17} aria-hidden /> : <Eye size={17} aria-hidden />}
        </button>
      </div>
    </AuthFieldShell>
  );
}

/** Password strength meter — visual guidance only. */
export function PasswordStrength({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password) && /[a-z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ["Too short", "Getting there", "Good", "Strong", "Excellent"];

  return (
    <div className="mt-2.5">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn(
              "h-[5px] flex-1 rounded-full transition-colors duration-300",
              i < score
                ? score <= 1
                  ? "bg-amber-400"
                  : score <= 2
                    ? "bg-ice-400"
                    : "bg-ice-600"
                : "bg-ink-900/10",
            )}
          />
        ))}
      </div>
      {password && (
        <p className={cn("mt-2 text-[0.78rem]", score >= 3 ? "text-ice-700" : "text-ink-400")}>
          {labels[score]}
        </p>
      )}
    </div>
  );
}

export function AuthSubmitButton({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      data-cursor="hover"
      className={cn(
        "group inline-flex w-full items-center justify-center gap-3 rounded-full px-8 py-[1.15rem] text-[0.98rem] font-semibold tracking-tight text-white transition-all duration-300",
        loading
          ? "cursor-wait bg-ink-800"
          : "bg-ink-900 hover:bg-ink-800 hover:shadow-[0_24px_60px_-20px_rgba(8,32,60,0.75)]",
      )}
    >
      {loading ? (
        <>
          <span
            className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-white/30 border-t-white"
            aria-hidden
          />
          Processing…
        </>
      ) : (
        children
      )}
    </button>
  );
}
