// app/ui/dashboard/nav-links.tsx
// Component chứa navigation links cho dashboard
// Features:
// - Dùng <Link> thay <a> để client-side navigation (không full page refresh)
// - usePathname() để detect current page
// - clsx để highlight active link

'use client'; // Phải là Client Component vì dùng React hooks (usePathname)

import Link from 'next/link'; // Link component từ Next.js - optimize navigation
import { usePathname } from 'next/navigation'; // Hook lấy current URL pathname
import clsx from 'clsx'; // Dùng để conditionally apply class names

// Định nghĩa các navigation links
// Mỗi link có: name, href, và icon (sẽ dùng emoji thay icon library cho đơn giản)
const links = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: '📊', // Emoji icon placeholder
  },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: '💰',
  },
  {
    name: 'Customers',
    href: '/dashboard/customers',
    icon: '👥',
  },
];

export default function NavLinks() {
  // usePathname() lấy current URL path (ví dụ: '/dashboard/invoices')
  // Dùng để check xem link nào đang active
  const pathname = usePathname();

  return (
    // ✅ FIX: flex flex-col - links nằm DỌC (vertical), không ngang
    // gap-2: khoảng cách giữa các links
    // w-full: chiếm full width của parent container
    <div className="flex flex-col gap-2 w-full">
      {/* Map qua tất cả links */}
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          // ✅ FIX: w-full justify-start - chiếm full width và align left
          // h-[48px]: height fixed 48px
          className={clsx(
            // Base styles - áp dụng cho tất cả links
            'flex h-[48px] w-full items-center justify-start gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300', // Default style
            'hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white', // Hover style
            // Active link styles - chỉ áp dụng khi link này là current page
            {
              // Nếu pathname match link.href, apply active styles
              'bg-blue-600 dark:bg-blue-700 text-blue-700': pathname === link.href,
            }
          )}
        >
          {/* Icon - emoji */}
          <span className="text-lg">{link.icon}</span>
          
          {/* Link text - hiển thị trên desktop */}
          <span className="hidden md:inline">{link.name}</span>
        </Link>
      ))}
    </div>
  );
}
