// app/dashboard/customers/page.tsx
// Tạo trang Customers
// URL: http://localhost:3000/dashboard/customers

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      {/* Customers page header */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Customers
      </h1>
      
      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300">
        Manage your customers and their information.
      </p>
      
      {/* Placeholder for customers list - sẽ thêm table component ở chapter 7 (Fetching Data) */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Customers list will be loaded here in Chapter 7 (Fetching Data)
        </p>
      </div>
    </div>
  );
}
