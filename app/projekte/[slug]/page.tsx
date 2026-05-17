import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronLeft, ArrowUpRight } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ProjectMeta } from '@/components/projects/ProjectMeta';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { getAllProjects, getProject, getProjectSlugs } from '@/lib/projects';
import { SITE } from '@/lib/site';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return pageMetadata({ title: 'Nicht gefunden', path: `/projekte/${slug}` });

  return pageMetadata({
    title: project.frontmatter.title,
    description: project.frontmatter.lead,
    path: `/projekte/${slug}`,
  });
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-12 text-h2" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-10 text-h3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-6 text-body leading-relaxed text-ink/85" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-6 list-disc space-y-2 pl-5 text-body text-ink/85" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="link-underline" {...props} />
  ),
};

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const all = await getAllProjects();
  const index = all.findIndex((p) => p.slug === slug);
  const next = index >= 0 ? all[(index + 1) % all.length] : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.frontmatter.title,
    description: project.frontmatter.lead,
    dateCreated: String(project.frontmatter.year),
    locationCreated: { '@type': 'Place', name: project.frontmatter.location },
    ...(project.frontmatter.client && {
      sponsor: { '@type': 'Organization', name: project.frontmatter.client },
    }),
    creator: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Projekte', path: '/projekte' },
    { name: project.frontmatter.title, path: `/projekte/${slug}` },
  ]);

  return (
    <>
      {/* Hero */}
      <section
        className="relative isolate overflow-hidden bg-ink text-paper"
        aria-labelledby="project-title"
      >
        {project.frontmatter.hero ? (
          <Image
            src={project.frontmatter.hero.src}
            alt={project.frontmatter.hero.alt}
            fill
            sizes="100vw"
            priority
            className="absolute inset-0 object-cover opacity-85"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 bg-ink"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 6px)',
            }}
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/15"
        />

        <div className="container-edit relative flex min-h-[70vh] flex-col justify-end py-22 md:py-30">
          <Link
            href="/projekte"
            className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.08em] text-paper/65 hover:text-paper"
          >
            <ChevronLeft className="size-4" />
            Alle Projekte
          </Link>
          <Eyebrow className="mt-6 text-paper/65">
            {project.frontmatter.location} · {project.frontmatter.year}
          </Eyebrow>
          <h1
            id="project-title"
            className="mt-4 font-display font-bold uppercase leading-[0.98] tracking-[-0.02em] text-paper text-[clamp(2.5rem,7vw,6rem)]"
          >
            {project.frontmatter.title}
          </h1>
          <p className="mt-8 max-w-3xl text-[17px] leading-relaxed text-paper/85 md:text-[19px]">
            {project.frontmatter.lead}
          </p>
        </div>
      </section>

      {/* Body + Meta */}
      <Section tone="paper">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
          <div className="md:sticky md:top-24 md:self-start">
            <ProjectMeta frontmatter={project.frontmatter} />
          </div>
          <article>
            <MDXRemote source={project.content} components={mdxComponents} />
          </article>
        </div>
      </Section>

      {/* Galerie */}
      <Section tone="stone">
        <Eyebrow>Bilder</Eyebrow>
        <h2 className="mt-3 text-h2">Eindruck.</h2>
        <div className="mt-16">
          <ProjectGallery frontmatter={project.frontmatter} />
        </div>
      </Section>

      {/* Naechstes Projekt */}
      {next && next.slug !== slug && (
        <section className="bg-ink text-paper">
          <Link
            href={`/projekte/${next.slug}`}
            className="group block focus-visible:outline-offset-4"
          >
            <div className="container-edit flex flex-col gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-24">
              <div>
                <Eyebrow className="text-paper/55">Nächstes Projekt</Eyebrow>
                <p className="mt-3 font-display text-[clamp(1.75rem,4vw,3rem)] font-bold uppercase leading-[1.05] tracking-[-0.015em] text-paper">
                  {next.frontmatter.title}
                </p>
                <p className="mt-2 text-[14px] text-paper/65">
                  {next.frontmatter.location} · {next.frontmatter.year}
                </p>
              </div>
              <span
                aria-hidden
                className="inline-flex h-12 w-12 items-center justify-center border border-paper/30 text-paper transition-colors duration-slow ease-quiet group-hover:border-paper group-hover:bg-paper group-hover:text-ink"
              >
                <ArrowUpRight className="size-5" />
              </span>
            </div>
          </Link>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </>
  );
}
