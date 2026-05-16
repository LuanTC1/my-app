'use client';

// Chapter 12: Invoices Section Error Boundary
// Catches errors in invoice routes (/dashboard/invoices/*)
// Provides invoice-specific error UI

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function InvoicesError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Invoices Error:', error);
  }, [error]);

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      <div className="rounded-lg border border-red-300 bg-red-50 p-6">
        <div className="flex gap-4">
          <div className="shrink-0">
            <span className="text-2xl">❌</span>
          </div>
          <div className="grow">
            <h2 className="text-lg font-semibold text-red-900 mb-2">
              Error Loading Invoices
            </h2>
            <p className="text-red-700 mb-4">
              We encountered a problem while loading the invoices. This could be a database connection issue or invalid invoice data.
            </p>

            {/* Development Error Details */}
            {process.env.NODE_ENV === 'development' && error.message && (
              <details className="mb-4">
                <summary className="cursor-pointer text-sm font-medium text-red-700">
                  Technical Details
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
                href="/dashboard/invoices"
                className="px-4 py-2 bg-red-100 text-red-700 font-medium rounded-md hover:bg-red-200 transition"
              >
                Back to Invoices List
              </Link>
            </div>

            {/* Error Reference */}
            {error.digest && (
              <p className="text-xs text-red-600 mt-3">Error ID: {error.digest}</p>
            )}
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Troubleshooting Steps:</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex gap-2">
            <span>•</span>
            <span>Click "Try Again" to retry loading</span>
          </li>
          <li className="flex gap-2">
            <span>•</span>
            <span>Refresh the page</span>
          </li>
          <li className="flex gap-2">
            <span>•</span>
            <span>Check your internet connection</span>
          </li>
          <li className="flex gap-2">
            <span>•</span>
            <span>
              Navigate to{' '}
              <Link href="/dashboard" className="text-blue-600 hover:underline">
                dashboard home
              </Link>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
