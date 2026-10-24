# Monte Casa Branca · design das sete páginas · V1 · 24/10/2026

Entrega de design HTML/CSS para apreciação do Diogo e montagem pelo Claude, a partir da prancha editorial aprovada. Não declara aprovação das páginas nem dos textos.

## Abrir
Abrir `index.html`, mantendo esta árvore de ficheiros. Páginas autónomas, sem framework ou build; só Google Fonts como recurso externo. A apresentação `Monte-Casa-Branca-Design-V1.html`, entregue separadamente, reúne as mesmas páginas, fotografias e o kit num único ficheiro com vistas de 390/1280 px.

## Páginas entregues
- `index.html`: capa com piscina real, composição R1, entradas na casa/galeria, tempo, simulador e localização.
- `a-casa.html`: espaços, quartos, factos confirmados, exterior e chegada/saída.
- `fotografias.html`: seleção real R1 organizada por zonas, filtros e ampliação acessível, navegação dentro da zona.
- `precos.html`: mapa de épocas 2027, calendário, simulação, resumo e pedido.
- `localizacao.html`: fotografia, ligação direta ao mapa, distâncias e chegada.
- `perguntas.html`: grupos de perguntas, acordeões e ligações contextuais.
- `contactos.html`: contacto com o Diogo, pedido e ligação à localização.

## Sistema visual
Playfair Display 400/500 e Source Sans 3 400/500/600; Georgia/Arial como alternativas. Cal #F7F4ED, terracota #A75532, terra #D1B69E, areia #E6D6C4, oliveira #555A48, cinza #9D9186, texto #49362E. Margens mobile 25 px; grelhas editoriais e cabeçalho em linha no PC; coluna, menu e CTAs empilhados no mobile. Referência: 390/1280 px. O PNG da prancha permanece intacto.

As cinco fotografias escolhidas no R1 mantêm-se, em 1600 px. O logótipo usado é o ativo oficial já existente `public/marca/logo.png`, sem redesenho; a aplicação é mostrada para apreciação. `imagens.json` contém origens e estados de autorização. Não se inferem licenças públicas da aprovação privada do design.

## Widgets
Os encaixes `data-base="tempo"`, `calendario`, `simulador` e `pedido` usam a marcação/classe `b-` do contrato. O CSS veste o kit; `apresentacao.js` trata só de menu, galeria e abertura visual do pedido. Não há motores novos de preços, meteorologia, calendário ou reservas.

Os HTML têm exemplos estáticos completos. Ao montar, o kit substitui-os pelos componentes. Calendário e meteorologia estão assinalados como exemplos. O preço ilustrativo 14–17/mai/2027 corresponde a 3 × 330 € + 180 € = 1170 €, com os valores públicos do FACTOS. O pedido não envia dados neste estudo. Os estados de resultado, erro, pedido e falta de dados têm estilos próprios.

Não foram acrescentados testemunhos, médias ou KPI. O antes/depois aguarda pares históricos confirmados. A galeria mostra a seleção R1, não todo o arquivo. O mapa usa a ligação externa prevista no contrato.

## QA e compatibilidade
Foram verificados os sete documentos, ligações locais, imagens, h1 único, IDs e JavaScript. No navegador, as sete páginas foram exercitadas nas vistas 390/1280: sem overflow horizontal ou imagens quebradas.

**Inconsistência no teste existente:** `demo/base/CONTRATO.md` pede `design/site/imagens.json`, mas `demo/ferramentas/demo.py` inclui esse nome em RESERVADOS e recusa-o tanto em `testar --design` como em `montar`. O teste original devolve uma falha exclusivamente por esse motivo. No ensaio local retirou-se apenas esse nome do conjunto, em memória, sem editar o ficheiro do Claude: as sete páginas passam e montam com o kit. Há um patch de uma linha no handoff para o Claude rever/aplicar. Não afirmar que o workflow original está verde antes desse acerto.

## Para o Claude
1. Ler o handoff `docs/design/2026-10-24_entrega_design_v1.md` e resolver o conflito do manifesto na ferramenta que mantém.
2. Montar os ficheiros como nova revisão de rascunho, com o procedimento e a ligação privada habituais; este commit não é ordem de publicação no domínio.
3. Preservar o CSS e a composição; avisar de incompatibilidades concretas antes de reinterpretar o desenho.
4. A apreciação do Diogo às páginas e o texto final vêm a seguir.
