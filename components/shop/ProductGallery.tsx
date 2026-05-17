'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';
import type { ShopImage, ShopLine } from '@/lib/shop-types';

/**
 * Produkt-Galerie für die Detailseite.
 *  - Großes Hauptbild + Thumbnail-Streifen.
 *  - Tastatur-navigierbar (Pfeile, Home/End auf den Thumbs).
 *  - Wenn keine Bilder geliefert sind: einzelner Material-Platzhalter (Streifen).
 */
export function ProductGallery({
  images,
  title,
  line,
}: {
  images: ShopImage[];
  title: string;
  line: ShopLine;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return <PlaceholderGallery title={title} line={line} />;
  }

  const current = images[active]!;

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden bg-stone">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <ul
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${Math.min(images.length, 6)}, 1fr)` }}
          role="listbox"
          aria-label="Weitere Bilder"
        >
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                role="option"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  'relative block aspect-square w-full overflow-hidden bg-stone',
                  'transition-opacity duration-slow ease-quiet',
                  i === active ? 'opacity-100' : 'opacity-60 hover:opacity-100',
                  'focus-visible:outline-offset-4',
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PlaceholderGallery({ title, line }: { title: string; line: ShopLine }) {
  const stroke =
    line === 'aelo' || line === 'dune' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)';
  const bg = line === 'aelo' || line === 'dune' ? 'bg-stone' : 'bg-ink';
  const angle = { aelo: '0deg', dune: '45deg', ruta: '90deg', organis: '135deg' }[line];

  return (
    <div className={cn('relative aspect-square overflow-hidden', bg)} aria-label={title}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(${angle}, ${stroke} 0px, ${stroke} 1px, transparent 1px, transparent 6px)`,
        }}
      />
      <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-[12px] uppercase tracking-[0.16em] text-current/60">
        Produktbilder folgen
      </span>
    </div>
  );
}
