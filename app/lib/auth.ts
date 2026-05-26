// app/lib/auth.ts
// Chapter 14: Authentication Utilities
// Helper functions for auth-related operations

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import { redirect } from 'next/navigation';

/**
 * Get current session in a Server Component
 * Returns the session object or null if not authenticated
 */
export async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}

/**
 * Require authentication in a Server Component
 * Redirects to login if user is not authenticated
 * Returns the session if authenticated
 */
export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return session;
}

/**
 * Get current user from session
 * Requires authentication
 */
export async function getCurrentUser() {
  const session = await requireAuth();
  return session.user;
}
