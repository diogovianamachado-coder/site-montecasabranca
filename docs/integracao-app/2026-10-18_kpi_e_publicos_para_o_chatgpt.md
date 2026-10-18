# KPI da app e públicos-alvo · documento de trabalho para o ChatGPT (18/10/2026)

**O que é:** a pedido do Diogo (18/10), o Claude juntou num só sítio tudo o que a app `appmontecasabranca` e os seus documentos
têm sobre KPI, procura, canais e hóspedes, para o ChatGPT desenhar e escrever sobre informação válida e não sobre suposições.
Responde também ao pendente que o ChatGPT registou a 17/10 («um resumo agregado dos KPI por ano, sem dados pessoais»).

**Como ler:** cada número traz a fonte e a data. Há três tipos de informação:
- **DADO** · número real, calculado a partir do repositório da app (sem nomes, sem contactos, sem dados pessoais).
- **REGRA** · como a app define e calcula cada KPI (o código `lib/kpi.php`); vale como definição oficial.
- **DECLARAÇÃO** · o que o Diogo disse (brief de 16/10, `FACTOS.md`); vale como orientação até ser medido.

**Limites, para não haver equívocos:**
1. Os KPI vivos (ocupação, RevPAR, ADR, antecedência, distritos, fim de semana vs semana…) calculam-se na app a partir da base de
   dados de produção. **Essa base não está no GitHub.** O que aqui está é o último retrato que o repositório guarda (o corte
   Excel → app de 21/8/2026) e as definições. A secção 7 diz o que falta e como se obtém.
2. **Nada deste documento é facto para o site.** Para o HTML valem só as linhas ✓ do `docs/conteudos/fontes/FACTOS.md`.
   Os números internos (faturação, canais, repetentes) são para decidir, nunca para publicar.
3. **O site não lê os KPI** e não deve ler: não há porta para isso e são do Diogo (acordo v1.2; brief 16/10, 7.5).
4. **Sem dados pessoais.** Os agregados foram calculados sem nomes; nenhum nome, email, telefone ou NIF pode entrar em
   `docs/`, em `design/` ou na demo.

---

## 1. O negócio em números · retrato a 21/8/2026 (DADO)

Fonte: `appmontecasabranca/importador/LEIA-ME.txt` e `relatorio_corte.md` (o corte do Excel `Controlo_Reservas_7.xlsx` para a app,
executado a 21/8/2026: 133 reservas, 507 hóspedes). Agregados por canal, dimensão do grupo e repetentes calculados pelo Claude a
18/10 sobre esse relatório, sem nomes. Ano = ano do check-in; o ano é atribuído pela ordem do relatório, pelo que as contagens
por ano podem oscilar ±1 na fronteira entre anos.

### 1.1 Reservas e faturação por ano

| Ano | Reservas | Canceladas | Uso próprio | Vendidas | Faturado c/ IVA (ano de emissão) |
|---|---:|---:|---:|---:|---:|
| 2022 | 11 | 1 | 0 | 10 | 14 263 € |
| 2023 | 33 | 3 | 0 | 30 | 41 685 € |
| 2024 | 42 | 4 | 0 | 38 | 44 964 € |
| 2025 | 27 | 1 | 2 | 24 | 39 671 € |
| 2026 (até 21/8; inclui entradas até out) | 20 | 0 | 1 | 19 | 31 318 € |
| **Total** | **133** | **9** | **3** | **121** | — |

**CONFIDENCIAL:** a faturação é informação interna da Ângulos Castiços, Lda. Nunca entra no site, em capturas partilháveis ou em textos.
Serve só para o ChatGPT perceber a escala: uma casa, 20 a 40 estadias por ano, 40 a 45 mil euros por ano em velocidade de cruzeiro.

### 1.2 Canal das reservas vendidas (pelo código da reserva)

