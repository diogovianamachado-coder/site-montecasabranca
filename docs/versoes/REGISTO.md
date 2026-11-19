# Versões do site em `novo.montecasabranca.pt` · registo

**Para que serve (pedido do Diogo, 15/11/2026):** «preciso que se registe as versões que vão para o "novo" para sabermos onde fomos
melhores. Eu quero poder dizer que quero manter X parte da versão anterior.»

Cada vez que o site é publicado no ensaio (`novo.montecasabranca.pt`) nasce uma **versão** com número: V1, V2, V3… Este ficheiro guarda,
para cada uma, quando foi publicada, o que mudou em cada parte da página, onde estão as fotografias dessa versão e o que o Diogo achou.

## Como se usa (Diogo)

1. **Saber que versão estás a ver.** No fundo da página do ensaio, em letra pequena, está escrito, por exemplo, «Ensaio · versão 2 · 16/11/2026».
   O site a sério (`montecasabranca.pt`) não mostra isto.
2. **Ver uma versão antiga.** Depois de uma versão nova ser publicada, a anterior deixa de estar no ar, mas fica fotografada parte a parte
   em `docs/versoes/v<N>/` (no computador e no telemóvel). As folhas «lado a lado» de duas versões pedem-se ao Claude a qualquer altura
   («mostra-me a V1 ao lado da V2»).
3. **Manter uma parte de uma versão anterior.** Basta dizer a parte e a versão, pelos nomes da tabela de baixo:
   «quero a capa da V1», «o menu da V1 era melhor», «a galeria fica como na V2 mas com o título da V1». O Claude vai buscar essa parte
   à versão guardada, monta-a na versão atual sem desfazer o resto e mostra as duas lado a lado antes de publicar. O resultado é uma
   versão nova (a seguinte), com a nota «capa reposta da V1».
4. **Dizer onde fomos melhores.** Em cada ficha há a coluna «O que o Diogo achou». Fica «por dizer» até dizeres; basta uma palavra por
   parte (melhor · pior · igual) ou uma frase.

## As partes da página (os nomes que usamos)

| N.º | Parte | O que é | Onde está no código da versão atual (pasta `site/`) |
|---|---|---|---|
| 1 | **Capa** | A primeira imagem, o título, as etiquetas e o menu de cima | `partes/inicio.php` · `conteudo.php` → `inicio`, `menu_topo` |
| 2 | **A casa** (a mensagem) | O cartaz «Por fora · Sem pressa · Por dentro» | `partes/casa.php` · `conteudo.php` → `casa` |
| 3 | **Os espaços** | Por fora, sem pressa, por dentro: um capítulo cada, com o texto e as fotografias em sequência | `partes/momentos.php` · `conteudo.php` → `momentos` · `inc/util.php` → `sequencia()` |
| 4 | **O fecho e a régua** | A frase que fecha a casa e a fila de fotografias pequenas | `partes/regua.php` · `conteudo.php` → `fecho`, `regua` · `inc/util.php` → `fila()` |
| 5 | **Montemor, N2 e onde estamos** | Três capítulos: a vila e a ecopista · a Nacional 2 e o programa de duas noites · as distâncias e o mapa | `partes/montemor.php`, `partes/nacional2.php`, `partes/onde.php` · `conteudo.php` → `montemor`, `n2`, `onde` · `inc/factos.php` → `distancias`, `ligacoes` |
| 6 | **A galeria** | Os álbuns de fotografias («Passear pelo Monte») | `partes/galeria.php` · `conteudo.php` → `galeria` |
| 7 | **Antes de chegar** | As perguntas e respostas | `partes/antes.php` · `conteudo.php` → `antes`, `perguntas` |
| 8 | **Quem já ficou** | As frases dos hóspedes e as três notas | `partes/avaliacoes.php` · `conteudo.php` → `avaliacoes` · `inc/factos.php` → `notas` |
| 9 | **Contactos e rodapé** | «Falamos?», os contactos e a letra pequena | `partes/contactos.php` · `conteudo.php` → `contactos` |
| 10 | **O menu completo** | O menu que abre no botão «Menu» | `partes/dock.php` · `conteudo.php` → `menu` |
| 11 | **O painel das datas** | Calendário, contas, tempo e pedido de datas | `partes/dock.php` · `assets/js/site.js` · `conteudo.php` → `disponibilidade` · `api/` · `inc/tarifas.php` |
| 12 | **A barra de baixo** | Menu · Contacto · Verificar disponibilidade | `partes/dock.php` · `conteudo.php` → `dock` |

O desenho de todas as partes vive em `assets/css/site.css` (cada parte tem o seu bloco) e as fotografias em `fotos/`.

## Versões

### V7 · 19/11/2026 · as fotografias grandes quase inteiras no telemóvel, o rato livre e «Quantas pessoas vêm?» sem palavra

- **Publicada:** 19/11/2026, às 19h48 (hora de Lisboa), com o «Lança» do Diogo: deploy do site n.º 27 (o n.º 26 foi o ensaio a
  seco), commit `6e4f945`, **etiqueta `novo-v7`** (o site é o do commit `6ec8915`; o `6e4f945` só juntou a ferramenta que encontra os
  originais das fotografias). É a que está no ar em `novo.`. Face à V6 mudaram 7 ficheiros (`conteudo.php`, `versao.json`,
  `assets/css/site.css`, `assets/js/site.js`, `inc/util.php`, `partes/momentos.php`, `partes/montemor.php`); nada entrou nem saiu, e
  as fotografias ficaram como estavam. Testes «Capturas» n.º 80 (`6ec8915`) e n.º 81 (`6e4f945`) verdes, com a geometria no Chromium
  e no WebKit; na n.º 81 o trabalho da demo antiga falhou na primeira tentativa porque contou como erro um pedido de fotografia
  cancelado pelo próprio browser (`desktop.html`), e passou ao voltar a correr; o teste foi corrigido a seguir.
- **Verificação depois do envio:** a página responde (HTTP 200 à primeira) e mostra «Ensaio · versão 7»; continua fora dos motores de
  busca (`noindex` e `robots.txt` de bloqueio); a previsão, a conta e as médias do tempo respondem. «Verificar o site (só lê)»,
  corrida n.º 6: a página em 0,7 s, sem ligações para as plataformas; as 190 fotografias da página existem no servidor; as portas
  respondem em cerca de 0,3 s cada.
- **De onde vem:** as notas do Diogo de 19/11 sobre a V6 (`docs/integracao-app/2026-11-19_notas_do_diogo_v6.md`): sobre «Escolham»,
  «esta palavra não fica bem aqui. deixa em branco»; «quando o rato do pc está estacionado em cima da foto a régua para. não deve
  parar. o rato deverá estar livre»; «pelo desktop parece que o site está bem. as fotos grandes no mobile parece que ficam cortadas e
  sem nexo»; e, com quatro capturas do iPhone: «Se a de Montemor até não fica mal, as outras ficam péssimas e não mostram nada.
  Verifica se é técnico e então pode-se fazer nova revisão. Quero que fique tudo pronto a colocar no servidor e só ficar a faltar as
  fotos que queremos colocar.»
