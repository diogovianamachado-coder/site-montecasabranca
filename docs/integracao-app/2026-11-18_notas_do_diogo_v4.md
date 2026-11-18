# Notas do Diogo sobre a versão 4 (18/11/2026, entre as 00h40 e as 00h55, no iPhone)

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
  texto. Mostrar ao Diogo, antes de fazer, onde fica: por exemplo, encostado por cima da barra de baixo, no lado direito, a esconder-se
  quando o menu, o painel ou uma fotografia estão abertos; ou dentro da própria barra de baixo.

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
- **Nota de monitor:** é a única frase do site que diz que não há check-in presencial (um facto do brief). Se o Diogo quiser que o
  facto continue no site, pode ir para a resposta «A que horas podemos chegar?» de «Antes de chegar». Perguntar quando se fizer a V5.

## Próximas ideias

(A acrescentar aqui quando o Diogo as mandar, com as palavras dele.)

## O que não muda sem ordem

Nada em `site/`. Nenhum envio. A V4 (`0be7000`, etiqueta `novo-v4`) continua no ar em `novo.montecasabranca.pt`.
