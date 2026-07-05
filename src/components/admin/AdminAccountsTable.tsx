"use client";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tx } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";
import type { AdminJob } from "@/types";

const riskClass = {
  low: "border-emerald-500/40 bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 font-semibold",
  medium: "border-amber-500/40 bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold",
  high: "border-destructive/40 bg-destructive/15 text-destructive dark:text-red-400 font-semibold",
};

const statusClass = {
  "needs_review": "text-amber-600 dark:text-amber-400 font-semibold",
  "approved": "text-green-600 dark:text-green-400 font-semibold",
  "completed": "text-blue-600 dark:text-blue-400 font-semibold",
};

export function AdminAccountsTable({ jobs }: { jobs: AdminJob[] }) {
  const locale = useLocale();
  return (
    <div className="overflow-x-auto rounded-xl border border-border/50 bg-card/30 backdrop-blur">
      <Table>
        <TableHeader className="bg-muted/40 border-b border-border/50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-bold text-foreground/80">{tx(locale, "Job ID")}</TableHead>
            <TableHead className="font-bold text-foreground/80">{tx(locale, "User")}</TableHead>
            <TableHead className="font-bold text-foreground/80">{tx(locale, "Skill")}</TableHead>
            <TableHead className="font-bold text-foreground/80">{tx(locale, "Status")}</TableHead>
            <TableHead className="font-bold text-foreground/80">{tx(locale, "Credits")}</TableHead>
            <TableHead className="font-bold text-foreground/80">{tx(locale, "Risk")}</TableHead>
            <TableHead className="font-bold text-foreground/80">{tx(locale, "Ops action")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow 
              key={job.id} 
              className="border-border/30 hover:bg-primary/5 transition-colors duration-200"
            >
              <TableCell className="font-mono font-semibold text-primary">{job.id}</TableCell>
              <TableCell className="font-medium">{job.user}</TableCell>
              <TableCell>{tx(locale, job.skill)}</TableCell>
              <TableCell>
                <span className={statusClass[job.status as keyof typeof statusClass] || "text-muted-foreground"}>
                  {tx(locale, job.status)}
                </span>
              </TableCell>
              <TableCell className="font-semibold text-foreground">{job.credits}</TableCell>
              <TableCell>
                <Badge variant="outline" className={riskClass[job.risk]}>
                  {tx(locale, job.risk)}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {tx(locale, job.action)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
