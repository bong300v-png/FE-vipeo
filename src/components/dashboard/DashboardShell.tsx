"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar, DashboardHeader } from "@/components/dashboard/Sidebar";
import type { NavSection, CurrentUser } from "@/types";

export function DashboardShell({ sections, orgName, user, breadcrumb, children }: { sections: NavSection[]; orgName: string; user: CurrentUser; breadcrumb: string; children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
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

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar sections={sections} orgName={activeOrgName} user={user} collapsed={collapsed} />
      <main className={cn("relative flex flex-1 flex-col overflow-hidden transition-all duration-200")}>
        <DashboardHeader breadcrumb={breadcrumb} onToggle={() => setCollapsed((c) => !c)} />
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1288px] px-5 py-4">{children}</div>
        </div>
      </main>
    </div>
  );
}
