# Handover do tema SITE para outro assistente (Claude, ChatGPT, Gemini ou outro) · 7/11/2026

**Para quê:** o Diogo quer poder passar a outro modelo o que está feito e as instruções para ele ficar a gerir o site. Este documento é
o ponto de entrada; a memória completa, cronológica, é o `CLAUDE.md` deste repositório. Lê este primeiro, o `CLAUDE.md` depois, e não
voltes a perguntar o que aqui está decidido: aplica e diz onde está escrito.

## 1. O projeto em dez linhas

- **Monte Casa Branca**, alojamento local em Montemor-o-Novo (Alentejo, a 1 h de Lisboa): casa inteira, 4 quartos, até 8 pessoas,
  piscina 10 × 5 m. Dono: Diogo Viana Machado (firma Ângulos Castiços, Unipessoal Lda; registo 126450/AL). Telefone +351 962 802 626.
- **Dois repositórios no GitHub** (conta `diogovianamachado-coder`): `site-montecasabranca` (o site público, `montecasabranca.pt`) e
  `appmontecasabranca` (a app de gestão de reservas em PHP/MySQL, `app.montecasabranca.pt`, na Amen; privada; só se mexe nela em
  sessões «APP», pelas regras do `CLAUDE.md` dela). O site fala com a app por quatro portas HTTPS (#189 ocupação, #190 tarifa, #191
  pré-reserva, #192 avaliações), ainda por fazer; contrato em `appmontecasabranca/docs/temas/site/integracao/contrato_portas_v1.md`.
- **Três papéis (acordo v1.2, 13/10):** o Diogo decide tudo por olho e por escrito e autoriza cada publicação («Lança»); o ChatGPT faz
  design, fotografias por zona e textos PT; o assistente de código (hoje o Claude) faz todo o código, testes, SEO/LLM, EN, publicação.
  Alterações ao acordo são uma versão nova (v1.3, por escrever) validada pelos três; nada se muda na conversa.
- **Objetivo do site:** mais hóspedes na época baixa e ser encontrado pelas pesquisas em assistentes de IA e no Google: texto corrido com
  números exatos, `FAQPage`, `VacationRental` completo, `llms.txt`, PT e EN. Brief do Diogo em `CLAUDE.md` §1a.

## 2. Mapa: onde está cada coisa

| O quê | Onde |
|---|---|
| Memória cronológica do tema SITE, regras, estado | `CLAUDE.md` (raiz deste repositório; só o assistente de código escreve nele) |
| Factos da casa com ✓ (a única fonte de números e textos factuais) | `docs/conteudos/fontes/FACTOS.md` (cópia idêntica em `appmontecasabranca/docs/temas/site/`) |
| Decisões e fechos do ChatGPT | `docs/decisoes/` (`aprovadas.md`, `pendentes.md`, fechos datados) |
| Recados do assistente de código ao ChatGPT, handovers | `docs/integracao-app/RECADOS_PARA_O_CHATGPT.md` (o de 1/11 é o handover de fotografias e design) |
| O site explodido secção a secção, com as decisões numeradas 0.1–7.3 | `docs/integracao-app/2026-10-25_explodido_site_lovable.md` |
| Decisão «base = versão do Lovable» + adenda «Amen» | `docs/integracao-app/2026-10-25_decisao_site_no_lovable.md` |
| Inventário das fotografias que existem no GitHub | `docs/fotografia/2026-11-01_inventario_github.md` + `.jpg` |
| Design do ChatGPT (prancha aprovada, V1.3.1 em sete páginas, estudos) | `design/` (`prancha-aprovada-2026-10-19/`, `site/`, `estudo-imagens/`, `arquivo/`) |
| Demo estática r0–r3 (histórico; não continua) e as suas ferramentas | `demo/` (`REGISTO.md`, `ferramentas/demo.py`, `capturas/rN/`) |
| Peças de código já escritas para o site do Lovable (tarifas, tempo, ocupação, pedido, factos, SEO) | `lovable/src/lib/*.ts`, `lovable/verificar.mjs`, `lovable/LEIA-ME.md` |
| Receita da exportação estática do Lovable para a Amen, provada | `lovable/exportacao-estatica/LEIA-ME.md` |
| Capturas da versão do Lovable no iPhone, secção a secção | `lovable/capturas/2026-11-01/` |
| Projeto do Lovable | conta anguloscasticos@gmail.com, workspace «MONTE's Lovable», projeto «Monte Casa Branca» `96fa8399-2585-4338-bf69-b63411871178`; editor https://lovable.dev/projects/96fa8399-2585-4338-bf69-b63411871178 |
| Fotografias originais | Dropbox `…/5. Exploração AL/7. Fotos/` (anúncios V1/V2_verão/V3_inverno, Interior, 2. rodrigo/HD, 6. Antes e Depois) e `13. APP Gestão AL/site/zenfolio/` (`v2/` 112 em cinco álbuns, `antes-e-depois/` 22 pares) |
| Demos antigas publicadas (claude.ai, privadas) | principal https://claude.ai/artifact/DdiLqNNHdNeJnF61d4cr3S · r3 https://claude.ai/artifact/DCCRdLyWL9UmSkRk2oCQdF |

## 3. Decisões fechadas (não voltam a ser pergunta)

1. **Estrutura do site = os sete pontos do Diogo (25/10):** capa com a piscina e a casa · mensagem forte com fotografias fortes · a casa
   em detalhe, «o exterior é rei», depois sala e interior · avaliações e perguntas frequentes · Montemor-o-Novo e Nacional 2 · contactos ·
   botão «Verificar disponibilidade» sempre à mão, com o tempo e o contacto. Página única em scroll.
2. **A base é a versão feita no Lovable (25/10)**, «adaptada com coisas» do assistente de código. A demo estática `demo/` ficou como registo.
3. **Alojamento na Amen (1/11)**, não no Lovable. O Lovable é só a ferramenta de desenho. Provado que o projeto compila para ficheiros
   estáticos sem referências ao Lovable (`lovable/exportacao-estatica/`).
4. **Design primeiro, técnica depois (25/10):** o design fecha-se secção a secção pelas decisões numeradas do explodido antes de
   qualquer integração.
5. **Prancha aprovada (19/10, design apenas)** é referência permanente; **mensagem e textos não aprovados** (quatro frases em análise).
6. **Factos só do `FACTOS.md` com ✓**; o resto marca-se `[?]`. **«Reguengo»** só na morada postal do rodapé e no schema.org; palavras da
   zona: Évora, Alentejo, Montemor-o-Novo, Alqueva, «a 1 h de Lisboa». Sem hectares até o Diogo confirmar (3,2 ou 3,6).
7. **KPI confidenciais:** nunca números de ocupação, receita ou origem dos hóspedes em público. Avaliações: só as marcadas «citar no site».
8. **Ligações das plataformas são do assistente de código** (as oficiais do Linktree, em `demo/base/dados/factos.json`), não do ChatGPT.
9. **Nunca pedir fotografias ao Diogo.** Estão todas no Dropbox; escolhem-se pelo nome; entram no repositório pela entrega do ChatGPT
   (`design/fotos/`) ou por quem tiver acesso ao Dropbox a partir da sessão.
10. Sem tabela de preços por época no site; o simulador mostra o total. Trio e antes/depois mantidos com os pares certos (ad01–ad11).
11. Nada se publica no domínio sem o «Lança» do Diogo; antes disso, staging em `novo.montecasabranca.pt` e go/no-go do Linktree.

## 4. Estado a 7/11/2026

- **Lovable:** primeira versão de 25/10, sem alterações desde então (4,6 créditos gastos; plano gratuito, 5 por dia). A ligação do
  projeto ao GitHub **não está feita**: no iPhone o regresso do GitHub cai dentro da app e dá «Invalid request»; tem de ser feita num
  computador (editor → GitHub → Connect → instalar a app do Lovable na conta `diogovianamachado-coder` → Create repository).
- **Explodido** entregue com as decisões 0.1–7.3; **o Diogo ainda não respondeu**.
- **Fotografias:** no GitHub há 7 originais em tamanho web, 2 recortes e 24 miniaturas; o resto está no Dropbox. A entrega
  `design/fotos/` pedida ao ChatGPT (25/10 e 1/11) **não aconteceu**; o ChatGPT diz que lhe falta autorização para escrever no GitHub
  (já escreveu a 24/10 como `diogovianamachado-coder`). Saídas: token «fine-grained» só para este repositório, ou entrega no Dropbox
  em `13. APP Gestão AL/site/fotos/` com a estrutura do handover de 1/11.
- **Repositório `site-montecasabranca` passou a público entre 2 e 7/11.** Ver o alerta na secção 7.
- **Código pronto à espera:** `lovable/src/lib/*.ts` (20 verificações certas), receita de exportação estática, `prereserva.php` por
  escrever, portas #189–#192 por fazer na app (sessões APP), EN por escrever, v1.3 do acordo por escrever.
- **Sem resposta do Diogo:** S31–S33 (19/10); secção 6 do fecho do ChatGPT de 19/10 (papéis); 3,2 vs 3,6 ha; logótipo; `creditos.md`.
  **Próxima sugestão livre: S37** (numeração partilhada com o ChatGPT; ler `docs/decisoes/` antes de numerar).

## 5. Regras de trabalho para qualquer assistente

- **Português, sempre**, também nas respostas. O Diogo lê no iPhone: respostas curtas, ecrãs como imagem e com ligação.
- **Cada sessão abre por** «Lê o CLAUDE.md e diz-me em cinco linhas onde estamos» e responde com: estado em cinco linhas, as perguntas
  em aberto com as respostas já dadas, os recados, e três linhas «o que vais ver» antes de tocar em código.
- **Fecho de sessão:** três sugestões fora da caixa numeradas (S37, S38…) e esperar o sim/não do Diogo a cada uma; só depois a memória
  no `CLAUDE.md`, commit, push, estado em cinco linhas e o número do commit. Rejeitadas ficam registadas e não se voltam a propor.
- **Git:** tudo em `main`; `git pull --rebase origin main` antes de escrever e antes do push; **nunca `--force`**; commits «SITE · assunto»
  com a ligação da sessão; conflito pára e avisa o Diogo. Ficheiros gerados não se editam à mão. Nenhuma publicação decorre de um commit.
- **Pastas:** cada assistente escreve só nas suas (tabela em `CLAUDE.md` §3); recados ao ChatGPT em `RECADOS_PARA_O_CHATGPT.md`;
  o ChatGPT responde em `docs/decisoes/` e `docs/design/`.
- **O que já está decidido não volta a ser pergunta**: aplica-se e diz-se onde está escrito. Decisões novas só do Diogo, por escrito.
- **Testes escritos para quem nunca abriu o site:** onde ir, o que tocar, o que tem de aparecer. Capturas a 390 e 1 280 px; sem erros
  de JavaScript, sem rolagem horizontal.
- **Nunca pedir nem aceitar palavras-passe ou chaves na conversa.** Segredos vivem nos GitHub Secrets e no `config.php` da Amen.

## 6. O método técnico, do desenho ao domínio

1. **Desenho no Lovable:** o ChatGPT entrega textos PT e fotografias pelo nome; o assistente de código escreve ao agente do Lovable um
   pedido por secção (créditos: 1–5 por lote); o Diogo vê no telemóvel e diz sim ou o que mudar.
2. **GitHub:** o projeto do Lovable sincroniza com um repositório novo na conta do Diogo (dois sentidos). O código do assistente entra
   por push: `lovable/src/lib/*.ts` substitui `src/lib/stay.ts`, liga o painel às portas da app e ao Open-Meteo, mete `robots.txt`,
   `llms.txt`, schema.org, `sitemap.xml`, EN.
3. **Construção estática:** `bun install` + `vite build` com `prerender` ligado (receita em `lovable/exportacao-estatica/`); as
   fotografias passam de `.asset.json` do Lovable para ficheiros em `public/imagens/`.
4. **Amen:** `deploy.yml` manual com `dry_run`, rsync de `.output/public/` para a raiz confirmada, `--delete` só lá dentro, só com o
   workflow «Capturas» verde; `prereserva.php` com `site_config.php` fora da raiz web; `www.` e HTTP → HTTPS; staging antes do
   go/no-go do Linktree. Modelo: o `deploy.yml` da app.
5. **Portas da app** (#189 e #190 primeiro) em sessões APP, pelo contrato; CORS por `definicoes.site_origens`.

## 7. Alertas abertos para quem pegar nisto

- **O repositório do site está público (7/11) e contém números confidenciais dos KPI** em `docs/decisoes/2026-10-19_fecho_chatgpt_design_kpi.md`
  e no histórico do `CLAUDE.md` (retirados do texto atual a 7/11, mas o histórico do git guarda-os), e o retrato agregado do negócio em
  `docs/integracao-app/2026-10-18_kpi_e_publicos_para_o_chatgpt.md`. Tornar público não dá ao ChatGPT autorização para escrever: só dá
  leitura a toda a gente. **Recomendação: voltar a privado** e resolver a escrita do ChatGPT com um token ou pelo Dropbox.
- A rede da sessão do Claude bloqueia o Dropbox (três endereços) e a documentação do Lovable; outro assistente pode ter outra rede.
- A fotografia «capa 2» (piscina de lado com a espreguiçadeira e o chapéu) não existe em lado nenhum acessível; tem de vir do Dropbox.

## 8. Mensagem para o Diogo colar ao novo assistente

> Lê `docs/integracao-app/2026-11-07_handover_para_outro_assistente.md` e depois o `CLAUDE.md` do repositório
> `diogovianamachado-coder/site-montecasabranca`. Responde em português, em cinco linhas: onde estamos, o que está decidido, o que falta,
> as perguntas em aberto que dependem de mim, e as três linhas do que vais fazer a seguir. Não voltes a perguntar o que está decidido.
> Não me peças fotografias. Nada se publica sem o meu «Lança».
