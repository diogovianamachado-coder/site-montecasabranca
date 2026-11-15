/* Monte Casa Branca · interação (JavaScript nativo, sem dependências).
   Blocos: ligações internas sem deixar «#» no endereço · revelar ao rolar · paralaxe da capa · dock · rolos de fotografias ·
   camadas (menu, painel, fotografia) · álbuns · galeria · frases de quem já ficou · painel das datas (calendário via
   api/ocupacao.php, conta via api/tarifa.php, tempo via api/tempo.php, pedido via api/prereserva.php). */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var abertas = []; // camadas abertas (menu, painel, fotografia) — declarada aqui porque vários blocos a leem no arranque
  var T = {}; try { T = JSON.parse(($('#textos') || {}).textContent || '{}'); } catch (e) { T = {}; } // textos do painel (conteudo.php)
  function txt(k, alt) { return T[k] || alt || ''; }

  /* ---- Ligações internas: rolam até à secção sem deixar «#secção» no endereço ----
     Com «#…» no endereço, o browser saltava para essa secção sempre que a página abria ou era recarregada. */
  document.addEventListener('click', function (ev) {
    if (ev.defaultPrevented || !ev.target.closest) return;
    var a = ev.target.closest('a[href^="#"]'); if (!a) return;
    var h = a.getAttribute('href'); if (h.length < 2) return;
    var alvo = document.getElementById(h.slice(1)); if (!alvo) return;
    ev.preventDefault();
    if (a.closest('#menu')) fechar('menu');
    alvo.scrollIntoView({ behavior: reduzMovimento ? 'auto' : 'smooth', block: 'start' });
    if (ev.detail === 0) { if (!alvo.hasAttribute('tabindex')) alvo.setAttribute('tabindex', '-1'); alvo.focus({ preventScroll: true }); } // veio do teclado
  });
  // Uma ligação partilhada (…/#galeria) ainda leva à secção; depois o endereço fica limpo. Um «#…» de uma secção que já não
  // existe (o antigo «#casa», que o browser pode ter guardado) não leva a lado nenhum: a página abre na capa.
  var limparEndereco = function () { if (location.hash && history.replaceState) setTimeout(function () { history.replaceState(null, '', location.pathname + location.search); }, 50); };
  if (location.hash) window.addEventListener('load', limparEndereco);
  window.addEventListener('hashchange', limparEndereco);

  /* ---- Revelar ao rolar ---- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduzMovimento) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else { reveals.forEach(function (el) { el.classList.add('is-in'); }); }

  /* ---- Paralaxe da capa ---- */
  var heroFoto = $('#hero-foto');
  if (heroFoto && !reduzMovimento) {
    var paralaxe = function () { if (window.scrollY < window.innerHeight) heroFoto.style.transform = 'translateY(' + (window.scrollY * 0.25) + 'px)'; };
    paralaxe(); window.addEventListener('scroll', paralaxe, { passive: true });
  }

  /* ---- Dock: aparece quando a capa sai do ecrã ---- */
  var dock = $('#dock'), inicio = $('#inicio');
  if (dock && inicio && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { var fora = !en[0].isIntersecting; dock.classList.toggle('visivel', fora); dock.setAttribute('aria-hidden', fora ? 'false' : 'true'); }, { threshold: 0.05 }).observe(inicio);
  } else if (dock) { dock.classList.add('visivel'); }

  /* ---- Botão «descer» no telemóvel: fixo, salta para a secção seguinte; no fim volta ao topo ---- */
  var descer = $('.hero-descer'), movel = window.matchMedia('(max-width: 767px)');
  if (descer) {
    var seccoes = function () { return $$('#inicio, main > section, #contactos').filter(function (s) { return s.offsetHeight > 0; }); };
    descer.addEventListener('click', function (ev) {
      if (!movel.matches) return;
      ev.preventDefault();
      if (descer.classList.contains('topo')) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      var y = window.scrollY + 8, alvo = null;
      seccoes().some(function (s) { var top = s.getBoundingClientRect().top + window.scrollY; if (top > y + 40) { alvo = s; return true; } return false; });
      if (alvo) alvo.scrollIntoView({ behavior: 'smooth', block: 'start' }); else window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
    var estadoDescer = function () {
      if (!movel.matches) { descer.classList.remove('topo'); descer.setAttribute('aria-label', 'Descer para a secção seguinte'); return; }
      var fim = window.scrollY + window.innerHeight >= document.body.scrollHeight - 120;
      descer.classList.toggle('topo', fim); descer.setAttribute('aria-label', fim ? 'Voltar ao topo' : 'Descer para a secção seguinte');
      var aberto = abertas.length > 0; descer.style.visibility = aberto ? 'hidden' : '';
    };
    window.addEventListener('scroll', estadoDescer, { passive: true }); estadoDescer();
  }

  /* ---- Rolos: fotografias lado a lado que rolam devagar e em círculo ----
     Andam sozinhas enquanto estão à vista. O dedo ou o rato mandam: arrastar acelera, premir pára; ao largar, retomam passados
     2,5 s. Sem setas, pontos nem contagens: o movimento mostra que há mais. Com «reduzir movimento» ligado ficam paradas
     (continuam a deixar-se arrastar). A régua (data-acaso) sai por ordem diferente em cada visita. */
  var rolos = [];
  function baralhar(v) { for (var i = v.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = v[i]; v[i] = v[j]; v[j] = t; } return v; }
  $$('[data-rolo]').forEach(function (el) {
    var faixa = $('.rolo-faixa', el); if (!faixa) return;
    var itens = $$('.rolo-item', faixa); if (itens.length < 2) return;
    if (el.hasAttribute('data-acaso')) baralhar(itens).forEach(function (li) { faixa.appendChild(li); });
    var r = { faixa: faixa, vel: (parseFloat(el.getAttribute('data-vel')) || 22) / 1000, visivel: false, aMexer: false, foco: false, pausaAte: 0, pos: 0, meio: 0, pronto: false, acertar: true };
    r.medir = function () { var c = faixa.children[itens.length]; r.meio = c ? c.offsetLeft - itens[0].offsetLeft : 0; };
    r.preparar = function () { // duplica as fotografias uma vez, para a volta não ter costura
      if (r.pronto || reduzMovimento) return; r.pronto = true;
      itens.forEach(function (li) { var c = li.cloneNode(true); c.setAttribute('aria-hidden', 'true'); $$('button, a', c).forEach(function (b) { b.tabIndex = -1; }); faixa.appendChild(c); });
      r.medir();
    };
    r.parar = function (ms) { r.pausaAte = performance.now() + ms; r.acertar = true; };
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { r.visivel = en[0].isIntersecting; if (r.visivel) r.preparar(); }, { threshold: 0.15 }).observe(el);
    else { r.visivel = true; r.preparar(); }
    // dedo
    faixa.addEventListener('touchstart', function () { r.aMexer = true; }, { passive: true });
    ['touchend', 'touchcancel'].forEach(function (n) { faixa.addEventListener(n, function () { r.aMexer = false; r.parar(2500); }, { passive: true }); });
    // roda do rato ou trackpad, na horizontal
    faixa.addEventListener('wheel', function (ev) { if (Math.abs(ev.deltaX) > Math.abs(ev.deltaY)) r.parar(2500); }, { passive: true });
    // rato: premir pára, arrastar move, largar retoma
    var x0 = null, s0 = 0, arrastou = false;
    faixa.addEventListener('mousedown', function (ev) { if (ev.button !== 0) return; x0 = ev.pageX; s0 = faixa.scrollLeft; arrastou = false; r.aMexer = true; });
    window.addEventListener('mousemove', function (ev) { if (x0 === null) return; var dx = ev.pageX - x0; if (Math.abs(dx) > 4) { arrastou = true; faixa.classList.add('a-arrastar'); faixa.scrollLeft = s0 - dx; ev.preventDefault(); } });
    window.addEventListener('mouseup', function () { if (x0 === null) return; x0 = null; faixa.classList.remove('a-arrastar'); r.aMexer = false; r.parar(2500); });
    faixa.addEventListener('click', function (ev) { if (arrastou) { arrastou = false; ev.stopPropagation(); ev.preventDefault(); } }, true); // arrastar não abre a fotografia
    // teclado: com o foco lá dentro, não se mexe (só o foco do teclado conta; o do rato, ao clicar ou arrastar, não prende o rolo)
    faixa.addEventListener('focusin', function (ev) { var v = false; try { v = ev.target.matches(':focus-visible'); } catch (e) { v = false; } r.foco = v; });
    faixa.addEventListener('focusout', function () { r.foco = false; r.parar(1500); });
    // quando é a pessoa a rolar, a volta fecha-se aqui
    faixa.addEventListener('scroll', function () { if (r.meio && !r.aMexer && faixa.scrollLeft >= r.meio) faixa.scrollLeft -= r.meio; }, { passive: true });
    rolos.push(r);
  });
  if (rolos.length && !reduzMovimento) {
    var tAnterior = 0;
    var passoRolos = function (t) {
      var dt = tAnterior ? Math.min(t - tAnterior, 50) : 16; tAnterior = t;
      if (!abertas.length && !document.hidden) rolos.forEach(function (r) {
        if (!r.visivel || !r.meio || r.aMexer || r.foco || t < r.pausaAte) return;
        if (r.acertar) { r.pos = r.faixa.scrollLeft; r.acertar = false; }
        r.pos += dt * r.vel; if (r.pos >= r.meio) r.pos -= r.meio;
        r.faixa.scrollLeft = r.pos;
      });
      requestAnimationFrame(passoRolos);
    };
    requestAnimationFrame(passoRolos);
    window.addEventListener('resize', function () { rolos.forEach(function (r) { if (r.pronto) { r.medir(); r.acertar = true; } }); });
  }

  /* ---- Camadas (menu, painel, fotografia): abrir/fechar, Escape, scroll bloqueado ---- */
  function abrir(id) { var el = $('#' + id); if (!el) return; el.hidden = false; abertas.push(id); document.body.classList.add('sem-scroll'); var f = $('button, a, input', el); if (f && id !== 'galeria-ecra') setTimeout(function () { f.focus(); }, 50); }
  function fechar(id) { var el = $('#' + id); if (!el) return; el.hidden = true; abertas = abertas.filter(function (x) { return x !== id; }); if (!abertas.length) document.body.classList.remove('sem-scroll'); }
  $$('[data-fechar]').forEach(function (b) { b.addEventListener('click', function () { fechar(b.getAttribute('data-fechar')); }); });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && abertas.length) fechar(abertas[abertas.length - 1]);
    if (!$('#galeria-ecra').hidden) { if (ev.key === 'ArrowRight') galeriaIr(1); if (ev.key === 'ArrowLeft') galeriaIr(-1); }
  });
  var abrirMenu = $('#abrir-menu'); if (abrirMenu) abrirMenu.addEventListener('click', function () { abrir('menu'); });
  var abrirDisp = $('#abrir-disponibilidade'); if (abrirDisp) abrirDisp.addEventListener('click', function () { abrir('disponibilidade'); arrancarPainel(); });
  var painelFundo = $('#disponibilidade'); if (painelFundo) painelFundo.addEventListener('click', function (ev) { if (ev.target === painelFundo) fechar('disponibilidade'); });

  /* ---- Álbuns da galeria (separadores) ---- */
  $$('.separador').forEach(function (sep) {
    sep.addEventListener('click', function () {
      $$('.separador').forEach(function (s) { s.classList.remove('ativo'); s.setAttribute('aria-selected', 'false'); });
      $$('.album').forEach(function (a) { a.classList.add('escondido'); });
      sep.classList.add('ativo'); sep.setAttribute('aria-selected', 'true');
      var alvo = $('#' + sep.getAttribute('aria-controls')); if (alvo) alvo.classList.remove('escondido');
    });
  });

  /* ---- Fotografia em ecrã inteiro ----
     Os dados de cada conjunto vão uma vez, em data-galeria, no elemento que envolve as fotografias; o botão só diz a posição. */
  var gal = { fotos: [], i: 0, nome: '' }, galImg = $('#galeria-img'), galCont = $('#galeria-contador'), galLeg = $('#galeria-legenda');
  function galeriaMostrar() {
    var f = gal.fotos[gal.i]; if (!f) return;
    galImg.style.opacity = '0'; galImg.src = f.src; galImg.alt = f.alt || '';
    galImg.onload = function () { galImg.style.opacity = '1'; };
    galCont.textContent = gal.nome + ' · ' + (gal.i + 1) + ' / ' + gal.fotos.length; galLeg.textContent = f.alt || '';
    $('#galeria-antes').disabled = gal.i === 0; $('#galeria-depois').disabled = gal.i >= gal.fotos.length - 1;
  }
  function galeriaIr(d) { var n = gal.i + d; if (n < 0 || n >= gal.fotos.length) return; gal.i = n; galeriaMostrar(); }
  document.addEventListener('click', function (ev) {
    if (!ev.target.closest) return;
    var b = ev.target.closest('.abrir-galeria'); if (!b) return;
    var dono = b.closest('[data-galeria]'); if (!dono) return;
    try { var d = JSON.parse(dono.getAttribute('data-galeria')); gal.fotos = d.fotos; gal.nome = d.nome; } catch (e) { return; }
    gal.i = parseInt(b.getAttribute('data-inicio') || '0', 10) || 0;
    abrir('galeria-ecra'); galeriaMostrar();
  });
  $('#galeria-antes').addEventListener('click', function () { galeriaIr(-1); });
  $('#galeria-depois').addEventListener('click', function () { galeriaIr(1); });
  var toqueX = null, galEl = $('#galeria-ecra');
  galEl.addEventListener('touchstart', function (ev) { toqueX = ev.touches[0].clientX; }, { passive: true });
  galEl.addEventListener('touchend', function (ev) { if (toqueX == null) return; var dx = ev.changedTouches[0].clientX - toqueX; if (Math.abs(dx) > 40) galeriaIr(dx < 0 ? 1 : -1); toqueX = null; });

  /* ---- Datas ---- */
  function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function deIso(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2], 12); }
  function addDias(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function hoje() { var h = new Date(); h.setHours(12, 0, 0, 0); return h; }
  var MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  var DIAS_CURTOS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  function fmtData(s) { var d = deIso(s); return d.getDate() + ' de ' + MESES[d.getMonth()].toLowerCase() + ' de ' + d.getFullYear(); }
  function euros(v) { var n = Math.round(v * 100) / 100; var s = (Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ',')); return s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' €'; }

  /* ---- Quem já ficou: uma frase de cada vez ----
     As frases estão todas no HTML (conteudo.php); aqui só se troca a que está à vista, de 6 em 6 segundos enquanto a secção está no
     ecrã. Um toque passa à seguinte. As avaliações publicadas na app (porta #192), quando existirem e forem curtas, juntam-se à roda. */
  var citLista = $('#citacoes');
  if (citLista) {
    var cits = $$('.citacao', citLista), ci = 0, citVista = !('IntersectionObserver' in window), citQuieta = false, citRelogio = null;
    var citIr = function (n) { if (cits.length < 2) return; cits[ci].classList.remove('ativa'); ci = (n + cits.length) % cits.length; cits[ci].classList.add('ativa'); };
    var citArrancar = function () { clearInterval(citRelogio); if (reduzMovimento) return; citRelogio = setInterval(function () { if (citVista && !citQuieta && !document.hidden && !abertas.length) citIr(ci + 1); }, 6000); };
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { citVista = en[0].isIntersecting; }, { threshold: 0.3 }).observe(citLista);
    citLista.addEventListener('click', function () { citIr(ci + 1); citArrancar(); });
    citLista.addEventListener('mouseenter', function () { citQuieta = true; });
    citLista.addEventListener('mouseleave', function () { citQuieta = false; });
    citArrancar();
    fetch('api/avaliacoes.php').then(function (r) { return r.json(); }).then(function (j) {
      (j && j.avaliacoes || []).forEach(function (a) {
        var t = (a.texto || '').trim(); if (!t || t.length > 160) return;
        var li = document.createElement('li'); li.className = 'citacao';
        var bq = document.createElement('blockquote'); bq.className = 'serif'; bq.textContent = t.replace(/[.!\s]+$/, '');
        var p = document.createElement('p'); p.className = 'citacao-origem';
        var m = /^(\d{4})-(\d{2})/.exec(a.mes || '');
        p.textContent = 'Opinião de quem ficou' + (m ? ' · ' + MESES[+m[2] - 1].toLowerCase() + ' de ' + m[1] : '');
        li.appendChild(bq); li.appendChild(p); citLista.appendChild(li); cits.push(li);
      });
    }).catch(function () {});
  }

  /* ---- Painel das datas: calendário + conta + tempo + pedido ---- */
  var painelArrancado = false, ocupadas = {}, ocupacaoExemplo = false, semApp = false, mesBase = new Date(hoje().getFullYear(), hoje().getMonth(), 1), ultimaConta = null, inicioPreenchimento = null;
  var elEntrada = $('#entrada'), elSaida = $('#saida'), elPax = $('#pax'), elConta = $('#conta'), elAvisos = $('#avisos'), formPedido = $('#form-pedido');

  function arrancarPainel() {
    if (painelArrancado) return; painelArrancado = true;
    var h = hoje(); elEntrada.min = iso(h); elSaida.min = iso(addDias(h, 1));
    desenharMeses();
    fetch('api/ocupacao.php').then(function (r) { return r.json(); }).then(function (o) {
      ocupadas = {}; (o.ocupado || []).forEach(function (iv) { var d = deIso(iv.de), fim = deIso(iv.ate); while (d < fim) { ocupadas[iso(d)] = true; d = addDias(d, 1); } });
      ocupacaoExemplo = !!o.exemplo; semApp = o.app === false && !o.exemplo;
      if (o.exemplo) $('#cal-nota').textContent = txt('nota_exemplo');
      else if (semApp) $('#cal-nota').textContent = txt('nota_sem_calendario');
      desenharMeses();
    }).catch(function () { semApp = true; $('#cal-nota').textContent = txt('nota_sem_calendario'); desenharMeses(); });
    fetch('api/tempo.php').then(function (r) { return r.json(); }).then(function (j) { tempoProximos = (j && j.dias) || []; if (!ultimaConta) mostrarProximos(); }).catch(function () {});
  }

  function desenharMeses() {
    var cont = $('#meses'); cont.innerHTML = '';
    var h = iso(hoje()), e = elEntrada.value, s = elSaida.value;
    for (var k = 0; k < 2; k++) {
      var m = new Date(mesBase.getFullYear(), mesBase.getMonth() + k, 1);
      var bloco = document.createElement('div');
      var nome = document.createElement('p'); nome.className = 'mes-nome'; nome.textContent = MESES[m.getMonth()] + ' ' + m.getFullYear(); bloco.appendChild(nome);
      var sem = document.createElement('div'); sem.className = 'semana'; ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].forEach(function (l) { var sp = document.createElement('span'); sp.textContent = l; sem.appendChild(sp); }); bloco.appendChild(sem);
      var dias = document.createElement('div'); dias.className = 'dias';
      var vazios = (m.getDay() + 6) % 7; for (var v = 0; v < vazios; v++) { var sp = document.createElement('span'); sp.className = 'vazio'; dias.appendChild(sp); }
      var n = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
      for (var d = 1; d <= n; d++) {
        var data = iso(new Date(m.getFullYear(), m.getMonth(), d, 12)), b = document.createElement('button'); b.type = 'button'; b.textContent = String(d); b.setAttribute('data-dia', data);
        if (data < h) { b.className = 'passado'; b.disabled = true; }
        else if (ocupadas[data]) { b.className = 'ocupado'; b.setAttribute('aria-label', d + ', ocupado'); b.disabled = true; }
        else { b.setAttribute('aria-label', d + (semApp ? ', por confirmar' : ', livre')); if (semApp) b.classList.add('incerto'); b.addEventListener('click', escolherDia); }
        if (data === e || data === s) b.classList.add('escolhido'); else if (e && s && data > e && data < s) b.classList.add('entre');
        dias.appendChild(b);
      }
      bloco.appendChild(dias); cont.appendChild(bloco);
    }
    $('#cal-antes').disabled = mesBase <= new Date(hoje().getFullYear(), hoje().getMonth(), 1);
  }
  function escolherDia() {
    var d = this.getAttribute('data-dia'), e = elEntrada.value, s = elSaida.value;
    if (!e || (e && s) || d <= e) { elEntrada.value = d; elSaida.value = ''; }
    else { elSaida.value = d; }
    desenharMeses(); calcular();
  }
  $('#cal-antes').addEventListener('click', function () { mesBase = new Date(mesBase.getFullYear(), mesBase.getMonth() - 2, 1); desenharMeses(); });
  $('#cal-depois').addEventListener('click', function () { mesBase = new Date(mesBase.getFullYear(), mesBase.getMonth() + 2, 1); desenharMeses(); });

  // A conta: ou uma frase (antes de haver datas, a calcular, quando não dá), ou as três linhas (estadia, limpeza, total da casa).
  function contaFrase(t, erro) {
    elConta.className = 'conta' + (erro ? ' erro' : ''); elConta.innerHTML = '';
    var p = document.createElement('p'); p.className = 'conta-msg' + (erro ? '' : ' serif'); p.textContent = t; elConta.appendChild(p);
  }
  function contaLinha(dl, rotulo, pormenor, valor, classe) {
    var div = document.createElement('div'); if (classe) div.className = classe;
    var dt = document.createElement('dt'); dt.textContent = rotulo;
    if (pormenor) { var sm = document.createElement('small'); sm.textContent = pormenor; dt.appendChild(sm); }
    var dd = document.createElement('dd'); dd.textContent = valor;
    div.appendChild(dt); div.appendChild(dd); dl.appendChild(div);
  }
  function aviso(t) { if (!t) return; var li = document.createElement('li'); li.textContent = t; elAvisos.appendChild(li); }

  var temporizador = null;
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
    var livre = true, d = deIso(R.entrada), fim = deIso(R.saida); while (d < fim) { if (ocupadas[iso(d)]) livre = false; d = addDias(d, 1); }
    if (!livre && !ocupacaoExemplo) { contaFrase(txt('conta_ocupado', 'Estas datas já estão ocupadas.'), true); formPedido.hidden = true; return; }
    var noites = R.noites + ' ' + (R.noites === 1 ? 'noite' : 'noites');
    var epocas = {}; (R.detalhe || []).forEach(function (x) { epocas[x.epoca] = true; });
    var pormenor = R.mensal ? 'preço mensal' : (Object.keys(epocas).length <= 1 ? euros(R.noite) + ' por noite' : 'duas épocas');
    var dormidas = (typeof R.dormidas === 'number') ? R.dormidas : (R.total - R.limpeza);
    elConta.className = 'conta'; elConta.innerHTML = '';
    var dl = document.createElement('dl'); dl.className = 'conta-linhas';
    contaLinha(dl, txt('linha_estadia', 'Estadia') + ' · ' + noites, pormenor, euros(dormidas));
    contaLinha(dl, txt('linha_limpeza', 'Limpeza final'), '', euros(R.limpeza));
    contaLinha(dl, txt('linha_total', 'Total da casa'), '', euros(R.total), 'conta-total');
    elConta.appendChild(dl);
    if (txt('depois_conta')) { var p = document.createElement('p'); p.className = 'conta-depois'; p.textContent = txt('depois_conta'); elConta.appendChild(p); }
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
    var wa = $('#pedido-whatsapp'), em = $('#pedido-email'), tel = (document.body.getAttribute('data-whatsapp') || '351962802626'), mail = (document.body.getAttribute('data-email') || 'geral@montecasabranca.pt');
    var ctWa = $('#contactos a[href^="https://wa.me/"]'); if (ctWa) tel = ctWa.getAttribute('href').replace('https://wa.me/', '');
    var ctEm = $('#contactos a[href^="mailto:"]'); if (ctEm) mail = ctEm.getAttribute('href').replace('mailto:', '');
    wa.href = 'https://wa.me/' + tel + '?text=' + encodeURIComponent(t);
    em.href = 'mailto:' + mail + '?subject=' + encodeURIComponent('Pedido de datas · ' + (R ? fmtData(R.entrada) + ' a ' + fmtData(R.saida) : '')) + '&body=' + encodeURIComponent(t);
  }
  ['change', 'input'].forEach(function (ev) { elEntrada.addEventListener(ev, calcular); elSaida.addEventListener(ev, calcular); elPax.addEventListener(ev, calcular); });
  formPedido.addEventListener('input', atualizarLigacoes);

  formPedido.addEventListener('submit', function (ev) { ev.preventDefault(); enviarPedido(false); });
  function enviarPedido(confirmoPreco) {
    var R = ultimaConta, est = $('#pedido-estado'), btn = $('#enviar-pedido'); if (!R || !R.ok) return;
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
          var conf = document.createElement('button'); conf.type = 'button'; conf.className = 'btn btn-primario pedido-confirmar'; conf.textContent = 'Confirmar ' + euros(res.preco_app);
          conf.addEventListener('click', function () { ultimaConta.total = res.preco_app; conf.remove(); enviarPedido(true); });
          est.appendChild(document.createElement('br')); est.appendChild(conf);
        }
        else { est.className = 'pedido-estado erro'; est.textContent = (res.mensagem || 'Não foi possível registar o pedido.') + ' Podem enviar-nos as datas por WhatsApp ou email.'; }
      })
      .catch(function () { btn.disabled = false; est.className = 'pedido-estado erro'; est.textContent = 'Não foi possível enviar agora. Usem o WhatsApp ou o email, por favor.'; });
  }

  /* ---- O tempo no Monte (Open-Meteo, pelo servidor) ----
     Sem datas escolhidas: os próximos dias. Com datas: os dias da estadia — a previsão para os que ela já alcança e, para os outros,
     a média dos últimos anos nesses mesmos dias (mais apagada), com uma frase a dizer qual é qual. Se o serviço falhar, o bloco some. */
  var tempoProximos = [], pedidoTempo = 0;
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
    var caixa = $('#tempo'), ul = $('#tempo-dias'); if (!caixa || !ul) return;
    if (!dias || !dias.length) { caixa.hidden = true; return; }
    ul.innerHTML = '';
    dias.forEach(function (d) {
      var li = document.createElement('li'), dt = deIso(d.dia), cl = classeTempo(d.codigo);
      if (d.tipo === 'media') li.className = 'media';
      li.innerHTML = '<span class="dia">' + DIAS_CURTOS[(dt.getDay() + 6) % 7] + (comDia ? ' ' + dt.getDate() : '') + '</span>'
        + '<span class="icone" role="img" aria-label="' + NOME_TEMPO[cl] + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICO[cl] + '</svg></span>'
        + '<span class="max">' + d.max + '°</span><span class="min">' + d.min + '°</span>';
      ul.appendChild(li);
    });
    $('#tempo-nota').textContent = nota || '';
    caixa.hidden = false;
  }
  function mostrarProximos() { desenharTempo(tempoProximos.slice(0, 7), false, txt('tempo_proximos')); }
  function tempoDaEstadia(e, s) {
    var meu = ++pedidoTempo;
    fetch('api/tempo.php?de=' + e + '&ate=' + s).then(function (r) { return r.json(); }).then(function (j) {
      if (meu !== pedidoTempo) return;                       // entretanto escolheram outras datas
      var dias = (j && j.dias) || []; if (!dias.length) { mostrarProximos(); return; }
      var medias = dias.filter(function (d) { return d.tipo === 'media'; }).length;
      desenharTempo(dias.slice(0, 14), true, medias === 0 ? txt('tempo_estadia') : (medias === dias.length ? txt('tempo_medias') : txt('tempo_misto')));
    }).catch(function () { if (meu === pedidoTempo) mostrarProximos(); });
  }
})();
