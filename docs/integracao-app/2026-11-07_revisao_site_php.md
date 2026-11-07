# Revisão do site em PHP («site-php_2026-11-07.zip» + «NOTA_PARA_O_CLAUDE.md») · Claude, 7/11/2026

**O que é:** o Diogo entregou um zip com o site inteiro reescrito em PHP puro, CSS e JavaScript nativo (sem Lovable, sem build), feito por
outro assistente a partir da versão do Lovable e das peças de `lovable/src/lib/`, com uma nota a dizer que «esta pasta é o site final,
pronto a subir para a Amen por FTP». Pedido do Diogo: «verifica tudo». Isto é a verificação; a decisão de seguir por aqui é dele.

**Veredito em três linhas:** é um trabalho sério e encaixa na decisão «Amen» melhor do que o Lovable; **tem um erro que mata toda a
interação no telemóvel** (uma linha) e **um aviso PHP que deixa a língua vazia nos pedidos à app** (duas linhas), os dois corrigidos e
testados aqui (patch anexo); e **as fotografias continuam a ser as 33 de sempre**, 24 delas miniaturas de 600 px, esticadas na galeria.

## 1. Como foi verificado

- Leitura de todos os ficheiros de código (29) e dos textos; `php -l` nos 19 PHP e `node --check` no JS: sem erros de sintaxe.
- **Motor de tarifas** (`inc/tarifas.php`) contra o meu `lovable/src/lib/tarifas.ts` em 16 casos (épocas, mudança de ano, verão
  sábado→sábado certo e errado, mínimo de noites, mensal de 28 noites, 9 pessoas, ano sem tarifa, Setembro): **16 iguais**; pôr do sol
  21/jun/2027 = 21h01 nos dois.
- **A correr em PHP 8.3** (servidor embutido) em dois cenários: com uma **app de ensaio** que responde às quatro portas pela forma do
  `contrato_portas_v1.md` (200/201/401/409 preço/409 ocupado/429) e **sem app** (porta morta). Página sem avisos PHP; JSON-LD válido
  (VacationRental + LodgingBusiness com 13 imagens; FAQPage com 7 perguntas); as cinco portas do site testadas com `curl`.
- **Chromium a 390 px (iPhone) e 1 280 px:** página inteira, barra, painel com calendário, escolha de datas, conta, tempo, pedido enviado
  à app de ensaio, galeria, separadores dos álbuns, menu. Capturas em `revisao-site-php-2026-11-07/`.
- Factos contra o `FACTOS.md`; regras («Reguengo» só na morada, sem hectares, sem KPI, sem Facebook, sem «rústico»); fotografias contra o
  inventário do GitHub (md5).

## 2. O que está mal, por ordem de gravidade

**A · BLOQUEANTE no telemóvel · `assets/js/site.js`.** A variável `abertas` é usada na linha 48 (`abertas.length`, dentro de
`estadoDescer()`, chamada logo no arranque quando o ecrã tem menos de 768 px) e só é declarada na linha 79. No telemóvel o script morre
ao arrancar: **o botão «Verificar disponibilidade», o menu, a galeria e os separadores dos álbuns não respondem**, e a consola enche-se
(296 erros «Cannot read properties of undefined (reading 'length')» numa visita). No desktop não acontece porque o bloco sai antes
(`if (!movel.matches) return`). A NOTA avisava que o código nunca tinha corrido. **Correção:** declarar `var abertas = [];` no topo do
ficheiro. Com ela, a 390 px: zero erros, painel, calendário, conta («3 noites × 330 € + limpeza 170 € = 1 160 €» para 3–6/dez/2026),
tempo, pedido registado na app de ensaio, galeria, álbuns e menu a funcionar. Captura antes/depois na pasta.

