import { NextRequest, NextResponse } from 'next/server';
import { runWithAmplifyServerContext } from '@aws-amplify/adapter-nextjs/api';
import { getCurrentUser } from 'aws-amplify/auth/server';
import awsExports from './src/aws-exports';

// Define protected and public routes
const protectedPaths = ['/dashboard', '/profile', '/admin'];
const publicPaths = ['/', '/about', '/contact'];
const authPaths = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // files like .css, .js, .ico
  ) {
    return NextResponse.next();
  }

  try {
    // Check if user is authenticated
    const user = await runWithAmplifyServerContext({
      nextServerContext: { request },
      operation: (contextSpec) => getCurrentUser(contextSpec),
      config: awsExports
    });

    const isAuthenticated = !!user;
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
    const isAuthPath = authPaths.some(path => pathname.startsWith(path));
    const isPublicPath = publicPaths.includes(pathname);

    // Redirect authenticated users away from auth pages
    if (isAuthenticated && isAuthPath) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Redirect unauthenticated users from protected pages
    if (!isAuthenticated && isProtectedPath) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Allow access to public paths
    if (isPublicPath) {
      return NextResponse.next();
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware auth error:', error);

    // On auth error, redirect to home for protected paths
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
    if (isProtectedPath) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};