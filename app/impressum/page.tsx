import { pageMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TodoNote } from '@/components/ui/TodoNote';
import { SITE } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Impressum',
  description: 'Anbieterkennzeichnung nach § 5 DDG / § 18 MStV.',
  path: '/impressum',
  noIndex: false,
});

/**
 * Impressums-Geruest nach § 5 DDG / § 18 MStV.
 * Bekannte Felder aus Live-Impressum uebernommen; offene Felder sichtbar als
 * `TodoNote`. KEINE erfundenen Pflichtangaben.
 */
export default function ImpressumPage() {
  return (
    <Section tone="paper" innerClassName="max-w-2xl">
      <Eyebrow>Rechtliches</Eyebrow>
      <h1 className="mt-6 text-h1">Impressum.</h1>
      <p className="mt-6 text-body text-ink/65">
        Pflichtangaben gemäß § 5 DDG und § 18 Abs. 2 MStV.
      </p>

      <div className="mt-12 space-y-12 text-body leading-relaxed">
        <section>
          <h2 className="text-h3">Anbieter</h2>
          <p className="mt-3">
            CarMaDesign3D — Inhaber: {SITE.owner}
            <br />
            {SITE.address.street}
            <br />
            {SITE.address.postalCode} {SITE.address.city}
            <br />
            Deutschland
          </p>
        </section>

        <section>
          <h2 className="text-h3">Kontakt</h2>
          <p className="mt-3">
            Telefon: {SITE.phone}
            <br />
            E-Mail:{' '}
            <a href={`mailto:${SITE.email}`} className="link-underline">
              {SITE.email}
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-h3">Umsatzsteuer-Identifikationsnummer</h2>
          <TodoNote>
            USt-IdNr. nach § 27a UStG oder Hinweis auf Kleinunternehmer-Regelung
            gemäß § 19 UStG ergänzen.
          </TodoNote>
        </section>

        <section>
          <h2 className="text-h3">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <TodoNote>
            Verantwortliche Person (vermutlich {SITE.owner}, Adresse wie oben) bitte
            bestätigen oder ergänzen.
          </TodoNote>
        </section>

        <section>
          <h2 className="text-h3">Online-Streitbeilegung</h2>
          <TodoNote>
            Hinweis auf die OS-Plattform der EU-Kommission gemäß Art. 14 ODR-VO
            sowie ggf. Verbraucherschlichtungsstelle nach § 36 VSBG ergänzen.
          </TodoNote>
        </section>

        <section>
          <h2 className="text-h3">Haftung für Inhalte und Links</h2>
          <p className="mt-3 text-ink/80">
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
            für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten
            sind ausschließlich deren Betreiber verantwortlich.
          </p>
        </section>

        <section>
          <h2 className="text-h3">Urheberrecht</h2>
          <p className="mt-3 text-ink/80">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
            Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als
            solche gekennzeichnet.
          </p>
        </section>
      </div>
    </Section>
  );
}
