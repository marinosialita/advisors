interface PageStubProps {
  eyebrow: string;
  title: string;
  lead?: string;
}

/**
 * Minimal placeholder for pages owned by other agents. Uses the brand
 * system; Layout already supplies the fixed-nav top offset.
 */
export default function PageStub({ eyebrow, title, lead }: PageStubProps) {
  return (
    <section className="bg-bone">
      <div className="mx-auto max-w-site px-gutter py-[clamp(96px,14vw,200px)]">
        <p className="eyebrow mb-8">{eyebrow}</p>
        <h1 className="max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1.05] tracking-[-0.015em] text-ink">
          {title}
        </h1>
        {lead && (
          <p className="mt-8 max-w-xl text-[clamp(1.05rem,1.4vw,1.3rem)] leading-[1.65] text-umber">
            {lead}
          </p>
        )}
        <span className="rule mt-16" aria-hidden="true" />
      </div>
    </section>
  );
}
