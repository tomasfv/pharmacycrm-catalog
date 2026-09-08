"use client";

import Link from "next/link";
import { Category } from "@/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/categories/${category.id}`} className="block">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
        <div className="aspect-square bg-gray-50 flex items-center justify-center">
          <img src={category.image} alt={category.name} className="w-20 h-20 object-contain opacity-50" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-center">{category.name}</h3>
        </div>
      </div>
    </Link>
  );
}
