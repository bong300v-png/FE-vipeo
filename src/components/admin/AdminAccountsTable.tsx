"use client";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tx } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";
import type { AdminJob } from "@/types";

const riskClass = {
  low: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
  medium: "border-amber-500/30 bg-amber-500/10 text-amber-500",
  high: "border-destructive/30 bg-destructive/10 text-destructive",
};

export function AdminAccountsTable({ jobs }: { jobs: AdminJob[] }) {
  const locale = useLocale();
  return (
    <div className="overflow-hidden rounded-xl border">
      <Table>
        <TableHeader><TableRow><TableHead>{tx(locale, "Job ID")}</TableHead><TableHead>{tx(locale, "User")}</TableHead><TableHead>{tx(locale, "Skill")}</TableHead><TableHead>{tx(locale, "Status")}</TableHead><TableHead>{tx(locale, "Credits")}</TableHead><TableHead>{tx(locale, "Risk")}</TableHead><TableHead>{tx(locale, "Ops action")}</TableHead></TableRow></TableHeader>
        <TableBody>{jobs.map((job) => <TableRow key={job.id}><TableCell className="font-medium">{job.id}</TableCell><TableCell>{job.user}</TableCell><TableCell>{tx(locale, job.skill)}</TableCell><TableCell>{tx(locale, job.status)}</TableCell><TableCell>{job.credits}</TableCell><TableCell><Badge variant="outline" className={riskClass[job.risk]}>{tx(locale, job.risk)}</Badge></TableCell><TableCell className="text-muted-foreground">{tx(locale, job.action)}</TableCell></TableRow>)}</TableBody>
      </Table>
    </div>
  );
}
