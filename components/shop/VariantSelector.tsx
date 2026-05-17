'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/cn';
import type { ShopOption, ShopVariant } from '@/lib/shop-types';

/**
 * Variant-Selector.
 *
 * Findet aus den Optionen + ausgewählten Werten die passende Variante.
 *   - Bei Single-Variant-Produkten rendert die Komponente nichts.
 *   - Der Parent verwaltet die Variant-Auswahl als State und setzt
 *     initial `variants[0]` — `onSelect` wird nur bei tatsächlichen
 *     Nutzer-Änderungen aufgerufen.
 */
export function VariantSelector({
  options,
  variants,
  onSelect,
}: {
  options: ShopOption[];
  variants: ShopVariant[];
  onSelect: (variant: ShopVariant) => void;
}) {
  const initialSelection = useMemo(() => {
    const out: Record<string, string> = {};
    for (const opt of options) {
      out[opt.name] = opt.values[0] ?? '';
    }
    return out;
  }, [options]);

  const [selected, setSelected] = useState<Record<string, string>>(initialSelection);

  if (options.length === 0) return null;

  const choose = (name: string, value: string) => {
    const next = { ...selected, [name]: value };
    setSelected(next);
    const variant =
      variants.find((v) => v.options.every((o) => next[o.name] === o.value)) ?? variants[0];
    if (variant) onSelect(variant);
  };

  return (
    <div className="space-y-5">
      {options.map((opt) => (
        <fieldset key={opt.name}>
          <legend className="font-display text-eyebrow uppercase tracking-[0.12em] text-ink/55">
            {opt.name}
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {opt.values.map((value) => {
              const isActive = selected[opt.name] === value;
              return (
                <label
                  key={value}
                  className={cn(
                    'cursor-pointer border px-4 py-2 font-display text-[13px] uppercase tracking-[0.08em]',
                    'transition-colors duration-slow ease-quiet',
                    isActive
                      ? 'border-ink bg-ink text-paper'
                      : 'border-ink/20 text-ink hover:border-ink',
                  )}
                >
                  <input
                    type="radio"
                    name={opt.name}
                    value={value}
                    checked={isActive}
                    onChange={() => choose(opt.name, value)}
                    className="sr-only"
                  />
                  {value}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
