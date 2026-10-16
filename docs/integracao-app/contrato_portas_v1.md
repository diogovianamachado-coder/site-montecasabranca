# Contrato das quatro portas da app para o site · v1.0 · 13/10/2026 (S16)

**O que é:** a especificação das quatro portas que o site `montecasabranca.pt` vai usar na app `app.montecasabranca.pt`, escrita pelo Claude
antes de existirem, pelo acordo v1.1 (secções 0, 8 e 9). Serve ao ChatGPT para desenhar o calendário, o simulador e o formulário contra dados
reais, e à sessão APP que fizer cada porta. **Nenhuma destas portas existe ainda.** Cada uma nasce numa sessão APP com o seu número `#`,
stub, teste de fumo, ensaio e «Lança», pelas regras do `CLAUDE.md` da app. Copia-se para `docs/integracao-app/` do repositório do site na fase 0.

Números reservados: **#189** `site_ocupacao.php` · **#190** `site_tarifa.php` · **#191** `site_prereserva.php` · **#192** `site_avaliacoes.php`.
Pela v1.2 do acordo (S17), as duas de leitura (#189, #190) podem fazer-se em paralelo com o design; as outras duas só depois do «passa ao Claude».

## 0. Regras comuns

- Ficheiros na raiz da app, em PHP, `declare(strict_types=1)`, `require_once lib/db.php`, sem sessão PHP (não há login; nada de `session_start()`),
  marcas do cronómetro (`crono()`), linha no `registo` só quando se escreve ou falha.
- Resposta sempre JSON UTF-8 (`Content-Type: application/json; charset=utf-8`), nunca HTML; códigos HTTP com sentido (200, 201, 400, 401, 409, 422, 429, 503).
- CORS: `Access-Control-Allow-Origin` só para `https://montecasabranca.pt` e, enquanto houver ensaio, `https://novo.montecasabranca.pt`
  (lista em `definicoes.site_origens`); sem cookies, sem credenciais; `OPTIONS` responde 204.
- Datas em ISO `AAAA-MM-DD`; a saída é exclusiva (a noite de 7 → 8 ocupa só o dia 7), como em `reservas.check_out`.
- Nunca: nomes, códigos de reserva de terceiros, canal, valores de reservas, emails, telefones, `config.php`, feeds iCal.
- Erros genéricos para o visitante: `{"ok":false,"erro":"<codigo>","mensagem":"<frase em PT>"}`; nada de SQL, caminhos ou pilhas.
- Ensaio sem servidor: o stub da app responde às quatro com `STUB_SITE=1`; os testes T-P1.1–T-P1.6 e T-P2.1–T-P2.5 do acordo correm aí antes do deploy.

## 1. `site_ocupacao.php` · #189 · leitura

**Pedido:** `GET /site_ocupacao.php?de=2027-01&ate=2027-06` (meses inclusivos; sem parâmetros = mês corrente + 11; máximo 18 meses).

**Resposta 200:**
```json
{"ok":true,"de":"2027-01-01","ate":"2027-07-01",
 "ocupado":[{"de":"2027-03-05","ate":"2027-03-08"},{"de":"2027-04-02","ate":"2027-04-09"}],
 "gerado_em":"2027-01-10T10:00:00+00:00"}
```
- `ocupado` = reservas **Confirmadas** e **uso próprio** que tocam o intervalo (`conflitos()`/`ocupacao()` de `lib/motor.php`, sem os campos
  pessoais), intervalos contíguos juntos. **Por confirmar** não entram (P2: os pedidos não bloqueiam datas). Canceladas nunca.
- Cabeçalhos: `Cache-Control: public, max-age=300` (só desempenho; o site escreve «datas indicativamente livres»).
- Erros: 400 `intervalo` (datas inválidas ou > 18 meses).

## 2. `site_tarifa.php` · #190 · leitura

**Pedido:** `GET /site_tarifa.php?entrada=2027-05-14&saida=2027-05-17&pax=6`

**Resposta 200 (estadia possível):**
```json
{"ok":true,"entrada":"2027-05-14","saida":"2027-05-17","noites":3,"pax":6,
 "epoca":"Primavera","noite":330.00,"dormidas":990.00,"limpeza":180.00,"total":1170.00,
 "min_noites":2,"avisos":[],"regras":["Entrada a partir das 16h","Saída até às 11h"],
 "calculado_em":"2027-01-10T10:00:00+00:00"}
```
- Conta = `orcamento(entrada, saida, 1)` (canal Particular, a tarifa privada do ano da entrada; limpeza por `limpezaDoAno()`); mensal 28+ noites
  nas épocas que o têm; verão sáb→sáb; os avisos vêm como texto PT.
- **Resposta 200 com `ok:false`** quando a estadia não cumpre as regras (não é erro HTTP): `{"ok":false,"erro":"min_noites","mensagem":"Nesta
  época o mínimo são 2 noites","min_noites":2}` · `erro:"verao_sabado"` · `erro:"passado"` · `erro:"pax"` (máx. 8) · `erro:"sem_tarifa"` (ano sem
  tarifa carregada; o site cai para «contacte-nos»).
- Sem cache (`Cache-Control: no-store`). O site guarda `total` como `preco_mostrado` para a pré-reserva.
- Erros HTTP: 400 `datas` (formato, saída ≤ entrada, > 60 noites).

## 3. `site_prereserva.php` · #191 · escrita (só servidor a servidor)

**Quem chama:** só `public/prereserva.php` do site, com o cabeçalho `X-Site-Chave: <segredo>` (igual em `site_config.php` do site e em
`config.php` → `site_chave` da app). O browser do visitante nunca chama esta porta; chama o `prereserva.php` do site, no mesmo domínio.

**Pedido:** `POST /site_prereserva.php`, corpo JSON:
```json
{"pedido_id":"6f1c2a4e-…(UUID gerado pelo site)","nome":"Ana Martins","email":"ana@exemplo.pt","telefone":"+351 9…",
 "entrada":"2027-05-14","saida":"2027-05-17","pax":6,"mensagem":"Podemos levar o cão?","preco_mostrado":1170.00,
 "lingua":"pt","origem":"precos","ip":"<ip do visitante, para o limite>","segundos_a_preencher":42,"armadilha":""}
```

**Resposta 201 (pedido criado):**
```json
{"ok":true,"codigo":"2027_03","estado":"pedido recebido","total":1170.00,
 "mensagem":"Recebemos o seu pedido para 14–17/mai/2027. O Diogo responde em breve por WhatsApp ou email."}
```
- A app: valida campos (422 `campos` com a lista) → `conflitos(entrada, saida)` com Confirmada/uso próprio → 409 `ocupado` → recalcula
  `orcamento()`; se `total ≠ preco_mostrado` → 409 `preco` com `{"preco_mostrado":1170,"preco_app":1230}` e só um segundo POST com
  `"confirmo_preco":true` cria → mínimos/regras → 409 `min_noites` etc. → cria a reserva: `estado` «Por confirmar», `canal_id` 1 (Particular),
  `codigo` = `proximoCodigo()`, `site_pedido_id` = `pedido_id`, nome/email/telefone/pax/datas/notas (a mensagem vai para as NOTAS com «Pedido pelo
  site»), valores pelo `orcamento()` → `registar('info','site',…)` → `pushEnfileirar()` tipo `site_prereserva` («Pedido do site: Ana Martins,
  14–17/mai, 1 170 €»; se houver outro Por confirmar nas mesmas datas, acrescenta «há outro pedido para estas datas»).
- **Idempotência:** `pedido_id` já existente em `reservas.site_pedido_id` → 200 com a mesma resposta de antes, nada criado; mesmo email + mesmas
  datas nas últimas 24 h → idem, devolve o pedido existente.
- **Abuso:** tabela `site_pedidos` (id, ip_prefixo /24, pedido_id, resultado, criado_em): > 5 por IP na última hora ou > 20 no dia → 429
  `limite`; `armadilha` não vazia ou `segundos_a_preencher < 5` → 200 `{"ok":true,"estado":"pedido recebido"}` **falso**, nada criado, linha no
  `registo`; `X-Site-Chave` ausente ou errada → 401 `chave`, nada criado.
- `registo` guarda código, resultado e IP /24; a mensagem e os contactos ficam só na reserva.
- SQL (em `sql/`, aplicado pela Versão): `ALTER TABLE reservas ADD site_pedido_id CHAR(36) NULL, ADD UNIQUE (site_pedido_id)` ·
  `CREATE TABLE site_pedidos (…)` · `INSERT INTO definicoes … site_origens`.

**Do lado do site (`public/prereserva.php`, Claude):** recebe o formulário, gera o `pedido_id` se não vier, junta o IP e o tempo, chama a app com a
chave e 5 s de limite; traduz a resposta para o visitante («pedido recebido · n.º 2027_03» / «o valor atualizado é X €; confirma?» / «estas datas
deixaram de estar livres» / em falha: «não foi possível registar o pedido; fale connosco pelo WhatsApp ou email», com os dois botões).

## 4. `site_avaliacoes.php` · #192 · leitura

**Pedido:** `GET /site_avaliacoes.php?lingua=pt` (ou `en`; opcional `n=6`).

**Resposta 200:**
```json
{"ok":true,"media":4.9,"n":12,
 "avaliacoes":[{"nota":5,"texto":"…","nome":"Marie","pais":"FR","mes":"2026-08","lingua":"en"}]}
```
- Só avaliações com `avaliacoes.publicar_site = 1` (coluna nova, SQL em `sql/`), marcadas pelo Diogo uma a uma no cartão Avaliação da reserva
  (uma caixa «Publicar no site», mudança pequena no `reserva.php`, no mesmo `#192`). Nome = primeiro nome; país pela ficha; nunca o email.
- `media` e `n` contam todas as avaliações com nota global (publicadas ou não); o texto só das publicadas.
- `Cache-Control: public, max-age=3600`.

## 5. Ordem e dependências

1. **#189 e #190** (leitura) podem fazer-se já, numa sessão APP, sem SQL (só `site_origens` em `definicoes`, que nasce ao guardar). O site de
   ensaio do ChatGPT pode chamá-las a partir de `file://` só se o CORS o permitir: para o ensaio, `definicoes.site_origens` aceita também `null`
   (origem de ficheiro local) **enquanto o site não estiver no ar**; retira-se na fase 4.
2. **#191 e #192** depois do «passa ao Claude»: precisam do `prereserva.php` do site, da chave nos dois lados e do SQL.
3. Qualquer mudança a este contrato é uma versão nova deste ficheiro (v1.1, v1.2…) e, se mudar uma regra do acordo, uma versão do acordo.
