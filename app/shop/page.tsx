import { pageMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Tile } from '@/components/ui/Tile';
import { LINE_COPY, LINE_ORDER } from '@/lib/shop-types';
import { getFeaturedByLine } from '@/lib/shop-data';

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
      <section className="bg-paper">
        <div className="container-edit py-22 md:py-30">
          <Eyebrow>Kollektion · Für Zuhause</Eyebrow>
          <h1 className="mt-6 text-h1">Möbelskulpturen aus der Manufaktur.</h1>
          <p className="mt-6 max-w-2xl text-body text-ink/70">
            Vier Linien, jede mit einem klaren Charakter. Hergestellt im
            großformatigen 3D-Druck aus wiederverwertetem Material — zum Teil
            kombiniert mit massiver Eiche. Preise klären wir individuell pro
            Objekt.
          </p>
        </div>
      </section>

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
