'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCartStore } from '@/lib/cart';
import { cn } from '@/lib/cn';
import type { ShopProduct, ShopVariant } from '@/lib/shop-types';

/**
 * „Anfragen" CTA für die Detailseite.
 *
 * Da der Shop ein Dummy ist und keine Preise vorliegen, sprechen wir
 * bewusst von „Auf Anfrageliste setzen" statt „In den Warenkorb".
 * Die Drawer-Öffnung ist über den Store getriggert.
 */
export function AddToCartButton({
  product,
  variant,
  className,
}: {
  product: ShopProduct;
  variant: ShopVariant;
  className?: string;
}) {
  const add = useCartStore((s) => s.add);
  const [done, setDone] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        add(product, variant, 1);
        setDone(true);
        // Hinweis kurz halten — Drawer kommt sowieso direkt auf.
        window.setTimeout(() => setDone(false), 1800);
      }}
      className={cn(
        'inline-flex h-14 items-center justify-center gap-3 px-8',
        'bg-ink text-paper font-display text-[14px] uppercase tracking-[0.08em] font-medium',
        'transition-colors duration-slow ease-quiet hover:bg-graphite',
        'focus-visible:outline-offset-4',
        className,
      )}
      aria-live="polite"
    >
      {done ? (
        <>Hinzugefügt</>
      ) : (
        <>
          <Plus className="size-4" />
          Auf Anfrageliste setzen
        </>
      )}
    </button>
  );
}
