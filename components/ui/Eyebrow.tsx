import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Editoriale Eyebrow (klein, condensed, gesperrt) — visuell Eyebrow,
 * semantisch frei wählbar. Default ist `p`, damit die Eyebrow nicht
 * unbeabsichtigt die Heading-Hierarchie aufmischt; wo sie semantisch
 * eine Section-Headline ist, `as="h2"`/`"h3"` setzen.
 */
type EyebrowTag = 'p' | 'span' | 'div' | 'h2' | 'h3' | 'h4';

export function Eyebrow({
  children,
  className,
  as: Tag = 'p',
}: {
  children: ReactNode;
  className?: string;
  as?: EyebrowTag;
}) {
  return <Tag className={cn('eyebrow', className)}>{children}</Tag>;
}
