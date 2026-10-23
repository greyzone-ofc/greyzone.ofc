import { Icon } from '@/components/ui/Icon';
import {
  contactEmail,
  navLinks,
  serviceSublinks,
  socialLinks,
} from '@/modules/site/navigation';

export function MenuOverlay() {
  return (
    <div
      className="menu-overlay"
      id="menuOverlay"
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
    >
      <button
        type="button"
        className="menu-close"
        id="menuClose"
        aria-label="Close menu"
      >
        <Icon id="i-close" className="ic" />
      </button>
      <div className="menu-main">
        <nav aria-label="Main">
          <ul className="menu-links links-mobile">
            {navLinks.map((link, i) => (
              <li key={`m-${link.label}`} style={{ ['--i' as string]: i }}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <div className="links-desktop">
            <ul className="menu-links">
              {navLinks.map((link, i) => (
                <li key={`d-${link.label}`} style={{ ['--i' as string]: i }}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
            <ul className="menu-links sub" aria-label="Services">
              {serviceSublinks.map((link, i) => (
                <li
                  key={`s-${link.label}`}
                  style={{ ['--i' as string]: i + 6 }}
                >
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
      <div className="menu-bottom">
        <div className="menu-info stagger" style={{ ['--i' as string]: 7 }}>
          <ul>
            <li>
              <a href="#contact">Start a project</a>
            </li>
            <li>
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="#contact">Ahmedabad, Gujarat</a>
            </li>
            <li>
              <a href="#contact">India and international</a>
            </li>
          </ul>
        </div>
        <ul className="menu-social stagger" style={{ ['--i' as string]: 8 }}>
          {socialLinks.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener"
                aria-label={s.label}
              >
                <Icon id={s.iconId} className="ic" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
