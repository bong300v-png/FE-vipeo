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
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <div className="flex flex-col gap-3 border-b border-border/50 pb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-accent via-primary to-secondary-accent bg-clip-text text-transparent">{tx(locale, "Vipeo ops console")}</h1>
        <p className="text-base text-muted-foreground max-w-3xl">{tx(locale, "Inspect jobs, credits, billing sync placeholders, safety review, and manual credit adjustments.")}</p>
      </div>
      <AdminStatCards />
      <Card id="jobs" className="border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-all duration-300">
        <CardHeader className="border-b border-border/30">
          <CardTitle className="text-xl">{tx(locale, "Job inspection")}</CardTitle>
          <CardDescription>{tx(locale, "Operational queue for credit and safety review.")}</CardDescription>
        </CardHeader>
        <CardContent className="pt-6"><AdminAccountsTable jobs={adminJobs} /></CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-3">
        <Card id="credits" className="group border-border/50 bg-gradient-to-br from-card/60 to-card/40 backdrop-blur hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:border-primary/30">
          <CardHeader className="border-b border-border/20">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              <CardTitle className="group-hover:text-primary transition-colors">{tx(locale, "Billing sync")}</CardTitle>
            </div>
            <CardDescription>{tx(locale, "Stripe/Paddle webhook status placeholder. Local VN rails not wired.")}</CardDescription>
          </CardHeader>
          <CardContent className="pt-4"><p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">{tx(locale, "Monitor payment events, credit grants, and failed webhook retries here in production.")}</p></CardContent>
        </Card>
        <Card className="group border-border/50 bg-gradient-to-br from-card/60 to-card/40 backdrop-blur hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:border-primary/30">
          <CardHeader className="border-b border-border/20">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <CardTitle className="group-hover:text-primary transition-colors">{tx(locale, "Manual credit adjustment")}</CardTitle>
            </div>
            <CardDescription>{tx(locale, "Admin can grant/refund credits after audit in production.")}</CardDescription>
          </CardHeader>
          <CardContent className="pt-4"><p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">{tx(locale, "All adjustments must write an audit event before touching user balances.")}</p></CardContent>
        </Card>
        <Card id="safety" className="group border-border/50 bg-gradient-to-br from-card/60 to-card/40 backdrop-blur hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:border-primary/30">
          <CardHeader className="border-b border-border/20">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500"></div>
              <CardTitle className="group-hover:text-primary transition-colors">{tx(locale, "Safety queue")}</CardTitle>
            </div>
            <CardDescription>{tx(locale, "Rights, likeness, news/source, and sensitive niche review.")}</CardDescription>
          </CardHeader>
          <CardContent className="pt-4"><p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">{tx(locale, "High-risk jobs remain paused until a reviewer confirms ownership, claims, and AI-label obligations.")}</p></CardContent>
        </Card>
      </div>
    </div>
  );
}
