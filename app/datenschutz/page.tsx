import { pageMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TodoNote } from '@/components/ui/TodoNote';

export const metadata = pageMetadata({
  title: 'Datenschutz',
  description: 'Informationen zur Verarbeitung personenbezogener Daten nach DSGVO.',
  path: '/datenschutz',
});

/**
 * Datenschutz-Geruest, abgestimmt auf den tatsaechlichen Stack:
 *   - Hosting: Vercel
 *   - Schriften: self-hosted via next/font (KEINE Google-Fonts-Requests)
 *   - Analytics: Google Analytics 4, nur nach Consent
 *   - Shop: Dummy (clientseitig), Anfragen via mailto an info@carmadesign3d.de
 *   - Kontaktformular: Server Action mit Validierung; Mailversand-Provider folgt
 *
 * Boilerplate-Liste der alten Webflow-Seite wird NICHT uebernommen.
 * Alle materiellen Aussagen sind als TodoNote markiert.
 */
export default function DatenschutzPage() {
  return (
    <Section tone="paper" innerClassName="max-w-2xl">
      <Eyebrow>Rechtliches</Eyebrow>
      <h1 className="mt-6 text-h1">Datenschutz.</h1>
      <p className="mt-6 text-body text-ink/65">
        Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.
      </p>

      <p className="mt-8 border border-line-soft bg-stone/60 p-5 text-[14px] leading-relaxed text-ink/75">
        <strong className="font-medium">Hinweis fuer Redakteur:innen.</strong>{' '}
        Diese Seite ist ein Gerüst auf den tatsächlich eingesetzten Stack
        zugeschnitten. Vor dem Live-Gang müssen alle markierten Passagen
        anwaltlich freigegeben werden (z. B. über eRecht24 oder
        datenschutz-generator.de).
      </p>

      <div className="mt-12 space-y-12 text-body leading-relaxed">
        <section>
          <h2 className="text-h3">1. Verantwortlicher</h2>
          <TodoNote>
            Verantwortlicher i. S. d. Art. 4 Abs. 7 DSGVO — siehe Impressum.
            Anschrift, E-Mail, Telefon hier formal nennen.
          </TodoNote>
        </section>

        <section>
          <h2 className="text-h3">2. Hosting</h2>
          <p className="mt-3 text-ink/80">
            Diese Seite wird bei Vercel Inc. (Frankfurt-Region <code>fra1</code>)
            gehostet. Beim Aufruf werden technisch notwendige Zugriffsdaten
            (IP-Adresse, Datum/Zeitpunkt, User-Agent, Referrer) verarbeitet.
          </p>
          <TodoNote>
            Auftragsverarbeitung (Art. 28 DSGVO), Standardvertragsklauseln,
            Speicherdauer, Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO.
          </TodoNote>
        </section>

        <section>
          <h2 className="text-h3">3. Schriften</h2>
          <p className="mt-3 text-ink/80">
            Diese Seite verwendet ausschließlich lokal ausgelieferte Schriften
            („Roboto", „Roboto Condensed") über die Selbsthost-Funktion von
            Next.js. Es findet <strong>keine Verbindung zu Google-Servern</strong>{' '}
            statt; Ihre IP-Adresse wird zu Schrift-Zwecken nicht übermittelt.
          </p>
        </section>

        <section>
          <h2 className="text-h3">4. Cookies und Einwilligungen</h2>
          <p className="mt-3 text-ink/80">
            Wir setzen technisch notwendige Cookies, soweit sie für den Betrieb
            der Seite erforderlich sind (z. B. zur Speicherung Ihrer
            Cookie-Auswahl). Nicht-essenzielle Cookies — insbesondere
            Statistik-Cookies — werden ausschließlich nach Ihrer ausdrücklichen
            Einwilligung gemäß § 25 Abs. 1 TTDSG gesetzt.
          </p>
          <p className="mt-3 text-ink/80">
            Ihre Wahl können Sie jederzeit unter{' '}
            <a href="/cookie-einstellungen" className="link-underline">
              Cookie-Einstellungen
            </a>{' '}
            anpassen oder widerrufen.
          </p>
          <TodoNote>
            Auflistung gesetzter Cookies (Name, Zweck, Speicherdauer),
            Rechtsgrundlagen pro Kategorie, ggf. Drittlandhinweis bei US-Anbietern.
          </TodoNote>
        </section>

        <section>
          <h2 className="text-h3">5. Google Analytics 4</h2>
          <p className="mt-3 text-ink/80">
            Sofern Sie eingewilligt haben, setzen wir Google Analytics 4 (Google
            Ireland Ltd., Gordon House, 4 Barrow St, Dublin) zur anonymisierten
            Reichweitenmessung ein. Vor Einwilligung wird kein Skript geladen,
            keine Cookies gesetzt, keine Daten an Google übermittelt.
          </p>
          <TodoNote>
            Datenkategorien (gehashte IP, Geräte-/Browser-Infos, Seitenaufrufe),
            IP-Kürzung, Drittlandtransfer USA mit Standardvertragsklauseln und
            DPF-Hinweis, Opt-out via{' '}
            <a href="/cookie-einstellungen" className="link-underline">
              Cookie-Einstellungen
            </a>
            .
          </TodoNote>
        </section>

        <section>
          <h2 className="text-h3">6. Shop &amp; Anfragen</h2>
          <p className="mt-3 text-ink/80">
            Der Shop läuft aktuell als Dummy. Eine Anfrage über die
            „Anfrageliste" öffnet eine vorausgefüllte E-Mail an{' '}
            <a href="mailto:info@carmadesign3d.de" className="link-underline">
              info@carmadesign3d.de
            </a>{' '}
            — der Versand erfolgt über Ihr E-Mail-Programm und unterliegt dort
            den Bedingungen Ihres Anbieters.
          </p>
          <TodoNote>
            Hinweis ergänzen, sobald eine echte Shop-/Checkout-Anbindung
            (Shopify o. ä.) live ist, inklusive Zahlungsdienstleister.
          </TodoNote>
        </section>

        <section>
          <h2 className="text-h3">7. Kontaktformular</h2>
          <p className="mt-3 text-ink/80">
            Wenn Sie uns über das Kontaktformular schreiben, verarbeiten wir die
            angegebenen Daten (Name, E-Mail, Anliegen, Nachricht) zur Bearbeitung
            Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b/f DSGVO.
          </p>
          <TodoNote>
            Speicherdauer, Empfänger (Mail-Provider — Resend / SMTP / o. ä.),
            Auftragsverarbeitung, Lösch-/Widerspruchsrecht.
          </TodoNote>
        </section>

        <section>
          <h2 className="text-h3">8. Rechte der betroffenen Personen</h2>
          <p className="mt-3 text-ink/80">
            Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16),
            Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),
            Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO) sowie
            das Recht, sich bei einer Aufsichtsbehörde zu beschweren.
          </p>
          <TodoNote>
            Zuständige Aufsichtsbehörde nennen (Baden-Württemberg, LfDI BW).
          </TodoNote>
        </section>
      </div>
    </Section>
  );
}
