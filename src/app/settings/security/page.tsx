"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { tx } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";

export default function SecuritySettingsPage() {
  const locale = useLocale();
  return (
    <div className="space-y-6">
      <Card><CardHeader><CardTitle>{tx(locale, "Account security")}</CardTitle><CardDescription>{tx(locale, "Authentication is handled by Clerk in this prototype.")}</CardDescription></CardHeader><CardContent className="space-y-3 text-sm text-muted-foreground"><p>{tx(locale, "Use your Clerk account controls for password, social login, and sessions.")}</p><p>{tx(locale, "Workspace roles and credit limits are planned for Business/Team.")}</p><p>{tx(locale, "Deletion path must remove uploaded assets, voice samples, and brand memory when those systems exist.")}</p></CardContent></Card>
      <Card><CardHeader><CardTitle>{tx(locale, "Rights and consent controls")}</CardTitle><CardDescription>{tx(locale, "Required before production uploads.")}</CardDescription></CardHeader><CardContent><p className="text-sm text-muted-foreground">{tx(locale, "Upload, voice, likeness, product claims, and sensitive niche confirmations will be stored as auditable events in production.")}</p></CardContent></Card>
    </div>
  );
}
