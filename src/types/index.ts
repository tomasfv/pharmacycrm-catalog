export interface Category {
  id: string;
  name: string;
  image?: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  image?: string;
}

export interface CartItem {
  productId: string;
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
