import { describe, it, expect, beforeEach } from '@jest/globals';
import reducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  initCart,
  selectCartTotal,
  selectCartItemCount,
} from './cartSlice';
import type { CartItem } from '@/types';

const state = (items: CartItem[]) => ({ cart: { items } });

const base = {
  productId: 'p1',
  name: 'Ibuprofen',
  price: 100,
  quantity: 1,
};

describe('cartSlice', () => {
  beforeEach(() => localStorage.clear());

  it('addToCart adds a new line', () => {
    const s = reducer(undefined, addToCart(base));
    expect(s.items).toHaveLength(1);
    expect(s.items[0]).toMatchObject({ productId: 'p1', quantity: 1 });
  });

  it('addToCart increments quantity for the same variation (does not duplicate the line)', () => {
    let s = reducer(undefined, addToCart({ ...base, variationId: 'v1' }));
    s = reducer(s, addToCart({ ...base, variationId: 'v1' }));
    expect(s.items).toHaveLength(1);
    expect(s.items[0].quantity).toBe(2);
  });

  it('addToCart creates separate lines for different variations', () => {
    let s = reducer(undefined, addToCart({ ...base, variationId: 'v1' }));
    s = reducer(s, addToCart({ ...base, variationId: 'v2' }));
    expect(s.items).toHaveLength(2);
  });

  it('addToCart with variationLabel shows the label in the name', () => {
    const s = reducer(undefined, addToCart({ ...base, variationId: 'v1', variationLabel: 'Small' }));
    expect(s.items[0].name).toBe('Ibuprofen (Small)');
  });

  it('updateQuantity with 0 removes the line', () => {
    let s = reducer(undefined, addToCart(base));
    s = reducer(s, updateQuantity({ productId: 'p1', quantity: 0 }));
    expect(s.items).toHaveLength(0);
  });

  it('removeFromCart removes only the given line', () => {
    let s = reducer(undefined, addToCart({ ...base, variationId: 'v1' }));
    s = reducer(s, addToCart({ ...base, variationId: 'v2', quantity: 2 }));
    s = reducer(s, removeFromCart({ productId: 'p1', variationId: 'v1' }));
    expect(s.items).toHaveLength(1);
    expect(s.items[0].variationId).toBe('v2');
  });

  it('clearCart empties the cart', () => {
    let s = reducer(undefined, addToCart(base));
    s = reducer(s, clearCart());
    expect(s.items).toHaveLength(0);
  });

  it('selectCartTotal and selectCartItemCount compute correct sums', () => {
    let s = reducer(undefined, addToCart({ ...base, price: 100, quantity: 2 }));
    s = reducer(s, addToCart({ ...base, productId: 'p2', price: 50, quantity: 3 }));
    expect(selectCartTotal(state(s.items))).toBe(350);
    expect(selectCartItemCount(state(s.items))).toBe(5);
  });

  it('persists to localStorage and initCart restores it', () => {
    const s = reducer(undefined, addToCart(base));
    expect(JSON.parse(localStorage.getItem('catalog-cart')!)).toHaveLength(1);
    const restored = reducer({ items: [] }, initCart());
    expect(restored.items).toHaveLength(1);
    expect(restored.items[0].productId).toBe('p1');
  });
});
