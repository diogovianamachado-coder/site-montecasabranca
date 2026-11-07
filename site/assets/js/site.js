/* Monte Casa Branca · interacção (JavaScript nativo, sem dependências).
   Blocos: revelar ao rolar · paralaxe da capa · dock · menu · álbuns · galeria · painel de disponibilidade
   (calendário via api/ocupacao.php, conta via api/tarifa.php, tempo via api/tempo.php, pedido via api/prereserva.php). */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var abertas = []; // camadas abertas (menu, painel, galeria) — declarada aqui porque o botão «descer» a lê no arranque

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
    var paralaxe = function () { if (window.scrollY < window.innerHeight) heroFoto.style.transform = 'translateY(' + (window.scrollY * 0.25) + 'px) scale(1.08)'; };
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

  /* ---- Régua de fotografias: no telemóvel corre devagar e em círculo; o dedo manda e, ao largar, retoma passados 3 s ---- */
  var regua = $('.regua');
  if (regua && !reduzMovimento) {
    var itens = $$('li', regua), duplicado = false, pausaAte = 0, aMexer = false, ultimoT = 0, visivel = false, meio = 0;
    function duplicar() { if (duplicado) return; duplicado = true; itens.forEach(function (li) { var c = li.cloneNode(true); c.setAttribute('aria-hidden', 'true'); $$('.abrir-galeria', c).forEach(function (b) { b.tabIndex = -1; b.addEventListener('click', function () { var d = JSON.parse(b.getAttribute('data-galeria')); gal.fotos = d.fotos; gal.nome = d.nome; gal.i = parseInt(b.getAttribute('data-inicio') || '0', 10) || 0; abrir('galeria'); galeriaMostrar(); }); }); regua.appendChild(c); }); meio = regua.scrollWidth / 2; }
    function passo(t) {
      if (movel.matches && visivel && !aMexer && t > pausaAte && !abertas.length) {
        var dt = ultimoT ? Math.min(t - ultimoT, 50) : 16; regua.scrollLeft += dt * 0.025;
        if (meio && regua.scrollLeft >= meio) regua.scrollLeft -= meio;
      }
      ultimoT = t; requestAnimationFrame(passo);
    }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visivel = en[0].isIntersecting; if (visivel && movel.matches) duplicar(); }, { threshold: 0.2 }).observe(regua); else { visivel = true; if (movel.matches) duplicar(); }
    regua.addEventListener('touchstart', function () { aMexer = true; }, { passive: true });
    regua.addEventListener('touchend', function () { aMexer = false; pausaAte = performance.now() + 3000; }, { passive: true });
    regua.addEventListener('scroll', function () { if (!aMexer && movel.matches && meio && regua.scrollLeft >= meio) regua.scrollLeft -= meio; }, { passive: true });
    // Arrastar com o rato (desktop/tablet com rato)
    var ratoX = null, ratoScroll = 0;
    regua.addEventListener('mousedown', function (ev) { ratoX = ev.pageX; ratoScroll = regua.scrollLeft; regua.classList.add('a-arrastar'); aMexer = true; });
    window.addEventListener('mouseup', function () { if (ratoX === null) return; ratoX = null; regua.classList.remove('a-arrastar'); aMexer = false; pausaAte = performance.now() + 3000; });
    window.addEventListener('mousemove', function (ev) { if (ratoX === null) return; var dx = ev.pageX - ratoX; if (Math.abs(dx) > 3) { regua.scrollLeft = ratoScroll - dx; ev.preventDefault(); } });
    regua.addEventListener('click', function (ev) { if (ratoX === null && Math.abs(regua.scrollLeft - ratoScroll) > 6 && ev.target.closest('.abrir-galeria')) { ev.stopPropagation(); ev.preventDefault(); } }, true);
    requestAnimationFrame(passo);
  }

  /* ---- Camadas (menu, painel, galeria): abrir/fechar, Escape, scroll bloqueado ---- */
  function abrir(id) { var el = $('#' + id); if (!el) return; el.hidden = false; abertas.push(id); document.body.classList.add('sem-scroll'); var f = $('button, a, input', el); if (f && id !== 'galeria') setTimeout(function () { f.focus(); }, 50); }
  function fechar(id) { var el = $('#' + id); if (!el) return; el.hidden = true; abertas = abertas.filter(function (x) { return x !== id; }); if (!abertas.length) document.body.classList.remove('sem-scroll'); }
  $$('[data-fechar]').forEach(function (b) { b.addEventListener('click', function () { fechar(b.getAttribute('data-fechar')); }); });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && abertas.length) fechar(abertas[abertas.length - 1]);
    if (!$('#galeria').hidden) { if (ev.key === 'ArrowRight') galeriaIr(1); if (ev.key === 'ArrowLeft') galeriaIr(-1); }
  });
  var abrirMenu = $('#abrir-menu'); if (abrirMenu) abrirMenu.addEventListener('click', function () { abrir('menu'); });
  $$('#menu .menu-lista a').forEach(function (a) { a.addEventListener('click', function () { fechar('menu'); }); });
  var abrirDisp = $('#abrir-disponibilidade'); if (abrirDisp) abrirDisp.addEventListener('click', function () { abrir('disponibilidade'); arrancarPainel(); });
  var painelFundo = $('#disponibilidade'); if (painelFundo) painelFundo.addEventListener('click', function (ev) { if (ev.target === painelFundo) fechar('disponibilidade'); });

  /* ---- Álbuns (separadores) ---- */
  $$('.separador').forEach(function (sep) {
    sep.addEventListener('click', function () {
      $$('.separador').forEach(function (s) { s.classList.remove('ativo'); s.setAttribute('aria-selected', 'false'); });
      $$('.album').forEach(function (a) { a.classList.add('escondido'); });
      sep.classList.add('ativo'); sep.setAttribute('aria-selected', 'true');
      var alvo = $('#' + sep.getAttribute('aria-controls')); if (alvo) alvo.classList.remove('escondido');
    });
  });

  /* ---- Galeria ---- */
  var gal = { fotos: [], i: 0, nome: '' }, galImg = $('#galeria-img'), galCont = $('#galeria-contador'), galLeg = $('#galeria-legenda');
  function galeriaMostrar() {
    var f = gal.fotos[gal.i]; if (!f) return;
    galImg.style.opacity = '0'; galImg.src = f.src; galImg.alt = f.alt || ''; galImg.style.objectPosition = f.pos || 'center';
    galImg.onload = function () { galImg.style.opacity = '1'; };
    galCont.textContent = gal.nome + ' · ' + (gal.i + 1) + ' / ' + gal.fotos.length; galLeg.textContent = f.alt || '';
    $('#galeria-antes').disabled = gal.i === 0; $('#galeria-depois').disabled = gal.i >= gal.fotos.length - 1;
  }
  function galeriaIr(d) { var n = gal.i + d; if (n < 0 || n >= gal.fotos.length) return; gal.i = n; galeriaMostrar(); }
  $$('.abrir-galeria').forEach(function (b) {
    b.addEventListener('click', function () {
      try { var d = JSON.parse(b.getAttribute('data-galeria')); gal.fotos = d.fotos; gal.nome = d.nome; gal.i = parseInt(b.getAttribute('data-inicio') || '0', 10) || 0; } catch (e) { return; }
      abrir('galeria'); galeriaMostrar();
    });
  });
  $('#galeria-antes').addEventListener('click', function () { galeriaIr(-1); });
  $('#galeria-depois').addEventListener('click', function () { galeriaIr(1); });
  var toqueX = null, galEl = $('#galeria');
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
  function euros(v) { var n = Math.round(v * 100) / 100; var s = (Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ',')); return s.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0') + '\u00a0€'; }

  /* ---- Painel: calendário + conta + tempo + pedido ---- */
  var painelArrancado = false, ocupadas = {}, ocupacaoExemplo = false, semApp = false, mesBase = new Date(hoje().getFullYear(), hoje().getMonth(), 1), ultimaConta = null, inicioPreenchimento = null;
  var elEntrada = $('#entrada'), elSaida = $('#saida'), elPax = $('#pax'), elConta = $('#conta'), elAvisos = $('#avisos'), formPedido = $('#form-pedido');

  function arrancarPainel() {
    if (painelArrancado) return; painelArrancado = true;
    var h = hoje(); elEntrada.min = iso(h); elSaida.min = iso(addDias(h, 1));
    desenharMeses();
    fetch('api/ocupacao.php').then(function (r) { return r.json(); }).then(function (o) {
      ocupadas = {}; (o.ocupado || []).forEach(function (iv) { var d = deIso(iv.de), fim = deIso(iv.ate); while (d < fim) { ocupadas[iso(d)] = true; d = addDias(d, 1); } });
      ocupacaoExemplo = !!o.exemplo; semApp = o.app === false && !o.exemplo;
      if (o.exemplo) $('#cal-nota').textContent = 'Calendário de exemplo · a disponibilidade real é confirmada no pedido';
      else if (semApp) $('#cal-nota').textContent = 'Calendário indisponível de momento · confirmamos as datas no pedido.';
      desenharMeses();
    }).catch(function () { semApp = true; $('#cal-nota').textContent = 'Calendário indisponível de momento · confirmamos as datas no pedido.'; desenharMeses(); });
    fetch('api/tempo.php').then(function (r) { return r.json(); }).then(desenharTempo).catch(function () {});
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

  var temporizador = null;
  function calcular() {
    var e = elEntrada.value, s = elSaida.value, pax = elPax.value;
    desenharMeses();
    if (!e || !s) { elConta.className = 'conta serif'; elConta.textContent = 'Escolham as datas de entrada e saída.'; elAvisos.innerHTML = ''; formPedido.hidden = true; ultimaConta = null; return; }
    elConta.className = 'conta serif'; elConta.textContent = 'A calcular…';
    clearTimeout(temporizador);
    temporizador = setTimeout(function () {
      fetch('api/tarifa.php?entrada=' + e + '&saida=' + s + '&pax=' + pax).then(function (r) { return r.json(); }).then(mostrarConta).catch(function () {
        elConta.className = 'conta erro'; elConta.textContent = 'Não foi possível calcular agora; falem connosco pelo WhatsApp ou email.'; formPedido.hidden = true;
      });
    }, 250);
  }
  function mostrarConta(R) {
    ultimaConta = R; elAvisos.innerHTML = '';
    if (!R.ok) { elConta.className = 'conta erro'; elConta.textContent = R.mensagem || 'Estas datas não são possíveis.'; formPedido.hidden = true; return; }
    var livre = true, d = deIso(R.entrada), fim = deIso(R.saida); while (d < fim) { if (ocupadas[iso(d)]) livre = false; d = addDias(d, 1); }
    if (!livre && !ocupacaoExemplo) { elConta.className = 'conta erro'; elConta.textContent = 'Estas datas já estão ocupadas. Experimentem outras ou falem connosco.'; formPedido.hidden = true; return; }
    elConta.className = 'conta serif';
    var texto = R.noites + ' ' + (R.noites === 1 ? 'noite' : 'noites');
    var epocas = {}; (R.detalhe || []).forEach(function (x) { epocas[x.epoca] = true; }); var umaEpoca = Object.keys(epocas).length <= 1;
    if (R.mensal) texto += ' (preço mensal) ';
    else if (umaEpoca) texto += ' × ' + euros(R.noite) + ' ';
    else texto += ' (' + euros(R.dormidas) + ', duas épocas) ';
    texto += '+ limpeza ' + euros(R.limpeza) + ' = ' + euros(R.total);
    elConta.textContent = texto;
    (R.avisos || []).forEach(function (a) { var li = document.createElement('li'); li.textContent = a; elAvisos.appendChild(li); });
    if (R.fonte === 'site') { var li = document.createElement('li'); li.textContent = 'Valor estimado pelo site; a app confirma no pedido.'; elAvisos.appendChild(li); }
    formPedido.hidden = false; if (!inicioPreenchimento) inicioPreenchimento = Date.now();
    atualizarLigacoes();
    if (R.detalhe && R.detalhe.length) marcarTempo(R.entrada, R.saida);
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
    if (!f.nome.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.value.trim())) { est.className = 'pedido-estado erro'; est.textContent = 'Preencham o nome e um email válido.'; return; }
    btn.disabled = true; est.className = 'pedido-estado'; est.textContent = 'A enviar…';
    var pedido = { nome: f.nome.value.trim(), email: f.email.value.trim(), telefone: f.telefone.value.trim() || undefined, mensagem: f.mensagem.value.trim() || undefined,
      entrada: R.entrada, saida: R.saida, pax: +R.pax, preco_mostrado: R.total, lingua: 'pt', origem: 'inicio',
      segundos_a_preencher: inicioPreenchimento ? Math.round((Date.now() - inicioPreenchimento) / 1000) : undefined, armadilha: f.armadilha.value || '' };
    if (confirmoPreco) pedido.confirmo_preco = true;
    fetch('api/prereserva.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(pedido) })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        btn.disabled = false;
        if (res.ok) { est.className = 'pedido-estado ok'; est.textContent = res.mensagem || ('Pedido registado' + (res.codigo ? ' (' + res.codigo + ')' : '') + '. Respondemos em breve por email ou WhatsApp.'); btn.hidden = true; }
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

  /* ---- Avaliações publicadas na app: rodam no bloco de citação quando existem ---- */
  var avTexto = $('#avaliacao-texto'), avAss = $('#avaliacao-assinatura');
  if (avTexto && avAss) {
    fetch('api/avaliacoes.php').then(function (r) { return r.json(); }).then(function (j) {
      var lista = (j && j.avaliacoes || []).filter(function (a) { return a.texto; }); if (!lista.length) return;
      var k = 0, fig = avTexto.parentNode;
      function mostrar() { var a = lista[k]; fig.style.opacity = '0'; setTimeout(function () { avTexto.textContent = a.texto; avAss.textContent = (a.nome || '') + (a.pais ? ' · ' + a.pais : '') + (a.mes ? ' · ' + a.mes : ''); fig.style.opacity = '1'; }, 400); }
      fig.style.transition = 'opacity .4s'; setTimeout(mostrar, 6000); setInterval(function () { k = (k + 1) % lista.length; mostrar(); }, 9000);
    }).catch(function () {});
  }

  /* ---- Tempo (Open-Meteo pelo servidor) ---- */
  var tempoDias = [], ICONES = { sol: '☀', 'pouco-nublado': '🌤', nublado: '☁', nevoeiro: '🌫', chuvisco: '🌦', chuva: '🌧', neve: '❄', aguaceiros: '🌦', trovoada: '⛈' };
  function classeTempo(c) { if (c === 0) return 'sol'; if (c <= 2) return 'pouco-nublado'; if (c === 3) return 'nublado'; if (c <= 48) return 'nevoeiro'; if (c <= 57) return 'chuvisco'; if (c <= 67) return 'chuva'; if (c <= 77) return 'neve'; if (c <= 82) return 'aguaceiros'; if (c <= 86) return 'neve'; return 'trovoada'; }
  function desenharTempo(j) {
    if (!j || !j.dias || !j.dias.length) return; tempoDias = j.dias;
    var ul = $('#tempo-dias'); ul.innerHTML = '';
    tempoDias.slice(0, 7).forEach(function (d) {
      var li = document.createElement('li'), dt = deIso(d.dia);
      li.innerHTML = '<span class="dia">' + DIAS_CURTOS[(dt.getDay() + 6) % 7] + '</span><span class="icone" aria-hidden="true">' + ICONES[classeTempo(d.codigo)] + '</span><span class="max">' + d.max + '°</span><span class="min">' + d.min + '°</span>';
      ul.appendChild(li);
    });
    $('#tempo').hidden = false;
  }
  function marcarTempo(e, s) {
    if (!tempoDias.length) return;
    var porDia = {}; tempoDias.forEach(function (d) { porDia[d.dia] = d; });
    var ul = $('#tempo-dias'); ul.innerHTML = ''; var d = deIso(e), fim = deIso(s), n = 0;
    while (d <= fim && n < 14) { var k = iso(d), p = porDia[k], li = document.createElement('li');
      if (p) li.innerHTML = '<span class="dia">' + DIAS_CURTOS[(d.getDay() + 6) % 7] + ' ' + d.getDate() + '</span><span class="icone" aria-hidden="true">' + ICONES[classeTempo(p.codigo)] + '</span><span class="max">' + p.max + '°</span><span class="min">' + p.min + '°</span>';
      else li.innerHTML = '<span class="dia">' + DIAS_CURTOS[(d.getDay() + 6) % 7] + ' ' + d.getDate() + '</span><span class="icone media" title="Sem previsão ainda">·</span><span class="max media">—</span><span class="min">&nbsp;</span>';
      ul.appendChild(li); d = addDias(d, 1); n++; }
    $('#tempo').hidden = false;
  }
})();
