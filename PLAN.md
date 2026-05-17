# PLAN — CarmaDesign3D Premium-Website (V2)

Stand: 2026-05-10. Verbindlicher Umsetzungsplan. Erst nach Freigabe wird gebaut.

---

## 1. Leitprinzipien

1. **Quiet luxury.** Material, Bild und Weißraum tragen die Marke. Nicht die Typografie, nicht die Animation, nicht der Slogan.
2. **Editorial, nicht E-Commerce-Look.** Magazin-Charakter, große Bilder, ruhige Sektionen, lange Atemwege zwischen den Blöcken.
3. **Bedacht, nicht überstürzt.** Pro Block Commit, kurze Zusammenfassung, dann auf „Go".
4. **Kein Stock. Keine Fakes.** Wenn Inhalt fehlt, klar als TODO markieren. Keine erfundenen Rechtstexte, keine Lorem-Ipsum.
5. **Datensparsam.** Default ist kein Tracking. Kein externer Font-Request. Keine fremden Skripte ohne Consent.

---

## 2. Tech-Stack (Begründung)

| Layer | Wahl | Begründung |
| --- | --- | --- |
| Framework | **Next.js 15 (App Router) + TypeScript** | Server-Komponenten für statische Sektionen, Streaming, eingebauter Image-Optimizer, gute Vercel-Integration, Brief-Vorgabe. |
| Styling | **Tailwind CSS + CSS Variablen für Tokens** | Schnelle Iteration, eindeutige Design-Tokens; Tailwind-Config hält Schrift/Spacing/Farbe an einer Stelle. |
| UI-Bausteine | **shadcn/ui — punktuell** | Nur für Komponenten mit hohem A11y-Aufwand (Dialog, Accordion, Form-Inputs). Kein „Component-Soup". |
| Inhalt | **MDX (`next-mdx-remote-client`) + Frontmatter via Zod-Schema** | Projekte & Produkte als Dateien — versionierbar, ohne CMS, dabei strukturiert validierbar. |
| Bilder | **`next/image` + AVIF/WebP** | Automatische Format-Aushandlung, Responsive `sizes`, Lazy-Loading; CLS-frei. |
| Schriften | **`next/font/google` self-hosted** (Roboto, Roboto Condensed) | Brief verbietet externe Google-Fonts-Requests; self-host bringt DSGVO-Konformität und vermeidet FOUT. |
| Icons | **Lucide-Icon-Set on demand** | Minimal, einheitlich, tree-shakable. |
| Forms | **React Hook Form + Zod** | Typsichere Validierung, A11y-Labels eingebaut. |
| Mail-Versand | **Mailto-Fallback als Primärweg** (Brief), Server-Action-Slot als TODO | Brief erlaubt explizit Mailto-Fallback. Wir bauen die Server-Action-Route als Stub mit `// TODO E-Mail-Provider anbinden`, damit später Resend/SMTP eingehängt werden kann, ohne Form anzufassen. |
| Shop-Layer | **Shopify Storefront API (Headless)** via `@shopify/storefront-api-client` | Auftraggeber-Vorgabe: bestehende Shopify-Anbindung mit Checkout. Wir lesen Produkte/Varianten/Preise per Storefront API, bauen Cart serverseitig, leiten zum Shopify-hosted Checkout um. Kein PCI-DSS-Aufwand bei uns. Falls die Storefront API noch nicht verfügbar ist, fällt der Shop temporär auf MDX-Stubs zurück. |
| Analytics | **Google Analytics 4** (durch Auftraggeber selbst eingebunden) | Wir bauen einen Slot/Script-Loader, der GA4 **erst nach Consent** lädt. GA4-ID kommt vom Auftraggeber. |
| Consent | **Echtes Banner mit Choice** (Accept / Decline + Detailansicht) | GA4 ist nicht „technisch notwendig" → § 25 TTDSG verlangt aktive Einwilligung. Banner blockiert GA bis Accept. LocalStorage-Flag persistiert Entscheidung, Footer-Link „Cookie-Einstellungen" ermöglicht Widerruf. |
| i18n | `next-intl` strukturell vorbereitet, DE als Default | Routing-fähig (`/en/...`), wird nicht freigeschaltet bis Übersetzungen vorliegen. |
| SEO | `next/metadata`, sitemap.xml, robots.txt, JSON-LD (Organization, Product, BreadcrumbList) | Brief-Pflicht. |
| Linting | ESLint + Prettier + TypeScript strict | Standard. |
| Tests | **Playwright** für 2–3 Smoke-Tests (Routes laden, Form validiert) | Klein halten — keine Pyramide. |
| Package Manager | **pnpm** | Brief: „pnpm dev startet". |
| Deployment | **Vercel** | Brief. |

