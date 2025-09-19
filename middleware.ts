import { NextRequest, NextResponse } from 'next/server';

// Define protected routes that require authentication
const protectedPaths = ['/dashboard', '/profile'];

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

  // For now, let client-side auth handle protection
  // Server-side auth can be added later when needed
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtectedPath) {
    // Add a header to indicate this is a protected route
    // The client-side can use this to redirect if not authenticated
    const response = NextResponse.next();
    response.headers.set('x-protected-route', 'true');
    return response;
  }

  return NextResponse.next();
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