Regra de leitura dos códigos: `AAAA_NN` = direta · `HM…` = Airbnb · número de 10 dígitos = Booking · `HA-…` = Vrbo/HomeAway.

| Ano | Vendidas | Direto | Airbnb | Booking | Vrbo |
|---|---:|---:|---:|---:|---:|
| 2022 | 10 | 1 (10 %) | 5 | 1 | 3 |
| 2023 | 30 | 17 (57 %) | 6 | 6 | 1 |
| 2024 | 38 | 21 (55 %) | 9 | 7 | 1 |
| 2025 | 24 | 17 (71 %) | 3 | 4 | 0 |
| 2026 (até 21/8) | 19 | 14 (74 %) | 2 | 3 | 0 |
| **Total** | **121** | **70 (58 %)** | **25** | **21** | **5** |

Nota: isto conta **reservas**. O KPI «Direto vs plataformas» da app conta **noites**, e as reservas diretas são maiores e mais longas
(ver 1.3), por isso a percentagem em noites é mais alta do que esta. A declaração do Diogo de 8/10 («as diretas já são mais de 80 %»)
é coerente com 2025–2026 medidos em noites; o número exato está na app (secção 7).

### 1.3 Quem vem · dimensão do grupo e crianças

«Pax» = pessoas declaradas (a ficha de hóspedes manda sobre o Excel). As 8 camas são o limite comercial; os registos com 9 ou mais
pessoas correspondem a crianças e bebés declarados na ficha além das 8 camas.

| Ano | Reservas | Média de pessoas | Mediana | 1–4 pessoas | 5–7 | 8 | 9 ou mais |
|---|---:|---:|---:|---:|---:|---:|---:|
| 2022 | 10 | 7,3 | 8 | 1 | 1 | 8 | 0 |
| 2023 | 30 | 7,8 | 8 | 4 | 6 | 12 | 8 |
| 2024 | 38 | 7,2 | 8 | 4 | 14 | 15 | 5 |
| 2025 | 24 | 7,8 | 8 | 4 | 3 | 10 | 7 |
| 2026 (até 21/8) | 19 | 7,5 | 8 | 1 | 7 | 7 | 4 |
| **Total** | **121** | **7,5** | **8** | **14 (12 %)** | **31 (26 %)** | **52 (43 %)** | **24 (20 %)** |

Por canal (todos os anos):

| Canal | Reservas | Média de pessoas | Grupos de 8 ou mais | Grupos até 4 | Com crianças |
|---|---:|---:|---:|---:|---:|
| Direto | 70 | 8,3 | 74 % | 10 % | **66 %** |
| Airbnb | 25 | 6,8 | 56 % | 12 % | sem dado |
| Booking | 21 | 6,1 | 33 % | 19 % | sem dado |
| Vrbo | 5 | 7,0 | 60 % | 0 % | sem dado |

- **Crianças:** nas reservas diretas (as que têm ficha preenchida) **dois terços trazem crianças** (2023 82 % · 2024 52 % · 2025 76 % ·
  2026 57 %). No total registado há 126 crianças para 786 adultos. Nas plataformas a ficha quase nunca foi preenchida antes da app,
  por isso o «0 crianças» desses canais **não é um dado**: é ausência de registo.
- **Leitura:** a casa vende-se como **casa inteira para 8** (63 % das reservas têm 8 ou mais pessoas). Os grupos pequenos (até 4) são
  12 % e vêm sobretudo das plataformas. O direto é família alargada ou grupo de amigos com filhos.

### 1.4 Hóspedes que voltam

Ligação pelo nome (primeiro e último), só para contar; nenhum nome sai daqui.

- **12 grupos com 2 ou mais estadias** (7 com duas, 3 com três, 1 com quatro, 1 com cinco), responsáveis por **32 das 121 estadias (26 %)**.
- Dessas 32 estadias repetidas, **25 foram diretas**, 4 Booking, 3 Airbnb: quem volta, volta pelo direto.
- Peso das reservas de quem já cá tinha estado: 2023 3 % · 2024 13 % · 2025 25 % · **2026 42 %** (até 21/8).
- A app mede isto com mais rigor (NIF, email, telefone, marcação manual `repetente_de`) no KPI «Hóspedes que mais voltam».

