'use client';

import AuthGuard from '@/components/AuthGuard';
import Navbar from '@/components/Navbar';
import ProductsList from '@/components/ProductsList';

export default function ProductsPage() {
  return (
    <AuthGuard>
      <Navbar />
      <ProductsList />
    </AuthGuard>
  );
}
