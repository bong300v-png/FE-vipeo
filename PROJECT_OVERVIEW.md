# 📋 FE-Vipeo - Dự Án Landing & Dashboard (A-Z)

## 🎯 Tổng Quan Dự Án

**FE-Vipeo** là một ứng dụng Next.js 16 hiện đại với:
- **Landing Page** ấn tượng với hero animation, features showcase, pricing
- **Dashboard** đầy đủ cho user studio video
- **AI Director** tool tạo video workflow
- **Settings** quản lý tài khoản, billing, team, bảo mật
- **Admin Panel** quản lý operations
- **Authentication** sử dụng Clerk
- **Styling** Tailwind CSS v4 + oklch colors
- **Components** shadcn/ui

---

## 🏗️ Cấu Trúc Thư Mục

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout (Clerk, Toast, i18n)
│   ├── page.tsx                 # LANDING PAGE (main page)
│   ├── globals.css              # Tailwind v4 config + themes
│   ├── dashboard/               # Dashboard (/dashboard)
│   ├── ai/                      # AI Director (/ai)
│   ├── settings/                # Settings (/settings/*)
│   ├── admin/                   # Admin (/admin)
│   ├── blog/, changelog/, faq/, help/  # Info pages
│   └── auth/                    # Clerk auth routes
│
├── components/
│   ├── landing/                 # Landing page sections
│   │   ├── hero-scrollytelling.tsx     # Hero with scroll animations
│   │   ├── features-section.tsx        # Features showcase
│   │   ├── skills-section.tsx          # AI capabilities
│   │   ├── credits-section.tsx         # Pricing/credits
│   │   ├── pricing-section.tsx         # Pricing plans
│   │   ├── workspace-section.tsx       # Collaboration features
│   │   ├── site-chrome.tsx             # Header & Footer
│   │   └── media-reveal.tsx            # Media animations
│   │
│   ├── dashboard/               # Dashboard components
│   │   ├── DashboardShell.tsx          # Main layout wrapper
│   │   ├── DashboardContent.tsx        # Main content area
│   │   └── Sidebar.tsx                 # Navigation sidebar
│   │
│   ├── admin/                   # Admin components
│   │   ├── AdminContent.tsx
│   │   ├── AdminStatCards.tsx
│   │   └── AdminAccountsTable.tsx
│   │
│   ├── auth/                    # Auth UI components
│   │   ├── AuthShell.tsx
│   │   ├── SignInForm.tsx
│   │   ├── SignUpForm.tsx
│   │   └── PasswordInput.tsx
│   │
│   ├── ui/                      # shadcn/ui components
│   │   ├── button, card, input, badge, avatar, table, etc.
│   │
│   ├── clerk-theme-provider.tsx # Clerk styling
│   ├── theme-toggle.tsx         # Dark/light mode toggle
│   ├── navigation-loading.tsx   # Page transition loader
│   └── icons.tsx                # Icon library
│
├── lib/
│   ├── nav-config.ts           # Navigation structure
│   ├── mock-data.ts            # Sample user data
│   ├── utils.ts                # Helper functions
│   ├── i18n.ts                 # i18n (localization)
│   └── use-locale.ts           # Locale hook
│
└── types/
    └── index.ts                 # TypeScript interfaces

