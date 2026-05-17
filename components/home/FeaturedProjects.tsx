import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { getFeaturedProjects } from '@/lib/projects';

/**
 * Featured Projekte auf der Landing.
 *
 * Layout:
 *   - 1 grosses Hero-Tile (volle Breite, wide)
 *   - bis zu 3 sekundaere Tiles als 3-Spalter darunter
 *   - bei weniger Featured-Projekten wird das Grid kleiner; min 1 Tile.
 *
 * Quelle: MDX-Dateien mit `featured: true` (siehe `content/projekte/`).
 */
export async function FeaturedProjects() {
  const featured = await getFeaturedProjects();
  if (featured.length === 0) return null;

  const [hero, ...rest] = featured;
  const secondary = rest.slice(0, 3);

  return (
    <Section tone="paper">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow">Projekte</p>
            <h2 className="mt-3 text-h2">Ausgewählte Projekte.</h2>
          </div>
          <Link
            href="/projekte"
            className="link-underline inline-flex items-center gap-2 font-display text-[14px] uppercase tracking-[0.08em]"
          >
            Alle Projekte
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-16 space-y-6 md:space-y-8">
        {hero && (
          <Reveal>
            <ProjectCard
              project={hero}
              ratio="wide"
              size="lg"
              priority
              sizes="(min-width: 1024px) 1280px, 100vw"
            />
          </Reveal>
        )}

        {secondary.length > 0 && (
          <div
            className={
              'grid gap-4 md:gap-6 ' +
              (secondary.length === 1
                ? 'md:grid-cols-1'
                : secondary.length === 2
                  ? 'md:grid-cols-2'
                  : 'md:grid-cols-3')
            }
          >
            {secondary.map((p, i) => (
              <Reveal key={p.slug} delay={(i + 1) * 100}>
                <ProjectCard
                  project={p}
                  ratio="square"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
