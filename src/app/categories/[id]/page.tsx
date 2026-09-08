"use client";

import { useParams } from "next/navigation";
import { getCategoryById, getProductsByCategory } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { CartFooter } from "@/components/CartFooter";

export default function CategoryPage() {
  const { id } = useParams();
  const category = getCategoryById(id as string);
  const products = getProductsByCategory(id as string);

  if (!category) {
    return <p className="text-gray-500">Categoría no encontrada.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">{category.name}</h2>
      <p className="text-gray-500 text-sm mb-4">{products.length} productos disponibles</p>
      <div className="space-y-3">
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
      <CartFooter />
    </div>
  );
}
