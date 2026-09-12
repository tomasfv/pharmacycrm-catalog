"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProduct, clearCurrentProduct } from "@/store/catalogProductsSlice";
import { addToCart, selectCartItems } from "@/store/cartSlice";
import { formatPrice } from "@/utils/format";
import { BackButton } from "@/components/BackButton";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const { currentProduct: product, loading } = useAppSelector((state) => state.catalogProducts);
  const { categories } = useAppSelector((state) => state.catalogCategories);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id as string));
    }
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id]);

  if (loading) {
    return <p className="text-gray-400 text-lg">Cargando producto...</p>;
  }

  if (!product) {
    return <p className="text-gray-500 text-lg">Producto no encontrado.</p>;
  }

  const category = categories.find((c) => c.id === product.categoryId);
  const cartItem = cartItems.find((i) => i.productId === product.id);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleAdd = () => {
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
      }),
    );
    router.push(`/categories/${product.categoryId}`);
  };

  return (
    <div>
      <BackButton title={product.name} />
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
        <div className="aspect-square bg-gray-50 flex items-center justify-center">
          <img
            src={product.imageUrl || "/perfume.webp"}
            alt={product.name}
            className="w-48 h-48 object-contain opacity-50"
          />
        </div>
      </div>

      <div className="space-y-5">
        <p className="text-sm text-gray-400 uppercase tracking-wide">
          {category?.name}
        </p>
        <p className="text-2xl font-bold text-primary-600">
          {formatPrice(product.price)}
        </p>

        <p className="text-gray-600 text-base leading-relaxed">
          {product.description}
        </p>

        {cartItem && (
          <p className="text-base text-gray-500">
            Ya tenés {cartItem.quantity} en tu pedido (
            {formatPrice(cartItem.price * cartItem.quantity)})
          </p>
        )}

        <div className="flex items-center gap-5">
          <div className="flex items-center border-2 border-gray-300 rounded-xl">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-5 py-3 text-gray-600 hover:bg-gray-50 text-lg"
            >
              −
            </button>
            <span className="px-6 py-3 font-bold text-gray-900 text-lg min-w-[56px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-5 py-3 text-gray-600 hover:bg-gray-50 text-lg"
            >
              +
            </button>
          </div>
          <span className="text-gray-500 text-base"></span>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center justify-between px-4 w-full bg-primary-600 text-white py-4 rounded-2xl text-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          <span className="text-lg font-semibold">Agregar al carrito</span>
          <span className="text-lg font-bold">
            {formatPrice(product.price * quantity)}
          </span>
        </button>

        {cartTotal > 0 && (
          <button
            onClick={() => router.push("/cart")}
            className="w-full bg-gray-100 text-gray-700 py-4 rounded-2xl text-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Ver mi pedido
          </button>
        )}
      </div>
    </div>
  );
}
