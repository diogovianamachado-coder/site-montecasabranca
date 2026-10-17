/* Cenários de interação da r1 (D03 «Casa ao sol»), pedidos no handoff do ChatGPT:
   menu, painéis, troca dos três espaços e formatação das datas. captura.cjs corre
   este ficheiro em index.html quando existe cenarios/<revisão>.cjs. Recebe a página
   Playwright, a largura e uma função gravar(nome) que tira a captura. Devolve a
   lista de problemas encontrados (vazia se tudo bem). */
module.exports = async function (page, largura, gravar) {
  const problemas = [];
  const movel = largura.w <= 760;

  // 1. Troca dos três espaços: a fotografia e a legenda mudam.
  const srcInicial = await page.getAttribute("#scene-photo", "src");
  await page.click('[data-scene="interior"]');
  await page.waitForTimeout(150);
  const srcInterior = await page.getAttribute("#scene-photo", "src");
  const legenda = await page.textContent("#scene-caption");
  if (srcInterior === srcInicial || !/portas-abertas/.test(srcInterior)) problemas.push("troca de espaço «Por dentro» não mudou a fotografia");
  if (!/conforto de casa/i.test(legenda)) problemas.push("legenda não mudou ao trocar de espaço: " + legenda);
  await gravar("espaco-interior");
  await page.click('[data-scene="porch"]');
  await page.waitForTimeout(150);
  if (!/alpendre-copos/.test(await page.getAttribute("#scene-photo", "src"))) problemas.push("troca de espaço «Sem pressa» não mudou a fotografia");
  await page.click('[data-scene="pool"]');

  // 2. Menu (só no telemóvel) e painéis.
  if (movel) {
    await page.click(".menu-button");
    if (!(await page.isVisible("#menu-dialog"))) problemas.push("menu não abriu");
    await gravar("menu");
    await page.click("#menu-dialog [data-close]");
  }
  await page.click('.photo-detail[data-open="space-dialog"]');
  if (!(await page.isVisible("#space-dialog"))) problemas.push("painel «A casa» não abriu");
  await gravar("painel-casa");
  await page.click("#space-dialog [data-close]");
  await page.keyboard.press("Escape");

  // 3. Escolha dos dias: datas inválidas e válidas, formatação pt-PT.
  await page.click(movel ? ".clay-cta" : ".site-head > .book-link");
  if (!(await page.isVisible("#stay-dialog"))) problemas.push("painel «Os vossos dias» não abriu");
  await page.fill('#stay-form [name="entry"]', "2027-03-13");
  await page.fill('#stay-form [name="exit"]', "2027-03-12");
  await page.click('#stay-form button[type="submit"]');
  const erro = await page.textContent("#stay-error");
  if (!/posterior/.test(erro || "")) problemas.push("saída anterior à entrada não deu erro");
  await page.fill('#stay-form [name="exit"]', "2027-03-15");
  await page.click('#stay-form button[type="submit"]');
  const resumo = await page.textContent("#stay-summary");
  if (!/13 de março de 2027/.test(resumo || "") || !/15 de março de 2027/.test(resumo || "")) problemas.push("resumo de datas não formatado em pt-PT: " + resumo);
  if (/€|\d+\s?euros/i.test(resumo || "")) problemas.push("o resumo mostra um preço, o que não devia");
  await gravar("datas");
  await page.click("#stay-dialog [data-close]");
  return problemas;
};
