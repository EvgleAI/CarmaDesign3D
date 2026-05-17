# TODO — CarmaDesign3D V2

Gebündelte offene Punkte vor Live-Gang. Stand: 2026-05-11.

Drei Spalten:
- **Owner** — wer entscheidet/liefert
- **Blocker** — kritisch für Go-Live? (✓ / —)
- **Notiz** — wo im Code

---

## Rechtstexte (anwaltlich freizugeben)

| Punkt | Owner | Blocker | Notiz |
| --- | --- | --- | --- |
| Impressum: USt-IdNr. nach § 27a UStG oder Hinweis Kleinunternehmer § 19 UStG | Auftraggeber + Steuerberater | ✓ | `app/impressum/page.tsx` — `TodoNote` markiert |
| Impressum: Verantwortlicher nach § 18 Abs. 2 MStV bestätigen | Auftraggeber | ✓ | `app/impressum/page.tsx` |
| Impressum: OS-Plattform-Hinweis (Art. 14 ODR-VO) + § 36 VSBG | Auftraggeber | ✓ | `app/impressum/page.tsx` |
| Datenschutz: anwaltliche Freigabe aller acht Sektionen | Auftraggeber + Anwalt/Generator | ✓ | `app/datenschutz/page.tsx` — alle `TodoNote` |
| Datenschutz: zuständige Aufsichtsbehörde (LfDI Baden-Württemberg) | Auftraggeber | ✓ | Sektion 8 |
| AGB: vollständiger Klauseltext (11 Paragraphen) | Anwalt | ✓ | `app/agb/page.tsx` |
| Widerruf: Belehrung nach Anlage 1 EGBGB | Anwalt | ✓ | `app/widerruf/page.tsx` |
| Widerruf: Muster-Widerrufsformular nach Anlage 2 EGBGB | Anwalt | ✓ | `app/widerruf/page.tsx` |
| Widerruf: § 312g Abs. 2 Nr. 1 BGB präzisieren (Sonderanfertigung) | Anwalt | ✓ | `app/widerruf/page.tsx` |
| Versand & Zahlung: EU-Versandkosten, Zahlungsarten | Auftraggeber | — (B2C) | `app/versand-zahlung/page.tsx` |

## Inhalte

| Punkt | Owner | Blocker | Notiz |
| --- | --- | --- | --- |
| Logo: sauberes SVG (aktuelles `logo-source.svg` ist leerer Potrace-Export) | Auftraggeber | — | nach `public/brand/logo.svg`, dann in `components/brand/Logo.tsx` Quelle umstellen |
| Hero-Asset (Bild oder kurzes Video) | Auftraggeber | — | `components/home/Hero.tsx`, `IMAGE_SRC` setzen |
| Projektbilder Atelier Kuranyi | Auftraggeber | — | `public/images/projekte/atelier-kuranyi/`, dann `hero` + `gallery` im Frontmatter |
| Projektbilder Zeitlos Stuttgart | Auftraggeber | — | s. o. |
| Projektbilder Gemeinde Affalterbach | Auftraggeber | — | s. o. |
| Projektbilder Jami Stuttgart + Copy | Auftraggeber | — | `content/projekte/jami-stuttgart.mdx` enthält `// TODO`-Marker |
| Produktbilder ORGANIS / AELO / DUNE / RUTA | Auftraggeber | — | `public/images/shop/<handle>/`, Referenz in `lib/shop-data.ts` |
| Preise (oder Hinweis bewusst auf Anfrage zu belassen) | Auftraggeber | — | aktuell `priceOnRequest: true` über alle Linien |
| Material- / Verfahren-Detailcopy auf `/was-wir-machen` | Auftraggeber | — | `app/was-wir-machen/page.tsx`, `PROCESS_STEPS` als Vorschlag |

## Technik & Anbindungen

| Punkt | Owner | Blocker | Notiz |
| --- | --- | --- | --- |
| Google Analytics 4: `NEXT_PUBLIC_GA_ID` setzen | Auftraggeber | — | Skript lädt erst nach Consent — kein Risiko ohne Wert |
| Mail-Provider für Kontaktformular (z. B. Resend / SMTP) | Auftraggeber | — | aktuell Logging-Stub in `app/kontakt/actions.ts` |
| Shop: echte Anbindung (Shopify / eigene Lösung) ersetzt `lib/shop-data.ts` + `lib/cart.ts` | Auftraggeber | — | UI bleibt unverändert |
| Rate-Limit für Kontakt-Action ggf. auf Vercel KV/Upstash umstellen | Dev | — | aktuell In-Memory in `app/kontakt/actions.ts` |

## SEO & A11y (Detail-Restschliff)

| Punkt | Owner | Blocker | Notiz |
| --- | --- | --- | --- |
| OG-Image (`opengraph-image.tsx`) erzeugen, sobald Hero-Asset da ist | Dev | — | aktuell kein OG-Image gesetzt |
| Lighthouse-Audit lokal nach Liefern der Assets | Dev | — | Erwartung ≥ 95/95/95/100 |
| Color-Contrast: TodoNote auf bg-stone — visuell prüfen | Dev | — | AA-Kontrast vermutlich ok |

## Hosting / Deployment

| Punkt | Owner | Blocker | Notiz |
| --- | --- | --- | --- |
| Vercel-Projekt anlegen + ENV-Variablen setzen (`NEXT_PUBLIC_SITE_URL`, ggf. `NEXT_PUBLIC_GA_ID`) | Auftraggeber + Dev | ✓ | `.env.example` als Vorlage |
| Domain `carmadesign3d.de` auf Vercel zeigen lassen | Auftraggeber | ✓ | DNS A/CNAME laut Vercel-Anleitung |
| HTTPS automatisch durch Vercel — Setup-Check | Dev | ✓ | — |
| 301-Redirects von alten Webflow-URLs (falls Pfade abweichen) | Dev | — | nach Inhalts-Migration prüfen, in `next.config.mjs` `redirects()` einbauen |

---

## Sobald oben „✓ Blocker" alle erledigt sind, ist Live-Gang möglich.
