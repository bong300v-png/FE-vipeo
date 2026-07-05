"use client";

import { CreditsSection } from "@/components/landing/credits-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HeroSutera } from "@/components/landing/hero-sutera";
import { PricingSection } from "@/components/landing/pricing-section";
import { SiteFooter, SiteHeader } from "@/components/landing/site-chrome";
import { SkillsSection } from "@/components/landing/skills-section";
import { WorkspaceSection } from "@/components/landing/workspace-section";

// Re-exported for blog/changelog/faq/help pages that import from "@/app/page".
export { SiteFooter, SiteHeader };

export default function Home() {
  return (
    <div className="landing-light flex min-h-full flex-col overflow-x-clip">
      <SiteHeader />
      <main className="flex-1 overflow-x-clip">
        <HeroSutera />
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
