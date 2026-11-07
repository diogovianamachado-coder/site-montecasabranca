# Nota de passagem · site Monte Casa Branca em PHP · 07/11/2026

Claude: a partir daqui o site deixa de ser o `vite build` do Lovable. Esta pasta (`site/`) **é o site final**, em PHP puro, pronto a subir para a Amen por FTP. Lê `LEIA-ME.md` primeiro (mapa dos ficheiros, como editar, como subir).

## O que está feito
- Página única com as mesmas secções e a mesma linguagem visual do Lovable (Playfair Display + Source Sans 3, paleta oklch), reescrita em `index.php` + `partes/*.php` + `assets/css/site.css` + `assets/js/site.js` (JavaScript nativo, sem React, sem Tailwind, sem build).
- Dinâmica completa no cliente: revelar ao rolar, paralaxe da capa, dock, menu, galeria (setas, teclado, swipe), separadores de álbuns, régua de fotografias que corre sozinha no telemóvel, botão de descer fixo no telemóvel, painel de disponibilidade (calendário 2 meses, conta ao vivo, previsão do tempo nas datas, pedido com WhatsApp/email pré-escritos e envio para a app).
- Portas do site para a app (`api/`): `ocupacao.php` → #189, `tarifa.php` → #190 (com recurso a `inc/tarifas.php`, porte do `tarifas.ts`), `prereserva.php` → #191 (com `X-Site-Chave` a partir de `config.php`, armadilha e tempo de preenchimento), `avaliacoes.php` → #192, `tempo.php` → Open-Meteo. Todas com cache em ficheiro e resposta de recurso quando a app não responde.
- Conteúdo separado do código: `conteudo.php` (todos os textos, FAQ, álbuns, legendas) e `fotos/<álbum>/` (com variante `-m` para telemóvel). `inc/factos.php` espelha `docs/conteudos/fontes/FACTOS.md`.
- SEO: JSON-LD VacationRental + FAQPage, Open Graph, `sitemap.xml`, `robots.txt`, `llms.txt`. `.htaccess` protege `config.php`, `inc/`, `partes/`, `cache/`.

## O que falta (por esta ordem)
1. **Correr pela primeira vez.** O código não foi executado (não havia PHP onde foi escrito; passou verificação estática e `node --check`). Subir para `novo.montecasabranca.pt`, criar `config.php` a partir de `config.exemplo.php`, e ver: página, `api/tempo.php`, `api/tarifa.php?entrada=2026-05-02&saida=2026-05-05&pax=4`, `api/ocupacao.php`. Erros de PHP 8.x corrigem-se no sítio — a estrutura é simples.
2. **Fotografias.** Só 32 estão em `fotos/`. As novas do GPT (`design/fotos/galeria/01-o-monte`, `02-os-quartos`, e as que faltam) entram em `fotos/<álbum>/` (redimensionar a 1600 px e criar `-m` a 900 px) e listam-se em `conteudo.php` → `'fotografias' → 'albuns'`.
3. **Chave e portas.** `SITE_CHAVE` igual nos dois lados (`config.php` do site, `config.php` → `site_chave` da app). As portas #189–#192 na app seguem `docs/integracao-app/contrato_portas_v1.md`; o site já fala a forma de resposta do contrato.
4. **Lançamento** só com o «Lança» do Diogo: copiar para a raiz de `montecasabranca.pt`, `SITE_URL` e `sitemap.xml` apontados à raiz.

## Regras que continuam
Factos só do `FACTOS.md`; «Reguengo» só na morada postal; sem tabela de preços nem KPI no site; nada publicado sem «Lança»; `config.php` e `cache/` nunca vão para o GitHub (estão no `.gitignore`).

## Como mexer
- Textos, FAQ, fotos: só `conteudo.php` e `fotos/`.
- Estilo: `assets/css/site.css` (variáveis no topo, mobile-first, `@media (min-width: 768px)` para desktop).
- Comportamento: `assets/js/site.js`, blocos comentados por função.
- Novas secções: um ficheiro em `partes/`, um `require` em `index.php`, os textos em `conteudo.php`.