### 1.5 Procura fora da app (DADO, fontes do `FACTOS.md` §8 e §9)

- **Linktree, 16 300 cliques acumulados** (capturas do Diogo, 8/10; sem datas, plano grátis): Booking 36 % · **WhatsApp direto 28 %** ·
  galeria de fotos 17 % · Airbnb 12 % · formulário de informações 6 % · Vrbo 0,3 %. Mais de um terço de quem chega quer falar
  diretamente (WhatsApp + formulário = 5 634 cliques). A galeria tem mais cliques do que o Airbnb: as pessoas querem ver a casa.
- **Perfil da Empresa no Google «Monte Casa Branca»** (relatórios mensais do Google): vistas em 2026, jan 86 · fev 44 · mar 83 ·
  abr 97 · mai 98 · jun 108 · jul 85 · ago 141 · set 93 (dez/2025: 114). Linha de base para medir o site.
- **Instagram @monte_casa_branca:** a origem assumida de todo o direto novo até 2026 (regra do KPI «Origem do direto»).
- **Avaliações:** uma avaliação real do Airbnb já pronta a citar (um mês de teletrabalho; «decorada com grande atenção aos detalhes…
  adoraríamos voltar»), com assinatura por confirmar. Nota média e número de avaliações por plataforma: ✗, só o Diogo os dá.

---

## 2. Os 20 KPI da app · definições oficiais (REGRA)

Fonte: `appmontecasabranca/lib/kpi.php` (catálogo `kpiCatalogo()`, regras no cabeçalho, textos de leitura em `kpiInfo()`).
A app mostra 7 janelas à escolha no separador KPI e 1 no Cockpit; cada janela tem um «i» com objetivo, o que mostra, como ler e uma
avaliação (bom · meh · mau).

### 2.1 Regras de cálculo comuns

- **Noite vendida** = noite entre check-in e check-out de uma reserva não cancelada, sem uso próprio e sem bloqueio.
- **Dormidas (€)** = valor da fatura menos a limpeza, igual em todos os canais (a Booking é «all-in» e a limpeza vem dentro).
- **Noites disponíveis do mês** = dias do mês − uso próprio antecipado (reservado com 5 ou mais dias de antecedência) − bloqueios
  (histórico, manuais e de plataforma). Uso próprio em cima da hora conta como noite disponível não vendida.
- **Ocupação** = vendidas ÷ disponíveis · **ADR** = dormidas ÷ vendidas · **RevPAR** = dormidas ÷ disponíveis.
- **Noites órfãs** = noites livres em buracos de 1 ou 2 noites entre duas ocupações; não saem do denominador (são stock perdido).
- **Pace** = para cada dia, noites com check-in nos 180 dias seguintes, só de reservas feitas até esse dia.
- **Época baixa e média** para o KPI de fim de semana = setembro a maio (no verão vende-se sábado-a-sábado e a comparação não diz nada).
- **Épocas** para a estadia média = as da tabela de tarifas de cada ano (secção 3).

### 2.2 Catálogo

