# GreenSMiL Portfolio & Web Platform

A modern full-stack portfolio and web platform built with Next.js, AWS Amplify, and shadcn/ui.

## 🚀 Tech Stack

### Core Framework
- **Next.js 15.5.3** - React framework with App Router
- **React 19.0.0** - UI library
- **TypeScript 5** - Type safety

### Backend & Authentication
- **AWS Amplify Gen 2** (v6.15.2) - Backend infrastructure
- **AWS Cognito** - User authentication and authorization
- **@aws-amplify/adapter-nextjs** - Next.js integration
- **@aws-amplify/ui-react** - Pre-built auth components

### UI & Styling
- **shadcn/ui** - Component library built on Radix UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon library
- **class-variance-authority** - Component variants
- **clsx + tailwind-merge** - Conditional class merging

### Forms & Validation
- **react-hook-form** - Form state management and validation

### Testing
- **Playwright** - End-to-end testing framework

---

## 📁 Project Structure

```
my-web/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (dashboard)/          # Route group for dashboard
│   │   │   └── admin/            # Admin pages
│   │   ├── auth/                 # Auth-related components
│   │   ├── contact/              # Contact page
│   │   ├── cookies/              # Cookie Policy page
│   │   ├── privacy/              # Privacy Policy page
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   ├── loading.tsx           # Loading UI
│   │   ├── not-found.tsx         # 404 page
│   │   ├── globals.css           # Global styles
│   │   └── amplify-client-config.js  # Amplify client setup
│   │
│   ├── components/               # Shared components
│   │   ├── ui/                   # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── cookie-consent.tsx
│   │   │   └── ...
│   │   ├── layout/               # Layout components
│   │   │   ├── main-nav.tsx
│   │   │   ├── footer.tsx
│   │   │   └── theme-toggle.tsx
│   │   ├── sections/             # Page sections
│   │   │   ├── hero-section.tsx
│   │   │   ├── content-section.tsx
│   │   │   └── admin-section.tsx
│   │   └── auth/                 # Auth components
│   │       ├── auth-guard.tsx
│   │       └── admin-button.tsx
│   │
│   ├── contexts/                 # React contexts
│   │   └── auth-context.tsx      # Auth state management
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-auth.ts           # Auth hook
│   │   └── use-mobile.ts         # Mobile detection
│   │
│   ├── lib/                      # Utilities & helpers
│   │   ├── utils.ts              # General utilities
│   │   └── auth-server.ts        # Server-side auth utilities
│   │
│   ├── actions/                  # Server actions
│   │   └── user-actions.ts       # User-related actions
│   │
│   ├── config/                   # Configuration files
│   │   └── amplify-config.ts     # Amplify configuration
│   │
│   └── aws-exports.js            # Amplify exports (auto-generated)
│
├── amplify/                      # AWS Amplify Gen 2 backend
│   ├── backend/                  # Backend resources
│   └── team-provider-info.json   # Team environment config
│
├── public/                       # Static assets
│   ├── technologies/             # Technology logos
│   └── GreenSMiL.png            # Brand logo
│
├── tests/                        # Playwright tests
│   └── e2e/                      # End-to-end tests
│
└── .env                          # Environment variables
```

---

## 🎨 Code Conventions

### File Naming
- **Component files**: `kebab-case.tsx` (e.g., `user-profile.tsx`)
- **Component exports**: `PascalCase` (e.g., `UserProfile`)
- **Hook files**: `use-kebab-case.ts` (e.g., `use-auth.ts`)
- **Hook exports**: `useCamelCase` (e.g., `useAuth`)
- **Utility files**: `kebab-case.ts` (e.g., `auth-server.ts`)
- **Folders**: `kebab-case` (e.g., `components/ui`)

### Component Guidelines

#### Server Components (Default)
```tsx
// No 'use client' directive
// Can use async/await
// Cannot use hooks or event handlers

export function HeroSection({ title }: { title: string }) {
  return <section>{title}</section>;
}
```

