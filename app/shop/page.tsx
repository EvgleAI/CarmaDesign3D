import { pageMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Tile } from '@/components/ui/Tile';
import { LINE_COPY, LINE_ORDER } from '@/lib/shop-types';
import { getProductsByLine } from '@/lib/shop-data';
import { PageHero } from '@/components/ui/PageHero';

export const metadata = pageMetadata({
  title: 'Shop',
  description:
    'Kollektion · Für Zuhause. Vier Linien aus der Manufaktur bei Stuttgart: AELO, DUNE, RUTA, ORGANIS.',
  path: '/shop',
});

export default function ShopPage() {
  const featured = getFeaturedByLine();

  return (
    <>
      <PageHero
        eyebrow="Kollektion · Für Zuhause"
        title="Möbelskulpturen aus der Manufaktur."
        subtitle="Vier Linien, jede mit einem klaren Charakter. Hergestellt im großformatigen 3D-Druck aus wiederverwertetem Material — zum Teil kombiniert mit massiver Eiche."
        imageSrc={null}
      />

      <Section tone="stone">
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
          {LINE_ORDER.map((line, i) => {
            const copy = LINE_COPY[line];
            const product = featured[line];
            return (
              <Reveal key={line} delay={i * 80}>
                <Tile
                  href={`/shop/${line}`}
                  ratio="landscape"
                  eyebrow={`${copy.label} · ${copy.type}`}
                  title={copy.eyebrow}
                  sub={copy.sub}
                  image={product?.featuredImage ?? undefined}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </Reveal>
            );
          })}
        </div>
      </Section>
    </>
  );
}
