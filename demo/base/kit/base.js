/* Base técnica da demo · Monte Casa Branca · kit de componentes (Claude, 21/10/2026).
   Vanilla JS, sem dependências, abre do ficheiro. Monta-se em cada elemento com data-base="…":
     tempo · calendario · simulador · pedido · antes-depois
   O desenho (cores, tipos, espaços) é do ChatGPT no CSS do site; este ficheiro só produz a
   marcação documentada em demo/base/CONTRATO.md (classes «b-…») e o comportamento.
   Dados: window.MCB_DADOS (base/dados.js, gerado pela ferramenta) ou, se faltar, os JSON em
   base/dados/. A forma dos dados é a das portas da app (contrato_portas_v1.md): trocar o
   ficheiro pela porta é mudar um endereço em window.MCB_BASE_CONFIG.
   Nada é enviado a lado nenhum: o pedido de datas prepara a mensagem (WhatsApp/email) e, na
   produção, falará com public/prereserva.php. Sem dados do visitante para serviços externos:
   ao Open-Meteo vão só as coordenadas da casa. */
(function (global) {
  "use strict";
  var B = {};
  var CFG = (global && global.MCB_BASE_CONFIG) || {};
  var DOC = typeof document !== "undefined" ? document : null;

  // ---------- configuração ----------
  var raiz = "base/";
  if (DOC && DOC.currentScript && DOC.currentScript.src) raiz = DOC.currentScript.src.replace(/[^/]*$/, "");
  CFG.dados = CFG.dados || raiz + "dados/";
  CFG.ocupacao = CFG.ocupacao || null;      // futuro: https://app.montecasabranca.pt/site_ocupacao.php
  CFG.tarifa = CFG.tarifa || null;          // futuro: https://app.montecasabranca.pt/site_tarifa.php (a conta local continua a servir de pré-visualização)
  CFG.prereserva = CFG.prereserva || null;  // futuro: /prereserva.php do site (servidor a servidor com a app)
  var automatizado = !!(global && global.navigator && global.navigator.webdriver);
  CFG.tempo = CFG.tempo || (automatizado ? "exemplo" : "open-meteo");
  CFG.lingua = CFG.lingua || "pt";
  B.config = CFG;

  // ---------- datas e formatos (pt-PT) ----------
  var MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  var MESES_LONGOS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  var DIAS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  var DIAS_LONGOS = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function deIso(s) { var p = String(s || "").split("-"); return new Date(+p[0], +p[1] - 1, +p[2], 12, 0, 0); }
  function iso(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function isoValido(s) { return /^\d{4}-\d{2}-\d{2}$/.test(String(s || "")) && !isNaN(deIso(s).getTime()); }
  function addDias(d, n) { var x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }
  function hoje() { var d = CFG.hoje ? deIso(CFG.hoje) : new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0); }
  function diasEntre(a, b) { return Math.round((deIso(b) - deIso(a)) / 86400000); }
  function fmtDia(d) { return DIAS[d.getDay()] + " " + d.getDate(); }
  function fmtData(d) { return d.getDate() + "/" + MESES[d.getMonth()] + "/" + d.getFullYear(); }
  function fmtIntervalo(e, s) {
    var a = deIso(e), b = deIso(s);
    if (a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()) return a.getDate() + "–" + b.getDate() + "/" + MESES[a.getMonth()] + "/" + a.getFullYear();
    return fmtData(a) + " – " + fmtData(b);
  }
  function euros(v) { return v.toLocaleString("pt-PT", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " €"; }
  B.datas = { deIso: deIso, iso: iso, addDias: addDias, hoje: hoje, diasEntre: diasEntre, fmtData: fmtData, fmtIntervalo: fmtIntervalo, euros: euros, MESES: MESES, DIAS: DIAS };

  // ---------- dados ----------
  var cacheDados = {};
  function carregar(nome) {
    // 1) base/dados.js (window.MCB_DADOS), funciona do ficheiro · 2) fetch do JSON · 3) nada
    if (cacheDados[nome]) return cacheDados[nome];
    var p;
    if (global.MCB_DADOS && global.MCB_DADOS[nome]) p = Promise.resolve(global.MCB_DADOS[nome]);
    else if (typeof fetch === "function") p = fetch(CFG.dados + nome + ".json", { cache: "no-store" }).then(function (r) { if (!r.ok) throw new Error(nome); return r.json(); });
    else p = Promise.reject(new Error("sem dados"));
    cacheDados[nome] = p.catch(function (e) { cacheDados[nome] = null; throw e; });
    return cacheDados[nome];
  }
  B.carregar = carregar;

  // ---------- épocas e orçamento (a conta do site, igual em regra à da app) ----------
  function epocaDe(dataIso, tarifas) {
    var d = deIso(dataIso), ano = d.getFullYear();
    var anos = Object.keys(tarifas.anos).map(Number).sort(function (a, b) { return a - b; });
    var usado = ano, aviso = null;
    if (!tarifas.anos[ano]) { usado = ano < anos[0] ? anos[0] : anos[anos.length - 1]; aviso = "A tarifa de " + ano + " ainda não está publicada; a estimativa usa a de " + usado + "."; }
    var t = tarifas.anos[usado], m = d.getMonth() + 1, dia = d.getDate();
    for (var i = 0; i < t.epocas.length; i++) {
      var e = t.epocas[i], ini = e.mes_ini * 100 + e.dia_ini, fim = e.mes_fim * 100 + e.dia_fim, md = m * 100 + dia;
      if (md >= ini && md <= fim) return { nome: e.nome, noite: e.noite, min_noites: e.min_noites, sabado_a_sabado: !!e.sabado_a_sabado, mensal: !!e.mensal, ano_tarifa: usado, limpeza: t.limpeza, aviso: aviso };
    }
    return null;
  }
  function orcamento(entrada, saida, pax, tarifas) {
    var R = { ok: false, entrada: entrada, saida: saida, pax: pax, avisos: [], regras: tarifas.regras || [] };
    if (!isoValido(entrada) || !isoValido(saida)) return erro(R, "datas", "Escolham a data de entrada e a de saída.");
    var n = diasEntre(entrada, saida);
    if (n <= 0) return erro(R, "datas", "A saída tem de ser depois da entrada.");
    if (n > 60) return erro(R, "datas", "Para estadias com mais de 60 noites, falem connosco.");
    if (deIso(entrada) < hoje()) return erro(R, "passado", "A data de entrada já passou.");
    pax = parseInt(pax, 10) || 0;
    if (pax < 1 || pax > (tarifas.pax_max || 8)) return erro(R, "pax", "A casa recebe até " + (tarifas.pax_max || 8) + " pessoas.");
    R.noites = n;
    var ep0 = epocaDe(entrada, tarifas);
    if (!ep0) return erro(R, "sem_tarifa", "Não temos tarifa para estas datas; falem connosco.");
    if (ep0.aviso) R.avisos.push(ep0.aviso);
    var mensal = tarifas.mensal, mesesMensal = (mensal && mensal.meses) || [];
    var dormidas = 0, detalhe = [], verao = false, mensalPossivel = !!mensal, dia = deIso(entrada);
    for (var i = 0; i < n; i++) {
      var ep = epocaDe(iso(dia), tarifas) || ep0;
      dormidas += ep.noite; detalhe.push({ dia: iso(dia), epoca: ep.nome, noite: ep.noite });
      if (ep.sabado_a_sabado) verao = true;
      if (mesesMensal.indexOf(dia.getMonth() + 1) < 0) mensalPossivel = false;
      dia = addDias(dia, 1);
    }
    R.epoca = ep0.nome; R.noite = ep0.noite; R.min_noites = ep0.min_noites; R.detalhe = detalhe;
    if (verao) {
      var e = deIso(entrada).getDay(), s = deIso(saida).getDay();
      if (n < 7 || e !== 6 || s !== 6) { R.erro = "verao_sabado"; R.mensagem = "No verão (18 de julho a 31 de agosto) as estadias são de sábado a sábado, 7 noites ou mais."; R.min_noites = 7; return R; }
    } else if (n < ep0.min_noites) {
      R.erro = "min_noites"; R.mensagem = "Nesta época o mínimo são " + ep0.min_noites + " noites."; return R;
    }
    if (mensal && n >= mensal.noites && mensalPossivel) {
      dormidas = Math.round(mensal.valor / mensal.noites * n * 100) / 100;
      R.mensal = true; R.avisos.push("Estadia longa: aplica-se o preço mensal (" + euros(mensal.valor) + " por " + mensal.noites + " noites) mais a limpeza.");
    }
    R.limpeza = ep0.limpeza; R.dormidas = Math.round(dormidas * 100) / 100; R.total = Math.round((R.dormidas + R.limpeza) * 100) / 100;
    var ds = deIso(saida).getDay();
    if (ds === 0 || ds === 6) R.avisos.push("Saída ao " + DIAS_LONGOS[ds] + ": podem ficar até ao pôr do sol (" + porDoSol(saida) + ")*, a combinar, quando não há entrada nesse dia.");
    R.ok = true; R.calculado_em = new Date().toISOString();
    return R;
  }
  function erro(R, codigo, msg) { R.ok = false; R.erro = codigo; R.mensagem = msg; return R; }
  B.epocaDe = epocaDe; B.orcamento = orcamento;

  // ---------- pôr do sol calculado no browser (S23; algoritmo da NOAA, erro de 1–2 min) ----------
  var CASA = { lat: 38.6142917, lon: -8.211253 };
  function porDoSol(dataIso, lat, lon) {
    lat = lat == null ? CASA.lat : lat; lon = lon == null ? CASA.lon : lon;
    var d = deIso(dataIso), rad = Math.PI / 180;
    var a = Math.floor((14 - (d.getMonth() + 1)) / 12), y = d.getFullYear() + 4800 - a, m = d.getMonth() + 1 + 12 * a - 3;
    var jdn = d.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    var n = jdn - 2451545 + 0.0008;
    var Jx = n - lon / 360;
    var M = ((357.5291 + 0.98560028 * Jx) % 360 + 360) % 360;
    var C = 1.9148 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 0.0003 * Math.sin(3 * M * rad);
    var L = (M + C + 180 + 102.9372) % 360;
    var Jt = 2451545 + Jx + 0.0053 * Math.sin(M * rad) - 0.0069 * Math.sin(2 * L * rad);
    var dec = Math.asin(Math.sin(L * rad) * Math.sin(23.4397 * rad));
    var cosw = (Math.sin(-0.833 * rad) - Math.sin(lat * rad) * Math.sin(dec)) / (Math.cos(lat * rad) * Math.cos(dec));
    if (cosw > 1 || cosw < -1) return "—";
    var w = Math.acos(cosw) / rad;
    var Jset = Jt + w / 360;
    var instante = new Date((Jset - 2440587.5) * 86400000);
    try {
      return new Intl.DateTimeFormat("pt-PT", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Lisbon" }).format(instante).replace(":", "h");
    } catch (e) { return pad(instante.getHours()) + "h" + pad(instante.getMinutes()); }
  }
  B.porDoSol = porDoSol;

  // ---------- tempo (Open-Meteo) ----------
  var WMO = [
    [0, 0, "sol", "céu limpo"], [1, 2, "pouco-nublado", "pouco nublado"], [3, 3, "nublado", "nublado"], [45, 48, "nevoeiro", "nevoeiro"],
    [51, 57, "chuvisco", "chuvisco"], [61, 67, "chuva", "chuva"], [71, 77, "neve", "neve"], [80, 82, "aguaceiros", "aguaceiros"], [85, 86, "neve", "neve"], [95, 99, "trovoada", "trovoada"]
  ];
  var ICONES = { sol: "☀", "pouco-nublado": "🌤", nublado: "☁", nevoeiro: "🌫", chuvisco: "🌦", chuva: "🌧", neve: "❄", aguaceiros: "🌦", trovoada: "⛈" };
  function classeTempo(codigo) { for (var i = 0; i < WMO.length; i++) if (codigo >= WMO[i][0] && codigo <= WMO[i][1]) return { classe: WMO[i][2], texto: WMO[i][3] }; return { classe: "nublado", texto: "nublado" }; }
  var previsaoPromessa = null;
  function previsao() {
    if (previsaoPromessa) return previsaoPromessa;
    if (CFG.tempo === "exemplo") {
      previsaoPromessa = carregar("tempo-exemplo").then(function (ex) {
        var h = hoje(), dias = [];
        for (var i = 0; i < ex.dias.length; i++) { var d = addDias(h, i), x = ex.dias[i]; dias.push({ dia: iso(d), codigo: x.codigo, max: x.max, min: x.min, chuva: x.chuva }); }
        return { dias: dias, fonte: "exemplo" };
      });
      return previsaoPromessa;
    }
    var chave = "mcb_tempo_v1";
    try {
      var guardado = global.sessionStorage && global.sessionStorage.getItem(chave);
      if (guardado) { var g = JSON.parse(guardado); if (g && g.ate > Date.now() && g.dias) { previsaoPromessa = Promise.resolve({ dias: g.dias, fonte: "open-meteo" }); return previsaoPromessa; } }
    } catch (e) { /* sem armazenamento: segue */ }
    var url = "https://api.open-meteo.com/v1/forecast?latitude=" + CASA.lat + "&longitude=" + CASA.lon +
      "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FLisbon&forecast_days=16";
    previsaoPromessa = fetch(url).then(function (r) { if (!r.ok) throw new Error("open-meteo " + r.status); return r.json(); }).then(function (j) {
      var dias = [];
      for (var i = 0; i < j.daily.time.length; i++) dias.push({ dia: j.daily.time[i], codigo: j.daily.weather_code[i], max: Math.round(j.daily.temperature_2m_max[i]), min: Math.round(j.daily.temperature_2m_min[i]), chuva: j.daily.precipitation_probability_max[i] });
      try { global.sessionStorage.setItem(chave, JSON.stringify({ ate: Date.now() + 30 * 60000, dias: dias })); } catch (e) { /* segue */ }
      return { dias: dias, fonte: "open-meteo" };
    });
    return previsaoPromessa;
  }
  function el(tag, classe, texto) { var e = DOC.createElement(tag); if (classe) e.className = classe; if (texto != null) e.textContent = texto; return e; }
  function linhaDia(d, media) {
    var li = el("li", "b-tempo-dia" + (media ? " b-tempo-dia--media" : ""));
    var dt = deIso(d.dia);
    li.appendChild(el("span", "b-tempo-nome", fmtDia(dt)));
    var ct = classeTempo(d.codigo);
    var ic = el("span", "b-tempo-icone b-tempo-c-" + ct.classe, ICONES[ct.classe] || "☁"); ic.setAttribute("aria-hidden", "true"); li.appendChild(ic);
    var txt = el("span", "b-visualmente-escondido", ct.texto); li.appendChild(txt);
    li.appendChild(el("span", "b-tempo-max", Math.round(d.max) + "°"));
    li.appendChild(el("span", "b-tempo-min", Math.round(d.min) + "°"));
    if (d.chuva != null) li.appendChild(el("span", "b-tempo-chuva", Math.round(d.chuva) + " %"));
    return li;
  }
  function montarTempo(slot) {
    var nDias = parseInt(slot.getAttribute("data-dias"), 10) || 7;
    previsao().then(function (p) {
      slot.innerHTML = "";
      slot.classList.add("b-tempo");
      var titulo = slot.getAttribute("data-titulo"); if (titulo) slot.appendChild(el("p", "b-tempo-titulo", titulo));
      var ul = el("ul", "b-tempo-dias");
      p.dias.slice(0, nDias).forEach(function (d) { ul.appendChild(linhaDia(d)); });
      slot.appendChild(ul);
      slot.appendChild(el("p", "b-fonte", "Dados: Open-Meteo" + (p.fonte === "exemplo" ? " · valores de exemplo" : "")));
      slot.hidden = false;
    }).catch(function () { slot.hidden = true; }); // sem dados: desaparece sem deixar buraco
  }
  function tempoDaEstadia(entrada, saida) {
    // até 16 dias à frente: previsão; depois: média mensal (clima-medias.json, rótulo «média»)
    return Promise.all([previsao().catch(function () { return { dias: [] }; }), carregar("clima-medias").catch(function () { return null; })]).then(function (r) {
      var prev = {}; r[0].dias.forEach(function (d) { prev[d.dia] = d; });
      var clima = r[1], saidaDia = deIso(saida), dias = [], d = deIso(entrada), semDados = 0;
      while (d <= saidaDia) {
        var k = iso(d);
        if (prev[k]) dias.push({ dia: k, codigo: prev[k].codigo, max: prev[k].max, min: prev[k].min, chuva: prev[k].chuva, media: false });
        else if (clima && clima.meses && clima.meses[d.getMonth()]) { var m = clima.meses[d.getMonth()]; dias.push({ dia: k, codigo: m.codigo, max: m.max, min: m.min, chuva: null, media: true }); }
        else semDados++;
        d = addDias(d, 1);
      }
      return { dias: dias, semDados: semDados, clima: clima };
    });
  }
  B.previsao = previsao; B.tempoDaEstadia = tempoDaEstadia; B.classeTempo = classeTempo;

  // ---------- calendário de ocupação (porta #189) ----------
  var estadoDatas = { entrada: null, saida: null };
  var ouvintes = [];
  function avisarDatas(origem) {
    var det = { entrada: estadoDatas.entrada, saida: estadoDatas.saida, origem: origem };
    ouvintes.forEach(function (f) { try { f(det); } catch (e) { /* segue */ } });
    if (DOC) DOC.dispatchEvent(new CustomEvent("base:datas", { detail: det }));
  }
  B.datasEscolhidas = function () { return { entrada: estadoDatas.entrada, saida: estadoDatas.saida }; };
  B.aoMudarDatas = function (f) { ouvintes.push(f); };
  B.escolherDatas = function (e, s, origem) { estadoDatas.entrada = e || null; estadoDatas.saida = s || null; avisarDatas(origem || "codigo"); };

  function noitesOcupadas(ocupacao) {
    var set = {};
    (ocupacao.ocupado || []).forEach(function (iv) { var d = deIso(iv.de), fim = deIso(iv.ate); while (d < fim) { set[iso(d)] = true; d = addDias(d, 1); } });
    return set;
  }
  function montarCalendario(slot) {
    var meses = parseInt(slot.getAttribute("data-meses"), 10) || 1;
    var h = hoje(), vista = new Date(h.getFullYear(), h.getMonth(), 1, 12);
    var fonte = CFG.ocupacao ? fetch(CFG.ocupacao).then(function (r) { return r.json(); }) : carregar("ocupacao");
    fonte.then(function (oc) {
      var ocupado = noitesOcupadas(oc);
      slot.classList.add("b-cal");
      function desenhar() {
        slot.innerHTML = "";
        var nav = el("div", "b-cal-nav");
        var ant = el("button", "b-cal-ant", "‹"); ant.type = "button"; ant.setAttribute("aria-label", "Mês anterior");
        var seg = el("button", "b-cal-seg", "›"); seg.type = "button"; seg.setAttribute("aria-label", "Mês seguinte");
        ant.disabled = vista.getFullYear() === h.getFullYear() && vista.getMonth() === h.getMonth();
        ant.addEventListener("click", function () { vista = new Date(vista.getFullYear(), vista.getMonth() - 1, 1, 12); desenhar(); });
        seg.addEventListener("click", function () { vista = new Date(vista.getFullYear(), vista.getMonth() + 1, 1, 12); desenhar(); });
        nav.appendChild(ant); nav.appendChild(seg); slot.appendChild(nav);
        var grupo = el("div", "b-cal-meses");
        for (var k = 0; k < meses; k++) grupo.appendChild(mes(new Date(vista.getFullYear(), vista.getMonth() + k, 1, 12)));
        slot.appendChild(grupo);
        var legenda = el("p", "b-cal-legenda");
        legenda.appendChild(el("span", "b-cal-leg b-cal-leg--livre", "livre"));
        legenda.appendChild(el("span", "b-cal-leg b-cal-leg--ocupado", "ocupado"));
        legenda.appendChild(el("span", "b-cal-leg b-cal-leg--escolhido", "escolhido"));
        slot.appendChild(legenda);
        var nota = el("p", "b-cal-nota", oc.exemplo ? "Ocupação de exemplo: datas indicativamente livres." : "Datas indicativamente livres; a confirmação é pelo pedido.");
        slot.appendChild(nota);
        var estado = el("p", "b-cal-estado"); estado.setAttribute("aria-live", "polite");
        estado.textContent = estadoDatas.entrada ? (estadoDatas.saida ? fmtIntervalo(estadoDatas.entrada, estadoDatas.saida) + " · " + diasEntre(estadoDatas.entrada, estadoDatas.saida) + " noites" : "Entrada " + fmtData(deIso(estadoDatas.entrada)) + " · escolham a saída") : "Toquem no dia de entrada e depois no de saída.";
        slot.appendChild(estado);
      }
      function mes(m0) {
        var sec = el("section", "b-cal-mes");
        sec.appendChild(el("h3", "b-cal-titulo", MESES_LONGOS[m0.getMonth()] + " " + m0.getFullYear()));
        var cab = el("div", "b-cal-semana"); ["seg", "ter", "qua", "qui", "sex", "sáb", "dom"].forEach(function (n) { cab.appendChild(el("span", "b-cal-dia-semana", n)); }); sec.appendChild(cab);
        var g = el("div", "b-cal-grelha");
        var primeiro = (m0.getDay() + 6) % 7; for (var v = 0; v < primeiro; v++) g.appendChild(el("span", "b-cal-vazio"));
        var ult = new Date(m0.getFullYear(), m0.getMonth() + 1, 0).getDate();
        for (var dia = 1; dia <= ult; dia++) {
          var d = new Date(m0.getFullYear(), m0.getMonth(), dia, 12), k = iso(d);
          var b = el("button", "b-cal-dia", String(dia)); b.type = "button"; b.setAttribute("data-dia", k);
          var passado = d < h, ocup = !!ocupado[k];
          if (k === iso(h)) b.classList.add("b-cal-dia--hoje");
          if (passado) { b.classList.add("b-cal-dia--passado"); b.disabled = true; }
          if (ocup) { b.classList.add("b-cal-dia--ocupado"); b.setAttribute("aria-label", dia + ", ocupado"); }
          if (estadoDatas.entrada && (k === estadoDatas.entrada || k === estadoDatas.saida)) b.classList.add("b-cal-dia--escolhido");
          if (estadoDatas.entrada && estadoDatas.saida && k > estadoDatas.entrada && k < estadoDatas.saida) b.classList.add("b-cal-dia--entre");
          b.addEventListener("click", aoTocar);
          g.appendChild(b);
        }
        sec.appendChild(g);
        return sec;
      }
      function aoTocar(ev) {
        var k = ev.currentTarget.getAttribute("data-dia");
        if (!estadoDatas.entrada || (estadoDatas.entrada && estadoDatas.saida) || k <= estadoDatas.entrada) {
          if (ocupado[k]) { aviso("Essa noite está ocupada; escolham outro dia de entrada."); return; }
          estadoDatas.entrada = k; estadoDatas.saida = null;
        } else {
          var d = deIso(estadoDatas.entrada), livre = true;
          while (iso(d) < k) { if (ocupado[iso(d)]) { livre = false; break; } d = addDias(d, 1); }
          if (!livre) { aviso("Há noites ocupadas entre essas datas; escolham outra saída."); return; }
          estadoDatas.saida = k;
        }
        desenhar(); avisarDatas("calendario");
      }
      function aviso(t) { var e = slot.querySelector(".b-cal-estado"); if (e) e.textContent = t; }
      B.aoMudarDatas(function (det) { if (det.origem !== "calendario") { if (det.entrada) vista = new Date(deIso(det.entrada).getFullYear(), deIso(det.entrada).getMonth(), 1, 12); desenhar(); } });
      desenhar();
      slot.hidden = false;
    }).catch(function () { slot.hidden = true; });
  }

  // ---------- simulador «Simule aqui a sua estadia» (porta #190) ----------
  function montarSimulador(slot) {
    var ocupadas = {};
    (CFG.ocupacao ? fetch(CFG.ocupacao).then(function (r) { return r.json(); }) : carregar("ocupacao")).then(function (oc) { ocupadas = noitesOcupadas(oc); }).catch(function () { ocupadas = {}; });
    carregar("tarifas").then(function (tarifas) {
      slot.classList.add("b-sim"); slot.innerHTML = "";
      var titulo = slot.getAttribute("data-titulo") || "Simule aqui a sua estadia";
      slot.appendChild(el("h3", "b-sim-titulo", titulo));
      var f = el("form", "b-sim-form"); f.noValidate = true;
      f.appendChild(campo("Entrada", "date", "entrada")); f.appendChild(campo("Saída", "date", "saida"));
      var lp = el("label", "b-sim-campo"); lp.appendChild(el("span", "b-sim-rotulo", "Pessoas"));
      var sel = el("select", "b-sim-pax"); sel.name = "pax"; for (var i = 1; i <= (tarifas.pax_max || 8); i++) { var o = el("option", null, String(i)); o.value = String(i); if (i === 8) o.selected = true; sel.appendChild(o); } lp.appendChild(sel); f.appendChild(lp);
      var bt = el("button", "b-sim-calcular", "Calcular"); bt.type = "submit"; f.appendChild(bt);
      slot.appendChild(f);
      var res = el("div", "b-sim-resultado"); res.hidden = true; res.setAttribute("aria-live", "polite"); slot.appendChild(res);
      var nota = el("p", "b-fonte", tarifas.exemplo ? "Tarifa privada 2026/2027 do FACTOS.md; conta feita no site (pré-visualização), a confirmar pela app no pedido." : "Conta confirmada pela app."); slot.appendChild(nota);
      var ent = f.querySelector('[name="entrada"]'), sai = f.querySelector('[name="saida"]');
      ent.min = iso(hoje()); sai.min = iso(addDias(hoje(), 1));
      function campo(rot, tipo, nome) { var l = el("label", "b-sim-campo"); l.appendChild(el("span", "b-sim-rotulo", rot)); var i = el("input", "b-sim-" + nome); i.type = tipo; i.name = nome; i.required = true; l.appendChild(i); return l; }
      function calcular(origem) {
        var R = orcamento(ent.value, sai.value, sel.value, tarifas);
        if (R.ok) {
          var d = deIso(R.entrada), fimO = deIso(R.saida), conflito = false;
          while (d < fimO) { if (ocupadas[iso(d)]) { conflito = true; break; } d = addDias(d, 1); }
          if (conflito) R.avisos.unshift("Pelo calendário há noites ocupadas nestas datas: o pedido não poderia ser confirmado. Escolham outras datas.");
        }
        mostrar(R);
        if (R.ok || R.erro === "min_noites" || R.erro === "verao_sabado") { if (origem !== "datas") B.escolherDatas(ent.value, sai.value, "simulador"); }
        return R;
      }
      function mostrar(R) {
        res.innerHTML = ""; res.hidden = false; res.className = "b-sim-resultado " + (R.ok ? "b-sim-resultado--ok" : "b-sim-resultado--erro");
        if (!R.ok) { res.appendChild(el("p", "b-sim-mensagem", R.mensagem)); return; }
        var cab = el("p", "b-sim-cabecalho", fmtIntervalo(R.entrada, R.saida) + " · " + R.noites + (R.noites === 1 ? " noite" : " noites") + " · " + R.pax + " pessoas · época " + R.epoca);
        res.appendChild(cab);
        var dl = el("dl", "b-sim-linhas");
        linha(dl, R.mensal ? "Estadia (preço mensal)" : R.noites + " × " + euros(R.noite), euros(R.dormidas), "dormidas");
        linha(dl, "Limpeza (uma por estadia)", euros(R.limpeza), "limpeza");
        linha(dl, "Total", euros(R.total), "total");
        res.appendChild(dl);
        if (R.avisos.length) { var ul = el("ul", "b-sim-avisos"); R.avisos.forEach(function (a) { ul.appendChild(el("li", null, a)); }); res.appendChild(ul); }
        if (R.regras && R.regras.length) res.appendChild(el("p", "b-sim-regras", R.regras.join(" · ")));
        var acoes = el("div", "b-sim-acoes");
        var pre = el("button", "b-sim-prereservar", "Pré-reservar"); pre.type = "button";
        pre.addEventListener("click", function () { B.abrirPedido(R); });
        acoes.appendChild(pre);
        acoes.appendChild(ligacaoWhatsApp(R)); acoes.appendChild(ligacaoEmail(R));
        res.appendChild(acoes);
        var temp = el("div", "b-sim-tempo"); temp.hidden = true; res.appendChild(temp);
        tempoDaEstadia(R.entrada, R.saida).then(function (t) {
          if (!t.dias.length) return;
          temp.innerHTML = ""; temp.hidden = false;
          var algumaMedia = t.dias.some(function (d) { return d.media; });
          temp.appendChild(el("p", "b-sim-tempo-titulo", "O tempo nesses dias"));
          var ul = el("ul", "b-tempo-dias"); t.dias.forEach(function (d) { ul.appendChild(linhaDia(d, d.media)); }); temp.appendChild(ul);
          var rot = "Dados: Open-Meteo";
          if (algumaMedia) rot += " · dias a mais de 16 dias: média histórica" + (t.clima && t.clima.exemplo ? " (valores de exemplo)" : " dos últimos 10 anos") + ", não previsão";
          temp.appendChild(el("p", "b-fonte", rot));
        }).catch(function () { temp.hidden = true; });
      }
      function linha(dl, rot, val, classe) { var dt = el("dt", "b-sim-" + classe + "-rotulo", rot), dd = el("dd", "b-sim-" + classe, val); dl.appendChild(dt); dl.appendChild(dd); }
      f.addEventListener("submit", function (ev) { ev.preventDefault(); calcular("form"); });
      B.aoMudarDatas(function (det) { if (det.origem === "simulador") return; if (det.entrada) ent.value = det.entrada; if (det.saida) sai.value = det.saida; if (det.entrada && det.saida) calcular("datas"); });
      var pre = slot.getAttribute("data-entrada"), pos = slot.getAttribute("data-saida");
      if (pre && pos) { ent.value = pre; sai.value = pos; calcular("inicial"); }
      B.simular = function (e, s, p) { ent.value = e; sai.value = s; if (p) sel.value = String(p); return calcular("codigo"); };
      slot.hidden = false;
    }).catch(function () { slot.hidden = true; });
  }

  // ---------- mensagens prontas (S2: WhatsApp e email lado a lado) ----------
  var factos = null;
  carregarFactos();
  function carregarFactos() { carregar("factos").then(function (f) { factos = f; aplicarLigacoes(); }).catch(function () { factos = null; }); }
  // ---------- ligações das plataformas (S34, 25/10): vêm do factos.json, nunca escritas à mão ----------
  // <a data-liga="airbnb|booking|vrbo|instagram|whatsapp|email|maps"> recebe o href oficial; uma ligação escrita à mão para
  // airbnb/booking/vrbo/instagram é corrigida pelo domínio e fica marcada com data-liga-corrigida="1" (o teste e o ChatGPT veem-no).
  var DOMINIOS_LIGA = { airbnb: /(^|\.)airbnb\./i, booking: /(^|\.)booking\.com$/i, vrbo: /(^|\.)vrbo\./i, instagram: /(^|\.)instagram\.com$/i };
  function aplicarLigacoes(raizEl) {
    if (!DOC || !factos || !factos.ligacoes) return;
    var as = (raizEl || DOC).querySelectorAll("a[data-liga], a[href]");
    for (var i = 0; i < as.length; i++) {
      var a = as[i], chave = a.getAttribute("data-liga"), href = a.getAttribute("href") || "";
      if (!chave && /^https?:/i.test(href)) {
        try { var anf = new URL(href).hostname; for (var c in DOMINIOS_LIGA) { if (DOMINIOS_LIGA[c].test(anf)) { chave = c; break; } } } catch (e) { /* href inválido: fica como está */ }
      }
      var oficial = chave && factos.ligacoes[chave];
      if (!oficial) continue;
      if (href !== oficial) { a.setAttribute("href", oficial); a.setAttribute("data-liga-corrigida", "1"); }
      if (/^https?:/i.test(oficial)) { a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener"); }
    }
  }
  B.aplicarLigacoes = aplicarLigacoes;
  function textoPedido(R, extra) {
    var t = "Olá Diogo, gostávamos de ficar no Monte Casa Branca de " + fmtData(deIso(R.entrada)) + " a " + fmtData(deIso(R.saida)) + " (" + R.noites + " noites, " + R.pax + " pessoas).";
    if (R.total) t += " Vi no site o valor de " + euros(R.total) + ".";
    if (extra && extra.nome) t += " Sou " + extra.nome + ".";
    if (extra && extra.mensagem) t += " " + extra.mensagem;
    return t;
  }
  // mensagem sem datas escolhidas (página de contactos, por exemplo): não é pré-reserva, é uma mensagem simples
  function textoMensagem(extra) {
    var t = "Olá!"; if (extra && extra.nome) t += " Sou " + extra.nome + ".";
    t += " " + ((extra && extra.mensagem) || "Gostávamos de saber mais sobre o Monte Casa Branca.");
    return t;
  }
  function ligacaoWhatsApp(R, extra) {
    var a = el("a", "b-ligacao b-ligacao--whatsapp", "WhatsApp");
    var tel = (factos && factos.whatsapp) || "351962802626";
    a.href = "https://wa.me/" + tel + "?text=" + encodeURIComponent(R ? textoPedido(R, extra) : textoMensagem(extra)); a.target = "_blank"; a.rel = "noopener";
    return a;
  }
  function ligacaoEmail(R, extra) {
    var a = el("a", "b-ligacao b-ligacao--email", "Email");
    var mail = (factos && factos.email) || "geral@montecasabranca.pt";
    var assunto = R ? "Pedido de datas · " + fmtIntervalo(R.entrada, R.saida) : "Mensagem pelo site";
    a.href = "mailto:" + mail + "?subject=" + encodeURIComponent(assunto) + "&body=" + encodeURIComponent(R ? textoPedido(R, extra) : textoMensagem(extra));
    return a;
  }

  // ---------- pedido de datas (porta #191, servidor a servidor; aqui só prepara) ----------
  var pedidoSlot = null, pedidoAberto = Date.now();
  function montarPedido(slot) {
    pedidoSlot = slot; slot.classList.add("b-pedido"); slot.innerHTML = "";
    slot.appendChild(el("h3", "b-pedido-titulo", slot.getAttribute("data-titulo") || "Pedir estas datas"));
    var f = el("form", "b-pedido-form"); f.noValidate = true;
    f.appendChild(campoP("Nome", "text", "nome", true)); f.appendChild(campoP("Email", "email", "email", true)); f.appendChild(campoP("Telemóvel", "tel", "telefone", false));
    var temSimulador = !!(DOC && DOC.querySelector('[data-base="simulador"]'));
    var datas = el("p", "b-pedido-datas", temSimulador ? "Escolham primeiro as datas no simulador." : "Sem datas escolhidas: se já as tiverem, indiquem-nas na mensagem."); f.appendChild(datas);
    var lm = el("label", "b-pedido-campo"); lm.appendChild(el("span", "b-pedido-rotulo", "Perguntas ou pedidos (ex.: podemos levar o cão?)")); var ta = el("textarea", "b-pedido-mensagem"); ta.name = "mensagem"; ta.rows = 3; lm.appendChild(ta); f.appendChild(lm);
    var arm = el("input"); arm.type = "text"; arm.name = "armadilha"; arm.tabIndex = -1; arm.autocomplete = "off"; arm.className = "b-visualmente-escondido"; arm.setAttribute("aria-hidden", "true"); f.appendChild(arm);
    var bt = el("button", "b-pedido-enviar", "Enviar pedido"); bt.type = "submit"; f.appendChild(bt);
    slot.appendChild(f);
    var saida = el("div", "b-pedido-resultado"); saida.hidden = true; saida.setAttribute("aria-live", "polite"); slot.appendChild(saida);
    slot.appendChild(el("p", "b-fonte", CFG.prereserva ? "O pedido cria uma pré-reserva «Por confirmar»; o Diogo responde por WhatsApp ou email." : "Demo: nada é enviado nem gravado. Na produção o pedido cria uma pré-reserva na app e o Diogo responde por WhatsApp ou email."));
    var atual = null;
    function campoP(rot, tipo, nome, obrig) { var l = el("label", "b-pedido-campo"); l.appendChild(el("span", "b-pedido-rotulo", rot + (obrig ? "" : " (opcional)"))); var i = el("input", "b-pedido-" + nome); i.type = tipo; i.name = nome; i.required = obrig; i.autocomplete = nome === "nome" ? "name" : nome === "email" ? "email" : "tel"; l.appendChild(i); return l; }
    B.abrirPedido = function (R) {
      atual = R; datas.textContent = fmtIntervalo(R.entrada, R.saida) + " · " + R.noites + " noites · " + R.pax + " pessoas" + (R.total ? " · " + euros(R.total) : "");
      slot.hidden = false; try { slot.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) { /* segue */ }
      var n = f.querySelector('[name="nome"]'); if (n) n.focus();
    };
    f.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var nome = f.nome.value.trim(), email = f.email.value.trim();
      if (!nome || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { mostrar("Precisamos do nome e de um email válido para responder.", true); return; }
      if (!atual) {
        // sem datas não há pré-reserva (o contrato #191 exige entrada e saída): fica uma mensagem simples, por WhatsApp ou email
        var msg = { nome: nome, email: email, telefone: f.telefone.value.trim(), mensagem: ta.value.trim(), origem: slot.getAttribute("data-origem") || "contactos", armadilha: arm.value };
        mostrar("Mensagem preparada (demo: nada foi enviado). Sem datas escolhidas não é uma pré-reserva: na produção seguiria por email para o Diogo. Para já, enviem pelo WhatsApp ou email:", false, msg);
        return;
      }
      var pedido = { pedido_id: uuid(), nome: nome, email: email, telefone: f.telefone.value.trim(), entrada: atual.entrada, saida: atual.saida, pax: atual.pax, mensagem: ta.value.trim(), preco_mostrado: atual.total, lingua: CFG.lingua, origem: slot.getAttribute("data-origem") || "precos", segundos_a_preencher: Math.round((Date.now() - pedidoAberto) / 1000), armadilha: arm.value };
      if (CFG.prereserva) {
        fetch(CFG.prereserva, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(pedido) }).then(function (r) { return r.json(); }).then(function (j) { mostrar(j.mensagem || (j.ok ? "Pedido recebido." : "Não foi possível registar o pedido; falem connosco pelo WhatsApp ou email."), !j.ok, pedido); }).catch(function () { mostrar("Não foi possível registar o pedido; falem connosco pelo WhatsApp ou email.", true, pedido); });
      } else {
        mostrar("Pedido preparado (demo: nada foi enviado). Na produção ficaria registado como pré-reserva para " + fmtIntervalo(atual.entrada, atual.saida) + ". Para já, enviem pelo WhatsApp ou email:", false, pedido);
      }
    });
    function mostrar(msg, erro, pedido) {
      saida.hidden = false; saida.className = "b-pedido-resultado " + (erro ? "b-pedido-resultado--erro" : "b-pedido-resultado--ok"); saida.innerHTML = "";
      saida.appendChild(el("p", "b-pedido-resposta", msg));
      if (pedido) {
        var ac = el("div", "b-pedido-acoes"); ac.appendChild(ligacaoWhatsApp(atual, pedido)); ac.appendChild(ligacaoEmail(atual, pedido)); saida.appendChild(ac);
        if (atual && !CFG.prereserva) { var det = el("details", "b-pedido-json"); det.appendChild(el("summary", null, "O que a produção enviaria à app (contrato #191)")); var pre = el("pre", null, JSON.stringify(pedido, null, 2)); det.appendChild(pre); saida.appendChild(det); }
      }
    }
  }
  if (!B.abrirPedido) B.abrirPedido = function (R) { if (pedidoSlot) return; /* sem formulário na página: as ligações WhatsApp/email do simulador servem */ };
  function uuid() { var s = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"; return s.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0; return (c === "x" ? r : (r & 3 | 8)).toString(16); }); }

  // ---------- antes e depois ----------
  function montarAntesDepois(slot) {
    var antes = slot.getAttribute("data-antes"), depois = slot.getAttribute("data-depois");
    if (!antes || !depois) { slot.hidden = true; return; }
    slot.classList.add("b-ad"); slot.innerHTML = "";
    var imgA = el("img", "b-ad-antes-img"); imgA.src = antes; imgA.alt = slot.getAttribute("data-legenda-antes") || "Antes";
    var caixaD = el("div", "b-ad-depois"); var imgD = el("img", "b-ad-depois-img"); imgD.src = depois; imgD.alt = slot.getAttribute("data-legenda-depois") || "Depois"; caixaD.appendChild(imgD);
    slot.appendChild(imgA); slot.appendChild(caixaD);
    slot.appendChild(el("span", "b-ad-rotulo b-ad-rotulo--antes", slot.getAttribute("data-legenda-antes") || "Antes"));
    slot.appendChild(el("span", "b-ad-rotulo b-ad-rotulo--depois", slot.getAttribute("data-legenda-depois") || "Depois"));
    var r = el("input", "b-ad-cursor"); r.type = "range"; r.min = "0"; r.max = "100"; r.value = "50"; r.setAttribute("aria-label", "Comparar antes e depois");
    function aplicar() { caixaD.style.width = r.value + "%"; imgD.style.width = (10000 / Math.max(1, r.value)) + "%"; }
    r.addEventListener("input", aplicar); slot.appendChild(r); aplicar();
    slot.hidden = false;
  }

  // ---------- montagem ----------
  var MONTADORES = { tempo: montarTempo, calendario: montarCalendario, simulador: montarSimulador, pedido: montarPedido, "antes-depois": montarAntesDepois };
  B.montar = function (raizEl) {
    var nos = (raizEl || DOC).querySelectorAll("[data-base]");
    for (var i = 0; i < nos.length; i++) {
      var n = nos[i], tipo = n.getAttribute("data-base");
      if (n.getAttribute("data-base-montado")) continue;
      if (!MONTADORES[tipo]) continue;
      n.setAttribute("data-base-montado", "1");
      try { MONTADORES[tipo](n); } catch (e) { n.hidden = true; }
    }
    aplicarLigacoes(raizEl);
    // rodapé discreto da demo: ligação à zona de revisão (o ChatGPT pode esconder ou estilizar .b-demo)
    if (global.DEMO_VERSAO && DOC.body && !DOC.querySelector(".b-demo") && !DOC.querySelector('a[href="revisao.html"]')) {
      var p = el("p", "b-demo"); var a = el("a", null, "demo " + (global.DEMO_VERSAO.revisao || "") + " · zona de revisão"); a.href = "revisao.html"; p.appendChild(a); DOC.body.appendChild(p);
    }
  };
  if (DOC) { if (DOC.readyState === "loading") DOC.addEventListener("DOMContentLoaded", function () { B.montar(); }); else B.montar(); }

  if (global) global.MCB_BASE = B;
  if (typeof module !== "undefined" && module.exports) module.exports = B;
})(typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : this));
