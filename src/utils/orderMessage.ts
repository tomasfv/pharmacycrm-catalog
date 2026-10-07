import { formatPrice, formatOrderDateTime } from "./format";

export interface OrderMessageItem {
  name: string;
  quantity: number;
  price: number;
}

export interface OrderMessageInput {
  orderId: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  deliveryLabel: string;
  paymentLabel: string;
  items: OrderMessageItem[];
  total: number;
}

export function buildOrderWhatsAppMessage(input: OrderMessageInput): string {
  const itemsList = input.items
    .map((i) => `${i.quantity}x ${i.name}: ${formatPrice(i.price * i.quantity)}`)
    .join("\n");

  return [
    `_¡Hola! Te paso el resumen de mi pedido_`,
    `*Pedido:* \`\`\`#${input.orderId}\`\`\``,
    ``,
    `*Fecha:* ${formatOrderDateTime(input.createdAt)}`,
    `*Nombre:* ${input.customerName}`,
    `*Teléfono:* ${input.customerPhone}`,
    `*Entrega:* ${input.deliveryLabel}`,
    `*Forma de pago:* ${input.paymentLabel}`,
    `*Total:* ${formatPrice(input.total)}`,
    ``,
    ``,
    `_Mi pedido es_`,
    itemsList,
    `*TOTAL:* *${formatPrice(input.total)}*`,
    `_Espero tu respuesta para confirmar mi pedido_`,
  ].join("\n");
}
