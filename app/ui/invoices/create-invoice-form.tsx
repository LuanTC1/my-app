'use client';

// Chapter 13: Create Invoice Form Component with Accessibility Improvements
// Chapter 11: Create Invoice Form Component
// Client Component that handles form submission via Server Action
// Accessibility features:
// - Form validation with error messages
// - ARIA attributes for error handling (aria-invalid, aria-describedby, aria-required)
// - Proper label associations
// - Visual indicators for required fields
// - Keyboard navigation support

import { useState } from 'react';
import { createInvoice, type ActionResult } from '@/app/actions/invoices';

interface CreateInvoiceFormProps {
  customers: Array<{
    id: string;
    name: string;
  }>;
  onSuccess?: () => void;
}

interface FormErrors {
  customerId?: string;
  amount?: string;
  status?: string;
  description?: string;
}

export default function CreateInvoiceForm({
  customers,
  onSuccess,
}: CreateInvoiceFormProps) {
  // Local state for form feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ActionResult | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    customerId: '',
    amount: '',
    status: 'pending' as const,
    description: '',
  });

  // Client-side form validation
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.customerId.trim()) {
      errors.customerId = 'Customer is required';
    }

    if (!formData.amount.trim()) {
      errors.amount = 'Amount is required';
    } else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      errors.amount = 'Amount must be a positive number';
    }

    if (!formData.status) {
      errors.status = 'Status is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form field changes
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    fieldName: keyof typeof formData
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: e.target.value,
    }));

    // Clear error for this field when user starts typing
    if (formErrors[fieldName as keyof FormErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [fieldName]: undefined,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(null);

    // Validate before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

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
        setFormErrors({});
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
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border p-6 bg-white shadow">
      <h2 className="text-xl font-semibold text-gray-900">Create New Invoice</h2>

      {/* Success Message with ARIA live region */}
      {result?.success && (
        <div
          role="alert"
          className="rounded-md bg-green-50 p-4 border border-green-200"
        >
          <p className="text-sm font-medium text-green-800">✓ {result.message}</p>
        </div>
      )}

      {/* Server-side Error Message with ARIA live region */}
      {result && !result.success && (
        <div
          role="alert"
          className="rounded-md bg-red-50 p-4 border border-red-200"
        >
          <p className="text-sm font-medium text-red-800">{result.message}</p>
          {result.error && (
            <p className="text-sm text-red-700 mt-1">{result.error}</p>
          )}
        </div>
      )}

      {/* Required Fields Notice */}
      <p className="text-sm text-gray-600">
        Fields marked with <span className="text-red-600 font-bold">*</span> are required
      </p>

      {/* Customer Select */}
      <div>
        <label htmlFor="customerId" className="block text-sm font-medium text-gray-700 mb-1">
          Customer
          <span className="text-red-600 font-bold ml-1" aria-label="required">*</span>
        </label>
        <select
          id="customerId"
          name="customerId"
          value={formData.customerId}
          onChange={(e) => handleFieldChange(e, 'customerId')}
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={!!formErrors.customerId}
          aria-describedby={formErrors.customerId ? 'customerId-error' : undefined}
          className={`mt-1 block w-full rounded-md px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 transition ${
            formErrors.customerId
              ? 'border-2 border-red-500 bg-red-50'
              : 'border border-gray-300'
          }`}
        >
          <option value="">Select a customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        {formErrors.customerId && (
          <p id="customerId-error" className="mt-2 text-sm text-red-600" role="alert">
            {formErrors.customerId}
          </p>
        )}
      </div>

      {/* Amount Input */}
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
          Amount (USD)
          <span className="text-red-600 font-bold ml-1" aria-label="required">*</span>
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          placeholder="e.g., 99.50"
          step="0.01"
          min="0.01"
          value={formData.amount}
          onChange={(e) => handleFieldChange(e, 'amount')}
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={!!formErrors.amount}
          aria-describedby={formErrors.amount ? 'amount-error' : undefined}
          className={`mt-1 block w-full rounded-md px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 transition ${
            formErrors.amount
              ? 'border-2 border-red-500 bg-red-50'
              : 'border border-gray-300'
          }`}
        />
        {formErrors.amount && (
          <p id="amount-error" className="mt-2 text-sm text-red-600" role="alert">
            {formErrors.amount}
          </p>
        )}
      </div>

      {/* Status Select */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Status
          <span className="text-red-600 font-bold ml-1" aria-label="required">*</span>
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={(e) =>
            handleFieldChange(
              e as React.ChangeEvent<HTMLSelectElement>,
              'status'
            )
          }
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={!!formErrors.status}
          aria-describedby={formErrors.status ? 'status-error' : undefined}
          className={`mt-1 block w-full rounded-md px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 transition ${
            formErrors.status
              ? 'border-2 border-red-500 bg-red-50'
              : 'border border-gray-300'
          }`}
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
        {formErrors.status && (
          <p id="status-error" className="mt-2 text-sm text-red-600" role="alert">
            {formErrors.status}
          </p>
        )}
      </div>

      {/* Description Input (Optional) */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
          <span className="text-gray-500 text-xs ml-1">(optional)</span>
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Invoice description (optional)"
          value={formData.description}
          onChange={(e) => handleFieldChange(e, 'description')}
          disabled={isSubmitting}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 transition"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isSubmitting ? (
          <>
            <span aria-live="polite">Creating...</span>
          </>
        ) : (
          'Create Invoice'
        )}
      </button>
    </form>
  );
}