| Id | Nome | Grupo | O que mede | Como a app diz para ler |
|---|---|---|---|---|
| `faturacao` | Faturação do ano | Rendimento | Faturado acumulado por data de check-in, previsto até ao fim do ano, ano anterior como guia | Azul abaixo do ocre no mesmo dia = ano atrasado; ver se é faturação em atraso ou menos reservas |
| `revpar` | RevPAR | Rendimento | Receita por noite disponível, mês a mês, contra o ano anterior | Sobe com ocupação ou com preço; ler os dois |
| `adr` | ADR | Rendimento | Preço médio por noite vendida, mês a mês | ADR acima da tarifa privada da época = plataformas a pesar (gross-up), é normal; ADR alto com ocupação baixa não é vitória |
| `goppar` | GOPPAR e ponto de equilíbrio | Rendimento | Resultado operacional por noite disponível; noites para cobrir os custos | Custos importados do Excel no Dropbox; interno |
| `paypal` | PayPal: cobrado vs pago | Rendimento | Sobretaxa cobrada (4,25 % / 5,55 %) contra a comissão real | Interno |
| `anos` | Todos os anos sobrepostos | Rendimento | Dormidas acumuladas de cada ano na mesma régua | O degrau de julho/agosto é o verão |
| `pace` | Pace | Procura | Noites já vendidas para os próximos 180 dias, contra o mesmo dia do ano anterior | Azul abaixo do ocre em janeiro–março = o verão está a encher mais devagar; é aí que se age, não em julho |
| `captacao` | Semanas de captação | Procura | Em que semana do ano se FAZEM as reservas, pesadas pelas noites que geram | Picos repetidos de ano para ano = semanas estruturais (janeiro para o verão, setembro para o Natal) |
| `quando` | Quando reservam e para quando | Procura | Matriz mês da reserva × mês da estadia | Agosto reservado em janeiro–março = o verão decide-se no inverno; casas na diagonal = última hora |
| `anteced` | Antecedência por canal | Procura | Mediana de dias entre reservar e entrar, por canal | Direto muito à frente das plataformas = fiéis a planear cedo; as plataformas tapam as últimas semanas |
| `noites` | Noites vs ano anterior | Ocupação | Noites dormidas acumuladas, contra o ano anterior | Curva plana em época alta = semanas vazias que já não se recuperam |
| `estadia` | Estadia média por canal e época | Ocupação | Noites por reserva, por época e por canal | Verão com 7 = sáb–sáb a funcionar; época baixa com 2 = fins de semana; um mínimo de 3 pode matar procura |
| `orfas` | Noites órfãs | Ocupação | Noites livres isoladas (1 ou 2) entre duas ocupações | Uma órfã futura vale uma story e um preço de 1 noite |
| `fds` | Fim de semana vs semana | Ocupação | Ocupação e ADR de sexta/sábado contra os outros dias, lidos em set–mai | Fim de semana cheio e semana vazia é o padrão de Lisboa a 1 h; o ganho está em vender a semana a famílias e teletrabalho |
| `direto` | Direto vs plataformas | Canais | Peso das reservas diretas no total de **noites**, ano a ano | A subir ano a ano é o objetivo desde 2022; **acima de 80 % as plataformas são só vitrina** |
| `fica` | Quanto fica na plataforma | Canais | % do gasto do hóspede que a plataforma leva, por canal e ano | Airbnb ≈ 17 % em 2026 (15,5 % único a partir de 13/10/2026); Booking 19,4 % ou 24,4 %; Vrbo fee do hóspede + 8 % |
| `cancel` | Taxa de cancelamento por canal | Canais | Canceladas ÷ reservas com check-in no ano, por canal | Booking cancela mais por natureza; uma direta cancelada com sinal pago não é perda total |
| `voltam` | Hóspedes que mais voltam | Hóspedes | Grupos com 2 ou mais estadias desde o início, por noites e por euros | Os repetentes reservam direto e cedo: são a base do direto; um repetente que falha um ano merece uma mensagem, não uma promoção |
| `origem` | Origem do direto | Hóspedes | Instagram · recomendação · repetente · outro | Até 2026 assumida pela regra (repetente se já cá esteve, senão Instagram); de 2027 marcada à mão pelo Diogo |
| `distrito` | De onde vêm em Portugal | Hóspedes | Distrito pelo código postal (reserva, ficha ou fatura), desde o início | Lisboa e Setúbal a dominar é o esperado; um distrito novo = uma recomendação ou story que chegou longe |

