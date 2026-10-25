# site-montecasabranca · CLAUDE.md (memória e regras do Claude Code para o site)

**Ficheiro de arranque, escrito a 13/10/2026 a pedido do Diogo, ANTES do «passa ao Claude».** Pelo acordo v1.2 este ficheiro é do Claude
(só ele o escreve) e nasce no dia da passagem; o Diogo mandou antecipá-lo para a próxima conversa SITE abrir já neste repositório com a memória
certa. Até ao «passa ao Claude» o Claude **só lê** este repositório: não toca em `design/`, `docs/`, `public/`, `src/` nem `.github/`. Este é o
único ficheiro que escreveu aqui antes da passagem.

## 1. O que é isto

O site público do Monte Casa Branca, `montecasabranca.pt`. A app de reservas vive noutro repositório (`appmontecasabranca`, privado,
`app.montecasabranca.pt`) e é a única fonte de verdade de disponibilidade, tarifas, pré-reservas e avaliações; o site fala com ela por portas
HTTPS, nunca pela base de dados nem entre repositórios.

**A regra é o ACORDO DE TRABALHO v1.2 (13/10/2026), aprovado pelo Diogo, pelo ChatGPT e pelo Claude.** Texto integral em
`appmontecasabranca/docs/temas/site/chatgpt/2026-10-13_acordo_dois_repositorios_v1.2.md` (+ `.pdf`); cópia a entrar em `docs/decisoes/` deste
repositório pelo ChatGPT (fase 0). Qualquer alteração é uma versão nova (v1.3…), com diferenças listadas, validada pelos três; nada se muda na conversa.

## 1a. O Monte e quem nos visita (brief do Diogo, 16/10; o mesmo que deu ao ChatGPT)

Texto integral, factos novos e leitura técnica em `appmontecasabranca/docs/temas/site/2026-10-16_brief_diogo_conceito_perfis.md`. O essencial:
- **Conceito:** o espelho do que o Diogo mais gostou em anos de Airbnb e nada do que detestou. **O oposto do «rústico» alentejano**: casa
  moderna, conforto de casa de cidade (classe média alta), no campo (piscina, silêncio, ar puro, espaço para amigos). 270 m², 4 quartos,
  8 pessoas, AC em todas as divisões, lareira na biblioteca, tudo novo, cozinha equipada para mais do que 8 (copos de vinho incluídos),
  roupa de cama e colchões novos, animais de companhia bem-vindos, zona exterior de uso livre, ovelhas de vez em quando. Sem check-in presencial.
