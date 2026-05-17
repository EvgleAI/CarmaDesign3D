'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { PRIMARY_NAV, FOOTER_LEGAL, SITE } from '@/lib/site';

/**
 * Mobile-Burger + Slide-Drawer.
 *
 * A11y:
 *   - Trigger ist ein echter `<button aria-controls aria-expanded>`.
 *   - Drawer ist `role="dialog" aria-modal="true"` mit Label.
 *   - ESC schließt; Body-Scroll wird gesperrt; Fokus geht beim Öffnen auf
 *     den Schließen-Button.
 *   - Schließt sich automatisch bei Routenwechsel.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();

  // Schließen beim Routenwechsel.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ESC-Listener + Body-Scroll-Lock + Fokus.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-controls="mobile-nav"
        aria-expanded={open}
        aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
        className="inline-flex h-10 w-10 items-center justify-center text-current md:hidden"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            aria-hidden
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          />

          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Hauptnavigation"
            className="fixed inset-y-0 right-0 z-50 flex w-[min(420px,90vw)] flex-col bg-paper md:hidden"
          >
            <div className="flex items-center justify-between border-b border-line-soft px-6 py-5">
              <span className="font-display text-eyebrow uppercase tracking-[0.12em] text-ink/60">
                Menü
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Menü schließen"
                className="inline-flex h-10 w-10 items-center justify-center text-ink"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" />
              </button>
            </div>

            <nav aria-label="Hauptnavigation (Mobile)" className="flex-1 overflow-y-auto px-6 py-8">
              <ul className="space-y-6">
                {PRIMARY_NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block font-display text-[28px] font-bold uppercase leading-none tracking-[-0.01em] text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-12 border-t border-line-soft pt-8">
                <p className="text-eyebrow uppercase tracking-[0.12em] text-ink/55">Rechtliches</p>
                <ul className="mt-4 space-y-3">
                  {FOOTER_LEGAL.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-[14px] text-ink/75 hover:text-ink">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="border-t border-line-soft px-6 py-6 text-[14px] text-ink/70">
              <a href={`mailto:${SITE.email}`} className="link-underline">
                {SITE.email}
              </a>
              <br />
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="link-underline">
                {SITE.phone}
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
