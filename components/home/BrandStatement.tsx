import { Reveal } from '@/components/ui/Reveal';

/**
 * Markenstatement — wörtlich aus der Live-Seite.
 * Ganzseitige dunkle Sektion, viel Atem, eine Aussage.
 */
export function BrandStatement() {
  return (
    <section className="bg-ink text-paper" aria-labelledby="brand-statement-title">
      <div className="container-edit flex min-h-[70vh] flex-col items-center justify-center py-30 text-center md:py-48">
        <Reveal>
          <p className="eyebrow text-paper/55">Was uns trägt</p>
        </Reveal>
        <Reveal delay={120}>
          <p
            id="brand-statement-title"
            className="mt-8 max-w-[18ch] font-display font-bold uppercase leading-[1.05] tracking-[-0.015em] text-paper text-[clamp(2.25rem,5.5vw,4.5rem)]"
          >
            Exklusives Design braucht kein neues Material.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
