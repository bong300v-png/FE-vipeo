"use client";

import { t, tx } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";
import { cn } from "@/lib/utils";
import { useInView } from "./use-motion";

const featureItems = [
  { title: "AI Director", body: "Natural language idea → skill choice, script, hook, model route, music, captions, and cost estimate." },
  { title: "Living skill library", body: "System skills ship by niche, language, platform, ratio, duration, and trend." },
  { title: "Credits wallet", body: "Estimate before generate, reserve on start, finalize after render, refund failed jobs." },
  { title: "Global-first", body: "English and Vietnamese UI from MVP; more languages return only when fully translated." },
  { title: "Rights-aware outputs", body: "AI labels, upload rights gates, synthetic voice/avatar warnings, and review paths for sensitive requests." },
  { title: "Roadmap without fake promises", body: "Voice clone, avatar, marketplace, and autoposting stay clearly marked as coming soon." },
];

export function FeaturesSection() {
  const locale = useLocale();
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-balance lg:text-4xl">{t(locale, "landing.features.title")}</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">{t(locale, "landing.features.body")}</p>
      </div>
      <div ref={ref} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featureItems.map((feature, index) => (
          <div
            key={feature.title}
            className={cn(
              "rounded-xl border border-border bg-card p-6 transition-all duration-700 ease-out",
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <h3 className="font-medium">{tx(locale, feature.title)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tx(locale, feature.body)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
