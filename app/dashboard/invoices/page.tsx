// app/dashboard/invoices/page.tsx
// Chapters 10-11: Invoices page with search, pagination, and mutations
// URL: http://localhost:3000/dashboard/invoices
// Features: Search by customer/email, pagination, create/delete invoices

import { fetchInvoicesWithSearch, fetchAllCustomers } from '@/app/lib/db';
import { Search } from '@/app/ui/search';
import { Pagination } from '@/app/ui/pagination';
import CreateInvoiceForm from '@/app/ui/invoices/create-invoice-form';
import DeleteInvoiceButton from '@/app/ui/invoices/delete-invoice-button';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';

// Props passed by Next.js for server components
interface PageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

// Invoices List Component - Server Component
// Fetches and displays invoices based on search query and page
async function InvoicesList({
  query,
  page,
}: {
  query: string;
  page: number;
}) {
  try {
    // Fetch invoices with search and pagination
    // The function filters by customer name/email or invoice description
    const { invoices, pagination } = await fetchInvoicesWithSearch(query, page, 10);

    if (invoices.length === 0) {
      return (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
          <p className="text-gray-600">
            {query
              ? `No invoices found matching "${query}". Try a different search term.`
              : 'No invoices found.'}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
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
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {invoices.map((invoice, index) => (
                <tr
                  key={invoice.id}
                  className={`border-b transition-colors hover:bg-gray-50 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {invoice.customer.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {invoice.customer.email}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    ${(invoice.amount / 100).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {invoice.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(invoice.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        invoice.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {invoice.status === 'paid' ? '✓' : '⏳'}{' '}
                      {invoice.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <DeleteInvoiceButton
                      invoiceId={invoice.id}
                      customerName={invoice.customer.name}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalCount={pagination.totalCount}
          query={query}
        />
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch invoices:', error);
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 p-6 text-red-700">
        <p>Failed to load invoices. Please try again later.</p>
      </div>
    );
  }
}

// Main Invoices Page - Server Component
export default async function InvoicesPage({ searchParams }: PageProps) {
  // Extract query and page from URL search params
  const params = await searchParams;
  const query = params.query || '';
  const page = parseInt(params.page || '1', 10);

  // Validate page number
  const validPage = Math.max(1, page);

  // Fetch all customers for create form
  const customers = await fetchAllCustomers();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Invoices</h1>
        <p className="mt-2 text-gray-600">
          Chapters 10-11: Search invoices, manage pagination, and create/delete invoices via Server Actions.
        </p>
      </div>

      {/* Create Invoice Form */}
      <CreateInvoiceForm
        customers={customers.map((c) => ({ id: c.id, name: c.name }))}
      />

      {/* Search Bar */}
      <div className="max-w-md">
        <Search placeholder="Search invoices by customer name or email..." />
      </div>

      {/* Invoices List with Suspense */}
      {/* Shows skeleton while fetching data */}
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <InvoicesList query={query} page={validPage} />
      </Suspense>
    </div>
  );
}
