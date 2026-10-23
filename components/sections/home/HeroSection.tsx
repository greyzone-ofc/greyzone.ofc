export function HeroSection() {
  return (
    <section className="hero-area home-hero-area">
      <div className="site-banner-area">
        <div className="hero-banner" id="HeroBanner">
          <canvas className="hero-canvas" aria-hidden="true"></canvas>
          <div className="hero-glow" aria-hidden="true"></div>
          <div className="hero-copy">
            <div className="vmask" data-vmask aria-hidden="true">
              <span className="hero-word vmask-text">
                GREYZONE*<i className="vmask-base"></i>
              </span>
              <div className="vmask-media">
                <video
                  muted
                  loop
                  playsInline
                  preload="none"
                  disablePictureInPicture
                  tabIndex={-1}
                >
                  <source src="/assets/hero-mask.webm" type="video/webm" />
                  <source src="/assets/hero-mask.mp4" type="video/mp4" />
                </video>
              </div>
              <svg
                className="vmask-defs"
                width="0"
                height="0"
                focusable="false"
              >
                <defs>
                  <filter
                    id="vmaskKeyDark"
                    colorInterpolationFilters="sRGB"
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                  >
                    <feColorMatrix
                      type="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  1.7 1.7 1.7 0 -0.12"
                    />
                  </filter>
                  <filter
                    id="vmaskKeyLight"
                    colorInterpolationFilters="sRGB"
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                  >
                    <feColorMatrix
                      type="matrix"
                      values="0.55 0 0 0 0  0 0.55 0 0 0  0 0 0.55 0 0  2.4 2.4 2.4 0 -0.1"
                    />
                  </filter>
                  <clipPath id="vmaskClip" clipPathUnits="userSpaceOnUse">
                    <text x="0" y="0"></text>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="banner-copy">
            <h1
              className="hero-build"
              aria-label="GREYZONE. We build websites, web applications, AI automations and custom software."
            >
              <span aria-hidden="true">We build</span>{' '}
              <span className="build-words" aria-hidden="true">
                <span>websites.</span>
                <span>web applications.</span>
                <span>AI automations.</span>
                <span>custom software.</span>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