Pendente registado no brief (7.5): quando o site estiver no ar, acrescentar «site» às origens do direto, numa sessão APP, para medir.

---

## 3. Épocas, preços e posição face às plataformas (DECISÃO fechada a 29/8; FACTOS §4)

Tarifa privada = a do site = a mais baixa de todos os canais. Por noite, casa inteira (8 pessoas), limpeza à parte, uma por estadia.

| Época 2027 | Privado/noite | Mínimo de noites |
|---|---:|---:|
| jan – 28 fev | 250 € | 2 |
| mar – 1 mai | 280 € | 2 |
| 2 – 31 mai | 330 € | 2 |
| jun – 17 jul | 390 € | 2 |
| 18 jul – 31 ago | 410 € | 7, sábado a sábado |
| set | 340 € | 2 |
| out – nov | 250 € | 2 |
| dez | 330 € | 2 |

- Limpeza 2027: **180 €** (2026: 170 €). Mensal de inverno: **4 000 € por 28 noites + limpeza** (nov–mar).
- 2026 ainda em vigor até 31/12: 250/280/330/380/405/330/250/330.
- Agosto ficou em 410 (não 435) por «pressão nas famílias repetentes»: o verão é dos repetentes.
- **Posição:** as plataformas publicam preços «grossados» para cobrir a comissão (Booking 19,4 % + Genius 10 %; Airbnb 15,5 %; Vrbo 8 % +
  taxa do viajante). Ordem de montra em todas as épocas: **Particular < Airbnb < Booking Genius < Booking sem Genius**. «O melhor preço é
  aqui» é verdade e pode dizer-se; nomear as plataformas nos textos foi decidido que não (FACTOS §0).
- Pagamento direto: 30 % para confirmar, 70 % até ao 3.º dia útil antes da entrada; transferência sem acréscimo ou PayPal com sobretaxa.
- **Cancelamento no direto: regra ainda não escrita** (FACTOS §3, ?). É a primeira pergunta de quem reserva direto; falta a resposta do Diogo.

---

## 4. Públicos-alvo · o que o Diogo declarou e o que os dados confirmam

### 4.1 Os três perfis por época (DECLARAÇÃO, brief de 16/10)

| Época | Quem | Quem paga | O que pede ao site |
|---|---|---|---|
| **Baixa (out–mar)** | Famílias em fim de semana, «escapadinhas» | 1 pagante | Preço para competir com o mercado; o domingo até ao fim do dia como argumento |
| **abr–jun e set** | Casais 25–35, primeiros filhos, amigos de adolescência que **dividem as contas** | Vários pagantes | Falar aos 1 500–2 000 € de ordenado sem formalidade, sem ser «casa de surf com cocktail» |
| **jul–ago** | 1 pagante abastado: semana de família ou **o avô que paga** para juntar a família | 1 pagante | Value for money próximo do estilo de vida deles |

Transversal: **predominância dos 45–65**, mais abastados; os 25–35 não podem sentir-se fora. **80–90 % vêm de Lisboa** (1 h).
Conceito: o oposto do «rústico»; conforto de casa de cidade, no campo. Palavras proibidas nos textos: rústico, antigo, tradicional, típico.

### 4.2 O que os dados do corte confirmam, matizam ou não medem

