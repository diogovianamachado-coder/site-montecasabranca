# Fotografias da galeria · `design/fotos/galeria/`

**O que é.** Os cinco álbuns da galeria do Monte no Zenfolio (`montecasabranca.zenfoliosite.com`), em tamanho web, pela ordem de cada
álbum. A fonte é a coleção `zenfolio/v2/` do Dropbox (`13. APP Gestão AL/site/zenfolio/v2/`), que o ChatGPT reconstruiu a 25/10/2026 a
partir dos originais de `7. Fotos/`. **Desde 12/11/2026 a coleção está completa no repositório: 112 fotografias de 112.**

Escrito pelo Claude a 12/11/2026, a pedido do Diogo («trazer do Dropbox as fotos que faltam, que o GPT ainda não trouxe, para o
repositório GitHub na ordem que estava programada»). A pasta `design/` é do ChatGPT pelo acordo; esta nota e os álbuns 03 a 05 são a
exceção pedida pelo Diogo.

## 1. Os álbuns

| Pasta | Álbum | Fotografias | Quem trouxe | Quando |
|---|---|---:|---|---|
| `01-o-monte/` | O Monte (exteriores e áreas comuns) | 47 | ChatGPT (commit `0820f8a`) | 7/11/2026 |
| `02-os-quartos/` | Os Quartos | 12 | ChatGPT (commit `79c2c07`) | 7/11/2026 |
| `03-a-quinta/` | A Quinta | 17 | Claude, pelo workflow (corridas n.º 1 a 3) | 12/11/2026 |
| `04-antes-e-depois/` | Antes e Depois (11 pares) | 22 | Claude, pelo workflow (corridas n.º 4 a 6 e 9) | 12/11/2026 |
| `05-montemor-o-novo/` | Montemor-o-Novo | 14 | Claude, pelo workflow (corridas n.º 7 e 8) | 12/11/2026 |
| | **Total** | **112** | | |

Vê-se tudo de uma vez nas folhas de contacto: `docs/fotografia/2026-11-12_folhas_de_contacto/` (uma imagem por álbum, com o nome e as
dimensões por baixo de cada fotografia).

## 2. Convenção (a mesma nos cinco álbuns)

- **Nome:** número de ordem no álbum + nome original, em minúsculas, só `a-z 0-9 _ -`, extensão `.jpg` (ex.: `05_35.jpg`,
  `12_img_5927.jpg`). No «Antes e Depois»: `adNN_<espaço>_antes.jpg` e `adNN_<espaço>_depois.jpg`.
- **Tamanho:** 1 600 px no lado maior. **Nunca se aumenta:** quatro originais são mais pequenos e ficaram como eram
  (`03-a-quinta/02_pkbl4474.jpg` e `04_pdhe2533.jpg`, 1 440 × 1 080; `04-antes-e-depois/ad02_salao_depois.jpg`, 1 440 × 1 081;
  `ad03_fachada_depois.jpg`, 1 440 × 1 085).
- **Ficheiro:** JPEG de qualidade 82, progressivo, **sem metadados** (sem EXIF, sem localização GPS); fica só o perfil de cor.
- **Os originais não se tocam:** continuam no Dropbox, em `7. Fotos/` e em `zenfolio/v2/`. Aqui estão só cópias para a web.
- **Isto não é a alta resolução.** Dos 53 originais dos álbuns 03 a 05 (175 MB; aqui 20 MB): 20 têm 4 032 a 5 184 px no lado maior
  (telemóvel e Canon) e 11 têm cerca de 2 000 px, todos reduzidos a 1 600; **22 já estão no Dropbox a 1 600 px ou menos** (as 14 de
  Montemor-o-Novo, que são as versões preparadas para os anúncios, e 8 das outras) e ficaram com as mesmas dimensões, só recomprimidas.
  As dimensões de origem de cada uma estão nos registos das corridas do workflow.

## 3. De onde veio cada fotografia dos álbuns 03 a 05

