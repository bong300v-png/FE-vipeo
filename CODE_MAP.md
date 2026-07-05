# FE-vipeo Code Map

## Project Overview
**Name:** Vipeo — AI Director Studio  
**Type:** Next.js 16 Application with TypeScript + Tailwind CSS + shadcn/ui  
**Description:** A video workflow creation platform with AI-powered director capabilities, skill management, job processing, and credit-based billing system.

---

## Technology Stack

### Core Framework
- **Next.js 16.2.1** - React framework with App Router
- **React 19.2.4** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS
- **shadcn/ui 4.1.0** - Component library

### Authentication & Access Control
- **Clerk 7.5.12** (@clerk/nextjs) - Authentication & user management
- **Clerk Themes 2.4.57** - Theme customization

### UI & Styling
- **class-variance-authority 0.7.1** - Component variant management
- **clsx 2.1.1** - Conditional className utility
- **tailwind-merge 3.5.0** - Tailwind CSS utility merging
- **tw-animate-css 1.4.0** - Animation utilities
- **@base-ui/react 1.3.0** - Unstyled accessible components

### Development Tools
- **ESLint 9** - Code linting
- **@tailwindcss/postcss 4** - PostCSS plugin for Tailwind

---

## Directory Structure

```
src/
├── app/                           # Next.js App Router pages & layouts
│   ├── layout.tsx                 # Root layout with providers
│   ├── globals.css                # Global styles & design tokens
│   ├── page.tsx                   # Home/landing page
│   │
│   ├── dashboard/                 # User dashboard
│   │   └── page.tsx               # Main dashboard view (studio home)
│   │
│   ├── ai/                        # AI Director feature
│   │   ├── layout.tsx             # AI section layout
│   │   └── page.tsx               # AI director interface
│   │
│   ├── auth/                      # Auth-related pages
│   │   ├── sign-in/
│   │   │   └── page.tsx           # Custom sign-in page
│   │   └── sign-up/
│   │       └── page.tsx           # Custom sign-up page
│   │
│   ├── sign-in/[[...sign-in]]/    # Clerk hosted sign-in
│   │   └── page.tsx
│   │
│   ├── sign-up/[[...sign-up]]/    # Clerk hosted sign-up
│   │   └── page.tsx
│   │
│   ├── settings/                  # User settings & account
│   │   ├── layout.tsx             # Settings layout
│   │   ├── page.tsx               # Settings overview
│   │   ├── billing/
│   │   │   └── page.tsx           # Credits & billing management
│   │   ├── security/
│   │   │   └── page.tsx           # Security settings
│   │   ├── preferences/
│   │   │   └── page.tsx           # User preferences
│   │   ├── organization/
│   │   │   └── page.tsx           # Organization settings
│   │   └── members/
│   │       └── page.tsx           # Team member management
│   │
│   ├── admin/                     # Admin console & operations
│   │   └── page.tsx               # Ops console (job review, safety queue)
│   │
│   ├── blog/                      # Blog/documentation
│   │   └── page.tsx
│   │
│   ├── help/                      # Help & support
│   │   └── page.tsx
│   │
│   ├── faq/                       # FAQ section
│   │   └── page.tsx
│   │
│   ├── changelog/                 # Changelog/updates
│   │   └── page.tsx
│   │
│   └── favicon.ico
│
├── components/                    # React components
│   ├── landing/                   # Landing page components
│   │   ├── hero-scrollytelling.tsx    # Hero section with scroll effects
│   │   ├── features-section.tsx       # Features showcase
│   │   ├── pricing-section.tsx        # Pricing plans display
│   │   ├── skills-section.tsx         # Skills/capabilities section
│   │   ├── credits-section.tsx        # Credits explanation
│   │   ├── workspace-section.tsx      # Workspace overview
│   │   ├── media-reveal.tsx           # Media reveal animations
│   │   ├── site-chrome.tsx            # Chrome/shell container
│   │   └── use-motion.ts              # Custom motion hooks
│   │
│   ├── dashboard/                 # Dashboard components
│   │   ├── DashboardShell.tsx     # Dashboard layout wrapper
│   │   ├── DashboardContent.tsx   # Main dashboard content
│   │   └── Sidebar.tsx            # Navigation sidebar
│   │
│   ├── admin/                     # Admin-specific components
│   │   ├── AdminContent.tsx       # Admin page main content
│   │   ├── AdminStatCards.tsx     # Stats/metrics cards
│   │   └── AdminAccountsTable.tsx # Accounts management table
│   │
│   ├── auth/                      # Authentication components
│   │   ├── AuthShell.tsx          # Auth page layout
│   │   ├── SignInForm.tsx         # Sign-in form component
│   │   ├── SignUpForm.tsx         # Sign-up form component
│   │   └── PasswordInput.tsx      # Password input field
│   │
│   ├── ui/                        # shadcn/ui components (reusable)
│   │   ├── button.tsx             # Button component
│   │   ├── card.tsx               # Card container
│   │   ├── input.tsx              # Text input field
│   │   ├── label.tsx              # Form label
│   │   ├── avatar.tsx             # User avatar
│   │   ├── badge.tsx              # Badge/tag
│   │   ├── table.tsx              # Data table
│   │   ├── modal.tsx              # Modal/dialog
│   │   ├── dropdown-menu.tsx      # Dropdown menu
│   │   ├── toast.tsx              # Toast notifications
│   │   └── sticky-action-bar.tsx  # Fixed action bar
│   │
│   ├── clerk-theme-provider.tsx   # Clerk authentication provider with theme
│   ├── navigation-loading.tsx     # Navigation loading state
│   ├── theme-toggle.tsx           # Dark/light theme toggle
│   └── icons.tsx                  # Icon components/utilities
│
├── lib/                           # Utility functions & configuration
│   ├── nav-config.ts              # Navigation menu configuration
│   │                              #   - dashboardNav: dashboard menu items
│   │                              #   - adminNav: admin menu items
│   │
│   ├── mock-data.ts               # Mock data for development/demo
│   │                              # (skills, jobs, assets, credits)
│   │
│   ├── utils.ts                   # General utilities (cn, classname helpers)
│   │
│   ├── workspace.ts               # Workspace/workspace-related utilities
│   │
│   ├── i18n.ts                    # Internationalization (en/vi support)
│   │
│   ├── use-locale.ts              # Hook for accessing current locale
│   │
│   └── (other utilities as needed)
│
├── types/                         # TypeScript type definitions
│   └── index.ts                   # Central type definitions:
│       ├── Locale                 # "en" | "vi"
│       ├── SkillLine              # Skill categories (A, B, C, D, Image, Banner, Music, Edit)
│       ├── SkillPriority          # Priority levels (MVP, P2, ROADMAP)
│       ├── Skill                  # Skill interface (id, name, platform, duration, etc.)
│       ├── JobStatus              # Job states (draft, queued, running, completed, failed, etc.)
│       ├── Job                    # Job processing interface
│       ├── Asset                  # Asset/output interface (video, image, audio, banner)
│       ├── CreditLedgerEvent      # Credit transaction history
│       ├── Plan                   # Billing plan interface
│       ├── AdminJob               # Admin view of job
│       ├── NavItem                # Navigation item interface
│       ├── NavSection             # Navigation section grouping
│       └── CurrentUser            # User profile interface
│
├── proxy.ts                       # Middleware (proxy configuration)
│
└── (other root-level configs)
```

