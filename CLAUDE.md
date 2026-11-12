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
  e confidenciais (os números estão no relatório #193 da app; retirados deste ficheiro a 7/11, quando o repositório passou a público); secção 6 com papéis diferentes do acordo; próxima sessão deles:
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
- **25/10 (tarde) · respostas do Diogo e segunda parte da 8.ª sessão.** (1) **As ligações das plataformas ficam a cargo do Claude** («o GPT
  trabalha o design … algumas informações poderão não ser as mais corretas … o papel dele é design e imagem»): as oficiais são as do Linktree
  em uso (FACTOS §8); as do GPT na V1.3.1 (`airbnb.pt/rooms/…`, `Share-a7Qww5`) não têm origem registada e não se usam até o Diogo as
  confirmar. **S34 FEITA:** `demo/base/dados/factos.json` ganhou `ligacoes` (Airbnb, Booking, Vrbo, Instagram, WhatsApp, email, mapa); o kit
  aplica `data-liga="…"` e corrige por domínio as escritas à mão (`data-liga-corrigida="1"`, `target=_blank`, `rel=noopener`); `testar --design`
  avisa; **CONTRATO v1.2** (§3.6). Verificado em Chromium na demo construída. (2) **«Reguengo» (decisão do Diogo):** é a localidade postal e só
  entra na morada completa (schema.org `PostalAddress`; contactos/rodapé em letra pequena); nunca em títulos, textos, URLs, legendas ou `alt`
  («ninguém pesquisa por Reguengo; Reguengos é outra terra»); **palavras da zona: Évora, Alentejo, Montemor-o-Novo, Alqueva, «a 1 h de Lisboa»**.
  FACTOS §1, §5 e §8 atualizados nas duas cópias (app `6d40408`, memória do tema SITE; e `docs/conteudos/fontes/FACTOS.md`, cópia idêntica do
  GPT, sincronizada). (3) **Galeria do Zenfolio lida pelas 23 capturas do Diogo** (All Media · O Monte · Os Quartos · A Quinta · Antes e Depois ·
  Montemor o Novo; o Claude não abre o Zenfolio nem vê imagens do Dropbox): `docs/integracao-app/2026-10-25_zenfolio_e_pares_antes_depois.md`
  com a estrutura dos seis álbuns, **os 11 pares certos (ad01–ad11)**, os quatro ficheiros já identificados (a3 = ad02 depois; a14 = ad07 antes;
  a15 = ad08 antes; a20 = ad10 antes) e a tabela dos 25 ficheiros de `7. Fotos/6. Antes e Depois/` para o Diogo identificar por olho (a data
  do ficheiro não chega: os «antes» fotografados em 2023 têm data de 2023). **Pasta nova no Dropbox, a pedido do Diogo:** `13. APP Gestão AL/
  site/zenfolio/` com `LEIA-ME_zenfolio_e_pares_2026-10-25.md` e `antes-e-depois/` com os quatro originais copiados com nome final
  (`ad02_salao_depois.jpg`, `ad07_pergula-tanque_antes.jpg`, `ad08_quarto_antes.jpg`, `ad10_poco-lado_antes.jpg`); os restantes entram quando
  o Diogo mandar a lista «aN = adNN lado». As 23 capturas ficam no scratchpad da sessão, não no repositório. (4) **Microgalerias do trio: «ok»**
  do Diogo; as fotos saem de `7. Fotos/2. rodrigo/` em HD (nomes no `creditos.md`). (5) **S34, S35 e S36 ACEITES («ok» aos três) e FEITAS:**
  S35 `demo.py revisao rN [--titulo …]` (montar --limpar → testar → capturas jpg em thread com `criar_servidor` → artefacto e artefacto --fixa;
  repetir a mesma revisão não apaga o título) · S36 workflow «Capturas»: `permissions: issues: write`, passo «Mudou design/site?» (`gh api
  compare`), `contrato.log`, `id: contrato`/`ensaio`, passo final que abre um issue «Entrega do design <sha7>: contrato OK/FALHA» com os
  resultados e a ligação à corrida; **o caminho «sim» só se prova no próximo push do GPT em `design/site/`**. (6) **O momento da pausa no
  design** (pedido do Diogo, «analisa com o GPT»): critério proposto ao GPT no recado de 25/10 (2.ª parte): passa ao Claude quando as mudanças
  pedidas forem de texto, foto e estilo e não de estrutura (sete páginas com «sim» à estrutura e à mensagem v1 depois do «explodido»; as três
  interações decididas; fotos pelo nome; snapshot congelado); fase técnica de 2–3 sessões SITE + 1–2 APP (gerador, produção em `public/`,
  schema.org, `llms.txt`, `prereserva.php`, portas #189/#190, staging); durante ela sem mudanças de estrutura; depois o design continua em
  `design/site/` e cada entrega volta a virar revisão. O GPT responde no próximo fecho; o Diogo decide. **«De antes»** (o Diogo não percebeu a
  lista): clarificado na resposta, item a item, com a ação concreta de cada um. **Em aberto:** olho do Diogo à r2 · lista «aN = adNN lado» ·
  S31–S33 · secção 6 do fecho do GPT de 19/10 · 3,2 vs 3,6 ha · logótipo · `creditos.md`/autorização das fotos · `novo.montecasabranca.pt` ·
  T2 do #193. **Próxima sugestão: S37.**

- **25/10 (3.ª parte) · PARES ANTES/DEPOIS FECHADOS PELO GPT.** A pedido do Diogo («escreve aqui uma instrução para passar ao gpt»), o Claude
  escreveu a instrução (pastas de origem e destino, os 11 pares descritos, os 4 já identificados, nomes finais, o que não fazer) e o GPT
  executou-a: abriu os 25 originais de `7. Fotos/6. Antes e Depois/` e identificou os 22 dos 11 pares, **a1–a22 pela ordem do álbum, ímpar =
  depois, par = antes, exceto o quarto (a15 antes, a16 depois)**; a22 = ad11 antes (não ad01/ad03, como o Claude supunha pela data); os três
  que sobram (`8 …`, `9 …`, `IMG_1105 …HEIC`) são quartos fora do álbum e não foram copiados. Copiou 14 JPG tal e qual e converteu os 4 HEIC
  (a2, a9, a10, a16) a JPG q100 para `13. APP Gestão AL/site/zenfolio/antes-e-depois/` (**22 ficheiros**, `adNN_<espaco>_antes|depois.jpg`);
  origem intacta (25 ficheiros, última modificação 27/3/2024). **Conferido pelo Claude:** nomes, datas de captura e bytes (os 18 JPG iguais
  aos originais que o GPT indica, logo a correspondência está provada; os HEIC convertidos têm 6,3–10,7 MB); o conteúdo das imagens não,
  por não as conseguir abrir. Erro do Claude na instrução: «21 que faltam» eram 18. O GPT não pôde substituir o LEIA-ME do Dropbox e gravou
  `LEIA-ME_zenfolio_e_pares_2026-10-25_com_identificacao.md` (original + secção 5 com a tabela); **ficar um só ficheiro (apagar o original,
  que vai para «Ficheiros eliminados», e renomear o novo) espera o «sim» do Diogo**, porque o conector não substitui nem apaga sem ordem.
  Registado em `docs/integracao-app/2026-10-25_zenfolio_e_pares_antes_depois.md` (secções 2, 3 e 5, tabela dos 25 com bytes) e recado ao
  GPT (3.ª parte: os 22 na próxima entrega de `design/site/`, `imagens.json` a apontar ao original, 22 linhas no `creditos.md`). **A demo r2
  fica com os dois pares errados da V1.3.1 até à próxima entrega do GPT** (regra: não afinar o design por iniciativa). **Em aberto:** sim do
  Diogo ao LEIA-ME único no Dropbox · olho do Diogo à r2 · S31–S33 · secção 6 do fecho do GPT de 19/10 · 3,2 vs 3,6 ha · logótipo ·
  `creditos.md`/autorização das fotos (22 linhas dos pares incluídas) · `novo.montecasabranca.pt` · T2 do #193 · resposta do GPT à proposta
  da pausa no design. **Próxima sugestão: S37.**
- **25/10 (4.ª parte, 16h38 UTC) · «Sim» do Diogo ao LEIA-ME único: FEITO.** Apagado o LEIA-ME original de 13h18 UTC (em «Ficheiros
  eliminados» do Dropbox, recuperável) e o ficheiro do GPT renomeado para `LEIA-ME_zenfolio_e_pares_2026-10-25.md`; na pasta
  `13. APP Gestão AL/site/zenfolio/` fica um só LEIA-ME (versão do GPT: secções 1–4 de 13h18 + secção 5 com a identificação; as tabelas
  preenchidas estão no documento do repositório). Ferramenta: o primeiro `move` ficou «em curso» mais de dois minutos; repetido, concluiu em
  segundos. **Nota de monitor:** apareceu `zenfolio/v2/` (16h29–16h33 UTC, não é do Claude; pelo padrão dos nomes é do GPT): os cinco álbuns
  do Zenfolio reconstruídos a partir dos originais de `7. Fotos/` (`01-o-monte/` 47 · `02-os-quartos/` 12, com `02_a16.HEIC` · `03-a-quinta/`
  17 · `04-antes-e-depois/` = cópia dos 22 · `05-montemor-o-novo/` 14; 112 ficheiros); as contagens de A Quinta e Montemor ficam abaixo das
  capturas («cerca de 24» e «cerca de 25»), a confirmar pelo GPT no fecho dele; o Claude não conferiu as imagens nem mexe na pasta; a
  referência dos pares continua `zenfolio/antes-e-depois/`. Registado na secção 5 do documento dos pares. **Em aberto:** olho do Diogo à r2 ·
  fecho do GPT sobre a `v2/` e a proposta da pausa no design · S31–S33 · secção 6 do fecho do GPT de 19/10 · 3,2 vs 3,6 ha · logótipo ·
  `creditos.md`/autorização das fotos · `novo.montecasabranca.pt` · T2 do #193. **Próxima sugestão: S37.**
- **25/10 (5.ª parte, fim da tarde) · «Consegues por isto a funcionar ou tenho de procurar outra opção?» · A r3 DA DEMO, CONSTRUÍDA PELO
  CLAUDE.** Mensagem do Diogo: não gosta da direção («completamente frio e sem qualquer alma»; «já estamos nisto há 2 semanas»); escreveu a
  lógica do site em sete pontos (1 piscina e casa logo à entrada, «testa a primeira página com esta foto e com a outra mais de lado com a
  espreguiçadeira e chapéu» · 2 mensagem forte com fotografias fortes · 3 a casa em detalhe, «o exterior é rei», depois a sala e o interior
  · 4 avaliações e perguntas frequentes · 5 localização, Montemor-o-Novo e N2 · 6 contactos · 7 o botão da disponibilidade sempre à mão,
  com o tempo a ajudar e a hipótese de contacto); «Coloca o lovable contigo a construir isto»; «Já temos a prancha… a mensagem que o gpt
  criou… as fotos, tu tens a base e fazes o código». **Resposta do Claude: sim.** Feito nesta parte: **(1) r3** em `demo/r3/` (código e
  composição do Claude a partir da prancha de 19/10 e dos textos PT da V1.3.1; `index.html` = a experiência inteira em scroll pelas sete
  secções, `fotografias.html`; folha própria `estilos-r3.css` com os tokens do GPT; `r3.js` para cabeçalho, menu, revelar ao rolar, barra
  «Ver datas» + WhatsApp no telemóvel e botão flutuante no desktop, paralaxe suave; os cinco encaixes do kit nas datas; só factos ✓;
  morada completa só no rodapé; a avaliação real do Airbnb de 2023), montada com `demo.py revisao r3 --de demo/r3` (**opção `--de pasta`
  nova em `montar`/`revisao`**; `captura.cjs` passa a rolar a página antes da fotografia); `testar` OK, capturas 390/1280 OK (corrigida a
  grelha do tempo que estourava 51 px no telemóvel); **ligação principal** https://claude.ai/artifact/DdiLqNNHdNeJnF61d4cr3S e **fixa r3**
  https://claude.ai/artifact/DCCRdLyWL9UmSkRk2oCQdF; `REGISTO.md` (secção r3), `versao.json`, `LEIA-ME.md`. **(2) Lovable**, a pedido: projeto
  «Monte Casa Branca» no workspace «MONTE's Lovable» (plano free; 4,6 créditos gastos) com o mesmo brief em sete pontos, a prancha, as
  quatro fotografias e o logótipo; editor https://lovable.dev/projects/96fa8399-2585-4338-bf69-b63411871178, pré-visualização
  https://id-preview--96fa8399-2585-4338-bf69-b63411871178.lovable.app (a rede do ambiente não a abre; o Diogo vê-a no browser). É React +
  Tailwind, fora da stack do acordo (HTML/CSS/JS estáticos gerados, PHP único) e pior para o objetivo LLM/SEO se ficar como app de
  cliente: serve de referência de «alma», não de produção; o que lá ficar melhor passa à demo em CSS. **(3) Limite real: fotografias.**
  Só há onze no repositório (seis em tamanho web); a fotografia «de lado com a espreguiçadeira e o chapéu» não chegou na mensagem; o
  Dropbox continua bloqueado à sessão (403 no download, testado outra vez) → as fotografias têm de entrar pela conversa (o Claude
  guarda-as em `demo/r3/imagens/`) ou pelo repositório (GPT/Diogo). Recado ao GPT (4.ª parte) com a lista. **Papéis:** esta revisão é
  desenho feito pelo Claude a pedido escrito do Diogo; o acordo v1.2 (desenho do GPT) só muda por decisão dele registada (v1.3).
  **Em aberto:** olho do Diogo à r3 (iPhone pela ligação fixa) e à versão do Lovable · fotografias para a r4 · a mensagem final · o
  resto como antes (S31–S33, secção 6 de 19/10, 3,2 vs 3,6 ha, logótipo, `creditos.md`, `novo.montecasabranca.pt`, T2 do #193, fecho
  do GPT sobre a `v2/` e a pausa). **Próxima sugestão: S37.**
- **25/10 (6.ª parte, noite) · DUAS CORREÇÕES DO DIOGO.** (1) «O Lovable pode funcionar em todas as páginas» **não era uma ordem**: «não
  quer dizer que tenha de funcionar; para isso preciso de ti; analisa e vê a melhor opção». A minha mensagem anterior cruzou-se com a dele.
  **Decisão do Claude (a pedido):** o site é construído pelo Claude em HTML/CSS/JS estáticos (acordo, Amen, `prereserva.php`, kit, texto no
  HTML para os LLM, custo zero); o Lovable fica como referência de look and feel e não gasta mais créditos sem pedido. Nota técnica: o
  projeto do Lovable é TanStack Start (React com renderização no servidor), logo a objeção «texto fora do HTML» é menor do que escrevi às
  17h; o que pesa é a hospedagem (precisa de Node, a Amen não serve; ficaria no Lovable com custo mensal) e refazer a ligação à app em
  TypeScript. Projeto não tocado desde a primeira versão (4,6 créditos). (2) **Fotografias: nunca mais pedir ao Diogo** («eu não vou passar
  fotos nenhumas. vocês é que são os espertos… se não consegues trabalhar fotos não me digas que consegues fazer o site»). Regra registada.
  O material existe e está organizado: `7. Fotos/3. anuncios/V2_verão/` 69 · `V3_inverno/` 62 · `V1/` 44 · `Interior/` por divisão (sala 5,
  biblioteca 9, quartos 1–4: 11/8/5/14) · `2. rodrigo/HD` · `zenfolio/v2/` 112 · `antes-e-depois/` 22 (`7. Fotos/gallery/` é o software X3,
  sem fotografias). **Dois caminhos, lançados os dois:** **A)** o GPT entrega `design/fotos/` (galeria completa de 112 + 22 e a seleção por
  zonas com duas capas, 1 600 px, `imagens.json`, `creditos.md`): recado 5.ª parte com os caminhos, as contagens e os nomes; **B)** o
  Diogo destranca o Dropbox à sessão do Claude na política de rede do ambiente (Allowed domains: `dl.dropboxusercontent.com`,
  `www.dropbox.com`, `previews.dropbox.com`): com isso o Claude descarrega, vê e escolhe as fotografias ele próprio e faz a r4 no dia.
  **Próximo passo:** r4 = galeria completa por álbuns + zonas + as duas capas em alternância, assim que as fotografias entrarem por A ou B.
  **Em aberto:** olho do Diogo à r3 · fotografias (A/B) · resto como antes. **Próxima sugestão: S37.**
