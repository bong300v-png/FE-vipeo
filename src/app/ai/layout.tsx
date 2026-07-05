"use client";

import Link from "next/link";
import { ArrowLeftIcon, MessageSquareIcon, SparklesIcon } from "@/components/icons";
import { t, tx } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";

export default function AiLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      <aside className="hidden w-[280px] border-r border-border bg-sidebar p-3 md:flex flex-col shrink-0 select-none">
        <div className="flex flex-col gap-3 h-full">
          <Link href="/dashboard" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors w-full cursor-pointer" aria-label={tx(locale, "Back to Dashboard")}>
            <ArrowLeftIcon className="size-4 shrink-0" />
            <span>{tx(locale, "Back to Dashboard")}</span>
          </Link>
          <button className="w-full gap-2 justify-start border border-border bg-card hover:bg-muted/50 font-medium py-2 px-3 text-sm rounded-lg flex items-center shrink-0 cursor-pointer transition-colors text-foreground outline-none" onClick={() => window.location.href = "/ai"}>
            <MessageSquareIcon className="size-4 text-muted-foreground" />
            <span>{tx(locale, "New Job")}</span>
          </button>
          <div className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t(locale, "nav.director")}</div>
          <div className="flex-1 overflow-y-auto py-2"><p className="text-center text-xs text-muted-foreground pt-2">{tx(locale, "Recent generation jobs appear here.")}</p></div>
          <div className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground font-medium border-t border-border/60"><SparklesIcon className="size-3.5 text-primary" /><span>{tx(locale, "Credits are reserved before render.")}</span></div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="border-b border-border px-4 py-3 flex items-center md:hidden justify-between shrink-0">
          <Link href="/dashboard" className="text-sm text-primary flex items-center gap-1 font-medium"><ArrowLeftIcon className="size-4" /> {tx(locale, "Back")}</Link>
          <span className="text-sm font-semibold flex items-center gap-1.5"><MessageSquareIcon className="size-4 text-primary" /> {t(locale, "nav.director")}</span>
          <button onClick={() => window.location.href = "/ai"} className="text-primary text-sm font-medium">{tx(locale, "New")}</button>
        </header>
        <div className="flex-1 flex flex-col min-h-0 relative bg-background">{children}</div>
      </div>
    </div>
  );
}