### Bewusst NICHT gewählt
- **Webflow / Sanity / Contentful**: Inhalte ändern sich selten, MDX reicht; jede CMS-Schicht ist DSGVO- und Latenz-Risiko.
- **Framer Motion ganzflächig**: Animation muss minimal bleiben. Wir nutzen CSS-Transitions + `IntersectionObserver` für Fade-Ins. Framer-Motion nur, falls eine Komponente es zwingend braucht.
- **Shopify Buy Button Embed**: Drittskripte und fremder Look — passt nicht zum Magazin-Look. Stattdessen **Headless via Storefront API** mit eigenen UI-Komponenten, Checkout via Redirect zum Shopify-hosted Checkout.
- **Newsletter-Anbindung**: Auftraggeber-Vorgabe: aktuell leer lassen. Footer enthält keinen Newsletter-Block.

---

## 3. Verzeichnisstruktur (Ziel)

```
app/
  layout.tsx                       // Root, Fonts, ConsentBanner, SkipLink
  globals.css                      // Tokens, Reset, Tailwind-Layer
  page.tsx                         // Landing
  was-wir-machen/page.tsx
  shop/
    page.tsx                       // Katalog (4 Linien-Sektionen)
    [handle]/page.tsx              // Produktdetail (handle = Shopify-Slug)
  projekte/
    page.tsx
    [slug]/page.tsx
  kontakt/page.tsx
  cookie-einstellungen/page.tsx    // Consent zurücksetzen / verwalten
  faq/page.tsx
  impressum/page.tsx
  datenschutz/page.tsx
  agb/page.tsx
  widerruf/page.tsx
  versand-zahlung/page.tsx
  api/
    contact/route.ts               // Server-Action-Stub, später echter Provider
    shopify/cart/route.ts          // Cart-Mutations (proxy)
  sitemap.ts
  robots.ts

components/
  layout/Header.tsx
  layout/Footer.tsx
  layout/SkipLink.tsx
  layout/ConsentBanner.tsx
  brand/Logo.tsx                   // schwarze Plate, weiße Wortmarke
  brand/Wordmark.tsx               // Fallback-SVG
  ui/Button.tsx
  ui/Link.tsx
  ui/Eyebrow.tsx
  ui/Section.tsx
  ui/Tile.tsx                      // grosse Hover-Tile
  ui/Accordion.tsx                 // shadcn-basis
  ui/Dialog.tsx                    // shadcn-basis
  shop/ProductGrid.tsx
  shop/ProductCard.tsx
  shop/ProductGallery.tsx
  shop/CartButton.tsx
  shop/CartDrawer.tsx
  shop/AddToCartButton.tsx
  shop/CheckoutButton.tsx          // redirect → Shopify checkoutUrl
  analytics/GoogleAnalytics.tsx    // Consent-aware Script-Loader
  projects/ProjectGrid.tsx
  projects/ProjectCard.tsx
  projects/ProjectHero.tsx
  forms/ContactForm.tsx
  home/Hero.tsx
  home/TwoPaths.tsx
  home/Possibilities.tsx
  home/FeaturedProjects.tsx
  home/ShopPreview.tsx
  home/BrandStatement.tsx

content/
  projekte/
    atelier-kuranyi.mdx
    zeitlos-stuttgart.mdx
    gemeinde-affalterbach.mdx
    jami-stuttgart.mdx
  copy/
    home.de.ts                     // textgebundene Inhalte
    was-wir-machen.de.ts
    legal/*.md                     // Rechtstexte (Stubs mit klaren TODOs)

lib/
  mdx.ts                           // MDX-Loader + Zod-Schemas
  shopify.ts                       // Storefront API Client + Queries
  cart.ts                          // Cart-Hook (Zustand) + Shopify Cart-API
  consent.ts                       // Consent-Status, Subscribe-Hook
  analytics.ts                     // GA-Init nach Consent
  seo.ts                           // metadata helpers + JSON-LD
  fonts.ts                         // next/font config
  i18n.ts                          // strukturell, dt. default

public/
  brand/logo.svg                   // platzhalter bis Asset kommt
  images/...                       // alle Bilder hier, optimiert

tests/
  smoke.spec.ts

.env.example
README.md
RESEARCH.md
PLAN.md
```

