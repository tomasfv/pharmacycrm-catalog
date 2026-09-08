"use client";

import { categories } from "@/data/products";
import { CategoryCard } from "@/components/CategoryCard";

export default function CategoriesPage() {
  return (
    <div>
      <p className="text-gray-500 text-sm mb-4">Elegí una categoría para ver los productos</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
}
