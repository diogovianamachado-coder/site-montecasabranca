// Fotografa uma versão do site PARTE A PARTE, no computador (1280) e no telemóvel (390), para o registo de versões (docs/versoes/).
// Uso: node fotografar.cjs <base> <pasta de saída>          (chamado por fotografar.sh, que monta o servidor da versão pedida)
// As partes têm o mesmo nome em todas as versões, para se poderem pôr lado a lado: capa, a casa, os espaços, o fecho, Montemor,
// a galeria, antes de chegar, quem já ficou, contactos, o menu e o painel das datas. Cada parte tem uma lista de alternativas porque
// os nomes no código mudaram de versão para versão (ex.: «#casa» na V1, «#a-casa» na V2).
const { chromium } = require('playwright');
const fs = require('fs');
const [base, out] = process.argv.slice(2);
if (!base || !out) { console.error('uso: node fotografar.cjs <base> <pasta de saída>'); process.exit(2); }
fs.mkdirSync(out, { recursive: true });

const PARTES = [
  ['02-a-casa', ['#a-casa', '#casa']],
  ['03-espacos-1-por-fora', ['#por-fora']],
  ['03-espacos-2-sem-pressa', ['#sem-pressa']],
  ['03-espacos-3-por-dentro', ['#por-dentro']],
  ['03-espacos', ['#descobrir']],                                   // V1: os espaços vinham numa só secção
  ['04-fecho-e-regua', ['#fecho', 'section.relance']],
  ['05-montemor', ['#montemor'], '#onde'],                         // V3: a parte vai até ao fim de «Onde estamos» (três capítulos seguidos)
  ['06-galeria', ['section#galeria', 'section#fotografias']],
  ['07-antes-de-chegar', ['#antes-de-chegar', '#perguntas']],
  ['08-quem-ja-ficou', ['#avaliacoes']],
  ['09-contactos', ['#contactos', 'footer']],
];
// As partes vão inteiras; a galeria (dezenas de fotografias) fica pelo começo, que chega para se ver o desenho.
const ALTURA_MAX = { '1280': 4600, '390': 6400 }; const ALTURA_GALERIA = { '1280': 1500, '390': 1900 };

