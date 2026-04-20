/* ============================================
   SALÃO EXPLOSION — Resultados interativos
   Desktop: Image Cursor Trail | Mobile: Stacked Cards
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- STACKED CARDS (mobile) ---- */
  const scWrapper = document.getElementById('scWrapper');
  const scHint    = document.getElementById('scHint');
  const scCard1   = document.getElementById('scCard1');
  const scCard2   = document.getElementById('scCard2');
  const scCard3   = document.getElementById('scCard3');

  const PHOTOS = [
    { src: 'imagens 2/IMG_2716.JPEG', title: 'Roxo vibrante',         sub: 'Coloração criativa com resultado incrível' },
    { src: 'imagens 2/IMG_5475.JPEG', title: 'Cachos com atitude',    sub: 'Definição e volume com afeto' },
    { src: 'imagens 2/IMG_5993.JPEG', title: 'Ombré perfeito',        sub: 'Luzes que iluminam o rosto' },
    { src: 'imagens 2/IMG_2125.JPEG', title: 'Leveza e sorriso',      sub: 'Cachos definidos e felizes' },
    { src: 'imagens 2/IMG_6094.JPEG', title: 'Afro dourado',          sub: 'Coloração que abraça sua textura' },
    { src: 'imagens 2/IMG_5244.JPEG', title: 'Mel e cachos',          sub: 'Mechas que valorizam os fios' },
    { src: 'imagens 2/IMG_9280.JPEG', title: 'No espaço Explosion',   sub: 'Resultado feito com carinho aqui' },
    { src: 'imagens 2/IMG_5650.JPEG', title: 'Liso e sedoso',         sub: 'Progressiva com brilho real' },
  ];

  if (scWrapper && scCard1 && scCard2 && scCard3) {
    let currentIdx = 0;
    let isOpen = false;

    function getImg(card)   { return card.querySelector('.sc-img img'); }
    function getTitle(card) { return card.querySelector('.sc-text h3'); }
    function getSub(card)   { return card.querySelector('.sc-text p'); }

    function renderDeck(idx) {
      [scCard1, scCard2, scCard3].forEach(function (card, i) {
        var photo = PHOTOS[(idx + i) % PHOTOS.length];
        getImg(card).src           = photo.src;
        getTitle(card).textContent = photo.title;
        getSub(card).textContent   = photo.sub;
      });
    }

    function openDeck() {
      isOpen = true;
      scWrapper.classList.add('is-open');
      if (scHint) scHint.textContent = 'Toque nas fotos para ver mais';
    }

    function closeDeck() {
      isOpen = false;
      scWrapper.classList.remove('is-open');
      if (scHint) scHint.textContent = 'Toque para explorar';
    }

    renderDeck(0);

    scCard1.addEventListener('click', function () {
      if (!isOpen) { openDeck(); } else { closeDeck(); }
    });

    scCard2.addEventListener('click', function () {
      if (!isOpen) return;
      currentIdx = (currentIdx + 1) % PHOTOS.length;
      renderDeck(currentIdx);
      closeDeck();
    });

    scCard3.addEventListener('click', function () {
      if (!isOpen) return;
      currentIdx = (currentIdx + 2) % PHOTOS.length;
      renderDeck(currentIdx);
      closeDeck();
    });
  }

  /* ---- IMAGE CURSOR TRAIL (desktop apenas) ---- */
  const trail = document.getElementById('results-carousel');
  if (!trail || window.matchMedia('(max-width: 768px)').matches) return;

  initImageTrail(trail);
});

/* ================================================================
   IMAGE CURSOR TRAIL — Desktop
   Baseado em distância: spawn a cada MIN_DIST px de movimento.
   Máximo MAX_CARDS visíveis ao mesmo tempo (FIFO).
   ================================================================ */
