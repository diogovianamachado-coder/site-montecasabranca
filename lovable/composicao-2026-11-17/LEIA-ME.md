# Composição do Lovable de 17/11/2026: as notas do Diogo de 15/11 que faltavam

Seguimento da composição de 16/11 (`../composicao-2026-11-16/`). O pedido está em `pedido-ao-lovable.md`; aqui fica o que o Lovable
respondeu e o que mudou no projeto dele. Projeto «Monte Casa Branca», versão `df8161a` (a de 16/11 era a `088eae5`).
Para ver ao vivo, com dados de exemplo: a pré-visualização do projeto (a ligação está em `docs/versoes/REGISTO.md`, ficha da V3).

## A resposta do Lovable (17/11, 00h28), tal como veio

> Apliquei apenas os sete pontos:
>
> 1. **Capa:** título sobre o céu a 96/108 px do topo, segundo degrau em itálico, conteúdo sobre a água, gradiente mínimo
>    16 %/0 %/30 %, sombra de texto e fotografia sem ampliação.
> 2. **Capítulos e Montemor:** removi as contagens; as setas só aparecem com rato e o avanço pausa sob o rato.
> 3. **Fila do fecho:** ordem aleatória por visita, avanço lento, inversão no fim e paragem definitiva após interação.
> 4. **Antes de chegar:** duas colunas no computador, título em três linhas e sinais «+»/«−» funcionais.
> 5. **Passear pelo Monte:** removi o sobretítulo «Fotografias».
> 6. **Quem já ficou:** removi a contagem, mantendo rotação e avanço por toque.
> 7. **Ligações internas:** navegação suave sem deixar «#secção» no endereço.
>
> **QA:** build e verificação de tipos sem erros; 3 testes passaram. A 390 × 844 e 1280 × 900 confirmei posições, controlos, ordem
> aleatória, inversão, pausa, FAQ, navegação e ausência de rolagem horizontal ou erros de consola. Com movimento reduzido, não há
> avanço automático.
>
> Alterados: `src/routes/index.tsx`, `src/styles.css` e `roadmap.md`. Não publiquei nem alterei serviços. O swipe num iPhone físico
> continua pendente de validação no dispositivo.

A capa da pré-visualização foi conferida pela imagem que o Lovable guarda do projeto: título no céu, segunda linha em itálico e mais
pequena, fotografia clara e sem ampliação, o resto sobre a água. É a capa 1.

## O que mudou no código dele (lido no diff `088eae5` → `df8161a`)

- `src/styles.css` (guardado inteiro nesta pasta): a máscara da capa passou de 35 % · 25 % · 75 % para 16 % · 0 % · 30 %; regra nova
  `hero-copy` (sombra do texto); regra nova `.sequence-controls` (as setas só existem com `hover: hover` e `pointer: fine`).
- `src/routes/index.tsx` (não guardado aqui: são mais de mil linhas e só mudaram estes pontos; o ficheiro completo está no projeto):
  - **Capa:** a fotografia perdeu o `scale-[1.06]`; o título saiu do bloco de baixo e ficou preso ao cimo (`top-24`, `md:top-[6.75rem]`),
    com a segunda linha em itálico; em baixo ficam a linha, as etiquetas, o botão e «Sem receção, sem pressa».
  - **Sequências:** saiu a contagem; as duas setas passaram para cima das fotografias, em cima à direita, com fundo claro
    (`sequence-controls`); o rato a entrar pára o avanço e a sair retoma.
  - **Fila do fecho:** a lista é baralhada ao abrir a página; um relógio de 3,8 s dá um passo de cada vez com a página parada, troca
    de sentido nas pontas e pára de vez quando alguém lhe pega (ou, com rato, quando o rato lhe passa por cima).
  - **Antes de chegar:** grelha de doze colunas a partir do tablet, título em três linhas à esquerda, perguntas à direita com «+» e «−».
  - **Passear pelo Monte:** saiu o sobretítulo.
  - **Quem já ficou:** saiu a contagem.
  - **Ligações internas:** componente novo `InternalLink`, que rola até à secção e limpa o «#» do endereço; usado na capa, no cartaz,
    no fecho e no menu.
- Ficheiros do próprio Lovable, que não são do site: `roadmap.md` (a lista dele) e `.lovable/north-star/north-star.md`.

## O que passou daqui para o site

Quase tudo já lá estava (o site foi reposto antes de o Lovable receber este pedido). Do desenho novo do Lovable veio uma coisa:
**as setas das sequências pousadas sobre as fotografias, em cima à direita, só com rato** (no site estavam numa linha própria por cima
da faixa). Duas diferenças ficaram de propósito:

- no site, «Antes de chegar» só passa a duas colunas a partir de 900 px de largura (no Lovable é a partir de 768 px, onde o título em
  três linhas fica apertado);
- no site, o rato em cima da fila do fecho suspende o avanço e ele retoma quando o rato sai (no Lovable pára de vez).
