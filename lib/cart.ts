'use client';

import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartLine, ShopProduct, ShopVariant } from './shop-types';

/**
 * Rein clientseitiger Cart-Store für den Dummy-Shop.
 *
 * Persistiert in LocalStorage. Hat keinen Server-Sync — eine spätere echte
 * Shop-Anbindung würde diese Datei ersetzen, ohne die UI anzufassen.
 */
type State = {
  lines: CartLine[];
  /** Drawer auf/zu. */
  open: boolean;
};

type Actions = {
  add: (product: ShopProduct, variant: ShopVariant, quantity?: number) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  remove: (lineId: string) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
};

export const useCartStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      lines: [],
      open: false,

      add: (product, variant, quantity = 1) => {
        const existing = get().lines.find((l) => l.variantId === variant.id);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.id === existing.id ? { ...l, quantity: l.quantity + quantity } : l,
            ),
            open: true,
          });
          return;
        }
        const newLine: CartLine = {
          id: cryptoRandomId(),
          productHandle: product.handle,
          productTitle: product.title,
          productLine: product.line,
          variantId: variant.id,
          variantTitle: variant.title,
          image: product.featuredImage ?? product.images[0] ?? null,
          quantity,
        };
        set({ lines: [...get().lines, newLine], open: true });
      },

      updateQuantity: (lineId, quantity) => {
        if (quantity <= 0) {
          set({ lines: get().lines.filter((l) => l.id !== lineId) });
          return;
        }
        set({
          lines: get().lines.map((l) => (l.id === lineId ? { ...l, quantity } : l)),
        });
      },

      remove: (lineId) => set({ lines: get().lines.filter((l) => l.id !== lineId) }),

      clear: () => set({ lines: [] }),

      setOpen: (open) => set({ open }),
    }),
    {
      name: 'cd3d.cart.v1',
      storage: createJSONStorage(() => localStorage),
      // `open` ist UI-State und sollte nicht persistieren.
      partialize: (state) => ({ lines: state.lines }),
      version: 1,
    },
  ),
);

/**
 * Anzahl Items im Cart — Summe der Quantities.
 * Selektor wird bewusst extern berechnet, damit der Store dünn bleibt.
 */
export function selectTotalQuantity(state: State): number {
  return state.lines.reduce((sum, l) => sum + l.quantity, 0);
}

/**
 * SSR-sicherer Hook: erst nach Hydration ist `lines` belastbar.
 */
export function useHydratedCart() {
  const state = useCartStore();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return { ...state, hydrated, totalQuantity: hydrated ? selectTotalQuantity(state) : 0 };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function cryptoRandomId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
