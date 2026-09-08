"use client";

import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCartItems, selectCartTotal, updateQuantity, removeFromCart, clearCart } from "@/store/cartSlice";
import { formatPrice } from "@/utils/format";

export default function CartPage() {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 mb-4">Tu pedido está vacío</p>
        <Link href="/categories" className="text-primary-600 font-medium hover:underline">
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Mi Pedido</h2>

      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <div key={item.productId} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900 text-sm flex-1 pr-2">{item.name}</h3>
              <button
                onClick={() => dispatch(removeFromCart(item.productId))}
                className="text-gray-400 hover:text-red-500 text-sm"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() =>
                    dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity - 1 }))
                  }
                  className="px-3 py-1 text-gray-600 hover:bg-gray-50 text-sm"
                >
                  −
                </button>
                <span className="px-3 py-1 font-medium text-sm min-w-[36px] text-center">{item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity + 1 }))
                  }
                  className="px-3 py-1 text-gray-600 hover:bg-gray-50 text-sm"
                >
                  +
                </button>
              </div>
              <span className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total</span>
          <span className="text-xl font-bold text-gray-900">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href="/checkout"
          className="block w-full bg-primary-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
        >
          Confirmar pedido
        </Link>
        <button
          onClick={() => dispatch(clearCart())}
          className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          Vaciar pedido
        </button>
      </div>
    </div>
  );
}
