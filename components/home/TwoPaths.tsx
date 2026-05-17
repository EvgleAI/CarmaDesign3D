import { Section } from '@/components/ui/Section';
import { Tile } from '@/components/ui/Tile';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Zwei Geschäftsstränge nebeneinander.
 *   - Individuell · Für Gestalter → /was-wir-machen
 *   - Kollektion · Für Zuhause → /shop
 *
 * Texte: erweiterte Aufzählung aus RESEARCH §2.4 (Brief-Vorgabe),
 * Kollektionssatz wörtlich aus der Live-Seite.
 */
export function TwoPaths() {
  return (
    <Section tone="paper" bleed>
      <div className="container-edit">
        <Reveal>
          <div className="grid items-end gap-6 md:grid-cols-2 md:gap-8">
            <div>
              <p className="eyebrow">Zwei Wege</p>
              <h2 className="mt-3 text-h2">Eine Manufaktur, zwei Anwendungen.</h2>
            </div>
            <p className="max-w-md text-body text-ink/70 md:justify-self-end md:text-right">
              Auftragsfertigung für Räume, die etwas darstellen. Möbelskulpturen
              für Räume, die jemand bewohnt.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
          <Reveal>
            <Tile
              href="/projekte"
              ratio="portrait"
              size="lg"
              eyebrow="Individuell"
              title="Projekte"
              sub="Maßgefertigte Raumgestaltung für Messe- und Ladenbau, Gastronomie, Hotellerie, Architektur, Kunst und den öffentlichen Raum."
              sizes="(min-width: 1024px) 50vw, 100vw"
              image={{
                src: '/images/landing/individuell.jpg',
                alt: 'Schwarze, freistehende Theke aus 3D-gedrucktem Kunststoff mit massiver Eichenholzplatte',
              }}
            />
          </Reveal>
          <Reveal delay={120}>
            <Tile
              href="/shop"
              ratio="portrait"
              size="lg"
              tone="stone"
              eyebrow="Kollektion"
              title="Store"
              sub="Möbelskulpturen aus der Manufaktur bei Stuttgart — vier Linien, gefertigt auf Bestellung."
              sizes="(min-width: 1024px) 50vw, 100vw"
              image={{
                src: '/images/landing/kollektion.jpeg',
                alt: 'Organischer Beistelltisch aus wiederverwertetem Kunststoff mit Holzplatte in einem Wohnraum',
              }}
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
