// Capturas e cenário do site em PHP (site/) a 390 e 1280 px: página inteira, ligações internas (sem «#» no endereço), fotografias a rolar,
// barra, painel com datas e conta, pedido (com o fluxo do preço quando a app de ensaio responde 409), conta entre épocas, tempo da estadia
// (previsão e médias), fotografia em ecrã inteiro, álbuns, frases de quem já ficou, menu.
// Uso: node captura-site.cjs <base> <pasta-saída> <app|semapp>
// Falha (exit 1) se houver erros de JavaScript, rolagem horizontal, «#» deixado no endereço, fotografias paradas ou a fotografia não abrir.
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
    await page.goto(base + '/', { waitUntil: 'networkidle' }); await page.waitForTimeout(800); await rolar(page);
    const medidas = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth, altura: document.body.scrollHeight, imgs: document.querySelectorAll('img').length, imgsM: Array.from(document.querySelectorAll('img')).filter(i => (i.currentSrc || '').includes('-m.')).length, faq: document.querySelectorAll('details.pergunta').length, faqUltima: (Array.from(document.querySelectorAll('details.pergunta summary span')).pop() || {}).textContent || '', rolos: document.querySelectorAll('[data-rolo]').length, citacoes: document.querySelectorAll('#citacoes .citacao').length }));
    await page.screenshot({ path: `${out}/${modo}-${nome}-inteira.jpg`, fullPage: true, type: 'jpeg', quality: 80 });
    // Ligações internas: levam à secção e não deixam «#secção» no endereço (era o que fazia a página abrir fora do sítio)
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(300);
    await page.click(movel ? ".hero-botoes a" : ".hero-nav a[href=\"#galeria\"]"); await page.waitForTimeout(2200);
    const ligacao = await page.evaluate((m) => ({ url: location.href, y: Math.round(window.scrollY), topo: Math.round(document.getElementById(m ? 'a-casa' : 'galeria').getBoundingClientRect().top) }), movel);
    // Abrir com «#galeria» no endereço: vai para a galeria e o endereço fica limpo; com «#casa» (endereço antigo) fica na capa
    const p2 = await ctx.newPage(); await p2.goto(base + '/#galeria', { waitUntil: 'load' }); await p2.waitForTimeout(900);
    const comHash = await p2.evaluate(() => ({ url: location.href, y: Math.round(window.scrollY) }));
    await p2.close();
    const p3 = await ctx.newPage(); await p3.goto(base + '/#casa', { waitUntil: 'load' }); await p3.waitForTimeout(900);
    const hashAntigo = await p3.evaluate(() => ({ url: location.href, y: Math.round(window.scrollY) })); await p3.close();
    // Fotografias a rolar: o primeiro momento anda sozinho; um clique abre a fotografia
    await page.evaluate(() => document.getElementById('por-fora').scrollIntoView()); await page.waitForTimeout(1200);
    const r1 = await page.evaluate(() => document.querySelector('#por-fora .rolo-faixa').scrollLeft); await page.waitForTimeout(1500);
    const r2 = await page.evaluate(() => document.querySelector('#por-fora .rolo-faixa').scrollLeft);
    const rolo = { antes: Math.round(r1), depois: Math.round(r2), copias: await page.evaluate(() => document.querySelectorAll('#por-fora .rolo-item[aria-hidden]').length) };
    await page.screenshot({ path: `${out}/${modo}-${nome}-por-fora.jpg`, type: 'jpeg', quality: 80 });
    // Quem já ficou: a frase muda sozinha
    await page.evaluate(() => document.getElementById('avaliacoes').scrollIntoView({ block: 'center' })); await page.waitForTimeout(500);
    const c1 = await page.evaluate(() => (document.querySelector('#citacoes .citacao.ativa blockquote') || {}).textContent || ''); await page.waitForTimeout(6600);
    const c2 = await page.evaluate(() => (document.querySelector('#citacoes .citacao.ativa blockquote') || {}).textContent || '');
    const citacoes = { primeira: c1, depois: c2 };
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.6)); await page.waitForTimeout(800);
    await page.click('#abrir-disponibilidade'); await page.waitForTimeout(1400);
    const calNota = await page.locator('#cal-nota').innerText();
    const incertos = await page.locator('#meses button.incerto').count();
    const dias = page.locator('#meses > div').nth(1).locator('button[data-dia]:not([disabled])');
    let conta = ''; if (await dias.count() > 6) { await dias.nth(2).click(); await page.waitForTimeout(300); await dias.nth(5).click(); await page.waitForTimeout(1300); conta = await page.locator('#conta').innerText(); }
    const tempoVisivel = await page.evaluate(() => !document.getElementById('tempo').hidden && document.querySelectorAll('#tempo-dias li').length);
    const tempoNota = await page.locator('#tempo-nota').innerText();
    await page.screenshot({ path: `${out}/${modo}-${nome}-painel.jpg`, type: 'jpeg', quality: 80 });
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
    // conta entre épocas (I): 30/12/2026 → 2/1/2027
    await page.fill('#entrada', '2026-12-30'); await page.fill('#saida', '2027-01-02'); await page.dispatchEvent('#saida', 'change'); await page.waitForTimeout(1300);
    const contaEpocas = (await page.locator('#conta').innerText()).replace(/\s*\n\s*/g, ' | ');
    // tempo de uma estadia para lá da previsão: médias dos últimos anos (com a nota a dizê-lo)
    await page.fill('#entrada', '2027-05-14'); await page.fill('#saida', '2027-05-17'); await page.dispatchEvent('#saida', 'change'); await page.waitForTimeout(1300);
    const tempoMedias = await page.evaluate(() => ({ dias: document.querySelectorAll('#tempo-dias li').length, medias: document.querySelectorAll('#tempo-dias li.media').length, nota: document.getElementById('tempo-nota').textContent, avisos: document.getElementById('avisos').innerText.replace(/\s*\n\s*/g, ' | ') }));
    await page.evaluate(() => document.querySelector('#tempo').scrollIntoView({ block: 'end' })); await page.waitForTimeout(300);
    await page.screenshot({ path: `${out}/${modo}-${nome}-tempo-medias.jpg`, type: 'jpeg', quality: 80 });
    await page.keyboard.press('Escape'); await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(300);
    const btnG = page.locator('#por-fora .abrir-galeria').first(); await btnG.scrollIntoViewIfNeeded(); await btnG.click(); await page.waitForTimeout(900); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(800);
    const galImg = await page.evaluate(() => { const i = document.getElementById('galeria-img'); return { aberta: !document.getElementById('galeria-ecra').hidden, src: i.currentSrc.split('/').pop(), natural: i.naturalWidth + 'x' + i.naturalHeight, contador: document.getElementById('galeria-contador').textContent }; });
    await page.screenshot({ path: `${out}/${modo}-${nome}-galeria.jpg`, type: 'jpeg', quality: 80 }); await page.keyboard.press('Escape'); await page.waitForTimeout(300);
    await page.locator('#galeria').scrollIntoViewIfNeeded(); await page.locator('.separador').nth(1).click(); await page.waitForTimeout(600);
    await page.screenshot({ path: `${out}/${modo}-${nome}-albuns.jpg`, type: 'jpeg', quality: 80 });
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.6)); await page.waitForTimeout(500); await page.click('#abrir-menu'); await page.waitForTimeout(600);
    await page.screenshot({ path: `${out}/${modo}-${nome}-menu.jpg`, type: 'jpeg', quality: 80 }); await page.keyboard.press('Escape');
    res.push({ modo, nome, medidas, ligacao, comHash, hashAntigo, rolo, citacoes, calNota, incertos, conta: conta.replace(/\s*\n\s*/g, ' | '), contaEpocas, tempoVisivel, tempoNota, tempoMedias, pedidoEstado, confirmar, pedidoEstado2, galImg, pedidos, erros: erros.length, errosDistintos: [...new Set(erros)].slice(0, 3) });
    await ctx.close();
  }
  await browser.close(); fs.writeFileSync(`${out}/resultado-${modo}.json`, JSON.stringify(res, null, 2)); console.log(JSON.stringify(res, null, 2));
  const falhas = [];
  for (const r of res) {
    if (r.erros > 0) falhas.push(r.nome + ': erros de JavaScript');
    if (r.medidas.scrollWidth > r.medidas.innerWidth) falhas.push(r.nome + ': rolagem horizontal');
    if (r.ligacao.url.includes('#') || Math.abs(r.ligacao.topo) > 80) falhas.push(r.nome + ': a ligação interna deixou «#» no endereço ou não chegou à secção (' + r.ligacao.url + ', topo ' + r.ligacao.topo + ')');
    if (r.comHash.url.includes('#') || r.comHash.y < 500) falhas.push(r.nome + ': abrir com #galeria não levou à galeria ou não limpou o endereço');
    if (r.hashAntigo.url.includes('#') || r.hashAntigo.y > 5) falhas.push(r.nome + ': abrir com #casa (endereço antigo) não ficou na capa');
    if (!(r.rolo.depois > r.rolo.antes) || r.rolo.copias < 2) falhas.push(r.nome + ': as fotografias do primeiro momento não rolam (' + r.rolo.antes + ' → ' + r.rolo.depois + ')');
    if (!r.galImg.aberta || !r.galImg.src) falhas.push(r.nome + ': a fotografia não abriu em ecrã inteiro');
    if (r.medidas.citacoes > 1 && r.citacoes.primeira === r.citacoes.depois) falhas.push(r.nome + ': a frase de quem já ficou não mudou');
    if (!r.tempoMedias.medias || !/anos/.test(r.tempoMedias.nota)) falhas.push(r.nome + ': o tempo de uma estadia distante não mostrou as médias com a nota');
  }
  if (falhas.length) { console.error('FALHOU:\n  ' + falhas.join('\n  ')); process.exit(1); }
  console.log('OK · ' + res.length + ' tamanhos sem erros nem rolagem horizontal; ligações, fotografias a rolar, frases e tempo como deve ser');
})().catch(e => { console.error(e); process.exit(1); });
