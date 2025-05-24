import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

async function fetchProduct(id: string): Promise<Product | null> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id);
  if (!product) return notFound();

  return (
    <div
      className="min-h-screen p-4 sm:p-6 lg:p-12"
      style={{ backgroundColor: '#121212', color: '#eee' }}
    >
      <div className="max-w-5xl mx-auto bg-[#1E1E1E] rounded-2xl p-6 sm:p-10 shadow-xl border border-[#333]">
        <div className="mb-6">
          <Link
            href="/products"
            className="text-sm font-semibold text-red-500 hover:text-red-400 transition-colors"
          >
            &larr; Back to Products
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="h-80 sm:h-96 object-contain rounded-lg shadow-md bg-white p-4"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-xl font-semibold mb-4 text-green-500">
              ${product.price}
            </p>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