public/
├── images/                      # Static images
└── assets/                      # SVG, fonts
```

---

## 🎨 Design System

### Colors (Tailwind v4 - oklch color space)

**Light Mode** (`:root`)
```
Background: oklch(1 0 0)           # Pure white
Foreground: oklch(0.145 0 0)       # Almost black
Primary: oklch(0.205 0 0)          # Dark text
Secondary: oklch(0.97 0 0)         # Light gray
Accent: oklch(0.97 0 0)            # Light gray
Destructive: oklch(0.577 0.245)    # Warm red
Cine: oklch(0.78 0.13 75)          # Gold (cinematic)
```

**Dark Mode** (`.dark`)
```
Background: oklch(0.145 0 0)       # Dark gray
Foreground: oklch(0.985 0 0)       # Nearly white
Primary: oklch(0.87 0 0)           # Light text
Secondary: oklch(0.269 0 0)        # Dark gray
Accent: oklch(0.371 0 0)           # Mid gray
Cine: oklch(0.82 0.12 78)          # Gold
```

### Typography
- **Font**: Inter + system font stack
- **Mono**: SFMono-Regular, Menlo, monospace
- **Sizes**: sm, base, lg, xl, 2xl, 3xl (Tailwind)

### Radius Scale
- **sm**: 0.375rem (60% of base)
- **md**: 0.5rem (80%)
- **lg**: 0.625rem (base)
- **xl**: 0.875rem (140%)
- **2xl**: 1.125rem (180%)
- **3xl**: 1.375rem (220%)
- **4xl**: 1.625rem (260%)

---

## 📄 Main Pages

### 1. Landing Page (`/`)
**File**: `/src/app/page.tsx`

**Sections** (in order):
1. **SiteHeader** - Sticky navigation with logo, links, auth buttons, theme toggle
2. **HeroScrollytelling** - Interactive hero with scroll animations
3. **FeaturesSection** - Product capabilities grid
4. **SkillsSection** - AI skills/abilities showcase
5. **CreditsSection** - Credit/token pricing info
6. **WorkspaceSection** - Team collaboration features
7. **PricingSection** - Pricing plans & CTA
8. **SiteFooter** - Links, copyright, social

### 2. Dashboard (`/dashboard`)
**File**: `/src/app/dashboard/page.tsx`
- DashboardShell (layout wrapper with sidebar)
- DashboardContent (main content area)
- Collapsible sidebar navigation

### 3. AI Director (`/ai`)
**File**: `/src/app/ai/page.tsx`
- AI-powered video creation tool

### 4. Admin (`/admin`)
**File**: `/src/app/admin/page.tsx`
- Operations console
- Stat cards
- Account management table

### 5. Settings (`/settings`)
- `/settings` - Main settings page
- `/settings/billing` - Credits & billing
- `/settings/members` - Team management
- `/settings/organization` - Org settings
- `/settings/preferences` - User preferences
- `/settings/security` - Security settings

### 6. Info Pages
- `/blog` - Blog posts
- `/changelog` - Release notes
- `/faq` - FAQ section
- `/help` - Help/support

---

## 🔐 Authentication

**Provider**: Clerk
**Features**:
- Sign-in: `/sign-in/[[...sign-in]]`
- Sign-up: `/sign-up/[[...sign-up]]`
- User profile button
- Dark mode theme

---

## 🧭 Navigation Structure

### Dashboard Sidebar Nav
```
Create
  └─ Studio Home (/dashboard)
  └─ AI Director (/ai)

Library
  └─ Skills
  └─ Jobs
  └─ Assets

Account
  └─ Credits (/settings/billing)
  └─ Settings (/settings)
  └─ Help (/help)
```

### Admin Nav
```
Operations
  └─ Ops Console (/admin)
  └─ Job Review
  └─ Credits
  └─ Safety Queue
