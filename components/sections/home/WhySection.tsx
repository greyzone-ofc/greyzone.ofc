import { Acc } from '@/components/ui/Acc';

export function WhySection() {
  return (
    <section className="hero-copy-sec" aria-labelledby="whyTitle">
      <div className="hero-copy-in">
        <div className="hero-copy-grid">
          <div data-rv>
            <span className="eyebrow">Why the name</span>
            <h2 id="whyTitle">
              Most problems are not black or white. We build in the{' '}
              <Acc>grey</Acc> zone.
            </h2>
          </div>
          <p data-rv>
            Ready-made tools rarely fit how a business actually works, and
            building everything from a blank page wastes time. We work between
            the two: proven parts where they fit, custom design and code where
            they do not.
          </p>
        </div>
        <div className="shade-meter" data-rv aria-hidden="true">
          <div className="shade-track">
            <span className="shade-pin"></span>
          </div>
          <div className="shade-labels">
            <span>Ready-made</span>
            <b>GREYZONE</b>
            <span>From scratch</span>
          </div>
        </div>
      </div>
    </section>
  );
}
