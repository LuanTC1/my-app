// app/dashboard/page.tsx
// Chapter 7: Fetching Data - Dashboard main page
// Chapter 8: Static and Dynamic Rendering - ISR & revalidation setup
// Chapter 9: Streaming - Using Suspense for progressive rendering
//
// Server Component that fetches data and displays dashboard with streaming:
// - Statistics cards (customers, invoices counts)
// - Revenue chart
// - Recent invoices table

import { DashboardCards } from '@/app/ui/dashboard/cards';
import { RecentInvoices } from '@/app/ui/dashboard/recent-invoices';
import { RevenueChart } from '@/app/ui/dashboard/revenue-chart';
import { Suspense } from 'react';
import {
  CardsSkeleton,
  InvoicesTableSkeleton,
  ChartSkeleton,
} from '@/app/ui/skeletons';

// Chapter 8: Define revalidation strategy
// This page uses ISR (Incremental Static Regeneration)
// Page is statically generated at build time and revalidated every 60 seconds
export const revalidate = 60; // seconds - revalidate every minute

// Chapter 9: Main Dashboard Page - Server Component
// This is the entry point for the dashboard
// Uses streaming with Suspense boundaries for better UX
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

      {/* Section 1: Statistics Cards with Suspense
          Chapter 9: Streaming pattern - show skeleton while data loads
          When component renders, placeholder appears immediately, then replaced with real data
      */}
      <Suspense fallback={<CardsSkeleton />}>
        <DashboardCards />
      </Suspense>

      {/* Section 2: Revenue Chart with Suspense
          Similar streaming pattern for chart data
      */}
      <Suspense fallback={<ChartSkeleton />}>
        <RevenueChart />
      </Suspense>

      {/* Section 3: Recent Invoices with Suspense
          Largest data fetch, benefits most from streaming
      */}
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <RecentInvoices />
      </Suspense>
    </div>
  );
}
