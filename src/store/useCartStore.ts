"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Coupon } from "@/types";

interface CartStore {
  items: CartItem[];
  coupon: Coupon | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => boolean;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingFee: () => number;
  getTotalAmount: () => number;
  getTotalItems: () => number;
}

const SHIPPING_FLAT_RATE = 250;
const FREE_SHIPPING_THRESHOLD = 3000;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      isOpen: false,

      setIsOpen: (open) => set({ isOpen: open }),

      addItem: (item, quantity = 1) => {
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((i) => i.variantId === item.variantId);

        if (existingIndex > -1) {
          const existingItem = currentItems[existingIndex];
          const newQty = Math.min(existingItem.quantity + quantity, existingItem.maxStock);
          const updatedItems = [...currentItems];
          updatedItems[existingIndex] = { ...existingItem, quantity: newQty };
          set({ items: updatedItems, isOpen: true });
          return true;
        }

        if (item.maxStock < 1) return false;

        const newItem: CartItem = {
          ...item,
          quantity: Math.min(quantity, item.maxStock),
        };

        set({ items: [...currentItems, newItem], isOpen: true });
        return true;
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }

        set({
          items: get().items.map((i) =>
            i.variantId === variantId
              ? { ...i, quantity: Math.min(quantity, i.maxStock) }
              : i
          ),
        });
      },

      removeItem: (variantId) => {
        set({ items: get().items.filter((i) => i.variantId !== variantId) });
      },

      clearCart: () => set({ items: [], coupon: null }),

      applyCoupon: (coupon) => set({ coupon }),

      removeCoupon: () => set({ coupon: null }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        const coupon = get().coupon;
        if (!coupon || subtotal < coupon.minOrderAmount) return 0;

        if (coupon.discountType === "PERCENTAGE") {
          const discount = (subtotal * coupon.discountValue) / 100;
          return coupon.maxDiscountAmount ? Math.min(discount, coupon.maxDiscountAmount) : discount;
        }

        return coupon.discountValue;
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
      },

      getTotalAmount: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        const discount = get().getDiscountAmount();
        const shipping = get().getShippingFee();
        return Math.max(0, subtotal - discount + shipping);
      },

      getTotalItems: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "gs-collection-cart-storage",
    }
  )
);
