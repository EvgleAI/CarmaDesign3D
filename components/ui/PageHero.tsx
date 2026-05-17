import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';

interface PageHeroProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  /** Pfad unter /public, z.B. '/images/hero/atelier-kuranyi.jpg'. Fehlt das Bild, greift der Textur-Fallback. */
  imageSrc?: string | null;
}

export function PageHero({ title, eyebrow, subtitle, imageSrc }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0">
        {imageSrc ? (
          <>
            <Image
              src={imageSrc}
              alt=""
              aria-hidden
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/10"
            />
          </>
        ) : (
          <PageHeroTexture />
        )}
      </div>

      <div className="container-edit relative flex min-h-[65vh] flex-col justify-end py-22 md:py-30">
        {eyebrow && <Eyebrow className="text-paper/65">{eyebrow}</Eyebrow>}
        <h1 className="mt-6 font-display font-bold uppercase leading-[0.95] tracking-[-0.02em] text-paper text-[clamp(3rem,8vw,7rem)]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-paper/80 md:text-[19px]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

function PageHeroTexture() {
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
