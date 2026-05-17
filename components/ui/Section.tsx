import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type SectionTone = 'paper' | 'ink' | 'stone';

const TONE_CLASSES: Record<SectionTone, string> = {
  paper: 'bg-paper text-ink',
  ink: 'bg-ink text-paper',
  stone: 'bg-stone text-ink',
};

/**
 * Editoriale Sektion: konsistente vertikale Atemwege + Container.
 *   <Section tone="ink" className="…">…</Section>
 */
export function Section({
  as: Tag = 'section',
  tone = 'paper',
  bleed = false,
  className,
  innerClassName,
  children,
}: {
  as?: ElementType;
  tone?: SectionTone;
  /** Wenn true: kein horizontaler Container; Inhalte gehen randlos. */
  bleed?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn(TONE_CLASSES[tone], 'py-22 md:py-30', className)}>
      {bleed ? (
        children
      ) : (
        <div className={cn('container-edit', innerClassName)}>{children}</div>
      )}
    </Tag>
  );
}