**B · Aviso PHP e dado perdido · `api/avaliacoes.php` linha 7 e `api/prereserva.php` linha 34.** `in_array($x['lingua'] ?? 'pt', …) ?
$x['lingua'] : 'pt'` lê a chave em falta depois do `??`: «Undefined array key "lingua"» no registo do servidor e `lingua` vazia ou
`null` a caminho da app (visto na app de ensaio: `lingua=&n=6` e `"lingua":null`). **Correção:** ler primeiro para uma variável com
`?? 'pt'` e validar depois. Patch anexo; testado: zero avisos, `lingua=pt` chega à app.

**C · Fluxo do «preço diferente» incompleto.** Quando a app responde `erro: preco` (o contrato prevê 409 e um segundo POST com
`confirmo_preco: true`), o site mostra «O valor atualizado para estas datas é X. Confirmam?» mas **não há botão para confirmar**: o
visitante fica sem saída além do WhatsApp. Falta um botão «Confirmar X €» que reenvie com `confirmo_preco: true` e `preco_mostrado = preco_app`.

**D · Calendário com a app em baixo parece todo livre.** `api/ocupacao.php` sem app devolve `ocupado: []` e `app: false`; o JS só avisa
quando `exemplo` é verdadeiro. Em produção, com a app em baixo, o visitante vê tudo livre sem aviso. Falta: quando `app === false`,
dizer «calendário indisponível de momento; confirmamos as datas no pedido» e não pintar os dias de livre.

