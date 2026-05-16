// Chapter 12: Dashboard Not Found Page
// Displayed when user accesses a non-existent dashboard route
// For example: /dashboard/nonexistent
// Keeps the dashboard layout/sidebar visible

import Link from 'next/link';

export default function DashboardNotFound() {
  return (
    <div className="space-y-6">
      {/* Not Found Alert */}
      <div className="rounded-lg border border-amber-300 bg-amber-50 p-6">
        <div className="flex gap-4">
          {/* Icon */}
          <div className="shrink-0">
            <span className="text-2xl">🤔</span>
          </div>

          {/* Content */}
          <div className="grow">
            <h2 className="text-lg font-semibold text-amber-900 mb-2">
              Page Not Found
            </h2>
            <p className="text-amber-800 mb-4">
              The dashboard page you're looking for doesn't exist. It may have been moved or the URL might be incorrect.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-amber-600 text-white font-medium rounded-md hover:bg-amber-700 transition"
              >
                Back to Dashboard Home
              </Link>
              <Link
                href="/dashboard/invoices"
                className="px-4 py-2 bg-amber-100 text-amber-700 font-medium rounded-md hover:bg-amber-200 transition"
              >
                View Invoices
              </Link>
              <Link
                href="/dashboard/customers"
                className="px-4 py-2 bg-amber-100 text-amber-700 font-medium rounded-md hover:bg-amber-200 transition"
              >
                View Customers
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Popular Dashboard Pages:</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li>
            <Link
              href="/dashboard"
              className="text-blue-600 hover:underline font-medium flex items-center gap-2"
            >
              📊 Dashboard Home
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/invoices"
              className="text-blue-600 hover:underline font-medium flex items-center gap-2"
            >
              💰 Invoices
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/customers"
              className="text-blue-600 hover:underline font-medium flex items-center gap-2"
            >
              👥 Customers
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/rendering-demo"
              className="text-blue-600 hover:underline font-medium flex items-center gap-2"
            >
              ⚙️ Rendering Demo
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
