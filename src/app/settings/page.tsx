"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { currentUser } from "@/lib/mock-data";
import { tx } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";

export default function ProfileSettingsPage() {
  const locale = useLocale();
  const [name, setName] = useState(currentUser.name);
  const [language, setLanguage] = useState("en");
  const [platform, setPlatform] = useState("TikTok / Reels");
  const [notify, setNotify] = useState("Email when completed");
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); window.setTimeout(() => setSaved(false), 1400); };

  return (
    <div className="space-y-6">
      <Card><CardHeader><CardTitle>{tx(locale, "Creator profile")}</CardTitle><CardDescription>{tx(locale, "Defaults used by AI Director when preparing new jobs.")}</CardDescription></CardHeader><CardContent className="space-y-4"><div className="max-w-md space-y-2"><Label htmlFor="name">{tx(locale, "Display name")}</Label><Input id="name" value={name} onChange={(e) => setName(e.target.value)} /></div><div className="grid max-w-2xl gap-4 md:grid-cols-3"><label className="text-sm font-medium">{tx(locale, "Default language")}<select value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-2 h-10 w-full rounded-lg border border-border bg-background px-3"><option value="en">English</option><option value="vi">Tiếng Việt</option></select></label><label className="text-sm font-medium">{tx(locale, "Default platform")}<select value={platform} onChange={(e) => setPlatform(e.target.value)} className="mt-2 h-10 w-full rounded-lg border border-border bg-background px-3"><option>TikTok / Reels</option><option>YouTube</option><option>Marketplace</option></select></label><label className="text-sm font-medium">{tx(locale, "Completed jobs")}<select value={notify} onChange={(e) => setNotify(e.target.value)} className="mt-2 h-10 w-full rounded-lg border border-border bg-background px-3"><option>{tx(locale, "Email when completed")}</option><option>{tx(locale, "In-app only")}</option><option>{tx(locale, "No notifications")}</option></select></label></div><Button onClick={save}>{tx(locale, "Save Changes")}</Button>{saved && <p className="text-xs text-emerald-400">{tx(locale, "Changes saved")}</p>}</CardContent></Card>
      <Card><CardHeader><CardTitle>{tx(locale, "Data deletion")}</CardTitle><CardDescription>{tx(locale, "Deletion is demo-only in this prototype.")}</CardDescription></CardHeader><CardContent><p className="text-sm text-muted-foreground">{tx(locale, "Production deletion must remove uploaded assets, voice samples, brand memory, and workspace references when those systems exist.")}</p></CardContent></Card>
    </div>
  );
}
