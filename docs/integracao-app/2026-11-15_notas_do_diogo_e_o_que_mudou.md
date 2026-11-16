# Revisão do site pelo Diogo (15/11/2026): as 17 notas, o que mudou e os textos para aprovar

O Diogo reviu `novo.montecasabranca.pt` no PC a 15/11/2026 e deixou 17 notas, com capturas. Regra dele para os textos: «escrevo o texto mas
preciso que refaças a mensagem de acordo com o tom que estamos a adotar. É muito importante não ser literal nem escrever um testamento.»
Depois: «Já terminei. Podes agora tu fazer o trabalho e perguntar coisas para avançarmos.»

Este documento diz, nota a nota, o que ficou feito em `site/` (rascunho em `main`, **nada foi para o servidor**), põe os textos novos ao
lado do que havia ou do que ele deu como referência, e junta no fim o que está por confirmar. As referências que ele mostrou vêm de um
estudo do ChatGPT posterior a 24/10 que não chegou ao repositório: os textos foram lidos nas capturas.

Capturas do rascunho (feitas num servidor de ensaio local, com tempo e calendário de exemplo), em `docs/integracao-app/revisao-2026-11-15/`:
`1-capas-computador.jpg` e `1-capas-telemovel.jpg` (as três opções da capa) · `2-a-casa-computador.jpg` · `3-montemor-e-resto-computador.jpg` ·
`4-telemovel.jpg` (a página de cima a baixo) · `5-menu-e-datas.jpg` (menu completo e painel das datas, com o tempo nos três casos).

## 1. A página, de cima a baixo (como ficou)

| N.º | Secção | Âncora | O que tem |
|---|---|---|---|
| 1 | Capa | `#inicio` | Fotografia, título em cascata, etiquetas, botão «Entrar pela casa»; menu de cima (só no computador) |
| 2 | A casa | `#a-casa` | A mensagem «Por fora · Sem pressa · Por dentro», cada palavra a levar ao seu momento |
| 3 | Por fora | `#por-fora` | Fotografia principal a toda a largura e mais três atrás, a rolar; texto por cima |
| 4 | Sem pressa | `#sem-pressa` | Fotografias à esquerda (a rolar), texto à direita |
| 5 | Por dentro | `#por-dentro` | Texto à esquerda, fotografias à direita (a rolar) |
| 6 | A frase e a régua | — | «Há dias em que não é preciso mais nada» e, a seguir, vinte fotografias pequenas, ao acaso, a rolar |
| 7 | Montemor-o-Novo | `#montemor` | Fotografias de Montemor a rolar na própria secção; texto; Visit Montemor; ecopista |
| 8 | Nacional 2 | `#nacional2` | «Dois dias no coração do Alentejo» e o programa de duas noites |
| 9 | Onde estamos | `#onde` | As cinco distâncias e o botão do mapa |
| 10 | Galeria | `#galeria` | Os quatro álbuns do Zenfolio, pela mesma ordem (sem o «antes e depois») |
| 11 | Antes de chegar | `#antes-de-chegar` | «Para se sentirem em casa» e sete perguntas |
| 12 | Quem já ficou | `#avaliacoes` | Uma frase curta de cada vez (dez, a rodar) |
| 13 | Contactos | `#contactos` | «Falamos?» · «Contem-nos os vossos planos» |
| — | Barra em baixo | — | Menu · Contacto · Verificar disponibilidade (fica como estava) |

A ordem da página é a do menu de cima que o Diogo escreveu (nota 5, com «Antes de chegar» antes de «Avaliações», nota 10).

## 2. Nota a nota

### Nota 1 · «o site está a arrancar logo nesta página; aparece o inicial mas foge logo para aqui» (endereço `…/#casa`)

**Causa:** os menus eram ligações normais para `#casa`, `#descobrir`, etc. Ao clicar, o endereço ficava com `#casa` no fim; o browser
guarda esse endereço e, ao abrir ou recarregar, salta para essa secção.
**Feito:** as ligações internas passam a rolar até à secção **sem mexer no endereço**; se alguém abrir uma ligação partilhada com `#galeria`
a página vai lá e o endereço fica limpo logo a seguir; a secção deixou de se chamar `#casa` (é `#a-casa`), por isso o endereço antigo que o
browser guardou abre na capa. Coberto pelo teste automático.
**No PC do Diogo:** o Chrome pode continuar a sugerir `novo.montecasabranca.pt/#casa` ao escrever o endereço; abre na capa na mesma. Para a
sugestão desaparecer: começar a escrever o endereço, pôr o cursor na sugestão com as setas e carregar em Shift + Delete.

