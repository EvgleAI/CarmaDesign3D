/**
 * Skip-Link für Tastaturnutzer. Wird beim Fokus sichtbar.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xs focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
    >
      Zum Inhalt springen
    </a>
  );
}
