"use client";

import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { selectCartItems, selectCartTotal } from "@/store/cartSlice";
import { formatPrice } from "@/utils/format";

export function CartFooter() {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <Link
        href="/cart"
        className="flex items-center justify-between mx-4 mb-4 bg-primary-600 text-white px-6 py-5 rounded-2xl hover:bg-primary-700 transition-colors"
      >
        <span className="text-lg font-semibold">Ver mi pedido</span>
        <span className="text-lg font-bold">{formatPrice(total)}</span>
      </Link>
    </div>
  );
}