### Nota 2 · brilho e enquadramento da capa; a fotografia 2 como opção (2 ou 3 opções em HTML)

**Feito:** a máscara antiga escurecia a fotografia inteira (35 % em cima, 25 % a meio, 75 % em baixo). Há agora três opções, que se vêem
no ensaio com `?capa=1`, `?capa=2`, `?capa=3` no fim do endereço (aparecem três botões no cimo para trocar; fora do ensaio não existem):

| Opção | Fotografia | Título | Máscara |
|---|---|---|---|
| 1 (fica por omissão) | 1, a piscina de frente | no céu, por cima da casa | quase nenhuma |
| 2 | 1 | em baixo, sobre a água | leve (só em cima e em baixo) |
| 3 | 2, espreguiçadeiras e chapéu | em baixo | média |

A fotografia deixou de ser ampliada 8 % (via-se menos casa). **Leitura do Claude, por olho:** a opção 1 é a mais clara e a única em que a
casa fica toda à vista, no computador e no telemóvel; na fotografia 2 o texto cai sobre o chão claro e a espreguiçadeira e obriga a
escurecer mais, que era a queixa. A escolha é do Diogo.

### Nota 7 · título da capa em cascata

| Antes | Agora |
|---|---|
| Uma casa inteira / no Alentejo | **Uma casa inteira** / *O Alentejo à vossa porta* (a segunda linha desce um degrau: mais pequena, em itálico, afastada da margem) |

### Notas 3, 4, 5, 6a e 16 · menus

| Onde | Antes | Agora |
|---|---|---|
| Menu de cima (capa, computador) | A casa · Descobrir · Fotografias · Avaliações · Montemor-o-Novo | **Montemor-o-Novo · N2 · Galeria · Antes de chegar · Avaliações** |
| Botão da capa | «Entrar pela casa» → uma fotografia a meio | «Entrar pela casa» → a mensagem «Por fora · Sem pressa · Por dentro» |
| Menu completo (botão «Menu») | A casa · Descobrir · Fotografias · Avaliações · Montemor-o-Novo · Nacional 2 · Perguntas · Contactos | **A casa** (e por baixo, em pequeno: *Por fora · Sem pressa · Por dentro*, cada um a levar ao seu momento) · Montemor-o-Novo · Nacional 2 · Galeria · Antes de chegar · Quem já ficou · Contactos · «Uma casa inteira no Alentejo» |

«Entrar pela casa» saiu do menu e ficou só na capa (nota 4). «Fotografias» passou a «Galeria» (nota 3). Na nota 16 o Diogo pediu para ver se
fazia sentido escrever «Por fora, sem pressa, por dentro» em vez de «Piscina e exterior»: faz, mas como linha inteira no tamanho das outras
partia em duas no telemóvel e competia com «A casa»; ficou como segunda linha de «A casa», com as três palavras clicáveis.
**Nota 6a:** perguntar ao Diogo, no fim, se a ideia do menu se mantém.

### Notas 8 e 6b · «Por fora | Sem pressa | Por dentro»; fotografia principal e duas ou três atrás a rolar; a régua; sem «antes e depois»

**Feito:** a mensagem voltou e abre a casa (secção «A casa», três linhas em degraus). Mantém-se o formato de três momentos. Em cada um há uma
fotografia principal e mais três ou quatro atrás, que rolam devagar sozinhas e em círculo; o dedo ou o rato aceleram (arrastar) ou param
(premir); ao largar retomam passados 2,5 segundos. Não há setas, pontos nem contagens. No computador a principal deixa ver a ponta da
seguinte; no telemóvel as fotografias passam inteiras, sem cortes. Um toque abre a fotografia em grande. Quem tem «reduzir movimento» ligado
no aparelho vê-as paradas. Não se fala de casas de banho nesta parte. A fotografia principal do «Por fora» é a da água em primeiro plano com
a casa e o chapéu (a da referência), que não repete a da capa.

