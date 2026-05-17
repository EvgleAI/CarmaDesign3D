import Link from 'next/link';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cn } from '@/lib/cn';
import { SITE } from '@/lib/site';

/**
 * Logo: SVG-Wortmarke mit `fill="currentColor"`.
 *
 * Inline-Embed via dangerouslySetInnerHTML, damit die Farbe vom Parent-Container
 * via `color`/`text-*` ererbt wird. Server-Component-only — zur Build-Zeit
 * einmal von Disk gelesen.
 *
 * Quelle: `public/brand/logo.svg` (potrace-vektorisiert aus dem Original-PNG,
 * viewBox 4000 × 1199).
 */

// Zur Build-/Server-Zeit einmalig laden.
const SVG_SOURCE = readFileSync(
  join(process.cwd(), 'public', 'brand', 'logo.svg'),
  'utf-8',
)
  // Inline-Wrapper soll die Hoehe der Komponente steuern, nicht das SVG-Attribut.
  .replace(/\swidth="[^"]*"/, '')
  .replace(/\sheight="[^"]*"/, '');

type LogoVariant = 'header' | 'footer';

const HEIGHT: Record<LogoVariant, string> = {
  header: 'h-7 md:h-8',
  footer: 'h-8 md:h-9',
};

export function Logo({
  variant = 'header',
  className,
  href = '/',
}: {
  variant?: LogoVariant;
  className?: string;
  href?: string | null;
}) {
  const mark = (
    <span
      aria-label={SITE.name}
      role="img"
      className={cn(
        'inline-block align-middle [&>svg]:block [&>svg]:h-full [&>svg]:w-auto',
        HEIGHT[variant],
        className,
      )}
      dangerouslySetInnerHTML={{ __html: SVG_SOURCE }}
    />
  );

  if (href === null) return mark;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 focus-visible:outline-offset-4"
      aria-label={`${SITE.name} — Startseite`}
    >
      {mark}
    </Link>
  );
}
