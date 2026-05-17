import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Möglichkeiten — wörtliche Live-Copy (RESEARCH §2.3).
 * Drei Spalten ab `md`. Bilder unter `public/images/services/` werden
 * via next/image automatisch optimiert; brightness reduziert auf 65 %
 * — konsistent mit den Tiles auf der Landing.
 */
const ITEMS = [
  {
    title: 'Zonierungen',
    body: 'Modulare, anpassbare Raumtrenner aus einer kuratierten Auswahl an Designs, welche individuell konfiguriert werden können.',
    image: {
      src: '/images/services/zonierung.jpg',
      alt: 'Großzügiger Showroom-Raum, der durch raumhohe, baum-gemusterte Raumtrenner zoniert ist',
    },
  },
  {
    title: 'Wandpaneele',
    body: 'Von feiner Textur bis zu stark reliefierten Oberflächen, alles in einem Material aus wiederverwertetem Kunststoff.',
    image: {
      src: '/images/services/wandpaneel.jpg',
      alt: 'Strukturiertes, in Blautönen verlaufendes Wandpaneel als Inszenierung in einem Geschäftsraum',
    },
  },
  {
    title: 'Deckenverkleidungen',
    body: 'Von punktueller Akzentbeleuchtung bis zur vollflächigen Lichtdecke. Für Markeninszenierungen, bei denen Licht die Identität trägt.',
    image: {
      src: '/images/services/deckenverkleidung.jpg',
      alt: 'Strahlend blau leuchtende, würfelförmige Deckenverkleidung als Lichtdecke über einer Verkaufsfläche',
    },
  },
] as const;

export function Possibilities() {
  return (
    <Section tone="stone">
      <Reveal>
        <div className="max-w-2xl">
          <p className="eyebrow">Was wir Neues können</p>
          <h2 className="mt-3 text-h2">Drei Anwendungen, ein Material.</h2>
        </div>
      </Reveal>

      <ul className="mt-16 grid gap-12 md:grid-cols-3">
        {ITEMS.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 100} className="group">
            <div className="relative aspect-[4/3] overflow-hidden bg-ink/90">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                // Konsistent zur Tile-Logik: 65 % Helligkeit, Hover 75 %.
                className="object-cover brightness-[.65] transition-[transform,filter] duration-[1200ms] ease-quiet group-hover:scale-[1.02] group-hover:brightness-[.75]"
              />
            </div>
            <h3 className="mt-6 text-h3">{item.title}</h3>
            <p className="mt-3 text-body text-ink/75">{item.body}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
