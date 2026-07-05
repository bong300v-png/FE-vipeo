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
    <section className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-24">
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-black/40">[ 01 — {tx(locale, "Features")} ]</p>
            <h2 className="max-w-xl text-4xl font-black tracking-tighter text-balance text-black lg:text-6xl">
              {t(locale, "landing.features.title")}
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-black/60 text-pretty">{t(locale, "landing.features.body")}</p>
        </div>
        <div ref={ref} className="grid gap-px overflow-hidden border border-black/15 bg-black/15 sm:grid-cols-2 lg:grid-cols-3">
          {featureItems.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                "group relative bg-white p-8 transition-all duration-700 ease-out",
                "hover:bg-[#fffbeb]",
                inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-black/40">0{index + 1}.</span>
                <span className="size-[10px] border border-black bg-white transition-colors group-hover:bg-[#facc15]" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-black">{tx(locale, feature.title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/60">{tx(locale, feature.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
