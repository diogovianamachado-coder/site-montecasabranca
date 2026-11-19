// Geometria da página em qualquer motor: Chromium, WebKit (o motor do Safari e de todos os browsers do iPhone) ou Firefox.
// Nasceu a 16/11/2026: a versão 2 passou em todos os testes (feitos em Chromium) e no iPhone do Diogo apareceu com as fotografias em
// caixas meio vazias, os campos das datas a sair do ecrã e os menus presos. Este guião não depende do desenho: procura esses sintomas.
//   1. A página não rola na horizontal.
//   2. Fotografias em fila (qualquer faixa que role na horizontal): nenhuma caixa é mais larga do que a sua fotografia e, no que se vê
//      da faixa, quase tudo é fotografia.
//   3. Todas as fotografias que passam pelo ecrã ao rolar a página acabam carregadas.
//   4. Painel das datas: nenhum campo nem botão sai da largura do painel.
//   5. Menu: escolher um destino fecha o menu, leva lá e deixa a página a rolar.
//   6. Movimento (versão 4, 17/11/2026: «As fotos estão estáticas … A régua das fotos não anda», Diogo, com a versão 3 no iPhone):
//      cada rolo de fotografias, posto no ecrã, anda sozinho, SEM ESPERAR POR NADA; anda também com o JavaScript desligado e com
//      «reduzir movimento» pedido ao sistema (mais devagar); o dedo parado segura-o e o dedo para o lado leva-o.
//   7. A capa: ao rolar, a fotografia fica para trás (telemóvel) ou presa ao ecrã (computador).
//   8. A pílula de descer (versão 6, 19/11/2026: «Faltou esta parte»): presa ao ecrã, ao centro; na capa por baixo do botão, depois
//      a flutuar por cima da barra; nunca por cima de letras; cada toque leva à secção seguinte; no fim volta ao topo; sem JavaScript
//      fica na capa.
// Uso: node geometria.cjs <base> <pasta-saída> [motor: chromium|webkit|firefox]      Sai com 1 se houver falhas.
const pw = require('playwright');
const fs = require('fs');
const [base, out, motor = 'chromium'] = process.argv.slice(2);
if (!base || !out || !pw[motor]) { console.error('uso: node geometria.cjs <base> <pasta-saída> [chromium|webkit|firefox]'); process.exit(2); }
fs.mkdirSync(out, { recursive: true });

