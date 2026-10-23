import type { CSSProperties } from 'react';
import { Acc } from '@/components/ui/Acc';
import { Icon } from '@/components/ui/Icon';
import { services } from '@/content/services';

const svcCardClass = ['svc-c1', 'svc-c2', 'svc-c3', 'svc-c4'] as const;

export function ServicesSection() {
  return (
    <div className="curtain">
      <section
        className="services"
        id="services"
        aria-labelledby="svcTitle"
        style={{ '--n': services.length } as CSSProperties}
      >
        <div className="svc-stage">
          <div className="svc-head">
            <span className="eyebrow">Services</span>
            <h2 id="svcTitle">
              Build what matters. Made <Acc>precisely.</Acc>
            </h2>
            <p className="svc-lede">
              Websites, applications, AI and custom software, designed and built
              by one team that explains every decision.
            </p>
          </div>
          <ol className="svc-deck">
            {services.map((service, index) => (
              <li className="svc-item" key={service.num}>
                <article className={`svc-card ${svcCardClass[index]}`}>
                  <span className="svc-ghost" aria-hidden="true">
                    {service.num}
                  </span>
                  <div className="svc-top">
                    <span className="svc-num">{service.num}</span>
                    <span className="svc-kicker">{service.kicker}</span>
                  </div>
                  <div className="svc-body">
                    <h3>{service.title}</h3>
                    <p>{service.body}</p>
                  </div>
                  <ul className="svc-tags">
                    {service.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <a className="svc-link" href="#contact">
                    Discuss your project
                    <span className="sr">{service.srLabel}</span>{' '}
                    <Icon id="i-arrow" className="ic" />
                  </a>
                  <Icon id={service.iconId} className="svc-art ic" />
                </article>
              </li>
            ))}
          </ol>
          <div className="svc-meter" aria-hidden="true">
            <span className="svc-count">
              <b>01</b> / 04
            </span>
            <span className="svc-bar">
              <i></i>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