function initImageTrail(container) {
  const IMAGES = [
    'imagens 2/IMG_2716.JPEG',   /* roxo vibrante — impacto máximo */
    'imagens 2/IMG_5475.JPEG',   /* cachos vermelhos + blazer */
    'imagens 2/IMG_5993.JPEG',   /* ombré ondulado */
    'imagens 2/IMG_5635.JPEG',   /* liso loiro comprido costas */
    'imagens 2/IMG_3467.JPEG',   /* masculino fade + cachos */
    'imagens 2/IMG_2170.JPEG',   /* azul escuro ondulado */
    'imagens 2/IMG_4444.JPEG',   /* liso longo costas */
    'imagens 2/IMG_6094.JPEG',   /* afro dourado sorrindo */
    'imagens 2/IMG_1521.JPEG',   /* loiro com mechas */
    'imagens 2/IMG_4833.JPEG',   /* afro grande */
    'imagens 2/IMG_2584.JPEG',   /* cachos escuros longos */
    'imagens 2/IMG_8532.JPEG',   /* loiro ondulado comprido + salão */
  ];

  const MAX_CARDS  = 7;    /* máximo de cards visíveis ao mesmo tempo */
  const MIN_DIST   = 35;   /* px que o mouse precisa mover para spawnar nova foto */
  const CARD_W     = 145;
  const CARD_H     = 180;
  const ROT_RANGE  = 18;
  const FADE_MS    = 300;  /* duração do fade out ao remover */

  Object.assign(container.style, {
    position: 'relative',
    height:   'clamp(440px, 56vw, 600px)',
    overflow: 'hidden',
    cursor:   'crosshair',
  });

  /* Título central — sempre acima dos cards */
  const label = document.createElement('div');
  Object.assign(label.style, {
    position:      'absolute',
    inset:         '0',
    display:       'flex',
    flexDirection: 'column',
    alignItems:    'center',
    justifyContent:'center',
    pointerEvents: 'none',
    zIndex:        '200',
    textAlign:     'center',
    gap:           '0.4rem',
  });

  const sub = document.createElement('span');
  Object.assign(sub.style, {
    fontFamily:    'var(--font-body, Outfit, sans-serif)',
    fontSize:      '0.78rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color:         'var(--accent, #b14eff)',
    fontWeight:    '500',
  });
  sub.textContent = 'Resultados reais';

  const title = document.createElement('span');
  Object.assign(title.style, {
    fontFamily:           'var(--font-display, "Cormorant Garamond", serif)',
    fontSize:             'clamp(3.5rem, 7vw, 6.5rem)',
    fontWeight:           '700',
    lineHeight:           '1',
    background:           'linear-gradient(135deg, #ede6f7 30%, #b14eff 100%)',
    webkitBackgroundClip: 'text',
    webkitTextFillColor:  'transparent',
    backgroundClip:       'text',
  });
  title.textContent = 'Nossos Resultados';

  const hintEl = document.createElement('span');
  Object.assign(hintEl.style, {
    fontSize:      '0.72rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color:         'rgba(237,230,247,0.4)',
    marginTop:     '0.75rem',
  });
  hintEl.textContent = 'Mova o mouse para explorar';

  label.appendChild(sub);
  label.appendChild(title);
  label.appendChild(hintEl);
  container.appendChild(label);

  /* Estado */
  let currentIdx = 0;
  let lastSpawnX = null;
  let lastSpawnY = null;
  let activeCards = [];   /* pool FIFO de cards visíveis */

  /* Pré-carrega imagens para evitar flash */
  IMAGES.forEach(src => { const i = new Image(); i.src = src; });

  function dist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }

  function removeCard(card) {
    card.style.transition = `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`;
    card.style.opacity = '0';
    card.style.transform = `translate(-50%,-50%) rotate(${card._rot}deg) scale(0.75)`;
    setTimeout(() => {
      if (card.parentNode) card.remove();
    }, FADE_MS);
  }

  function spawnCard(x, y) {
    /* Descarta o mais antigo se já atingiu o limite */
    if (activeCards.length >= MAX_CARDS) {
      const oldest = activeCards.shift();
      removeCard(oldest);
    }

    const src = IMAGES[currentIdx % IMAGES.length];
    currentIdx++;

    const rot = (Math.random() - 0.5) * ROT_RANGE * 2;

    const card = document.createElement('div');
    card._rot = rot;

    Object.assign(card.style, {
      position:     'absolute',
      left:         x + 'px',
      top:          y + 'px',
      width:        CARD_W + 'px',
      height:       CARD_H + 'px',
      transform:    `translate(-50%,-50%) rotate(${rot}deg) scale(0)`,
      borderRadius: '16px',
      overflow:     'hidden',
      pointerEvents:'none',
      willChange:   'transform, opacity',
      boxShadow:    '0 18px 45px rgba(0,0,0,0.65), 0 0 0 1px rgba(177,78,255,0.3)',
      transition:   'transform 0.15s cubic-bezier(0.34,1.56,0.64,1)',
      zIndex:       String(50 + activeCards.length),
    });

    const img = document.createElement('img');
    Object.assign(img.style, {
      width:     '100%',
      height:    '100%',
      objectFit: 'cover',
      display:   'block',
    });
    img.src = src;
    card.appendChild(img);

    /* Insere antes do label (label fica sempre na frente) */
    container.insertBefore(card, label);
    activeCards.push(card);

    /* Double rAF garante que o estado scale(0) foi pintado antes da transição */
    requestAnimationFrame(() => requestAnimationFrame(() => {
      card.style.transform = `translate(-50%,-50%) rotate(${rot}deg) scale(1)`;
    }));
  }

  /* Rastreia o mouse dentro do container */
  container.addEventListener('mousemove', (e) => {
    const r = container.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;

    if (lastSpawnX === null) {
      /* Primeiro movimento — inicia referência sem spawnar */
      lastSpawnX = mx;
      lastSpawnY = my;
      return;
    }

    if (dist(mx, my, lastSpawnX, lastSpawnY) >= MIN_DIST) {
      spawnCard(mx, my);
      lastSpawnX = mx;
      lastSpawnY = my;
    }
  });

  /* Ao sair do container, faz fade out em todos os cards */
  container.addEventListener('mouseleave', () => {
    lastSpawnX = null;
    lastSpawnY = null;
    const toRemove = [...activeCards];
    activeCards = [];
    toRemove.forEach((card, i) => {
      setTimeout(() => removeCard(card), i * 60);
    });
  });
}

