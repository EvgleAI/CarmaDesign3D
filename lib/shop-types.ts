/**
 * Shop-Typen für den Dummy-Shop.
 *
 * Bewusst minimal gehalten. Eine spätere echte Anbindung (Shopify, eigener
 * Server o. ä.) liefert dieselbe `ShopProduct`-Struktur — die UI bleibt
 * dadurch unverändert.
 */

export type ShopLine = 'aelo' | 'dune' | 'ruta' | 'organis';

export const LINE_ORDER: readonly ShopLine[] = ['aelo', 'dune', 'ruta', 'organis'] as const;

export type ShopImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ShopOption = {
  name: string;
  values: string[];
};

export type ShopVariant = {
  id: string;
  title: string;
  options: Array<{ name: string; value: string }>;
};

export type ShopProduct = {
  id: string;
  handle: string;
  line: ShopLine;
  title: string;
  productType: string;
  /** Poetischer Lead-Text aus RESEARCH §5.3. */
  lead: string;
  /** Daten-Liste für die Detailseite (Maße, Material, Gewicht …). */
  details: Array<{ label: string; value: string }>;
  /** Pflegehinweise (live identisch über alle Linien). */
  care: string;
  /** Versand-Boilerplate. */
  shipping: string;
  /** Zusätzlicher Body für Detailseite, optional. */
  extra?: string;
  featuredImage: ShopImage | null;
  images: ShopImage[];
  options: ShopOption[];
  variants: ShopVariant[];
  /** Preise sind live nicht ausgewiesen → wir zeigen „Auf Anfrage". */
  priceOnRequest: true;
};

export type CartLine = {
  /** Lokal generiert (uuid); identifiziert ein Item im Cart. */
  id: string;
  productHandle: string;
  productTitle: string;
  productLine: ShopLine;
  variantId: string;
  variantTitle: string;
  image: ShopImage | null;
  quantity: number;
};

/**
 * Editoriale Anreicherung pro Linie — Eyebrow + Sub aus den Live-Wordings.
 * Wird unabhängig von Produkt-Daten in Sektions-Headlines genutzt.
 */
export type LineCopy = {
  line: ShopLine;
  label: string; // ORGANIS / AELO …
  type: string; // Beistelltisch / Stehleuchte …
  eyebrow: string;
  sub: string;
  lead: string;
};

export const LINE_COPY: Record<ShopLine, LineCopy> = {
  aelo: {
    line: 'aelo',
    label: 'AELO',
    type: 'Beistelltisch',
    eyebrow: 'Bewegung, festgehalten.',
    sub: 'Das ruhige Zentrum im Raum.',
    lead: 'Wasser bewegt sich, auch wenn man es nicht sieht. AELO fängt diesen Moment ein. Der gedruckte Korpus zeigt bei jedem Lichteinfall eine andere Oberfläche.',
  },
  dune: {
    line: 'dune',
    label: 'DUNE',
    type: 'Beistellhocker',
    eyebrow: 'Von Wind geformt, für den Raum gedacht.',
    sub: 'Skulptur trifft Fläche.',
    lead: 'Sand braucht Wind, um Form zu werden. DUNE trägt diese Bewegung in sich. Die strukturierte Oberfläche des Korpus trifft auf warmes Eichenholz. Zwei Materialien, ein Objekt.',
  },
  ruta: {
    line: 'ruta',
    label: 'RUTA',
    type: 'Pflanzgefäß',
    eyebrow: 'Gewachsen, nicht geformt.',
    sub: 'Skulptur trifft Pflanze.',
    lead: 'Nicht geformt, sondern gewachsen. RUTA wartet auf die richtige Pflanze. Ein Objekt für drinnen und draußen, das Natur nicht imitiert, sondern ihr Platz gibt.',
  },
  organis: {
    line: 'organis',
    label: 'ORGANIS',
    type: 'Stehleuchte',
    eyebrow: 'Licht bekommt eine Form.',
    sub: 'Skulptur, die leuchtet.',
    lead: 'Weiche Linien, die Licht fangen, brechen und wieder freigeben. ORGANIS schafft Atmosphäre, die man nicht einrichtet, sondern erlebt.',
  },
};
