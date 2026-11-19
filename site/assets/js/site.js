/* Monte Casa Branca · interação (JavaScript nativo, sem dependências). Versão 4, 17/11/2026; a pílula de descer na versão 6, 19/11/2026.
   Blocos: ligações internas · a capa (a fotografia fica para trás ao rolar) · revelar ao rolar · barra de baixo · a pílula de descer · rolos de fotografias · camadas (menu, painel, fotografia) ·
   álbuns · fotografia em ecrã inteiro · frases de quem já ficou · painel das datas (calendário via api/ocupacao.php, conta via
   api/tarifa.php, tempo via api/tempo.php, pedido via api/prereserva.php).
   Regras, por causa do Safari do iPhone (na versão 2 a página prendia; na 3 as fotografias quase não se mexiam):
   · o movimento das fotografias é da folha de estilos (site.css, «Rolos»): uma animação que o browser corre sozinho. Aqui só se
     trata do que a pessoa faz (parar, levar, abrir). Nada aqui mexe na rolagem da página nem empurra nada a cada instante; a única
     coisa que acompanha a rolagem é a posição da fotografia da capa (a paralaxe da versão 2, só com o que a rolagem já mudou);
     a pílula de descer só vê o que tem por baixo e muda de classe;
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

  /* ---- Camadas (menu, painel, fotografia): abrir e fechar ----
     Abrir é só mostrar o elemento; fechar é só escondê-lo. Nada é posto nem tirado do <body>. Com uma camada aberta, as fotografias
     por trás ficam paradas (aoMudarCamadas → «Rolos»). */
  function aoMudarCamadas() { for (var i = 0; i < rolos.length; i++) acertarRolo(rolos[i]); pilulaAcertar(); frasesAcertar(); voltarAcertar(); }
  var pilulaAcertar = function () {};                    // a pílula de descer (bloco «A pílula»); até ela arrancar, não faz nada
  var frasesAcertar = function () {};                    // as frases de quem já ficou param com uma camada aberta (bloco «Quem já ficou»)
  var voltarAcertar = function () {};                    // o botão «Voltar onde estava» esconde-se com uma camada aberta
  var aoSaltar = function () {};                         // chamado pelas ligações internas antes de um salto (bloco «Voltar onde estava»)
  function abrir(id) {
    var el = d.getElementById(id); if (!el || !el.hidden) return;
    el._antes = d.activeElement; el.hidden = false; abertas.push(id); aoMudarCamadas();
    if (id === 'menu') el.scrollTop = 0;
    var f = $('button[data-fechar]', el); if (f) { try { f.focus({ preventScroll: true }); } catch (e) {} }
  }
  function fechar(id, semFoco) {
    var el = d.getElementById(id); if (!el || el.hidden) return;
    el.hidden = true; abertas = abertas.filter(function (x) { return x !== id; }); aoMudarCamadas();
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
      aoSaltar(alvo);
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
     Com «reduzir movimento» ligado no aparelho aparecem na mesma, mas só a aparecer, sem subir (site.css, «Menos movimento»).
     Os blocos de fotografias (data-entra) nunca esperam escondidos: ao chegarem ao ecrã ganham «entrou» e fazem uma entrada suave. */
  function revelar() {
    var els = $$('.reveal'); if (!els.length) return;
    var mostrar = function (el) { el.classList.add(el.hasAttribute('data-entra') ? 'entrou' : 'is-in'); };
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
    var mostrar = function (v) { if (v) dock.classList.add('visivel'); else dock.classList.remove('visivel'); dock.setAttribute('aria-hidden', v ? 'false' : 'true'); pilulaAcertar(); };
    if (inicio && 'IntersectionObserver' in window) new IntersectionObserver(function (en) { mostrar(!en[0].isIntersecting); }, { threshold: 0.05 }).observe(inicio);
    else mostrar(true);
  }

  /* ---- A capa: ao rolar, a fotografia fica para trás ----
     A paralaxe da versão 2, com a mesma velocidade (um quarto da rolagem). O Diogo viu-a suave no iPhone e pediu-a de volta a
     17/11/2026: «nas fotos de cima elas aparecem em modo estático e sem aquele movimento suave que já tinha sido implementado na
     v2» (a versão 3 tinha-a tirado do telemóvel). Mexe-se a caixa da fotografia (.hero-fundo), porque a fotografia tem a sua
     própria animação (respirar), que passaria por cima de uma posição escrita aqui. No computador com rato a fotografia já está
     presa ao ecrã (site.css, «Capa») e aqui não se faz nada; com «reduzir movimento», também não. Só muda a posição da
     fotografia: a página rola como o telemóvel a rola. */
  function capa() {
    var fundo = $('.hero-fundo'); if (!fundo || reduz) return;
    var presa = window.matchMedia ? window.matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine)') : null;
    var ultimo = null;
    var acertar = function () {
      if (presa && presa.matches) { if (ultimo !== null) { fundo.style.transform = ''; ultimo = null; } return; }
      var h = window.innerHeight || raiz.clientHeight || 800;
      // (no «elástico» do topo do iPhone a fotografia não sobe; depois de a capa sair do ecrã fica onde ficou)
      var t = Math.round(Math.min(Math.max(alturaRolada(), 0), h) * 0.25 * 10) / 10;
      if (t === ultimo) return; ultimo = t;
      fundo.style.transform = 'translate3d(0, ' + t + 'px, 0)';
    };
    acertar();
    window.addEventListener('scroll', acertar, { passive: true });
    window.addEventListener('resize', acertar);
    if (presa) { if (presa.addEventListener) presa.addEventListener('change', acertar); else if (presa.addListener) presa.addListener(acertar); }
  }

  /* ---- Fotografias que passam devagar (versão 6, 19/11/2026) ----
     As fotografias grandes que abrem os capítulos e a da Nacional 2 (data-mexe) passam devagar por trás da sua caixa enquanto a
     página rola, como na versão 1 (Diogo, 18/11: «havia umas fotos que tinham vida na primeira versão»): a caixa .foto-mexe é mais
     alta do que a fotografia à vista (120 %) e desce no máximo 9 % da altura, conforme a fotografia vai do fundo ao cimo do ecrã. É a
     mesma maneira da capa (só a posição, com o que a rolagem já mudou), por isso corre em qualquer telemóvel. Só se mexem as que estão
     perto do ecrã. Com «reduzir movimento», ficam paradas. */
  function passar() {
    if (reduz) return;
    var lista = $$('[data-mexe]').map(function (el) { return { el: el, m: $('.foto-mexe', el), ultimo: null }; }).filter(function (x) { return !!x.m; });
    if (!lista.length) return;
    var acertar = function () {
      var vh = window.innerHeight || raiz.clientHeight || 800;
      for (var i = 0; i < lista.length; i++) {
        var x = lista[i], r = x.el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200 || r.height < 1) continue;
        var p = (vh - r.top) / (vh + r.height); if (p < 0) p = 0; if (p > 1) p = 1;
        var t = Math.round((p - 0.5) * 0.18 * r.height * 10) / 10;
        if (t === x.ultimo) continue; x.ultimo = t;
        x.m.style.transform = 'translate3d(0, ' + t + 'px, 0)';
      }
    };
    acertar();
    window.addEventListener('scroll', acertar, { passive: true });
    window.addEventListener('resize', acertar);
    window.addEventListener('load', acertar);
  }

  /* ---- «Voltar onde estava» (versão 6, 19/11/2026) ----
     Diogo, 18/11: «Quando se carrega a meio para ver as fotos, não há botão para retornar e continuar a viagem no site. Precisa de um
     botão ou seta para voltar ao ponto onde estava.» (19/11: «falta o botão de voltar quando abro as fotos».)
     · Depois de um salto grande por uma ligação (mais de um ecrã: o menu, «Passear pelo Monte», as palavras do cartaz…), aparece no
       canto de cima o botão «Voltar onde estava», com a seta para o lado de onde se veio. Leva ao ponto exato de onde se saiu e some.
     · Some também quando a pessoa sai da secção a que foi (ela continuou a viagem por ali) e esconde-se com uma camada aberta.
     · O gesto de voltar do telemóvel (e o botão de voltar do browser) faz o mesmo: cada salto fica no histórico do browser com o
       ponto de onde se saiu, sem «#» no endereço. */
  function voltar() {
    var b = d.getElementById('voltar'); if (!b) return;
    var origem = null, destino = null, ativo = false, chegou = false;
    var mostrar = function (v) { ativo = v; b.hidden = !v || abertas.length > 0; };
    voltarAcertar = function () { b.hidden = !ativo || abertas.length > 0; };
    var guardar = function (y) { try { if (history.replaceState) history.replaceState({ mcbY: y }, ''); } catch (e) {} };
    aoSaltar = function (alvo) {
      var y = alturaRolada(), yAlvo = Math.max(0, Math.round(topoDe(alvo))), vh = window.innerHeight || 800;
      if (Math.abs(yAlvo - y) < vh * 1.2) return;                 // um salto pequeno (a capa para a casa) não precisa de volta
      origem = y; destino = alvo; chegou = false;
      guardar(y);
      try { if (history.pushState) history.pushState({ mcbY: yAlvo, mcbSalto: true }, ''); } catch (e) {}
      b.classList.toggle('para-baixo', y > yAlvo);
      mostrar(true);
    };
    var irParaY = function (y) {
      viagem++; var meu = viagem;
      if (reduz) window.scrollTo(0, y); else { try { window.scrollTo({ top: y, left: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, y); } }
      setTimeout(function () { if (meu === viagem && Math.abs(alturaRolada() - y) > 4) window.scrollTo(0, y); }, 1600);
    };
    b.addEventListener('click', function () {
      if (origem === null) { mostrar(false); return; }
      var y = origem; origem = null; destino = null; mostrar(false);
      // O histórico fica coerente: se o salto está lá, é o «voltar» do browser que faz o caminho (e chama irParaY); senão, vai direto.
      var st = history.state;
      if (st && st.mcbSalto && history.back) history.back(); else irParaY(y);
    });
    window.addEventListener('popstate', function (ev) {
      var st = ev.state;
      if (st && typeof st.mcbY === 'number') { origem = null; destino = null; mostrar(false); irParaY(st.mcbY); }
    });
    // Sair da secção a que se foi (para fora dela, a mais de meio ecrã) acaba com o botão. Só conta depois de lá chegar: durante a
    // viagem a secção ainda está longe.
    var tVer = null;
    window.addEventListener('scroll', function () {
      if (!ativo || tVer) return;
      tVer = setTimeout(function () {
        tVer = null; if (!ativo || !destino) return;
        var r = destino.getBoundingClientRect(), vh = window.innerHeight || 800, dentro = !(r.bottom < vh * 0.4 || r.top > vh * 0.6);
        if (dentro) chegou = true;
        else if (chegou) { origem = null; destino = null; mostrar(false); }
      }, 300);
    }, { passive: true });
  }

  /* ---- A pílula de descer (versão 6, 19/11/2026) ----
     Diogo, 18/11: «Está a faltar a pílula do movimento para baixo durante todo o site.» e «O ícone do rato pode ficar no meio, mais
     flutuante e sem ficar em frente ao texto. Sobe a posição.» (19/11, com a versão 5 no iPhone: «Faltou esta parte».)
     · Fica presa ao ecrã (classe «flutua»): na capa, ao centro e por baixo do botão; quando a barra de baixo aparece, sobe (classe
       «alto») e fica a flutuar por cima dela. As duas posições estão na folha de estilos (site.css, «A pílula»).
     · Nunca por cima de texto: quando a página rola, vê-se o que está por baixo da pílula numa grelha de pontos à sua volta
       (document.elementsFromPoint). Se for texto (um parágrafo, um título, uma pergunta, uma ligação, um botão…), apaga-se logo;
       sobre fotografias e espaços vazios volta a aparecer, um instante depois, para não piscar entre duas linhas. Apagada não
       apanha toques: passam para o que está por baixo.
     · Esconde-se com o menu, o painel ou uma fotografia abertos.
     · Cada toque leva à secção seguinte, com a mesma viagem das ligações (irPara); no fim da página vira-se ao contrário e volta
       ao topo.
     Só lê posições e muda classes; nunca mexe na rolagem enquanto a pessoa rola. */
  function pilula() {
    var p = d.getElementById('pilula'), rato = p && $('.pilula-rato', p); if (!p || !rato) return;
    var dock = d.getElementById('dock'), inicio = d.getElementById('inicio');
    var TEXTO = 'p, h1, h2, h3, h4, h5, h6, li, dt, dd, blockquote, figcaption, label, summary, legend, address, td, th, a, button, input, select, textarea, .eyebrow';
    var FOTO = '.foto-botao, .foto-larga-caixa, .hero-fundo, picture, img, video';
    var podeVer = !!d.elementsFromPoint;
    function daPilula(el) { return el === p || p.contains(el); }
    // O que está à frente num ponto do ecrã: 1 = texto, 0 = fotografia, nada ou espaço vazio. Desce pela pilha só enquanto o que
    // encontra não decide (uma caixa vazia por cima de texto, um contentor).
    function oQueEsta(x, y) {
      var pilha = d.elementsFromPoint(x, y);
      for (var k = 0; k < pilha.length; k++) {
        var el = pilha[k]; if (daPilula(el)) continue;
        if (!el.closest || el === raiz || el === d.body) return 0;
        if (el.closest(FOTO)) return 0;
        var t = el.closest(TEXTO); if (t && /\S/.test(t.textContent || '')) return 1;
      }
      return 0;
    }
    // Um bloco de texto que ainda está a subir para o seu lugar (revelar ao rolar: entra 34 px abaixo e sobe em 1,1 s) conta já no
    // sítio onde vai ficar, para a pílula se apagar antes de as letras chegarem e não depois.
    var revelaveis = $$('.reveal');
    function textoACaminho(r, m) {
      for (var i = 0; i < revelaveis.length; i++) {
        var el = revelaveis[i], b = el.getBoundingClientRect();
        if (b.bottom < r.top - 80 || b.top > r.bottom + 80 || b.width < 1) continue;
        var t = getComputedStyle(el).transform, dy = 0;
        if (t && t !== 'none') { var v = t.slice(t.indexOf('(') + 1).match(/-?[\d.]+(e-?\d+)?/g); if (v) dy = parseFloat(v.length > 6 ? v[13] : v[5]) || 0; }
        if (Math.abs(dy) < 1) continue;
        if (b.left < r.right + m && b.right > r.left - m && b.top - dy < r.bottom + m && b.bottom - dy > r.top - m && /\S/.test(el.textContent || '')) return true;
      }
      return false;
    }
    function porCimaDeTexto() {
      if (!podeVer) return false;
      var r = rato.getBoundingClientRect(), m = 8, cols = [r.left - m, r.left + r.width / 2, r.right + m], i, y, passo = (r.height + 2 * m) / 7;
      for (y = r.top - m; y <= r.bottom + m + 0.5; y += passo) {
        for (i = 0; i < 3; i++) if (oQueEsta(cols[i], y) === 1) return true;
      }
      return textoACaminho(r, m);
    }
    function noFim() { return alturaRolada() + (window.innerHeight || raiz.clientHeight) >= raiz.scrollHeight - 120; }
    var tVer = null, tParou = null, tParou2 = null, tMostrar = null;
    function acertar() {
      tVer = null;
      var alto = !!(dock && dock.classList.contains('visivel')), fim = noFim();
      if (alto !== p.classList.contains('alto')) { p.classList.toggle('alto', alto); setTimeout(acertar, 620); }   // depois de subir ou descer, ver outra vez
      if (fim !== p.classList.contains('topo')) { p.classList.toggle('topo', fim); p.setAttribute('aria-label', fim ? 'Voltar ao topo' : 'Descer para a secção seguinte'); }
      var teclado = false; try { teclado = p.matches(':focus-visible'); } catch (e) {}
      var esconder = abertas.length > 0 || (!teclado && porCimaDeTexto());
      if (esconder) { clearTimeout(tMostrar); tMostrar = null; p.classList.add('apagada'); }
      else if (p.classList.contains('apagada') && !tMostrar) {
        tMostrar = setTimeout(function () { tMostrar = null; if (!(abertas.length > 0 || porCimaDeTexto())) p.classList.remove('apagada'); }, 220);
      }
    }
    // Enquanto a página rola, vê-se de 90 em 90 ms; quando pára, outra vez (e mais tarde, depois de o texto que entrou acabar de subir).
    function agendar() {
      if (!tVer) tVer = setTimeout(acertar, 90);
      clearTimeout(tParou); tParou = setTimeout(acertar, 260);
      clearTimeout(tParou2); tParou2 = setTimeout(acertar, 1100);
    }
    function paragens() { return $$('#inicio, main > section, #contactos').filter(function (s) { return s.offsetHeight > 0; }); }
    p.addEventListener('click', function (ev) {
      ev.preventDefault();
      if (p.classList.contains('topo')) { irPara(inicio || d.body, true); return; }
      var y = alturaRolada() + 48, alvo = null;
      paragens().some(function (s) { if (topoDe(s) > y) { alvo = s; return true; } return false; });
      if (alvo) irPara(alvo, true); else window.scrollTo(0, raiz.scrollHeight);
    });
    p.classList.add('flutua');
    pilulaAcertar = function () { acertar(); agendar(); };
    window.addEventListener('scroll', agendar, { passive: true });
    window.addEventListener('resize', agendar);
    window.addEventListener('load', agendar);
    // Um separador da galeria, uma pergunta aberta… mudam o que fica por baixo da pílula sem a página rolar. E um bloco de texto que
    // acaba de subir para o seu lugar também.
    d.addEventListener('click', function (ev) { if (!daPilula(ev.target)) { setTimeout(acertar, 350); setTimeout(acertar, 1000); } }, true);
    d.addEventListener('transitionend', function (ev) { if (ev.target && ev.target.classList && ev.target.classList.contains('reveal') && !tVer) tVer = setTimeout(acertar, 30); });
    acertar();
  }

  /* ---- Rolos: as fotografias que deslizam sozinhas ----
     Nota 8 do Diogo (15/11/2026): «uma foto principal e 2/3 fotos atrás a rolar devagar, onde os clientes podem, com o dedo no
     mobile ou o rato, acelerar ou parar. Não precisa de dizer que tem fotos. A dinâmica do site mostra essa parte.»
     O movimento é sempre uma animação que o browser corre sozinho (só transform, sem temporizadores, sem esperar que a página
     pare). A folha de estilos tem uma (site.css, «Rolos»), que anda mesmo que este ficheiro não corra. Quando este ficheiro corre,
     troca-a por uma igual criada aqui (element.animate), à mesma velocidade e no mesmo sítio: é a que o dedo e o rato conseguem
     parar e levar em qualquer browser. (Na primeira versão pegava-se na animação da folha de estilos com getAnimations(); num
     Chromium mais antigo, o dos testes do GitHub, o dedo e o rato deixaram de lhe conseguir tocar.) O que a pessoa faz:
     · «parar»: enquanto o dedo ou o botão do rato estão em cima da faixa, ela fica parada; ao largar, continua. Com rato, pára
       também enquanto o rato se mexe por cima das fotografias (para se conseguir escolher uma) e retoma pouco depois;
     · «acelerar»: arrastar para um lado ou para o outro leva a faixa (anda-se com o tempo da animação para a frente ou para trás);
       ao largar, a faixa continua com o balanço do gesto até voltar à sua velocidade. O dedo para cima e para baixo rola a página
       (touch-action: pan-y na folha de estilos); a roda ou o trackpad para os lados também levam a faixa;
     · um toque sem arrastar abre a fotografia em grande (bloco «Fotografia»);
     · as faixas afastadas do ecrã ficam paradas e sem camadas («longe»); ao aproximarem-se recomeçam na primeira fotografia, que é
       a principal do capítulo, e as fotografias que faltam começam logo a carregar;
     · com o menu, o painel ou uma fotografia abertos, as faixas por trás ficam paradas.
     Nos browsers sem element.animate fica a animação da folha de estilos e só o «parar» (classe «parado»). */
  var comRato = !!(window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  var rolos = [], ultimoTab = 0;
  d.addEventListener('keydown', function (ev) { if (ev.key === 'Tab') ultimoTab = Date.now(); }, true);
  function mod(a, n) { return ((a % n) + n) % n; }
  function duracaoCss(pista) {                            // a duração da volta na folha de estilos (com os tamanhos e o «reduzir movimento»), em ms
    var cs = getComputedStyle(pista), v = String(cs.animationDuration || cs.webkitAnimationDuration || '').split(',')[0].trim(), n = parseFloat(v);
    if (n > 0) return /ms$/.test(v) ? n : n * 1000;
    // Se o browser não a disser, a que o servidor escreveu na pista para este tamanho de ecrã e este «reduzir movimento».
    var largo = !!(window.matchMedia && window.matchMedia('(min-width: 768px)').matches);
    v = String(pista.style.getPropertyValue('--dur' + (largo ? (reduz ? '-lc' : '-l') : (reduz ? '-c' : ''))) || '').trim(); n = parseFloat(v);
    return n > 0 ? (/ms$/.test(v) ? n : n * 1000) : 0;
  }
  function animacaoDe(r) { return r.anim || null; }
  // Um tempo da Web Animations em milissegundos (alguns browsers devolvem um objeto em vez de um número).
  function ms(v) { if (v && typeof v === 'object') { try { v = v.to ? v.to('ms').value : v.value; } catch (e) { v = v.value; } } v = +v; return isFinite(v) ? v : 0; }
  function tempoDe(a) { try { return ms(a.currentTime); } catch (e) { return 0; } }
  function medidasDe(r, a) {                              // a duração de uma volta (ms) e o comprimento de uma série (px)
    var dur = r.dur || 0;                                 // a que se deu ao criar a animação (não depende do browser a saber dizer)
    if (!(dur > 0)) { try { dur = ms(a.effect.getComputedTiming().duration); } catch (e) { dur = 0; } }
    var per = r.pista.scrollWidth / 2;
    if (!(per > 0)) { var s = $('.rolo-serie', r.pista); per = s ? s.getBoundingClientRect().width : 0; }
    return dur > 0 && per > 0 ? { dur: dur, per: per } : null;
  }
  // Troca a animação da folha de estilos por uma igual, criada aqui, a começar no sítio onde a outra ia (sem salto).
  function criarAnimacao(r) {
    var pista = r.pista, dur = duracaoCss(pista);
    if (!pista.animate || !(dur > 0)) return;
    var inicio = 0;
    try { var t = getComputedStyle(pista).transform, per = pista.scrollWidth / 2; if (t && t !== 'none' && per > 0 && window.DOMMatrixReadOnly) inicio = mod(-new DOMMatrixReadOnly(t).m41 / per, 1) * dur; } catch (e) { inicio = 0; }
    var a = null;
    try { a = pista.animate([{ transform: 'translate3d(0, 0, 0)' }, { transform: 'translate3d(-50%, 0, 0)' }], { duration: dur, iterations: Infinity, easing: 'linear' }); } catch (e) { a = null; }
    if (!a) return;
    try { a.currentTime = inicio; } catch (e) {}
    r.anim = a; r.dur = dur; r.el.classList.add('rolo-js');   // site.css: .rolo-js .rolo-pista { animation-name: none }
  }
  function acertarRolo(r) {                               // anda ou está parada?
    var anda = r.perto && !r.preso && !r.rato && !r.foco && !abertas.length, a = r.anim;
    // Sem animação criada aqui (browser antigo), o «parar» faz-se pela folha de estilos (classe «parado»).
    if (!a) { if (anda) r.el.classList.remove('parado'); else r.el.classList.add('parado'); return; }
    try {
      if (!r.perto) { if (a.playState !== 'idle') a.cancel(); return; }      // longe: sem animação; ao voltar, recomeça na primeira fotografia
      if (anda) { if (a.playState !== 'running') a.play(); }
      else if (a.playState !== 'paused') a.pause();
    } catch (e) {}
  }
  function pararBalanco(r) { if (r.balanco) { clearInterval(r.balanco); r.balanco = null; } }
  function soltar(r) { pararBalanco(r); r.preso = false; acertarRolo(r); }
  function balanco(r) {                                   // depois de largar: a faixa continua com a velocidade do gesto e abranda
    var dt = r.tb - r.ta, v = dt > 0 && dt < 120 ? (r.xb - r.xa) / dt : 0;   // px por ms; negativo = para a esquerda (o sentido da faixa)
    var a = animacaoDe(r), m = a ? medidasDe(r, a) : null;
    if (!m || Math.abs(v) < 0.25) { soltar(r); return; }
    var natural = m.per / m.dur, ultimo = Date.now();
    v = Math.max(-3.5, Math.min(3.5, v)); r.preso = true;
    r.balanco = setInterval(function () {
      var agora = Date.now(), passo = Math.min(48, agora - ultimo); ultimo = agora;
      v *= Math.pow(0.94, passo / 16);
      if ((v < 0 && -v <= natural * 1.2) || (v >= 0 && v < 0.02)) { soltar(r); return; }
      try { a.currentTime = mod(tempoDe(a) - v * passo / m.per * m.dur, m.dur); } catch (e) { soltar(r); }
    }, 16);
  }
  function umRolo(el) {
    var pista = $('.rolo-pista', el); if (!pista) return;
    var r = { el: el, pista: pista, anim: null, perto: true, preso: false, rato: false, foco: false, levou: false,
      id: null, toque: false, largar: null, x0: 0, t0: 0, m: null, xa: 0, xb: 0, ta: 0, tb: 0, ta0: 0, semClique: 0, balanco: null, tRato: null, rx: -1, ry: -1 };
    el._rolo = r; rolos.push(r);
    criarAnimacao(r);
    var largar = function (ev) {
      if (r.id === null || ev.pointerId !== r.id) return;
      var levou = r.levou; r.id = null; r.levou = false; el.classList.remove('a-levar');
      // Depois de levar a faixa, ou de a segurar parada (um toque demorado), o toque que sobra não abre a fotografia.
      if (levou || ev.timeStamp - r.ta0 > 450) r.semClique = Date.now();
      if (levou) balanco(r); else soltar(r);
    };
    r.largar = largar;
    el.addEventListener('pointerdown', function (ev) {
      if (ev.pointerType === 'mouse' && ev.button !== 0) return;
      // Já havia um dedo (ou o rato) a segurar a faixa: um segundo dedo não conta. Mas se quem chega é o primeiro dedo, ou o rato,
      // o toque anterior acabou sem o browser avisar: esquece-se, para a faixa nunca ficar presa a um toque que já não existe.
      if (r.id !== null) { if (!ev.isPrimary) return; r.id = null; r.levou = false; el.classList.remove('a-levar'); }
      pararBalanco(r);
      var a = animacaoDe(r);
      r.id = ev.pointerId; r.toque = ev.pointerType === 'touch'; r.x0 = ev.clientX; r.levou = false; r.preso = true;
      r.t0 = a ? tempoDe(a) : 0; r.m = a ? medidasDe(r, a) : null;
      r.xa = r.xb = ev.clientX; r.ta = r.tb = r.ta0 = ev.timeStamp;
      acertarRolo(r);
    });
    el.addEventListener('pointermove', function (ev) {
      if (ev.pointerId !== r.id || !r.m) return;
      var dx = ev.clientX - r.x0;
      if (!r.levou) { if (Math.abs(dx) < 8) return; r.levou = true; el.classList.add('a-levar'); try { el.setPointerCapture(ev.pointerId); } catch (e) {} }
      r.xa = r.xb; r.ta = r.tb; r.xb = ev.clientX; r.tb = ev.timeStamp;
      var a = animacaoDe(r); if (!a) return;
      try { a.currentTime = mod(r.t0 - dx / r.m.per * r.m.dur, r.m.dur); } catch (e) {}
    });
    el.addEventListener('pointerup', largar);
    el.addEventListener('pointercancel', largar);
    el.addEventListener('click', function (ev) { if (Date.now() - r.semClique < 450) { ev.preventDefault(); ev.stopPropagation(); } }, true);
    el.addEventListener('dragstart', function (ev) { ev.preventDefault(); });
    el.addEventListener('wheel', function (ev) {
      if (Math.abs(ev.deltaX) <= Math.abs(ev.deltaY) || Math.abs(ev.deltaX) < 2) return;
      var a = animacaoDe(r), m = a ? medidasDe(r, a) : null; if (!m) return;
      ev.preventDefault();
      try { a.currentTime = mod(tempoDe(a) + (ev.deltaMode === 1 ? ev.deltaX * 32 : ev.deltaX) / m.per * m.dur, m.dur); } catch (e) {}
    }, { passive: false });
    if (comRato) {                                        // num ecrã de toque um toque também «entra» e nunca mais «sai»
      el.addEventListener('mousemove', function (ev) {
        if (ev.clientX === r.rx && ev.clientY === r.ry) return;   // a página a rolar por baixo do rato parado não conta
        r.rx = ev.clientX; r.ry = ev.clientY;
        clearTimeout(r.tRato); r.tRato = setTimeout(function () { r.rato = false; acertarRolo(r); }, 1400);
        if (!r.rato) { r.rato = true; acertarRolo(r); }
      });
      el.addEventListener('mouseleave', function () { clearTimeout(r.tRato); r.rx = r.ry = -1; if (r.rato) { r.rato = false; acertarRolo(r); } });
    }
    // Com o teclado (a tecla Tab): a fotografia que recebe o foco vem para a frente e a faixa espera enquanto o foco lá estiver.
    // O foco que volta sozinho a uma fotografia (ao fechar a fotografia em grande) não conta: a faixa continua a andar.
    el.addEventListener('focusin', function (ev) {
      var b = ev.target;
      if (!b || !b.closest || Date.now() - ultimoTab > 700) return;
      r.foco = true; acertarRolo(r);
      var a = animacaoDe(r), m = a ? medidasDe(r, a) : null, item = b.closest('.rolo-item'); if (!m || !item) return;
      // (a primeira fotografia fica encostada à esquerda: com a margem de 16 px seria a sua cópia, na segunda série, a ficar à vista)
      try { a.currentTime = mod(Math.max(0, item.getBoundingClientRect().left - pista.getBoundingClientRect().left - 16) / m.per * m.dur, m.dur); } catch (e) {}
    });
    el.addEventListener('focusout', function () { if (r.foco) { r.foco = false; acertarRolo(r); } });
  }
  function rolar() {
    $$('[data-rolo]').forEach(umRolo);
    if (!rolos.length) return;
    largarSempre();
    // Ao rodar o telemóvel (ou mudar a largura da janela) a folha de estilos pode pedir outra duração: acerta-se sem saltar.
    var largura = window.innerWidth;
    window.addEventListener('resize', function () {
      if (window.innerWidth === largura) return;          // no iPhone a barra do Safari muda a altura a cada rolagem: isso não conta
      largura = window.innerWidth;
      rolos.forEach(function (r) {
        var a = r.anim; if (!a) return;
        var nova = duracaoCss(r.pista), velha = r.dur || 0;
        if (!(nova > 0) || !(velha > 0) || Math.abs(nova - velha) < 1) return;
        try { var p = a.currentTime === null ? null : tempoDe(a) / velha; a.effect.updateTiming({ duration: nova }); r.dur = nova; if (p !== null) a.currentTime = p * nova; } catch (e) {}
      });
    });
    if (!('IntersectionObserver' in window)) return;
    // Perto do ecrã (a menos de um ecrã de distância): anda. Longe: parada, sem camadas, de volta à primeira fotografia.
    var ioPerto = new IntersectionObserver(function (ens) {
      ens.forEach(function (en) {
        var r = en.target._rolo; if (!r) return;
        r.perto = en.isIntersecting;
        if (r.perto) { r.el.classList.remove('longe'); r.el.classList.remove('parado'); }
        else { pararBalanco(r); r.id = null; r.preso = false; r.levou = false; r.rato = false; r.el.classList.remove('a-levar'); r.el.classList.add('longe'); }
        acertarRolo(r);
      });
    }, { rootMargin: '100% 0px 100% 0px', threshold: 0 });
    // A dois ecrãs de distância as fotografias que faltam começam a carregar, para chegarem antes de a faixa se ver.
    var ioFotos = new IntersectionObserver(function (ens) {
      ens.forEach(function (en) {
        if (!en.isIntersecting) return;
        $$('img[loading="lazy"]', en.target).forEach(function (im) { im.setAttribute('loading', 'eager'); });
        ioFotos.unobserve(en.target);
      });
    }, { rootMargin: '200% 0px 200% 0px', threshold: 0 });
    rolos.forEach(function (r) { ioPerto.observe(r.el); ioFotos.observe(r.el); });
  }
  /* Uma faixa nunca fica presa: o rato pode largar o botão fora dela, e um telemóvel pode acabar um toque sem avisar a faixa
     (um gesto do sistema, uma chamada, a mudança de aplicação). Tudo o que acaba um toque, em qualquer sítio, larga-a. */
  function largarSempre() {
    var desistir = function (r) {                         // o toque acabou sem aviso: larga, sem balanço
      if (r.id === null) return;
      if (r.levou) r.semClique = Date.now();
      r.id = null; r.levou = false; r.el.classList.remove('a-levar'); soltar(r);
    };
    var fim = function (ev) { rolos.forEach(function (r) { if (r.id !== null && r.id === ev.pointerId && r.largar) r.largar(ev); }); };
    window.addEventListener('pointerup', fim, true);
    window.addEventListener('pointercancel', fim, true);
    var semDedos = function (ev) { if (!ev.touches || !ev.touches.length) rolos.forEach(function (r) { if (r.toque) desistir(r); }); };
    window.addEventListener('touchend', semDedos, { passive: true });
    window.addEventListener('touchcancel', semDedos, { passive: true });
    window.addEventListener('blur', function () { rolos.forEach(desistir); });
    d.addEventListener('visibilitychange', function () { if (d.hidden) rolos.forEach(desistir); });
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

  /* ---- Álbuns da galeria (separadores) e «Ver todas» ----
     Na página cada álbum mostra só as primeiras (versão 6); «Ver todas as fotografias» abre o álbum escolhido inteiro, por cima da
     página (#album-ecra, uma camada como o menu). Ao fechar, a página está onde estava. As fotografias abrem-se em grande como sempre. */
  function albuns() {
    var seps = $$('.separador');
    seps.forEach(function (sep) {
      sep.addEventListener('click', function () {
        seps.forEach(function (x) { x.classList.remove('ativo'); x.setAttribute('aria-selected', 'false'); });
        $$('.passear .album').forEach(function (a) { a.classList.add('escondido'); });
        sep.classList.add('ativo'); sep.setAttribute('aria-selected', 'true');
        var alvo = d.getElementById(sep.getAttribute('aria-controls')); if (alvo) alvo.classList.remove('escondido');
      });
    });
    var ver = $('#ver-todas'), ecra = $('#album-ecra'), lista = $('#album-ecra-lista'), titulo = $('#album-ecra-titulo');
    if (!ver || !ecra || !lista) return;
    ver.addEventListener('click', function () {
      var atual = $('.passear .album:not(.escondido)'); if (!atual) return;
      var copia = atual.cloneNode(true);
      ['id', 'role', 'aria-labelledby'].forEach(function (a) { copia.removeAttribute(a); });
      copia.classList.remove('album-curto', 'escondido');
      lista.innerHTML = ''; lista.appendChild(copia);
      var corpo = $('#album-ecra-corpo'); if (corpo) corpo.scrollTop = 0;
      var sep = $('.separador.ativo');
      if (titulo && sep && sep.firstChild) titulo.textContent = (sep.firstChild.textContent || '').trim() || titulo.textContent;
      abrir('album-ecra');
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
     As frases estão todas no HTML (conteudo.php); aqui só se troca a que está à vista. Por baixo, as setas e um traço por frase
     (versão 6; Diogo, 18/11/2026: «… saberem que há mais avaliações e que quem visita pode ver mais»): o traço da frase à vista
     enche-se em 6 segundos e, quando acaba, vem a seguinte; para enquanto a secção não está no ecrã, com o rato em cima ou com uma
     camada aberta. As setas, um toque na frase e o dedo para o lado passam-na. As avaliações publicadas na app (porta #192), quando
     existirem e forem curtas, juntam-se à roda, cada uma com o seu traço. Com «reduzir movimento», o traço não se enche: a roda anda
     com um relógio simples, de 6 em 6 segundos. */
  function frases() {
    var lista = $('#citacoes'); if (!lista) return;
    var cits = $$('.citacao', lista), ci = 0, vista = !('IntersectionObserver' in window), quieta = false, relogio = null;
    var passar = $('#citacoes-passar'), tracos = passar ? $('.citacoes-tracos', passar) : null;
    var porTraco = !!(tracos && !reduz);
    var marcar = function () {
      if (!tracos) return;
      var t = $$('li', tracos);
      for (var k = 0; k < t.length; k++) { t[k].classList.remove('ativo'); if (k < ci) t[k].classList.add('lida'); else t[k].classList.remove('lida'); }
      if (t[ci]) { void t[ci].offsetWidth; t[ci].classList.add('ativo'); }     // o traço volta a encher-se do princípio
    };
    var parada = function () { return !vista || quieta || d.hidden || abertas.length > 0; };
    frasesAcertar = function () { if (passar) { if (parada()) passar.classList.add('quieta'); else passar.classList.remove('quieta'); } };
    var ir = function (n) { if (cits.length < 2) return; cits[ci].classList.remove('ativa'); ci = (n + cits.length) % cits.length; cits[ci].classList.add('ativa'); marcar(); };
    var arrancar = function () { clearInterval(relogio); if (porTraco) return; relogio = setInterval(function () { if (!parada()) ir(ci + 1); }, 6000); };
    if (porTraco) tracos.addEventListener('animationend', function (ev) { if (ev.animationName === 'traco-enche' && ev.target.parentNode && ev.target.parentNode.classList.contains('ativo')) ir(ci + 1); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { vista = en[0].isIntersecting; frasesAcertar(); }, { threshold: 0.3 }).observe(lista);
    d.addEventListener('visibilitychange', frasesAcertar);
    lista.addEventListener('click', function () { ir(ci + 1); arrancar(); });
    if (passar) passar.addEventListener('click', function (ev) {
      var b = ev.target && ev.target.closest ? ev.target.closest('.citacoes-seta') : null; if (!b) return;
      ir(ci + (parseInt(b.getAttribute('data-passo'), 10) < 0 ? -1 : 1)); arrancar();
    });
    // O dedo para o lado, em cima da frase, passa-a (para cima e para baixo continua a rolar a página).
    var x0 = null, y0 = null;
    lista.addEventListener('touchstart', function (ev) { if (ev.touches.length === 1) { x0 = ev.touches[0].clientX; y0 = ev.touches[0].clientY; } else x0 = null; }, { passive: true });
    lista.addEventListener('touchend', function (ev) {
      if (x0 === null || !ev.changedTouches || !ev.changedTouches.length) return;
      var dx = ev.changedTouches[0].clientX - x0, dy = ev.changedTouches[0].clientY - y0; x0 = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) { ir(ci + (dx < 0 ? 1 : -1)); arrancar(); if (ev.cancelable) ev.preventDefault(); }
    });
    if (comRato) {                                              // só com rato: num ecrã de toque um toque «entra» e nunca mais «sai»
      lista.addEventListener('mouseenter', function () { quieta = true; frasesAcertar(); });
      lista.addEventListener('mouseleave', function () { quieta = false; frasesAcertar(); });
    }
    frasesAcertar();
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
        if (tracos) { var tr = d.createElement('li'); tr.appendChild(d.createElement('span')); tracos.appendChild(tr); }
      });
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
      var e = elEntrada.value, s = elSaida.value, pax = elPax.value;   // vazio até a pessoa escolher (a conta não depende dele)
      desenharMeses();
      if (!e || !s) { contaFrase(txt('conta_vazia', 'Escolham a chegada e a partida.')); elAvisos.innerHTML = ''; formPedido.hidden = true; ultimaConta = null; mostrarProximos(); return; }
      contaFrase(txt('conta_calcular', 'A fazer as contas…'));
      clearTimeout(temporizador);
      temporizador = setTimeout(function () {
        fetch('api/tarifa.php?entrada=' + e + '&saida=' + s + (pax ? '&pax=' + pax : '')).then(function (r) { return r.json(); }).then(mostrarConta).catch(function () {
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
      var pessoas = elPax.value ? ', ' + elPax.value + ' ' + (elPax.value === '1' ? 'pessoa' : 'pessoas') : '';
      var t = 'Olá Diogo, gostávamos de ficar no Monte Casa Branca de ' + fmtData(R.entrada) + ' a ' + fmtData(R.saida) + ' (' + R.noites + ' noites' + pessoas + ').';
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
      if (!elPax.value) { est.className = 'pedido-estado erro'; est.textContent = txt('falta_pessoas', 'Digam-nos quantas pessoas vêm.'); try { elPax.focus(); } catch (e) {} return; }
      if (!f.nome.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.value.trim())) { est.className = 'pedido-estado erro'; est.textContent = 'Digam-nos o vosso nome e um email válido.'; return; }
      btn.disabled = true; est.className = 'pedido-estado'; est.textContent = 'A enviar…';
      var pedido = { nome: f.nome.value.trim(), email: f.email.value.trim(), telefone: f.telefone.value.trim() || undefined, mensagem: f.mensagem.value.trim() || undefined,
        entrada: R.entrada, saida: R.saida, pax: +elPax.value, preco_mostrado: R.total, lingua: 'pt', origem: 'inicio',
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
  seguro('capa', capa);
  seguro('fotografias que passam devagar', passar);
  seguro('voltar onde estava', voltar);
  seguro('revelar', revelar);
  seguro('barra de baixo', barra);
  seguro('pílula', pilula);
  seguro('rolos de fotografias', rolar);
  seguro('camadas', camadas);
  seguro('álbuns', albuns);
  seguro('fotografia', fotografia);
  seguro('frases', frases);
  seguro('painel das datas', painel);
})();
