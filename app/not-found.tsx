// Chapter 12: Global Not Found Page
// Displayed when user navigates to a route that doesn't exist
// This catches 404s at the root level
// Reference: https://nextjs.org/docs/app/api-reference/file-conventions/not-found

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* 404 Icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
            <span className="text-4xl">🔍</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
          <p className="text-lg font-semibold text-gray-700">Page Not Found</p>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-gray-600 text-center">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track!
          </p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition text-center"
          >
            Go to Home
          </Link>
          <Link
            href="/dashboard"
            className="block w-full px-4 py-3 bg-gray-100 text-gray-900 font-medium rounded-md hover:bg-gray-200 transition text-center"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            If you believe this is a mistake, please{' '}
            <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
