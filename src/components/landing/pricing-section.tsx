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
    <section className="mx-auto max-w-7xl px-4 py-24">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-sm font-semibold text-primary mb-4">
          {t(locale, "landing.pricing.kicker")}
        </span>
        <h2 className="text-4xl font-bold tracking-tight text-balance bg-gradient-to-r from-primary-accent via-primary to-secondary-accent bg-clip-text text-transparent lg:text-5xl">
          {t(locale, "landing.pricing.title")}
        </h2>
      </div>
      <div ref={ref} className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan, index) => {
          const isPopular = index === 1 || index === 2;
          return (
            <div
              key={plan.id}
              className={cn(
                "group relative flex flex-col rounded-2xl border transition-all duration-700 ease-out card-hover",
                "hover:shadow-2xl hover:shadow-primary/20",
                isPopular
                  ? "border-primary/50 bg-gradient-to-br from-primary/5 to-secondary-accent/5 lg:scale-105 lg:z-10"
                  : "border-border/50 bg-card/50 backdrop-blur hover:border-primary/30",
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-primary-accent to-secondary-accent text-white text-xs font-semibold">
                  Most popular
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{tx(locale, plan.name)}</h3>
                  <span className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                    plan.status === "active"
                      ? "bg-green-500/20 text-green-600 dark:text-green-400"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {tx(locale, plan.status === "active" ? "Live" : "Coming soon")}
                  </span>
                </div>
                
                <div className="mb-6">
                  <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
                    {tx(locale, plan.price)}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.credits.toLocaleString()} credits/month</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm">
                      <CheckIcon className="mt-0.5 size-5 shrink-0 text-primary" />
                      <span className="text-muted-foreground group-hover:text-foreground/80 transition-colors">{tx(locale, feature)}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  disabled={plan.status !== "active"}
                  className={cn(
                    "w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300",
                    plan.status === "active"
                      ? "bg-gradient-to-r from-primary-accent to-secondary-accent text-white hover:shadow-lg hover:shadow-primary/50"
                      : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                  )}
                >
                  {tx(locale, plan.status === "active" ? "Choose plan" : "Join waitlist")}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
