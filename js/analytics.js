/* ============================================================
   ANALYTICS — Microsoft Clarity + Google Analytics 4 + Meta Pixel
   Loader único, assíncrono e não-bloqueante (carrega fora do
   caminho crítico, não trava a rolagem nem o carregamento).

   Para LIGAR um serviço, troque o placeholder pelo ID real.
   Enquanto o ID continuar o placeholder, aquele serviço fica
   DESLIGADO (não carrega nada). Seguro para publicar.
   ============================================================ */
(function () {
  'use strict';

  /* ---- IDs (troque os placeholders pelos códigos reais) ---- */
  var CLARITY_ID = 'xfdojgk28j';    // Microsoft Clarity  → LIGADO
  var GA4_ID     = 'G-XXXXXXXXXX';  // Google Analytics 4 (ex.: G-ABCD1234EF)
  var PIXEL_ID   = 'PIXEL_ID';      // Meta Pixel         (ex.: 1029384756)

  /* placeholders (para saber o que ainda está desligado) */
  var CLARITY_OFF = 'CLARITY_ID';
  var GA4_OFF     = 'G-XXXXXXXXXX';
  var PIXEL_OFF   = 'PIXEL_ID';

  var clarityOn = !!CLARITY_ID && CLARITY_ID !== CLARITY_OFF;
  var ga4On     = !!GA4_ID     && GA4_ID     !== GA4_OFF;
  var pixelOn   = !!PIXEL_ID   && PIXEL_ID   !== PIXEL_OFF;

  /* ---- Eventos que viram evento PADRÃO do Meta (melhor p/ anúncios) ---- */
  var PIXEL_STD = {
    lead_form_submit:        'Lead',
    whatsapp_resgatar_click: 'Contact',
    whatsapp_click:          'Contact'
  };

  /* ---- Helper global: dispara o mesmo evento nos 3 de uma vez ----
     Uso: window.track('nome_do_evento', { chave: valor })
     Sempre existe (mesmo com tudo desligado), então as chamadas
     window.track && window.track(...) nunca dão erro.                */
  window.track = function (name, params) {
    params = params || {};
    try { if (window.gtag)    window.gtag('event', name, params); } catch (e) {}
    try { if (window.clarity) window.clarity('event', name); }      catch (e) {}
    try {
      if (window.fbq) {
        if (PIXEL_STD[name]) window.fbq('track', PIXEL_STD[name], params);
        else                 window.fbq('trackCustom', name, params);
      }
    } catch (e) {}
  };

  /* ---- Loaders (cada um roda só se o ID for real) ---- */
  function loadClarity() {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
  }

  function loadGA4() {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_ID);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID);
  }

  function loadPixel() {
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = true; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  /* ---- Carrega tudo fora do caminho crítico ---- */
  function boot() {
    if (clarityOn) loadClarity();
    if (ga4On)     loadGA4();
    if (pixelOn)   loadPixel();
  }

  if (!clarityOn && !ga4On && !pixelOn) return; // nada ligado: track() fica no-op

  if ('requestIdleCallback' in window) {
    requestIdleCallback(boot, { timeout: 2500 });
  } else if (document.readyState === 'complete') {
    setTimeout(boot, 800);
  } else {
    window.addEventListener('load', function () { setTimeout(boot, 800); });
  }
})();
