"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCartItems, selectCartTotal, clearCart } from "@/store/cartSlice";
import { formatPrice } from "@/utils/format";
import type { OrderForm } from "@/types";
import { BackButton } from "@/components/BackButton";

const schema = yup.object({
  fullName: yup.string().required("El nombre es obligatorio"),
  phone: yup.string().required("El teléfono es obligatorio"),
  deliveryMethod: yup.string().oneOf(["pickup", "delivery"]).required(),
  paymentMethod: yup.string().oneOf(["cash", "card"]).required(),
});

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      deliveryMethod: "pickup",
      paymentMethod: "cash",
    },
  });

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg mb-2">
          No hay productos en tu pedido
        </p>
        <button
          onClick={() => router.push("/categories")}
          className="text-primary-600 font-medium text-lg hover:underline"
        >
          Ver productos
        </button>
      </div>
    );
  }

  const onSubmit = (data: OrderForm) => {
    const itemsList = items
      .map(
        (i) =>
          `• ${i.name} x${i.quantity} — ${formatPrice(i.price * i.quantity)}`,
      )
      .join("\n");

    const deliveryLabel =
      data.deliveryMethod === "pickup"
        ? "Retiro en local"
        : "Envío a domicilio";
    const paymentLabel = data.paymentMethod === "cash" ? "Efectivo" : "Tarjeta";

    const message = [
      `Hola, quiero hacer un pedido:`,
      ``,
      itemsList,
      ``,
      `Total: ${formatPrice(total)}`,
      ``,
      `Nombre: ${data.fullName}`,
      `Teléfono: ${data.phone}`,
      `Entrega: ${deliveryLabel}`,
      `Pago: ${paymentLabel}`,
    ].join("\n");

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5493517619943?text=${encoded}`, "_blank");
    dispatch(clearCart());
    router.push("/categories");
  };

  return (
    <div>
      <BackButton title="Último paso" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Nombre y Apellido
          </label>
          <input
            {...register("fullName")}
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Tu nombre completo"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Teléfono
          </label>
          <input
            {...register("phone")}
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Ej: 11 1234-5678"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Forma de entrega
          </label>
          <select
            {...register("deliveryMethod")}
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="pickup">Retiro en local</option>
            <option value="delivery">Envío a domicilio</option>
          </select>
        </div>

        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Forma de pago
          </label>
          <select
            {...register("paymentMethod")}
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="cash">Efectivo</option>
            <option value="card">Tarjeta</option>
          </select>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-lg">Total</span>
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(total)}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-4 rounded-2xl text-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Pedir por WhatsApp
        </button>
      </form>
    </div>
  );
}