- **O argumento da época baixa:** entrar sexta à noite e sair domingo às 11h é aproveitar um dia; **aqui fica-se até ao fim do domingo**
  (quando não há entrada nesse dia; a porta #189 chega para o dizer). 80–90 % dos hóspedes vêm de Lisboa, a 1 h.
- **Três perfis por época:** out–mar famílias em escapadinha (1 pagante, preço a competir) · abr–jun e set casais 25–35 com amigos que
  **dividem as contas** · jul–ago 1 pagante abastado (semana sáb–sáb, família, «o avô que paga»). **Predominância dos 45–65**: value for
  money próximo do estilo de vida deles; os mais novos sem formalidade, mas nada de «casa de surf com cocktail».
- **Objetivo:** encontrar mais gente na época baixa e **ser apanhado pelas pesquisas em LLM** («alojamento perto de Évora para 8»): texto
  corrido com números exatos em cada página, `FAQPage`, `VacationRental` completo, `llms.txt`, PT e EN. Os KPI da app (`lib/kpi.php`) informam
  a dinâmica (fim de semana vs semana, estadia média por época, distrito de origem, antecedência); o site não os lê.
- **Radar (sem data):** o site virar app à chegada (guia da casa em `/guia/`, `noindex`, ligado pela mensagem T6 da app): eletrodomésticos,
  «e se ficarem sem água», restaurantes, passeios. Só com a lista do Diogo.
- **Widget do tempo (Diogo, 16/10):** próximos dias em Montemor-o-Novo na página de entrada; no simulador, o tempo por dia da estadia
  (previsão até 16 dias, depois média dos últimos anos) e a hora do pôr do sol no domingo. Open-Meteo pelo browser, coordenadas da casa,
  sem dados do visitante, some se falhar; segundo serviço externo a seguir ao Google Fonts (brief, secção 7.8).
- **Por confirmar pelo Diogo:** 3,2 ha (brief) ou 3,6 ha (MyBestHotel 2022); regra miúda dos animais.

## 1b. Papel do Claude nesta fase: MONITOR (regra do Diogo, 17/10)

«Não quero que comeces a fazer código algum sem fechar com ele os básicos. Nesta fase tens de servir como monitor e registar o que está a ser
feito e ajudar a perceber se o que está a ser repensado do outro lado inviabiliza o que temos feito. Só quando eu achar que do outro lado está
algo coerente é que te digo para começares a agir.» Logo, em cada sessão SITE até ao «começa a agir»: ler o que o ChatGPT entregou
(`git log`, `docs/decisoes/`, `design/`), registar na memória, e **avisar o Diogo só quando algo contradiz** o acordo v1.2, o contrato das
portas (`contrato_portas_v1.md`), o `FACTOS.md`, a stack da secção 6 ou as portas #189/#190. **Zero código** (site e app, portas incluídas),
**zero propostas de desenho**. As sugestões aceites (S22–S24) passaram ao ChatGPT pelas linhas 12–14 da secção 8 do brief; a S23 fica como nota
técnica para a construção.

**Atualização 17/10 (cerca das 19h20): a demo incremental.** Instrução do Diogo, registada pelo ChatGPT em
`docs/decisoes/2026-10-17_demo_incremental_handoff_claude.md` (+ `aprovadas.md` e `pendentes.md`): «Prepara para fazer um site demo para que
seja testado. Passa ao Claude informação para fazer a demo à medida que formos fazendo avanços.» O papel de monitor **deixa de impedir só
este trabalho delimitado**: a área `demo/` (código do Claude), a implementação de cada entrega de design do ChatGPT como revisão da demo
(rascunho até o Diogo apreciar), os testes e o endereço de teste privado. Continua tudo o resto: zero desenho de raiz, zero produção em
`public/`/`src/`, zero portas, zero publicação no domínio, nada na app. Não é o «passa ao Claude» nem o «Lança». Regras da demo em
`demo/LEIA-ME.md`; revisões em `demo/REGISTO.md`; estado atual em `demo/versao.json`. Não copiar `interacao.js` das propostas rejeitadas.

## 2. Papéis (acordo, secção 2)

- **Diogo** decide tudo por olho e por escrito; cria acessos; autoriza cada deploy («Lança»); faz as tarefas de painel (Amen, DNS, Linktree, Google).
- **ChatGPT** faz o design e o look and feel em HTML e CSS, escolhe as fotos por zona, escreve os textos PT das páginas, faz QA. **Gere este
  repositório até à conformidade.** Não escreve código de produção nem toca na app.
- **Claude Code** faz todo o código: o site gerado a partir do design, PT e EN, simulador, formulário, SEO e LLM, testes, capturas, workflow de
  deploy, as portas na app (em sessões APP, pelas regras da app), publicação na Amen. **Não propõe desenho de raiz** (três propostas vetadas:
  v2, direções A/B/C, v3). Entra neste repositório só depois do «passa ao Claude».

## 3. Pastas e quem escreve onde (acordo, secção 3)

| Pasta | Dono |
|---|---|
| `design/` (HTML + CSS entregues, `LEIA-ME.md` do sistema) | ChatGPT |
| `docs/identidade`, `docs/fotografia`, `docs/design`, `docs/conteudos` (PT), `docs/decisoes` | ChatGPT (até à passagem; depois cada um no seu) |
| `docs/conteudos` (EN e ficheiro final), `docs/integracao-app` | Claude (o ChatGPT revê) |
| `public/imagens`, `public/marca`, `public/fontes` | ChatGPT e Diogo |
| `public/*.html`, `public/prereserva.php`, `src/`, `.github/workflows/`, `CLAUDE.md` | Claude |

`main` é a verdade. `git fetch` + `git pull --rebase origin main` antes de escrever e antes do push; **nunca `--force`**; conflito pára e avisa
o Diogo. Commits «SITE · assunto»; os do Claude levam o link da sessão. Nenhum deploy decorre de um commit. Ficheiros gerados não se editam à mão.

## 4. Como o Claude abre uma sessão neste repositório

1. Ler este ficheiro (entra sozinho).
2. Juntar o repositório `appmontecasabranca` à sessão **só para ler** e ler lá o `CLAUDE.md` (secções 1, 5, 6 e 10) e o `docs/temas/SITE.md`,
   que é a memória do tema SITE até à passagem (estado, decisões, S1–S18, DESCONHECIDOS, dez linhas para o ChatGPT).
3. Dizer em cinco linhas onde estamos; as perguntas do tema com as respostas do Diogo; os recados; as três linhas «o que vais ver».
4. Verificar o que o ChatGPT fez aqui desde a última vez (`git log`, `docs/decisoes/`, as memórias dele `*_memoria_chatgpt.md`), sem lhe tocar;
   **ler as sugestões S que ele numerou antes de numerar as do Claude** (numeração partilhada).
5. Tudo em português, sempre (também as respostas). Fecho de sessão: três sugestões fora da caixa numeradas S19, S20… com sim/não a cada
   uma; depois a memória, commit, push, estado em cinco linhas e o commit.

Enquanto a passagem não acontece, a memória escreve-se em `appmontecasabranca/docs/temas/SITE.md` (juntar a app com escrita para isso).
**No dia da passagem este ficheiro passa a ter as secções Estado · Decisões · Próximo passo, e o `SITE.md` da app passa a apontar para aqui.**

## 5. Lista de conformidade para o «passa ao Claude» (acordo, secção 4)

1. O Diogo disse «sim» a cada página, por olho, no telemóvel, escrito em `docs/decisoes/aprovadas.md` com data.
2. Cada página em `design/` como HTML + CSS que abre do ficheiro, sem build, sem framework, sem serviço externo além do Google Fonts.
3. `design/LEIA-ME.md` com o sistema: fontes, cores (hex), espaçamentos, componentes, blocos por página.
4. Fotos escolhidas pelo nome (Canva `MCB …` ou caminho do Dropbox), em `public/imagens/` em tamanho web (lado maior 1 600 px, JPG 80–85).
   Sem imagens de banco nem geradas.
5. Logótipo autorizado em `public/marca/`.
6. Factos só do `FACTOS.md` com ✓; o resto marcado `[?]`.
7. Telemóvel (390 px) e desktop (1 280 px) desenhados; sem rolagem horizontal.
8. `docs/fotografia/creditos.md` com uma linha por imagem (origem, autor, autorização datada pelo Diogo) e o Diogo escreve «passa ao Claude».

## 6. O que o Claude faz depois da passagem (acordo, secções 7–9)

Stack: HTML, CSS e JS estáticos em `public/`, gerados por `src/gerar.py` (Python 3, biblioteca padrão) a partir de `src/conteudos/*.json` e do
CSS do design; um único PHP, `public/prereserva.php`, com `site_config.php` fora da raiz web (não versionado). PT na raiz, EN em `/en/`.
`robots.txt`, `llms.txt`, schema.org, `sitemap.xml`, favicon, Open Graph. Testes `captura.mjs` e `testes.mjs` em cada push (workflow
«Capturas»); `deploy.yml` manual com `dry_run`, rsync de `public/` para a raiz confirmada, `--delete` só lá dentro, só com o «Capturas» verde;
staging em `novo.montecasabranca.pt` antes do go/no-go do Linktree. As quatro portas da app (#189 ocupação, #190 tarifa, #191 pré-reserva,
#192 avaliações) pelo contrato `contrato_portas_v1.md`; #189 e #190 podem fazer-se já, em sessões APP (v1.2).

## 7. Estado

- **13/10/2026:** repositório criado pelo Diogo com o ChatGPT; árvore do acordo (pastas vazias com `.gitkeep`), README de uma linha,
  `docs/identidade/logo/README.md` (estudo futuro, não aprovado; o logótipo atual mantém-se), `docs/decisoes/2026-10-13_validacao_acordo_v1.2.md`
  (v1.2 validada). Pendentes da fase 0 (ChatGPT): copiar o acordo v1.2, `contrato_portas_v1.md` e `creditos.md`; README, brief e FACTOS.
  Fase 1 por começar: fotos da página inicial pelo nome, 2–3 direções em HTML/CSS mobile-first, veto do Diogo.
- Acesso do Claude testado a 13/10 (app «Claude» do GitHub com «All repositories»). Este `CLAUDE.md` é a única escrita do Claude antes da passagem.
- **16/10 (5.ª sessão SITE, a primeira aberta aqui):** nada mudou neste repositório desde 13/10 (fase 0 do ChatGPT por fazer; conformidade
  0/8). O Diogo colou o brief «conceito, perfis, domingo, LLM» (secção 1a); guardado na app com os factos novos no `FACTOS.md` e a leitura
  técnica; no fecho, o widget do tempo (secção 1a). Nada em `design/`, `docs/`, `public/`, `src/`. **17/10: o ChatGPT fechou a sessão dele em `docs/decisoes/2026-10-17_memoria_chatgpt.md`**
  (S19 convite para reunir o grupo ACEITE · S20 visita filmada FUTURO · S21 mensagem do hóspede → futura app; frente «logo e branding book»
  secundária; observações técnicas às propostas do Claude, aceites no brief, secção 7.9). **Sugestões do Claude renumeradas S22–S24, ACEITES pelo Diogo a 17/10 como ideias a passar ao ChatGPT** (S22 linha de base nos três
  assistentes · S23 pôr do sol calculado no browser, nota técnica · S24 as 20 perguntas dos três perfis pelo ChatGPT); **nenhuma vira código
  até ordem do Diogo (secção 1b: o Claude é monitor).** **Regra:** ler `docs/decisoes/` antes de numerar; a numeração S é partilhada pelos dois assistentes.
  **17/10 · `docs/integracao-app/RECADOS_PARA_O_CHATGPT.md` criado** (pasta do Claude pelo acordo): recado ao ChatGPT para prever o widget do
  tempo no desenho (onde aparece, estados, linha «Dados: Open-Meteo», dados fixos de exemplo no HTML de `design/`). É a segunda escrita do Claude
  neste repositório antes da passagem, a pedido do Diogo; o ficheiro serve para os recados seguintes.
  Em aberto: 3,2 vs 3,6 ha · animais (regra miúda) · S8 · DESCONHECIDOS da Amen · autorização das fotos · «começa a agir».
- **17/10 (6.ª sessão SITE, demo r0):** o ChatGPT entregou entretanto direções A/B/C (`design/direcoes/`), retoma-v2 e o estudo Janela/Índice;
  **tudo rejeitado ou insuficiente pelo Diogo, nenhuma direção aprovada** (`docs/decisoes/2026-10-17_fecho_design_memoria_chatgpt.md`,
  `docs/design/2026-10-17_estudo_inicial_go-nogo.md`). S25/S26 rejeitadas; S27 (teste sem fotos) aceite só depois do primeiro go/no-go e
  ainda por executar. **Próxima sugestão: S28** (conferir `docs/decisoes/` antes). Por instrução do Diogo (secção 1b, atualização), o Claude
  criou a base da demo: `demo/site/` (página neutra «Demo em preparação» + `revisao.html` com revisão/estado/entrega/commit),
  `demo/ferramentas/demo.py` (testar · construir · servir · empacotar · artefacto) e `captura.cjs` (Chromium 390/1280), `versao.json`,
  `REGISTO.md`, `LEIA-ME.md`, `.gitignore` para `demo/_saida/` e `demo/_pacotes/`. Testes e capturas verdes. **Endereço de teste:**
  https://claude.ai/artifact/DdiLqNNHdNeJnF61d4cr3S (página privada do claude.ai; a mesma ligação em todas as revisões; republicar com
  `demo.py artefacto` + Artifact). Sem ambiente de preview no repositório (privado, Pages desligado); `novo.montecasabranca.pt` continua
  DESCONHECIDO e é painel do Diogo. **S28–S30 ACEITES pelo Diogo (17/10, «29 sim 30 sim 28 sim») e feitas:** S28 capturas versionadas em
  `demo/capturas/rN/` · S29 ligação fixa por revisão (`demo.py artefacto --fixa`) + `site/revisoes.html` · S30 workflow «Capturas»
  (`.github/workflows/capturas.yml`, só `demo/`, sem deploy). Ligação fixa r0: https://claude.ai/artifact/Ld3NMAqtE7cyCNxv2Ud7cV.
  **Próxima sugestão: S31.** **r1 (rascunho) = D03 «Casa ao sol»**, entrega do ChatGPT (`design/estudo-d03-2026-10-17/index.html`,
  commit e066def, handoff `docs/design/2026-10-17_d03_casa_ao_sol_handoff.md`), implementada tal qual em `demo/site/` (CSS/JS em
  ficheiros, imagens individuais, `noindex`); **falha técnica encontrada e reportada** (logótipo esticado: `height="354"` sem
  `height:auto`), correção provisória em `demo/site/correcoes-demo.css` e recado em `docs/integracao-app/RECADOS_PARA_O_CHATGPT.md`.
  Cenários (três espaços, menu, painéis, datas) verdes em Chromium. Ligação fixa r1: https://claude.ai/artifact/MYfKqmUJ3qrXSCgQmupCRP.
  **A r1 não está aprovada**: espera o olho do Diogo; não afinar a D03 por iniciativa técnica. Workflow «Capturas» verde no GitHub.
  **Fecho (17/10, cerca das 20h):** a pedido do Diogo, botões «Copiar» ao lado de cada ligação em `demo/site/revisoes.html` (commit
  29eaa38) e as três ligações entregues em texto simples. **Sessão fechada sem sugestões novas (ordem do Diogo); próxima continua S31.**
  **Próximo passo:** o Diogo vê a r1 no iPhone e diz sim/não por escrito (ChatGPT regista em `aprovadas.md`); o ChatGPT corrige o
  logótipo na fonte D03 (recado) e entrega o avanço seguinte; o Claude implementa como r2 (rascunho), com capturas, ligação fixa e
  `REGISTO.md`. Em aberto: autorização pública das fotos no `creditos.md` · `novo.montecasabranca.pt` · S27 · 3,2 vs 3,6 ha.
- **18/10 (7.ª sessão SITE):** a pedido do Diogo, o Claude escreveu `docs/integracao-app/2026-10-18_kpi_e_publicos_para_o_chatgpt.md`
  (pasta do Claude pelo acordo): retrato agregado do negócio sem dados pessoais a partir do corte Excel→app de 21/8 (reservas, canais,
  dimensão dos grupos, crianças, repetentes), catálogo e regras dos 20 KPI de `lib/kpi.php`, preços 2027, perfis do brief cruzados com
  os dados, o que falta e como se obtém (secção 7; secção 8 vazia à espera dos agregados da app). Responde ao pendente do ChatGPT de
  17/10. A app foi junta à sessão **só para ler**; nada mudou lá. Entretanto o ChatGPT fechou outra sessão (17/10, 22h46,
  `docs/decisoes/2026-10-17_fecho_6_modelos_pitch_memoria_chatgpt.md`): seis modelos, três no `main` (`design/modelos-6-2026-10-17/`),
  **nenhum aprovado**; processo «seis → duas → uma»; sem sugestões novas, **S31 continua a próxima**. Há trabalho privado do Claude com o
  Diogo fora do repositório, por instrução dele («fica no registo desta mensagem só»): não registar aqui até ordem. Rede do ambiente:
  Dropbox, Zenfolio e montecasabranca.pt continuam bloqueados (confirmado a 17/10).
  **18/10 (noite) · SITE → APP, com autorização escrita do Diogo («Autorizo … uma sessão APP em que eu produzo um relatório agregado
  anual sem dados pessoais»):** feito na app o **#193 «Relatório KPI»** (… → Dados técnicos; commit `46a6a16` da app; **no servidor desde o
  deploy n.º 115 da app (real; 114 = ensaio), 18/10 às 23h55, rsync igual ao ensaio, healthcheck 200**). Instalado; falta: o Diogo toca «Guardar no Dropbox», o Claude lê o `.md` em
  `13. APP Gestão AL/kpi/` pelo conector e preenche a secção 8 do documento KPI. O GPT pediu entretanto capturas das janelas
  (ocupação, fim de semana, estadia, antecedência, distritos): a receita janela a janela ficou na conversa; o relatório #193 cobre tudo
  isso em texto. Nota de monitor: o GPT fala numa «prancha escolhida» e num «conceito aprovado visualmente» que **não existem em
  `aprovadas.md`**; avisado o Diogo.
  **19/10 (00h–01h) · FECHO DA 7.ª SESSÃO SITE.** (1) **#193 no servidor da app** (deploy n.º 115 = `46a6a16`; memória da app `6607ac9`).
  O Diogo faz os testes na app quando calhar («Testes a continuar na app»); à 01h de 19/10 não há pasta `kpi/` no Dropbox (a `backups/`
  está), logo o T2 não foi feito; pelo documento do GPT, o relatório foi-lhe entregue às 23h56 por «Copiar». **Secção 8 do documento KPI
  por preencher**: pelo conector quando houver `13. APP Gestão AL/kpi/kpi_relatorio_*.md`, ou se o Diogo colar o relatório na conversa.
  (2) **Documento de fecho do ChatGPT de 19/10 gravado pelo Claude a pedido do Diogo** (a gravação do GPT foi bloqueada do lado dele) em
  `docs/decisoes/2026-10-19_fecho_chatgpt_design_kpi.md`, tal e qual, com nota de proveniência (commit `c812cab`; exceção pontual, a
  pasta continua do GPT). O que lá está: «primeira prancha editorial, reconstruída com fotografias reais» **aprovada em termos de design**;
  mensagem, textos e narrativa **não aprovados** (quatro caminhos em análise: «Cada um ao seu ritmo» · «Por dentro. Por fora. Sem pressa.» ·
  «Há dias em que não é preciso mais nada.» · «Um lugar onde as coisas simples podem ser extraordinariamente boas.»); evitar destacar
  «Reguengo» e «270 m²»; capturas de Booking/Airbnb recebidas (avaliações no site: ideia bem recebida, sem desenho); KPI do #193 recebidos
  e confidenciais (2026: 20 vendidas, 88 noites, 78 % direto em noites, 40 % repetentes, antecedência mediana 107 dias, jul 74 %/ago 94 %,
  faixa 35–44 a mais representada, Lisboa 68 % dos CP portugueses); secção 6 com papéis diferentes do acordo; próxima sessão deles:
  retomar a prancha, mensagem, públicos, menus. (3) **Três observações de monitor**, escritas ao GPT em `RECADOS_PARA_O_CHATGPT.md`
  (commit `14cde5b`): **a)** a prancha aprovada **não está em `design/` nem no `aprovadas.md`** (que continua «Nenhuma direção escolhida»);
  pedido ao GPT: nome do ficheiro, gravar em `design/`, linha no `aprovadas.md` com data e âmbito; **até lá a demo fica na r1 e nada da
  prancha se implementa** · **b)** a secção 6 («Claude: responsável pelos textos»; GPT «parceiro criativo») **diverge do acordo v1.2**
  (textos PT do GPT; Claude EN, ficheiro final e código); se for decisão do Diogo é uma v1.3 com diferenças listadas; **até lá segue-se a
  v1.2; o Diogo ainda não respondeu** · **c)** nota técnica: «não destacar 270 m²»/localidade é compatível com o brief (números exatos para
  os LLM) desde que o número e a morada existam em texto corrido/FAQ, no `VacationRental` e no `address`. (4) **S31–S33 propostas e SEM
  RESPOSTA** («Verificamos as sugestões depois», Diogo, 19/10): **S31** prova dos perfis do brief contra os números do #193 numa secção 8b
  (confirmada · parcial · contrariada) · **S32** `docs/integracao-app/numeros_publicos.json` com os agregados que podem ir ao site, cada um
  com ✓ do Diogo e data, lido pelo gerador para PT, EN, `FAQPage` e `llms.txt` · **S33** teste de factos no `testes.mjs` da demo (cada
  número das páginas contra o `FACTOS.md` com ✓ e o ficheiro da S32; `[?]` ou desconhecido falha). **Próxima sugestão: S34.**
  **ABRIR A PRÓXIMA SESSÃO SITE POR:** «Lê o CLAUDE.md e diz-me em cinco linhas onde estamos» + respostas às S31–S33 + «a secção 6 do GPT é
  decisão tua?» + ver se o GPT pôs a prancha em `design/` e a linha no `aprovadas.md` (só então r2 da demo, rascunho, com capturas e
  `REGISTO.md`) + T2 do #193 → secção 8 do documento KPI. Em aberto, como antes: olho do Diogo à r1 · autorização pública das fotos no
  `creditos.md` · `novo.montecasabranca.pt` · S27 · 3,2 vs 3,6 ha · rede do ambiente (Dropbox, Zenfolio) · trabalho privado fora do
  repositório por ordem do Diogo, não registar até ordem.
  **21/10 · A PRANCHA APROVADA ENTROU NO REPOSITÓRIO.** O Diogo enviou a imagem ao Claude («Esta é a versão aprovada», PNG 1536 × 1024);
  gravada em `design/prancha-aprovada-2026-10-19/prancha-editorial-fotos-reais.png` com LEIA-ME de proveniência e âmbito (só design;
  mensagem/textos não), e a linha de aprovação escrita no `aprovadas.md` com as palavras do Diogo e a data (pasta do GPT; exceção pontual,
  como o fecho). A versão curta do fecho do GPT ficou anexada ao ficheiro de 19/10 (`26622db`). **Leitura do monitor contra o
  `FACTOS.md`:** telefone errado na prancha («962 800 626»; o certo é 962 802 626) · «3,6 ha» por confirmar (3,2 no brief) · widget do
  tempo e simulador ausentes, a prever nas páginas · logótipo a confirmar; tudo o resto bate. Recado ao GPT com os quatro acertos.
  Ficheiro devolvido ao Diogo para abrir no PC. **A demo fica na r1** até o GPT entregar páginas HTML + CSS em `design/` a partir da prancha;
  cada entrega vira uma revisão (r2, r3…). Em aberto: resposta do Diogo à secção 6 do fecho do GPT (papéis) · S31–S33 · T2 do #193 → secção 8.
  Próxima sugestão: **S34**.
  **21/10 (noite) · BASE TÉCNICA DA DEMO (v2), pedido do Diogo:** «uma demo técnica onde o GPT possa carregar os designs do site (página
  principal, subpáginas, ligações, widgets, calendário, preços) … em cada mudança do design dele eu poder tomar a decisão olhando para o que
  será real … mobile direto; desktop no Safari ou aqui em modo desktop … a base para que o GPT consiga trabalhar dentro e não avariar».
  Feito em `demo/` (código do Claude, dentro do mandato da demo de 17/10): **`demo/base/CONTRATO.md`** (o GPT entrega em `design/site/`:
  `index.html` + subpáginas, CSS, `imagens/` + `imagens.json`; regras das páginas; nomes reservados; os cinco encaixes `data-base` com o
  DOM `b-…` que o kit produz; o ciclo entrega → workflow → `montar` → revisão → ligações) · **`demo/base/kit/base.js`** (tempo Open-Meteo
  com semana de exemplo quando `navigator.webdriver` ou sem rede; calendário de ocupação na forma da porta #189; simulador com a tarifa
  2026/2027 do FACTOS §4, limpeza do ano, mínimo 2, verão sáb→sáb 7 noites, mensal 4 000/28 nov–mar, aviso de noites ocupadas, tempo da
  estadia com «média histórica» além de 16 dias, pôr do sol calculado no browser (S23); pedido de datas = formulário + WhatsApp + email (S2),
  JSON do contrato #191, nada enviado; antes/depois) e **`base.css`** só estrutural · **`demo/base/dados/`** (`ocupacao.json` INVENTADA,
  `tarifas.json`, `clima-medias.json` aproximado e marcado exemplo, `tempo-exemplo.json`, `factos.json` só ✓) · **`demo.py`**: `montar
  [--rev rN --titulo … --limpar --para pasta]` (design/site + kit → demo/site, injeta `noindex`/kit, atualiza `versao.json`, `imagens.json`,
  `REGISTO.md`), `testar --design` (contrato: estrutura, ligações, imagens, encaixes, telefone errado e hectares fazem falhar), verificação de
  `demo/site/base` sincronizado, `servir --pasta` · **`demo/site/componentes.html`** (os encaixes a funcionar, sem desenho) e
  **`demo/site/desktop.html`** (qualquer página a 390/768/1024/1280) · `captura.cjs --paginas` · workflow «Capturas» também em `design/site/**`
  com o ensaio das páginas do GPT (artefacto «ensaio-design»). **Verificado:** `testar` OK (5 páginas); capturas 390/1280 OK; cenário do kit
  em Chromium (tempo 7 dias, calendário 2 meses com ocupadas, simulador 1 170 €, recusa de noites ocupadas, regra do verão, pedido com
  WhatsApp e JSON, antes/depois, sem erros JS nem rolagem horizontal); motor testado em node (9 casos + pôr do sol). Capturas em
  `demo/capturas/r1/` (componentes-*, desktop-*). **Sem revisão nova:** a r1 (D03) fica na entrada até `montar --limpar --rev r2` com o
  `design/site` do GPT. Recado ao GPT com o resumo e a ligação. **Regras mantidas:** zero desenho (CSS estrutural), zero portas na app (dados
  de exemplo na forma das portas; trocar por endereço em `MCB_BASE_CONFIG`), nada em `public/`/`src/`, nada publicado no domínio.
