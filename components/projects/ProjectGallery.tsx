import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import type { ProjectFrontmatter } from '@/lib/projects';

/**
 * Bilderstrecke auf der Projekt-Detailseite.
 * Ohne Bilder rendert die Komponente eine ruhige Note statt eines leeren Lochs.
 */
export function ProjectGallery({ frontmatter }: { frontmatter: ProjectFrontmatter }) {
  const gallery = frontmatter.gallery;

  if (gallery.length === 0) {
    return (
      <div className="border-y border-line-soft py-12 text-center">
        <Eyebrow>Bilder</Eyebrow>
        <p className="mt-3 text-body text-ink/55">Bildmaterial folgt.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {gallery.map((img, i) => (
        <figure key={img.src} className="relative w-full">
          <div className="relative aspect-[4/3] overflow-hidden bg-stone md:aspect-[16/9]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              priority={i === 0}
              className="object-cover"
            />
          </div>
          {img.alt && (
            <figcaption className="mt-3 text-[13px] text-ink/55">{img.alt}</figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