- **O que mudou:**
  1. **As fotografias grandes no telemóvel (era técnico).** As quatro são deitadas (3 × 2) e a caixa do telemóvel era mais alta do
     que larga (596 px de altura num ecrã de 393): via-se 37 % da largura de cada fotografia, uma tira do meio, e na versão de
     1 000 px. Agora a caixa tem de altura 78 % da largura do ecrã (307 px; nunca mais de 70 % da altura do ecrã) e a caixa que faz a
     fotografia passar devagar é 12 % mais alta (era 20 %): vê-se 76 % da largura, com a versão de 1 600 px. A palavra fica um pouco
     mais pequena. Nos tablets ao alto, a altura não passa de 62 % da largura (vê-se 90 %; era 49 %). Montemor fica como estava no
     telemóvel («a de Montemor até não fica mal»). No computador nada muda.
  2. **O rato livre.** Passar o rato por cima das fotografias, parado ou a mexer-se, já não pára as faixas (capítulos, régua do
     fecho, Montemor, ecopista). Carregar e arrastar continua a levá-las; um clique abre a fotografia; a tecla Tab segura-as. As
     frases de «Quem já ficou» continuam a esperar com o rato em cima delas, para se conseguirem ler (pergunta em aberto nas notas).
  3. **«Quantas pessoas vêm?»** começa em branco, sem «Escolham»; o pedido de datas continua a pedir o número.
  4. **Pronto para as fotografias.** A fotografia grande de cada capítulo e de Montemor escolhe-se numa linha (`conteudo.php` →
     `banda`); se for uma das da faixa de baixo, sai sozinha da faixa e nunca aparece duas vezes. A escolha faz-se pelo processo
     «separador - número de fotos» (`docs/fotografia/2026-11-19_escolha_das_fotografias_por_separador.pdf`).
- **Onde está:** `assets/css/site.css` («Fotografias grandes a abrir os capítulos») · `assets/js/site.js` (bloco «Rolos», sem a
  pausa do rato; «Fotografias que passam devagar», com o curso medido pela folga de cada caixa) · `inc/util.php` (`foto_img` com
  `$soGrande`; `banda()`; `sem_a_grande()`) · `partes/momentos.php` e `partes/montemor.php` · `conteudo.php` (`pessoas_escolher`).
  Testes: `geometria.cjs` ponto 10 (as três fotografias grandes com pelo menos 70 % da largura à vista, Chromium e WebKit) ·
  `captura-site.cjs` (o rato a mexer-se e parado não pára a faixa; a opção vazia sem palavra) · `conferir-fotos.php` (conta as
  faixas como a página fica).
- **Capturas:** `docs/versoes/v7/` e, só do telemóvel, `docs/integracao-app/revisao-2026-11-19/bandas-telemovel-antes-e-agora.jpg`.
- **Ordem da página:** a mesma da V6.

| Parte | O que mudou face à V6 | O que o Diogo achou |
|---|---|---|
| 1 Capa | Igual | por dizer |
| 2 A casa | Igual | por dizer |
| 3 Os espaços | No telemóvel as fotografias grandes vêem-se quase inteiras (76 % da largura; antes 37 %) e mais nítidas; nos tablets ao alto, 90 %; a palavra um pouco mais pequena; a grande nunca se repete na faixa; o rato por cima não pára as faixas | por dizer |
| 4 Fecho e régua | O rato por cima não pára a régua | por dizer |
| 5 Montemor, N2 e onde estamos | Montemor igual no telemóvel; o rato por cima não pára as faixas | por dizer |
| 6 A galeria | Igual | por dizer |
| 7 Antes de chegar | Igual | por dizer |
| 8 Quem já ficou | Igual | por dizer |
| 9 Contactos e rodapé | Igual (no ensaio, «Ensaio · versão 7 · 19/11/2026») | por dizer |
| 10 Menu completo | Igual | por dizer |
| 11 Painel das datas | «Quantas pessoas vêm?» em branco, sem «Escolham» | por dizer |
| 12 Barra de baixo | Igual | por dizer |

### V6 · 19/11/2026 · as notas de 18 e 19/11: a pílula, o cartaz em escada, as fotografias grandes, a ecopista, a N2, as avaliações, a galeria, o voltar e o painel

- **Publicada:** 19/11/2026, às 10h42 (hora de Lisboa), com o «Lança» do Diogo: deploy do site n.º 25 (o n.º 24 foi o ensaio a
  seco), commit `37b0736`, **etiqueta `novo-v6`**. Esteve no ar em `novo.` a 19/11/2026, das 10h42 às 19h48. Face à V5 mudaram 14 ficheiros (`conteudo.php`,
  `index.php`, `versao.json`, `assets/css/site.css`, `assets/js/site.js`, `inc/util.php` e oito partes: `avaliacoes`, `casa`, `dock`,
  `galeria`, `inicio`, `momentos`, `montemor`, `nacional2`); nada entrou nem saiu, e as fotografias ficaram como estavam. Commits do
  site: `75f243c` (a pílula de descer) e `4d687e5` (as outras notas de 18 e 19/11); testes «Capturas» n.º 76 e n.º 77 verdes
  (Chromium e WebKit).
- **Verificação depois do envio:** a página responde (HTTP 200 à primeira) e mostra «Ensaio · versão 6»; continua fora dos motores de
  busca (`noindex` e `robots.txt` de bloqueio); a previsão, a conta e as médias do tempo respondem; `config.php` ficou como estava.
  «Verificar o site (só lê)», corrida n.º 5: a página responde em 1,4 s e mostra a versão 6; sem ligações para as plataformas; as 190
  fotografias da página existem no servidor; as portas (previsão, conta, calendário e médias do tempo) respondem em meio segundo cada.
- **De onde vem:** o Diogo viu a V5 no iPhone e mandou duas mensagens. A primeira, a captura da capa com o botão do canto rodeado:
  «Faltou esta parte» (a pílula). A segunda, com seis capturas: «Grande parte das alterações não as fizeste. Revê o que pedi: botão de
  deslizar, menu do por dentro sem pressa e por fora, falta o botão de voltar quando abro as fotos pelo scroll down, mantiveste a n2
  igual? O montado está vazio.» Tinha razão: a V5 foi só das frases e as outras notas de 18 e 19/11
  (`docs/integracao-app/2026-11-18_notas_do_diogo_v4.md`) ficaram por fazer. **Falha minha**: com «Retira as frases e lança» devia ter
  perguntado se as outras notas iam já. A V6 faz todas as que estavam decididas ou propostas.
- **O que mudou, nota a nota:**
  1. **A pílula de descer** (18/11, nota 2, e a decisão «o ícone do rato pode ficar no meio, mais flutuante e sem ficar em frente ao
     texto; sobe a posição»): o rato com um ponto a descer, como na V1 e na V2. Na capa fica ao centro, por baixo de «Entrar pela
     casa»; quando a capa sai do ecrã, sobe e flutua por cima da barra de baixo. Nunca fica por cima de texto (apaga-se e não apanha
     toques); cada toque leva à secção seguinte; no fim vira-se e volta ao topo; esconde-se com camadas abertas.
  2. **O cartaz em escada** (19/11, nota 1, «menu em escada»): «Por fora» à esquerda, «Sem pressa» ao meio, em itálico e na cor
     terracota, «Por dentro» à direita, sem setas, como na V2; as palavras entram uma a seguir à outra e cada uma leva ao seu capítulo.
  3. **Fotografias com vida** (18/11, nota 1, «havia umas fotos que tinham vida na primeira versão»): cada capítulo da casa e Montemor
     abrem com uma fotografia grande, de lado a lado, com a palavra (ou o título) escrita por cima, como as bandas da V1. Entra a
     acender e passa devagar por trás enquanto se rola, em qualquer telemóvel. As fotografias das faixas entram uma a uma. Fotografias
     grandes: a piscina e o pinheiro de manhã (Por fora), o alpendre com o pinheiro (Sem pressa), a cozinha e a sala (Por dentro), a
     igreja branca e azul (Montemor); nenhuma repete as que já estavam em destaque.
  4. **Montemor e a ecopista** (19/11, nota 7, «O montado está vazio»; «são da ecopista»): as fotografias da vila passam numa faixa
     mais pequena do que as da casa (sete); a ecopista ganha a sua régua pequena com as três fotografias da bicicleta, a começar pela do
     túnel de árvores.
  5. **A Nacional 2 num só bloco** (19/11, nota 6, e «Tem mais lógica assim, mas enquadra e dimensiona como achares melhor»): o traço
     fino à esquerda junta o sobretítulo, o título, a mensagem, a casa ao entardecer em destaque (passa devagar ao rolar) e o programa
     pequeno, com os dias em itálico e o texto ao lado, a estadia mínima e a ligação. No computador, a fotografia fica à direita.
  6. **As avaliações** (18/11, nota 5, «… saberem que há mais avaliações e que quem visita pode ver mais»; desenhou uma seta para cada
     lado): por baixo da frase, duas setas e um traço por frase, como nas histórias do Instagram; o traço da frase à vista enche-se
     enquanto ela está no ecrã e, quando acaba, vem a seguinte. As setas e o dedo para o lado passam a frase. Sem números.
  7. **A galeria** (19/11, nota 3, «propõe na próxima versão»): passou para antes dos contactos e ficou curta (seis de cada álbum);
     «Ver todas as fotografias» abre o álbum inteiro por cima da página, com o fechar sempre à vista; ao fechar, a página está onde
     estava. Os dois menus mudaram de ordem com ela.
  8. **«Voltar onde estava»** (18/11, nota 3, e «falta o botão de voltar quando abro as fotos»): depois de um salto grande por uma
     ligação (o menu, «Passear pelo Monte», as palavras do cartaz), aparece no canto de cima o botão «Voltar onde estava», que leva ao
     ponto exato de onde se saiu. O gesto de voltar do iPhone faz o mesmo, sem «#» no endereço.
  9. **O painel das datas** (19/11, notas 4 e 5): o cimo (título e fechar) fica sempre à vista e só o resto rola; «Quantas pessoas
     vêm?» começa vazio («Escolham»); a conta aparece sem ele e o pedido de datas pede-o.
