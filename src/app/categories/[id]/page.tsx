"use client";

import { useParams } from "next/navigation";
import { getCategoryById, getProductsByCategory } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { CartFooter } from "@/components/CartFooter";
import { BackButton } from "@/components/BackButton";

export default function CategoryPage() {
  const { id } = useParams();
  const category = getCategoryById(id as string);
  const products = getProductsByCategory(id as string);

  if (!category) {
    return <p className="text-gray-500 text-lg">Categoría no encontrada.</p>;
  }

  return (
    <div>
      <BackButton title={category.name} />
      <p className="text-gray-500 text-base mb-5">
        {products.length} productos disponibles
      </p>
      <div className="space-y-4">
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
      <CartFooter />
    </div>
  );
}
