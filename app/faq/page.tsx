import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { SITE } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'FAQ',
  description: 'Häufige Fragen zu Material, Lieferung, Pflege und individuellen Anfragen.',
  path: '/faq',
});

/**
 * Inhalte zu Versand, Lieferzeit, Pflege, Rueckgabe sind woertlich aus der
 * Live-Kollektion (RESEARCH §5.3). Was noch fehlt, ist deutlich als TODO
 * markiert — keine erfundenen Antworten.
 */
export default function FaqPage() {
  return (
    <>
      <section className="bg-paper">
        <div className="container-edit py-22 md:py-30">
          <Eyebrow>Häufige Fragen</Eyebrow>
          <h1 className="mt-6 text-h1">Antworten auf das, was uns oft erreicht.</h1>
          <p className="mt-6 max-w-2xl text-body text-ink/70">
            Sollte Ihre Frage hier nicht stehen, melden Sie sich gerne direkt — wir
            antworten in der Regel innerhalb eines Werktags.
          </p>
        </div>
      </section>

      <Section tone="paper" innerClassName="max-w-3xl">
        <Accordion>
          <AccordionItem question="Wie lange dauert die Lieferung?">
            Unsere Objekte werden auf Bestellung gefertigt. Die übliche
            Lieferzeit beträgt <strong>14 Tage</strong> nach Auftragsbestätigung.
            Bei individuellen Anfragen besprechen wir den Zeitplan persönlich.
          </AccordionItem>

          <AccordionItem question="Was kostet der Versand?">
            Innerhalb Deutschlands versenden wir{' '}
            <strong>kostenfrei</strong>. Für andere Länder folgt eine Angabe —{' '}
            <Link href="/versand-zahlung" className="link-underline">
              siehe Versand &amp; Zahlung
            </Link>
            .
          </AccordionItem>

          <AccordionItem question="Aus welchem Material fertigen Sie?">
            Wir drucken großformatig aus <strong>wiederverwertetem Kunststoff</strong>{' '}
            aus der Region. Wo es sich anbietet, kombinieren wir den Druck mit{' '}
            <strong>massiver, geölter Eiche</strong> — beispielsweise bei DUNE und
            AELO. Alle Materialien sind in Deutschland verarbeitet.
          </AccordionItem>

          <AccordionItem question="Wie pflege ich die Oberflächen?">
            Die 3D-gedruckten Oberflächen lassen sich einfach mit einem feuchten
            Tuch abwischen. Für die massive Eichenholzplatte bei DUNE und AELO
            empfehlen wir gelegentliches Einreiben mit Holzöl.
          </AccordionItem>

          <AccordionItem question="Kann ich ein Objekt zurückgeben?">
            Bei Lagerware räumen wir Ihnen <strong>30 Tage Rückgaberecht</strong>{' '}
            ein. Bei Objekten, die für Sie individuell gefertigt wurden, kann das
            gesetzliche Widerrufsrecht eingeschränkt sein — Details siehe{' '}
            <Link href="/widerruf" className="link-underline">
              Widerruf
            </Link>
            .
          </AccordionItem>

          <AccordionItem question="Können Sie Sonderanfertigungen für mich oder mein Studio bauen?">
            Ja. Maßgefertigte Raumgestaltung ist unser zweiter Geschäftsstrang.
            Wir arbeiten unter anderem an Theken, Wandpaneelen, Zonierungen und
            Sitzmöbeln für Messe- und Ladenbau, Gastronomie, Hotellerie,
            Architektur, Kunst und den öffentlichen Raum. Eine Übersicht finden
            Sie unter{' '}
            <Link href="/was-wir-machen" className="link-underline">
              Was wir machen
            </Link>
            . Für ein erstes Gespräch schreiben Sie uns über{' '}
            <Link href="/kontakt" className="link-underline">
              Kontakt
            </Link>
            .
          </AccordionItem>

          <AccordionItem question="Gibt es eine Garantie auf die Beleuchtung von ORGANIS?">
            Auf die integrierte LED-Beleuchtung der ORGANIS-Stehleuchte gewähren
            wir <strong>3 Jahre Garantie</strong>. Die Lebensdauer der LED liegt
            bei über 30.000 Stunden.
          </AccordionItem>

          <AccordionItem question="Wo werden die Objekte gefertigt?">
            Alles wird in unserer Manufaktur in <strong>Affalterbach</strong>{' '}
            (Region Stuttgart) entworfen und gefertigt — eine Werkstatt, kein
            Werk.
          </AccordionItem>
        </Accordion>

        <p className="mt-12 text-body text-ink/65">
          Weitere Fragen? Schreiben Sie uns an{' '}
          <a href={`mailto:${SITE.email}`} className="link-underline">
            {SITE.email}
          </a>{' '}
          oder über das{' '}
          <Link href="/kontakt" className="link-underline">
            Kontaktformular
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
