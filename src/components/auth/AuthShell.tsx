"use client";

import Link from "next/link";
import { LogoIcon } from "@/components/icons";
import { tx } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";

/** Translates a static English string on the client. Usable from server pages. */
export function Tx({ text }: { text: string }) {
  const locale = useLocale();
  return <>{tx(locale, text)}</>;
}

export function AuthShell({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
      {/* Sutera-style corner marks */}
      <span className="pointer-events-none absolute left-6 top-6 font-mono text-[10px] font-bold uppercase tracking-widest text-foreground/40">VIPEO /25</span>
      <span className="pointer-events-none absolute right-6 top-6 hidden font-mono text-[10px] font-bold uppercase tracking-widest text-foreground/40 sm:block">{tx(locale, "AI DIRECTOR STUDIO")}</span>
      <span className="pointer-events-none absolute bottom-6 left-6 size-[10px] border border-foreground bg-[#facc15]" />
      <span className="pointer-events-none absolute bottom-6 right-6 size-[10px] border border-foreground bg-background" />

      <div className="flex w-full max-w-[24rem] flex-col items-center gap-y-8">
        <Link href="/" aria-label="Home Page" className="flex justify-center">
          <LogoIcon className="w-20 lg:w-[95px]" />
        </Link>
        <div className="flex w-full flex-col gap-y-6 border border-foreground/15 bg-background px-6 py-8 md:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export function AuthHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const locale = useLocale();
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center gap-2">
        <span className="size-[10px] bg-[#facc15]" />
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground/40">[ {tx(locale, "Auth")} ]</span>
      </div>
      <h1 className="text-2xl font-black tracking-tighter">{tx(locale, title)}</h1>
      <p className="text-sm leading-relaxed text-muted-foreground">{tx(locale, subtitle)}</p>
    </div>
  );
}

export function AuthDivider() {
  const locale = useLocale();
  return (
    <div className="flex items-center gap-x-4">
      <span className="h-px flex-1 bg-foreground/15" />
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {tx(locale, "Or continue with")}
      </span>
      <span className="h-px flex-1 bg-foreground/15" />
    </div>
  );
}