// Corre dentro da página: desce o ecrã aos poucos e mede o que vai aparecendo.
async function percorrer() {
  const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
  const ficheiro = (i) => ((i.currentSrc || i.src || '').split('/').slice(-2).join('/'));
  const temImagem = (el) => el.tagName === 'IMG' || !!el.querySelector('img');
  // A «caixa» de uma fotografia numa faixa: o antepassado cujo pai tem vários filhos com fotografias (as outras caixas da fila).
  const caixaDe = (img, faixa) => {
    let el = img;
    while (el.parentElement && el !== faixa) {
      const irmaos = Array.from(el.parentElement.children).filter(temImagem);
      if (irmaos.length > 1) return el;
      el = el.parentElement;
    }
    return null;
  };
  const faixas = () => Array.from(document.querySelectorAll('*')).filter((el) => {
    if (el.hasAttribute('data-rolo')) return true;          // os rolos deslizam por transform dentro de uma caixa que não rola
    const s = getComputedStyle(el);
    return (s.overflowX === 'auto' || s.overflowX === 'scroll') && el.scrollWidth > el.clientWidth + 8 && el.querySelector('img');
  });
  const nomeDe = (el) => { const s = el.closest('section[id], [id]'); return (s ? '#' + s.id + ' ' : '') + el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : ''); };

  const vistas = new Set(), caixasMas = new Map(), cobertura = new Map();
  const passo = Math.floor(innerHeight * 0.6);
  for (let y = 0; y <= document.documentElement.scrollHeight; y += passo) {
    window.scrollTo(0, y); await esperar(260);
    // fotografias que estão no ecrã agora
    document.querySelectorAll('img').forEach((i) => { const r = i.getBoundingClientRect(); if (r.width > 2 && r.height > 2 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth) vistas.add(i); });
    // faixas que estão no ecrã agora
    faixas().forEach((f) => {
      const fr = f.getBoundingClientRect(); if (fr.bottom <= 0 || fr.top >= innerHeight || fr.height < 40) return;
      const nome = nomeDe(f); const troços = [];
      f.querySelectorAll('img').forEach((i) => {
        const ir = i.getBoundingClientRect(); const cx = caixaDe(i, f);
        if (cx) {
          const cr = cx.getBoundingClientRect();
          if (cr.width - ir.width > 8 || ir.width < 8 || ir.height < 8) {
            const chave = nome + ' · ' + ficheiro(i);
            if (!caixasMas.has(chave)) caixasMas.set(chave, { faixa: nome, foto: ficheiro(i), caixa: Math.round(cr.width) + '×' + Math.round(cr.height), fotografia: Math.round(ir.width) + '×' + Math.round(ir.height), natural: i.naturalWidth + '×' + i.naturalHeight });
          }
        }
        const a = Math.max(ir.left, fr.left, 0), b = Math.min(ir.right, fr.right, innerWidth);
        if (b > a && ir.bottom > fr.top && ir.top < fr.bottom) troços.push([a, b]);
      });
      const largura = Math.min(fr.right, innerWidth) - Math.max(fr.left, 0); if (largura < 40) return;
      troços.sort((p, q) => p[0] - q[0]); let soma = 0, fim = -Infinity;
      troços.forEach(([a, b]) => { if (b > fim) { soma += b - Math.max(a, fim); fim = b; } });
      const c = soma / largura; if (!cobertura.has(nome) || c < cobertura.get(nome)) cobertura.set(nome, Math.round(c * 100) / 100);
    });
  }
  await esperar(1200);
  const porCarregar = [];
  for (const i of vistas) { for (let t = 0; t < 12 && !(i.complete && i.naturalWidth > 0); t++) await esperar(250); if (!(i.complete && i.naturalWidth > 0)) porCarregar.push(ficheiro(i)); }
  window.scrollTo(0, 0);
  return {
    larguraPagina: document.documentElement.scrollWidth, larguraEcra: innerWidth, altura: document.documentElement.scrollHeight,
    fotografiasVistas: vistas.size, porCarregar: Array.from(new Set(porCarregar)),
    faixas: Array.from(cobertura, ([faixa, coberto]) => ({ faixa, coberto })), caixasMas: Array.from(caixasMas.values()),
  };
}

// Corre dentro da página: onde está a pista do rolo n.º k (px, pelo transform) e quanto mede uma volta.
function lerRolo(k) {
  const el = document.querySelectorAll('[data-rolo]')[k], p = el.querySelector('.rolo-pista'), t = getComputedStyle(p).transform;
  return { x: t && t !== 'none' ? new DOMMatrixReadOnly(t).m41 : 0, volta: p.scrollWidth / 2, nome: (el.closest('section[id]') || {}).id || '?', topo: Math.round(el.getBoundingClientRect().top), altura: Math.round(el.getBoundingClientRect().height) };
}
// Quanto andou para a esquerda entre duas leituras (conta com a volta: a pista recomeça ao fim de cada série).
function andou(a, b) { let d = a.x - b.x; if (d < -a.volta / 2) d += a.volta; if (d > a.volta / 2) d -= a.volta; return Math.round(d * 10) / 10; }
// Põe o rolo n.º k a meio do ecrã e mede quanto anda sozinho em 1,5 s.
async function medirRolo(page, k) {
  await page.evaluate((i) => { const el = document.querySelectorAll('[data-rolo]')[i], r = el.getBoundingClientRect(); window.scrollTo(0, Math.max(0, Math.round(r.top + scrollY - (innerHeight - r.height) / 2))); }, k);
  await page.waitForTimeout(700);
  const a = await page.evaluate(lerRolo, k); await page.waitForTimeout(1500); const b = await page.evaluate(lerRolo, k);
  return { rolo: a.nome, px: andou(a, b) };
}