- **Onde está:** `partes/inicio.php` (pílula) · `partes/casa.php` (cartaz) · `partes/momentos.php`, `partes/montemor.php` e
  `inc/util.php` → `banda()`, `regua_pequena()`, `rolo()` com 'mini' e 'minimo' (fotografias grandes, ecopista) · `partes/nacional2.php`
  · `partes/avaliacoes.php` · `partes/galeria.php` e `partes/dock.php` (álbum inteiro, «Voltar onde estava», painel) · `index.php`
  (ordem) · `conteudo.php` (menus, `banda`, `ecopista.fotos`, `galeria.curta`, textos novos) · `assets/css/site.css` e
  `assets/js/site.js` (blocos com o nome de cada coisa). Testes: `geometria.cjs` (pontos 8 e 9, Chromium e WebKit) e `captura-site.cjs`
  (cada nota acima) · `conferir-fotos.php` (fotografias grandes e ecopista sem repetidas).
- **Capturas:** `docs/versoes/v6/`.
- **Ordem da página:** capa · a casa (cartaz) · por fora · sem pressa · por dentro · fecho e régua · Montemor (com a ecopista) · N2 ·
  onde estamos · antes de chegar · quem já ficou · **passear pelo Monte** · contactos.

| Parte | O que mudou face à V5 | O que o Diogo achou |
|---|---|---|
| 1 Capa | O botão redondo do canto passa a ser a pílula de descer, ao centro, por baixo de «Entrar pela casa» | por dizer |
| 2 A casa | O cartaz em escada, como na V2, sem setas | por dizer |
| 3 Os espaços | Cada capítulo abre com uma fotografia grande e a palavra por cima, que passa devagar ao rolar; as fotografias da faixa entram uma a uma | «Porque é que as fotos principais mudaram?» (19/11): as fotografias grandes foram escolha minha, sem perguntar; repor as de antes espera a palavra dele · «as fotos grandes no mobile parece que ficam cortadas e sem nexo» (19/11) → próxima revisão (`docs/integracao-app/2026-11-19_notas_do_diogo_v6.md`) |
| 4 Fecho e régua | Igual | por dizer |
| 5 Montemor, N2 e onde estamos | Montemor abre com uma fotografia grande e o título por cima; a faixa da vila mais pequena (sete); a ecopista com a régua pequena das três fotografias da bicicleta; a N2 num só bloco, com a fotografia em destaque e o programa pequeno | A fotografia grande de Montemor entra nas duas notas da parte 3 (escolha minha; cortada no telemóvel) → próxima revisão |
| 6 A galeria | Passou para antes dos contactos; curta (seis), com «Ver todas as fotografias», que abre o álbum inteiro por cima | por dizer |
| 7 Antes de chegar | Igual (vem agora logo a seguir a «Onde estamos») | por dizer |
| 8 Quem já ficou | Duas setas e um traço por frase, que se enche enquanto ela está à vista; o dedo para o lado passa a frase | por dizer |
| 9 Contactos e rodapé | Mais espaço verde em baixo, para a pílula ficar ali no fim a dizer «voltar ao topo» (no ensaio, «Ensaio · versão 6 · 19/11/2026») | por dizer |
| 10 Menu completo | A ordem nova: «Passear pelo Monte» antes de «Contactos» | por dizer |
| 11 Painel das datas | O cimo sempre à vista; «Quantas pessoas vêm?» começa vazio e o pedido pede-o | Sobre «Escolham»: «esta palavra não fica bem aqui. deixa em branco» (19/11, no computador) → próxima revisão |
| 12 Barra de baixo | Igual; a pílula flutua por cima dela | por dizer |
| Toda a página | A pílula de descer em todo o site; «Voltar onde estava» depois de um salto grande (e o gesto de voltar do iPhone) | «pelo desktop parece que o site está bem» · «quando o rato do pc está estacionado em cima da foto a régua para. não deve parar. o rato deverá estar livre» (19/11) → próxima revisão |

### V5 · 19/11/2026 · as frases retiradas

- **Publicada:** 19/11/2026, às 01h01 (hora de Lisboa), com o «Lança» do Diogo («Retira as frases e lança»): deploy do site n.º 23
  (o n.º 22 foi o ensaio a seco), commit `ea2fbd4`, **etiqueta `novo-v5`**. Esteve no ar em `novo.` a 19/11/2026, das 01h01 às 10h42. Face à V4 mudaram 7
  ficheiros, todos de texto (`conteudo.php`, `llms.txt`, `versao.json`, `inc/util.php`, `partes/avaliacoes.php`, `partes/inicio.php`,
  `partes/nacional2.php`); nada entrou nem saiu, e as fotografias ficaram como estavam. Testes «Capturas» n.º 72 verdes (Chromium e
  WebKit).
- **Verificação depois do envio:** a página responde (HTTP 200 à primeira) e mostra «Ensaio · versão 5»; continua fora dos motores de
  busca (`noindex` e `robots.txt` de bloqueio); a previsão, a conta e as médias do tempo respondem; `config.php` ficou como estava.
  «Verificar o site (só lê)», corrida n.º 4: todas as fotografias da página existem no servidor e as portas respondem.
- **De onde vem:** quatro notas do Diogo sobre a V4: «retirar as micro legendas das fotos» (nota 2 de 19/11) · «na capa retirar a
  frase da receção» (nota 6 de 18/11) · «nas avaliações retira que são de 2026» (nota 4 de 18/11) · e, sobre a frase da capa, «sim,
  coloca o sem pressa e sem receção na resposta à hora de entrada». **Só textos:** o desenho e o movimento são os da V4. As outras
  notas da V4 (as marcadas «→ V5» na ficha da V4: fotografias grandes, pílula de descer, voltar onde estava, mais avaliações, cartaz
  em degraus, galeria curta e no fim, cimo do painel fixo, o «4», a N2 num só bloco, a ecopista com régua) ficam para a versão
  seguinte; estão em `docs/integracao-app/2026-11-18_notas_do_diogo_v4.md`.
- **Capturas:** `docs/versoes/v5/`.
- **Ordem da página:** a mesma da V4.

