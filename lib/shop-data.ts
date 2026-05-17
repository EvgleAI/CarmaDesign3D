/**
 * Dummy-Shop-Datenquelle.
 *
 * Stand: 2026-05-11. Alle Spezifikationen aus der Live-Kollektionsseite
 * `/aktuelle-kollektion` (siehe RESEARCH §5.3). Preise sind dort nicht
 * ausgewiesen — wir markieren `priceOnRequest`.
 *
 * Schnittstelle ist absichtlich klein gehalten, damit eine spätere echte
 * Anbindung (Shopify, eigener Server) sie 1:1 ersetzen kann:
 *   getAllProducts() / getProductsByLine(line) / getProductByHandle(handle)
 */
import type { ShopLine, ShopProduct } from './shop-types';
import { LINE_ORDER } from './shop-types';

const CARE =
  'Die 3D-gedruckten Oberflächen lassen sich einfach mit einem feuchten Tuch abwischen. Für die massive Eichenholzplatte bei DUNE und AELO empfehlen wir gelegentliches Einreiben mit Holzöl.';

const SHIPPING = 'Kostenloser Versand · gebaut auf Bestellung · 14 Tage Lieferzeit · 30 Tage Rückgaberecht.';

const PRODUCTS: ShopProduct[] = [
  {
    id: 'cd3d-aelo',
    handle: 'aelo',
    line: 'aelo',
    title: 'AELO Beistelltisch',
    productType: 'Beistelltisch',
    lead: 'Wasser bewegt sich, auch wenn man es nicht sieht. AELO fängt diesen Moment ein. Der gedruckte Korpus zeigt bei jedem Lichteinfall eine andere Oberfläche.',
    details: [
      { label: 'Maße', value: 'B 47,5 × T 47,5 × H 43 cm' },
      { label: 'Material Korpus', value: 'Wiederverwerteter Kunststoff' },
      { label: 'Material Tischplatte', value: 'Eiche massiv, geölt' },
      { label: 'Gewicht', value: '6 kg' },
      { label: 'Fertigung', value: 'Manufaktur Affalterbach' },
    ],
    care: CARE,
    shipping: SHIPPING,
    featuredImage: {
      src: '/images/shop/aelo/hero.jpg',
      alt: 'AELO Beistelltisch aus 3D-gedrucktem Kunststoff mit Holzplatte in einem Wohnraum',
      width: 432,
      height: 648,
    },
    images: [
      {
        src: '/images/shop/aelo/hero.jpg',
        alt: 'AELO Beistelltisch aus 3D-gedrucktem Kunststoff mit Holzplatte in einem Wohnraum',
        width: 432,
        height: 648,
      },
    ],
    options: [],
    variants: [
      { id: 'cd3d-aelo-default', title: 'Standard', options: [] },
    ],
    priceOnRequest: true,
  },
  {
    id: 'cd3d-dune',
    handle: 'dune',
    line: 'dune',
    title: 'DUNE Beistellhocker',
    productType: 'Beistellhocker',
    lead: 'Sand braucht Wind, um Form zu werden. DUNE trägt diese Bewegung in sich. Die strukturierte Oberfläche des Korpus trifft auf warmes Eichenholz. Zwei Materialien, ein Objekt.',
    details: [
      { label: 'Maße', value: 'B 35 × T 35 × H 50 cm' },
      { label: 'Material Korpus', value: 'Wiederverwerteter Kunststoff' },
      { label: 'Material Sitzfläche', value: 'Eiche massiv, geölt' },
      { label: 'Gewicht', value: '3 kg' },
      { label: 'Fertigung', value: 'Manufaktur Affalterbach' },
    ],
    care: CARE,
    shipping: SHIPPING,
    featuredImage: {
      src: '/images/shop/dune/hero.jpg',
      alt: 'DUNE Beistellhocker mit strukturiertem Korpus und Eichenholz-Sitzfläche in einem Loft',
      width: 400,
      height: 600,
    },
    images: [
      {
        src: '/images/shop/dune/hero.jpg',
        alt: 'DUNE Beistellhocker mit strukturiertem Korpus und Eichenholz-Sitzfläche in einem Loft',
        width: 400,
        height: 600,
      },
    ],
    options: [],
    variants: [
      { id: 'cd3d-dune-default', title: 'Standard', options: [] },
    ],
    priceOnRequest: true,
  },
  {
    id: 'cd3d-ruta',
    handle: 'ruta',
    line: 'ruta',
    title: 'RUTA Pflanzgefäß',
    productType: 'Pflanzgefäß',
    lead: 'Nicht geformt, sondern gewachsen. RUTA wartet auf die richtige Pflanze. Ein Objekt für drinnen und draußen, das Natur nicht imitiert, sondern ihr Platz gibt.',
    details: [
      { label: 'Maße', value: 'H 38 × Ø 50 cm' },
      { label: 'Material', value: 'Wiederverwerteter Kunststoff, witterungsbeständig' },
      { label: 'Verwendung', value: 'Innen und außen' },
      { label: 'Gewicht', value: '3 kg' },
      { label: 'Fertigung', value: 'Manufaktur Affalterbach' },
    ],
    care: CARE,
    shipping: SHIPPING,
    featuredImage: {
      src: '/images/shop/ruta/hero.jpg',
      alt: 'RUTA Pflanzgefäß aus wiederverwertetem Kunststoff mit Olivenbaum in einem ruhigen Wohnraum',
      width: 600,
      height: 600,
    },
    images: [
      {
        src: '/images/shop/ruta/hero.jpg',
        alt: 'RUTA Pflanzgefäß aus wiederverwertetem Kunststoff mit Olivenbaum in einem ruhigen Wohnraum',
        width: 600,
        height: 600,
      },
    ],
    options: [],
    variants: [
      { id: 'cd3d-ruta-default', title: 'Standard', options: [] },
    ],
    priceOnRequest: true,
  },
  {
    id: 'cd3d-organis',
    handle: 'organis',
    line: 'organis',
    title: 'ORGANIS Stehleuchte',
    productType: 'Stehleuchte',
    lead: 'Weiche Linien, die Licht fangen, brechen und wieder freigeben. ORGANIS schafft Atmosphäre, die man nicht einrichtet, sondern erlebt.',
    details: [
      { label: 'Maße', value: 'H 100 × Ø 43 cm' },
      { label: 'Material', value: 'Wiederverwerteter Kunststoff' },
      { label: 'Gewicht', value: '12 kg' },
      { label: 'Beleuchtung', value: 'Integrierte LED' },
      { label: 'Anschluss', value: '230 V Netzkabel' },
      { label: 'Schutzart', value: 'IP55' },
      { label: 'Lebensdauer', value: 'Über 30.000 Stunden' },
      { label: 'Garantie', value: '3 Jahre auf die Beleuchtung' },
    ],
    extra:
      'Wählbar mit 11 W (1.320 lm) oder 16 W (1.920 lm) Lichtleistung, in den Lichtfarben warmweiß, neutralweiß und tageslichtweiß.',
    care: CARE,
    shipping: SHIPPING,
    featuredImage: {
      src: '/images/shop/organis/hero.jpg',
      alt: 'ORGANIS Stehleuchte, weich leuchtend, in einem dämmrigen Wohnraum am Fenster',
      width: 768,
      height: 1366,
    },
    images: [
      {
        src: '/images/shop/organis/hero.jpg',
        alt: 'ORGANIS Stehleuchte, weich leuchtend, in einem dämmrigen Wohnraum am Fenster',
        width: 768,
        height: 1366,
      },
    ],
    options: [
      { name: 'Leistung', values: ['11 W', '16 W'] },
      { name: 'Lichtfarbe', values: ['warmweiß', 'neutralweiß', 'tageslichtweiß'] },
    ],
    variants: [
      { id: 'cd3d-organis-11-ww', title: '11 W · warmweiß', options: [{ name: 'Leistung', value: '11 W' }, { name: 'Lichtfarbe', value: 'warmweiß' }] },
      { id: 'cd3d-organis-11-nw', title: '11 W · neutralweiß', options: [{ name: 'Leistung', value: '11 W' }, { name: 'Lichtfarbe', value: 'neutralweiß' }] },
      { id: 'cd3d-organis-11-tw', title: '11 W · tageslichtweiß', options: [{ name: 'Leistung', value: '11 W' }, { name: 'Lichtfarbe', value: 'tageslichtweiß' }] },
      { id: 'cd3d-organis-16-ww', title: '16 W · warmweiß', options: [{ name: 'Leistung', value: '16 W' }, { name: 'Lichtfarbe', value: 'warmweiß' }] },
      { id: 'cd3d-organis-16-nw', title: '16 W · neutralweiß', options: [{ name: 'Leistung', value: '16 W' }, { name: 'Lichtfarbe', value: 'neutralweiß' }] },
      { id: 'cd3d-organis-16-tw', title: '16 W · tageslichtweiß', options: [{ name: 'Leistung', value: '16 W' }, { name: 'Lichtfarbe', value: 'tageslichtweiß' }] },
    ],
    priceOnRequest: true,
  },
];

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function getAllProducts(): ShopProduct[] {
  // Sortierung nach LINE_ORDER, falls neue Produkte später dazukommen.
  return [...PRODUCTS].sort(
    (a, b) => LINE_ORDER.indexOf(a.line) - LINE_ORDER.indexOf(b.line),
  );
}

export function getProductsByLine(line: ShopLine): ShopProduct[] {
  return PRODUCTS.filter((p) => p.line === line);
}

export function getProductByHandle(handle: string): ShopProduct | null {
  return PRODUCTS.find((p) => p.handle === handle) ?? null;
}

export function getFeaturedByLine(): Record<ShopLine, ShopProduct | null> {
  const out = {} as Record<ShopLine, ShopProduct | null>;
  for (const line of LINE_ORDER) {
    out[line] = getProductsByLine(line)[0] ?? null;
  }
  return out;
}
