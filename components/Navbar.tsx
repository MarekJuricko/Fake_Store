'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem('token');
    router.push('/login');
  }

  return (
    <nav
      className="px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50"
      style={{ backgroundColor: '#121212', color: '#EEEEEE' }}
    >
      <Link
        href="/products"
        className="text-xl font-extrabold tracking-wide hover:text-gray-400 transition-colors"
      >
        Fake Store
      </Link>

      <button
        onClick={logout}
        className="font-semibold px-5 py-2 rounded-md shadow-sm transition-colors"
        style={{
          backgroundColor: '#292929',
          color: '#EEEEEE',
          border: '1px solid #444',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#B91C1C'; 
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.borderColor = '#EF4444';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#292929';
          e.currentTarget.style.color = '#EEEEEE';
          e.currentTarget.style.borderColor = '#444';
        }}
        aria-label="Logout"
      >
        Logout
      </button>
    </nav>
  );
}
