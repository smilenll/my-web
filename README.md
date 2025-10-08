# 🌟 GreenSMiL - Modern Portfolio & Web Platform

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![AWS Amplify](https://img.shields.io/badge/AWS_Amplify-Gen_2-orange?logo=aws-amplify)](https://aws.amazon.com/amplify/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

**[Live Demo](https://greensmil.com)** | [Documentation](./claude.md)

A full-stack portfolio and web platform featuring modern authentication, email integration, and a beautiful UI built with Next.js and AWS services.

**Note:** This project is actively being developed as part of my interview process to demonstrate proficiency with modern web technologies. The goal is to showcase a comprehensive web application that covers essential requirements of modern web platforms - authentication, email integration, responsive design, and cloud services. The project emphasizes clean architecture, type safety, and best practices while maintaining a professional aesthetic.

</div>

---

## ✨ Features

- 🎨 **Modern UI/UX** - Built with shadcn/ui and Tailwind CSS for a polished, responsive design
- 🔐 **AWS Cognito Authentication** - Secure user authentication and authorization
- 📧 **AWS SES Email Integration** - Professional contact form with automated email responses
- 🎯 **Admin Dashboard** - Protected admin routes with role-based access
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🍪 **GDPR Compliant** - Cookie consent banner and privacy policy
- ⚡ **Server Actions** - Next.js server actions for secure backend operations
- 🧪 **E2E Testing** - Playwright integration for comprehensive testing
- 🎭 **Form Validation** - React Hook Form with robust validation

---

## 🚀 Tech Stack

### Frontend
- **[Next.js 15.5.3](https://nextjs.org/)** - React framework with App Router
- **[React 19.0.0](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful component library
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI primitives
- **[Lucide React](https://lucide.dev/)** - Icon library

### Backend & Services
- **[AWS Amplify Gen 2](https://aws.amazon.com/amplify/)** - Backend infrastructure
- **[AWS Cognito](https://aws.amazon.com/cognito/)** - User authentication
- **[AWS SES](https://aws.amazon.com/ses/)** - Email sending service

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Form state management

### Testing
- **[Playwright](https://playwright.dev/)** - End-to-end testing

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- AWS Account (for Amplify & SES)

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
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
   AWS_SES_REGION=us-east-2
   AWS_SES_ACCESS_KEY_ID=your_access_key_here
   AWS_SES_SECRET_ACCESS_KEY=your_secret_key_here
   AWS_SES_FROM_EMAIL=noreply@greensmil.com
   AWS_SES_TO_EMAIL=web@greensmil.com
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
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run Playwright tests |
| `npm run test:ui` | Run tests with UI |
| `npm run test:debug` | Debug tests |
| `npm run test:report` | Show test report |

---

## 📧 Email Configuration

The contact form uses AWS SES with a dual-email flow:

### Email Flow
1. **Admin Notification** → `web@greensmil.com`
   - Receives contact form submissions
   - Reply-to is set to customer's email

2. **Customer Confirmation** → Customer's email
   - Automated thank you message
   - Reply-to is set to `web@greensmil.com`

### AWS SES Setup
1. Create an AWS account
2. Go to AWS SES console
3. Verify email addresses (both FROM and TO)
4. Create IAM user with SES sending permissions
5. Generate access keys and add to `.env`

**Note:** SES starts in sandbox mode. For production, request production access through AWS console.

---

## 🔐 Authentication

The app uses AWS Cognito for authentication:

- **Public Routes**: Home, Contact, Privacy, Cookies
- **Protected Routes**: Admin Dashboard
- **Auth Flow**: Email/Password with Cognito hosted UI
- **Role-Based Access**: Admin-only routes protected by server-side checks

---

## 📁 Project Structure

```
my-web/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (dashboard)/          # Protected dashboard routes
│   │   ├── auth/                 # Authentication pages
│   │   ├── contact/              # Contact page
│   │   ├── privacy/              # Privacy policy
│   │   └── cookies/              # Cookie policy
│   │
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── forms/                # Form components
│   │   ├── layout/               # Layout components
│   │   ├── sections/             # Page sections
│   │   └── auth/                 # Auth components
│   │
│   ├── lib/
│   │   ├── email/                # Email service (SES)
│   │   ├── utils.ts              # Utility functions
│   │   └── auth-server.ts        # Server-side auth
│   │
│   ├── actions/                  # Server actions
│   │   ├── contact-actions.ts    # Contact form
│   │   └── user-actions.ts       # User management
│   │
│   ├── contexts/                 # React contexts
│   │   └── auth-context.tsx      # Auth state
│   │
│   └── hooks/                    # Custom hooks
│       ├── use-auth.ts
│       └── use-mobile.ts
│
├── amplify/                      # AWS Amplify backend
├── public/                       # Static assets
├── .env.example                  # Environment variables template
└── README.md
```

---

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Deployment
```bash
npm run build
npm run start
```

---

## 🧪 Testing

Run end-to-end tests with Playwright:

```bash
# Run all tests
npm test

# Run tests in UI mode
npm run test:ui

# Debug tests
npm run test:debug
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary.

---

## 👤 Author

**Smilen Lyubenov**

- Website: [greensmil.com](https://greensmil.com)
- Email: web@greensmil.com

### Project Status

This project is currently under active development as part of my professional portfolio. It demonstrates:
- Modern full-stack development practices
- AWS cloud service integration
- Production-ready authentication flows
- Professional email communication systems
- Responsive and accessible UI/UX design

The codebase reflects real-world application requirements and is continuously being refined to showcase best practices in modern web development.

---

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [AWS Amplify](https://docs.amplify.aws/)
- [Tailwind CSS](https://tailwindcss.com/)

---

<div align="center">

**Built with ❤️ using Next.js and AWS**

</div>
