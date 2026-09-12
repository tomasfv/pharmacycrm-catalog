"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/catalogProductsSlice";
import { ProductCard } from "@/components/ProductCard";
import { CartFooter } from "@/components/CartFooter";
import { BackButton } from "@/components/BackButton";

export default function CategoryPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.catalogProducts);
  const { categories } = useAppSelector((state) => state.catalogCategories);

  const category = categories.find((c) => c.id === id);

  useEffect(() => {
    dispatch(fetchProducts(id as string));
  }, [dispatch, id]);

  return (
    <div>
      <BackButton title={category?.name || "Categoría"} />
      <p className="text-gray-500 text-base mb-5">
        {loading ? "Cargando productos..." : `${products.length} productos disponibles`}
      </p>
      {!loading && (
        <div className="space-y-4">
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
      <CartFooter />
    </div>
  );
}
