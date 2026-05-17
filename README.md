# CarmaDesign3D — Premium-Website

Quiet luxury. Editorial. Datensparsam. Next.js 15 + TypeScript + Tailwind.

**Stand: V2 abgabereif.** Sieben Build-Blöcke abgeschlossen, offene Punkte in
[`TODO.md`](./TODO.md).

---

## Schnellstart

```bash
pnpm install
cp .env.example .env.local        # Werte ergänzen oder leer lassen
pnpm dev                          # http://localhost:3000
```

> Erfordert Node ≥ 20.11 und pnpm ≥ 9.

### Skripte

| Befehl | Zweck |
| --- | --- |
| `pnpm dev` | Lokaler Dev-Server mit Hot-Reload |
| `pnpm build` | Produktions-Build |
| `pnpm start` | Produktions-Server auf gebautem Output |
| `pnpm lint` | ESLint (Next-Core + TypeScript) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm format` | Prettier write |

Praktischer Smoke-Test: `pnpm build` muss durchlaufen — bricht u. a. bei
ungültigem MDX-Frontmatter (Zod) oder Type-Fehlern (TS strict).

---

## Tech-Stack (siehe `PLAN.md` für Begründung)

- **Next.js 15** (App Router) + **React 19** + **TypeScript strict**
- **Tailwind CSS 3.4** mit Design-Tokens (`tailwind.config.ts` + `app/globals.css`)
- **`next/font`** self-hosted: Roboto + Roboto Condensed (kein externer
  Google-Fonts-Request, DSGVO-konform)
- **MDX** (`next-mdx-remote` v5) für Projektinhalte, Frontmatter via
  `gray-matter` + Zod
- **Dummy-Shop** mit lokaler Datenquelle (`lib/shop-data.ts`), clientseitigem
  Cart (Zustand mit `persist`) und Mailto-Anfrage statt Checkout — eine
  spätere echte Anbindung ersetzt nur dieses eine Modul, UI bleibt
- **Google Analytics 4** consent-aware — lädt ausschließlich nach
  Banner-Accept und nur, wenn `NEXT_PUBLIC_GA_ID` gesetzt ist
- **Server Actions** (React 19) für das Kontaktformular, Zod-Validierung,
  Honeypot, In-Memory Rate-Limit
- **JSON-LD**: Organization (global), Product, CreativeWork (Projekt),
  BreadcrumbList (Shop- und Projekt-Detail)
- **Vercel** als Deploy-Ziel, Region `fra1`

### Bewusst NICHT enthalten

- Externe Schriften-Requests
- Tracking-Skripte vor Consent
- Newsletter-Anbindung (Auftraggeber-Vorgabe)
- Echter Checkout. Der Shop ist ein Dummy: Add-to-Cart funktioniert
  clientseitig (LocalStorage), der Abschluss-CTA öffnet eine vorausgefüllte
  E-Mail an `info@carmadesign3d.de`. Spätere echte Anbindung tauscht nur
  `lib/shop-data.ts` und `lib/cart.ts` aus.
- Stripe / Shopify im aktuellen Build

---

## Verzeichnisstruktur

```
app/
  layout.tsx              # Root: Fonts, Header, Footer, SkipLink, JSON-LD,
                          # ConsentBanner, GoogleAnalytics, CartDrawer
  globals.css             # Design-Tokens (CSS-Variablen) + Tailwind base
  page.tsx                # Landing (Hero, TwoPaths, Possibilities,
                          # FeaturedProjects, ShopPreview, BrandStatement)
  was-wir-machen/         # Editorial-Long-Page
  shop/
    page.tsx              # Vier Linien-Sektionen (AELO/DUNE/RUTA/ORGANIS)
    [handle]/page.tsx     # Produkt-Detail mit Gallery + Variants
  projekte/
    page.tsx              # Übersicht (asymmetrisches Grid)
    [slug]/page.tsx       # Detail mit MDX-Body, Meta, Galerie
  kontakt/
    page.tsx              # Form + Anschrift + Direkt-Kontakt
    actions.ts            # Server Action für Submit
  faq | impressum | datenschutz | agb | widerruf | versand-zahlung
  cookie-einstellungen/   # Consent verwalten & widerrufen
  sitemap.ts | robots.ts  # SEO
  not-found.tsx

components/
  analytics/GoogleAnalytics.tsx
  brand/Logo.tsx
  consent/ConsentSettings.tsx
  forms/ContactForm.tsx
  home/                   # Hero, TwoPaths, Possibilities, FeaturedProjects,
                          # ShopPreview, BrandStatement
  layout/                 # Header, Footer, SkipLink, ConsentBanner, MobileNav
  projects/               # ProjectCard, ProjectMeta, ProjectGallery
  shop/                   # ProductCard, ProductGrid, ProductGallery,
                          # VariantSelector, AddToCartButton, CartButton,
                          # CartDrawer, ProductDetailActions
  ui/                     # Section, Eyebrow, Button, Tile, Reveal,
                          # Accordion, TodoNote

