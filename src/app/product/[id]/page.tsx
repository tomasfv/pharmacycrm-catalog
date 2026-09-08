"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById, getCategoryById } from "@/data/products";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, selectCartItems } from "@/store/cartSlice";
import { formatPrice } from "@/utils/format";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  const product = getProductById(id as string);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <p className="text-gray-500">Producto no encontrado.</p>;
  }

  const category = getCategoryById(product.categoryId);
  const cartItem = cartItems.find((i) => i.productId === product.id);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleAdd = () => {
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
      })
    );
    router.push(`/categories/${product.categoryId}`);
  };

  return (
    <div>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
        <div className="aspect-square bg-gray-50 flex items-center justify-center">
          <img src={product.image} alt={product.name} className="w-40 h-40 object-contain opacity-50" />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{category?.name}</p>
          <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
          <p className="text-2xl font-bold text-primary-600 mt-2">{formatPrice(product.price)}</p>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

        {cartItem && (
          <p className="text-sm text-gray-500">
            Ya tenés {cartItem.quantity} en tu pedido ({formatPrice(cartItem.price * cartItem.quantity)})
          </p>
        )}

        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 text-gray-600 hover:bg-gray-50"
            >
              −
            </button>
            <span className="px-4 py-2 font-medium text-gray-900 min-w-[48px] text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-50"
            >
              +
            </button>
          </div>
          <span className="text-gray-500 text-sm">= {formatPrice(product.price * quantity)}</span>
        </div>

        <button
          onClick={handleAdd}
          className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
        >
          Agregar al carrito — {formatPrice(product.price * quantity)}
        </button>

        {cartTotal > 0 && (
          <button
            onClick={() => router.push("/cart")}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Ver mi pedido — {formatPrice(cartTotal)}
          </button>
        )}
      </div>
    </div>
  );
}