- **25/10 (7.ª parte, noite) · DECISÃO DO DIOGO: O SITE SEGUE PELA VERSÃO DO LOVABLE, «adaptada com coisas tuas».** («na verdade o site dele
  ficou muito melhor do que o teu… queria seguir pelo dele e adaptar com coisas tuas».) Registado em
  `docs/integracao-app/2026-10-25_decisao_site_no_lovable.md`: a base é o projeto do Lovable (TanStack Start, React 19 com renderização no
  servidor, Tailwind 4, shadcn/ui; uma rota em `src/routes/index.tsx`, `src/lib/stay.ts`); as peças do Claude entram lá (portas #189–#192,
  motor de tarifas do kit, Open-Meteo, pôr do sol, pré-reserva pelo servidor do site, schema.org, `llms.txt`, `robots.txt`, `sitemap.xml`, EN,
  galeria completa, testes); **é uma alteração ao acordo v1.2 (stack e hospedagem) → v1.3 a escrever**; a demo estática `demo/` (r0–r3) fica
  como registo e não continua. **Método:** código do Claude pelo GitHub (o Diogo liga o projeto do Lovable ao GitHub no editor; o Lovable cria
  um repositório na conta dele; o Claude junta-o à sessão e faz push, sem créditos); desenho pelo agente do Lovable (créditos: plano gratuito
  5/dia, 4,6 gastos; precisa do plano pago, que o Diogo disse pagar); hospedagem no Lovable com domínio próprio (plano pago; DNS na Amen pelo
  Diogo); a app fica na Amen; a regra «não pedir fotografias ao Diogo» mantém-se (entrega do GPT em `design/fotos/`, ou o Claude se a rede abrir
  o Dropbox). **Próximo passo:** o Diogo faz o plano pago e a ligação ao GitHub e diz o nome do repositório; o Claude porta o motor do kit
  para `stay.ts`, liga o tempo real, prepara o calendário na forma da porta #189 e o pedido na forma da #191, SEO/LLM e EN; sessões APP para
  #189/#190. Em aberto: fotografias (GPT/rede) · mensagem final · v1.3 do acordo · resto como antes. **Próxima sugestão: S37.**
