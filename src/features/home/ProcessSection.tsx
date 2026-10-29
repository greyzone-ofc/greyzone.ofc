import Image from 'next/image';
import { Acc } from '@/components/ui/Acc';
import { getProcessSteps } from '@/lib/content';

const buildCardClass = [
  'b-c1',
  'b-c2',
  'b-c3',
  'b-c4',
  'b-c5',
  'b-c6',
] as const;

export async function ProcessSection() {
  const processSteps = await getProcessSteps();
  if (processSteps.length === 0) return null;

  return (
    <section className="build" id="process" data-fx="marquee" aria-labelledby="buildTitle">
      <div className="build-pin">
        <div className="build-head" data-rv>
          <span className="eyebrow">Our process</span>
          <h2 id="buildTitle">
            How we <Acc>build</Acc>
          </h2>
          <p className="build-lede">
            This is the part that decides whether a project succeeds. Six steps,
            in order, with nothing hidden: you always know what is happening,
            what it costs, and what comes next.
          </p>
        </div>
        <div className="build-tools">
          <button type="button" className="build-toggle" aria-pressed={false}>
            <i aria-hidden="true"></i>
            <span>Pause</span>
          </button>
        </div>
        <div className="build-marquee">
          <div className="build-track">
            <div className="build-group">
              {processSteps.map((step, index) => (
                <article
                  className={`build-card ${buildCardClass[index] ?? ''}`}
                  data-cat={step.cat}
                  key={step.step}
                >
                  <div className="build-text">
                    <div className="build-top">
                      <span>Step {step.step}</span>
                      <span>{step.categoryLabel}</span>
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    <div className="build-data">
                      <b>{step.timing}</b>
                      <span>{step.detail}</span>
                    </div>
                  </div>
                  <div className="build-photo">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      width={900}
                      height={1100}
                      sizes="(max-width:620px) 86vw, 20rem"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