- **24–25/10 (8.ª sessão SITE · «Continua de ontem onde paraste») · A V1.3.1 DO GPT MONTADA COMO r2 DA DEMO.** O GPT entregou a 24/10 (commits
  03b97fe → 65391b0) sete páginas em `design/site/` (V1 → V1.3.1; snapshots em `design/arquivo/2026-10-24/`, índice `design/HISTORICO-VERSOES.md`),
  o fecho `docs/decisoes/2026-10-24_fecho_chatgpt.md` (+ `ULTIMO_FECHO_CHATGPT.md`), a análise `docs/design/2026-10-24_analise_galeria_menu.md` e
  `design/site/galeria.json`. **Decisões do Diogo registadas pelo GPT (22–24/10):** desenhar as páginas antes da mensagem (texto default «Uma casa
  inteira. O Alentejo à vossa porta.», não aprovado); a prancha é referência permanente; **a estrutura das sete páginas está aceite como base**
  («A estrutura está boa e eu gosto. Não é para inventar mais»); home em scroll é o foco; sem tabela de preços por época nem «Reguengo»; Montemor
  valorizado, roteiro N2 de duas noites; trio e antes/depois mantidos com pares certos; KPI confidenciais. **Não aprovados:** barra inferior mobile,
  microgalerias por trio, Menu + «Verificar disponibilidade» flutuantes, curadoria da galeria, mensagem. Mensagem do Diogo de 24/10 («Acho que esta
  é a última conversa sobre o site» + o texto do GPT) tratada a 25/10. **Feito (25/10):** `demo.py montar --limpar --rev r2` com a V1.3.1 tal qual;
  `testar`/`testar --design` OK; cenário Chromium 84 verificações OK (menu, barra inferior, tempo, simulador 1 170 €/1 350 €, regra do verão,
  pedido com JSON #191, calendário → simulador, recusa de noites ocupadas, filtros e ampliação da galeria, roteiro); capturas jpg em
  `demo/capturas/r2/`; **ligação principal republicada** https://claude.ai/artifact/DdiLqNNHdNeJnF61d4cr3S e **fixa r2**
  https://claude.ai/artifact/UZMG6AvToxcNK83odg7rs9; `REGISTO.md`, `versao.json` (r1 com o commit 734473e), `LEIA-ME.md`. **Correções de
  ferramenta (não desenho):** `imagens.json` deixou de ser nome reservado no `demo.py` (engano meu apontado pelo GPT) → **CONTRATO v1.1**; o workflow «Capturas»
  esteve vermelho desde 21/10 por duas causas: esse nome reservado nas entregas do GPT e, no meu commit de 21/10 e no de 25/10, o runner
  `ubuntu-latest` que passou a Ubuntu 26.04, onde o Playwright 1.56.1 não instala o Chromium → runner fixado em `ubuntu-24.04` (commit
  16178f0; **corrida n.º 11 verde**, 25/10 11h17, a primeira verde desde 17/10); kit: pedido sem datas = mensagem simples (Contactos); `artefacto` tolera `<body data-page>`;
  `componentes.html`; `captura.cjs --formato jpg`; a linha no `creditos.md` passa a aviso na demo; workflow: ensaio só com o Playwright instalado.
  **Monitor:** factos batem com o `FACTOS.md` (telefone, sem hectares/Reguengo/KPI, distâncias, casa, regras); **a conferir pelo Diogo:** links das
  plataformas nas Perguntas diferentes dos do FACTOS §8 e sem Vrbo; morada completa para o schema.org (nota c de 19/10). **Antes/depois:** os dois
  pares estão errados (o GPT marcou-os; confirmei por olho); originais no Dropbox `7. Fotos/6. Antes e Depois/` (25 ficheiros; antes = a14, a20,
  a22, a15 pela data); **a rede não deixa descarregar imagens do Dropbox (403)**, o par escolhe-se por olho. Recado ao GPT com tudo isto
  (`RECADOS_PARA_O_CHATGPT.md`, 25/10). **Dropbox `13. APP Gestão AL/kpi/` continua sem ficheiro:** T2 do #193 por fazer; secção 8 do documento KPI
  por preencher. **App (só leitura, sem pull):** `origin/main` da app está 42 commits à frente do clone local (deploy n.º 136; #194 DVM, o agente dentro da
  app, #195 NPS/«Como souberam», #196–#199); **nenhuma porta do site (#189–#192) foi feita** e não há recados SITE novos lá. **Lição de ferramenta:** chamadas Bash em paralelo partilham o diretório; usar `git -C` e caminhos absolutos, nunca `cd`.
  **Em aberto:** olho do Diogo à r2 (iPhone e Safari pelas ligações) · S31–S33 sem resposta · secção 6 do fecho do GPT de 19/10 (papéis) · 3,2 vs
  3,6 ha · logótipo · autorização pública das fotos e `creditos.md` (11 imagens sem linha) · `novo.montecasabranca.pt` · S27. **Próxima
  sugestão: S34** (S34–S36 propostas no fecho de 25/10, à espera do sim/não: S34 ligações das plataformas pelo `factos.json` do kit · S35
  `demo.py revisao rN` num só comando · S36 issue automático no GitHub por entrega do GPT com o resultado do contrato e as capturas do ensaio).
