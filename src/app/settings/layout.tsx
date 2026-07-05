"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { tx } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";
import { ChevronRightIcon, PanelLeftIcon, UserIcon, ShieldIcon, SlidersIcon, BuildingIcon, UsersIcon, CreditCardIcon, ArrowLeftIcon } from "@/components/icons";

const ACCOUNT_LINKS = [
  { label: "Profile", href: "/settings", icon: UserIcon },
  { label: "Security", href: "/settings/security", icon: ShieldIcon },
  { label: "Preferences", href: "/settings/preferences", icon: SlidersIcon },
];

const ORG_LINKS = [
  { label: "Workspace", href: "/settings/organization", icon: BuildingIcon },
  { label: "Members", href: "/settings/members", icon: UsersIcon },
  { label: "Credits & billing", href: "/settings/billing", icon: CreditCardIcon },
];

function SettingsLink({ href, label, icon: Icon, collapsed }: { href: string; label: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; collapsed: boolean }) {
  const pathname = usePathname();
  const locale = useLocale();
  const active = pathname === href;
  const visibleLabel = tx(locale, label);
  return (
    <Link href={href} title={collapsed ? visibleLabel : undefined} className={cn("flex h-8 items-center gap-2 rounded-md text-sm font-medium transition-colors cursor-pointer", collapsed ? "size-8 justify-center p-2" : "w-full justify-start px-3 py-2", active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground")}>
      <Icon className="size-4 shrink-0" />
      {!collapsed && <span>{visibleLabel}</span>}
    </Link>
  );
}

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();
  const label = pathname.split("/").pop() || "settings";
  const crumb = label === "settings" ? "Settings" : label.charAt(0).toUpperCase() + label.slice(1);
  const [orgName, setOrgName] = useState("Acme Demo");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setOrgName(localStorage.getItem("vipeo:orgName") || "Acme Demo");
    const handleOrgChange = () => setOrgName(localStorage.getItem("vipeo:orgName") || "Acme Demo");
    window.addEventListener("vipeo:org-change", handleOrgChange);
    return () => window.removeEventListener("vipeo:org-change", handleOrgChange);
  }, []);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className={cn("hidden shrink-0 border-r border-border bg-sidebar p-2 transition-all duration-200 md:block", collapsed ? "w-[66px]" : "w-[248px]")}>
        <div className="flex h-full flex-col rounded-lg bg-sidebar ring-1 ring-sidebar-border">
          <div className="p-2">
            <Link href="/dashboard" title={collapsed ? tx(locale, "Back to Dashboard") : undefined} className={cn("flex h-8 items-center gap-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer", collapsed ? "size-8 justify-center p-2" : "w-full justify-start px-3 py-2")} aria-label={tx(locale, "Back to Dashboard")}>
              <ArrowLeftIcon className="size-4 shrink-0" />
              {!collapsed && <span>{tx(locale, "Back to Dashboard")}</span>}
            </Link>
          </div>
          <nav className="space-y-5 px-2 py-2">
            <div className="space-y-1">
              {!collapsed && <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{tx(locale, "Your Account")}</p>}
              {ACCOUNT_LINKS.map((link) => <SettingsLink key={link.href} {...link} collapsed={collapsed} />)}
            </div>
            <div className="space-y-1">
              {!collapsed && <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{orgName}</p>}
              {ORG_LINKS.map((link) => <SettingsLink key={link.href} {...link} collapsed={collapsed} />)}
            </div>
          </nav>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
          <button onClick={() => setCollapsed((value) => !value)} aria-label={tx(locale, "Toggle Sidebar")} className="mr-1 flex size-[18px] cursor-pointer items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground">
            <PanelLeftIcon className="size-4" />
          </button>
          <span className="mx-1 h-4 w-px bg-border" />
          <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm">
            {crumb !== "Settings" && <><Link href="/settings" className="text-muted-foreground hover:text-foreground">{tx(locale, "Settings")}</Link><ChevronRightIcon className="size-3 text-muted-foreground" /></>}
            <span className="font-medium text-foreground">{tx(locale, crumb)}</span>
          </nav>
        </header>
        <div className="w-full max-w-5xl px-6 py-6">{children}</div>
      </main>
    </div>
  );
}
