'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function ProductsList() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading)
    return (
      <p className="p-4 text-gray-600" style={{ backgroundColor: '#f0f0f0' }}>
        Loading products...
      </p>
    );
  if (error)
    return (
      <p className="p-4 text-red-600" style={{ backgroundColor: '#f0f0f0' }}>
        Error: {error}
      </p>
    );

  return (
    <div
      className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}
    >
      {products.map(({ id, title, price, image }) => (
        <div
          key={id}
          className="rounded-lg p-4 shadow-md cursor-pointer flex flex-col transition"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #ddd',
            color: '#111',
          }}
          onClick={() => router.push(`/products/${id}`)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') router.push(`/products/${id}`);
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#f5f5f5')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = '#ffffff')
          }
        >
          <img
            src={image}
            alt={title}
            className="h-48 w-full object-contain mb-4"
            style={{ filter: 'brightness(1)' }}
          />
          <h3 className="font-semibold mb-2" style={{ color: '#111' }}>
            {title}
          </h3>
          <p className="font-bold text-lg" style={{ color: '#22C55E' }}>
            ${price.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}