| Momento | Título | Texto | Fotografias e legendas |
|---|---|---|---|
| Por fora | O melhor lugar é cá fora | Da água à sombra do alpendre, o dia vive-se de portas abertas | A piscina, a casa e a luz do Alentejo · Ficar até a luz mudar · A casa, entre as árvores · E, de vez em quando, ovelhas |
| Sem pressa | A mesa pode esperar por todos | Sombra para os dias quentes, uma mesa para as conversas longas e o campo sempre por perto | O alpendre, ao fim da tarde · Lugar para todos à mesa · Dois copos e a tarde inteira · Almoçar com o campo em frente |
| Por dentro | Entrar sem deixar o exterior para trás | O salão abre-se à piscina. A cozinha, a mesa e a sala dão lugar a cozinhar, conversar e ficar mais um pouco · *Quatro quartos, lareira na biblioteca e ar condicionado em todas as divisões* | O salão, de portas abertas · À mesa cabem todos · A cozinha, pronta para mais do que oito · Livros, lareira e uma tarde inteira · Quatro quartos para descansar |

Os títulos e os textos são os da referência do Diogo, tal e qual. As legendas da referência ficaram; as outras («E, de vez em quando,
ovelhas», as do alpendre e as de dentro) são novas, para aprovar. Por baixo: «A casa: Uma casa inteira, só vossa, para abrir as portas e
deixar o dia acontecer» (nova, a partir do texto que lá estava).

Depois dos três momentos: **«Há dias em que não é preciso mais nada»** e a régua «Há mais casa para descobrir · Ver a galeria», com vinte
fotografias mais pequenas do que antes (no computador passaram de 560 para 320 píxeis de altura), numa ordem diferente em cada visita.
**O «antes e depois» saiu do site** (álbum, 44 ficheiros, código e testes); as fotografias continuam em `design/fotos/galeria/04-antes-e-depois/`.

**Fotografias disponíveis (pergunta da nota 6b):** sim, as 109 da galeria mais duas estão todas no site e podem ser usadas. A pasta do verão
(`7. Fotos/3. anuncios/V2_verão/`, 69 ficheiros, lida pelo conector a 15/11) está quase toda no repositório: **faltam a 34, a 51 e a 52** (as
duas últimas devem ser as fachadas laterais que fecham o álbum «O Monte» no Zenfolio) e uma das duas «40».

### Nota 9 · galeria como no Zenfolio e marca de água

**Feito:** «Galeria» com quatro álbuns, pela ordem do Zenfolio: **O Monte 47 · Os Quartos 12 · A Quinta 17 · Montemor-o-Novo 14** (antes o
site partia «O Monte» em dois e punha três fotografias à frente). A correspondência entre os ficheiros da galeria e os do site ficou
escrita em `demo/ferramentas/fotos/site-albuns.tsv`. No Zenfolio «O Monte» tem 49: faltam as duas fachadas (acima).
**Marca de água: é possível.** Fica gravada na própria imagem, com o logótipo do Monte. Três amostras para escolher, em
`docs/fotografia/2026-11-15_marca_de_agua/` (`comparacao.jpg` mostra as três em duas fotografias): **canto** (pequena, em baixo à direita;
identifica, mas corta-se), **centro** (translúcida a meio, como nas galerias de fotógrafos; não se corta sem estragar a fotografia),
**repetida** (leve, por toda a imagem; a que mais protege). Ferramenta: `demo/ferramentas/fotos/marca_de_agua.py`. **Não foi aplicada:**
espera a escolha. Uma coisa a saber: com o repositório público, as fotografias limpas estão à vista de todos em `design/fotos/galeria/` e
em `site/fotos/`; a marca só protege a sério com o repositório privado.

### Nota 10 · «Perguntas frequentes» passa a «Antes de chegar»

Título: **Antes de chegar · Para se sentirem em casa** (duas colunas, como na referência). No menu de cima, antes de «Avaliações».

| Pergunta | Resposta (para aprovar) | De onde vem |
|---|---|---|
| A casa é só para nós? | Sim. A estadia é sempre de casa inteira: até oito pessoas, quatro quartos e a piscina de 10 × 5 m só para o vosso grupo. | referência, encurtada |
| Como estão distribuídos os quartos? | Dois quartos de casal e dois twin. Se preferirem, um dos twin passa a casal e a casa fica com três quartos de casal e um twin. Há duas casas de banho, uma delas privativa, e ainda um WC social. | referência + as duas notas do Diogo (WC social; twin que passa a casal) |
| Podemos ir no inverno? | Podem, e vale a pena: há ar condicionado em todas as divisões e lareira na biblioteca. | referência |
| A que horas podemos chegar? | A entrada é a partir das 16h e a saída até às 11h. Quando ninguém entra no mesmo dia, a saída pode ficar para as 17h/18h, para aproveitarem o dia até ao fim. O Diogo envia as indicações de chegada antes da estadia. | referência + a nota do Diogo (saída tardia) |
| Qual é a estadia mínima? | Duas noites, quase todo o ano. De 18 de julho a 31 de agosto, sete noites, de sábado a sábado. | a que havia («mantém») |
| Os animais também podem vir? | Podem, são bem-vindos. Digam-nos só quem vem, para deixarmos tudo combinado. | a que havia, na linguagem das outras |
| Como podemos pedir as nossas datas? | Escolham as datas no calendário e falem connosco por WhatsApp ou email. O pedido só fica confirmado depois de falarem com o Diogo. | referência |

