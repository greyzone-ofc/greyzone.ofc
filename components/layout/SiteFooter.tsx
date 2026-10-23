import { externalRel } from '@/modules/site/config';
import {
  contactEmail,
  navLinks,
  serviceSublinks,
  socialLinks,
} from '@/modules/site/navigation';

export function SiteFooter() {
  return (
    <div className="footer-reveal">
      <div className="footer-stage" aria-hidden="true" />
      <footer className="site-footer" aria-label="GREYZONE footer">
        <div className="foot-inner">
          <p className="foot-brand" aria-hidden="true">
            GREYZONE
            <span className="foot-ast">
              <svg viewBox="0 0 100 100">
                <g fill="#D1162C">
                  <rect x="43" y="6" width="14" height="88" rx="7" />
                  <rect
                    x="43"
                    y="6"
                    width="14"
                    height="88"
                    rx="7"
                    transform="rotate(60 50 50)"
                  />
                  <rect
                    x="43"
                    y="6"
                    width="14"
                    height="88"
                    rx="7"
                    transform="rotate(120 50 50)"
                  />
                </g>
              </svg>
            </span>
          </p>
          <div className="foot-cols">
            <nav className="foot-col" aria-label="Explore">
              <h2>Explore</h2>
              <ul>
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav className="foot-col" aria-label="Services">
              <h2>Services</h2>
              <ul>
                {serviceSublinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
                <li>
                  <a href="#contact">Start a project</a>
                </li>
              </ul>
            </nav>
            <nav className="foot-col" aria-label="Social">
              <h2>Social</h2>
              <ul>
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel={externalRel}>
                      {s.label === 'X (Twitter)' ? 'Twitter' : s.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="mailto:careers@greyzone.in?subject=Working%20at%20GREYZONE">
                    Jobs
                  </a>
                </li>
              </ul>
            </nav>
            <a className="foot-mark" href="#page" aria-label="Back to top">
              G
            </a>
          </div>
          <div className="foot-legal">
            <p>© GREYZONE 2026 — Websites, software, AI and automation</p>
            <ul>
              <li>
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </li>
              <li>
                <a href="#studio">Ahmedabad, Gujarat</a>
              </li>
              <li>
                <a href="#page">Back to top</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
