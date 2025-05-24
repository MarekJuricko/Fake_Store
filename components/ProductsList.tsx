'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductsList() {
  const router = useRouter();

  // State for managing products, categories, loading status, and errors
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products and categories on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all products
        const productsRes = await fetch('https://fakestoreapi.com/products');
        if (!productsRes.ok) {
          throw new Error(`Failed to fetch products: ${productsRes.statusText}`);
        }
        const productsData: Product[] = await productsRes.json();
        setProducts(productsData);
        setFilteredProducts(productsData); // Initialize filtered products with all products

        // Fetch all available categories
        const categoriesRes = await fetch('https://fakestoreapi.com/products/categories');
        if (!categoriesRes.ok) {
          throw new Error(`Failed to fetch categories: ${categoriesRes.statusText}`);
        }
        const categoriesData: string[] = await categoriesRes.json();
        setCategories(['all', ...categoriesData]); // Add 'all' option for filtering
      } catch (err) {
        // Handle and display fetch errors
        setError('Failed to load data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false); // End loading state
      }
    }
    fetchData();
  }, []);

  // Filter products whenever the selected category or the original product list changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  // Handler for category selection change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  // --- Conditional Rendering ---
  // Display loading state
  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
        <p className="text-gray-600 text-lg">Loading products...</p>
      </div>
    );

  // Display error state
  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="p-4 text-red-600 text-lg bg-red-100 border border-red-400 rounded-md">
          Error: {error}
        </p>
      </div>
    );

  return (
    <div
      className="p-6"
      style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}
    >
      {/* Filter Section */}
      <div className="mb-8 flex justify-start">
        <div className="relative inline-block w-full sm:w-64">
          <select
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-3 pr-8 rounded-lg shadow-sm leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium cursor-pointer transition-all duration-200 ease-in-out"
            style={{ color: '#111' }}
            aria-label="Filter by category"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Products' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Message for no products found after filtering */}
      {filteredProducts.length === 0 && !loading && !error && (
        <div className="flex justify-center items-center h-48 bg-white rounded-lg shadow-md mt-6">
          <p className="text-gray-600 text-lg">No products found for this category.</p>
        </div>
      )}

      {/* Product Grid Display */}
      {filteredProducts.length > 0 && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map(({ id, title, price, image }) => (
            <div
              key={id}
              className="rounded-lg p-4 shadow-md cursor-pointer flex flex-col transition-all duration-300 hover:scale-105 hover:bg-gray-50"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #ddd',
                color: '#111',
              }}
              onClick={() => router.push(`/products/${id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  router.push(`/products/${id}`);
                }
              }}
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
      )}
    </div>
  );
}