---

## Core Features & Components

### 1. **Landing Page** (`/`)
- Hero section with scroll-triggered animations
- Features showcase
- Pricing plans display
- Skills/capabilities overview
- Credits explanation
- Workspace section
- Components used: `hero-scrollytelling`, `features-section`, `pricing-section`, `skills-section`, `credits-section`, `workspace-section`

### 2. **Dashboard** (`/dashboard`)
- Main user studio interface
- Skills library display
- Jobs management (history, status tracking)
- Assets library (video, image, audio, banner)
- Credit balance display
- Components: `DashboardShell`, `DashboardContent`, `Sidebar`

### 3. **AI Director** (`/ai`)
- AI-powered video workflow creation
- Skill selection interface
- Input/configuration forms
- Output preview
- Dedicated layout for this feature

### 4. **Authentication**
- Clerk integration for secure auth
- Custom sign-in/sign-up forms: `SignInForm`, `SignUpForm`
- Password input component: `PasswordInput`
- Auth shell layout: `AuthShell`
- Hosted Clerk pages for sign-in/sign-up

### 5. **Settings** (`/settings`)
- **Billing** - Credit purchase, subscription management
- **Security** - Password, sessions, 2FA
- **Preferences** - Language, notifications, theme
- **Organization** - Workspace/team settings
- **Members** - User management, roles, permissions
- Main settings page with overview

