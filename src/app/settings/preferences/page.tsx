"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { tx } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";

export default function PreferencesSettingsPage() {
  const locale = useLocale();
  const [language, setLanguage] = useState("en");
  const [platform, setPlatform] = useState("TikTok / Reels");
  const [captionStyle, setCaptionStyle] = useState("Bold creator captions");

  return (
    <div className="space-y-6">
      <Card><CardHeader><CardTitle>{tx(locale, "Creator preferences")}</CardTitle><CardDescription>{tx(locale, "Used as defaults in AI Director. You can override them per job.")}</CardDescription></CardHeader><CardContent className="grid gap-4 md:grid-cols-3"><label className="text-sm font-medium">{tx(locale, "Default language")}<select value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-2 h-10 w-full rounded-lg border border-border bg-background px-3"><option value="en">English</option><option value="vi">Tiếng Việt</option></select></label><label className="text-sm font-medium">{tx(locale, "Default platform")}<select value={platform} onChange={(e) => setPlatform(e.target.value)} className="mt-2 h-10 w-full rounded-lg border border-border bg-background px-3"><option>TikTok / Reels</option><option>YouTube</option><option>Marketplace</option><option>Story</option></select></label><label className="text-sm font-medium">{tx(locale, "Caption style")}<select value={captionStyle} onChange={(e) => setCaptionStyle(e.target.value)} className="mt-2 h-10 w-full rounded-lg border border-border bg-background px-3"><option>{tx(locale, "Bold creator captions")}</option><option>{tx(locale, "Clean subtitles")}</option><option>{tx(locale, "Minimal lower third")}</option></select></label></CardContent></Card>
      <Card><CardHeader><CardTitle>{tx(locale, "Completed job notifications")}</CardTitle><CardDescription>{tx(locale, "Notify me when async renders are completed, failed, or need review.")}</CardDescription></CardHeader><CardContent><p className="text-sm text-muted-foreground">{tx(locale, "Email and in-app notification controls are planned for production.")}</p></CardContent></Card>
    </div>
  );
}
