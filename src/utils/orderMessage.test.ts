import { describe, it, expect } from "@jest/globals";
import { buildOrderWhatsAppMessage } from "./orderMessage";

const base = {
  orderId: "03a6400b-c7ca-492d-9556-53923ef866a2",
  createdAt: "2026-08-31T22:35:00.000Z",
  customerName: "John Doe",
  customerPhone: "11 0000-0000",
  deliveryLabel: "Retiro en el local",
  paymentLabel: "Efectivo",
  items: [{ name: "Ibuprofeno 400mg", quantity: 2, price: 6000 }],
  total: 12000,
};

describe("buildOrderWhatsAppMessage", () => {
  it("builds the full message with order id, summary fields and item lines", () => {
    const message = buildOrderWhatsAppMessage(base);

    expect(message).toContain("_¡Hola! Te paso el resumen de mi pedido_");
    expect(message).toContain(`*Pedido:* \`\`\`#${base.orderId}\`\`\``);
    expect(message).toMatch(/\*Fecha:\* \d{2}\/\d{2}\/\d{2} - \d{2}:\d{2}hs/);
    expect(message).toContain("*Nombre:* John Doe");
    expect(message).toContain("*Teléfono:* 11 0000-0000");
    expect(message).toContain("*Entrega:* Retiro en el local");
    expect(message).toContain("*Forma de pago:* Efectivo");
    expect(message).toContain("*Total:* $12.000");
    expect(message).toContain("_Mi pedido es_");
    expect(message).toContain("2x Ibuprofeno 400mg: $12.000");
    expect(message).toContain("*TOTAL:* *$12.000*");
    expect(message).toContain("_Espero tu respuesta para confirmar mi pedido_");
  });

  it("renders one line per item without group headers", () => {
    const message = buildOrderWhatsAppMessage({
      ...base,
      items: [
        { name: "Paracetamol 500mg", quantity: 3, price: 2000 },
        { name: "Amoxicilina 500mg", quantity: 1, price: 1500 },
      ],
      total: 7500,
    });

    expect(message).toContain("3x Paracetamol 500mg: $6.000");
    expect(message).toContain("1x Amoxicilina 500mg: $1.500");
    expect(message).toContain("*TOTAL:* *$7.500*");
    const lines = message.split("\n");
    expect(lines[lines.indexOf("_Mi pedido es_") + 2]).toBe(
      "1x Amoxicilina 500mg: $1.500",
    );
  });

  it("shows delivery label for delivery orders", () => {
    const message = buildOrderWhatsAppMessage({
      ...base,
      deliveryLabel: "Envío a domicilio",
      paymentLabel: "Tarjeta",
    });

    expect(message).toContain("*Entrega:* Envío a domicilio");
    expect(message).toContain("*Forma de pago:* Tarjeta");
  });
});
