'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Fetch product details based on the ID from the URL
    if (id) {
      async function fetchProduct() {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`https://fakestoreapi.com/products/${id}`);
          if (!res.ok) {
            throw new Error(`Failed to fetch product: ${res.statusText}`);
          }
          const data: Product = await res.json();
          setProduct(data);
        } catch (err) {
          setError('Failed to load product details. Please try again later.');
          console.error('Error fetching product:', err);
        } finally {
          setLoading(false);
        }
      }
      fetchProduct();
    }
  }, [id]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure quantity is a positive number
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else if (e.target.value === '') {
      setQuantity(0); // Allow clearing the input temporarily
    }
  };

  const handleAddToCart = () => {
    // In a real application, this would dispatch an action to add the product to a global cart state
    console.log(`Product "${product?.title}" with quantity ${quantity} added to (simulated) cart.`);
  };

  // Conditional rendering for loading state
  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen" style={{ backgroundColor: '#121212' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
        <p className="text-gray-300 text-lg">Loading product...</p>
      </div>
    );

  // Conditional rendering for error state
  if (error)
    return (
      <div className="flex justify-center items-center h-screen" style={{ backgroundColor: '#121212' }}>
        <p className="p-4 text-red-400 text-lg bg-red-900 border border-red-700 rounded-md">
          Error: {error}
        </p>
      </div>
    );

  // Conditional rendering if product is not found
  if (!product)
    return (
      <div className="flex justify-center items-center h-screen" style={{ backgroundColor: '#121212' }}>
        <p className="text-gray-300 text-lg">Product not found.</p>
      </div>
    );

  return (
    <div
      className="container mx-auto p-6 md:p-8"
      style={{ backgroundColor: '#121212', minHeight: 'calc(100vh - 64px)' }}
    >
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center font-medium transition-colors"
        style={{ color: '#B91C1C' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#EF4444')}
        onMouseLeave={e => (e.currentTarget.style.color = '#B91C1C')}
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Products
      </button>

      <div className="rounded-lg shadow-xl p-6 md:p-10 flex flex-col md:flex-row gap-8" style={{ backgroundColor: '#1E1E1E' }}>
        <div className="md:w-1/2 flex justify-center items-center p-4 rounded-lg" style={{ backgroundColor: '#FFFFFF' }}>
          <img src={product.image} alt={product.title} className="max-h-96 object-contain rounded-md" />
        </div>

        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-4xl font-extrabold mb-3" style={{ color: '#EEEEEE' }}>{product.title}</h1>
          <p className="text-3xl font-bold mb-4" style={{ color: '#22C55E' }}>${product.price.toFixed(2)}</p>
          <p className="mb-6 leading-relaxed" style={{ color: '#D0D0D0' }}>{product.description}</p>
          <p className="text-sm mb-8" style={{ color: '#A0A0A0' }}>Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>

          <div className="mt-auto flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="quantity" className="font-semibold" style={{ color: '#D0D0D0' }}>Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20 p-2 rounded-md text-center"
                style={{
                  backgroundColor: '#2A2A2A',
                  border: '1px solid #444',
                  color: '#EEEEEE',
                }}
                onFocus={(e) => (e.currentTarget.style.outline = '2px solid #22C55E')}
                onBlur={(e) => (e.currentTarget.style.outline = 'none')}
              />
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full sm:flex-1 font-bold py-3 px-6 rounded-md shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#166534', color: '#FFFFFF' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#22C55E')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#166534')}
              disabled={quantity < 1}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}