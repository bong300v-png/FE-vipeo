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
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div className="mx-auto max-w-2xl text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight text-balance bg-gradient-to-r from-primary-accent via-primary to-secondary-accent bg-clip-text text-transparent lg:text-5xl">
          {t(locale, "landing.features.title")}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">{t(locale, "landing.features.body")}</p>
      </div>
      <div ref={ref} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featureItems.map((feature, index) => (
          <div
            key={feature.title}
            className={cn(
              "group relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur p-8 transition-all duration-700 ease-out card-hover",
              "hover:border-primary/50 hover:bg-card/80",
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            {/* Gradient background on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-accent/5 via-transparent to-secondary-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="size-12 rounded-lg bg-gradient-to-br from-primary-accent to-secondary-accent p-2.5 mb-4 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                <div className="size-full rounded bg-card flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{index + 1}</span>
                </div>
              </div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{tx(locale, feature.title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors">{tx(locale, feature.body)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
