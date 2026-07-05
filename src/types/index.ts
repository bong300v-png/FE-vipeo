export type Locale = "en" | "vi";

export type SkillLine = "A" | "B" | "C" | "D" | "Image" | "Banner" | "Music" | "Edit";
export type SkillPriority = "MVP" | "P2" | "ROADMAP";

export interface Skill {
  id: string;
  name: string;
  line: SkillLine;
  type: string;
  industry: string;
  platforms: string[];
  ratio: string;
  duration: string;
  priority: SkillPriority;
  version: string;
  status: "live" | "coming-soon";
  creditEstimate: number;
  description: string;
  inputs: string[];
  complianceNote?: string;
}

export type JobStatus = "draft" | "queued" | "running" | "needs_review" | "completed" | "failed" | "cancelled" | "refunded";

export interface Job {
  id: string;
  title: string;
  skillId: string;
  status: JobStatus;
  progress: number;
  locale: Locale;
  ratio: string;
  duration: string;
  creditsReserved: number;
  creditsFinal: number;
  createdAt: string;
  resultUrl?: string;
  failureReason?: string;
}

export interface Asset {
  id: string;
  jobId: string;
  title: string;
  kind: "video" | "image" | "audio" | "banner";
  locale: Locale;
  ratio: string;
  duration?: string;
  platform: string;
  aiLabel: string;
  planGate?: string;
}

export interface CreditLedgerEvent {
  id: string;
  type: "purchase" | "reserve" | "finalize" | "refund" | "adjustment";
  amount: number;
  balanceAfter: number;
  label: string;
  createdAt: string;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  credits: number;
  status: "active" | "coming-soon";
  features: string[];
}

export interface AdminJob {
  id: string;
  user: string;
  skill: string;
  status: JobStatus;
  credits: number;
  risk: "low" | "medium" | "high";
  action: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export interface CurrentUser {
  name: string;
  email: string;
  avatar?: string;
  plan: string;
  credits: number;
  subscriptionStatus: "active" | "trialing" | "canceled" | "none";
}
