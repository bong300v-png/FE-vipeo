"use client";

import { AdminAccountsTable } from "@/components/admin/AdminAccountsTable";
import { AdminStatCards } from "@/components/admin/AdminStatCards";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { adminJobs } from "@/lib/mock-data";
import { tx } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";

const opsCards = [
  {
    id: "credits",
    num: "01",
    title: "Billing sync",
    description: "Stripe/Paddle webhook status placeholder. Local VN rails not wired.",
    body: "Monitor payment events, credit grants, and failed webhook retries here in production.",
  },
  {
    id: undefined as string | undefined,
    num: "02",
    title: "Manual credit adjustment",
    description: "Admin can grant/refund credits after audit in production.",
    body: "All adjustments must write an audit event before touching user balances.",
  },
  {
    id: "safety",
    num: "03",
    title: "Safety queue",
    description: "Rights, likeness, news/source, and sensitive niche review.",
    body: "High-risk jobs remain paused until a reviewer confirms ownership, claims, and AI-label obligations.",
  },
];

export function AdminContent() {
  const locale = useLocale();
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <div className="flex flex-col gap-2 border-b border-foreground/15 pb-6">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-foreground/40">[ {tx(locale, "Ops")} ]</p>
        <h1 className="text-4xl font-black tracking-tighter">{tx(locale, "Vipeo ops console")}</h1>
        <p className="max-w-3xl text-base text-muted-foreground">{tx(locale, "Inspect jobs, credits, billing sync placeholders, safety review, and manual credit adjustments.")}</p>
      </div>
      <AdminStatCards />
      <Card id="jobs" className="rounded-none border-foreground/15 shadow-none">
        <CardHeader className="border-b border-foreground/10">
          <CardTitle className="text-xl font-black tracking-tight">{tx(locale, "Job inspection")}</CardTitle>
          <CardDescription>{tx(locale, "Operational queue for credit and safety review.")}</CardDescription>
        </CardHeader>
        <CardContent className="pt-6"><AdminAccountsTable jobs={adminJobs} /></CardContent>
      </Card>
      <div className="grid gap-px border border-foreground/15 bg-foreground/15 md:grid-cols-3">
        {opsCards.map((card) => (
          <div key={card.num} id={card.id} className="group bg-background p-6 transition-colors hover:bg-[#fffbeb]">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-foreground/40">{card.num}.</span>
              <span className="size-[10px] border border-foreground bg-background transition-colors group-hover:bg-[#facc15]" />
            </div>
            <h3 className="text-base font-bold tracking-tight">{tx(locale, card.title)}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{tx(locale, card.description)}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tx(locale, card.body)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