- **25/10 (8.ª parte, noite) · AS PEÇAS DO CLAUDE PORTADAS PARA O PROJETO DO LOVABLE, à espera do repositório.** O Diogo confirmou o método
  («então temos de ir página a página com a dele e a tua como referência para afinar. é isso?» → sim; «se for preciso ter crédito lovable
  temporários pagamos»). Feito, sem créditos: `lovable/src/lib/` com `datas.ts`, `tarifas.ts` (tarifa 2026/2027, regras, `orcamento()` na
  forma da porta #190, `porDoSol()`), `tempo.ts` (Open-Meteo, WMO, média histórica, semana de exemplo), `ocupacao.ts` (porta #189, saída
  exclusiva, `intervaloLivre()`), `pedido.ts` (porta #191, textos WhatsApp/email, `enviarPrereserva()` só no servidor com `X-Site-Chave`),
  `factos.ts` (só ✓), `seo.ts` (JSON-LD `VacationRental`/`LodgingBusiness` e `FAQPage`, `robots.txt` com os robôs dos LLM, `llms.txt`);
  `src/test/tarifas.test.ts` (vitest) e `lovable/verificar.mjs` (`node --experimental-strip-types`: **20 verificações certas**, pôr do sol
  21/jun/2027 = 21h01; `tsc --strict` limpo); `lovable/LEIA-ME.md` diz onde cada peça entra (substitui `stay.ts`, o painel de datas, o
  head). **Próximo passo:** quando o Diogo ligar o projeto do Lovable ao GitHub e disser o nome do repositório, o Claude junta-o à sessão,
  mete estas peças, liga o painel «Verificar disponibilidade» ao motor e ao tempo real, e escreve os pedidos ao agente do Lovable secção a
  secção (capa com a segunda fotografia; mensagem; a casa com a galeria completa; avaliações e as dez perguntas; datas reais; Montemor e N2;
  contactos). Fotografias: entrega do GPT (recado 5.ª parte) ou rede aberta ao Dropbox. **Próxima sugestão: S37.**
- **25/10 (9.ª parte, noite) · «Não estou a perceber nada… Eu preciso ver e ter o detalhe do site geral e explodido página a página,
  antes de desenhar a parte técnica. Se vamos usar a parte criativa do Lovable temos de acertar primeiro no design.»** Duas correções ao
  Claude: (1) a mensagem sobre créditos foi contraditória (às 18h «não gasta mais créditos» quando o Lovable era só referência; às 18h30
  «precisa do plano pago» quando passou a ser a base): a regra certa, dita de uma vez, é «rever e decidir não gasta; cada mudança feita pelo
  agente do Lovable gasta (1–5 créditos); o plano gratuito dá 5 por dia; o pago faz tudo em um ou dois dias»; (2) **ordem: primeiro o design
  fechado secção a secção, depois a parte técnica**; as peças portadas (8.ª parte) ficam à espera e não custam nada. Feito:
  `docs/integracao-app/2026-10-25_explodido_site_lovable.md`: o site geral e as sete secções da versão do Lovable (lidas do código), com o
  que está, o que falta face aos sete pontos do Diogo e as decisões numeradas (0.1 página de fotografias · 1.1–1.3 capa · 2.1–2.2 mensagem ·
  3.1–3.3 a casa · 4.1–4.3 avaliações e perguntas · 5.1–5.3 Montemor e N2 · 6.1–6.2 contactos · 7.1–7.3 barra e painel), e o método por
  lotes (decisões → pedido ao agente por lote → olho do Diogo → repetir → só depois a técnica). **Próximo passo:** respostas do Diogo às
  decisões numeradas; as secções 1, 3 e 5 dependem das fotografias (GPT/rede). **Próxima sugestão: S37.**
- **1/11 (10.ª parte) · PERGUNTAS DO DIOGO: AMEN OU LOVABLE? O CRACHÁ? A CAPA 2? · A EXPORTAÇÃO ESTÁTICA PROVADA.** Perguntas: «se o
  site for desenvolvido pelo Lovable fica em amen.pt? temos acesso a gerir os conteúdos ou é o concorrente da Amen? já pago a Amen» ·
  «na versão free o logo do Lovable fica na página: onde aparece, incomoda?» · «o estilo do Lovable é mais agradável, a dinâmica de
  movimento é muito agradável; só não consigo ver a capa 2». **Feito, sem créditos:** o projeto do Lovable foi copiado pela API (só
  leitura: 15 ficheiros de código, as imagens pelas nossas cópias de `demo/r3/imagens/`), construído na sessão com `bun install` + `vite
  build` e **uma linha de `prerender`** no `vite.config.ts` → **`.output/public/` com 12 ficheiros, 1,9 MB, todo o texto no HTML, zero
  referências ao Lovable**; servido e fotografado em Chromium a 390/1280: sem erros JS, sem rolagem horizontal, painel e simulador a
  funcionar (1 170 €). Receita, `vite.config.ts`, `package.minimo.json` e tabela Lovable-vs-Amen em **`lovable/exportacao-estatica/`**;
  capturas em **`lovable/capturas/2026-11-01/`** (`00-site-geral` com as faixas numeradas · `01`–`06` por secção · `07-acompanhamento`
  barra/painel/menu · `cru-*`). **Conclusão (resposta ao Diogo):** o site pode ficar na Amen (já paga) com o Lovable só como ferramenta
  de desenho; o crachá «Made with Lovable» é posto pelo alojamento do Lovable no plano gratuito (canto inferior direito), não existe no
  código nem na Amen; a capa 2 está desligada porque a fotografia da piscina de lado com a espreguiçadeira e o chapéu **não existe em
  lado nenhum a que o Claude chegue** (repositório sem `design/fotos/` do GPT a 1/11; Dropbox e `docs.lovable.dev` continuam
  bloqueados à sessão); a única coisa parecida é o recorte `piscina-espreguicadeira.jpg` da própria capa 1 (r3). **Ferramenta:** o `npm
  install` 10.9 rebenta com o `overrides` do rolldown («Cannot read properties of null (reading edgesOut)»); `bun install` funciona;
  servidor estático em segundo plano só com `run_in_background` (um `&` dentro da chamada normal matou a chamada, exit 144).
  **Em aberto:** respostas do Diogo às decisões do explodido (9.ª parte) · fotografias (GPT/rede) · método Lovable → GitHub → Amen a
  confirmar pelo Diogo · resto como antes. **Próxima sugestão: S37.**
- **1/11 (11.ª parte) · «AMEN.» · ligação ao GitHub explicada · fotografias: o que há no GitHub · HANDOVER AO GPT.** Decisão do Diogo:
  **o alojamento é a Amen** (adenda em `docs/integracao-app/2026-10-25_decisao_site_no_lovable.md`); o Lovable só para desenhar. Duas
  críticas: «não gostei das tuas fotos» (as cinco da r3/Lovable são a seleção do GPT de 17 e 24/10, as únicas em tamanho web no
  repositório; o Claude não escolheu nenhuma) e «não consegues aceder ao Dropbox? deve estar tudo já no GitHub» (não está:
  **`docs/fotografia/2026-11-01_inventario_github.md` + `.jpg`**: 33 distintas = 7 originais em tamanho web + 2 recortes do Claude + 24
  miniaturas do estudo do GPT; o Dropbox tem 112 + 22 + ≈175; a entrega `design/fotos/` pedida a 25/10 não aconteceu; a rede bloqueia
  também `previews.dropboxusercontent.com`, o anfitrião das miniaturas do conector, testado a 1/11, CONNECT 403). **Handover ao GPT**
  escrito em `RECADOS_PARA_O_CHATGPT.md` (1/11): v1.3 com o GPT dono do design, fotografias por zona e textos PT; o Lovable é a tela;
  passo 1 = `design/fotos/` (galeria 112 + 22 e zonas com `capa-01`/`capa-02`, as 24 do estudo em tamanho web, `imagens.json`,
  `creditos.md`); passo 2 = alinhamento secção a secção pelas decisões numeradas do explodido (mensagem, galeria, dez perguntas, roteiro
  N2, página de fotografias) em `docs/design/`; regras mantidas. **Ligação do Lovable ao GitHub (explicada ao Diogo, de memória, a
  documentação do Lovable está bloqueada à sessão):** editor → GitHub → Connect → autorizar a app do Lovable na conta
  `diogovianamachado-coder` → criar o repositório (novo, privado, `main`) → sincronia nos dois sentidos; depois o Diogo diz o nome e o
  Claude junta-o à sessão (a app «Claude» do GitHub tem «All repositories» desde 13/10). **Em aberto:** nome do repositório · entrega
  `design/fotos/` do GPT · respostas às decisões do explodido · v1.3 do acordo a escrever · resto como antes. **Próxima sugestão: S37.**
- **7/11 (12.ª parte) · REPOSITÓRIO PÚBLICO · FOTOGRAFIAS AINDA SEM CHEGAR · HANDOVER PARA OUTRO ASSISTENTE.** O Diogo: «já tens o
  repositório público para veres as fotos» e «se eu quiser passar a outro LLM o que temos feito e que instruções lhe queres dar… como
  seria a informação?». Verificado: `site-montecasabranca` **passou a público** (entre 2 e 7/11), mas **sem commits novos desde 82a2298
  (1/11), sem ramos, sem `design/fotos/`**; a conta do GitHub só tem os dois repositórios de sempre (o do Lovable não existe, a ligação
  não se concluiu); Dropbox `13. APP Gestão AL/site/` só com `zenfolio/`. **Alerta de monitor ao Diogo:** público não dá ao GPT
  autorização para escrever (só leitura a toda a gente) e expõe os KPI confidenciais (`docs/decisoes/2026-10-19_fecho_chatgpt_design_kpi.md`,
  o retrato agregado `docs/integracao-app/2026-10-18_kpi_e_publicos_para_o_chatgpt.md` e o histórico deste ficheiro); os números foram
  retirados do texto atual do `CLAUDE.md` (o histórico do git guarda-os; nunca `--force`); recomendado voltar a privado e resolver a
  escrita do GPT com token «fine-grained» só deste repositório ou pela entrega no Dropbox. **Handover escrito:**
  `docs/integracao-app/2026-11-07_handover_para_outro_assistente.md` (projeto em dez linhas · mapa de onde está cada coisa · onze
  decisões fechadas · estado a 7/11 · regras para qualquer assistente · método técnico do desenho ao domínio · alertas · mensagem para
  o Diogo colar ao novo assistente). **Em aberto:** repositório privado outra vez · ligação Lovable → GitHub no computador · entrega
  `design/fotos/` do GPT (token ou Dropbox) · respostas ao explodido · v1.3 · resto como antes. **Próxima sugestão: S37.**
- **7/11 (13.ª parte) · O SITE EM PHP, FEITO POR OUTRO ASSISTENTE, VERIFICADO.** O Diogo entregou `site-php_2026-11-07.zip` + `NOTA_PARA_O_CLAUDE.md`
  («esta pasta é o site final, em PHP puro, pronto a subir para a Amen»; página única com as secções do Lovable em `index.php` + `partes/`,
  `assets/css/site.css`, `assets/js/site.js`; portas `api/ocupacao|tarifa|prereserva|avaliacoes|tempo.php`; `conteudo.php`; `inc/factos.php`,
  `inc/tarifas.php` portado do meu `tarifas.ts`; SEO; `.htaccess`) e pediu «verifica tudo». **Verificação completa em
  `docs/integracao-app/2026-11-07_revisao_site_php.md`** (+ pasta `revisao-site-php-2026-11-07/` com patch e capturas): sintaxe limpa;
  tarifas PHP = TS em 16 casos; corrido em PHP 8.3 com uma app de ensaio pelas formas do contrato e sem app; Chromium 390/1280.
  **Achados:** A) **bloqueante no telemóvel**: `site.js` usa `abertas` (l. 48) antes de a declarar (l. 79) → no iPhone o painel, o menu, a
  galeria e os álbuns não respondem (296 erros); corrigido com uma linha e retestado (tudo a funcionar) · B) aviso PHP «Undefined array key
  lingua» em `avaliacoes.php` e `prereserva.php` e a língua a chegar vazia à app; corrigido e retestado · C) sem botão para confirmar o
  preço quando a app responde 409 `preco` · D) com a app em baixo o calendário parece todo livre sem aviso · E) IP por `X-Forwarded-For`
  (falsificável) · F) dados pessoais em `cache/pedidos.log` dentro da raiz web e ninguém avisado · G) `pedido_id` do cliente sem validar ·
  H) JSON-LD sem `JSON_HEX_TAG` · I) texto da conta errado em estadias que mudam de época (total certo) · J) **fotografias = as mesmas 33 do
  GitHub, 24 miniaturas de 600 px esticadas na galeria; `design/fotos/` continua sem existir** · K) duas secções novas por decisão do autor
  («A casa, num relance» e «Fotografias» na página) e a mensagem do Lovable, não aprovada · L) factos todos certos; plataformas no rodapé
  em vez da linha da FAQ (8/10) · M) falta EN, `www`/HTTPS, testes no workflow, `creditos.md`, portas na app, chave. **Leitura:** cumpre
  «Amen» e fica mais perto do acordo v1.2 do que o Lovable (v1.3: página PHP, pasta `site/` vs `public/`, design vindo do Lovable).
  **Decisão do Diogo pendente:** seguir por este caminho, quem aplica as correções, `site/` ou `public/` no repositório. **Próxima sugestão: S37.**
