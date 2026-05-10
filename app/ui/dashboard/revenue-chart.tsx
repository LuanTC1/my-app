// app/ui/dashboard/revenue-chart.tsx
// Chapter 7: Revenue Chart component
// Displays monthly revenue data as a simple bar chart

import { fetchRevenueData } from '@/app/lib/db';

// Main Revenue Chart component - Server Component
// Fetches revenue data and displays it as a visual chart
export async function RevenueChart() {
  try {
    // Fetch monthly revenue data from database
    const revenueData = await fetchRevenueData();

    if (revenueData.length === 0) {
      return (
        <div className="rounded-lg border bg-gray-50 p-6">
          <p className="text-center text-gray-600">No revenue data found.</p>
        </div>
      );
    }

    // Find max revenue to scale the chart properly
    const maxRevenue = Math.max(...revenueData.map((r) => r.revenue));

    return (
      <div className="w-full">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Revenue Overview</h2>

        {/* Chart Container */}
        <div className="rounded-lg border bg-white p-6 shadow-md">
          {/* Chart Grid */}
          <div className="space-y-4">
            {revenueData.map((revenue) => {
              // Calculate bar width as percentage of max revenue
              const barWidth = (revenue.revenue / maxRevenue) * 100;

              return (
                <div key={revenue.id} className="flex items-center gap-4">
                  {/* Month Label */}
                  <div className="w-12 flex-shrink-0">
                    <p className="text-sm font-semibold text-gray-900">{revenue.month}</p>
                  </div>

                  {/* Bar Container */}
                  <div className="flex-1">
                    <div className="relative h-8 overflow-hidden rounded bg-gray-200">
                      {/* Animated Bar */}
                      <div
                        className="flex h-full items-center justify-end bg-gradient-to-r from-blue-400 to-blue-600 pr-3 transition-all duration-500"
                        style={{ width: `${barWidth}%` }}
                      >
                        {/* Bar Label (shown inside bar if wide enough) */}
                        {barWidth > 40 && (
                          <span className="text-xs font-bold text-white">
                            ${(revenue.revenue / 100).toFixed(0)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Amount Display */}
                  <div className="w-20 flex-shrink-0 text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      ${(revenue.revenue / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chart Summary */}
          <div className="mt-6 border-t pt-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {/* Total Revenue */}
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="mt-1 text-lg font-bold text-gray-900">
                  ${(
                    revenueData.reduce((sum, r) => sum + r.revenue, 0) / 100
                  ).toFixed(2)}
                </p>
              </div>

              {/* Average Revenue */}
              <div>
                <p className="text-sm text-gray-600">Average Monthly</p>
                <p className="mt-1 text-lg font-bold text-gray-900">
                  ${(
                    revenueData.reduce((sum, r) => sum + r.revenue, 0) /
                    revenueData.length /
                    100
                  ).toFixed(2)}
                </p>
              </div>

              {/* Highest Month */}
              <div>
                <p className="text-sm text-gray-600">Highest Month</p>
                <p className="mt-1 text-lg font-bold text-gray-900">
                  {revenueData[revenueData.indexOf(revenueData.find((r) => r.revenue === maxRevenue)!)]?.month || 'N/A'}
                </p>
              </div>

              {/* Number of Months */}
              <div>
                <p className="text-sm text-gray-600">Months Tracked</p>
                <p className="mt-1 text-lg font-bold text-gray-900">
                  {revenueData.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch revenue data:', error);

    // Return error state if fetching fails
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 p-6 text-red-700">
        <p>Failed to load revenue chart. Please try again later.</p>
      </div>
    );
  }
}
