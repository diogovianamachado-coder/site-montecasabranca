# O site explodido, secção a secção · a versão do Lovable como está hoje, e o que falta decidir (25/10/2026, noite)

**Para quê:** o Diogo quer ver o site geral e o detalhe página a página **antes** da parte técnica («se vamos usar a parte criativa do
Lovable temos de acertar primeiro no design»). Este documento lê-se com a pré-visualização do Lovable aberta no telemóvel
(https://id-preview--96fa8399-2585-4338-bf69-b63411871178.lovable.app, entrando com a conta do Lovable). Foi escrito a partir do código do
projeto (`src/routes/index.tsx`), não de capturas. **Ler isto não gasta créditos.** Só as mudanças que o agente do Lovable fizer gastam.

**Os créditos, de uma vez:** o plano gratuito dá 5 créditos por dia; a primeira versão gastou 4,6. Cada secção afinada custa entre 1 e 5
créditos, conforme o tamanho da mudança. As sete secções deste documento somam, por estimativa, 10 a 15 créditos: com o plano gratuito
dão-se dois ou três dias de espera entre lotes; com o plano pago (Pro, cerca de 25 € por mês, 100 créditos) faz-se tudo num ou dois dias.
Não há nada a pagar para rever este documento nem para decidir; paga-se quando se mandar a primeira mudança.

## 0. O site geral

- **Uma página longa**, na ordem dos sete pontos do Diogo, mais duas coisas que a acompanham: o **menu em sobreposição** (A casa · Descobrir ·
  Avaliações · Montemor-o-Novo · Nacional 2 · Perguntas · Contactos) e a **barra fixa em baixo**, que aparece depois da capa, com «Menu»,
  «Contacto» (WhatsApp, só no desktop) e **«Verificar disponibilidade»**, que abre um painel lateral com calendário, simulador e tempo.
- Não há página de fotografias nem subpáginas: a estrutura das sete páginas (aceite a 22/10) foi substituída, na prática, por uma página
  em scroll. **Decisão 0.1:** fica assim, ou junta-se uma página «Fotografias» com a galeria completa por álbuns? (recomendo juntar a
  galeria completa como página própria; a página longa mostra o melhor de cada espaço e aponta para lá.)
- Aspeto: as cores e os tipos da prancha (Playfair Display nos títulos, Source Sans 3 no texto; terracota nos botões; areia e cal nas
  faixas; verde oliveira no rodapé). Animações: paralaxe na capa, revelar ao rolar, zoom suave nas fotografias ao passar.
- Fotografias usadas: só quatro (piscina, alpendre, sala pelas portas, quarto) e o logótipo. **Tudo o que abaixo diz «precisa de fotografia»
  espera pela entrega das fotografias no repositório** (recado ao GPT de 25/10, 5.ª parte) ou pela rede aberta ao Dropbox.

## 1. Capa (quem entra vê logo a piscina e a casa)

**Como está:** a fotografia da piscina com as duas casas a ecrã inteiro, com paralaxe; o logótipo a branco em cima à esquerda; em cima à
direita o seletor «Capa 1 / Capa 2» (a 2 está desligada, «segunda capa a caminho»); título **«Uma casa inteira / no Alentejo»**; linha
«Monte Casa Branca · Montemor-o-Novo, a 1 h de Lisboa»; três fichas (Até 8 pessoas · 4 quartos · Piscina 10 × 5 m); um só botão, **«Entrar
pela casa»**, que leva à secção Descobrir; em baixo «Sem receção, sem pressa».
**O que falta face ao pedido:** a segunda capa (a piscina de lado com a espreguiçadeira e o chapéu: precisa de fotografia); o botão de
ver datas logo na capa (hoje só aparece na barra depois de rolar).
**Decisões:** 1.1 título: «Uma casa inteira no Alentejo» (Lovable) ou «Uma casa inteira. O Alentejo à vossa porta.» (GPT/prancha)? ·
1.2 botão «Ver datas» também na capa, ao lado de «Entrar pela casa»? · 1.3 o seletor de capas fica visível ao público ou é só para tu
compararmos as duas e depois sai?

## 2. Mensagem (quem faz scroll quer uma mensagem forte)

**Como está:** uma secção só de texto, centrada: «Uma casa inteira, só vossa» · **«O dia é vosso / A casa também»** (a segunda linha em
itálico terracota) · «Uma casa inteira no Alentejo para estar juntos, abrir as portas e deixar o dia acontecer». Sem fotografia.
**O que falta face ao pedido:** «mensagem forte acompanhada com fotos fortes»: aqui não há fotografia. A mensagem é do Lovable, não é a do
GPT nem está aprovada.
**Decisões:** 2.1 a frase: a do Lovable, uma das quatro do GPT («Cada um ao seu ritmo» · «Por dentro. Por fora. Sem pressa.» · «Há dias
em que não é preciso mais nada.» · «Um lugar onde as coisas simples podem ser extraordinariamente boas.»), ou outra tua? · 2.2 com
fotografia ao lado (a sala pelas portas abertas, como na r3) ou só texto, como está? (recomendo com fotografia.)

## 3. Descobrir a casa (o exterior é rei; depois a sala; depois o resto)

**Como está:** quatro espaços, pela ordem certa: **«Primeiro, lá fora»** com a piscina a toda a largura (a mesma fotografia da capa, com
outro recorte) e o texto da piscina, do jardim e das ovelhas · **Alpendre** (fotografia dos dois copos + texto) · **Sala e cozinha**
(faixa clara, a sala pelas portas + texto; nota «Ar condicionado em todas as divisões, lareira na biblioteca») · **Quartos e banho**
(fotografia do quarto + texto). No fim, a frase grande «Há dias em que não é preciso mais nada». Tocar numa fotografia abre uma galeria
em sobreposição desse espaço (hoje com uma só fotografia por espaço).
**O que falta face ao pedido:** fotografias fortes e com luz do exterior (hoje repete a da capa); a sala e a cozinha de frente, a
biblioteca com a lareira, os quatro quartos, as casas de banho, o campo; os onze pares antes/depois (não existem); «Ver todas as
fotografias» (não há página de fotografias).
**Decisões:** 3.1 quantas fotografias por espaço na galeria em sobreposição (3 a 6?) · 3.2 os pares antes/depois: aqui, numa secção
própria «A mesma casa, uma nova vida», ou só na página de fotografias? · 3.3 a frase «Há dias em que não é preciso mais nada» fica aqui
no fim, ou passa para a secção 2 como mensagem? · (tudo o resto desta secção espera pelas fotografias.)

## 4. Avaliações e perguntas frequentes

**Como está:** faixa areia com a avaliação real do Airbnb de 2023 entre aspas grandes, assinada «Hóspedes do Airbnb · 2023», e a linha
«Recebemos hóspedes desde 2022 · Airbnb · Booking · Vrbo» (sem ligações). Depois **sete perguntas** em acordeão (casa inteira, quartos e
casas de banho, horas, estadia mínima, limpeza, animais, pagamento).
**O que falta face ao pedido:** mais avaliações (só há uma citável; as outras virão da app pela porta #192, quando o Diogo as marcar «citar
no site»); as três perguntas que a r3 tem a mais (cozinha equipada, berço, estacionamento); as ligações às plataformas nas palavras
Airbnb/Booking/Vrbo.
**Decisões:** 4.1 juntar as três perguntas? · 4.2 as plataformas com ligação (as oficiais do Linktree) ou só o nome? · 4.3 uma linha
«nota média» quando a porta #192 existir, ou nunca números?

## 5. Localização: Montemor-o-Novo e a Nacional 2

**Como está:** uma banda com a fotografia do alpendre (repetida) e o título «O Alentejo mesmo à porta»; a lista das cinco distâncias
(centro 3 km · Évora 25 min · Lisboa 1 h · Comporta 50 min · Alqueva 1 h) e o botão «Abrir no Google Maps»; um bloco «Montemor-o-Novo»
(subir ao castelo, as ruas, o património, a mesa) e um bloco «Nacional 2 · roteiro de duas noites» com o resumo.
**O que falta face ao pedido:** uma fotografia de Montemor (castelo, ruas, ecopista) em vez do alpendre repetido (precisa de fotografia);
o roteiro dos dois dias por extenso (Dia 1 Montemor, Dia 2 Évora, saída na manhã seguinte, o passaporte N2); a ligação ao portal Visit
Montemor-o-Novo; «Antes de chegar: as indicações e o código da chave pela mão do Diogo».
**Decisões:** 5.1 roteiro por extenso ou resumo? · 5.2 portal Visit Montemor-o-Novo com ligação? · 5.3 «Antes de chegar» aqui ou nos
contactos?

## 6. Contactos

**Como está:** rodapé em verde oliveira: «Venham conhecer a casa, falem connosco», «Contem-nos as vossas datas e como gostam de viajar.
Respondemos por WhatsApp ou por email, sem formulários nem esperas»; WhatsApp +351 962 802 626, email, @monte_casa_branca; o logótipo e
a morada completa em letra pequena com o registo 126450/AL.
**O que falta:** nada de essencial. **Decisões:** 6.1 verde oliveira ou cal, como o resto? · 6.2 «sem formulários» é a mensagem que
queres, sabendo que o painel das datas tem um pedido com formulário?

## 7. O que acompanha sempre: a barra e o painel «Verificar disponibilidade»

**Como está:** a barra fixa em baixo aparece depois da capa: «Menu», «Contacto» (WhatsApp, só em ecrãs largos) e «Verificar
disponibilidade». O painel abre de lado (desktop) ou de baixo (telemóvel): dois meses de calendário de exemplo (novembro e dezembro
de 2026, com dias ocupados inventados), «Simulem a estadia» (entrada, saída, pessoas, conta fixa 330 € por noite + 180 € de limpeza),
botões WhatsApp e Email, e o tempo de exemplo (sete dias, «Exemplo · Dados: Open-Meteo»).
**O que falta:** tudo isto é de exemplo; a parte técnica (calendário real da app, tarifa com as regras da casa, tempo real, pedido que
cria a pré-reserva) é a minha, já escrita e à espera do repositório, e entra **depois** de o design estar acertado, sem créditos.
**Decisões de design:** 7.1 painel lateral (como está) ou secção na página, como na r3? · 7.2 na barra, «Ver datas» e «WhatsApp»
também no telemóvel? · 7.3 o pedido de datas dentro do painel (nome, email, mensagem) ou só os botões WhatsApp e email?

## Como se fecha o design, sem desperdiçar créditos

1. O Diogo responde às decisões acima (podem ser só os números: «0.1 juntar · 1.1 GPT · 1.2 sim …»).
2. O Claude escreve o pedido ao agente do Lovable por lotes (capa e mensagem · a casa · avaliações, perguntas e localização · contactos
   e painel), com o texto exato e as fotografias pelo nome, e manda um lote de cada vez; cada lote 2 a 5 créditos.
3. O Diogo vê cada lote no telemóvel pela pré-visualização e diz sim ou o que mudar; repete-se até estar certo.
4. Só então a parte técnica: as peças do Claude entram pelo GitHub, sem créditos, e o painel passa a mostrar dados reais.
