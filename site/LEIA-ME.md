# Site Monte Casa Branca · PHP para a Amen

Página única em PHP + CSS + JavaScript nativo (sem Node, sem build, sem base de dados). Sobe para a Amen por FTP tal como está.

## O que é cada coisa

| Caminho | Quem mexe | O que é |
|---|---|---|
| `conteudo.php` | Diogo / Claude / GPT | **Todos os textos** do site: título, menu, secções, FAQ, legendas, álbuns de fotografias, textos do painel. Sem código — só um array PHP com strings. |
| `fotos/<álbum>/` | Diogo / Claude / GPT | As fotografias, por pasta (`exterior`, `interior`, `quartos`, `quinta`, `antes-depois`, `montemor`). Para cada `x.jpg` pode existir `x-m.jpg` (versão telemóvel, 1 000 px de largura); o site usa-a sozinho se existir. As de `quinta`, `antes-depois` e `montemor` vêm da galeria `design/fotos/galeria/` pela tabela `demo/ferramentas/fotos/site-albuns.tsv` (`python3 demo/ferramentas/fotos/para_o_site.py`). |
| `inc/factos.php` | só com FACTOS.md | Os factos da casa (capacidade, AL, morada, contactos, coordenadas). Espelha `docs/conteudos/fontes/FACTOS.md` do repositório — mudar só quando o FACTOS mudar. |
| `inc/tarifas.php` | Diogo | Tabela de épocas e regras (porta de `lovable/src/lib/tarifas.ts`). Só serve de **recurso** quando a app não responde; a conta oficial vem da app. |
| `config.php` | Diogo (no servidor) | Endereços da app, chave `SITE_CHAVE`, pasta de cache. **Não vai para o GitHub.** Copiar de `config.exemplo.php`. |
| `index.php`, `partes/`, `inc/util.php`, `assets/` | código | Estrutura, estilos (`assets/css/site.css`) e interacção (`assets/js/site.js`). |
| `api/` | código | As portas do site para a app: `ocupacao.php` (#189), `tarifa.php` (#190), `prereserva.php` (#191, com a chave), `avaliacoes.php` (#192) e `tempo.php` (Open-Meteo). |
| `cache/` | criada pelo PHP | Ocupação (5 min), tempo (1 h), avaliações (1 h) e `pedidos.log` quando a app não está contactável. Tem de ser gravável. |

## Editar conteúdo (sem tocar em código)

1. Textos: abrir `conteudo.php`, mudar a string, guardar. Aspas simples dentro do texto escrevem-se `\'`.
2. FAQ: cada pergunta é `['Pergunta?', 'Resposta.']` em `'perguntas'`. Acrescentar ou apagar linhas.
3. Fotografias: copiar o ficheiro para `fotos/<álbum>/` e acrescentar `['src' => 'album/ficheiro.jpg', 'alt' => 'legenda', 'pos' => 'center']` no álbum em `'fotografias' → 'albuns'`. `pos` é o ponto de foco (`center`, `50% 30%`, …). A capa é `'inicio' → 'foto'`.
   Num álbum de pares (`'pares' => true`, como o «Antes e depois») as fotografias vão sempre duas a duas, antes e depois, cada uma com a sua `'etiqueta'`; no computador o álbum mostra dois pares por linha e no telemóvel um. `'sem_schema' => true` deixa o álbum fora das imagens da casa que os motores de busca recebem.
   Conferir: `php demo/ferramentas/site/conferir-fotos.php` (todas as fotografias referidas existem, pares completos, nenhuma repetida no mesmo álbum).
4. Regras: factos só de `FACTOS.md`; «Reguengo» só na morada postal; nada de tabelas de preços ou KPI no site.

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
