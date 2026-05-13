// app/ui/search.tsx
// Chapter 10: Search component with URL query parameters
// This component handles search input and updates URL params for server-side filtering

'use client'; // This is a Client Component because it needs interactivity

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

// Props for the search component
interface SearchProps {
  placeholder?: string;
  defaultValue?: string;
}

// Search component
// - Takes user input
// - Debounces input (waits 300ms after user stops typing)
// - Updates URL search params
// - Server component receives new query and re-fetches data
export function Search({ placeholder = 'Search...', defaultValue = '' }: SearchProps) {
  // Get current URL search params
  const searchParams = useSearchParams();
  // Get current pathname
  const pathname = usePathname();
  // Get router to update URL
  const router = useRouter();

  // Debounced search handler - waits 300ms before updating URL
  // This prevents sending too many requests while user is typing
  const handleSearch = useDebouncedCallback((term: string) => {
    // Create new URLSearchParams from current search params
    const params = new URLSearchParams(searchParams);

    // Reset page to 1 when searching (start from beginning)
    params.set('page', '1');

    if (term) {
      // Set search param if term provided
      params.set('query', term);
    } else {
      // Remove search param if empty
      params.delete('query');
    }

    // Update URL with new search params
    // This triggers server re-render with new query
    router.push(`${pathname}?${params.toString()}`);
  }, 300); // 300ms debounce delay

  return (
    <div className="relative">
      {/* Search Input */}
      <input
        type="text"
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString() || defaultValue}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      {/* Search Icon */}
      <svg
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}
