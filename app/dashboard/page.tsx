// app/dashboard/page.tsx
// Chapter 7: Fetching Data - Dashboard main page
// Server Component that fetches data and displays dashboard with:
// - Statistics cards (customers, invoices counts)
// - Recent invoices table
// - Revenue chart

import { DashboardCards } from '@/app/ui/dashboard/cards';
import { RecentInvoices } from '@/app/ui/dashboard/recent-invoices';
import { RevenueChart } from '@/app/ui/dashboard/revenue-chart';
import { Suspense } from 'react';

// Loading skeleton component - shown while data is being fetched
function CardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-32 rounded-lg border bg-gray-100 animate-pulse" />
      ))}
    </div>
  );
}

function InvoicesSkeleton() {
  return <div className="h-64 rounded-lg border bg-gray-100 animate-pulse" />;
}

function ChartSkeleton() {
  return <div className="h-96 rounded-lg border bg-gray-100 animate-pulse" />;
}

// Main Dashboard Page - Server Component
// This is the entry point for the dashboard
export default async function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back! Here's a summary of your business.
        </p>
      </div>

      {/* Statistics Cards Section */}
      {/* Suspense wraps async components to show loading state while data fetches */}
      <Suspense fallback={<CardsSkeleton />}>
        <DashboardCards />
      </Suspense>

      {/* Revenue Chart Section */}
      <Suspense fallback={<ChartSkeleton />}>
        <RevenueChart />
      </Suspense>

      {/* Recent Invoices Section */}
      <Suspense fallback={<InvoicesSkeleton />}>
        <RecentInvoices />
      </Suspense>
    </div>
  );
}
