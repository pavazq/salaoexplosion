/* ============================================
   FANCY HERO — Parallax floating + Text rotate
   Vanilla JS (sem React)
   ============================================ */

(function initFancyHero() {
  // --- PARALLAX FLOATING ---
  var field = document.getElementById('fancyField');
  if (field) {
    var els = Array.from(field.querySelectorAll('.fh-el'));
    var positions = els.map(function() { return { x: 0, y: 0 }; });
    var mouseX = 0, mouseY = 0;
    var EASE = 0.04;
    var SENSITIVITY = -0.5;

    var running = false;
    function startLoop() { if (!running) { running = true; requestAnimationFrame(tick); } }

    function onMove(x, y) {
      var rect = field.getBoundingClientRect();
      mouseX = x - rect.left;
      mouseY = y - rect.top;
      startLoop();
    }

    window.addEventListener('mousemove', function(e) { onMove(e.clientX, e.clientY); }, { passive: true });
    window.addEventListener('touchmove', function(e) {
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    function tick() {
      var moving = false;
      els.forEach(function(el, i) {
        var depth = parseFloat(el.dataset.depth) || 1;
        var strength = (depth * SENSITIVITY) / 20;
        var tx = mouseX * strength;
        var ty = mouseY * strength;
        positions[i].x += (tx - positions[i].x) * EASE;
        positions[i].y += (ty - positions[i].y) * EASE;
        if (Math.abs(tx - positions[i].x) > 0.08 || Math.abs(ty - positions[i].y) > 0.08) moving = true;
        el.style.transform = 'translate3d(' + positions[i].x.toFixed(2) + 'px,' + positions[i].y.toFixed(2) + 'px,0)';
      });
      // Para o loop quando tudo assenta; recomeça no proximo movimento
      if (moving) { requestAnimationFrame(tick); } else { running = false; }
    }
    startLoop();

    // Fade in images with stagger
    els.forEach(function(el, i) {
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.8s ease';
      setTimeout(function() { el.style.opacity = '1'; }, 400 + i * 200);
    });
  }

  // --- TEXT ROTATE ---
  var rotateEl = document.getElementById('fancyRotate');
  if (rotateEl) {
    var texts = rotateEl.dataset.texts.split('|');
    var idx = 0;
    var INTERVAL = 2800;

    function animateOut(callback) {
      rotateEl.style.transition = 'transform 0.35s ease-in, opacity 0.3s ease';
      rotateEl.style.transform = 'translateY(-120%)';
      rotateEl.style.opacity = '0';
      setTimeout(callback, 350);
    }

    function animateIn() {
      rotateEl.style.transition = 'none';
      rotateEl.style.transform = 'translateY(100%)';
      rotateEl.style.opacity = '0';
      // Force reflow
      rotateEl.offsetHeight;
      rotateEl.style.transition = 'transform 0.45s cubic-bezier(0.34,1.2,0.64,1), opacity 0.4s ease';
      rotateEl.style.transform = 'translateY(0)';
      rotateEl.style.opacity = '1';
    }

    function nextText() {
      animateOut(function() {
        idx = (idx + 1) % texts.length;
        rotateEl.textContent = texts[idx];
        animateIn();
      });
    }

    rotateEl.textContent = texts[0];
    setInterval(nextText, INTERVAL);
  }
})();
