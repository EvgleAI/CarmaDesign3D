/**
 * Globale Markenkonstanten.
 * Eine Quelle der Wahrheit für Navigation, Footer, Metadata, JSON-LD.
 */

export const SITE = {
  name: 'CarmaDesign3D',
  shortName: 'CarmaDesign3D',
  tagline: 'Für alle, die das Außergewöhnliche suchen.',
  description:
    '3D-Gedruckte Möbelstücke aus wiederverwertetem Material, Made in Germany.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.carmadesign3d.de',
  locale: 'de-DE',
  email: 'info@carmadesign3d.de',
  phone: '+49 176 856 359 32',
  address: {
    street: 'Hagäcker 58',
    postalCode: '71563',
    city: 'Affalterbach',
    country: 'DE',
  },
  owner: 'Max Adler',
  social: {
    instagram: 'https://www.instagram.com/carmadesign3d/',
    instagramHandle: '@carmadesign3d',
  },
} as const;

export type NavItem = { label: string; href: string };

export const PRIMARY_NAV: readonly NavItem[] = [
  // URL bleibt /was-wir-machen (SEO + Brand-Konsistenz), nur das Label
  // im Nav ist umgestellt.
  { label: 'Services', href: '/was-wir-machen' },
  { label: 'Shop', href: '/shop' },
  { label: 'Projekte', href: '/projekte' },
  { label: 'Kontakt', href: '/kontakt' },
] as const;

export const FOOTER_LEGAL: readonly NavItem[] = [
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutz', href: '/datenschutz' },
  { label: 'AGB', href: '/agb' },
  { label: 'Widerruf', href: '/widerruf' },
  { label: 'Versand & Zahlung', href: '/versand-zahlung' },
  { label: 'Cookie-Einstellungen', href: '/cookie-einstellungen' },
  { label: 'FAQ', href: '/faq' },
] as const;
