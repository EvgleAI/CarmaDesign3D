import { ProductCard } from '@/components/shop/ProductCard';
import { Reveal } from '@/components/ui/Reveal';
import type { ShopProduct } from '@/lib/shop-types';

export function ProductGrid({ products }: { products: ShopProduct[] }) {
  if (products.length === 0) {
    return (
      <p className="text-body text-ink/60">
        Aktuell keine Objekte in dieser Linie. Anfragen gerne über{' '}
        <a href="/kontakt" className="link-underline">
          Kontakt
        </a>
        .
      </p>
    );
  }
  return (
    <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p, i) => (
        <Reveal as="li" key={p.id} delay={i * 80}>
          <ProductCard product={p} />
        </Reveal>
      ))}
    </ul>
  );
}