Saíram a limpeza, o pagamento e as plataformas (pedido do Diogo). As mesmas sete perguntas vão nos dados estruturados (`FAQPage`).

### Notas 11a, 11b e 12 · Montemor-o-Novo, Nacional 2 e localização

| Bloco | Texto (para aprovar) | Ligação |
|---|---|---|
| Montemor | **A 1 h de Lisboa · Montemor-o-Novo também é a estadia** · Subir ao castelo, descobrir as ruas e escolher onde parar à mesa. A casa fica a 3 km do centro e Évora a 25 minutos | «Passear por Montemor» → `visitmontemornovo.com` |
| Ecopista | A Ecopista do Montado passa à nossa porta: a antiga linha de comboio, hoje caminho entre sobreiros, para fazer a pé ou de bicicleta | «Conhecer a ecopista» → página das Infraestruturas de Portugal |
| Nacional 2 | **Nacional 2 · No caminho, uma casa · Dois dias no coração do Alentejo** · Na viagem pela Nacional 2, façam de Montemor uma pausa de duas noites. Um dia para a vila, outro para Évora, e a mesma casa à vossa espera ao fim do dia | «Montemor-o-Novo na Rota da N2» → `rotan2.pt/entity/219` |
| Programa | **Sexta** · Chegar, abrir as portas e deixar a estrada lá fora · **Sábado** · O mercado de manhã, a subida ao castelo e o fim da tarde entre a piscina e o alpendre · **Domingo** · Évora a 25 minutos e, se ninguém entrar a seguir, a casa é vossa até ao fim da tarde · *Estadia mínima de duas noites. No verão, de sábado a sábado* | — |
| Onde estamos | As cinco distâncias, como estavam · «Abrir no Google Maps» | a ficha «Monte Casa Branca» (procura pelo nome, centrada nas coordenadas) |

As fotografias de Montemor rolam na própria secção (dez, com legendas curtas: «O castelo, lá no alto», «A vila, vista da muralha», «Ruas de
cal e barras azuis», «De bicicleta, à sombra», «Branco, azul e azulejo», «A antiga estação do Paião, na ecopista», «Uma porta para a
planície», «Janelas com flores», «O montado, logo ali», «Parar no miradouro»). Ficaram de fora do rolo as duas com pessoas (a senhora no
banco e a criança no baloiço), que continuam no álbum da galeria até o Diogo decidir.
**O programa de duas noites é nosso** (pedido do Diogo: castelo e mercado de sábado de manhã); o domingo usa o argumento da saída tardia.
**Ecopista, o melhor sítio encontrado:** `https://www.infraestruturasdeportugal.pt/pt-pt/node/66` (a entidade que gere as ecopistas:
descrição, fotografias e o percurso para descarregar; 12,7 km entre Montemor-o-Novo e Torre da Gadanha). A sessão não consegue abrir a
página (rede), só a encontrou por pesquisa: **o Diogo confirma por olho**. Numa das pesquisas aparece um comentário, sem data, a dizer que
a ecopista esteve fechada por segurança: confirmar que está aberta.

### Nota 13 · avaliações: ligeireza, várias mensagens

**De onde veio a que lá estava:** do Canva do Diogo («Feedback · monte casa branca», registado no FACTOS a 8/10); ninguém abriu o Airbnb nem o
Booking. **Feito:** secção «Quem já ficou» com uma frase curta de cada vez, em letra grande, a mudar de 6 em 6 segundos (um toque passa à
seguinte); por baixo, «Opinião no Airbnb · julho de 2026». Sem nomes nem fotografias. Escolha pelas regras do Diogo (pormenores, mais
recentes do que antigas, as de fora se forem relevantes), das 30 que ele deu (Booking 5, Airbnb 21, Vrbo 4):

