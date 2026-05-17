import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind-bewusster Class-Joiner.
 *   cn('px-2 py-1', condition && 'bg-ink', tw`text-paper`)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
