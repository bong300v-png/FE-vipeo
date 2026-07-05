"use client";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tx } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";
import type { AdminJob } from "@/types";

const riskClass = {
  low: "rounded-none border-foreground/30 bg-background font-mono text-[10px] font-bold uppercase tracking-widest text-foreground/70",
  medium: "rounded-none border-black bg-[#facc15] font-mono text-[10px] font-bold uppercase tracking-widest text-black",
  high: "rounded-none border-destructive bg-destructive font-mono text-[10px] font-bold uppercase tracking-widest text-white",
};

const statusClass = {
  "needs_review": "font-mono text-xs font-bold uppercase tracking-wider text-amber-700",
  "approved": "font-mono text-xs font-bold uppercase tracking-wider text-emerald-700",
  "completed": "font-mono text-xs font-bold uppercase tracking-wider text-foreground/70",
};

export function AdminAccountsTable({ jobs }: { jobs: AdminJob[] }) {
  const locale = useLocale();
  return (
    <div className="overflow-x-auto border border-foreground/15 bg-background">
      <Table>
        <TableHeader className="border-b border-foreground/15 bg-muted/50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-mono text-[11px] font-bold uppercase tracking-widest text-foreground/60">{tx(locale, "Job ID")}</TableHead>
            <TableHead className="font-mono text-[11px] font-bold uppercase tracking-widest text-foreground/60">{tx(locale, "User")}</TableHead>
            <TableHead className="font-mono text-[11px] font-bold uppercase tracking-widest text-foreground/60">{tx(locale, "Skill")}</TableHead>
            <TableHead className="font-mono text-[11px] font-bold uppercase tracking-widest text-foreground/60">{tx(locale, "Status")}</TableHead>
            <TableHead className="font-mono text-[11px] font-bold uppercase tracking-widest text-foreground/60">{tx(locale, "Credits")}</TableHead>
            <TableHead className="font-mono text-[11px] font-bold uppercase tracking-widest text-foreground/60">{tx(locale, "Risk")}</TableHead>
            <TableHead className="font-mono text-[11px] font-bold uppercase tracking-widest text-foreground/60">{tx(locale, "Ops action")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow 
              key={job.id} 
              className="border-foreground/10 transition-colors duration-200 hover:bg-[#fffbeb]"
            >
              <TableCell className="font-mono font-semibold">{job.id}</TableCell>
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
