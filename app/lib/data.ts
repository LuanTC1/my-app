// app/lib/data.ts
// Data fetching functions - fetch data từ database
// Những functions này sẽ được gọi từ Server Components (Chapter 7)
// Comments: Hướng dẫn cách queries work

import { sql } from '@vercel/postgres';
import {
  Invoice,
  Customer,
  Revenue,
  LatestInvoice,
  InvoicesTable,
  FormattedCustomersTable,
} from '@/app/lib/definitions';

// ✅ Fetch revenue data - dùng cho revenue chart (Chapter 8)
export async function fetchRevenue(): Promise<Revenue[]> {
  try {
    // SELECT revenue từ revenue table
    // ORDER BY month - sắp xếp theo tháng
    const data = await sql<Revenue>`
      SELECT * FROM revenue
      ORDER BY month ASC;
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

// ✅ Fetch latest invoices - dùng cho dashboard summary
export async function fetchLatestInvoices(): Promise<LatestInvoice[]> {
  try {
    // SELECT từ invoices JOIN với customers
    // Lấy 5 invoices gần nhất
    // LIMIT 5 - chỉ lấy 5 bản ghi
    const data = await sql<LatestInvoice>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5;
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch latest invoices.');
  }
}

// ✅ Fetch invoices count & amount - dùng cho dashboard cards
export async function fetchCardData() {
  try {
    // Lấy tổng số invoices
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices;`;
    
    // Lấy tổng amount pending invoices
    const invoiceStatusPromise = sql`
      SELECT
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
      FROM invoices;
    `;
    
    // Lấy tổng số customers
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers;`;

    // ⏳ Parallel execution - tất cả queries chạy cùng lúc (faster)
    const data = await Promise.all([
      invoiceCountPromise,
      invoiceStatusPromise,
      customerCountPromise,
    ]);

    // Lấy kết quả từ mỗi query
    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[2].rows[0].count ?? '0');
    const totalPaidInvoices = data[1].rows[0].paid ?? '0';
    const totalPendingInvoices = data[1].rows[0].pending ?? '0';

    return {
      numberOfInvoices,
      numberOfCustomers,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

// ✅ Fetch invoices - dùng cho invoices page (Chapter 10 - with pagination)
export async function fetchInvoices(
  query: string,
  currentPage: number = 1,
  itemsPerPage: number = 6
): Promise<InvoicesTable[]> {
  // Offset calculation: page 1 = 0, page 2 = 6, page 3 = 12, etc.
  const offset = (currentPage - 1) * itemsPerPage;

  try {
    // SELECT invoices JOIN customers
    // WHERE filters by customer name/email based on query
    // LIMIT itemsPerPage OFFSET offset - dùng cho pagination
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url,
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${itemsPerPage} OFFSET ${offset};
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

// ✅ Fetch invoices count for pagination (Chapter 10)
export async function fetchInvoicesPages(
  query: string,
  itemsPerPage: number = 6
): Promise<number> {
  try {
    // COUNT(*) để tính tổng số records matching query
    const count = await sql`
      SELECT COUNT(*) AS count
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
    `;

    // Tính số pages: Math.ceil(5 records / 6 per page) = 1 page
    const totalPages = Math.ceil(Number(count.rows[0].count) / itemsPerPage);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

// ✅ Fetch invoice by ID (Chapter 11 - editing)
export async function fetchInvoiceById(id: string): Promise<Invoice | null> {
  try {
    const data = await sql<Invoice>`
      SELECT * FROM invoices WHERE id = ${id};
    `;

    return data.rows[0] ?? null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

// ✅ Fetch customers - dùng cho customers page
export async function fetchCustomers(): Promise<FormattedCustomersTable[]> {
  try {
    // SELECT customers với aggregate functions
    // COUNT(*) - tính số invoices
    // SUM() - tính tổng amount
    const data = await sql<FormattedCustomersTable>`
      SELECT
        customers.id,
        customers.name,
        customers.email,
        customers.image_url,
        COUNT(invoices.id) AS total_invoices,
        SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
        SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
      FROM customers
      LEFT JOIN invoices ON customers.id = invoices.customer_id
      GROUP BY customers.id, customers.name, customers.email, customers.image_url
      ORDER BY customers.name ASC;
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all customers.');
  }
}

// ✅ Fetch single customer - dùng cho customer detail page
export async function fetchCustomerById(id: string): Promise<Customer | null> {
  try {
    const data = await sql<Customer>`
      SELECT * FROM customers WHERE id = ${id};
    `;

    return data.rows[0] ?? null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customer.');
  }
}
