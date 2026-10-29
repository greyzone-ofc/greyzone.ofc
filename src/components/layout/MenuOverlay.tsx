import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { externalRel } from '@/lib/site/config';
import {
  contactEmail,
  navLinks,
  serviceSublinks,
  socialLinks,
} from '@/lib/site/navigation';

export function MenuOverlay() {
  return (
    <div
      className="menu-overlay"
      id="menuOverlay"
      role="dialog"
      aria-modal="true"
      aria-hidden="true"
      inert
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
              <Link href="/#contact">Start a project</Link>
            </li>
            <li>
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/#contact">Ahmedabad, Gujarat</Link>
            </li>
            <li>
              <Link href="/#contact">India and international</Link>
            </li>
          </ul>
        </div>
        <ul className="menu-social stagger" style={{ ['--i' as string]: 8 }}>
          {socialLinks.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel={externalRel}
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
