# Brief do Diogo para o site · conceito da casa, hóspedes e objetivo (16/10/2026)

**O que é:** o enquadramento que o Diogo passou ao ChatGPT como «desafio» e colou tal e qual à sessão SITE de 16/10, para o Claude
«saber direcionar a parte técnica da construção do site e posicioná-la em complemento com a app se, quando e onde for necessário».
Os dois assistentes têm o mesmo texto. **Não altera o acordo v1.2** (o ChatGPT desenha, o Claude constrói) nem é para influenciar a
decisão de desenho: é para se perceber **porquê** e **como** o Monte foi feito, e para quem. Manda nos textos, na estrutura e nas escolhas
técnicas do Claude, a par do `FACTOS.md` e do `BRIEF_SITE.md`.

Secções 1–5: as palavras do Diogo, arrumadas por tema (frases dele, sem reescrever). Secção 6: factos novos para o `FACTOS.md`.
Secção 7: a leitura técnica do Claude (o que isto implica para o site e para as portas da app), marcada FACTO · DECISÃO · PROPOSTA · DESCONHECIDO.

---

## 1. O conceito da casa

- Queríamos que o Monte fosse **o espelho do que mais gostámos durante anos a consumir Airbnb**, e evitar e não aplicar o que nunca
  gostámos.
- O Alentejo está cheio de casas e montes em que os velhos morreram e os novos viram uma oportunidade de fazer dinheiro, mas com a casa no
  estilo velho a que chamam «antigo» ou «rústico». **O nosso conceito é o oposto a isto.**
- Se vou passar férias para uma casa de Airbnb ou AL quero, no mínimo, **o mesmo nível de conforto a que estou habituado em casa**, e não
  menos. Não faz sentido pagar por um espaço onde o conforto não está lá.
- Reconstruímos uma **casa de nível moderno, tipo cidade, com as comodidades e o conforto do dia a dia, num ambiente de campo** onde impera
  a piscina, a calma, o silêncio, o ar puro e o espaço para conviver com os amigos.
- **A casa no interior é igual a muitas casas da classe média alta.** O exterior muito simples e confortável para usufruir.
  **Ar condicionado em todas as divisões; lareira na biblioteca no inverno.**
- **Casa de 270 m², 4 quartos, 8 pessoas.**
- Investimos em **tudo novo** e alguns apontamentos pessoais: detestamos a casa impessoal, claramente «de IKEA», ou com mobília antiga e
  restos de outros lados; detestamos a cozinha com os restos que não queremos da nossa casa onde vivemos. Na nossa casa isto não acontece.
- Acreditamos que a casa **terá a sua identidade com o tempo e com o uso** que os nossos clientes fazem dela.
- Na quinta toda, de **3,2 ha**, dedicámos uma **zona à volta da casa para uso sem limites pelos hóspedes**, de onde podem acompanhar o dia a
  dia da vida numa quinta no Alentejo, onde de vez em quando **temos ovelhas a pastar**.
- **A casa recebe os animais de companhia** dos hóspedes, mesmo sabendo que isso traz desgaste acelerado à casa e ao exterior.

## 2. O que detestamos nos Airbnb e não praticamos

- Ter alguém para me dar uma chave (eu sei abrir a porta sozinho).
- A cozinha com o número de utensílios igual ao número de pessoas (4 copos, 4 garfos, 4 facas, 4 pratos).
- Não ter copos de vinho; não deixar que estejam na nossa casa como na deles.
- Lençóis velhos ou aproveitados de outras vidas; colchões velhos que são mal dormir; almofadas horríveis.
- A casa impessoal, de IKEA ou de restos; a cozinha com os restos da casa do dono.
- **Entrar sexta à noite (vimos de Lisboa) e ter de sair domingo às 11h: na prática aproveita-se um dia.** Não há vontade de pagar 600–900 €
  por um fim de semana assim. **Na nossa casa isto não acontece: queremos oferecer o máximo de experiência e permitir que fiquem até ao fim do
  dia no domingo.** 80–90 % dos clientes vêm de Lisboa, estão a 1 h de casa.

## 3. Quem nos visita (três perfis, pela época)

O poder económico de quem nos visita não pode ser, nem é, o de alguém com 500–1 000 € de ordenado. O perfil varia durante o ano e com ele
o ticket médio:

