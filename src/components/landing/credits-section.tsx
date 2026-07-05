"use client";

import { CheckIcon } from "@/components/icons";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";
import { cn } from "@/lib/utils";
import { LoopVideo } from "./media-reveal";
import { useInView } from "./use-motion";

const stepKeys = ["landing.credits.step1", "landing.credits.step2", "landing.credits.step3", "landing.credits.step4"] as const;

export function CreditsSection() {
  const locale = useLocale();
  const { ref, inView } = useInView<HTMLUListElement>(0.2);

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <LoopVideo src="/videos/credits-flow.mp4" poster="/images/credits-poster.jpg" className="order-last aspect-video lg:order-first" overlay={false} />
        <div>
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-foreground/40">[ 03 — Credits ]</p>
          <h2 className="text-3xl font-black tracking-tighter text-balance lg:text-5xl">{t(locale, "landing.credits.title")}</h2>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground text-pretty">{t(locale, "landing.credits.body")}</p>
          <ul ref={ref} className="mt-8 flex flex-col gap-4">
            {stepKeys.map((key, index) => (
              <li
                key={key}
                className={cn(
                  "flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-all duration-700 ease-out",
                  inView ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0",
                )}
                style={{ transitionDelay: `${index * 110}ms` }}
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-cine/15">
                  <CheckIcon className="size-4 text-foreground" />
                </span>
                <span className="text-sm font-medium">{t(locale, key)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