| Parte | O que mudou face à V4 | O que o Diogo achou |
|---|---|---|
| 1 Capa | Sai «Sem receção, sem pressa», que estava ao lado de «Entrar pela casa»; a ideia passou para «Antes de chegar» | «Faltou esta parte» (19/11, com a captura da capa e o botão redondo do canto rodeado): a pílula de descer, decidida a 18/11, não tinha entrado → V6 |
| 2 A casa | Igual | «menu do por dentro sem pressa e por fora» (19/11): o cartaz em escada, decidido a 19/11, não tinha entrado → V6 |
| 3 Os espaços | As fotografias dos três capítulos deixam de ter a legenda escrita por cima (e a sombra em baixo que a deixava ler). A descrição fica para quem usa leitor de ecrã e por baixo da fotografia aberta em grande | por dizer |
| 4 Fecho e régua | Igual (a régua já não tinha legendas) | por dizer |
| 5 Montemor, N2 e onde estamos | As fotografias de Montemor também sem legenda por cima; a fotografia da N2 sem a legenda por baixo («A mesma casa à vossa espera ao fim do dia») | «mantiveste a n2 igual? O montado está vazio.» (19/11): a N2 num só bloco e a ecopista com a sua régua não tinham entrado → V6 |
| 6 A galeria | Igual | por dizer |
| 7 Antes de chegar | «A que horas podemos chegar?» passa a dizer: «A entrada é a partir das 16h, sem receção e sem pressa: o Diogo envia antes as indicações para entrarem sozinhos. A saída é até às 11h; quando ninguém entra no mesmo dia, pode ficar para as 18h, para aproveitarem o dia até ao fim.» | por dizer |
| 8 Quem já ficou | A linha de baixo fica só «Recebemos hóspedes desde 2022» (sai «· notas de novembro de 2026») | por dizer |
| 9 Contactos e rodapé | Igual (no ensaio, «Ensaio · versão 5 · 19/11/2026») | por dizer |
| 10 Menu completo | Igual | por dizer |
| 11 Painel das datas | Igual | por dizer |
| 12 Barra de baixo | Igual | por dizer |
| Toda a página | No resumo para os assistentes de pesquisa (`llms.txt`), a entrada passa a dizer que é sem receção | «Grande parte das alterações não as fizeste» e «falta o botão de voltar quando abro as fotos pelo scroll down» (19/11): as notas de 18 e 19/11 ficaram por fazer → todas na V6 |

### V4 · 18/11/2026 · o movimento: as fotografias deslizam sozinhas, devagar e sem parar

- **Publicada:** 18/11/2026, às 00h35 (hora de Lisboa), com o «Lança» do Diogo (17/11, 23h55): deploy do site n.º 21 (o n.º 20
  foi o ensaio a seco), commit `0be7000`, **etiqueta `novo-v4`**. Esteve no ar em `novo.` de 18/11 a 19/11/2026. Face à V3: mudaram 7 ficheiros
  (`site.css`, `site.js`, `conteudo.php`, `inc/util.php`, `partes/contactos.php`, `partes/regua.php`, `versao.json`), nenhum entrou
  nem saiu, e as 190 fotografias ficaram como estavam. Commits do site: `be0646d` (o movimento e a capa), `c876fd5` (a régua com as
  fotografias do mesmo tamanho; a animação criada pelo `site.js`), `504c1d1` (a data), `1fda384` (o arrasto no motor do Safari);
  testes «Capturas» n.º 65 verdes (Chromium e WebKit); as corridas n.º 60 e 62 falharam e apanharam as duas falhas corrigidas, e as
  n.º 61, 63 e 64 foram canceladas pelo GitHub antes de testar (espelho do Ubuntu lento; `0be7000` deu-lhes mais tempo).
- **Verificação depois do envio:** a página responde (HTTP 200 à primeira) e mostra «Ensaio · versão 4»; continua fora dos motores de
  busca (`noindex` e `robots.txt` de bloqueio); a previsão, a conta e as médias do tempo respondem; `config.php` ficou como estava.
- **O que o Diogo achou, ao vivo, no iPhone (18/11, entre as 00h40 e as 00h55, com quatro capturas):** «Já está melhor.» E seis
  notas, **registadas e por fazer** («Ainda não alteres nada. Regista só. Aparecerão entretanto outras ideias de ajuste»): faltam
  movimentos nas fotografias, como havia na V1; a pílula de descer em todo o site; um botão para voltar ao ponto onde se estava;
  tirar «notas de novembro de 2026»; mostrar que há mais avaliações e que se podem ver; tirar «Sem receção, sem pressa» da capa. As
  palavras dele, o que a V1 tinha e as propostas estão em `docs/integracao-app/2026-11-18_notas_do_diogo_v4.md`. Serão a V5.
  A 19/11 juntou mais sete, no mesmo documento: o cartaz em degraus como na V2; sem legendas pequenas nas fotografias; a galeria no
  fim e/ou curta; o cimo do painel das datas sempre à vista; «Quantas pessoas vêm?» sem começar em 4; a N2 num só bloco, com o
  programa pequeno como na V2; a ecopista com uma régua pequena de fotografias e fotografias mais pequenas nas partes de apoio.
- **De onde vem:** o que o Diogo viu da V3 no iPhone a 17/11 (ver a ficha da V3): «zero movimento», «as fotos estão estáticas»,
  «a régua das fotos não anda», «refaz o que é necessário para que esse movimento seja fluente e que o site tenha vida»; e «nas fotos
  de cima elas aparecem em modo estático e sem aquele movimento suave que já tinha sido implementado na v2». A composição da página
  (feita com o Lovable) não muda; o que muda é que a página se mexe.
- **O que estava mal e como ficou:**
  - *Na V3* cada faixa de fotografias dava um passo de 5 em 5 segundos, e só se estivesse quase toda no ecrã, com a página parada há
    mais de segundo e meio e sem dedos no ecrã. Quem desce a página nunca via esse passo. Além disso dependia de JavaScript e de
    temporizadores.
  - *Na V4* as fotografias **deslizam sem parar**, devagar, da direita para a esquerda (cerca de 29 px por segundo no telemóvel e 41
    no computador; a V1 andava a 25). O movimento é uma animação da folha de estilos, que o próprio browser corre: **não depende de
    JavaScript**, de temporizadores nem de a página estar parada. As fotografias vão duas vezes na faixa, por isso a volta não tem
    costura. O dedo parado em cima segura a faixa; o dedo para os lados leva-a (para a frente ou para trás) e, largada, continua com
    o balanço; um toque rápido abre a fotografia em grande. Com rato: pára enquanto o rato se mexe por cima (para se escolher uma
    fotografia), arrasta-se, e a roda para o lado também a leva. **Sem setas e sem contagens.**
  - Cada faixa começa na primeira fotografia (a principal do capítulo) quando se chega a ela.
- **«Reduzir movimento» (definições do telemóvel):** se o aparelho pedir menos movimento, as fotografias continuam a andar, bem mais
  devagar (cerca de 17 px por segundo), e tudo o resto entra só a aparecer, sem deslocações. Decisão desta versão: o site não fica
  parado. No ensaio, o rodapé diz quando o aparelho está nesse modo.
- **O que os testes veem e o que não veem:** em cada push, no Chromium e no WebKit (o motor do Safari), a bateria põe cada faixa no
  ecrã e mede se anda sozinha; repete com o JavaScript desligado e com «reduzir movimento»; segura-a e leva-a com um dedo fabricado.
  No Chromium usam-se ainda dedos a sério (protocolo do browser). **Um iPhone a sério continua a não se conseguir testar daqui:**
  a prova final é o telemóvel do Diogo, depois do «Lança».
- **Capturas:** `docs/versoes/v4/` (as fotografias ficam paradas na captura; o movimento vê-se no site).
- **Ordem da página:** a mesma da V3.

