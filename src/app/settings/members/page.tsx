"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { tx } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";

const members = [
  { name: "Vipeo Creator", email: "creator@vipeo.demo", role: "Owner", credits: "Unlimited demo" },
  { name: "Editor Demo", email: "editor@vipeo.demo", role: "Editor", credits: "Coming soon" },
];

export default function MembersSettingsPage() {
  const locale = useLocale();
  return (
    <div className="space-y-6">
      <Card><CardHeader className="flex flex-row items-center justify-between gap-4"><div><CardTitle>{tx(locale, "Workspace members")}</CardTitle><CardDescription>{tx(locale, "Team workspace and member credit limits are Business/Team features.")}</CardDescription></div><Button disabled>{tx(locale, "Invite member (Coming soon)")}</Button></CardHeader><CardContent><div className="overflow-hidden rounded-xl border border-border"><table className="w-full text-left text-sm"><thead className="bg-muted/40 text-muted-foreground"><tr><th className="p-3">{tx(locale, "Member")}</th><th className="p-3">{tx(locale, "Role")}</th><th className="p-3">{tx(locale, "Credit limit")}</th></tr></thead><tbody>{members.map((member) => <tr key={member.email} className="border-t border-border"><td className="p-3"><p className="font-medium">{member.name}</p><p className="text-xs text-muted-foreground">{member.email}</p></td><td className="p-3">{tx(locale, member.role)}</td><td className="p-3 text-muted-foreground">{tx(locale, member.credits)}</td></tr>)}</tbody></table></div></CardContent></Card>
      <Card><CardHeader><CardTitle>{tx(locale, "Per-member credit limits")}</CardTitle><CardDescription>{tx(locale, "Coming soon")}</CardDescription></CardHeader><CardContent><p className="text-sm text-muted-foreground">{tx(locale, "Business workspaces will set monthly spend limits by member and skill category.")}</p></CardContent></Card>
    </div>
  );
}
