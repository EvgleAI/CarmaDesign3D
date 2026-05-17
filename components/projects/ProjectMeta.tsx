import { Eyebrow } from '@/components/ui/Eyebrow';
import { formatApplicationTypes } from '@/lib/projects';
import type { ProjectFrontmatter } from '@/lib/projects';

/**
 * Meta-Block auf der Detailseite: Auftraggeber, Ort, Jahr, Anwendung,
 * Kollaborationen — alles aus dem Frontmatter, fehlt heisst weggelassen.
 */
export function ProjectMeta({ frontmatter }: { frontmatter: ProjectFrontmatter }) {
  const rows: Array<{ label: string; value: string }> = [];

  if (frontmatter.client) rows.push({ label: 'Auftraggeber', value: frontmatter.client });
  rows.push({ label: 'Ort', value: frontmatter.location });
  rows.push({ label: 'Jahr', value: String(frontmatter.year) });
  if (frontmatter.applicationType.length > 0) {
    rows.push({ label: 'Anwendung', value: formatApplicationTypes(frontmatter.applicationType) });
  }
  if (frontmatter.collaborators && frontmatter.collaborators.length > 0) {
    rows.push({ label: 'Mit', value: frontmatter.collaborators.join(', ') });
  }

  return (
    <div>
      <Eyebrow as="h2">Projekt-Daten</Eyebrow>
      <dl className="mt-4 space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line-soft py-3">
            <dt className="text-eyebrow uppercase tracking-[0.12em] text-ink/55">{r.label}</dt>
            <dd className="font-display text-[15px] text-ink">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
