export const THEME_KEY = 'greyzone-theme';

/** Pre-paint theme boot: pinned localStorage choice wins; otherwise follow the OS. */
export const THEME_BOOT_SCRIPT = `(function () { try { var t = localStorage.getItem('${THEME_KEY}'); if (t === 'dark' || t === 'light') { document.documentElement.setAttribute('data-theme', t); var m = document.querySelector('meta[name="color-scheme"]'); if (m) m.content = t; } } catch (e) { } })();`;
