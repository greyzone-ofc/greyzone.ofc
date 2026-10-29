import { Acc } from '@/components/ui/Acc';
import { getWhy } from '@/lib/content';

export async function WhySection() {
  const why = await getWhy();

  return (
    <section className="hero-copy-sec" aria-labelledby="whyTitle">
      <div className="hero-copy-in">
        <div className="hero-copy-grid">
          <div data-rv>
            <span className="eyebrow">{why.eyebrow}</span>
            <h2 id="whyTitle">
              {why.titleBefore} <Acc>{why.titleAccent}</Acc> {why.titleAfter}
            </h2>
          </div>
          <p data-rv>{why.body}</p>
        </div>
        <div className="shade-meter" data-rv aria-hidden="true">
          <div className="shade-track">
            <span className="shade-pin"></span>
          </div>
          <div className="shade-labels">
            <span>{why.meterLeft}</span>
            <b>{why.meterCenter}</b>
            <span>{why.meterRight}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
