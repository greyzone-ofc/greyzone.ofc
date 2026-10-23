// @ts-nocheck
/* Auto-extracted from index.html — DOM interaction effects for the marketing home. */
export function initSiteEffects(): void {
    if (typeof window === 'undefined') return;

    (function () {
      var header = document.getElementById('siteHeader'), page = document.getElementById('page'),
        btn = document.getElementById('proMenu'), overlay = document.getElementById('menuOverlay'),
        closeBtn = document.getElementById('menuClose'), banner = document.getElementById('HeroBanner'),
        reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches, last = 0;
      if (!header || !page || !btn || !overlay || !closeBtn || !banner) return;
      function isOpen() { return overlay.classList.contains('open'); }
      function setOrigin() {
        var r = btn.getBoundingClientRect();
        overlay.style.setProperty('--cx', (r.left + r.width / 2) + 'px');
        overlay.style.setProperty('--cy', (r.top + r.height / 2) + 'px');
      }
      function openMenu() {
        if (isOpen()) return;
        setOrigin();
        void overlay.offsetWidth;            /* flush styles: first open animates like every later one */
        overlay.classList.add('open'); btn.setAttribute('aria-expanded', 'true');
        btn.setAttribute('aria-label', 'Close menu');
        header.inert = true; page.inert = true; document.body.style.overflow = 'hidden';
        requestAnimationFrame(function () { closeBtn.focus({ preventScroll: true }); });
      }
      function closeMenu() {
        overlay.classList.remove('open'); btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Open menu');
        header.inert = false; page.inert = false; document.body.style.overflow = '';
        btn.focus({ preventScroll: true });
      }
      setOrigin();                           /* origin ready before the first click */
      window.addEventListener('resize', setOrigin);
      btn.addEventListener('click', openMenu);
      closeBtn.addEventListener('click', closeMenu);
      overlay.addEventListener('click', function (e) { if (e.target.closest('.menu-links a,.menu-info a')) closeMenu(); });
      document.addEventListener('keydown', function (e) {
        if (!isOpen()) return;
        if (e.key === 'Escape') { closeMenu(); return; }
        if (e.key === 'Tab') {
          var f = overlay.querySelectorAll('a[href],button'), v = [];
          for (var i = 0; i < f.length; i++) { if (f[i].offsetParent !== null) v.push(f[i]); }
          var a = v[0], z = v[v.length - 1];
          if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
          else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
        }
      });
      var ticking = false;
      window.addEventListener('scroll', function () {
        if (ticking) return; ticking = true;
        requestAnimationFrame(function () {
          var y = window.pageYOffset || 0;
          if (!isOpen()) header.classList.toggle('is-hidden', y > last && y > 160);
          last = y <= 0 ? 0 : y;
          if (!reduce) {
            var p = Math.min(Math.max(y / (window.innerHeight * .6), 0), 1), rad = (p * 40).toFixed(1) + 'px';
            banner.style.transform = 'scale(' + (1 - p * .06).toFixed(3) + ')';
            banner.style.borderBottomLeftRadius = rad; banner.style.borderBottomRightRadius = rad;
          }
          ticking = false;
        });
      }, { passive: true });
    })();

  /* ===== VIDEO TEXT MASK ===== */
  (function () {
    var wrap = document.querySelector('[data-vmask]');
    if (!wrap || !window.CSS || !CSS.supports('clip-path', 'url(#a)')) return;
    var txt = wrap.querySelector('.vmask-text'), media = wrap.querySelector('.vmask-media'),
      video = media.querySelector('video'), clip = wrap.querySelector('clipPath text'),
      base = wrap.querySelector('.vmask-base'), label = txt.firstChild.nodeValue,
      reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches,
      conn = navigator.connection || {}, still = reduce || conn.saveData === true, ready = false;
    clip.textContent = label;
    /* copy the live typography onto the clip text so both always match, at every viewport */
    function size() {          /* font-size that makes the word span exactly the available width */
      var avail = wrap.clientWidth; if (!avail) return;
      txt.style.fontSize = '100px';
      var rg = document.createRange(); rg.selectNodeContents(txt.firstChild);
      var w = rg.getBoundingClientRect().width;
      if (w) txt.style.fontSize = (avail / w * 100).toFixed(2) + 'px';
    }
    function fit() {
      size();
      var cs = getComputedStyle(txt), m = media.getBoundingClientRect(), t = txt.getBoundingClientRect(), b = base.getBoundingClientRect();
      if (!m.width) return;
      clip.setAttribute('x', (t.left - m.left).toFixed(2));
      clip.setAttribute('y', (b.bottom - m.top).toFixed(2));       /* real baseline of the real text */
      clip.setAttribute('style', 'font-family:' + cs.fontFamily + ';font-size:' + cs.fontSize + ';font-weight:' + cs.fontWeight +
        ';letter-spacing:' + (cs.letterSpacing === 'normal' ? '0' : cs.letterSpacing) + ';font-kerning:normal');
      if (!ready) { ready = true; wrap.classList.add('is-video'); }
    }
    fit();
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(wrap); else window.addEventListener('resize', fit);
    if (document.fonts) { document.fonts.ready.then(fit); document.fonts.addEventListener && document.fonts.addEventListener('loadingdone', fit); }
    if (still) return;                       /* reduced motion / data saver: show the poster frame only */
    video.preload = 'auto';
    var visible = false;
    function sync() {
      if (visible && !document.hidden) { var p = video.play(); if (p && p.catch) p.catch(function () { }); }
      else video.pause();
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; sync(); }, { rootMargin: '120px 0px' }).observe(wrap);
    } else visible = true;
    document.addEventListener('visibilitychange', sync);
    sync();
  })();

  /* ===== SERVICES: curtain-led card stack ===== */
  /* The stage pins the moment the curtain covers the viewport (card 01 is then centred);
     each further card rises from below and lands on the stack while the ones beneath recede. */
  (function () {
    var sec = document.getElementById('services');
    if (!sec) return;
    var stage = sec.querySelector('.svc-stage'), deck = sec.querySelector('.svc-deck'),
      items = [].slice.call(sec.querySelectorAll('.svc-item')), n = items.length,
      num = sec.querySelector('.svc-count b'), bar = sec.querySelector('.svc-bar i'),
      mq = window.matchMedia('(prefers-reduced-motion:reduce)'),
      on = false, near = true, top0 = 0, step = 1, enter = 0, peek = 12, cur = 0, target = 0, raf = 0, last = 0, shown = -1;
    function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
    function pos() { return clamp((window.pageYOffset - top0) / step, 0, n - 1); }
    function render() {
      for (var i = 0; i < n; i++) {
        var a = i ? clamp(cur - i + 1, 0, 1) : 1, d = 0, e;
        for (var j = i + 1; j < n; j++)d += clamp(cur - j + 1, 0, 1);    /* how many cards now cover this one */
        e = 1 - (1 - a) * (1 - a);
        items[i].style.transform = 'translate3d(0,' + ((1 - e) * enter - d * peek).toFixed(1) + 'px,0) scale(' + (1 - d * .05).toFixed(4) + ')';
        items[i].style.setProperty('--shade', Math.min(d * .32, .7).toFixed(3));
      }
      var k = Math.round(cur);
      if (k !== shown) { shown = k; num.textContent = (k < 9 ? '0' : '') + (k + 1); }
      bar.style.transform = 'scaleX(' + ((cur + 1) / n).toFixed(4) + ')';
    }
    function tick(t) {
      var dt = last ? Math.min(t - last, 64) : 16; last = t;
      cur += (target - cur) * (1 - Math.exp(-dt / 60));        /* frame-rate independent easing */
      if (Math.abs(target - cur) < 5e-4) cur = target;
      render();
      if (cur !== target) raf = requestAnimationFrame(tick); else { raf = 0; last = 0; }
    }
    function update() {
      if (!on) return;
      target = pos();
      if (!near) { cur = target; return; }
      if (!raf) raf = requestAnimationFrame(tick);
    }
    function measure() {
      if (!on) return;
      var hold = parseFloat(getComputedStyle(sec).getPropertyValue('--hold')) || 0;
      top0 = sec.getBoundingClientRect().top + window.pageYOffset;
      step = Math.max((sec.offsetHeight - stage.offsetHeight) / (n - 1 + hold), 1);
      enter = Math.max(window.innerHeight, stage.offsetHeight) - deck.offsetTop + 32;
      peek = clamp(deck.offsetHeight * .035, 8, 18);
      cur = target = pos(); render();
    }
    function setMode() {
      on = !mq.matches && n > 1;
      sec.style.setProperty('--n', n);
      sec.classList.toggle('is-stack', on);
      if (!on) { items.forEach(function (it) { it.style.transform = ''; it.style.removeProperty('--shade'); }); return; }
      measure();
    }
    sec.addEventListener('focusin', function (e) {     /* keyboard focus brings its card to the top of the stack */
      var it = on && e.target.closest('.svc-item'), k = items.indexOf(it);
      if (it && k !== Math.round(target)) window.scrollTo({ top: top0 + k * step, left: 0 });
    });
    setMode();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', measure);
    if (window.visualViewport) visualViewport.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    if (mq.addEventListener) mq.addEventListener('change', setMode);
    if ('ResizeObserver' in window) new ResizeObserver(measure).observe(sec);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { near = es[0].isIntersecting; update(); }).observe(sec);
  })();

  /* ===== PROJECTS: curtain reveal + velocity arc carousel ===== */
  /* Cards sit on the rim of a wheel below the viewport. Page scroll turns the wheel;
     scroll speed bends the arc tighter and leans the cards, then both settle when scrolling stops. */
  (function () {
    var sec = document.querySelector('.projects');
    if (!sec) return;
    var stage = sec.querySelector('.proj-stage'), inner = sec.querySelector('.proj-inner'), shade = sec.querySelector('.proj-shade'),
      arc = sec.querySelector('.proj-arc'), rail = sec.querySelector('.proj-rail'),
      cards = [].slice.call(sec.querySelectorAll('.pc')), n = cards.length,
      prev = sec.querySelector('.proj-prev'), next = sec.querySelector('.proj-next'),
      num = sec.querySelector('.proj-count b'), bar = sec.querySelector('.proj-bar i'), live = sec.querySelector('.proj-live'),
      mq = window.matchMedia('(prefers-reduced-motion:reduce)'), root = document.documentElement,
      on = false, near = false, dirty = true, top0 = 0, lift = 1, run = 1, base = 0, cw = 1, gap = 16, R = 1, maxDrop = 60,
      cur = 0, target = 0, vel = 0, raf = 0, last = 0, shown = -1, revealed = -1, goal = -1, goalT = 0, drag = null, swallow = false;
    function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
    function pad(i) { return (i < 9 ? '0' : '') + (i + 1); }
    function detent(x) {             /* cards linger at centre and travel between: a soft snap without scroll-jacking */
      var i = Math.floor(x), f = x - i, e = f < .5 ? 4 * f * f * f : 1 - Math.pow(2 - 2 * f, 3) / 2;
      return i + f + (e - f) * .6;
    }
    function read() { return detent(clamp((window.pageYOffset - top0 - lift) / run, 0, 1) * (n - 1)); }
    function jump(y) { root.style.scrollBehavior = 'auto'; window.scrollTo(0, y); root.style.scrollBehavior = ''; }
    function setIndex(k) {
      if (k === shown) return;
      if (shown > -1) cards[shown].classList.remove('is-focus');
      cards[k].classList.add('is-focus'); shown = k;
      num.textContent = pad(k); prev.disabled = k === 0; next.disabled = k === n - 1;
    }
    function render() {
      var bend = 1 + Math.min(Math.abs(vel) * 6, .7), r = R / bend,
        pitch = 2 * Math.asin(Math.min((cw + gap) / (2 * r), .95)),
        skew = clamp(vel * 70, -9, 9);
      for (var i = 0; i < n; i++) {
        var d = i - cur, ad = Math.abs(d), phi = clamp(d * pitch, -1.3, 1.3),
          o = clamp(1 - (ad - 1.7) / 1.1, 0, 1), s = cards[i].style;
        s.transform = 'translate3d(' + (r * Math.sin(phi)).toFixed(1) + 'px,' + (base + Math.min(r * (1 - Math.cos(phi)), maxDrop)).toFixed(1) + 'px,0) rotate(' + phi.toFixed(4) + 'rad) skewX(' + skew.toFixed(2) + 'deg) scale(' + (1 - Math.min(ad, 3) * .06).toFixed(4) + ')';
        s.opacity = o.toFixed(3);
        s.zIndex = 100 - Math.round(ad * 10);
        s.pointerEvents = o < .15 ? 'none' : '';
      }
      setIndex(clamp(Math.round(cur), 0, n - 1));
      bar.style.transform = 'scaleX(' + ((cur + 1) / n).toFixed(4) + ')';
    }
    function paintReveal() {           /* the stage settles into place as the services curtain lifts off it */
      var r = Math.round(clamp((window.pageYOffset - top0) / lift, 0, 1) * 1000) / 1000, k = 1 - r;
      if (r === revealed) return; revealed = r;
      inner.style.transform = k ? 'translate3d(0,' + (k * 5).toFixed(2) + 'vh,0) scale(' + (1 - k * .06).toFixed(4) + ')' : '';
      shade.style.opacity = (k * .6).toFixed(3);
    }
    function tick(t) {
      var dt = last ? Math.min(t - last, 64) : 16, p = cur, v = vel; last = t;
      if (dirty) { dirty = false; paintReveal(); }
      cur += (target - cur) * (1 - Math.exp(-dt / 110));
      vel += ((cur - p) * 16.67 / dt - vel) * Math.min(dt / 50, 1);
      if (Math.abs(target - cur) < 4e-4 && Math.abs(vel) < 4e-4) { cur = target; vel = 0; }
      if (cur !== p || vel !== v) render();
      if (cur !== target || vel !== 0) raf = requestAnimationFrame(tick); else { raf = 0; last = 0; }
    }
    function update() {
      if (!on) return;
      target = read(); dirty = true;
      if (!near) { cur = target; vel = 0; revealed = -1; paintReveal(); render(); return; }   /* jumped here: paint the settled frame at once */
      if (!raf) raf = requestAnimationFrame(tick);
    }
    function railSync() {
      var s = n > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 1,
        k = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 2 ? n - 1 : Math.round(rail.scrollLeft / s);
      setIndex(clamp(k, 0, n - 1));
      bar.style.transform = 'scaleX(' + ((shown + 1) / n).toFixed(4) + ')';
    }
    function measure() {
      cw = cards[0].offsetWidth;
      if (!on) { railSync(); return; }
      var W = arc.clientWidth;
      top0 = sec.getBoundingClientRect().top + window.pageYOffset;
      lift = stage.offsetHeight;
      /* section height also carries the contact reveal runway at its end; the wheel must not stretch over it */
      run = Math.max(sec.offsetHeight - 2 * lift - lift * (parseFloat(getComputedStyle(sec).getPropertyValue('--reveal')) || 0) / 100, 1);
      gap = clamp(W * .025, 14, 40);
      R = Math.max(W * 1.15, cw * 3.6);
      maxDrop = Math.max(40, arc.clientHeight * .16);
      base = Math.max(6, (arc.clientHeight - cards[0].offsetHeight) * .4);
      cur = target = read(); vel = 0; revealed = -1;
      paintReveal(); render();
    }
    function go(k, instant) {
      k = clamp(k, 0, n - 1); goal = k; goalT = Date.now();
      var behavior = instant || mq.matches ? 'auto' : 'smooth';
      if (on) {
        var y = Math.round(top0 + lift + run * k / Math.max(n - 1, 1));
        if (behavior === 'auto') jump(y); else window.scrollTo({ top: y, left: 0, behavior: behavior });
      } else rail.scrollTo({ left: cards[k].offsetLeft - cards[0].offsetLeft, behavior: behavior });
    }
    function stepBy(dir) {
      go((Date.now() - goalT < 800 && goal > -1 ? goal : shown) + dir);
      live.textContent = 'Project ' + (goal + 1) + ' of ' + n + ': ' + cards[goal].querySelector('.pc-title').textContent;
    }
    function ratio() { return run / (Math.max(n - 1, 1) * (cw + gap)); }   /* page pixels per pixel of horizontal drag */
    function setMode() {
      on = !mq.matches && n > 1;
      sec.style.setProperty('--n', n);
      sec.classList.toggle('is-arc', on);
      for (var i = 0; i < n; i++) { var s = cards[i].style; s.transform = s.opacity = s.zIndex = s.pointerEvents = ''; }
      inner.style.transform = ''; shade.style.opacity = '';
      measure();
    }

    prev.addEventListener('click', function () { stepBy(-1); });
    next.addEventListener('click', function () { stepBy(1); });
    rail.addEventListener('scroll', function () { if (!on) railSync(); }, { passive: true });
    arc.addEventListener('pointerdown', function (e) {
      swallow = false;
      if (on && !e.button) drag = { id: e.pointerId, x: e.clientX, moved: 0, live: false };
    });
    arc.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x; drag.x = e.clientX; drag.moved += Math.abs(dx);
      if (!drag.live) {
        if (drag.moved < 6) return;
        drag.live = true; arc.classList.add('is-drag'); root.style.scrollBehavior = 'auto';
        try { arc.setPointerCapture(e.pointerId); } catch (_) { }
      }
      window.scrollBy(0, -dx * ratio());
    });
    function release(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var wasLive = drag.live; drag = null;
      if (!wasLive) return;
      arc.classList.remove('is-drag'); root.style.scrollBehavior = ''; swallow = true;
      go(Math.round(target + clamp(vel * 10, -1, 1)));    /* a flick carries on to the next card */
    }
    arc.addEventListener('pointerup', release);
    arc.addEventListener('pointercancel', release);
    arc.addEventListener('click', function (e) {
      if (swallow) { swallow = false; e.preventDefault(); e.stopPropagation(); return; }
      var c = on && e.target.closest('.pc');
      if (c && !c.classList.contains('is-focus')) { e.preventDefault(); go(cards.indexOf(c)); }   /* side card: bring it to centre first */
    }, true);
    arc.addEventListener('dragstart', function (e) { e.preventDefault(); });
    arc.addEventListener('wheel', function (e) {        /* horizontal trackpad swipes turn the wheel too */
      var y = window.pageYOffset - top0 - lift;
      if (!on || Math.abs(e.deltaX) <= Math.abs(e.deltaY) || y < -2 || y > run + 2) return;
      e.preventDefault();
      root.style.scrollBehavior = 'auto'; window.scrollBy(0, e.deltaX * ratio()); root.style.scrollBehavior = '';
    }, { passive: false });
    sec.addEventListener('focusin', function (e) {
      var c = on && e.target.closest('.pc');
      if (c && cards.indexOf(c) !== shown) go(cards.indexOf(c), true);
    });

    setMode();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', measure);
    if (window.visualViewport) visualViewport.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    if (mq.addEventListener) mq.addEventListener('change', setMode);
    if ('ResizeObserver' in window) { var ro = new ResizeObserver(measure); ro.observe(root); ro.observe(stage); }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { near = es[0].isIntersecting; update(); }).observe(sec);
    else near = true;
  })();

  /* ===== CONTACT: circle reveal from bottom centre ===== */
  /* Once the last project card is centred, further scroll holds the projects stage pinned
     behind while a red circle grows from the bottom centre of the screen over it.
     The stage underneath is clipped, never moved, so the reveal is fully reversible. */
  (function () {
    var sec = document.querySelector('.contact');
    if (!sec) return;
    var stage = sec.querySelector('.contact-stage'), inner = sec.querySelector('.contact-inner'),
      mq = window.matchMedia('(prefers-reduced-motion:reduce)'),
      on = false, near = true, top0 = 0, run = 1, stageH = 1, cur = 0, target = 0, raf = 0, last = 0, blocked = null;
    function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
    function pos() { return clamp((window.pageYOffset - top0) / run, 0, 1); }
    function paint() {
      var k = 1 - cur;
      stage.style.setProperty('--cr', (cur * 150).toFixed(2));
      inner.style.transform = k ? 'translate3d(0,' + (k * stageH * .05).toFixed(1) + 'px,0) scale(' + (1 - k * .05).toFixed(4) + ')' : '';
      var off = cur < .02;                       /* clipped-away links stay out of the tab order */
      if (off !== blocked) { blocked = off; stage.inert = off; }
    }
    function tick(t) {
      var dt = last ? Math.min(t - last, 64) : 16; last = t;
      cur += (target - cur) * (1 - Math.exp(-dt / 70));        /* frame-rate independent easing */
      if (Math.abs(target - cur) < 5e-4) cur = target;
      paint();
      if (cur !== target) raf = requestAnimationFrame(tick); else { raf = 0; last = 0; }
    }
    function update() {
      if (!on) return;
      target = pos();
      if (!near) { cur = target; paint(); return; }
      if (!raf) raf = requestAnimationFrame(tick);
    }
    function measure() {
      if (!on) return;
      stageH = stage.offsetHeight;
      top0 = sec.getBoundingClientRect().top + window.pageYOffset;
      run = Math.max(stageH * (parseFloat(getComputedStyle(sec).getPropertyValue('--reveal')) || 0) / 100, 1);
      cur = target = pos(); paint();
    }
    function setMode() {
      on = !mq.matches;
      if (!on) { stage.style.removeProperty('--cr'); inner.style.transform = ''; if (blocked) { blocked = false; stage.inert = false; } return; }
      measure();
    }
    sec.addEventListener('focusin', function () {     /* keyboard focus completes the reveal first */
      if (on && target < .99) window.scrollTo({ top: top0 + run, left: 0 });
    });
    setMode();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', measure);
    if (window.visualViewport) visualViewport.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    if (mq.addEventListener) mq.addEventListener('change', setMode);
    if ('ResizeObserver' in window) new ResizeObserver(measure).observe(sec);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { near = es[0].isIntersecting; update(); }).observe(sec);
  })();

  /* ===== HOW WE BUILD: card marquee + pause ===== */
  /* One card group lives in the HTML (a hand-scrollable row with no JS / reduced motion).
     With motion allowed, JS clones the group for a seamless CSS marquee. */
  (function () {
    var sec = document.querySelector('.build');
    if (!sec) return;
    var track = sec.querySelector('.build-track'),
      group = sec.querySelector('.build-group'),
      toggle = sec.querySelector('.build-toggle'),
      label = toggle.querySelector('span'), mq = window.matchMedia('(prefers-reduced-motion:reduce)'), dupe = null,
      foot = document.querySelector('.site-footer'), wrap = document.querySelector('.footer-reveal'),
      tail = document.querySelector('.journal');
    /* exit curtain (footer reveal): the footer sticks to the viewport bottom only
       inside its local stage at the end of this section; the section lifts away over
       it. Enabled only with motion allowed and when the whole footer fits in 100svh —
       a taller footer (stacked phones, short landscape) stays an ordinary footer,
       so its top can never be trapped off-screen. */
    function svhPx() {
      var probe = document.createElement('div');
      probe.style.cssText = 'position:fixed;left:0;top:0;width:0;height:calc(var(--svh)*100);visibility:hidden;pointer-events:none';
      document.body.appendChild(probe);
      var h = probe.offsetHeight;
      probe.parentNode.removeChild(probe);
      return h;
    }
    function measureReveal() {
      if (!foot || !wrap) return;
      var on = !mq.matches && foot.offsetHeight <= svhPx();
      wrap.classList.toggle('is-reveal', on);
      sec.classList.toggle('is-lift', on);
      if (tail) tail.classList.toggle('is-lift', on);
    }
    if (foot) foot.addEventListener('focusin', function () {
      if (wrap && wrap.classList.contains('is-reveal'))
        window.scrollTo({ top: document.documentElement.scrollHeight, left: 0 });
    });
    function setLive() {
      if (mq.matches || dupe) return;
      dupe = group.cloneNode(true);
      dupe.classList.add('build-dupe');
      dupe.setAttribute('aria-hidden', 'true');
      dupe.querySelectorAll('a,button,[tabindex]').forEach(function (el) { el.setAttribute('tabindex', '-1'); });
      track.appendChild(dupe);
      sec.classList.add('is-live');
    }
    toggle.addEventListener('click', function () {
      var paused = sec.classList.toggle('is-paused');
      toggle.setAttribute('aria-pressed', paused);
      label.textContent = paused ? 'Play' : 'Pause';
    });
    setLive();
    measureReveal();
    window.addEventListener('resize', measureReveal);
    if (window.visualViewport) visualViewport.addEventListener('resize', measureReveal);
    window.addEventListener('load', measureReveal);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureReveal);
    if (foot && 'ResizeObserver' in window) new ResizeObserver(measureReveal).observe(foot);
    if (mq.addEventListener) mq.addEventListener('change', function () {
      if (mq.matches) { if (dupe) { track.removeChild(dupe); dupe = null; } sec.classList.remove('is-live', 'is-paused'); toggle.setAttribute('aria-pressed', 'false'); label.textContent = 'Pause'; }
      else setLive();
      measureReveal();
    });
  })();



  /* ===== HERO FX: reactive dot field, rotating service word, live console, count-ups ===== */
  /* Decorative canvas is aria-hidden and pointer-transparent; every effect stops off-screen,
     on hidden tabs, and entirely under prefers-reduced-motion. */
  (function () {
    var banner = document.getElementById('HeroBanner'), hero = document.querySelector('.hero-area');
    if (!banner || !hero) return;
    var reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)'), reduced = reduceMq.matches;

    /* count-up stats + chips, once, when the hero is first seen */
    var counters = [].slice.call(hero.querySelectorAll('[data-count]'));
    function runCounters() {
      counters.forEach(function (el) {
        var end = parseFloat(el.getAttribute('data-count')), t0 = null;
        if (reduced) { el.textContent = end; return; }
        function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / 1100, 1), e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * e);
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }
    if (counters.length) {
      if ('IntersectionObserver' in window && !reduced) {
        var cio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { runCounters(); cio.disconnect(); } }); }, { threshold: .3 });
        cio.observe(hero);
      } else runCounters();
    }

    /* ===== Hero dot field + click waves =====
       Clean ring wave (not a particle scatter): dots stay on the grid; only a thin
       band around 3 easing rings lights up as the front expands to the farthest
       corner in ~2.6s. Hover is a tight local accent. Theme accents replace red. */
    var cv = banner.querySelector('.hero-canvas');
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext('2d');
    var W = 0, H = 0, gap = 26, nDots = 0;
    var homeX, homeY, posX, posY, velX, velY;
    var WAVE_DUR = 2600, BAND = 11, HOVER_R = 120, HOVER_R2 = HOVER_R * HOVER_R;
    var SPRING = 0.12, FRICTION = 0.82;
    var sx = -9999, sy = -9999, tx = -9999, ty = -9999, running = false, vis = true;
    /* rings: { cx, cy, t0, maxR } — one click = one lead + two trailing lags */
    var rings = [];
    var nearIdx = new Int32Array(512), nearRad = new Float32Array(512), nearN = 0;
    var RING_LAG = [0, 0.09, 0.18];
    var RING_STR = [1, 0.62, 0.38];

    function isDarkTheme() {
      var t = document.documentElement.getAttribute('data-theme');
      if (t === 'dark' || t === 'light') return t === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    function baseDotColor(dark) { return dark ? 'rgba(255,255,255,.26)' : 'rgba(10,10,10,.20)'; }
    function accentDotColor(dark) { return dark ? 'rgba(255,255,255,.92)' : 'rgba(10,10,10,.92)'; }
    function easeOut(p) { return 1 - Math.pow(1 - p, 3); }

    function build() {
      var r = banner.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      W = r.width; H = r.height;
      cv.width = Math.max(1, W * dpr); cv.height = Math.max(1, H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gap = Math.max(22, Math.min(30, W / 52));
      var xs = [], ys = [], x, y;
      for (y = gap / 2; y < H; y += gap) for (x = gap / 2; x < W; x += gap) { xs.push(x); ys.push(y); }
      nDots = xs.length;
      homeX = new Float32Array(xs); homeY = new Float32Array(ys);
      posX = new Float32Array(xs); posY = new Float32Array(ys);
      velX = new Float32Array(nDots); velY = new Float32Array(nDots);
      if (nearIdx.length < nDots) {
        nearIdx = new Int32Array(nDots);
        nearRad = new Float32Array(nDots);
      }
      rings.length = 0;
    }

    function farthestCorner(cx, cy) {
      return Math.max(
        Math.hypot(cx, cy), Math.hypot(W - cx, cy),
        Math.hypot(cx, H - cy), Math.hypot(W - cx, H - cy)
      );
    }

    function disturb(cx, cy, now) {
      rings.push({ cx: cx, cy: cy, t0: now || performance.now(), maxR: farthestCorner(cx, cy) + 24 });
      if (rings.length > 4) rings.shift();
    }

    function markNear(i, r) {
      if (nearN >= nearIdx.length) return;
      nearIdx[nearN] = i; nearRad[nearN] = r; nearN++;
    }

    function draw(now) {
      var t = now / 1000, i, hx, hy, px, py, dx, dy, d2, f, inv, dark = isDarkTheme();
      var k, ring, age, p, rad, dist, band, str, best, nudge;
      sx += (tx - sx) * .14; sy += (ty - sy) * .14;

      /* drop finished waves */
      for (k = rings.length - 1; k >= 0; k--) {
        if (now - rings[k].t0 > WAVE_DUR + 320) rings.splice(k, 1);
      }

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = baseDotColor(dark);
      ctx.beginPath();
      nearN = 0;
      for (i = 0; i < nDots; i++) {
        hx = homeX[i]; hy = homeY[i];
        px = posX[i]; py = posY[i];
        var idleX = Math.sin(t * .5 + (hx + hy) * .004) * 1.6;
        var idleY = Math.cos(t * .4 + (hx * .006 - hy * .002)) * 1.6;

        /* tight hover accent — local only */
        dx = hx - sx; dy = hy - sy; d2 = dx * dx + dy * dy;
        if (d2 < HOVER_R2 && d2 > 0.01) {
          f = 1 - Math.sqrt(d2) / HOVER_R;
          if (f > 0.35) {
            inv = 1 / Math.sqrt(d2);
            velX[i] += dx * inv * f * 0.55;
            velY[i] += dy * inv * f * 0.55;
            markNear(i, 1.2 + f * 0.9);
          }
        }

        /* thin ring bands only — no scatter */
        best = 0;
        var nx = 0, ny = 0;
        for (k = 0; k < rings.length; k++) {
          ring = rings[k];
          age = (now - ring.t0) / WAVE_DUR;
          if (age < 0 || age > 1.12) continue;
          dist = Math.hypot(hx - ring.cx, hy - ring.cy);
          for (var ri = 0; ri < 3; ri++) {
            p = age - RING_LAG[ri];
            if (p <= 0 || p > 1) continue;
            rad = easeOut(Math.min(p, 1)) * ring.maxR;
            band = Math.abs(dist - rad);
            if (band < BAND) {
              str = (1 - band / BAND) * RING_STR[ri] * (1 - Math.min(p, 1) * 0.35);
              if (str > best) {
                best = str;
                nudge = (dist > 0.01 ? (dist - rad) / dist : 0) * str * 1.4;
                nx = (hx - ring.cx) * nudge * 0.012;
                ny = (hy - ring.cy) * nudge * 0.012;
              }
            }
          }
        }
        if (best > 0.28) {
          velX[i] += nx; velY[i] += ny;
          markNear(i, 1.15 + best * 0.7);
        }

        velX[i] += (hx + idleX - px) * SPRING;
        velY[i] += (hy + idleY - py) * SPRING;
        velX[i] *= FRICTION; velY[i] *= FRICTION;
        px += velX[i]; py += velY[i];
        posX[i] = px; posY[i] = py;
        ctx.moveTo(px + 1.15, py); ctx.arc(px, py, 1.15, 0, 6.2832);
      }
      ctx.fill();
      if (nearN) {
        ctx.fillStyle = accentDotColor(dark);
        ctx.beginPath();
        for (i = 0; i < nearN; i++) {
          px = posX[nearIdx[i]]; py = posY[nearIdx[i]];
          var rr = nearRad[i];
          ctx.moveTo(px + rr, py); ctx.arc(px, py, rr, 0, 6.2832);
        }
        ctx.fill();
      }
    }
    function loop(now) {
      if (!running) return;
      draw(now);
      if (window.pageYOffset > hero.offsetHeight + 240 || !vis) { running = false; return; }
      requestAnimationFrame(loop);
    }
    function start() { if (running || reduced) return; running = true; requestAnimationFrame(loop); }
    build();
    if (reduced) { draw(0); }
    else {
      banner.addEventListener('pointermove', function (ev) {
        var r = banner.getBoundingClientRect();
        tx = ev.clientX - r.left; ty = ev.clientY - r.top;
        banner.style.setProperty('--mx', ((tx / r.width) * 100) + '%');
        banner.style.setProperty('--my', ((ty / r.height) * 100) + '%');
        start();
      }, { passive: true });
      banner.addEventListener('pointerdown', function (ev) {
        var r = banner.getBoundingClientRect();
        disturb(ev.clientX - r.left, ev.clientY - r.top, performance.now());
        start();
      }, { passive: true });
      banner.addEventListener('pointerleave', function () { tx = -9999; ty = -9999; });
      if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { es.forEach(function (e) { vis = e.isIntersecting; if (vis) start(); }); }, { threshold: 0 }).observe(banner);
      document.addEventListener('visibilitychange', function () { if (!document.hidden) start(); });
      start();
    }
    var rto; window.addEventListener('resize', function () { clearTimeout(rto); rto = setTimeout(function () { build(); if (reduced) draw(0); else start(); }, 180); });
    if (reduceMq.addEventListener) reduceMq.addEventListener('change', function () { location.reload(); });
  })();



  /* Studio showreel: plays only while on screen, never under reduced motion (WCAG 2.2.2) */
  (function () {
    var v = document.querySelector('.studio-video');
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () { }); }
        else v.pause();
      });
    }, { threshold: .2 });
    io.observe(v);
  })();



  /* ===== Brief builder + shared reveal ===== */
  /* The brief builder composes a pre-filled email from real radio choices — no backend,
     nothing is stored. Reveal uses the hero's ease and never hides content without JS. */
  (function () {
    var form = document.getElementById('briefForm'), btn = document.getElementById('briefBtn'),
      sum = document.getElementById('briefSummary');
    if (form && btn && sum) {
      function picked(name) { var el = form.querySelector('input[name="' + name + '"]:checked'); return el ? el.value : null; }
      function sync() {
        var type = picked('btype'), budget = picked('bbudget');
        var subject = 'New project: ' + type;
        var body = 'Hi GREYZONE,\n\nI am building ' + type + '.' + (budget ? '\nBudget range: ' + budget + '.' : '') + '\n\nWhat it needs to do:\n';
        btn.href = 'mailto:hello@greyzone.in?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        sum.textContent = budget
          ? ('You are building ' + type + ' · budget ' + budget + '. We reply within 1 working day.')
          : ('You are building ' + type + '. Pick a budget range, or just send what you have.');
      }
      form.addEventListener('change', sync);
      sync();
    }
    var rv = [].slice.call(document.querySelectorAll('[data-rv]'));
    if (rv.length) {
      if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        var io = new IntersectionObserver(function (es) {
          es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
        }, { threshold: .12 });
        rv.forEach(function (el) { io.observe(el); });
      } else rv.forEach(function (el) { el.classList.add('in'); });
    }
  })();



  /* ===== THEME TOGGLE — circular reveal from the toggle, like the menu =====
     Two states only (Chrome guidance): follow the OS, or the opposite of it. Clicking pins that
     exact theme in localStorage; the head script restores it before first paint on the next load.
     With nothing pinned, OS changes are followed live — and never animated: only a user-initiated
     click earns the reveal (Chrome / css-animation.com guidance).

     Animation = the menu's, applied to the page itself. The menu sets --cx/--cy to its button's
     centre and grows clip-path:circle(0 → 150%) over .8s cubic-bezier(.7,0,.2,1). Here
     document.startViewTransition() snapshots old/new themes and the same circle, same duration
     and easing, grows on ::view-transition-new(root) from this button's centre — driven via
     WAAPI inside transition.ready (the pseudo-elements don't exist before it), with the exact
     farthest-corner radius in px instead of the menu's blanket 150%, so no corner is left in
     the old theme at the end. Origin is the button centre, not the pointer: keyboard
     (Enter/Space) clicks report no useful pointer point, but always have a button centre.
     Progressive enhancement throughout: no startViewTransition, or prefers-reduced-motion
     (read live at click time, not cached at load), means an instant swap that still works. */
  (function () {
    var btn = document.getElementById('themeToggle'), root = document.documentElement,
      mq = window.matchMedia('(prefers-color-scheme: dark)'),
      reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!btn) return;
    function pinned() { var t = root.getAttribute('data-theme'); return t === 'dark' || t === 'light' ? t : null; }
    function effective() { return pinned() || (mq.matches ? 'dark' : 'light'); }
    function sync() { var next = effective() === 'dark' ? 'light' : 'dark'; btn.setAttribute('aria-label', 'Switch to ' + next + ' mode'); btn.title = 'Switch to ' + next + ' mode'; }
    function apply(t) {
      root.setAttribute('data-theme', t);
      var m = document.querySelector('meta[name="color-scheme"]'); if (m) m.content = t;
      try { localStorage.setItem('greyzone-theme', t); } catch (e) { }
      sync();
    }
    btn.addEventListener('click', function () {
      var t = effective() === 'dark' ? 'light' : 'dark';
      if (reduceMq.matches || typeof document.startViewTransition !== 'function') { apply(t); return; }
      var r = btn.getBoundingClientRect(),
        x = r.left + r.width / 2, y = r.top + r.height / 2,
        endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)),
        vt;
      root.classList.add('theme-vt');
      try { vt = document.startViewTransition(function () { apply(t); }); }
      catch (e) { root.classList.remove('theme-vt'); apply(t); return; }
      function cleanup() { root.classList.remove('theme-vt'); }
      /* finished settles after our WAAPI clip (or after a newer click skips this transition);
         ready can reject when a transition is skipped — the theme has still been applied */
      if (vt.finished && vt.finished.then) vt.finished.then(cleanup, cleanup);
      if (vt.ready && vt.ready.then) vt.ready.then(function () {
        root.animate(
          { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + endRadius + 'px at ' + x + 'px ' + y + 'px)'] },
          { duration: 800, easing: 'cubic-bezier(.7,0,.2,1)', pseudoElement: '::view-transition-new(root)' }
        );
      }, function () { });
    });
    if (mq.addEventListener) mq.addEventListener('change', function () { if (!pinned()) sync(); });
    sync();
  })();

}
