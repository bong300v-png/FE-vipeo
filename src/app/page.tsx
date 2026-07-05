"use client";

import { CreditsSection } from "@/components/landing/credits-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HeroScrollytelling } from "@/components/landing/hero-scrollytelling";
import { InteractiveHeroes } from "@/components/landing/interactive-heroes";
import { PricingSection } from "@/components/landing/pricing-section";
import { SiteFooter, SiteHeader } from "@/components/landing/site-chrome";
import { SkillsSection } from "@/components/landing/skills-section";
import { WorkspaceSection } from "@/components/landing/workspace-section";

// Re-exported for blog/changelog/faq/help pages that import from "@/app/page".
export { SiteFooter, SiteHeader };

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroScrollytelling />
        <InteractiveHeroes />
        <FeaturesSection />
        <SkillsSection />
        <CreditsSection />
        <WorkspaceSection />
        <PricingSection />
      </main>
      <SiteFooter />
    </div>
  );
}
