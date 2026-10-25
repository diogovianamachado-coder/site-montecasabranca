# FACTOS — tudo o que o site vai dizer, linha a linha (SITE · 8/10/2026)

Para o Diogo corrigir **linha a linha**. Cada facto traz de onde veio e um estado:
**✓** está escrito no repositório (ficha, emails, CLAUDE.md, ESTADO) e o site repete-o tal e qual ·
**?** o Claude propõe ou deduz, o Diogo confirma, corrige ou risca ·
**✗** falta por completo, só o Diogo o pode dar.
Nada com **?** ou **✗** entra no site sem a resposta. Os textos finais escrevem-se depois deste ficheiro estar limpo.

---

## 0. Para que serve o site (Diogo, 8/10, 23h45) — manda em todas as escolhas

- ✓ **Encher os meses mais mortos com reservas diretas.** Já são mais de 80 % das reservas; o site é para elas: cativar mais gente,
  facilitar o contacto e a **compra por impulso** (ver a casa, ver o preço, pedir já).
- ✓ **Tem de ser mesmo apelativo e fora da caixa**, a aproveitar o melhor que temos: as fotos, a piscina, o campo, o Alentejo, a maneira
  de receber («na nossa casa é assim»).
- ✓ **Sem botões para as plataformas** (decisão 8/10): só uma linha discreta nas «Perguntas frequentes» com os três links, para quem
  preferir reservar por lá e para as avaliações.
- ✓ Medida de sucesso: pedidos diretos (WhatsApp + formulário + «Simule a sua estadia») nos meses de outubro a maio.

## 1. Identidade (igual em todo o lado: site, plataformas, Google, Instagram — ponto 5 de 2/10)

- ✓ Nome: **Monte Casa Branca** (nunca «MCB» nem «Casa Branca» sozinho).
- ✓ Firma: **Ângulos Castiços, Unipessoal Lda** · NIF **516499769** · registo **126450/AL** (rodapé da ficha, `ESTADO_DESIGN.md`).
- **? Morada: há duas grafias no repositório e o site só pode ter uma.**
  - «Fazenda **da** Casa Branca, **C**aminho 3, Reguengo, 7050-352 Montemor-o-Novo» (rodapé da ficha, caderno de textos).
  - «Fazenda Casa Branca, **c**aminho 3, Reguengo, 7050-352 Montemor-o-Novo» (mensagem de boas-vindas T6, `lib/textos.php`).
  - Proposta: a primeira (é a que está nos documentos). Confirmar também que é a morada do registo AL e do Google.
- ✓ Localidade: **Reguengo, Montemor-o-Novo** (distrito de Évora, Alentejo).
- ✓ **Decisão do Diogo (25/10/2026) sobre «Reguengo»:** é a localidade da morada postal e **só aí entra** (morada completa no
  `PostalAddress` do schema.org e, em letra pequena, nos contactos ou no rodapé, igual à do registo AL e do Google); **nunca em títulos,
  textos, URLs, legendas ou `alt`**: ninguém pesquisa por «Reguengo», e «Reguengos» é outra terra (Reguengos de Monsaraz).
  **Palavras estratégicas da zona:** Évora, Alentejo, Montemor-o-Novo, Alqueva (e «a 1 h de Lisboa»): são estas que entram nos títulos,
  nos textos, nas FAQ, no `llms.txt` e nos `alt` das fotografias.
- ✓ Domínio: **montecasabranca.pt** (com `www.` e HTTP → HTTPS, decisão de 6/10). A app fica em `app.montecasabranca.pt`.
- ✓ Email: **geral@montecasabranca.pt** (o dos emails da app).
- ✓ Telefone / WhatsApp: **+351 962 802 626** (Diogo Machado; é o que vai no T6 e no T1).
- ✓ Instagram: **@monte_casa_branca** (rodapé do T1).
- ✓ PayPal: `https://paypal.me/montecasabranca?country.x=PT&locale.x=pt_PT` (ícone «$» do Linktree). No site só depois da pré-reserva,
  junto da escolha de pagamento (não é botão público).
