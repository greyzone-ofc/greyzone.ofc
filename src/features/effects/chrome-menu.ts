/**
 * Site chrome: menu overlay, header hide-on-scroll, optional hero banner shrink.
 * Does not require #HeroBanner (detail pages).
 */
export function initChromeMenu(): () => void {
  const header = document.getElementById('siteHeader');
  const page = document.getElementById('page');
  const btn = document.getElementById('proMenu');
  const overlay = document.getElementById('menuOverlay');
  const closeBtn = document.getElementById('menuClose');
  const banner = document.getElementById('HeroBanner');
  if (!header || !page || !btn || !overlay || !closeBtn) return () => {};

  const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  let last = 0;
  let ticking = false;

  function isOpen() {
    return overlay!.classList.contains('open');
  }

  function setOrigin() {
    const r = btn!.getBoundingClientRect();
    overlay!.style.setProperty('--cx', `${r.left + r.width / 2}px`);
    overlay!.style.setProperty('--cy', `${r.top + r.height / 2}px`);
  }

  function setMenuOpen(open: boolean) {
    overlay!.classList.toggle('open', open);
    overlay!.setAttribute('aria-hidden', open ? 'false' : 'true');
    overlay!.inert = !open;
    btn!.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn!.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    header!.inert = open;
    page!.inert = open;
    document.body.style.overflow = open ? 'hidden' : '';
  }

  function openMenu() {
    if (isOpen()) return;
    setOrigin();
    void overlay!.offsetWidth;
    setMenuOpen(true);
    requestAnimationFrame(() => {
      closeBtn!.focus({ preventScroll: true });
    });
  }

  function closeMenu() {
    setMenuOpen(false);
    btn!.focus({ preventScroll: true });
  }

  const onOverlayClick = (e: MouseEvent) => {
    const t = e.target as Element | null;
    if (t?.closest('.menu-links a,.menu-info a')) closeMenu();
  };

  const onKey = (e: KeyboardEvent) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') {
      closeMenu();
      return;
    }
    if (e.key === 'Tab') {
      const f = overlay!.querySelectorAll('a[href],button');
      const v: HTMLElement[] = [];
      f.forEach((el) => {
        if ((el as HTMLElement).offsetParent !== null) v.push(el as HTMLElement);
      });
      const a = v[0];
      const z = v[v.length - 1];
      if (!a || !z) return;
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault();
        a.focus();
      }
    }
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.pageYOffset || 0;
      if (!isOpen()) header!.classList.toggle('is-hidden', y > last && y > 160);
      last = y <= 0 ? 0 : y;
      if (!reduce && banner) {
        const p = Math.min(Math.max(y / (window.innerHeight * 0.6), 0), 1);
        const rad = `${(p * 40).toFixed(1)}px`;
        banner.style.transform = `scale(${(1 - p * 0.06).toFixed(3)})`;
        banner.style.borderBottomLeftRadius = rad;
        banner.style.borderBottomRightRadius = rad;
      }
      ticking = false;
    });
  };

  setMenuOpen(false);
  setOrigin();
  window.addEventListener('resize', setOrigin);
  btn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onKey);
  window.addEventListener('scroll', onScroll, { passive: true });

  return () => {
    window.removeEventListener('resize', setOrigin);
    btn.removeEventListener('click', openMenu);
    closeBtn.removeEventListener('click', closeMenu);
    overlay.removeEventListener('click', onOverlayClick);
    document.removeEventListener('keydown', onKey);
    window.removeEventListener('scroll', onScroll);
    setMenuOpen(false);
  };
}