| Afirmação | Estado | O que diz o dado |
|---|---|---|
| A casa vende-se inteira, para 8 | **Confirmado** | 63 % das reservas com 8 ou mais pessoas; mediana 8 em todos os anos |
| Famílias com crianças | **Confirmado no direto** | 66 % das diretas trazem crianças; 126 crianças registadas |
| Casais e grupos pequenos | **Matizado** | Grupos até 4 são 12 %, sobretudo via plataformas (Booking 19 %); o direto é 8,3 pessoas em média |
| O direto é a base | **Confirmado e a crescer** | 57 % das reservas em 2023 → 74 % em 2026; em noites é mais (medir na app) |
| Repetentes fazem a casa | **Confirmado** | 26 % das estadias são de quem volta; 42 % das de 2026; 25 das 32 repetidas foram diretas |
| 80–90 % de Lisboa | **Não medido aqui** | O KPI «De onde vêm» (código postal) está na app; a app espera Lisboa e Setúbal a dominar |
| Predominância 45–65 | **Não medido** | A app não calcula idades; as fichas têm data de nascimento dos hóspedes e permitiriam um agregado por faixa etária (só adultos, só contagens), numa sessão APP se o Diogo quiser |
| Escapadinhas de fim de semana na época baixa | **Por medir** | KPI «Fim de semana vs semana» e «Estadia média» na app; a app assume 2 noites na época baixa e 7 no verão |
| O verão decide-se no inverno | **Por medir** | KPI «Quando reservam» e «Semanas de captação» na app |

Leitura de síntese para o desenho: o visitante típico do site é **quem organiza um grupo de 8** (família alargada ou amigos com filhos),
muitas vezes **já conhece a casa ou foi-lhe recomendada**, chega de **Lisboa**, decide por **WhatsApp** e quer **ver a casa** antes de
falar (galeria com mais cliques do que o Airbnb). As plataformas trazem grupos mais pequenos e sem ficha; o site é para o direto.

### 4.3 Evidência qualitativa disponível (para o tom)

- A avaliação do Airbnb citável (teletrabalho de um mês; atenção ao detalhe; «adoraríamos voltar»).
- O «na nossa casa é assim» do late check-out de domingo; «sem check-in presencial»; cozinha para mais do que 8 com copos de vinho.
- O que o Diogo detesta nos Airbnb (brief §2) escreve-se pelo positivo, nunca como lista de queixas.

---

## 5. O que os KPI dizem ao site (brief 16/10, 7.5; sem porta nova)

| KPI | O que diz ao site | Como se usa |
|---|---|---|
| Fim de semana vs semana | Ocupação e preço de sex/sáb contra os outros dias na época baixa | A oferta de fim de semana (sexta → domingo ao pôr do sol) é a primeira coisa a vender de out a mar |
| Estadia média por época | Noites por reserva em cada época | O simulador abre com 2 noites de out a jun e set, 7 em jul–ago |
| De onde vêm | Distrito pelo código postal | «A 1 hora de Lisboa» é o gancho da entrada, antes de Évora |
| Antecedência por canal | Dias entre reservar e entrar | Quantos meses de calendário o simulador mostra à partida |
| Quando reservam · Semanas de captação | Em que semanas se fazem as reservas | Quando o Diogo empurra o site (Instagram, repetentes) para encher out–mar |
| Hóspedes que voltam · Origem do direto | Repetentes e recomendação são a base do direto | Argumento para a S8 (QR em casa, página para repetentes) e para «o que dizem» |
| Noites órfãs | Noites isoladas difíceis de vender | Ideia futura: «fim de semana prolongado disponível» quando a #189 deixa 1–2 noites soltas |
| Direto vs plataformas · Pace | >80 % direto; noites vendidas a 180 dias | **A medida de sucesso do site**: pedidos diretos de outubro a maio (FACTOS §0), lida mês a mês na app |

Regras já acordadas que decorrem daqui: o preço principal é sempre o total da casa (por casal ou por noite são auxiliares, sem presumir a
composição do grupo); a saída tardia de domingo é «possível*, a combinar», nunca confirmada; texto corrido com números exatos em cada
página, FAQ como `FAQPage`, `llms.txt`, `VacationRental` completo, PT e EN.

---

## 6. Épocas em que o site tem de trabalhar mais (síntese para decidir)

