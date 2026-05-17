'use client';

import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Consent-Modell.
 *  - `necessary` ist immer wahr und nicht abwählbar (technisch erforderlich,
 *    z. B. Session-Cookies des Shopify-Checkouts, Routing).
 *  - `analytics` deckt Google Analytics 4 ab und ist Opt-in.
 *  - `decision` markiert, ob der Nutzer überhaupt schon entschieden hat.
 *    Solange `decision === 'pending'`, blockt der Banner alle optionalen
 *    Verarbeitungen und ist sichtbar.
 *
 * § 25 TTDSG verlangt aktive Einwilligung für nicht-essenzielle Cookies;
 * Default ist deshalb Decline (alle optionalen Kategorien aus).
 */
export type ConsentDecision = 'pending' | 'granted' | 'denied' | 'custom';

export type ConsentState = {
  decision: ConsentDecision;
  /** Zeitpunkt der letzten Entscheidung (ISO-String) oder null. */
  decidedAt: string | null;
  necessary: true;
  analytics: boolean;
  setAll: (granted: boolean) => void;
  setAnalytics: (value: boolean) => void;
  reset: () => void;
};

const STORAGE_KEY = 'cd3d.consent.v1';

export const useConsentStore = create<ConsentState>()(
  persist(
    (set) => ({
      decision: 'pending',
      decidedAt: null,
      necessary: true,
      analytics: false,
      setAll: (granted) =>
        set({
          decision: granted ? 'granted' : 'denied',
          analytics: granted,
          decidedAt: new Date().toISOString(),
        }),
      setAnalytics: (value) =>
        set({
          analytics: value,
          decision: 'custom',
          decidedAt: new Date().toISOString(),
        }),
      reset: () =>
        set({
          decision: 'pending',
          analytics: false,
          decidedAt: null,
        }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      // Nur fachliche Felder persistieren — nicht die Setter-Closures.
      partialize: (state) => ({
        decision: state.decision,
        decidedAt: state.decidedAt,
        necessary: state.necessary,
        analytics: state.analytics,
      }),
      version: 1,
    },
  ),
);

/**
 * SSR-sicher: vor dem Hydrieren liefert dieser Hook `false` für `hydrated`,
 * damit Komponenten kein anderes Markup als der Server rendern.
 */
export function useHydratedConsent() {
  const state = useConsentStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Zustand-`persist` setzt nach Hydration die Werte aus LocalStorage —
    // wir warten einen Tick, um Mismatch-Warnungen zu vermeiden.
    setHydrated(true);
  }, []);

  return { ...state, hydrated };
}