### 6. **Admin Console** (`/admin`)
- Operations dashboard
- Job review & moderation queue
- Credit management & refunds
- Safety queue for content review
- Components: `AdminContent`, `AdminStatCards`, `AdminAccountsTable`

### 7. **Info Pages**
- **Blog** (`/blog`) - Articles/updates
- **Help** (`/help`) - Support resources
- **FAQ** (`/faq`) - Common questions
- **Changelog** (`/changelog`) - Version history

---

## Key Data Models

### User & Account
```typescript
CurrentUser {
  name: string
  email: string
  avatar?: string
  plan: string
  credits: number
  subscriptionStatus: "active" | "trialing" | "canceled" | "none"
}
```

### Skills & Capabilities
```typescript
Skill {
  id: string
  name: string
  line: "A" | "B" | "C" | "D" | "Image" | "Banner" | "Music" | "Edit"
  type: string
  industry: string
  platforms: string[]
  ratio: string
  duration: string
  priority: "MVP" | "P2" | "ROADMAP"
  version: string
  status: "live" | "coming-soon"
  creditEstimate: number
  description: string
  inputs: string[]
  complianceNote?: string
}
```

### Jobs & Processing
```typescript
Job {
  id: string
  title: string
  skillId: string
  status: "draft" | "queued" | "running" | "needs_review" | "completed" | "failed" | "cancelled" | "refunded"
  progress: number
  locale: "en" | "vi"
  ratio: string
  duration: string
  creditsReserved: number
  creditsFinal: number
  createdAt: string
  resultUrl?: string
  failureReason?: string
}
```

### Credits & Billing
```typescript
Plan {
  id: string
  name: string
  price: string
  credits: number
  status: "active" | "coming-soon"
  features: string[]
}

CreditLedgerEvent {
  id: string
  type: "purchase" | "reserve" | "finalize" | "refund" | "adjustment"
  amount: number
  balanceAfter: number
  label: string
  createdAt: string
}
```

### Assets
```typescript
Asset {
  id: string
  jobId: string
  title: string
  kind: "video" | "image" | "audio" | "banner"
  locale: "en" | "vi"
  ratio: string
  duration?: string
  platform: string
  aiLabel: string
  planGate?: string
}
```

---

## Navigation Structure

### Dashboard Navigation (`dashboardNav`)
```
Create
  └── Studio Home (/dashboard)
  └── AI Director (/ai)

Library
  └── Skills (/dashboard#skills)
  └── Jobs (/dashboard#jobs)
  └── Assets (/dashboard#assets)

Account
  └── Credits (/settings/billing)
  └── Settings (/settings)
  └── Help (/help)
```

### Admin Navigation (`adminNav`)
```
Operations
  └── Ops Console (/admin)
  └── Job Review (/admin#jobs)
  └── Credits (/admin#credits)
  └── Safety Queue (/admin#safety)
```