| Época | Quem | Quem paga | O que pede ao site |
|---|---|---|---|
| **Baixa (out–mar)** | Famílias em fim de semana, as «escapadinhas» | **1 pagante**, dimensão por família | Preço ajustado para **competir com o mercado** |
| **abr–jun e set** | Casais tradicionalmente jovens, com os primeiros filhos, que mantêm as ligações da adolescência e **dividem as contas** para passar um fim de semana com amigos | **Vários pagantes por estadia** | Falar aos 1 500–2 000 € de ordenado sem ser formal, mas **sem ser a casa partilhada de surf na praia com um cocktail** |
| **jul–ago** | Alguém mais abastado que paga uma semana de férias em família, ou **um avô que paga a semana para manter a família junta** | **1 pagante** | Value for money próximo do seu estilo de vida |

- O site tem de funcionar para **os dois ambientes**: os jovens trabalhadores recentes (1 500–2 000 €) e os de **45–65, mais abastados**,
  **com grande predominância nos 45–65**, que têm de sentir que pagam value for money próximo do seu estilo de vida. Os mais novos serão os
  filhos do primeiro grupo.

## 4. O objetivo do site

- Um look and feel **de que o Diogo se orgulhe de mostrar** e que **permita que mais gente nos encontre, principalmente na época baixa**
  (a época alta está garantida).
- **Ser apanhado pelas pesquisas em LLM:** quando alguém usa o ChatGPT para «encontrar alojamento em Montemor-o-Novo ou perto de Évora para
  X pessoas», a estrutura do site tem de estar preparada para isso e ter a informação necessária, **acima da média**, para a casa aparecer
  destacada.
- Os **KPI da app** (`lib/kpi.php`, anos de negócio) são úteis e **têm de ser tidos em conta ao pensar a dinâmica e o look and feel** da
  página. Acesso confirmado pelo Claude a 16/10 (código e documentos; não os dados da base).

## 5. No radar (futuro, já a pensar nele)

- **O site virar app à chegada dos clientes a casa**, com uma experiência única do que a região oferece, sabendo que, ao entrar em casa,
  dificilmente saem: usam-na para aproveitar ao máximo a casa.
- **Dicas sobre a casa:** funcionamento dos eletrodomésticos, restaurantes da zona, dicas de passeio, como usar a casa (ex.: «e se ficarem sem
  água?»), etc. A explorar no futuro, mas já no radar.

---

## 6. Factos novos para o `FACTOS.md` (passam a ✓ por este brief)

- ✓ **Casa de 270 m²** (§2 tinha «✗ área da casa, só se o Diogo quiser»).
- ✓ **Ar condicionado em todas as divisões**; **lareira na biblioteca** (§2 tinha «? AC / aquecimento»).
- ✓ **Animais de companhia bem-vindos** (§2 tinha «? animais»). A regra miúda (quantos, onde dormem, taxa) fica **?**.
- ✓ **Cozinha equipada para mais do que 8** (loiça, talheres, copos de vinho); **roupa de cama, colchões e almofadas novos**; **mobília nova**,
  com apontamentos pessoais.
- ✓ **Zona à volta da casa de uso livre pelos hóspedes**; ovelhas a pastar de vez em quando.
- ✓ **Conceito:** moderno, conforto de casa de cidade, no campo; **o oposto do «rústico»**. Mobília e textos não podem parecer «antigo».
- ✓ **Late check-out de domingo até ao fim do dia** é a razão de ser da oferta de fim de semana (já estava em §3 como «way of living»; agora
  é também argumento comercial contra o «sexta à noite → domingo às 11h»).
- ✓ **80–90 % dos hóspedes vêm de Lisboa**, a 1 h.
- **?** **Área da quinta: o brief diz 3,2 ha; a MyBestHotel (2022) e o `FACTOS.md` §2 dizem 3,6 ha.** O Diogo confirma qual vai para o site.

## 7. Leitura técnica do Claude · o que isto implica para o site e para as portas da app

**FACTO = está no repositório · DECISÃO = o Diogo já decidiu · PROPOSTA = o Claude propõe, o Diogo decide · DESCONHECIDO = falta saber.**
Nada aqui é desenho: é estrutura, conteúdo, dados e ligação à app. O look and feel é do ChatGPT (acordo v1.2).

