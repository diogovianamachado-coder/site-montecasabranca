/* Monte Casa Branca · r3 da demo · interação da página (cabeçalho, menu, revelar ao rolar, botão «Ver datas», paralaxe suave). */
(function () {
  var d = document;
  var topo = d.getElementById('topo');
  var capa = d.querySelector('.capa');
  var barra = d.querySelector('.barra');
  var flutuante = d.querySelector('.flutuante');
  var datas = d.getElementById('datas');
  var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // menu no telemóvel
  var botao = d.querySelector('.menu-botao');
  if (botao) {
    botao.addEventListener('click', function () {
      var aberto = d.body.classList.toggle('menu-aberto');
      botao.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });
    Array.prototype.forEach.call(d.querySelectorAll('.nav a'), function (a) {
      a.addEventListener('click', function () {
        d.body.classList.remove('menu-aberto');
        botao.setAttribute('aria-expanded', 'false');
      });
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && d.body.classList.contains('menu-aberto')) {
        d.body.classList.remove('menu-aberto');
        botao.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // cabeçalho sólido depois da capa; «Ver datas» sempre à mão, menos quando as datas já estão à vista
  var bandas = Array.prototype.slice.call(d.querySelectorAll('.banda img'));
  function estado() {
    var y = window.pageYOffset || 0;
    var vh = window.innerHeight;
    if (topo && capa) topo.classList.toggle('topo--solido', y > Math.max(80, capa.offsetHeight - 90));
    var mostrar = capa ? y > capa.offsetHeight * 0.7 : y > 120;
    if (datas) {
      var r = datas.getBoundingClientRect();
      if (r.top < vh * 0.55 && r.bottom > vh * 0.35) mostrar = false;
    }
    if (barra && capa) barra.classList.toggle('barra--visivel', mostrar);
    if (flutuante && capa) flutuante.classList.toggle('flutuante--visivel', mostrar);
    if (!reduz && window.innerWidth >= 900) {
      bandas.forEach(function (img) {
        var rb = img.parentElement.getBoundingClientRect();
        if (rb.bottom < 0 || rb.top > vh) return;
        var p = (rb.top + rb.height / 2 - vh / 2) / vh; // -0.5 … 0.5
        img.style.transform = 'scale(1.12) translateY(' + (p * -5).toFixed(2) + '%)';
      });
    }
  }
  var pedido = false;
  function agendar() {
    if (pedido) return;
    pedido = true;
    window.requestAnimationFrame(function () { pedido = false; estado(); });
  }
  window.addEventListener('scroll', agendar, { passive: true });
  window.addEventListener('resize', agendar);
  estado();

  // revelar ao rolar
  var itens = Array.prototype.slice.call(d.querySelectorAll('.reveal'));
  if (reduz || !('IntersectionObserver' in window)) {
    itens.forEach(function (e) { e.classList.add('visto'); });
  } else {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visto'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    itens.forEach(function (e) { io.observe(e); });
  }

  // «Ver datas» realça os cartões ao chegar
  Array.prototype.forEach.call(d.querySelectorAll('a[href$="#datas"]'), function (a) {
    a.addEventListener('click', function () {
      if (!datas) return;
      datas.classList.add('datas--foco');
      window.setTimeout(function () { datas.classList.remove('datas--foco'); }, 1800);
    });
  });
})();