Está linha a linha nos lotes `demo/ferramentas/fotos/lotes/<álbum>.tsv`: posição no álbum, nome na coleção v2, bytes do original, nome
no repositório e pasta do original em `7. Fotos/`. Em resumo:

| Álbum | Origem em `7. Fotos/` |
|---|---|
| A Quinta | `4. telemovel/` (8) · `5. dvm canon/` (6) · `3. anuncios/V2_verão/` (3: `35`, `36.0`, `36.1`) |
| Antes e Depois | `6. Antes e Depois/` (`a1` a `a22`; quatro eram HEIC, convertidos a JPG pelo ChatGPT a 25/10) |
| Montemor-o-Novo | `3. anuncios/V2_verão/` (10: `54` a `63`) · `3. anuncios/V3_inverno/` (4: `42`, `44`, `50`, `54`) |

Cada descarga foi conferida com o tamanho em bytes do original (o workflow recusa um ficheiro de tamanho diferente).

## 4. Os 11 pares do «Antes e Depois»

`ad01` a casa e a piscina · `ad02` o salão (o antigo casão) · `ad03` a fachada da casa principal · `ad04` a chaminé ·
`ad05` o pátio envidraçado · `ad06` o corredor · `ad07` a pérgula e o tanque · `ad08` um quarto · `ad09` o poço (frente) ·
`ad10` o poço (lado) · `ad11` a nora do poço.

Vistos por olho a 12/11/2026 (Claude): os 22 ficheiros estão nos pares e nos lados certos. A identificação ficheiro a ficheiro é do
ChatGPT (25/10) e está em `docs/integracao-app/2026-10-25_zenfolio_e_pares_antes_depois.md`. Os ângulos de cada par não são iguais:
mostram-se lado a lado, não com cursor sobreposto.

## 5. Privacidade (visto fotografia a fotografia)

- **Matrícula desfocada:** em `04-antes-e-depois/ad03_fachada_antes.jpg` há uma carrinha branca cuja matrícula se lia. Na cópia web a
  matrícula está desfocada (6.ª coluna do lote; é o workflow que o faz, logo repete-se se a fotografia for trazida outra vez). O original
  no Dropbox fica como estava. A primeira cópia, ainda com a matrícula, esteve no repositório doze minutos (commit `e1a9d6a`,
  23h03 a 23h16 UTC de 12/11) e continua no histórico do git.
- **Pessoas:** `ad11_nora_antes.jpg` (um homem de costas, ao lado da nora) · `05-montemor-o-novo/01_54.jpg` (uma senhora de costas,
  sentada num banco) · `05_57.jpg` (uma pessoa num baloiço, ao longe, de costas). Nenhuma mostra a cara. Publicá-las no site é decisão
  do Diogo.
- Não vi mais matrículas, caras, documentos nem ecrãs legíveis nas 53 dos álbuns 03 a 05 (todas vistas em folha de contacto; em
  tamanho inteiro as que têm pessoas, veículos ou a casa ao longe).

## 6. Autoria e créditos (por fechar em `docs/fotografia/creditos.md`)

O ficheiro de créditos tem linhas para a reportagem do Rodrigo (`2. rodrigo/`, 499) e para o «Antes e Depois» (25). **Não tem linhas
para `3. anuncios/`, `4. telemovel/` nem `5. dvm canon/`**, de onde vêm os álbuns 03 e 05:

- `4. telemovel/` e `5. dvm canon/` (14 do álbum A Quinta): pelo nome das pastas são do Diogo; a confirmar por ele.
- `3. anuncios/` (3 do álbum A Quinta e as 14 de Montemor-o-Novo): é a série usada nos anúncios das plataformas. As de Montemor são
  claramente de uma máquina fotográfica e de uma só mão (a mesma bicicleta vermelha aparece em quatro). **O autor e a autorização para
  uso no site próprio têm de ser escritos pelo Diogo** antes de irem para o domínio público. Na pasta `7. Fotos/` há um orçamento de
  fotografia de junho de 2022, que é onde isso deve estar dito.

