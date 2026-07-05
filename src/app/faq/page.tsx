"use client";

import { tx } from "@/lib/i18n";
import { helpTopics } from "@/lib/mock-data";
import { useLocale } from "@/lib/use-locale";
import { SiteFooter, SiteHeader } from "../page";

const FAQS = [
  ...helpTopics.map((topic) => ({ question: topic.title, answer: topic.body })),
  { question: "Can I upload any movie or comic?", answer: "Only if you own it or have permission. Movie/comic localization is roadmap and requires rights gates." },
  { question: "Is voice clone live?", answer: "No. Voice clone is P2 and requires explicit consent and deletion controls." },
  { question: "Why does a job need review?", answer: "Some requests involve rights, likeness, news/source, regulated claims, or sensitive niches." },
];

export default function FAQPage() {
  const locale = useLocale();
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
          <div className="text-center"><h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{tx(locale, "Vipeo FAQ")}</h1><p className="mt-4 text-lg text-muted-foreground">{tx(locale, "Skills, credits, AI labels, rights, and roadmap boundaries.")}</p></div>
          <div className="mt-12 space-y-4">
            {FAQS.map((faq) => <details key={faq.question} className="group rounded-xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden"><summary className="flex cursor-pointer items-center justify-between gap-4"><h3 className="font-semibold transition-colors group-hover:text-primary">{tx(locale, faq.question)}</h3><span className="text-muted-foreground group-open:rotate-180">⌄</span></summary><p className="mt-4 border-t border-border/40 pt-4 text-sm leading-6 text-muted-foreground">{tx(locale, faq.answer)}</p></details>)}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
