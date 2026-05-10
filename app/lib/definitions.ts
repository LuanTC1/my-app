// app/lib/definitions.ts
// TypeScript type definitions cho database tables
// Định nghĩa structure của các entities trong database

// ✅ User type - định nghĩa user object
export type User = {
  id: string; // Unique identifier
  name: string; // User's full name
  email: string; // User's email (unique)
  password: string; // Hashed password
};

// ✅ Invoice type - định nghĩa invoice object
export type Invoice = {
  id: string; // Unique invoice ID
  customer_id: string; // Foreign key to customers table
  amount: number; // Invoice amount in cents (để tránh floating point issues)
  status: 'pending' | 'paid'; // Invoice status - chỉ có 2 giá trị
  date: string; // Invoice date (ISO format)
};

// ✅ Customer type - định nghĩa customer object
export type Customer = {
  id: string; // Unique customer ID
  name: string; // Customer's full name
  email: string; // Customer's email
  image_url: string; // Customer's avatar image URL
};

// ✅ Revenue type - dùng cho charts/analytics
export type Revenue = {
  month: string; // Month name (e.g., "Jan", "Feb")
  revenue: number; // Total revenue for month
};

// ✅ LatestInvoice type - để hiển thị latest invoices
export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string; // Formatted amount
};

// ✅ InvoicesTable type - dùng khi hiển thị invoices trong table
export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string; // Customer name
  email: string; // Customer email
  image_url: string; // Customer avatar
  date: string; // Invoice date
  amount: number; // Invoice amount
  status: 'pending' | 'paid';
};

// ✅ FormattedCustomersTable type - dùng khi hiển thị customers
export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number; // Tổng số invoices của customer
  total_pending: number; // Tổng amount pending invoices (cents)
  total_paid: number; // Tổng amount paid invoices (cents)
};
