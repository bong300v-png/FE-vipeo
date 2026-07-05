"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getStoredLocale, t, tx } from "@/lib/i18n";
import {
  DashboardIcon,
  MessageSquareIcon,
  SparklesIcon,
  HelpIcon,
  UsersIcon,
  CreditCardIcon,
  ChevronsUpDownIcon,
  ChevronRightIcon,
  PanelLeftIcon,
  SettingsIcon,
  LogOutIcon,
} from "@/components/icons";
import { Modal } from "@/components/ui/modal";
import { StickyActionBar } from "@/components/ui/sticky-action-bar";
import { useToast } from "@/components/ui/toast";
import type { NavSection, CurrentUser } from "@/types";

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  dashboard: DashboardIcon,
  messagesquare: MessageSquareIcon,
  sparkles: SparklesIcon,
  help: HelpIcon,
  users: UsersIcon,
  building: UsersIcon,
  creditcard: CreditCardIcon,
  settings: SettingsIcon,
};

function OrgMenu({ orgName, user, collapsed }: { orgName: string; user: CurrentUser; collapsed: boolean }) {
  const initial = orgName.charAt(0).toUpperCase();
  const userInitial = user.name.charAt(0).toUpperCase();
  const [isOpen, setIsOpen] = useState(false);
  const [switchOpen, setSwitchOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [newOrg, setNewOrg] = useState("");
  const [locale, setLocale] = useState(getStoredLocale());
  const { toast } = useToast();

  const createOrg = () => {
    const name = newOrg.trim();
    if (!name) return;
    localStorage.setItem("vipeo:orgName", name);
    window.dispatchEvent(new Event("vipeo:org-change"));
    setCreateOpen(false);
    setNewOrg("");
    setIsOpen(false);
    toast({ title: tx(locale, "Organization created"), description: `${name} ${tx(locale, "is now the active workspace.")}`, variant: "success" });
  };

  useEffect(() => {
    const update = () => setLocale(getStoredLocale());
    window.addEventListener("vipeo:locale-change", update);
    return () => window.removeEventListener("vipeo:locale-change", update);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.org-menu-container')) {
        setIsOpen(false);
        setSwitchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  return (
    <div className="relative w-full org-menu-container">
      <button
        onClick={() => setIsOpen((v) => !v)}
        type="button"
        title={orgName}
        className={cn(
          "group/button flex items-center rounded-lg border border-sidebar-border bg-sidebar text-left text-sm font-medium text-sidebar-foreground outline-none transition-colors hover:bg-sidebar-accent/40 cursor-pointer",
          collapsed ? "size-8 justify-center" : "h-12 w-full gap-x-2 px-2"
        )}
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium text-muted-foreground">{initial}</span>
        {!collapsed && <span className="ml-2 flex-1 truncate text-sidebar-foreground">{orgName}</span>}
        {!collapsed && <ChevronsUpDownIcon className="ml-auto size-4 shrink-0 text-muted-foreground" />}
      </button>

      {isOpen && (
        <div className={cn(
          "absolute z-50 rounded-lg border border-sidebar-border bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 outline-none animate-in fade-in-0 zoom-in-95 duration-150",
          collapsed ? "left-[calc(100%+10px)] top-0 w-60" : "left-0 top-14 w-full"
        )}>
          {/* User info */}
          <div className="flex items-center gap-2 px-2 py-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-pink-500 to-rose-500 text-sm font-semibold text-white">{userInitial}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-foreground">{user.name}</span>
              <span className="block truncate text-xs text-muted-foreground">{user.email}</span>
            </span>
          </div>
          <div className="-mx-1 my-1 h-px bg-border" />
          
          {/* Switch Workspace */}
          <div className="relative" onMouseLeave={() => setSwitchOpen(false)}>
            <button
              type="button"
              onMouseEnter={() => setSwitchOpen(true)}
              onClick={() => setSwitchOpen(true)}
              className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <UsersIcon className="size-4" />
              <span className="flex-1">{tx(locale, "Switch Workspace")}</span>
              <ChevronRightIcon className="size-4 text-muted-foreground" />
            </button>
            {switchOpen && (
              <div className="absolute left-[calc(100%+6px)] top-0 z-[9999] w-60 rounded-lg border border-border bg-popover p-1 shadow-xl ring-1 ring-foreground/10">
                <button type="button" onClick={() => setSwitchOpen(false)} className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-medium text-muted-foreground">{initial}</span>
                  <span className="flex-1 truncate text-foreground">{orgName}</span>
                  <span className="text-xs text-primary">✓</span>
                </button>
                <div className="-mx-1 my-1 h-px bg-border" />
                <button type="button" onClick={() => { setCreateOpen(true); setIsOpen(false); setSwitchOpen(false); }} className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                  <span className="text-lg leading-none">+</span>
                  {tx(locale, "Create Organization")}
                </button>
              </div>
            )}
          </div>
          
          <div className="-mx-1 my-1 h-px bg-border" />
          
          {/* Settings */}
          <Link href="/settings" onClick={() => setIsOpen(false)} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
            <SettingsIcon className="size-4" /> {t(locale, "nav.settings")}
          </Link>
          
          {/* Help Center */}
          <Link href="/help" onClick={() => setIsOpen(false)} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
            <HelpIcon className="size-4" /> {tx(locale, "Help Center")}
          </Link>
          
          <div className="-mx-1 my-1 h-px bg-border" />
          
          {/* Sign out */}
          <button type="button" onClick={() => { setIsOpen(false); window.location.href = "/auth/sign-in"; }} className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-destructive hover:bg-destructive/10 transition-colors">
            <LogOutIcon className="size-4" /> {tx(locale, "Sign out")}
          </button>
        </div>
      )}

      {/* {tx(locale, "Create Organization")} Modal */}
      <Modal
        open={createOpen}
        title={tx(locale, "Create Organization")}
        description={tx(locale, "Create a new organization to manage your team and projects.")}
        onClose={() => setCreateOpen(false)}
      >
        <form onSubmit={(e) => { e.preventDefault(); createOrg(); }} className="space-y-4 p-5">
          <div className="space-y-2">
            <input
              autoFocus
              value={newOrg}
              onChange={(e) => setNewOrg(e.target.value)}
              placeholder={tx(locale, "Organization name")}
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
            />
            <p className="text-xs text-muted-foreground">{tx(locale, "Choose a name for your organization.")}</p>
          </div>
          <StickyActionBar className="bottom-0 mt-0 rounded-xl shadow-none">
            <p className="text-xs text-muted-foreground">{tx(locale, "You can switch workspaces later from the sidebar.")}</p>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setCreateOpen(false)} className="h-9 rounded-lg border border-border bg-secondary px-3 text-sm text-secondary-foreground hover:bg-secondary/80 transition-colors">{tx(locale, "Cancel")}</button>
              <button type="submit" className="h-9 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">{tx(locale, "Create Organization")}</button>
            </div>
          </StickyActionBar>
        </form>
      </Modal>
    </div>
  );
}

export function Sidebar({ sections, orgName, user, collapsed = false }: { sections: NavSection[]; orgName: string; user: CurrentUser; collapsed?: boolean }) {
  const pathname = usePathname();
  const [locale, setLocale] = useState(getStoredLocale());

  useEffect(() => {
    const update = () => setLocale(getStoredLocale());
    window.addEventListener("vipeo:locale-change", update);
    return () => window.removeEventListener("vipeo:locale-change", update);
  }, []);

  const labelByHref: Record<string, string> = {
    "/dashboard": t(locale, "nav.studio"),
    "/ai": t(locale, "nav.director"),
    "/dashboard#skills": t(locale, "nav.skills"),
    "/dashboard#jobs": t(locale, "nav.jobs"),
    "/dashboard#assets": t(locale, "nav.assets"),
    "/settings/billing": t(locale, "nav.credits"),
    "/settings": t(locale, "nav.settings"),
    "/help": t(locale, "nav.help"),
  };

  return (
    <aside className={cn("flex h-full shrink-0 flex-col bg-transparent p-2 transition-[width] duration-300 ease-in-out", collapsed ? "w-[66px]" : "w-[256px]")}>
      <div className="relative flex size-full flex-col overflow-visible rounded-lg bg-sidebar shadow-sm ring-1 ring-sidebar-border">
        <div className="flex justify-center p-2"><OrgMenu orgName={orgName} user={user} collapsed={collapsed} /></div>
        <nav className="flex-1 space-y-4 overflow-y-auto px-2 py-2">
          {sections.map((section) => <div key={section.label} className="space-y-1">
            {!collapsed && <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/70">{tx(locale, section.label)}</p>}
            {section.items.map((item) => {
              const Icon = iconMap[item.icon];
              const active = item.href === "/dashboard" || item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href);
              const label = labelByHref[item.href] ?? item.label;
              return <Link key={item.href} href={item.href} title={collapsed ? label : undefined} className={cn("flex h-8 items-center gap-2 rounded-md text-sm transition-all", collapsed ? "size-8 justify-center p-2" : "w-full justify-start p-2", active ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground")}><Icon className="size-4 shrink-0" />{!collapsed && <span className="truncate">{label}</span>}</Link>;
            })}
          </div>)}
        </nav>
      </div>
    </aside>
  );
}

export function DashboardHeader({ breadcrumb, onToggle }: { breadcrumb: string; onToggle: () => void }) {
  const [locale, setLocale] = useState(getStoredLocale());

  useEffect(() => {
    const update = () => setLocale(getStoredLocale());
    window.addEventListener("vipeo:locale-change", update);
    return () => window.removeEventListener("vipeo:locale-change", update);
  }, []);

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
      <button onClick={onToggle} aria-label={tx(locale, "Toggle Sidebar")} className="mr-1 flex size-6 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:size-[18px]">
        <PanelLeftIcon className="size-4" />
      </button>
      <span className="mx-1 h-4 w-px bg-border" />
      <nav aria-label="breadcrumb">
        <span className="text-sm font-medium text-foreground">{tx(locale, breadcrumb)}</span>
      </nav>
    </header>
  );
}
