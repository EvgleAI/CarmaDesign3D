import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

/**
 * Accordion auf Basis von <details>/<summary>.
 *  - Semantisch korrekt, keyboard-A11y eingebaut, kein JS noetig.
 *  - Aufeinander folgende Items sitzen in einer <ul role="list">,
 *    visuell als Border-getrennte Liste.
 */

export function Accordion({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <ul role="list" className={cn('divide-y divide-line-soft border-y border-line-soft', className)}>
      {children}
    </ul>
  );
}

export function AccordionItem({
  question,
  children,
  defaultOpen,
}: {
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <li>
      <details className="group" open={defaultOpen}>
        <summary
          className={cn(
            'flex cursor-pointer list-none items-center justify-between gap-6 py-6',
            'font-display text-[18px] font-medium text-ink',
            'transition-colors duration-slow ease-quiet hover:text-ink',
            'focus-visible:outline-offset-4',
            'md:text-[20px]',
          )}
        >
          <span>{question}</span>
          <ChevronDown
            className="size-5 shrink-0 text-ink/60 transition-transform duration-slow ease-quiet group-open:rotate-180"
            aria-hidden
          />
        </summary>
        <div className="pb-6 text-body leading-relaxed text-ink/75">{children}</div>
      </details>
    </li>
  );
}
