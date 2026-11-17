// Capturas e cenário do site em PHP (site/) a 390 e 1280 px, na versão 3 (composição feita com o Lovable, 16/11/2026):
// página inteira · ligações internas (sem «#» no endereço) · sequências de fotografias (caixas do tamanho da fotografia, avanço sozinho,
// sem contagem; com rato: setas em círculo e o rato em cima a parar o avanço; no telemóvel: sem setas e os gestos de dedo, rolar a
// página por cima da faixa e levar a faixa) · a fila do fecho (ordem diferente em cada visita, avança sozinha) · «Antes de chegar»
// (duas colunas no computador, «+» que passa a «−») · frases de quem já ficou (sem contagem) · painel com datas e conta, pedido (com
// o fluxo do preço quando a app de ensaio responde 409), conta entre épocas, tempo da estadia (previsão e médias) · fotografia em
// ecrã inteiro · álbuns · menu (escolher um destino fecha-o e leva lá de imediato).
// As notas do Diogo de 15/11/2026 que este cenário guarda: «não precisa de dizer que tem fotos» (sem contagens), as fotografias do
// fecho «a rolar random», «Antes de chegar» como na referência dele e a secção das fotografias chamar-se só «Passear pelo Monte».
// Uso: node captura-site.cjs <base> <pasta-saída> <app|semapp>
// Os gestos de dedo são toques a sério, enviados pelo protocolo do Chromium (este cenário corre só em Chromium; a geometria da
// página no motor do Safari é o geometria.cjs). Falha (exit 1) se alguma destas coisas não estiver como deve.
// A fotografia da página inteira faz-se no fim, numa página à parte: no Chromium, depois de uma fotografia «fullPage», o telemóvel
// simulado passa a responder como um computador com rato («hover: hover», «pointer: fine») e a página deixava de ser a do telemóvel
// (as setas das sequências, que só existem com rato, apareciam nas capturas seguintes).
const { chromium } = require('playwright');
const fs = require('fs');
const [base, out, modo] = process.argv.slice(2);
async function rolar(page) { await page.evaluate(async () => { const passo = Math.floor(window.innerHeight * 0.7); for (let y = 0; y < document.body.scrollHeight; y += passo) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 110)); } window.scrollTo(0, document.body.scrollHeight); await new Promise(r => setTimeout(r, 400)); window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 600)); }); }
(async () => {
  const browser = await chromium.launch(); const res = [];
  for (const [nome, vp, dsf, movel] of [['390', { width: 390, height: 844 }, 2, true], ['1280', { width: 1280, height: 800 }, 1, false]]) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: dsf, locale: 'pt-PT', hasTouch: movel, isMobile: movel });
    const page = await ctx.newPage(); const erros = [], pedidos = [];
    page.on('pageerror', e => erros.push('pageerror: ' + e.message));
    page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') erros.push(m.type() + ': ' + m.text()); });
    page.on('response', r => { if (r.url().includes('/api/')) pedidos.push(r.status() + ' ' + r.url().replace(base, '').slice(0, 70)); });
    const cdp = movel ? await ctx.newCDPSession(page) : null;
    const arrastar = async (x0, y0, x1, y1, passos = 12) => {            // um dedo a sério, do ponto 0 ao ponto 1
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x0, y: y0 }] });
      for (let i = 1; i <= passos; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x0 + (x1 - x0) * i / passos, y: y0 + (y1 - y0) * i / passos }] }); await page.waitForTimeout(16); }
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    };
    await page.goto(base + '/', { waitUntil: 'networkidle' }); await page.waitForTimeout(800); await rolar(page);
    const medidas = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth, altura: document.body.scrollHeight, imgs: document.querySelectorAll('img').length, imgsM: Array.from(document.querySelectorAll('img')).filter(i => (i.currentSrc || '').includes('-m.')).length, faq: document.querySelectorAll('details.pergunta').length, faqUltima: (Array.from(document.querySelectorAll('details.pergunta summary span')).pop() || {}).textContent || '', sequencias: document.querySelectorAll('[data-seq]').length, citacoes: document.querySelectorAll('#citacoes .citacao').length,
      capitulos: ['a-casa', 'por-fora', 'sem-pressa', 'por-dentro', 'fecho', 'montemor', 'nacional2', 'onde', 'galeria', 'antes-de-chegar', 'avaliacoes', 'contactos'].map(id => { const e = document.getElementById(id); return e ? Math.round(e.getBoundingClientRect().top + window.scrollY) : -1; }),
      contagens: document.querySelectorAll('[data-seq-atual], .seq-conta, #citacoes-atual, .citacoes-conta').length,
      setasAVista: Array.from(document.querySelectorAll('.seq-setas')).filter(e => getComputedStyle(e).display !== 'none').length, setasTodas: document.querySelectorAll('.seq-setas').length,
      sobretituloGaleria: ((document.querySelector('#galeria .eyebrow') || {}).textContent || '').trim(),
      fila: Array.from(document.querySelectorAll('#fecho .fila-item img')).map(i => (i.getAttribute('src') || '').split('/').slice(-2).join('/')),
      filaGaleria: (() => { try { const g = JSON.parse(document.querySelector('#fecho .fila').getAttribute('data-galeria')); return (g.fotos || g).map(f => (f.src || '').split('/').slice(-2).join('/')); } catch (e) { return ['erro: ' + e.message]; } })(),
      antes: (() => { const t = document.querySelector('#antes-de-chegar .antes-titulo'), a = document.querySelector('#antes-de-chegar .acordeao'); if (!t || !a) return null; const tr = t.getBoundingClientRect(), ar = a.getBoundingClientRect(); return { tituloDir: Math.round(tr.right), tituloBaixo: Math.round(tr.bottom + window.scrollY), tituloLinhas: Math.round(tr.height / parseFloat(getComputedStyle(t).lineHeight)), perguntasEsq: Math.round(ar.left), perguntasTopo: Math.round(ar.top + window.scrollY), tituloTopo: Math.round(tr.top + window.scrollY) }; })() }));
    // Ligações internas: levam à secção e não deixam «#secção» no endereço (era o que fazia a página abrir fora do sítio)
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(300);
    await page.click(movel ? '.hero-botoes a' : '.hero-nav a[href="#galeria"]'); await page.waitForTimeout(3200);
    const ligacao = await page.evaluate((m) => ({ url: location.href, y: Math.round(window.scrollY), topo: Math.round(document.getElementById(m ? 'a-casa' : 'galeria').getBoundingClientRect().top) }), movel);
    // Abrir com «#galeria» no endereço: vai para a galeria e o endereço fica limpo; com «#casa» (endereço antigo) fica na capa
    const p2 = await ctx.newPage(); await p2.goto(base + '/#galeria', { waitUntil: 'load' }); await p2.waitForTimeout(900);
    const comHash = await p2.evaluate(() => ({ url: location.href, y: Math.round(window.scrollY) }));
    const filaOutraVisita = await p2.evaluate(() => Array.from(document.querySelectorAll('#fecho .fila-item img')).map(i => (i.getAttribute('src') || '').split('/').slice(-2).join('/')));
    await p2.close();
    const p3 = await ctx.newPage(); await p3.goto(base + '/#casa', { waitUntil: 'load' }); await p3.waitForTimeout(900);
    const hashAntigo = await p3.evaluate(() => ({ url: location.href, y: Math.round(window.scrollY) })); await p3.close();

    // Sequências de fotografias (o capítulo «Por fora»)
    // (sem contagem na página: a fotografia que está à frente lê-se pela posição da faixa)
    const lerSeq = () => page.evaluate(() => { const f = document.querySelector('#por-fora .seq-faixa'), itens = Array.from(f.querySelectorAll('.seq-item')), m = parseFloat(getComputedStyle(f).paddingLeft) || 0, max = Math.max(0, f.scrollWidth - f.clientWidth); let i = 0, d = Infinity; itens.forEach((li, k) => { const dd = Math.abs(Math.min(Math.max(0, li.offsetLeft - m), max) - f.scrollLeft); if (dd < d) { d = dd; i = k; } }); if (max > 0 && f.scrollLeft >= max - 2) i = itens.length - 1; return { x: Math.round(f.scrollLeft), i: i + 1, fora: Math.round(d), y: Math.round(window.scrollY), topo: Math.round(f.getBoundingClientRect().top) }; });
    // 1) cada caixa tem o tamanho da sua fotografia (o que falhou no iPhone na versão 2 foi a caixa ficar mais larga)
    const caixas = await page.evaluate(() => Array.from(document.querySelectorAll('.seq-item, .fila-item, .album:not(.escondido) li')).map((li) => { const i = li.querySelector('img'), a = li.getBoundingClientRect(), b = i ? i.getBoundingClientRect() : { width: 0, height: 0 }; return Math.abs(a.width - b.width) > 1 || Math.abs(a.height - b.height) > 1 || a.width < 100 || a.height < 100 ? (i ? (i.currentSrc || i.src).split('/').pop() : 'sem imagem') + ' caixa ' + Math.round(a.width) + '×' + Math.round(a.height) + ' fotografia ' + Math.round(b.width) + '×' + Math.round(b.height) : null; }).filter(Boolean));
    // 2) à vista e com a página parada, avança sozinha (um passo de 5 em 5 segundos)
    await page.evaluate(() => { const f = document.querySelector('#por-fora .seq-faixa'); window.scrollTo(0, f.getBoundingClientRect().top + window.scrollY - 150); }); await page.waitForTimeout(600);
    if (!movel) await page.mouse.move(4, 4);          // o rato longe das fotografias: em cima delas o avanço espera, de propósito
    const s0 = await lerSeq(); await page.waitForTimeout(5600); const s1 = await lerSeq();
    await page.screenshot({ path: `${out}/${modo}-${nome}-por-fora.jpg`, type: 'jpeg', quality: 80 });
    // 2b) com rato: em cima das fotografias o avanço pára («parar»); ao sair, retoma
    let rato = null;
    if (!movel) {
      await page.mouse.move(400, s1.topo + 200); await page.waitForTimeout(6600); const r1 = await lerSeq();
      await page.mouse.move(4, 4); await page.waitForTimeout(5400); const r2 = await lerSeq();
      rato = { emCima: r1.x - s1.x, depoisDeSair: r2.x - r1.x };
    }
    let dedo = null;
    if (movel) {
      // 3) rolar a página com o dedo em cima da faixa: a página rola, a faixa não se mexe, e continua a avançar sozinha
      const a = await lerSeq(); await arrastar(195, a.topo + 190, 195, a.topo + 70); await page.waitForTimeout(900); const b = await lerSeq();
      await page.waitForTimeout(6600); const c = await lerSeq();
      // 4) levar a faixa com o dedo (para a esquerda, e se já estiver no fim para a direita): ela vai, pára numa fotografia e deixa de avançar sozinha
      const noFim = await page.evaluate(() => { const f = document.querySelector('#por-fora .seq-faixa'); return f.scrollLeft >= f.scrollWidth - f.clientWidth - 2; });
      const e0 = await lerSeq(); await arrastar(noFim ? 60 : 300, e0.topo + 190, noFim ? 300 : 60, e0.topo + 194); await page.waitForTimeout(1600); const e1 = await lerSeq();
      await page.waitForTimeout(7200); const e2 = await lerSeq();
      dedo = { vertical: { paginaRolou: b.y - a.y, faixaMexeu: b.x - a.x }, continuouSozinha: c.x !== b.x, horizontal: { faixaMexeu: e1.x - e0.x, paginaRolou: e1.y - e0.y, fotografia: e1.i, foraDoSitio: e1.fora }, depoisDoDedo: e2.x - e1.x };
    }
    // 5) as setas (só existem com rato): um passo para cada lado, em círculo
    const nSeq = await page.locator('#por-fora .seq-item').count(); const setas = []; let recuo = null;
    if (!movel) {
      await page.evaluate(() => { document.querySelector('#por-fora .seq-faixa').scrollLeft = 0; }); await page.waitForTimeout(700);
      for (let i = 0; i < nSeq; i++) { await page.click('#por-fora [data-seq-ir="1"]'); await page.waitForTimeout(950); setas.push((await lerSeq()).i); }
      await page.click('#por-fora [data-seq-ir="-1"]'); await page.waitForTimeout(950); recuo = (await lerSeq()).i;
      await page.mouse.move(4, 4);
    }
    const sequencia = { caixas, antes: s0, depois: s1, rato, dedo, setas, recuo, fotografias: nSeq };

    // A fila do fecho: à vista e com a página parada, avança sozinha («a rolar»)
    await page.evaluate(() => { const f = document.querySelector('#fecho .fila'); f.scrollLeft = 0; window.scrollTo(0, f.getBoundingClientRect().top + window.scrollY - 220); }); await page.waitForTimeout(400);
    const lerFila = () => page.evaluate(() => Math.round(document.querySelector('#fecho .fila').scrollLeft));
    const f0 = await lerFila(); await page.waitForTimeout(6200); const f1 = await lerFila();
    await page.screenshot({ path: `${out}/${modo}-${nome}-fecho.jpg`, type: 'jpeg', quality: 80 });
    const filaAnda = { antes: f0, depois: f1 };

    // Antes de chegar: abrir a primeira pergunta; o «+» passa a «−» (o traço vertical some)
    await page.evaluate(() => document.getElementById('antes-de-chegar').scrollIntoView({ block: 'start' })); await page.waitForTimeout(500);
    await page.click('#antes-de-chegar details.pergunta summary'); await page.waitForTimeout(700);
    const pergunta = await page.evaluate(() => { const d = document.querySelector('#antes-de-chegar details.pergunta'), v = d.querySelector('.ico-abre path + path'); return { aberta: d.open, tracoVertical: v ? getComputedStyle(v).opacity : 'sem ícone', resposta: (d.querySelector('.resposta p') || {}).textContent || '' }; });
    await page.screenshot({ path: `${out}/${modo}-${nome}-antes-de-chegar.jpg`, type: 'jpeg', quality: 80 });
    await page.click('#antes-de-chegar details.pergunta summary'); await page.waitForTimeout(300);

    // Quem já ficou: a frase muda sozinha (o rato fica longe: com ele em cima das frases, elas esperam, de propósito)
    if (!movel) await page.mouse.move(4, 4);
    await page.evaluate(() => document.getElementById('avaliacoes').scrollIntoView({ block: 'center' })); await page.waitForTimeout(500);
    const lerFrase = () => page.evaluate(() => (document.querySelector('#citacoes .citacao.ativa blockquote') || {}).textContent || '');
    const c1 = await lerFrase(); await page.waitForTimeout(6600); const c2 = await lerFrase();
    const citacoes = { primeira: c1, depois: c2 };

    // Painel das datas
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.6)); await page.waitForTimeout(800);
    await page.click('#abrir-disponibilidade'); await page.waitForTimeout(1400);
    let veu = null;
    if (movel) {       // arrastar no véu (o escuro por cima do painel) não rola a página por trás, nem fecha o painel
      const y0 = await page.evaluate(() => Math.round(window.scrollY)); await arrastar(195, 14, 195, 30, 4); await page.waitForTimeout(300);
      const topoPainel = await page.evaluate(() => Math.round(document.querySelector('#disponibilidade .painel').getBoundingClientRect().top));
      if (topoPainel > 24) { await arrastar(195, topoPainel - 12, 195, topoPainel - 12 + 200, 8); await page.waitForTimeout(500); }
      veu = { topoPainel, paginaRolou: (await page.evaluate(() => Math.round(window.scrollY))) - y0, painelAberto: await page.evaluate(() => !document.getElementById('disponibilidade').hidden) };
    }
    const campos = await page.evaluate(() => { const pr = document.querySelector('#disponibilidade .painel').getBoundingClientRect(); return ['entrada', 'saida', 'pax'].map((id) => { const r = document.getElementById(id).getBoundingClientRect(); return { id, esq: Math.round(r.left), dir: Math.round(r.right), dentro: r.left >= pr.left - 1 && r.right <= pr.right + 1 && r.right <= window.innerWidth + 1 && r.width > 60 }; }); });
    const calNota = await page.locator('#cal-nota').innerText();
    const incertos = await page.locator('#meses button.incerto').count();
    const dias = page.locator('#meses > div').nth(1).locator('button[data-dia]:not([disabled])');
    let conta = ''; if (await dias.count() > 6) { await dias.nth(2).click(); await page.waitForTimeout(300); await dias.nth(5).click(); await page.waitForTimeout(1300); conta = await page.locator('#conta').innerText(); }
    const tempoVisivel = await page.evaluate(() => !document.getElementById('tempo').hidden && document.querySelectorAll('#tempo-dias li').length);
    const tempoNota = await page.locator('#tempo-nota').innerText();
    await page.screenshot({ path: `${out}/${modo}-${nome}-painel.jpg`, type: 'jpeg', quality: 80 });
    await page.evaluate(() => document.getElementById('conta').scrollIntoView({ block: 'start' })); await page.waitForTimeout(400);
    await page.screenshot({ path: `${out}/${modo}-${nome}-painel-conta.jpg`, type: 'jpeg', quality: 80 });
    let pedidoEstado = '', confirmar = '', pedidoEstado2 = '';
    if (!(await page.locator('#form-pedido').isHidden())) {
      await page.fill('#form-pedido input[name=nome]', 'Ana Martins'); await page.fill('#form-pedido input[name=email]', modo === 'app' ? 'ana+preco@exemplo.pt' : 'ana@exemplo.pt');
      await page.evaluate(() => document.querySelector('#form-pedido').scrollIntoView()); await page.waitForTimeout(5200);
      await page.click('#enviar-pedido'); await page.waitForTimeout(1500);
      pedidoEstado = await page.locator('#pedido-estado').innerText();
      const btn = page.locator('.pedido-confirmar');
      if (await btn.count()) { confirmar = await btn.innerText(); await page.screenshot({ path: `${out}/${modo}-${nome}-pedido-preco.jpg`, type: 'jpeg', quality: 80 }); await btn.click(); await page.waitForTimeout(1500); pedidoEstado2 = await page.locator('#pedido-estado').innerText(); }
      await page.screenshot({ path: `${out}/${modo}-${nome}-pedido.jpg`, type: 'jpeg', quality: 80 });
    }
    // conta entre épocas: 30/12/2026 → 2/1/2027
    await page.fill('#entrada', '2026-12-30'); await page.fill('#saida', '2027-01-02'); await page.dispatchEvent('#saida', 'change'); await page.waitForTimeout(1300);
    const contaEpocas = (await page.locator('#conta').innerText()).replace(/\s*\n\s*/g, ' | ');
    // tempo de uma estadia para lá da previsão: médias dos últimos anos (com a nota a dizê-lo)
    await page.fill('#entrada', '2027-05-14'); await page.fill('#saida', '2027-05-17'); await page.dispatchEvent('#saida', 'change'); await page.waitForTimeout(1300);
    const tempoMedias = await page.evaluate(() => ({ dias: document.querySelectorAll('#tempo-dias li').length, medias: document.querySelectorAll('#tempo-dias li.media').length, nota: document.getElementById('tempo-nota').textContent, avisos: document.getElementById('avisos').innerText.replace(/\s*\n\s*/g, ' | ') }));
    await page.evaluate(() => document.querySelector('#tempo').scrollIntoView({ block: 'end' })); await page.waitForTimeout(300);
    await page.screenshot({ path: `${out}/${modo}-${nome}-tempo-medias.jpg`, type: 'jpeg', quality: 80 });
    await page.keyboard.press('Escape'); await page.waitForTimeout(400);

    // Fotografia em ecrã inteiro
    await page.evaluate(() => { document.querySelector('#por-fora .seq-faixa').scrollLeft = 0; }); await page.waitForTimeout(400);
    const btnG = page.locator('#por-fora .abrir-galeria').first(); await btnG.scrollIntoViewIfNeeded(); await page.waitForTimeout(400); await btnG.click(); await page.waitForTimeout(900); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(900);
    const galImg = await page.evaluate(() => { const i = document.getElementById('galeria-img'), r = i.getBoundingClientRect(); return { aberta: !document.getElementById('galeria-ecra').hidden, src: i.currentSrc.split('/').pop(), natural: i.naturalWidth + 'x' + i.naturalHeight, caixa: Math.round(r.width) + 'x' + Math.round(r.height), aVista: i.style.opacity !== '0', contador: document.getElementById('galeria-contador').textContent }; });
    await page.screenshot({ path: `${out}/${modo}-${nome}-galeria.jpg`, type: 'jpeg', quality: 80 }); await page.keyboard.press('Escape'); await page.waitForTimeout(300);
    // Álbuns
    await page.locator('#galeria').scrollIntoViewIfNeeded(); await page.locator('.separador').nth(1).click(); await page.waitForTimeout(600);
    await page.screenshot({ path: `${out}/${modo}-${nome}-albuns.jpg`, type: 'jpeg', quality: 80 });
    // Menu: escolher um destino fecha o menu e a página está lá de imediato, sem «#» no endereço; a seguir a página rola
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.6)); await page.waitForTimeout(500); await page.click('#abrir-menu'); await page.waitForTimeout(600);
    await page.screenshot({ path: `${out}/${modo}-${nome}-menu.jpg`, type: 'jpeg', quality: 80 });
    await page.click('#menu a[href="#nacional2"]'); await page.waitForTimeout(400);
    const menu = await page.evaluate(() => { const y0 = window.scrollY; window.scrollBy(0, 150); const y1 = window.scrollY; window.scrollBy(0, -150); return { fechado: document.getElementById('menu').hidden, topo: Math.round(document.getElementById('nacional2').getBoundingClientRect().top), hash: location.hash, rola: y1 !== y0 }; });
    // A página inteira, numa página nova do mesmo aparelho (ver a nota do cimo): é a última coisa que se faz com este aparelho
    const pi = await ctx.newPage(); await pi.goto(base + '/', { waitUntil: 'networkidle' }); await pi.waitForTimeout(800); await rolar(pi);
    await pi.evaluate(() => { document.querySelectorAll('.seq-faixa, .fila').forEach((f) => { f.scrollLeft = 0; }); }); await pi.waitForTimeout(300);
    await pi.screenshot({ path: `${out}/${modo}-${nome}-inteira.jpg`, fullPage: true, type: 'jpeg', quality: 80 }); await pi.close();
    res.push({ modo, nome, movel, medidas, ligacao, comHash, hashAntigo, filaOutraVisita, sequencia, filaAnda, pergunta, citacoes, veu, campos, calNota, incertos, conta: conta.replace(/\s*\n\s*/g, ' | '), contaEpocas, tempoVisivel, tempoNota, tempoMedias, pedidoEstado, confirmar, pedidoEstado2, galImg, menu, pedidos, erros: erros.length, errosDistintos: [...new Set(erros)].slice(0, 3) });
    await ctx.close();
  }
  await browser.close(); fs.writeFileSync(`${out}/resultado-${modo}.json`, JSON.stringify(res, null, 2)); console.log(JSON.stringify(res, null, 2));
  const falhas = [];
  for (const r of res) {
    const q = r.nome + ': ', s = r.sequencia;
    if (r.erros > 0) falhas.push(q + 'erros de JavaScript');
    if (r.medidas.scrollWidth > r.medidas.innerWidth) falhas.push(q + 'rolagem horizontal');
    if (r.medidas.capitulos.some((y, i, v) => y < 0 || (i > 0 && y <= v[i - 1]))) falhas.push(q + 'os capítulos não estão todos na página, ou não estão pela ordem do menu (' + r.medidas.capitulos.join(', ') + ')');
    if (r.ligacao.url.includes('#') || Math.abs(r.ligacao.topo) > 4) falhas.push(q + 'a ligação interna deixou «#» no endereço ou não chegou à secção (' + r.ligacao.url + ', topo ' + r.ligacao.topo + ')');
    if (r.comHash.url.includes('#') || r.comHash.y < 500) falhas.push(q + 'abrir com #galeria não levou à galeria ou não limpou o endereço');
    if (r.hashAntigo.url.includes('#') || r.hashAntigo.y > 5) falhas.push(q + 'abrir com #casa (endereço antigo) não ficou na capa');
    if (s.caixas.length) falhas.push(q + s.caixas.length + ' caixa(s) de fotografia com tamanho diferente do da fotografia, p. ex. ' + s.caixas.slice(0, 3).join(' · '));
    if (!(s.depois.x > s.antes.x) || s.depois.i !== 2) falhas.push(q + 'a sequência do primeiro capítulo não avançou sozinha para a segunda fotografia (' + s.antes.x + ' → ' + s.depois.x + ', fotografia ' + s.depois.i + ')');
    // Nota 8 do Diogo: «não precisa de dizer que tem fotos». Sem contagens na página; setas só com rato.
    const m = r.medidas;
    if (m.contagens) falhas.push(q + 'há ' + m.contagens + ' contagem(ns) à vista («01 / 04», «02 / 10»): a nota 8 do Diogo pede que não haja');
    if (r.movel && m.setasAVista) falhas.push(q + 'as setas das sequências vêem-se num ecrã de toque (' + m.setasAVista + ' de ' + m.setasTodas + ')');
    if (!r.movel && (m.setasAVista !== m.setasTodas || !m.setasTodas)) falhas.push(q + 'com rato, as setas das sequências têm de estar à vista (' + m.setasAVista + ' de ' + m.setasTodas + ')');
    if (!r.movel) {
      if (s.setas.join(',') !== Array.from({ length: s.fotografias }, (_, i) => (i + 1) % s.fotografias + 1).join(',') || s.recuo !== s.fotografias) falhas.push(q + 'as setas da sequência não dão a volta em círculo (' + s.setas.join(', ') + '; ao recuar: ' + s.recuo + ')');
      if (!s.rato || s.rato.emCima !== 0) falhas.push(q + 'com o rato em cima das fotografias a sequência continuou a avançar (' + JSON.stringify(s.rato) + ')');
      if (s.rato && s.rato.depoisDeSair === 0) falhas.push(q + 'depois de o rato sair de cima das fotografias a sequência não retomou o avanço');
    }
    // Nota 8 do Diogo: as fotografias do fecho «a rolar random». Ordem diferente em cada visita, as mesmas fotografias, e avança sozinha.
    if (m.fila.length < 6) falhas.push(q + 'a fila do fecho tem poucas fotografias (' + m.fila.length + ')');
    if (m.fila.join('|') === r.filaOutraVisita.join('|')) falhas.push(q + 'a fila do fecho veio na mesma ordem em duas visitas: tem de ser ao acaso');
    if (m.fila.slice().sort().join('|') !== r.filaOutraVisita.slice().sort().join('|')) falhas.push(q + 'a fila do fecho não tem as mesmas fotografias nas duas visitas');
    if (m.fila.map((f) => f.replace('-m.', '.')).join('|') !== m.filaGaleria.join('|')) falhas.push(q + 'a ordem da fila do fecho não é a da lista da fotografia em grande (abriria outra fotografia)');
    if (!(r.filaAnda.depois > r.filaAnda.antes)) falhas.push(q + 'a fila do fecho não avançou sozinha (' + r.filaAnda.antes + ' → ' + r.filaAnda.depois + ')');
    // A secção das fotografias chama-se só «Passear pelo Monte»
    if (m.sobretituloGaleria) falhas.push(q + 'a galeria voltou a ter um sobretítulo («' + m.sobretituloGaleria + '»): chama-se só «Passear pelo Monte»');
    // Nota 10 do Diogo: «Antes de chegar» como na referência (no computador, título à esquerda e perguntas à direita)
    if (!m.antes) falhas.push(q + '«Antes de chegar» sem título ou sem perguntas');
    else if (!r.movel && !(m.antes.tituloDir < m.antes.perguntasEsq && m.antes.perguntasTopo < m.antes.tituloBaixo && m.antes.tituloLinhas === 3)) falhas.push(q + '«Antes de chegar» não está em duas colunas, com o título em três linhas à esquerda (' + JSON.stringify(m.antes) + ')');
    else if (r.movel && !(m.antes.perguntasTopo >= m.antes.tituloBaixo)) falhas.push(q + '«Antes de chegar» no telemóvel: as perguntas têm de ficar por baixo do título (' + JSON.stringify(m.antes) + ')');
    if (!r.pergunta.aberta || r.pergunta.tracoVertical !== '0' || r.pergunta.resposta.length < 20) falhas.push(q + 'a primeira pergunta não abriu, ou o «+» não passou a «−» (' + JSON.stringify(r.pergunta).slice(0, 160) + ')');
    if (s.dedo) {
      if (s.dedo.vertical.paginaRolou < 60 || s.dedo.vertical.faixaMexeu !== 0) falhas.push(q + 'rolar a página com o dedo em cima das fotografias não rolou a página, ou mexeu a faixa (' + JSON.stringify(s.dedo.vertical) + ')');
      if (!s.dedo.continuouSozinha) falhas.push(q + 'a sequência deixou de avançar sozinha só por o dedo lhe passar por cima');
      if (Math.abs(s.dedo.horizontal.faixaMexeu) < 100 || Math.abs(s.dedo.horizontal.paginaRolou) > 4) falhas.push(q + 'o dedo não levou a faixa de fotografias, ou a página rolou com ela (' + JSON.stringify(s.dedo.horizontal) + ')');
      if (s.dedo.depoisDoDedo !== 0) falhas.push(q + 'a sequência continuou a avançar sozinha depois de levada com o dedo (' + s.dedo.depoisDoDedo + ' px)');
    }
    if (r.veu && (r.veu.paginaRolou !== 0 || !r.veu.painelAberto)) falhas.push(q + 'arrastar no escuro por cima do painel rolou a página por trás ou fechou o painel (' + JSON.stringify(r.veu) + ')');
    if (r.campos.some((c) => !c.dentro)) falhas.push(q + 'campos do painel fora da largura: ' + r.campos.filter((c) => !c.dentro).map((c) => c.id + ' ' + c.esq + '→' + c.dir).join(' · '));
    if (!r.galImg.aberta || !r.galImg.src || !r.galImg.aVista) falhas.push(q + 'a fotografia não abriu em ecrã inteiro');
    if (r.medidas.citacoes > 1 && (!r.citacoes.primeira || r.citacoes.primeira === r.citacoes.depois)) falhas.push(q + 'a frase de quem já ficou não mudou sozinha («' + r.citacoes.primeira + '»)');
    if (!r.tempoMedias.medias || !/anos/.test(r.tempoMedias.nota)) falhas.push(q + 'o tempo de uma estadia distante não mostrou as médias com a nota');
    if (!r.menu.fechado || Math.abs(r.menu.topo) > 2 || r.menu.hash || !r.menu.rola) falhas.push(q + 'escolher um destino no menu não fechou o menu e levou lá de imediato (' + JSON.stringify(r.menu) + ')');
  }
  if (falhas.length) { console.error('FALHOU:\n  ' + falhas.join('\n  ')); process.exit(1); }
  console.log('OK · ' + res.length + ' tamanhos sem erros nem rolagem horizontal; capítulos pela ordem, ligações, sequências (caixas, avanço, sem contagem, setas só com rato, dedo), fila do fecho ao acaso e a andar, «Antes de chegar», frases, painel, tempo, fotografia e menu como deve ser');
})().catch(e => { console.error(e); process.exit(1); });
