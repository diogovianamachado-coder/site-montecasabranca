# Contrato da demo técnica · onde o ChatGPT entrega o design do site e como ele passa a ser real

**Para quem:** o ChatGPT (design em HTML + CSS, acordo v1.2) e o Diogo (decide por olho). **Quem mantém isto:** o Claude (código da demo).
**Data:** 21/10/2026 · **v1.1 em 25/10/2026** (só uma correção: `imagens.json` deixa de constar dos nomes reservados; era um engano do
`demo.py`, apontado pelo ChatGPT no handoff V1 de 24/10). Qualquer mudança a este contrato é uma versão nova deste ficheiro, anunciada em
`docs/integracao-app/RECADOS_PARA_O_CHATGPT.md`.

A ideia do Diogo (21/10): a cada avanço do design ele decide **a olhar para o que será real**, no telemóvel e em desktop, em vez de assumir
como ficará. Por isso o design entra numa base técnica que já tem a funcionar o que o site vai ter de verdade (tempo, calendário de
ocupação, simulador de preço, pedido de datas, ligações), com dados de exemplo **na forma exata das portas da app**. Quando as portas
existirem, troca-se um endereço e a demo passa a falar com a app. O ChatGPT trabalha dentro desta base sem a partir; o Claude monitoriza
e implementa; o Diogo vê cada revisão numa ligação privada.

## 1. Onde pões os ficheiros

Tudo em **`design/site/`** (pasta tua, pelo acordo). Nada fora dela é necessário.

| Ficheiro | O que é |
|---|---|
| `index.html` | A página de entrada. **Obrigatória com este nome.** |
| `a-casa.html`, `fotografias.html`, `precos.html`, `localizacao.html`, `perguntas.html`, `contactos.html` | As subpáginas. Os nomes são sugestão: só minúsculas, dígitos e hífen, extensão `.html`. Podem ser menos ou mais páginas. |
| `estilos-site.css` (ou outro nome que **não** seja `estilos.css`) | O teu CSS. Uma folha para o site inteiro, ou uma por página; tu decides. |
| `imagens/` | As fotografias e o logótipo, em tamanho web (lado maior 1 600 px, JPG 80–85). Só imagens reais do Monte com origem conhecida. |
| `imagens.json` | A origem de cada imagem: `{"piscina-dia.jpg": {"original": "<nome no Dropbox/Zenfolio/Canva>", "autor": "…"}}`. Serve para o `creditos.md` e para o teste. |
| `fontes/` (opcional) | Ficheiros de fonte, se não usares Google Fonts. |
| o teu JS (opcional) | Só para interação de apresentação (menus, galerias, painéis). **Não** para tempo, preços, calendário ou pedidos: isso é do kit (secção 3). Não copies o `interacao.js` das propostas rejeitadas. |

**Nomes reservados à demo** (o `montar` recusa se os usares): `revisao.html`, `revisoes.html`, `componentes.html`, `desktop.html`,
`estilos.css`, `demo.js`, `versao.js` e a pasta `base/`. O teu `imagens.json` (secção 1) **não** é reservado: o `montar` lê-o e não o
copia (a demo tem o seu, `demo/imagens.json`); até 25/10 o `demo.py` recusava-o por engano (v1.1). Se quiseres ver os componentes a funcionar na tua
página antes de a entregares, copia a pasta `demo/site/base/` para `design/site/base/` e junta às tuas páginas as linhas da secção 3.0; a
pasta `base/` dentro de `design/site/` é ignorada pelo `montar` e não deve ir no commit.

## 2. Regras de cada página (o teste `demo.py testar --design` verifica isto)

1. `<!doctype html>`, `<html lang="pt-PT">`, `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`,
   um `<title>`, **um só `<h1>`**, ids únicos, `</head>` e `</body>` explícitos (é aí que a demo injeta o kit).
2. Abre do ficheiro, sem build, sem framework. **Serviço externo só o Google Fonts.** Ligações entre páginas relativas (`a-casa.html`,
   `precos.html#simulador`); imagens por caminho relativo (`imagens/piscina-dia.jpg`). O teste falha com ligação ou imagem inexistente.
