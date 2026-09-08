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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-5 z-50 shadow-lg">
      <Link
        href="/cart"
        className="block w-full bg-primary-600 text-white text-center py-4 rounded-2xl text-lg font-semibold hover:bg-primary-700 transition-colors"
      >
        Ver mi pedido — {formatPrice(total)}
      </Link>
    </div>
  );
}
