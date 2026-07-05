"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { creditLedger, currentUser, plans } from "@/lib/mock-data";
import { tx } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";

export default function BillingSettingsPage() {
  const locale = useLocale();
  return (
    <div className="space-y-6">
      <Card><CardHeader><CardTitle>{tx(locale, "Credits wallet")}</CardTitle><CardDescription>{tx(locale, "Credits are estimated before generate, reserved on start, finalized after render.")}</CardDescription></CardHeader><CardContent><p className="text-4xl font-semibold">{currentUser.credits.toLocaleString()}</p><p className="mt-1 text-sm text-muted-foreground">{tx(locale, "Available credits on")} {currentUser.plan}</p></CardContent></Card>
      <div className="grid gap-4 lg:grid-cols-4">{plans.map((plan) => <Card key={plan.id} className={plan.status === "coming-soon" ? "border-dashed opacity-80" : ""}><CardHeader><div className="flex items-center justify-between"><CardTitle>{tx(locale, plan.name)}</CardTitle><span className="rounded-full border border-border px-2 py-1 text-[10px] text-muted-foreground">{tx(locale, plan.status === "active" ? "Active" : "Coming soon")}</span></div><CardDescription>{plan.credits.toLocaleString()} {tx(locale, "credits")}</CardDescription></CardHeader><CardContent><p className="text-2xl font-semibold">{tx(locale, plan.price)}</p><ul className="mt-4 space-y-2 text-sm text-muted-foreground">{plan.features.map((feature) => <li key={feature}>• {tx(locale, feature)}</li>)}</ul><Button disabled={plan.status !== "active"} variant={plan.id === "pro" ? "default" : "outline"} className="mt-5 w-full">{tx(locale, plan.status === "active" ? "Select plan" : "Coming soon")}</Button></CardContent></Card>)}</div>
      <Card><CardHeader><CardTitle>{tx(locale, "Credit ledger")}</CardTitle><CardDescription>{tx(locale, "Purchases, reservations, finalization, releases, and refunds.")}</CardDescription></CardHeader><CardContent className="space-y-3">{creditLedger.map((event) => <div key={event.id} className="flex items-center justify-between rounded-lg border border-border p-3 text-sm"><div><p className="font-medium">{tx(locale, event.label)}</p><p className="text-xs text-muted-foreground">{tx(locale, event.type)} · {event.createdAt}</p></div><div className="text-right"><p className={event.amount < 0 ? "text-destructive" : "text-primary"}>{event.amount > 0 ? "+" : ""}{event.amount}</p><p className="text-xs text-muted-foreground">{tx(locale, "Balance")} {event.balanceAfter}</p></div></div>)}</CardContent></Card>
      <Card><CardHeader><CardTitle>{tx(locale, "Payment methods")}</CardTitle><CardDescription>{tx(locale, "Stripe/Paddle primary. Vietnam local rails: MoMo, ZaloPay, VNPay, bank QR planned as local options.")}</CardDescription></CardHeader><CardContent><p className="text-sm text-muted-foreground">{tx(locale, "Failed jobs can release reserved credits or create refund-review events.")}</p></CardContent></Card>
    </div>
  );
}
