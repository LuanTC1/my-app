// Chapter 12: Invoice Detail Page with Error Handling
// URL: /dashboard/invoices/[id]
// Demonstrates error handling for individual invoice routes
// Uses notFound() when invoice doesn't exist

import { notFound } from 'next/navigation';
import { prisma } from '@/app/lib/db';
import Link from 'next/link';

interface InvoiceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function InvoiceDetailPage({ params }: InvoiceDetailPageProps) {
  try {
    const { id } = await params;

    // Validate invoice ID format (CUID)
    if (!id || id.length === 0) {
      notFound();
    }

    // Fetch invoice from database
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        customer: true,
      },
    });

    // If invoice not found, trigger 404 page
    if (!invoice) {
      notFound();
    }

    // Format dates and amounts for display
    const formattedDate = new Date(invoice.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const amount = (invoice.amount / 100).toFixed(2);

    return (
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <Link
            href="/dashboard/invoices"
            className="text-blue-600 hover:underline mb-4 inline-block"
          >
            ← Back to Invoices
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Invoice Details</h1>
        </div>

        {/* Invoice Card */}
        <div className="rounded-lg border bg-white shadow p-6 space-y-6">
          {/* Invoice ID and Status */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Invoice ID</p>
              <p className="font-mono text-sm text-gray-900">{invoice.id}</p>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                invoice.status === 'paid'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {invoice.status === 'paid' ? '✓ PAID' : '⏳ PENDING'}
            </span>
          </div>

          {/* Customer Information */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium text-gray-900">{invoice.customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{invoice.customer.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-900">{invoice.customer.phone || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Invoice Amount and Date */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Invoice Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Amount</p>
                <p className="text-2xl font-bold text-gray-900">${amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-medium text-gray-900">{formattedDate}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          {invoice.description && (
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600">{invoice.description}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="border-t pt-6 flex gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
              Edit Invoice
            </button>
            <button className="px-4 py-2 bg-red-100 text-red-700 font-medium rounded-md hover:bg-red-200 transition">
              Delete Invoice
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching invoice details:', error);
    // Re-throw to trigger error boundary
    throw error;
  }
}
