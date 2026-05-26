// auth.ts
// Chapter 14: Authentication Configuration
// NextAuth.js v4 setup with GitHub OAuth provider
// Handles session management and authentication flow

import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  // Configure authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],

  // Custom pages
  pages: {
    signIn: '/login',
  },

  // Callbacks
  callbacks: {
    // JWT callback - runs whenever JWT is created or updated
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.id = (profile as any).id as string;
        token.image = (profile as any).image as string;
      }
      return token;
    },

    // Session callback - runs every time session is checked
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },

  // Session configuration
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // JWT configuration
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Secret for encryption
  secret: process.env.AUTH_SECRET,

  // Debug mode
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);

// Extend session and JWT types
declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      email?: string;
      name?: string;
      image?: string;
    };
  }

  interface JWT {
    id?: string;
    accessToken?: string;
    image?: string;
  }
}

