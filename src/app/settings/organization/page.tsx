"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";
import { tx } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";

export default function OrganizationSettingsPage() {
  const locale = useLocale();
  const [orgName, setOrgName] = useState("Vipeo");
  const [savedName, setSavedName] = useState("Vipeo");
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("vipeo:orgName") || "Vipeo";
    setOrgName(stored);
    setSavedName(stored);
  }, []);

  const saveOrganization = () => {
    const next = orgName.trim() || "Vipeo";
    localStorage.setItem("vipeo:orgName", next);
    setOrgName(next);
    setSavedName(next);
    window.dispatchEvent(new Event("vipeo:org-change"));
    toast({ title: tx(locale, "Workspace saved"), description: tx(locale, "Vipeo workspace settings were updated."), variant: "success" });
  };

  return (
    <div className="space-y-6">
      <Card><CardHeader><CardTitle>{tx(locale, "Workspace name")}</CardTitle><CardDescription>{tx(locale, "Your Vipeo workspace groups credits, jobs, assets, brand settings, and language preferences.")}</CardDescription></CardHeader><CardContent className="space-y-4"><div className="max-w-md space-y-2"><Label htmlFor="orgName">{tx(locale, "Workspace name")}</Label><Input id="orgName" value={orgName} onChange={(e) => setOrgName(e.target.value)} /></div><Button onClick={saveOrganization}>{tx(locale, "Save workspace")}</Button>{orgName !== savedName && <p className="text-xs text-muted-foreground">{tx(locale, "You have unsaved workspace changes.")}</p>}</CardContent></Card>
      <Card><CardHeader><CardTitle>{tx(locale, "Brand basics")}</CardTitle><CardDescription>{tx(locale, "Used by AI Director when preparing banners, captions, and exports.")}</CardDescription></CardHeader><CardContent className="grid gap-4 md:grid-cols-3"><label className="text-sm font-medium">{tx(locale, "Primary color")}<Input defaultValue="#7C3AED" className="mt-2" /></label><label className="text-sm font-medium">{tx(locale, "Accent color")}<Input defaultValue="#F43F5E" className="mt-2" /></label><label className="text-sm font-medium">{tx(locale, "Default language")}<select defaultValue="en" className="mt-2 h-10 w-full rounded-lg border border-border bg-background px-3"><option value="en">English</option><option value="vi">Tiếng Việt</option></select></label></CardContent></Card>
      <Card><CardHeader><CardTitle>{tx(locale, "Brand Memory")}</CardTitle><CardDescription>{tx(locale, "Coming soon")}</CardDescription></CardHeader><CardContent><p className="text-sm text-muted-foreground">{tx(locale, "Future versions will remember approved voice, captions, brand tone, colors, product facts, and banned claims.")}</p></CardContent></Card>
      <Card><CardHeader><CardTitle>{tx(locale, "Upload, voice, and likeness consent")}</CardTitle><CardDescription>{tx(locale, "Required before production uploads")}</CardDescription></CardHeader><CardContent><p className="text-sm text-muted-foreground">{tx(locale, "Production jobs will require explicit rights confirmation for uploaded media, voice, likeness, and sensitive claims before render.")}</p></CardContent></Card>
    </div>
  );
}
