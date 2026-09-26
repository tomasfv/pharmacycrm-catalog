"use client";

import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/utils/format";

export function ProductCard({ product }: { product: Product }) {
  const variations = product.variations ?? [];
  const hasVariations = variations.length > 0;
  const minVariationPrice = hasVariations
    ? Math.min(...variations.map((v) => v.price))
    : null;

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow flex w-full">
        <div className="w-36 h-36 bg-gray-50 flex items-center justify-center shrink-0">
          <img
            src={
              product.imageUrl || product.image || "/logoFarmaciaSmallV.jpeg"
            }
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
          <h3 className="font-medium text-gray-900 text-base leading-snug">
            {product.name}
          </h3>
          <p className="text-primary-600 font-bold text-lg">
            {hasVariations
              ? `Desde ${formatPrice(minVariationPrice!)}`
              : formatPrice(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}
