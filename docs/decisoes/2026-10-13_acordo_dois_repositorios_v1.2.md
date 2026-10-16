# Monte Casa Branca · site novo · ACORDO DE TRABALHO entre o ChatGPT e o Claude Code

**v1.2 · 13 de outubro de 2026 · a v1.1 (aprovada pelos três a 13/10) mais UMA alteração, proposta pelo Claude e aceite pelo Diogo (S17): as
duas portas de leitura da app (#189 ocupação, #190 tarifa) podem fazer-se em paralelo com a fase de design, antes do «passa ao Claude». Está
na secção 13 (passo 7) e na secção 14. **Vigora quando o ChatGPT a validar**; até lá vale a v1.1. As regras de mudança continuam: toda a
alteração é uma versão nova, com diferenças listadas, validada pelos três.**

Este documento não é uma proposta. É a regra que os dois assistentes seguem a partir de hoje, nos dois repositórios, até ser mudada pelo Diogo
por escrito. O que não está aqui, ou na memória de cada repositório, não aconteceu. Etiquetas: **FACTO** (verificado) · **DECISÃO** (do Diogo;
não se reabre) · **PROPOSTA** (de um assistente, à espera do Diogo) · **DESCONHECIDO** (só o Diogo pode dar).

---

## 0. Resposta à adenda de segurança do ChatGPT (13/10) · P1–P4

Formato pedido: (a) decisão · (b) razão técnica · (c) texto final para a v1.1 · (d) onde fica e teste de aceitação · (e) dependências e riscos.

### P1 · Proteção da pré-reserva e das credenciais — ACEITO COM AJUSTES

- **(a)** Aceito os quatro controlos. Ajusto dois para serem proporcionais à Amen (alojamento partilhado, PHP/Apache, sem processos nem cofres de segredos).
- **(b)** O contrato v1.0 já tinha a chave nos dois `config.php`, a validação toda na app, o limite por IP, a armadilha anti-spam e os duplicados em
  10 min; faltava dizer **como** e **como se prova**. Na Amen não há cofre de segredos: o que existe é um ficheiro fora da raiz web (a app vive em
  `…/subsites/app.montecasabranca.pt`, logo a pasta mãe `…/subsites/` não é servida) e, como segunda linha, a negação por `.htaccess`.
- **(c)** Texto final (entra na secção 8 e 9): **(1)** o browser nunca fala com `site_prereserva.php`; fala só com `public/prereserva.php` do
  site, no mesmo domínio; esse PHP fala com a app com o cabeçalho `X-Site-Chave` (segredo de 32+ bytes aleatórios, igual nos dois lados).
  **(2)** O segredo do site vive em `site_config.php` **um nível acima da raiz web** (`DESCONHECIDO`: o caminho exato, a confirmar pelo Diogo no
  painel da Amen; se a Amen não deixar, fica dentro da raiz com o nome `config.php`, negado por `.htaccess` como na app); nunca é versionado, nunca
  sai no deploy, nunca vai ao browser; o da app vive no `config.php` da app (`site_chave`). **(3)** Idempotência efetiva: cada pedido leva um
  `pedido_id` (UUID gerado pelo site, guardado na app em `reservas.site_pedido_id`); um POST com um `pedido_id` já conhecido devolve **a mesma
  resposta e o mesmo código**, sem criar nada; além disso, mesmo email + mesmas datas nas últimas 24 h devolve o pedido existente. **(4)** Abuso:
  no máximo 5 pedidos por IP por hora e 20 por dia (contados em `site_pedidos`, tabela nova com SQL em `sql/`), armadilha anti-spam (campo
  escondido que tem de vir vazio) e tempo mínimo de preenchimento de 5 s (carimbo assinado no formulário); respostas de erro genéricas
  («Não foi possível registar o pedido; use o WhatsApp»), sem nomes de ficheiros, SQL nem pilhas; o `registo` da app guarda código do pedido,
  resultado e IP truncado ao /24, nunca a mensagem nem o email (esses ficam só na reserva, como qualquer reserva).
- **(d)** Secções 8 e 9. Testes de aceitação (correm no stub da app e, depois do deploy, à mão): **T-P1.1** `curl -I` ao `config.php` e ao
  `site_config.php` pelo domínio → 403 ou 404, nunca 200 · **T-P1.2** POST sem `X-Site-Chave` ou com chave errada → 401 e nada criado ·
  **T-P1.3** o mesmo POST duas vezes → uma só reserva, as duas respostas com o mesmo código · **T-P1.4** 6.º POST do mesmo IP na mesma hora
  → 429 · **T-P1.5** armadilha preenchida ou tempo < 5 s → resposta 200 «recebido» falsa, nada criado, linha no `registo` · **T-P1.6** o HTML e o
  JS do site não contêm a chave (`grep` no `public/` no teste de fumo).
- **(e)** Depende da sessão APP que fizer a porta (número `#` próprio, SQL para `site_pedido_id` e `site_pedidos`) e do caminho na Amen. Risco
  aceite: um segredo partilhado numa só Amen é a proteção possível; se alguma vez sair, troca-se nos dois `config.php` em dois minutos. Não se
  criam portas nesta fase.

### P2 · Ocupação, cache e integridade do calendário — ACEITO

- **(a)** Aceito tal como está; acrescento os estados e os cenários de simultaneidade, que faltavam escritos.
- **(b)** A cache de 5 min é só desempenho; a verdade é sempre o momento do POST, na app. O site nunca pode dizer «confirmada»: não tem porta
  de estado e a confirmação é do Diogo, por contacto, como hoje (S3).
- **(c)** Texto final (secção 8): **estados no site**: «datas indicativamente livres» (da ocupação em cache; o calendário público diz-o com
  essas palavras), «pedido recebido · n.º 2027_NN» (depois do POST aceite) e nada mais; «reserva confirmada» não existe no site. **Cache:** a app
  responde a `site_ocupacao.php` com `Cache-Control: max-age=300`; o site pede-a ao abrir a página e volta a pedir ao abrir o calendário;
  `site_tarifa.php` sem cache. **Revalidação no POST:** a app recalcula ocupação, mínimos e preço; se o preço for diferente do que o site mostrou
  (campo `preco_mostrado` no POST), responde 409 com os dois valores e o site pergunta «o valor atualizado é X €; confirma?», e só um segundo
  POST com `confirmo_preco=1` cria o pedido. **Simultaneidade:** conflito com reserva **Confirmada** ou uso próprio → 409 «estas datas deixaram de
  estar livres», nada criado; conflito com outro pedido **Por confirmar** → cria na mesma (os pedidos não bloqueiam datas; primeiro a chegar,
  primeiro a ser contactado) e o push ao Diogo diz «há outro pedido para estas datas». **Indisponibilidade da app:** qualquer resposta que não
  seja 2xx/409 em 5 s → o site mostra o simulador com a tabela embutida marcada «valor indicativo», sem a palavra «livre», e os botões WhatsApp
  e email; nunca finge validação.
- **(d)** Secção 8 e `docs/integracao-app/`. Testes: **T-P2.1** marcar uma reserva Confirmada na app → em ≤ 5 min o calendário do site mostra
  as datas ocupadas · **T-P2.2** POST para datas de uma Confirmada → 409 com a mensagem, nada criado · **T-P2.3** mudar a tarifa na app entre
  o simulador e o POST → 409 com os dois preços; segundo POST com `confirmo_preco=1` cria · **T-P2.4** dois POST «Por confirmar» para as
  mesmas datas → dois pedidos, push com o aviso · **T-P2.5** app em baixo (stub devolve 503) → fallback sem «livre», botões WhatsApp/email.
- **(e)** Depende das portas (sessões APP). Risco aceite: entre a cache e o POST uma data pode «fechar»; o 409 trata-o. Nada no motor de
  reservas muda fora de uma sessão APP autorizada.

### P3 · Colaboração segura em `main` — ACEITO COM AJUSTES

- **(a)** Aceito o processo; ajusto a alternativa para quem não consiga fazer push direto.
- **(b)** É o processo da app desde 14/9 (`git pull --rebase` antes do push; nunca `--force`; o deploy nunca decorre do commit). Falta só escrevê-lo
  como lista e prever a ferramenta do ChatGPT.
- **(c)** Texto final (secção 3): **antes de escrever:** `git fetch` + `git pull --rebase origin main`; ler `docs/decisoes/` (e o `CLAUDE.md` do
  site, quando existir); escrever só nas pastas do próprio. **Antes do push:** `git pull --rebase` outra vez; **nunca** `--force` nem
  `--force-with-lease`; em conflito, parar, deixar as duas versões lado a lado no ficheiro ou em `ficheiro.CONFLITO.md`, e avisar o Diogo na
  conversa. **Commits:** mensagem «SITE · assunto» + lista dos ficheiros tocados; os do Claude levam o link da sessão. **Nenhum deploy decorre
  de um commit**; só o workflow manual. **Se a ferramenta do ChatGPT não fizer push para `main`:** ele escreve no ramo `gpt/AAAA-MM-DD_assunto`
  e o Diogo junta-o a `main` no github.com com um clique (botão «Merge»); depois da passagem, o Claude pode fazer essa junção mecânica a pedido
  do Diogo, sem rever o conteúdo do design. Se nem isso der, o ChatGPT entrega os ficheiros ao Diogo e o Diogo carrega-os no github.com
  («Add file → Upload files») na pasta certa.
- **(d)** Secção 3. Aceitação: `git log --stat` mostra, em cada commit, só ficheiros das pastas do autor; nenhum commit com `--force` no
  histórico (`git reflog` do remoto não mostra reescritas); o workflow de deploy continua `workflow_dispatch` apenas.
- **(e)** Depende de saber o que o conector GitHub do ChatGPT consegue fazer (DESCONHECIDO: só leitura, ou escrita em ramos, ou em `main`).
  Risco baixo: pastas disjuntas não geram conflitos de conteúdo.

### P4 · Fotografias, direitos e preservação do Zenfolio — ACEITO

- **(a)** Aceito na íntegra.
- **(b)** O acordo já pedia créditos e origem; faltavam a autorização de uso público registada e as condições concretas para desligar o Zenfolio.
- **(c)** Texto final (secções 4 e 10): `docs/fotografia/creditos.md` tem uma linha por fotografia do site com: ficheiro em `public/imagens/` ·
  origem (caminho no Dropbox ou nome no Canva) · nome original · zona · autor · **autorização de uso público: quem confirmou e em que data**.
  Autores conhecidos: Rodrigo (reportagem de 2022; FACTO usada nas plataformas desde 2022; DESCONHECIDO o texto do orçamento quanto ao uso em
  site próprio: o Diogo confirma, uma vez, numa linha datada no `creditos.md`) e o Diogo/família (antes e depois, telemóvel). **Quando não há
  registo, quem confirma autoria e licença é o Diogo**, e só depois dessa linha a fotografia entra no site. Os ficheiros finais são versões web
  dos originais, que ficam intocados no Dropbox; as miniaturas de 600 px são só para estudo. **Zenfolio: só se cancela quando as cinco condições
  estiverem escritas como feitas em `docs/decisoes/aprovadas.md`:** (1) os originais de todas as fotos da galeria estão no Dropbox e conferidos
  (contagem e nomes); (2) a lista do que a galeria tem está registada (o Diogo exporta-a ou manda capturas: o Claude **não vê** o Zenfolio, a
  rede do ambiente nega-o, e regista essa limitação em vez de declarar auditoria); (3) a página «Fotos» do site está no ar e verificada pelo
  Diogo; (4) os links que apontavam para a galeria (Linktree, Instagram, Google) foram trocados ou removidos; (5) o Diogo escreveu «cancela o
  Zenfolio» com data.
- **(d)** Secções 4 (fase 4) e 10. Aceitação: o `creditos.md` tem tantas linhas quantas as imagens em `public/imagens/`, nenhuma sem autor nem
  sem autorização (verificação automática no teste de fumo do site); a lista das cinco condições do Zenfolio está em `docs/decisoes/pendentes.md`
  e passa a `aprovadas.md` só com as cinco riscadas.
- **(e)** Depende do Diogo (autorização e exportação do Zenfolio). Risco: nenhum técnico; o único é apagar a galeria antes dos originais estarem
  seguros, e as condições (1) e (2) existem para isso.

---

## 1. Resposta ao plano do ChatGPT de 12/10

**Concordâncias (entram neste acordo tal como ele as propôs):**

- Dois repositórios privados, um por sistema: `appmontecasabranca` (a app, intocável) e `site-montecasabranca` (o site). O GitHub guarda versões e
  documentação; nunca é canal de sincronização de reservas.
- A app é a única fonte de verdade de disponibilidade, tarifas, pré-reservas e avaliações. O site nunca liga à base MySQL; fala com a app por
  HTTPS, por portas públicas feitas para isso, que **ainda não existem**.
- A estrutura de pastas proposta (`docs/` com identidade, fotografia, design, conteúdos, decisões e integração; `public/` com imagens e marca;
  `src/` para a implementação; `.github/workflows/` sem deploy até a raiz web estar confirmada).
- O trabalho de site que vive hoje em `docs/temas/site/` do repositório da app **fica congelado** (referência ao commit `a095e7b` para a v3 e
  `ed3c2f7` para a memória); copia-se para o repositório novo só o que serve; nada se apaga nem se move de lá.
- A v3 é referência funcional (simulador com as regras certas, testes, gerador), não direção artística. Não se parte dela para o desenho.
- Isolamento total na Amen: outra raiz web física, confirmada no painel antes de qualquer workflow; `DEPLOY_PATH` validado; ensaio a seco sempre;
  nunca `rsync --delete` fora da raiz autorizada; nunca reutilizar por suposição o caminho da app.
- As regras de segurança das portas: validação toda do lado da app, nada do browser é de confiança; limites de pedidos; CORS restrito; nunca
  credenciais, `config.php`, feeds iCal privados nem dados de hóspedes; pré-reserva não é confirmação; fallback para WhatsApp e email se a app
  não responder; avaliações só com direito de publicação e revisão.
- A fase criativa começa pelas fotografias reais, pelo logótipo que existe e pelo mix 1+4+6 do Canva; sem imagens de banco, sem imagens geradas
  por IA, sem estética de app ou de dashboard.
- Nenhum commit, deploy, DNS, esquema MySQL ou porta na app sem plano, testes e aprovação do Diogo.

**Divergências e ajustes (o que fica diferente do plano do ChatGPT, por decisão do Diogo de 12/10):**

1. **A divisão de trabalho é mais nítida do que «direção criativa vs. desenho técnico».** O ChatGPT faz **o design e o look and feel**, entregue
   em HTML e CSS. O Claude Code faz **todo o código**: o site a sério, o gerador, os testes, os workflows, as portas na app e a publicação na Amen.
   O ChatGPT não escreve código de produção; o Claude não desenha de raiz (já teve três propostas vetadas: v2, direções A/B/C, v3).
2. **O repositório do site é criado e gerido pelo ChatGPT** (com o Diogo) **até o desenho estar em conformidade** (lista na secção 4). Só nesse dia
   o Claude entra no repositório. Até lá o Claude não lhe toca, nem precisa de acesso.
3. **Sem pull requests nem branches como método.** Na app nunca se usaram (regra desde 14/9: tudo em `main`). No site aplica-se o mesmo: a verdade é
   `main`; cada um escreve só nas suas pastas (secção 3); `git pull --rebase` antes de cada push. Se a ferramenta do ChatGPT precisar de um branch
   para rascunho, ele próprio o junta a `main`; o Claude nunca abre PRs.
4. **A stack decide-a o Claude**, porque o código é dele (secção 7): HTML, CSS e JavaScript estáticos, gerados por um script em Python a partir de
   ficheiros de conteúdo, sem framework, sem build de Node, mais um único ficheiro PHP para a pré-reserva. A pergunta «HTML simples vs. framework»
   fica fechada.
5. **Os nomes das portas da app são em português e seguem as convenções da app** (secção 8), não `/api/public/...`. Os do ChatGPT eram
   indicativos; estes também só existem quando forem feitos, um a um, em sessões APP.
6. **«2 ou 3 direções de composição» faz-se por uma página de cada vez**, a começar pela página inicial, em HTML/CSS mobile-first com as fotos reais;
   o Diogo veta por olho no telemóvel; só depois as restantes páginas no mesmo sistema (era a S14; aceite). Não se fazem rondas inteiras de
   sete páginas para serem recusadas em bloco.
7. **Os textos das páginas vêm no HTML do ChatGPT** (títulos, frases, microtextos, em português de Portugal), com os factos tirados do `FACTOS.md`
   e nada com `?` ou `✗`. O Claude passa-os para os ficheiros de conteúdo, faz o inglês e devolve-os ao ChatGPT para revisão em colunas
   (atual · proposta · porquê). Um só dono do ficheiro final: o Claude.
8. **Staging:** não se testa «na raiz» antes do go/no-go do Linktree. O site publica-se primeiro num subdomínio de ensaio da Amen
   (`novo.montecasabranca.pt`, PROPOSTA; DESCONHECIDO se a Amen o permite, como permitiu `app.`), e passa para a raiz do domínio no dia do
   go/no-go (S1).

---

## 2. Os papéis (DECISÃO, 12/10)

| Quem | Faz | Não faz |
|---|---|---|
| **Diogo** | Decide tudo por olho e por escrito: escolhe direções, aprova páginas, confirma factos, dá acessos, autoriza cada deploy («Lança»). Cria o repositório na sua conta. Faz as tarefas de painel (Amen, DNS, Linktree, Google). | Não escreve código nem desenha; não tem de explicar duas vezes o que já está escrito. |
| **ChatGPT** | Design e look and feel: direções visuais, sistema (fontes, cores, espaços, componentes), as páginas em HTML e CSS, escolha das fotos por zona, textos PT das páginas, crítica e QA do que o Claude construir. Responsável pelo repositório do site até à conformidade. | Não escreve código de produção (`src/`, workflows, PHP, portas); não toca no repositório da app; não vê segredos; não decide factos. |
| **Claude Code** | Todo o código: o site gerado a partir do design, PT e EN, simulador, formulário, SEO e LLM (robots, llms.txt, schema.org, sitemap, favicon, Open Graph), testes, capturas, workflow de deploy, as portas na app (em sessões APP, pelas regras da app), publicação na Amen e memória técnica. | Não propõe desenho de raiz; não entra no repositório do site antes da conformidade; não faz deploy sem o ensaio lido e o «Lança» do Diogo. |

---

## 3. Os dois repositórios, as pastas e quem escreve onde

**`diogovianamachado-coder/appmontecasabranca`** (FACTO: privado, `main`, PHP/MySQL na Amen, deploy manual por `deploy.yml`):
só o Claude escreve, em sessões APP, pelas regras do `CLAUDE.md` da app. O ChatGPT pode ler (factos, inventários), nunca escrever.
As portas do site (secção 8) nascem aqui, cada uma com o seu número `#` e os seus testes.

**`diogovianamachado-coder/site-montecasabranca`** (a criar pelo Diogo com o ChatGPT; privado; `main`):

```
site-montecasabranca/
├── README.md               o que é, como se abre, como se publica        (ChatGPT; parte técnica: Claude)
├── CLAUDE.md               memória técnica e regras do site              (nasce na passagem; só o Claude)
├── docs/
│   ├── identidade/         logótipo, paleta, tipografia, marca           (ChatGPT)
│   ├── fotografia/         inventário, seleção por zona, créditos        (ChatGPT; ficheiros: Diogo)
│   ├── design/             direções, revisões, QA, capturas              (ChatGPT)
│   ├── conteudos/          textos PT (ChatGPT) · EN e ficheiro final (Claude)
│   ├── decisoes/           aprovadas.md · propostas.md · pendentes.md    (ChatGPT; depois cada um no seu)
│   └── integracao-app/     contratos das portas                          (Claude escreve; ChatGPT revê)
├── design/                 O DESIGN ENTREGUE: *.html, estilos.css, LEIA-ME.md   (só o ChatGPT)
├── public/                 O SITE QUE VAI PARA A AMEN: HTML gerado (Claude)
│   ├── imagens/ marca/ fontes/                                           (ChatGPT e Diogo)
│   └── prereserva.php      o único PHP do site                           (Claude)
├── src/                    gerador, conteúdos, tarifas, JS               (só o Claude)
└── .github/workflows/      capturas em cada push · deploy manual         (só o Claude)
```

Regras de escrita: cada um escreve só nas suas pastas; o Claude nunca edita `design/` (se encontrar um erro, aponta-o em `docs/design/`
e o ChatGPT corrige); o ChatGPT nunca edita `src/`, `public/*.html`, `.github/` nem `CLAUDE.md`. Ficheiros gerados não se editam à mão.
Entregas e contributos levam data no nome (`AAAA-MM-DD_assunto_vN`).

**Processo de sincronização (P3, 13/10):** antes de escrever, `git fetch` + `git pull --rebase origin main` e ler `docs/decisoes/` (e o
`CLAUDE.md` do site, quando existir). Antes do push, `git pull --rebase` outra vez; **nunca `--force` nem `--force-with-lease`**; em conflito,
parar, deixar as duas versões (no ficheiro ou em `ficheiro.CONFLITO.md`) e avisar o Diogo. Commits com mensagem «SITE · assunto» e a lista dos
ficheiros; os do Claude levam o link da sessão. Nenhum deploy decorre de um commit. Se a ferramenta do ChatGPT não fizer push para `main`, ele
escreve no ramo `gpt/AAAA-MM-DD_assunto` e o Diogo junta-o em github.com («Merge»); depois da passagem o Claude pode fazer essa junção mecânica
a pedido do Diogo, sem rever o design; em último caso o ChatGPT entrega os ficheiros ao Diogo, que os carrega em github.com na pasta certa.

---

## 4. As fases e a passagem de testemunho

**Fase 0 · arranque (Diogo + ChatGPT, agora):** o Diogo cria o repositório privado `site-montecasabranca` na sua conta e dá-lhe acesso ao
ChatGPT; o ChatGPT cria a árvore, o README e copia do repositório da app, por cópia controlada com a origem indicada, o `BRIEF_SITE.md`,
o `FACTOS.md`, o `fotos/LEIA-ME.md`, o `canva_assets.tsv`, o `dropbox_manifest.json`, o `assets/logo.png` e os dois JPG do logótipo de
`docs/marca/`. A v3 (`gerar.py`, HTML, testes) fica onde está, congelada, com link; não se copia.

**Fase 1 · design (ChatGPT; o Diogo veta por olho):** 2 ou 3 direções da **página inicial**, mobile-first, em HTML/CSS com as fotos reais →
o Diogo escolhe uma → o ChatGPT desenha as restantes páginas no mesmo sistema (as sete previstas: Início · A casa · Fotos · Preços e
reservar · Onde fica · Perguntas · Contactos; o número é proposta, não regra) → o Diogo aprova página a página → conformidade.

**Conformidade = pode passar ao Claude quando TUDO isto for verdade:**

1. O Diogo disse «sim» a cada página, por olho, no telemóvel, e isso está escrito em `docs/decisoes/aprovadas.md` com a data.
2. Cada página existe em `design/` como HTML + CSS que abre num browser a partir do ficheiro, sem build, sem framework, sem serviço externo
   além do Google Fonts (ou com as fontes em `public/fontes/`).
3. `design/LEIA-ME.md` descreve o sistema: fontes (nome e pesos), cores (hex) e onde cada uma se usa, espaçamentos, componentes (barra,
   botões, cartões, galeria, antes e depois, perguntas), e, por página, a lista de blocos pela ordem.
4. As fotografias estão escolhidas pelo nome (`MCB Rodrigo DSC_NNNN` do Canva ou caminho do Dropbox), com a zona e o crédito, e **existem
   em `public/imagens/` em tamanho web** (lado maior 1 600 px, JPG com qualidade 80–85, nomes em minúsculas sem acentos). Sem imagens de banco.
5. O logótipo autorizado está em `public/marca/` (a versão vetorial, se existir; senão o PNG de 900 px).
6. Todos os factos do texto vêm do `FACTOS.md` com ✓; o que for `?` ou `✗` está marcado `[?]` no HTML, para o Claude não o publicar.
7. Telemóvel (390 px) e desktop (1 280 px) desenhados os dois; sem rolagem horizontal.
8. O Diogo dá acesso ao repositório à app «Claude» do GitHub e escreve na sessão SITE: **«passa ao Claude»**.

**Fase 2 · construção (Claude):** liga o repositório, escreve o `CLAUDE.md` do site, constrói `src/` e `public/` a partir de `design/`
(fidelidade ao píxel; o design é a referência), PT e EN, simulador com as regras da app, formulário, SEO e LLM, testes e capturas em cada
push, workflow de deploy com ensaio a seco. Entrega por página, com capturas, para o ChatGPT fazer QA e o Diogo aprovar.

**Fase 3 · portas na app (Claude, sessões APP):** as quatro portas da secção 8, uma de cada vez, com número `#`, stub, teste de fumo, ensaio e
deploy pelas regras da app. O site passa a ler ocupação e tarifa da app e a criar pré-reservas.

**Fase 4 · ao ar (Diogo + Claude):** publicação no subdomínio de ensaio; sessão de go/no-go do Linktree (S1); o Diogo tira o
redirecionamento no painel da Amen; o site passa à raiz de `montecasabranca.pt`, com `www.` e HTTP → HTTPS; link no Perfil da Empresa do Google;
mensagem à MyBestHotel; cancelar o Zenfolio **só com as cinco condições da secção 10 escritas como feitas** (S5 + P4).

**Depois:** o ChatGPT continua a mandar design (afinações, páginas novas, campanhas) para `design/` e QA para `docs/design/`; o Claude
constrói; o Diogo aprova. O ciclo da secção 5 vale sempre.

---

## 5. Como se trabalhou na app, e é assim que o Diogo quer trabalhar no site

Este é o modelo de desenho → revisão → aprovação → produção que fez a app entre agosto e outubro de 2026, tal como está no `CLAUDE.md` da
app. Não se volta a explicar; aplica-se.

1. **Desenho antes de código.** Nenhum ecrã entra em código sem o Diogo ver antes as opções (A/B/C) com a recomendação marcada. Os
   protótipos fazem-se em HTML, a partir do real, e mostram-se em **imagem ao tamanho do iPhone mais o link para abrir**. Nunca se pergunta
   «que cor queres»: propõe-se, o Diogo veta por olho.
2. **Decisão do Diogo.** Uma escolha por olho, registada na memória com a data. **O que está decidido não volta a ser pergunta**; se alguém
   repropõe, a resposta é «está escrito em X». Tudo se etiqueta FACTO · DECISÃO · PROPOSTA · DESCONHECIDO.
3. **Código só depois do sim.** Cada entrega traz um LEIA-ME com o inventário e o destino de cada ficheiro; ficheiros inteiros, nunca
   «blocos a inserir»; correções numeradas (a, b, c) e uma correção única no fim dos testes.
4. **Prova antes de publicar.** Renderização sem servidor com dados de ensaio, capturas ao tamanho do iPhone, teste de fumo automático em
   cada push (sintaxe, contas, capturas sem erro JS nem rolagem horizontal). Um vermelho impede o deploy.
5. **Testes escritos para quem nunca abriu a página:** T1 a Tn na própria resposta: onde ir, o que tocar, o que tem de aparecer, o que
   significa falhar. Diz-se antes o que cada teste escreve em dados reais e como se desfaz.
6. **Deploy nunca automático.** Primeiro um ensaio a seco com a lista do que vai mudar no servidor, lida linha a linha; só depois o envio
   real, a pedido do Diogo («Lança»). Cada deploy fica carimbado (número, data, commit) e visível.
7. **Fecho de sessão.** Três sugestões fora da caixa, numeradas, com sim/não a cada uma; depois a memória atualizada, commit, estado em
   cinco linhas. **A memória no repositório é a única fonte: o que não está lá não aconteceu.** Cada sessão abre a ler a memória e a dizer
   em cinco linhas onde se está.

No site: o ChatGPT fica com os passos 1 e 2 (as opções e o veto do Diogo); o Claude com os passos 3 a 7; o passo 2 é sempre do Diogo.

---

## 6. O que o ChatGPT entrega, e em que formato

- **Direções da página inicial:** `design/direcoes/A.html`, `B.html`, `C.html` (+ capturas em `docs/design/`), cada uma completa em
  telemóvel, com as fotos reais e a recomendação marcada no `docs/design/AAAA-MM-DD_direcoes_v1.md`. Uma ronda; o Diogo escolhe; a seguir
  afina-se a escolhida, não se abrem rondas novas.
- **As páginas:** `design/<pagina>.html` + `design/estilos.css` comum. HTML semântico (`header`, `main`, `section`, `h1`–`h3`, `figure`,
  `details`), CSS simples, sem framework nem Tailwind, JavaScript só para interação própria do look (menu, carrossel, antes e depois). As
  imagens referem-se por `../public/imagens/nome.jpg`.
- **O sistema** em `design/LEIA-ME.md` (lista da conformidade, ponto 3).
- **Textos PT** dentro do HTML; factos do `FACTOS.md`; nada inventado (comodidades, preços, políticas, avaliações, distâncias).
- **QA do que o Claude construir:** defeitos numerados (local, atual, esperado, gravidade bloqueia/importante/menor) em `docs/design/`.
- **Revisão de textos EN** em colunas atual · proposta · porquê.
- O que o ChatGPT **não** entrega: imagens em vez de HTML (o Claude não volta a inventar CSS a partir de imagens), ficheiros de código em
  `src/`, decisões em nome do Diogo.

---

## 7. Decisões técnicas do Claude (o código é dele)

- **Stack:** HTML, CSS e JavaScript estáticos em `public/`, gerados por `src/gerar.py` (Python 3, biblioteca padrão) a partir de ficheiros de
  conteúdo (`src/conteudos/pt.json`, `en.json`, `tarifas.json`) e do CSS do design. Sem framework, sem Node no build, sem base de dados no
  site. Um único PHP, `public/prereserva.php`, para a pré-reserva (secção 8), com o seu `config.php` **não versionado**, como na app.
  Razões: a Amen é alojamento partilhado (PHP/Apache, sem Node), a página fica leve e legível por pessoas e por robôs, o deploy é um rsync.
- **Línguas:** PT na raiz, EN em `/en/`, ligados na barra; `hreflang` nos dois.
- **Fidelidade ao design:** o HTML gerado reproduz o `design/` ao píxel nas capturas; divergências são defeitos para o Claude corrigir, não
  decisões de desenho para o Claude tomar.
- **SEO e LLM (enquadramento de 2/10):** `robots.txt` a deixar entrar GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, Bingbot, PerplexityBot,
  Google-Extended; `llms.txt`; schema.org `VacationRental`/`LodgingBusiness` com nome, morada, coordenadas, capacidade, comodidades, telefone,
  link de reserva; `sitemap.xml`; favicon e ícones; Open Graph por página; `<title>` e `<meta description>` por página; texto corrido sem depender
  de JavaScript.
- **Testes:** `ferramentas/captura.mjs` (iPhone 14 e desktop 1 280; falha com erro JS, rolagem horizontal ou imagem partida) e `testes.mjs`
  (simulador, links, formulário, âncoras) correm em cada push num workflow «Capturas»; o deploy exige o «Capturas» do mesmo commit verde (regra
  #176 da app, copiada).
- **Deploy:** `.github/workflows/deploy.yml` manual, `dry_run` primeiro, rsync de `public/` para a raiz confirmada, `--delete` só dentro dessa
  raiz, `DEPLOY_PATH` validado antes do envio (como na app), secrets próprios do repositório do site, carimbo `versao.json`.
- **Memória:** `CLAUDE.md` do site com estado, decisões e próximo passo, atualizado no fecho de cada sessão; o `docs/temas/SITE.md` da app
  passa a apontar para lá.

---

## 8. Integração com a app: as quatro portas (contrato indicativo; NÃO existem ainda)

Nascem no repositório da app, cada uma numa sessão APP, com número `#` (a partir do #189), stub, teste de fumo, ensaio e deploy. O site
consome-as por HTTPS em `https://app.montecasabranca.pt/`. Nomes em português, ficheiros na raiz da app, JSON, como `push.php` e
`toc_varredela.php`. O contrato final de cada uma escreve-se em `docs/integracao-app/` do site antes de se fazer.

| Porta | Método | Dá / recebe | Regras |
|---|---|---|---|
| `site_ocupacao.php` | GET `?de=AAAA-MM&ate=AAAA-MM` | dias ocupados por intervalo (`[{"de":"2027-03-05","ate":"2027-03-08"}]`), sem nomes, sem códigos, sem canal | só leitura; `Cache-Control: max-age=300` (só desempenho, não é garantia); CORS só `https://montecasabranca.pt`; o site diz «datas indicativamente livres» |
| `site_tarifa.php` | GET `?entrada&saida&pax` | total, noites, limpeza, mínimo de noites, época, avisos (verão sáb–sáb, mensal 28+), pelas Tarifas da app | só leitura, sem cache; o simulador do site deixa de ter tabela copiada (mantém-na só como fallback «valor indicativo») |
| `site_prereserva.php` | POST só de `public/prereserva.php` do site (servidor a servidor, cabeçalho `X-Site-Chave`; o browser nunca lhe chega) | `pedido_id` (UUID), nome, email, telefone, datas, pax, mensagem, `preco_mostrado` → cria reserva «Por confirmar», canal Particular, código `2027_NN`, guarda `site_pedido_id`, push ao Diogo | a app recalcula ocupação, mínimos e preço; preço diferente → 409 com os dois valores, só `confirmo_preco=1` cria; conflito com Confirmada/uso próprio → 409, nada criado; outro «Por confirmar» nas mesmas datas → cria e avisa o Diogo; `pedido_id` repetido ou mesmo email + datas em 24 h → mesma resposta, nada criado; 5 pedidos/IP/hora e 20/dia (`site_pedidos`); armadilha anti-spam e 5 s mínimos; erros genéricos; `registo` só com código, resultado e IP /24 |
| `site_avaliacoes.php` | GET | só as avaliações marcadas «publicar no site» na app (campo novo, SQL em `sql/`), com nota, texto, primeiro nome e país | só leitura; a marcação é do Diogo, avaliação a avaliação |

**Estados no site (P2):** «datas indicativamente livres» · «pedido recebido · n.º 2027_NN» · e mais nenhum: «reserva confirmada» nunca aparece
no site; a confirmação é do Diogo, por contacto, como hoje. **Se a app não responder 2xx/409 em 5 s:** simulador com a tabela embutida marcada
«valor indicativo», sem a palavra «livre», botões WhatsApp e email; nunca fingir validação. **Testes de aceitação das portas:** T-P1.1–T-P1.6 e
T-P2.1–T-P2.5 (secção 0), no stub da app antes do deploy e à mão depois.

Nunca: credenciais, `config.php`, feeds iCal, dados de hóspedes, endpoints da ferramenta. Cada porta regista no `registo` da app e aparece no
cronómetro. A pré-reserva não é confirmação: o Diogo fecha por contacto, como hoje (S3).

---

## 9. Amen e publicação (FACTOS e DESCONHECIDOS)

- FACTO: a app está em `/data/sites/web/montecasabrancapt/subsites/app.montecasabranca.pt`, com rsync `--delete` e exclusões; intocável.
- DESCONHECIDO (Diogo, no painel da Amen): a raiz web do domínio principal `montecasabranca.pt`; **como está feito o redirecionamento para o
  Linktree** (regra no painel ou `.htaccess` na raiz); se é possível criar o subdomínio de ensaio `novo.montecasabranca.pt`.
- Até isso estar escrito em `docs/decisoes/pendentes.md`, não há `deploy.yml` no site. O Claude guia o Diogo passo a passo no painel; não entra
  lá (regra da app).
- **Segredos do site (P1):** `site_config.php` com a `X-Site-Chave` fica **um nível acima da raiz web** do site (não versionado, fora do rsync,
  nunca no browser); se a Amen não deixar, dentro da raiz como `config.php` negado por `.htaccess`, como na app. Em qualquer caso `.htaccess` nega
  `config*.php` e o teste T-P1.1 (`curl -I`) prova 403/404 depois de cada deploy. DESCONHECIDO: o caminho exato (painel da Amen).
- A chave SSH pode ser a da app (registada no painel da Amen), mas os secrets criam-se de novo no repositório do site, pelo Diogo; o ChatGPT
  nunca vê a chave privada.

---

## 10. Fotografias e logótipo

- Originais: Dropbox `/1. DVM/2. ANGULOS CASTIÇOS, LDA/5. Exploração AL/7. Fotos/` (Rodrigo em `2. rodrigo/`; antes e depois em
  `6. Antes e Depois/`); a biblioteca inteira está também no Canva do Diogo (Uploads → «MCB»; 1 032 imagens distintas; registo em
  `canva_assets.tsv`). FACTO: a rede do ambiente do Claude não descarrega do Dropbox nem do Canva; por isso as versões web entram no
  repositório **pela mão do Diogo** (descarregar do Canva ou do Dropbox as escolhidas pelo ChatGPT) na fase 1.
- Em `public/imagens/`: só as escolhidas, em tamanho web, com nome que diga o que é (`piscina_por_do_sol.jpg`), e `docs/fotografia/creditos.md`
  com a origem de cada uma. As 24 miniaturas de 600 px da v3 servem para rascunho, não para o site.
- **Origem e direitos (P4):** `docs/fotografia/creditos.md` tem uma linha por imagem do site: ficheiro · origem (Dropbox ou Canva) · nome
  original · zona · autor · autorização de uso público (quem confirmou, data). Autores: Rodrigo (reportagem de 2022; usada nas plataformas desde
  então; o uso em site próprio confirma-o o Diogo numa linha datada) e o Diogo/família (antes e depois). Sem linha de autorização, a imagem não
  entra. O teste de fumo do site falha se houver imagem em `public/imagens/` sem linha no `creditos.md`. Os originais ficam intocados no Dropbox.
- **Zenfolio (S5 + P4): cancela-se só com as cinco condições escritas como feitas em `docs/decisoes/aprovadas.md`:** (1) os originais de todas
  as fotos da galeria no Dropbox, conferidos por contagem e nome; (2) a lista do que a galeria tem registada (exportada ou em capturas pelo Diogo;
  o Claude não vê o Zenfolio e regista essa limitação); (3) a página «Fotos» no ar e verificada pelo Diogo; (4) os links para a galeria (Linktree,
  Instagram, Google) trocados ou removidos; (5) o Diogo escreveu «cancela o Zenfolio» com data.
- Logótipo: FACTO há `assets/logo.png` (900 × 354, transparente) e `MCBRANCA_Logo_preto/branco.jpg`; DESCONHECIDO se existe vetor. Usa-se o que
  existe; não se redesenha.

---

## 11. O que só o Diogo dá (lista para responder quando calhar; nada disto trava a fase 1)

- A2/S9 fica resolvido por este acordo: **Amen por GitHub** (não o alojamento do Lovable; o Lovable não se usa).
- A3/S8: QR na casa e página `/voltar` para repetentes: sim ou não.
- F1 logótipo em vetor · F2 recomendações à volta (5–8 linhas) · F3 nota e n.º de avaliações em cada plataforma · F4 assinatura da avaliação
  citada · F5 regra de cancelamento no direto.
- P1–P17 do pacote v4 (basta «sim» ou corrigir): morada, Wi-Fi, AC, máquinas, TV, toalhas, animais, crianças, festas, fumar, fatura,
  configuração B, golfe, aeroporto, «melhor preço aqui», pares do antes e depois, cancelamento.
- Os DESCONHECIDOS da Amen (secção 9), agora também: onde pode ficar o `site_config.php` acima da raiz web.
- O que o conector GitHub do ChatGPT consegue fazer (só ler, escrever em ramos, ou em `main`), para a secção 3.
- A autorização de uso das fotos do Rodrigo em site próprio (uma linha datada no `creditos.md`).
- Quais as avaliações a publicar (marca-as na app quando a porta existir).

---

## 12. Decisões já tomadas que não se reabrem (resumo; detalhe no `docs/temas/SITE.md` da app)

S1 Amen, raiz do domínio; Linktree só sai depois do go/no-go · S2 formulário que cria pré-reserva na app + WhatsApp + email lado a lado ·
S3 «Simule a sua estadia» com preços à vista e «Pré-reservar» · S5 página «Fotos» própria por zonas + antes e depois; Zenfolio cancela-se depois ·
S6 simulador já no protótipo · S7 PT e EN desde o primeiro dia · S14 uma página de cada vez · S15 o Claude corrige o técnico sem perguntar ·
D1 mix 1+4+6 do Canva, várias páginas, terracota à mistura · D2 o site não herda nada da app (nem o azul #1B4DB1, nem a IBM Plex, nem
cartões/chips/barras) · D4 sem botões para as plataformas; uma linha nas perguntas · D5 late check-out ao fim de semana ao pôr do sol, com
asterisco «sem entrada no mesmo dia» · sem Facebook · sem IBAN público · PayPal só depois da pré-reserva · D10 o Perfil da Empresa no Google
já existe · **12/10: o ChatGPT desenha, o Claude codifica; o ChatGPT cria e gere o repositório do site até à conformidade.**
S13 (repositório público para o ChatGPT ler) fica sem efeito: o ChatGPT lê o repositório privado pelo conector.

---

## 13. Ordem de arranque (quem faz o quê, a partir de hoje)

1. **Diogo:** cria `site-montecasabranca` (privado, na sua conta) e dá acesso ao ChatGPT. Diz ao ChatGPT que este acordo é a regra.
2. **ChatGPT:** árvore, README, cópia controlada dos documentos (fase 0), `docs/decisoes/` com aprovadas/propostas/pendentes a partir das secções
   11 e 12 deste acordo.
3. **ChatGPT:** escolha das fotos da página inicial pelo nome; **Diogo** põe-nas em `public/imagens/` em tamanho web.
4. **ChatGPT:** 2 ou 3 direções da página inicial em HTML/CSS mobile-first → **Diogo** escolhe por olho.
5. **ChatGPT:** as restantes páginas no sistema escolhido → **Diogo** aprova página a página → lista de conformidade completa.
6. **Diogo:** acesso da app «Claude» do GitHub ao repositório; «passa ao Claude» na sessão SITE.
7. **Claude:** fase 2; as portas de escrita e de avaliações (#191, #192) da fase 3 em sessões APP; o Diogo responde aos DESCONHECIDOS da Amen
   quando calhar.
8. **Claude, desde já e em paralelo com os passos 2–5 (v1.2, S17):** as duas portas de leitura, **#189 `site_ocupacao.php`** e **#190
   `site_tarifa.php`**, em sessões APP pelas regras da app (stub, teste de fumo, ensaio, «Lança»), pelo contrato `contrato_portas_v1.md`. Não
   escrevem nada, não dependem do desenho, e deixam o ChatGPT desenhar o calendário e o simulador contra a ocupação e os preços reais. O
   contrato (S16) e o modelo de créditos (S18) copiam-se para o repositório do site na fase 0.

Em paralelo e sem esperar por ninguém: o Diogo responde às perguntas da secção 11 quando quiser; o ChatGPT escreve os requisitos testáveis do
site (`docs/design/requisitos_v1.md`) a partir do brief.

---

## 14. Diferenças da v1.1 face à v1.0 (13/10)

1. **Secção 0, nova:** a resposta P1–P4 à adenda do ChatGPT, com decisão, razão, texto, testes e riscos de cada ponto.
2. **Secção 3:** o processo de sincronização em `main` (fetch e rebase antes de escrever e antes do push; nunca forçar; conflito pára e avisa;
   formato dos commits; alternativa por ramo `gpt/…` juntado pelo Diogo, ou carregamento no github.com, se o conector do ChatGPT não escrever em `main`).
3. **Secção 4, fase 4:** o Zenfolio só se cancela com as cinco condições da secção 10.
4. **Secção 8:** `site_ocupacao.php` com `Cache-Control: max-age=300` e a palavra «indicativamente»; `site_tarifa.php` sem cache e a tabela
   embutida só como fallback; `site_prereserva.php` só servidor a servidor com `X-Site-Chave`, `pedido_id` idempotente, `preco_mostrado` e o 409
   de revalidação, conflitos (Confirmada → recusa; Por confirmar → cria e avisa), limites 5/hora e 20/dia em `site_pedidos`, armadilha e 5 s,
   erros genéricos, `registo` sem dados pessoais; os três estados no site e o fallback em 5 s; os testes T-P1 e T-P2.
5. **Secção 9:** onde vive o segredo do site (acima da raiz web; senão `.htaccess`) e o teste `curl -I` depois de cada deploy.
6. **Secção 10:** `creditos.md` com origem, autor e autorização datada por imagem; o teste de fumo falha sem ela; as cinco condições do Zenfolio.
7. **Secção 11:** três DESCONHECIDOS novos (caminho do `site_config.php`; o que o conector do ChatGPT consegue; autorização das fotos do Rodrigo).
8. Nada muda nos papéis, nas fases, na lista de conformidade, na stack, nas decisões da secção 12 nem na ordem de arranque.

**Diferença da v1.2 face à v1.1 (13/10, S17):** só o passo 8 da secção 13: as portas de leitura #189 e #190 fazem-se já, em sessões APP, em paralelo
com o design; #191 e #192 continuam depois do «passa ao Claude». Documentos de apoio nascidos no mesmo dia: `contrato_portas_v1.md` (S16) e
`creditos.md` pré-preenchido (S18), a copiar para o repositório do site.

---

*Guardado em `docs/temas/site/chatgpt/2026-10-13_acordo_dois_repositorios_v1.2.md` (+ `.pdf`) no repositório da app, ao lado da v1.1, da v1.0, do plano
do ChatGPT (`2026-10-12_plano_dois_repositorios_do_gpt.pdf`) e da adenda (`2026-10-13_adenda_seguranca_do_gpt.pdf`). Quando o repositório do
site existir, copia-se para `docs/decisoes/` de lá.*
