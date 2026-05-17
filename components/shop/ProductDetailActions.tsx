'use client';

import { useState } from 'react';
import { VariantSelector } from '@/components/shop/VariantSelector';
import { AddToCartButton } from '@/components/shop/AddToCartButton';
import type { ShopProduct, ShopVariant } from '@/lib/shop-types';
import { cn } from '@/lib/cn';

/**
 * Bündelt Variant-Auswahl + Add-to-Cart-Button.
 * Wird von der (Server-)Detailseite eingebunden.
 */
export function ProductDetailActions({
  product,
  className,
}: {
  product: ShopProduct;
  className?: string;
}) {
  const initial = product.variants[0];
  const [variant, setVariant] = useState<ShopVariant | null>(initial ?? null);

  if (!variant) {
    return (
      <p className={cn('text-body text-ink/60', className)}>
        Aktuell nicht verfügbar. Bitte über{' '}
        <a href="/kontakt" className="link-underline">
          Kontakt
        </a>{' '}
        anfragen.
      </p>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {product.options.length > 0 && (
        <VariantSelector
          options={product.options}
          variants={product.variants}
          onSelect={setVariant}
        />
      )}

      <AddToCartButton product={product} variant={variant} />
    </div>
  );
}
