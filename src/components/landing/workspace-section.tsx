"use client";

import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";
import { ParallaxImage } from "./media-reveal";

export function WorkspaceSection() {
  const locale = useLocale();

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-foreground/40">[ 04 — Workspace ]</p>
        <h2 className="text-3xl font-black tracking-tighter text-balance lg:text-5xl">{t(locale, "landing.workspace.title")}</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">{t(locale, "landing.preview.subtitle")}</p>
      </div>
      <div className="relative mt-12">
        <ParallaxImage
          src="/images/workspace-suite.jpg"
          alt={t(locale, "landing.preview.title")}
          className="aspect-[16/8] w-full"
        />
        <div className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-wrap gap-2 sm:inset-x-6 sm:bottom-6">
          {(["landing.preview.skill", "landing.preview.credits", "landing.preview.status"] as const).map((key) => (
            <span key={key} className="rounded-full border border-cine-foreground/20 bg-scrim-strong px-3 py-1.5 text-xs font-medium text-cine-foreground backdrop-blur">
              {t(locale, key)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
