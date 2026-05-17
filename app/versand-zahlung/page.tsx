import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TodoNote } from '@/components/ui/TodoNote';

export const metadata = pageMetadata({
  title: 'Versand & Zahlung',
  description: 'Versandkosten, Lieferzeiten, Zahlungsarten.',
  path: '/versand-zahlung',
});

/**
 * Inhalte aus der Live-FAQ der Kollektionsseite uebernommen
 * (RESEARCH §5.3 / Versand-Boilerplate).
 * Zahlungsarten werden mit der Anbindung des echten Shops ergaenzt.
 */
export default function VersandZahlungPage() {
  return (
    <Section tone="paper" innerClassName="max-w-2xl">
      <Eyebrow>Service</Eyebrow>
      <h1 className="mt-6 text-h1">Versand &amp; Zahlung.</h1>
      <p className="mt-6 text-body text-ink/65">
        Wir fertigen auf Bestellung — die folgenden Angaben gelten für alle
        Kollektionsstücke. Bei Sonderanfertigungen besprechen wir Versand und
        Zahlung individuell.
      </p>

      <div className="mt-12 space-y-12 text-body leading-relaxed">
        <section>
          <h2 className="text-h3">Versand</h2>
          <dl className="mt-4 divide-y divide-line-soft border-y border-line-soft">
            <Row label="Inland" value="Kostenfreier Versand innerhalb Deutschlands." />
            <Row label="Fertigung" value="Auf Bestellung — keine Lagerware." />
            <Row label="Lieferzeit" value="14 Tage nach Auftragsbestätigung." />
          </dl>
          <TodoNote>
            Versand in andere EU-Länder und Schweiz/UK: Kosten und Zeiten
            ergänzen.
          </TodoNote>
        </section>

        <section>
          <h2 className="text-h3">Rückgabe</h2>
          <p className="mt-3 text-ink/85">
            <strong>30 Tage Rückgaberecht</strong> auf Lagerware. Bei Objekten,
            die für Sie individuell gefertigt wurden, kann das gesetzliche
            Widerrufsrecht eingeschränkt sein — Details unter{' '}
            <Link href="/widerruf" className="link-underline">
              Widerruf
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-h3">Zahlungsarten</h2>
          <TodoNote>
            Verfügbare Zahlungsarten listen, sobald die Shop-Anbindung steht.
            Üblich: Kreditkarte, PayPal, Apple Pay, SEPA, ggf. Klarna.
          </TodoNote>
          <p className="mt-3 text-ink/65">
            Bei Sonderanfertigungen vereinbaren wir die Zahlungsmodalitäten
            (z. B. Anzahlung, Schlussrechnung) im Auftragsgespräch.
          </p>
        </section>

        <section>
          <h2 className="text-h3">Preise</h2>
          <p className="mt-3 text-ink/85">
            Preise unserer Kollektionsstücke nennen wir Ihnen auf Anfrage. Für
            individuelle Auftragsarbeiten erhalten Sie ein Angebot nach kurzem
            Gespräch über{' '}
            <Link href="/kontakt" className="link-underline">
              Kontakt
            </Link>
            .
          </p>
        </section>
      </div>
    </Section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[10rem_1fr] gap-4 py-4">
      <dt className="text-eyebrow uppercase tracking-[0.12em] text-ink/55">{label}</dt>
      <dd className="font-display text-[15px] text-ink">{value}</dd>
    </div>
  );
}
