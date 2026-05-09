// app/ui/dashboard/sidenav.tsx
// Component navigation sidebar cho dashboard
// Layout: Logo trên cùng, navigation links ở giữa
// Chapter 5 features: Link component, usePathname(), active link highlighting

'use client'; // Client Component vì render NavLinks (Client Component)

import Link from 'next/link'; // Link component cho navigation
import NavLinks from '@/app/ui/dashboard/nav-links'; // Import NavLinks component

export default function SideNav() {

  return (
    // Container: flex column, full height, blue background
    // md:h-screen: desktop full height, mobile scrollable
    <div className="flex h-auto md:h-screen flex-col px-3 py-4 md:px-2 bg-blue-600 dark:bg-blue-900">
      {/* Logo/Branding section */}
      {/* Link đến /dashboard khi click logo */}
      {/* h-20 md:h-40: mobile nhỏ, desktop lớn hơn */}
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-700 dark:bg-blue-800 p-4 md:h-40"
        href="/dashboard"
      >
        {/* Logo text */}
        <div className="w-32 text-white font-bold text-xl">
          ACME
        </div>
      </Link>

      {/* Navigation links section */}
      {/* flex-col: vertical layout */}
      {/* w-full: ensure nav takes full width */}
      <div className="flex grow flex-col space-y-2">
        {/* NavLinks component - chứa Dashboard, Invoices, Customers links */}
        {/* Có active link detection và conditional styling */}
        {/* w-full: make nav-links container full width */}
        <nav className="w-full">
          <NavLinks />
        </nav>

        {/* Footer area placeholder - có thể thêm user info hoặc logout button sau */}
        {/* hidden md:inline: ẩn trên mobile, hiển thị trên desktop */}
        <div className="hidden h-auto w-full grow rounded-md bg-blue-700 dark:bg-blue-800 md:inline-flex" />
      </div>
    </div>
  );
}