---

## Styling & Design System

### Design Tokens (in `globals.css`)
- **Color Variables**: Primary, accent, background, foreground, etc.
- **Font**: Inter font family
- **Dark Mode**: Default dark theme with light mode toggle support
- **Tailwind CSS v4**: Theme configuration via CSS custom properties

### Theme System
- Dark theme by default
- Theme toggle component: `theme-toggle.tsx`
- Clerk theme integration: `clerk-theme-provider.tsx`
- localStorage persistence for theme preference

### UI Component Library (shadcn/ui)
All components styled with Tailwind CSS and exported from `src/components/ui/`:
- Form components: button, input, label
- Display: card, badge, avatar
- Interactive: dropdown-menu, modal, table
- Feedback: toast notifications
- Layout: sticky-action-bar

---

## Development Workflow

### Scripts
```bash
npm run dev         # Start dev server
npm run build       # Production build
npm run start       # Start production server
npm run lint        # Run ESLint
npm run typecheck   # TypeScript type checking
npm run check       # Run lint + typecheck + build
```

### Key Configuration Files
- **next.config.ts** - Next.js configuration
- **tsconfig.json** - TypeScript configuration (paths alias: `@/*` → `./src/*`)
- **tailwind.config.js** - Tailwind CSS configuration
- **.eslintrc** - ESLint rules

### Path Aliases
- `@/*` → `./src/*` - All imports use `@/` prefix for clean imports

---

## Authentication & Authorization

### Clerk Integration
- Hosted auth pages: `/sign-in` and `/sign-up`
- Custom auth pages: `/auth/sign-in` and `/auth/sign-up`
- User management via Clerk dashboard
- Protected routes (todo: implement middleware)

### User Types & Roles
- **Regular User** - Access to dashboard, AI director, settings
- **Admin** - Access to admin console, ops dashboard, job review

---

## Internationalization (i18n)

### Supported Locales
- **English** (en)
- **Vietnamese** (vi)

### Implementation
- `lib/i18n.ts` - i18n configuration
- `lib/use-locale.ts` - Hook for accessing current locale
- Locale support in data models (Skill, Job, Asset)

---

## API & Server Routes

*Note: Currently uses mock data. Real API integration needed for:*
- Skill retrieval
- Job creation & status tracking
- Asset storage & delivery
- Credit ledger operations
- User management

---

## Future Implementation Areas

1. **Backend API** - Server routes for CRUD operations
2. **Database Integration** - Persist skills, jobs, assets, credits, users
3. **Job Processing** - Queue system for video processing
4. **Stripe Integration** - Payment processing for credit purchases
5. **Real-time Updates** - WebSocket or polling for job status
6. **Error Handling** - Comprehensive error boundaries
7. **Testing** - Unit, integration, and E2E tests
8. **Analytics** - User behavior tracking
9. **Middleware** - Route protection, auth verification

---

## File Naming Conventions

- **Pages**: `page.tsx` (Next.js convention)
- **Layouts**: `layout.tsx` (Next.js convention)
- **Components**: PascalCase (e.g., `DashboardShell.tsx`)
- **Utilities**: camelCase (e.g., `use-locale.ts`)
- **Types**: Exported from `types/index.ts`
- **Constants**: UPPER_SNAKE_CASE or camelCase

---

## Performance Considerations

- Next.js 16 with Turbopack (stable)
- React Compiler support available
- Image optimization via Next.js
- CSS optimization via Tailwind CSS v4
- Font optimization with `next/font`

---

## Security Considerations

- Clerk for secure authentication
- TypeScript for type safety
- Input validation (to be implemented)
- Environment variables for sensitive data (to be configured)
- CSRF protection (to be implemented)
- Rate limiting (to be implemented)

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Clerk Documentation](https://clerk.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org)

---

**Last Updated:** 2025-07-05  
**Status:** Complete initial project structure mapping
