"use client";

import Link from "next/link";
import { t, tx } from "@/lib/i18n";
import { launchSkills, roadmapSkills } from "@/lib/mock-data";
import { useLocale } from "@/lib/use-locale";
import { cn } from "@/lib/utils";
import { LoopVideo } from "./media-reveal";
import { useInView } from "./use-motion";

export function SkillsSection() {
  const locale = useLocale();
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-foreground/40">[ 02 — {tx(locale, "Skills")} ]</p>
          <h2 className="text-3xl font-black tracking-tighter text-balance lg:text-5xl">{t(locale, "landing.skills.title")}</h2>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground text-pretty">{t(locale, "landing.skills.body")}</p>
          <Link href="/dashboard#skills" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
            {t(locale, "landing.library")}
          </Link>
        </div>
        <LoopVideo src="/videos/skills-lens.mp4" poster="/images/skills-poster.jpg" className="aspect-video" overlay={false} />
      </div>

      <div ref={ref} className="mt-10 grid gap-4 md:grid-cols-3">
        {launchSkills.slice(0, 6).map((skill, index) => (
          <div
            key={skill.id}
            className={cn(
              "rounded-xl border border-border bg-card p-5 transition-all duration-700 ease-out",
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
            style={{ transitionDelay: `${index * 70}ms` }}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-medium">{tx(locale, skill.name)}</h3>
              <span className="rounded-full bg-cine/15 px-2 py-1 text-[10px] font-medium text-foreground">
                {skill.creditEstimate} {tx(locale, "credits")}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tx(locale, skill.description)}</p>
            <p className="mt-3 text-xs text-muted-foreground">{skill.ratio} · {skill.duration}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {roadmapSkills.map((skill) => (
          <div key={skill.id} className="rounded-xl border border-dashed border-border bg-muted/20 p-5 opacity-80">
            <span className="text-xs font-medium text-muted-foreground">{tx(locale, "Coming soon")} · {skill.priority}</span>
            <h3 className="mt-2 font-medium">{tx(locale, skill.name)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tx(locale, skill.description)}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 rounded-xl border border-border bg-muted/20 p-4 text-sm leading-relaxed text-muted-foreground">
        {t(locale, "landing.roadmap")}
      </p>
    </section>
  );
}
