"use client";

import Link from "next/link";
import { Category } from "@/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/categories/${category.id}`} className="block">
      <div className="relative aspect-[21/9] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
        <img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-white font-bold text-2xl drop-shadow-lg">{category.name}</h3>
        </div>
      </div>
    </Link>
  );
}
