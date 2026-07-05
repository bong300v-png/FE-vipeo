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

  const gradients = [
    { bg: "from-blue-500/10 to-cyan-500/10", accent: "text-blue-600 dark:text-blue-400" },
    { bg: "from-purple-500/10 to-pink-500/10", accent: "text-purple-600 dark:text-purple-400" },
    { bg: "from-orange-500/10 to-red-500/10", accent: "text-orange-600 dark:text-orange-400" },
    { bg: "from-green-500/10 to-emerald-500/10", accent: "text-green-600 dark:text-green-400" },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, index) => (
        <Card
          key={s.label}
          className={`group relative overflow-hidden border-border/50 bg-gradient-to-br ${gradients[index].bg} backdrop-blur p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30`}
        >
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground/70 transition-colors">{tx(locale, s.label)}</p>
            <p className={`mt-3 text-4xl font-bold tracking-tighter ${gradients[index].accent}`}>{s.value}</p>
          </div>
          <div className="absolute top-0 right-0 size-20 rounded-full bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity blur-xl -mr-8 -mt-8" />
        </Card>
      ))}
    </div>
  );
}