### 7.1 Para as pesquisas em LLM («alojamento perto de Évora para 8 pessoas»)
- **FACTO:** os LLM pesquisam pelo Bing/Google e leem as páginas devolvidas (enquadramento de 2/10, `CLAUDE.md` da app). O que os faz
  escolher uma página é **texto corrido com números exatos e respostas diretas**, não imagens. O site precisa de dizer, em frases simples e
  repetidas nas páginas certas: *Monte Casa Branca · Montemor-o-Novo, Alentejo · casa inteira de 270 m² · 4 quartos · 8 pessoas · 2 casas de
  banho · piscina 10×5 · AC em todas as divisões · lareira · 3,2/3,6 ha · 1 h de Lisboa · 25 min de Évora · 3 km do centro · check-in 16h ·
  check-out 11h (domingo até ao fim do dia*) · a partir de 250 €/noite · animais bem-vindos · reserva direta sem intermediário*.
- **PROPOSTA (técnica, do Claude; entra no gerador):** um bloco «Em números» em todas as páginas (no rodapé ou na ficha técnica) com estes
  dados sempre iguais; página «Perguntas frequentes» com **schema.org `FAQPage`** (as perguntas que uma pessoa faz ao ChatGPT são as FAQ:
  «quantas pessoas», «aceita cães», «quanto custa um fim de semana em novembro», «a que distância fica de Évora», «tem piscina aquecida?»);
  `VacationRental` com `amenityFeature` completo, `numberOfRooms`, `occupancy`, `petsAllowed`, `checkinTime`/`checkoutTime`, `geo`,
  `priceRange`; `llms.txt` com o resumo e a tabela de preços em texto; `robots.txt` aberto aos robôs dos LLM (lista de 2/10). Texto em PT
  e em EN desde o primeiro dia (S7), porque as perguntas em inglês («villa near Évora for 8») são metade do alvo.
- **PROPOSTA:** uma página por pergunta provável (já decidido: A casa · Fotos · Preços e reservar · Onde fica · FAQ · Contactos), mas cada uma
  com **um primeiro parágrafo que responda sozinho** à pergunta do título, antes de qualquer widget. Os widgets (simulador, galeria) vêm
  depois do texto, nunca em vez dele.
- **DESCONHECIDO:** medir funciona como em 2/10: uma vez por mês perguntar aos três assistentes e anotar. Sem mais tecnologia.

### 7.2 O domingo até ao fim do dia (o argumento da época baixa)
- **FACTO:** a regra na app é «late check-out combinado caso a caso; ao fim de semana 17h/18h quando não há entrada no mesmo dia; quase
  sempre possível menos em julho e agosto» (`FACTOS.md` §3). O brief faz dela **a razão de ser da oferta de fim de semana**.
- **PROPOSTA (técnica):** no «Simule a sua estadia», quando a saída é ao domingo (ou sábado) e a porta **#189 `site_ocupacao.php`** disser que
  **não há entrada nesse dia**, o site mostra «saída até ao pôr do sol*» em vez de «até às 11h», com o asterisco do `FACTOS.md`. **Não precisa
  de porta nova:** a #189 já devolve os dias ocupados; basta o site olhar para o dia da saída. Quando há entrada nesse dia, mostra «até às 11h»
  e nada mais. O ChatGPT desenha como isto aparece; o Claude garante que o dado está certo.
- **PROPOSTA:** a frase do brief («entrar sexta à noite e sair domingo às 11h é aproveitar um dia; na nossa casa fica-se até ao fim do
  domingo») é texto para a página «A casa» e para as FAQ, em PT e EN. O Claude escreve-a a partir das palavras do Diogo.

### 7.3 Os três perfis e o simulador
- **FACTO:** a porta **#190 `site_tarifa.php`** devolve o `orcamento()` do canal Particular com regras (mínimo de noites, sáb–sáb no verão,
  mensal 28+) e avisos. O preço por noite e a limpeza já variam pela época; o site não inventa preços.
- **PROPOSTA (técnica):** o simulador apresenta o mesmo total de três maneiras consoante a época e a duração, só na apresentação, sem tocar na
  porta: **fim de semana de época baixa** → «total da casa para o fim de semana», comparado com nada (compete pelo preço cheio, 1 pagante);
  **abr–jun e set, 2–3 noites** → total **e «por casal»** (÷ 4) como segunda linha, porque dividem as contas; **jul–ago, 7 noites sáb–sáb** →
  total da semana e **«por noite para 8 pessoas»**, porque o pagante único compara com hotéis para a família. É a mesma conta vista de três
  lados; o ChatGPT decide se e como se mostra. O Claude só a tem de ter pronta no gerador.
