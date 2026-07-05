"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar, DashboardHeader } from "@/components/dashboard/Sidebar";
import type { NavSection, CurrentUser } from "@/types";

export function DashboardShell({ sections, orgName, user, breadcrumb, children }: { sections: NavSection[]; orgName: string; user: CurrentUser; breadcrumb: string; children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeOrgName, setActiveOrgName] = useState(orgName);

  useEffect(() => {
    const sync = () => setActiveOrgName(localStorage.getItem("vipeo:orgName") || orgName);
    sync();
    window.addEventListener("vipeo:org-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("vipeo:org-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, [orgName]);

  const handleToggle = () => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      setMobileOpen((v) => !v);
    } else {
      setCollapsed((c) => !c);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar sections={sections} orgName={activeOrgName} user={user} collapsed={collapsed} />
      </div>

      {/* mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close sidebar"
            className="absolute inset-0 bg-foreground/30"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[280px] max-w-[85vw] bg-background shadow-xl" onClick={() => setMobileOpen(false)}>
            <Sidebar sections={sections} orgName={activeOrgName} user={user} collapsed={false} />
          </div>
        </div>
      )}

      <main className={cn("relative flex flex-1 flex-col overflow-hidden transition-all duration-200")}>
        <DashboardHeader breadcrumb={breadcrumb} onToggle={handleToggle} />
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1288px] px-4 py-4 md:px-5">{children}</div>
        </div>
      </main>
    </div>
  );
}
