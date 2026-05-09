// app/dashboard/invoices/page.tsx
// Tạo trang Invoices
// URL: http://localhost:3000/dashboard/invoices

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      {/* Invoices page header */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Invoices
      </h1>
      
      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300">
        View and manage invoices.
      </p>
      
      {/* Placeholder for invoices list - sẽ thêm filtering & search ở chapter 10 */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Invoices list will be loaded here in Chapter 7 (Fetching Data)
        </p>
      </div>
    </div>
  );
}