- **7/11 (14.ª parte, noite) · SITE EM PHP v2 VERIFICADO: tudo o que a revisão pediu está aplicado e a funcionar.** O Diogo entregou
  `site-php_2026-11-07_v2.zip` + NOTA v2 («v2 em site/, com a tua revisão aplicada; repete o php -l + capturas 390/1280»). Feito: `php -l`
  (21) e `node --check` limpos; **138 fotografias (120 novas, 132 em tamanho web, 65 `-m`)**, as 24 miniaturas saíram dos álbuns (ficam 6
  pequenas: antes/depois ×4, piscina-entardecer, montemor-rua); corrida com app de ensaio e sem app, Chromium 390/1280: **zero erros JS,
  zero avisos PHP**; A–I e L confirmadas uma a uma (fluxo do preço 409 → «Confirmar 1 170 €» → `confirmo_preco` → aceite; sem app: nota
  «Calendário indisponível», 55 dias a tracejado, pedido anotado, `cache/.htaccess`). Secção 6 do relatório + capturas em
  `revisao-site-php-2026-11-07/v2/`. **Veredito: pronto para o ensaio em `novo.montecasabranca.pt`.** Em aberto: decisão do Diogo
  (seguir por aqui; `site/` ou `public/`; K; mensagem) · EN · testes no workflow · `creditos.md` · portas na app · chave · `design/fotos/`
  continua ausente do GitHub (as fotos em tamanho web só existem no zip). **Próxima sugestão: S37.**
