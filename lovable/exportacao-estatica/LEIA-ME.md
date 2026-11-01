# Exportação estática do projeto do Lovable, provada a 1/11/2026 (sessão do Claude)

**Pergunta do Diogo (1/11):** «se o site for desenvolvido pelo Lovable, ele fica em amen.pt? … não quero estar a pagar vezes sem conta.»
**Resposta provada aqui: sim, pode ficar na Amen.** O projeto do Lovable (TanStack Start, React, Tailwind) compila para ficheiros
estáticos (HTML, CSS, JS, imagens) que qualquer alojamento serve, a Amen incluída, sem Node no servidor e sem o Lovable a alojar.

## O que foi feito (sem créditos; só leitura do projeto pela API do Lovable)

1. Copiados os ficheiros de código do projeto `96fa8399-…` (`src/routes/index.tsx`, `__root.tsx`, `styles.css`, `router.tsx`,
   `start.ts`, `server.ts`, `lib/*`, `components/ui/accordion.tsx`, `hooks/use-mobile.tsx`, `tsconfig.json`) para uma pasta de
   ensaio na sessão.
2. **Imagens:** no Lovable cada fotografia vive no armazém dele (`src/assets/x.jpg.asset.json` → `url: /__l5e/assets-v1/<id>/x.jpg`,
   servido pelo alojamento do Lovable). Para a Amen, as fotografias passam a ficheiros nossos em `public/imagens/` e cada `.asset.json`
   aponta para `/imagens/x.jpg` (ver `exemplo.asset.json`). As cinco originais estão em `demo/r3/imagens/`.
3. **`vite.config.ts`** com uma linha a mais: `prerender: { enabled: true, crawlLinks: true, autoSubfolderIndex: false }` dentro de
   `tanstackStart` (ficheiro ao lado). A página `/` é gerada em HTML completo no momento da construção; o React só «acorda» no browser
   para o painel, a galeria e o menu.
4. `bun install` (o `npm install` 10.9 rebenta com o `overrides` do `rolldown`; o Lovable usa bun, `bun.lock`) com a lista mínima de
   pacotes (`package.minimo.json`: 15 + 8) e `vite build`.

## Resultado

- `.output/public/`: **12 ficheiros, 1,9 MB** — `index.html` (29 kB, com todo o texto: título, mensagem, os quatro espaços, avaliação,
  as sete perguntas, Montemor e N2, telefone, morada), `assets/*.js` (2), `assets/styles-*.css`, `imagens/` (5), `favicon.png`,
  `robots.txt`, `_headers` (regra de cache do Cloudflare; na Amen ignora-se ou passa a `.htaccess`).
- **Zero referências ao Lovable** no HTML (nem crachá, nem scripts, nem imagens no domínio dele). O ficheiro `lovable-error-reporting.ts`
  só fala com o editor do Lovable quando a página corre lá dentro; fora dele não faz nada.
- Servido por um servidor estático e fotografado em Chromium a 390 px e 1 280 px: **sem erros de JavaScript, sem rolagem horizontal**;
  o painel «Verificar disponibilidade» abre e o simulador responde («3 noites × 330 € + limpeza 180 € = 1 170 €»); o menu abre.
  Capturas em `lovable/capturas/2026-11-01/`.

## O que isto significa para a decisão

| | Alojado no Lovable | Alojado na Amen (esta exportação) |
|---|---|---|
| Custo permanente | plano pago do Lovable todos os meses (domínio próprio e crachá escondido só nos planos pagos) | só a Amen, que já se paga |
| Crachá «Made with Lovable» | aparece no plano gratuito; esconde-se nos pagos | não existe (o crachá é posto pelo alojamento do Lovable, não pelo código) |
| Onde se muda o desenho | agente do Lovable (créditos), também no plano gratuito | agente do Lovable (créditos) → GitHub → construção → rsync para a Amen; ou o Claude diretamente no código |
| Fotografias | armazém do Lovable | ficheiros nossos no repositório e na Amen |
| `prereserva.php` e as portas da app | servidor do Lovable não corre PHP; o pedido iria por outra via | no mesmo alojamento da app, como no acordo |
| Textos para os LLM | HTML renderizado no servidor | HTML completo em ficheiro, igual ao site estático do acordo |

**Recomendação do Claude:** desenho no Lovable (gratuito e lento, ou pago só nos meses do desenho), código e alojamento na Amen pelo
GitHub, como a app. O acordo v1.3 fica mais perto do v1.2 do que parecia a 25/10: muda a ferramenta de desenho e a tecnologia das
páginas, não o alojamento.

## Como se repete

```
bun install            # na pasta do projeto exportado do Lovable (GitHub), com o vite.config.ts daqui
bun run build          # ou ./node_modules/.bin/vite build
# resultado em .output/public/ → rsync para a raiz de montecasabranca.pt na Amen (workflow deploy.yml, como na app)
```
