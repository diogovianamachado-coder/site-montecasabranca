# Nota de passagem · site Monte Casa Branca em PHP · 07/11/2026 (2.ª versão, 21h, depois da tua revisão)

Claude: a partir daqui o site deixa de ser o `vite build` do Lovable. Esta pasta (`site/`) **é o site final**, em PHP puro, pronto a subir para a Amen por FTP. Lê `LEIA-ME.md` primeiro (mapa dos ficheiros, como editar, como subir).

## O que está feito
- Página única com as mesmas secções e a mesma linguagem visual do Lovable (Playfair Display + Source Sans 3, paleta oklch), reescrita em `index.php` + `partes/*.php` + `assets/css/site.css` + `assets/js/site.js` (JavaScript nativo, sem React, sem Tailwind, sem build).
- Dinâmica completa no cliente: revelar ao rolar, paralaxe da capa, dock, menu, galeria (setas, teclado, swipe), separadores de álbuns, régua de fotografias que corre sozinha no telemóvel, botão de descer fixo no telemóvel, painel de disponibilidade (calendário 2 meses, conta ao vivo, previsão do tempo nas datas, pedido com WhatsApp/email pré-escritos e envio para a app).
- Portas do site para a app (`api/`): `ocupacao.php` → #189, `tarifa.php` → #190 (com recurso a `inc/tarifas.php`, porte do `tarifas.ts`), `prereserva.php` → #191 (com `X-Site-Chave` a partir de `config.php`, armadilha e tempo de preenchimento), `avaliacoes.php` → #192, `tempo.php` → Open-Meteo. Todas com cache em ficheiro e resposta de recurso quando a app não responde.
- Conteúdo separado do código: `conteudo.php` (todos os textos, FAQ, álbuns, legendas) e `fotos/<álbum>/` (com variante `-m` para telemóvel). `inc/factos.php` espelha `docs/conteudos/fontes/FACTOS.md`.
- SEO: JSON-LD VacationRental + FAQPage, Open Graph, `sitemap.xml`, `robots.txt`, `llms.txt`. `.htaccess` protege `config.php`, `inc/`, `partes/`, `cache/`.

## O que falta (por esta ordem)
1. **Correr pela primeira vez.** O código não foi executado (não havia PHP onde foi escrito; passou verificação estática e `node --check`). Subir para `novo.montecasabranca.pt`, criar `config.php` a partir de `config.exemplo.php`, e ver: página, `api/tempo.php`, `api/tarifa.php?entrada=2026-05-02&saida=2026-05-05&pax=4`, `api/ocupacao.php`. Erros de PHP 8.x corrigem-se no sítio — a estrutura é simples.
2. **Fotografias.** `fotos/` tem agora 72 fotografias em tamanho web (as 59 do GPT em `design/fotos/galeria/01-o-monte` e `02-os-quartos`, a 1600 px com `-m` a 1000 px, mais as 13 antigas que já estavam em tamanho web); as 12 miniaturas de 600 px saíram dos álbuns. Legendas minhas, a partir das imagens — o GPT pode afiná-las em `conteudo.php`. Faltam: antes/depois em tamanho web (os 4 actuais são miniaturas), Montemor (1 miniatura) e os álbuns que o GPT ainda não entregou.
3. **Chave e portas.** `SITE_CHAVE` igual nos dois lados (`config.php` do site, `config.php` → `site_chave` da app). As portas #189–#192 na app seguem `docs/integracao-app/contrato_portas_v1.md`; o site já fala a forma de resposta do contrato.
4. **Lançamento** só com o «Lança» do Diogo: copiar para a raiz de `montecasabranca.pt`, `SITE_URL` e `sitemap.xml` apontados à raiz.

## Regras que continuam
Factos só do `FACTOS.md`; «Reguengo» só na morada postal; sem tabela de preços nem KPI no site; nada publicado sem «Lança»; `config.php` e `cache/` nunca vão para o GitHub (estão no `.gitignore`).

## Como mexer
- Textos, FAQ, fotos: só `conteudo.php` e `fotos/`.
- Estilo: `assets/css/site.css` (variáveis no topo, mobile-first, `@media (min-width: 768px)` para desktop).
- Comportamento: `assets/js/site.js`, blocos comentados por função.
- Novas secções: um ficheiro em `partes/`, um `require` em `index.php`, os textos em `conteudo.php`.

## Resposta à revisão de 7/11 (`docs/integracao-app/2026-11-07_revisao_site_php.md`)
Obrigado — a revisão está certa e foi aplicada nesta versão:
- **A** (`abertas` lida antes de declarada; matava o JS no telemóvel): corrigido — declarada no topo de `site.js`.
- **B** (`lingua` indefinida): corrigido em `api/avaliacoes.php` e `api/prereserva.php` (lê com `?? 'pt'` e valida depois).
- **C** (fluxo «preço diferente»): o estado do pedido mostra agora o botão «Confirmar X €», que reenvia com `confirmo_preco: true` e `preco_mostrado = preco_app`.
- **D** (calendário com a app em baixo): `app === false` → nota «Calendário indisponível de momento · confirmamos as datas no pedido», dias a tracejado (`.incerto`, «por confirmar»), continuam seleccionáveis para o pedido seguir.
- **E** (IP): só `REMOTE_ADDR`.
- **F** (`cache/pedidos.log`): `cache/.htaccess` com `Require all denied` (vai no zip e é recriado pelo PHP se faltar); e cada pedido que fica em espera dispara um `mail()` para o `geral@` (do `FACTOS`), com `Reply-To` do visitante.
- **G** (`pedido_id`): aceite só se for UUID; senão gerado no servidor.
- **H** (JSON-LD): `JSON_HEX_TAG | JSON_HEX_AMP`.
- **I** (conta entre épocas): quando o `detalhe` tem mais de uma época, o texto passa a «n noites (X €, duas épocas) + limpeza Y € = Z €».
- **J** (fotografias): ver ponto 2 acima — 59 novas integradas.
- **L** (plataformas na FAQ): acrescentada a pergunta «Também estão no Airbnb, Booking ou Vrbo?» (decisão de 8/10). As ligações continuam também no rodapé e no `sameAs`.
- **K** (régua «num relance» e secção «Fotografias» na página) e **M** (EN, `www`/HTTPS, testes em cada push, créditos, portas na app, ensaio): ficam para o Diogo decidir / para as sessões seguintes. A régua e os álbuns tiram-se com um `require` a menos em `index.php` se ele preferir a decisão 0.1 original.
Não voltou a ser executado aqui (continua sem PHP nesta máquina); a correcção A foi feita na forma que indicaste e testaste. Vale a pena repetires o teu `php -l` + capturas 390/1280 sobre esta versão.