- **7/11 (15.ª parte, noite) · «O SITE É SEMPRE POR AQUI QUE ENTRA, NÃO HÁ DÚVIDA» · DEMO r4 · O SITE NO REPOSITÓRIO · DEPLOY E TESTES.**
  Decisão do Diogo: o site segue pelo site em PHP; «faz uma demo com o que está para eu começar a trabalhar alterações e sugestões»; «vão
  aparecer mais fotos quando o GPT as conseguir lá colocar, mas até lá podemos começar a lançar a estrutura»; pergunta: «consegui com este
  bypass que o site tivesse a dinâmica do Lovable?» (resposta: sim, as mesmas interações estão lá, e mais algumas; verificadas em Chromium).
  **Feito:** (1) **`site/` no repositório** = a v2 do zip, sem a NOTA (171 ficheiros, 24 MB; `config.php` e `cache/*` fora pelo `.gitignore`);
  a pasta chama-se `site/` como no LEIA-ME do autor (o acordo dizia `public/`; a diferença vai para a v1.3). (2) **Demo r4:** rendição estática
  de `site/` + `demo/portas-demo.js` (bundle `bun build --format iife` de um shim TS que imita as cinco portas no browser: tarifa pelo motor
  `lovable/src/lib/tarifas.ts`, ocupação e tempo de exemplo, avaliações vazias, pedido simulado «DEMO · não foi enviado»), `noindex`, 144
  ficheiros; **ligação principal** https://claude.ai/artifact/DdiLqNNHdNeJnF61d4cr3S (versões 10–11; os 33 ficheiros da r3 removidos com `null`)
  e **fixa r4** https://claude.ai/artifact/53xz7FmTzRVpLE95v5YMA9 (pasta copiada, porque o mesmo caminho republica sempre o mesmo artefacto);
  testada sem servidor em Chromium (conta, tempo, pedido simulado, zero pedidos reais, zero erros). `demo/REGISTO.md` r4 e `demo/LEIA-ME.md`.
  (3) **Testes do site em cada push:** `demo/ferramentas/site/` (`app-ensaio.php` pelo contrato, `captura-site.cjs` com veredito, `config.ensaio.php`,
  `testar-site.sh`) e o job **«site»** no `capturas.yml` (paths `site/**`); provado localmente: 21 PHP OK, tarifa via app e de recurso, capturas
  390/1280 com e sem app sem erros, sem avisos PHP; **corrida «Capturas» n.º 15 (commit `2b53b60`) verde no GitHub, jobs «site» (2 min 07 s) e
  «capturas»**. (4) **`deploy-site.yml`** (manual; `destino` novo|raiz, `dry_run` por omissão true,
  `reescrever_config`, `sem_capturas`; travão #176; rsync de `site/` sem `config.php`/`cache/`/LEIA-ME; **escreve o `config.php` no servidor a
  partir de variáveis e secrets** se faltar; travões: pasta existe e nunca é a da app; healthcheck da página e das portas). **Para o ensaio em
  `novo.montecasabranca.pt` falta do Diogo:** criar o subdomínio no painel da Amen apontado a uma pasta e dizer o caminho → variável
  `SITE_PATH_NOVO`; secrets `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY` no repositório do site (os mesmos da app); depois «Lança» (ensaio
  com `dry_run` e depois real). **Em aberto:** fotografias do GPT (antes/depois e Montemor em tamanho web; `design/fotos/` ausente) · K · mensagem ·
  EN · `creditos.md` · portas #189–#192 na app e `SITE_CHAVE` · v1.3 do acordo · repositório público (KPI). **Próxima sugestão: S37.**
  **23h01 · «Lança» do Diogo → ensaio n.º 1 do `deploy-site.yml` (dry_run, destino novo, run 42423325992) parou no travão certo:
  `falta a variável SITE_PATH_NOVO`; `DEPLOY_HOST` e `DEPLOY_USER` também vazios no registo (os três secrets ainda não existem no repositório
  do site). O travão #176 passou (Capturas n.º 16 verde para `e6f96a6`) e os 21 PHP passaram no `php -l`. Nada foi enviado. À espera dos
  três passos de painel do Diogo (variável `SITE_PATH_NOVO` + secrets `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`); depois relançar o ensaio.**
  **23h53–23h57 · «Feito» do Diogo → ensaios n.º 2 (`94f21ea`) e n.º 3 (`3b50575`), os dois parados, nada enviado.** O n.º 2 parou no travão
  #176: o «Capturas» tinha filtro `paths` e não correu para um commit só de memória. **Correções (commit `3b50575`):** o «Capturas» corre em
  todos os pushes a `main` (como na app) e o `deploy-site.yml` ganhou um passo de **pré-voo** que lista de uma vez o que falta. O n.º 3 parou
  no pré-voo com **os quatro em falta** (variável `SITE_PATH_NOVO`; secrets `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`), apesar do «Feito»:
  hipóteses, repositório errado (o da app já tinha os `DEPLOY_*`), «Environment» em vez de «Repository», ou nomes diferentes. Pedidas ao Diogo
  capturas das duas páginas Settings do repositório do site. Lição de ferramenta: Python em linha no Bash com aspas escapadas rebenta; guiões
  em ficheiro no scratchpad (`estado_run.py`, `esperar_run.py`, `capturas_sha.py`).**
  **8/11 (00h) · «Não estou a perceber o que precisas de mim.»** Explicação refeita em linguagem simples (é o passo 5 da receita de 14/9 da
  app, agora no repositório do site). Para tirar um passo ao Diogo, o `deploy-site.yml` passou a assumir a pasta do subdomínio pela convenção
  da Amen (`/data/sites/web/montecasabrancapt/subsites/novo.montecasabranca.pt`, como a da app); a variável `SITE_PATH_NOVO` ficou opcional
  (só se a pasta for outra) e o travão «pasta existe» protege um palpite errado; a da raiz continua obrigatória. Falta só o que não posso
  fazer: os três secrets `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY` no repositório do site, e o subdomínio criado na Amen.**
  **8/11 (00h20) · captura do painel da Amen (Diogo: «é aqui?»):** bloco «Sites e aliases», 2/5 websites: `montecasabranca.pt` (Hoved = principal,
  **Caminho do sítio `/www`** → a pasta da raiz para o dia do «Lança» final é `/data/sites/web/montecasabrancapt/www`, a confirmar no servidor) ·
  `www.montecasabranca.pt` (Alias da raiz: o `www` do ponto M já está tratado no painel) · `app.montecasabranca.pt` (Underside = subsite).
  PHP 8.4 na raiz. O subdomínio `novo.` cria-se com «+ Adicionar site» como Underside; orientação dada ao Diogo.**
  **8/11 (00h30) · `novo.montecasabranca.pt` CRIADO na Amen** (Underside, pasta `/subsites/novo.montecasabranca.pt`, «Habilitado», 3/5 websites).
  O browser do Diogo chega ao servidor com `NET::ERR_CERT_AUTHORITY_INVALID`: **DNS feito sozinho pelo painel; certificado HTTPS ainda por emitir**.
  O healthcheck do `deploy-site.yml` passou a tolerar isso (curl exit 60 → aviso e continua com `-k`). A sessão não resolve DNS fora da lista
  permitida (nem `dns.google`): o teste do DNS é pelo browser do Diogo. Falta: os três secrets no GitHub → «Feito» → ensaio.**
  **8/11 (00h40) · «Gerir» do `novo.` na Amen (capturas):** Let's Encrypt «Habilitado» com validade «Não aplicável» (certificado por emitir);
  HTTPS, HTTP/2 e «Forcing HTTPS» ligados (o HTTP → HTTPS do ponto M fica no painel, por subdomínio); botão «Reemitir certificado» indicado ao
  Diogo para forçar a emissão agora que o DNS responde. Nada mais a mudar nesta página.**
