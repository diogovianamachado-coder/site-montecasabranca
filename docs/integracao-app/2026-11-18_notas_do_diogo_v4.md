# Notas do Diogo sobre a versão 4 (18/11/2026, entre as 00h40 e as 00h55, no iPhone)

**Atualização de 19/11, 03h: TUDO o que estava decidido ou proposto neste documento está feito na versão 6, por publicar** (espera o
«Lança»). O Diogo, com a V5 no iPhone: «Grande parte das alterações não as fizeste. Revê o que pedi: botão de deslizar, menu do por
dentro sem pressa e por fora, falta o botão de voltar quando abro as fotos pelo scroll down, mantiveste a n2 igual? O montado está
vazio.» Feito na V6: a pílula de descer (secção 2) · o cartaz em escada (19/11, nota 1) · as fotografias grandes a abrir os capítulos
e Montemor e as fotografias a entrar uma a uma (secção 1) · «Voltar onde estava» (secção 3) · as setas e os traços das avaliações
(secção 5) · a galeria curta, antes dos contactos, com «Ver todas» (19/11, nota 3) · o cimo do painel sempre à vista (19/11, nota 4) ·
«Quantas pessoas?» vazio (19/11, nota 5) · a N2 num só bloco (19/11, nota 6) · a ecopista com a régua pequena e a faixa de Montemor
mais pequena (19/11, nota 7). Ficha em `docs/versoes/REGISTO.md` (V6).

**Atualização de 19/11, 01h: a versão 5 está no ar só com as frases.** «Retira as frases e lança»: saíram as legendas sobre as
fotografias e por baixo da da N2 (nota 2 de 19/11), «Sem receção, sem pressa» da capa, que passou para a resposta «A que horas
podemos chegar?» (nota 6 de 18/11), e «notas de novembro de 2026» (nota 4 de 18/11). **Tudo o resto deste documento passa para a
versão seguinte (V6)**, onde se lê «V5» nas propostas abaixo. Ficha em `docs/versoes/REGISTO.md`.

**Estado: registadas, por fazer.** A ordem do Diogo foi: «Ainda não alteres nada. Regista só. Aparecerão entretanto outras ideias de
ajuste.» Até ele dizer o contrário, nada muda em `site/` e nada vai para o servidor; a V4 continua no ar em `novo.`. As ideias
seguintes juntam-se a este documento (secção «Próximas ideias»). Quando ele mandar avançar, tudo isto será a **versão 5**: sobe o
número em `site/versao.json`, abre-se a ficha `### V5 · …` em `docs/versoes/REGISTO.md` e só se envia com novo «Lança».

**Juízo geral:** «Já está melhor.»

**Capturas dele** (com os riscos a vermelho): `docs/integracao-app/revisao-2026-11-18/diogo-1…4-*.jpg`. **A versão 1 em movimento**
(gravada a 18/11 no tamanho do telemóvel, a partir do commit `17198b1`): `versao-1-banda-e-fotografias-a-entrar.jpg` e
`versao-1-regua-e-pilula.jpg` na mesma pasta. O vídeo completo (2 min 45 s) foi enviado ao Diogo na conversa e não fica no
repositório: refaz-se montando o commit `17198b1` como em `demo/ferramentas/site/versao/fotografar.sh` e gravando com o Playwright.

Os números entre parênteses são as partes da página do registo de versões (`docs/versoes/REGISTO.md`).

## 1. Fotografias com vida (3 Os espaços; também 4 e 5)

- **Palavras dele:** «Estão a faltar movimentos nas fotos. Havia umas fotos que tinham vida na primeira versão. Confirma se não é
  verdade e vê como incorporar essa parte também.»
