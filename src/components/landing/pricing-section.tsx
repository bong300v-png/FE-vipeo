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
    <section id="pricing" className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-24">
        <div className="mb-16">
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-black/40">
            [ 05 — {t(locale, "landing.pricing.kicker")} ]
          </p>
          <h2 className="max-w-2xl text-4xl font-black tracking-tighter text-balance text-black lg:text-6xl">
            {t(locale, "landing.pricing.title")}
          </h2>
        </div>
        <div ref={ref} className="grid gap-px overflow-hidden border border-black/15 bg-black/15 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => {
            const isPopular = index === 1;
            return (
              <div
                key={plan.id}
                className={cn(
                  "group relative flex flex-col transition-all duration-700 ease-out",
                  isPopular ? "bg-[#0d0d0d] text-white" : "bg-white text-black hover:bg-[#fffbeb]",
                  inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                )}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <div className="flex flex-1 flex-col p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-bold tracking-tight">{tx(locale, plan.name)}</h3>
                    <span
                      className={cn(
                        "border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider",
                        isPopular
                          ? "border-[#facc15] text-[#facc15]"
                          : plan.status === "active"
                            ? "border-black text-black"
                            : "border-black/30 text-black/40",
                      )}
                    >
                      {tx(locale, plan.status === "active" ? "Live" : "Coming soon")}
                    </span>
                  </div>

                  <div className="mb-8">
                    <p className="text-4xl font-black tracking-tighter">{tx(locale, plan.price)}</p>
                    <p className={cn("mt-2 font-mono text-xs uppercase tracking-wide", isPopular ? "text-white/50" : "text-black/50")}>
                      {plan.credits.toLocaleString()} credits / {tx(locale, "month")}
                    </p>
                  </div>

                  <ul className="mb-8 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm leading-relaxed">
                        <CheckIcon className={cn("mt-0.5 size-4 shrink-0", isPopular ? "text-[#facc15]" : "text-black")} />
                        <span className={isPopular ? "text-white/80" : "text-black/70"}>{tx(locale, feature)}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    disabled={plan.status !== "active"}
                    className={cn(
                      "w-full border px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest transition-colors",
                      plan.status === "active"
                        ? isPopular
                          ? "border-[#facc15] bg-[#facc15] text-black hover:bg-transparent hover:text-[#facc15]"
                          : "border-black bg-black text-white hover:bg-transparent hover:text-black"
                        : isPopular
                          ? "cursor-not-allowed border-white/20 text-white/30"
                          : "cursor-not-allowed border-black/20 text-black/30",
                    )}
                  >
                    {tx(locale, plan.status === "active" ? "Choose plan" : "Join waitlist")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