- **8/11 (20h10–20h12 UTC) · O SITE ESTÁ EM `novo.montecasabranca.pt` · deploy-site n.º 4 (ensaio) e n.º 5 (REAL), commit `3c73fd9`.**
  «Feito» do Diogo (os três secrets no repositório do site; chave lida do `montia_rsa` do portátil). **Ensaio n.º 4** (run 42518729309): pré-voo OK,
  «Capturas» verde, 21 PHP OK, SSH à Amen OK, pasta de destino existente só com o `index.html` do painel, rsync a seco com os 171 ficheiros do
  site (24,7 MB, todos novos; `config.php`, `cache/`, LEIA-ME de fora). **Real n.º 5** (run 42518850508): rsync igual (o `index.html` do painel
  apagado), **`config.php` escrito no servidor** pelo workflow (`SITE_URL` novo · `APP_URL` app · `OCUPACAO_EXEMPLO` true · **`SITE_CHAVE` vazia**,
  até a porta #191 existir), `php -l` OK, `cache/` 775; **healthcheck HTTP 200 à primeira, já com o certificado Let's Encrypt válido** (sem aviso);
  `api/tempo.php` ok:true com Open-Meteo real a partir do servidor; `api/tarifa.php` ok:true, `fonte: site` (motor de recurso; a #190 não existe).
  **O que o Diogo vê em novo:** calendário com quatro períodos ocupados INVENTADOS e a nota «Calendário de exemplo»; conta pelo motor do site;
  pedido de datas anotado em `cache/pedidos.log` + email ao `geral@` (não chega à app). **Lacuna encontrada e fechada em `main` (por enviar, espera
  «Lança»):** o ensaio era indexável (sem `noindex`, `robots.txt` a permitir tudo, e o Let's Encrypt publica o nome) → `site/.htaccess` serve
  `robots-ensaio.txt` (Disallow: /) e `X-Robots-Tag: noindex` quando o Host é `novo.*`; `index.php` imprime `<meta name="robots" content="noindex,
  nofollow">` só nesse Host; `testar-site.sh` verifica os dois casos (bateria local inteira verde). A raiz não muda. **Deploys do site até aqui:**
  1–3 parados nos travões · 4 ensaio · 5 real. **Em aberto:** «Lança» do n.º 6 (noindex) · olho do Diogo ao site em novo · `SITE_CHAVE` e portas
  #189–#192 na app · fotografias do GPT · K · mensagem · EN · `creditos.md` · v1.3 · repositório público (KPI). **Próxima sugestão: S37.**
  **8/11 (20h20 UTC) · O DIOGO VIU O SITE EM `novo.` («a funcionar neste site»; «no mobile também aparece ok») e deixou duas notas + «lança».**
  (1) «O site tem de se chamar www.montecasabranca.pt e não novo.»: **confirmado, `novo.` é só o ensaio**; o definitivo é `montecasabranca.pt`
  com `www.` como alias (já no painel) e muda no «Lança» final para a raiz (`/www`). (2) «O símbolo no site que seja o nosso símbolo» (a pestana
  mostrava a casinha genérica do `favicon.svg`): **favicon = o logótipo tal como aprovado para o ícone da app a 4/10** (fundo cal, logótipo
  a azul, `appmontecasabranca/assets/icone_512.png`) em `site/assets/img/` (`favicon.ico` 16/32/48 + cópia em `site/favicon.ico`, `favicon-16/32.png`,
  `icone-192.png`, `apple-touch-icon.png` 180, `icone-512.png`), ligados no `index.php` com `?v=2`; `favicon.svg` removido. Se o Diogo preferir
  as cores do site (castanho sobre cal) troca-se num minuto. (3) «e não é https?»: é; o Chrome esconde o `https://` e trocou o cadeado pelo
  ícone de ajustes; o healthcheck validou o certificado sem a exceção `-k`. **«Lança» dado → deploy n.º 6 (ensaio) e n.º 7 (real) com a
  proteção do ensaio (noindex) e o favicon.**
  **8/11 (20h28–20h30 UTC) · deploy-site n.º 6 (ensaio, run 42520058394) e n.º 7 (REAL, run 42520354999), commit `17198b1`, VERDES.** Lista do
  ensaio exatamente a esperada (`<f.st` só em `.htaccess` e `index.php`; novos `favicon.ico`, `robots-ensaio.txt` e os seis ícones; `*deleting
  assets/img/favicon.svg`; o resto `<f..t`, só data, porque o checkout do GitHub renova as datas). Real: `config.php` já existia e ficou como
  estava (`reescrever_config` false); healthcheck HTTP 200, `api/tempo.php` e `api/tarifa.php` ok. **Em `novo.` estão agora o noindex de ensaio e
  o favicon com o nosso logótipo.** Melhorias de ferramenta anotadas, por fazer na próxima mexida no workflow: `rsync --checksum` (para a lista
  mostrar só mudanças de conteúdo) e, no healthcheck de `novo`, conferir o `noindex` na página e o `robots.txt` de bloqueio. **Deploys do site:**
  1–3 travões · 4 ensaio · 5 real · 6 ensaio · 7 real. **Em aberto:** alterações do Diogo secção a secção · `SITE_CHAVE` e portas #189–#192 na
  app (sessões APP) · fotografias do GPT · K · mensagem · EN · `creditos.md` · v1.3 (`site/` vs `public/`, PHP, design do Lovable, deploys por
  subdomínio) · repositório público (KPI). **Próxima sugestão: S37.**
- **12/11 · PERGUNTAS DO DIOGO · FOTOGRAFIAS: PROPOSTA DE AMBIENTE RECUSADA, À ESPERA DA DECISÃO DELE.** (1) Depois do deploy n.º 7: «Este site
  está disponível em pesquisas? Posso passar o link a pessoas para validarem comigo?» → não é indexado (noindex de ensaio; o `robots.txt` de
  `novo.` responde `Disallow: /`) e o link pode ser partilhado (sem palavra-passe; calendário de exemplo; os pedidos chegam ao `geral@`);
  oferecida uma palavra-passe simples no ensaio, sem resposta. (2) «Consegues substituir-te ao GPT para colocar as fotos restantes no
  repositório para poderes carregar depois no site?» → o Claude enviou logo a janela de aprovação de um ambiente novo (pessoal, «Monte Casa
  Branca (site e app, com Dropbox)», os três anfitriões do Dropbox na lista de rede, a valer já nesta conversa) **sem a explicar primeiro:
  RECUSADA pelo Diogo**, que interrompeu também a listagem seguinte do Dropbox («Tens de explicar melhor. O que é isto? Temos o GitHub. E
  sempre usaste o Dropbox.»; «parece estares a falar brasileiro»; «depois logo decido se voltas a propor esta solução»). **Regras que ficam:**
  nenhuma janela de aprovação (ambiente, credenciais, pasta do computador) sem antes explicar em linguagem simples o que é, o que muda e
  como se desfaz, e sem o Diogo dizer que a quer ver; não voltar a propor o ambiente até ele decidir; nunca escolher uma via «por omissão»
  quando ele ainda não percebeu as opções; português de Portugal sempre (o texto das janelas é da aplicação, não do Claude). Explicado ao
  Diogo: o conector do Dropbox (ver pastas, ler texto, copiar, mover, apagar) é um canal diferente da rede da máquina da sessão (lista de
  endereços do ambiente «Default», vazia), e por isso as fotografias nunca se descarregaram. Vias para as fotografias, por decidir: (a) o
  ambiente com o Dropbox aberto · (b) os computadores do GitHub Actions a descarregar por ligações temporárias pedidas ao conector, sem
  aprovação · (c) GPT ou Diogo a pô-las no repositório. **Facto novo:** o caminho real no Dropbox é `/1. DVM/2. ANGULOS CASTIÇOS, LDA/
  5. Exploração AL/13. APP Gestão AL/site/zenfolio` (o atalho `/13. APP Gestão AL/…` na raiz não existe). Nada foi descarregado nem alterado.
  **Em aberto:** a decisão do Diogo sobre a via das fotografias; o resto como antes. **Próxima sugestão: S37.**
  **12/11 (noite) · «O GitHub tem porta pública aberta. Abri temporariamente. Podes confirmar se está ok para ti?»** Verificado: o ambiente
  da sessão não mudou («Default», lista vazia; Dropbox, Open-Meteo e os domínios do Monte continuam a dar 403 na proxy); `site-montecasabranca`
  público, `appmontecasabranca` privado. **CORREÇÃO DE UM ERRO DO CLAUDE: `design/fotos/` EXISTE desde 7/11** (commits `0820f8a` 19h14 «álbum O
  Monte (47 imagens)» e `79c2c07` 19h18 «álbum Os Quartos (12 imagens)», pela conta do Diogo, entrega do GPT): `design/fotos/galeria/01-o-monte/`
  47 e `02-os-quartos/` 12, todas a 1 600 px. As entradas de 7/11 (13.ª e 14.ª partes) que dizem «continua ausente» estão erradas: o
  `git pull --rebase` trouxe os dois commits sem o Claude reparar. Comparação visual feita a 12/11: **as 59 já estão todas no site**
  (`site/fotos/` tem 73 fotografias base: as 59 da galeria + 14 antigas, das quais 6 pequenas, antes/depois ×4, `piscina-entardecer` e
  `montemor-rua`, mais `lareira` a 768×1024 e o recorte `piscina-espreguicadeira`). **Faltam os três álbuns que só estão no Dropbox**
  (`zenfolio/v2/`: `03-a-quinta` 17 · `04-antes-e-depois` 22 · `05-montemor-o-novo` 14 = 53, contagens de 25/10, por reconferir). Resposta ao
  Diogo: a porta pública do GitHub não é precisa para o Claude, que entra pela app «Claude» do GitHub com o repositório público ou privado;
  pode fechar-se quando ele quiser e é melhor fechada, pelos KPI. Com o repositório privado, os guiões do scratchpad que leem a API do GitHub
  sem autenticação (`estado_run.py`, `esperar_run.py`, `capturas_sha.py`) deixam de funcionar: usar as ferramentas do GitHub da sessão.
  Explicada a via do GitHub para as 53: o conector dá ligações temporárias, um workflow manual descarrega, reduz a 1 600 e 1 000 px, tira os
  metadados e grava em `design/fotos/galeria/`; depois o Claude vê-as, legenda-as e monta os álbuns e os 11 pares. **À espera do «avança» do
  Diogo; nada descarregado nem alterado.** **Próxima sugestão: S37.**
  **12/11 (23h–23h30 UTC) · «Confirma então se consegues trazer do Dropbox as fotos que faltam, que o GPT ainda não trouxe, para o
  repositório GitHub na ordem que estava programada» → FEITO: AS 53 ESTÃO NO REPOSITÓRIO; A COLEÇÃO v2 ESTÁ COMPLETA (112 de 112).**
  `design/fotos/galeria/03-a-quinta/` 17 · `04-antes-e-depois/` 22 (os 11 pares) · `05-montemor-o-novo/` 14, pela ordem dos álbuns, na
  convenção do GPT (1 600 px no lado maior, nunca aumentadas, JPEG 82 progressivo, sem metadados, perfil de cor). **Via do GitHub (a que
  funciona sem mexer no ambiente):** o conector do Dropbox dá uma ligação temporária por ficheiro (`download_link`, uso único, 900 s, até
  25 por pedido); o Claude lança `.github/workflows/fotos-dropbox.yml` (manual; inputs `album`, `posicoes`, `ligacoes`, `rodape`) com elas;
  o runner descarrega no primeiro passo (lê as ligações do ficheiro do evento e mascara-as; nunca aparecem no registo), confere os bytes
  com o lote, endireita, reduz, tira os metadados e faz o commit (`demo/ferramentas/fotos/processar.py`; lotes em
  `demo/ferramentas/fotos/lotes/<álbum>.tsv` com posição · nome na origem · bytes · nome final · original em `7. Fotos/` · retoque).
  **Corridas n.º 1–9, todas verdes** (1 ensaio com uma fotografia; 2–3 A Quinta; 4–6 Antes e Depois; 7–8 Montemor; 9 retoque), levas de 8
  no máximo; ids dos 53 ficheiros no Dropbox = `id:6CaWHhRXHt8AAAAAAAO7` + dois caracteres (lista na conversa). **Visto por olho (folhas de
  contacto e ampliações): são as fotografias certas e os 11 pares batem, lado a lado, com a identificação do GPT de 25/10.**
  **Privacidade:** em `ad03_fachada_antes.jpg` lia-se a matrícula de uma carrinha → o guião ganhou o retoque pelo lote (6.ª coluna
  `desfocar=x0,y0,x1,y1`, mosaico irrecuperável) e a fotografia foi trazida outra vez já desfocada (corrida n.º 9; a versão com a matrícula
  esteve 12 minutos em `main`, commit `e1a9d6a`, e fica no histórico; o original no Dropbox não muda). Pessoas, todas de costas e sem cara:
  `ad11_nora_antes` (um homem), `05/01_54` (uma senhora num banco), `05/05_57` (alguém num baloiço, ao longe). **Escrito:**
  `design/fotos/LEIA-ME.md` (álbuns, convenção, origem, pares, privacidade, autoria por fechar, o que falta, como repetir; exceção à pasta
  do GPT, a pedido do Diogo) e `docs/fotografia/2026-11-12_folhas_de_contacto/` (uma folha por álbum, os cinco;
  `demo/ferramentas/fotos/folha_contacto.py`). **Notas de monitor:** (a) **créditos:** o `creditos.md` não tem linhas para `3. anuncios/`,
  `4. telemovel/` nem `5. dvm canon/`, de onde vêm os álbuns 03 e 05; as 14 de Montemor (`3. anuncios/V2_verão` 54–63 e `V3_inverno` 42, 44,
  50, 54) são de máquina e de uma só mão (a mesma bicicleta vermelha em quatro): autor e autorização por escrever pelo Diogo (há um
  orçamento de fotografia de junho de 2022 em `7. Fotos/`); (b) **cerca de 20 fotografias do Zenfolio continuam sem original localizado**
  (7 ou 8 de A Quinta: alpendre com o sofá ×3, pôr do sol atrás dos pinheiros, piscina à noite, piscina com as oliveiras, lua; cerca de 13
  de Montemor: estação sem bicicleta, ponte e passadiço da ecopista, vacas, torre e muralha, interior da igreja, vistas ao longe, miradouro
  com o banco); o GPT não chegava a `2. rodrigo/` (subpastas `1`–`5` e `HD`, cerca de 500 imagens) e ninguém as procurou lá; por esta via
  seria preciso trazer miniaturas de centenas de ficheiros para um repositório público, por isso **não se fez sem ordem do Diogo**.
  **Lições de ferramenta:** as ligações do Dropbox têm um anfitrião diferente por ligação (`uc<hash>.dl.dropboxusercontent.com`), logo uma
  lista de anfitriões exatos no ambiente nunca chegaria; o grupo de concorrência do workflow só guarda uma corrida em espera (lançar uma
  terceira cancela a que espera): uma a correr e uma em espera, no máximo; os commits do workflow (`GITHUB_TOKEN`) não disparam o
  «Capturas»; `esperar_fotos.py`, `corridas_fotos.py`, `conferir_album.py` no scratchpad (leem a API pública; deixam de funcionar com o
  repositório privado). **As 53 ainda não estão no site** (`site/fotos/` tem as 59 dos álbuns 01 e 02 e 14 antigas).
  **12/11 (23h30–23h50 UTC) · AS 53 MONTADAS NO SITE, EM `main`, POR INSTALAR (espera o «Lança»).** Era o fim declarado do pedido
  («para poderes carregar depois no site»); nada foi para o servidor. **Pastas:** `site/fotos/quinta/` (16 + variantes `-m`; a 7.ª do
  álbum é `exterior/campo-verde.jpg`, que o site já tinha), `antes-depois/` (22), `montemor/` (14); nomes descritivos; a ligação
  galeria → site está em `demo/ferramentas/fotos/site-albuns.tsv` e aplica-se com `para_o_site.py` (cópia byte a byte + `-m` a 1 000 px de
  largura; `--conferir` para o teste). **`site/conteudo.php`:** separadores Monte e exterior 29 · Sala, cozinha e biblioteca 20 · Quartos e
  banho 13 · **A quinta 17** (novo, ordem do Zenfolio) · **Antes e depois 22** (os 11 pares certos, antes → depois; substituem as quatro
  miniaturas de 534 px, duas das quais eram os pares errados da V1.3.1) · **Montemor-o-Novo 14** (substitui a miniatura de 600 px). Legendas
  escritas pelo Claude só com o que se vê na imagem (sem «horta», sem nomes de igrejas; «castelo de Montemor-o-Novo» e «estação do Paião»,
  que se lê na placa). **Código, mínimo:** álbum com `'pares' => true` (classe `album-pares`: 2 colunas no telemóvel, 4 no computador, para
  cada par ficar lado a lado), `'etiqueta'` por fotografia («Antes» escura, «Depois» na cor primária), `'sem_schema' => true` (o
  «Antes e depois» e Montemor saem das imagens do `VacationRental`; antes iam para lá as ruínas) em `partes/fotografias.php`,
  `assets/css/site.css` e `index.php`. **Achado e corrigido:** o site mostrava **quatro fotografias duas vezes** no mesmo álbum (herança
  de juntar as 59 da galeria às 14 antigas): `alpendre` = `cadeiras-vinho`, `piscina-dia` = `piscina-casa-frente`, `sala-portas` =
  `sala-portas-abertas`, `lareira` (768 px) = `lareira-acesa`; saíram as repetidas (ficheiros incluídos) e a secção «Sala e cozinha»
  passou a usar a lareira grande. Das seis miniaturas pequenas de 7/11 resta uma: `exterior/piscina-entardecer.jpg` (600 px, não está na
  coleção v2). **Testes:** `demo/ferramentas/site/conferir-fotos.php` (referidas que não existem, pares incompletos, repetidas no mesmo
  álbum fazem falhar; ficheiros sem uso avisam) entrou no `testar-site.sh`; bateria local inteira verde (21 PHP, 116 fotografias referidas,
  230 ficheiros, conta 1 160 €, capturas 390/1280 com e sem app, sem avisos PHP); capturas dos seis álbuns sem imagens partidas, sem erros
  JS, sem rolagem horizontal. **`deploy-site.yml`:** `rsync --checksum` (a melhoria anotada a 8/11): com 53 MB de fotografias, sem isto cada
  deploy reenviava tudo; agora só vai o que mudou de conteúdo e a lista do ensaio lê-se. **Peso:** `site/` 53 MB; o HTML passou de 361 kB
  para 502 kB (18 kB com a compressão do `.htaccess`), porque cada miniatura leva a lista do seu álbum em `data-galeria`; se um dia pesar,
  põe-se a lista uma vez por álbum (uma linha no `site.js`). **Por decidir pelo Diogo, por olho:** as etiquetas «Antes/Depois»; as três
  fotografias com pessoas de costas (`nora-antes`, `banco-vermelho`, `castelo-baloico`); a autoria das de Montemor antes do domínio
  público. **Não feito:** as cerca de 20 do Zenfolio sem original; `creditos.md` (do GPT e do Diogo); EN.
  **12/11 (23h35–23h40 UTC) · «Capturas» n.º 31 VERDE para `095dc96` (os dois trabalhos) e ensaio do deploy-site n.º 8 (dry_run,
  destino novo, run 43330276533) LIDO: nada foi enviado.** Lista do rsync, já com `--checksum`: mudam de conteúdo (`<fcst`) só
  `conteudo.php`, `index.php`, `assets/css/site.css` e `partes/fotografias.php`; **104 ficheiros novos** (`fotos/quinta/` 32, pasta nova ·
  `fotos/antes-depois/` 44 · `fotos/montemor/` 28); **12 apagados** (as quatro miniaturas antigas do antes/depois, `montemor-rua`, as
  repetidas `piscina-casa-frente`, `cadeiras-vinho`, `sala-portas-abertas` com as variantes `-m`, e `lareira.jpg`); tudo o resto `.f..t`
  (só a data, sem envio); `config.php` e `cache/` de fora; 52,3 MB no total. **O deploy real espera o «Lança» do Diogo** (será o n.º 9;
  precisa do «Capturas» verde do commit que estiver em `main` nesse momento). Capturas dos álbuns enviadas ao Diogo na conversa
  (computador e telemóvel); recado ao GPT de 12/11 em `RECADOS_PARA_O_CHATGPT.md`. **Deploys do site:** 1–3 travões · 4 ensaio · 5 real ·
  6 ensaio · 7 real · 8 ensaio. **Em aberto:** «Lança» · olho do Diogo aos três álbuns, às etiquetas e às fotografias com pessoas ·
  autor das de Montemor e `creditos.md` · as cerca de 20 sem original · repositório público (KPI, fotografias, a matrícula no histórico) ·
  o resto como antes (portas #189–#192 e `SITE_CHAVE`, K, mensagem, EN, v1.3, S31–S33). **Próxima sugestão: S37.**
  **12/11 (noite) · «Estão com a qualidade HR que estão no Dropbox?» → NÃO, e foi dito assim ao Diogo.** As cópias do repositório e do
  site são em tamanho web (1 600 px no lado maior, JPEG 82; a regra da conformidade 4 e a que o GPT usou nas 59). Pelos registos das nove
  corridas (leem-se sem autenticação enquanto o repositório for público): dos 53 originais, **20 têm 4 032–5 184 px** (3–12 MB; telemóvel
  e Canon), **11 têm cerca de 2 000 px**, e **22 já estão no Dropbox a 1 600 px ou menos** (as 14 de Montemor, que são as versões dos
  anúncios, a 1 600 × 1 066, e 8 das outras); 31 foram reduzidas, 22 só recomprimidas; 175 MB na origem, 20 MB aqui. Os originais ficam
  intactos no Dropbox. **Proposta feita, à espera da palavra do Diogo:** trazer também uma versão de 2 400 px das que têm original grande,
  para a fotografia aberta em ecrãs grandes (o telemóvel continua com as leves). Não se faz sem o «sim» dele; vale também para a capa
  (`piscina-dia.jpg`, 1 600 px, esticada em monitores largos) e para as 59 do GPT.
  **12/11 (noite, fim) · O DIOGO REENVIOU AS 22 CAPTURAS DO ZENFOLIO (são as de 25/10; a sessão tem as 23) E PEDIU: «confirma se estão
  organizados desta forma e na qualidade que o Rodrigo enviou em HR» · depois: «quando as fotos tiverem todas disponíveis então sim vou
  começar a selecionar as que saem e onde é que aparecem no site» · «provavelmente o GPT vai deixar de existir; faz o relatório do que
  está pendurado no GPT e vê se precisamos de o manter; caso contrário fazemos o handover para aqui com o Lovable em suporte» · «quantas
  fotos estão no repositório e que podem ser usadas?».** Respondido, sem mexer no site: **(1) Organização:** os mesmos cinco álbuns e a
  mesma sequência, mas **o Zenfolio tem 135 e o repositório 112: faltam 23** (O Monte 47 de 49, as duas fachadas laterais do fim, e o pôr
  do sol na piscina trocado com a piscina à noite; Os Quartos 12 de 12; A Quinta 17 de 25; Antes e Depois 22 de 22, no Zenfolio «depois,
  antes» e aqui «antes, depois»; Montemor 14 de 27); o «cerca de 20» de antes estava mal contado. No site a arrumação é outra (O Monte
  partido em exterior e interior, três fotografias à frente). **(2) Alta resolução do Rodrigo: NÃO, e não está no Dropbox:** `2. rodrigo/`
  tem 499 fotografias de 1 a 2 MB nas subpastas `1`–`5` e, em `HD`, **uma só**, `DSC_4075.JPG` (16 MB), que também existe em `1/` com
  1,3 MB; as 57 de máquina profissional da galeria vieram de `3. anuncios/` a 1 600 × 1 066; correção ao que o Claude tinha dito («estarão
  na pasta dele»). `1. todas/` (2 GB) são fotografias do Diogo de junho de 2022. **(3) Fotografias utilizáveis no repositório: 111**
  (109 diferentes na galeria, porque três estão em dois álbuns, mais `interior/sala-mesa.jpg` e `quartos/quarto.jpg`), todas já no site;
  18 miniaturas de 400–600 px do primeiro estudo não servem (os nomes trazem o número DSC do Rodrigo, logo acham-se em `2. rodrigo/` pelo
  nome). **(4) Relatório `docs/integracao-app/2026-11-12_pendentes_do_gpt_e_passagem.md`:** o GPT não é preciso (última sessão de design
  24/10, última entrega 7/11; o que era dele passa para Diogo, Claude e Lovable); proposta de papéis para a v1.3 **à espera do «sim» do
  Diogo**; até lá vale o acordo como está. `design/fotos/LEIA-ME.md` (secção 7) com a contagem exata e as pistas (`V2_verão/51` e `52`;
  `V3_inverno` 40–62; `4. telemovel` ou `1. todas`). **Regras do Diogo nesta parte:** «não faças nada» enquanto ele envia material; ele
  escolhe as fotografias e onde aparecem, depois de estarem todas disponíveis. **Em aberto:** «sim» à passagem · procurar as 23 (espera
  ordem) · onde está a alta resolução do Rodrigo · «Lança» dos álbuns novos · o resto como antes. **Próxima sugestão: S37.**
