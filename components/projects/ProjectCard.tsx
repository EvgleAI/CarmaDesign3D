import { Tile } from '@/components/ui/Tile';
import type { Project } from '@/lib/projects';

/**
 * Projekt-Tile fuer Uebersicht und Featured-Sektion.
 * Setzt auf das universelle <Tile>-Primitive, mappt nur Frontmatter darauf.
 */
export function ProjectCard({
  project,
  ratio = 'portrait',
  size = 'md',
  sizes,
  priority,
}: {
  project: Project;
  ratio?: 'portrait' | 'landscape' | 'square' | 'wide';
  size?: 'md' | 'lg';
  sizes?: string;
  priority?: boolean;
}) {
  const fm = project.frontmatter;
  return (
    <Tile
      href={`/projekte/${project.slug}`}
      ratio={ratio}
      size={size}
      sizes={sizes}
      priority={priority}
      eyebrow={`${fm.location} · ${fm.year}`}
      title={fm.title}
      sub={fm.lead}
      image={fm.hero ?? undefined}
      tone="ink"
    />
  );
}