- **Confirmado (código da V1 e o passeio gravado): é verdade.** Na V1 as fotografias mexiam-se assim:
  - **a) Duas fotografias grandes, de lado a lado do ecrã, com o título escrito por cima.** «Primeiro, lá fora» ocupava 70 % da
    altura do ecrã no telemóvel (92 % no computador) e «O Alentejo mesmo à porta» 55 % (70 %), com uma sombra em baixo para o texto
    se ler; o texto subia por cima da fotografia quando ela chegava (`partes/descobrir.php`, `partes/montemor.php`, `.banda` no
    `site.css` da V1). **A V4 não tem nenhuma:** só a capa e a fotografia da Nacional 2, que fica numa caixa mais pequena.
  - **b) As fotografias dos espaços entravam uma a uma, a subir e a acender** (28 px, um segundo) quando chegavam ao ecrã, cada uma
    com o seu texto ao lado, que vinha um instante depois: Alpendre, Sala e cozinha, Quartos e banho, alternando de lado no
    computador (`.reveal` em cada fotografia). **Na V4 entra a faixa inteira de uma vez**, e quase não se nota, porque as
    fotografias são pequenas e já estão a deslizar.
  - **c) A régua andava sozinha** (25 px por segundo, só no telemóvel), com fotografias mais altas (34 % da altura do ecrã) e
    largas e estreitas alternadas. **A V4 também anda**, e agora em todas as faixas, mas com caixas todas iguais e mais baixas
    (220 px), como ele pediu a 17/11.
  - **d) A capa, ampliada 8 %, ficava para trás ao rolar.** **A V4 já tem isto** desde 18/11, sem a ampliação fixa e com a fotografia
    a respirar.
  - **e) No computador, a fotografia crescia 5 % devagar com o rato por cima.** A V4 cresce 3 %, também só com rato.
- **Leitura:** o que falta face à V1 são as alíneas a) e b): **fotografias grandes, de ecrã inteiro, entre as faixas, e fotografias que
  entram uma a uma.** Foi o que se perdeu na V2 (16/11: «não tem a dinâmica da versão anterior»). Falta o Diogo confirmar pelo vídeo
  que é isto.
- **Como entrar na V5 (proposta, a confirmar com ele antes de fazer):**
  - uma fotografia grande, de lado a lado, a abrir cada capítulo («Por fora», «Sem pressa», «Por dentro») e Montemor, com a palavra
    por cima, como as bandas da V1;
  - a fotografia a passar devagar por trás enquanto se rola (o efeito da Nacional 2, mas feito de forma a correr em qualquer iPhone e
    não só nos mais recentes: o da N2 usa `animation-timeline: view()`, que só o Safari 26 conhece);
  - a faixa a deslizar fica por baixo, com as outras fotografias;
  - cada fotografia grande entra a subir e a acender quando chega ao ecrã.
  - Por decidir com ele: em que capítulos, e se a faixa continua em todos.

## 2. A pílula de descer em todo o site (Toda a página; 1 Capa; 12 Barra de baixo)

- **Palavras dele:** «Está a faltar a pílula do movimento para baixo durante todo o site.» Na captura da capa rodeou o botão redondo de
  descer (`diogo-4-capa-rececao-e-pilula.jpg`).
- **O que era:** na V1 e na V2, no telemóvel, o botão de descer da capa ficava **fixo no canto direito, em forma de rato**, com um ponto
  a descer e a subir; cada toque levava à secção seguinte e, no fim da página, virava-se ao contrário e voltava ao topo (`.hero-descer`
  fixo no `site.css` e o bloco «Botão descer» do `site.js`, na V1 e na V2). **Fui eu que o tirei na V3 (16/11)**, porque nas capturas
  da V2 no iPhone tapava texto. Vê-se no passeio da V1: há um quadro em que o botão fica por cima do fim de uma linha de texto. Na V4
  só existe na capa, e não fica fixo.
- **Como entrar na V5:** volta em todo o site com o mesmo comportamento (secção seguinte; no fim, o topo), num sítio onde não tape
  texto.
- **Decisão do Diogo (18/11, cerca das 01h30):** «O ícone do rato pode ficar no meio, mais flutuante e sem ficar em frente ao texto.
  Sobe a posição.» Logo: **ao centro, a flutuar, mais acima do que estava** (na V1 e na V2 ficava no canto direito, encostado à barra
  de baixo), e **nunca por cima de texto**: apaga-se quando passa texto por baixo e volta sobre fotografias e espaços vazios;
  esconde-se com o menu, o painel ou uma fotografia abertos. Mostrar em vídeo antes do «Lança».
- **19/11, com a V5 no iPhone: «Faltou esta parte»** (captura da capa, com o botão redondo do canto rodeado). **Feito na V6** (por
  publicar, espera o «Lança»): na capa ao centro, por baixo de «Entrar pela casa»; depois da capa sobe e flutua por cima da barra; apaga-se
  sobre texto; cada toque leva à secção seguinte; no fim volta ao topo. Ficha em `docs/versoes/REGISTO.md` (V6); vídeo enviado na conversa.

