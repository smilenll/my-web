# 🌟 GreenSMiL - Modern Portfolio & Web Platform

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![AWS Amplify](https://img.shields.io/badge/AWS_Amplify-Gen_2-orange?logo=aws-amplify)](https://aws.amazon.com/amplify/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Security: A-](https://img.shields.io/badge/Security-A--_(85%2F100)-green)](./docs/SECURITY.md)

**[Live Demo](https://greensmil.com)** | **[Dev Environment](https://dev.greensmil.com)**

A full-stack portfolio and web platform featuring modern authentication, email integration, reCAPTCHA protection, and a beautiful UI built with Next.js and AWS services.

**Note:** This project is actively being developed as part of my professional portfolio to demonstrate proficiency with modern web technologies. The goal is to showcase a comprehensive web application that covers essential requirements of modern web platforms - authentication, email integration, bot protection, responsive design, and cloud services. The project emphasizes clean architecture, type safety, security best practices, and professional aesthetics.

</div>

---

## ✨ Features

- 🎨 **Modern UI/UX** - Built with shadcn/ui and Tailwind CSS for a polished, responsive design
- 🔐 **AWS Cognito Authentication** - Secure user authentication and authorization with email/password
- 🤖 **reCAPTCHA v3 Protection** - Invisible bot protection on contact forms with score-based validation
- 📧 **AWS SES Email Integration** - Professional contact form with automated email responses
- 🎯 **Admin Dashboard** - Protected admin routes with role-based access control (RBAC)
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🍪 **GDPR Compliant** - Cookie consent banner and comprehensive privacy policy
- ⚡ **Server Actions** - Next.js server actions for secure backend operations
- 🧪 **E2E Testing** - Playwright integration for comprehensive testing
- 🎭 **Form Validation** - React Hook Form with robust validation rules
- 🛡️ **Security Headers** - X-Frame-Options, CSP, XSS Protection, and more
- 🔒 **Secure by Design** - No secrets in git, proper environment variable handling

---

## 🚀 Tech Stack

### Frontend
- **[Next.js 15.5.3](https://nextjs.org/)** - React framework with App Router
- **[React 19.0.0](https://react.dev/)** - UI library with latest features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety and developer experience
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Lucide React](https://lucide.dev/)** - Comprehensive icon library

### Backend & Services
- **[AWS Amplify Gen 2](https://aws.amazon.com/amplify/)** - Backend infrastructure and hosting
- **[AWS Cognito](https://aws.amazon.com/cognito/)** - User authentication and authorization
- **[AWS SES](https://aws.amazon.com/ses/)** - Transactional email sending service
- **[Google reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3)** - Bot protection and spam prevention

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant form state management

### Testing
- **[Playwright](https://playwright.dev/)** - End-to-end testing framework

---

## 📦 Installation

### Prerequisites
- Node.js 18+ (recommended: 20+)
- npm or yarn or pnpm
- AWS Account (for Amplify, Cognito, and SES)
- Google reCAPTCHA v3 Site Keys

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/smilenll/my-web.git
   cd my-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example env file and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

   Required environment variables:
   ```env
   # AWS SES Configuration
   SES_REGION=us-east-2
   SES_ACCESS_KEY_ID=your_access_key_here
   SES_SECRET_ACCESS_KEY=your_secret_key_here
   SES_FROM_EMAIL=noreply@yourdomain.com
   SES_TO_EMAIL=admin@yourdomain.com

   # Contact Information
   NEXT_PUBLIC_CONTACT_EMAIL=web@yourdomain.com

   # Social Links
   NEXT_PUBLIC_GITHUB_URL=https://github.com/yourusername
   NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/yourusername

   # Google reCAPTCHA v3
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
   RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build optimized production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |
| `npm test` | Run Playwright E2E tests |
| `npm run test:ui` | Run tests with interactive UI |
| `npm run test:debug` | Debug tests step-by-step |
| `npm run test:report` | Generate and show test report |

---

## 🔒 Security

### Security Score: **A- (85/100)**

This project follows security best practices and has been audited for common vulnerabilities:

✅ **No Critical Vulnerabilities Found**
- Zero npm dependencies with known security issues
- No secrets committed to git history
- No hardcoded credentials in source code
- Proper environment variable protection

### Security Features

#### 🛡️ Security Headers
Configured in `next.config.ts`:
- `X-Frame-Options: DENY` - Prevents clickjacking attacks
- `X-Content-Type-Options: nosniff` - Prevents MIME type sniffing
- `X-XSS-Protection: 1; mode=block` - XSS attack prevention
- `Referrer-Policy: strict-origin-when-cross-origin` - Controls referrer information

#### 🔐 Authentication & Authorization
- Server-side authentication via AWS Cognito
- Protected routes with middleware validation
- Role-based access control (RBAC) for admin routes
- Secure session management with httpOnly cookies

#### 🤖 Bot Protection
- Google reCAPTCHA v3 integration
- Score-based validation (threshold: 0.5)
- Invisible user experience
- Detailed error logging for debugging

#### 📧 Email Security
- Input sanitization on contact forms
- Server-side validation before sending emails
- No email injection vulnerabilities
- Proper error handling without information disclosure

### Environment Variable Security

**Important:** Never commit `.env` files to git!

Protected files (already in `.gitignore`):
- `.env`
- `.env.local`
- `.env.production`
- `.env.development`
- `.env.test`

**For AWS Amplify Deployment:**
Environment variables are injected during build via `amplify.yml`:
```yaml
- env | grep -E '^(RECAPTCHA_SECRET_KEY|SES_|NEXT_PUBLIC_)' > .env.production
```

---

## 📧 Email Configuration

The contact form uses AWS SES with a professional dual-email flow:

### Email Flow
1. **Admin Notification** → `SES_TO_EMAIL`
   - Receives contact form submissions with full details
   - Reply-to is automatically set to customer's email
   - Subject: `[Contact Form] {subject}`

2. **Customer Confirmation** → Customer's provided email
   - Automated professional thank you message
   - Reply-to is set to `SES_TO_EMAIL` for easy responses
   - Subject: `Thank you for contacting {Your Company}`

### AWS SES Setup Guide

1. **Create an AWS Account**
   - Sign up at [aws.amazon.com](https://aws.amazon.com)

2. **Verify Email Addresses**
   - Navigate to AWS SES Console
   - Verify both sender (`SES_FROM_EMAIL`) and recipient (`SES_TO_EMAIL`) emails
   - Check verification emails and click confirmation links

3. **Create IAM User**
   - Go to IAM Console → Users → Add user
   - Enable "Programmatic access"
   - Attach policy: `AmazonSESFullAccess`
   - Save Access Key ID and Secret Access Key

4. **Configure Environment Variables**
   - Add credentials to `.env` file
   - For Amplify: Add to environment variables in Amplify Console

5. **Request Production Access**
   - SES starts in sandbox mode (can only send to verified emails)
   - Request production access: SES Console → Account dashboard → Request production access
   - Provide use case details (usually approved within 24 hours)

**Tip:** Test email sending in sandbox mode before requesting production access.

---

## 🤖 reCAPTCHA Setup

### Get reCAPTCHA v3 Keys

1. **Register your site**
   - Visit [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin/create)
   - Select **reCAPTCHA v3**
   - Add your domains:
     - `localhost` (for development)
     - `yourdomain.com`
     - `dev.yourdomain.com` (if using staging)

2. **Configure keys**
   - Copy **Site Key** → `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` in `.env`
   - Copy **Secret Key** → `RECAPTCHA_SECRET_KEY` in `.env`

3. **Adjust score threshold** (optional)
   - Default threshold: `0.5`
   - Modify in `src/actions/contact-actions.ts:37`
   - Lower = more lenient, Higher = more strict

### How it Works
- Invisible to users (no checkbox)
- Generates score 0.0-1.0 (0.0 = bot, 1.0 = human)
- Validates server-side on form submission
- Provides detailed error messages for debugging

---

## 🔐 Authentication

The app uses **AWS Cognito** for secure authentication:

### Route Protection
- **Public Routes**: Home, Contact, Privacy Policy, Cookie Policy
- **Protected Routes**: `/admin`, `/profile`
- **Admin-Only Routes**: `/admin/*` (requires `admin` group membership)

### Authentication Flow
1. User clicks "Sign In"
2. Cognito Hosted UI handles login
3. Redirect back to app with auth session
4. Middleware validates on every protected route access
5. Server-side validation for admin routes

### Implementation Details
- Middleware: `middleware.ts` - Route protection
- Auth Context: `src/contexts/auth-context.tsx` - Client state
- Server Auth: `src/lib/auth-server.ts` - Server-side operations

---

## 📁 Project Structure

```
my-web/
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── (dashboard)/admin/         # Protected admin dashboard
│   │   ├── contact/                   # Contact page with form
│   │   ├── privacy/                   # Privacy policy
│   │   ├── cookies/                   # Cookie policy
│   │   └── page.tsx                   # Homepage
│   │
│   ├── components/
│   │   ├── ui/                        # shadcn/ui components
│   │   ├── forms/
│   │   │   └── contact-form.tsx       # Contact form with reCAPTCHA
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── nav.tsx
│   │   ├── sections/home/             # Homepage sections
│   │   └── auth/                      # Authentication components
│   │
│   ├── lib/
│   │   ├── email/
│   │   │   ├── ses-provider.ts        # AWS SES integration
│   │   │   ├── email-templates.ts     # HTML email templates
│   │   │   └── email-provider.ts      # Email types
│   │   ├── utils.ts                   # Utility functions
│   │   └── auth-server.ts             # Server-side auth utilities
│   │
│   ├── actions/                       # Server Actions
│   │   ├── contact-actions.ts         # Contact form + reCAPTCHA
│   │   └── user-actions.ts            # User management
│   │
│   ├── contexts/
│   │   └── auth-context.tsx           # Auth state management
│   │
│   ├── hooks/                         # Custom React hooks
│   │   ├── use-auth.ts
│   │   └── use-mobile.ts
│   │
│   ├── aws-exports.ts                 # AWS Amplify configuration
│   └── middleware.ts                  # Route protection middleware
│
├── amplify/                           # AWS Amplify Gen 2 backend
│   └── backend.ts                     # Amplify backend definition
│
├── public/                            # Static assets
├── tests/                             # Playwright E2E tests
├── amplify.yml                        # Amplify build configuration
├── next.config.ts                     # Next.js configuration
├── .env.example                       # Environment variables template
├── .gitignore                         # Git ignore rules
└── README.md                          # This file
```

---

## 🌐 Deployment

### AWS Amplify (Recommended for this project)

This project is configured for **AWS Amplify** hosting with automatic deployments.

#### Initial Setup

1. **Connect Repository**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "New app" → "Host web app"
   - Connect your GitHub repository
   - Select branch (`main` or `dev`)

2. **Configure Build Settings**
   - Build settings are auto-detected from `amplify.yml`
   - Environment: `Next.js - SSR`

3. **Add Environment Variables**
   - Go to App settings → Environment variables
   - Add all variables from `.env.example`:
     ```
     SES_REGION
     SES_ACCESS_KEY_ID
     SES_SECRET_ACCESS_KEY
     SES_FROM_EMAIL
     SES_TO_EMAIL
     NEXT_PUBLIC_CONTACT_EMAIL
     NEXT_PUBLIC_GITHUB_URL
     NEXT_PUBLIC_LINKEDIN_URL
     NEXT_PUBLIC_RECAPTCHA_SITE_KEY
     RECAPTCHA_SECRET_KEY
     ```

4. **Deploy**
   - Save and deploy
   - Automatic deployments on every git push

#### Custom Domain Setup
1. Go to App settings → Domain management
2. Add your custom domain (e.g., `greensmil.com`)
3. Follow DNS configuration instructions
4. SSL certificate automatically provisioned

### Vercel (Alternative)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository

2. **Configure**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Add Environment Variables**
   - Add all variables from step 3 above in Vercel dashboard

4. **Deploy**
   - Automatic deployments on every push

### Manual Deployment

```bash
# Build production bundle
npm run build

# Start production server
npm run start
```

---

## 🧪 Testing

### End-to-End Testing with Playwright

```bash
# Run all tests (headless)
npm test

# Run tests with interactive UI
npm run test:ui

# Debug specific test
npm run test:debug

# View last test report
npm run test:report
```

### Test Coverage
- ✅ Homepage loads correctly
- ✅ Navigation works
- ✅ Contact form validation
- ✅ Protected routes redirect when not authenticated
- ✅ Admin routes require admin role

### Writing Tests

Tests are located in `tests/` directory:

```typescript
// tests/example.spec.ts
import { test, expect } from '@playwright/test';

test('homepage has correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/GreenSMiL/);
});
```

---

## 🛠️ Development Workflow

### Git Hooks

Pre-push hooks automatically run:
1. ESLint for code quality
2. TypeScript type checking
3. Production build test

**Note:** If hooks fail, the push is blocked. Fix issues before pushing.

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting (configured)
- Tailwind CSS for styling

### Branch Strategy
- `main` - Production branch (deploys to greensmil.com)
- `dev` - Development branch (deploys to dev.greensmil.com)
- `feature/*` - Feature branches (no auto-deploy)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests if applicable
4. **Test your changes**
   ```bash
   npm run lint
   npm run build
   npm test
   ```
5. **Commit with clear messages**
   ```bash
   git commit -m "Add: Brief description of feature"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**
   - Provide clear description
   - Reference any related issues

---

## 📄 License

This project is private and proprietary.

---

## 👤 Author

**Smilen Lyubenov**

- Website: [greensmil.com](https://greensmil.com)
- LinkedIn: [linkedin.com/in/smilenll](https://linkedin.com/in/smilenll)
- GitHub: [github.com/smilenll](https://github.com/smilenll)
- Email: web@greensmil.com

### Project Status

This project is currently under active development as part of my professional portfolio. It demonstrates:

✅ **Modern Full-Stack Development**
- Next.js 15 with App Router and Server Actions
- React 19 with latest features
- TypeScript for type safety
- Tailwind CSS 4 for modern styling

✅ **AWS Cloud Integration**
- Amplify Gen 2 for hosting and CI/CD
- Cognito for authentication
- SES for transactional emails
- Production-ready infrastructure

✅ **Security Best Practices**
- reCAPTCHA v3 bot protection
- Security headers (XSS, Clickjacking, etc.)
- Input validation and sanitization
- No secrets in git history
- Regular security audits

✅ **Professional Features**
- Role-based access control
- Dual email flow (admin + customer)
- Responsive design (mobile-first)
- GDPR compliance
- E2E testing with Playwright

The codebase reflects real-world application requirements and is continuously being refined to showcase best practices in modern web development.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful components
- [AWS Amplify](https://docs.amplify.aws/) - Cloud infrastructure
- [Tailwind CSS](https://tailwindcss.com/) - Utility CSS framework
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Playwright](https://playwright.dev/) - E2E testing
- [Google reCAPTCHA](https://www.google.com/recaptcha/) - Bot protection

---

## 📚 Additional Documentation

- [Security Audit Report](./docs/SECURITY.md) - Detailed security analysis
- [API Documentation](./docs/API.md) - Server actions and endpoints
- [Component Guide](./docs/COMPONENTS.md) - UI component usage
- [Deployment Guide](./docs/DEPLOYMENT.md) - Step-by-step deployment

---

<div align="center">

**Built with ❤️ using Next.js, TypeScript, and AWS**

[![Deploy with Amplify](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home)

</div>
