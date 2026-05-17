import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TodoNote } from '@/components/ui/TodoNote';

export const metadata = pageMetadata({
  title: 'AGB',
  description: 'Allgemeine Geschäftsbedingungen für Verbraucher.',
  path: '/agb',
});

const SECTIONS = [
  'Geltungsbereich',
  'Vertragspartner, Vertragsschluss',
  'Preise und Versandkosten',
  'Lieferung, Fertigung auf Bestellung',
  'Zahlung',
  'Eigentumsvorbehalt',
  'Sachmängelhaftung',
  'Haftung',
  'Datenschutz',
  'Streitbeilegung',
  'Schlussbestimmungen',
] as const;

export default function AgbPage() {
  return (
    <Section tone="paper" innerClassName="max-w-2xl">
      <Eyebrow>Rechtliches</Eyebrow>
      <h1 className="mt-6 text-h1">AGB.</h1>
      <p className="mt-6 text-body text-ink/65">
        Allgemeine Geschäftsbedingungen für Verbraucher. Für individuell
        gefertigte Auftragsarbeiten gelten gesonderte Konditionen, die wir Ihnen
        vor Auftragsannahme separat zur Verfügung stellen.
      </p>

      <p className="mt-8 border border-line-soft bg-stone/60 p-5 text-[14px] leading-relaxed text-ink/75">
        <strong className="font-medium">Hinweis fuer Redakteur:innen.</strong>{' '}
        Diese Seite ist ein Strukturgerüst. Verbindliche Klausel-Inhalte werden
        anwaltlich erstellt und hier eingefügt. Veröffentlichung erst nach
        Freigabe.
      </p>

      <ol className="mt-12 space-y-10 text-body leading-relaxed">
        {SECTIONS.map((title, i) => (
          <li key={title}>
            <h2 className="text-h3">
              <span className="text-ink/40">§ {i + 1}.</span> {title}
            </h2>
            <TodoNote title="Klausel folgt">
              Inhalt nach Freigabe einfügen.
            </TodoNote>
          </li>
        ))}
      </ol>

      <p className="mt-12 text-body text-ink/65">
        Hinweise zu Versand und Zahlung finden Sie unter{' '}
        <Link href="/versand-zahlung" className="link-underline">
          Versand &amp; Zahlung
        </Link>
        , zur Rückgabe unter{' '}
        <Link href="/widerruf" className="link-underline">
          Widerruf
        </Link>
        .
      </p>
    </Section>
  );
}
