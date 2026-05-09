// app/dashboard/page.tsx
// Tạo trang Dashboard chính
// URL: http://localhost:3000/dashboard

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Dashboard header */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>
      
      {/* Welcome message */}
      <p className="text-gray-600 dark:text-gray-300">
        Welcome to your Dashboard! This is the main dashboard page.
      </p>
      
      {/* Placeholder for dashboard content - sẽ thêm widgets/charts ở chapter sau */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Dashboard cards will be added here in future chapters */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Coming Soon: Analytics</p>
        </div>
      </div>
    </div>
  );
}
