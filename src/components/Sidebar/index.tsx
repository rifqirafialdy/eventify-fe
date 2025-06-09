'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import LogoutButton from '../Button/LogoutButton';

const links = [
  { name: 'Dashboard Overview', href: '/dashboard' },
  { name: 'My Events', href: '/dashboard/events' },
  { name: 'Create Event', href: '/dashboard/events/create' },
  { name: 'Participants', href: '/dashboard/participants' },
  { name: 'Earnings & Wallet', href: '/dashboard/revenue' },
  { name: 'Analytics', href: '/dashboard/analytics' },
  { name: 'Settings', href: '/dashboard/settings' },
];

export default function Sidebar({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity md:hidden ',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={toggleSidebar}
      />

      <aside
        className={cn(
          'fixed md:static z-40 bg-white shadow-md w-64 p-6 space-y-4 min-h-screen transition-transform transform',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0'
        )}
      >
        <h2 className="text-xl font-bold text-amber-600 mb-4">Dashboard</h2>
        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'block text-gray-700 hover:text-amber-500 transition',
                pathname === link.href && 'text-amber-600 font-semibold'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <LogoutButton />
      </aside>
    </>
  );
}
