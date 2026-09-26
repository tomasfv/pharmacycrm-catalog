"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProduct,
  clearCurrentProduct,
} from "@/store/catalogProductsSlice";
import { addToCart, selectCartItems } from "@/store/cartSlice";
import { formatPrice } from "@/utils/format";
import { BackButton } from "@/components/BackButton";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const { currentProduct: product, loading } = useAppSelector(
    (state) => state.catalogProducts,
  );
  const { categories } = useAppSelector((state) => state.catalogCategories);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariationId, setSelectedVariationId] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id as string));
    }
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!product) {
      setSelectedVariationId(null);
      return;
    }
    const variations = product.variations ?? [];
    if (variations.length === 0) {
      setSelectedVariationId(null);
      return;
    }
    const stillValid = variations.some((v) => v.id === selectedVariationId);
    if (!stillValid) {
      const first =
        variations.find((v) => v.inStock) ?? variations[0];
      setSelectedVariationId(first.id);
    }
  }, [product, selectedVariationId]);

  if (loading) {
    return <p className="text-gray-400 text-lg">Cargando producto...</p>;
  }

  if (!product) {
    return <p className="text-gray-500 text-lg">Producto no encontrado.</p>;
  }

  const category = categories.find((c) => c.id === product.categoryId);
  const variations = product.variations ?? [];
  const selectedVariation =
    variations.find((v) => v.id === selectedVariationId) ?? null;
  const displayPrice = selectedVariation ? selectedVariation.price : product.price;
  const canAdd =
    variations.length === 0 || (!!selectedVariation && selectedVariation.inStock);
  const cartItem = cartItems.find(
    (i) => i.productId === product.id && i.variationId === selectedVariation?.id,
  );
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleAdd = () => {
    if (!canAdd) return;
    dispatch(
      addToCart({
        productId: product.id,
        variationId: selectedVariation?.id,
        variationLabel: selectedVariation?.label,
        name: product.name,
        price: displayPrice,
        quantity,
      }),
    );
    router.push(`/categories/${product.categoryId}`);
  };

  return (
    <div>
      <BackButton title={product.name} />
      <div className="bg-white rounded-2xl overflow-hidden mb-6">
        <div className="max-h-56 bg-gray-50 flex items-center justify-center">
          <img
            src={product.imageUrl || "/logoFarmaciaSmallV.jpeg"}
            alt={product.name}
            className="max-h-52 object-contain rounded-2xl"
          />
        </div>
      </div>

      <div className="space-y-5">
        <p className="text-sm text-gray-400 uppercase tracking-wide">
          {category?.name}
        </p>
        <p className="text-2xl font-bold text-primary-600">
          {formatPrice(displayPrice)}
        </p>

        <p className="text-gray-600 text-base leading-relaxed">
          {product.description}
        </p>

        {variations.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              Elegí una opción
            </p>
            <div className="flex flex-wrap gap-2">
              {variations.map((v) => {
                const selected = v.id === selectedVariationId;
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariationId(v.id)}
                    disabled={!v.inStock}
                    className={`flex flex-col items-start gap-0.5 px-4 py-2.5 rounded-xl border-2 transition-colors ${
                      !v.inStock
                        ? "border-gray-200 opacity-50 cursor-not-allowed"
                        : selected
                          ? "border-primary-600 bg-primary-50"
                          : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-sm font-semibold text-gray-900">
                      {v.label}
                    </span>
                    <span className="text-sm font-bold text-primary-600">
                      {formatPrice(v.price)}
                    </span>
                    {!v.inStock && (
                      <span className="text-xs text-gray-400">Sin stock</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

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
          disabled={!canAdd}
          className={`flex items-center justify-between px-4 w-full py-4 rounded-2xl text-lg font-semibold transition-colors ${
            canAdd
              ? "bg-primary-600 text-white hover:bg-primary-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <span className="text-lg font-semibold">
            {canAdd ? "Agregar al carrito" : "Sin disponibilidad"}
          </span>
          <span className="text-lg font-bold">
            {formatPrice(displayPrice * quantity)}
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
