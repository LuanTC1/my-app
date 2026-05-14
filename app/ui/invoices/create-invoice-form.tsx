'use client';

// Chapter 11: Create Invoice Form Component
// Client Component that handles form submission via Server Action
// Uses useFormStatus hook for loading/error states

import { useState } from 'react';
import { createInvoice, type ActionResult } from '@/app/actions/invoices';

interface CreateInvoiceFormProps {
  customers: Array<{
    id: string;
    name: string;
  }>;
  onSuccess?: () => void;
}

export default function CreateInvoiceForm({
  customers,
  onSuccess,
}: CreateInvoiceFormProps) {
  // Local state for form feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ActionResult | null>(null);
  const [formData, setFormData] = useState({
    customerId: '',
    amount: '',
    status: 'pending' as const,
    description: '',
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      // Create FormData object for Server Action
      const fData = new FormData();
      fData.append('customerId', formData.customerId);
      fData.append('amount', formData.amount);
      fData.append('status', formData.status);
      fData.append('description', formData.description);

      // Call Server Action
      const response = await createInvoice(fData);
      setResult(response);

      // Reset form on success
      if (response.success) {
        setFormData({
          customerId: '',
          amount: '',
          status: 'pending',
          description: '',
        });
        // Call callback if provided
        if (onSuccess) {
          setTimeout(onSuccess, 500);
        }
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'An error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border p-6 bg-white shadow">
      <h2 className="text-xl font-semibold text-gray-900">Create New Invoice</h2>

      {/* Success Message */}
      {result?.success && (
        <div className="rounded-md bg-green-50 p-4">
          <p className="text-sm text-green-800">{result.message}</p>
        </div>
      )}

      {/* Error Message */}
      {result && !result.success && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-800">
            <strong>{result.message}</strong>
            {result.error && <p className="mt-1">{result.error}</p>}
          </p>
        </div>
      )}

      {/* Customer Select */}
      <div>
        <label htmlFor="customerId" className="block text-sm font-medium text-gray-700">
          Customer
        </label>
        <select
          id="customerId"
          name="customerId"
          value={formData.customerId}
          onChange={(e) =>
            setFormData({ ...formData, customerId: e.target.value })
          }
          disabled={isSubmitting}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
          required
        >
          <option value="">Select a customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>

      {/* Amount Input */}
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount (USD)
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          placeholder="e.g., 99.50"
          step="0.01"
          min="0.01"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          disabled={isSubmitting}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
          required
        />
      </div>

      {/* Status Select */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as 'paid' | 'pending',
            })
          }
          disabled={isSubmitting}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      {/* Description Input */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description (Optional)
        </label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Invoice description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          disabled={isSubmitting}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
      >
        {isSubmitting ? 'Creating...' : 'Create Invoice'}
      </button>
    </form>
  );
}
