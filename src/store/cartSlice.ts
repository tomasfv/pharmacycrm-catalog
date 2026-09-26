import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
}

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("catalog-cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("catalog-cart", JSON.stringify(items));
}

const sameLine = (
  item: CartItem,
  productId: string,
  variationId?: string,
) => item.productId === productId && item.variationId === variationId;

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initCart(state) {
      state.items = loadCart();
    },
    addToCart(
      state,
      action: PayloadAction<{
        productId: string;
        variationId?: string;
        variationLabel?: string;
        name: string;
        price: number;
        quantity: number;
      }>
    ) {
      const { productId, variationId, variationLabel, name, price, quantity } =
        action.payload;
      const displayName = variationLabel
        ? `${name} (${variationLabel})`
        : name;
      const existing = state.items.find((i) =>
        sameLine(i, productId, variationId),
      );
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ productId, variationId, name: displayName, price, quantity });
      }
      saveCart(state.items);
    },
    removeFromCart(
      state,
      action: PayloadAction<{ productId: string; variationId?: string }>
    ) {
      const { productId, variationId } = action.payload;
      state.items = state.items.filter((i) => !sameLine(i, productId, variationId));
      saveCart(state.items);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ productId: string; variationId?: string; quantity: number }>
    ) {
      const { productId, variationId, quantity } = action.payload;
      const item = state.items.find((i) => sameLine(i, productId, variationId));
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => !sameLine(i, productId, variationId));
        }
      }
      saveCart(state.items);
    },
    clearCart(state) {
      state.items = [];
      saveCart(state.items);
    },
  },
});

export const { initCart, addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);

export default cartSlice.reducer;
