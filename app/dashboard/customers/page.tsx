// app/dashboard/customers/page.tsx
// Chapter 10: Customers page with search and pagination
// URL: http://localhost:3000/dashboard/customers
// Features: Search by name/email/phone, pagination

import { fetchCustomersWithSearch } from '@/app/lib/db';
import { Search } from '@/app/ui/search';
import { Pagination } from '@/app/ui/pagination';
import { Suspense } from 'react';
import { CardsSkeleton } from '@/app/ui/skeletons';

// Props passed by Next.js for server components
interface PageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

// Customers List Component - Server Component
// Fetches and displays customers based on search query and page
async function CustomersList({
  query,
  page,
}: {
  query: string;
  page: number;
}) {
  try {
    // Fetch customers with search and pagination
    // The function filters by name, email, or phone
    const { customers, pagination } = await fetchCustomersWithSearch(query, page, 10);

    if (customers.length === 0) {
      return (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
          <p className="text-gray-600">
            {query
              ? `No customers found matching "${query}". Try a different search term.`
              : 'No customers found.'}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Customers Table */}
        <div className="overflow-hidden rounded-lg border bg-white shadow-md">
          <table className="w-full">
            {/* Table Header */}
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Phone
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {customers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className={`border-b transition-colors hover:bg-gray-50 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {customer.phone || '-'}
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
    console.error('Failed to fetch customers:', error);
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 p-6 text-red-700">
        <p>Failed to load customers. Please try again later.</p>
      </div>
    );
  }
}

// Main Customers Page - Server Component
export default async function CustomersPage({ searchParams }: PageProps) {
  // Extract query and page from URL search params
  const params = await searchParams;
  const query = params.query || '';
  const page = parseInt(params.page || '1', 10);

  // Validate page number
  const validPage = Math.max(1, page);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Customers</h1>
        <p className="mt-2 text-gray-600">
          Chapter 10: Search and manage customers. Use the search box to filter by name,
          email, or phone.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md">
        <Search placeholder="Search customers by name, email, or phone..." />
      </div>

      {/* Customers List with Suspense */}
      {/* Shows skeleton while fetching data */}
      <Suspense fallback={<CardsSkeleton />}>
        <CustomersList query={query} page={validPage} />
      </Suspense>
    </div>
  );
}