3. **Factos só do `FACTOS.md` com ✓**; o resto marcado `[?]` no texto (o teste avisa). Dois casos fazem o teste **falhar**: o telefone errado
   («962 800 626»; o certo é **+351 962 802 626**) e qualquer área do terreno em hectares (3,2 / 3,6 não está decidido).
4. Textos em PT; o EN entra na publicação, pelo Claude. Sem «lorem ipsum».
5. Telemóvel (390 px) e desktop (1 280 px) desenhados; sem rolagem horizontal (as capturas falham se houver).
6. **Nada de widgets próprios** para tempo, calendário, preço ou pedido: usas os encaixes do kit (secção 3) e desenhas o que eles produzem.

## 3. Os encaixes (`data-base`): o que escreves e o que o kit produz

Um encaixe é um elemento teu com `data-base="…"`. **Dentro dele escreves um exemplo estático**, desenhado por ti, com a mesma estrutura
de classes que o kit produz: assim a tua página abre do ficheiro inteira (conformidade), e na demo o kit substitui o exemplo pelo
componente a funcionar, com as tuas classes a vestir. Classes do kit começam por `b-`; estilizas à vontade no teu CSS. O CSS do kit
(`base/base.css`) é só estrutural (grelhas, estados), sem cores nem tipos.

### 3.0 O que a demo injeta (não precisas de escrever; se copiares `base/` para pré-visualizar, são estas linhas)

```html
<link rel="stylesheet" href="base/base.css">                          <!-- no fim do <head> -->
<script src="base/dados.js"></script><script src="base/base.js" defer></script>   <!-- no fim do <body> -->
```

### 3.1 Tempo em Montemor-o-Novo · `data-base="tempo"`

```html
<aside class="tempo" data-base="tempo" data-dias="7" data-titulo="Os próximos dias no Monte">
  <p class="b-tempo-titulo">Os próximos dias no Monte</p>
  <ul class="b-tempo-dias">
    <li class="b-tempo-dia"><span class="b-tempo-nome">sex 24</span><span class="b-tempo-icone b-tempo-c-sol">☀</span><span class="b-tempo-max">22°</span><span class="b-tempo-min">11°</span><span class="b-tempo-chuva">0 %</span></li>
    <!-- … um por dia; inclui um dia de chuva (b-tempo-c-chuva) para desenhares esse estado -->
  </ul>
  <p class="b-fonte">Dados: Open-Meteo</p>
</aside>
```
- Produz: `.b-tempo-titulo` (se houver `data-titulo`) · `ul.b-tempo-dias > li.b-tempo-dia` com `.b-tempo-nome`, `.b-tempo-icone.b-tempo-c-{sol|pouco-nublado|nublado|nevoeiro|chuvisco|chuva|aguaceiros|neve|trovoada}`, `.b-tempo-max`, `.b-tempo-min`, `.b-tempo-chuva` · `.b-fonte` com «Dados: Open-Meteo» (obrigatória: licença da fonte; o teste exige-a no teu exemplo).
- Estados: com dados · **sem dados: o encaixe desaparece** (`hidden`), por isso a secção à volta tem de ficar inteira sem ele.
- Dados: Open-Meteo ao vivo (só as coordenadas da casa; nenhum dado do visitante). Nas capturas automáticas e sem rede usa a semana de exemplo de `base/dados/tempo-exemplo.json`.

### 3.2 Calendário de ocupação · `data-base="calendario"`

