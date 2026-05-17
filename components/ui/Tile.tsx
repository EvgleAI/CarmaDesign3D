import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { cn } from '@/lib/cn';

/**
 * Editoriale Tile — verlinkte Bildfläche, optional mit Eyebrow + Titel + Subline.
 *
 * Aspect Ratios werden über `ratio` gesetzt; `paper` als Tone bedeutet, dass
 * fehlende Bilder als Material-Platzhalter gerendert werden — kein leeres Loch.
 *
 *   <Tile href="/projekte/atelier-kuranyi"
 *         image={{ src: '…', alt: '…' }}
 *         eyebrow="Stuttgart · 2026"
 *         title="Atelier Kuranyi"
 *         sub="Theke aus wiederverwertetem Kunststoff und Eiche" />
 */
type Ratio = 'square' | 'portrait' | 'landscape' | 'wide';

const RATIO_CLASSES: Record<Ratio, string> = {
  square: 'aspect-square',
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-[16/9]',
};

type Dim = 55 | 65;

const DIM_CLASSES: Record<Dim, string> = {
  55: 'brightness-[.55] group-hover:brightness-[.65]',
  65: 'brightness-[.65] group-hover:brightness-[.75]',
};

export function Tile({
  href,
  image,
  eyebrow,
  title,
  sub,
  ratio = 'landscape',
  tone = 'ink',
  size = 'md',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority,
  dim = 65,
  className,
}: {
  href: string;
  image?: { src: string; alt: string };
  eyebrow?: string;
  title: string;
  sub?: string;
  ratio?: Ratio;
  tone?: 'ink' | 'stone';
  size?: 'md' | 'lg';
  sizes?: string;
  priority?: boolean;
  /** Helligkeitsstufe des Bildes — 65 (default) oder 55 fuer staerker abgedunkelt. */
  dim?: Dim;
  className?: string;
}) {
  // Engeres Spacing bei kompakten Tiles (size=md). Grosse Tiles (size=lg) behalten
  // ihren grossen Atem fuer den editorialen Auftritt.
  const isLg = size === 'lg';
  const titleMarginTop = isLg ? 'mt-3' : 'mt-0';
  const subMarginTop = isLg ? 'mt-3' : 'mt-0';
  const arrowMarginTop = isLg ? 'mt-6' : 'mt-4';

  return (
    <Link
      href={href}
      className={cn(
        'group relative block overflow-hidden focus-visible:outline-offset-4',
        'transition-transform duration-slow ease-quiet',
        className,
      )}
    >
      <div className={cn('relative w-full', RATIO_CLASSES[ratio])}>
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={priority}
            // Helligkeit ueber den `dim`-Prop steuerbar.
            // group-hover hebt sie behutsam an, damit die Tile beim Hover etwas „aufgeht".
            className={cn(
              'object-cover transition-[transform,filter] duration-[1200ms] ease-quiet group-hover:scale-[1.02]',
              DIM_CLASSES[dim],
            )}
          />
        ) : (
          // Material-Platzhalter, bis echte Bilder geliefert werden.
          <PlaceholderTexture tone={tone} />
        )}

        {/* Dezenter Verlauf für Textlesbarkeit nur über dem unteren Drittel. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/55 via-ink/15 to-transparent"
        />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-paper">
          {eyebrow && <Eyebrow className="text-paper/70">{eyebrow}</Eyebrow>}
          <h3
            // Zeilenhoehe per inline-style: tailwind-merge stolpert sonst ueber den
            // arbitrary clamp()-Wert und entfernt die leading-Klasse.
            style={{ lineHeight: 1.05 }}
            className={cn(
              titleMarginTop,
              'font-display font-bold tracking-[-0.01em] text-paper',
              isLg ? 'text-[clamp(2rem,4vw,3rem)]' : 'text-[clamp(1.5rem,2.6vw,2.25rem)]',
            )}
          >
            {title}
          </h3>
          {sub && (
            // min-h nur bei groesseren Tiles (size=lg): reserviert ~2 Zeilen, damit
            // nebeneinanderliegende Tiles (z. B. TwoPaths Individuell + Kollektion)
            // ihre Eyebrow/Titel auf gleicher Linie haben. Bei size=md (kompakt,
            // z. B. Shop-Vorschau) waere das nur Leer-Reserve und schafft Luecken.
            <p
              className={cn(
                subMarginTop,
                'max-w-md text-[15px] leading-relaxed text-paper/80',
                isLg && 'min-h-[3em]',
              )}
            >
              {sub}
            </p>
          )}

          <span
            aria-hidden
            className={cn(
              arrowMarginTop,
              'inline-flex h-10 w-10 items-center justify-center',
              'border border-paper/40 text-paper transition-colors duration-slow ease-quiet',
              'group-hover:border-paper group-hover:bg-paper group-hover:text-ink',
            )}
          >
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function PlaceholderTexture({ tone }: { tone: 'ink' | 'stone' }) {
  // Keine externen Assets — leichter Verlauf + sehr feines Streifenmuster
  // imitiert Druckrippung dezent.
  const base = tone === 'ink' ? 'bg-ink' : 'bg-stone';
  return (
    <div className={cn('absolute inset-0', base)}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            tone === 'ink'
              ? 'repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 5px)'
              : 'repeating-linear-gradient(90deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 5px)',
        }}
      />
    </div>
  );
}