| Parte | O que mudou face à V3 | O que o Diogo achou |
|---|---|---|
| 1 Capa | **Ao rolar, a fotografia fica para trás, como na V2** (desce um quarto do que a página sobe): a V3 tinha tirado este movimento do telemóvel e o Diogo pediu-o de volta a 17/11 («nas fotos de cima elas aparecem em modo estático e sem aquele movimento suave que já tinha sido implementado na v2»). No computador a fotografia continua presa ao ecrã, com a página a passar-lhe por cima. Parada, a fotografia respira muito devagar (cresce 3,5 % em 18 segundos e volta; em repouso, o enquadramento da capa 1 é o mesmo); nos browsers mais recentes o texto vai-se apagando enquanto a capa sai | **Melhor** («já está melhor», 18/11). Tirar «Sem receção, sem pressa»; o botão de descer passa a estar em todo o site (notas 6 e 2 de 18/11) → V5 |
| 2 A casa | Igual | O cartaz volta ao desenho em degraus da V2, sem setas («menu em escada», nota 1 de 19/11) → V5 |
| 3 Os espaços | As fotografias de cada capítulo **deslizam sozinhas, sem parar**; vê-se sempre a seguinte a chegar. Saem as duas setas do computador (o rato arrasta a faixa). A faixa vai de um lado ao outro do ecrã | **Melhor, mas faltam movimentos nas fotografias:** «havia umas fotos que tinham vida na primeira versão». Confirmado: na V1 havia fotografias grandes, de lado a lado, com o título por cima, e fotografias que entravam uma a uma (nota 1 de 18/11). Saem as legendas pequenas das fotografias (nota 2 de 19/11) → V5 |
| 4 Fecho e régua | A régua **anda sozinha, sem parar**, numa ordem diferente em cada visita; o dedo ou o rato levam-na. **Todas as fotografias com o mesmo tamanho** (Diogo, 17/11: «há uma foto que tem dimensão diferente; tens de enquadrar essa foto no mosaico que estamos a passar»): as duas que estão ao alto, o pôr do sol e a lareira acesa, são recortadas na caixa como as outras (a lareira um pouco abaixo do centro, para se ver a moldura inteira) | por dizer |
| 5 Montemor, N2 e onde estamos | As dez fotografias de Montemor deslizam sozinhas, como as dos capítulos. Na Nacional 2, a fotografia grande passa devagar por trás da sua caixa enquanto a página rola (nos browsers mais recentes) | A N2 «parece feita à pressa» (três peças soltas): volta a um só bloco, com a fotografia e a mensagem em destaque e o programa pequeno, como na V2 · a ecopista ganha uma régua pequena de fotografias · nas partes de apoio as fotografias ficam mais pequenas (notas 6 e 7 de 19/11) → V5 |
| 6 A galeria | Ao abrir um álbum, as miniaturas entram umas a seguir às outras | Falta um botão para voltar ao ponto onde se estava depois de saltar para a galeria a meio da página (nota 3 de 18/11). No telemóvel, grande a meio da página afasta quem lê das partes seguintes: passa para o fim e/ou fica curta (nota 3 de 19/11) → V5 |
| 7 Antes de chegar | Igual | por dizer |
| 8 Quem já ficou | Igual (as frases continuam a rodar de 6 em 6 segundos) | Tirar «notas de novembro de 2026»; mostrar que há mais avaliações e que se podem ver, com graça e sem ser outra régua (ele desenhou uma seta para cada lado; notas 4 e 5 de 18/11) → V5 |
| 9 Contactos e rodapé | Igual. No ensaio, a linha da versão diz quando o aparelho pede menos movimento | por dizer |
| 10 Menu completo | Igual | por dizer |
| 11 Painel das datas | Igual | O cimo do painel fica sempre à vista; «Quantas pessoas vêm?» deixa de começar em 4 (notas 4 e 5 de 19/11) → V5 |
| 12 Barra de baixo | Igual | por dizer |
| Toda a página | Os blocos de texto sobem um pouco mais ao aparecer. Com o menu, o painel ou uma fotografia abertos, as faixas por trás esperam | Falta «a pílula do movimento para baixo durante todo o site»: o botão de descer em forma de rato, fixo no canto, da V1 e da V2, que eu tirei na V3 (nota 2 de 18/11) → V5 |

### V3 · 17/11/2026 · a composição feita com o Lovable e a construção nova para o iPhone

- **Publicada:** 17/11/2026, às 22h06 (hora de Lisboa), com o «Lança» do Diogo: deploy do site n.º 19 (os n.º 15 a 18 foram
  ensaios a seco), commit `9840ad5`, **etiqueta `novo-v3`**. Esteve no ar em `novo.` de 17/11 a 18/11. Face à V2: 16 ficheiros mudaram,
  2 entraram (`partes/nacional2.php`, `partes/onde.php`), nenhum saiu e as 190 fotografias ficaram como estavam.
  Commits do site: `75affc3` e `f58b428` (16/11: a composição e a construção nova), `303baa4` e `43d3673` (17/11: as notas de
  15/11 repostas) e `5aa49b7` (17/11: a data); testes «Capturas» n.º 52, 53 e 55 a 58 verdes (Chromium e WebKit).
- **Verificação depois do envio:** a página responde (HTTP 200 em 0,8 s) e mostra «Ensaio · versão 3 · 17/11/2026»; continua fora
  dos motores de busca (`noindex` e `robots.txt` de bloqueio) e sem ligações para as plataformas; **as 190 fotografias da página
  existem todas no servidor**; a previsão do tempo, a conta, o calendário de exemplo e as médias do tempo respondem em cerca de
  0,3 s cada («Verificar o site (só lê)», corrida n.º 2, às 22h08). No envio apareceu um aviso amarelo sobre as médias do tempo que era
  falso: as médias vieram, a verificação é que cortava a resposta antes de a ler toda; ficou corrigido no `deploy-site.yml`.
- **O que o Diogo achou, ao vivo, no iPhone (17/11, cerca das 22h15):** «Não quero ver mais e ainda não vou falar das alterações.
  O site voltou a não ter vida e tem zero movimento. As fotos estão estáticas, não têm movimento, e isso já tinha sido amplamente
  falado. A régua das fotos não anda. As fotos não estão a andar sozinhas no movimento lento como já tinha sido decidido. Refaz o que
  é necessário para que esse movimento seja fluente. E que o site tenha vida.» Tinha razão: nesta versão as fotografias davam um
  passo de 5 em 5 segundos e só com a página parada há mais de segundo e meio; para quem desce a página, é um site parado. A
  resposta é a V4. (As outras partes ficam por comentar: ele não quis ver mais.)
- **De onde vem:** o que o Diogo viu da V2 no iPhone a 16/11 («muito mau»: ver a ficha da V2) e o pedido «Trabalha com o Lovable para
  que o conteúdo passe a estar harmonioso». O Claude levou ao Lovable o conteúdo novo e as queixas (pedido de 16/11, 08h27, no projeto
  «Monte Casa Branca» do Lovable); o Lovable compôs a página lá (para ver no telemóvel:
  `https://id-preview--96fa8399-2585-4338-bf69-b63411871178.lovable.app`, com dados de exemplo); o Claude passou essa composição para
  o site em PHP, capítulo a capítulo. A capa não mudou de desenho: é a opção 1 que o Diogo escolheu a 15/11.
