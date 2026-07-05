import type { Metadata } from "next";
import { SignInButton } from "@clerk/nextjs";
import { AuthShell, AuthHeader, Tx } from "@/components/auth/AuthShell";

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
          <button className="w-full border border-foreground bg-foreground px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-background hover:text-foreground">
            Sign in
          </button>
        </SignInButton>
        <p className="text-center text-xs text-muted-foreground">
          New to Vipeo?{" "}
          <a
            href="/auth/sign-up"
            className="font-semibold text-foreground underline underline-offset-2 hover:bg-[#facc15]"
          >
            Create an account
          </a>
        </p>
      </div>
    </AuthShell>
  );
}
