// app/ui/user-info.tsx
// Chapter 14: User Information Component
// Server Component displaying current user info in dashboard
// Shows user avatar, name, and logout button

import { getSession } from '@/app/lib/auth';
import LogoutButton from '@/app/ui/logout-button';
import Image from 'next/image';

export default async function UserInfo() {
  const session = await getSession();

  // If no session, don't display user info
  if (!session?.user) {
    return null;
  }

  const user = session.user;

  return (
    <div
      className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
      role="status"
      aria-live="polite"
    >
      {/* User Info Section */}
      <div className="flex items-center gap-4">
        {/* User Avatar */}
        {user.image && (
          <div className="relative h-10 w-10 flex-shrink-0 rounded-full overflow-hidden">
            <Image
              src={user.image}
              alt={user.name || 'User avatar'}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* User Details */}
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-900">
            {user.name || 'User'}
          </p>
          {user.email && (
            <p className="text-xs text-gray-600">{user.email}</p>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <LogoutButton />
    </div>
  );
}
