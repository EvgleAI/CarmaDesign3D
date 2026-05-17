'use client';

import { ShoppingBag } from 'lucide-react';
import { useHydratedCart } from '@/lib/cart';
import { cn } from '@/lib/cn';

/**
 * Cart-Trigger im Header.
 * Zeigt eine kleine Quantity-Pille, sobald Items im Cart sind.
 * SSR-sicher: vor Hydration wird kein Badge gerendert.
 */
export function CartButton({ className }: { className?: string }) {
  const { totalQuantity, setOpen, hydrated } = useHydratedCart();
  const count = hydrated ? totalQuantity : 0;

  return (
    <button
      type="button"
      aria-label={count > 0 ? `Anfrageliste öffnen (${count})` : 'Anfrageliste öffnen'}
      onClick={() => setOpen(true)}
      className={cn(
        // text-current laesst die Farbe vom Parent (Header) erben, damit der
        // Button auf hellen wie dunklen Headern automatisch passt.
        'relative inline-flex h-10 w-10 items-center justify-center text-current',
        'transition-opacity duration-slow ease-quiet hover:opacity-80',
        className,
      )}
    >
      <ShoppingBag className="size-5" />
      {count > 0 && (
        // Badge invertiert zur Parent-Farbe, damit es auf dunklem wie auf
        // hellem Header sichtbar bleibt.
        <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-paper px-1 text-[10px] font-bold leading-none text-ink">
          {count}
        </span>
      )}
    </button>
  );
}
