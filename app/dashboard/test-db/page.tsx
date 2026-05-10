// app/dashboard/test-db/page.tsx
// Test page to verify database connection and query functions
// Chapter 6: Database setup - Part 2 - Testing database

import { 
  fetchAllCustomers, 
  fetchAllInvoices,
  fetchRevenueData,
  fetchCustomerCount,
  fetchInvoiceCount,
  fetchInvoiceStatistics,
  testDatabaseConnection
} from '@/app/lib/db';

// This is a Server Component - runs on the server
export default async function TestDatabasePage() {
  // Test database connection first
  const isConnected = await testDatabaseConnection();

  if (!isConnected) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">❌ Database Connection Failed</h1>
        <p className="mt-2">Please check your DATABASE_URL in .env.local</p>
      </div>
    );
  }

  // Fetch all data from database to test queries
  // These queries run on the server during page render
  const customers = await fetchAllCustomers();
  const invoices = await fetchAllInvoices();
  const revenue = await fetchRevenueData();
  const customerCount = await fetchCustomerCount();
  const invoiceCount = await fetchInvoiceCount();
  const invoiceStats = await fetchInvoiceStatistics();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-green-600">✅ Database Connection Test</h1>

      {/* Connection Status */}
      <div className="mb-8 p-4 bg-green-100 border border-green-300 rounded">
        <p className="text-green-800">✅ Successfully connected to PostgreSQL database</p>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white border rounded shadow">
          <p className="text-gray-600 text-sm">Total Customers</p>
          <p className="text-2xl font-bold text-blue-600">{customerCount}</p>
        </div>
        <div className="p-4 bg-white border rounded shadow">
          <p className="text-gray-600 text-sm">Total Invoices</p>
          <p className="text-2xl font-bold text-blue-600">{invoiceCount}</p>
        </div>
        <div className="p-4 bg-white border rounded shadow">
          <p className="text-gray-600 text-sm">Paid Invoices</p>
          <p className="text-2xl font-bold text-green-600">{invoiceStats.paid}</p>
        </div>
        <div className="p-4 bg-white border rounded shadow">
          <p className="text-gray-600 text-sm">Pending Invoices</p>
          <p className="text-2xl font-bold text-yellow-600">{invoiceStats.pending}</p>
        </div>
      </div>

      {/* Customers Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Customers ({customers.length})</h2>
        <div className="overflow-x-auto bg-white border rounded">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{customer.name}</td>
                  <td className="px-4 py-2">{customer.email}</td>
                  <td className="px-4 py-2">{customer.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Invoices ({invoices.length})</h2>
        <div className="overflow-x-auto bg-white border rounded">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{invoice.customer.name}</td>
                  <td className="px-4 py-2 font-semibold">${(invoice.amount / 100).toFixed(2)}</td>
                  <td className="px-4 py-2">{new Date(invoice.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                      invoice.status === 'paid' ? 'bg-green-600' : 'bg-yellow-600'
                    }`}>
                      {invoice.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Data */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Monthly Revenue ({revenue.length})</h2>
        <div className="bg-white border rounded p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {revenue.map((rev) => (
              <div key={rev.id} className="p-3 bg-gray-50 rounded border">
                <p className="text-gray-600 text-sm font-semibold">{rev.month}</p>
                <p className="text-xl font-bold text-green-600">${(rev.revenue / 100).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
