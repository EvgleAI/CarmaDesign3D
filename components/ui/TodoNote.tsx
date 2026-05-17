import { AlertTriangle } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Sichtbare TODO-Notiz fuer rechtliche Stub-Seiten.
 * Macht im Frontend deutlich, dass eine Passage noch nicht final ist,
 * damit niemand versehentlich Unfertiges fuer rechtsverbindlich haelt.
 *
 * Vor Go-Live MUESSEN alle TodoNotes durch geprueften Text ersetzt sein.
 */
export function TodoNote({
  title = 'Angabe folgt',
  children,
  className,
}: {
  title?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="note"
      aria-label="Hinweis – Inhalt noch in Bearbeitung"
      className={cn(
        'mt-3 flex items-start gap-3 border border-line-soft bg-stone/60 p-4',
        'text-[13px] leading-relaxed text-ink/75',
        className,
      )}
    >
      <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0 text-ink/70" />
      <div>
        <span className="font-display text-eyebrow uppercase tracking-[0.12em] text-ink/60">
          {title}
        </span>
        {children && <div className="mt-1">{children}</div>}
      </div>
    </div>
  );
}
