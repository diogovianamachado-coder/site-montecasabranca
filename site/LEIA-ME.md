# Site Monte Casa Branca · PHP para a Amen

Página única em PHP + CSS + JavaScript nativo (sem Node, sem build, sem base de dados). Sobe para a Amen por FTP tal como está.

## O que é cada coisa

| Caminho | Quem mexe | O que é |
|---|---|---|
| `conteudo.php` | Diogo / Claude | **Todos os textos** do site: título, menus, a capa (e as opções do estudo da capa), os três momentos da casa, a régua, Montemor e a Nacional 2, a galeria, «Antes de chegar», as frases de quem já ficou, contactos e os textos do painel das datas. Sem código — só um array PHP com strings. |
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
   - **A capa**: `'inicio' → 'capa'` diz qual das opções de `'capas'` fica. No ensaio (`novo.montecasabranca.pt`), `?capa=1`, `?capa=2`, `?capa=3` no fim do endereço mostra cada uma, com três botões para trocar; fora do ensaio o parâmetro é ignorado.
   - **Os três momentos** (`'momentos'`: por fora, sem pressa, por dentro), **a régua** (`'regua'`) e **Montemor** (`'montemor' → 'fotos'`): a primeira fotografia de cada lista é a principal; as outras vêm atrás, a rolar devagar. `'legenda'` é a frase curta que acompanha cada uma. A régua sai por ordem diferente em cada visita.
   - `'sem_schema' => true` deixa um álbum fora das imagens da casa que os motores de busca recebem (o de Montemor-o-Novo).
   - Conferir: `php demo/ferramentas/site/conferir-fotos.php` (todas as fotografias referidas existem, nenhuma repetida no mesmo conjunto, todas com descrição e, nos rolos, com legenda).
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
