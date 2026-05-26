'use client';

import { signIn } from 'next-auth/react';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function LoginFormContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('github', {
        redirect: true,
        callbackUrl,
      });

      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to sign in with GitHub'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div>
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Dashboard application
          </p>
        </div>

        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="rounded-md bg-red-50 p-4 text-sm text-red-800"
          >
            {error}
          </div>
        )}

        <button
          onClick={handleGitHubLogin}
          disabled={isLoading}
          aria-busy={isLoading}
          aria-label="Sign in with GitHub"
          className="w-full rounded-lg bg-gray-900 px-4 py-2 text-white transition-colors hover:bg-gray-800 disabled:opacity-50 focus:ring-2 focus:ring-blue-500"
        >
          {isLoading ? (
            <span aria-live="polite">Signing in...</span>
          ) : (
            <>
              <span aria-hidden="true">🐙</span> Sign in with GitHub
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function LoginForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
