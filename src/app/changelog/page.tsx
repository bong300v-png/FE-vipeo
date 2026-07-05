"use client";

import { tx } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";
import { SiteFooter, SiteHeader } from "../page";

const ENTRIES = [
  { title: "Added Vipeo frontend prototype surfaces", date: "July 03, 2026", description: "Landing, help, FAQ, settings, admin, and studio routes now use Vipeo product language." },
  { title: "Added launch skill catalog and AI Director mock flow", date: "July 03, 2026", description: "The prototype shows MVP skills, credit estimates, async job states, and result assets." },
  { title: "Marked roadmap-only features as coming soon", date: "July 03, 2026", description: "Voice clone, avatar, marketplace, autoposting, and movie/comic localization are disabled until safety and rights gates exist." },
];

export default function ChangelogPage() {
  const locale = useLocale();
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
          <div className="text-center md:mx-auto md:max-w-2xl"><h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{tx(locale, "Vipeo changelog")}</h1><p className="mt-4 text-lg text-muted-foreground">{tx(locale, "Frontend prototype updates for AI Director Studio.")}</p></div>
          <div className="relative mt-16 pl-8"><div className="absolute bottom-4 left-[7px] top-4 w-px border-l border-dashed border-border" />{ENTRIES.map((entry) => <div key={entry.title} className="relative mb-12"><div className="absolute -left-8 top-1.5 flex size-4 items-center justify-center rounded-full border border-primary bg-background"><div className="size-1.5 rounded-full bg-primary" /></div><time className="text-sm font-semibold text-primary">{entry.date}</time><h2 className="mt-2 text-xl font-bold tracking-tight">{tx(locale, entry.title)}</h2><p className="mt-3 text-base leading-7 text-muted-foreground">{tx(locale, entry.description)}</p></div>)}</div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