## 3. Voltar ao ponto onde estava (6 A galeria; navegação)

- **Palavras dele:** «Quando se carrega a meio para ver as fotos, não há botão para retornar e continuar a viagem no site. Precisa de
  um botão ou seta para voltar ao ponto onde estava.» (`diogo-1-galeria-sem-voltar.jpg`: a galeria «Passear pelo Monte».)
- **Hoje:** as ligações do meio da página (o «Passear pelo Monte» da régua, os dois menus) levam à galeria e não deixam caminho de
  volta. Desde 15/11 (nota 1) estas ligações não mexem no endereço, por isso o «voltar» do browser também não ajuda.
- **Como entrar na V5:** depois de qualquer salto por uma ligação (menus ou ligações no texto) aparece um botão pequeno, com uma seta,
  «Voltar onde estava», que leva ao ponto exato de onde se saiu e desaparece depois de usado, ou quando a pessoa continua a descer.
  A provar também: o gesto de voltar do iPhone (deslizar a partir da margem esquerda) fazer o mesmo, sem voltar a pôr `#…` no
  endereço (foi esse `#` que fazia a página abrir a meio, nota 1 de 15/11).

## 4. Avaliações: tirar a data das notas (8 Quem já ficou)

- **Palavras dele:** «Nas avaliações retira que são de 2026.» Rodeou «notas de novembro de 2026» na linha «Recebemos hóspedes desde
  2022 · notas de novembro de 2026» (`diogo-2-notas-de-2026.jpg`).
- **Onde:** `site/conteudo.php` → `avaliacoes.rodape_notas` («notas de {data}») e `site/inc/factos.php` → `notas.data`
  («novembro de 2026»). **Na V5 a linha fica «Recebemos hóspedes desde 2022».** A data das notas continua no FACTOS e no código, para
  nós sabermos de quando são.

## 5. Avaliações: mostrar que há mais e que se podem ver (8 Quem já ficou)

- **Palavras dele:** «Temos de arranjar uma forma dos clientes saberem que há mais avaliações. Elas vão aparecendo, mas não há
  informação de que há mais e que quem visita pode ver mais. Encontrar uma maneira look and feel engraçado e que não seja igual à
  régua da foto.» Na captura desenhou uma seta para a esquerda e outra para a direita por baixo da frase
  (`diogo-3-avaliacoes-ha-mais.jpg`).
- **Hoje:** dez frases curtas que rodam sozinhas de 6 em 6 segundos, sem sinal de que há mais e sem forma de as passar à mão.
- **Para a V5: ideias a mostrar em imagem antes de fazer** (nenhuma é uma régua):
  - a) as duas setas que ele desenhou, «‹» e «›», por baixo da frase, e o dedo a passar a frase para o lado;
  - b) uma linha de traços pequenos, um por frase, em que o da frase à vista se vai enchendo enquanto ela está no ecrã, como nas
    histórias do Instagram: diz que há mais e quando vem a seguinte;
  - c) a frase num cartão com dois cartões por trás, ligeiramente rodados, como um baralho: ao passar, o cartão sai para o lado e vem
    o de trás;
  - d) «Ler mais avaliações» no fim, a abrir as frases todas numa folha.
  - A apresentar: a) com b) ou com c), e d). Nota: o «sem contagem» de 17/11 (sem «02 / 10») vinha da nota 8 de 15/11, que era sobre
    as fotografias («não precisa de dizer que tem fotos»); aqui é ele que pede que se saiba que há mais.

## 6. Capa: tirar «Sem receção, sem pressa» (1 Capa)

- **Palavras dele:** «Na capa retirar a frase da receção.» (`diogo-4-capa-rececao-e-pilula.jpg`.)
- **Onde:** `site/conteudo.php` → `inicio.nota`. Sai na V5; «Entrar pela casa» fica sozinho.
- **Nota de monitor:** é a única frase do site que diz que não há check-in presencial (um facto do brief).
- **Decisão do Diogo (18/11):** «Sim, coloca o sem pressa e sem receção na resposta à hora de entrada.» Proposta de texto para a
  resposta «A que horas podemos chegar?» (`conteudo.php`, perguntas de «Antes de chegar»), a confirmar por ele: «A entrada é a partir
  das 16h, sem receção e sem pressa: o Diogo envia antes as indicações para entrarem sozinhos. A saída é até às 11h; quando ninguém
  entra no mesmo dia, pode ficar para as {saida_tardia}, para aproveitarem o dia até ao fim.»