| Frase | Origem | Nota |
|---|---|---|
| Rodeada por ovelhas, com um pôr do sol magnífico | Airbnb · julho de 2026 | de fora (Canadá); tradução do Airbnb |
| Cozinha ultra moderna muito bem equipada, camas muito confortáveis também | Booking · setembro de 2026 | tal e qual (só a ortografia) |
| Uma casa moderna, rodeada por uma quinta. Foi perfeito | Airbnb · julho de 2024 | de fora (EUA); tradução do Airbnb, passada a português de Portugal («fazenda» → «quinta») |
| A casa foi decorada com grande atenção aos detalhes e está muito bem equipada | Airbnb · abril de 2023 | a da referência do Diogo; tradução |
| Os bebés também tiveram todo o conforto necessário | Booking · março de 2024 | tal e qual |
| Excelente design moderno em combinação com a antiga arquitetura alentejana | Airbnb · maio de 2024 | tal e qual |
| Foi nosso melhor Natal | Airbnb · dezembro de 2023 | tal e qual; fala do inverno |
| O campo aqui é tão bonito. Vamos voltar de certeza | Vrbo · janeiro de 2024 | de fora; traduzida do inglês original |
| A casa superou as nossas expectativas e as fotografias | Airbnb · outubro de 2023 | de fora (EUA); tradução do Airbnb |
| A piscina é maravilhosa e apanha sol até ao final da tarde | Vrbo · agosto de 2022 | tal e qual; é de 2022, ficou pelo pormenor |

Rodapé: «Recebemos hóspedes desde 2022 · Airbnb · Booking · Vrbo» (como estava). As notas das plataformas (10 no Booking com 11
comentários; 5,0 no Google com 21 críticas) **não foram postas**: espera a decisão do Diogo. Quando a app tiver a porta #192, as avaliações
que ele marcar «citar no site» juntam-se sozinhas a esta roda (as curtas).

### Nota 14 · contactos · Nota 15 · barra flutuante

| Antes | Agora |
|---|---|
| Venham conhecer a casa, falem connosco · Contem-nos as vossas datas e como gostam de viajar. Respondemos por WhatsApp ou por email, sem formulários nem esperas | **Falamos?** · **Contem-nos os vossos planos** · Falem com o Diogo sobre as vossas datas, por WhatsApp ou email |
| Rodapé: nome, morada completa, registo, ©, plataformas | **Monte Casa Branca · Montemor-o-Novo · Alentejo · Registo 126450/AL** e, por baixo, em letra muito pequena, a firma, a morada e as três plataformas |

Os três ícones (WhatsApp, email, Instagram) e o símbolo do Monte ficaram como estavam. A linha pequena com a firma e a morada ficou porque
um site que vende tem de identificar a empresa e porque é o único sítio da página com a morada completa; se o Diogo a quiser tirar, sai.
A barra de baixo (Menu · Contacto · Verificar disponibilidade) não mudou (nota 15: «ok, manter»).

### Nota 17 e o estudo do simulador (PDF) · «Verificar disponibilidade»

| Onde | Antes | Agora |
|---|---|---|
| Cabeça | Disponibilidade · As vossas datas | **Os vossos dias** · **Quando vos apetece vir?** · Juntem as pessoas de quem gostam e escolham os dias. Das contas tratamos nós |
| Calendário | Datas indicativamente livres · confirmamos no pedido | O calendário mostra o que está livre hoje · o Diogo confirma no pedido |
| Simulador | Simulem a estadia · Entrada · Saída · Pessoas | **As contas, sem surpresas** · Chegada · Partida · Quantas pessoas vêm? · A casa é só vossa, venham dois ou oito |
| Conta | «3 noites × 330 € + limpeza 180 € = 1 170 €» | Três linhas: **Estadia · 3 noites** (330 € por noite) 990 € · **Limpeza final · uma vez por estadia** 180 € · **Total da casa** 1 170 € · *Quatro quartos, piscina e a casa inteira só para o vosso grupo* |
| Saída | Saída ao domingo: podem ficar até ao pôr do sol (17h19)*, a combinar, quando não há entrada nesse dia | No dia da saída, se ninguém entrar a seguir, podem ficar até às 17h/18h e aproveitar o dia até ao fim (sem pôr do sol; não aparece quando o calendário mostra uma entrada nesse dia) |
| Nota | A disponibilidade e o valor final são confirmados connosco, por mensagem | Sem reserva automática e sem pagamentos aqui: o Diogo confirma as datas e o valor |
| Pedido | Pedir estas datas | **Gostam destas datas? Falem com o Diogo** · botão «Pedir estas datas» · WhatsApp · Email |
| Tempo | Tempo em Montemor-o-Novo, com desenhos de telemóvel | **O tempo no Monte**, com os ícones de traço do Lovable; sem datas: «Os próximos dias»; com datas: o tempo desses dias |

