import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FOOTER_LEGAL, PRIMARY_NAV, SITE } from '@/lib/site';

/**
 * Footer auf Ink: schwarze Fläche, weiße Schrift.
 * Drei Spalten ab `md`. Newsletter und Designer-Credit bewusst weggelassen
 * (Auftraggeber-Vorgabe, siehe PLAN.md).
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    // bg-black (reines #000) statt --color-ink (#0A0A0A), damit die PNG-Plate
    // des Logos sauber im Footer aufgeht. Wenn ein vektorisiertes SVG-Logo
    // kommt, kann zurueck auf bg-ink gewechselt werden.
    <footer className="bg-black text-paper" role="contentinfo">
      <div className="container-edit grid gap-12 py-22 md:grid-cols-3 md:py-30">
        <div className="flex flex-col items-start gap-6">
          <Logo variant="footer" />
          <p className="max-w-xs text-[15px] text-paper/70">{SITE.tagline}</p>
          <p className="max-w-xs text-[13px] text-paper/50">{SITE.description}</p>
        </div>

        <div className="flex flex-col gap-4">
          <Eyebrow className="text-paper/50">Navigation</Eyebrow>
          <ul className="space-y-3">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-[15px]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <Eyebrow className="text-paper/50">Kontakt</Eyebrow>
          <address className="not-italic text-[15px] leading-relaxed text-paper/80">
            {SITE.name}
            <br />
            {SITE.address.street}
            <br />
            {SITE.address.postalCode} {SITE.address.city}
            <br />
            <br />
            <a href={`mailto:${SITE.email}`} className="link-underline">
              {SITE.email}
            </a>
            <br />
            <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="link-underline">
              {SITE.phone}
            </a>
          </address>
          <a
            href={SITE.social.instagram}
            rel="noopener noreferrer"
            target="_blank"
            className="link-underline text-[15px]"
          >
            Instagram {SITE.social.instagramHandle}
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-edit flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[12px] uppercase tracking-[0.12em] text-paper/50">
            © {year} {SITE.name}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LEGAL.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[12px] uppercase tracking-[0.12em] text-paper/60 hover:text-paper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