## Notas do GPT por decidir (lista de 18/11)

Pedido do Diogo: «Vê as notas que o GPT colocou no GitHub e enumera aqui numerada para que decidamos. Se sim ou se não.» Visto a 18/11:
**desde 15/11 o GPT não pôs nada novo**, nem no GitHub (commits, issues, ramos) nem no Dropbox (`13. APP Gestão AL/site/` só tem
`zenfolio/`). As notas dele que continuam por decidir vêm do fecho de 24/10 (`docs/decisoes/2026-10-24_fecho_chatgpt.md`), das
propostas de 17/10 (`docs/decisoes/propostas.md`, `pendentes.md`) e da mudança de 15/11 (commit `7056b2b`, na demo antiga: os textos
dele já foram adaptados ao painel das datas; ficou de fora a entrada no menu). Ao lado de cada uma, a recomendação do Claude.

| N.º | Nota do GPT | Recomendação | Diogo |
|---|---|---|---|
| 1 | «Simular preços» no menu completo, a abrir as contas (15/11) | sim | por dizer |
| 2 | Mais protagonismo à piscina, de dia e ao entardecer ou à noite; a biblioteca com a lareira para mostrar o inverno; o campo nas várias estações (24/10) | sim, nas fotografias grandes da V5 | por dizer |
| 3 | «A mesma vista, outra luz»: uma vista da piscina que muda entre dia, entardecer e noite (24/10) | sim, se houver três fotografias tiradas do mesmo sítio (ver primeiro) | por dizer |
| 4 | Em poucas fotografias, uma frase curta com graça em vez da legenda descritiva («a biblioteca no inverno», «o último café no alpendre») (24/10) | sim, com os textos mostrados antes | **não**, pela nota 2 de 19/11 («retirar as micro legendas das fotos»), salvo indicação contrária |
| 5 | O roteiro das duas noites também numa página leve, para guardar no telemóvel (24/10) | não por agora (já está na página) | por dizer |
| 6 | Galeria arrumada por espaços, com verão e inverno como filtro (24/10) | não (a 15/11 o Diogo escolheu os álbuns do Zenfolio) | por dizer |
| 7 | Um ícone e a contagem nas fotografias, para dizer que há mais (24/10) | não (nota 8 de 15/11: o movimento mostra isso) | por dizer |
| 8 | Convite para juntar o grupo (S19, ideia aceite a 17/10, nunca desenhada) | sim, depois da V5 | por dizer |
| 9 | Dar a mensagem por fechada como está (das quatro frases em estudo desde 19/10, «Por fora · Sem pressa · Por dentro» e «Há dias em que não é preciso mais nada» já estão no site, com «Uma casa inteira / O Alentejo à vossa porta» na capa) | sim | por dizer |
| 10 | Retomar o logótipo e o livro de marca (parados desde outubro) | não por agora | por dizer |
| 11 | A visita à casa em vídeo (S20, adiada) | não por agora | por dizer |
| 12 | Cancelar o Zenfolio só depois de cinco condições: originais conferidos, inventário guardado, fotografias publicadas e verificadas no site, ligações trocadas e autorização escrita do Diogo | sim | por dizer |

**Notas do GPT que o Diogo já decidiu (não precisam de resposta):** a barra de baixo com Menu, Contacto e «Verificar
disponibilidade» (nota 15 de 15/11, «manter»); as fotografias de cada parte a abrirem só esse grupo («ok» a 25/10; já funciona);
«antes e depois» fora do site (15/11); sem preços por época e sem «Reguengo»; a saída às 18h quando ninguém entra (15/11).

**Factos que o GPT deixou por confirmar:** 3,2 ou 3,6 hectares (o site não diz a área) · as regras miúdas dos animais, do
cancelamento e do Wi-Fi · a autorização escrita do Diogo para as fotografias do Rodrigo, antes de o site passar para
`montecasabranca.pt`.

## Notas de 19/11 (mais sugestões de alteração)

Mensagem do Diogo, pouco depois da meia-noite de 19/11, com cinco capturas (`diogo-5…9-*.jpg` na pasta da revisão): «Mais sugestões de
alteração», numeradas por ele de 1 a 7. Continua a valer «Ainda não alteres nada. Regista só»: tudo isto é para a V5.

