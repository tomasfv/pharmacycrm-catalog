export interface Category {
  id: string;
  name: string;
  image?: string;
}

export interface ProductVariation {
  id: string;
  productId?: string;
  label: string;
  price: number;
  inStock: boolean;
  sortOrder?: number;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  image?: string;
  variations?: ProductVariation[];
}

export interface CartItem {
  productId: string;
  variationId?: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderForm {
  fullName: string;
  phone: string;
  deliveryMethod: "pickup" | "delivery";
  paymentMethod: "cash" | "card";
}
