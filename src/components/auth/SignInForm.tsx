"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { GoogleIcon } from "@/components/icons";
import { AuthDivider } from "@/components/auth/AuthShell";

export function SignInForm() {
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  }

  return (
    <div className="flex flex-col gap-y-6">
      <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            required
          />
        </div>
        <div className="flex flex-col gap-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Link
              href="/auth/password-reset"
              className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <PasswordInput id="password" placeholder="••••••••••••" />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing in..." : "Sign in with Email"}
        </Button>
      </form>

      <AuthDivider />

      <Button variant="outline" className="w-full gap-x-3">
        <GoogleIcon className="size-4" />
        Sign in with Google
      </Button>

      <Link
        href="/auth/sign-up"
        className="text-muted-foreground hover:text-foreground text-center text-sm underline-offset-4 hover:underline"
      >
        Do not have an account yet?
      </Link>
    </div>
  );
}