```

---

## 🚀 Key Technologies

### Core
- **Next.js**: 16.2.1 (Turbopack bundler)
- **React**: 19.2.4
- **TypeScript**: 5

### Authentication & UI
- **@clerk/nextjs**: 7.5.12 (Auth system)
- **shadcn/ui**: 4.1.0 (Component library)
- **@base-ui/react**: 1.3.0 (Unstyled components)

### Styling
- **Tailwind CSS**: 4 (latest)
- **@tailwindcss/postcss**: 4
- **tailwind-merge**: 3.5.0 (Utility merging)
- **tw-animate-css**: 1.4.0 (Custom animations)

### Utilities
- **clsx**: 2.1.1 (Class name utility)
- **class-variance-authority**: 0.7.1 (Component variants)

---

## 🎬 Landing Page Animations

### Hero Interactions
- **hero-ripple**: Expanding ripple effect on click
- **hero-punch**: Cinematic scale animation on interaction
- **route-progress**: Loading bar during page transitions

### Scroll Effects
- Parallax scrolling in hero section
- Media reveal animations
- Fade-in/slide-in effects

---

## 💾 State Management

### Storage
- **localStorage**: Theme preference, org name
- **Clerk**: User session management
- **Mock data**: Sample user data in `/lib/mock-data.ts`

### Context/Hooks
- useLocale() - Current locale hook
- useTheme() - Theme toggle
- Clerk hooks (useUser, useSession, etc.)

---

## 🌐 Internationalization (i18n)

**Files**:
- `/src/lib/i18n.ts` - i18n functions
- `/src/lib/use-locale.ts` - useLocale hook

**Usage in Components**:
```tsx
const locale = useLocale();
const text = t(locale, "key");  // Translated
const text = tx(locale, "plain text");  // Plain text
```

**Supported**: Header, footer, nav links, auth buttons

---

## 📱 Responsive Design

- **Mobile-first** approach
- **Tailwind breakpoints**: sm, md, lg, xl, 2xl
- **Flexible layouts**: Flexbox for most layouts, Grid for complex sections
- **Dashboard**: Collapsible sidebar for mobile

---

## ⚙️ Key Features

### Theme System
- Light/dark mode toggle in header
- localStorage persistence
- System preference fallback
- Clerk theme integration

### Components
- **ToastProvider**: Global toast notifications
- **NavigationLoading**: Page transition indicator
- **ThemeToggle**: Dark/light mode switcher
- **LocaleSwitcher**: Language switcher (if i18n enabled)

### Dashboard Features
- Collapsible sidebar
- Breadcrumb navigation
- User profile section
- Org name display
- Responsive layout

### Admin Features
- Stat cards (dashboard overview)
- Account management table
- Job review section
- Credits management

---

## 📊 Component Hierarchy

```
Root Layout
├── ClerkThemeProvider
├── ToastProvider
├── NavigationLoading
└── Page Routes
    ├── Landing Page
    │   ├── SiteHeader
    │   ├── HeroScrollytelling
    │   ├── FeaturesSection
    │   ├── SkillsSection
    │   ├── CreditsSection
    │   ├── WorkspaceSection
    │   ├── PricingSection
    │   └── SiteFooter
    │
    ├── Dashboard
    │   ├── DashboardShell
    │   ├── Sidebar
    │   ├── DashboardHeader
    │   └── DashboardContent
    │
    └── Admin
        ├── AdminShell (if exists)
        ├── AdminStatCards
        └── AdminAccountsTable
```

---

## 🔧 Development Setup

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm build

# Run production server
npm start

# Type check
npm run typecheck

# Lint
npm run lint
```

---

## 📝 Environment Variables

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

---

## 🎯 User Flow

1. **Visit Landing** (`/`) - Browse features, pricing
2. **Sign In/Up** (`/sign-in`, `/sign-up`) - Clerk auth
3. **Dashboard** (`/dashboard`) - Studio home
4. **Create** (`/ai`) - Use AI Director tool
5. **Settings** (`/settings/*`) - Account management
6. **Admin** (`/admin`) - (Admin users only)

---

## 📌 Important Notes

- **No Backend API**: Uses mock data (can be replaced with real API)
- **No Database**: Uses localStorage + Clerk for persistence
- **Responsive**: Works on mobile, tablet, desktop
- **Dark Mode First**: Default dark theme in Clerk
- **Accessible**: WCAG compliance with semantic HTML
- **TypeScript**: Fully typed codebase

---

## 🔄 Recent Updates

The project has been updated with:
- Proper `.env` configuration
- i18n (internationalization) support
- Clerk authentication
- Complete landing page with animations
- Full dashboard with sidebar
- Admin panel
- Settings pages

---

## 📚 Quick Reference

### Add New Page
1. Create `/src/app/new-route/page.tsx`
2. Import components
3. Use SiteHeader/Footer if landing
4. Use DashboardShell if dashboard

### Add New Component
1. Create `/src/components/category/ComponentName.tsx`
2. Export from component file
3. Import where needed

### Add New shadcn Component
```bash
npx shadcn-ui@latest add button
```

### Customize Colors
1. Edit `/src/app/globals.css` (`:root` or `.dark`)
2. Use CSS variables in components
3. Tailwind automatically picks up new colors

---

**Last Updated**: July 5, 2026
**Version**: 0.3.1
**Tech Stack**: Next.js 16 + React 19 + Tailwind v4 + Clerk + shadcn/ui