1. **«Menu em escada»** (2 A casa). A captura é de um estudo do ChatGPT («Monte-Casa-Branca-Estudo-…», página 2 de 10, que **não está
   no GitHub**): o Diogo riscou o cartaz da V4 (três linhas com setas) e rodeou o da V2 («Em degraus»). **Na V5:** o cartaz volta ao
   desenho em degraus da V2 (commit `37c9ca0`): «Por fora» à esquerda, «Sem pressa» ao centro, em itálico e na cor terracota, «Por
   dentro» à direita, sem setas; cada palavra continua a levar ao seu capítulo.
2. **«Retirar as micro legendas das fotos»** (3 Os espaços; 5 Montemor e N2). Saem as legendas pequenas escritas sobre as fotografias
   das faixas (por exemplo «De bicicleta, à sombra») e a de baixo da fotografia da N2 («A mesma casa à vossa espera ao fim do dia»). A
   descrição fica escondida no `alt`, para quem usa leitor de ecrã e para as pesquisas. **Isto responde também à nota 4 da lista do
   GPT** (frases com graça nas fotografias): passa a «não», salvo indicação contrária do Diogo.
3. **«Reposicionar a secção de fotos … no mobile, por ser uma secção grande no meio, pode afastar o utilizador de passar para as
   seguintes secções. No fim antes dos contactos? Repensar»** (6 A galeria). Duas formas, a mostrar antes: (a) a galeria passa para
   antes dos contactos; (b) fica curta, uma fila de fotografias e «Ver todas», que abre a galeria inteira por cima e, ao fechar, volta
   ao mesmo ponto. **Recomendação do Claude: as duas juntas** (curta e antes dos contactos). O menu de cima muda de ordem com ela (a
   regra é a ordem do menu ser a da página).
4. **«Manter cabeçalho visível na disponibilidade»** (11 Painel das datas). Na captura, o cimo do painel (título e fechar) já saiu do
   ecrã e os dias da semana estão cortados. **Na V5:** o cimo do painel (título, fechar, mês e dias da semana) fica fixo e só o resto
   rola por baixo. Nota técnica: sem `position: sticky` (regra de construção da V3, por causa do iPhone): o painel passa a ter uma parte
   de cima fixa e uma parte de baixo que rola.
5. **«O número 4 é exemplo ou está a aparecer por defeito?»** (11 Painel das datas). **Está por defeito:** o campo «Quantas pessoas
   vêm?» começa em 4 por estar escrito assim no código (`partes/dock.php`, `$i === 4`), desde o site em PHP de 7/11. Não muda o preço (a
   casa é inteira; a conta só confere que não passa de 8) e só segue no pedido de datas. **Proposta para a V5:** começar vazio
   («Escolham»), a conta aparecer sem precisar dele, e o pedido de datas pedi-lo.
6. **A Nacional 2: «parecem 3 módulos diferentes: estilo, foto, tabela de 3 acontecimentos. Parece que foi feita à pressa. Acho que tens
   nas versões anteriores uma formatação e organização deste espaço mais agradável. Dar importância às fotos e mensagem e ter o programa
   como acessório mais informativo sem ser um choque que entra pelos olhos e fere a vista»** (5 Montemor, N2 e onde estamos). Visto nas
   capturas das versões (`versoes-1-2-4-parte5-telemovel.jpg`): **na V2** a N2 era um só bloco, com um traço fino à esquerda, o título, o
   texto e o programa pequeno (os dias em itálico, pequenos, com o texto ao lado); **na V1** era um bloco igual, só com texto; **na V4**
   são três peças soltas (texto, fotografia grande com legenda, e o programa com os dias em letra grande). **Proposta para a V5:** a
   fotografia grande com o título por cima (como as fotografias grandes da V1, nota 1 de 18/11), a mensagem, e o programa pequeno à
   maneira da V2, dentro do mesmo bloco.
7. **A ecopista: «precisa de brilho e fotos … incluir uma régua de fotos não tão grande. Aliás nestes separadores de suporte, as fotos
   deveriam ser mais pequenas. Neste caso a foto ilustrada é da ecopista e pode entrar aqui. Eu depois acrescento mais 2/3»** (5
   Montemor, N2 e onde estamos). **Na V5:** o bloco da ecopista ganha uma régua pequena, que começa com a fotografia da bicicleta no
   túnel de árvores (`montemor/caminho-arvores-bicicleta.jpg`, hoje na faixa de Montemor). No álbum de Montemor há mais duas com a mesma
   bicicleta vermelha (à porta da antiga estação do Paião e junto ao montado) que podem ser da ecopista: a confirmar pelo Diogo. Com as
   2 ou 3 que ele vai juntar (pela pasta do Dropbox ou pela conversa), a régua fica com 4 a 6. **Nas partes de apoio** (Montemor, N2,
   ecopista) as fotografias ficam mais pequenas do que nos capítulos da casa.

