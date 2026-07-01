/* ============================================================
   ANALYTICS — Microsoft Clarity + Google Analytics 4 + Meta Pixel
   Loader único, leve e não-bloqueante.

   Como funciona:
   - Os "stubs" (gtag/clarity/fbq) são definidos JÁ, então qualquer
     window.track() enfileira o evento na hora — nada se perde, mesmo
     se a pessoa clicar nos primeiros segundos.
   - Os scripts pesados de cada serviço são baixados só quando o
     navegador fica ocioso (requestIdleCallback), fora do caminho
     crítico → não trava a rolagem nem o carregamento.

   Para LIGAR um serviço, troque o placeholder pelo ID real.
   Placeholder = serviço desligado (não carrega nada). Seguro publicar.
   ============================================================ */
(function () {
  'use strict';

  /* ---- IDs (troque os placeholders pelos códigos reais) ---- */
  var CLARITY_ID = 'xfdojgk28j';       // Microsoft Clarity  → LIGADO
  var GA4_ID     = 'G-Q8LFPJP5C8';     // Google Analytics 4 → LIGADO
  var PIXEL_ID   = '518426083446408';  // Meta Pixel         → LIGADO

  var clarityOn = !!CLARITY_ID && CLARITY_ID !== 'CLARITY_ID';
  var ga4On     = !!GA4_ID     && GA4_ID     !== 'G-XXXXXXXXXX';
  var pixelOn   = !!PIXEL_ID   && PIXEL_ID   !== 'PIXEL_ID';

  /* ---- Eventos que viram evento PADRÃO do Meta (melhor p/ anúncios) ---- */
  var PIXEL_STD = {
    lead_form_submit:        'Lead',
    whatsapp_resgatar_click: 'Contact',
    whatsapp_click:          'Contact'
  };

  /* ---- Helper global: dispara o mesmo evento nos 3 de uma vez ----
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

  if (!clarityOn && !ga4On && !pixelOn) return; // nada ligado: track() fica no-op

  /* ---- Stubs definidos AGORA: enfileiram tudo até os scripts subirem ---- */
  if (ga4On) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID);
  }
  if (clarityOn) {
    window.clarity = window.clarity || function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
  }
  if (pixelOn) {
    var n = window.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!window._fbq) window._fbq = n;
    n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  /* ---- Baixa os scripts pesados fora do caminho crítico ---- */
  function inject(src) {
    var s = document.createElement('script');
    s.async = true; s.src = src;
    document.head.appendChild(s);
  }
  function boot() {
    if (ga4On)     inject('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_ID));
    if (clarityOn) inject('https://www.clarity.ms/tag/' + CLARITY_ID);
    if (pixelOn)   inject('https://connect.facebook.net/en_US/fbevents.js');
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(boot, { timeout: 2500 });
  } else if (document.readyState === 'complete') {
    setTimeout(boot, 600);
  } else {
    window.addEventListener('load', function () { setTimeout(boot, 600); });
  }
})();
