// app/ui/skeletons.tsx
// Chapter 9: Streaming - Skeleton loading components
// These show while data is being fetched, for better UX

// ============ SKELETON COMPONENTS ============
// Skeleton loaders are placeholder UI shown while data streams in
// They improve perceived performance and keep UI responsive

// Card Skeleton - used for statistics cards
export function CardSkeleton() {
  return (
    <div className="rounded-lg border-l-4 border-gray-300 bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-300" />
          <div className="mt-2 h-8 w-32 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-300" />
      </div>
    </div>
  );
}

// Cards Grid Skeleton - wraps multiple card skeletons
export function CardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}

// Table Row Skeleton - used for invoices table
export function TableRowSkeleton() {
  return (
    <tr className="border-b bg-white hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="h-4 w-32 animate-pulse rounded bg-gray-300" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-40 animate-pulse rounded bg-gray-300" />
      </td>
      <td className="px-6 py-4 text-right">
        <div className="h-4 w-20 animate-pulse rounded bg-gray-300" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-24 animate-pulse rounded bg-gray-300" />
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-20 animate-pulse rounded-full bg-gray-300" />
      </td>
    </tr>
  );
}

// Table Skeleton - full table with multiple rows
export function InvoicesTableSkeleton() {
  return (
    <div className="w-full">
      <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-300" />
      <div className="overflow-hidden rounded-lg border bg-white shadow-md">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-300" />
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-300" />
              </th>
              <th className="px-6 py-3 text-right">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-300" />
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-300" />
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-300" />
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <TableRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Chart Bar Skeleton - used for revenue chart bars
export function ChartBarSkeleton() {
  return (
    <div className="flex items-center gap-4">
      {/* Month label */}
      <div className="h-4 w-12 animate-pulse rounded bg-gray-300" />

      {/* Bar */}
      <div className="flex-1">
        <div className="h-8 animate-pulse rounded bg-gray-300" />
      </div>

      {/* Amount */}
      <div className="h-4 w-20 animate-pulse rounded bg-gray-300" />
    </div>
  );
}

// Chart Skeleton - full chart with multiple bars
export function ChartSkeleton() {
  return (
    <div className="w-full">
      <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-300" />
      <div className="rounded-lg border bg-white p-6 shadow-md">
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <ChartBarSkeleton key={i} />
          ))}
        </div>

        {/* Summary section */}
        <div className="mt-6 border-t pt-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-4 w-24 animate-pulse rounded bg-gray-300" />
                <div className="mt-1 h-6 w-32 animate-pulse rounded bg-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ STREAMING SECTIONS ============
// These can be used in a page layout with Suspense boundaries

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="mb-2 h-10 w-64 animate-pulse rounded bg-gray-300" />
        <div className="h-6 w-96 animate-pulse rounded bg-gray-300" />
      </div>

      {/* Cards Section */}
      <CardsSkeleton />

      {/* Chart Section */}
      <ChartSkeleton />

      {/* Invoices Section */}
      <InvoicesTableSkeleton />
    </div>
  );
}
