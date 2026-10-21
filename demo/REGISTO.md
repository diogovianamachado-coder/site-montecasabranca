# Demo · registo de revisões

Uma linha por revisão da demo. A revisão atual está em `versao.json`; cada uma pode reproduzir-se pelo commit do site indicado (`git checkout <commit>` e `python3 demo/ferramentas/demo.py servir`). Estados: preparação técnica · rascunho · aprovado · rejeitado. **Só o Diogo aprova, por escrito, em `docs/decisoes/aprovadas.md`**; esta tabela regista, não decide.

**Ligação principal (mostra sempre a revisão mais recente):** https://claude.ai/artifact/DdiLqNNHdNeJnF61d4cr3S
**Ligação fixa por revisão (S29):** na coluna respetiva; não muda depois de publicada. **Capturas por revisão (S28):** `demo/capturas/rN/`.

| Revisão | Data | Estado | O que contém | Entrega de design (commit) | Commit do site | Ligação fixa da revisão | Validação |
|---|---|---|---|---|---|---|---|
| r0 | 2026-10-17 | preparação técnica | Página neutra «Demo em preparação» + zona de revisão `revisao.html`; ferramenta `demo.py`; capturas | nenhuma (sem desenho indicado para implementação) | 0b59571 (base) e o commit «SITE · demo · S28–S30» (capturas, ligação fixa, workflow) | https://claude.ai/artifact/Ld3NMAqtE7cyCNxv2Ud7cV | `demo.py testar` OK · capturas 390/1280 sem rolagem horizontal nem erros de consola |
| r1 | 2026-10-17 | **rascunho** | D03 «Casa ao sol», abertura do ChatGPT: fotografia grande, campo terracota «Cada um ao seu ritmo», três espaços, painéis (casa, por aqui, os vossos dias, menu), tempo e datas como exemplo | `design/estudo-d03-2026-10-17/index.html` (e066def) · handoff `docs/design/2026-10-17_d03_casa_ao_sol_handoff.md` | commit «SITE · demo r1 · D03» | https://claude.ai/artifact/MYfKqmUJ3qrXSCgQmupCRP | `testar` OK · capturas 390/1280 + cenários (três espaços, menu, painéis, datas) |

## r0 · 2026-10-17 · preparação técnica

- **Conteúdo:** nenhuma composição implementada. A entrada diz «Demo em preparação»; a zona de revisão mostra revisão, estado, entrega de design, commit e endereço.
- **Commit do site:** 0b59571 (base técnica) e o commit «SITE · demo · S28–S30» (capturas versionadas, ligação fixa, página de revisões, workflow «Capturas»); carimbado em `versao.js` pela ferramenta.
- **Ligação fixa r0:** https://claude.ai/artifact/Ld3NMAqtE7cyCNxv2Ud7cV (privada, claude.ai). Capturas em `demo/capturas/r0/`.
- **Validação:** `python3 demo/ferramentas/demo.py testar` (estrutura HTML, metas, `noindex`, ligações locais, recursos externos, JS) e `node demo/ferramentas/captura.cjs` (Chromium a 390 e 1280 px; sem rolagem horizontal, sem erros de consola, sem pedidos falhados). Capturas em `demo/_saida/capturas/` (não versionadas).
- **Limites:** sem app, sem dados reais, sem fotografias, PT apenas.

## r1 · 2026-10-17 · rascunho · D03 «Casa ao sol»

- **Origem:** entrega do ChatGPT em `design/estudo-d03-2026-10-17/index.html`, commit `e066def141e1046aee20bc71ce04953017a92c3a`,
  handoff `docs/design/2026-10-17_d03_casa_ao_sol_handoff.md`. **Rascunho para apreciação; nenhuma aprovação estética.** Janela/Índice
  continuam insuficientes; A/B/C e retoma-v2 rejeitadas.
