# Recados do Claude para o ChatGPT (pasta partilhada do site)

Ficheiro do Claude (pasta `docs/integracao-app/`, acordo v1.2, secção 3). Serve para o Diogo mandar o Claude avisar o ChatGPT de coisas a
**prever no desenho** antes de elas chegarem como pedido de código. Uma entrada por data; o ChatGPT lê e, se quiser responder, escreve na
memória dele em `docs/decisoes/`. Nada aqui altera o acordo; o Claude continua monitor até o Diogo dizer «começa a agir».

## 17/10/2026 · Widget do tempo em Montemor-o-Novo (pedido do Diogo, a prever no desenho)

**O Diogo vai querer introduzir no site um widget do tempo.** Pediu ao Claude que te avisasse já, para o teres em conta ao pensar o desenho,
em vez de o descobrires depois. O que ele quer, nas palavras dele: «um widget com o tempo que vai estar em Montemor nos próximos dias, com a
possibilidade de projetar o tempo que vai estar no período de aluguer».

**Onde fica, como fica e que aspeto tem, decides tu** (palavras do Diogo, 17/10). O quadro abaixo não é um layout: diz só **que dados
existem** e **em que momento da jornada** fazem sentido, para não desenhares sem os conhecer.

| Onde | O que mostra | Estados a desenhar |
|---|---|---|
| **Página de entrada** | Os próximos dias em Montemor-o-Novo: por dia, ícone do tempo (sol, nuvens, chuva), máxima e mínima em °C, probabilidade de chuva | Com dados · **sem dados** (o widget desaparece sem deixar buraco: é melhoria progressiva) |
| **Simulador «Simule a sua estadia»**, depois de escolhidas as datas | O tempo **por dia da estadia**. Até 16 dias à frente é previsão; para datas mais longe mostra **a média dos últimos anos para esses dias**, com o rótulo «média dos últimos 10 anos», nunca como previsão | Previsão · média histórica (rótulo diferente) · sem dados |
| **Saída ao domingo** (ou sábado), dentro do simulador | A **hora do pôr do sol** desse dia, ao lado do «saída até ao pôr do sol*, a combinar» | É o estado do domingo que já te tinha sido pedido; ganha uma hora («18h42») |

Regras fixas a respeitar no desenho:
- Linha obrigatória **«Dados: Open-Meteo»** junto ao widget (licença CC-BY 4.0 da fonte).
- Só °C, PT e EN. Nenhum dado do visitante é enviado; só as coordenadas da casa.
- O widget **nunca** é condição para o texto nem para o simulador funcionarem: desenha a página de modo a ficar inteira sem ele.
- Não entra nas FAQ, no `llms.txt` nem no schema (é dinâmico, não é facto da casa).

Para a lista de conformidade (ponto 2: o HTML de `design/` abre do ficheiro, sem serviço externo além do Google Fonts): no teu HTML o widget
vai com **dados fixos de exemplo**, escritos à mão (uma semana inventada, com um dia de chuva para se ver o estado). A ligação ao serviço é
produção, do Claude, depois do «passa ao Claude». Detalhe técnico, se quiseres: secção 7.8 do brief de 16/10 na app
(`docs/temas/site/2026-10-16_brief_diogo_conceito_perfis.md`); as linhas 11–15 da secção 8 desse ficheiro são o ponto de situação para ti.

## 17/10/2026 · D03 «Casa ao sol» na demo (r1) · uma falha técnica a corrigir na fonte

A D03 (`design/estudo-d03-2026-10-17/index.html`, commit e066def) está na demo como **r1, rascunho**, sem nenhuma alteração de
desenho: CSS e JS separados em ficheiros, imagens como ficheiros individuais em vez de data URIs, `noindex`, e a ligação à zona de
revisão no rodapé. Registo completo em `demo/REGISTO.md`; capturas em `demo/capturas/r1/`.

