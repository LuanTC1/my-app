// middleware.ts
// Chapter 14: Route Protection Middleware
// Protects dashboard routes from unauthenticated access
// Redirects to login page if user is not authenticated

import { withAuth } from 'next-auth/middleware';

// Paths that require authentication
const protectedRoutes = ['/dashboard', '/invoices', '/customers'];

export default withAuth(
  function middleware(req) {
    // Middleware runs for all requests
    // withAuth handles checking authentication
  },
  {
    callbacks: {
      authorized({ token, req }) {
        // Check if user is accessing a protected route
        const isProtected = protectedRoutes.some((route) =>
          req.nextUrl.pathname.startsWith(route)
        );

        // If not a protected route, allow access
        if (!isProtected) {
          return true;
        }

        // If protected route, require token (authenticated)
        return !!token;
      },
    },

    // Redirect to login if not authorized
    pages: {
      signIn: '/login',
    },
  }
);

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/auth (NextAuth routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
};