```html
<section id="calendario" data-base="calendario" data-meses="2">
  <!-- exemplo estático: um mês desenhado com as classes abaixo, com dias ocupados riscados e dois dias escolhidos -->
</section>
```
- Produz: `.b-cal-nav` (`button.b-cal-ant`, `button.b-cal-seg`) · `.b-cal-meses > section.b-cal-mes` com `h3.b-cal-titulo`, `.b-cal-semana > .b-cal-dia-semana`, `.b-cal-grelha > button.b-cal-dia` (modificadores `--passado`, `--ocupado`, `--hoje`, `--escolhido`, `--entre`; `.b-cal-vazio` nas casas antes do dia 1) · `p.b-cal-legenda` (`.b-cal-leg--livre/--ocupado/--escolhido`) · `p.b-cal-nota` («datas indicativamente livres») · `p.b-cal-estado` (a frase do que está escolhido).
- Comportamento: toque no dia de entrada, depois no de saída; noites ocupadas não se escolhem nem se atravessam. Escolher datas avisa o simulador (e vice-versa).
- Dados: `base/dados/ocupacao.json`, **ocupação inventada**, com a forma da porta #189 (`site_ocupacao.php`). Em produção: `MCB_BASE_CONFIG.ocupacao = "https://app.montecasabranca.pt/site_ocupacao.php"`.

### 3.3 Simulador «Simule aqui a sua estadia» · `data-base="simulador"`

```html
<section id="simulador" data-base="simulador" data-titulo="Simule aqui a sua estadia">
  <!-- exemplo estático: o formulário (entrada, saída, pessoas, Calcular) e um resultado desenhado com as classes abaixo -->
</section>
```
- Produz: `h3.b-sim-titulo` · `form.b-sim-form` com `label.b-sim-campo > span.b-sim-rotulo + input.b-sim-entrada / input.b-sim-saida / select.b-sim-pax`, `button.b-sim-calcular` · `.b-sim-resultado` (`--ok` ou `--erro`) com `p.b-sim-cabecalho` («14–17/mai/2027 · 3 noites · 6 pessoas · época Maio»), `dl.b-sim-linhas` (`dt/dd` `.b-sim-dormidas`, `.b-sim-limpeza`, `.b-sim-total`), `ul.b-sim-avisos`, `p.b-sim-regras`, `.b-sim-acoes` com `button.b-sim-prereservar` e as ligações `a.b-ligacao--whatsapp` / `a.b-ligacao--email` já com a mensagem pronta, e `.b-sim-tempo` (o tempo por dia da estadia: previsão até 16 dias, depois **média histórica com rótulo próprio**, nunca como previsão) · `p.b-sim-mensagem` quando não é possível (mínimo de noites, verão sábado a sábado, datas no passado, mais de 8 pessoas) · `p.b-fonte`.
- A conta: tarifa privada 2026/2027 do `FACTOS.md` §4, limpeza do ano (170 / 180 €) uma por estadia, mínimo 2 noites, verão (18 jul – 31 ago) 7 noites de sábado a sábado, mensal 4 000 € por 28 noites de novembro a março, saída ao domingo ou sábado com a hora do pôr do sol calculada no browser e o asterisco «a combinar, quando não há entrada nesse dia». É a mesma regra da app; em produção a app confirma o total no pedido.
- `data-entrada` / `data-saida` opcionais preenchem e calculam ao abrir (útil para mostrar o resultado numa prancha).

### 3.4 Pedido de datas · `data-base="pedido"` (S2: formulário + WhatsApp + email)