---

## 4. Design-Tokens

```css
/* CSS-Variablen, app/globals.css */
--color-ink: #0A0A0A;            /* fast schwarz */
--color-paper: #F6F4EF;          /* off-white, warm */
--color-stone: #E7E3DB;          /* warmes hellgrau */
--color-graphite: #1F1F1F;       /* dunkles UI */
--color-line: #2C2C2C;           /* Trennlinie auf dunkel */
--color-line-soft: #D9D5CB;      /* Trennlinie auf hell */
--color-accent: #TBD;            /* erst nach Logo-Sichtung */

--font-sans: var(--font-roboto);
--font-display: var(--font-roboto-condensed);

--space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
--space-6: 24px; --space-8: 32px; --space-12: 48px; --space-16: 64px;
--space-24: 96px; --space-32: 128px; --space-48: 192px;

--radius-0: 0; --radius-1: 2px;  /* fast nichts. quiet. */

--shadow-card: 0 1px 0 rgba(0,0,0,0.04);
```

**Type-Scale** (Brief-Empfehlung, in Tailwind-Config gemappt):

| Token | Größe | Schrift | Tracking |
| --- | --- | --- | --- |
| `display` | clamp(56, 9vw, 120)px | Condensed Bold | -0.02em |
| `h1` | 56px | Condensed Bold | -0.015em |
| `h2` | 36px | Condensed Bold | -0.01em |
| `h3` | 24px | Condensed Medium | -0.005em |
| `body` | 17px | Roboto Regular | 0 |
| `eyebrow` | 12px | Condensed Bold UPPERCASE | 0.12em |
| `caption` | 13px | Roboto Regular | 0 |

**Grid**: 12 Spalten, 1440 max-w mit `padding 32 → 64` auf md/lg, Gutter 24.

---

## 5. Seitenstruktur (detailliert)

### 5.1 `/` Landing
1. **Hero** — `home/Hero.tsx`
   - Display-Headline: **„Wir Formen Räume."**
   - Sub (Brief): „Einzigartige Raumgestaltung, 3D-gedruckt aus wiederverwertetem Material, gefertigt in Deutschland."
   - Ein Heldenbild oder Heldenvideo (statisch, kein Slider). Solange Asset fehlt → dunkler Material-Platzhalter mit Logo-Plate.
   - CTAs: „Was wir machen" (→ /was-wir-machen) und „Zum Shop" (→ /shop), sekundär.
2. **Zwei Wege** — `home/TwoPaths.tsx`
   - Zwei großformatige Tiles, je 50 % Breite ab `md`.
   - Tile A: Eyebrow „Individuell", Headline „Für Gestalter", Body (Brief-Wording) „Maßgefertigte Raumgestaltung für Messe- und Ladenbau, Gastronomie, Hotellerie, Architektur, Kunst, öffentlichen Raum." → /was-wir-machen
   - Tile B: Eyebrow „Kollektion", Headline „Für Zuhause", Body „Möbelskulpturen aus der Manufaktur bei Stuttgart." → /shop
3. **Möglichkeiten** — `home/Possibilities.tsx`
   - Drei Spalten: Zonierungen / Wandpaneele / Deckenverkleidungen, jeweils mit dem **wörtlich übernommenen** Live-Text (siehe RESEARCH.md §2.3).
   - Optional kleines Material-Detail-Bild je Karte.
4. **Featured Projekte** — `home/FeaturedProjects.tsx`
   - Drei Projekt-Tiles in editorialem Layout (1× groß über 2 Spalten, 2× kleiner darunter — asymmetrisch).
   - Quelle: `content/projekte/*.mdx`, gefiltert nach `featured: true`.
