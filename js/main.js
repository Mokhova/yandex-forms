/* ===========================================================================
   Yandex.Forms Redesign — motion layer
   Vanilla JS, no dependencies. Everything degrades gracefully.
   =========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -----------------------------------------------------------------------
     0. Missing images → neutral placeholder instead of a broken icon
     --------------------------------------------------------------------- */
  function guardImages() {
    var imgs = document.querySelectorAll('img');
    function fail(img) {
      var box = img.parentNode;
      img.style.visibility = 'hidden';
      if (box && !box.classList.contains('is-empty')) {
        box.classList.add('is-empty');
        box.style.background =
          'repeating-linear-gradient(135deg, rgba(24,35,46,.05) 0 10px, rgba(24,35,46,.02) 10px 20px)';
      }
    }
    Array.prototype.forEach.call(imgs, function (img) {
      if (img.complete && img.naturalWidth === 0) fail(img);
      img.addEventListener('error', function () { fail(img); });
    });
  }

  /* -----------------------------------------------------------------------
     1. Reveal on scroll
     --------------------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
    if (reduced || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add('is-in'); });
      return;
    }

    Array.prototype.forEach.call(
      document.querySelectorAll('[data-reveal-stagger]'),
      function (group) {
        Array.prototype.forEach.call(group.children, function (child, i) {
          child.style.transitionDelay = i * 90 + 'ms';
        });
      }
    );

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  /* -----------------------------------------------------------------------
     2. Counters
     --------------------------------------------------------------------- */
  function initCounters() {
    var nodes = document.querySelectorAll('[data-count]');
    if (!nodes.length) return;

    function run(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var sign = target < 0 ? '-' : '';
      var abs = Math.abs(target);
      var dur = 1400;
      var t0 = null;

      function frame(t) {
        if (t0 === null) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 4);
        el.textContent = sign + (abs * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    if (reduced || !('IntersectionObserver' in window)) return;

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            run(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    Array.prototype.forEach.call(nodes, function (el) { io.observe(el); });
  }

  /* -----------------------------------------------------------------------
     3. Scroll-driven layer: progress, header, parallax, sticky hero
     --------------------------------------------------------------------- */
  function initScroll() {
    var progress = document.getElementById('progress');
    var header = document.getElementById('header');
    var heroShot = document.querySelector('.hero__shot');
    var heroTitle = document.querySelector('[data-hero-title]');
    var parallax = [].slice.call(document.querySelectorAll('[data-parallax], [data-blob]'));
    var chapters = [].slice.call(document.querySelectorAll('.chapter'));
    var navLinks = [].slice.call(document.querySelectorAll('[data-nav]'));

    var lastY = window.pageYOffset;
    var ticking = false;

    // cache geometry, refresh on resize
    var geo = [];
    function measure() {
      geo = parallax.map(function (el) {
        var r = el.getBoundingClientRect();
        return {
          el: el,
          top: r.top + window.pageYOffset,
          h: r.height,
          speed: parseFloat(el.getAttribute('data-parallax') || el.getAttribute('data-blob') || '0.05')
        };
      });
    }

    function update() {
      ticking = false;
      var y = window.pageYOffset;
      var vh = window.innerHeight;
      var doc = document.documentElement.scrollHeight - vh;

      if (progress) progress.style.transform = 'scaleX(' + (doc > 0 ? y / doc : 0) + ')';

      // header: hide going down, show going up; always visible near the top
      if (header) {
        if (y > 140 && y > lastY + 4) header.classList.add('is-hidden');
        else if (y < lastY - 4 || y < 140) header.classList.remove('is-hidden');
      }
      lastY = y;

      if (!reduced && !mqNarrow.matches) {
        // hero: the screenshot lifts and settles as you scroll away
        if (heroShot) {
          var p = Math.min(y / (vh * 0.9), 1);
          heroShot.style.transform =
            'perspective(1400px) rotateX(' + (p * 5).toFixed(2) + 'deg) scale(' + (1 - p * 0.05).toFixed(4) + ')';
          heroShot.style.transformOrigin = '50% 0%';
        }
        if (heroTitle) {
          var q = Math.min(y / (vh * 0.8), 1);
          heroTitle.style.transform = 'translateY(' + (q * -40).toFixed(1) + 'px)';
          heroTitle.style.opacity = String(1 - q * 0.55);
        }

        // parallax blobs / glass
        for (var i = 0; i < geo.length; i++) {
          var g = geo[i];
          if (g.top + g.h < y - vh || g.top > y + vh * 2) continue;
          var delta = (y + vh / 2 - (g.top + g.h / 2)) * g.speed;
          g.el.style.transform = 'translate3d(0,' + delta.toFixed(1) + 'px,0)';
        }
      }

      // active chapter in the nav
      var activeId = null;
      for (var c = 0; c < chapters.length; c++) {
        if (chapters[c].getBoundingClientRect().top <= vh * 0.4) activeId = chapters[c].id;
      }
      navLinks.forEach(function (a) {
        a.classList.toggle('is-current', a.getAttribute('data-nav') === activeId);
      });
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    function clearMotion() {
      if (!mqNarrow.matches) return;
      if (heroShot) heroShot.style.transform = '';
      if (heroTitle) { heroTitle.style.transform = ''; heroTitle.style.opacity = ''; }
      parallax.forEach(function (el) { el.style.transform = ''; });
    }

    measure();
    clearMotion();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { measure(); clearMotion(); onScroll(); });
    window.addEventListener('load', function () { measure(); onScroll(); });
  }


  /* -----------------------------------------------------------------------
     5. Художественные сцены на узком экране
     ---------------------------------------------------------------------
     Внутри .feature__art картинки разложены абсолютно в системе координат
     макета (1120px). Ломать эту композицию нельзя — она и есть дизайн.
     Поэтому на мобильном мы обрезаем сцену по реальным границам картинок
     и вписываем её в ширину экрана через zoom.
     --------------------------------------------------------------------- */
  var mqNarrow = window.matchMedia('(max-width: 1023px)');

  function fitStages() {
    var narrow = mqNarrow.matches;
    var arts = document.querySelectorAll('.feature__art');

    Array.prototype.forEach.call(arts, function (art) {
      var kids = Array.prototype.slice.call(art.children);
      if (!kids.length) return;

      // исходные координаты запоминаем один раз, чтобы пересчёт был идемпотентным
      kids.forEach(function (k) {
        if (k.dataset.x0 === undefined) {
          k.dataset.x0 = String(parseFloat(k.style.left) || 0);
          k.dataset.y0 = String(parseFloat(k.style.top) || 0);
        }
      });

      if (!narrow) {
        art.style.zoom = '';
        art.style.width = '';
        art.style.height = '';
        kids.forEach(function (k) {
          k.style.left = k.dataset.x0 + 'px';
          k.style.top = k.dataset.y0 + 'px';
        });
        return;
      }

      var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      kids.forEach(function (k) {
        var x = parseFloat(k.dataset.x0);
        var y = parseFloat(k.dataset.y0);
        var w = parseFloat(k.style.width) || 0;
        var h = parseFloat(k.style.height) || 0;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x + w > maxX) maxX = x + w;
        if (y + h > maxY) maxY = y + h;
      });
      if (!isFinite(minX) || maxX <= minX || maxY <= minY) return;

      var bw = maxX - minX, bh = maxY - minY;

      art.style.zoom = '';
      var avail = art.parentNode.clientWidth;
      if (!avail) return;

      // сдвигаем содержимое к нулю — без отрицательных margin, иначе блок
      // наезжает на соседей и ломает высоту карточки
      kids.forEach(function (k) {
        k.style.left = (parseFloat(k.dataset.x0) - minX) + 'px';
        k.style.top = (parseFloat(k.dataset.y0) - minY) + 'px';
      });

      art.style.width = bw + 'px';
      art.style.height = bh + 'px';
      // на узком экране сцена занимает 80% ширины, а не всю
      art.style.zoom = String(Math.min((avail * 0.8) / bw, 1.6));
    });
  }

  /* -----------------------------------------------------------------------
     6. Аватар в шапке
     ---------------------------------------------------------------------
     Есть только там, где в герое стоит большой портрет: пока портрет виден,
     мелкая копия в шапке — лишний дубль, поэтому она проявляется ровно
     в тот момент, когда портрет целиком уехал под шапку.
     --------------------------------------------------------------------- */
  function initAvatarReveal() {
    var avatar = document.querySelector('.avatar');
    var portrait = document.querySelector('.portrait');
    if (!avatar || !portrait) return;

    avatar.classList.add('avatar--deferred');
    var header = document.getElementById('header');

    function sync() {
      var h = header ? header.offsetHeight : 88;
      avatar.classList.toggle('is-shown', portrait.getBoundingClientRect().bottom <= h);
    }

    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    window.addEventListener('load', sync);
  }

  /* -----------------------------------------------------------------------
     4. Smooth anchor scrolling with header offset
     --------------------------------------------------------------------- */
  function initAnchors() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = a.getAttribute('href').slice(1);
      var target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 88;
      window.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* --------------------------------------------------------------------- */
  var fitTimer;
  function onResize() {
    clearTimeout(fitTimer);
    fitTimer = setTimeout(fitStages, 120);
  }

  function boot() {
    guardImages();
    initAvatarReveal();
    initReveal();
    initCounters();
    fitStages();
    initScroll();
    initAnchors();
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    window.addEventListener('load', fitStages);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
