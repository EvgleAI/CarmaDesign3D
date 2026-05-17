'use client';

import { useHydratedConsent } from '@/lib/consent';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/**
 * Interaktives Panel für /cookie-einstellungen.
 * Zeigt aktuellen Status, erlaubt Widerruf und Neu-Erteilen.
 */
export function ConsentSettings() {
  const { decision, decidedAt, analytics, setAll, setAnalytics, reset, hydrated } =
    useHydratedConsent();

  if (!hydrated) {
    return (
      <p className="text-body text-ink/50" aria-live="polite">
        Einstellungen werden geladen…
      </p>
    );
  }

  const status =
    decision === 'pending'
      ? 'Noch keine Auswahl getroffen.'
      : decision === 'denied'
        ? 'Nur technisch notwendige Cookies aktiv.'
        : analytics
          ? 'Statistik aktiviert.'
          : 'Statistik deaktiviert.';

  return (
    <div className="space-y-10">
      <div className="rounded-xs border border-line-soft p-5">
        <p className="text-eyebrow uppercase tracking-[0.12em] text-ink/55">Aktueller Status</p>
        <p className="mt-2 text-[16px] text-ink">{status}</p>
        {decidedAt && (
          <p className="mt-1 text-[13px] text-ink/55">
            Zuletzt gespeichert am{' '}
            {new Date(decidedAt).toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' })}{' '}
            Uhr.
          </p>
        )}
      </div>

      <div className="space-y-5">
        <Row
          title="Technisch notwendig"
          description="Werden zum Betrieb der Seite und für den Shopify-Checkout benötigt."
          checked
          disabled
        />
        <Row
          title="Statistik · Google Analytics 4"
          description="Anonyme Reichweitenmessung. Lädt erst nach Einwilligung."
          checked={analytics}
          onChange={(v) => setAnalytics(v)}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setAll(true)}>Alle akzeptieren</Button>
        <Button variant="ghost" onClick={() => setAll(false)}>
          Alle ablehnen
        </Button>
        <Button variant="link" onClick={() => reset()}>
          Einwilligung zurücksetzen
        </Button>
      </div>
    </div>
  );
}

function Row({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
}) {
  return (
    <label
      className={cn(
        'flex items-start justify-between gap-6 rounded-xs border border-line-soft p-5',
        disabled ? 'cursor-not-allowed bg-stone/40' : 'cursor-pointer hover:bg-stone/40',
      )}
    >
      <span>
        <span className="block font-display text-[15px] font-medium text-ink">{title}</span>
        <span className="mt-1 block text-[14px] text-ink/65">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 size-5 accent-ink"
        aria-label={title}
      />
    </label>
  );
}