5. **Shop-Vorschau** — `home/ShopPreview.tsx`
   - Vier Produkte, je einer aus ORGANIS, RUTA, DUNE, AELO.
   - Solange keine Produktdaten: **vier echte MDX-Stubs** mit `// TODO Produktdaten` im Body. Anzeige nutzt Frontmatter-Platzhalter („ORGANIS · Produktname folgt").
6. **Markenstatement** — `home/BrandStatement.tsx`
   - Vollflächige Sektion, dunkler Hintergrund, eine Zeile zentriert:
     **„Exklusives Design braucht kein neues Material."**
   - Eyebrow darüber: „Was uns trägt".
7. **Footer**.

### 5.2 `/was-wir-machen`
- Editorial-Long-Page.
- Sektionen:
  1. Eyebrow „Manufaktur · Affalterbach" — Headline „Eine Werkstatt, kein Werk."
  2. Über-Uns-Text wörtlich aus RESEARCH §2.6 (langer Block, schöne Typo).
  3. „Was wir können" — Möglichkeiten-Block (3 Themen aus RESEARCH §2.3).
  4. „Für wen wir arbeiten" — Aufzählung der sechs Anwendungsfelder.
  5. „Material & Verfahren" — kurzes Trio: Material / Druck / Finishing (Copy als `// TODO Copy` mit Brief-Tonalität-Vorschlag).
  6. CTA-Block „Lassen Sie uns sprechen." → /kontakt.

### 5.3 `/shop`
- Hero-Strip (klein): „Kollektion · Für Zuhause".
- Vier Sektionen, eine pro Linie: **AELO**, **DUNE**, **RUTA**, **ORGANIS**.
- Jede Sektion: Eyebrow (poetischer Linien-Claim aus Live-Copy, siehe RESEARCH §5.3) + Linien-Name + Sub-Claim + Produkt-Grid.
- Produkte kommen über Shopify Storefront API. Mapping: jede Linie ist ein Shopify-Collection-Handle (`aelo`, `dune`, `ruta`, `organis`).
- ProductCard: Bild (1:1, `featuredImage` der Variante), Linie als Eyebrow, Name, Preis (`priceRange.minVariantPrice`) oder „Auf Anfrage", Hover → leichter Tonwechsel.

### 5.4 `/shop/[handle]`
- Daten via `productByHandle`-Query.
- Bilderserie (Gallery, Tastatur-navigierbar).
- Rechts: Linie/Eyebrow → Name → Preis → Variant-Selector (falls > 1 Variante, z. B. ORGANIS-Leistung/Lichtfarbe) → Material → Maße (HxBxT/Ø) → Verfügbarkeit → Pflegehinweise → CTA „In den Warenkorb".
- Cart-Aktion: `cartLinesAdd` Mutation, CartDrawer öffnet mit Item.
- CheckoutButton im Drawer: Redirect zu `cart.checkoutUrl` (Shopify-hosted Checkout).
- Unter dem Fold: redaktionelle Description aus `product.descriptionHtml` (sanitized) — die poetischen Lead-Texte (siehe RESEARCH §5.3) müssen im Shopify-Produkt-CMS gepflegt sein oder werden in MDX-Companion-Datei `content/shop/[handle].mdx` ergänzt.
- JSON-LD `Product` aus Shopify-Daten.

### 5.5 `/projekte` und `/projekte/[slug]`
- Übersicht: kuratiertes Tile-Grid, asymmetrisch.
- Detailseite:
  - Volles Hero-Bild.
  - Eyebrow „Projekt · Jahr" (z. B. „2024 · Stuttgart").
  - Headline = Projektname.
  - Lead-Absatz aus Frontmatter.
  - Meta-Block links: Auftraggeber, Ort, Jahr, Kollaborationen, Anwendungstyp.
  - MDX-Body mit Bildgalerie inline.
  - Footer-CTA „Mehr Projekte" → /projekte.

### 5.6 `/kontakt`
- Zwei Spalten ab `md`.
- Links: Anschrift, Tel, Mail (mailto mit `?subject=…` Fallback wie Brief verlangt).
- Rechts: Formular (Name, E-Mail, Anliegen-Typ als Select, Nachricht, **DSGVO-Checkbox** Pflicht).
- Submit → Server-Action → Resend → Bestätigungs-Empty-State auf Seite, ohne Redirect.
- Spam-Schutz: Honeypot + Rate-Limit über `headers.get('x-forwarded-for')`.