content/
  projekte/*.mdx          # Vier Projekte, Frontmatter via Zod validiert

lib/
  cart.ts                 # Zustand-Store + persist
  cn.ts                   # Tailwind class joiner
  consent.ts              # Consent-Store
  fonts.ts                # next/font config
  projects.ts             # MDX-Loader, Zod-Schema, Helpers
  seo.ts                  # Metadata + JSON-LD
  shop-data.ts            # Dummy-Produktdaten
  shop-types.ts           # ShopLine, ShopProduct, CartLine, LINE_COPY
  site.ts                 # Markenkonstanten + Navigation

public/
  brand/logo.png          # 4000 × 1199, weiße Wortmarke auf schwarzer Plate
  brand/logo-source.svg   # Potrace-Stub (leere Pfade — durch sauberes SVG ersetzen)
```

---

## Inhaltspflege

### Logo austauschen

Aktuell `public/brand/logo.png`. Sobald ein vektorisiertes SVG vorliegt:
in `public/brand/logo.svg` ablegen und in `components/brand/Logo.tsx`
die Quelle von `logo.png` auf `logo.svg` umstellen. Im selben Schritt
kann der Footer-Hintergrund von `bg-black` zurück auf `bg-ink` gestellt
werden — das war ein Tweak gegen den PNG-Plate-Mismatch.

### Markenkonstanten ändern

Telefon, E-Mail, Adresse, Instagram-Handle: `lib/site.ts`. Ein einziger
Edit propagiert in Header, Footer, Impressum, Kontakt, JSON-LD und
Mail-Subjects.

### Neues Projekt anlegen

MDX-Datei unter `content/projekte/<slug>.mdx` mit Frontmatter:

```yaml
---
title: 'Atelier Kuranyi'
client: 'Romulo Kuranyi'         # optional
location: 'Stuttgart'
year: 2026
applicationType: ['theke']       # zonierung | wandpaneel | deckenverkleidung |
                                 # moebel | theke | sitzmoebel | sonstiges
lead: 'Kurze Einleitung.'
hero:
  src: '/images/projekte/atelier-kuranyi/hero.jpg'
  alt: 'Theke im Atelier Kuranyi'
gallery: []
featured: true                   # erscheint auf Home + Übersicht
order: 1
collaborators: []                # optional
---

# Body in MDX
```

Frontmatter wird via Zod validiert (`lib/projects.ts`). Sortierung:
`order` asc → `year` desc → `title` asc.

### Produkt hinzufügen

`lib/shop-data.ts` — Array `PRODUCTS` erweitern. `handle` muss unique sein,
`line` ist eine der vier Konstanten. Bilder unter
`public/images/shop/<handle>/…` ablegen und in `featuredImage` + `images`
referenzieren. Sitemap- und Detailseiten-Routen entstehen automatisch.

### Rechtstexte finalisieren

Alle Rechtsseiten (`/impressum`, `/datenschutz`, `/agb`, `/widerruf`,
`/versand-zahlung`) zeigen offene Stellen als sichtbare `TodoNote` an. Inhalt
durch Anwalt oder Generator (eRecht24, datenschutz-generator.de) einsetzen,
TodoNote entfernen. Komplette Liste in [`TODO.md`](./TODO.md).

### FAQ-Eintrag ergänzen

`app/faq/page.tsx` — einfach `<AccordionItem>` einfügen.

---

## Deployment auf Vercel

1. Repository nach GitHub/GitLab pushen.
2. In Vercel „New Project" → Import. Framework wird als Next.js erkannt.
3. ENV-Variablen aus `.env.example` setzen (alle dürfen leer bleiben — GA
   wird dann nicht geladen, Kontaktformular loggt nur).
4. Region `fra1` (Frankfurt) ist in `vercel.json` vorkonfiguriert.
5. Custom Domain hinzufügen, DNS auf Vercel zeigen.

Security-Header (X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
Permissions-Policy) und Cache-Header für statische Assets sind in
`vercel.json` definiert.

---

## Cookie-Banner & Analytics

- Banner erscheint, solange noch keine Entscheidung getroffen wurde.
- Drei Aktionen: **Akzeptieren · Ablehnen · Einstellungen**.
- Status persistiert in LocalStorage (`cd3d.consent.v1`).
- Widerruf jederzeit über `/cookie-einstellungen`.
- Google Analytics 4 lädt **nur**, wenn die Statistik-Kategorie akzeptiert
  ist **und** `NEXT_PUBLIC_GA_ID` gesetzt ist. Vorher wird kein Skript
  injiziert, kein Cookie gesetzt, keine Daten an Google übertragen.

---

## Offene Punkte / Roadmap

Siehe [`TODO.md`](./TODO.md) — gebündelte Liste nach Owner und Blocker-Status.
Kurzversion:

- **Rechtstexte** (Anwalt): Impressum-Pflichtfelder, Datenschutz, AGB,
  Widerruf
- **Assets**: Logo-SVG, Hero-Asset, Projektbilder, Produktbilder
- **Anbindungen**: Mail-Provider (für `submitContact`), GA-ID, optional
  echte Shop-Anbindung
- **Deployment**: Vercel-Projekt + Domain

---

## Recherche-Material

- [`RESEARCH.md`](./RESEARCH.md) — wörtliche Live-Wordings, Tonalität,
  Geschäftslogik, Linien-Specs.
- [`PLAN.md`](./PLAN.md) — Tech-Stack-Begründung, Seitenstruktur,
  Reihenfolge der sieben Build-Blöcke, Design-Tokens, Risiken.
- [`TODO.md`](./TODO.md) — offene Punkte vor Live-Gang.
