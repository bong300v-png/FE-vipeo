import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { dashboardNav } from "@/lib/nav-config";
import { currentUser } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <DashboardShell
      sections={dashboardNav}
      orgName="Vipeo"
      user={currentUser}
      breadcrumb="Studio Home"
    >
      <DashboardContent />
    </DashboardShell>
  );
}
