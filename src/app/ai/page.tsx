"use client";

import { useEffect, useMemo, useState } from "react";
import { currentUser, launchSkills } from "@/lib/mock-data";
import type { Locale } from "@/types";
import { getStoredLocale, localeNames, locales, setStoredLocale, t, tx } from "@/lib/i18n";

function splitOptions(value: string) {
  return value.split("/").map((part) => part.trim()).filter(Boolean);
}

export default function AiPage() {
  const [selectedSkillId, setSelectedSkillId] = useState("fun-facts-top-5");
  const [idea, setIdea] = useState("Top 5 surprising AI video trends for small creators");
  const [locale, setLocale] = useState<Locale>("en");
  const [ratio, setRatio] = useState("9:16");
  const [platform, setPlatform] = useState("TikTok / Reels");
  const [rightsAccepted, setRightsAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setLocale(getStoredLocale());
    const sync = () => setLocale(getStoredLocale());
    window.addEventListener("vipeo:locale-change", sync);
    return () => window.removeEventListener("vipeo:locale-change", sync);
  }, []);

  const handleLocaleChange = (value: Locale) => {
    setLocale(value);
    setStoredLocale(value);
  };

  const selectedSkill = launchSkills.find((skill) => skill.id === selectedSkillId) || launchSkills[0];
  const estimate = selectedSkill.creditEstimate;
  const hasEnoughCredits = currentUser.credits >= estimate;
  const ratioOptions = useMemo(() => splitOptions(selectedSkill.ratio), [selectedSkill.ratio]);
  const canGenerate = hasEnoughCredits && rightsAccepted && idea.trim().length > 0;

  const selectSkill = (skillId: string) => {
    const next = launchSkills.find((skill) => skill.id === skillId) || launchSkills[0];
    setSelectedSkillId(next.id);
    setRatio(splitOptions(next.ratio)[0] || next.ratio);
    setPlatform(next.platforms[0] || "TikTok / Reels");
    setSubmitted(false);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4 md:p-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm font-semibold text-primary">{t(locale, "nav.director")}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{tx(locale, "Describe the outcome. Vipeo builds the job.")}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{tx(locale, "Pick a launch skill, add the idea, choose language, ratio, and platform. Credits are reserved before render and finalized after completion.")}</p>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-semibold">{tx(locale, "1. Choose a skill")}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {launchSkills.map((skill) => (
                  <button key={skill.id} type="button" onClick={() => selectSkill(skill.id)} className={`rounded-xl border p-4 text-left transition-colors ${skill.id === selectedSkillId ? "border-primary bg-primary/10" : "border-border bg-background hover:bg-muted/30"}`}>
                    <div className="flex items-center justify-between gap-3"><span className="font-medium">{tx(locale, skill.name)}</span><span className="text-xs text-primary">{skill.creditEstimate} {tx(locale, "credits")}</span></div>
                    <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{tx(locale, skill.description)}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-semibold">{tx(locale, "2. Tell AI Director what to make")}</h2>
              <div className="mt-4 space-y-4">
                <label className="block text-sm font-medium">{tx(locale, "Idea")}<textarea value={idea} onChange={(event) => setIdea(event.target.value)} className="mt-2 min-h-28 w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:ring-1 focus:ring-primary" /></label>
                <div className="grid gap-3 sm:grid-cols-3">
                  <label className="text-sm font-medium">
                    {tx(locale, "Language")}
                    <select value={locale} onChange={(event) => handleLocaleChange(event.target.value as Locale)} className="mt-2 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground hover:bg-muted/40 transition-colors focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer">
                      {locales.map((value) => <option key={value} value={value}>{localeNames[value]}</option>)}
                    </select>
                  </label>
                  <label className="text-sm font-medium">
                    {tx(locale, "Ratio")}
                    <select value={ratio} onChange={(event) => setRatio(event.target.value)} className="mt-2 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground hover:bg-muted/40 transition-colors focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer">
                      {ratioOptions.map((value) => <option key={value} value={value}>{value}</option>)}
                    </select>
                  </label>
                  <label className="text-sm font-medium">
                    {tx(locale, "Platform")}
                    <select value={platform} onChange={(event) => setPlatform(event.target.value)} className="mt-2 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground hover:bg-muted/40 transition-colors focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer">
                      {selectedSkill.platforms.map((value) => <option key={value} value={value}>{tx(locale, value)}</option>)}
                    </select>
                  </label>
                </div>
                <div className="flex flex-wrap gap-2">{selectedSkill.inputs.map((input) => <span key={input} className="rounded-full border border-border bg-muted/30 px-3 py-1 text-xs text-muted-foreground">{tx(locale, input)}</span>)}</div>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-semibold">{tx(locale, "3. Credits and rights gate")}</h2>
              <div className="mt-4 space-y-3 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">{tx(locale, "Estimated credits")}</span><span className="font-medium">{estimate}</span></div><div className="flex justify-between"><span className="text-muted-foreground">{tx(locale, "Available credits")}</span><span className="font-medium">{currentUser.credits}</span></div>{!hasEnoughCredits && <p className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">{tx(locale, "Top up credits before starting this job.")}</p>}</div>
              {selectedSkill.complianceNote && <p className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-500">{tx(locale, selectedSkill.complianceNote)}</p>}
              <label className="mt-4 flex gap-3 rounded-xl border border-border bg-muted/20 p-4 text-sm text-muted-foreground"><input type="checkbox" checked={rightsAccepted} onChange={(event) => setRightsAccepted(event.target.checked)} /><span>{tx(locale, "I confirm I own or have permission to use any uploaded source material, voice, likeness, product data, or claims used in this job.")}</span></label>
              <button type="button" disabled={!canGenerate} onClick={() => setSubmitted(true)} className="mt-4 w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50">{tx(locale, "Generate demo job")}</button>
            </div>

            {submitted && <div className="rounded-2xl border border-border bg-card p-5"><h2 className="font-semibold">{tx(locale, "Mock job submitted")}</h2><div className="mt-4 space-y-3 text-sm"><p>{tx(locale, "Status")}: {tx(locale, "queued → running → completed (demo)")}</p><div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full w-[72%] bg-primary" /></div><p>{tx(locale, "Progress")}: 72%</p><p>{tx(locale, "Credits reserved")}: {estimate}</p><p className="text-xs text-muted-foreground">{tx(locale, "AI-generated media label will be included in export metadata.")}</p><div className="rounded-xl border border-border p-4"><p className="font-medium">{idea}</p><p className="mt-1 text-xs text-muted-foreground">{tx(locale, selectedSkill.name)} · {locale.toUpperCase()} · {ratio} · {platform}</p><button disabled className="mt-3 rounded-lg border border-border px-3 py-2 text-xs opacity-60">{tx(locale, "Download MP4 (demo)")}</button></div></div></div>}
          </aside>
        </section>
      </div>
    </div>
  );
}
