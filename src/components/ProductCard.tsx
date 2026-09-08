"use client";

import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/utils/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex w-full">
        <div className="w-32 h-32 bg-gray-50 flex items-center justify-center shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-32 h-32 object-contain opacity-50"
          />
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          <h3 className="font-medium text-gray-900 text-sm leading-snug">
            {product.name}
          </h3>
          <p className="text-primary-600 font-bold">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}
