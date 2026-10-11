import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your Tahseen Jaber cold-chain workspace — cold storage and temperature-controlled logistics in Baghdad, Iraq.",
};

export default function LoginPage() {
  return (
    <AuthShell side="login">
      <LoginForm />
    </AuthShell>
  );
}