- **A construção, por causa do iPhone** (o que falhou na V2 e como ficou; pormenor no cimo de `site/assets/css/site.css` e de
  `site/assets/js/site.js`):
  - *Fotografias em caixas meio vazias.* Na V2 a largura de cada caixa era tirada da própria fotografia e o Safari do iPhone fazia
    essa conta de outra maneira. Agora cada caixa tem largura e altura escritas e a fotografia enche-a; nada depende do ficheiro.
  - *Menus presos.* Na V2 o site empurrava cinco filas de fotografias a cada instante, bloqueava a rolagem da página ao abrir o menu e
    mandava-a deslizar no mesmo momento em que a desbloqueava. Agora as fotografias rolam com a rolagem do próprio telemóvel (o dedo
    leva-as), o menu e o painel já não bloqueiam a página (cobrem-na e rolam por dentro) e escolher um destino no menu leva lá de
    imediato, sem animação, com a chegada conferida.
  - *Campos «Chegada» e «Partida» fora do ecrã.* Os campos de data do iPhone não encolhiam; agora estão presos à largura do painel.
  - Saíram todos os desfoques (pesam no telemóvel) e o botão em forma de rato que acompanhava a página e tapava texto.
- **O que os testes veem e o que não veem:** a bateria corre no Chromium e, desde 16/11, a geometria da página também no WebKit (o
  motor do Safari) em cada push. O WebKit dos testes **não reproduziu** as falhas que o iPhone do Diogo mostrou na V2; por isso a
  prova final desta versão é o telemóvel dele, depois do «Lança».
- **As notas do Diogo de 15/11, conferidas uma a uma (16–17/11).** Pergunta dele: «Espero que estejas a considerar e tenhas passado
  ao Lovable as notas que estivemos a fazer ontem.» A conferência está em
  `docs/integracao-app/2026-11-15_notas_do_diogo_e_o_que_mudou.md`, secção 6. Resultado: os textos, a ordem, os menus e as regras
  (sem ligações para as plataformas, sem «antes e depois», saída às 18h, casas de banho só na galeria, pedido de datas leve) foram
  ao Lovable e estão na página; **quatro coisas tinham-se afastado das palavras dele com a composição e foram repostas nesta versão,
  antes de ser publicada** (linhas 3, 4, 6, 7 e 8 do quadro): a contagem e as setas nas fotografias («não precisa de dizer que tem
  fotos»), a fila do fecho parada e por ordem fixa («a rolar random»), «Antes de chegar» fora do desenho da referência dele, e o
  sobretítulo «Fotografias» por cima de «Passear pelo Monte». **A capa 1 não tinha sido passada ao Lovable** (o pedido dizia
  «mantém a tua»): no site sempre foi a capa 1. A 17/11, às 00h20, o Lovable recebeu as notas em falta (capa 1 incluída) e às
  00h28 a pré-visualização dele já as tinha (`lovable/composicao-2026-11-17/`); do desenho dele veio para o site a posição das
  setas no computador, pousadas sobre as fotografias.
- **Capturas:** `docs/versoes/v3/` (refeitas a 17/11, já com as notas repostas).
- **Ordem da página:** capa → a casa (o cartaz) → por fora → sem pressa → por dentro → fecho → Montemor-o-Novo → Nacional 2 → onde
  estamos → Passear pelo Monte → Antes de chegar → Quem já ficou → contactos.

| Parte | O que mudou face à V2 | O que o Diogo achou |
|---|---|---|
| 1 Capa | O desenho é o mesmo (a opção 1). «Sem receção, sem pressa» passou para o lado do botão «Entrar pela casa»; o botão de descer fica só na capa (já não acompanha a página); sem desfoques. No computador, a fotografia fica presa e a página passa-lhe por cima | por dizer |
| 2 A casa | O cartaz do Lovable: «Por fora», «Sem pressa» e «Por dentro» em três linhas, cada uma com a sua seta, entre traços finos; a frase à direita, por baixo. Era em degraus, com a do meio em itálico | por dizer |
| 3 Os espaços | Três capítulos com abertura própria: «A casa» em cima, a palavra em grande, a frase a cor e o texto; depois as fotografias **uma de cada vez**, grandes, com a legenda escrita sobre cada uma e a seguinte a espreitar. **Sem contagem** («não precisa de dizer que tem fotos; a dinâmica do site mostra essa parte», nota 8). O dedo leva-as; avançam sozinhas, um passo de 5 em 5 segundos, em círculo, até se lhes pegar. No telemóvel não há setas; no computador ficam duas setas pequenas, pousadas sobre as fotografias, em cima à direita (o rato não arrasta), e o rato em cima das fotografias pára o avanço. «Sem pressa» tem o fundo pálido, para os três não se colarem. Eram filas a rolar sem parar, com a palavra sobre a fotografia | **Não.** «As fotos estão estáticas, não têm movimento … não estão a andar sozinhas no movimento lento como já tinha sido decidido» (17/11) → V4 |
| 4 Fecho e régua | A frase «Há dias em que não é preciso mais nada» em grande, à esquerda; «Há mais casa para descobrir» com a ligação «Passear pelo Monte»; 18 fotografias mais pequenas (as ao alto mais altas e estreitas), **numa ordem diferente em cada visita e a avançar sozinhas, devagar**, um passo de cada vez, para um lado e depois para o outro («a rolar random», nota 8); o dedo leva-as e, a partir daí, deixam de avançar. A casa ao entardecer saiu daqui: é a fotografia da Nacional 2 | **Não.** «A régua das fotos não anda» (17/11) → V4 |
| 5 Montemor, N2 e onde estamos | Passam a ser **três capítulos**. *Montemor-o-Novo*: fundo pálido e um traço a separá-lo da casa; «A 1 h de Lisboa», o título, o texto e a ligação; as dez fotografias em sequência; a Ecopista do Montado por baixo, com título próprio, separada por um traço. *Nacional 2*: capítulo igual em peso, com a casa ao entardecer («A mesma casa à vossa espera ao fim do dia») e o programa em três linhas (Sexta · Sábado · Domingo). *Onde estamos*: faixa cor de oliva, com as distâncias e o botão do mapa. Era uma só secção: as fotografias coladas ao fecho da casa, a N2 numa caixa ao lado do texto e as distâncias numa coluna | por dizer |
| 6 A galeria | Só o título «Passear pelo Monte», sem sobretítulo; os quatro separadores à vista (em duas linhas no telemóvel); as mesmas 93 fotografias nos mesmos álbuns, em duas colunas no telemóvel e três no computador | por dizer |
| 7 Antes de chegar | Como na referência do Diogo (nota 10) e na V2: no computador, o título à esquerda, em três linhas, e as perguntas à direita, com um «+» que passa a «−»; no telemóvel, uma coluna. Fundo pálido. Abre-se uma pergunta de cada vez | por dizer |
| 8 Quem já ficou | As frases maiores, com a origem por baixo («Airbnb · julho de 2026»), **sem contagem**; as três notas em anéis finos; fundo liso (era cor de areia) | por dizer |
| 9 Contactos e rodapé | Mais compacto: o logótipo, a linha do registo e a letra pequena ficam todos à esquerda, por baixo dos contactos | por dizer |
| 10 Menu completo | As entradas em linhas com traços finos; por baixo de «A casa», Por fora · Sem pressa · Por dentro. Escolher uma entrada fecha o menu e a página está lá de imediato | por dizer |
| 11 Painel das datas | Ordem nova: calendário → as contas → o tempo → o pedido. A conta em três linhas com o valor à direita («Estadia · 3 noites · 330 € por noite», «Limpeza final · uma vez por estadia», «Total da casa» a cor). Os campos das datas já não saem do ecrã. O escuro por trás deixou de ter desfoque | por dizer |
| 12 Barra de baixo | Menu · Contacto · Verificar disponibilidade, os três com texto e espaçados; fundo liso, sem desfoque | por dizer |
| Toda a página | Os blocos de texto aparecem ao rolar; as fotografias estão sempre à vista e não dependem de JavaScript. Nenhuma fotografia de destaque aparece em dois sítios | por dizer |

### V2 · 16/11/2026 · a revisão do Diogo de 15/11

