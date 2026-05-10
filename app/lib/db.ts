// app/lib/db.ts
// Database utility - Initialize Prisma Client with PostgreSQL adapter
// Used by Server Components to fetch data from the database
// Chapter 6: Database setup - Part 2 - Query functions

import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// Create a connection pool for PostgreSQL
// Pool manages multiple database connections efficiently
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize Prisma with PostgreSQL adapter
// This connects Prisma ORM to our PostgreSQL database
const adapter = new PrismaPg(pool);

// Create a single Prisma Client instance to reuse across the app
// This prevents creating multiple connections
export const prisma = new PrismaClient({ adapter });

// ============ QUERY FUNCTIONS ============

// Fetch all customers from database
// Used in dashboard to display customer list
export async function fetchAllCustomers() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { name: 'asc' },
    });
    return customers;
  } catch (error) {
    console.error('❌ Failed to fetch customers:', error);
    throw error;
  }
}

// Fetch customer by ID
// Used to get details for a specific customer
export async function fetchCustomerById(id: string) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id },
    });
    return customer;
  } catch (error) {
    console.error('❌ Failed to fetch customer:', error);
    throw error;
  }
}

// Fetch all invoices with customer information
// Used in dashboard to display invoice list with customer details
export async function fetchAllInvoices() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        customer: true, // Include related customer data
      },
      orderBy: { date: 'desc' },
    });
    return invoices;
  } catch (error) {
    console.error('❌ Failed to fetch invoices:', error);
    throw error;
  }
}

// Fetch invoices for a specific customer
// Used in customer detail page to show their invoices
export async function fetchInvoicesByCustomerId(customerId: string) {
  try {
    const invoices = await prisma.invoice.findMany({
      where: { customerId },
      orderBy: { date: 'desc' },
    });
    return invoices;
  } catch (error) {
    console.error('❌ Failed to fetch invoices for customer:', error);
    throw error;
  }
}

// Fetch revenue data for dashboard charts
// Used to display monthly revenue statistics
export async function fetchRevenueData() {
  try {
    const revenue = await prisma.revenue.findMany({
      orderBy: { month: 'asc' },
    });
    return revenue;
  } catch (error) {
    console.error('❌ Failed to fetch revenue data:', error);
    throw error;
  }
}

// Count total number of customers
// Used in dashboard summary cards
export async function fetchCustomerCount() {
  try {
    const count = await prisma.customer.count();
    return count;
  } catch (error) {
    console.error('❌ Failed to fetch customer count:', error);
    throw error;
  }
}

// Count total number of invoices
// Used in dashboard summary cards
export async function fetchInvoiceCount() {
  try {
    const count = await prisma.invoice.count();
    return count;
  } catch (error) {
    console.error('❌ Failed to fetch invoice count:', error);
    throw error;
  }
}

// Fetch paid vs pending invoices statistics
// Used for dashboard analytics
export async function fetchInvoiceStatistics() {
  try {
    const paid = await prisma.invoice.count({
      where: { status: 'paid' },
    });
    const pending = await prisma.invoice.count({
      where: { status: 'pending' },
    });
    return { paid, pending };
  } catch (error) {
    console.error('❌ Failed to fetch invoice statistics:', error);
    throw error;
  }
}

// Test database connection
// Useful for debugging connection issues
export async function testDatabaseConnection() {
  try {
    // Try to find one customer to test connection
    await prisma.customer.findFirst();
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}