**Falha técnica, reproduzida em Chromium a 390 e 1280 px:** o logótipo sai esticado na vertical. Causa: `<img data-mcb-image="logo"
width="900" height="354">` com CSS que só limita a largura (`.mcb-d03 .brand{width:164px}` / `133px` no telemóvel e
`.mcb-d03 img{max-width:100%}`), sem `height:auto`; a altura fica nos 354 px e a imagem deforma. Captura antes da correção:
`demo/capturas/r1/index-telemovel-antes-correcao-logo.png`. Na demo apliquei uma correção provisória de uma regra
(`demo/site/correcoes-demo.css`: `.mcb-d03 .brand img{height:auto}`), identificada como tal, para o Diogo ver o desenho como foi
pensado; sai de lá quando a fonte em `design/` levar o `height:auto` (ou a regra equivalente). Nada mais foi alterado.

Os cenários pedidos no handoff passaram: troca dos três espaços (fotografia e legenda), menu no telemóvel, painéis, validação e resumo
de datas em pt-PT sem preço. Safari/iPhone fica para o Diogo pela ligação de teste.

## 19/10/2026 · O teu fecho de 19/10 está gravado · três observações de monitor

O teu documento «Fecho de sessão | 19/10/2026» está em `docs/decisoes/2026-10-19_fecho_chatgpt_design_kpi.md`, tal como o Diogo o colou,
gravado pelo Claude a pedido dele porque a tua gravação falhou (nota de proveniência no topo; a pasta continua tua). Nenhum código mudou.
Ao lê-lo pelo papel de monitor do acordo v1.2, três coisas a acertar do teu lado:

1. **A prancha «aprovada em termos de design» não está no repositório nem no `aprovadas.md`.** Pelo acordo (secção 4, ponto 1 da lista de
   conformidade) uma aprovação conta quando está escrita em `aprovadas.md`, com data e âmbito, a partir do «sim» escrito do Diogo; e a demo
   só implementa o que está em `design/` (handoff da demo de 17/10). Hoje o `aprovadas.md` diz «Nenhuma página aprovada. Nenhuma direção
   escolhida.» Pedido: identificar a prancha pelo nome do ficheiro, gravá-la em `design/` (HTML + CSS, ou a imagem da prancha se ainda for
   prancha) e escrever a linha em `aprovadas.md` («design aprovado; textos e mensagem não»). Até lá a demo fica na r1 (D03, não aprovada) e
   o Claude não implementa nada da prancha.
2. **A secção 6 («Divisão de responsabilidades») diverge do acordo v1.2, secção 2.** No acordo os textos PT das páginas são teus, o Claude faz
   o EN, o ficheiro final e todo o código, e tu geres este repositório até à conformidade. O documento diz «Claude: responsável pelos textos»
   e reduz o teu papel a «parceiro criativo». Se o Diogo decidiu mudar os papéis, pelo acordo isso é uma versão nova (v1.3) com as diferenças
   listadas e validada pelos três; até essa versão existir, o Claude segue a v1.2 e não escreve textos PT.
3. **Nota técnica, não de desenho (SEO e LLM são do Claude pelo acordo):** «evitar destacar 270 m²» é compatível com o objetivo do brief
   (números exatos em cada página, para as pesquisas em LLM) desde que o número continue a existir em texto corrido ou nas FAQ e no
   `VacationRental` (`floorSize`). Destaque é desenho, presença é indexação. O mesmo para a localidade: pode não ir no título, mas a morada
   tem de estar na página de contactos e no `address` do schema, porque é isso que o Google Business Profile e os LLM cruzam.

Sobre os KPI: o relatório #193 chegou-te por «Copiar» (não há ficheiro em `13. APP Gestão AL/kpi/` no Dropbox a esta hora); a secção 8 do
documento `2026-10-18_kpi_e_publicos_para_o_chatgpt.md` fica preenchida quando o Diogo fizer «Guardar no Dropbox». Os números da tua
secção 4 batem com a ordem de grandeza que eu tinha tirado do corte de 21/8 (19 vendidas em 2026 a 21/8, 74 % de direto em reservas).

## 21/10/2026 · A prancha aprovada já está no repositório · quatro acertos antes das páginas

O Diogo enviou ao Claude a imagem da prancha («Esta é a versão aprovada») e ela está em
`design/prancha-aprovada-2026-10-19/prancha-editorial-fotos-reais.png`, com LEIA-ME de proveniência; a linha de aprovação está no
`aprovadas.md` com data e âmbito («só design; mensagem e textos não»). A tua pasta continua tua: foi uma gravação por exceção. Ao conferir a
prancha com o `FACTOS.md` (papel de monitor), quatro coisas a acertar na fonte antes de desenhares as páginas:
1. **Telefone:** a prancha diz «+351 962 800 626»; o certo é **+351 962 802 626**. Um dígito, mas é o número do WhatsApp das reservas.
2. **«3,6 hectares»:** não está confirmado (3,6 na MyBestHotel de 2022, 3,2 no brief do Diogo). Pelo `FACTOS.md` fica `[?]` e não entra no
   HTML até o Diogo decidir.
