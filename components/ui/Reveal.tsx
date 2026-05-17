'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Sehr leichter Fade-In beim Scrollen.
 *   - Setzt `data-visible="true"` einmalig, sobald das Element in den Viewport
 *     tritt. Die eigentliche Animation lebt in app/globals.css (`.reveal`).
 *   - `prefers-reduced-motion: reduce` wird durch die globalen CSS-Overrides
 *     respektiert — die Komponente macht JS-seitig nichts Aufwendiges.
 *   - SSR-sicher: Vor Hydration ist `data-visible` nicht gesetzt; nach
 *     `mounted` startet der Observer.
 */
export function Reveal({
  as: Tag = 'div',
  children,
  className,
  delay = 0,
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Falls IntersectionObserver fehlt (sehr alter Browser): direkt einblenden.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <Tag
      ref={ref}
      data-visible={visible ? 'true' : undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn('reveal', className)}
    >
      {children}
    </Tag>
  );
}
