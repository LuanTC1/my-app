// app/lib/placeholder-data.ts
// Sample data để seed database
// Trong production, đây sẽ được thay thế bằng real data

// ✅ Sample customers data
export const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-d326e3042c94',
    name: 'Delba de Oliveira',
    email: 'delba@example.com',
    image_url: '/customers/delba.jpg',
  },
  {
    id: '3958dc9e-742f-4377-85e9-d326e3042c94',
    name: 'Lee Robinson',
    email: 'lee@example.com',
    image_url: '/customers/lee.jpg',
  },
  {
    id: '3958dc9e-762f-4377-85e9-d326e3042c94',
    name: 'Hector Simpson',
    email: 'hector@example.com',
    image_url: '/customers/hector.jpg',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@example.com',
    image_url: '/customers/steven.jpg',
  },
  {
    id: '3958dc9e-782f-4377-85e9-d326e3042c94',
    name: 'Jared Palmer',
    email: 'jared@example.com',
    image_url: '/customers/jared.jpg',
  },
];

// ✅ Sample invoices data
export const invoices = [
  {
    customer_id: customers[0].id, // Delba
    amount: 15795, // Amount in cents ($157.95)
    status: 'pending',
    date: '2024-12-06',
  },
  {
    customer_id: customers[1].id, // Lee
    amount: 20348,
    status: 'pending',
    date: '2024-11-14',
  },
  {
    customer_id: customers[2].id, // Hector
    amount: 3040,
    status: 'paid',
    date: '2024-10-29',
  },
  {
    customer_id: customers[3].id, // Steven
    amount: 44800,
    status: 'paid',
    date: '2024-09-10',
  },
  {
    customer_id: customers[4].id, // Jared
    amount: 34577,
    status: 'pending',
    date: '2024-08-05',
  },
];

// ✅ Sample users data (for authentication - Chapter 14)
export const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextjs-dashboard.com',
    password: 'password123', // ⚠️ NEVER hardcode passwords in real app!
  },
];

// ✅ Revenue data (for charts)
export const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3490 },
  { month: 'Sep', revenue: 4300 },
  { month: 'Oct', revenue: 5200 },
  { month: 'Nov', revenue: 4800 },
  { month: 'Dec', revenue: 6100 },
];
