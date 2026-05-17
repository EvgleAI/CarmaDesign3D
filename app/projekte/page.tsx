import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { getAllProjects, type Project } from '@/lib/projects';

export const metadata = pageMetadata({
  title: 'Projekte',
  description:
    'Maßgefertigte Raumgestaltung für Messe- und Ladenbau, Gastronomie, Hotellerie, Architektur, Kunst und den öffentlichen Raum.',
  path: '/projekte',
});

/**
 * Projekt-Uebersicht.
 * Asymmetrisches Grid: erstes Featured-Projekt grossformatig, dann
 * abwechselnd 1- und 2-Spalter. Aktuell vier Eintraege; das Pattern haelt
 * sich auch bei spaeter mehr Projekten zusammen.
 */
export default async function ProjekteOverviewPage() {
  const projects = await getAllProjects();

  return (
    <>
      <section className="bg-paper">
        <div className="container-edit py-22 md:py-30">
          <Eyebrow>Individuell · Für Gestalter</Eyebrow>
          <h1 className="mt-6 text-h1">Außergewöhnliche Räume.</h1>
          <p className="mt-6 max-w-2xl text-body text-ink/70">
            Maßgefertigte Raumgestaltung für Messe- und Ladenbau, Gastronomie,
            Hotellerie, Architektur, Kunst und den öffentlichen Raum.
          </p>
        </div>
      </section>

      <Section tone="paper">
        {projects.length === 0 ? (
          <p className="text-body text-ink/60">
            Aktuell keine Projekte hinterlegt. Anfragen gerne über{' '}
            <Link href="/kontakt" className="link-underline">
              Kontakt
            </Link>
            .
          </p>
        ) : (
          <ProjectsGrid projects={projects} />
        )}
      </Section>

      <section className="bg-ink text-paper">
        <div className="container-edit grid items-center gap-10 py-22 md:grid-cols-[1fr_auto] md:py-30">
          <Reveal>
            <Eyebrow className="text-paper/55">Anfrage</Eyebrow>
            <p className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase leading-[1.05] tracking-[-0.015em]">
              Ein Projekt im Kopf?
            </p>
            <p className="mt-4 max-w-xl text-body text-paper/75">
              Wir besprechen Projekte am liebsten früh — und am liebsten persönlich.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Link
              href="/kontakt"
              className="inline-flex h-14 items-center justify-center gap-3 bg-paper px-8 font-display text-[14px] uppercase tracking-[0.08em] font-medium text-ink transition-colors duration-slow ease-quiet hover:bg-stone"
            >
              Zum Kontakt
              <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [first, ...rest] = projects;
  // Tipp: zur Vermeidung von Edge-Cases mit leerer Liste haben wir oben bereits frueh returned.
  if (!first) return null;

  return (
    <div className="space-y-6 md:space-y-8">
      <Reveal>
        <ProjectCard
          project={first}
          ratio="wide"
          size="lg"
          priority
          sizes="(min-width: 1024px) 1280px, 100vw"
        />
      </Reveal>

      {rest.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <ProjectCard
                project={p}
                ratio="landscape"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
