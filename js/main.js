/* ============================================
   SALÃO EXPLOSION — Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- BOTÃO VOLTAR FLUTUANTE ---
  const pathNorm = window.location.pathname.replace(/\\/g, '/').replace(/\/index\.html$/i, '/');
  const pagesNoBack = [
    '/orientacao-pre-corte/',
    '/orientacao-massagem/',
    '/orientacao-massagem-pos/',
    '/guia-sobrevivencia-capilar/',
    '/landing/',
  ];
  if (document.body.getAttribute('data-page') !== 'home' && !pagesNoBack.includes(pathNorm)) {
    const inSubdir = window.location.pathname.replace(/\\/g, '/').split('/').filter(Boolean).length > 1;
    const fallback  = inSubdir ? '../' : 'index.html';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-float';
    backBtn.setAttribute('aria-label', 'Voltar');
    backBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';
    backBtn.addEventListener('click', function () {
      if (window.history.length > 1) { window.history.back(); }
      else { window.location.href = fallback; }
    });
    document.body.appendChild(backBtn);
  }

  // --- HEADER SCROLL EFFECT ---
  const header = document.querySelector('.header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // --- MOBILE MENU ---
  const toggle = document.querySelector('.header__toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- REVEAL ON SCROLL ---
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));
  }

  // --- TYPEWRITER HERO ---
  const typewriterEl = document.querySelector('.hero__typewriter');
  if (typewriterEl) {
    const phrases = [
      'onde seu cabelo é respeitado.',
      'onde tecnologia e amor caminham juntos.',
      'onde cada momento é uma experiência única.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 60;

    function typeWriter() {
      const current = phrases[phraseIndex];

      if (isDeleting) {
        typewriterEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 30;
      } else {
        typewriterEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 60;
      }

      if (!isDeleting && charIndex === current.length) {
        typingSpeed = 2500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
      }

      setTimeout(typeWriter, typingSpeed);
    }

    setTimeout(typeWriter, 1000);
  }

  // --- TYPEWRITER SOBRE ---
  const sobreTypewriterEl = document.querySelector('.sobre__typewriter');
  if (sobreTypewriterEl) {
    const sobrephrases = [
      'um ambiente acolhedor.',
      'um espaço de transformação.',
      'um lugar feito para você.',
      'carinho em cada detalhe.'
    ];
    let sPI = 0, sCI = 0, sDel = false, sSp = 80;

    function sobreTypeWriter() {
      const cur = sobrephrases[sPI];
      sobreTypewriterEl.textContent = sDel
        ? cur.substring(0, sCI - 1)
        : cur.substring(0, sCI + 1);
      sDel ? sCI-- : sCI++;
      sSp = sDel ? 35 : 80;
      if (!sDel && sCI === cur.length) { sSp = 2800; sDel = true; }
      else if (sDel && sCI === 0) { sDel = false; sPI = (sPI + 1) % sobrephrases.length; sSp = 500; }
      setTimeout(sobreTypeWriter, sSp);
    }
    setTimeout(sobreTypeWriter, 1800);
  }

  // --- REFERÊNCIAS TABS ---
  const refTabs   = document.querySelectorAll('.referencias__tab');
  const refPanels = document.querySelectorAll('.referencias__panel');
  if (refTabs.length && refPanels.length) {
    refTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.ref;
        refTabs.forEach(t => t.classList.remove('active'));
        refPanels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = document.querySelector(`[data-ref-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  }

  // --- SERVICE TABS ---
  const tabs = document.querySelectorAll('.servicos__tab');
  const panels = document.querySelectorAll('.servicos__panel');

  if (tabs.length && panels.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const panel = document.querySelector(`[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  }

  // --- TESTIMONIAL SLIDER ---
  const depoimentos = document.querySelectorAll('.depoimento');
  const dots = document.querySelectorAll('.depoimentos__dot');

  if (depoimentos.length && dots.length) {
    let currentDepoimento = 0;

    function showDepoimento(index) {
      depoimentos.forEach(d => d.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      depoimentos[index].classList.add('active');
      dots[index].classList.add('active');
      currentDepoimento = index;
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => showDepoimento(i));
    });

    // Auto-advance every 6s
    setInterval(() => {
      const next = (currentDepoimento + 1) % depoimentos.length;
      showDepoimento(next);
    }, 6000);
  }

  // --- SMOOTH SCROLL ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- COUNT UP ANIMATION ---
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          const duration = 2000;
          const start = Date.now();

          function updateCount() {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = current;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              el.textContent = target;
            }
          }

          updateCount();
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => countObserver.observe(el));
  }

  // --- IMAGE LAZY LOAD WITH BLUR EFFECT ---
  const lazyImages = document.querySelectorAll('img[data-src]');
  if (lazyImages.length) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.onload = () => img.classList.add('loaded');
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // --- MASSAGENS FAN — click/touch interaction (mobile) ---
  const massFan = document.querySelector('.massagens__fan');
  if (massFan) {
    massFan.addEventListener('click', function (e) {
      massFan.classList.toggle('is-open');
      e.stopPropagation();
    });
    document.addEventListener('click', function () {
      massFan.classList.remove('is-open');
    });
  }

  // --- HERO PARALLAX (subtle) ---
  const heroImage = document.querySelector('.hero__image img');
  if (heroImage && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      if (scroll < window.innerHeight) {
        heroImage.style.transform = `scale(1.05) translateY(${scroll * 0.1}px)`;
      }
    }, { passive: true });
  }

  // --- WHATSAPP LINK ---
  const whatsappLinks = document.querySelectorAll('[data-whatsapp]');
  whatsappLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = '5511986542632';
      const message = link.dataset.whatsapp || 'Olá! Gostaria de agendar um horário no Salão Explosion.';
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    });
  });

  // --- CATEGORY TAB REDIRECT (from servicos.html) ---
  const savedTab = sessionStorage.getItem('activeTab');
  if (savedTab && tabs.length) {
    const targetTab = document.querySelector(`[data-tab="${savedTab}"]`);
    if (targetTab) {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      targetTab.classList.add('active');
      const panel = document.querySelector(`[data-panel="${savedTab}"]`);
      if (panel) panel.classList.add('active');
    }
    sessionStorage.removeItem('activeTab');
  }

  // --- SPARKLES — estrelinhas no título do hero ---
  (function initSparkles() {
    const titleEl = document.querySelector('.hero__title');
    if (!titleEl) return;

    titleEl.style.position = 'relative';
    titleEl.style.overflow = 'visible';

    const STAR_PATH = 'M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z';
    const COLORS  = ['#b14eff', '#e46aa0', '#d9acff', '#ede6f7'];

    function spawnSparkle() {
      const svg  = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const size = 10 + Math.random() * 14;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const x = (Math.random() * 110 - 5).toFixed(1);
      const y = (Math.random() * 120 - 10).toFixed(1);
      const dur = (0.6 + Math.random() * 0.5).toFixed(2);

      path.setAttribute('d', STAR_PATH);
      path.setAttribute('fill', color);
      svg.setAttribute('viewBox', '0 0 21 21');
      svg.appendChild(path);
      svg.style.cssText = [
        'position:absolute',
        'pointer-events:none',
        'left:' + x + '%',
        'top:' + y + '%',
        'width:' + size + 'px',
        'height:' + size + 'px',
        'opacity:0',
        'z-index:10',
        'animation:sparkleAnim ' + dur + 's ease-in-out forwards',
      ].join(';');

      titleEl.appendChild(svg);
      svg.addEventListener('animationend', function () { svg.remove(); });
    }

    function spawnBatch() {
      var n = 1 + Math.floor(Math.random() * 3);
      for (var i = 0; i < n; i++) {
        setTimeout(spawnSparkle, i * 160);
      }
    }

    setTimeout(spawnBatch, 600);
    setInterval(spawnBatch, 950);
  })();

  // --- FLOATING PARALLAX HERO ---
  (function initFloatingParallax() {
    const field = document.getElementById('floatField');
    if (!field) return;

    const items = [...field.querySelectorAll('.float-el:not(.float-el--center-top)')].map(el => ({
      el,
      depth: parseFloat(el.dataset.depth) || 1,
      x: 0,
      y: 0,
    }));

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      const rect = field.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      const rect = field.getBoundingClientRect();
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
    }, { passive: true });

    const SENSITIVITY = -0.5;
    const EASE        = 0.05;

    function tick() {
      items.forEach(d => {
        const strength = (d.depth * SENSITIVITY) / 20;
        const tx = mouseX * strength;
        const ty = mouseY * strength;
        d.x += (tx - d.x) * EASE;
        d.y += (ty - d.y) * EASE;
        d.el.style.transform = `translate3d(${d.x.toFixed(2)}px,${d.y.toFixed(2)}px,0)`;
      });
      requestAnimationFrame(tick);
    }
    tick();
  })();

  // --- CARROSSEL DE RESULTADOS (desktop) ---
  (function initResultsCarousel() {
    var track = document.getElementById('resTrack');
    var prev  = document.querySelector('.res-carousel__btn--prev');
    var next  = document.querySelector('.res-carousel__btn--next');
    if (!track || !prev || !next) return;

    var idx = 0;

    function imgW() {
      var img = track.querySelector('img');
      return img ? (img.getBoundingClientRect().width + 10) : 260;
    }

    function visibleCount() {
      var vp = track.parentElement;
      return Math.floor(vp.getBoundingClientRect().width / imgW()) || 4;
    }

    function maxIdx() {
      return Math.max(0, track.querySelectorAll('img').length - visibleCount());
    }

    function update() {
      track.style.transform = 'translateX(-' + (idx * imgW()) + 'px)';
      prev.disabled = idx === 0;
      next.disabled = idx >= maxIdx();
    }

    prev.addEventListener('click', function () {
      idx = Math.max(0, idx - 2);
      update();
    });

    next.addEventListener('click', function () {
      idx = Math.min(maxIdx(), idx + 2);
      update();
    });

    window.addEventListener('resize', function () { idx = Math.min(idx, maxIdx()); update(); }, { passive: true });
    update();
  })();

  // --- HERO SUBTITLE TYPEWRITER ---
  (function initHeroTypewriter() {
    var el = document.getElementById('heroTw');
    if (!el) return;

    var PHRASES = ['ser cuidado.', 'ciência e afeto.', 'atenção exclusiva.', 'o Explosion.'];
    var SPEED = 65, DEL = 38, WAIT = 2200;
    var pIdx = 0, cIdx = 0, deleting = false;

    function tick() {
      var phrase = PHRASES[pIdx];
      if (deleting) {
        el.textContent = phrase.slice(0, cIdx--);
        if (cIdx < 0) {
          deleting = false; cIdx = 0;
          pIdx = (pIdx + 1) % PHRASES.length;
          setTimeout(tick, 350); return;
        }
        setTimeout(tick, DEL);
      } else {
        el.textContent = phrase.slice(0, cIdx++);
        if (cIdx > phrase.length) { deleting = true; setTimeout(tick, WAIT); return; }
        setTimeout(tick, SPEED);
      }
    }
    setTimeout(tick, 1200);
  })();

  // --- MASSAGEM VERTICAL STACK (3D) ---
  (function initMassagemStack() {
    var scene  = document.getElementById('massagemScene');
    var dotsEl = document.getElementById('massagemDots');
    if (!scene) return;

    var cards   = Array.from(scene.querySelectorAll('.massagem-stack__card'));
    var total   = cards.length;
    var current = 0;
    var startY  = 0;
    var dragging = false;
    var THRESHOLD = 45;
    var lastWheel = 0;

    function style(diff) {
      if (diff === 0)  return { y: 0,    sc: 1,    op: 1,   z: 6, rx: 0   };
      if (diff === -1) return { y: -148, sc: 0.83, op: 0.6, z: 5, rx: 8   };
      if (diff === -2) return { y: -265, sc: 0.7,  op: 0.3, z: 4, rx: 15  };
      if (diff === 1)  return { y: 148,  sc: 0.83, op: 0.6, z: 5, rx: -8  };
      if (diff === 2)  return { y: 265,  sc: 0.7,  op: 0.3, z: 4, rx: -15 };
      return { y: diff > 0 ? 420 : -420, sc: 0.55, op: 0, z: 0, rx: diff > 0 ? -20 : 20 };
    }

    function update() {
      cards.forEach(function(card, i) {
        var diff = i - current;
        if (diff > total / 2)  diff -= total;
        if (diff < -total / 2) diff += total;
        var s = style(diff);
        card.style.transform   = 'translateY(' + s.y + 'px) scale(' + s.sc + ') rotateX(' + s.rx + 'deg)';
        card.style.opacity     = s.op;
        card.style.zIndex      = s.z;
        card.style.pointerEvents = diff === 0 ? 'auto' : 'none';
      });
      if (dotsEl) {
        Array.from(dotsEl.children).forEach(function(dot, i) {
          dot.classList.toggle('active', i === current);
        });
      }
    }

    function goTo(idx) { current = ((idx % total) + total) % total; update(); }
    function nav(dir)  { goTo(current + dir); }

    // Dots
    if (dotsEl) {
      cards.forEach(function(_, i) {
        var dot = document.createElement('button');
        dot.className = 'massagem-stack__dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Massagem ' + (i + 1));
        dot.addEventListener('click', function() { goTo(i); });
        dotsEl.appendChild(dot);
      });
    }

    var wasDrag = false;

    // Touch
    scene.addEventListener('touchstart', function(e) {
      startY = e.touches[0].clientY; dragging = true; wasDrag = false;
    }, { passive: true });

    scene.addEventListener('touchend', function(e) {
      if (!dragging) return; dragging = false;
      var dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dy) > THRESHOLD) { wasDrag = true; nav(dy < 0 ? 1 : -1); }
    }, { passive: true });

    // Previne link se foi drag (toque)
    scene.addEventListener('click', function(e) {
      if (wasDrag) { e.preventDefault(); wasDrag = false; }
    });

    // Mouse drag
    scene.addEventListener('mousedown', function(e) { startY = e.clientY; dragging = true; wasDrag = false; });
    window.addEventListener('mouseup',  function(e) {
      if (!dragging) return; dragging = false;
      var dy = e.clientY - startY;
      if (Math.abs(dy) > THRESHOLD) { wasDrag = true; nav(dy < 0 ? 1 : -1); }
    });

    // Wheel (only when hovering the stack)
    scene.addEventListener('wheel', function(e) {
      e.preventDefault();
      var now = Date.now();
      if (now - lastWheel < 380) return;
      lastWheel = now;
      if (Math.abs(e.deltaY) > 20) nav(e.deltaY > 0 ? 1 : -1);
    }, { passive: false });

    update();
  })();

  // --- FLOATING MUSIC PLAYER ---
  (function initMusicPlayer() {
    var toggle   = document.getElementById('music-toggle');
    var panel    = document.getElementById('music-panel');
    var closeBtn = document.getElementById('music-close-btn');
    var frame    = document.getElementById('music-frame');
    if (!toggle || !panel || !frame) return;

    var KEY      = 'explosionMusicOpen';
    var BASE_SRC = 'https://open.spotify.com/embed/playlist/6eO8SxRIwMhv73D5Zijqi8?utm_source=generator&theme=0';

    function openPlayer() {
      panel.classList.add('open');
      frame.src = BASE_SRC;
      sessionStorage.setItem(KEY, '1');
    }

    function closePlayer() {
      panel.classList.remove('open');
      frame.src = '';
      sessionStorage.removeItem(KEY);
    }

    // Se estava tocando antes de navegar, reabre automaticamente
    if (sessionStorage.getItem(KEY) === '1') {
      openPlayer();
    }

    toggle.addEventListener('click', function () {
      panel.classList.contains('open') ? closePlayer() : openPlayer();
    });

    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closePlayer();
    });
  })();

  // --- RESULT CARD STACK — toque, arraste ou use as setas ---
  (function initResStack() {
    var stack = document.getElementById('resStack');
    if (!stack) return;

    var cards = Array.prototype.slice.call(stack.querySelectorAll('.res-stack__card'));
    var dotsWrap = document.getElementById('resStackDots');
    var dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.querySelectorAll('.res-stack-dot')) : [];
    var btnPrev = document.getElementById('resStackPrev');
    var btnNext = document.getElementById('resStackNext');
    var hint = document.querySelector('.res-stack-hint');
    var isAnimating = false;
    var isDragging = false;
    var wasDrag = false;
    var startX = 0, startY = 0, curX = 0, curY = 0;
    var MIN_DRAG = 45;
    var VISIBLE = 4; // quantas cartas mostrar na pilha

    function updateDots() {
      dots.forEach(function(d, i) {
        d.classList.toggle('res-stack-dot--active', i === 0);
      });
      // Reordena os dots para refletir a carta atual no topo
      var activeIdx = cards.indexOf(cards[0]);
      dots.forEach(function(d, i) { d.classList.remove('res-stack-dot--active'); });
      // Os dots ficam fixos por posição — o índice visual é sempre 0 no topo
      if (dots[0]) dots[0].classList.add('res-stack-dot--active');
    }

    function syncDots() {
      // Sincroniza qual dot é o ativo com base na ordem atual das cartas
      var total = cards.length;
      dots.forEach(function(d, i) {
        d.classList.toggle('res-stack-dot--active', i === 0);
      });
    }

    function positionCards() {
      cards.forEach(function(card, i) {
        if (i >= VISIBLE) {
          card.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;pointer-events:none;z-index:0;';
          return;
        }
        var offsetY = i * -10; // sobe um pouco a cada carta atrás
        var scale = 1 - i * 0.05;
        var brightness = 1 - i * 0.18;
        card.style.transition = 'transform 0.28s cubic-bezier(0.34,1.4,0.64,1), filter 0.28s ease, opacity 0.28s ease';
        card.style.transform = 'translateY(' + offsetY + 'px) scale(' + scale + ')';
        card.style.filter = 'brightness(' + brightness + ')';
        card.style.zIndex = VISIBLE - i + 1;
        card.style.opacity = '1';
        card.style.pointerEvents = i === 0 ? 'auto' : 'none';
      });
    }

    function cycleNext(vx, vy) {
      if (isAnimating) return;
      isAnimating = true;
      var topCard = cards[0];
      var tx = (vx !== undefined) ? vx * 3 : 280;
      var ty = (vy !== undefined) ? vy * 3 : -40;
      var rot = tx * 0.1;
      topCard.style.transition = 'transform 0.18s ease, opacity 0.15s ease';
      topCard.style.transform = 'translate(' + tx + 'px, ' + ty + 'px) rotate(' + rot + 'deg)';
      topCard.style.opacity = '0';
      topCard.style.zIndex = 100;
      setTimeout(function() {
        topCard.style.transition = 'none';
        topCard.style.opacity = '1';
        topCard.style.transform = '';
        topCard.style.zIndex = '';
        cards.push(cards.shift());
        stack.appendChild(topCard);
        positionCards();
        if (dots.length) {
          var d = dots.shift();
          dots.push(d);
          dots.forEach(function(dot, i) { dot.classList.toggle('res-stack-dot--active', i === 0); });
        }
        if (hint) hint.style.opacity = '0';
        setTimeout(function() { isAnimating = false; }, 50);
      }, 190);
    }

    function cyclePrev() {
      if (isAnimating) return;
      isAnimating = true;
      // Move a última carta para o topo (frente)
      var lastCard = cards[cards.length - 1];
      lastCard.style.transition = 'none';
      lastCard.style.transform = 'translate(-280px, -40px) rotate(-18deg)';
      lastCard.style.opacity = '0';
      lastCard.style.zIndex = 100;
      cards.unshift(cards.pop());
      stack.insertBefore(lastCard, stack.firstChild);
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          positionCards();
          if (dots.length) {
            var d = dots.pop();
            dots.unshift(d);
            dots.forEach(function(dot, i) { dot.classList.toggle('res-stack-dot--active', i === 0); });
          }
          if (hint) hint.style.opacity = '0';
          setTimeout(function() { isAnimating = false; }, 280);
        });
      });
    }

    positionCards();
    if (dots[0]) dots[0].classList.add('res-stack-dot--active');

    // Setas de navegação
    if (btnNext) btnNext.addEventListener('click', function() { cycleNext(); });
    if (btnPrev) btnPrev.addEventListener('click', function() { cyclePrev(); });

    // Click/tap na carta do topo avança
    stack.addEventListener('click', function(e) {
      if (isAnimating || wasDrag) return;
      var topCard = cards[0];
      var el = e.target;
      while (el && el !== stack) { if (el === topCard) break; el = el.parentElement; }
      if (el !== topCard) return;
      cycleNext(220, -30);
    });

    // Drag por touch
    stack.addEventListener('touchstart', function(e) {
      if (isAnimating) return;
      var topCard = cards[0];
      var el = e.target;
      while (el && el !== stack) { if (el === topCard) break; el = el.parentElement; }
      if (el !== topCard) return;
      isDragging = true; wasDrag = false;
      var pt = e.touches[0];
      startX = pt.clientX; startY = pt.clientY;
      curX = 0; curY = 0;
      topCard.style.transition = 'none';
      topCard.style.zIndex = 100;
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
      if (!isDragging) return;
      var topCard = cards[0];
      var pt = e.touches[0];
      curX = pt.clientX - startX;
      curY = pt.clientY - startY;
      // Decide a direcao no primeiro movimento significativo
      if (!wasDrag) {
        if (Math.abs(curX) < 8 && Math.abs(curY) < 8) return; // ainda indefinido
        if (Math.abs(curY) > Math.abs(curX)) {
          // Gesto vertical: nao e swipe de carta — libera a rolagem da pagina
          isDragging = false;
          topCard.style.transition = '';
          positionCards();
          return;
        }
        wasDrag = true; // gesto horizontal confirmado
      }
      if (e.cancelable) e.preventDefault();
      topCard.style.transform = 'translate(' + curX + 'px, ' + curY + 'px) rotate(' + (curX * 0.07) + 'deg)';
    }, { passive: false });

    document.addEventListener('touchend', function() {
      if (!isDragging) return;
      isDragging = false;
      var topCard = cards[0];
      var dist = Math.sqrt(curX * curX + curY * curY);
      if (dist >= MIN_DRAG) {
        wasDrag = true;
        cycleNext(curX, curY);
      } else {
        positionCards();
      }
      setTimeout(function() { wasDrag = false; }, 400);
    });

    // Drag por mouse (desktop)
    stack.addEventListener('mousedown', function(e) {
      if (isAnimating) return;
      var topCard = cards[0];
      var el = e.target;
      while (el && el !== stack) { if (el === topCard) break; el = el.parentElement; }
      if (el !== topCard) return;
      isDragging = true; wasDrag = false;
      startX = e.clientX; startY = e.clientY;
      curX = 0; curY = 0;
      topCard.style.transition = 'none';
      topCard.style.zIndex = 100;
      e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      var topCard = cards[0];
      curX = e.clientX - startX;
      curY = e.clientY - startY;
      if (Math.abs(curX) > 5 || Math.abs(curY) > 5) {
        wasDrag = true;
        topCard.style.transform = 'translate(' + curX + 'px, ' + curY + 'px) rotate(' + (curX * 0.07) + 'deg)';
      }
    });

    document.addEventListener('mouseup', function() {
      if (!isDragging) return;
      isDragging = false;
      var dist = Math.sqrt(curX * curX + curY * curY);
      if (dist >= MIN_DRAG) {
        wasDrag = true;
        cycleNext(curX, curY);
      } else {
        positionCards();
      }
      setTimeout(function() { wasDrag = false; }, 400);
    });
  })();

  // --- GOOGLE REVIEWS CAROUSEL (drag + dots) ---
  (function initGrCarousel() {
    var track = document.getElementById('grCards');
    var dotsWrap = document.getElementById('grDots');
    if (!track) return;

    var cards = Array.from(track.querySelectorAll('.gr-card'));
    var isDragging = false;
    var startX = 0;
    var scrollStart = 0;

    // Mouse drag
    track.addEventListener('mousedown', function(e) {
      isDragging = true;
      startX = e.pageX;
      scrollStart = track.scrollLeft;
      track.style.scrollSnapType = 'none';
    });
    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      var dx = e.pageX - startX;
      track.scrollLeft = scrollStart - dx;
    });
    document.addEventListener('mouseup', function() {
      if (!isDragging) return;
      isDragging = false;
      track.style.scrollSnapType = 'x mandatory';
    });

    // Previne cliques acidentais após drag
    track.addEventListener('click', function(e) {
      if (Math.abs(track.scrollLeft - scrollStart) > 5) {
        e.preventDefault();
      }
    });

    // Dots
    if (dotsWrap) {
      cards.forEach(function(_, i) {
        var dot = document.createElement('button');
        dot.className = 'gr-dot' + (i === 0 ? ' gr-dot--active' : '');
        dot.setAttribute('aria-label', 'Avaliação ' + (i + 1));
        dot.addEventListener('click', function() {
          cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        });
        dotsWrap.appendChild(dot);
      });

      var dots = Array.from(dotsWrap.querySelectorAll('.gr-dot'));
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var idx = cards.indexOf(entry.target);
            dots.forEach(function(d, j) {
              d.classList.toggle('gr-dot--active', j === idx);
            });
          }
        });
      }, { root: track, threshold: 0.6 });

      cards.forEach(function(card) { observer.observe(card); });
    }
  })();

  // --- PARALLAX FLOATING PHOTOS — Desktop: mouse move desloca fotos por profundidade ---
  (function initFloatingParallax() {
    var wrap = document.getElementById('imgTrailWrap');
    if (!wrap) return;

    var photos = Array.prototype.slice.call(wrap.querySelectorAll('.float-photo'));
    if (!photos.length) return;

    // Rotação base vinda de data-rot (graus)
    var rots = photos.map(function(p) {
      return (p.dataset.rot || '0') + 'deg';
    });

    // Aplica rotação inicial via transform para evitar flash sem rotação
    photos.forEach(function(p, i) {
      p.style.transform = 'translate3d(0,0,0) rotate(' + rots[i] + ')';
    });

    var cur = photos.map(function() { return { x: 0, y: 0 }; });
    var mouseX = 0, mouseY = 0;
    var SENSITIVITY = -0.5;
    var EASE = 0.06;

    wrap.addEventListener('mousemove', function(e) {
      var rect = wrap.getBoundingClientRect();
      mouseX = e.clientX - rect.left - rect.width * 0.5;
      mouseY = e.clientY - rect.top  - rect.height * 0.5;
    });

    wrap.addEventListener('mouseleave', function() {
      mouseX = 0;
      mouseY = 0;
    });

    (function tick() {
      photos.forEach(function(photo, i) {
        var depth    = parseFloat(photo.dataset.depth || '1');
        var strength = (depth * SENSITIVITY) / 20;
        var tx = mouseX * strength;
        var ty = mouseY * strength;
        cur[i].x += (tx - cur[i].x) * EASE;
        cur[i].y += (ty - cur[i].y) * EASE;
        photo.style.transform =
          'translate3d(' + cur[i].x.toFixed(2) + 'px,' +
                           cur[i].y.toFixed(2) + 'px,0) rotate(' + rots[i] + ')';
      });
      requestAnimationFrame(tick);
    })();
  })();

  // --- PARALLAX HERO — mesmo efeito na primeira dobra ---
  (function initHeroParallax() {
    var hero = document.querySelector('.hero');
    if (!hero) return;
    if (window.innerWidth < 1024) return; // só desktop

    var photos = Array.prototype.slice.call(hero.querySelectorAll('.hero__side-img[data-depth]'));
    if (!photos.length) return;

    var baseTransforms = photos.map(function(p) {
      var rot = (p.dataset.rot || '0') + 'deg';
      return 'rotate(' + rot + ')';
    });

    // Aplica transform inicial para evitar flash sem rotação
    photos.forEach(function(p, i) {
      p.style.transform = 'translate3d(0,0,0) ' + baseTransforms[i];
    });

    var cur = photos.map(function() { return { x: 0, y: 0 }; });
    var mouseX = 0, mouseY = 0;
    var SENSITIVITY = -0.5;
    var EASE = 0.06;

    hero.addEventListener('mousemove', function(e) {
      var rect = hero.getBoundingClientRect();
      mouseX = e.clientX - rect.left - rect.width  * 0.5;
      mouseY = e.clientY - rect.top  - rect.height * 0.5;
    });

    hero.addEventListener('mouseleave', function() {
      mouseX = 0;
      mouseY = 0;
    });

    (function tick() {
      photos.forEach(function(photo, i) {
        var depth    = parseFloat(photo.dataset.depth || '1');
        var strength = (depth * SENSITIVITY) / 20;
        var tx = mouseX * strength;
        var ty = mouseY * strength;
        cur[i].x += (tx - cur[i].x) * EASE;
        cur[i].y += (ty - cur[i].y) * EASE;
        photo.style.transform =
          'translate3d(' + cur[i].x.toFixed(2) + 'px,' +
                           cur[i].y.toFixed(2) + 'px,0) ' + baseTransforms[i];
      });
      requestAnimationFrame(tick);
    })();
  })();

  // --- PROC HERO: imagens diferentes por página ---
  (function setProcHeroImage() {
    var bg = document.querySelector('.proc-hero__bg');
    if (!bg) return;
    var page = window.location.pathname.split('/').pop().replace('.html', '');
    var map = {
      'cronograma-estelar':            "url('../Imagens/IMG_6206.JPEG')",
      'cronograma-capilar':            "url('../Imagens/IMG_6201.JPEG')",
      'tratamento-estelar':            "url('../Imagens/IMG_5523.JPEG')",
      'tratamento-capilar':            "url('../Imagens/IMG_5383.JPEG')",
      'corte-terapeutico':             "url('../Imagens/IMG_9700.JPEG')",
      'corte-estiloso':                "url('../Imagens/IMG_9380.JPEG')",
      'plastica-dos-fios':             "url('../Imagens/IMG_6937.JPEG')",
      'hidratacao':                    "url('../Imagens/IMG_5750.JPEG')",
      'nutricao':                      "url('../Imagens/IMG_5741.JPEG')",
      'reconstrucao':                  "url('../Imagens/IMG_5578.JPEG')",
      'acidificacao-redken':           "url('../Imagens/IMG_4271.JPEG')",
      'ccrp-carvao-ativado':           "url('../Imagens/IMG_3344.JPEG')",
      'reposicao-de-carbono':          "url('../Imagens/IMG_3095.JPEG')",
      'finalizacao-cacheada':          "url('../Imagens/IMG_8246.JPEG')",
      'finalizacao-lisa':              "url('../Imagens/IMG_8242.JPEG')",
      'progressiva':                   "url('../Imagens/IMG_7685.JPEG')",
      'detok':                         "url('../Imagens/IMG_7604.JPEG')",
      'harmonizacao-lisas':            "url('../Imagens/IMG_7444.JPEG')",
      'harmonizacao-cacheadas':        "url('../Imagens/IMG_7159.JPEG')",
      'harmonizacao-crespas':          "url('../Imagens/IMG_6882.JPEG')",
      'mechas':                        "url('../Imagens/IMG_6474.JPEG')",
      'luzes':                         "url('../Imagens/IMG_6327.JPEG')",
      'ombre-hair':                    "url('../Imagens/IMG_6325.JPEG')",
      'californiana':                  "url('../Imagens/IMG_4945.JPEG')",
      'global':                        "url('../Imagens/IMG_3559.JPEG')",
      'coloracao':                     "url('../Imagens/IMG_3085.JPEG')",
      'moreno-iluminado-descoloracao': "url('../Imagens/IMG_2985.JPEG')",
      'moreno-iluminado-coloracao':    "url('../Imagens/IMG_2683.JPEG')",
      'coloridos':                     "url('../Imagens/IMG_2280.JPEG')",
      'coloridos-uma-mecha':           "url('../Imagens/IMG_1924.JPEG')",
      'coloridos-mechas':              "url('../Imagens/IMG_1229.JPEG')",
      'coloridos-peekaboo':            "url('../Imagens/IMG_0514.JPEG')",
      'coloridos-global':              "url('../Imagens/IMG_0222.JPEG')",
    };
    var val = map[page];
    if (val) bg.style.backgroundImage = val;
  })();

  // --- CURSOR PERSONALIZADO — seta lilás com rastro glitter ---
  (function initCustomCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Ativa cursor invisível via classe no body
    document.body.classList.add('has-custom-cursor');

    // Seta SVG com bordas grossas
    var arrow = document.createElement('div');
    arrow.id = 'cursor-arrow';
    arrow.innerHTML = '<svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 2.5L2.5 20L8 14.5L11.5 22L15 20L11.5 12.5L19 12.5L2.5 2.5Z" fill="#c084fc" stroke="#7c3aed" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round"/></svg>';
    document.body.appendChild(arrow);

    // Estrela 4 pontas (mesmo path do hero)
    var SP = 'M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z';
    var COLS = ['#ffffff', '#b14eff', '#d9acff', '#c084fc', '#e879f9', '#ffffff', '#e46aa0'];
    var lastX = 0, lastY = 0;
    var MIN_DIST = 9;

    function spawnStar(x, y) {
      var sz = 2 + Math.random() * 4;
      var col = COLS[Math.floor(Math.random() * COLS.length)];
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', SP);
      path.setAttribute('fill', col);
      svg.setAttribute('viewBox', '0 0 21 21');
      svg.appendChild(path);
      var dur = (0.45 + Math.random() * 0.4).toFixed(2);
      svg.style.cssText = 'position:fixed;pointer-events:none;z-index:99997;left:' + x + 'px;top:' + y + 'px;width:' + sz + 'px;height:' + sz + 'px;filter:drop-shadow(0 0 ' + (sz * 0.5) + 'px #fff) drop-shadow(0 0 ' + (sz * 1.5) + 'px ' + col + ') drop-shadow(0 0 ' + (sz * 3) + 'px ' + col + ');animation:cursorStarFade ' + dur + 's ease forwards;';
      document.body.appendChild(svg);
      svg.addEventListener('animationend', function () { svg.remove(); });
    }

    document.addEventListener('mousemove', function (e) {
      arrow.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
      var dx = e.clientX - lastX, dy = e.clientY - lastY;
      if (Math.sqrt(dx * dx + dy * dy) < MIN_DIST) return;
      lastX = e.clientX; lastY = e.clientY;
      spawnStar(e.clientX, e.clientY);
    }, { passive: true });
  })();

  // --- GLOW DE TOQUE — gradiente sunset suave, sem anéis (mobile only) ---
  (function initTouchGlow() {
    if (window.matchMedia('(min-width: 769px)').matches) return;

    var canvas = document.getElementById('org-led');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');

    // Paleta: rosa predomina, lilás secundário
    var COLORS = [
      [228, 106, 160],  // rosa           (#e46aa0)
      [235,  90, 150],  // rosa escuro    (#EB5A96)
      [220,  90, 200],  // fúcsia rosa    (#DC5AC8)
      [210, 140, 255],  // lilás claro    (#d28cff)
      [228, 106, 160],  // rosa (dobrado para maior probabilidade)
    ];

    var blobs  = [];
    var sparks = [];
    var raf    = null;

    // Cores do glitter: branco quente, rosa claro, lilás claro
    var SPARK_COLORS = [
      [255, 255, 255],   // branco puro
      [255, 210, 240],   // branco-rosado
      [230, 180, 255],   // branco-lilás
      [255, 230, 255],   // branco-pink suave
    ];

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function spawnSparks(x, y) {
      var count = 10 + Math.floor(Math.random() * 7); // 10–16 partículas
      for (var i = 0; i < count; i++) {
        var angle = Math.random() * Math.PI * 2;
        var speed = 1.5 + Math.random() * 3.5;
        var color = SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)];
        sparks.push({
          x:  x, y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5, // leve impulso para cima
          r:  0.8 + Math.random() * 2,       // 0.8–2.8px
          alpha: 0.9 + Math.random() * 0.1,
          color: color
        });
      }
    }

    function spawnBlob(x, y, maxR, alpha) {
      var color = COLORS[Math.floor(Math.random() * COLORS.length)];
      blobs.push({
        x:     x,
        y:     y,
        r:     6,
        maxR:  maxR  || (50 + Math.random() * 25),
        alpha: alpha || 0.35,
        color: color,
        phase: 'grow'
      });
      if (!raf) loop();
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';

      // Glitter — desenhado antes do blob para ficar sobre ele
      for (var j = sparks.length - 1; j >= 0; j--) {
        var s = sparks[j];
        s.x  += s.vx;
        s.y  += s.vy;
        s.vy += 0.12;   // gravidade leve
        s.vx *= 0.94;   // desaceleração
        s.vy *= 0.94;
        s.alpha -= 0.034;
        if (s.alpha <= 0) { sparks.splice(j, 1); continue; }

        var sr = s.color[0], sg = s.color[1], sb = s.color[2];
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + sr + ',' + sg + ',' + sb + ',' + s.alpha.toFixed(2) + ')';
        ctx.fill();
      }

      // Blobs de gradiente
      for (var i = blobs.length - 1; i >= 0; i--) {
        var b = blobs[i];

        if (b.phase === 'grow') {
          b.r += (b.maxR - b.r) * 0.11;
          if (b.r >= b.maxR * 0.93) b.phase = 'fade';
        } else {
          b.alpha -= 0.008;
          if (b.alpha <= 0) { blobs.splice(i, 1); continue; }
        }

        var r  = b.color[0], g = b.color[1], bl = b.color[2];
        var a  = b.alpha;
        var gr = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        gr.addColorStop(0,    'rgba(' + r + ',' + g + ',' + bl + ',' + a + ')');
        gr.addColorStop(0.45, 'rgba(' + r + ',' + g + ',' + bl + ',' + (a * 0.45) + ')');
        gr.addColorStop(0.75, 'rgba(' + r + ',' + g + ',' + bl + ',' + (a * 0.08) + ')');
        gr.addColorStop(1,    'rgba(' + r + ',' + g + ',' + bl + ',0)');

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.fill();
      }

      if (blobs.length > 0 || sparks.length > 0) {
        raf = requestAnimationFrame(loop);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        raf = null;
      }
    }

    // Throttle no touchmove a cada 45px
    var lastX = -999, lastY = -999;
    var DIST2 = 45 * 45;

    window.addEventListener('touchstart', function(e) {
      var t = e.touches[0];
      lastX = t.clientX; lastY = t.clientY;
      spawnBlob(t.clientX, t.clientY);
      spawnSparks(t.clientX, t.clientY);
      if (!raf) loop();
    }, { passive: true });

    window.addEventListener('touchmove', function(e) {
      var t  = e.touches[0];
      var dx = t.clientX - lastX, dy = t.clientY - lastY;
      if (dx * dx + dy * dy >= DIST2) {
        spawnBlob(t.clientX, t.clientY);
        lastX = t.clientX; lastY = t.clientY;
      }
    }, { passive: true });

    resize();
    window.addEventListener('resize', resize, { passive: true });
  })();

  // --- BLOB ORGÂNICO COM PARALLAX DE SCROLL ---
  (function initScrollOrb() {
    var orb  = document.getElementById('scroll-orb');
    var orb2 = document.getElementById('scroll-orb-2');
    if (!orb) return;

    var isMobile = window.innerWidth < 769;
    var speedMain      = isMobile ? 0.45 : 0.12;
    var speedSecondary = isMobile ? 0.28 : 0.06;

    var curY = 0, curS = 1, curY2 = 0;

    function tick() {
      var scroll = window.scrollY;

      var targetY  = scroll * speedMain;
      var targetS  = 1 + Math.min(scroll / 1800, 0.8);
      var targetY2 = scroll * speedSecondary;

      curY  += (targetY  - curY)  * 0.08;
      curS  += (targetS  - curS)  * 0.08;
      curY2 += (targetY2 - curY2) * 0.06;

      orb.style.transform =
        'translate(-50%, -50%) translateY(' + curY.toFixed(1) + 'px) scale(' + curS.toFixed(3) + ')';

      if (orb2) {
        orb2.style.transform =
          'translate(-50%, -50%) translateY(' + curY2.toFixed(1) + 'px)';
      }

      requestAnimationFrame(tick);
    }

    tick();
  })();

  // --- TILT 3D DOS CARDS DIFERENCIAIS (desktop: cursor / mobile: scroll) ---
  (function initDifCardTilt() {
    var cards = document.querySelectorAll('.dif-card');
    if (!cards.length) return;

    var isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (!isMobile) {
      // Desktop: inclina conforme posição do cursor dentro do card
      cards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
          var rect = card.getBoundingClientRect();
          var dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
          var dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
          card.style.transition = 'box-shadow 0.4s ease';
          card.style.transform  = 'perspective(900px) rotateX(' + (-dy * 8) + 'deg) rotateY(' + (dx * 10) + 'deg) translateZ(10px)';
        });
        card.addEventListener('mouseleave', function() {
          card.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease';
          card.style.transform  = '';
        });
      });

    } else {
      // Mobile: inclina suavemente baseado na posição do card no viewport ao rolar
      function applyScrollTilt() {
        var vh = window.innerHeight;
        cards.forEach(function(card) {
          var rect     = card.getBoundingClientRect();
          var center   = rect.top + rect.height / 2;
          var progress = (vh / 2 - center) / (vh / 2);
          progress = Math.max(-1, Math.min(1, progress));
          card.style.transform = 'perspective(700px) rotateX(' + (progress * 5) + 'deg)';
        });
      }
      window.addEventListener('scroll', applyScrollTilt, { passive: true });
      applyScrollTilt();
    }
  })();

  /* ── Glitter escorrendo da borda das bolinhas da equipe (index) ── */
  (function initTeamGlitter() {
    var cards = document.querySelectorAll('.equipe__mini-card');
    if (!cards.length) return;

    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    var particles = [];
    /* Cores: maioria branco/prata brilhoso, pontadas de roxo e rosa */
    var COLORS = [
      '#ffffff','#ffffff','#ffffff',
      '#ffe8ff','#f0d4ff',
      '#b14eff','#e46aa0'
    ];

    function spawnGlitter(card) {
      var img = card.querySelector('.equipe__mini-img');
      if (!img) return;
      var r = img.getBoundingClientRect();
      if (r.width === 0) return;
      var cx = r.left + r.width  / 2;
      var cy = r.top  + r.height / 2;
      var radius = r.width / 2;
      var count = 22 + Math.floor(Math.random() * 10);
      for (var i = 0; i < count; i++) {
        /* Ângulo aleatório ao redor da borda */
        var angle = Math.random() * Math.PI * 2;
        particles.push({
          x:    cx + Math.cos(angle) * radius,
          y:    cy + Math.sin(angle) * radius,
          vx:   (Math.random() - 0.5) * 0.7,   /* pouco spread lateral */
          vy:   Math.random() * 2.0 + 0.8,      /* sempre cai para baixo */
          alpha: 1.0,
          size:  0.6 + Math.random() * 1.1,     /* bem fino */
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          gravity: 0.07 + Math.random() * 0.04,
          drag:    0.97
        });
      }
    }

    var raf = null;
    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter'; /* blending aditivo — mais brilho */
      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.vy    += p.gravity;
        p.vx    *= p.drag;
        p.x     += p.vx;
        p.y     += p.vy;
        p.alpha -= 0.016;
        if (p.alpha <= 0) { particles.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle   = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur  = 14;  /* halo brilhoso */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.globalCompositeOperation = 'source-over';
      if (particles.length > 0) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    }

    function startLoop() {
      if (!raf) raf = requestAnimationFrame(tick);
    }

    function burstAll() {
      cards.forEach(function(card, i) {
        setTimeout(function() { spawnGlitter(card); startLoop(); }, i * 150);
      });
    }

    /* Desktop: hover */
    cards.forEach(function(card) {
      card.addEventListener('mouseenter', function() {
        spawnGlitter(card); startLoop();
      });
    });

    /* Dispara UMA VEZ quando a seção entra na tela */
    var section = cards[0].closest('section') || cards[0].parentElement;
    var fired = false;
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !fired) {
          fired = true;
          burstAll();
          observer.disconnect();
        }
      });
    }, { threshold: 0.05 });
    observer.observe(section);
  })();

  /* ── Equipe swap: clique nas bolinhas troca a pessoa principal ── */
  (function initEquipeSwap() {
    var fotoEl = document.querySelector('.equipe__idx-foto');
    var nomeEl = document.querySelector('.equipe__idx-nome');
    var roleEl = document.querySelector('.equipe__idx-role');
    var descEl = document.querySelector('.equipe__idx-desc');
    if (!fotoEl || !nomeEl) return;

    var activeAlt = fotoEl.getAttribute('alt') || 'Marly';

    document.querySelectorAll('.equipe__mini-card[data-member]').forEach(function(card) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function() {
        var newPhoto = card.dataset.photo;
        var newNome  = card.dataset.nome;
        var newRole  = card.dataset.role;
        var newDesc  = card.dataset.desc;
        if (newNome === activeAlt) return;

        var prevPhoto = fotoEl.getAttribute('src');
        var prevNome  = nomeEl.textContent.trim();
        var prevRole  = roleEl.textContent.trim();
        var prevDesc  = descEl.textContent.trim();

        /* Atualiza destaque principal */
        var newPosition = card.dataset.position || 'center top';
        var prevPosition = fotoEl.style.objectPosition || 'center top';

        fotoEl.style.opacity = '0';
        fotoEl.style.transform = 'scale(0.92)';
        setTimeout(function() {
          fotoEl.setAttribute('src', newPhoto);
          fotoEl.setAttribute('alt', newNome);
          fotoEl.style.objectPosition = newPosition;
          nomeEl.textContent = newNome;
          roleEl.textContent = newRole;
          descEl.textContent = newDesc;
          fotoEl.style.opacity = '1';
          fotoEl.style.transform = 'scale(1)';
        }, 180);
        card.dataset.position = prevPosition;

        /* Atualiza bolinha clicada para mostrar quem saiu */
        card.querySelector('.equipe__mini-img').setAttribute('src', prevPhoto);
        card.querySelector('.equipe__mini-img').setAttribute('alt', prevNome);
        card.querySelector('.equipe__mini-role').textContent = prevNome + ' · ' + prevRole.split(' · ').pop();
        card.dataset.photo = prevPhoto;
        card.dataset.nome  = prevNome;
        card.dataset.role  = prevRole;
        card.dataset.desc  = prevDesc;
        card.style.display = '';

        /* Esconde a bolinha da pessoa que acabou de virar principal */
        document.querySelectorAll('.equipe__mini-card[data-member]').forEach(function(c) {
          if (c !== card && c.dataset.nome === newNome) c.style.display = 'none';
        });

        activeAlt = newNome;
      });
    });
  })();

  // --- GRAIN GRADIENT BG (servicos.html only) ---
  (function initProcGrain() {
    if (!window.location.pathname.match(/servicos\.html/)) return;

    var canvas = document.createElement('canvas');
    canvas.id = 'proc-grain';
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;';
    document.body.insertBefore(canvas, document.body.firstChild);

    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var w = 0, h = 0, noisePat;

    // Gera textura de ruído estático (grain)
    var noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = noiseCanvas.height = 256;
    var nCtx = noiseCanvas.getContext('2d');
    var imgd = nCtx.createImageData(256, 256);
    for (var i = 0; i < imgd.data.length; i += 4) {
      var v = Math.random() * 255 | 0;
      imgd.data[i] = imgd.data[i + 1] = imgd.data[i + 2] = v;
      imgd.data[i + 3] = 255;
    }
    nCtx.putImageData(imgd, 0, 0);

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      noisePat = ctx.createPattern(noiseCanvas, 'repeat');
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    var t = 0, rafId, running = true;

    function draw() {
      if (!running) return;
      t += 0.003;
      var M = Math.max(w, h);

      // Fundo base
      ctx.fillStyle = '#07000e';
      ctx.fillRect(0, 0, w, h);

      // Blob roxo — acento principal
      var x1 = w * (0.25 + 0.18 * Math.sin(t * 0.71));
      var y1 = h * (0.28 + 0.20 * Math.cos(t * 0.53));
      var g1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, M * 0.62);
      g1.addColorStop(0, 'rgba(177,78,255,0.22)');
      g1.addColorStop(1, 'transparent');
      ctx.fillStyle = g1; ctx.fillRect(0, 0, w, h);

      // Blob rosa
      var x2 = w * (0.76 + 0.14 * Math.cos(t * 0.59));
      var y2 = h * (0.65 + 0.18 * Math.sin(t * 0.77));
      var g2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, M * 0.50);
      g2.addColorStop(0, 'rgba(228,106,160,0.16)');
      g2.addColorStop(1, 'transparent');
      ctx.fillStyle = g2; ctx.fillRect(0, 0, w, h);

      // Blob roxo-escuro central
      var x3 = w * (0.50 + 0.20 * Math.sin(t * 0.37 + 1.2));
      var y3 = h * (0.55 + 0.22 * Math.cos(t * 0.43));
      var g3 = ctx.createRadialGradient(x3, y3, 0, x3, y3, M * 0.46);
      g3.addColorStop(0, 'rgba(28,15,48,0.60)');
      g3.addColorStop(1, 'transparent');
      ctx.fillStyle = g3; ctx.fillRect(0, 0, w, h);

      // Grain overlay
      ctx.save();
      ctx.globalAlpha = 0.042;
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = noisePat;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      rafId = requestAnimationFrame(draw);
    }

    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else {
        running = true;
        rafId = requestAnimationFrame(draw);
      }
    });

    rafId = requestAnimationFrame(draw);
  })();

  // --- FOTOS FLUTUANTES — toque/clique abre foto, estoura com glitter ---
  (function initHeroBubble() {
    var els = Array.prototype.slice.call(document.querySelectorAll('.hero__side-img'));
    if (!els.length) return;

    // Keyframes compartilhados usando CSS custom properties
    var st = document.createElement('style');
    st.textContent =
      '.hero__side-img{-webkit-tap-highlight-color:transparent!important;user-select:none;touch-action:manipulation;}' +
      '@media(hover:hover){.hero__side-img{cursor:pointer!important;}}' +
      '@keyframes _bIn{0%{transform:translate(-50%,-50%) scale(0.08);opacity:0}70%{transform:translate(-50%,-50%) scale(1.04);opacity:1}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}' +
      '@keyframes _bPop{0%{transform:translate(-50%,-50%) scale(1);opacity:1}40%{transform:translate(-50%,-50%) scale(1.18) rotate(2deg);opacity:.9}100%{transform:translate(-50%,-50%) scale(0) rotate(-4deg);opacity:0}}' +
      '@keyframes _oIn{from{opacity:0}to{opacity:1}}@keyframes _oOut{from{opacity:1}to{opacity:0}}' +
      '@keyframes _gFly{0%{transform:translate(0,0) rotate(0deg) scale(1);opacity:1}100%{transform:translate(var(--gx),var(--gy)) rotate(var(--gr)) scale(0.2);opacity:0}}' +
      '._bov{position:fixed;inset:0;z-index:100000;background:rgba(10,0,20,.55);backdrop-filter:blur(6px);animation:_oIn .3s ease forwards;pointer-events:none;}' +
      '._bcard{position:fixed;left:50%;top:50%;z-index:100001;border-radius:18px;overflow:hidden;' +
        'box-shadow:0 0 0 3px rgba(228,106,160,.7),0 0 50px rgba(228,106,160,.5),0 0 100px rgba(177,78,255,.35);' +
        'animation:_bIn .5s cubic-bezier(.175,.885,.32,1.275) forwards;pointer-events:none;}' +
      '._bcard img{width:100%;height:100%;object-fit:cover;display:block;}' +
      '._gp{position:fixed;z-index:100002;pointer-events:none;border-radius:3px;animation:_gFly var(--gd) var(--gdelay) ease-out forwards;}';
    document.head.appendChild(st);

    var active = false;
    var COLORS = ['#e46aa0','#b14eff','#ff9de2','#ffffff','#d9acff','#c4a24e','#ff6ec7','#f9d1ff'];

    function spawnGlitter() {
      var cx = window.innerWidth  * 0.5;
      var cy = window.innerHeight * 0.5;
      for (var i = 0; i < 65; i++) {
        var angle = Math.random() * Math.PI * 2;
        var dist  = 90 + Math.random() * (Math.min(window.innerWidth, window.innerHeight) * 0.45);
        var size  = 5 + Math.random() * 11;
        var isRound = Math.random() > 0.45;
        var g = document.createElement('div');
        g.className = '_gp';
        g.style.cssText =
          'left:'  + (cx - size/2) + 'px;' +
          'top:'   + (cy - size/2) + 'px;' +
          'width:' + size + 'px;height:' + size + 'px;' +
          'background:' + COLORS[Math.floor(Math.random() * COLORS.length)] + ';' +
          'border-radius:' + (isRound ? '50%' : '2px') + ';' +
          '--gx:' + (Math.cos(angle) * dist).toFixed(1) + 'px;' +
          '--gy:' + (Math.sin(angle) * dist).toFixed(1) + 'px;' +
          '--gr:' + (Math.random() * 900 - 450).toFixed(0) + 'deg;' +
          '--gd:'  + (0.55 + Math.random() * 0.65).toFixed(2) + 's;' +
          '--gdelay:' + (Math.random() * 0.08).toFixed(2) + 's;';
        document.body.appendChild(g);
        setTimeout(function(el){ el.remove(); }, 1400, g);
      }
    }

    function showPhoto(imgEl) {
      if (active) return;
      active = true;

      var rect = imgEl.getBoundingClientRect();
      var ratio = (rect.width / rect.height) || 0.75;
      var maxW  = window.innerWidth  * 0.84;
      var maxH  = window.innerHeight * 0.78;
      var w = maxW, h = maxW / ratio;
      if (h > maxH) { h = maxH; w = maxH * ratio; }

      var ov = document.createElement('div');
      ov.className = '_bov';

      var card = document.createElement('div');
      card.className = '_bcard';
      card.style.width  = w + 'px';
      card.style.height = h + 'px';

      var pic = document.createElement('img');
      pic.src = imgEl.src;
      card.appendChild(pic);

      document.body.appendChild(ov);
      document.body.appendChild(card);

      var popTimer = setTimeout(doPop, 2000);

      function doPop() {
        clearTimeout(popTimer);
        card.style.animation = '_bPop .38s cubic-bezier(.55,0,1,.45) forwards';
        ov.style.animation   = '_oOut .5s ease forwards';
        spawnGlitter();
        setTimeout(function() { card.remove(); ov.remove(); active = false; }, 900);
      }

    }

    // Listener direto em cada elemento — touchstart para mobile, click para desktop
    els.forEach(function(wrapper) {
      var touched = false;

      wrapper.addEventListener('touchstart', function(e) {
        touched = true;
        e.stopPropagation();
        var img = wrapper.querySelector('img');
        if (img) showPhoto(img);
      }, { passive: true });

      wrapper.addEventListener('click', function(e) {
        if (touched) { touched = false; return; } // evita duplo disparo
        var img = wrapper.querySelector('img');
        if (img) showPhoto(img);
      });
    });
  })();

});
