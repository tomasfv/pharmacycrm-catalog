"use client";

import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/utils/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
        <div className="aspect-square bg-gray-50 flex items-center justify-center">
          <img src={product.image} alt={product.name} className="w-24 h-24 object-contain opacity-50" />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">{product.name}</h3>
          <p className="text-primary-600 font-bold">{formatPrice(product.price)}</p>
        </div>
      </div>
    </Link>
  );
}
