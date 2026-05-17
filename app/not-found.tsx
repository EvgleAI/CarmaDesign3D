import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Section tone="paper" innerClassName="max-w-2xl">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-6 text-h1">Seite nicht gefunden.</h1>
      <p className="mt-6 text-body text-ink/70">
        Die gesuchte Seite existiert nicht oder wurde verschoben.
      </p>
      <div className="mt-10">
        <Button href="/">Zur Startseite</Button>
      </div>
    </Section>
  );
}
