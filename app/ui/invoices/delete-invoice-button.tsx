'use client';

// Chapter 11: Delete Invoice Button Component
// Client Component for deleting invoices via Server Action
// Shows confirmation dialog before deletion

import { useState } from 'react';
import { deleteInvoice } from '@/app/actions/invoices';

interface DeleteInvoiceButtonProps {
  invoiceId: string;
  customerName: string;
}

export default function DeleteInvoiceButton({
  invoiceId,
  customerName,
}: DeleteInvoiceButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle delete click with confirmation
  const handleDelete = async () => {
    // Show confirmation dialog
    if (
      !window.confirm(
        `Are you sure you want to delete the invoice for ${customerName}? This action cannot be undone.`
      )
    ) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      // Call Server Action to delete invoice
      const result = await deleteInvoice(invoiceId);

      if (!result.success) {
        setError(result.error || result.message);
      }
      // On success, the page revalidates automatically
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete invoice');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition"
      >
        {isDeleting ? '...' : '🗑️'}
      </button>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