**Decisão do Diogo sobre as notas 6 e 7 (19/11, cerca das 00h25):** na comparação das versões 1, 2 e 4 rodeou, na V2, o texto da
ecopista, o bloco da N2 (traço fino à esquerda, título, texto, programa pequeno, estadia mínima, ligação à Rota da N2) e o começo de
«Onde estamos» (`diogo-10-n2-como-na-v2.jpg`): «Tem mais lógica assim, mas enquadra e dimensiona como achares melhor.» **Na V5,
enquadramento e tamanhos ao critério do Claude:**
- Montemor abre como na V4 (sobretítulo, «Montemor-o-Novo também é a estadia», o texto e a ligação), com a faixa de fotografias mais
  pequena (nota 7);
- logo a seguir, a ecopista como na V2 (o texto e «Conhecer a ecopista»), agora com a sua régua pequena (nota 7);
- depois a N2 num só bloco, como na V2: o traço fino à esquerda, o sobretítulo, «Dois dias no coração do Alentejo», a mensagem, a
  fotografia da casa ao entardecer dentro do bloco e em destaque, o programa pequeno (os dias em itálico, com o texto ao lado), a
  estadia mínima e a ligação à Rota da N2;
- e «Onde estamos» logo a seguir, como está;
- sem legendas pequenas nas fotografias (nota 2).
**Cuidado (nota de monitor):** a 16/11, sobre a V2, o Diogo disse que Montemor «aparece quase sem separador nem introdução» e que a N2
ficava «como se fosse um apêndice». Por isso a V5 junta o arranjo da V2 com a abertura clara de Montemor da V4 e a fotografia da N2 em
destaque, para a N2 não voltar a parecer um apêndice. Mostrar ao Diogo antes do «Lança».

**Respostas do Diogo (19/11, cerca das 00h35):**
- Perguntou o que queria dizer o «não» da nota 2. Explicado: a ideia 4 do GPT era pôr, em poucas fotografias, uma frase curta com graça
  no lugar da legenda; sem legendas nas fotografias (nota 2), essa ideia deixa de ter lugar, por isso ficou registada como «não». Se ele
  quiser essas frases em poucas fotografias, passa a «sim» e são a exceção.
- **Nota 3: «propõe na próxima versão».** A galeria curta e antes dos contactos entra na V5 como proposta, para ele ver.
- **Nota 7: «são da ecopista».** As três fotografias da bicicleta vermelha (o túnel de árvores, a antiga estação do Paião e junto ao
  montado: `montemor/caminho-arvores-bicicleta.jpg`, `estacao-paiao.jpg`, `montado-bicicleta.jpg`) passam da faixa de Montemor para a
  régua da ecopista; a faixa de Montemor fica com sete. No álbum Montemor-o-Novo da galeria continuam as catorze, como no Zenfolio.
- **O estudo do ChatGPT:** «as últimas capturas foi o GPT que verificou o meu Instagram. Essas fotos ainda não estão disponíveis mas
  poderão fazer parte da lista de fotos a entrar na régua e não na galeria.» Registado: quando as fotografias do Instagram estiverem
  disponíveis (no Dropbox ou enviadas na conversa), entram nas réguas (a da ecopista, se forem de lá; as da casa, na do fecho, «Há
  mais casa para descobrir») e **não** na galeria.

**Nota de monitor:** a primeira captura mostra que o ChatGPT está a fazer um estudo de 10 páginas para o Diogo, que não está no GitHub
nem no Dropbox. Se forem essas «as notas do GPT» que ele queria numeradas, o Claude precisa das 10 páginas (capturas ou o ficheiro).

## Próximas ideias

(A acrescentar aqui quando o Diogo as mandar, com as palavras dele.)

## O que não muda sem ordem

Nada em `site/`. Nenhum envio. A V4 (`0be7000`, etiqueta `novo-v4`) continua no ar em `novo.montecasabranca.pt`.
