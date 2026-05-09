// app/ui/dashboard/sidenav.tsx
// Component navigation sidebar cho dashboard
// Hiển thị links đến các trang chính (Dashboard, Invoices, Customers)
// Sẽ dùng 'use client' vì chapter 5 sẽ thêm active link detection

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideNav() {
  // usePathname() hook lấy URL path hiện tại
  // Dùng để highlight link của trang đang xem
  const pathname = usePathname();

  // Function check xem link có phải trang hiện tại không
  // Dùng để add active styling later
  const isActive = (href: string) => pathname === href;

  // Navigation links - mảng objects chứa thông tin các links
  const navLinks = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      // icon sẽ thêm sau (chapter 5)
    },
    {
      name: 'Invoices',
      href: '/dashboard/invoices',
    },
    {
      name: 'Customers',
      href: '/dashboard/customers',
    },
  ];

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-blue-600 dark:bg-blue-900">
      {/* Sidebar header/logo */}
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-700 dark:bg-blue-800 p-4 md:h-40"
        href="/dashboard"
      >
        {/* Logo text - đơn giản cho đến chapter 5 */}
        <div className="w-32 text-white font-bold text-xl">
          ACME
        </div>
      </Link>

      {/* Navigation links section */}
      <div className="flex grow flex-col justify-between space-y-2 md:flex-col md:space-y-2">
        {/* Links list */}
        <nav className="space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              // className: styling cho link
              // text-white: màu chữ trắng
              // hover:bg-blue-500: hover effect
              // active state sẽ thêm ở chapter 5 (với active link detection)
              className={`flex h-12 grow items-center justify-center gap-2 rounded-md bg-blue-500 dark:bg-blue-700 p-3 text-sm font-medium transition-colors hover:bg-blue-400 dark:hover:bg-blue-600 text-white md:flex-none md:justify-start md:p-2 md:px-3`}
            >
              {/* Icon placeholder - sẽ thêm icons ở chapter 5 */}
              <span className="hidden md:block">
                {link.name}
              </span>
              {/* Text hiển thị trên mobile (chỉ chữ đầu) */}
              <span className="md:hidden">
                {link.name.charAt(0)}
              </span>
            </Link>
          ))}
        </nav>

        {/* Footer area - có thể thêm user info hoặc logout button sau */}
        <div className="hidden h-auto w-full grow rounded-md bg-blue-700 dark:bg-blue-800 md:inline-flex" />
      </div>
    </div>
  );
}
