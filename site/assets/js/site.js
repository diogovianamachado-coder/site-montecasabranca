/* Monte Casa Branca · interação (JavaScript nativo, sem dependências). Versão 3, 16/11/2026.
   Blocos: ligações internas · revelar ao rolar · barra de baixo · sequências de fotografias · camadas (menu, painel, fotografia) ·
   álbuns · fotografia em ecrã inteiro · frases de quem já ficou · painel das datas (calendário via api/ocupacao.php, conta via
   api/tarifa.php, tempo via api/tempo.php, pedido via api/prereserva.php).
   Regras desta versão, por causa do Safari do iPhone (na versão 2 a página prendia):
   · nada aqui mexe na rolagem a cada instante: as fotografias rolam com a rolagem do próprio browser; quando avançam sozinhas é um
     passo de poucos em poucos segundos, e só com a página parada e sem dedos no ecrã;
   · o menu, o painel e a fotografia em grande não bloqueiam a rolagem da página (nada de overflow: hidden no body);
   · ao escolher um destino no menu, o menu fecha e a página vai direta para lá, sem animação; a chegada é sempre conferida;
   · cada bloco arranca dentro de «seguro()»: se um falhar, os outros continuam a funcionar. */
(function () {
  'use strict';
  var d = document, raiz = d.documentElement;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var reduz = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var abertas = [];                                       // camadas abertas (menu, painel, fotografia)
  var T = {}; try { T = JSON.parse(($('#textos') || {}).textContent || '{}'); } catch (e) { T = {}; }   // textos do painel (conteudo.php)
  function txt(k, alt) { return T[k] || alt || ''; }
  function dois(n) { return (n < 10 ? '0' : '') + n; }
  function seguro(nome, fn) { try { fn(); } catch (e) { if (window.console && console.error) console.error('site.js · ' + nome + ': ' + (e && e.message ? e.message : e)); } }
  function alturaRolada() { return window.pageYOffset || raiz.scrollTop || 0; }

  /* ---- A página está parada? (as fotografias só avançam sozinhas com a página quieta e sem dedos no ecrã) ---- */
  var ultimoGesto = 0, dedos = false;
  function gesto() { ultimoGesto = Date.now(); }
  window.addEventListener('scroll', gesto, { passive: true });
  d.addEventListener('touchstart', function () { dedos = true; gesto(); }, { passive: true });
  ['touchend', 'touchcancel'].forEach(function (n) { d.addEventListener(n, function (ev) { dedos = !!(ev.touches && ev.touches.length); gesto(); }, { passive: true }); });

  /* ---- Camadas (menu, painel, fotografia): abrir e fechar ----
     Abrir é só mostrar o elemento; fechar é só escondê-lo. Nada é posto nem tirado do <body>. */
  function abrir(id) {
    var el = d.getElementById(id); if (!el || !el.hidden) return;
    el._antes = d.activeElement; el.hidden = false; abertas.push(id);
    if (id === 'menu') el.scrollTop = 0;
    var f = $('button[data-fechar]', el); if (f) { try { f.focus({ preventScroll: true }); } catch (e) {} }
  }
  function fechar(id, semFoco) {
    var el = d.getElementById(id); if (!el || el.hidden) return;
    el.hidden = true; abertas = abertas.filter(function (x) { return x !== id; });
    var a = el._antes; el._antes = null;
    if (!semFoco && a && a.focus && d.contains(a)) { try { a.focus({ preventScroll: true }); } catch (e) {} }
  }

  /* ---- Ligações internas ----
     Levam à secção sem deixar «#secção» no endereço (com ele, o browser saltava para lá sempre que a página abria).
     Do menu: fecha e vai direto, sem animação. Do resto da página: desliza. Em qualquer caso a chegada é conferida e, se a
     página tiver parado fora do sítio, vai direta. Se a pessoa tocar ou rolar entretanto, a viagem é dela e deixa de ser conferida. */
  var viagem = 0;
  function topoDe(el) { return el.getBoundingClientRect().top + alturaRolada(); }
  function irPara(alvo, suave) {
    var meu = ++viagem, y = Math.max(0, Math.round(topoDe(alvo)));
    if (suave && !reduz) { try { window.scrollTo({ top: y, left: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, y); } }
    else window.scrollTo(0, y);
    var yAntes = null, voltas = 0;
    (function conferir() {
      setTimeout(function () {
        if (meu !== viagem) return;
        if (Math.abs(alvo.getBoundingClientRect().top) <= 2) return;                                 // chegou
        var agora = alturaRolada();
        if (suave && agora !== yAntes && voltas < 14) { yAntes = agora; voltas++; conferir(); return; }   // ainda vai a caminho
        window.scrollTo(0, Math.max(0, Math.round(topoDe(alvo))));                                    // parou fora do sítio
      }, suave ? 260 : 120);
    })();
  }
  function ligacoes() {
    ['touchstart', 'wheel', 'mousedown', 'keydown'].forEach(function (n) { window.addEventListener(n, function () { viagem++; }, { passive: true }); });
    d.addEventListener('click', function (ev) {
      if (ev.defaultPrevented || ev.button > 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
      var a = ev.target && ev.target.closest ? ev.target.closest('a[href^="#"]') : null; if (!a) return;
      var h = a.getAttribute('href'); if (!h || h.length < 2) return;
      var alvo = d.getElementById(h.slice(1)); if (!alvo) return;
      ev.preventDefault();
      var doMenu = !!a.closest('#menu');
      if (doMenu) fechar('menu', true);
      irPara(alvo, !doMenu);
      if (ev.detail === 0) { if (!alvo.hasAttribute('tabindex')) alvo.setAttribute('tabindex', '-1'); try { alvo.focus({ preventScroll: true }); } catch (e) {} }   // veio do teclado
    });
    // Uma ligação partilhada (…/#galeria) ainda leva à secção; depois o endereço fica limpo. Um «#…» de uma secção que já não
    // existe (o antigo «#casa», que o browser pode ter guardado) não leva a lado nenhum: a página abre na capa.
    var limpar = function () { if (location.hash && history.replaceState) setTimeout(function () { history.replaceState(null, '', location.pathname + location.search); }, 50); };
    if (location.hash) window.addEventListener('load', limpar);
    window.addEventListener('hashchange', limpar);
  }

  /* ---- Revelar ao rolar ----
     Os blocos de texto (.reveal) esperam escondidos e aparecem ao chegar ao ecrã. A classe «js» no <html> é o que os esconde: só é
     posta aqui, com o observador já pronto. Além do observador, uma conferência simples ao rolar garante que nada fica por aparecer.
     Os blocos de fotografias (data-entra) nunca esperam escondidos: ao chegarem ao ecrã ganham «entrou» e fazem uma entrada suave. */
  function revelar() {
    var els = $$('.reveal'); if (!els.length) return;
    var mostrar = function (el) { el.classList.add(el.hasAttribute('data-entra') ? 'entrou' : 'is-in'); };
    if (reduz) { els.forEach(mostrar); return; }
    raiz.classList.add('js');
    var io = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (en) { if (en.isIntersecting) { mostrar(en.target); io.unobserve(en.target); } });
      }, { threshold: 0, rootMargin: '0px 0px -6% 0px' });
      els.forEach(function (el) { io.observe(el); });
      $$('[data-entra]').forEach(function (el) { io.observe(el); });
    }
    var espera = null;
    var conferir = function () {
      espera = null;
      var altura = window.innerHeight || raiz.clientHeight;
      els = els.filter(function (el) {
        if (el.classList.contains('is-in')) return false;
        var r = el.getBoundingClientRect();
        if (r.top < altura * 0.94 && r.bottom > 0) { mostrar(el); if (io) io.unobserve(el); return false; }
        return true;
      });
      if (!els.length) window.removeEventListener('scroll', aoRolar);
    };
    var aoRolar = function () { if (!espera) espera = setTimeout(conferir, 200); };
    window.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('load', aoRolar);
    setTimeout(conferir, 1200);
  }

  /* ---- Barra de baixo: aparece quando a capa sai do ecrã ---- */
  function barra() {
    var dock = $('#dock'), inicio = $('#inicio'); if (!dock) return;
    var mostrar = function (v) { if (v) dock.classList.add('visivel'); else dock.classList.remove('visivel'); dock.setAttribute('aria-hidden', v ? 'false' : 'true'); };
    if (inicio && 'IntersectionObserver' in window) new IntersectionObserver(function (en) { mostrar(!en[0].isIntersecting); }, { threshold: 0.05 }).observe(inicio);
    else mostrar(true);
  }

  /* ---- Sequências: as fotografias de um capítulo, uma de cada vez ----
     A faixa rola com a rolagem do browser (o dedo leva-a; o scroll-snap pára cada fotografia no sítio). Aqui só se faz três coisas:
     a contagem «01 / 04» (lida depois de a faixa rolar), as setas (um passo para cada lado, em círculo) e o avanço sozinho: um
     passo de 5 em 5 segundos enquanto a sequência está à vista, a página está parada e ninguém lhe tocou. Ao primeiro toque, clique
     ou seta, deixa de avançar sozinha. Com «reduzir movimento» ligado nunca avança sozinha. */
  var seqs = [];
  function sequencias() {
    $$('[data-seq]').forEach(function (el) {
      var faixa = $('.seq-faixa', el); if (!faixa) return;
      var itens = $$('.seq-item', faixa), n = itens.length; if (n < 2) return;
      var elAtual = $('[data-seq-atual]', el);
      var s = { visivel: false, parado: reduz, ultimo: 0 };
      var margem = function () { return parseFloat(window.getComputedStyle(faixa).paddingLeft) || 0; };
      var maximo = function () { return Math.max(0, faixa.scrollWidth - faixa.clientWidth); };
      var lugar = function (i) { return Math.min(Math.max(0, itens[i].offsetLeft - margem()), maximo()); };   // onde a faixa pára para a fotografia i
      var indice = function () {
        var x = faixa.scrollLeft, max = maximo(), m = margem(), melhor = 0, dist = Infinity;
        if (max > 0 && x >= max - 2) return n - 1;
        for (var i = 0; i < n; i++) { var di = Math.abs(itens[i].offsetLeft - m - x); if (di < dist) { dist = di; melhor = i; } }
        return melhor;
      };
      // As duas fotografias a seguir à que está à frente começam logo a carregar, para não aparecerem vazias ao chegar a vez delas.
      var adiantar = function (i) { for (var k = 1; k <= 2; k++) { var im = $('img', itens[(i + k) % n]); if (im && im.getAttribute('loading') === 'lazy') im.setAttribute('loading', 'eager'); } };
      var contar = function () { var i = indice(); if (elAtual) elAtual.textContent = dois(i + 1); if (s.visivel) adiantar(i); };
      var ir = function (x) {
        if (!reduz && faixa.scrollTo) { try { faixa.scrollTo({ left: x, top: 0, behavior: 'smooth' }); return; } catch (e) {} }
        faixa.scrollLeft = x;
      };
      s.passo = function (dir) {
        var x = faixa.scrollLeft, i, alvo = null;
        if (dir > 0) { for (i = 0; i < n; i++) { if (lugar(i) > x + 4) { alvo = lugar(i); break; } } if (alvo === null) alvo = 0; }
        else { for (i = n - 1; i >= 0; i--) { if (lugar(i) < x - 4) { alvo = lugar(i); break; } } if (alvo === null) alvo = maximo(); }
        ir(alvo);
      };
      var parar = function () { s.parado = true; };
      // «Ao primeiro toque» quer dizer: quando a pessoa leva mesmo a faixa com o dedo (ela rola enquanto está tocada), abre uma
      // fotografia ou usa as setas. Passar o dedo por cima para rolar a página não conta: a faixa não se mexe e continua a avançar.
      var tocada = false, largada = null, espera = null;
      faixa.addEventListener('touchstart', function () { tocada = true; clearTimeout(largada); }, { passive: true });
      ['touchend', 'touchcancel'].forEach(function (nome) { faixa.addEventListener(nome, function () { clearTimeout(largada); largada = setTimeout(function () { tocada = false; }, 1500); }, { passive: true }); });
      faixa.addEventListener('scroll', function () { if (tocada) parar(); if (!espera) espera = setTimeout(function () { espera = null; contar(); }, 120); }, { passive: true });
      faixa.addEventListener('click', parar);
      faixa.addEventListener('keydown', parar);
      faixa.addEventListener('wheel', function (ev) { if (Math.abs(ev.deltaX) > Math.abs(ev.deltaY)) parar(); }, { passive: true });
      $$('[data-seq-ir]', el).forEach(function (b) { b.addEventListener('click', function () { parar(); s.passo(parseInt(b.getAttribute('data-seq-ir'), 10) < 0 ? -1 : 1); }); });
      if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { var v = en[0].isIntersecting; if (v && !s.visivel) { s.ultimo = Date.now() - 2200; adiantar(indice()); } s.visivel = v; }, { threshold: 0.6 }).observe(faixa);
      contar();
      seqs.push(s);
    });
    if (seqs.length && !reduz) setInterval(function () {
      if (d.hidden || abertas.length || dedos) return;
      var agora = Date.now(); if (agora - ultimoGesto < 900) return;
      for (var i = 0; i < seqs.length; i++) { var s = seqs[i]; if (s.visivel && !s.parado && agora - s.ultimo >= 5200) { s.ultimo = agora; s.passo(1); } }
    }, 1000);
  }

  /* ---- Camadas: botões de abrir e de fechar, Escape, e os gestos que não podem passar para a página por trás ---- */
  function camadas() {
    $$('[data-fechar]').forEach(function (b) { b.addEventListener('click', function () { fechar(b.getAttribute('data-fechar')); }); });
    d.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && abertas.length) fechar(abertas[abertas.length - 1]); });
    var bMenu = $('#abrir-menu'); if (bMenu) bMenu.addEventListener('click', function () { abrir('menu'); });
    // O véu do painel e a fotografia em grande: a roda do rato e o arrastar com um dedo ficam ali, não rolam a página por trás.
    var veu = $('.painel-veu'), foto = $('#galeria-ecra');
    if (veu) { veu.addEventListener('wheel', function (ev) { ev.preventDefault(); }, { passive: false }); veu.addEventListener('touchmove', function (ev) { ev.preventDefault(); }, { passive: false }); }
    if (foto) { foto.addEventListener('wheel', function (ev) { ev.preventDefault(); }, { passive: false }); foto.addEventListener('touchmove', function (ev) { if (!ev.touches || ev.touches.length < 2) ev.preventDefault(); }, { passive: false }); }
  }

  /* ---- Álbuns da galeria (separadores) ---- */
  function albuns() {
    var seps = $$('.separador');
    seps.forEach(function (sep) {
      sep.addEventListener('click', function () {
        seps.forEach(function (x) { x.classList.remove('ativo'); x.setAttribute('aria-selected', 'false'); });
        $$('.album').forEach(function (a) { a.classList.add('escondido'); });
        sep.classList.add('ativo'); sep.setAttribute('aria-selected', 'true');
        var alvo = d.getElementById(sep.getAttribute('aria-controls')); if (alvo) alvo.classList.remove('escondido');
      });
    });
  }

  /* ---- Fotografia em ecrã inteiro ----
     Os dados de cada conjunto vão uma vez, em data-galeria, no elemento que envolve as fotografias; o botão só diz a posição.
     As setas e o deslizar do dedo passam à seguinte ou à anterior, em círculo. */
  function fotografia() {
    var ecra = $('#galeria-ecra'), img = $('#galeria-img'), cont = $('#galeria-contador'), leg = $('#galeria-legenda'); if (!ecra || !img) return;
    var gal = { fotos: [], i: 0, nome: '' }, vez = 0;
    var mostrar = function () {
      var f = gal.fotos[gal.i]; if (!f) return;
      var meu = ++vez, aparecer = function () { if (meu === vez) img.style.opacity = '1'; };
      img.style.opacity = '0'; img.onload = aparecer; img.onerror = aparecer;
      img.alt = f.alt || ''; img.src = f.src;
      if (img.complete && img.naturalWidth) aparecer();
      setTimeout(aparecer, 1500);                       // aconteça o que acontecer, a fotografia não fica escondida
      if (cont) cont.textContent = gal.nome + ' · ' + (gal.i + 1) + ' / ' + gal.fotos.length;
      if (leg) leg.textContent = f.alt || '';
    };
    var andar = function (passo) { var n = gal.fotos.length; if (n < 2) return; gal.i = (gal.i + passo + n) % n; mostrar(); };
    d.addEventListener('click', function (ev) {
      var b = ev.target && ev.target.closest ? ev.target.closest('.abrir-galeria') : null; if (!b) return;
      var dono = b.closest('[data-galeria]'); if (!dono) return;
      try { var dados = JSON.parse(dono.getAttribute('data-galeria')); gal.fotos = dados.fotos || []; gal.nome = dados.nome || ''; } catch (e) { return; }
      gal.i = parseInt(b.getAttribute('data-inicio') || '0', 10) || 0;
      var setas = gal.fotos.length > 1; $$('#galeria-antes, #galeria-depois').forEach(function (s) { s.style.visibility = setas ? '' : 'hidden'; });
      abrir('galeria-ecra'); mostrar();
    });
    var bA = $('#galeria-antes'), bD = $('#galeria-depois');
    if (bA) bA.addEventListener('click', function () { andar(-1); });
    if (bD) bD.addEventListener('click', function () { andar(1); });
    d.addEventListener('keydown', function (ev) { if (ecra.hidden) return; if (ev.key === 'ArrowRight') andar(1); else if (ev.key === 'ArrowLeft') andar(-1); });
    var x0 = null, y0 = null;
    ecra.addEventListener('touchstart', function (ev) { if (ev.touches.length === 1) { x0 = ev.touches[0].clientX; y0 = ev.touches[0].clientY; } else { x0 = null; } }, { passive: true });
    ecra.addEventListener('touchend', function (ev) {
      if (x0 === null || !ev.changedTouches || !ev.changedTouches.length) return;
      var dx = ev.changedTouches[0].clientX - x0, dy = ev.changedTouches[0].clientY - y0; x0 = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) andar(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  /* ---- Datas ---- */
  function iso(x) { return x.getFullYear() + '-' + dois(x.getMonth() + 1) + '-' + dois(x.getDate()); }
  function deIso(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2], 12); }
  function addDias(x, n) { var y = new Date(x); y.setDate(y.getDate() + n); return y; }
  function hoje() { var h = new Date(); h.setHours(12, 0, 0, 0); return h; }
  var MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  var DIAS_CURTOS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  function fmtData(s) { var x = deIso(s); return x.getDate() + ' de ' + MESES[x.getMonth()].toLowerCase() + ' de ' + x.getFullYear(); }
  function euros(v) { var n = Math.round(v * 100) / 100; var s = (n === Math.floor(n) ? String(n) : n.toFixed(2).replace('.', ',')); return s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' €'; }

  /* ---- Quem já ficou: uma frase de cada vez ----
     As frases estão todas no HTML (conteudo.php); aqui só se troca a que está à vista, de 6 em 6 segundos enquanto a secção está no
     ecrã. Um toque passa à seguinte. As avaliações publicadas na app (porta #192), quando existirem e forem curtas, juntam-se à roda. */
  function frases() {
    var lista = $('#citacoes'); if (!lista) return;
    var cits = $$('.citacao', lista), ci = 0, vista = !('IntersectionObserver' in window), quieta = false, relogio = null;
    var elAtual = $('#citacoes-atual'), elTotal = $('#citacoes-total');
    var ir = function (n) { if (cits.length < 2) return; cits[ci].classList.remove('ativa'); ci = (n + cits.length) % cits.length; cits[ci].classList.add('ativa'); if (elAtual) elAtual.textContent = dois(ci + 1); };
    var arrancar = function () { clearInterval(relogio); if (reduz) return; relogio = setInterval(function () { if (vista && !quieta && !d.hidden && !abertas.length) ir(ci + 1); }, 6000); };
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { vista = en[0].isIntersecting; }, { threshold: 0.3 }).observe(lista);
    lista.addEventListener('click', function () { ir(ci + 1); arrancar(); });
    lista.addEventListener('mouseenter', function () { quieta = true; });
    lista.addEventListener('mouseleave', function () { quieta = false; });
    arrancar();
    if (window.fetch) fetch('api/avaliacoes.php').then(function (r) { return r.json(); }).then(function (j) {
      (j && j.avaliacoes || []).forEach(function (a) {
        var t = (a.texto || '').trim(); if (!t || t.length > 160) return;
        var li = d.createElement('li'); li.className = 'citacao';
        var bq = d.createElement('blockquote'); bq.className = 'serif'; bq.textContent = t.replace(/[.!\s]+$/, '');
        var p = d.createElement('p'); p.className = 'citacao-origem';
        var m = /^(\d{4})-(\d{2})/.exec(a.mes || '');
        p.textContent = 'Quem ficou' + (m ? ' · ' + MESES[+m[2] - 1].toLowerCase() + ' de ' + m[1] : '');
        li.appendChild(bq); li.appendChild(p); lista.appendChild(li); cits.push(li);
      });
      if (elTotal) elTotal.textContent = dois(cits.length);
    }).catch(function () {});
  }

  /* ---- Painel das datas: calendário + conta + tempo + pedido ---- */
  function painel() {
    var elEntrada = $('#entrada'), elSaida = $('#saida'), elPax = $('#pax'), elConta = $('#conta'), elAvisos = $('#avisos'), formPedido = $('#form-pedido'), elMeses = $('#meses');
    var bAbrir = $('#abrir-disponibilidade');
    if (!elEntrada || !elSaida || !elPax || !elConta || !elAvisos || !formPedido || !elMeses) return;
    var arrancado = false, ocupadas = {}, ocupacaoExemplo = false, semApp = false, mesBase = new Date(hoje().getFullYear(), hoje().getMonth(), 1), ultimaConta = null, inicioPreenchimento = null;
    var tempoProximos = [], pedidoTempo = 0, temporizador = null;
    var calNota = $('#cal-nota'), calAntes = $('#cal-antes'), calDepois = $('#cal-depois');

    // O telefone e a mensagem (opcionais) ficam recolhidos no telemóvel, para o pedido ser leve; no computador estão sempre abertos
    // (a linha que os abre nem aparece). Sem JavaScript ficam abertos em todo o lado.
    var pedidoMais = $('#pedido-mais');
    if (pedidoMais && window.matchMedia) {
      var estreito = window.matchMedia('(max-width: 639px)');
      var acertarMais = function () { pedidoMais.open = !estreito.matches; };
      acertarMais();
      if (estreito.addEventListener) estreito.addEventListener('change', acertarMais); else if (estreito.addListener) estreito.addListener(acertarMais);
    }

    function arrancar() {
      if (arrancado) return; arrancado = true;
      var h = hoje(); elEntrada.min = iso(h); elSaida.min = iso(addDias(h, 1));
      desenharMeses();
      fetch('api/ocupacao.php').then(function (r) { return r.json(); }).then(function (o) {
        ocupadas = {}; (o.ocupado || []).forEach(function (iv) { var x = deIso(iv.de), fim = deIso(iv.ate); while (x < fim) { ocupadas[iso(x)] = true; x = addDias(x, 1); } });
        ocupacaoExemplo = !!o.exemplo; semApp = o.app === false && !o.exemplo;
        if (calNota) { if (o.exemplo) calNota.textContent = txt('nota_exemplo'); else if (semApp) calNota.textContent = txt('nota_sem_calendario'); }
        desenharMeses();
      }).catch(function () { semApp = true; if (calNota) calNota.textContent = txt('nota_sem_calendario'); desenharMeses(); });
      fetch('api/tempo.php').then(function (r) { return r.json(); }).then(function (j) { tempoProximos = (j && j.dias) || []; if (!ultimaConta) mostrarProximos(); }).catch(function () {});
    }
    if (bAbrir) bAbrir.addEventListener('click', function () { abrir('disponibilidade'); arrancar(); });

    function desenharMeses() {
      elMeses.innerHTML = '';
      var h = iso(hoje()), e = elEntrada.value, s = elSaida.value;
      for (var k = 0; k < 2; k++) {
        var m = new Date(mesBase.getFullYear(), mesBase.getMonth() + k, 1);
        var bloco = d.createElement('div');
        var nome = d.createElement('p'); nome.className = 'mes-nome'; nome.textContent = MESES[m.getMonth()] + ' ' + m.getFullYear(); bloco.appendChild(nome);
        var sem = d.createElement('div'); sem.className = 'semana'; ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].forEach(function (l) { var sp = d.createElement('span'); sp.textContent = l; sem.appendChild(sp); }); bloco.appendChild(sem);
        var dias = d.createElement('div'); dias.className = 'dias';
        var vazios = (m.getDay() + 6) % 7; for (var v = 0; v < vazios; v++) { var vz = d.createElement('span'); vz.className = 'vazio'; dias.appendChild(vz); }
        var n = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
        for (var dia = 1; dia <= n; dia++) {
          var data = iso(new Date(m.getFullYear(), m.getMonth(), dia, 12)), b = d.createElement('button'); b.type = 'button'; b.textContent = String(dia); b.setAttribute('data-dia', data);
          if (data < h) { b.className = 'passado'; b.disabled = true; }
          else if (ocupadas[data]) { b.className = 'ocupado'; b.setAttribute('aria-label', dia + ', ocupado'); b.disabled = true; }
          else { b.setAttribute('aria-label', dia + (semApp ? ', por confirmar' : ', livre')); if (semApp) b.classList.add('incerto'); b.addEventListener('click', escolherDia); }
          if (data === e || data === s) b.classList.add('escolhido'); else if (e && s && data > e && data < s) b.classList.add('entre');
          dias.appendChild(b);
        }
        bloco.appendChild(dias); elMeses.appendChild(bloco);
      }
      if (calAntes) calAntes.disabled = mesBase <= new Date(hoje().getFullYear(), hoje().getMonth(), 1);
    }
    function escolherDia() {
      var dia = this.getAttribute('data-dia'), e = elEntrada.value, s = elSaida.value;
      if (!e || (e && s) || dia <= e) { elEntrada.value = dia; elSaida.value = ''; }
      else { elSaida.value = dia; }
      desenharMeses(); calcular();
    }
    if (calAntes) calAntes.addEventListener('click', function () { mesBase = new Date(mesBase.getFullYear(), mesBase.getMonth() - 2, 1); desenharMeses(); });
    if (calDepois) calDepois.addEventListener('click', function () { mesBase = new Date(mesBase.getFullYear(), mesBase.getMonth() + 2, 1); desenharMeses(); });

    // A conta: ou uma frase (antes de haver datas, a calcular, quando não dá), ou as três linhas (estadia, limpeza, total da casa).
    function contaFrase(t, erro) {
      elConta.className = 'conta' + (erro ? ' erro' : ''); elConta.innerHTML = '';
      var p = d.createElement('p'); p.className = 'conta-msg' + (erro ? '' : ' serif'); p.textContent = t; elConta.appendChild(p);
    }
    function contaLinha(dl, rotulo, pormenor, valor, classe) {
      var div = d.createElement('div'); if (classe) div.className = classe;
      var dt = d.createElement('dt'); dt.textContent = rotulo;
      if (pormenor) { var sm = d.createElement('small'); sm.textContent = pormenor; dt.appendChild(sm); }
      var dd = d.createElement('dd'); dd.textContent = valor;
      div.appendChild(dt); div.appendChild(dd); dl.appendChild(div);
    }
    function aviso(t) { if (!t) return; var li = d.createElement('li'); li.textContent = t; elAvisos.appendChild(li); }

    function calcular() {
      var e = elEntrada.value, s = elSaida.value, pax = elPax.value;
      desenharMeses();
      if (!e || !s) { contaFrase(txt('conta_vazia', 'Escolham a chegada e a partida.')); elAvisos.innerHTML = ''; formPedido.hidden = true; ultimaConta = null; mostrarProximos(); return; }
      contaFrase(txt('conta_calcular', 'A fazer as contas…'));
      clearTimeout(temporizador);
      temporizador = setTimeout(function () {
        fetch('api/tarifa.php?entrada=' + e + '&saida=' + s + '&pax=' + pax).then(function (r) { return r.json(); }).then(mostrarConta).catch(function () {
          contaFrase(txt('conta_falha', 'Não foi possível fazer as contas agora.'), true); formPedido.hidden = true;
        });
      }, 250);
    }
    function mostrarConta(R) {
      ultimaConta = R; elAvisos.innerHTML = '';
      if (!R.ok) { contaFrase(R.mensagem || 'Estas datas não são possíveis.', true); formPedido.hidden = true; return; }
      var livre = true, x = deIso(R.entrada), fim = deIso(R.saida); while (x < fim) { if (ocupadas[iso(x)]) livre = false; x = addDias(x, 1); }
      if (!livre && !ocupacaoExemplo) { contaFrase(txt('conta_ocupado', 'Estas datas já estão ocupadas.'), true); formPedido.hidden = true; return; }
      var noites = R.noites + ' ' + (R.noites === 1 ? 'noite' : 'noites');
      var epocas = {}; (R.detalhe || []).forEach(function (q) { epocas[q.epoca] = true; });
      var pormenor = noites + ' · ' + (R.mensal ? 'preço mensal' : (Object.keys(epocas).length <= 1 ? euros(R.noite) + ' por noite' : 'duas épocas'));
      var dormidas = (typeof R.dormidas === 'number') ? R.dormidas : (R.total - R.limpeza);
      elConta.className = 'conta'; elConta.innerHTML = '';
      var dl = d.createElement('dl'); dl.className = 'conta-linhas';
      contaLinha(dl, txt('linha_estadia', 'Estadia'), pormenor, euros(dormidas));
      contaLinha(dl, txt('linha_limpeza', 'Limpeza final'), txt('linha_limpeza_nota'), euros(R.limpeza));
      contaLinha(dl, txt('linha_total', 'Total da casa'), '', euros(R.total), 'conta-total');
      elConta.appendChild(dl);
      if (txt('depois_conta')) { var p = d.createElement('p'); p.className = 'conta-depois'; p.textContent = txt('depois_conta'); elConta.appendChild(p); }
      (R.avisos || []).forEach(aviso);
      // Saída tardia: só não se diz quando o calendário (o verdadeiro) mostra que alguém entra no dia da saída.
      var entraAlguem = !semApp && !ocupacaoExemplo && ocupadas[R.saida];
      if (!entraAlguem && txt('saida_tardia')) aviso(txt('saida_tardia').replace('{hora}', txt('hora_saida_tardia', '18h')));
      if (R.fonte === 'site') aviso(txt('estimativa'));
      formPedido.hidden = false; if (!inicioPreenchimento) inicioPreenchimento = Date.now();
      atualizarLigacoes();
      tempoDaEstadia(R.entrada, R.saida);
    }
    function textoPedido(extra) {
      var R = ultimaConta; if (!R) return '';
      var t = 'Olá Diogo, gostávamos de ficar no Monte Casa Branca de ' + fmtData(R.entrada) + ' a ' + fmtData(R.saida) + ' (' + R.noites + ' noites, ' + R.pax + ' pessoas).';
      if (R.total) t += ' Vi no site o valor de ' + euros(R.total) + '.';
      if (extra.nome) t += ' Sou ' + extra.nome + '.';
      if (extra.mensagem) t += ' ' + extra.mensagem;
      return t;
    }
    function atualizarLigacoes() {
      var f = formPedido, dados = { nome: f.nome.value.trim(), mensagem: f.mensagem.value.trim() }, t = textoPedido(dados), R = ultimaConta;
      var wa = $('#pedido-whatsapp'), em = $('#pedido-email'), tel = '351962802626', mail = 'geral@montecasabranca.pt';
      var ctWa = $('#contactos a[href^="https://wa.me/"]'); if (ctWa) tel = ctWa.getAttribute('href').replace('https://wa.me/', '');
      var ctEm = $('#contactos a[href^="mailto:"]'); if (ctEm) mail = ctEm.getAttribute('href').replace('mailto:', '');
      if (wa) wa.href = 'https://wa.me/' + tel + '?text=' + encodeURIComponent(t);
      if (em) em.href = 'mailto:' + mail + '?subject=' + encodeURIComponent('Pedido de datas · ' + (R ? fmtData(R.entrada) + ' a ' + fmtData(R.saida) : '')) + '&body=' + encodeURIComponent(t);
    }
    ['change', 'input'].forEach(function (ev) { elEntrada.addEventListener(ev, calcular); elSaida.addEventListener(ev, calcular); elPax.addEventListener(ev, calcular); });
    formPedido.addEventListener('input', atualizarLigacoes);

    formPedido.addEventListener('submit', function (ev) { ev.preventDefault(); enviarPedido(false); });
    function enviarPedido(confirmoPreco) {
      var R = ultimaConta, est = $('#pedido-estado'), btn = $('#enviar-pedido'); if (!R || !R.ok || !est || !btn) return;
      var f = formPedido;
      if (!f.nome.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.value.trim())) { est.className = 'pedido-estado erro'; est.textContent = 'Digam-nos o vosso nome e um email válido.'; return; }
      btn.disabled = true; est.className = 'pedido-estado'; est.textContent = 'A enviar…';
      var pedido = { nome: f.nome.value.trim(), email: f.email.value.trim(), telefone: f.telefone.value.trim() || undefined, mensagem: f.mensagem.value.trim() || undefined,
        entrada: R.entrada, saida: R.saida, pax: +R.pax, preco_mostrado: R.total, lingua: 'pt', origem: 'inicio',
        segundos_a_preencher: inicioPreenchimento ? Math.round((Date.now() - inicioPreenchimento) / 1000) : undefined, armadilha: f.armadilha.value || '' };
      if (confirmoPreco) pedido.confirmo_preco = true;
      fetch('api/prereserva.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(pedido) })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          btn.disabled = false;
          if (res.ok) { est.className = 'pedido-estado ok'; est.textContent = res.mensagem || ('Pedido recebido' + (res.codigo ? ' (' + res.codigo + ')' : '') + '. O Diogo responde em breve, por email ou WhatsApp.'); btn.hidden = true; }
          else if (res.erro === 'preco' && res.preco_app) {
            est.className = 'pedido-estado aviso'; est.textContent = res.mensagem || ('O valor atualizado é ' + euros(res.preco_app) + '. Confirmam?');
            var conf = d.createElement('button'); conf.type = 'button'; conf.className = 'btn btn-primario pedido-confirmar'; conf.textContent = 'Confirmar ' + euros(res.preco_app);
            conf.addEventListener('click', function () { ultimaConta.total = res.preco_app; if (conf.parentNode) conf.parentNode.removeChild(conf); enviarPedido(true); });
            est.appendChild(d.createElement('br')); est.appendChild(conf);
          }
          else { est.className = 'pedido-estado erro'; est.textContent = (res.mensagem || 'Não foi possível registar o pedido.') + ' Podem enviar-nos as datas por WhatsApp ou email.'; }
        })
        .catch(function () { btn.disabled = false; est.className = 'pedido-estado erro'; est.textContent = 'Não foi possível enviar agora. Usem o WhatsApp ou o email, por favor.'; });
    }

    /* O tempo no Monte (Open-Meteo, pelo servidor).
       Sem datas escolhidas: os próximos dias. Com datas: os dias da estadia — a previsão para os que ela já alcança e, para os outros,
       a média dos últimos anos nesses mesmos dias (mais apagada), com uma frase a dizer qual é qual. Se o serviço falhar, o bloco some. */
    var ICO = {
      sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
      'pouco-nublado': '<path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/>',
      nublado: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
      nevoeiro: '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 17H7"/><path d="M17 21H9"/>',
      chuvisco: '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M8 19v1"/><path d="M8 14v1"/><path d="M16 19v1"/><path d="M16 14v1"/><path d="M12 21v1"/><path d="M12 16v1"/>',
      chuva: '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>',
      aguaceiros: '<path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24"/><path d="M11 20v2"/><path d="M7 19v2"/>',
      neve: '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M8 15h.01"/><path d="M8 19h.01"/><path d="M12 17h.01"/><path d="M12 21h.01"/><path d="M16 15h.01"/><path d="M16 19h.01"/>',
      trovoada: '<path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"/><path d="m13 12-3 5h4l-3 5"/>'
    };
    var NOME_TEMPO = { sol: 'sol', 'pouco-nublado': 'sol e algumas nuvens', nublado: 'nublado', nevoeiro: 'nevoeiro', chuvisco: 'chuvisco', chuva: 'chuva', aguaceiros: 'aguaceiros', neve: 'neve', trovoada: 'trovoada' };
    function classeTempo(c) { if (c === 0 || c === 1) return 'sol'; if (c === 2) return 'pouco-nublado'; if (c === 3) return 'nublado'; if (c <= 48) return 'nevoeiro'; if (c <= 57) return 'chuvisco'; if (c <= 67) return 'chuva'; if (c <= 77) return 'neve'; if (c <= 82) return 'aguaceiros'; if (c <= 86) return 'neve'; return 'trovoada'; }
    function desenharTempo(dias, comDia, nota) {
      var caixa = $('#tempo'), ul = $('#tempo-dias'), elNota = $('#tempo-nota'); if (!caixa || !ul) return;
      if (!dias || !dias.length) { caixa.hidden = true; return; }
      ul.innerHTML = '';
      dias.forEach(function (q) {
        var li = d.createElement('li'), dt = deIso(q.dia), cl = classeTempo(q.codigo);
        if (q.tipo === 'media') li.className = 'media';
        li.innerHTML = '<span class="dia">' + DIAS_CURTOS[(dt.getDay() + 6) % 7] + (comDia ? ' ' + dt.getDate() : '') + '</span>'
          + '<span class="icone" role="img" aria-label="' + NOME_TEMPO[cl] + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICO[cl] + '</svg></span>'
          + '<span class="max">' + q.max + '°</span><span class="min">' + q.min + '°</span>';
        ul.appendChild(li);
      });
      if (elNota) elNota.textContent = nota || '';
      caixa.hidden = false;
    }
    function mostrarProximos() { desenharTempo(tempoProximos.slice(0, 7), false, txt('tempo_proximos')); }
    function tempoDaEstadia(e, s) {
      var meu = ++pedidoTempo;
      fetch('api/tempo.php?de=' + e + '&ate=' + s).then(function (r) { return r.json(); }).then(function (j) {
        if (meu !== pedidoTempo) return;                       // entretanto escolheram outras datas
        var dias = (j && j.dias) || []; if (!dias.length) { mostrarProximos(); return; }
        var medias = dias.filter(function (q) { return q.tipo === 'media'; }).length;
        desenharTempo(dias.slice(0, 14), true, medias === 0 ? txt('tempo_estadia') : (medias === dias.length ? txt('tempo_medias') : txt('tempo_misto')));
      }).catch(function () { if (meu === pedidoTempo) mostrarProximos(); });
    }
  }

  seguro('ligações internas', ligacoes);
  seguro('revelar', revelar);
  seguro('barra de baixo', barra);
  seguro('sequências', sequencias);
  seguro('camadas', camadas);
  seguro('álbuns', albuns);
  seguro('fotografia', fotografia);
  seguro('frases', frases);
  seguro('painel das datas', painel);
})();
