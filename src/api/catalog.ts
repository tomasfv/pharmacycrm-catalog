import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const api = axios.create({ baseURL: API_URL });

export interface ApiCategory {
  id: string;
  name: string;
  image?: string;
}

export interface ApiProduct {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
  description?: string;
  inStock: boolean;
  category?: ApiCategory;
}

export interface ApiOrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface ApiOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryMethod: "pickup" | "delivery";
  paymentMethod: "cash" | "card";
  items: ApiOrderItem[];
  total: number;
  createdAt: string;
}

export const catalogApi = {
  getCategories: () => api.get<{ success: boolean; data: ApiCategory[] }>("/public/catalog/categories"),
  getProducts: (categoryId?: string) =>
    api.get<{ success: boolean; data: ApiProduct[] }>("/public/catalog/products", {
      params: categoryId ? { categoryId } : {},
    }),
  getProduct: (id: string) =>
    api.get<{ success: boolean; data: ApiProduct }>(`/public/catalog/products/${id}`),
  createOrder: (data: {
    customerName: string;
    customerPhone: string;
    deliveryMethod: "pickup" | "delivery";
    paymentMethod: "cash" | "card";
    items: ApiOrderItem[];
  }) => api.post<{ success: boolean; data: ApiOrder }>("/public/catalog/orders", data),
};
