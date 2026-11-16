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
| `01-o-monte/` | O Monte (exteriores e áreas comuns) | 49 | ChatGPT (commit `0820f8a`), 47 · Claude, 2 (as duas fachadas) | 7/11 e 16/11/2026 |
| `02-os-quartos/` | Os Quartos | 12 | ChatGPT (commit `79c2c07`) | 7/11/2026 |
| `03-a-quinta/` | A Quinta | 18 | Claude, pelo workflow (corridas n.º 1 a 3; a 18.ª pela n.º 10) | 12/11 e 16/11/2026 |
| `04-antes-e-depois/` | Antes e Depois (11 pares) | 22 | Claude, pelo workflow (corridas n.º 4 a 6 e 9) | 12/11/2026 |
| `05-montemor-o-novo/` | Montemor-o-Novo | 14 | Claude, pelo workflow (corridas n.º 7 e 8) | 12/11/2026 |
| | **Total** | **115** | 112 da coleção v2 e 3 da pasta do verão | |
| `06-verao-por-decidir/` | Pasta do verão · as duas que ficaram de fora (não é um álbum do Zenfolio) | 2 | Claude, pelo workflow (corrida n.º 10) | 15/11/2026 |

**A pasta do verão (15 e 16/11/2026).** Cinco fotografias de `3. anuncios/V2_verão/` não estavam aqui e foram trazidas a 15/11 para o
Diogo as ver («mostra as fotos desses números que não sei quais são»). A 16/11 ele decidiu: **«sim entram»**.

| Fotografia | O que é | Para onde foi | No site |
|---|---|---|---|
| `34` | A casa ao longe, vista do campo | `03-a-quinta/04a_34.jpg` (antes da `35`, que é a que se lhe segue na pasta do verão; não está no Zenfolio) | `quinta/casa-ao-longe-campo.jpg` |
| `51` | O lado da casa, com a barra azul e a chaminé | `01-o-monte/46a_51.jpg` | `exterior/fachada-lateral-chamine.jpg` |
| `52` | A fachada ao fim da tarde, por entre as folhas | `01-o-monte/46b_52.jpg` | `exterior/fachada-folhas-entardecer.jpg` |
| `40-0` e `4` | Quase iguais a `01-o-monte/40_img_0255.jpg` e `01_img_0264.jpg` (a mesma cena, um pouco mais fechada) | ficam em `06-verao-por-decidir/` | não entram |

A `51` e a `52` são as duas fachadas que faltavam ao álbum «O Monte» do Zenfolio (confirmado por olho na captura do álbum): ficam antes
da última, como lá. Sem pessoas nem matrículas. Folhas com que o Diogo as viu: `docs/fotografia/2026-11-15_pasta_do_verao/`.

Vê-se tudo de uma vez nas folhas de contacto: `docs/fotografia/2026-11-12_folhas_de_contacto/` (uma imagem por álbum, com o nome e as
dimensões por baixo de cada fotografia).

## 2. Convenção (a mesma nos cinco álbuns)

- **Nome:** número de ordem no álbum + nome original, em minúsculas, só `a-z 0-9 _ -`, extensão `.jpg` (ex.: `05_35.jpg`,
  `12_img_5927.jpg`). No «Antes e Depois»: `adNN_<espaço>_antes.jpg` e `adNN_<espaço>_depois.jpg`.
  **Uma fotografia que entra num álbum já numerado** leva o número da que fica antes dela e uma letra (`04a_34.jpg`, `46a_51.jpg`,
  `46b_52.jpg`): a ordem do álbum mantém-se e nenhum nome antigo muda (os nomes estão escritos em lotes, folhas e documentos).
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
| A Quinta | `4. telemovel/` (8) · `5. dvm canon/` (6) · `3. anuncios/V2_verão/` (4: `34`, `35`, `36.0`, `36.1`; a `34` está no lote `06-verao-por-decidir.tsv`) |
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

Contado fotografia a fotografia nas 23 capturas do Zenfolio do Diogo (25/10/2026, reenviadas a 12/11): **o Zenfolio tem 135; aqui
estão 114 dessas (e mais uma que lá não está, a `34`); faltam 21.** (A 12/11 faltavam 23; a nota do ChatGPT de 25/10 dizia «cerca de 20».)