**O tempo para as datas pedidas:** se a previsão já lá chega (16 dias), mostra a previsão: «Previsão para os vossos dias». Se não chega,
mostra a média dos últimos cinco anos nesses mesmos dias (mais apagada): **«Ainda é cedo para previsões. Nos últimos anos, estes dias
foram assim»**. Se chega a uns e não a outros: «Previsão para os primeiros dias. Para os outros ainda é cedo: mostramos como costumam
ser». As médias vêm do arquivo do Open-Meteo, pedidas pelo servidor uma vez por mês e guardadas; se o serviço falhar, o bloco some.
**«Pedir estas datas» vai direto à app?** Ainda não: hoje o pedido fica anotado no servidor do site e segue por email para o `geral@`.
Passa a entrar na app, como pré-reserva por confirmar, quando existir a porta #191 (sessão APP) e a chave `SITE_CHAVE`.
**«Tarifas de 2028»:** o site conhece as de 2026 e 2027 (as mesmas da app); para datas de 2028 faz a conta com a de 2027 e diz que é
estimativa. O exemplo do estudo (990 € + 180 €) é a tabela de 2027. Por esclarecer com o Diogo.

## 3. O que está por confirmar pelo Diogo

1. **Capa:** 1, 2 ou 3 (ver no ensaio com `?capa=`).
2. **Menu:** a ideia mantém-se (nota 6a)? E a ordem da página igual à do menu de cima?
3. **Saída tardia:** «17h/18h» como está, ou uma só hora?
4. **«Tarifas de 2028»:** o que queria dizer (hoje há 2026 e 2027).
5. **Mapa:** a ligação de «Partilhar» da ficha «Monte Casa Branca» no Google Maps (no PC: abrir a ficha → Partilhar → Copiar ligação).
6. **Ligações a ver por olho no PC:** a da ecopista (Infraestruturas de Portugal) e a da N2 (`rotan2.pt/entity/219`).
7. **Avaliações:** as dez frases; se quer as notas das plataformas (10 no Booking, 5,0 no Google); os originais das quatro traduzidas pelo
   Airbnb («Exibir original»), para a tradução ser nossa.
8. **Marca de água:** canto, centro ou repetida; e em que fotografias (só na galeria, ou também na capa e nos três momentos).
9. **«Não precisamos tocar no nome banhos ou casa de banho»:** li como «nos três momentos não é preciso falar delas»; as casas de banho
   aparecem só em «Antes de chegar» e na galeria.
10. **Fotografias em falta da pasta do verão** (34, 51, 52): trago-as para fechar «O Monte» com 49, como no Zenfolio?
11. **Textos novos** assinalados acima «para aprovar».

## 4. Verificação

`bash demo/ferramentas/site/testar-site.sh`: sintaxe de 21 ficheiros PHP e do JavaScript; 92 fotografias referidas, todas existem e todas
são usadas; página a 390 e 1280 píxeis, com a app de ensaio e sem app: sem erros de JavaScript, sem rolagem horizontal, sem avisos PHP;
ligações internas sem «#» no endereço; as fotografias do primeiro momento rolam e abrem em grande; a frase de quem já ficou muda; a conta
(1 160 € com a app; fluxo do preço atualizado); o tempo de uma estadia distante mostra as médias com a nota; o estudo da capa só aparece no
ensaio. O que não se conseguiu ver daqui: o Open-Meteo a sério (a rede da sessão não o deixa; no servidor a previsão já funciona desde
8/11; as médias dos anos anteriores estreiam-se no próximo deploy) e as três ligações para fora.

**No GitHub (15/11, 19h20 UTC):** commit `ffd0ecf`; «Capturas» n.º 36 verde (os dois trabalhos); **ensaio a seco do deploy n.º 9**
(`destino` novo, `dry_run`; nada enviado): face ao que está no servidor (commit `17198b1`, de 8/11) mudam 16 ficheiros, entram 63 (32 da
Quinta, 28 de Montemor e três partes da página) e saem 18 (as partes antigas, as quatro miniaturas do «antes e depois» que lá estavam, as
repetidas e as duas pequenas); 41,6 MB no total. O envio a sério espera o «Lança» do Diogo.

## 5. Respostas do Diogo na noite de 15/11 e o que mudou

