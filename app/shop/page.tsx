import { pageMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { LINE_COPY, LINE_ORDER } from '@/lib/shop-types';
import { getProductsByLine } from '@/lib/shop-data';
import { PageHero } from '@/components/ui/PageHero';

export const metadata = pageMetadata({
  title: 'Shop',
  description:
    'Kollektion · Für Zuhause. Vier Linien aus der Manufaktur bei Stuttgart: AELO, DUNE, RUTA, ORGANIS.',
  path: '/shop',
});

/**
 * Shop-Übersicht. Vier Linien-Sektionen mit poetischen Live-Claims als
 * Eyebrow + Sub und Produkt-Grid darunter.
 *
 * Preise sind live nicht ausgewiesen → ProductCard zeigt „Auf Anfrage".
 * Add-to-Cart und Mailto-Anfrage werden auf der Detailseite zugänglich.
 */
export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Kollektion · Für Zuhause"
        title="Möbelskulpturen aus der Manufaktur."
        subtitle="Vier Linien, jede mit einem klaren Charakter. Hergestellt im großformatigen 3D-Druck aus wiederverwertetem Material — zum Teil kombiniert mit massiver Eiche."
        imageSrc={null}
      />

      {LINE_ORDER.map((line, index) => {
        const copy = LINE_COPY[line];
        const products = getProductsByLine(line);
        const tone = index % 2 === 0 ? 'paper' : 'stone';
        return (
          <Section key={line} tone={tone}>
            <Reveal>
              <div className="grid items-end gap-6 md:grid-cols-[1fr_auto] md:gap-12">
                <div className="max-w-3xl">
                  <Eyebrow>
                    {copy.label} · {copy.type}
                  </Eyebrow>
                  <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase leading-[1.05] tracking-[-0.01em]">
                    {copy.eyebrow}
                  </h2>
                  <p className="mt-3 text-[18px] text-ink/70 md:text-[20px]">{copy.sub}</p>
                </div>
                <p className="max-w-md text-body text-ink/65 md:justify-self-end md:text-right">
                  {copy.lead}
                </p>
              </div>
            </Reveal>

            <div className="mt-16">
              <ProductGrid products={products} />
            </div>
          </Section>
        );
      })}
    </>
  );
}