**E · IP falsificável · `api/prereserva.php`.** Usa `HTTP_X_FORWARDED_FOR` antes de `REMOTE_ADDR`. Na Amen não há proxy à frente: qualquer
cliente manda esse cabeçalho e contorna o limite por IP que a app aplica (#191). Usar `REMOTE_ADDR`.

**F · Dados pessoais em `cache/pedidos.log`.** Quando a app está em baixo, nome, email, telefone e IP ficam num ficheiro dentro da raiz
web, protegido só por uma regra `mod_rewrite` do `.htaccess`. Dois acertos: `cache/` fora da raiz web (como o `site_config.php` do
acordo) ou um `.htaccess` dentro de `cache/` com `Require all denied`; e **avisar alguém** quando um pedido fica em espera (hoje ninguém
sabe que existe; um email para `geral@` chega).

**G · `pedido_id` aceite do cliente sem validar** (`$in['pedido_id'] ?? gerado`): validar o formato UUID ou gerar sempre no servidor.

**H · JSON-LD dentro de `<script>`** sem `JSON_HEX_TAG`: um texto com `</script>` partiria a página. Acrescentar `JSON_HEX_TAG | JSON_HEX_AMP`.

**I · Texto da conta quando a estadia muda de época:** mostra «n noites × preço da época de entrada», mas o total soma dia a dia (está
certo). Exemplo: 30/12/2026 → 2/1/2027 dá «3 noites × 330 € + limpeza 170 € = 1 080 €» e 3 × 330 + 170 seria 1 160. Quando as épocas
diferem, escrever «3 noites + limpeza 170 € = 1 080 €» ou mostrar o detalhe por dia (a resposta já o traz).

**J · Fotografias.** Os 38 ficheiros são as **mesmas 33 do GitHub** (nenhuma nova; 2 variantes `-m` novas e 3 renomeações): 7 originais
em tamanho web, 2 recortes meus e **24 miniaturas de 600 px ou menos**, usadas na galeria e na caixa de ampliação, onde aparecem esticadas
(uma miniatura de 600 px num iPhone de 780 px de largura física). A «capa 2» continua a não existir. A NOTA assume-o («só 32 estão em
`fotos/`») e espera as fotografias do GPT em `design/fotos/galeria/…`, que **a 7/11 continuam a não existir no repositório**.

**K · Estrutura face aos sete pontos do Diogo.** Ordem: capa · mensagem · descobrir (quatro espaços) · **«A casa, num relance» (régua
nova)** · avaliações · perguntas · **«Fotografias» (álbuns, secção nova na página)** · Montemor e N2 · contactos · barra fixa. As duas
secções novas respondem por conta própria à decisão 0.1 do explodido (galeria em página própria ou nas sobreposições), que era do Diogo.
A mensagem continua a do Lovable («O dia é vosso / A casa também»), não aprovada. O resto segue a ordem decidida.

**L · Factos.** Tudo bate com o `FACTOS.md`: telefone, morada completa só no rodapé e no schema.org, 2 casas de banho, horas, mínimo de
noites, verão sábado→sábado, pagamento 30 %/70 %, distâncias, «desde 2022», ligações oficiais do Linktree (Airbnb, Booking, Vrbo), sem
hectares, sem KPI. Diferença pequena: as três plataformas estão no rodapé em letra pequena e no `sameAs`; a decisão de 8/10 punha-as numa
linha das «Perguntas frequentes». Falta a linha da FAQ ou muda-se a decisão.

**M · O que falta para ser o site do acordo:** versão **EN** (`/en/`, `hreflang`); `www.` e HTTP → HTTPS (painel da Amen); testes
automáticos em cada push (o workflow «Capturas» ainda não cobre `site/`); `docs/fotografia/creditos.md`; as portas #189–#192 **na app**
(ainda não existem; o site já fala a forma do contrato) e a chave `SITE_CHAVE` nos dois lados; o ensaio em `novo.montecasabranca.pt`.

## 3. O que está bem

Conteúdo separado do código (`conteudo.php`, `fotos/`) · tudo escapado com `e()` · APIs com cache em ficheiro, recurso quando a app
falha e respostas na forma do contrato · armadilha e tempo de preenchimento no pedido · `.htaccess` a negar `config.php`, `inc/`,
`partes/`, `cache/` · SEO completo (JSON-LD válido, Open Graph, `sitemap.xml`, `robots.txt`, `llms.txt`) · acessibilidade (ligação
«saltar», `aria-*`, teclado e deslizar na galeria, `prefers-reduced-motion`) · `<picture>` com variante `-m` (24 imagens no telemóvel) ·
sem rolagem horizontal a 390 nem a 1 280 · Playfair Display + Source Sans 3 e a paleta da prancha · a página nunca espera pela app (as
portas são chamadas pelo browser).

## 4. Face às decisões

- **Amen (1/11):** cumpre; é PHP e ficheiros, sobe por FTP ou pelo `deploy.yml`. Sem Lovable, sem créditos, sem build.
- **Base = versão do Lovable (25/10):** é a tradução fiel dessa versão, com as mesmas secções, textos e fotografias, mais as duas secções novas (K).
- **Acordo v1.2 → v1.3:** este caminho fica mais perto do v1.2 do que o Lovable (HTML/CSS/JS na Amen, PHP só para o servidor), com três
  diferenças a escrever: a página é PHP (não HTML gerado por Python); a pasta é `site/` (o acordo dizia `public/`); o design não veio do
  GPT em HTML/CSS, veio da versão do Lovable. O GPT continua dono das fotografias por zona e dos textos PT.

## 5. Próximos passos, se o Diogo disser «é por aqui»

1. Aplicar A e B (patch anexo), C, D e E (pequenos). Quem: o autor do zip ou eu, conforme o Diogo decidir.
2. Pôr o site no repositório (`site/` ou `public/`, decisão do Diogo) e o workflow «Capturas» a correr `php -l`, `node --check` e as
   capturas a 390/1 280 em cada push, como na demo.
3. Fotografias: a entrega do GPT em `design/fotos/` (ou a rede aberta ao Dropbox) → `fotos/<álbum>/` a 1 600 px com `-m` a 900 px.
4. Ensaio em `novo.montecasabranca.pt` pelo `LEIA-ME.md` do zip (config.php, cache gravável, as três verificações).
5. Portas #189–#192 na app (sessões APP) e a chave; depois EN; depois o «Lança».

Ficheiros: `revisao-site-php-2026-11-07/correcoes-A-B.patch` · capturas `php-390-*.jpg`, `php-1280-*.jpg` ·
`390-painel-ANTES-da-correcao-A.jpg` (o botão não abria nada) · `NOTA_PARA_O_CLAUDE_recebida.md`.
