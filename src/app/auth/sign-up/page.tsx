import type { Metadata } from "next";
import { SignUpButton } from "@clerk/nextjs";
import { AuthShell, AuthHeader, Tx } from "@/components/auth/AuthShell";

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
          <button className="w-full border border-black bg-[#facc15] px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-[#facc15]">
            Sign up
          </button>
        </SignUpButton>
        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <a
            href="/auth/sign-in"
            className="font-semibold text-foreground underline underline-offset-2 hover:bg-[#facc15]"
          >
            Sign in
          </a>
        </p>
      </div>
    </AuthShell>
  );
}
