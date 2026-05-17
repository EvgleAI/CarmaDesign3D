import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TodoNote } from '@/components/ui/TodoNote';

export const metadata = pageMetadata({
  title: 'Widerruf',
  description: 'Widerrufsbelehrung und Muster-Widerrufsformular für Verbraucher.',
  path: '/widerruf',
});

export default function WiderrufPage() {
  return (
    <Section tone="paper" innerClassName="max-w-2xl">
      <Eyebrow>Rechtliches</Eyebrow>
      <h1 className="mt-6 text-h1">Widerruf.</h1>
      <p className="mt-6 text-body text-ink/65">
        Belehrung nach Anlage 1 zu Art. 246a § 1 Abs. 2 Satz 2 EGBGB sowie
        Muster-Widerrufsformular nach Anlage 2.
      </p>

      <p className="mt-8 border border-line-soft bg-stone/60 p-5 text-[14px] leading-relaxed text-ink/75">
        <strong className="font-medium">Hinweis fuer Redakteur:innen.</strong>{' '}
        Strukturgerüst. Konkreter Belehrungstext und Muster-Widerrufsformular
        werden anwaltlich freigegeben — bis dahin keine Veröffentlichung.
      </p>

      <section className="mt-12">
        <h2 className="text-h3">Widerrufsbelehrung</h2>
        <TodoNote>
          Belehrungstext nach Anlage 1 EGBGB einsetzen — inkl. Beginn, Frist,
          Erklärung, Rücksendekosten und Wertersatz.
        </TodoNote>
      </section>

      <section className="mt-10">
        <h2 className="text-h3">Muster-Widerrufsformular</h2>
        <TodoNote>
          Formular nach Anlage 2 EGBGB einsetzen (Empfänger, Erklärung, Datum
          der Bestellung, Datum des Erhalts, Name, Anschrift, Unterschrift bei
          Papierform).
        </TodoNote>
      </section>

      <section className="mt-10">
        <h2 className="text-h3">Ausschluss / Erlöschen des Widerrufsrechts</h2>
        <p className="mt-3 text-body text-ink/80">
          Da unsere Möbelskulpturen <strong>auf Bestellung gefertigt</strong>{' '}
          werden, kann das Widerrufsrecht in vielen Fällen nach § 312g Abs. 2
          Nr. 1 BGB ausgeschlossen sein (Waren, die nicht vorgefertigt sind und
          für deren Herstellung eine individuelle Auswahl oder Bestimmung durch
          den Verbraucher maßgeblich ist).
        </p>
        <TodoNote>
          Konkrete Formulierung anwaltlich prüfen — wann gilt der Ausschluss bei
          welchen Linien und Varianten?
        </TodoNote>
      </section>

      <p className="mt-12 text-body text-ink/65">
        Versand &amp; Rückgabe-Rahmen siehe{' '}
        <Link href="/versand-zahlung" className="link-underline">
          Versand &amp; Zahlung
        </Link>
        .
      </p>
    </Section>
  );
}
