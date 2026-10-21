/* Capturas da demo a 390 px (telemóvel) e 1280 px (desktop) com Playwright/Chromium.
   Uso: node demo/ferramentas/captura.cjs [--base http://127.0.0.1:8787] [--saida pasta] [--paginas a.html,b.html]
   Exige: demo.py servir a correr noutro terminal e o pacote playwright
   instalado (global, com NODE_PATH=$(npm root -g), ou local).
   Por omissão grava em demo/capturas/<revisão>/ (S28: capturas versionadas por
   revisão, para comparar lado a lado); no workflow usa-se --saida demo/_saida/capturas.
   Falha se houver rolagem horizontal, erros de consola ou pedidos falhados.
   É opcional: a ferramenta demo.py não depende disto. */
const path = require("path");
const fs = require("fs");

let chromium;
try { ({ chromium } = require("playwright")); }
catch (e) { console.error("playwright não encontrado; corre com NODE_PATH=$(npm root -g) ou instala-o localmente."); process.exit(3); }

const args = process.argv.slice(2);
function opcao(nome, valor) { const i = args.indexOf(nome); return i >= 0 && args[i + 1] ? args[i + 1] : valor; }
const versao = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "versao.json"), "utf8"));
const base = opcao("--base", args.find(a => /^https?:/.test(a)) || "http://127.0.0.1:8787");
const pasta = path.resolve(opcao("--saida", path.join(__dirname, "..", "capturas", versao.revisao)));
const paginas = opcao("--paginas", "") ? opcao("--paginas", "").split(",").filter(Boolean) : Object.keys(versao.paginas || { "index.html": "" });
const larguras = [{ nome: "telemovel", w: 390, h: 844 }, { nome: "desktop", w: 1280, h: 800 }];
let cenario = null;
try { cenario = require(path.join(__dirname, "cenarios", versao.revisao + ".cjs")); } catch (e) { cenario = null; }

(async () => {
  fs.mkdirSync(pasta, { recursive: true });
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  let falhas = 0;
  for (const l of larguras) {
    const ctx = await browser.newContext({ viewport: { width: l.w, height: l.h }, deviceScaleFactor: 1 });
    for (const p of paginas) {
      const page = await ctx.newPage();
      const problemas = [];
      page.on("console", m => { if (m.type() === "error") problemas.push("consola: " + m.text()); });
      page.on("pageerror", e => problemas.push("erro JS: " + e.message));
      page.on("requestfailed", r => problemas.push("pedido falhado: " + r.url()));
      page.on("response", r => { if (r.status() >= 400) problemas.push(`HTTP ${r.status()}: ${r.url()}`); });
      await page.goto(`${base}/${p}`, { waitUntil: "networkidle" });
      const largo = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      if (largo) problemas.push("rolagem horizontal");
      const rev = await page.evaluate(() => (document.querySelector("[data-versao=revisao]") || {}).textContent);
      const ficheiro = path.join(pasta, `${p.replace(/\.html$/, "").replace(/\//g, "-")}-${l.nome}.png`);
      await page.screenshot({ path: ficheiro, fullPage: true });
      if (cenario && p === "index.html") {
        try {
          const extra = await cenario(page, l, async nome => {
            await page.screenshot({ path: path.join(pasta, `index-${nome}-${l.nome}.png`), fullPage: false });
          });
          for (const pr of extra) problemas.push("cenário: " + pr);
        } catch (e) { problemas.push("cenário rebentou: " + e.message); }
      }
      const estado = problemas.length ? "FALHA" : "OK";
      if (problemas.length) falhas++;
      console.log(`${estado} ${p} @${l.w}px · revisão lida: ${rev} · ${path.relative(process.cwd(), ficheiro)}`);
      for (const pr of problemas) console.log("   -", pr);
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
  console.log(falhas ? `RESULTADO: ${falhas} captura(s) com problemas` : "RESULTADO: OK");
  process.exit(falhas ? 1 : 0);
})();
