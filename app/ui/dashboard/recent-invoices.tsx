// app/ui/dashboard/recent-invoices.tsx
// Chapter 7: Recent Invoices component
// Displays the latest invoices with customer info and status

import { fetchAllInvoices } from '@/app/lib/db';

// Main Recent Invoices component - Server Component
// Fetches invoices and displays them in a table format
export async function RecentInvoices() {
  try {
    // Fetch all invoices (in a real app, you'd add pagination)
    // Invoices include related customer data
    const invoices = await fetchAllInvoices();

    // Limit to 5 most recent for dashboard
    const recentInvoices = invoices.slice(0, 5);

    if (recentInvoices.length === 0) {
      return (
        <div className="rounded-lg border bg-gray-50 p-6">
          <p className="text-center text-gray-600">No invoices found.</p>
        </div>
      );
    }

    return (
      <div className="w-full">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Recent Invoices</h2>
        
        {/* Invoices Table */}
        <div className="overflow-hidden rounded-lg border bg-white shadow-md">
          <table className="w-full">
            {/* Table Header */}
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {recentInvoices.map((invoice, index) => (
                <tr
                  key={invoice.id}
                  className={`border-b transition-colors hover:bg-gray-50 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  {/* Customer Name */}
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {invoice.customer.name}
                  </td>

                  {/* Customer Email */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {invoice.customer.email}
                  </td>

                  {/* Amount (formatted as currency) */}
                  <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    ${(invoice.amount / 100).toFixed(2)}
                  </td>

                  {/* Date (formatted) */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(invoice.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        invoice.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {invoice.status === 'paid' ? '✓' : '⏳'} {invoice.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer with link to all invoices */}
        <div className="mt-4 text-center">
          <a
            href="/dashboard/invoices"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View All Invoices →
          </a>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch recent invoices:', error);

    // Return error state if fetching fails
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 p-6 text-red-700">
        <p>Failed to load recent invoices. Please try again later.</p>
      </div>
    );
  }
}
