'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, X, ArrowUpRight, Trash2 } from 'lucide-react';
import { useCartStore, useHydratedCart } from '@/lib/cart';
import { LINE_COPY } from '@/lib/shop-types';
import { SITE } from '@/lib/site';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { cn } from '@/lib/cn';

/**
 * Anfrageliste als Slide-Drawer von rechts.
 *
 * - Da der Shop ein Dummy ist und Preise nicht ausgewiesen werden,
 *   ist der Abschluss-CTA ein „Anfrage senden" mit Mailto-Fallback,
 *   das die Liste in den Mail-Body schreibt.
 * - A11y: role="dialog" + aria-modal, ESC-Close, Body-Scroll-Lock,
 *   Fokus auf Schließen-Button beim Öffnen.
 */
export function CartDrawer() {
  const { open, lines, hydrated } = useHydratedCart();
  const setOpen = useCartStore((s) => s.setOpen);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  // ESC + Body-Scroll-Lock + Fokus.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, setOpen]);

  if (!hydrated || !open) return null;

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Anfrageliste"
        className="fixed inset-y-0 right-0 z-50 flex w-[min(460px,95vw)] flex-col bg-paper"
      >
        <header className="flex items-center justify-between border-b border-line-soft px-6 py-5">
          <Eyebrow>Ihre Anfrageliste</Eyebrow>
          <button
            ref={closeRef}
            type="button"
            aria-label="Anfrageliste schließen"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center text-ink"
          >
            <X className="size-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <EmptyState onClose={() => setOpen(false)} />
        ) : (
          <CartList />
        )}
      </aside>
    </>
  );
}

function EmptyState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-start justify-between gap-10 p-6">
      <div>
        <p className="font-display text-[24px] font-medium text-ink">Noch nichts vorgemerkt.</p>
        <p className="mt-3 text-body text-ink/65">
          Wählen Sie ein Objekt aus der Kollektion — wir melden uns mit Preisen,
          Verfügbarkeiten und nächsten Schritten.
        </p>
      </div>
      <Link
        href="/shop"
        onClick={onClose}
        className="inline-flex h-12 items-center gap-3 bg-ink px-6 font-display text-[13px] uppercase tracking-[0.08em] font-medium text-paper transition-colors duration-slow ease-quiet hover:bg-graphite"
      >
        Zur Kollektion
        <ArrowUpRight className="size-4" />
      </Link>
    </div>
  );
}

function CartList() {
  const lines = useCartStore((s) => s.lines);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);

  return (
    <>
      <ul className="flex-1 divide-y divide-line-soft overflow-y-auto">
        {lines.map((line) => {
          const lineCopy = LINE_COPY[line.productLine];
          return (
            <li key={line.id} className="flex gap-4 px-6 py-5">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-stone">
                {line.image ? (
                  <Image
                    src={line.image.src}
                    alt={line.image.alt}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-stone"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(45deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 5px)',
                    }}
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-eyebrow uppercase tracking-[0.12em] text-ink/55">
                  {lineCopy.label} · {lineCopy.type}
                </p>
                <p className="mt-1 truncate font-display text-[15px] font-medium text-ink">
                  {line.productTitle}
                </p>
                {line.variantTitle !== 'Standard' && (
                  <p className="text-[13px] text-ink/60">{line.variantTitle}</p>
                )}

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center border border-line-soft">
                    <button
                      type="button"
                      aria-label="Menge verringern"
                      className="inline-flex h-9 w-9 items-center justify-center text-ink hover:bg-stone"
                      onClick={() => updateQuantity(line.id, line.quantity - 1)}
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="px-3 text-[13px] tabular-nums">{line.quantity}</span>
                    <button
                      type="button"
                      aria-label="Menge erhöhen"
                      className="inline-flex h-9 w-9 items-center justify-center text-ink hover:bg-stone"
                      onClick={() => updateQuantity(line.id, line.quantity + 1)}
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    aria-label="Position entfernen"
                    className="inline-flex h-9 w-9 items-center justify-center text-ink/55 hover:text-ink"
                    onClick={() => remove(line.id)}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <footer className="border-t border-line-soft px-6 py-6">
        <div className="flex items-baseline justify-between">
          <span className="text-[14px] text-ink/65">Preise</span>
          <span className="font-display text-[15px] font-medium text-ink">Auf Anfrage</span>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-ink/60">
          Wir bestätigen Verfügbarkeit, Preis und Lieferzeit individuell pro
          Objekt. Versand innerhalb Deutschlands kostenfrei.
        </p>
        <AnfrageButton />
        <button
          type="button"
          onClick={() => clear()}
          className="mt-3 text-[12px] uppercase tracking-[0.12em] text-ink/55 hover:text-ink"
        >
          Anfrageliste leeren
        </button>
      </footer>
    </>
  );
}

function AnfrageButton() {
  const lines = useCartStore((s) => s.lines);

  const subject = encodeURIComponent(`Anfrage zur Kollektion — ${lines.length} Position(en)`);
  const bodyLines = [
    'Guten Tag,',
    '',
    'ich interessiere mich für die folgenden Objekte aus Ihrer Kollektion:',
    '',
    ...lines.map((l, i) => {
      const variant =
        l.variantTitle && l.variantTitle !== 'Standard' ? ` (${l.variantTitle})` : '';
      return `${i + 1}. ${l.productTitle}${variant} — Menge ${l.quantity}`;
    }),
    '',
    'Bitte senden Sie mir Informationen zu Preis, Verfügbarkeit und Lieferung.',
    '',
    'Vielen Dank',
  ];
  const body = encodeURIComponent(bodyLines.join('\n'));
  const href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;

  return (
    <a
      href={href}
      className={cn(
        'mt-4 inline-flex h-12 w-full items-center justify-center gap-3',
        'bg-ink text-paper font-display text-[13px] uppercase tracking-[0.08em] font-medium',
        'transition-colors duration-slow ease-quiet hover:bg-graphite',
      )}
    >
      Anfrage senden
      <ArrowUpRight className="size-4" />
    </a>
  );
}
