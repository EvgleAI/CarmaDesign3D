import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ContactForm } from '@/components/forms/ContactForm';
import { SITE } from '@/lib/site';
import { PageHero } from '@/components/ui/PageHero';

export const metadata = pageMetadata({
  title: 'Kontakt',
  description: 'Sprechen Sie mit uns. Manufaktur bei Stuttgart.',
  path: '/kontakt',
});

export default function KontaktPage() {
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
    'Anfrage über carmadesign3d.de',
  )}`;

  return (
    <>
      <PageHero
        eyebrow="Sprechen Sie mit uns"
        title="Kontakt."
        subtitle="Wir besprechen Projekte am liebsten früh — und am liebsten persönlich. Antworten in der Regel innerhalb eines Werktags."
        imageSrc={null}
      />

      <Section tone="paper">
        <div className="grid gap-16 md:grid-cols-[1fr_2fr] md:gap-20">
          <aside className="space-y-10">
            <div>
              <Eyebrow>Manufaktur</Eyebrow>
              <address className="mt-4 not-italic text-body leading-relaxed text-ink/85">
                {SITE.name}
                <br />
                {SITE.address.street}
                <br />
                {SITE.address.postalCode} {SITE.address.city}
                <br />
                Deutschland
              </address>
            </div>

            <div>
              <Eyebrow>Direkt</Eyebrow>
              <p className="mt-4 text-body leading-relaxed">
                <a href={mailto} className="link-underline">
                  {SITE.email}
                </a>
                <br />
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                  className="link-underline"
                >
                  {SITE.phone}
                </a>
              </p>
              <p className="mt-6 text-[14px] text-ink/60">
                Lieber per E-Mail? Schreiben Sie uns direkt — der Mailto-Link
                füllt das Empfänger-Feld bereits aus.
              </p>
            </div>

            <div>
              <Eyebrow>Vor Ort</Eyebrow>
              <p className="mt-4 text-body leading-relaxed text-ink/85">
                Besuche in der Werkstatt sind nach Absprache möglich. Bitte
                vorher Termin vereinbaren.
              </p>
            </div>

            <div>
              <Eyebrow>Folgen</Eyebrow>
              <p className="mt-4 text-body leading-relaxed">
                <a
                  href={SITE.social.instagram}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="link-underline"
                >
                  Instagram {SITE.social.instagramHandle}
                </a>
              </p>
            </div>
          </aside>

          <div>
            <Eyebrow>Schreiben Sie uns</Eyebrow>
            <h2 className="mt-3 text-h2">Eine Nachricht genügt.</h2>
            <p className="mt-4 max-w-xl text-body text-ink/70">
              Mit Anliegen, Zeitrahmen und gewünschten Materialien geht es am
              schnellsten — wir melden uns mit konkreten Vorschlägen.
            </p>

            <div className="mt-10">
              <ContactForm />
            </div>

            <p className="mt-8 text-[13px] text-ink/55">
              Pflichtfelder sind mit * markiert. Verarbeitung nach{' '}
              <Link href="/datenschutz" className="link-underline">
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
