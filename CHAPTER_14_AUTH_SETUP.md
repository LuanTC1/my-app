<!--
  # Chapter 14: Adding Authentication - Setup Guide

  This guide explains how to set up authentication with NextAuth.js and GitHub OAuth for the dashboard.

  ## What We're Implementing

  - NextAuth.js v5 with GitHub OAuth provider
  - JWT-based sessions (no database sessions)
  - Protected dashboard routes via middleware
  - User info display in dashboard
  - Login and logout functionality
  - Accessible authentication UI with ARIA attributes

  ## Files Created

  1. **auth.ts** - NextAuth.js configuration and providers
  2. **app/api/auth/[...nextauth]/route.ts** - NextAuth API route handlers
  3. **middleware.ts** - Route protection middleware
  4. **app/lib/auth.ts** - Authentication utility functions
  5. **app/login/page.tsx** - Login page with GitHub OAuth button
  6. **app/ui/logout-button.tsx** - Logout button component
  7. **app/ui/user-info.tsx** - User info display component
  8. **.env.local** - Updated with NextAuth environment variables

  ## Setup Instructions

  ### Step 1: Install Dependencies

  ```bash
  npm install next-auth@5
  ```

  ### Step 2: GitHub OAuth Setup

  1. Go to GitHub Settings → Developer Settings → OAuth Apps
  2. Click "New OAuth App"
  3. Fill in the form:
     - Application name: "Next.js Dashboard"
     - Homepage URL: http://localhost:3000
     - Authorization callback URL: http://localhost:3000/api/auth/callback/github
  4. Copy Client ID and Client Secret
  5. Paste them into .env.local:
     ```
     GITHUB_ID=your_client_id
     GITHUB_SECRET=your_client_secret
     ```

  ### Step 3: Generate AUTH_SECRET

  ```bash
  openssl rand -base64 32
  ```

  Copy the output and add to .env.local:
  ```
  AUTH_SECRET=your_generated_secret
  ```

  ### Step 4: Protect Dashboard Routes

  The middleware.ts automatically protects:
  - /dashboard
  - /invoices
  - /customers

  Unauthenticated users are redirected to /login

  ### Step 5: Add User Info to Dashboard

  Update app/dashboard/layout.tsx to import and render UserInfo component

  ### Step 6: Test Authentication

  ```bash
  npm run dev
  ```

  Visit http://localhost:3000/dashboard
  You should be redirected to http://localhost:3000/login
  Click "Sign in with GitHub" to authenticate

  ## Important Files to Know

  - **auth.ts**: Main authentication configuration. Modify providers here.
  - **middleware.ts**: Controls which routes require authentication
  - **app/lib/auth.ts**: Helper functions for auth-related operations
  - **.env.local**: Store sensitive credentials here (never commit)

  ## Security Best Practices

  1. Never commit .env.local to git
  2. Always use HTTPS in production
  3. Rotate OAuth credentials periodically
  4. Use environment variables for all secrets
  5. Keep NextAuth.js up to date for security patches

  ## Common Issues

  ### "OAuth callback URL mismatch"
  - Check GitHub app settings matches your NEXTAUTH_URL + /api/auth/callback/github

  ### "Invalid GITHUB_ID or GITHUB_SECRET"
  - Verify credentials are copied exactly from GitHub
  - Check .env.local is loaded (restart dev server)

  ### "Protected route redirects to login but won't sign in"
  - Check middleware.ts is in the root directory
  - Verify AUTH_SECRET is set in .env.local
  - Check browser cookies are not blocked

  ## Next Steps

  - Add database integration for user profiles (optional)
  - Implement role-based access control (RBAC)
  - Add more OAuth providers (Google, Discord, etc.)
  - Set up session expiration handling
  - Implement password reset for credentials provider
-->
