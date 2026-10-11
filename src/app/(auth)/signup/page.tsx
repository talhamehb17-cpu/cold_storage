import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/AuthShell";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create your Tahseen Jaber account — premium cold storage and temperature-controlled logistics in Baghdad, Iraq.",
};

export default function SignupPage() {
  return (
    <AuthShell side="signup">
      <SignupForm />
    </AuthShell>
  );
}
