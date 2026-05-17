import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SITE } from '@/lib/site';
import { cn } from '@/lib/cn';

/**
 * Landing-Hero.
 *
 * - Ein einzelnes Heldenbild, kein Slider (Brief).
 * - Bild liegt unter `public/images/hero/atelier-kuranyi.jpg`. Solange die
 *   Datei fehlt, faellt der Hero auf einen ruhigen Material-Platzhalter
 *   zurueck — die Seite bricht nicht.
 * - Display-Headline = Markenversprechen aus dem Brief.
 */
const IMAGE_SRC: string | null = '/images/hero/atelier-kuranyi.jpg';

export function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-black text-paper"
      aria-labelledby="hero-title"
    >
      {/* Hintergrund-Layer */}
      <div className="absolute inset-0">
        {IMAGE_SRC ? (
          <Image
            src={IMAGE_SRC}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <HeroTexture />
        )}
        {/* Dunkler Verlauf von unten — sorgt fuer Lesbarkeit der Headline,
            laesst aber das Motiv im oberen Drittel ruhig stehen. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/10"
        />
      </div>

      <div className="container-edit relative flex min-h-[85vh] flex-col justify-end py-22 md:py-30">
        <Eyebrow as="p" className="text-paper/65">
          Manufaktur · Affalterbach
        </Eyebrow>

        <h1
          id="hero-title"
          className="mt-6 max-w-3xl font-display font-bold uppercase leading-[1.1] tracking-[-0.005em] text-paper text-[clamp(1.5rem,3.4vw,3rem)]"
        >
          {SITE.tagline}
        </h1>

        <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-paper/80 md:text-[19px]">
          {SITE.description}
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/was-wir-machen"
            className={cn(
              'inline-flex h-14 items-center justify-center gap-3 px-8',
              'bg-paper text-ink font-display text-[14px] uppercase tracking-[0.08em] font-medium',
              'transition-colors duration-slow ease-quiet hover:bg-stone',
            )}
          >
            Services
            <ArrowUpRight className="size-4" />
          </Link>
          <Link
            href="/shop"
            className={cn(
              'inline-flex h-14 items-center justify-center gap-3 px-8',
              'border border-paper/30 text-paper font-display text-[14px] uppercase tracking-[0.08em] font-medium',
              'transition-colors duration-slow ease-quiet hover:bg-paper hover:text-ink',
            )}
          >
            Zum Shop
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function HeroTexture() {
  // Material-Platzhalter — dezente vertikale Rippung wie 3D-Druckschichten.
  return (
    <div className="absolute inset-0 bg-ink">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 6px)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.4]"
        style={{
          background:
            'radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.06) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}