O Diogo respondeu às perguntas que o Claude lhe fez na conversa (a numeração é a da resposta dele) e fez um pedido novo. Tudo em
`main`, como rascunho; nada foi para o servidor.

| Pergunta | Resposta do Diogo | O que se fez |
|---|---|---|
| 1 · Capa | «no "novo" live consigo ver as 3 opções para escolher depois?» | Sim: depois do «Lança», `novo.montecasabranca.pt/?capa=1`, `?capa=2` e `?capa=3`, com três botões no cimo para trocar. Fica a 1 até ele escolher |
| 2 · Menu | «qual é a tua sugestão nisto? acho que não entrou mais nada ou fomos atualizando ao longo do processo, não foi?» | Confirmado: o menu foi sendo atualizado (notas 3, 4, 5, 10 e 16, e o nome novo da galeria). Recomendação do Claude: não mexer mais até ver a V2 ao vivo; nessa altura, ver se «Passear pelo Monte» deve subir para logo a seguir à casa |
| 3 · Saída tardia | «18h» | `inc/factos.php` → `saida_tardia` = «18h»: vale para «Antes de chegar», para o painel das datas e para o `llms.txt` |
| 4 · «Tarifas de 2028» | «sim era erro. queria dizer 2027» | Nada a mudar: o site tem 2026 e 2027 |
| 5 · Marca de água | «não coloque. não é prática corrente, pois não?» | Não se aplica. Não é prática corrente em sites de casas de férias (as plataformas também não a usam). A ferramenta e as amostras saíram do repositório mais tarde, na mesma noite («marca de água: retiramos») |
| 6 · Avaliações | «sim, podes fazer uma infografia ligeira com essas 3 notas: booking, airbnb e google» | As dez frases ficam. Por baixo, três anéis finos: **Booking 10** (11 comentários) · **Airbnb 4,95** (21 avaliações) · **Google 5,0** (21 críticas), sem ligações (ver a nota de baixo). Rodapé «Recebemos hóspedes desde 2022 · notas de novembro de 2026». Fora dos dados estruturados. A nota do Airbnb era a média das 21 avaliações que ele enviou; **ele confirmou-a na mesma noite** |
| 7 · Fotografias 34, 51 e 52 | «sim mas antes mostra as fotos desses números que não sei quais são» | Trazidas do Dropbox pelo workflow (corrida n.º 10) para `design/fotos/galeria/06-verao-por-decidir/`, com a `40.0` e a `4`, e mostradas ao Diogo (`docs/fotografia/2026-11-15_pasta_do_verao/`). A 51 e a 52 são as duas fachadas que faltavam ao álbum «O Monte» do Zenfolio; a 34 é a casa ao longe, vista do campo; a 40.0 e a 4 são quase iguais a duas que já estão no site. **Não entraram no site: esperam a palavra dele** |
| 8 · Casas de banho | «isso, casas de banho não fazer parte desta mensagem. nem das fotos de destaque. só na galeria» | Saiu a fotografia da casa de banho da régua (ficam 19). Nos três momentos e na capa não havia nenhuma. Continuam na galeria e na resposta sobre os quartos de «Antes de chegar» |
| 9 · Nome da galeria | «no menu, na secção das fotos/galeria vamos passar a chamar "passear pelo monte"» | «Passear pelo Monte» no menu de cima, no menu completo, no título da secção e na ligação da régua. Para não haver dois «Passear…» parecidos, a ligação de Montemor passou de «Passear por Montemor» a «Visitar Montemor-o-Novo» |

**Pedido novo: registar as versões que vão para o `novo.`** («para sabermos onde fomos melhores. Eu quero poder dizer que quero manter X
parte da versão anterior»). Feito em `docs/versoes/`:
- **`REGISTO.md`**: como se usa, os nomes das doze partes da página e onde está cada uma no código, e a ficha de cada versão (o que mudou
  em cada parte e o que o Diogo achou). **V1** = a que está no ar desde 8/11 (commit `17198b1`); **V2** = este rascunho.
- **`v1/` e `v2/`**: cada versão fotografada parte a parte, no computador e no telemóvel, como está no ensaio (sem as portas da app).
- **O número à vista:** no fundo da página do ensaio, «Ensaio · versão 2 · 15/11/2026» (`site/versao.json`); o site a sério não o mostra.
- **Ferramentas** (`demo/ferramentas/site/versao/`): `fotografar.sh <N> [ref]` e `comparar.py <A> <B> [--pdf …]` (duas versões lado a lado).
- **O deploy** pára se a versão não tiver número e ficha, ou se o número já tiver sido publicado com outro conteúdo; no fim de um envio a
  sério cria a etiqueta `novo-v<N>`. A etiqueta da V1 cria-se pelo workflow «Etiqueta de versão do site» (a sessão não envia etiquetas).