- ✓ Facebook: **sai** (decisão 8/10); o site não o liga.
- ✓ Google Maps: `https://goo.gl/maps/pRCGsJRovYpabtdP6` (`definicoes.link_maps`).
- ✗ Coordenadas GPS (para o schema.org e para o «Como chegar» sem depender do link curto): o ficheiro `Monte Montemor.kmz`
  está no Dropbox (`/1. DVM/1. MONTE CASA BRANCA/`); o Claude pode lê-lo se o Diogo disser que sim.
- ✗ Logótipo para o site: `docs/marca/MCBRANCA_Logo_preto.jpg` e `_branco.jpg` (JPG, fundo cheio) e `assets/logo.png` (PNG com
  transparência, 900×354). **Proposta:** o PNG; se houver um vetor (SVG/AI/PDF do designer), é melhor.

## 2. A casa

**Fonte nova (9/10, 00h08): a descrição do Monte na MyBestHotel (PT e EN), escrita pelo Diogo em 2022, lida pelas capturas em
`docs/temas/site/fontes/mybesthotel_*.png`.** Confirma e acrescenta quase tudo o que faltava:
- ✓ **Herdade de 3,6 hectares com o mesmo nome**, com **olival centenário extenso** (passeios, piquenique ao fim da tarde) e **árvores de
  fruto à disposição dos hóspedes**.
- ✓ **Remodelado recentemente** (obra 2021–2022): «o moderno funde-se com o tradicional».
- ✓ **O antigo Casão** é hoje um **salão com cozinha moderna totalmente equipada, eletrodomésticos SMEG**, zona de refeições e zona de estar
  **ligada ao exterior e à piscina**.
- ✓ **Piscina de 10 × 5 m**, «fim de dia soberbo na piscina a admirar o pôr do sol».
- ✓ **Casa Principal** («a casa dos “senhores” de antigamente, renovada para os “senhores” de hoje»): **4 quartos** = 1 quarto de casal
  **queen com casa de banho privativa** · 1 quarto de casal queen · 2 quartos com 2 camas de solteiro cada · **1 casa de banho completa**
  partilhada → **2 casas de banho** no total. **?** Confirmar que a configuração B da app (3 de casal + 1 twin) é um dos twin com as camas juntas.
- ✓ **Biblioteca com lareira**, livros, jogos de tabuleiro e cartas.
- ✓ **Na EN2**, «a mítica estrada que atravessa Portugal de norte a sul», **a 3 km do centro de Montemor-o-Novo**.
- ✓ **Coordenadas GPS: 38.6142917, −8.211253** (a pergunta do kmz está respondida).
- ✓ Distâncias (as do texto de 2022): **Évora 25 min · Lisboa 1 h · Comporta (praia) 50 min · Alqueva 1 h · Badajoz 1 h 20**; «golfe na costa
  vicentina 50 min» — **?** parece otimista para a costa vicentina; proposta: dizer «golfe a 50 min» sem nomear a costa, ou confirmar o campo.
- ✓ Email antigo nessa página: anguloscasticos@gmail.com → o site usa só `geral@montecasabranca.pt`. «Desde 200 €» é de 2022: não se repete.
- ✓ A página da MyBestHotel **ainda está no ar** (captura de 9/10, 00h08) → **mandar a mensagem** (`mybesthotel_mensagem.md`).

