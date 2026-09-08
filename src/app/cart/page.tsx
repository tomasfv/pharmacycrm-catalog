"use client";

import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  selectCartItems,
  selectCartTotal,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "@/store/cartSlice";
import { formatPrice } from "@/utils/format";
import { BackButton } from "@/components/BackButton";

export default function CartPage() {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg mb-4">Tu pedido está vacío</p>
        <Link
          href="/categories"
          className="text-primary-600 font-medium text-lg hover:underline"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div>
      <BackButton title="Mi Pedido" />

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div
            key={item.productId}
            className="bg-white rounded-2xl border border-gray-100 p-5"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-gray-900 text-base flex-1 pr-3">
                {item.name}
              </h3>
              <button
                onClick={() => dispatch(removeFromCart(item.productId))}
                className="text-gray-400 hover:text-red-500 text-base"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center border-2 border-gray-300 rounded-xl">
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        productId: item.productId,
                        quantity: item.quantity - 1,
                      }),
                    )
                  }
                  className="px-4 py-2 text-gray-600 hover:bg-gray-50 text-base"
                >
                  −
                </button>
                <span className="px-4 py-2 font-bold text-base min-w-[40px] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        productId: item.productId,
                        quantity: item.quantity + 1,
                      }),
                    )
                  }
                  className="px-4 py-2 text-gray-600 hover:bg-gray-50 text-base"
                >
                  +
                </button>
              </div>
              <span className="font-bold text-gray-900 text-lg">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-lg">Total</span>
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href="/checkout"
          className="block w-full bg-primary-600 text-white text-center py-4 rounded-2xl text-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Confirmar pedido
        </Link>
        <button
          onClick={() => dispatch(clearCart())}
          className="w-full bg-gray-100 text-gray-600 py-4 rounded-2xl text-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Vaciar pedido
        </button>
      </div>
    </div>
  );
}
