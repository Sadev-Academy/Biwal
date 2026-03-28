import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;          // Product ID
  variantId: string;   // Unique Variant ID
  name: string;
  price: number;
  image: string;
  categoryName: string;
  quantity: number;
  selectedSize?: string | null;
  selectedColor?: string | null;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  addItem: (data: Omit<CartItem, "quantity">) => void;
  removeItem: (variantId: string) => void;
  increaseQuantity: (variantId: string) => void;
  decreaseQuantity: (variantId: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      onOpen: () => set({ isOpen: true }),
      onClose: () => set({ isOpen: false }),
      addItem: (data) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.variantId === data.variantId);

        if (existingItem) {
          const updatedItems = currentItems.map((item) =>
            item.variantId === data.variantId ? { ...item, quantity: item.quantity + 1 } : item
          );
          set({ items: updatedItems });
        } else {
          set({ items: [...currentItems, { ...data, quantity: 1 }] });
        }
        
        set({ isOpen: true });
      },
      removeItem: (variantId) => {
        set({ items: get().items.filter((item) => item.variantId !== variantId) });
      },
      increaseQuantity: (variantId) => {
        const updatedItems = get().items.map((item) =>
          item.variantId === variantId ? { ...item, quantity: item.quantity + 1 } : item
        );
        set({ items: updatedItems });
      },
      decreaseQuantity: (variantId) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.variantId === variantId);

        if (existingItem?.quantity === 1) {
          set({ items: currentItems.filter((item) => item.variantId !== variantId) });
        } else {
          const updatedItems = currentItems.map((item) =>
            item.variantId === variantId ? { ...item, quantity: item.quantity - 1 } : item
          );
          set({ items: updatedItems });
        }
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
