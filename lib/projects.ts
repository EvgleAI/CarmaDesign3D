import 'server-only';
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';

/**
 * Projekt-Loader: liest MDX-Dateien aus `content/projekte/`.
 * Frontmatter wird via Zod validiert; ungueltige Dateien werfen.
 * Body wird serverseitig mit next-mdx-remote/rsc gerendert (siehe Detailseite).
 */

const CONTENT_DIR = path.join(process.cwd(), 'content/projekte');

export const APPLICATION_TYPES = [
  'zonierung',
  'wandpaneel',
  'deckenverkleidung',
  'moebel',
  'theke',
  'sitzmoebel',
  'sonstiges',
] as const;

export type ApplicationType = (typeof APPLICATION_TYPES)[number];

const ImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
});

export const ProjectFrontmatterSchema = z.object({
  title: z.string(),
  client: z.string().optional(),
  location: z.string(),
  year: z.number().int(),
  collaborators: z.array(z.string()).optional(),
  applicationType: z.array(z.enum(APPLICATION_TYPES)),
  lead: z.string(),
  hero: ImageSchema.nullable().default(null),
  gallery: z.array(ImageSchema).default([]),
  featured: z.boolean().default(false),
  order: z.number().default(0),
});

export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;

export type Project = {
  slug: string;
  frontmatter: ProjectFrontmatter;
  /** Roh-MDX-String fuer den Detailseiten-Renderer. */
  content: string;
};

// ---------------------------------------------------------------------------
// Loader
// ---------------------------------------------------------------------------

async function safeReadDir(): Promise<string[]> {
  try {
    return await fs.readdir(CONTENT_DIR);
  } catch {
    return [];
  }
}

export async function getProjectSlugs(): Promise<string[]> {
  const entries = await safeReadDir();
  return entries.filter((e) => e.endsWith('.mdx')).map((e) => e.replace(/\.mdx$/, ''));
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const file = await fs.readFile(path.join(CONTENT_DIR, `${slug}.mdx`), 'utf-8');
    const { data, content } = matter(file);
    const frontmatter = ProjectFrontmatterSchema.parse(data);
    return { slug, frontmatter, content };
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw err;
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const slugs = await getProjectSlugs();
  const projects = await Promise.all(slugs.map((s) => getProject(s)));
  return projects
    .filter((p): p is Project => p !== null)
    .sort((a, b) => {
      // 1) order asc, 2) year desc, 3) title asc
      const aOrder = a.frontmatter.order ?? 0;
      const bOrder = b.frontmatter.order ?? 0;
      if (aOrder !== bOrder) return aOrder - bOrder;
      if (a.frontmatter.year !== b.frontmatter.year) return b.frontmatter.year - a.frontmatter.year;
      return a.frontmatter.title.localeCompare(b.frontmatter.title);
    });
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.frontmatter.featured);
}

// ---------------------------------------------------------------------------
// Pretty Helper
// ---------------------------------------------------------------------------

const APPLICATION_LABELS: Record<ApplicationType, string> = {
  zonierung: 'Zonierung',
  wandpaneel: 'Wandpaneel',
  deckenverkleidung: 'Deckenverkleidung',
  moebel: 'Möbel',
  theke: 'Theke',
  sitzmoebel: 'Sitzmöbel',
  sonstiges: 'Sonstiges',
};

export function formatApplicationTypes(types: ApplicationType[]): string {
  return types.map((t) => APPLICATION_LABELS[t]).join(' · ');
}
