"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { assets, creditLedger, currentUser, launchSkills, recentJobs, roadmapSkills } from "@/lib/mock-data";
import { tx } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";

const activeStatuses = ["queued", "running", "needs_review"];

function Metric({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <Card className="group relative overflow-hidden border-border/50 bg-gradient-to-br from-card/60 to-card/40 backdrop-blur hover:shadow-lg hover:border-primary/30 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary-accent/0 group-hover:from-primary/5 group-hover:to-secondary-accent/5 transition-all duration-500" />
      <CardHeader className="relative z-10">
        <CardDescription className="group-hover:text-foreground/70 transition-colors">{title}</CardDescription>
        <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary-accent bg-clip-text text-transparent">{value}</CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <p className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors">{description}</p>
      </CardContent>
    </Card>
  );
}

export function DashboardContent() {
  const locale = useLocale();
  const activeJobs = recentJobs.filter((job) => activeStatuses.includes(job.status)).length;
  const skills = [...launchSkills, ...roadmapSkills];
  const skillById = new Map(skills.map((skill) => [skill.id, tx(locale, skill.name)]));

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="grid gap-4 md:grid-cols-3">
        <Metric title={tx(locale, "Available credits")} value={`${currentUser.credits}`} description={tx(locale, "Reserved credits return if a job fails or final cost is lower.")} />
        <Metric title={tx(locale, "Live MVP skills")} value={`${launchSkills.filter((skill) => skill.status === "live").length}`} description={tx(locale, "Line B faceless, edits, images, banners, and music.")} />
        <Metric title={tx(locale, "Active jobs")} value={`${activeJobs}`} description={tx(locale, "Queued, running, or waiting for rights review.")} />
      </section>

      <Link href="/ai" className="group relative block overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-primary-accent/10 via-card to-secondary-accent/10 p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-accent/0 via-transparent to-secondary-accent/0 group-hover:from-primary-accent/10 group-hover:to-secondary-accent/10 transition-all duration-500" />
        <div className="relative z-10">
          <p className="text-sm font-bold uppercase tracking-wider text-primary group-hover:text-primary-accent transition-colors">{tx(locale, "AI Director")}</p>
          <h2 className="mt-3 text-3xl font-bold bg-gradient-to-r from-primary to-secondary-accent bg-clip-text text-transparent group-hover:from-primary-accent group-hover:to-secondary-accent transition-all">{tx(locale, "Describe the video outcome. Vipeo picks the workflow.")}</h2>
          <p className="mt-4 text-base text-muted-foreground group-hover:text-foreground/80 transition-colors">{tx(locale, "Start with a topic, product, language, and platform. The composer shows skill fit, cost, rights gates, and mock progress.")}</p>
        </div>
      </Link>

      <section id="skills" className="space-y-4">
        <div><h2 className="text-xl font-semibold">{tx(locale, "Skill library")}</h2><p className="text-sm text-muted-foreground">{tx(locale, "Launch skills plus clearly marked roadmap workflows.")}</p></div>
        <div className="grid gap-4 md:grid-cols-3">
          {skills.map((skill) => <Card key={skill.id} className={skill.status === "coming-soon" ? "border-dashed opacity-80" : ""}><CardHeader><div className="flex items-start justify-between gap-3"><CardTitle className="text-base">{tx(locale, skill.name)}</CardTitle><span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">{tx(locale, skill.status === "live" ? "Live" : "Coming soon")}</span></div><CardDescription>{tx(locale, skill.type)} · {tx(locale, skill.industry)}</CardDescription></CardHeader><CardContent className="space-y-3"><p className="text-sm text-muted-foreground">{tx(locale, skill.description)}</p><div className="text-xs text-muted-foreground"><p>{skill.ratio} · {skill.duration}</p><p>{skill.platforms.map((platform) => tx(locale, platform)).join(" / ")}</p><p>{skill.creditEstimate} {tx(locale, "estimated credits")} · v{skill.version}</p></div>{skill.status === "live" ? <Link href={`/ai?skill=${skill.id}`} className="inline-flex rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground">{tx(locale, "Create with this skill")}</Link> : <button disabled className="rounded-lg border border-border px-3 py-2 text-xs opacity-60">{tx(locale, "Coming soon")}</button>}</CardContent></Card>)}
        </div>
      </section>

      <section id="jobs" className="space-y-4">
        <h2 className="text-xl font-semibold">{tx(locale, "Recent jobs")}</h2>
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-sm"><thead className="bg-muted/40 text-muted-foreground"><tr><th className="p-3 text-left">{tx(locale, "Job")}</th><th className="p-3 text-left">{tx(locale, "Skill")}</th><th className="p-3 text-left">{tx(locale, "Status")}</th><th className="p-3 text-left">{tx(locale, "Progress")}</th><th className="p-3 text-left">{tx(locale, "Credits")}</th><th className="p-3 text-left">{tx(locale, "Language")}</th></tr></thead><tbody>{recentJobs.map((job) => <tr key={job.id} className="border-t border-border"><td className="p-3"><p className="font-medium">{tx(locale, job.title)}</p>{job.status === "needs_review" && <p className="text-xs text-amber-500">{tx(locale, "Rights confirmation required before continuing.")}</p>}{job.status === "failed" && <p className="text-xs text-destructive">{tx(locale, "Credits eligible for refund review.")}</p>}</td><td className="p-3 text-muted-foreground">{skillById.get(job.skillId)}</td><td className="p-3">{tx(locale, job.status)}</td><td className="p-3">{job.progress}%</td><td className="p-3">{job.creditsFinal || job.creditsReserved}</td><td className="p-3 uppercase">{job.locale}</td></tr>)}</tbody></table>
        </div>
      </section>

      <section id="assets" className="grid gap-4 lg:grid-cols-2">
        <Card><CardHeader><CardTitle>{tx(locale, "Recent assets")}</CardTitle><CardDescription>{tx(locale, "Finished exports and metadata.")}</CardDescription></CardHeader><CardContent className="space-y-4">{assets.map((asset) => <div key={asset.id} className="rounded-lg border border-border p-3"><p className="font-medium">{tx(locale, asset.title)}</p><p className="text-xs text-muted-foreground">{tx(locale, asset.kind)} · {asset.ratio} · {tx(locale, asset.platform)}</p><p className="mt-2 text-xs text-muted-foreground">{tx(locale, asset.aiLabel)}</p>{asset.planGate && <p className="mt-1 text-xs text-primary">{tx(locale, asset.planGate)}</p>}<p className="mt-2 text-xs text-muted-foreground">{tx(locale, "Export metadata: AI-generated media. Synthetic voice/avatar/dub labels appear when applicable.")}</p></div>)}</CardContent></Card>
        <Card><CardHeader><CardTitle>{tx(locale, "Credit ledger")}</CardTitle><CardDescription>{tx(locale, "Reserve, finalize, refund, and adjustment events.")}</CardDescription></CardHeader><CardContent className="space-y-3">{creditLedger.map((event) => <div key={event.id} className="flex items-center justify-between gap-3 rounded-lg border border-border p-3 text-sm"><div><p className="font-medium">{tx(locale, event.label)}</p><p className="text-xs text-muted-foreground">{event.createdAt}</p></div><div className="text-right"><p className={event.amount < 0 ? "text-destructive" : "text-primary"}>{event.amount > 0 ? "+" : ""}{event.amount}</p><p className="text-xs text-muted-foreground">{event.balanceAfter}</p></div></div>)}</CardContent></Card>
      </section>
    </div>
  );
}
