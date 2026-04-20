/* ============================================
   SPARKLES TEXT — estrelinhas animadas ao redor do texto
   Adicione class="sparkle-wrap" em qualquer elemento
   ============================================ */
(function() {
  var STAR = 'M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z';
  var COLORS = ['#b14eff', '#e46aa0'];
  var COUNT = 8;

  document.querySelectorAll('.sparkle-wrap').forEach(function(wrap) {
    // Garante posição relativa
    wrap.style.position = 'relative';
    wrap.style.display = 'inline-block';

    for (var i = 0; i < COUNT; i++) {
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      var size = 10 + Math.random() * 12;
      var scale = 0.4 + Math.random() * 0.8;

      svg.setAttribute('viewBox', '0 0 21 21');
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.style.cssText = [
        'position:absolute',
        'pointer-events:none',
        'z-index:20',
        'left:' + (Math.random() * 100) + '%',
        'top:' + (Math.random() * 100) + '%',
        '--sp-scale:' + scale,
        'animation-delay:' + (Math.random() * 2) + 's',
        'opacity:0',
        'animation:sparklePop 0.8s ease-in-out infinite'
      ].join(';');

      path.setAttribute('d', STAR);
      path.setAttribute('fill', COLORS[Math.floor(Math.random() * COLORS.length)]);
      svg.appendChild(path);
      wrap.appendChild(svg);

      // Reposicionar a cada ciclo
      (function(el) {
        el.addEventListener('animationiteration', function() {
          el.style.left = (Math.random() * 100) + '%';
          el.style.top = (Math.random() * 100) + '%';
        });
      })(svg);
    }
  });
})();
