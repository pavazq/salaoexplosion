(function initBgRibbon() {
  var canvas = document.getElementById('ribbon-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  var W = window.innerWidth, H = window.innerHeight;

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
  camera.position.set(0, 2, 11);

  // Luz ambiente roxa escura
  scene.add(new THREE.AmbientLight(0x1a0030, 2.2));

  // Luz rosa de cima-frente — ilumina o topo e realça os canos
  var light1 = new THREE.PointLight(0xe46aa0, 10, 35);
  light1.position.set(2, 7, 5);
  scene.add(light1);

  // Luz roxa de baixo — sombra colorida na ponta que desce
  var light2 = new THREE.PointLight(0x6600cc, 7, 30);
  light2.position.set(-2, -8, 2);
  scene.add(light2);

  // ── Cria um tubo que desce de cima (y=+6) até bem abaixo (y=-18) ──
  function makeTube(offsetX, offsetZ, amplitude, frequency) {
    var points = [];
    var steps  = 60;
    for (var i = 0; i <= steps; i++) {
      var t  = i / steps;
      var y  = 6 - t * 24;                                            // y: +6 → -18
      var x  = offsetX + Math.sin(t * Math.PI * 2 * frequency) * amplitude;
      var z  = offsetZ + Math.cos(t * Math.PI * frequency) * (amplitude * 0.3);
      points.push(new THREE.Vector3(x, y, z));
    }
    var curve = new THREE.CatmullRomCurve3(points);
    var geo   = new THREE.TubeGeometry(curve, 200, 0.30, 12, false);
    var total = geo.index ? geo.index.count : geo.attributes.position.count;
    geo.setDrawRange(0, Math.floor(0.08 * total)); // começa mostrando só 8% (topo)
    return { geo: geo, total: total };
  }

  var mat = new THREE.MeshPhongMaterial({
    color:       0x35006e,
    emissive:    0x1a0035,
    specular:    0xe46aa0,
    shininess:   130,
    transparent: true,
    opacity:     0.85,
    side:        THREE.DoubleSide,
  });

  // Dois tubos com ondas e posições diferentes
  var tube1 = makeTube(-1.1,  0.0, 0.60, 1.2);
  var tube2 = makeTube( 1.2,  0.2, 0.50, 1.7);

  var group = new THREE.Group();
  group.add(new THREE.Mesh(tube1.geo, mat));
  group.add(new THREE.Mesh(tube2.geo, mat));
  scene.add(group);

  // Estado animado
  var scrollY     = 0;
  var curProgress = 0.08;
  var curScale    = 1.0;
  var isMobile    = W < 769;

  window.addEventListener('scroll', function () {
    scrollY = window.scrollY;
  }, { passive: true });

  window.addEventListener('resize', function () {
    W = window.innerWidth; H = window.innerHeight;
    isMobile = W < 769;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  });

  var clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    var t = clock.getElapsedTime();

    // Balanço orgânico leve (minhoca respirando)
    group.rotation.z = Math.sin(t * 0.10) * 0.04;

    // Progresso de scroll (0 = topo, 1 = fim da página)
    var maxScroll     = Math.max(document.documentElement.scrollHeight - H, 1);
    var rawProgress   = Math.min(scrollY / maxScroll, 1);

    // DrawRange: 8% inicial → 100% no fim da página
    // A ponta dos tubos desce conforme o scroll aumenta
    var targetProgress = 0.08 + rawProgress * 0.92;
    curProgress += (targetProgress - curProgress) * 0.07;

    tube1.geo.setDrawRange(0, Math.floor(curProgress * tube1.total));
    tube2.geo.setDrawRange(0, Math.floor(curProgress * tube2.total));

    // Os tubos também crescem um pouco de espessura conforme descem
    var targetScale = 1.0 + rawProgress * 0.55;
    curScale += (targetScale - curScale) * 0.06;
    group.scale.setScalar(curScale);

    renderer.render(scene, camera);
  }

  animate();
})();