### 5.7 Footer-Pflichtseiten (Stubs mit echten Strukturen, ohne erfundene Inhalte)
- `/faq` — Accordion mit 6 Platzhalterfragen (Lieferzeit, Material, Pflege, Custom, Versand, Rückgabe). Antworten zu Versand/Lieferzeit/Rückgabe/Pflege werden aus der Live-Kollektionsseite übernommen (siehe RESEARCH §5.3); Rest als `// TODO Antwort`.
- `/impressum` — Gerüst gemäß § 5 DDG / § 18 MStV. Bekannte Felder aus RESEARCH §2.8 eingesetzt; offene Felder (USt-IdNr., Unternehmensform, Verantwortlicher § 18 MStV, OS-Plattform-Link) als deutlich sichtbare `// TODO`-Platzhalter im Frontend („Angabe folgt — Auftraggeber muss prüfen").
- `/datenschutz` — neu strukturiert auf den **tatsächlichen** Stack (Vercel-Hosting, self-hosted Fonts via next/font, Google Analytics 4 nach Consent, Shopify Storefront API + Shopify-Checkout, Kontaktformular-Server-Action, Logfiles bei Vercel). Jeder Abschnitt mit Platzhalter + `// TODO Rechtsfreigabe`. **Boilerplate von der Live-Webflow-Seite wird NICHT übernommen.**
- `/agb` — Gerüst B2C + Hinweis Sonder-AGB B2B; alle materiellen Klauseln als TODO (kein erfundener Volltext).
- `/widerruf` — Belehrungs- und Muster-Widerrufsformular-Struktur nach Anlage 1 + 2 EGBGB als reine Struktur; Volltext als TODO bis anwaltlich freigegeben.
- `/versand-zahlung` — Inhalte aus Live-FAQ-Boilerplate übernommen („Kostenloser Versand · gebaut auf Bestellung · 14 Tage Lieferzeit · 30 Tage Rückgaberecht"), Zahlungsarten ergeben sich aus Shopify-Konfiguration → `// TODO mit Shopify-Settings abgleichen`.
- `/cookie-einstellungen` — kleines UI, das Consent zurücksetzt und den Banner erneut anzeigt (Pflicht für DSGVO-Widerrufbarkeit).

---

## 6. Komponentenliste (was wirklich gebaut wird)

**Layout**: Header (Logo-Plate + Nav + CartButton), Footer (4 Spalten + Bottom-Strip), SkipLink, ConsentBanner.

**Brand**: Logo (Plate-Variante Header/Footer/dunkle vs. helle Section), Wordmark-Fallback.

**UI-Primitive**: Button (`primary`, `ghost`, `link`), Link (intern/extern, Underline-on-Hover), Eyebrow, Section (Container + Padding-Tokens), Tile (großformatige verlinkte Bildfläche mit Hover-Tonwechsel), Image (Wrapper um next/image mit Default-`sizes`), Accordion, Dialog, FormField, Input, Textarea, Checkbox, Select.

**Domain**:
- Shop: ProductGrid, ProductCard, ProductGallery, PriceTag, VariantSelector, AddToCartButton, CartButton, CartDrawer, CheckoutButton.
- Projects: ProjectGrid, ProjectCard, ProjectHero, ProjectMeta.
- Home: Hero, TwoPaths, Possibilities, FeaturedProjects, ShopPreview, BrandStatement.
- Forms: ContactForm.
- Analytics: GoogleAnalytics (consent-aware loader).

---

## 7. Inhalts-Schemas (Zod)

```ts
// Projekt (MDX)
{
  slug: string;
  title: string;
  client?: string;
  location: string;
  year: number;            // alle aktuellen Projekte = 2026
  collaborators?: string[];
  applicationType: ("zonierung"|"wandpaneel"|"deckenverkleidung"|"moebel"|"theke"|"sitzmoebel"|"sonstiges")[];
  lead: string;            // 1–2 Sätze
  hero: { src, alt };
  gallery: { src, alt }[];
  featured?: boolean;
  order?: number;
}

// Produkt: Shopify ist Source of Truth.
// Wir lesen Felder dynamisch:
//   handle, title, descriptionHtml, productType, tags,
//   priceRange.minVariantPrice.{amount,currencyCode},
//   featuredImage.{url,altText,width,height},
//   images(first: 12).edges.node.{url,altText,width,height},
//   options.{name,values},
//   variants(first: 20).edges.node.{id,title,price.amount,availableForSale,selectedOptions}
//
// Linien-Mapping über Shopify-Collections:
//   collection-handle ∈ { "aelo" | "dune" | "ruta" | "organis" }
//
// Optionale Companion-MDX-Datei `content/shop/[handle].mdx` für
// poetische Lead-Texte (Eyebrow + Sub + Lead aus RESEARCH §5.3),
// falls Shopify-Description sie nicht trägt.
```

---

## 8. SEO & A11y

- `metadata` pro Route (Title-Pattern „… — CarmaDesign3D", Description ≤ 160).
- `JSON-LD`: `Organization` global, `Product` auf Produktseite, `BreadcrumbList` für tiefe Routen.
- `sitemap.ts` generiert aus MDX-Glob.
- `robots.ts` mit `allow: /` plus `disallow: /api/`.
- Headings-Hierarchie 1×h1 pro Seite. Eyebrow ist visuell, aber `h2` semantisch.
- Tastaturnavigation: SkipLink, fokussichtbare Outlines `outline-offset-2`, Modal-Trap im CartDrawer.
- Bilder: `alt` zwingend per Zod-Schema.
- Farbkontrast: dunkel/hell Pairings auf WCAG AA prüfen (mindestens 4.5:1 für Body).
- `prefers-reduced-motion`: alle Fade-Ins respektieren das.

---

## 9. Performance-Strategie

- Komponenten als Server Components, Interaktion isoliert in Client Components (`Cart*`, `ContactForm`, `Accordion`, `ConsentBanner`).
- Shopify-Daten serverseitig holen, mit Next-`cache` Tag pro Produkt-/Collection-Handle, Revalidate alle 60 s; Manual Revalidate per Webhook möglich (TODO).
- Hero-Bild `priority`, alle anderen lazy.
- Schriften-Subset latin, `display: swap` durch `next/font` korrekt gehandhabt → kein FOUT.
- Keine Drittskripte ohne Consent. **Google Analytics 4** lädt strikt nach Accept; vor Accept wird kein GA-Skript injiziert (`<Script strategy="lazyOnload">` erst nach Consent-State).
- Lighthouse-Budget: P 95 / A 95 / BP 95 / SEO 100. Vor Abnahme Lighthouse-Prüfung lokal.

---

## 10. Umsetzungsreihenfolge (Commits / Blöcke)

Jeder Block schließt mit Zusammenfassung + Warten auf „Go".

1. **Setup** — Repo init, pnpm, Next 15 + TS, Tailwind, Lucide, ESLint/Prettier, `next/font` (Roboto + Roboto Condensed), `.env.example` (inkl. `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_API_TOKEN`, `NEXT_PUBLIC_GA_ID`), Verzeichnisstruktur, leere Routen mit Platzhaltern, Tokens, `vercel.json`, README-Grundgerüst.
2. **Layout & Brand** — Header (schwarze Logo-Plate, weiße Wortmarke; Platzhalter-SVG bis echtes Logo geliefert), Footer (3 Spalten + Bottom-Strip, **kein** Newsletter, **kein** Designer-Credit), SkipLink, ConsentBanner mit Choice + LocalStorage-Persistierung, Basistypografie, Spacing-System, Buttons, Eyebrow, Section, Tile.
3. **Landingpage** — Hero („Wir Formen Räume."), TwoPaths, Possibilities (wörtlich aus Live-Copy), FeaturedProjects (lädt aus MDX, 3 Tiles aus den 4 Projekten), ShopPreview (lädt 4 Produkte aus Shopify, jeweils 1 pro Linie), BrandStatement.
4. **Shop** — Shopify Storefront API-Client, `/shop` mit 4 Linien-Sektionen (Eyebrow-Claims wörtlich aus Live), `/shop/[handle]` mit Gallery + VariantSelector, Cart über Shopify Cart API (`cartCreate`, `cartLinesAdd`, `cartLinesUpdate`, `cartLinesRemove`), CartDrawer, CheckoutButton → `checkoutUrl` Redirect. Companion-MDX optional.
5. **Projekte** — `content/projekte/*` mit den **vier** Live-Referenzen (Atelier Kuranyi, Zeitlos Stuttgart, Gemeinde Affalterbach, Jami Stuttgart), Jahr 2026; Übersichtsseite, Detailseite mit MDX-Body, ProjectMeta-Block. Atelier-Kuranyi-Bild (geliefert) als Hero.
6. **Footer-Pflichtseiten** — /kontakt mit Form (Server-Action-Stub + Mailto-Fallback), /faq, /impressum (mit Platzhaltern für fehlende Pflichtangaben), /datenschutz (stack-passendes Gerüst inkl. GA-/Shopify-/Hosting-Blöcke + TODO Rechtsfreigabe), /agb, /widerruf, /versand-zahlung, /cookie-einstellungen. Keine erfundenen Rechtstexte.
7. **Politur** — SEO (metadata, sitemap, robots, JSON-LD Organization/Product/BreadcrumbList), Accessibility-Sweep, Lighthouse-Tuning, ConsentBanner-Politur (Detail-Modal, Widerruf-Pfad), GA-Loader gegen Consent verdrahten, Smoke-Tests, README-Finalisierung, TODO.md Bündelung.

Erst nach Block 7 gilt das Projekt als „abgabereif".

---

## 11. Risiken / Watchouts

- **Logo-SVG fehlt.** Bis Asset da ist: condensed-Wortmarken-Platzhalter, der die Live-Anmutung (extra-condensed, schwarze Plate, weißes Mark, „es"-Einschub in DESIGN ist optisch eigen — wir setzen vorerst eine schlichte Variante ohne den Einschub) annähert. Logo-Komponente ist Plate-basiert, echtes SVG ist 1:1-Drop-in.
- **Rechtstexte.** Impressum + Datenschutz + AGB + Widerruf dürfen nicht erfunden werden. Wir liefern Gerüste mit sichtbaren `// TODO`-Markierungen, Auftraggeber lässt sie anwaltlich oder per Generator (eRecht24, datenschutz-generator.de) füllen.
- **Shopify-Anbindung.** Benötigt `SHOPIFY_STORE_DOMAIN` + `SHOPIFY_STOREFRONT_API_TOKEN` + Collection-Handles (`aelo`, `dune`, `ruta`, `organis`). Solange diese fehlen, fällt der Shop in Block 4 auf eine Stub-Datenquelle zurück, die exakt die vier Live-Produkte (Maße/Material/Pflege aus RESEARCH §5.3) hartcodiert spiegelt — der Stub ist über ein einziges Modul `lib/shopify.ts` austauschbar.
- **Google Analytics 4.** Auftraggeber bindet GA selbst ein — wir liefern den Consent-aware Loader (`GoogleAnalytics`-Komponente liest `NEXT_PUBLIC_GA_ID`), so dass es genügt, die ENV-Variable zu setzen.
- **Hero-Asset.** Solange das Bild/Video fehlt: dunkles Material-Plate als Hero, vorgesehene `priority`-Optimierung trotzdem live.

---

## 12. Definition of Done (V2)

- `pnpm install && pnpm dev` startet ohne Fehler.
- Alle Routen aus §3 laden und sind A11y-konform.
- Vier MDX-Projekte vorhanden (Atelier Kuranyi, Zeitlos Stuttgart, Gemeinde Affalterbach, Jami Stuttgart).
- Shop liest entweder live aus Shopify (wenn ENV gesetzt) oder aus Stub-Modul (Fallback) — beides ohne Layout-Bruch.
- Cart-Logik vollständig: Add, Update, Remove, Drawer öffnen, Checkout-Redirect (mit Shopify-ENV).
- Consent-Banner blockiert GA bis Accept, persistiert in LocalStorage, ist über `/cookie-einstellungen` widerrufbar.
- README erklärt Setup, Deployment auf Vercel, Shopify-ENV, GA-ID-Einbau, Inhalte anlegen (Projekt-MDX).
- RESEARCH.md + PLAN.md aktuell.
- Lighthouse lokal: ≥ 95 / 95 / 95 / 100.
- Keine externen Schriften-Requests, keine Tracking-Skripte vor Consent.
- Offene TODOs in einem `TODO.md` gebündelt (Recht, Inhalte, Logo-Asset, Bild-Assets, Shopify-ENV, GA-ID, Instagram-Handle).
