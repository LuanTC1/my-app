// prisma/seed.ts
// Script để seed (thêm dữ liệu mẫu) vào database
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Sample data
const userData = [
  { email: "user@example.com", name: "John Doe" },
];

const customersData = [
  {
    name: "Acme Corp",
    email: "contact@acme.com",
    imageUrl: "/customers/acme.png",
    phone: "123-456-7890",
  },
  {
    name: "Tech Startup",
    email: "hello@techstartup.com",
    imageUrl: "/customers/techstartup.png",
    phone: "098-765-4321",
  },
  {
    name: "Global Business",
    email: "info@globalbiz.com",
    imageUrl: "/customers/global.png",
    phone: "555-1234",
  },
];

const revenueData = [
  { month: "Jan", revenue: 2000 },
  { month: "Feb", revenue: 1800 },
  { month: "Mar", revenue: 2200 },
  { month: "Apr", revenue: 2500 },
  { month: "May", revenue: 2300 },
  { month: "Jun", revenue: 3200 },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.invoice.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.revenue.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  for (const user of userData) {
    const createdUser = await prisma.user.create({ data: user });
    console.log(`✓ Created user: ${createdUser.email}`);
  }

  // Create customers
  const customers = await Promise.all(
    customersData.map((customer) => prisma.customer.create({ data: customer }))
  );
  console.log(`✓ Created ${customers.length} customers`);

  // Create invoices for each customer
  let invoiceCount = 0;
  for (const customer of customers) {
    const invoices = await Promise.all([
      prisma.invoice.create({
        data: {
          customerId: customer.id,
          amount: Math.floor(Math.random() * 10000),
          date: new Date(),
          status: Math.random() > 0.3 ? "paid" : "pending",
          description: `Invoice for ${customer.name}`,
        },
      }),
      prisma.invoice.create({
        data: {
          customerId: customer.id,
          amount: Math.floor(Math.random() * 15000),
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          status: Math.random() > 0.3 ? "paid" : "pending",
          description: `Invoice for ${customer.name}`,
        },
      }),
    ]);
    invoiceCount += invoices.length;
  }
  console.log(`✓ Created ${invoiceCount} invoices`);

  // Create revenue data
  await Promise.all(
    revenueData.map((revenue) => prisma.revenue.create({ data: revenue }))
  );
  console.log(`✓ Created ${revenueData.length} revenue records`);

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
