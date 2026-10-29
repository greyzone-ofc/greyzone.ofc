import { THEME_KEY } from '@/lib/theme';

/** Theme toggle with optional View Transition circle reveal. */
export function initThemeToggle(): () => void {
  const btn = document.getElementById('themeToggle');
  const root = document.documentElement;
  if (!btn) return () => {};

  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');

  function pinned(): 'dark' | 'light' | null {
    const t = root.getAttribute('data-theme');
    return t === 'dark' || t === 'light' ? t : null;
  }

  function effective(): 'dark' | 'light' {
    return pinned() || (mq.matches ? 'dark' : 'light');
  }

  function sync() {
    const next = effective() === 'dark' ? 'light' : 'dark';
    btn!.setAttribute('aria-label', `Switch to ${next} mode`);
    btn!.title = `Switch to ${next} mode`;
  }

  function apply(t: 'dark' | 'light') {
    root.setAttribute('data-theme', t);
    const m = document.querySelector('meta[name="color-scheme"]');
    if (m) m.setAttribute('content', t);
    try {
      localStorage.setItem(THEME_KEY, t);
    } catch {
      /* ignore */
    }
    sync();
  }

  const onClick = () => {
    const t: 'dark' | 'light' = effective() === 'dark' ? 'light' : 'dark';
    if (
      reduceMq.matches ||
      typeof document.startViewTransition !== 'function'
    ) {
      apply(t);
      return;
    }
    const r = btn.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    root.classList.add('theme-vt');
    let vt: ViewTransition;
    try {
      vt = document.startViewTransition(() => apply(t));
    } catch {
      root.classList.remove('theme-vt');
      apply(t);
      return;
    }
    const cleanupVt = () => root.classList.remove('theme-vt');
    vt.finished.then(cleanupVt, cleanupVt);
    vt.ready.then(
      () => {
        root.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 800,
            easing: 'cubic-bezier(.7, 0, .2, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      },
      () => {},
    );
  };

  const onScheme = () => {
    if (!pinned()) sync();
  };

  btn.addEventListener('click', onClick);
  mq.addEventListener('change', onScheme);
  sync();

  return () => {
    btn.removeEventListener('click', onClick);
    mq.removeEventListener('change', onScheme);
  };
}
