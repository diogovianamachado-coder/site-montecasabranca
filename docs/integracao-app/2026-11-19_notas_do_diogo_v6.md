# Notas do Diogo sobre a versão 6 (19/11/2026, à tarde, no computador)

**Estado: registadas, por fazer.** A ordem do Diogo: «guarda estas notas para uma proxima revisão». Nada mudou em `site/` e nada foi
para o servidor; **a V6 (`37b0736`, etiqueta `novo-v6`) continua no ar em `novo.`**. Quando ele mandar avançar, isto é a **versão 7**:
sobe o número em `site/versao.json`, abre-se a ficha `### V7 · …` em `docs/versoes/REGISTO.md` e só se envia com novo «Lança». As
ideias seguintes juntam-se a este documento.

**Juízo geral:** «pelo desktop parece que o site está bem.»

**Capturas** em `docs/integracao-app/revisao-2026-11-19/`: `diogo-1-quantas-pessoas-sem-palavra.png` (a dele, com o risco a
vermelho) e `fotografias-principais-antes-e-agora.jpg` (a folha que o Claude lhe mandou para a pergunta das fotografias principais).

## 1. «Quantas pessoas vêm?» sem palavra

- **Palavras dele** (sobre «Escolham», riscado na captura): «esta palavra não fica bem aqui. deixa em branco».
- **Onde se mexe:** `site/conteudo.php` → `disponibilidade` → `'pessoas_escolher' => ''` (o `partes/dock.php` escreve-a dentro da
  primeira opção, que continua vazia e escolhida por omissão). O resto fica: a conta faz-se sem o número e o pedido de datas pede-o
  («Digam-nos quantas pessoas vêm.»).
- **Teste a juntar:** no `captura-site.cjs`, além do valor vazio, o texto da opção escolhida também vazio.

## 2. O rato parado em cima das fotografias não pode parar as faixas

- **Palavras dele:** «quando o rato do pc está estacionado em cima da foto a régua para. não deve parar. o rato deverá estar livre».
- **Porquê:** desde a V4, com rato, a faixa pára enquanto o rato se mexe por cima e só retoma 1,4 s depois do último movimento
  (`site/assets/js/site.js`, bloco «Rolos», `mousemove`/`mouseleave` e `r.rato`). Uma mão pousada no rato ou no trackpad faz
  movimentos de um píxel, que contam como «mexer», e a faixa fica parada enquanto o rato lá estiver.
- **Proposta para a V7:** o rato por cima das fotografias nunca pára as faixas, parado ou a mexer-se (sai o `r.rato` e os dois
  `addEventListener`). Ficam as ações de propósito: carregar no botão e arrastar leva a faixa, um clique abre a fotografia em grande,
  a roda para o lado leva-a, e a tecla Tab segura-a enquanto o foco lá estiver.
- **Teste a mudar:** `captura-site.cjs`, ponto 2b: hoje exige que a faixa pare com o rato a mexer-se; passa a exigir que ande com o
  rato a mexer-se e com o rato parado por cima.
- **A confirmar com ele na próxima revisão:** as frases de «Quem já ficou» também esperam enquanto o rato está em cima delas (para se
  conseguirem ler). Ficam assim, ou também deixam de esperar?

## 3. As fotografias grandes no telemóvel ficam cortadas

- **Palavras dele:** «as fotos grandes no mobile parece que ficam cortadas e sem nexo».
- **Porquê (contas no ecrã de 390 × 844):** a fotografia grande ocupa 70 % da altura do ecrã (cerca de 590 px; a de Montemor, 58 %) e
  a caixa que a faz passar devagar ao rolar é 20 % mais alta (cerca de 710 px). As quatro fotografias são deitadas (3 × 2): para
  encherem essa altura ficam com cerca de 1 060 px de largura, e o ecrã mostra 390. **Vê-se pouco mais de um terço de cada
  fotografia** (Montemor, cerca de 44 %), uma tira vertical do meio. E no telemóvel vai a versão de 1 000 px de largura, mostrada a
  1 060 px num ecrã de densidade 3: fica também menos nítida.
- **Opções para a V7, a decidir com ele (nada feito):**
  - **a)** no telemóvel, a fotografia grande com a forma da fotografia (a largura do ecrã e cerca de dois terços disso de altura) e a
    palavra por cima, em baixo: vê-se a fotografia inteira e nítida, e continua a acender e a passar devagar, com menos curso;
  - **b)** manter a altura e escolher fotografias ao alto para o telemóvel (há poucas na coleção);
  - **c)** no telemóvel, o capítulo abre só com a palavra e a faixa, sem fotografia grande.
  **Recomendação do Claude: a)**, com a versão de 1 600 px nessas quatro fotografias.
- **Liga-se à pergunta da secção 4:** quais são as fotografias grandes decide-se ao mesmo tempo que a forma delas no telemóvel.

## 4. Pergunta em aberto: as fotografias principais

- **Pergunta dele:** «Porque é que as fotos principais mudaram?»
- **Resposta dada (19/11):** na V6, as quatro fotografias grandes que abrem Por fora, Sem pressa, Por dentro e Montemor foram escolha
  do Claude, sem perguntar: fotografias que ainda não estavam nas faixas, para a mesma não aparecer duas vezes seguidas. As que ele
  conhecia (`exterior/piscina-agua.jpg`, `exterior/alpendre-por-do-sol.jpg`, `interior/sala-portas.jpg`, `montemor/castelo-ruinas.jpg`)
  continuam a ser a primeira fotografia de cada faixa. **Erro do Claude:** quem escolhe as fotografias e onde aparecem é o Diogo, e a
  troca não foi dita na mensagem do envio (só no registo).
- **Proposta, à espera da palavra dele:** repor as de antes como fotografia grande e tirá-las da faixa de baixo (para não repetirem);
  ou manter as novas; ou escolher capítulo a capítulo. A folha `revisao-2026-11-19/fotografias-principais-antes-e-agora.jpg` mostra as
  quatro, lado a lado.
