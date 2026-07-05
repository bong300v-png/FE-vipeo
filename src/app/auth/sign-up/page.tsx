import type { Metadata } from "next";
import { SignUpButton } from "@clerk/nextjs";
import { AuthShell, AuthHeader } from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <AuthShell>
      <AuthHeader
        title="Create your Vipeo account"
        subtitle="Start creating videos with AI Director Studio."
      />
      <div className="flex flex-col gap-y-4">
        <SignUpButton mode="modal">
          <button className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Sign up
          </button>
        </SignUpButton>
        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <a
            href="/auth/sign-in"
            className="underline hover:text-foreground"
          >
            Sign in
          </a>
        </p>
      </div>
    </AuthShell>
  );
}
