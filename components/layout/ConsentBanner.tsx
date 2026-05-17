'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useHydratedConsent } from '@/lib/consent';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { cn } from '@/lib/cn';

/**
 * Fix unten am Bildschirmrand. Erscheint nur, solange noch keine Entscheidung
 * vorliegt (`decision === 'pending'`). Voller Re-Open läuft über
 * `/cookie-einstellungen`.
 *
 * Bewusst klein gehalten:
 *   - Zwei klare Aktionen + ein Details-Toggle
 *   - Keine Modal-Fokus-Falle (Banner ist non-blocking, der Nutzer kann
 *     weiter scrollen) — Brief §Bewegung, „Easing > Speed"
 *   - prefers-reduced-motion-aware durch globals.css
 */
export function ConsentBanner() {
  const { decision, setAll, setAnalytics, hydrated } = useHydratedConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [localAnalytics, setLocalAnalytics] = useState(false);

  if (!hydrated) return null;
  if (decision !== 'pending') return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      aria-describedby="consent-description"
      className={cn(
        'fixed inset-x-0 bottom-0 z-50',
        'border-t border-line bg-ink text-paper',
        'shadow-[0_-2px_24px_rgba(0,0,0,0.18)]',
      )}
    >
      <div className="container-edit py-6 md:py-7">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Eyebrow as="p" className="text-paper/60">
              Cookie-Einstellungen
            </Eyebrow>
            <h2 id="consent-title" className="mt-2 font-display text-[18px] font-medium md:text-[20px]">
              Wir nutzen Cookies, die Sie selbst wählen.
            </h2>
            <p id="consent-description" className="mt-3 max-w-2xl text-[14px] text-paper/75">
              Technisch notwendige Cookies sind immer aktiv. Mit Ihrer Einwilligung
              messen wir Reichweite über Google Analytics, um die Seite zu verbessern.
              Sie können Ihre Wahl jederzeit unter{' '}
              <Link href="/cookie-einstellungen" className="link-underline text-paper">
                Cookie-Einstellungen
              </Link>{' '}
              widerrufen. Details in unserer{' '}
              <Link href="/datenschutz" className="link-underline text-paper">
                Datenschutzerklärung
              </Link>
              .
            </p>

            {showDetails && (
              <fieldset className="mt-5 space-y-3 rounded-xs border border-paper/15 p-4">
                <legend className="px-2 text-eyebrow uppercase tracking-[0.12em] text-paper/55">
                  Details
                </legend>

                <label className="flex items-start gap-3 text-[14px] text-paper/85">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="mt-0.5 size-4 cursor-not-allowed accent-paper"
                    aria-label="Technisch notwendig (immer aktiv)"
                  />
                  <span>
                    <strong className="font-medium">Technisch notwendig.</strong>{' '}
                    Erhalten Funktionen wie Routing und den Shopify-Checkout.
                    Immer aktiv.
                  </span>
                </label>

                <label className="flex items-start gap-3 text-[14px] text-paper/85">
                  <input
                    type="checkbox"
                    checked={localAnalytics}
                    onChange={(e) => setLocalAnalytics(e.target.checked)}
                    className="mt-0.5 size-4 accent-paper"
                  />
                  <span>
                    <strong className="font-medium">Statistik (Google Analytics 4).</strong>{' '}
                    Anonyme Reichweitenmessung. Lädt erst nach Einwilligung.
                  </span>
                </label>
              </fieldset>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 md:flex-nowrap md:justify-end">
            {showDetails ? (
              <Button
                size="md"
                onClick={() => setAnalytics(localAnalytics)}
                className="bg-paper text-ink hover:bg-stone"
              >
                Auswahl speichern
              </Button>
            ) : (
              <Button
                size="md"
                variant="ghost"
                onClick={() => setShowDetails(true)}
                className="border-paper/30 text-paper hover:bg-paper hover:text-ink"
              >
                Einstellungen
              </Button>
            )}
            <Button
              size="md"
              variant="ghost"
              onClick={() => setAll(false)}
              className="border-paper/30 text-paper hover:bg-paper hover:text-ink"
            >
              Ablehnen
            </Button>
            <Button
              size="md"
              onClick={() => setAll(true)}
              className="bg-paper text-ink hover:bg-stone"
            >
              Akzeptieren
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
