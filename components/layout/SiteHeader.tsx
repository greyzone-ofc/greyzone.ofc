import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';
import { externalRel } from '@/modules/site/config';
import { socialUrls } from '@/modules/site/social';

export function SiteHeader() {
  return (
    <header id="siteHeader">
      <div className="site-container">
        <div className="bar">
          <div className="site-menu">
            <a href="#page" className="logo-link" aria-label="GREYZONE home">
              <Image
                src="/assets/logo.png"
                alt="GREYZONE"
                width={104}
                height={34}
              />
            </a>
            <button
              type="button"
              className="pro-menu"
              id="proMenu"
              aria-label="Open menu"
              aria-expanded="false"
              aria-controls="menuOverlay"
            >
              <span></span>
              <span></span>
            </button>
          </div>
          <div className="user-area">
            <a href="#contact" className="head-cta">
              Start a project
            </a>
            <button
              type="button"
              className="theme-toggle"
              id="themeToggle"
              aria-label="Switch to dark mode"
            >
              <Icon id="i-moon" className="ic ic-moon" />
              <Icon id="i-sun" className="ic ic-sun" />
            </button>
            <a
              href={socialUrls.linkedin}
              target="_blank"
              rel={externalRel}
              aria-label="GREYZONE on LinkedIn"
            >
              <Icon id="i-in" className="ic" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