```html
<section id="pedido" data-base="pedido" data-titulo="Pedir estas datas" data-origem="precos">
  <!-- exemplo estático: nome, email, telemóvel (opcional), as datas escolhidas, perguntas, botão Enviar pedido -->
</section>
```
- Produz: `h3.b-pedido-titulo` · `form.b-pedido-form` com `label.b-pedido-campo` (`input.b-pedido-nome`, `.b-pedido-email`, `.b-pedido-telefone`, `textarea.b-pedido-mensagem`), `p.b-pedido-datas`, `button.b-pedido-enviar` · `.b-pedido-resultado` (`--ok` / `--erro`) com `p.b-pedido-resposta`, `.b-pedido-acoes` (WhatsApp e email com a mensagem pronta) e, na demo, `details.b-pedido-json` com o que a produção enviaria à app (contrato #191) · `p.b-fonte`.
- Na demo **nada é enviado nem gravado**; o botão «Pré-reservar» do simulador abre este encaixe com as datas. Em produção o pedido vai para `public/prereserva.php` do site, que fala com a app servidor a servidor e cria a pré-reserva «Por confirmar» (o Diogo recebe um push). Podes pôr o encaixe dentro de um `<dialog>` ou em linha; se a página não tiver `pedido`, as ligações WhatsApp/email do simulador chegam.
- **Sem datas escolhidas** (uma página de contactos sem simulador, por exemplo) o encaixe aceita o formulário como **mensagem simples**: responde «Mensagem preparada…» com as ligações WhatsApp/email já com o texto, sem JSON do #191 (uma pré-reserva exige entrada e saída). O `p.b-pedido-datas` diz então «Sem datas escolhidas: se já as tiverem, indiquem-nas na mensagem.» (v1.1, 25/10).

### 3.5 Antes e depois · `data-base="antes-depois"`

```html
<figure class="antes-depois" data-base="antes-depois" data-antes="imagens/antes-casao.jpg" data-depois="imagens/depois-casao.jpg" data-legenda-antes="2021" data-legenda-depois="Hoje"></figure>
```
- Produz: `img.b-ad-antes-img`, `.b-ad-depois > img.b-ad-depois-img`, `span.b-ad-rotulo--antes/--depois`, `input[type=range].b-ad-cursor`. Sem as duas imagens o encaixe desaparece. As imagens seguem as regras de origem da secção 1.

### 3.6 Ligações fixas (sem encaixe; escreves tu, com estes valores)

WhatsApp `https://wa.me/351962802626` · email `geral@montecasabranca.pt` · Instagram `https://www.instagram.com/monte_casa_branca/` ·
mapa `https://www.google.com/maps?q=38.6142917,-8.211253` (ligação, não mapa embutido: mapas embutidos são serviço externo) · telefone a
mostrar «+351 962 802 626». Estão em `base/dados/factos.json` (só ✓ do `FACTOS.md`).

## 4. O que acontece depois da tua entrega

1. Fazes commit em `design/site/` (`SITE · design · …`). O workflow «Capturas» corre sozinho `demo.py testar --design` sobre as tuas páginas e
   captura-as a 390 e 1 280 px (artefacto «ensaio-design»): vês logo se algo quebra o contrato, sem esperar por ninguém.
2. O Claude corre `demo.py montar --rev rN --titulo "…"` (`--limpar` na primeira vez, para tirar a D03): copia as tuas páginas para
   `demo/site/`, injeta o kit, regista a revisão (rascunho) em `versao.json` e `REGISTO.md`, corre `testar`, faz as capturas para
   `demo/capturas/rN/` e publica: a **ligação principal** (sempre a revisão mais recente) e a **ligação fixa** da revisão.
3. O Diogo abre no iPhone (direto) e em desktop (a mesma ligação em Safari num computador, ou `desktop.html` na demo, que mostra qualquer
   página a 390 / 768 / 1 024 / 1 280 px). Decide por olho; o «sim» escrito vai para `docs/decisoes/aprovadas.md` com data e âmbito.
4. Correção = commit novo em `design/site/` com o que mudou; o Claude monta a revisão seguinte. Nunca se presume aprovação por silêncio.

## 5. O que não fazer

- Não editar nada em `demo/` (a ferramenta reescreve `demo/site/` a cada montagem). Pedidos e dúvidas: `docs/integracao-app/RECADOS_PARA_O_CHATGPT.md` é do Claude; tu respondes na tua memória em `docs/decisoes/`.
- Não inventar disponibilidade, preços ou tempo fora dos dados do kit; não mostrar «disponível» como certo (a app é que confirma).
- Não meter dados do visitante em serviços externos; não indexar (a demo é privada e `noindex`).
- Não copiar o `interacao.js` das propostas rejeitadas nem transformar a prancha numa imagem única.

## 6. Para ver o kit a funcionar

`demo/site/componentes.html` (na ligação principal da demo) mostra cada encaixe montado com os dados de exemplo e o CSS estrutural só, sem
desenho: é a referência do que tens para vestir. A ferramenta, para quem a corre: `python3 demo/ferramentas/demo.py` sem argumentos lista os comandos.
