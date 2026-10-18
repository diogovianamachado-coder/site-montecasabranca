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
