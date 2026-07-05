import type { NavSection } from "@/types";

export const dashboardNav: NavSection[] = [
  {
    label: "Create",
    items: [
      { label: "Studio Home", href: "/dashboard", icon: "dashboard" },
      { label: "AI Director", href: "/ai", icon: "sparkles" },
    ],
  },
  {
    label: "Library",
    items: [
      { label: "Skills", href: "/dashboard#skills", icon: "sparkles" },
      { label: "Jobs", href: "/dashboard#jobs", icon: "messagesquare" },
      { label: "Assets", href: "/dashboard#assets", icon: "dashboard" },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Credits", href: "/settings/billing", icon: "creditcard" },
      { label: "Settings", href: "/settings", icon: "settings" },
      { label: "Help", href: "/help", icon: "help" },
    ],
  },
];

export const adminNav: NavSection[] = [
  {
    label: "Operations",
    items: [
      { label: "Ops Console", href: "/admin", icon: "dashboard" },
      { label: "Job Review", href: "/admin#jobs", icon: "messagesquare" },
      { label: "Credits", href: "/admin#credits", icon: "creditcard" },
      { label: "Safety Queue", href: "/admin#safety", icon: "help" },
    ],
  },
];