#### Client Components (When Needed)
Use `'use client'` only when:
- Using React hooks (`useState`, `useEffect`, etc.)
- Using browser APIs (`localStorage`, `window`, etc.)
- Event handlers (`onClick`, `onChange`, etc.)
- Third-party libraries that require client-side

```tsx
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Import Conventions
```tsx
// External libraries first
import { useState } from 'react';
import { Button } from '@/components/ui';

// Internal imports with path aliases
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

// Relative imports last (avoid when possible)
import { LocalComponent } from './local-component';
```

### Path Aliases
- `@/components/*` - Shared components
- `@/lib/*` - Utilities
- `@/hooks/*` - Custom hooks
- `@/contexts/*` - React contexts
- `@/actions/*` - Server actions
- `@/config/*` - Configuration

---

## 🎭 Component Patterns

### shadcn/ui Components
All UI components are located in `src/components/ui/` and follow shadcn conventions:

```tsx
import { Button } from '@/components/ui';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui';

function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <p>Dialog content</p>
      </DialogContent>
    </Dialog>
  );
}
```

### Forms with react-hook-form
Use react-hook-form for all form handling:

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui';

function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} />
      {errors.email && <span>Email is required</span>}
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Authentication Pattern
```tsx
'use client';

import { useAuth } from '@/hooks/use-auth';
import { AuthGuard, AdminOnly } from '@/components/auth';

function ProtectedPage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <AuthGuard requireAuth>
      <h1>Welcome {user?.username}</h1>
    </AuthGuard>
  );
}

function AdminPage() {
  return (
    <AdminOnly>
      <h1>Admin Dashboard</h1>
    </AdminOnly>
  );
}
```

---

## 🔐 Authentication & Authorization

### AWS Amplify Gen 2 Setup
- Authentication provider: AWS Cognito
- User groups: `admin`, `user`
- Auth context: `src/contexts/auth-context.tsx`
- Client config: `src/app/amplify-client-config.js`
- Server utilities: `src/lib/auth-server.ts`

### Auth Components
- `<AuthGuard>` - Protect routes by auth status
- `<AdminOnly>` - Admin-only sections
- `<AuthenticatedOnly>` - Authenticated users only
- `<AuthDialog>` - Authentication modal
- `<UserMenu>` - User menu with logout

### Checking Auth Status
```tsx
// Client-side
import { useAuth } from '@/hooks/use-auth';

const { isAuthenticated, isAdmin, user, loading } = useAuth();

// Server-side
import { getCurrentUser } from '@/lib/auth-server';

const user = await getCurrentUser();
```

---

## 🎨 Styling Guidelines

### Tailwind CSS
Use utility classes with the `cn()` helper for conditional classes:

```tsx
import { cn } from '@/lib/utils';

function Button({ variant = 'default', className }) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md',
        variant === 'primary' && 'bg-primary text-primary-foreground',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground',
        className
      )}
    />
  );
}
```

### Design Tokens
- Primary color: Green (brand color)
- Fonts: Geist Sans, Geist Mono, Press Start 2P
- Dark mode: Supported via theme toggle
- Responsive breakpoints: sm, md, lg, xl (Tailwind defaults)

---

## 🧪 Testing

### Playwright E2E Tests
```bash
# Run tests
npm run test

# Run with UI
npm run test:ui

# Debug tests
npm run test:debug

# View report
npm run test:report
```

### Test Conventions
- Use `data-test` attributes for selectors
- Tests located in `tests/e2e/`
- Follow naming: `feature-name.spec.ts`

Example:
```tsx
// Component
<button data-test="submit-button">Submit</button>

// Test
test('should submit form', async ({ page }) => {
  await page.getByTestId('submit-button').click();
});
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm/yarn/pnpm
- AWS Amplify CLI (for backend changes)

### Installation
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Amplify configuration

# Run development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run Playwright tests
npm run test:ui      # Run tests with UI
npm run test:debug   # Debug tests
npm run test:report  # View test report
```

### Environment Variables
```env
# AWS Amplify (auto-generated, do not edit manually)
NEXT_PUBLIC_AMPLIFY_*

# Custom environment variables
NEXT_PUBLIC_SITE_URL=https://greensmil.com
```

---

## 📦 Adding New Features

### Adding a New shadcn/ui Component
```bash
# Install a new shadcn component
npx shadcn@latest add [component-name]

# Example
npx shadcn@latest add form
```

Components will be added to `src/components/ui/`

### Creating a New Page
```tsx
// src/app/new-page/page.tsx
export default function NewPage() {
  return <h1>New Page</h1>;
}
```

### Creating a New API Route
```tsx
// src/app/api/example/route.ts
export async function GET(request: Request) {
  return Response.json({ message: 'Hello' });
}
```

### Adding Server Actions
```tsx
// src/actions/example-actions.ts
'use server';

export async function exampleAction(formData: FormData) {
  // Server-side logic
  return { success: true };
}
```

---

## 🏗️ Architecture Decisions

### Why App Router?
- Server Components by default for better performance
- Improved routing with layouts and loading states
- Better SEO with server-side rendering
- Streaming and progressive rendering

### Why AWS Amplify Gen 2?
- Integrated authentication with Cognito
- Type-safe backend with TypeScript
- Easy deployment and hosting
- Built-in CI/CD

### Why shadcn/ui?
- Customizable components (not a dependency)
- Built on accessible Radix UI primitives
- Tailwind CSS integration
- Copy-paste, not npm install

### Component Organization
- `src/components/ui/` - Atomic UI components (buttons, inputs)
- `src/components/layout/` - Layout components (nav, footer)
- `src/components/sections/` - Page sections (hero, content)
- `src/components/auth/` - Authentication-specific components

---

## 🔧 Common Tasks

### Adding a Protected Route
```tsx
// src/app/protected/page.tsx
import { AuthGuard } from '@/components/auth';

export default function ProtectedPage() {
  return (
    <AuthGuard requireAuth fallback={<p>Please log in</p>}>
      <h1>Protected Content</h1>
    </AuthGuard>
  );
}
```

### Creating an Admin-Only Section
```tsx
import { AdminOnly } from '@/components/auth';

export function AdminPanel() {
  return (
    <AdminOnly fallback={<p>Admin access required</p>}>
      <h2>Admin Controls</h2>
    </AdminOnly>
  );
}
```

### Implementing Dark Mode Toggle
```tsx
import { ThemeToggle } from '@/components/layout/theme-toggle';

export function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  );
}
```

### Adding Cookie Consent Banner
Already implemented in `src/components/ui/cookie-consent.tsx` and included in the root layout.

---

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Amplify Auth Issues
```bash
# Check Amplify status
amplify status

# Pull latest backend
amplify pull

# Check environment
amplify env list
```

### Type Errors
```bash
# Regenerate TypeScript types
npm run build
```

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [AWS Amplify Gen 2 Docs](https://docs.amplify.aws/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [react-hook-form Docs](https://react-hook-form.com/)
- [Playwright Docs](https://playwright.dev/)

---

## 🤝 Contributing

### Code Review Checklist
- [ ] Follow naming conventions (kebab-case files, PascalCase components)
- [ ] Use Server Components when possible
- [ ] Add `'use client'` only when necessary
- [ ] Use path aliases (`@/components`, not `../../`)
- [ ] Add proper TypeScript types
- [ ] Use react-hook-form for forms
- [ ] Use shadcn/ui components for UI
- [ ] Add data-test attributes for testable elements
- [ ] Update this documentation if adding new patterns

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature

# Commit changes
git add .
git commit -m "Add feature: description"

# Push and create PR
git push origin feature/your-feature
```

---

## 📝 Notes

- **Website URL**: https://greensmil.com
- **Search Engine Indexing**: Disabled via robots meta tags
- **Cookie Consent**: Implemented with localStorage persistence
- **Legal Pages**: Privacy Policy and Cookie Policy available
- **Admin Panel**: Route-protected admin dashboard at `/admin`
- **Authentication**: AWS Cognito with custom auth context

---

**Last Updated**: October 2025
**Maintained by**: Smilen Lyubenov
**Contact**: smilenlyubenov@gmail.com
