# Next.js Dashboard Learning Project

> A practical learning journey through Next.js fundamentals by building a complete Dashboard application, following the official [Next.js Learn Course](https://nextjs.org/learn/dashboard-app).

## 🎯 Project Overview

**Goal**: Learn Next.js 16+ from fundamentals to advanced concepts by implementing a fully functional Dashboard application step-by-step through 16 chapters.

**Learning Method**: Guided by official Next.js course content, practicing each chapter with actual code implementation and experimentation.

---

## 📦 Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.2.4 | Full-stack React framework |
| **React** | 19.2.4 | UI library |
| **TypeScript** | ^5 | Type safety & DX |
| **Tailwind CSS** | ^4 | Utility-first styling |
| **clsx** | ^2.1.1 | Conditional class names |
| **Prisma** | ^7.8.0 | ORM for database (Chapter 6) |
| **PostgreSQL** | 18.3 | Database (Chapter 6) |
| **@prisma/adapter-pg** | ^7.8.0 | PostgreSQL adapter for Prisma |
| **pg** | ^8 | PostgreSQL client |
| **ESLint** | ^9 | Code linting |

### Important Notes
- Next.js 16 has **breaking changes** from older versions
- Always reference `node_modules/next/dist/docs/` for latest features
- Follow deprecation notices carefully

---

## 📚 Learning Roadmap - Next.js Dashboard Course

### Completed ✅
- [x] **Chapter 1: Getting Started** - Project setup & exploration
- [x] **Chapter 2: CSS Styling** - Tailwind, CSS Modules, clsx
- [x] **Chapter 3: Optimizing Fonts and Images** - `next/font`, `next/image`
- [x] **Chapter 4: Creating Layouts and Pages** - Nested routes, File-based routing
- [x] **Chapter 5: Navigating Between Pages** - `Link` component, Active links
- [x] **Chapter 6: Setting Up Your Database** - PostgreSQL, Prisma, data seeding
- [x] **Chapter 7: Fetching Data** - Server Components, data fetching patterns
- [x] **Chapter 8: Static and Dynamic Rendering** - ISR, revalidation strategies
- [x] **Chapter 9: Streaming** - Suspense boundaries, skeleton loaders, progressive rendering
- [x] **Chapter 10: Adding Search and Pagination** - URL query params, pagination
- [x] **Chapter 11: Mutating Data** - Server Actions, form components, revalidation
- [x] **Chapter 12: Handling Errors** - error.tsx, notFound(), error boundaries
- [x] **Chapter 13: Improving Accessibility** - Form validation, ARIA, keyboard navigation
- [x] **Chapter 14: Adding Authentication** - NextAuth.js, GitHub OAuth, route protection

### In Progress 🔄
- [ ] **Chapter 15: Adding Metadata** - SEO, metadata API, dynamic metadata
- [ ] **Chapter 16: Next Steps** - Deployment & best practices

---

## 📁 Project Structure

```
my-app/
├── app/                          # App Router (main code)
│   ├── components/              # Reusable UI components
│   │   └── StatusBadge.tsx      # Example: conditional styling with clsx
│   ├── dashboard/                # Dashboard routes
│   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   ├── page.tsx              # Main dashboard (Chapter 7-9)
│   │   ├── error.tsx             # Dashboard error boundary (Chapter 12)
│   │   ├── not-found.tsx         # Dashboard 404 page (Chapter 12)
│   │   ├── test-db/
│   │   │   └── page.tsx          # Database connection test page
│   │   ├── rendering-demo/       # Chapter 8-9: Rendering demo page
│   │   │   └── page.tsx
│   │   ├── invoices/
│   │   │   ├── page.tsx          # Invoices list (Chapters 10-11)
│   │   │   ├── error.tsx         # Invoices error boundary (Chapter 12)
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Invoice detail page (Chapter 12)
│   │   ├── customers/
│   │   │   ├── page.tsx          # Customers list (Chapter 10)
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Customer detail page (optional)
│   │   └── [other routes]
│   ├── generated/                # Auto-generated Prisma files
│   │   └── prisma/              # Prisma client
│   ├── lib/                      # Utility functions & helpers
│   │   └── db.ts                 # Database utility & query functions
│   ├── ui/                       # Pre-styled UI components & utilities
│   │   ├── fonts.ts              # Font configurations
│   │   ├── global.css            # Global styles
│   │   ├── home.module.css       # CSS Module example
│   │   ├── sidenav.tsx          # Dashboard sidebar (Chapter 4)
│   │   ├── nav-links.tsx         # Navigation links (Chapter 5)
│   │   ├── skeletons.tsx         # Loading skeletons (Chapter 9)
│   │   ├── search.tsx            # Search input component (Chapter 10)
│   │   ├── pagination.tsx        # Pagination component (Chapter 10)
│   │   ├── invoices/
│   │   │   ├── create-invoice-form.tsx  # Create invoice form (Chapter 11)
│   │   │   └── delete-invoice-button.tsx # Delete invoice button (Chapter 11)
│   │   └── dashboard/
│   │       ├── cards.tsx         # Statistics cards (Chapter 7)
│   │       ├── recent-invoices.tsx # Recent invoices table (Chapter 7)
│   │       └── revenue-chart.tsx # Revenue chart (Chapter 7)
│   ├── actions/                  # Server Actions for mutations (Chapter 11)
│   │   └── invoices.ts           # Create, update, delete invoice actions
│   ├── layout.tsx                # Root layout component
│   ├── page.tsx                  # Home page
│   ├── error.tsx                 # Global error boundary (Chapter 12)
│   ├── not-found.tsx             # Global 404 page (Chapter 12)
│   └── globals.css               # Global Tailwind styles
├── prisma/                       # Prisma ORM files
│   ├── schema.prisma            # Database schema (models, relations)
│   ├── seed.ts                  # Database seed script
│   └── migrations/              # Database migrations
├── public/                       # Static assets
│   ├── hero-desktop.svg
│   ├── hero-mobile.svg
│   └── [other images]
├── .env.local                    # Environment variables (local development)
├── DATABASE_SETUP.md             # Database setup guide
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts            # Tailwind configuration
├── postcss.config.mjs            # PostCSS configuration
├── prisma.config.ts              # Prisma configuration
├── eslint.config.mjs             # ESLint configuration
├── AGENTS.md                     # Agent rules for AI
└── CLAUDE.md                     # This file - project guidelines
```

---

## 🛠️ Code Conventions & Best Practices

### File Naming
- **Components**: PascalCase (`StatusBadge.tsx`, `Button.tsx`)
- **Utils/Hooks**: camelCase (`fetchData.ts`, `useAuth.ts`)
- **CSS Modules**: `[component].module.css` (`home.module.css`)
- **Style files**: `[section].css` (for global styles)

### TypeScript Guidelines
- Enable **strict mode** (already configured)
- Export types in separate files: `app/lib/definitions.ts`
- Use `interface` for object shapes, `type` for unions
- Prefer explicit types over `any`

### Styling Strategy
1. **Tailwind first** for most components (utility classes)
2. **CSS Modules** when scoped styles needed
3. **clsx** for conditional class application
4. **Global CSS** only for essential site-wide rules

### Component Patterns
```typescript
// Good: TypeScript types + exported component
interface ComponentProps {
  status: 'pending' | 'paid';
  onClick?: () => void;
}

export default function MyComponent({ status, onClick }: ComponentProps) {
  return <div className={clsx(/* ... */)}>{status}</div>;
}
```

---

## 🚀 Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

---

## 📖 Key Learning Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs) - Complete reference
- [Next.js Learn Course](https://nextjs.org/learn/dashboard-app) - Official course (we're following this)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Core Concepts to Master
1. **App Router** - File-based routing system
2. **Server Components** - Default in App Router
3. **Client Components** - Mark with `'use client'`
4. **Data Fetching** - Async/await in Server Components
5. **Rendering** - Static vs Dynamic
6. **Optimization** - Images, Fonts, Code splitting
7. **Special Files** - `layout.tsx`, `error.tsx`, `not-found.tsx`
8. **Accessibility (WCAG 2.1)** - ARIA attributes, semantic HTML, keyboard navigation, screen readers

---

## 💡 Assistant Guidelines

When helping with this project:

### ✅ DO
- Follow the **Next.js Learn course** structure and progression
- Use **TypeScript** for all new code
- Prefer **Server Components** by default
- Apply **Tailwind CSS** for styling (unless CSS Module is needed)
- Reference the **official Next.js docs** for features
- Explain concepts alongside code implementation
- Update progress tracking as chapters complete
- Create reusable components in `app/components/`
- Implement **accessibility** (WCAG 2.1) from Chapter 13+: ARIA attributes, semantic HTML, keyboard navigation

### ❌ DON'T
- Mix old Pages Router patterns with App Router
- Use outdated Next.js APIs (< v13)
- Ignore TypeScript - use strict types
- Create inline styles (use Tailwind or CSS Modules)
- Skip environment setup steps
- Implement features before the assigned chapter
- Use deprecated Next.js features
- Ignore accessibility requirements in forms and interactive components

### When Implementing Features
1. Check current chapter requirements
2. Read the Next.js docs for that feature
3. Understand WHY it's done that way
4. Implement step-by-step
5. Test in dev server
6. Update progress tracking
7. Add accessibility features from Chapter 13+ (ARIA labels, focus rings, semantic HTML)

---

## 📝 Progress Tracking

### How to Track Progress
- Update `@AGENTS.md` section when starting new chapters
- Mark completed chapters with ✅
- Keep notes on learnings and challenges
- Record custom implementations vs course examples


## 🔗 Current Dependencies

```json
{
  "next": "16.2.4",        // Latest stable
  "react": "19.2.4",       // Latest
  "react-dom": "19.2.4",
  "typescript": "^5",
  "@tailwindcss/postcss": "^4",
  "clsx": "^2.1.1",
  "use-debounce": "^10.0.0", // Added for search debouncing (Chapter 10)
  "eslint": "^9",
  "eslint-config-next": "16.2.4"
}
```

**Note**: If adding new dependencies, ensure they're compatible with Next.js 16 and React 19.

---

## 🎓 Learning Tips

1. **Code Along**: Type out the examples, don't copy-paste
2. **Experiment**: Modify examples to understand how they work
3. **Read Errors**: Next.js error messages are detailed - learn from them
4. **Use Dev Tools**: Chrome DevTools, Next.js debugging
5. **Understand Why**: Don't just implement - understand the reasoning
6. **Build Gradually**: Each chapter builds on previous ones
7. **Review Basics**: Revisit earlier chapters when needed

---

## 📞 Quick Reference

| Question | Answer |
|----------|--------|
| How do I style this? | Use Tailwind first, CSS Modules if needed, clsx for conditionals |
| How do I fetch data? | Use async in Server Components (Chapter 7) |
| How do I handle routes? | File-based routing in `app/` directory |
| How do I optimize images? | Use `next/image` Image component |
| How do I add fonts? | Use `next/font` module |
| How do I handle navigation? | Use `Link` component from Next.js (Chapter 5) |

---

## 🔐 Authentication - Chapter 14 Implementation

### Configuration Files

**auth.ts** (Root directory)
- NextAuth.js v4 configuration (latest stable version)
- GitHub OAuth provider setup
- JWT session strategy (30-day expiration)
- Callbacks for JWT and session handling
- Extended TypeScript types for session/JWT

**middleware.ts** (Root directory)
- Route protection using withAuth middleware
- Protected routes: /dashboard, /invoices, /customers
- Redirects unauthenticated users to /login
- Uses token-based authorization check
- Matcher pattern excludes API and static routes

**app/lib/auth.ts**
- `getSession()`: Get current session in Server Components
- `requireAuth()`: Require auth, redirect to login if missing
- `getCurrentUser()`: Get current authenticated user

### Pages & Components

**app/login/page.tsx** (Client Component)
- GitHub OAuth login button
- Error handling with role="alert"
- Loading state with aria-busy
- Uses useSearchParams to capture callback URL
- Focus rings and accessibility features
- Responsive design with Tailwind

**app/ui/logout-button.tsx** (Client Component)
- Sign out functionality via signOut()
- ARIA attributes for accessibility
- Loading state indication
- Redirects to /login after logout

**app/ui/user-info.tsx** (Server Component)
- Displays logged-in user info
- Shows avatar (from GitHub), name, email
- Includes LogoutButton
- role="status" with aria-live="polite"

### API Routes

**app/api/auth/[...nextauth]/route.ts**
- NextAuth route handlers (GET, POST)
- Handles all OAuth callback and session endpoints
- Uses authOptions from auth.ts

### Environment Variables (.env.local)

```env
# GitHub OAuth
GITHUB_ID=your_client_id
GITHUB_SECRET=your_client_secret

# NextAuth.js
AUTH_SECRET=your_generated_secret
NEXTAUTH_URL=http://localhost:3000
```

### Security Features

- ✅ JWT-based sessions (no database sessions needed)
- ✅ Route protection via middleware
- ✅ Secure credential storage in .env.local
- ✅ OAuth 2.0 protocol via NextAuth.js v4
- ✅ Session expiration (30 days)
- ✅ HTTPS enforced in production (via NEXTAUTH_URL)

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| OAuth callback URL mismatch | Check GitHub app settings: `http://localhost:3000/api/auth/callback/github` |
| "GITHUB_ID or GITHUB_SECRET not found" | Verify .env.local is set and dev server restarted |
| Protected routes always redirect to login | Check middleware.ts exists in root, AUTH_SECRET is set |
| User info not displaying | Verify UserInfo component is imported in dashboard layout |
| Module not found: Can't resolve 'next-auth' | Run `npm install next-auth` |

### Next Steps for Chapter 14

- [ ] Setup GitHub OAuth app (get ID and Secret)
- [ ] Add GitHub credentials to .env.local
- [ ] Generate AUTH_SECRET with openssl
- [ ] Update dashboard layout to display UserInfo component
- [ ] Test login/logout flow end-to-end
- [ ] Verify protected routes redirect correctly
- [ ] Check session persists across page navigation

---

## ✨ Last Updated
- Created: April 22, 2026
- Last Progress: Chapter 15 - Adding Metadata (In Progress)
  - Root metadata with template and OpenGraph
  - Page-level metadata for all dashboard routes
  - Search engine optimization setup
  - Metadata inheritance and template system
- Current Focus: SEO and metadata API implementation

---

## 📝 Chapter 15: Adding Metadata - Implementation Details

### What is Metadata?

Metadata in Next.js is information about your web pages that helps:
- **SEO**: Search engines understand your page content
- **Social Sharing**: Better preview when shared on social media
- **Browser**: Title in tab, favicon, viewport settings

### Metadata Configuration Strategy

**Root Layout (app/layout.tsx)**
```typescript
export const metadata: Metadata = {
  title: {
    template: "%s | Acme Dashboard",  // %s = page title
    default: "Acme Dashboard",         // fallback
  },
  description: "Official Acme Dashboard built with Next.js and React.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Acme Dashboard",
    description: "Official Acme Dashboard built with Next.js and React.",
    type: "website",
    locale: "en_US",
  },
};
```

**Page-Level Metadata**
```typescript
// app/dashboard/invoices/page.tsx
export const metadata: Metadata = {
  title: 'Invoices',  // Combined with template = "Invoices | Acme Dashboard"
  description: 'View and manage your invoices',
};
```

### Implemented Metadata

| Page | Title | Description |
|------|-------|-------------|
| app/layout.tsx (root) | "Acme Dashboard" + template | "Official Acme Dashboard..." |
| app/page.tsx (home) | "Home" → "Home \| Acme Dashboard" | "Welcome to Acme Dashboard..." |
| app/login/page.tsx | "Login" → "Login \| Acme Dashboard" | "Sign in to your Acme Dashboard account" |
| app/dashboard/page.tsx | "Dashboard" → "Dashboard \| Acme Dashboard" | "View your dashboard analytics" |
| app/dashboard/invoices/page.tsx | "Invoices" → "Invoices \| Acme Dashboard" | "View and manage your invoices" |
| app/dashboard/customers/page.tsx | "Customers" → "Customers \| Acme Dashboard" | "View and manage your customers" |

### How Metadata Works in Next.js 16

1. **Export `metadata` object** from layout or page file
2. **Metadata inheritance**: Child pages can override parent metadata
3. **Title template**: Parent's `title.template` combines with child's `title`
4. **Dynamic metadata**: Use `generateMetadata()` for dynamic titles (e.g., product names)
5. **Open Graph**: Social media sharing preview

### Testing Metadata

**In Browser:**
- Right-click page → View Page Source
- Look for `<title>` and `<meta name="description">` tags
- Or use DevTools → Elements tab

**SEO Tools:**
- [Google Search Console](https://search.google.com/search-console) - Check indexed pages
- [Meta Tags Debugger](https://metatags.io) - See how page appears on social media

### Next Chapter (Chapter 16)

Chapter 16 covers:
- Deployment strategies (Vercel, self-hosted)
- Production optimization
- Monitoring and analytics
- Best practices for production

---

**Happy Learning! 🚀 Keep coding and documenting your journey.**
