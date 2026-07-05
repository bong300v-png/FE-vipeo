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

  return (
    <div className="grid grid-cols-1 gap-px border border-foreground/15 bg-foreground/15 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, index) => (
        <Card
          key={s.label}
          className="group relative rounded-none border-0 bg-background p-6 shadow-none transition-colors hover:bg-[#fffbeb]"
        >
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{tx(locale, s.label)}</p>
            <span className="font-mono text-xs font-bold text-foreground/30">0{index + 1}</span>
          </div>
          <p className="mt-3 text-5xl font-black tracking-tighter">{s.value}</p>
          <span className="absolute bottom-4 right-4 size-[10px] border border-foreground bg-background transition-colors group-hover:bg-[#facc15]" />
        </Card>
      ))}
    </div>
  );
}
