"use client";

import { CheckIcon } from "@/components/icons";
import { t, tx } from "@/lib/i18n";
import { plans } from "@/lib/mock-data";
import { useLocale } from "@/lib/use-locale";
import { cn } from "@/lib/utils";
import { useInView } from "./use-motion";

export function PricingSection() {
  const locale = useLocale();
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-medium text-muted-foreground">{t(locale, "landing.pricing.kicker")}</span>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance lg:text-4xl">{t(locale, "landing.pricing.title")}</h2>
      </div>
      <div ref={ref} className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className={cn(
              "flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-700 ease-out",
              inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
            style={{ transitionDelay: `${index * 90}ms` }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{tx(locale, plan.name)}</h3>
              <span className="rounded-full border border-border px-2 py-1 text-[10px] text-muted-foreground">
                {tx(locale, plan.status === "active" ? "Live" : "Coming soon")}
              </span>
            </div>
            <p className="mt-4 text-3xl font-semibold">{tx(locale, plan.price)}</p>
            <p className="mt-1 text-xs text-muted-foreground">{plan.credits.toLocaleString()} {tx(locale, "monthly credits")}</p>
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-sm leading-relaxed">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                  {tx(locale, feature)}
                </li>
              ))}
            </ul>
            <button
              disabled={plan.status !== "active"}
              className="mt-auto pt-6"
            >
              <span className={cn(
                "block rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors",
                plan.status === "active" ? "hover:bg-muted/60" : "cursor-not-allowed opacity-50",
              )}>
                {tx(locale, plan.status === "active" ? "Choose plan" : "Join waitlist")}
              </span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
