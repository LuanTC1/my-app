'use client';

// Chapter 12: Dashboard Error Boundary
// Catches errors specific to the dashboard section
// Allows the rest of the app to continue working
// The dashboard sidebar and layout remain visible while showing error UI

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to error reporting service
    console.error('Dashboard Error:', error);
  }, [error]);

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      <div className="rounded-lg border border-red-300 bg-red-50 p-6">
        <div className="flex gap-4">
          {/* Error Icon */}
          <div className="shrink-0">
            <span className="text-2xl">❌</span>
          </div>

          {/* Error Content */}
          <div className="grow">
            <h2 className="text-lg font-semibold text-red-900 mb-2">
              Dashboard Error
            </h2>
            <p className="text-red-700 mb-4">
              The dashboard encountered an error while loading data. Don't worry, we're working to fix it!
            </p>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && error.message && (
              <details className="mb-4">
                <summary className="cursor-pointer text-sm font-medium text-red-700 hover:text-red-800">
                  Error Details
                </summary>
                <pre className="mt-2 p-3 bg-red-100 rounded text-xs overflow-auto font-mono text-red-900">
                  {error.message}
                </pre>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition"
              >
                Try Again
              </button>
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-red-100 text-red-700 font-medium rounded-md hover:bg-red-200 transition"
              >
                Back to Dashboard
              </Link>
            </div>

            {/* Error Reference */}
            {error.digest && (
              <div className="mt-4 text-xs text-red-600">
                Error ID: {error.digest}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Helpful Information */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h3 className="font-semibold text-gray-900 mb-3">What You Can Do:</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex gap-2">
            <span>1.</span>
            <span>Click "Try Again" to refresh and retry loading the data</span>
          </li>
          <li className="flex gap-2">
            <span>2.</span>
            <span>
              Check your internet connection and refresh the page
            </span>
          </li>
          <li className="flex gap-2">
            <span>3.</span>
            <span>
              Navigate to another section of the dashboard using the sidebar
            </span>
          </li>
          <li className="flex gap-2">
            <span>4.</span>
            <span>Contact support if the problem persists</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
