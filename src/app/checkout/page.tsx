"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCartItems, selectCartTotal, clearCart } from "@/store/cartSlice";
import { formatPrice } from "@/utils/format";
import type { OrderForm } from "@/types";

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
      <div className="text-center py-16">
        <p className="text-gray-500 mb-2">No hay productos en tu pedido</p>
        <button onClick={() => router.push("/categories")} className="text-primary-600 font-medium hover:underline">
          Ver productos
        </button>
      </div>
    );
  }

  const onSubmit = (data: OrderForm) => {
    const itemsList = items
      .map((i) => `• ${i.name} x${i.quantity} — ${formatPrice(i.price * i.quantity)}`)
      .join("\n");

    const deliveryLabel = data.deliveryMethod === "pickup" ? "Retiro en local" : "Envío a domicilio";
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
      <h2 className="text-xl font-bold text-gray-900 mb-4">Último paso</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre y Apellido</label>
          <input
            {...register("fullName")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Tu nombre completo"
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
            {...register("phone")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Ej: 11 1234-5678"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Forma de entrega</label>
          <select
            {...register("deliveryMethod")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="pickup">Retiro en local</option>
            <option value="delivery">Envío a domicilio</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Forma de pago</label>
          <select
            {...register("paymentMethod")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="cash">Efectivo</option>
            <option value="card">Tarjeta</option>
          </select>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total</span>
            <span className="text-xl font-bold text-gray-900">{formatPrice(total)}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
        >
          Pedir por WhatsApp
        </button>
      </form>
    </div>
  );
}
