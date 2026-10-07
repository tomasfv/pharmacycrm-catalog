export function formatPrice(amount: number | string): string {
  const value = typeof amount === "string" ? Number(amount) : amount;
  return `$${value.toLocaleString("es-AR", { maximumFractionDigits: 0 })}`;
}

const pad = (n: number): string => String(n).padStart(2, "0");

export function formatOrderDateTime(iso: string): string {
  const d = new Date(iso);
  const date = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${pad(d.getFullYear() % 100)}`;
  const time = `${pad(d.getHours())}:${pad(d.getMinutes())}hs`;
  return `${date} - ${time}`;
}
