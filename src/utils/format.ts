export function formatPrice(amount: number | string): string {
  const value = typeof amount === "string" ? Number(amount) : amount;
  return `$${value.toLocaleString("es-AR", { maximumFractionDigits: 0 })}`;
}
