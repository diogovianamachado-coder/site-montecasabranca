# Demo · registo de revisões

Uma linha por revisão da demo. A revisão atual está em `versao.json`; cada uma pode reproduzir-se pelo commit do site indicado (`git checkout <commit>` e `python3 demo/ferramentas/demo.py servir`). Estados: preparação técnica · rascunho · aprovado · rejeitado. **Só o Diogo aprova, por escrito, em `docs/decisoes/aprovadas.md`**; esta tabela regista, não decide.

**Ligação principal (mostra sempre a revisão mais recente):** https://claude.ai/artifact/DdiLqNNHdNeJnF61d4cr3S
**Ligação fixa por revisão (S29):** na coluna respetiva; não muda depois de publicada. **Capturas por revisão (S28):** `demo/capturas/rN/`.

| Revisão | Data | Estado | O que contém | Entrega de design (commit) | Commit do site | Ligação fixa da revisão | Validação |
|---|---|---|---|---|---|---|---|
| r0 | 2026-10-17 | preparação técnica | Página neutra «Demo em preparação» + zona de revisão `revisao.html`; ferramenta `demo.py`; capturas | nenhuma (sem desenho indicado para implementação) | 0b59571 (base) e o commit «SITE · demo · S28–S30» (capturas, ligação fixa, workflow) | https://claude.ai/artifact/Ld3NMAqtE7cyCNxv2Ud7cV | `demo.py testar` OK · capturas 390/1280 sem rolagem horizontal nem erros de consola |
| r1 | 2026-10-17 | **rascunho** | D03 «Casa ao sol», abertura do ChatGPT: fotografia grande, campo terracota «Cada um ao seu ritmo», três espaços, painéis (casa, por aqui, os vossos dias, menu), tempo e datas como exemplo | `design/estudo-d03-2026-10-17/index.html` (e066def) · handoff `docs/design/2026-10-17_d03_casa_ao_sol_handoff.md` | commit «SITE · demo r1 · D03» | https://claude.ai/artifact/MYfKqmUJ3qrXSCgQmupCRP | `testar` OK · capturas 390/1280 + cenários (três espaços, menu, painéis, datas) |
| r2 | 2026-10-25 | **rascunho** | V1.3.1 do ChatGPT (24/10): sete páginas, Início em scroll (grande fotografia, características, casa, trio com acessos à galeria, tempo, simulador, Montemor), A casa, Fotografias (filtros, ampliação, antes/depois), Preços e datas (calendário de 2 meses, simulador, pedido), Localização e Montemor (roteiro de dois dias), Perguntas, Contactos; barra inferior mobile (proposta) · kit a funcionar nos 7 encaixes | `design/site/` V1.3.1 (d08e628) · fecho `docs/decisoes/2026-10-24_fecho_chatgpt.md` · histórico `design/HISTORICO-VERSOES.md` | commit «SITE · demo r2» | https://claude.ai/artifact/UZMG6AvToxcNK83odg7rs9 | `testar` OK · `testar --design` OK (7 páginas) · cenário Chromium 84 verificações OK · capturas 390/1280 (jpg) + 7 estados em `demo/capturas/r2/` |
| r3 | 2026-10-25 | **rascunho** | r3 · a ordem do Diogo em sete pontos (capa, mensagem, a casa, avaliações e perguntas, datas, Montemor e N2, contactos), construída pelo Claude a partir da prancha | demo/r3/ () | commit «SITE · demo r3» | [ligação fixa r3](https://claude.ai/artifact/DCCRdLyWL9UmSkRk2oCQdF) · principal https://claude.ai/artifact/DdiLqNNHdNeJnF61d4cr3S | `testar` OK · capturas 390/1280 OK (sem rolagem horizontal) |

## r0 · 2026-10-17 · preparação técnica

- **Conteúdo:** nenhuma composição implementada. A entrada diz «Demo em preparação»; a zona de revisão mostra revisão, estado, entrega de design, commit e endereço.
- **Commit do site:** 0b59571 (base técnica) e o commit «SITE · demo · S28–S30» (capturas versionadas, ligação fixa, página de revisões, workflow «Capturas»); carimbado em `versao.js` pela ferramenta.
- **Ligação fixa r0:** https://claude.ai/artifact/Ld3NMAqtE7cyCNxv2Ud7cV (privada, claude.ai). Capturas em `demo/capturas/r0/`.
- **Validação:** `python3 demo/ferramentas/demo.py testar` (estrutura HTML, metas, `noindex`, ligações locais, recursos externos, JS) e `node demo/ferramentas/captura.cjs` (Chromium a 390 e 1280 px; sem rolagem horizontal, sem erros de consola, sem pedidos falhados). Capturas em `demo/_saida/capturas/` (não versionadas).
- **Limites:** sem app, sem dados reais, sem fotografias, PT apenas.

## r1 · 2026-10-17 · rascunho · D03 «Casa ao sol»

- **Origem:** entrega do ChatGPT em `design/estudo-d03-2026-10-17/index.html`, commit `e066def141e1046aee20bc71ce04953017a92c3a`,
  handoff `docs/design/2026-10-17_d03_casa_ao_sol_handoff.md`. **Rascunho para apreciação; nenhuma aprovação estética.** Janela/Índice
  continuam insuficientes; A/B/C e retoma-v2 rejeitadas.
- **O que o Claude mudou da entrega (só técnica, para a demo):**
  1. CSS para `site/estilos-d03.css` e JS para `site/d03.js`, sem alterar uma regra ou uma linha de lógica.
  2. As quatro imagens deixaram de ser data URIs dentro do script e passaram a ficheiros individuais em `site/imagens/`
     (`piscina-dia.jpg`, `portas-abertas.jpg`, `alpendre-copos.jpg`, `logo.png`), cópias byte a byte de
     `design/retoma-v2/imagens/` e `public/marca/logo.png` (o teste confirma a igualdade). Cada `<img>` leva `src` direto, por isso
     a página mostra as fotografias mesmo sem JS; o mapa `assets` do script aponta para os mesmos ficheiros.
  3. `<head>` da demo: `viewport-fit=cover`, `noindex, nofollow`, Google Fonts como na entrega, e os scripts `versao.js`/`demo.js`.
  4. Rodapé: à linha «Estudo visual D03 · em apreciação» juntou-se a ligação «demo r1, rascunho» para a zona de revisão.
  5. **Correção técnica provisória** em `site/correcoes-demo.css` (uma regra, `.brand img { height: auto }`): na entrega o logótipo
     900×354 sai esticado na vertical, porque o `<img>` leva `height="354"` fixo e o CSS só limita a largura. Captura antes da
     correção em `demo/capturas/r1/index-telemovel-antes-correcao-logo.png`; recado ao ChatGPT em
     `docs/integracao-app/RECADOS_PARA_O_CHATGPT.md`. A regra sai quando a fonte em `design/` for corrigida.
  Tudo o resto (marcação, textos, cores, fontes, painéis, formulário de datas) é a entrega tal qual.
- **Comportamento esperado:** mobile 390 sem título sobre o telhado, fotografia larga antes do campo terracota, menu «+»; desktop 1280
  com navegação no cabeçalho e «Escolher os dias». Os três botões trocam a fotografia e a legenda. Painéis `<dialog>` com foco e Escape.
  O formulário de datas valida saída posterior à entrada e resume em pt-PT; **sem preço, disponibilidade, pré-reserva ou envio**. O tempo
  é um exemplo visual, assinalado.
- **Interações reais vs apresentação:** reais: troca de espaços, painéis, menu, validação e resumo de datas. Apresentação: valores do tempo,
  «8 pessoas» fixo, ligações «Por aqui»/«Falar com o Diogo» abrem painéis (sem contacto real).
- **Validação:** ver tabela; capturas em `demo/capturas/r1/` (páginas inteiras a 390 e 1280 px e estados: espaço «Por dentro», menu,
  painel «A casa», datas preenchidas). Limitações: Chromium apenas; Safari/iPhone fica para o Diogo pela ligação.
- **Ligações:** principal (mais recente) https://claude.ai/artifact/DdiLqNNHdNeJnF61d4cr3S · fixa r1: https://claude.ai/artifact/MYfKqmUJ3qrXSCgQmupCRP

## Base técnica v2 · 2026-10-21 · sem revisão nova (a r1 mantém-se)

- **Pedido do Diogo (21/10):** uma demo técnica onde o ChatGPT carrega os designs (página principal, subpáginas, ligações, widgets,
  calendário, preços) e cada mudança se vê como será real, no telemóvel e em desktop, para ele decidir sobre o que é real.
- **O que entrou:** `demo/base/CONTRATO.md` (onde o ChatGPT põe os ficheiros: `design/site/`; regras das páginas; os cinco encaixes
  `data-base`) · `demo/base/kit/` (`base.js`: tempo Open-Meteo com semana de exemplo sem rede, calendário de ocupação, simulador com a
  tarifa 2026/2027 e as regras da app, pedido de datas com WhatsApp/email e o JSON do contrato #191, antes/depois, pôr do sol calculado no
  browser; `base.css` só estrutural) · `demo/base/dados/` (ocupação inventada na forma da porta #189, tarifas, médias de clima de exemplo,
  semana de tempo de exemplo, factos ✓) · `demo.py montar` (design/site + kit → demo/site, revisão, registo, imagens), `testar --design`
  (contrato), verificação da base sincronizada, `servir --pasta` · `demo/site/componentes.html` (os encaixes a funcionar, sem desenho) ·
  `demo/site/desktop.html` (qualquer página a 390/768/1024/1280) · workflow «Capturas» também em `design/site/**` com o ensaio das páginas
  do ChatGPT (testar --design, montar --para, capturas).
- **Sem desenho:** nada disto propõe aspeto; o CSS do kit não tem cores nem tipos. A D03 (r1) continua na entrada até à primeira montagem
  do `design/site` do ChatGPT (`montar --limpar --rev r2`).



## r2 · 2026-10-25 · rascunho · V1.3.1 do ChatGPT (sete páginas) com o kit a funcionar

- **Origem:** `design/site/` tal como o ChatGPT o deixou a 24/10 (V1.3.1; último commit em `design/site` d08e628; fecho de sessão em
  `docs/decisoes/2026-10-24_fecho_chatgpt.md`; as cinco versões V1–V1.3.1 em `design/arquivo/2026-10-24/`, índice `design/HISTORICO-VERSOES.md`).
  Montado por `demo.py montar --limpar --rev r2`: os 22 ficheiros copiados sem retoque (7 HTML, `estilos-site.css`, `apresentacao.js`,
  `icones.svg`, `galeria.json`, 11 imagens), kit injetado nas 7 páginas, r1 (D03) retirada de `demo/site` (fica reproduzível pelo commit e pela
  ligação fixa). A prancha aprovada continua a referência; mensagem e textos são provisórios (fecho do ChatGPT).
- **Encaixes do kit a funcionar:** Início → tempo (7 dias; semana de exemplo quando sem rede), simulador (14–17 mai 2027 = 1 170 €), pedido
  (dentro de «Preferem enviar um pedido?») · Preços e datas → calendário de 2 meses (ocupação INVENTADA, recusa noites ocupadas), simulador,
  pedido · Contactos → pedido. Tocar no calendário recalcula o simulador; «Pedir estas datas» abre o pedido com as datas; o pedido mostra o
  JSON do contrato #191 e as ligações WhatsApp/email com o texto pronto. **Nada é enviado nem gravado.**
- **Do ChatGPT (apresentação):** menu do cabeçalho, barra inferior mobile «Início · Menu · Datas» (V1.3, **proposta não aprovada**), trio com
  ligações às zonas da galeria (V1.3.1), filtros e ampliação das fotografias, roteiro «Dois dias no coração do Alentejo» expansível, FAQ em
  `<details>`, barra de progresso de leitura em mobile, Google Fonts (Playfair Display + Source Sans 3).
- **Correções técnicas do Claude nesta revisão (ferramenta, não desenho):** `imagens.json` deixa de ser nome reservado (era um engano do `demo.py`
  apontado pelo ChatGPT; CONTRATO v1.1) · o pedido sem datas escolhidas (página Contactos, sem simulador) passa a mensagem simples em vez de
  erro (kit; CONTRATO §3.4) · o `artefacto` tolera `<body data-page>` e `<head>` numa linha · `componentes.html` deixa de apontar para uma
  imagem da r1 · capturas versionadas em jpg (`captura.cjs --formato jpg`) · a linha em `docs/fotografia/creditos.md` passa a aviso na demo
  (é a conformidade 8, para a publicação) · `versao.json`: a r1 ganha o commit do site (734473e).
- **Leitura do monitor contra o `FACTOS.md` (nada de desenho):** telefone certo em todas as páginas; sem hectares, sem «Reguengo», sem 270 m²,
  sem KPI; 3 km · Évora 25 min · Lisboa 1 h · Comporta 50 min · Alqueva 1 h = FACTOS §5; 2 casas de banho, berço, AC, estacionamento junto ao
  tanque, 16h/11h, 30 % e 3.º dia útil, verão sáb→sáb = FACTOS §2–§4. **A conferir pelo Diogo:** as ligações das plataformas nas Perguntas
  (`airbnb.pt/rooms/614359946843546039`, `booking.com/Share-a7Qww5`) não são as do Linktree registadas no FACTOS §8 (`Share-KoMvpm`,
  `airbnb.com/h/monte-casa-branca-montemornovo-evora`) e falta o Vrbo (decisão de 8/10: os três links numa linha discreta).
- **Antes/depois (o próprio ChatGPT marcou os dois pares como incorretos em `galeria.json`; a demo mostra-os tal qual, sem os validar):**
  confirmado por olho nos ficheiros do repositório: `antes_casao_a14` é a pérgula/estrutura circular exterior e `depois_casao_interior_a3` o
  interior com as vigas (não é o mesmo enquadramento); `antes_quarto_a15` (quarto de paredes rosadas, janela alta com portadas) está
  emparelhado com `quarto_4413` (quarto atual sem porta para o exterior), quando a descrição do álbum do Zenfolio aponta para `quarto.jpg`
  (IMG_0322: porta para o alpendre, decoração circular sobre a cama). **Originais localizados no Dropbox (só leitura):**
  `/1. DVM/2. ANGULOS CASTIÇOS, LDA/5. Exploração AL/7. Fotos/6. Antes e Depois/` (25 ficheiros): «antes» pela data da fotografia = `a14.JPG` e
  `a20.JPG` (4/6/2021), `a22.JPG` (2/5/2021), `a15.JPG` (9/11/2020); «depois» = `a1`–`a13`, `a16`–`a19`, `a21` (12/10/2023; `a2`, `a9`, `a10`,
  `a16` em HEIC) e três soltos de 12/10/2023 às 19h02 (`8 …JPG`, `9 …JPG`, `IMG_1105 …HEIC`). Os ficheiros do repositório vieram daí pela pasta
  `docs/temas/site/fotos/600/` da app. A rede do ambiente não deixa o Claude descarregar as imagens do Dropbox (403): o par certo escolhe-se por
  olho (Diogo ou ChatGPT com as capturas IMG_4608/IMG_4610 que não estão no repositório).
- **Validação:** ver a tabela. Cenário em `demo/capturas/r2/`: `index-menu-390`, `index-dock-menu-390`, `index-simulador-verao-390`,
  `index-pedido-390`, `precos-calendario-1280`, `fotografias-ampliacao-390`, `localizacao-roteiro-390`. Limitações: Chromium apenas; Safari e
  iPhone ficam para o Diogo pelas ligações; o tempo real (Open-Meteo) só aparece com rede no browser do Diogo.
- **Ligações:** principal (mais recente) https://claude.ai/artifact/DdiLqNNHdNeJnF61d4cr3S · fixa r2: https://claude.ai/artifact/UZMG6AvToxcNK83odg7rs9


## r3 · 2026-10-25 · rascunho · a ordem do Diogo em sete pontos, construída pelo Claude

- **Porquê:** mensagem do Diogo de 25/10 («Não estou a gostar da direção que o site está a tomar… Consegues por isto a funcionar?»), com a
  lógica do site em sete pontos: 1 piscina e casa logo à entrada · 2 mensagem forte com fotografias fortes · 3 a casa em detalhe, o exterior
  é rei, depois a sala e o interior · 4 avaliações e perguntas frequentes · 5 localização, Montemor-o-Novo e N2 · 6 contactos · 7 o botão
  de verificar a disponibilidade sempre à mão, com o tempo a ajudar. Esta ordem é a experiência de quem visita o site.
- **Origem:** `demo/r3/` (código e composição do Claude, a partir da prancha aprovada de 19/10 e dos textos PT da V1.3.1 do ChatGPT),
  montado por `demo.py revisao r3 --de demo/r3`. Duas páginas: `index.html` (a experiência inteira em scroll, com as secções
  `#mensagem`, `#a-casa`, `#perguntas`, `#datas`, `#montemor`, `#contactos`) e `fotografias.html`.
- **O que tem:** capa a ecrã inteiro com a piscina e a casa (no telemóvel, o recorte com o chapéu de sol e a casa da chaminé); mensagem
  «Por dentro. Por fora. Sem pressa.» com a sala pelas portas abertas e a banda «Há dias em que não é preciso mais nada.» sobre o alpendre;
  a casa em detalhe (exterior primeiro, sala e cozinha, quartos, números, um par antes/depois honesto); a avaliação real do Airbnb de 2023
  e dez perguntas; datas com o tempo, o calendário, o simulador e o pedido (kit da demo, dados de exemplo); Montemor-o-Novo, distâncias,
  Nacional 2 em dois dias, Google Maps; contactos; barra «Ver datas e disponibilidade» + WhatsApp no telemóvel e botão flutuante no desktop,
  que se escondem quando as datas já estão à vista; cabeçalho transparente sobre a fotografia e sólido depois; revelar ao rolar e paralaxe
  suave, desligados com `prefers-reduced-motion`.
- **Factos:** só os ✓ do `FACTOS.md` (telefone, horas, mínimo, verão, limpeza, distâncias, 8/4/2, piscina 10 × 5 m, morada completa só no rodapé).
  Sem hectares, sem KPI, sem preços por época. Ligações das plataformas por `data-liga` (S34).
- **Validação:** `testar` OK (6 páginas) · capturas 390/1280 OK, sem rolagem horizontal (a primeira volta tinha o cartão do tempo a
  estourar 51 px no telemóvel: grelha com `minmax(0,1fr)`) · kit a funcionar nas duas páginas (tempo, calendário, simulador, pedido).
- **Limites desta revisão:** só as onze fotografias que estão no repositório (seis delas em tamanho web); a fotografia «de lado, com a
  espreguiçadeira e o chapéu» que o Diogo pediu para a capa não está no repositório e a rede não deixa o Claude descarregar do Dropbox;
  os outros dez pares antes/depois, a galeria completa e mais avaliações entram quando as fotografias e os textos chegarem.
- **Ligações:** fixa r3 https://claude.ai/artifact/DCCRdLyWL9UmSkRk2oCQdF · principal https://claude.ai/artifact/DdiLqNNHdNeJnF61d4cr3S.
- **Referência paralela (pedido do Diogo):** versão da página de entrada feita pelo Lovable com o mesmo brief, as mesmas fotografias e a
  prancha: https://lovable.dev/projects/96fa8399-2585-4338-bf69-b63411871178 (editor; pré-visualização
  https://id-preview--96fa8399-2585-4338-bf69-b63411871178.lovable.app). Não é a demo nem entra no repositório: é React, fora da stack do
  acordo; serve de comparação de «alma».

## r4 · 7/11/2026 · o site em PHP (v2), rendido para a demo

- **Fonte:** `site/` deste repositório (a v2 do zip de 7/11, feita por outro assistente a partir da versão do Lovable e das peças de
  `lovable/src/lib/`; revisão do Claude em `docs/integracao-app/2026-11-07_revisao_site_php.md`). Decisão do Diogo (7/11, noite): «o site é
  sempre por aqui que entra, isso não há dúvida».
- **Como se fez a demo:** a página foi rendida pelo PHP 8.3 para HTML estático (`index.html`), com `assets/` e `fotos/` tal e qual, mais o
  ficheiro `demo/portas-demo.js` que imita as cinco portas no browser (tarifa pelo motor `lovable/src/lib/tarifas.ts`, ocupação e tempo de
  exemplo, avaliações vazias, pedido simulado com a mensagem «DEMO · o pedido não foi enviado a lado nenhum»). `noindex`. Nada disto existe
  no site real: na Amen as portas são os `api/*.php`.
- **Ligações:** principal https://claude.ai/artifact/DdiLqNNHdNeJnF61d4cr3S (substitui a r3) · **fixa r4** https://claude.ai/artifact/53xz7FmTzRVpLE95v5YMA9.
- **Limites da demo:** pedidos não são enviados; o calendário é de exemplo; o tempo é de exemplo; sem EN.
