import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import ProductsClientPage from '@/components/products/ProductsClientPage';

export const metadata = {
  title: 'Product Categories Catalogue | Electrical, Mechanical & Solar Trading',
  description:
    'Browse 57 technical product categories grouped by family: Lightning Protection (LP), Earthing Systems (ER), Lighting (LT), Cable Management (CM), Cables (CB), Conduits (CT), Electrical (EL), Solar Energy (EN), Mechanical (ME), Safety & Hardware.',
};

export const revalidate = 60;

export default async function ProductsPage() {
  const categories = await db.productCategory.findMany({
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-widest bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-3.5 py-1 rounded-full inline-block">
          Authorised Distribution Catalogue
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineering Product Categories
        </h1>
        <p className="text-sm text-[#A9B4C0] leading-relaxed">
          Explore our range of priority lightning protection, earthing networks, mechanical fittings, and electrical distribution products. Select any category to view technical families or submit a pricing enquiry.
        </p>
      </div>

      {/* Filterable Products Client Section */}
      <ProductsClientPage categories={categories} />
    </div>
  );
}
