"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCategories } from "@/store/catalogCategoriesSlice";
import { CategoryCard } from "@/components/CategoryCard";
import { CartFooter } from "@/components/CartFooter";

export default function CategoriesPage() {
  const dispatch = useAppDispatch();
  const { categories, loading } = useAppSelector((state) => state.catalogCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900">Categorías</h1>
      <p className="text-gray-500 text-base mb-5">
        Elegí una categoría para ver los productos
      </p>
      {loading ? (
        <p className="text-gray-400 text-base">Cargando categorías...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      )}
      <CartFooter />
    </div>
  );
}
