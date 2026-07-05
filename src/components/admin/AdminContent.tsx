"use client";

import { AdminAccountsTable } from "@/components/admin/AdminAccountsTable";
import { AdminStatCards } from "@/components/admin/AdminStatCards";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { adminJobs } from "@/lib/mock-data";
import { tx } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";

export function AdminContent() {
  const locale = useLocale();
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
      <div className="flex flex-col gap-1"><h1 className="text-2xl font-semibold tracking-tight">{tx(locale, "Vipeo ops console")}</h1><p className="text-sm text-muted-foreground">{tx(locale, "Inspect jobs, credits, billing sync placeholders, safety review, and manual credit adjustments.")}</p></div>
      <AdminStatCards />
      <Card id="jobs"><CardHeader><CardTitle>{tx(locale, "Job inspection")}</CardTitle><CardDescription>{tx(locale, "Operational queue for credit and safety review.")}</CardDescription></CardHeader><CardContent><AdminAccountsTable jobs={adminJobs} /></CardContent></Card>
      <div className="grid gap-4 md:grid-cols-3">
        <Card id="credits"><CardHeader><CardTitle>{tx(locale, "Billing sync")}</CardTitle><CardDescription>{tx(locale, "Stripe/Paddle webhook status placeholder. Local VN rails not wired.")}</CardDescription></CardHeader><CardContent><p className="text-sm text-muted-foreground">{tx(locale, "Monitor payment events, credit grants, and failed webhook retries here in production.")}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>{tx(locale, "Manual credit adjustment")}</CardTitle><CardDescription>{tx(locale, "Admin can grant/refund credits after audit in production.")}</CardDescription></CardHeader><CardContent><p className="text-sm text-muted-foreground">{tx(locale, "All adjustments must write an audit event before touching user balances.")}</p></CardContent></Card>
        <Card id="safety"><CardHeader><CardTitle>{tx(locale, "Safety queue")}</CardTitle><CardDescription>{tx(locale, "Rights, likeness, news/source, and sensitive niche review.")}</CardDescription></CardHeader><CardContent><p className="text-sm text-muted-foreground">{tx(locale, "High-risk jobs remain paused until a reviewer confirms ownership, claims, and AI-label obligations.")}</p></CardContent></Card>
      </div>
    </div>
  );
}
