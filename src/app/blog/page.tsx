"use client";

import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";
import { tx } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";
import { SiteFooter, SiteHeader } from "../page";

const POSTS = [
  { title: "Why Vipeo ships Line B faceless first", date: "Jul 03, 2026", description: "Faceless video gives creators immediate value without avatar, likeness, or high-cost animation risk." },
  { title: "How credits protect users from surprise render costs", date: "Jul 03, 2026", description: "Vipeo estimates, reserves, finalizes, and refunds credits so creators know cost before a render starts." },
  { title: "What makes a skill different from a prompt", date: "Jul 03, 2026", description: "A skill packages style, prompt, model route, ratio, duration, music, captions, labels, and cost into one repeatable workflow." },
];

export default function BlogPage() {
  const locale = useLocale();
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="max-w-2xl"><h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{tx(locale, "Vipeo product notes")}</h1><p className="mt-4 text-lg text-muted-foreground">{tx(locale, "Learn how AI Director, skills, credits, and rights-aware generation fit together.")}</p></div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {POSTS.map((post) => <article key={post.title} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:bg-muted/30"><div className="text-xs text-muted-foreground"><time>{post.date}</time><span className="ml-3 rounded-full bg-primary/10 px-3 py-1.5 font-medium text-primary">{tx(locale, "Guide")}</span></div><h2 className="mt-4 text-lg font-semibold group-hover:text-primary"><Link href="#">{tx(locale, post.title)}</Link></h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{tx(locale, post.description)}</p><div className="mt-6 flex items-center justify-between text-sm font-medium text-primary"><span>{tx(locale, "Read article")}</span><ChevronRightIcon className="size-4" /></div></article>)}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