- **PROPOSTA:** a mensagem pronta para o WhatsApp/email (S2) leva o perfil implícito (datas e número de pessoas); nada mais se pergunta.

### 7.4 «Conforto de casa de cidade, no campo» (o conteúdo)
- **DECISÃO (9/10 + 16/10):** os textos escreve-os o Claude; os factos vêm do `FACTOS.md`. Com este brief, a lista «o que a casa tem» passa a
  ser **concreta e sem adjetivos vagos**: AC em todas as divisões, lareira na biblioteca, cozinha SMEG equipada para mais do que 8 (copos de
  vinho incluídos), roupa de cama e colchões novos, tudo novo, Wi-Fi [? por confirmar], 270 m², zona exterior de uso livre, ovelhas.
  O que o brief **detesta** não se escreve como lista de queixas; escreve-se pelo positivo («a cozinha está equipada para uma casa cheia; os
  copos de vinho estão onde devem estar») e fica como regra do tom.
- **PROPOSTA:** a palavra «rústico» e os seus parentes («antigo», «tradicional», «típico») não entram nos textos nem nos títulos. «Moderno»,
  «conforto», «silêncio», «piscina», «campo», «Alentejo» entram. Nota para o ChatGPT no ponto de situação (secção 8).

### 7.5 O que os KPI da app dizem ao site (e como se usam sem porta)
Os KPI (`lib/kpi.php`, 21 indicadores) leem-se da app; o site **não** os lê (não há porta e não deve haver: são do Diogo). Servem para
**decidir** a dinâmica e, mais tarde, para **medir** se o site resultou. Os que importam ao site:

