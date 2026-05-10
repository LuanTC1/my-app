// app/ui/dashboard/cards.tsx
// Chapter 7: Dashboard Statistics Cards component
// Displays summary statistics: total customers, invoices, paid/pending amounts

import { fetchCustomerCount, fetchInvoiceCount, fetchInvoiceStatistics } from '@/app/lib/db';

// Individual card component to display a single statistic
interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className={`rounded-lg border-l-4 ${color} bg-white p-6 shadow-md`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}

// Main Dashboard Cards component - Server Component
// Fetches data from database and renders statistics
export async function DashboardCards() {
  try {
    // Fetch all required statistics from the database
    // These queries run on the server during page render
    const customerCount = await fetchCustomerCount();
    const invoiceCount = await fetchInvoiceCount();
    const invoiceStats = await fetchInvoiceStatistics();

    // Calculate total amounts (for display purposes)
    // In a real app, you might fetch this from the database
    const totalPaidAmount = `$${(invoiceStats.paid * 50).toFixed(2)}`; // Estimated
    const totalPendingAmount = `$${(invoiceStats.pending * 40).toFixed(2)}`; // Estimated

    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Customers Card */}
        <StatCard
          title="Total Customers"
          value={customerCount}
          icon="👥"
          color="border-blue-500"
        />

        {/* Total Invoices Card */}
        <StatCard
          title="Total Invoices"
          value={invoiceCount}
          icon="📄"
          color="border-purple-500"
        />

        {/* Paid Invoices Card */}
        <StatCard
          title="Paid Invoices"
          value={invoiceStats.paid}
          icon="✅"
          color="border-green-500"
        />

        {/* Pending Invoices Card */}
        <StatCard
          title="Pending Invoices"
          value={invoiceStats.pending}
          icon="⏳"
          color="border-yellow-500"
        />
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch dashboard cards:', error);
    
    // Return error state if fetching fails
    return (
      <div className="rounded-lg bg-red-50 p-6 text-red-700">
        <p>Failed to load dashboard statistics. Please try again later.</p>
      </div>
    );
  }
}
