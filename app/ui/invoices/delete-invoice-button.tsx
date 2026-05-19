'use client';

// Chapter 13: Delete Invoice Button Component with Accessibility
// Chapter 11: Delete Invoice Button Component
// Client Component for deleting invoices via Server Action
// Accessibility features:
// - ARIA labels and descriptions
// - Error announcements with role="alert"
// - Loading state with aria-busy
// - Keyboard navigation support
// - Focus indicators
// - Confirmation dialog with proper messaging

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
  const [successMessage, setSuccessMessage] = useState(false);

  // Handle delete click with confirmation
  const handleDelete = async () => {
    // Show confirmation dialog with accessible messaging
    if (
      !window.confirm(
        `Are you sure you want to delete the invoice for ${customerName}? This action cannot be undone.`
      )
    ) {
      return;
    }

    setIsDeleting(true);
    setError(null);
    setSuccessMessage(false);

    try {
      // Call Server Action to delete invoice
      const result = await deleteInvoice(invoiceId);

      if (!result.success) {
        setError(result.error || result.message);
      } else {
        setSuccessMessage(true);
      }
      // On success, the page revalidates automatically
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete invoice');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        aria-label={`Delete invoice for ${customerName}`}
        aria-busy={isDeleting}
        aria-describedby={error ? `error-${invoiceId}` : undefined}
        className="rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-200 hover:shadow-sm disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        {isDeleting ? (
          <span aria-live="polite" className="inline-block">
            Deleting...
          </span>
        ) : (
          <>
            <span aria-hidden="true">🗑️</span>
            <span className="sr-only">Delete invoice</span>
          </>
        )}
      </button>

      {/* Error Message with ARIA Alert Role */}
      {error && (
        <span
          id={`error-${invoiceId}`}
          role="alert"
          className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded border border-red-200"
          aria-live="assertive"
        >
          {error}
        </span>
      )}

      {/* Success Message with ARIA Live Region */}
      {successMessage && (
        <span
          role="status"
          className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200"
          aria-live="polite"
        >
          Invoice deleted successfully
        </span>
      )}
    </div>
  );
}