## 7. O que falta face ao Zenfolio

A coleção v2 tem 112 fotografias; a galeria do Zenfolio mostra cerca de 20 a mais, cujo original o ChatGPT não localizou no Dropbox
(nota dele de 25/10/2026; a pasta `2. rodrigo/` não lhe estava acessível). Pelas capturas do Zenfolio de 25/10:

- **A Quinta (7 ou 8):** o alpendre com o sofá de exterior ao entardecer (três) · a casa e a piscina vistas do campo (uma segunda) · o
  pôr do sol atrás dos pinheiros, com a casa · a piscina iluminada à noite · a piscina com as oliveiras · a lua e a casa iluminada.
  Algumas podem ser as mesmas que já estão em `01-o-monte/` (o Zenfolio deixa repetir uma fotografia em dois álbuns).
- **Montemor-o-Novo (cerca de 13):** a estação do Paião sem a bicicleta · a ecopista (ponte, passadiço, túnel de sobreiros sem a
  bicicleta) · vacas no montado · a torre e a muralha do castelo · o interior da igreja · vistas da vila e do castelo ao longe (várias) ·
  o miradouro com o banco (duas ou três).

Para as trazer é preciso primeiro encontrar os originais: nas subpastas `2. rodrigo/1` a `5` e `HD` (cerca de 500 imagens) ou em
`1. todas/`. Ninguém as procurou lá ainda.

## 8. Como se traz uma fotografia nova (ou se repete uma)

1. Acrescentar a linha ao lote do álbum em `demo/ferramentas/fotos/lotes/` (ou criar um lote novo, com o mesmo cabeçalho).
2. O Claude pede ao conector do Dropbox uma ligação temporária por fotografia (uso único, 15 minutos) e lança o workflow
   «Fotografias do Dropbox» (`.github/workflows/fotos-dropbox.yml`) com o álbum, as posições e as ligações.
3. O workflow descarrega, confere os bytes, endireita, aplica os retoques de privacidade do lote, reduz, tira os metadados e grava
   aqui com um commit. As ligações nunca ficam escritas no registo.
4. Folha de contacto: `python3 demo/ferramentas/fotos/folha_contacto.py <álbum> <saída.jpg>` (`--pares` no «Antes e Depois»).

A sessão do Claude não consegue descarregar do Dropbox diretamente (a rede dela não deixa); os computadores do GitHub conseguem. É por
isso que a via é esta.

## 9. No site (`site/fotos/`)

Desde 12/11/2026 os cinco álbuns estão montados no site em PHP (em `main`; no servidor só depois do «Lança» do Diogo):

| Álbum da galeria | No site | Separador do site |
|---|---|---|
| `01-o-monte/` e `02-os-quartos/` | `site/fotos/exterior/`, `interior/`, `quartos/` (montadas com o site, a 7/11) | Monte e exterior · Sala, cozinha e biblioteca · Quartos e banho |
| `03-a-quinta/` | `site/fotos/quinta/` (16 ficheiros; a 7.ª do álbum é `exterior/campo-verde.jpg`, que o site já tinha) | A quinta · 17 |
| `04-antes-e-depois/` | `site/fotos/antes-depois/` (22) | Antes e depois · 22, os 11 pares lado a lado com a etiqueta «Antes» ou «Depois» |
| `05-montemor-o-novo/` | `site/fotos/montemor/` (14) | Montemor-o-Novo · 14 |

Que ficheiro da galeria é cada ficheiro do site está em `demo/ferramentas/fotos/site-albuns.tsv`; `python3 demo/ferramentas/fotos/para_o_site.py`
copia-os tal e qual e cria ao lado a variante de telemóvel (`-m`, 1 000 px de largura). As legendas escrevem-se em `site/conteudo.php`.
