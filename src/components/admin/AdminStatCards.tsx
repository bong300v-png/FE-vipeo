"use client";

import { Card } from "@/components/ui/card";
import { adminJobs, launchSkills, recentJobs } from "@/lib/mock-data";
import { tx } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";

export function AdminStatCards() {
  const locale = useLocale();
  const reserved = recentJobs.filter((job) => ["queued", "running"].includes(job.status)).reduce((sum, job) => sum + job.creditsReserved, 0);
  const stats = [
    { label: "Jobs today", value: String(recentJobs.length) },
    { label: "Needs review", value: String(adminJobs.filter((job) => job.status === "needs_review").length) },
    { label: "Credits reserved", value: String(reserved) },
    { label: "Live skills", value: String(launchSkills.filter((skill) => skill.status === "live").length) },
  ];

  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats.map((s) => <Card key={s.label} className="gap-1 p-4"><p className="text-sm font-medium text-muted-foreground">{tx(locale, s.label)}</p><p className="text-2xl font-semibold tracking-tight">{s.value}</p></Card>)}</div>;
}