| Álbum | Zenfolio | Aqui | Faltam |
|---|---:|---:|---|
| O Monte | 49 | 49 | Nenhuma desde 16/11/2026 (as duas fachadas que vêm antes da última eram a `51` e a `52` da pasta do verão). Duas estão trocadas entre si: no Zenfolio o pôr do sol na piscina vem antes da piscina à noite (aqui `40_img_0255` e `39_40`) |
| Os Quartos | 12 | 12 | Nenhuma |
| A Quinta | 25 | 17 (e a `34`, que não é do Zenfolio) | As três do alpendre com o sofá (as primeiras do álbum) · o pôr do sol atrás dos pinheiros, com a casa · a piscina iluminada à noite · a piscina com as oliveiras · a lua e a casa iluminada · a do quadrado azul, que no Zenfolio também não abre |
| Antes e Depois | 22 | 22 | Nenhuma. No Zenfolio cada par aparece «depois, antes» (só o quarto está ao contrário); aqui os nomes ordenam «antes, depois» |
| Montemor o Novo | 27 | 14 | A estação do Paião de perto · a bicicleta junto ao tanque · o túnel de árvores sem bicicleta · as vacas no montado · a torre com a muralha · o interior da igreja · três vistas ao longe (a colina com casas, o castelo, o vale com a ponte) · o passadiço · o monte com o castelo · duas do miradouro com o banco |

**As duas fachadas de «O Monte» já cá estão**: eram mesmo `3. anuncios/V2_verão/51.JPG` e `52.JPG`; vieram a 15/11/2026 e entraram no
álbum a 16/11, com a palavra do Diogo. «O Monte» fica completo, com 49, e passam a faltar 21 (8 de A Quinta e 13 de Montemor).
Pistas para as outras (não são certezas, só se confirma vendo-as): as de Montemor devem estar entre os números 40 e 62 de
`3. anuncios/V3_inverno/`; as da quinta, em `4. telemovel/` ou `1. todas/`.

**A alta resolução do Rodrigo não está no Dropbox, a não ser uma fotografia** (visto a 12/11/2026, só em leitura): `2. rodrigo/` tem
499 fotografias nas subpastas `1` a `5`, com 1 a 2 MB cada, e a subpasta `HD` tem uma única, `DSC_4075.JPG`, com 16 MB, que também
existe na subpasta `1` com 1,3 MB. As 499 são, portanto, versões reduzidas, do peso das cópias de 1 600 píxeis de `3. anuncios/`.

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

Desde 15/11/2026 (revisão do Diogo) a galeria do site segue os álbuns do Zenfolio, pela mesma ordem, **sem o «Antes e Depois»**, que saiu
do site por decisão dele (as 22 fotografias continuam aqui, em `04-antes-e-depois/`). É a galeria da versão 2 do ensaio
(`docs/versoes/REGISTO.md`), com o nome «Passear pelo Monte».

| Álbum da galeria | No site | Separador do site |
|---|---|---|
| `01-o-monte/` | `site/fotos/exterior/` e `interior/` (47 montadas com o site, a 7/11; as duas fachadas a 16/11) | O Monte · 49, pela ordem do Zenfolio (com a troca 39/40: lá o pôr do sol vem antes da piscina à noite) |
| `02-os-quartos/` | `site/fotos/quartos/` | Os Quartos · 12 |
| `03-a-quinta/` | `site/fotos/quinta/` (17 ficheiros; a `07_36-1` do álbum é `exterior/campo-verde.jpg`, que o site já tinha) | A Quinta · 18 (as 17 do Zenfolio e a casa ao longe, em 5.º lugar) |
| `04-antes-e-depois/` | fora do site desde 15/11 | — |
| `05-montemor-o-novo/` | `site/fotos/montemor/` (14) | Montemor-o-Novo · 14; dez delas rolam também na secção de Montemor |

Fora da galeria, o site usa as mesmas fotografias na capa (uma, desde que o Diogo escolheu a 1), nos três momentos da casa (13), na régua
(19) e na secção de Montemor (10), e ainda `interior/sala-mesa.jpg` e `quartos/quarto.jpg`, que não estão no Zenfolio. As duas miniaturas
pequenas que restavam (`piscina-entardecer`, 600 px, e o recorte `piscina-espreguicadeira`) saíram. São 95 fotografias, todas usadas.

Que ficheiro da galeria é cada ficheiro do site está em `demo/ferramentas/fotos/site-albuns.tsv` (os álbuns 03 e 05 e as duas fachadas
de 16/11 como regras que o guião aplica; o resto dos 01 e 02 em comentário, só para consulta, porque esses ficheiros são a mesma
fotografia noutra gravação);
`python3 demo/ferramentas/fotos/para_o_site.py` copia os primeiros tal e qual e cria ao lado a variante de telemóvel (`-m`, 1 000 px de
largura). As descrições e as legendas escrevem-se em `site/conteudo.php`.

**Pasta do verão** (`7. Fotos/3. anuncios/V2_verão/`, 69 ficheiros, listada pelo conector a 15/11/2026): está toda na galeria desde
16/11/2026, menos as duas gémeas que ficaram de fora (`40.0` e `4`, guardadas em `06-verao-por-decidir/`).

**Marca de água: não se usa** (decisão do Diogo, 15/11/2026: «não coloque»; «marca de água: retiramos»). A ferramenta e as amostras que
se fizeram para ele escolher saíram do repositório nessa noite (ficam no histórico do git, até ao commit `5f23bdc`).