- **Publicada:** 16/11/2026, às 00h49 (hora de Lisboa), com o «Lança» do Diogo: deploy do site n.º 14 (o n.º 13 foi o ensaio a seco),
  commit `37c9ca0`, **etiqueta `novo-v2`**. Esteve no ar em `novo.` de 16/11 a 17/11/2026. Face à V1: 15 ficheiros mudaram, 71 entraram, 18 saíram.
- **O que o Diogo achou, ao vivo, no iPhone (16/11, 01h10, com doze capturas):** «Acho que está muito mau. Não tem fotos, os menus
  prendem e não tem a dinâmica da versão anterior. A secção de Montemor aparece quase sem separador nem introdução e o da N2 coloca
  como se fosse um apêndice. Trabalha com o Lovable para que o conteúdo passe a estar harmonioso.» Nas capturas: as filas de
  fotografias (partes 3, 4 e 5) com caixas meio vazias ou vazias; Montemor colado ao fecho da casa; os campos «Chegada» e «Partida»
  do painel a sair do ecrã. Os testes não o tinham visto: corriam só no Chromium. A resposta é a V3.
- **Verificação depois do envio:** a página responde, mostra «Ensaio · versão 2 · 16/11/2026», continua fora dos motores de busca e sem
  ligações para as plataformas; **as 190 fotografias da página existem todas no servidor**; a previsão do tempo, a conta e o calendário de
  exemplo respondem. No próprio envio, as médias do tempo para datas longe não responderam à primeira (o arquivo do Open-Meteo demorou
  mais do que os 12 segundos que o site espera); quatro minutos depois, na verificação só de leitura (workflow «Verificar o site», corrida
  n.º 1), responderam em 3,7 s e ficaram guardadas no servidor por 30 dias. **Está tudo a funcionar.**
- **Para a versão seguinte (técnico, não se vê):** as médias são de anos completos e só mudam em janeiro: guardá-las até lá e, se o
  arquivo não responder numa renovação, não voltar a tentar em cada visita (`api/tempo.php` → `tempo_clima()`).
- **Capturas:** `docs/versoes/v2/` · **De onde vem:** as 17 notas do Diogo de 15/11 e as respostas da mesma noite
  (`docs/integracao-app/2026-11-15_notas_do_diogo_e_o_que_mudou.md`).
- **Ordem da página:** capa → a casa → por fora → sem pressa → por dentro → fecho e régua → Montemor, N2 e onde estamos → Passear pelo
  Monte → Antes de chegar → Quem já ficou → contactos.

| Parte | O que mudou face à V1 | O que o Diogo achou |
|---|---|---|
| 1 Capa | Título em dois degraus, «Uma casa inteira» / «O Alentejo à vossa porta», no céu da fotografia; a fotografia deixou de ser ampliada e quase não tem sombra por cima; menu de cima novo (Montemor-o-Novo · N2 · Passear pelo Monte · Antes de chegar · Avaliações). Houve um estudo com três opções; ficou a 1 e o estudo saiu | **capa 1, no computador e no telemóvel** (15/11) |
| 2 A casa | «Por fora · Sem pressa · Por dentro» em cartaz de ecrã inteiro: as três palavras em degraus (também no telemóvel), a entrar uma a seguir à outra; cada uma leva ao seu momento. Era «O dia é vosso / A casa também» | «esta mensagem é forte; deveria ficar mais visível e enquadrável no ecrã com alguma estilização» (15/11): feito assim; por ver ao vivo |
| 3 Os espaços | Três momentos, cada um num ecrã. A palavra do momento é o título, grande, com o desenho do cartaz («Por fora» sobre a fotografia, «Sem pressa» em itálico, «Por dentro»), com «1 / 3» e um traço por cima e a frase e o texto por baixo; uma fotografia principal e três ou quatro atrás, a rolar devagar. Eram «Primeiro, lá fora» e três blocos (Alpendre · Sala e cozinha · Quartos e banho) com uma fotografia cada | o mesmo pedido da parte 2 (15/11): feito assim; por ver ao vivo |
| 4 Fecho e régua | «Há dias em que não é preciso mais nada» e «Há mais casa para descobrir»: 19 fotografias pequenas a rolar, por ordem diferente em cada visita, sem casas de banho. Era «A casa, num relance», uma fila para arrastar | por dizer |
| 5 Montemor, N2 e onde estamos | «Montemor-o-Novo também é a estadia» com dez fotografias da vila a rolar; a Ecopista do Montado; um programa de duas noites (sexta · sábado · domingo); ligações ao Visit Montemor, à ecopista e à Rota da N2; o mapa abre a ficha «Monte Casa Branca». Subiu para logo a seguir à casa. Era «O Alentejo mesmo à porta», no fim da página, com uma fotografia do alpendre e dois textos | por dizer |
| 6 A galeria | Chama-se «Passear pelo Monte» e tem os álbuns do Zenfolio pela mesma ordem: O Monte 49 · Os Quartos 12 · A Quinta 18 · Montemor-o-Novo 14. Entraram três fotografias da pasta do verão que o Diogo viu a 15/11: as duas fachadas do fim de «O Monte» (a 51 e a 52) e a casa ao longe, vista do campo (a 34), em «A Quinta». O «antes e depois» saiu. Era «Fotografias»: Monte e exterior 32 · Sala, cozinha e biblioteca 22 · Quartos e banho 13 · Antes e depois 4 · Montemor-o-Novo 1 | a 34, a 51 e a 52: «sim entram» (16/11); o resto por dizer |
| 7 Antes de chegar | «Para se sentirem em casa», sete perguntas em duas colunas; saem a limpeza, o pagamento e as plataformas; a saída pode ficar para as 18h quando ninguém entra a seguir. Era «Perguntas frequentes», com oito | por dizer |
| 8 Quem já ficou | Dez frases curtas, uma de cada vez, e as três notas em anel (Booking 10 · Airbnb 4,95 · Google 5,0): só a nota e o nome, sem ligações para as plataformas e sem o número de avaliações. Era «Quem cá esteve», com uma só opinião, comprida, do Airbnb de 2023 | as três notas: sim, sem ligações e sem o número de avaliações (15/11); o resto por dizer |
| 9 Contactos e rodapé | «Falamos? · Contem-nos os vossos planos»; rodapé com o registo, a firma e a morada; **saem as três ligações pequenas para o Airbnb, o Booking e o Vrbo**; no ensaio, o número da versão. Era «Venham conhecer a casa, falem connosco», com as três ligações no rodapé | «retirar Airbnb, Vrbo, Booking» (15/11): feito |
| 10 Menu completo | A casa (com Por fora · Sem pressa · Por dentro) · Montemor-o-Novo · Nacional 2 · Passear pelo Monte · Antes de chegar · Quem já ficou · Contactos. Era A casa · Descobrir · Fotografias · Avaliações · Montemor-o-Novo · Nacional 2 · Perguntas · Contactos | «não se chama Galeria» (15/11): já diz «Passear pelo Monte» em todo o lado |
| 11 Painel das datas | «Os vossos dias · Quando vos apetece vir?»; «As contas, sem surpresas» em três linhas (estadia · limpeza · total); saída até às 18h quando ninguém entra a seguir, sem falar no pôr do sol; tempo com ícones de traço e, para datas ainda longe, a média dos últimos anos. **No telemóvel o pedido abre só com o nome e o email**; o telefone e a mensagem abrem com um toque e o WhatsApp e o Email ficam lado a lado. Era «Simulem a estadia», com a conta numa linha e o aviso do pôr do sol | «rearranja para ficar mais leve» no telemóvel (15/11): feito assim; por ver ao vivo |
| 12 Barra de baixo | Sem mudanças (nota 15: «está bem, manter») | — |
| Toda a página | As ligações dos menus rolam até ao sítio sem deixar «#…» no endereço: a página deixou de abrir a meio | por dizer |

### V1 · 8/11/2026 · a primeira versão em `novo.`

