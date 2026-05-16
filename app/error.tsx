'use client';

// Chapter 12: Global Error Boundary
// Catches unhandled errors in the entire application
// Error boundaries work best when placed at layout boundaries
// Reference: https://nextjs.org/docs/app/api-reference/file-conventions/error

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to error reporting service (Sentry, etc.)
    console.error('Global Error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-linear-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            {/* Error Icon */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <span className="text-3xl">⚠️</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Something Went Wrong!</h1>
            </div>

            {/* Error Message */}
            <div className="mb-6">
              <p className="text-gray-600 text-center">
                An unexpected error occurred. Please try again or contact support if the problem persists.
              </p>
              {process.env.NODE_ENV === 'development' && error.message && (
                <div className="mt-4 p-3 bg-red-50 rounded border border-red-200">
                  <p className="text-xs font-mono text-red-700 wrap-break-word">
                    {error.message}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={reset}
                className="w-full px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition"
              >
                Try Again
              </button>
              <a
                href="/"
                className="block w-full px-4 py-2 bg-gray-200 text-gray-900 font-medium rounded-md hover:bg-gray-300 transition text-center"
              >
                Go to Home
              </a>
            </div>

            {/* Error Digest (for support reference) */}
            {error.digest && (
              <div className="mt-6 p-3 bg-gray-50 rounded border border-gray-200">
                <p className="text-xs text-gray-500">
                  Error ID: <span className="font-mono">{error.digest}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