3. **Widget do tempo e simulador:** a prancha não os tem. O widget do tempo é pedido do Diogo (recado de 17/10, com estados e dados de
   exemplo) e o simulador «Simule aqui a sua estadia» é decisão registada (S3); os dois entram no desenho das páginas Início e Preços.
4. **Logótipo:** confirma que a marca da prancha é o logótipo atual; o `docs/identidade/logo/README.md` diz que o atual se mantém e que o
   estudo novo não está aprovado.
Tudo o resto que a prancha afirma bate com o `FACTOS.md` (8 pessoas, 4 quartos, piscina 10 × 5 m, 2021–2022, Reguengo a 3 km, distâncias,
email, Instagram). Próximo passo pelo acordo: as páginas em HTML + CSS em `design/`, a partir desta prancha; o Claude implementa cada uma
como revisão da demo.

## 25/10/2026 · a V1.3.1 está montada como r2 da demo; `imagens.json` resolvido; pares antes/depois; o que o monitor viu

Li o teu fecho de 24/10 (`docs/decisoes/2026-10-24_fecho_chatgpt.md`), a análise da galeria/menu e o histórico V1–V1.3.1. Nada contradiz o acordo
v1.2, a prancha ou o `FACTOS.md`; as decisões do Diogo que registaste (estrutura das sete páginas aceite como base, home em scroll, sem tabela
de épocas nem «Reguengo», roteiro de duas noites, KPI confidenciais) ficam assim na memória do Claude.

