import { pageMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ConsentSettings } from '@/components/consent/ConsentSettings';

export const metadata = pageMetadata({
  title: 'Cookie-Einstellungen',
  description: 'Einwilligungen verwalten und widerrufen.',
  path: '/cookie-einstellungen',
  noIndex: true,
});

export default function CookieEinstellungenPage() {
  return (
    <Section tone="paper" innerClassName="max-w-2xl">
      <Eyebrow>Datenschutz</Eyebrow>
      <h1 className="mt-6 text-h1">Cookie-Einstellungen.</h1>
      <p className="mt-6 text-body text-ink/70">
        Sie können Ihre Einwilligung zur Verarbeitung optionaler Cookies hier
        jederzeit anpassen, widerrufen oder erneut erteilen. Technisch notwendige
        Cookies sind nicht abwählbar.
      </p>
      <div className="mt-10">
        <ConsentSettings />
      </div>
    </Section>
  );
}
