// app/ui/pagination.tsx
// Chapter 13: Pagination component with accessibility improvements
// Chapter 10: Pagination component
// Accessibility features:
// - ARIA labels for buttons and navigation
// - aria-current="page" for current page
// - Keyboard navigation support
// - Semantic HTML with nav element
// - Clear page information for screen readers

import Link from 'next/link';

// Props for pagination component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  query?: string;
}

// Pagination component with accessibility improvements
// Shows current page info and navigation buttons with proper ARIA attributes
export function Pagination({
  currentPage,
  totalPages,
  totalCount,
  query = '',
}: PaginationProps) {
  // Build URL with query params
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();

    if (query) {
      params.set('query', query);
    }
    params.set('page', pageNumber.toString());

    return `?${params.toString()}`;
  };

  // Calculate item range display
  // e.g., "Showing 1-10 of 42 items"
  const itemsPerPage = 10; // Match pageSize in query functions
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalCount);

  return (
    <nav
      className="flex flex-col items-center justify-between gap-4 rounded-lg border bg-white p-4 md:flex-row"
      aria-label="Pagination Navigation"
    >
      {/* Results Info with ARIA live region */}
      <div className="text-sm text-gray-600" aria-live="polite" aria-atomic="true">
        Showing <span className="font-semibold">{startItem}</span> to{' '}
        <span className="font-semibold">{endItem}</span> of{' '}
        <span className="font-semibold">{totalCount}</span> results
      </div>

      {/* Page Navigation */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        {currentPage > 1 ? (
          <Link
            href={createPageUrl(currentPage - 1)}
            aria-label={`Go to previous page (page ${currentPage - 1} of ${totalPages})`}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            ← Previous
          </Link>
        ) : (
          <button
            disabled
            aria-label="Previous page (disabled - you are on the first page)"
            className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed"
          >
            ← Previous
          </button>
        )}

        {/* Page Info with ARIA */}
        <div className="px-4 text-sm font-medium text-gray-700" role="status" aria-live="polite">
          Page <span className="font-bold">{currentPage}</span> of{' '}
          <span className="font-bold">{totalPages}</span>
        </div>

        {/* Next Button */}
        {currentPage < totalPages ? (
          <Link
            href={createPageUrl(currentPage + 1)}
            aria-label={`Go to next page (page ${currentPage + 1} of ${totalPages})`}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next →
          </Link>
        ) : (
          <button
            disabled
            aria-label="Next page (disabled - you are on the last page)"
            className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed"
          >
            Next →
          </button>
        )}
      </div>
    </nav>
  );
}

// Simple page numbers component (optional, for more complex pagination)
interface PageNumbersProps {
  currentPage: number;
  totalPages: number;
  query?: string;
}

export function PageNumbers({ currentPage, totalPages, query = '' }: PageNumbersProps) {
  // Generate array of page numbers to display
  // Show current page ± 2 pages
  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    params.set('page', pageNumber.toString());
    return `?${params.toString()}`;
  };

  return (
    <nav aria-label="Page numbers" className="flex items-center justify-center gap-1">
      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-gray-500"
              aria-hidden="true"
            >
              ...
            </span>
          );
        }

        const pageNum = page as number;
        const isCurrentPage = pageNum === currentPage;

        return (
          <Link
            key={pageNum}
            href={createPageUrl(pageNum)}
            aria-current={isCurrentPage ? 'page' : undefined}
            aria-label={
              isCurrentPage
                ? `Current page, page ${pageNum}`
                : `Go to page ${pageNum}`
            }
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isCurrentPage
                ? 'bg-blue-600 text-white'
                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {pageNum}
          </Link>
        );
      })}
    </nav>
  );
}
