'use server';

// Chapter 11: Server Actions for mutating invoice data
// Server Actions are functions marked with 'use server' that run on the server
// and can be called from Client Components or form elements

import { revalidatePath } from 'next/cache';
import { prisma } from '@/app/lib/db';

// Type definitions for form responses
export interface ActionResult {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Create a new invoice
 * Called by: CreateInvoiceForm (Client Component)
 * Validates customer ID, amount, status
 * Inserts into database and revalidates cache
 */
export async function createInvoice(formData: FormData): Promise<ActionResult> {
  try {
    // Extract form values
    const customerId = formData.get('customerId') as string;
    const amount = formData.get('amount') as string;
    const status = formData.get('status') as string;
    const description = formData.get('description') as string;

    // Validation: Check required fields
    if (!customerId || !amount || !status) {
      return {
        success: false,
        message: 'Failed to create invoice',
        error: 'Customer, amount, and status are required',
      };
    }

    // Validation: Amount must be positive number
    const amountInCents = Math.round(parseFloat(amount) * 100);
    if (isNaN(amountInCents) || amountInCents <= 0) {
      return {
        success: false,
        message: 'Failed to create invoice',
        error: 'Amount must be a positive number',
      };
    }

    // Validation: Status must be 'paid' or 'pending'
    if (status !== 'paid' && status !== 'pending') {
      return {
        success: false,
        message: 'Failed to create invoice',
        error: 'Status must be either paid or pending',
      };
    }

    // Create invoice in database
    const newInvoice = await prisma.invoice.create({
      data: {
        customerId,
        amount: amountInCents,
        status,
        description: description || '',
        date: new Date(),
      },
    });

    // Revalidate cache to refresh invoice list
    revalidatePath('/dashboard/invoices');
    revalidatePath('/dashboard');

    return {
      success: true,
      message: `Invoice created successfully for $${amount}`,
    };
  } catch (error) {
    console.error('Error creating invoice:', error);
    return {
      success: false,
      message: 'Failed to create invoice',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Update an existing invoice
 * Called by: EditInvoiceForm (Client Component)
 * Validates invoice exists, then updates fields
 * Revalidates cache after update
 */
export async function updateInvoice(
  invoiceId: string,
  formData: FormData
): Promise<ActionResult> {
  try {
    // Extract form values
    const amount = formData.get('amount') as string;
    const status = formData.get('status') as string;
    const description = formData.get('description') as string;

    // Validation: Check required fields
    if (!amount || !status) {
      return {
        success: false,
        message: 'Failed to update invoice',
        error: 'Amount and status are required',
      };
    }

    // Validation: Amount must be positive number
    const amountInCents = Math.round(parseFloat(amount) * 100);
    if (isNaN(amountInCents) || amountInCents <= 0) {
      return {
        success: false,
        message: 'Failed to update invoice',
        error: 'Amount must be a positive number',
      };
    }

    // Validation: Status must be 'paid' or 'pending'
    if (status !== 'paid' && status !== 'pending') {
      return {
        success: false,
        message: 'Failed to update invoice',
        error: 'Status must be either paid or pending',
      };
    }

    // Check if invoice exists
    const existingInvoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
    });

    if (!existingInvoice) {
      return {
        success: false,
        message: 'Failed to update invoice',
        error: 'Invoice not found',
      };
    }

    // Update invoice in database
    const updatedInvoice = await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        amount: amountInCents,
        status,
        description: description || '',
      },
    });

    // Revalidate cache to refresh invoice list
    revalidatePath('/dashboard/invoices');
    revalidatePath('/dashboard');

    return {
      success: true,
      message: `Invoice updated successfully to $${amount}`,
    };
  } catch (error) {
    console.error('Error updating invoice:', error);
    return {
      success: false,
      message: 'Failed to update invoice',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Delete an invoice
 * Called by: DeleteInvoiceButton (Client Component)
 * Validates invoice exists before deletion
 * Revalidates cache after deletion
 */
export async function deleteInvoice(invoiceId: string): Promise<ActionResult> {
  try {
    // Check if invoice exists
    const existingInvoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
    });

    if (!existingInvoice) {
      return {
        success: false,
        message: 'Failed to delete invoice',
        error: 'Invoice not found',
      };
    }

    // Delete invoice from database
    await prisma.invoice.delete({
      where: { id: invoiceId },
    });

    // Revalidate cache to refresh invoice list
    revalidatePath('/dashboard/invoices');
    revalidatePath('/dashboard');

    return {
      success: true,
      message: 'Invoice deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting invoice:', error);
    return {
      success: false,
      message: 'Failed to delete invoice',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
