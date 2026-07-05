import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AdminContent } from "@/components/admin/AdminContent";
import { adminNav } from "@/lib/nav-config";
import { currentUser } from "@/lib/mock-data";

export default function AdminPage() {
  return (
    <DashboardShell
      sections={adminNav}
      orgName="Super Admin"
      user={currentUser}
      breadcrumb="Admin"
    >
      <AdminContent />
    </DashboardShell>
  );
}
