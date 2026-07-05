import type { Metadata } from "next";
import { SignInButton } from "@clerk/nextjs";
import { AuthShell, AuthHeader } from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <AuthShell>
      <AuthHeader
        title="Sign in to Vipeo"
        subtitle="Access your AI Director Studio workspace."
      />
      <div className="flex flex-col gap-y-4">
        <SignInButton mode="modal">
          <button className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Sign in
          </button>
        </SignInButton>
        <p className="text-center text-xs text-muted-foreground">
          New to Vipeo?{" "}
          <a
            href="/auth/sign-up"
            className="underline hover:text-foreground"
          >
            Create an account
          </a>
        </p>
      </div>
    </AuthShell>
  );
}
