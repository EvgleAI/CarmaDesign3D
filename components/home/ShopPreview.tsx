import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Tile } from '@/components/ui/Tile';
import { Reveal } from '@/components/ui/Reveal';
import { LINE_ORDER, LINE_COPY } from '@/lib/shop-types';
import { getFeaturedByLine } from '@/lib/shop-data';

/**
 * Shop-Vorschau auf der Landingpage.
 * Vier Linien-Tiles. Bilder kommen aus shop-data.ts (featuredImage),
 * Texte aus LINE_COPY (Live-Wordings).
 */
export function ShopPreview() {
  const featured = getFeaturedByLine();

  return (
    <Section tone="paper">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow">Kollektion</p>
            <h2 className="mt-3 text-h2">Möbelskulpturen für Zuhause.</h2>
          </div>
          <Link
            href="/shop"
            className="link-underline inline-flex items-center gap-2 font-display text-[14px] uppercase tracking-[0.08em]"
          >
            Zur Kollektion
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </Reveal>

      <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {LINE_ORDER.map((line, i) => {
          const copy = LINE_COPY[line];
          const product = featured[line];
          return (
            <Reveal as="li" key={line} delay={i * 90}>
              <Tile
                href={`/shop/${line}`}
                ratio="square"
                eyebrow={`${copy.label} · ${copy.type}`}
                title={copy.eyebrow}
                sub={copy.sub}
                tone={i % 2 === 0 ? 'ink' : 'stone'}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                image={product?.featuredImage ?? undefined}
                dim={55}
              />
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
