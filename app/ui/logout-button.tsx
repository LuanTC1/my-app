// app/ui/logout-button.tsx
// Chapter 14: Logout Button Component
// Client component for signing out user
// Accessible button with proper ARIA attributes

'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut({
        redirect: true,
        callbackUrl: '/login',
      });
    } catch (err) {
      console.error('Logout failed:', err);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      aria-busy={isLoading}
      aria-label={isLoading ? 'Signing out' : 'Sign out'}
      className="rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      {isLoading ? (
        <span aria-live="polite">Signing out...</span>
      ) : (
        'Sign out'
      )}
    </button>
  );
}