(async () => {
  const browser = await pw[motor].launch(); const res = [], falhas = [];
  const telemovel = { ...pw.devices['iPhone 14'] }; if (motor === 'firefox') delete telemovel.isMobile;
  for (const [nome, opcoes] of [['telemovel', telemovel], ['computador', { viewport: { width: 1280, height: 800 } }]]) {
    const ctx = await browser.newContext({ ...opcoes, locale: 'pt-PT' });
    const page = await ctx.newPage(); const erros = [];
    page.on('pageerror', (e) => erros.push('pageerror: ' + e.message));
    page.on('console', (m) => { if (m.type() === 'error') erros.push('consola: ' + m.text()); });
    await page.goto(base + '/', { waitUntil: 'load' }); await page.waitForTimeout(1500);
    const r = { motor, nome, ecra: page.viewportSize(), ...(await page.evaluate(percorrer)) };
    await page.screenshot({ path: `${out}/geo-${motor}-${nome}-inteira.jpg`, fullPage: true, type: 'jpeg', quality: 70 }).catch(() => {});

    // 4 · painel das datas: nada sai da largura do painel
    r.painel = null;
    if (await page.locator('#abrir-disponibilidade').count()) {
      await page.evaluate(() => window.scrollTo(0, Math.round(innerHeight * 1.6))); await page.waitForTimeout(900);
      await page.locator('#abrir-disponibilidade').click(); await page.waitForTimeout(1500);
      r.painel = await page.evaluate(() => {
        const p = document.querySelector('#disponibilidade .painel') || document.querySelector('#disponibilidade [role="dialog"]') || document.getElementById('disponibilidade'); if (!p) return { aberto: false };
        const pr = p.getBoundingClientRect(), fora = [];
        p.querySelectorAll('input, select, textarea, button, a').forEach((el) => {
          const er = el.getBoundingClientRect(); if (er.width < 2 || er.height < 2) return;
          if (er.right > pr.right + 1 || er.left < pr.left - 1 || er.right > innerWidth + 1) fora.push((el.id || el.name || el.tagName.toLowerCase()) + ' ' + Math.round(er.left) + '→' + Math.round(er.right) + ' (painel ' + Math.round(pr.left) + '→' + Math.round(pr.right) + ')');
        });
        return { aberto: !document.getElementById('disponibilidade').hidden, larguraPainel: Math.round(pr.width), transbordo: p.scrollWidth - p.clientWidth, fora };
      });
      await page.screenshot({ path: `${out}/geo-${motor}-${nome}-painel.jpg`, type: 'jpeg', quality: 70 }).catch(() => {});
      await page.evaluate(() => { const c = document.querySelector('#disponibilidade .painel'); if (c) c.scrollTop = c.scrollHeight * 0.45; }); await page.waitForTimeout(400);
      await page.screenshot({ path: `${out}/geo-${motor}-${nome}-painel-contas.jpg`, type: 'jpeg', quality: 70 }).catch(() => {});
      await page.keyboard.press('Escape'); await page.waitForTimeout(500);
    }

    // 5 · menu: escolher um destino fecha o menu, leva lá e a página continua a rolar
    r.menu = null;
    if (await page.locator('#abrir-menu').count()) {
      await page.evaluate(() => window.scrollTo(0, Math.round(innerHeight * 1.6))); await page.waitForTimeout(900);
      await page.locator('#abrir-menu').click(); await page.waitForTimeout(700);
      const destino = await page.evaluate(() => { const a = Array.from(document.querySelectorAll('#menu a[href^="#"]')).filter((x) => document.getElementById(x.getAttribute('href').slice(1))); const e = a.find((x) => /montemor/.test(x.getAttribute('href'))) || a[a.length - 1]; return e ? e.getAttribute('href') : null; });
      if (destino) {
        await page.locator(`#menu a[href="${destino}"]`).first().click(); await page.waitForTimeout(3000);
        r.menu = await page.evaluate((d) => {
          // «instant»: a página tem rolagem suave; sem isto o scrollY só mudava uns instantes depois e o teste lia o valor antigo
          const alvo = document.getElementById(d.slice(1)), y0 = Math.round(scrollY); window.scrollBy({ top: 120, behavior: 'instant' }); const y1 = Math.round(scrollY); window.scrollBy({ top: -120, behavior: 'instant' });
          return { destino: d, menuFechado: document.getElementById('menu').hidden || getComputedStyle(document.getElementById('menu')).display === 'none', topoDoAlvo: Math.round(alvo.getBoundingClientRect().top), endereco: location.hash, paginaRola: y1 !== y0, corpo: getComputedStyle(document.body).overflowY + '/' + getComputedStyle(document.documentElement).overflowY + '/' + getComputedStyle(document.body).position };
        }, destino);
        await page.screenshot({ path: `${out}/geo-${motor}-${nome}-depois-do-menu.jpg`, type: 'jpeg', quality: 70 }).catch(() => {});
      }
    }
    // 7 · a capa: ao rolar 200 px, a fotografia fica para trás. No telemóvel é a paralaxe da versão 2 (sobe 150 px em vez de 200:
    //     desce um quarto do que a página sobe); no computador com rato está presa ao ecrã (não sobe). Na versão 3 a fotografia saiu
    //     do ecrã com a página, «em modo estático», e o Diogo deu por isso no iPhone (17/11/2026); a bateria passa a dar primeiro.
    await page.keyboard.press('Escape').catch(() => {});
    r.capa = await page.evaluate(async () => {
      const esperar = (ms) => new Promise((ok) => setTimeout(ok, ms));
      const f = document.querySelector('.hero-fundo picture') || document.querySelector('.hero-fundo'); if (!f) return null;
      window.scrollTo({ top: 0, behavior: 'instant' }); await esperar(400); const a = f.getBoundingClientRect().top;
      window.scrollTo({ top: 200, behavior: 'instant' }); await esperar(400); const b = f.getBoundingClientRect().top;
      window.scrollTo({ top: 0, behavior: 'instant' }); await esperar(300);
      return { subiu: Math.round((a - b) * 10) / 10 };
    });
    // 8 · a pílula de descer (versão 6, 19/11/2026). Diogo, 18/11: «Está a faltar a pílula do movimento para baixo durante todo o
    //     site» e «O ícone do rato pode ficar no meio, mais flutuante e sem ficar em frente ao texto. Sobe a posição»; 19/11, com a
    //     versão 5 no iPhone: «Faltou esta parte». Confere: presa ao ecrã; na capa vê-se, ao centro, por baixo do botão; depois da capa
    //     fica a flutuar por cima da barra de baixo, com ar à volta; NUNCA SE VÊ POR CIMA DE LETRAS (as linhas de texto são medidas
    //     uma a uma, sem perguntar nada ao site.js) e vê-se em vários sítios; cada toque leva à secção seguinte; no fim vira-se e volta
    //     ao topo; com o menu aberto esconde-se.
    await page.keyboard.press('Escape').catch(() => {}); await page.mouse.move(2, 2).catch(() => {});
    r.pilula = await page.evaluate(async () => {
      const esperar = (ms) => new Promise((ok) => setTimeout(ok, ms));
      const p = document.getElementById('pilula'); if (!p) return null;
      const rato = p.querySelector('.pilula-rato'), dock = document.getElementById('dock');
      const visivel = () => !p.classList.contains('apagada') && +getComputedStyle(p).opacity > 0.5;
      // Rolar como uma pessoa: primeiro o «gesto» (uma roda), que diz ao site que a viagem de um toque anterior acabou (site.js, irPara).
      const ir = (y) => { window.dispatchEvent(new Event('wheel')); window.scrollTo({ top: y, behavior: 'instant' }); };
      // Letras que se vêem por baixo da pílula: as linhas de cada texto da página (Range.getClientRects), tirando o que não se vê
      // (camadas fechadas, respostas fechadas, texto transparente ou escondido).
      const letrasPorBaixo = () => {
        const r = rato.getBoundingClientRect(), achadas = [];
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (/\S/.test(n.nodeValue) ? 1 : 2) });
        let n; while ((n = w.nextNode())) {
          const el = n.parentElement; if (!el || p.contains(el) || el.closest('#dock, #menu, #disponibilidade, #galeria-ecra, script, style, [hidden]')) continue;
          if (el.closest('details:not([open])') && !el.closest('summary')) continue;
          const pr = el.getBoundingClientRect(); if (pr.bottom < r.top - 40 || pr.top > r.bottom + 40) continue;
          const s = getComputedStyle(el); if (s.visibility === 'hidden' || +s.opacity === 0) continue;
          const rg = document.createRange(); rg.selectNodeContents(n);
          for (const q of rg.getClientRects()) if (q.width > 0 && q.left < r.right + 2 && q.right > r.left - 2 && q.top < r.bottom + 2 && q.bottom > r.top - 2) { achadas.push(n.nodeValue.trim().slice(0, 40)); break; }
        }
        return achadas;
      };
      const res = { fixa: getComputedStyle(p).position === 'fixed' };
      ir(0); await esperar(900);
      let rr = rato.getBoundingClientRect(); const botao = document.querySelector('.hero-botoes');
      res.capa = { visivel: visivel(), centro: Math.round((rr.left + rr.right) / 2 - innerWidth / 2), folgaEmBaixo: Math.round(innerHeight - rr.bottom), abaixoDoBotao: botao ? Math.round(rr.top - botao.getBoundingClientRect().bottom) : null, letras: letrasPorBaixo() };
      // a página toda, com paragens: nunca se vê por cima de letras; vê-se em vários sítios
      const total = document.documentElement.scrollHeight, passo = Math.round(innerHeight * 0.6), sobre = []; let vistas = 0;
      for (let y = 0; y <= total; y += passo) {
        ir(y); await esperar(700);
        if (visivel()) { vistas++; const l = letrasPorBaixo(); if (l.length) sobre.push(Math.round(scrollY) + ' px: «' + l[0] + '»'); }
      }
      res.vistas = vistas; res.paragens = Math.ceil(total / passo); res.sobreLetras = sobre.slice(0, 4);
      // depois da capa: a flutuar por cima da barra de baixo, ao centro
      ir(Math.round(innerHeight * 2.2)); await esperar(1000);
      rr = rato.getBoundingClientRect();
      res.depoisDaCapa = { alto: p.classList.contains('alto'), barra: dock.classList.contains('visivel'), folgaBarra: Math.round(dock.getBoundingClientRect().top - rr.bottom), centro: Math.round((rr.left + rr.right) / 2 - innerWidth / 2) };
      // cada toque leva à secção seguinte (o toque é o clique do próprio elemento: apagada, a pílula não se deixa tocar com o dedo)
      const chegou = async (id, ms) => { const a = document.getElementById(id); for (let t = 0; t < ms; t += 100) { await esperar(100); if (a && Math.abs(a.getBoundingClientRect().top) <= 3) return true; } return a ? Math.round(a.getBoundingClientRect().top) : 'sem #' + id; };
      ir(0); await esperar(800);
      p.click(); res.toque1 = await chegou('a-casa', 4500);
      await esperar(300); p.click(); res.toque2 = await chegou('por-fora', 4500);
      // no fim da página: vira-se, vê-se sobre o verde do rodapé e leva ao topo
      ir(document.documentElement.scrollHeight); await esperar(1200);
      res.fim = { topo: p.classList.contains('topo'), visivel: visivel(), rotulo: p.getAttribute('aria-label'), letras: letrasPorBaixo() };
      p.click(); for (let t = 0; t < 7000 && scrollY > 2; t += 100) await esperar(100);
      res.voltouAoTopo = Math.round(scrollY);
      // com o menu aberto, esconde-se
      ir(Math.round(innerHeight * 1.6)); await esperar(900);
      const abrir = document.getElementById('abrir-menu');
      if (abrir) { abrir.click(); await esperar(500); res.comMenu = visivel(); const f = document.querySelector('#menu [data-fechar]'); if (f) f.click(); await esperar(400); }
      ir(0); await esperar(300);
      return res;
    });

    // 6 · movimento: cada rolo, posto no ecrã, anda sozinho; o dedo parado segura-o, o dedo para o lado leva-o e, largado, continua
    await page.keyboard.press('Escape').catch(() => {}); await page.mouse.move(2, 2).catch(() => {});
    const nRolos = await page.locator('[data-rolo]').count();
    r.movimento = { rolos: nRolos, sozinhos: [], gesto: null };
    for (let k = 0; k < nRolos; k++) r.movimento.sozinhos.push(await medirRolo(page, k));
    if (nRolos) {
      await medirRolo(page, 0);
      // Os gestos são acontecimentos de ponteiro fabricados dentro da página (um «dedo» com o número 71): servem em qualquer motor.
      r.movimento.gesto = await page.evaluate(async (ler) => {
        const lerRolo = new Function('return (' + ler + ')')();
        const esperar = (ms) => new Promise((ok) => setTimeout(ok, ms));
        const el = document.querySelector('[data-rolo]'), cx = el.getBoundingClientRect(), y = cx.top + Math.min(cx.height / 2, 150);
        const ponteiro = (tipo, x) => el.dispatchEvent(new PointerEvent(tipo, { pointerId: 71, pointerType: 'touch', isPrimary: true, clientX: x, clientY: y, bubbles: true, cancelable: true }));
        const dif = (a, b) => { let d = a.x - b.x; if (d < -a.volta / 2) d += a.volta; if (d > a.volta / 2) d -= a.volta; return Math.round(d * 10) / 10; };
        // Sonda (18/11/2026): que animação move a faixa e se o seu tempo se deixa mudar neste motor (para uma falha dizer porquê).
        const pista = el.querySelector('.rolo-pista'), an = pista.getAnimations ? pista.getAnimations() : [];
        const sonda = { js: el.classList.contains('rolo-js'), animacoes: an.map((a) => (a.animationName || 'js') + ':' + a.playState).join(','), tipoTempo: an[0] ? typeof an[0].currentTime : '-' };
        try { sonda.duracao = an[0] ? String(an[0].effect.getComputedTiming().duration) : '-'; } catch (e) { sonda.duracao = 'erro: ' + e.message; }
        ponteiro('pointerdown', 300); await esperar(150); const p1 = lerRolo(0); await esperar(900); const p2 = lerRolo(0);      // dedo parado: a faixa espera
        sonda.depoisDoDedo = an.map((a) => a.playState).join(',');
        for (let i = 1; i <= 10; i++) { ponteiro('pointermove', 300 - i * 20); await esperar(16); } const p3 = lerRolo(0);                // dedo 200 px para a esquerda: leva-a
        ponteiro('pointerup', 100); await esperar(1300); const p4 = lerRolo(0); await esperar(1200); const p5 = lerRolo(0);                // largada: continua
        // e, já largada, se mudar o tempo à mão move a faixa (o que o dedo faz por dentro)
        if (an[0]) { const a = an[0], q0 = lerRolo(0); try { a.pause(); a.currentTime = (+a.currentTime || 0) + 2000; await esperar(60); sonda.tempoAMao = dif(q0, lerRolo(0)); } catch (e) { sonda.tempoAMao = 'erro: ' + e.message; } try { a.play(); } catch (e) {} }
        return { parado: dif(p1, p2), levou: dif(p2, p3), depois: dif(p4, p5), abriuFotografia: !document.getElementById('galeria-ecra').hidden, sonda };
      }, lerRolo.toString());
    }
    r.erros = Array.from(new Set(erros)).slice(0, 6);
    res.push(r); await ctx.close();

    const q = `${motor} · ${nome}`;
    if (r.larguraPagina > r.larguraEcra + 1) falhas.push(`${q}: a página rola na horizontal (${r.larguraPagina} > ${r.larguraEcra})`);
    if (r.caixasMas.length) falhas.push(`${q}: ${r.caixasMas.length} fotografia(s) em fila com a caixa mais larga do que a fotografia, p. ex. ${r.caixasMas.slice(0, 3).map((c) => `${c.foto} (caixa ${c.caixa}, fotografia ${c.fotografia})`).join(' · ')}`);
    r.faixas.filter((f) => f.coberto < 0.85).forEach((f) => falhas.push(`${q}: na faixa «${f.faixa}» só ${Math.round(f.coberto * 100)} % do que se vê é fotografia`));
    if (r.porCarregar.length) falhas.push(`${q}: ${r.porCarregar.length} fotografia(s) passaram pelo ecrã sem carregar, p. ex. ${r.porCarregar.slice(0, 4).join(', ')}`);
    if (r.painel && (!r.painel.aberto || r.painel.fora.length || r.painel.transbordo > 1)) falhas.push(`${q}: painel das datas ${!r.painel.aberto ? 'não abriu' : 'com campos fora da largura: ' + (r.painel.fora.slice(0, 4).join(' · ') || 'transbordo de ' + r.painel.transbordo + ' px')}`);
    if (r.menu && (!r.menu.menuFechado || Math.abs(r.menu.topoDoAlvo) > 160 || !r.menu.paginaRola || r.menu.endereco)) falhas.push(`${q}: o menu não levou a ${r.menu.destino} como deve (fechado: ${r.menu.menuFechado}, topo do destino: ${r.menu.topoDoAlvo}, a página rola: ${r.menu.paginaRola}, endereço: «${r.menu.endereco}»)`);
    if (r.erros.length) falhas.push(`${q}: erros de JavaScript: ${r.erros.join(' | ')}`);
    if (!r.capa) falhas.push(`${q}: não encontrei a fotografia da capa`);
    else if (nome === 'telemovel' && !(r.capa.subiu >= 140 && r.capa.subiu <= 160)) falhas.push(`${q}: ao rolar 200 px, a fotografia da capa subiu ${r.capa.subiu} px; com a paralaxe da versão 2 sobe 150 (fica para trás um quarto da rolagem)`);
    else if (nome === 'computador' && Math.abs(r.capa.subiu) > 6) falhas.push(`${q}: ao rolar 200 px, a fotografia da capa subiu ${r.capa.subiu} px; no computador está presa ao ecrã e não sobe`);
    const pl = r.pilula;
    if (!pl) falhas.push(`${q}: não encontrei a pílula de descer (#pilula)`);
    else {
      if (!pl.fixa) falhas.push(`${q}: a pílula de descer não ficou presa ao ecrã`);
      if (!pl.capa.visivel) falhas.push(`${q}: na capa, a pílula de descer não se vê`);
      if (Math.abs(pl.capa.centro) > 2) falhas.push(`${q}: na capa, a pílula não está ao centro (${pl.capa.centro} px)`);
      if (pl.capa.letras.length) falhas.push(`${q}: na capa, a pílula fica por cima de texto («${pl.capa.letras[0]}»)`);
      if (pl.capa.folgaEmBaixo < 8) falhas.push(`${q}: na capa, a pílula está colada ao fundo do ecrã (${pl.capa.folgaEmBaixo} px)`);
      if (pl.capa.abaixoDoBotao !== null && pl.capa.abaixoDoBotao < 4) falhas.push(`${q}: na capa, a pílula não ficou por baixo do botão (${pl.capa.abaixoDoBotao} px)`);
      if (pl.sobreLetras.length) falhas.push(`${q}: a pílula vê-se por cima de texto: ${pl.sobreLetras.join(' · ')}`);
      if (pl.vistas < 6) falhas.push(`${q}: a pílula quase nunca se vê (${pl.vistas} de ${pl.paragens} paragens)`);
      if (!pl.depoisDaCapa.alto || !pl.depoisDaCapa.barra || pl.depoisDaCapa.folgaBarra < 24) falhas.push(`${q}: depois da capa, a pílula não ficou a flutuar por cima da barra de baixo (${JSON.stringify(pl.depoisDaCapa)})`);
      if (Math.abs(pl.depoisDaCapa.centro) > 2) falhas.push(`${q}: depois da capa, a pílula não está ao centro (${pl.depoisDaCapa.centro} px)`);
      if (pl.toque1 !== true) falhas.push(`${q}: um toque na pílula, na capa, não levou à casa (topo de #a-casa: ${pl.toque1})`);
      if (pl.toque2 !== true) falhas.push(`${q}: o toque seguinte não levou ao capítulo «Por fora» (topo: ${pl.toque2})`);
      if (!pl.fim.topo || !pl.fim.visivel || pl.fim.letras.length || pl.fim.rotulo !== 'Voltar ao topo') falhas.push(`${q}: no fim da página a pílula não se virou para voltar ao topo, ou não se vê, ou tapa texto (${JSON.stringify(pl.fim)})`);
      if (pl.voltouAoTopo > 2) falhas.push(`${q}: no fim da página, um toque na pílula não voltou ao topo (ficou a ${pl.voltouAoTopo} px)`);
      if (pl.comMenu) falhas.push(`${q}: com o menu aberto, a pílula continuou à vista`);
    }
    const m = r.movimento;
    if (!m.rolos) falhas.push(`${q}: a página não tem rolos de fotografias`);
    m.sozinhos.filter((s) => !(s.px >= 20)).forEach((s) => falhas.push(`${q}: as fotografias de «${s.rolo}» não andam sozinhas (${s.px} px em 1,5 s; têm de andar pelo menos 20)`));
    if (m.gesto) {
      if (Math.abs(m.gesto.parado) > 1) falhas.push(`${q}: com o dedo parado em cima, as fotografias continuaram a andar (${m.gesto.parado} px)`);
      if (!(m.gesto.levou > 150 && m.gesto.levou < 260)) falhas.push(`${q}: o dedo 200 px para a esquerda não levou as fotografias (${m.gesto.levou} px; sonda ${JSON.stringify(m.gesto.sonda)})`);
      if (!(m.gesto.depois >= 15)) falhas.push(`${q}: depois de largadas, as fotografias não continuaram a andar (${m.gesto.depois} px em 1,2 s)`);
      if (m.gesto.abriuFotografia) falhas.push(`${q}: levar as fotografias com o dedo abriu uma fotografia em grande`);
    }
  }

  // 6 (continuação) · o movimento não pode depender do JavaScript nem ficar parado com «reduzir movimento»
  {
    const telemovelSem = { ...telemovel, javaScriptEnabled: false };
    const ctx = await browser.newContext({ ...telemovelSem, locale: 'pt-PT' }); const page = await ctx.newPage();
    await page.goto(base + '/#por-fora', { waitUntil: 'load' }); await page.waitForTimeout(1200);
    const sem = { caixa: null, mexeu: false };
    const cx = await page.locator('[data-rolo]').first().boundingBox().catch(() => null);
    if (cx) {
      const vp = page.viewportSize(), topo = Math.max(0, Math.round(cx.y)), recorte = { x: 0, y: topo, width: vp.width, height: Math.max(40, Math.min(Math.round(cx.height), vp.height - topo)) };
      sem.caixa = recorte;
      if (cx.y < vp.height - 40) { const f1 = await page.screenshot({ clip: recorte }); await page.waitForTimeout(2000); const f2 = await page.screenshot({ clip: recorte }); sem.mexeu = Buffer.compare(f1, f2) !== 0; }
    }
    // 8 (continuação) · sem JavaScript, a pílula fica na capa, ao centro e em baixo (leva à casa)
    await page.goto(base + '/', { waitUntil: 'load' }); await page.waitForTimeout(600);
    const pb = await page.locator('#pilula').boundingBox().catch(() => null), hb = await page.locator('#inicio').boundingBox().catch(() => null);
    sem.pilula = pb && hb ? { centro: Math.round(pb.x + pb.width / 2 - hb.width / 2), folgaEmBaixo: Math.round(hb.y + hb.height - (pb.y + pb.height)) } : null;
    await ctx.close();
    const ctx2 = await browser.newContext({ ...telemovel, locale: 'pt-PT', reducedMotion: 'reduce' }); const page2 = await ctx2.newPage();
    await page2.goto(base + '/', { waitUntil: 'load' }); await page2.waitForTimeout(1200);
    const calmo = await medirRolo(page2, 0);
    const texto = await page2.evaluate(() => { const e = document.querySelector('#por-fora .reveal'); return e ? { opacidade: getComputedStyle(e).opacity, deslocado: getComputedStyle(e).transform } : null; });
    await ctx2.close();
    res.push({ motor, nome: 'movimento sem JavaScript e com «reduzir movimento»', semJavaScript: sem, reduzirMovimento: { ...calmo, texto } });
    const q = `${motor} · telemóvel`;
    if (!sem.caixa) falhas.push(`${q} sem JavaScript: não encontrei as fotografias de «Por fora»`);
    else if (!sem.mexeu) falhas.push(`${q} sem JavaScript: as fotografias não andam (duas imagens com 2 s de intervalo saíram iguais). O movimento tem de ser da folha de estilos`);
    if (!sem.pilula || Math.abs(sem.pilula.centro) > 2 || sem.pilula.folgaEmBaixo < 0 || sem.pilula.folgaEmBaixo > 40) falhas.push(`${q} sem JavaScript: a pílula de descer não está na capa, ao centro e em baixo (${JSON.stringify(sem.pilula)})`);
    if (!(calmo.px >= 8)) falhas.push(`${q} com «reduzir movimento»: as fotografias ficaram paradas (${calmo.px} px em 1,5 s); nesta versão continuam a andar, mais devagar`);
    if (calmo.px > 40) falhas.push(`${q} com «reduzir movimento»: as fotografias andam depressa de mais (${calmo.px} px em 1,5 s)`);
  }
  await browser.close();
  fs.writeFileSync(`${out}/geometria-${motor}.json`, JSON.stringify(res, null, 1));
  console.log(JSON.stringify(res, null, 1));
  if (falhas.length) { console.error(`GEOMETRIA FALHOU (${motor}):\n  ` + falhas.join('\n  ')); process.exit(1); }
  console.log(`geometria OK em ${motor}: sem rolagem horizontal, fotografias a encher as caixas e carregadas, painel dentro da largura, menu a levar ao destino, a fotografia da capa a ficar para trás ao rolar, fotografias a andar sozinhas (também sem JavaScript e com «reduzir movimento») e a deixarem-se levar, e a pílula de descer ao centro, nunca por cima de texto, a levar à secção seguinte e, no fim, ao topo`);
})().catch((e) => { console.error(e); process.exit(1); });