**Mais tarde, na mesma noite (22h, com a captura da aplicação de anfitrião do Airbnb: «21 avaliações · 4,95»):** «Airbnb está certo.
Mas não quero links para as plataformas. Só notas da avaliação.» Feito: a nota do Airbnb fica confirmada; os três anéis deixaram de
ser ligações (são só as notas); e saíram do rodapé as três ligações pequenas para o Airbnb, o Booking e o Vrbo, que vinham da V1 (a
página deixa de ter qualquer ligação para as plataformas; um teste falha se voltar a aparecer alguma). O que não se vê continua: os
dados estruturados dizem aos motores de busca que os três anúncios são da mesma casa (`sameAs`), e o `llms.txt` diz que também se pode
reservar por eles. O Instagram, o WhatsApp, o email, o mapa, o Visit Montemor, a ecopista e a Rota da N2 não são plataformas e ficam.
**E logo a seguir:** «Não precisas dizer o número de avaliações.» Saiu a linha de baixo de cada nota («11 comentários», «21
avaliações», «21 críticas»): cada anel mostra só a nota, a escala («em 10», «em 5») e o nome da plataforma.

**Às 23h, depois de ver o PDF «V1 ao lado da V2» e as folhas da tarde, o Diogo deixou mais sete notas** (e a pergunta «se as fotos
que me deste são o que vem na V2 podes alterar; se preferires que veja ao vivo antes, diz»: respondido que sim, são a V2, e que as
alterações se faziam já, para ele ver tudo de uma vez):

| Nota do Diogo | O que se fez |
|---|---|
| «capa: 1» · «capa telemóvel: 1» | A capa 1 fica (fotografia 1, título no céu, quase sem máscara), nos dois aparelhos. O estudo saiu: sem opções 2 e 3 e sem botões |
| «por fora…: não sei o que estás a pensar mas esta mensagem é forte. deveria ficar mais visível e enquadrável no ecrã com alguma estilização» | **O cartaz** («A casa») ocupa um ecrã, com as três palavras em degraus também no telemóvel, a entrar uma a seguir à outra. **Cada momento ocupa um ecrã** e abre com a sua palavra em grande, no desenho do cartaz («Por fora» sobre a fotografia, «Sem pressa» em itálico e na cor da casa, «Por dentro»), com «1 / 3» e um traço por cima; a frase que era o título («O melhor lugar é cá fora», «A mesa pode esperar por todos», «Entrar sem deixar o exterior para trás») passa para baixo da palavra. No telemóvel a ordem é palavra, fotografias, frase e texto |
| «contactos e rodapé: retirar airbnb, vrbo, booking» | Já estava feito às 22h (a captura dele era do PDF, anterior) |
| «mobile: não se chama galeria» | Já dizia «Passear pelo Monte» (a captura era das folhas da tarde); confirmado que não sobra «Galeria» à vista em lado nenhum |
| «disponibilidade: tenta redimensionar esta secção no mobile. as pessoas não querem ver um ecrã inteiro com 3 botões e 4 caixas de texto. rearranja para poder ficar mais leve» | No telemóvel o pedido abre só com o nome e o email; o telefone e a mensagem (opcionais) abrem com um toque em «Juntar telefone ou mensagem»; «Pedir estas datas» a toda a largura e o WhatsApp e o Email lado a lado, mais baixos; menos espaço entre as coisas. O bloco passou de cerca de 560 para 323 píxeis de altura. No computador fica como estava |
| «marca de água: retiramos» | A ferramenta e as sete amostras saíram do repositório |

Folhas para ele ver como ficou: `docs/integracao-app/revisao-2026-11-15/7-a-mensagem-computador.jpg`, `8-a-mensagem-telemovel.jpg` e
`9-pedido-de-datas-telemovel.jpg`. Sem JavaScript a página passa a mostrar-se inteira (uma linha de `<noscript>` no cabeçalho).

**Continua por confirmar pelo Diogo:** se a 34, a 51 e a 52 entram na galeria (e a 40.0 e a 4) ·
a ligação de «Partilhar» da ficha do Google Maps · ver por olho as ligações da ecopista e da N2 · os originais das quatro frases traduzidas
pelo Airbnb · os textos novos.
