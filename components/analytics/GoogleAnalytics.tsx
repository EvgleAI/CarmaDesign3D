'use client';

import Script from 'next/script';
import { useHydratedConsent } from '@/lib/consent';

/**
 * Consent-aware GA4-Loader.
 *
 * Verhalten:
 *   - Solange kein Consent erteilt wurde, wird NICHTS injiziert.
 *   - Sobald `analytics === true`, lädt der Script-Tag asynchron (`lazyOnload`).
 *   - Wenn `NEXT_PUBLIC_GA_ID` fehlt, wird ebenfalls nichts injiziert.
 *
 * Für eine zukünftige Consent Mode v2-Logik (gtag('consent', 'update', …))
 * würden wir zusätzlich auf `decision` reagieren — aktuell reicht das einfache
 * Modell, da GA erst nach Accept überhaupt geladen wird.
 */
export function GoogleAnalytics() {
  const { hydrated, analytics } = useHydratedConsent();
  const id = process.env.NEXT_PUBLIC_GA_ID;

  if (!hydrated) return null;
  if (!analytics) return null;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
