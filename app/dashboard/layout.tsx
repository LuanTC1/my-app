// app/dashboard/layout.tsx
// Layout được share giữa tất cả dashboard pages (/dashboard, /dashboard/customers, /dashboard/invoices)
// Nó sẽ hiển thị SideNav bên trái, content bên phải

import type { Metadata } from 'next';
import SideNav from '@/app/ui/dashboard/sidenav';
import UserInfo from '@/app/ui/user-info';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your Acme Dashboard',
};

export default function DashboardLayout({
  // children: React component content của page hiện tại
  // Có thể là dashboard/page, dashboard/customers/page, hoặc dashboard/invoices/page
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Container chính: flex layout - SideNav + Content
    // h-screen: full height của viewport
    // flex-col md:flex-row: column trên mobile, row trên desktop
    // md:overflow-hidden: desktop không scroll, chỉ content scroll
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">

      {/* SideNav section - bên trái */}
      {/* w-full md:w-64: full width trên mobile, 256px (64 * 4px) trên desktop */}
      {/* flex-none: không grow/shrink, fixed width */}
      <div className="w-full flex-none md:w-64">
        {/* SideNav component - navigation sidebar */}
        <SideNav />
      </div>

      {/* Main content section - bên phải */}
      {/* grow: chiếm toàn bộ space còn lại sau SideNav */}
      {/* p-6 md:overflow-y-auto md:p-12: padding + scrollable nếu content dài */}
      <div className="grow p-6 md:overflow-y-auto md:p-12">
        {/* children: nội dung của page hiện tại */}
        {/* Được render ở vị trí này - dashboard/page, customers/page, hoặc invoices/page */}
        <div className="mb-8">
          <UserInfo />
        </div>
        {children}
      </div>
    </div>
  );
}
