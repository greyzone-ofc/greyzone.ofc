import type { CSSProperties } from 'react';
import { Acc } from '@/components/ui/Acc';
import { Icon } from '@/components/ui/Icon';
import { getProjects } from '@/modules/projects/data';
import { ProjectArt } from './ProjectArt';

export async function ProjectsSection() {
  const projects = await getProjects();

  return (
    <section
      className="projects"
      aria-labelledby="projTitle"
      style={{ '--n': projects.length } as CSSProperties}
    >
      <span className="proj-anchor" id="work"></span>
      <div className="proj-stage">
        <div className="proj-inner">
          <div className="proj-head" data-rv>
            <span className="eyebrow">Selected work</span>
            <h2 id="projTitle">
              Recent <Acc>projects.</Acc>
            </h2>
            <p className="proj-lede">
              Websites, applications and automations we have designed and built.
            </p>
          </div>
          <div
            className="proj-arc"
            role="region"
            aria-roledescription="carousel"
            aria-label="Projects"
          >
            <ul className="proj-rail">
              {projects.map((project) => (
                <li className="pc" key={project.idx}>
                  <a href="#contact" draggable={false}>
                    {project.artSvgId ? (
                      <ProjectArt id={project.artSvgId} />
                    ) : null}
                    <div className="pc-meta">
                      <span className="pc-idx">
                        {project.idx} · {project.industry}
                      </span>
                      <h3 className="pc-title">{project.title}</h3>
                      <span className="pc-sub">{project.sub}</span>
                      <span className="pc-year">{project.year}</span>
                      <span className="pc-result">{project.result}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="proj-foot">
            <div className="proj-meter" aria-hidden="true">
              <span className="proj-count">
                <b>01</b> / 06
              </span>
              <span className="proj-bar">
                <i></i>
              </span>
            </div>
            <span className="proj-hint">
              <span className="h-arc">Scroll or drag to explore</span>
              <span className="h-rail">Swipe or use the arrows</span>
            </span>
            <div className="proj-ctrl">
              <button
                type="button"
                className="proj-btn proj-prev"
                aria-label="Previous project"
              >
                <Icon id="i-prev" className="ic" />
              </button>
              <button
                type="button"
                className="proj-btn proj-next"
                aria-label="Next project"
              >
                <Icon id="i-next" className="ic" />
              </button>
            </div>
          </div>
          <p className="sr proj-live" aria-live="polite"></p>
        </div>
        <div className="proj-shade" aria-hidden="true"></div>
      </div>
    </section>
  );
}