- ✓ **4 quartos, 8 pessoas** («A casa tem camas para 8», ficha passo 3).
- ✓ Configuração dos quartos à escolha: **A** = 2 de casal + 2 twin (2 camas de solteiro) · **B** = 3 de casal + 1 twin.
- ✓ **Berço** disponível a pedido (caixa «Precisa de berço» na ficha).
- ✓ **Piscina** (capítulo da avaliação; o António limpa-a no dia da entrada, antes das 16h).
- ✓ Espaço exterior: **jardim, alpendre, estacionamento** (capítulo «Espaço exterior» da avaliação).
- ✓ Estacionamento: **na entrada da quinta, junto ao tanque**; não em frente à casa nem atrás, junto aos pinheiros (T6).
- ✓ A casa é a da fotografia da ficha: **paredes de cal com barra azul (#1B4DB1)**, telhado de telha (`assets/foto-casa.jpeg`, 5/7/2022).
- ✓ **Casas de banho: 2** (uma privativa no quarto principal, uma completa partilhada). Fonte: MyBestHotel.
- **?** **Terreno: 3,6 ha (MyBestHotel, 2022) ou 3,2 ha (brief do Diogo, 16/10)?** O Diogo confirma; até lá nenhum dos dois entra no HTML.
  ✓ **Área da casa: 270 m²** (brief de 16/10).
- ✓ **Cozinha totalmente equipada, SMEG.** **?** a lista miúda (máquina de lavar louça, café, forno) para as FAQ.
- ? **Wi-Fi** — confirmar que há e se é bom o bastante para dizer «teletrabalho».
- ✓ **Ar condicionado em todas as divisões**; **lareira na biblioteca no inverno** (brief de 16/10).
- ✓ **Lareira** (na biblioteca). **?** churrasqueira / forno de lenha.
- ? **Máquina de lavar roupa** · **secador** · **ferro**.
- ? **TV** (canais? Netflix?).
- ✓ **Roupa de cama, colchões e almofadas novos**; **mobília toda nova**, com apontamentos pessoais; **cozinha equipada para mais do que 8**
  (loiça, talheres e **copos de vinho**) (brief de 16/10). **?** toalhas de piscina (sim? não?).
- ✓ **Zona à volta da casa de uso livre pelos hóspedes**, de onde se acompanha a vida da quinta; **ovelhas a pastar** de vez em quando (16/10).
- ✓ **Conceito da casa (brief de 16/10, manda no tom):** moderno, conforto de casa de cidade (classe média alta), no campo; **o oposto do
  «rústico»**. «Rústico», «antigo», «tradicional», «típico» não entram nos textos. **80–90 % dos hóspedes vêm de Lisboa** (1 h).
  Três perfis por época e o domingo até ao fim do dia: `2026-10-16_brief_diogo_conceito_perfis.md`.
- ✓ **Animais de companhia bem-vindos** (brief de 16/10: «a casa recebe os animais de companhia, mesmo sabendo que isso traz desgaste»).
  **?** A regra miúda para as FAQ (quantos, onde dormem, taxa ou não).
- ? **Crianças:** bem-vindas (berço ✓); há cadeira de refeição? proteção da piscina?
- ? **Eventos / festas:** não (proposta: o site diz «casa de férias, sem festas»).
- ? **Fumar:** só no exterior (proposta).
- ✓ **Frase de abertura e todos os textos do site: escreve-os o Claude** (brief do Diogo, 9/10: «não sou um bom exemplo para gerar textos»).
  O Diogo veta por olho. Matéria-prima: a avaliação do Airbnb («decorada com grande atenção aos detalhes», «muito bem equipada», «adoraríamos
  voltar»), os repetentes (>80 % em direto), o «na nossa casa é assim» do late check-out, a cal e a barra azul, o campo e o céu.

## 3. A estadia (regras que a app já aplica)

- ✓ **Check-in a partir das 16h**; **check-out até às 11h** (T1).
- ✓ **Sem check-in presencial:** no dia da entrada o Diogo manda por WhatsApp as indicações e o **código da caixa da chave**;
  à saída a chave volta à caixa e baralha-se o código (T6).
- ✓ **Late check-out** possível, combinado caso a caso (interruptor na app; «até às 17h (late checkout combinado)» no exemplo da ficha).
  ✓ **Late check-out ao fim de semana «à hora do pôr do sol», 17h/18h (Diogo, 8/10):** é uma mensagem de «way of living Alentejo»,
  «na nossa casa é assim», não uma promoção. No site vai com asterisco: ***válido quando não há entrada no mesmo dia**; acontece quase
  sempre, menos em julho e agosto, em que é muito difícil*. Entra na página «A casa» (secção «Chegar e entrar») e nas «Perguntas frequentes».
- ✓ **Limpeza final incluída uma vez por estadia**, seja qual for a duração; nas estadias longas o Diogo faz uma limpeza por semana
  **sem custo** (princípio 1 da 0e). Mostrada à parte no preço: **170 € em 2026 · 180 € em 2027**.
- ✓ **Mínimo de noites:** 2 (base do modelo 0e); no **verão (18 jul – 31 ago) 7 noites, de sábado a sábado**.
- ✓ **Ficha de reserva** obrigatória (lei portuguesa, registo de hóspedes), por link, «menos de cinco minutos».
- ✓ **Pagamento direto:** 30 % para confirmar (sinal) e 70 % até ao 3.º dia útil antes da entrada; por **transferência bancária**
  (sem acréscimo), **PayPal UE/EEE +4,25 %** ou **PayPal fora +5,55 %**; o cliente escolhe tranche a tranche.
- ? **IBAN no site: NÃO.** Proposta: o IBAN só aparece na ficha/email depois da pré-reserva (como hoje). O site diz só «transferência ou PayPal».
- ? **Cancelamento:** qual é a regra no direto? (sinal não reembolsável? devolução até N dias?) — hoje não está escrita em lado nenhum
  do repositório. Tem de estar no site (é a primeira pergunta de quem reserva direto).
- ? **Fatura:** emitida sempre (TOConline, IVA 6 %), com NIF se o hóspede o der — pode dizer-se no FAQ.

## 4. Preços 2027 (tarifa privada = a do site; é a mais baixa de todos os canais — regra central do preço)

Por noite, casa inteira (8 pessoas), limpeza de 180 € à parte, uma por estadia. Fonte: `ESTADO v49`, secção 0e, e as Tarifas da app.

- ✓ jan – 28 fev: **250 €** (mín. 2 noites)
- ✓ mar – 1 mai: **280 €**
- ✓ 2 – 31 mai: **330 €**
- ✓ jun – 17 jul: **390 €**
- ✓ 18 jul – 31 ago: **410 €** (mín. 7 noites, sáb–sáb)
- ✓ set: **340 €**
- ✓ out – nov: **250 €**
- ✓ dez: **330 €**
- ✓ **Mensal de inverno: 4 000 € por 28 noites + limpeza** (nov–mar; «Considera os 4 000 € e avança», 4/10).
- ? Mostrar a tabela toda (S3 = A, decidido) **e** a frase «a partir de 250 € por noite» no topo da página da casa.
- ? Dizer «reservar direto é mais barato do que nas plataformas»? Proposta: dizer «o melhor preço é aqui», sem citar as plataformas.
- ✓ Os preços de 2026 que ainda valem até 31/12: 250/280/330/380/405/330/250/330, limpeza 170 (histórico; o site arranca já com 2027,
  mas o «Simule a sua estadia» tem de usar o ano da data escolhida — a app já faz isso).

## 5. Onde fica e o que fazer à volta (página «Localização»)

- ✓ Reguengo, Montemor-o-Novo, Alentejo (ver a decisão de 25/10 na secção 1: «Reguengo» só na morada postal; as palavras da zona são Évora, Alentejo, Montemor-o-Novo e Alqueva). Portal do município: `visitmontemornovo.com` (Início → Ficar → Monte Casa Branca) já aponta para o domínio.
- ✓ Distâncias (texto do Diogo de 2022, MyBestHotel): **centro de Montemor-o-Novo 3 km · Évora 25 min · Lisboa 1 h · Comporta 50 min ·
  Alqueva 1 h · Badajoz 1 h 20**. Na EN2. **?** aeroporto de Lisboa (≈ 1 h 15?).
- ✓ Matéria para a página «Onde fica», já escrita em 2022 e reaproveitável: Évora e as ruelas dentro das muralhas · um dia de praia na Comporta ·
  Alqueva, «a maior bacia da Europa» · Badajoz · «sempre se volta para um fim de dia na piscina a admirar o pôr do sol».
- ✗ O que o Diogo recomenda à volta (5 a 8 linhas): Évora (património mundial), Montemor (castelo, Convento de S. Domingos), Arraiolos
  (tapetes), vinhos (Rota dos Vinhos do Alentejo, adegas perto), Cromeleque dos Almendres, barragem/praia fluvial mais perto,
  restaurantes de confiança em Montemor, mercearia/supermercado mais perto (para quem chega às 16h). **Só com a lista do Diogo.**
- ✓ Para o schema.org: `VacationRental` / `LodgingBusiness` com nome, morada, telefone, email, capacidade 8, 4 quartos, piscina,
  check-in 16:00 / check-out 11:00, link de reserva, avaliações (ver 7).

## 6. Fotografias (S4)

- ✓ **Resposta do Diogo (8/10): as fotos estão na galeria Zenfolio** `https://montecasabranca.zenfoliosite.com/my-gallery`. **O Claude não a
  consegue abrir** (a rede do ambiente bloqueia `zenfoliosite.com`, tal como `linktr.ee` e `instagram.com`; confirmado a 8/10 pelo curl e pelo
  leitor web). Para o Claude as ver, uma de duas: (a) permitir `montecasabranca.zenfoliosite.com` e `linktr.ee` na rede do ambiente;
  (b) descarregar da galeria as escolhidas, **em tamanho original**, para uma pasta do Dropbox (`13. APP Gestão AL/site/fotos/`), que o
  Claude lê. A (b) é precisa de qualquer maneira: o site serve as fotos a partir da Amen, não do Zenfolio.
- ✓ **Canva (lido a 8/10, só leitura):** pastas «Fotos Verão» (1 foto, `7.jpg`) e «Fotos Inverno» (1 foto de 6/12/2022); o desenho
  «Feedback · monte casa branca» tem a foto da piscina e **uma avaliação real do Airbnb citável** (ver 7); o desenho «Post Instagram Monte
  Casa Branca (Promoção)» (22–29 agosto) usa **imagens de banco** (palmeiras, mar) que não são a casa: não servem para o site; o
  «Monte casa branca · our brand story» (jan/2026) é só uma capa escura com o nome. Conclusão: o Canva não tem a seleção de fotos; pode
  servir mais tarde para recortes e para o Instagram, não para a fonte das fotos.

- ✓ **Encontrado no Dropbox (só leitura):** `/1. DVM/1. MONTE CASA BRANCA/8. fotos/` — 193 ficheiros (163 JPG, 23 HEIC, 1 MOV, 1 MP4, 2 ZIP),
  com três subpastas: `4junho21/` (60 fotos de 4/6/2021, IMG_1971–2034), `agencia imob/` (21 fotos da agência, nomes em código),
  `IEE/`. Na raiz do Dropbox há ainda `3. Fotos 2023/` (por abrir). São fotos de obra, de agência e de família: **não é a seleção aprovada.**
- ✓ A única fotografia aprovada para a cara do Monte é a da ficha: `assets/foto-casa.jpeg` (Nikon D7200, 5/7/2022, 1600×1066). É a do protótipo.
- ✓ **Encontradas (9/10): a pasta do negócio é `/1. DVM/2. ANGULOS CASTIÇOS, LDA/5. Exploração AL/7. Fotos/`**: `2. rodrigo/` (fotógrafo
  profissional, junho/julho de 2022; a ligação que o Diogo mandou), `6. Antes e Depois/` (25 ficheiros já escolhidos), `3. anuncios/`
  (V1 · V2_verão · V3_inverno · Interior). **Por ver:** a rede do ambiente não deixa descarregar as imagens (ver SITE.md, «Fotos: onde estão»).
- ~~✗ Faltam as 6 a 10 fotografias do site~~ (substituído pela linha acima) (casa de fora, piscina, alpendre, sala, cozinha, dois quartos, casa de banho, campo/pôr do sol).
  O «Pacote para o Claude Design» (4/9) pedia ao Diogo «5 a 8 fotografias que gostes»: se as escolheu, onde ficaram? Proposta: uma pasta
  `13. APP Gestão AL/site/fotos/` no Dropbox com as escolhidas, nome a dizer o que é (`01_casa.jpg`, `02_piscina.jpg`, …); o Claude lê-a daí.
- ? As fotos do Instagram (@monte_casa_branca) são as mesmas? Se sim, basta dizer quais.

- ✓ **Decisão S5 = B (Diogo, 8/10): o site ganha uma página «Fotos» própria, em modo portfólio, separada por zonas e com «antes e depois»
  (a obra → hoje).** Feita na Amen, estática, leve (imagens redimensionadas, carregamento preguiçoso, lightbox simples, pares antes/depois
  lado a lado ou com cursor). Com isto o Zenfolio (75 €/ano) deixa de ser preciso. **Ordem obrigatória:** 1.º descarregar do Zenfolio os
  originais de todas as fotos que interessam (depois de cancelar, somem); 2.º a página «Fotos» no ar e a galeria do Linktree a apontar para ela;
  3.º só então cancelar o Zenfolio. Zonas propostas: Exterior e chegada · Piscina · Sala · Cozinha · Quartos · Casas de banho · Campo e pôr
  do sol · Antes e depois. **?** As fotos de obra para o «antes» estão em `/1. DVM/1. MONTE CASA BRANCA/8. fotos/4junho21/` e na pasta
  `4. Construção/` do Dropbox: confirmar que posso escolher de lá.

## 6a. Textos que já existem (matéria-prima do Claude)

- ✓ **Descrição da MyBestHotel (2022), PT + EN** — a mais completa; capturas em `fontes/`. Reescreve-se (o tom «senhores de antigamente» fica
  como piscadela, não como título).
- ✓ Avaliação do Airbnb no Canva («decorada com grande atenção aos detalhes… adoraríamos voltar»).
- ✓ Emails e ficha da app (tom «vós/vocês», «Hi» em EN).
- **✗ Textos dos anúncios do Booking e do Airbnb:** o Claude **não tem acesso** (as duas plataformas estão bloqueadas na rede do ambiente e não há
  cópia no repositório nem no Dropbox). **Pedido ao Diogo:** capturas do anúncio do Airbnb (descrição + «O que este espaço oferece» + regras da
  casa) e do Booking (descrição + comodidades + condições/cancelamento), como fez com a MyBestHotel. É aí que estão Wi-Fi, ar condicionado,
  animais e a política de cancelamento.
- **✗ Portal `visitmontemornovo.com` (Início → Ficar → Monte Casa Branca):** também bloqueado; uma captura da entrada do Monte chega.

## 7. Avaliações para citar

- ✓ **Uma avaliação real do Airbnb já pronta a citar** (está no Canva, «Feedback · monte casa branca», 2023): «Passamos um mês na linda
  casa do Diogo para trabalhar e curtir o Alentejo. Não poderíamos ter encontrado melhor. A casa foi decorada com grande atenção aos
  detalhes e está muito bem equipada. Diogo foi muito simpático e prestativo e respondeu imediatamente quando tínhamos dúvidas. Tudo
  perfeito. Adoraríamos voltar.» (tradução do Airbnb). **?** Confirmar que pode ir ao site e com que assinatura (país? primeiro nome?).
- ✓ **«Conseguimos recolher avaliações do Booking e do Airbnb?» (Diogo, 8/10). Automaticamente, não:** o Airbnb não tem API pública
  de avaliações; a da Booking (Reviews API) é só para fornecedores de conectividade, não para um alojamento sozinho; copiar por programa
  («scraping») viola os termos das duas e é bloqueado; os «widgets» de terceiros que mostram avaliações do Airbnb/Booking (Elfsight,
  Trustindex, 5–10 €/mês) fazem precisamente isso e partem quando as plataformas mudam. **À mão, sim, e a app já tem o sítio:** em cada
  reserva, Avaliação → «Registar a avaliação da Booking/Airbnb» guarda a nota, o **comentário da plataforma**, o link e o «Citar no site»
  (`avaliacoes.comentario_plataforma`, `url_plataforma`, `citar`). Proposta: o Diogo copia as 10–15 melhores (Airbnb: página do anúncio →
  avaliações; Booking: extranet → «Comentários de hóspedes») para as reservas respetivas na app, com «Citar no site: sim, com o primeiro
  nome»; o site lê-as pela porta de leitura (pedido `#` à app) com primeiro nome · país · mês/ano · plataforma. Assim ficam na fonte única
  e crescem com as novas da ficha. Até a porta existir, podem ir escritas à mão na página.
- ✓ A app guarda, por avaliação, «Posso citar a vossa opinião no site?» (sim com o primeiro nome / sim sem nome / não) — material
  pensado para isto desde 30/8 (0g, Q7). Precisa de uma **porta de leitura** na app (as citáveis, com nome ou sem, e a nota global):
  é um pedido `#` à app, numa sessão APP (vai como recado no CLAUDE.md, secção 10, quando o Diogo disser sim).
- ? Até lá: o Diogo pode colar 3 a 5 frases de hóspedes (Airbnb/Booking) que goste, com a autorização implícita das plataformas
  (sem nome completo). Proposta: começar com o número de anos a receber hóspedes («desde 2022») e a nota média das plataformas.
- ✗ Nota média e número de avaliações nas plataformas hoje (Airbnb · Booking · Vrbo), para pôr «4,9 em 60 avaliações», se for verdade.

## 8. Linktree (o que há hoje em montecasabranca.pt) — LIDO pelas capturas do Diogo (8/10, 23h30)

Endereço: `https://linktr.ee/monte_casa_branca`. Capturas do painel em `docs/temas/site/linktree_hoje/`. Os cliques são o total desde que
o Linktree existe (sem datas: o plano grátis não as dá), mas a proporção diz muito sobre o que as pessoas procuram.

**Perfil**
- ✓ Nome «Monte Casa Branca»; foto redonda = a casa vista da piscina (a mesma família de foto da ficha).
- ✓ Bio: «Weekend late checkout sunset time 5/6pm.» — **?** ainda vale? (late check-out ao fim de semana até às 17h/18h). Se sim, é um
  facto para a secção 3 e para a página «Perguntas frequentes»; se não, sai.
- ✓ Ícones sociais: WhatsApp · email · «$» (**?** é um PayPal.me? qual o endereço?) · Instagram · Facebook (**✗** endereço da página de Facebook).
- ✓ Há um separador «Loja» (**?** tem alguma coisa? se não, ignora-se).

**Botões, por ordem (texto · cliques · destino)**
1. TikTok — por configurar («Título», 0 cliques). Lixo; não entra.
2. Bloco de calendário — por configurar («Título», 0 cliques). Lixo; não entra.
3. Bloco de texto vazio («Digite um t…»). Lixo; não entra.
4. **PEDIDO INFORMAÇÕES** — **994 cliques** — formulário do Linktree (capturas 8/10, 23h43): campos **Nome\*** · **Email\*** · Telemóvel ·
   **Mensagem\*** · País (\* = obrigatório); respostas para `geral@montecasabranca.pt`; descrição: «Obrigado pelo seu contato. Estaremos à
   disposição para esclarecer sobre informações variadas, tarifas durante o ano e disponibilidades. Cumprimentos, Diogo Machado»;
   agradecimento começa por «Obrigado pela sua mensagem, prometemos…» (o site escreve o seu, não precisa do resto).
   → No site passa a ser o formulário de contacto/pré-reserva (S2 = A), com a mesma caixa de email.
5. **GALERIA** — **2 760 cliques** — `montecasabranca.zenfoliosite.com/…` (a galeria do Zenfolio, S5).
   → No site: «Ver todas as fotos» a abrir a galeria (decisão S5-A).
6. BOOKINGS — cabeçalho de texto (separa os botões de reserva).
7. **RESERVAS DIRETAS** — **4 640 cliques** — `https://wa.me/+351962802626`.
   → No site: o botão WhatsApp (S2 = B), em todas as páginas.
8. **BOOKING.COM** — **5 800 cliques** — `https://www.booking.com/Share-KoMvpm`.
9. **AIRBNB** — **2 030 cliques** — `https://www.airbnb.com/h/monte-casa-branca-montemornovo-evora`.
10. **VRBO** — **45 cliques** — `https://www.vrbo.com/pt-pt/arrendamento-ferias/p11082917?uni_id=6114185`.
    ✓ **Decisão do Diogo (25/10/2026): estas três ligações, as do Linktree em uso, são as oficiais do site.** Vivem em
    `demo/base/dados/factos.json` (chave `ligacoes`), de onde o kit da demo e o gerador do site as põem nas páginas (S34, aceite a 25/10).
    As que o ChatGPT escreveu na V1.3.1 (`airbnb.pt/rooms/614359946843546039`, `booking.com/Share-a7Qww5`) não têm origem registada e
    **não se usam** até o Diogo as confirmar; o Vrbo entra sempre (decisão de 8/10: os três links numa linha discreta das «Perguntas frequentes»).
11. RESERVAS DIRETAS (escondido, 0 cliques) — `mybesthotel.eu/turismo-…` — um motor de reservas antigo (MyBestHotel), desligado.
    ✓ **Diogo (8/10): não paga nada; é para retirar o botão e desligar o Monte da página deles.** Endereço (Diogo, 9/10):
    `https://www.mybesthotel.eu/turismo-rural/monte-casa-branca`. O Claude não consegue abri-lo (domínio bloqueado na rede do ambiente).
    **Tarefa do Diogo:** abrir o endereço; se a página do Monte ainda existir, mandar a mensagem já preenchida em
    `docs/temas/site/mybesthotel_mensagem.md` (PT e EN) pelo suporte/contacto deles; em qualquer caso apagar o botão do Linktree.
- Rodapé do Linktree ligado (plano grátis).

**O que os números dizem (16 300 cliques no total)**
- A procura é, por ordem: Booking 36 % · **WhatsApp direto 28 %** · galeria 17 % · Airbnb 12 % · formulário 6 % · Vrbo 0,3 %.
- Mais de um terço de quem chega ao Linktree quer falar connosco diretamente (WhatsApp + formulário = 5 634 cliques). É o público do site novo.
- A galeria tem mais cliques do que o Airbnb: as pessoas querem ver a casa antes de decidir. Reforça as fotos próprias no site e a S5-A.

**O que passa para o site e onde**
- ✓ WhatsApp e email/formulário: botões «Reservar direto» em todas as páginas (já no protótipo).
- ✓ Galeria: «Ver todas as fotos» na página «A casa» (S5-A).
- ✓ **Booking, Airbnb e Vrbo no site próprio: SEM botões (decisão do Diogo, 8/10).** Nas «Perguntas frequentes» uma linha discreta «Também
  estamos no Airbnb, Booking e Vrbo, se preferirem reservar por lá», com os três links (confiança e avaliações).
- ✓ Instagram no rodapé. Facebook sai.
- ✗ Não passa: TikTok, calendário, texto vazio, MyBestHotel.

**Para o dia do go/no-go do Linktree (S1):** com o site no ar, o `montecasabranca.pt` deixa de redirecionar para o Linktree; o Linktree
pode ficar vivo mais uns meses só para o link do Instagram apontar para ele, ou o Instagram passa a apontar para o site e o Linktree fecha.
Nada disto se decide agora.

## 9. Para os robôs (ponto 3 e 7 de 2/10; sem decisão a tomar, fica registado)

- ✓ `robots.txt` a deixar entrar: Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended.
- ✓ `llms.txt` na raiz com o resumo da casa em texto (factos das secções 1–5 deste ficheiro).
- ✓ `sitemap.xml` com as cinco páginas; `<html lang="pt">` e versão EN com `hreflang`.
- ✓ **O Perfil da Empresa no Google (Google Business Profile) «Monte Casa Branca» já existe** (confirmado a 11/10 pelos emails do Google na caixa
  `anguloscasticos@gmail.com`: relatórios mensais desde dez/2025; avaliação do «Davi» em jun/2026). Vistas por mês em 2026: jan 86 · fev 44 ·
  mar 83 · abr 97 · mai 98 · jun 108 · jul 85 · ago 141 · set 93 (dez/2025: 114). **?** Que link tem hoje (Linktree? nenhum?) e que fotos; quando
  o site for ao ar: link para `montecasabranca.pt`, fotos do Rodrigo, descrição com o registo municipal, e estas vistas como linha de base.

## 10. As páginas do site (ponto 1 de 2/10) e o que cada uma diz

1. **A casa** (a página de entrada): foto, frase do Diogo, 4 quartos · 8 pessoas · piscina, o que tem, chegar e entrar, «a partir de 250 €»,
   onde fica, botões «Simule a sua estadia» · WhatsApp · email. **É o protótipo desta sessão: `casa.html`.**
2. **Fotos** (S5 = B): portfólio por zonas e «antes e depois», leve, na Amen; substitui a galeria do Zenfolio.
3. **Preços e reservar:** a tabela de 2027, a limpeza, o mínimo de noites, como se paga, o «Simule a sua estadia» (S3) com o calendário
   de ocupação sem nomes, a pré-reserva (S2 = A) e o contacto direto (S2 = B).
4. **Onde fica e o que fazer:** morada, mapa, distâncias, as recomendações do Diogo (secção 5).
5. **Perguntas frequentes:** chave e código, horas e late check-out do fim de semana, animais, crianças, limpeza, cancelamento, fatura,
   ficha de reserva, estacionamento, Wi-Fi, «também estamos no Airbnb, Booking e Vrbo».
6. **Contactos:** telefone/WhatsApp, email, Instagram, os links do Linktree a manter, firma e registo AL.

---

**Como responder:** basta escrever «FACTOS: 2 casas de banho; Wi-Fi sim; AC em todos os quartos; animais não; …» ou corrigir este
ficheiro no GitHub. O Claude passa cada resposta a **✓** e só então escreve os textos finais (PT, depois EN).
