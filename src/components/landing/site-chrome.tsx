"use client";

import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { LogoIcon } from "@/components/icons";
import { LocaleSwitcher, ThemeToggle } from "@/components/theme-toggle";
import { t, tx } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";

export function SiteHeader() {
  const locale = useLocale();
  const navLinks = [
    { label: t(locale, "nav.blog"), href: "/blog" },
    { label: t(locale, "nav.changelog"), href: "/changelog" },
    { label: t(locale, "nav.help"), href: "/help" },
    { label: t(locale, "nav.faq"), href: "/faq" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-3 md:gap-6 md:px-4">
        <Link href="/" aria-label="Home Page" className="shrink-0">
          <LogoIcon className="w-16 md:w-20" />
        </Link>
        <nav className="hidden flex-1 md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex min-w-0 items-center gap-1 md:gap-2">
          <div className="hidden sm:block"><LocaleSwitcher /></div>
          <ThemeToggle />
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="whitespace-nowrap rounded-lg px-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground md:px-3">{t(locale, "auth.signIn")}</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="whitespace-nowrap rounded-lg bg-primary px-2.5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 md:px-3">{t(locale, "auth.signUp")}</button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const locale = useLocale();
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:justify-between md:gap-12">
        <div className="flex flex-col gap-y-4 md:w-5/12">
          <div><LogoIcon className="w-20" /></div>
          <div className="flex flex-col gap-y-4">
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {tx(locale, "Vipeo turns ideas into export-ready creative assets with AI skills, credits, and rights-aware workflows.")}
            </p>
            <p className="text-sm text-muted-foreground">© Copyright {new Date().getFullYear()} Vipeo. {tx(locale, "All Rights Reserved.")}</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-y-6 gap-x-8 sm:flex-row md:justify-end md:gap-x-10 lg:gap-x-12">
          <div className="min-w-[120px] space-y-3">
            <p className="text-sm font-medium text-foreground">{tx(locale, "About")}</p>
            <ul className="space-y-2">
              <li><Link href="/blog" className="block text-sm text-muted-foreground transition-colors hover:text-foreground">{t(locale, "nav.blog")}</Link></li>
              <li><Link href="/help" className="block text-sm text-muted-foreground transition-colors hover:text-foreground">{tx(locale, "Help Center")}</Link></li>
              <li><Link href="/changelog" className="block text-sm text-muted-foreground transition-colors hover:text-foreground">{t(locale, "nav.changelog")}</Link></li>
              <li><Link href="/faq" className="block text-sm text-muted-foreground transition-colors hover:text-foreground">{t(locale, "nav.faq")}</Link></li>
            </ul>
          </div>
          <div className="min-w-[120px] space-y-3">
            <p className="text-sm font-medium text-foreground">{tx(locale, "Legal")}</p>
            <ul className="space-y-2">
              <li><Link href="/terms-of-service" className="block text-sm text-muted-foreground transition-colors hover:text-foreground">{tx(locale, "Terms of Service")}</Link></li>
              <li><Link href="/privacy-policy" className="block text-sm text-muted-foreground transition-colors hover:text-foreground">{tx(locale, "Privacy Policy")}</Link></li>
              <li><Link href="/cookie-policy" className="block text-sm text-muted-foreground transition-colors hover:text-foreground">{tx(locale, "Cookie Policy")}</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