- **Época alta (18 jul – 31 ago):** garantida, sáb–sáb, repetentes; o site só precisa de não atrapalhar (calendário claro, regra das 7 noites).
- **abr–jun e set:** a época do grupo que divide contas; o simulador ganha a leitura «por casal» como segunda linha.
- **out–mar:** o objetivo do site. Fim de semana com saída ao pôr do sol de domingo; famílias; preço de 250–280 €/noite + limpeza;
  mensal de inverno (teletrabalho) como oferta própria.

---

## 7. O que falta e como se obtém (lista para o Diogo)

Os números abaixo só existem na app. Duas maneiras de os trazer para aqui, sem dados pessoais:

**A. Pelo próprio Diogo (hoje):** abrir a app → KPI, escolher cada janela, abrir o «i» e tirar captura (telemóvel chega). O Claude transcreve
os agregados para a secção 8 deste documento. Janelas, por ordem de utilidade para o site:
1. **Direto vs plataformas** (% de noites por ano, 2022–2026).
2. **Estadia média por canal e época** (2025 e 2026).
3. **Fim de semana vs semana** (ocupação sex/sáb vs semana, set–mai, 2025 e 2026).
4. **De onde vêm em Portugal** (distritos, desde o início).
5. **Antecedência por canal** (mediana de dias, 2025 e 2026).
6. **Quando reservam e para quando** (matriz 2026) e **Semanas de captação**.
7. **Taxa de cancelamento por canal** e **Noites órfãs** por mês.
8. **RevPAR / ADR / ocupação** por mês (2025 e 2026), para se ver a curva do ano.

**B. Numa sessão APP, com autorização do Diogo:** o Claude escreve um relatório agregado anual (só contagens e médias, sem nomes) a partir
das funções que já existem em `lib/kpi.php`, e guarda-o em `docs/` da app, de onde passa para aqui. Pode juntar o agregado por faixa etária
dos adultos (fichas) que o brief declara mas ninguém mediu. **Nenhum código corre até o Diogo o pedir** (regra de 17/10: o Claude é monitor).

Outros ✗ e ? que travam textos (FACTOS): regra de cancelamento no direto · regra miúda dos animais · 3,2 ou 3,6 ha · Wi-Fi · nota média e
número de avaliações por plataforma · recomendações à volta (restaurantes, passeios) · autorização pública das fotografias.

---

## 8. Agregados vindos da app (a preencher quando chegarem; data e janela em cada linha)

_Vazio a 18/10/2026._

---

## 9. Regras para o ChatGPT ao usar isto

1. Para o HTML e os textos valem só os ✓ do `FACTOS.md`; este documento orienta, não publica.
2. Números internos (faturação, canais, repetentes, Linktree) nunca aparecem no site nem em pranchas partilháveis.
3. Não inventar públicos nem percentagens; onde está «por medir», fica por medir até a secção 8 ter o dado.
4. Nada de dados pessoais em `docs/`, `design/` ou na demo; os excertos de avaliações só com a autorização registada.
5. Dúvidas sobre um KPI: a definição oficial é a de `lib/kpi.php` (secção 2), não a memória de nenhum dos assistentes.

## Fontes

- `appmontecasabranca/lib/kpi.php` (catálogo, regras, textos de leitura) · `kpi.php`, `assets/kpi.js` (janelas).
- `appmontecasabranca/importador/LEIA-ME.txt` e `relatorio_corte.md` (corte de 21/8/2026; agregados calculados a 18/10 sem nomes).
- `appmontecasabranca/docs/ESTADO_DO_PROJETO_v49.md`, secção 0e (modelo de tarifas 2027, 29/8).
- `appmontecasabranca/docs/temas/site/2026-10-16_brief_diogo_conceito_perfis.md` (perfis, objetivo, 7.5).
- `site-montecasabranca/docs/conteudos/fontes/FACTOS.md` (§0, §3, §4, §7, §8, §9) — igual ao da app.
- `site-montecasabranca/docs/decisoes/2026-10-17_memoria_chatgpt.md` (pendente «resumo agregado dos KPI por ano»).
