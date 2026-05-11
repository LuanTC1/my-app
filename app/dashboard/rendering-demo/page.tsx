// app/dashboard/rendering-demo/page.tsx
// Chapter 8 & 9 Demo: Static vs Dynamic Rendering and Streaming
// This page explains and demonstrates rendering strategies

import { fetchCustomerCount, fetchInvoiceCount } from '@/app/lib/db';
import { Suspense } from 'react';
import { CardsSkeleton } from '@/app/ui/skeletons';

// Chapter 8: Static Rendering Demo
// This component is rendered once at build time and cached
// Revalidated every 60 seconds (ISR)
async function StaticDataSection() {
  // This fetch happens at build time
  const customerCount = await fetchCustomerCount();
  const invoiceCount = await fetchInvoiceCount();

  return (
    <div className="rounded-lg border-2 border-blue-500 bg-blue-50 p-6">
      <h3 className="mb-2 text-lg font-bold text-blue-900">
        📊 Static Rendering (Built Once, Cached)
      </h3>
      <p className="mb-4 text-sm text-blue-800">
        This data is generated once at build time. It's the fastest option for static content.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded bg-white p-3">
          <p className="text-xs text-gray-600">Customers</p>
          <p className="text-2xl font-bold text-blue-600">{customerCount}</p>
        </div>
        <div className="rounded bg-white p-3">
          <p className="text-xs text-gray-600">Invoices</p>
          <p className="text-2xl font-bold text-blue-600">{invoiceCount}</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-blue-700">
        ⏰ Built at: {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
}

// Chapter 8: Dynamic Rendering Demo
// This component re-renders on every request
// Use this for real-time data that changes frequently
async function DynamicDataSection() {
  // Disable caching with dynamic directive
  // This makes the page render on every request
  const timestamp = new Date().toLocaleString();
  const customerCount = await fetchCustomerCount();

  return (
    <div className="rounded-lg border-2 border-purple-500 bg-purple-50 p-6">
      <h3 className="mb-2 text-lg font-bold text-purple-900">
        ⚡ Dynamic Rendering (Always Fresh)
      </h3>
      <p className="mb-4 text-sm text-purple-800">
        This component re-renders on every request. Use for real-time data.
      </p>
      <div className="rounded bg-white p-3">
        <p className="text-xs text-gray-600">Current Time</p>
        <p className="font-mono text-sm text-purple-600">{timestamp}</p>
      </div>
      <div className="mt-3 rounded bg-white p-3">
        <p className="text-xs text-gray-600">Customers Count (Fresh)</p>
        <p className="text-2xl font-bold text-purple-600">{customerCount}</p>
      </div>
      <p className="mt-3 text-xs text-purple-700">
        🔄 Refresh page to see updated time
      </p>
    </div>
  );
}

// Placeholder for streaming demo
function StreamingDataPlaceholder() {
  return (
    <div className="rounded-lg border-2 border-green-500 bg-green-50 p-6">
      <h3 className="mb-2 text-lg font-bold text-green-900">
        🌊 Streaming with Suspense (Progressive Loading)
      </h3>
      <p className="mb-4 text-sm text-green-800">
        This section uses Suspense. The skeleton shows immediately while data loads.
      </p>
      <p className="text-xs text-green-700">
        ✓ Better perceived performance - UI appears faster
      </p>
    </div>
  );
}

// Main Demo Page
export default async function RenderingDemoPage() {
  return (
    <div className="space-y-8 pb-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Rendering Strategies Demo
        </h1>
        <p className="mt-2 text-gray-600">
          Chapter 8 & 9: Understanding Static, Dynamic, and Streaming Rendering
        </p>
      </div>

      {/* Concepts Explanation */}
      <div className="space-y-4 rounded-lg bg-gray-50 p-6">
        <h2 className="text-2xl font-bold text-gray-900">📚 Concepts</h2>

        <div className="space-y-3 text-sm text-gray-700">
          <div>
            <p className="font-semibold text-gray-900">Static Rendering</p>
            <p>
              Pages are pre-built at build time and served from cache. Fastest but only for
              static content. Use{' '}
              <code className="rounded bg-gray-200 px-2 py-1 font-mono">
                export const revalidate = 60
              </code>{' '}
              for ISR.
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900">Dynamic Rendering</p>
            <p>
              Pages re-render on every request. Slower but always fresh. Use for real-time
              data like timestamps, live notifications, personalized content.
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900">Streaming with Suspense</p>
            <p>
              Sends UI to browser progressively. Skeletons show immediately, replaced with
              real data. Best UX - pages feel instant even while loading large datasets.
            </p>
          </div>
        </div>
      </div>

      {/* Static Rendering Demo */}
      <Suspense fallback={<CardsSkeleton />}>
        <StaticDataSection />
      </Suspense>

      {/* Dynamic Rendering Demo */}
      <Suspense fallback={<CardsSkeleton />}>
        <DynamicDataSection />
      </Suspense>

      {/* Streaming Demo */}
      <Suspense fallback={<CardsSkeleton />}>
        <StreamingDataPlaceholder />
      </Suspense>

      {/* Key Takeaways */}
      <div className="space-y-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-6">
        <h2 className="text-lg font-bold text-yellow-900">✨ Key Takeaways</h2>
        <ul className="space-y-2 text-sm text-yellow-800">
          <li>
            ✓ Use <strong>Static Rendering</strong> for pages that don't change frequently
            (best performance)
          </li>
          <li>
            ✓ Use <strong>Dynamic Rendering</strong> for real-time data (worse performance,
            always fresh)
          </li>
          <li>
            ✓ Use <strong>Streaming + Suspense</strong> to show UI immediately, then fill in
            data (best UX)
          </li>
          <li>
            ✓ Combine all three: Static page layout + Suspense streaming for data = optimal
            performance
          </li>
        </ul>
      </div>

      {/* Try It Out */}
      <div className="rounded-lg bg-blue-50 p-6">
        <h3 className="mb-3 font-bold text-blue-900">🎯 Try It Out</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>
            1. Open{' '}
            <a href="/dashboard" className="font-semibold underline">
              Dashboard
            </a>{' '}
            - notice skeletons load fast, then data appears
          </li>
          <li>2. Refresh this page - notice dynamic time updates instantly</li>
          <li>3. Check browser DevTools Network tab to see streaming in action</li>
        </ul>
      </div>
    </div>
  );
}
