'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    localStorage.setItem('token', 'fake-jwt-token');
    router.push('/products');
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#121212' }}>
      <form
        onSubmit={handleSubmit}
        className="rounded-lg shadow-xl max-w-md w-full p-8"
        style={{ backgroundColor: '#1E1E1E' }}
      >
        <h1 className="text-3xl font-bold mb-8 text-white text-center">
          Login
        </h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <label className="block mb-2 font-semibold text-gray-300">Email</label>
        <input
          type="email"
          className="w-full rounded px-3 py-2 mb-6 text-white"
          style={{
            backgroundColor: '#2A2A2A',
            border: '1px solid #444',
          }}
          onFocus={(e) => (e.currentTarget.style.outline = '2px solid #22C55E')}
          onBlur={(e) => (e.currentTarget.style.outline = 'none')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          required
        />

        <label className="block mb-2 font-semibold text-gray-300">Password</label>
        <input
          type="password"
          className="w-full rounded px-3 py-2 mb-6 text-white"
          style={{
            backgroundColor: '#2A2A2A',
            border: '1px solid #444',
          }}
          onFocus={(e) => (e.currentTarget.style.outline = '2px solid #22C55E')}
          onBlur={(e) => (e.currentTarget.style.outline = 'none')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          required
        />

        <button
          type="submit"
          className="w-full rounded py-3 font-semibold text-white transition"
          style={{ backgroundColor: '#166534' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#22C55E')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#166534')}
        >
          Log In
        </button>

        <p className="mt-6 text-sm text-center text-gray-400">
          Don't have an account?{' '}
          <a
            href="/register"
            className="font-semibold transition"
            style={{ color: '#B91C1C' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#EF4444')}
            onMouseLeave={e => (e.currentTarget.style.color = '#B91C1C')}
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
