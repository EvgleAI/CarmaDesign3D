import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Possibilities } from '@/components/home/Possibilities';
import { PageHero } from '@/components/ui/PageHero';

export const metadata = pageMetadata({
  title: 'Was wir machen',
  description:
    'Eine Werkstatt, kein Werk. Manufaktur bei Stuttgart. Großformatiger 3D-Druck aus wiederverwertetem Material.',
  path: '/was-wir-machen',
});

/**
 * Editorial-Long-Page.
 * Inhalte:
 *   - Der Über-uns-Text ist wörtlich aus der Live-Seite übernommen
 *     (RESEARCH §2.6) und absichtlich nicht gekürzt.
 *   - Die Anwendungsfelder folgen der Brief-Erweiterung
 *     („Architektur, Kunst, öffentlicher Raum").
 *   - Material & Verfahren ist im Brief-Ton vorbereitet; Detailcopy als
 *     `// TODO Copy` markiert — wird vom Auftraggeber finalisiert.
 */
const APPLICATION_FIELDS = [
  'Messe- und Ladenbau',
  'Gastronomie',
  'Hotellerie',
  'Architektur',
  'Kunst',
  'Öffentlicher Raum',
] as const;

const STORY_PARAGRAPHS: readonly string[] = [
  'Hinter CarMaDesign3D stehen Caro und Max — aus ihren Namen wurde der Markenname: Caro + Max = CarMaDesign3D. Sie teilt den Blick für Form, er das Wissen, sie zu bauen.',
  'Angefangen hat alles mit einem kleinen 3D-Drucker im Studium. Bauraum keine zwanzig Zentimeter, viel Geduld, viele Fehldrucke. Was die beiden dort gelernt haben, war nicht der Drucker, sondern das Material. Wie es sich verhält, was es trägt, wo es bricht.',
  'Heute stehen in einer Halle bei Stuttgart großformatige 3D-Drucker. Eine Werkstatt, kein Werk. Zusammen entwerfen und fertigen Caro und Max Skulpturen für Zuhause und für den Außenbereich. Objekte, die einen Raum verändern, nicht nur füllen.',
  'Das Material, aus dem sie entstehen, hatte bereits ein erstes Leben — wiederverwerteter Kunststoff aus der Region, dem niemand eine zweite Form gegeben hätte. Alles wird in Deutschland entworfen und gefertigt.',
] as const;

const PROCESS_STEPS = [
  {
    eyebrow: 'Material',
    title: 'Wiederverwerteter Kunststoff.',
    body: 'Industrielle Reststoffe aus der Region erhalten eine zweite Form. Witterungsbeständig im Außenbereich, weich genug für die Hand.',
  },
  {
    eyebrow: 'Druck',
    title: 'Großformatiger 3D-Druck.',
    body: 'Mehrere Meter Bauraum, gefertigt in einer Werkstatt bei Stuttgart. Jeder Druck ist eigen — Schichtung, Rippung, Maßhaltigkeit sind Teil des Entwurfs.',
  },
  {
    eyebrow: 'Finish',
    title: 'Hand und Holz.',
    body: 'Wo es sich anbietet, kombinieren wir den Druck mit massiver Eiche oder anderen Materialien. Verbindungen und Oberflächen werden händisch gesetzt.',
  },
] as const;

export default function WasWirMachenPage() {
  return (
    <>
      <PageHero
        eyebrow="Manufaktur · Affalterbach"
        title="Eine Werkstatt, kein Werk."
        subtitle="Skulpturale Objekte. Großformatig 3D-gedruckt. Gefertigt in der Manufaktur bei Stuttgart."
        imageSrc={null}
      />

      <Section tone="paper">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
          <Reveal>
            <Eyebrow>Unsere Geschichte</Eyebrow>
            <h2 className="mt-3 text-h2">Caro &amp; Max.</h2>
            <p className="mt-6 text-body text-ink/65">
              Aus zwei Namen wurde ein Markenname — und eine Werkstatt, in der
              jedes Objekt mit der Hand beginnt und mit der Maschine entsteht.
            </p>
          </Reveal>

          <div className="space-y-6 text-body leading-relaxed text-ink/85">
            {STORY_PARAGRAPHS.map((p, i) => (
              <Reveal key={i} delay={i * 90}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Possibilities />

      <Section tone="paper">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>Für wen wir arbeiten</Eyebrow>
            <h2 className="mt-3 text-h2">
              Maßgefertigte Raumgestaltung — sechs Felder, ein Materialverständnis.
            </h2>
            <p className="mt-6 text-body text-ink/70">
              Für Gestalter:innen, Architekt:innen und Marken, die Räume bauen,
              welche länger bleiben als ein Trend.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-px overflow-hidden border border-line-soft bg-line-soft md:mt-16 md:grid-cols-3">
          {APPLICATION_FIELDS.map((field, i) => (
            <Reveal as="li" key={field} delay={i * 60} className="bg-paper p-8 md:p-10">
              <span className="block font-display text-[13px] uppercase tracking-[0.12em] text-ink/55">
                0{i + 1}
              </span>
              <span className="mt-3 block font-display text-[22px] font-medium text-ink">
                {field}
              </span>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="stone">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>Material &amp; Verfahren</Eyebrow>
            <h2 className="mt-3 text-h2">Von der Halde zur Skulptur.</h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 100}>
              <Eyebrow>{step.eyebrow}</Eyebrow>
              <h3 className="mt-3 text-h3">{step.title}</h3>
              <p className="mt-3 text-body text-ink/75">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="bg-ink text-paper">
        <div className="container-edit grid items-center gap-10 py-22 md:grid-cols-[1fr_auto] md:py-30">
          <Reveal>
            <Eyebrow className="text-paper/55">Anfrage</Eyebrow>
            <p className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase leading-[1.05] tracking-[-0.015em]">
              Lassen Sie uns sprechen.
            </p>
            <p className="mt-4 max-w-xl text-body text-paper/75">
              Wir besprechen Projekte am liebsten früh — und am liebsten persönlich.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Link
              href="/kontakt"
              className="inline-flex h-14 items-center justify-center gap-3 bg-paper px-8 font-display text-[14px] uppercase tracking-[0.08em] font-medium text-ink transition-colors duration-slow ease-quiet hover:bg-stone"
            >
              Zum Kontakt
              <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