| KPI | O que diz ao site | Como se usa |
|---|---|---|
| **Fim de semana vs semana** (`fds`) | Ocupação e preço de sex/sáb contra os outros dias **na época baixa** | Confirma o perfil «escapadinha»; a oferta de fim de semana (sex→dom ao pôr do sol) é a primeira coisa a vender de out a mar |
| **Estadia média por canal e época** (`estadia`) | Quantas noites por reserva em cada época | O simulador abre com 2 noites de out a jun e set, 7 em jul–ago (sáb–sáb) |
| **De onde vêm em Portugal** (`distrito`) | Distrito pelo CP da ficha | Confirma «80–90 % de Lisboa»: «a 1 hora de Lisboa» é o gancho da página de entrada, antes de Évora |
| **Antecedência por canal** (`anteced`) | Dias entre reservar e entrar | Quantos meses de calendário o simulador mostra à partida (#189 por intervalo) |
| **Quando reservam e para quando** (`quando`) · **Semanas de captação** (`captacao`) | Em que semanas se fazem as reservas | Quando vale a pena o Diogo empurrar o site (Instagram, repetentes) para encher out–mar |
| **Hóspedes que mais voltam** (`voltam`) · **Origem do direto** (`origem`) | Repetentes e recomendação são a base do direto | Argumento para a S8 (QR em casa, página para repetentes) e para «o que dizem» na página |
| **Noites órfãs** (`orfas`) | Noites isoladas difíceis de vender | Ideia para depois: o site poderia mostrar «fim de semana prolongado disponível» quando a #189 deixa 1–2 noites soltas junto a um fim de semana. **Sem número, sem porta nova; fica registado** |
| **Direto vs plataformas** (`direto`) · **Pace** | >80 % direto; noites vendidas para 180 dias | A medida de sucesso do site (FACTOS §0: pedidos diretos out–mai) lê-se aqui, mês a mês, sem nada novo |

- **PROPOSTA:** nenhuma porta nova para KPI. Quando o site estiver no ar, a sessão APP pode acrescentar ao KPI «Origem do direto» o valor
  «site» (hoje: Instagram, recomendação, repetente), para se medir. É uma linha na app, com número próprio, **só depois do site no ar**.

### 7.6 A app de chegada e as dicas da casa (radar)
- **FACTO:** a app já manda, no dia da entrada, a mensagem de boas-vindas T6 por WhatsApp com o código da chave, a morada e o link do Maps;
  a ficha do hóspede tem 6 passos PT|EN; a página da Susana tem os passos de «chegar e entrar». O que o Diogo quer para «à chegada» é
  **conteúdo estático** (eletrodomésticos, água, restaurantes, passeios) **mais** o que só a app sabe (código, datas, late check-out).
- **PROPOSTA (para quando se abrir):** o guia da casa vive **no site** (estático, PT|EN, gerado pelo mesmo `gerar.py`, em `/guia/`, fora do
  `sitemap.xml` e com `noindex`: é para quem está em casa, não para o Google), e a mensagem T6 da app passa a levar o link. O que é da estadia
  (código da chave, hora de saída) continua a vir pela T6 e pela ficha; o guia não precisa de porta nem de sessão. «Virar app» = o guia
  instalável no telemóvel (manifest + ícone, como a PWA da app), sem código novo na app. Fica **sem número e sem data**; é a secção 5 do brief.
- **DESCONHECIDO:** a lista de restaurantes, dicas e «e se ficarem sem água» só o Diogo dá (é o ✗ da secção 5 do `FACTOS.md`, alargado).

### 7.8 Widget do tempo em Montemor-o-Novo (pedido do Diogo, 16/10, no fecho)
- **DECISÃO (Diogo, 16/10):** o site tem um widget com **o tempo dos próximos dias em Montemor-o-Novo** e, quando o visitante escolhe datas
  no «Simule a sua estadia», **a projeção do tempo para o período da estadia**.
- **PROPOSTA (técnica):** fonte **Open-Meteo** (`api.open-meteo.com`, gratuita, sem chave, sem registo, responde ao browser com CORS; licença
  CC-BY 4.0, exige a linha «Dados: Open-Meteo» no widget) com as coordenadas da casa (**38.6143, −8.2113**, `FACTOS.md` §2): máxima e
  mínima, probabilidade de chuva, código do tempo (sol, nuvens, chuva) e **hora do pôr do sol** por dia. **Até 16 dias à frente é previsão**;
  para datas mais longe o widget mostra **a média dos últimos anos para esses dias** (arquivo ERA5 do mesmo serviço, mesmas coordenadas),
  rotulada «média dos últimos 10 anos», nunca como previsão. Chamada feita pelo browser (o site é estático na Amen; não há servidor nosso
  a chamar ninguém); só vão as coordenadas da casa, nenhum dado do visitante. Se a chamada falhar, o widget some sem erro (melhoria progressiva:
  o texto e o simulador não dependem dele). Não entra no `llms.txt` nem no schema (é dinâmico, não é facto da casa).
- **Com o simulador:** a fila de dias do «Simule a sua estadia» ganha o tempo por dia e, na saída de domingo, o pôr do sol com hora
  («saída até ao pôr do sol, 18h42*»): é o 7.2 com número. O ChatGPT desenha o widget (página de entrada e dentro do simulador);
  o Claude liga os dados.
- **Nota ao acordo:** a conformidade (ponto 2) proíbe serviços externos **no HTML do design**, que abre do ficheiro; isto é produção, decisão
  técnica do Claude (acordo, secção 9), e fica registada aqui como o **segundo serviço externo do site**, a seguir ao Google Fonts. Se o Diogo
  preferir zero serviços externos, cai o widget, não o resto.
- **DESCONHECIDO:** nada que só o Diogo saiba; a única escolha é mostrar graus em °C só (PT e EN), que se assume.

### 7.9 Observações do ChatGPT (memória de 17/10, secção 10) · afinam o que está acima
Lidas a 17/10 em `site-montecasabranca/docs/decisoes/2026-10-17_memoria_chatgpt.md`; ainda não discutidas com o Diogo. O Claude aceita-as
como afinação, sem reabrir o acordo:
1. **7.3:** o preço principal é sempre o **total da casa**; «por casal» ou «por noite» são auxiliares, **sem presumir quatro casais** nem
   composição do grupo. Fica PROPOSTA, para o ChatGPT desenhar se quiser.
2. **7.2:** a #189 diz se há entrada no dia da saída, mas **a saída tardia continua a ser combinada**: o site escreve «possível*, a combinar»,
   nunca «confirmado»; o calendário público é indicativo.
3. **7.1:** `FAQPage`, `llms.txt` e dados estruturados **ajudam, não garantem** destaque (o Google diz que não usa o `llms.txt`); não se repetem
   blocos por variante de pesquisa; «os LLM leem texto, não imagens» é simplificação.
4. **7.1:** «EN é metade do alvo» **não está medido**; PT|EN mantém-se por decisão (S7), a proporção fica por medir.
5. **Secção 6:** 3,2 ha é a declaração atual do Diogo; os 3,6 ha dos documentos antigos reconciliam-se antes de publicar.
Também lá: o formato técnico do guia da casa (7.6: `/guia/`, `noindex`, PWA) é PROPOSTA do Claude, não decisão.

### 7.7 O que muda já, no concreto
1. Este ficheiro guardado em `docs/temas/site/`; `FACTOS.md` §2 com os factos novos (secção 6) e o **?** dos 3,2 vs 3,6 ha.
2. `SITE.md` com a entrada de 16/10 e a decisão «o brief de 16/10 manda nos textos, na estrutura e na técnica».
3. `site-montecasabranca/CLAUDE.md` com a secção curta «O Monte e quem nos visita» a apontar para aqui, para a próxima sessão SITE abrir já com
   isto; o ficheiro continua a ser a única escrita do Claude naquele repositório antes do «passa ao Claude».
4. Nada no código, nada em `design/`, nada na app.
5. 7.8 (widget do tempo) acrescentado no fecho da sessão, a pedido do Diogo.

## 8. Dez linhas para o ChatGPT (ponto de situação, 16/10, colar tal e qual)
1. O Diogo passou-nos aos dois o mesmo brief (conceito, perfis, domingo até ao fim do dia, pesquisas em LLM). O Claude guardou-o em
   `docs/temas/site/2026-10-16_brief_diogo_conceito_perfis.md` da app e tirou dele os factos novos para o `FACTOS.md`.
2. Factos novos ✓: 270 m²; AC em todas as divisões; lareira na biblioteca; animais de companhia bem-vindos; cozinha equipada para mais do que 8;
   roupa de cama e colchões novos; zona exterior de uso livre; 80–90 % dos hóspedes vêm de Lisboa.
3. Um facto por confirmar pelo Diogo: a quinta tem 3,2 ha (brief) ou 3,6 ha (MyBestHotel 2022)? Até lá, nenhum dos dois entra no HTML.
4. Tom: o oposto de «rústico»; conforto de casa de cidade, no campo. As palavras «rústico», «antigo», «tradicional», «típico» não entram.
5. Predominância dos 45–65 abastados (value for money próximo do estilo de vida deles); os 25–35 que dividem contas não podem sentir-se fora,
   mas o site não é «casa partilhada de surf com cocktail».
6. O domingo até ao fim do dia é o argumento central da época baixa (out–mar): merece lugar na página de entrada, não só nas FAQ.
7. Cada página abre com um parágrafo que responde sozinho à pergunta do título (os LLM leem texto, não widgets); os widgets vêm depois.
8. O simulador mostrará o total de três maneiras conforme a época (casa inteira · por casal · por noite para 8): desenha espaço para uma
   segunda linha de preço, pequena, por baixo do total.
9. Quando a saída é ao domingo sem entrada nesse dia, o simulador dirá «saída até ao pôr do sol*»: desenha esse estado.
10. Nada disto muda o acordo v1.2 nem a lista de conformidade; é conteúdo e estrutura, para desenhares com os factos certos.
11. (16/10, fecho) O Diogo pediu um widget do tempo em Montemor-o-Novo (próximos dias na página de entrada; dentro do simulador, o tempo
    por dia da estadia e a hora do pôr do sol no domingo). Os dados são do Claude (Open-Meteo); desenha o espaço, com a linha «Dados: Open-Meteo».
12. (17/10) **S22, aceite pelo Diogo:** medir o ponto de partida já. O Diogo pergunta esta semana aos três assistentes («casa para 8 pessoas com
    piscina perto de Évora», «alojamento em Montemor-o-Novo para 8») e as respostas ficam como linha de base, antes de o site existir. Se quiseres,
    junta as perguntas que achas que um hóspede dos três perfis faria.
13. (17/10) **S23, aceite como ideia:** a hora do pôr do sol de cada data, calculada no browser sem serviço externo, para o «saída até ao pôr do sol,
    18h42*» ter sempre hora. Nada a desenhar além do espaço para a hora ao lado do domingo; é do Claude, mais tarde.
14. (17/10) **S24, aceite pelo Diogo, é tua:** na fase 1, antes das direções, a lista das 20 perguntas que os três perfis fazem (a mãe da escapadinha,
    o casal que divide contas, o avô da semana). Viram as FAQ, o `FAQPage` e os primeiros parágrafos das páginas. Texto PT, teu pelo acordo.
15. (17/10) **Papel do Claude até novo aviso do Diogo: monitor.** Lê o que entregas, regista, e avisa só se algo contradisser o acordo v1.2, o
    contrato das portas ou os factos. Não escreve código nem propõe desenho até o Diogo dizer «começa a agir».
