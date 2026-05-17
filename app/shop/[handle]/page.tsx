import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ProductGallery } from '@/components/shop/ProductGallery';
import { ProductDetailActions } from '@/components/shop/ProductDetailActions';
import { LINE_COPY } from '@/lib/shop-types';
import { getAllProducts, getProductByHandle } from '@/lib/shop-data';

type Params = Promise<{ handle: string }>;

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) return pageMetadata({ title: 'Nicht gefunden', path: `/shop/${handle}` });

  const copy = LINE_COPY[product.line];
  return pageMetadata({
    title: product.title,
    description: `${copy.eyebrow} ${copy.sub} ${product.lead}`,
    path: `/shop/${handle}`,
  });
}

export default async function ProductPage({ params }: { params: Params }) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) notFound();

  const copy = LINE_COPY[product.line];

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.lead,
    brand: { '@type': 'Brand', name: 'CarmaDesign3D' },
    category: product.productType,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/MadeToOrder',
      priceCurrency: 'EUR',
      priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'EUR' },
    },
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Shop', path: '/shop' },
    { name: product.title, path: `/shop/${product.handle}` },
  ]);

  return (
    <>
      <Section tone="paper">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.08em] text-ink/65 hover:text-ink"
        >
          <ChevronLeft className="size-4" />
          Zur Kollektion
        </Link>

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-20">
          <ProductGallery images={product.images} title={product.title} line={product.line} />

          <div className="md:sticky md:top-24 md:self-start">
            <Eyebrow>
              {copy.label} · {product.productType}
            </Eyebrow>
            <h1 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold uppercase leading-[1.05] tracking-[-0.015em]">
              {copy.eyebrow}
            </h1>
            <p className="mt-3 text-[18px] text-ink/70">{copy.sub}</p>

            <p className="mt-8 text-body leading-relaxed text-ink/80">{product.lead}</p>
            {product.extra && (
              <p className="mt-4 text-body text-ink/75">{product.extra}</p>
            )}

            <p className="mt-8 text-eyebrow uppercase tracking-[0.12em] text-ink/55">Preis</p>
            <p className="mt-2 font-display text-[20px] font-medium text-ink">Auf Anfrage</p>

            <ProductDetailActions product={product} className="mt-8" />

            <p className="mt-4 text-[13px] text-ink/55">{product.shipping}</p>
          </div>
        </div>
      </Section>

      <Section tone="stone">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
          <div>
            <Eyebrow>Spezifikationen</Eyebrow>
            <h2 className="mt-3 text-h2">Daten zum Objekt.</h2>
          </div>
          <dl className="grid gap-px overflow-hidden border border-line-soft bg-line-soft sm:grid-cols-2">
            {product.details.map((d) => (
              <div key={d.label} className="bg-paper p-6">
                <dt className="text-eyebrow uppercase tracking-[0.12em] text-ink/55">
                  {d.label}
                </dt>
                <dd className="mt-2 font-display text-[16px] text-ink">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <Eyebrow as="h3">Pflege</Eyebrow>
            <p className="mt-3 text-body leading-relaxed text-ink/80">{product.care}</p>
          </div>
          <div>
            <Eyebrow as="h3">Versand &amp; Rückgabe</Eyebrow>
            <p className="mt-3 text-body leading-relaxed text-ink/80">{product.shipping}</p>
            <p className="mt-3 text-[14px] text-ink/55">
              Details unter{' '}
              <Link href="/versand-zahlung" className="link-underline">
                Versand &amp; Zahlung
              </Link>{' '}
              und{' '}
              <Link href="/widerruf" className="link-underline">
                Widerruf
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </>
  );
}