- **Publicada:** 8/11/2026, deploys do site n.º 5 (20h12 UTC, commit `3c73fd9`) e n.º 7 (20h30 UTC, commit `17198b1`: o mesmo site com o
  nosso ícone e fora dos motores de busca). **Referência:** o commit `17198b1` (sem etiqueta: é anterior a este registo e o GitHub não
  deixa etiquetar commits antigos). Esteve no ar de 8/11 a 16/11/2026.
- **Capturas:** `docs/versoes/v1/` · **De onde vem:** o site em PHP feito a partir do desenho do Lovable (7/11), verificado e corrigido.
- **Ordem da página:** capa → «O dia é vosso / A casa também» → descobrir a casa (lá fora, alpendre, sala e cozinha, quartos e banho) →
  «A casa, num relance» → quem cá esteve → perguntas frequentes → fotografias → onde estamos (Montemor e N2) → contactos.

| Parte | Como era | O que o Diogo achou (notas de 15/11) |
|---|---|---|
| 1 Capa | «Uma casa inteira no Alentejo», em baixo à esquerda, com a fotografia ampliada e uma sombra por cima; menu de cima A casa · Descobrir · Fotografias · Avaliações · Montemor-o-Novo | pediu menos sombra, outro enquadramento, o título em cascata e outro menu (notas 2, 5 e 7) |
| 2 A casa | «O dia é vosso / A casa também» | a página abria aqui a meio (nota 1); pediu «Por fora · Sem pressa · Por dentro» (nota 8) |
| 3 Os espaços | «Primeiro, lá fora» com a mesma fotografia da capa; Alpendre · Sala e cozinha · Quartos e banho, uma fotografia cada | pediu outra fotografia e mais expressivas (nota 6b) |
| 4 Fecho e régua | «Há dias em que não é preciso mais nada» e «A casa, num relance» (fila de fotografias para arrastar) | — |
| 5 Montemor, N2 e onde estamos | «O Alentejo mesmo à porta», distâncias, botão do mapa (alfinete), um texto sobre Montemor e outro sobre a N2 | pediu a mensagem «também é a estadia», fotografias a rolar, um programa de duas noites e o mapa na ficha (notas 11 e 12) |
| 6 A galeria | «Fotografias», cinco álbuns, com quatro miniaturas de «antes e depois» | pediu os álbuns como no Zenfolio e sem «antes e depois» (notas 8 e 9) |
| 7 Antes de chegar | «Perguntas frequentes», oito perguntas | pediu «Antes de chegar» e outro tom (nota 10) |
| 8 Quem já ficou | «Quem cá esteve», uma opinião comprida | pediu frases curtas e várias (nota 13) |
| 9 Contactos e rodapé | «Venham conhecer a casa, falem connosco» | pediu «Falamos? · Contem-nos os vossos planos» (nota 14) |
| 10 Menu completo | A casa · Descobrir · Fotografias · Avaliações · Montemor-o-Novo · Nacional 2 · Perguntas · Contactos | pediu que seguisse o que foi trabalhado (nota 16) |
| 11 Painel das datas | «Simulem a estadia», conta numa linha, aviso «podem ficar até ao pôr do sol» ao domingo | pediu outro tom, 18h sem pôr do sol e o tempo como no Lovable (nota 17) |
| 12 Barra de baixo | Menu · Contacto · Verificar disponibilidade | «está bem, manter» (nota 15) |

## Para quem monta (Claude ou outro assistente)

**Regra:** cada publicação em `novo.` é uma versão; nenhuma vai para o servidor sem número e sem ficha aqui.

**Fechar uma versão (antes do «Lança»):**
1. Subir o número e a data em `site/versao.json` e juntar a versão a `docs/versoes/versoes.json` (data e estado, para as legendas;
   o `commit` fica vazio até ser publicada). A data é a do dia em que vai para o ar: acerta-se antes do «Lança» (a V2 nasceu a 15/11 e
   foi publicada a 16/11; é esta que a página mostra).
2. Escrever a ficha `### V<N> · …` neste ficheiro, por cima das outras: o que mudou em cada parte face à anterior.
3. Fotografar: `bash demo/ferramentas/site/versao/fotografar.sh <N>` (grava `docs/versoes/v<N>/`, computador e telemóvel).
4. Lado a lado com a anterior, para mostrar ao Diogo: `python3 demo/ferramentas/site/versao/comparar.py <N-1> <N> <pasta>`.
5. Testes (`bash demo/ferramentas/site/testar-site.sh`), commit, push, «Capturas» verde, ensaio a seco.

**O que o deploy faz sozinho** (`.github/workflows/deploy-site.yml`): pára se `site/versao.json` não tiver número, se faltar a ficha
`### V<N> · ` aqui, ou se a versão N já tiver sido publicada com outro conteúdo (é preciso subir o número); no fim de um envio a sério
cria a etiqueta `novo-v<N>` no commit enviado (`raiz-v<N>` quando for para `montecasabranca.pt`).

**Depois de um envio a sério (à mão, logo a seguir):** escrever na ficha a data, o n.º do deploy e o commit; em `versoes.json`, o
identificador **completo** do commit em `commit` (`commit_raiz` quando for o site a sério), a etiqueta e o estado. É por esse commit
(ou pela etiqueta) que o deploy sabe que a versão já foi publicada e que se vai buscar uma parte mais tarde.

**Confirmar o que está no ar sem enviar nada:** workflow manual «Verificar o site (só lê)» (`.github/workflows/verificar-site.yml`).
Faz pedidos ao site como um visitante: a página e a versão que mostra, a proteção do ensaio, cada fotografia referida na página, as
portas (previsão, conta, calendário, médias do tempo) com os segundos de cada uma, e o mesmo pedido ao arquivo do Open-Meteo feito do
GitHub, para comparar. A sessão do Claude não chega ao site (a rede dela não deixa); os computadores do GitHub chegam.

**Etiquetas: o que se pode e o que não se pode.** A sessão do Claude não consegue enviar etiquetas para o GitHub (403; só commits em
`main`), por isso é o deploy que as cria. O GitHub só deixa um workflow etiquetar um commit cujos ficheiros de `.github/workflows` sejam
iguais aos de `main` nesse momento: funciona no envio normal (envia-se o commit que está em `main`) e falha para commits antigos. Por isso
**a V1 não tem etiqueta** (tentado a 15/11, recusado) e a referência dela é o commit `17198b1`. Se a etiqueta de um envio falhar, o envio
fica feito na mesma: vale o commit escrito aqui, e pode tentar-se o workflow manual «Etiqueta de versão do site». Para usar as etiquetas
na sessão: `git fetch origin 'refs/tags/novo-v*:refs/tags/novo-v*'`. Uma etiqueta de versão nunca se muda nem se apaga.

**Repor uma parte de uma versão anterior:**
1. Ver como era: as capturas de `docs/versoes/v<N>/` e o código dessa versão, pelo commit da ficha (ou pela etiqueta, se houver):
   `git show 17198b1:site/partes/<ficheiro>` e `git diff 17198b1 HEAD -- site/partes/<ficheiro> site/conteudo.php site/assets/css/site.css`.
2. Trazer para a versão atual só essa parte: o ficheiro de `partes/`, as chaves de `conteudo.php` e o bloco do `site.css` que lhe
   pertencem (tabela «As partes da página»), acertando os nomes que mudaram entretanto (ex.: `#casa` → `#a-casa`). Nunca repor a pasta
   `site/` inteira nem desfazer o resto.
3. Fechar como versão nova, com a nota «<parte> reposta da V<N>», e mostrar ao Diogo as duas lado a lado antes do «Lança».

**As capturas são feitas como o ensaio está no ar:** sem as portas da app (#189–#192 ainda não existem), com o calendário de exemplo e a
conta feita pelo site; o tempo é de ensaio. Quando as portas existirem, o `fotografar.sh` passa a usar a app de ensaio.
