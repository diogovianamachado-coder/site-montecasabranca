# Site Monte Casa Branca · PHP para a Amen

Página única em PHP + CSS + JavaScript nativo (sem Node, sem build, sem base de dados). Sobe para a Amen por FTP tal como está.

## O que é cada coisa

| Caminho | Quem mexe | O que é |
|---|---|---|
| `conteudo.php` | Diogo / Claude | **Todos os textos** do site: título, menus, a capa, o cartaz e os três capítulos da casa, o fecho, Montemor-o-Novo, a Nacional 2, «Onde estamos», a galeria, «Antes de chegar», as frases de quem já ficou, contactos e os textos do painel das datas. Sem código — só um array PHP com strings. |
| `fotos/<álbum>/` | Diogo / Claude | As fotografias, por pasta (`exterior`, `interior`, `quartos`, `quinta`, `montemor`). Para cada `x.jpg` pode existir `x-m.jpg` (versão telemóvel, 1 000 px de largura); o site usa-a sozinho se existir. As de `quinta` e `montemor` vêm da galeria `design/fotos/galeria/` pela tabela `demo/ferramentas/fotos/site-albuns.tsv` (`python3 demo/ferramentas/fotos/para_o_site.py`); a mesma tabela diz, em comentário, que ficheiro da galeria é cada fotografia de `exterior`, `interior` e `quartos`. O «antes e depois» saiu do site a 15/11/2026 (as fotografias continuam na galeria). |
| `inc/factos.php` | só com FACTOS.md | Os factos da casa (capacidade, AL, morada, contactos, coordenadas, hora da saída tardia, as notas nas plataformas) e as ligações para fora (plataformas, mapa, Visit Montemor, ecopista, Rota da N2). Espelha `docs/conteudos/fontes/FACTOS.md` do repositório — mudar só quando o FACTOS mudar. |
| `inc/tarifas.php` | Diogo | Tabela de épocas e regras (porta de `lovable/src/lib/tarifas.ts`). Só serve de **recurso** quando a app não responde; a conta oficial vem da app. |
| `versao.json` | Claude | O número e a data da versão que está nesta pasta (V1, V2…). Aparece em letra pequena no fundo da página **só no ensaio** («Ensaio · versão 2 · 15/11/2026»). Sobe a cada publicação; a ficha de cada versão está em `docs/versoes/REGISTO.md` e o deploy pára se faltar. |
| `config.php` | Diogo (no servidor) | Endereços da app, chave `SITE_CHAVE`, pasta de cache. **Não vai para o GitHub.** Copiar de `config.exemplo.php`. |
| `index.php`, `partes/`, `inc/util.php`, `assets/` | código | Estrutura, estilos (`assets/css/site.css`) e interacção (`assets/js/site.js`). |
| `api/` | código | As portas do site para a app: `ocupacao.php` (#189), `tarifa.php` (#190), `prereserva.php` (#191, com a chave), `avaliacoes.php` (#192) e `tempo.php` (Open-Meteo: a previsão dos próximos 16 dias e, com `?de=…&ate=…`, o tempo de uma estadia — previsão para os dias que ela alcança, média dos últimos cinco anos para os outros). |
| `cache/` | criada pelo PHP | Ocupação (5 min), tempo (1 h), médias do tempo por dia do ano (`clima.json`, 30 dias), avaliações (1 h) e `pedidos.log` quando a app não está contactável. Tem de ser gravável. |

## Editar conteúdo (sem tocar em código)

1. Textos: abrir `conteudo.php`, mudar a string, guardar. Aspas simples dentro do texto escrevem-se `\'`.
2. «Antes de chegar»: cada pergunta é `['Pergunta?', 'Resposta.']` em `'perguntas'`. Acrescentar ou apagar linhas. `{saida_tardia}` é trocado pela hora de `inc/factos.php`.
3. Fotografias: copiar o ficheiro para `fotos/<álbum>/` e acrescentar `['src' => 'album/ficheiro.jpg', 'alt' => 'descrição']` no álbum em `'galeria' → 'albuns'`. Pode levar `'pos' => '50% 30%'` (ponto de foco) e `'pos_m'` (o mesmo, só no telemóvel).
   - **A capa**: `'inicio' → 'capa'` diz qual das opções de `'capas'` fica. Hoje há uma só, a 1, escolhida pelo Diogo a 15/11/2026 para o computador e para o telemóvel. Para estudar outras, juntam-se opções a `'capas'`: no ensaio (`novo.montecasabranca.pt`), `?capa=N` no fim do endereço mostra cada uma, com botões para trocar; fora do ensaio o parâmetro é ignorado.
   - **Os três capítulos da casa** (`'momentos'`: por fora, sem pressa, por dentro) e **Montemor** (`'montemor' → 'fotos'`): as fotografias **deslizam sozinhas, devagar e sem parar**, pela ordem da lista, e dão a volta (depois da última vem outra vez a primeira); `'legenda'` é a descrição curta de cada uma: desde a versão 5 (19/11/2026) já não se escreve sobre a fotografia («retirar as micro legendas das fotos»), fica no rótulo do botão e por baixo da fotografia aberta em grande. Em cada capítulo, `'palavra'` é o título grande («Por fora», «Sem pressa», «Por dentro»), `'frase'` a linha a cor e `'texto'` o parágrafo.
   - **O fecho** (`'regua'`): a fila de fotografias mais pequenas. A ordem da lista não conta: a fila sai **numa ordem diferente em cada visita** e desliza sozinha, devagar e sem parar (nota 8 do Diogo, 15/11/2026: «a rolar random»). Todas as fotografias da faixa têm o mesmo tamanho (Diogo, 17/11/2026): uma que esteja ao alto é recortada na caixa, e `'pos' => '50% 56%'` diz que parte fica à vista (horizontal e vertical; por omissão o centro). Sem casas de banho (só na galeria).
   - **O movimento (versão 4, 17/11/2026):** é uma animação que o browser corre sozinho: a da folha de estilos (`@keyframes rolar`, em `assets/css/site.css`), que anda sem JavaScript, ou uma igual criada pelo `assets/js/site.js`, que o dedo e o rato conseguem parar e levar. A velocidade escreve-se em `inc/util.php` → `rolo()`: segundos por fotografia, no telemóvel e no computador (mais segundos = mais devagar). O dedo ou o rato param, levam e largam as fotografias; um toque abre-as em grande. Com «reduzir movimento» ligado no aparelho continuam a andar, mais devagar.
   - **As fotografias grandes (versão 6):** cada capítulo da casa e Montemor abrem com uma fotografia grande, de lado a lado, com a palavra por cima: em `conteudo.php`, `momentos[…]['banda']` e `montemor['banda']` (trocar a fotografia é trocar o `src`; `pos_m` diz que parte se vê no telemóvel). Passa devagar ao rolar (`assets/js/site.js` → «Fotografias que passam devagar»).
   - **A ecopista (versão 6):** a régua pequena usa `montemor['ecopista']['fotos']`; para juntar fotografias, acrescentar linhas aí (a régua repete-as na faixa enquanto forem poucas).
   - **A galeria (versão 6):** na página aparecem as primeiras seis de cada álbum (`galeria['curta']`); «Ver todas as fotografias» abre o álbum inteiro por cima.
   - **A pílula de descer (versão 6, 19/11/2026):** o rato com um ponto a descer, em `partes/inicio.php`. Na capa fica ao centro, por baixo do botão; depois da capa sobe e flutua por cima da barra de baixo; apaga-se quando tem texto por baixo; cada toque leva à secção seguinte e, no fim, ao topo. A altura a que flutua escreve-se em `assets/css/site.css` → «A pílula de descer» (`.pilula.flutua.alto`, quanto sobe); o que faz, em `assets/js/site.js` → «A pílula de descer».
   - Nas faixas de fotografias **não há contagens** («01 / 04»), nem setas, nem rótulos a dizer que há mais fotografias: vê-se a seguinte a chegar.
   - **A Nacional 2** (`'n2' → 'foto'`): uma só fotografia, com `'legenda'` (desde a versão 5 não se mostra por baixo; fica como descrição).
   - Uma fotografia de destaque (capítulos, fecho, Montemor, Nacional 2) não se repete noutro sítio de destaque; na galeria pode estar.
   - `'sem_schema' => true` deixa um álbum fora das imagens da casa que os motores de busca recebem (o de Montemor-o-Novo).
   - Conferir: `php demo/ferramentas/site/conferir-fotos.php` (todas as fotografias referidas existem e têm a versão de telemóvel, nenhuma repetida no mesmo conjunto nem em dois sítios de destaque, todas com descrição e, nas sequências, com legenda).
4. Quem já ficou: cada frase é `['frase', 'plataforma', 'mês e ano', true se for tradução]` em `'avaliacoes' → 'citacoes'`. Curtas, sem nomes.
   As três notas (Booking, Airbnb, Google) estão em `inc/factos.php` → `'notas'`: o número, a escala e o mês em que foram lidas.
   Quando uma mudar, muda-se aí o número e a data. Só as notas: sem ligações para as plataformas e sem o número de avaliações.
   Não vão para os dados estruturados.
5. Regras: factos só de `FACTOS.md`; «Reguengo» só na morada postal; nada de tabelas de preços ou KPI no site; tom do Diogo (frases curtas, na segunda pessoa do plural).

## Pôr no servidor (Amen)

1. Primeiro em **ensaio**: `novo.montecasabranca.pt` → apontar o subdomínio para uma pasta e enviar tudo por FTP (incluindo `.htaccess`).
2. No servidor, copiar `config.exemplo.php` para `config.php` e preencher `SITE_URL`, `APP_URL`, `SITE_CHAVE` (a mesma que está na app). Para ensaio sem app: `OCUPACAO_EXEMPLO => true`.
3. Garantir que o PHP pode escrever em `cache/` (criar a pasta e dar permissão 775 se a Amen não deixar criar).
4. Verificar: a página abre; `api/tempo.php` devolve JSON; `api/tarifa.php?entrada=2026-05-02&saida=2026-05-05&pax=4` devolve uma conta; `api/ocupacao.php` devolve `ok:true`.
5. Só depois do «Lança» do Diogo: o mesmo conteúdo para a raiz de `montecasabranca.pt`, com `SITE_URL` e `sitemap.xml` a apontar para a raiz.

Requisitos: PHP 8.1 ou superior (usa `match`, `never`, `fn`), extensão cURL ou `allow_url_fopen` activo (para falar com a app e com o Open-Meteo).

## Segurança

- A `SITE_CHAVE` nunca sai do servidor; o browser só fala com `api/prereserva.php` no mesmo domínio.
- `.htaccess` nega o acesso directo a `config.php`, `conteudo.php`, `inc/`, `partes/`, `cache/`.
- O pedido de datas tem campo armadilha (`armadilha`) e tempo de preenchimento; a app aplica os limites por IP.
- O site não acede à base de dados da app nem guarda dados pessoais além de `cache/pedidos.log` (só quando a app está em baixo; apagar depois de tratar).