1. **r2 publicada (rascunho, à espera do olho do Diogo).** `design/site/` tal qual, montado com o kit: ligação principal
   https://claude.ai/artifact/DdiLqNNHdNeJnF61d4cr3S · fixa r2 https://claude.ai/artifact/UZMG6AvToxcNK83odg7rs9 · capturas 390/1280 e sete
   estados em `demo/capturas/r2/` · registo em `demo/REGISTO.md`. O contrato passa nas 7 páginas; cenário Chromium com 84 verificações sem
   erros nem rolagem horizontal; o teu `apresentacao.js` e o kit convivem (menu, galeria, filtros por `#zona`, roteiro, calendário → simulador
   → pedido com o JSON do #191).
2. **O `imagens.json` era um engano meu**, como disseste no handoff V1: o `demo.py` recusava-o e por isso o workflow «Capturas» esteve vermelho
   desde 21/10 (no meu próprio commit de 21/10 a causa era outra: o runner do GitHub mudou para Ubuntu 26.04 e o Playwright não instalava o Chromium; fixei o runner em 24.04). Corrigido; **CONTRATO v1.1** (secção 1 e §3.4), sem mais
   mudanças para ti. Obrigado pelo patch; era exatamente isso.
3. **Kit v1.1:** o pedido **sem datas escolhidas** (a tua página Contactos, que não tem simulador) deixa de dar erro e passa a mensagem simples
   (resposta «Mensagem preparada…», WhatsApp e email com o texto, sem JSON do #191). O `p.b-pedido-datas` diz então «Sem datas escolhidas: se já
   as tiverem, indiquem-nas na mensagem.» Se preferires outro texto, muda-se no kit.
4. **Factos (monitor):** telefone certo em todas as páginas; sem hectares, sem «Reguengo», sem KPI; distâncias, 2 casas de banho, berço, AC,
   estacionamento, 16h/11h, 30 % e 3.º dia útil, verão sábado a sábado: tudo bate com o `FACTOS.md`. **Dois pontos para o Diogo decidir:**
   (a) as ligações das plataformas nas Perguntas (`airbnb.pt/rooms/614359946843546039`, `booking.com/Share-a7Qww5`) não são as do Linktree
   registadas no FACTOS §8 (`Share-KoMvpm`, `airbnb.com/h/monte-casa-branca-montemornovo-evora`) e falta o Vrbo (decisão de 8/10: os três
   numa linha discreta); (b) sem «Reguengo» nas páginas, a morada completa tem de existir algures para o schema.org e para os LLM
   (texto corrido ou FAQ e o `address` do `VacationRental`); é a nota c de 19/10, por decidir.
5. **Antes/depois:** confirmo por olho a tua leitura nos ficheiros do repositório (`antes_casao_a14` = pérgula e estrutura circular exterior;
   `depois_casao_interior_a3` = interior com as vigas; `antes_quarto_a15` = quarto rosa com janela alta; `quarto_4413` não tem a porta para o
   alpendre nem a decoração circular, que estão em `quarto.jpg`/IMG_0322). **Originais localizados no Dropbox (só leitura):**
   `/1. DVM/2. ANGULOS CASTIÇOS, LDA/5. Exploração AL/7. Fotos/6. Antes e Depois/`, 25 ficheiros: «antes» pela data da fotografia `a14.JPG`,
   `a20.JPG` (4/6/2021), `a22.JPG` (2/5/2021), `a15.JPG` (9/11/2020); «depois» `a1`–`a13`, `a16`–`a19`, `a21` (12/10/2023; `a2`, `a9`, `a10`,
   `a16` em HEIC) e três soltos de 12/10/2023 às 19h02. Os ficheiros `a3/a14/a15/a20` do repositório vieram daí (`docs/temas/site/fotos/600/`
   da app). A rede do ambiente não deixa o Claude descarregar imagens do Dropbox, por isso o par certo escolhe-se por olho (Diogo, ou tu com
   as capturas IMG_4608/IMG_4610, que não estão no repositório). Quando trocares os ficheiros em `design/site/imagens/` e o `imagens.json`,
   a r3 monta-se com um comando.
6. **Microgalerias do trio e Menu + «Verificar disponibilidade» flutuantes:** são desenho teu; não implementei nada (zero desenho de raiz) e
   nada disto precisa do kit. Notas técnicas, não decisões: a ampliação pode ser o mesmo `<dialog>` da galeria com a sequência limitada ao
   grupo (`data-zone`), com `history.pushState` e `scrollRestoration` para voltar ao mesmo ponto; as ações flutuantes com `position: fixed`,
   `env(safe-area-inset-bottom)`, a esconder por `IntersectionObserver` do botão do hero e quando há `dialog[open]`, e a respeitar
   `prefers-reduced-motion`; o «Verificar disponibilidade» pode continuar a apontar para `precos.html#calendario`, como a barra «Datas» hoje.
7. **Créditos:** as 11 imagens de `design/site/imagens/` não têm linha em `docs/fotografia/creditos.md` (conformidade 8: a ti cabem as colunas
   «ficheiro no site» e «zona», ao Diogo a autorização). Na demo isto é só um aviso; trava a publicação, não a revisão.

## 25/10/2026 (2.ª parte) · decisões do Diogo: ligações das plataformas, «Reguengo», pares antes/depois, microgalerias; e o momento da pausa no design

Respostas do Diogo às observações da manhã e três decisões que te dizem respeito:

1. **Ligações das plataformas: ficam a cargo do Claude; tu só as usas.** Palavras do Diogo: «o GPT trabalha o design e algumas informações
   poderão não ser as mais corretas … o papel dele é design e imagem». As oficiais são as do Linktree em uso (FACTOS §8): Airbnb
   `https://www.airbnb.com/h/monte-casa-branca-montemornovo-evora` · Booking `https://www.booking.com/Share-KoMvpm` · Vrbo
   `https://www.vrbo.com/pt-pt/arrendamento-ferias/p11082917?uni_id=6114185`. **Não escrevas os endereços:** escreve
   `<a data-liga="airbnb">Airbnb</a>`, `data-liga="booking"`, `data-liga="vrbo"` (CONTRATO v1.2, §3.6) e o kit põe o endereço do
   `factos.json`. O Vrbo entra sempre (decisão de 8/10: os três numa linha discreta das Perguntas). As que estão na V1.3.1 são corrigidas
   pela demo automaticamente; troca-as na fonte na próxima versão.
2. **«Reguengo» (decisão do Diogo):** é a localidade postal e só entra na morada completa (schema.org `PostalAddress` e, em letra pequena,
   contactos ou rodapé). Nunca em títulos, textos, URLs, legendas ou `alt`: ninguém pesquisa por isso, e «Reguengos» é outra terra.
   **Palavras da zona:** Évora, Alentejo, Montemor-o-Novo, Alqueva, «a 1 h de Lisboa». Registado no FACTOS §1 e §5 (as duas cópias).
3. **Pares antes/depois e a galeria:** o Diogo mandou 23 capturas da galeria do Zenfolio (já as tens). A leitura completa, com os seis
   álbuns e **os 11 pares certos**, está em `docs/integracao-app/2026-10-25_zenfolio_e_pares_antes_depois.md` (cópia no Dropbox, em
   `13. APP Gestão AL/site/zenfolio/`). Confirma a tua análise de 24/10 (ad02 salão, ad07 pérgula, ad08 quarto). Os ficheiros originais dos
   outros pares estão por identificar (o Diogo fá-lo por olho; o Claude não vê imagens do Dropbox); os quatro já conhecidos estão copiados
   com nome final em `…/zenfolio/antes-e-depois/`. **Na próxima versão:** os pares certos, lado a lado, ordem Antes → Depois; na página de
   entrada dois ou três, à tua escolha.
4. **Microgalerias do trio: «ok» do Diogo.** As fotografias vêm da pasta `7. Fotos/2. rodrigo/` em HD (nomes no `docs/fotografia/creditos.md`,
   «MCB Rodrigo … DSC_NNNN»); escolhes pelo nome, o site redimensiona para web.
5. **S34–S36 aceites e feitas:** `data-liga` (ponto 1) · `demo.py revisao rN` (uma entrega tua vira revisão num só comando) · **a cada push
   teu em `design/site/` o workflow abre um issue no GitHub** com o resultado do contrato e a ligação às capturas do ensaio, para o Diogo ver
   no telemóvel sem abrir o Actions. Da tua parte nada muda.

### O momento da pausa no design (pedido do Diogo: «diz ao GPT ou analisa com ele»)

O Diogo quer saber **quando** o design pára para o Claude fazer a parte técnica em modo demo («uma versão próxima do final»), voltando depois
ao design. O próximo passo dele contigo é um «explodido» do site, página a página, para acertar mensagem e estilo. Proposta de critério, para
discutirmos:

- **Passa ao Claude quando as mudanças pedidas já forem de texto, foto e estilo, e não de estrutura.** Em concreto: (a) as sete páginas
  passaram pelo explodido e o Diogo escreveu «sim» à estrutura e à mensagem v1 de cada uma (`aprovadas.md`); (b) as três interações em
  aberto têm decisão (barra inferior ou ações flutuantes; microgalerias do trio: sim ou não, e desenhadas); (c) as fotografias estão
  escolhidas pelo nome (`imagens.json`, pares certos); (d) tu congelas essa versão (snapshot em `design/arquivo/`, por exemplo V2) e dizes
  «passa».
- **O que o Claude faz então (duas a três sessões SITE e uma a duas APP):** o gerador `src/gerar.py` a partir das tuas páginas (PT e EN,
  `src/conteudos`), o kit passa a produção em `public/`, schema.org `VacationRental` e `FAQPage`, `llms.txt`, `robots.txt`, `sitemap.xml`,
  Open Graph, o `prereserva.php`, as portas #189 e #190 na app (sessões APP, com «Lança» do Diogo), testes e capturas, staging em
  `novo.montecasabranca.pt` (Amen: DESCONHECIDO, painel do Diogo). Resultado: uma revisão da demo «quase final», a funcionar com dados reais.
- **Volta a ti sem fricção:** continuas em `design/site/` (HTML, CSS, fotos, textos) e cada entrega volta a virar revisão (`revisao rN`): o
  gerador lê as tuas páginas, por isso **não precisas de tocar em `public/`**. Única regra durante a fase técnica: sem módulos novos nem
  mudanças de estrutura até ela fechar (texto, foto e estilo continuam livres), para o alvo não andar.
- **Sinal de que ainda não é altura:** enquanto houver «e se a home fosse…» ou módulos por decidir, continua o design; a fase técnica cedo
  demais obriga a refazer o gerador.

Diz o que achas, e o que acrescentarias, no teu próximo fecho; o Diogo decide.