- **O que o Claude mudou da entrega (só técnica, para a demo):**
  1. CSS para `site/estilos-d03.css` e JS para `site/d03.js`, sem alterar uma regra ou uma linha de lógica.
  2. As quatro imagens deixaram de ser data URIs dentro do script e passaram a ficheiros individuais em `site/imagens/`
     (`piscina-dia.jpg`, `portas-abertas.jpg`, `alpendre-copos.jpg`, `logo.png`), cópias byte a byte de
     `design/retoma-v2/imagens/` e `public/marca/logo.png` (o teste confirma a igualdade). Cada `<img>` leva `src` direto, por isso
     a página mostra as fotografias mesmo sem JS; o mapa `assets` do script aponta para os mesmos ficheiros.
  3. `<head>` da demo: `viewport-fit=cover`, `noindex, nofollow`, Google Fonts como na entrega, e os scripts `versao.js`/`demo.js`.
  4. Rodapé: à linha «Estudo visual D03 · em apreciação» juntou-se a ligação «demo r1, rascunho» para a zona de revisão.
  5. **Correção técnica provisória** em `site/correcoes-demo.css` (uma regra, `.brand img { height: auto }`): na entrega o logótipo
     900×354 sai esticado na vertical, porque o `<img>` leva `height="354"` fixo e o CSS só limita a largura. Captura antes da
     correção em `demo/capturas/r1/index-telemovel-antes-correcao-logo.png`; recado ao ChatGPT em
     `docs/integracao-app/RECADOS_PARA_O_CHATGPT.md`. A regra sai quando a fonte em `design/` for corrigida.
  Tudo o resto (marcação, textos, cores, fontes, painéis, formulário de datas) é a entrega tal qual.
- **Comportamento esperado:** mobile 390 sem título sobre o telhado, fotografia larga antes do campo terracota, menu «+»; desktop 1280
  com navegação no cabeçalho e «Escolher os dias». Os três botões trocam a fotografia e a legenda. Painéis `<dialog>` com foco e Escape.
  O formulário de datas valida saída posterior à entrada e resume em pt-PT; **sem preço, disponibilidade, pré-reserva ou envio**. O tempo
  é um exemplo visual, assinalado.
- **Interações reais vs apresentação:** reais: troca de espaços, painéis, menu, validação e resumo de datas. Apresentação: valores do tempo,
  «8 pessoas» fixo, ligações «Por aqui»/«Falar com o Diogo» abrem painéis (sem contacto real).
- **Validação:** ver tabela; capturas em `demo/capturas/r1/` (páginas inteiras a 390 e 1280 px e estados: espaço «Por dentro», menu,
  painel «A casa», datas preenchidas). Limitações: Chromium apenas; Safari/iPhone fica para o Diogo pela ligação.
- **Ligações:** principal (mais recente) https://claude.ai/artifact/DdiLqNNHdNeJnF61d4cr3S · fixa r1: https://claude.ai/artifact/MYfKqmUJ3qrXSCgQmupCRP

## Base técnica v2 · 2026-10-21 · sem revisão nova (a r1 mantém-se)

- **Pedido do Diogo (21/10):** uma demo técnica onde o ChatGPT carrega os designs (página principal, subpáginas, ligações, widgets,
  calendário, preços) e cada mudança se vê como será real, no telemóvel e em desktop, para ele decidir sobre o que é real.
- **O que entrou:** `demo/base/CONTRATO.md` (onde o ChatGPT põe os ficheiros: `design/site/`; regras das páginas; os cinco encaixes
  `data-base`) · `demo/base/kit/` (`base.js`: tempo Open-Meteo com semana de exemplo sem rede, calendário de ocupação, simulador com a
  tarifa 2026/2027 e as regras da app, pedido de datas com WhatsApp/email e o JSON do contrato #191, antes/depois, pôr do sol calculado no
  browser; `base.css` só estrutural) · `demo/base/dados/` (ocupação inventada na forma da porta #189, tarifas, médias de clima de exemplo,
  semana de tempo de exemplo, factos ✓) · `demo.py montar` (design/site + kit → demo/site, revisão, registo, imagens), `testar --design`
  (contrato), verificação da base sincronizada, `servir --pasta` · `demo/site/componentes.html` (os encaixes a funcionar, sem desenho) ·
  `demo/site/desktop.html` (qualquer página a 390/768/1024/1280) · workflow «Capturas» também em `design/site/**` com o ensaio das páginas
  do ChatGPT (testar --design, montar --para, capturas).
- **Sem desenho:** nada disto propõe aspeto; o CSS do kit não tem cores nem tipos. A D03 (r1) continua na entrada até à primeira montagem
  do `design/site` do ChatGPT (`montar --limpar --rev r2`).

