"use client";

import Link from "next/link";
import { ChevronRightIcon, HelpIcon } from "@/components/icons";
import { tx } from "@/lib/i18n";
import { helpTopics } from "@/lib/mock-data";
import { useLocale } from "@/lib/use-locale";
import { SiteFooter, SiteHeader } from "../page";

export default function HelpPage() {
  const locale = useLocale();
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-col gap-8 md:flex-row">
            <aside className="w-full shrink-0 md:w-1/4"><div className="sticky top-20 space-y-6"><Link href="/dashboard" className="inline-flex w-full items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:text-foreground"><ChevronRightIcon className="size-4 rotate-180" />{tx(locale, "Back to Studio")}</Link><div><h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{tx(locale, "Vipeo help")}</h3><ul className="mt-3 space-y-1">{helpTopics.map((topic) => <li key={topic.title}><a href={`#${topic.title.toLowerCase().replaceAll(" ", "-")}`} className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/30 hover:text-foreground">{tx(locale, topic.title)}</a></li>)}</ul></div></div></aside>
            <section className="flex-1">
              <div className="border-b border-border pb-6"><div className="flex items-center gap-2 text-sm font-medium text-primary"><HelpIcon className="size-4" />{tx(locale, "Help Center")}</div><h1 className="mt-3 text-3xl font-bold tracking-tight">{tx(locale, "Create safely with Vipeo")}</h1><p className="mt-2 text-sm text-muted-foreground">{tx(locale, "Learn skills, credits, AI labels, rights gates, refunds, and why some jobs need review.")}</p></div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">{helpTopics.map((topic) => <article id={topic.title.toLowerCase().replaceAll(" ", "-")} key={topic.title} className="rounded-xl border border-border bg-card p-6"><h2 className="font-semibold">{tx(locale, topic.title)}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{tx(locale, topic.body)}</p></article>)}</div>
              <div className="mt-8 rounded-xl border border-dashed border-border bg-muted/20 p-6"><h2 className="font-semibold">{tx(locale, "Need rights review?")}</h2><p className="mt-2 text-sm text-muted-foreground">{tx(locale, "Uploads, likeness, news/source, real estate, health, copyrighted media, or sensitive niches can pause before render. Failed jobs can release reserved credits or enter refund review.")}</p></div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
