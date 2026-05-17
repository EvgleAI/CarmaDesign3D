import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { LINE_COPY } from '@/lib/shop-types';
import type { ShopProduct } from '@/lib/shop-types';

/**
 * Produkt-Tile auf der Übersicht.
 * Bewusst ruhig: Bild quadratisch, Eyebrow = Linie + Typ, Titel, „Auf Anfrage".
 */
export function ProductCard({
  product,
  sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw',
}: {
  product: ShopProduct;
  sizes?: string;
}) {
  const lineCopy = LINE_COPY[product.line];

  return (
    <Link
      href={`/shop/${product.handle}`}
      className="group block focus-visible:outline-offset-4"
      aria-label={`${product.title} ansehen`}
    >
      <div className="relative aspect-square overflow-hidden bg-stone">
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.src}
            alt={product.featuredImage.alt}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-[1200ms] ease-quiet group-hover:scale-[1.02]"
          />
        ) : (
          <ProductTexture line={product.line} />
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <Eyebrow as="p">
            {lineCopy.label} · {product.productType}
          </Eyebrow>
          <p className="mt-2 font-display text-[20px] font-medium leading-tight text-ink">
            {product.title}
          </p>
          <p className="mt-1 text-[14px] text-ink/55">Preis auf Anfrage</p>
        </div>
        <span
          aria-hidden
          className="mt-1 inline-flex h-9 w-9 items-center justify-center border border-ink/15 text-ink transition-colors duration-slow ease-quiet group-hover:border-ink group-hover:bg-ink group-hover:text-paper"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}

function ProductTexture({ line }: { line: ShopProduct['line'] }) {
  // Subtle Schichtstruktur pro Linie variiert, damit nicht alle Karten gleich
  // aussehen, solange keine Bilder geliefert sind.
  const bg =
    line === 'aelo' || line === 'dune' ? 'bg-stone' : 'bg-ink';
  const stroke = bg === 'bg-stone' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)';
  const angle = { aelo: '0deg', dune: '45deg', ruta: '90deg', organis: '135deg' }[line];
  return (
    <div className={`absolute inset-0 ${bg}`}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(${angle}, ${stroke} 0px, ${stroke} 1px, transparent 1px, transparent 6px)`,
        }}
      />
    </div>
  );
}