(async () => {
  const browser = await chromium.launch();
  const indice = { base, partes: {}, erros: {} };
  for (const [nome, vp, movel, escala] of [['1280', { width: 1280, height: 800 }, false, 1], ['390', { width: 390, height: 844 }, true, 2]]) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: escala, locale: 'pt-PT', hasTouch: movel, isMobile: movel, reducedMotion: 'no-preference' });
    const page = await ctx.newPage(); const erros = [];
    page.on('pageerror', e => erros.push('pageerror: ' + e.message));
    const foto = (ficheiro, opcoes = {}) => page.screenshot(Object.assign({ path: `${out}/${ficheiro}-${nome}.jpg`, type: 'jpeg', quality: 68 }, opcoes));
    const registar = (parte) => { (indice.partes[parte] = indice.partes[parte] || []).push(nome); };

    await page.goto(base + '/', { waitUntil: 'networkidle' }); await page.waitForTimeout(1500);
    // No telemóvel: as partes fotografam-se com «fullPage» e, no Chromium, essa fotografia faz o telemóvel simulado responder como um
    // computador com rato («hover: hover», «pointer: fine»). Para as capturas saírem como num telemóvel a sério, tiram-se da folha de
    // estilos as regras que só valem com rato (por exemplo as setas das sequências, que num ecrã de toque não existem).
    if (movel) await page.evaluate(() => { for (const folha of Array.from(document.styleSheets)) { let regras; try { regras = folha.cssRules; } catch (e) { continue; } for (let i = regras.length - 1; i >= 0; i--) { const r = regras[i]; if (r.type === CSSRule.MEDIA_RULE && /hover:\s*hover|pointer:\s*fine/.test(r.conditionText || (r.media && r.media.mediaText) || '')) folha.deleteRule(i); } } });
    // 1. A capa, tal como abre
    await foto('01-capa'); registar('01-capa');
    // Passar pela página toda devagar, para as fotografias carregarem e as secções «aparecerem» (revelar ao rolar)
    const altura = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < altura; y += Math.round(vp.height * 0.7)) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(260); }
    // O que só aparece ao rolar fica já à vista (as capturas servem para ver o conteúdo, não a animação)
    await page.evaluate(() => { document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-in')); window.scrollTo(0, 0); }); await page.waitForTimeout(1900);
    // A barra de baixo é fixa e tapava o fundo das partes: esconde-se para as fotografar e fotografa-se à parte, no fim
    const semBarra = await page.addStyleTag({ content: '.dock{visibility:hidden!important}' });
    // As frases de quem já ficou trocam-se com um esbatido: sem ele, a captura nunca apanha duas frases sobrepostas
    await page.addStyleTag({ content: '.citacao{transition:none!important}' });
    // V3: as sequências e a fila do fecho deixam de avançar sozinhas (uma tecla em cima delas conta como «pegar-lhes») e voltam ao
    // princípio: assim cada parte sai sempre com a primeira fotografia à frente, e não a meio de um passo
    await page.evaluate(() => { document.querySelectorAll('.seq-faixa, .fila').forEach((f) => { f.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift', bubbles: true })); f.scrollLeft = 0; }); }); await page.waitForTimeout(600);
    await page.evaluate(() => { document.querySelectorAll('.seq-faixa, .fila').forEach((f) => { f.scrollLeft = 0; }); }); await page.waitForTimeout(300);
    // V4: as fotografias deslizam sem parar. Para o registo ficam quietas, com a primeira fotografia à frente (o movimento vê-se no
    // site e no vídeo que acompanha a versão); a capa também fica quieta e as miniaturas dos álbuns já entradas.
    await page.addStyleTag({ content: '.rolo-pista{animation-name:none!important}.hero-foto,.hero-fundo,.hero-texto,.album li{animation:none!important}' }); await page.waitForTimeout(300);
    // (com JavaScript, o movimento das faixas é uma animação criada pelo site.js, que a folha de estilos não pára: pára-se aqui)
    await page.evaluate(() => document.querySelectorAll('.rolo-pista').forEach((p) => (p.getAnimations ? p.getAnimations() : []).forEach((a) => { try { a.pause(); a.currentTime = 0; } catch (e) {} }))); await page.waitForTimeout(200);
    // 0. A página inteira, pequena, para se ver a ordem das partes
    if (nome === '1280') { await foto('00-pagina-inteira', { fullPage: true, quality: 60 }); registar('00-pagina-inteira'); }
    // 2. Cada parte
    for (const [parte, alternativas, ate] of PARTES) {
      let el = null; for (const s of alternativas) { el = await page.$(s); if (el) break; }
      if (!el) continue;
      await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(1300);
      // «ate»: um seletor de outra secção, mais abaixo, onde a parte acaba (se existir como secção à parte e não dentro desta)
      const r = await el.evaluate((e, fim) => { const b = e.getBoundingClientRect(); let baixo = b.bottom; const f = fim ? document.querySelector(fim) : null; if (f && !e.contains(f)) baixo = Math.max(baixo, f.getBoundingClientRect().bottom); return { x: 0, y: Math.round(b.top + window.scrollY), width: document.documentElement.clientWidth, height: Math.round(baixo - b.top) }; }, ate || null);
      if (r.height < 20) continue;
      r.height = Math.min(r.height, (parte === '06-galeria' ? ALTURA_GALERIA : ALTURA_MAX)[nome]);
      await foto(parte, { fullPage: true, clip: r }); registar(parte);
    }
    await semBarra.evaluate((e) => e.remove());
    // 3. O menu completo e o painel das datas (com uma conta feita), com a barra de baixo à vista
    await page.evaluate(() => window.scrollTo(0, Math.round(window.innerHeight * 1.6))); await page.waitForTimeout(900);
    try {
      await page.click('#abrir-menu', { timeout: 4000 }); await page.waitForTimeout(800); await foto('10-menu'); registar('10-menu');
      await page.keyboard.press('Escape'); await page.waitForTimeout(500);
    } catch (e) { erros.push('menu: ' + e.message.split('\n')[0]); }
    try {
      await page.click('#abrir-disponibilidade', { timeout: 4000 }); await page.waitForTimeout(1500); await foto('11-datas-1-calendario'); registar('11-datas-1-calendario');
      // escolher três noites livres daqui a umas semanas, se o painel tiver os campos das datas
      const feito = await page.evaluate(() => {
        const en = document.getElementById('entrada'), sa = document.getElementById('saida'); if (!en || !sa) return false;
        const d = new Date(); d.setDate(d.getDate() + 40); while (d.getDay() !== 5) d.setDate(d.getDate() + 1);
        const iso = (x) => x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0');
        const s = new Date(d); s.setDate(s.getDate() + 2);
        en.value = iso(d); en.dispatchEvent(new Event('change', { bubbles: true })); sa.value = iso(s); sa.dispatchEvent(new Event('change', { bubbles: true }));
        const f = document.getElementById('form-simular'); if (f) f.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        return true;
      });
      if (feito) {
        await page.waitForTimeout(2200);
        await page.evaluate(() => { const c = document.getElementById('conta'); if (c) c.scrollIntoView({ block: 'center' }); }); await page.waitForTimeout(700);
        await foto('11-datas-2-contas'); registar('11-datas-2-contas');
      }
      await page.keyboard.press('Escape'); await page.waitForTimeout(400);
    } catch (e) { erros.push('datas: ' + e.message.split('\n')[0]); }
    indice.erros[nome] = erros;
    await ctx.close();
  }
  await browser.close();
  fs.writeFileSync(`${out}/indice.json`, JSON.stringify(indice, null, 1) + '\n');
  console.log(Object.keys(indice.partes).length + ' partes fotografadas em ' + out, JSON.stringify(indice.erros));
})();
