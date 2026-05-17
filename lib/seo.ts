import type { Metadata } from 'next';
import { SITE } from './site';

/**
 * Erzeugt eine Metadata-Default-Struktur pro Seite.
 * Verwendung in `page.tsx`:
 *   export const metadata = pageMetadata({ title: 'Shop', description: '…' });
 */
export function pageMetadata(opts: {
  title: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const title = opts.title === SITE.name ? SITE.name : `${opts.title} — ${SITE.name}`;
  const description = opts.description ?? SITE.description;
  const url = opts.path ? `${SITE.url}${opts.path}` : SITE.url;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: opts.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressCountry: SITE.address.country,
    },
    sameAs: [SITE.social.instagram],
  };
}

/**
 * BreadcrumbList JSON-LD fuer tiefe Routen.
 * Item-Pfade sind absolut (mit Site-URL), damit Google sie ohne weitere
 * Heuristik verarbeiten kann.
 *
 *   breadcrumbJsonLd([
 *     { name: 'Shop', path: '/shop' },
 *     { name: 'AELO Beistelltisch', path: '/shop/aelo' },
 *   ])
 */
export function breadcrumbJsonLd(trail: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: SITE.url },
      ...trail.map((step, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: step.name,
        item: `${SITE.url}${step.path}`,
      })),
    ],
  };
}
