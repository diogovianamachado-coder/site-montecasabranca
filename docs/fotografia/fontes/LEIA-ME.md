# Fotos do site · onde vão e que ficheiro cada espaço espera (10/10/2026)

**Só a `casa.jpeg` é real** (a da ficha). Tudo o resto são espaços desenhados no `v2/inicio.html`, à espera das fotografias do Rodrigo
(`/1. DVM/2. ANGULOS CASTIÇOS, LDA/5. Exploração AL/7. Fotos/2. rodrigo/`) e do «antes e depois» (`.../7. Fotos/6. Antes e Depois/`).

## Inventário lido no Dropbox (pelo conector, 10/10; a rede não deixa descarregar nem ver)
- `2. rodrigo/2/` 99 JPG (DSC_4182–4315) · `3/` 100 JPG (DSC_4316–4468) · `4/` 99 JPG (até DSC_4469…) · `5/` 96 ficheiros
  (JPG + `wetransfer_mcb-album-005_2022-07-13_1120.zip`) · `HD/DSC_4075.JPG` (16 MB). Foram lidas as primeiras 400 entradas da
  listagem (há mais); as subpastas `1`, `4` e `5` podem ter mais ficheiros do que os contados.
- `6. Antes e Depois/`: 25 ficheiros, lidos todos. Pela data da fotografia: **antes** = `a14.JPG` e `a20.JPG` (4/jun/2021), `a22.JPG`
  (2/mai/2021), `a15.JPG` (9/nov/2020); **depois** = `a1`–`a13`, `a16`–`a19`, `a21` (12/out/2023; `a2`, `a9`, `a10`, `a16` são HEIC),
  `8 2023-10-12 19_02_34.JPG`, `9 2023-10-12 19_02_33.JPG`, `IMG_1105 2023-10-12 19_02_34.HEIC`.

## Espaços da página inicial → nome do ficheiro a pôr nesta pasta
| zona | ficheiro | o que deve mostrar |
|---|---|---|
| Exterior e chegada | `01_chegada.jpg` | a entrada da herdade, o caminho entre o olival |
| Exterior e chegada | `02_fachada.jpg` | a casa de frente, cal e barra azul |
| Piscina | `03_piscina.jpg` | a piscina com a casa atrás |
| Piscina | `04_piscina_tarde.jpg` | fim de dia na piscina, pôr do sol |
| Salão e cozinha | `05_salao.jpg` | o salão do casão aberto para fora |
| Salão e cozinha | `06_cozinha.jpg` | a cozinha SMEG com a mesa |
| Quartos | `07_quarto_principal.jpg` | quarto de casal queen |
| Quartos | `08_quarto_twin.jpg` | quarto com as duas camas |
| Casas de banho | `09_wc_principal.jpg` | a casa de banho privativa |
| Campo e pôr do sol | `10_olival.jpg` | o olival centenário |
| Campo e pôr do sol | `11_por_do_sol.jpg` | o céu ao fim do dia |

Antes e depois (pares propostos pela data; **o Diogo confirma por olho** quando as vir): 1 o casão `a14.JPG → a1.JPG` · 2 a piscina
`a20.JPG → a3.JPG` · 3 a fachada `a22.JPG → a8.JPG` · 4 o quarto principal `a15.JPG → a12.JPG`. Nomes finais nesta pasta:
`ad1_antes.jpg` / `ad1_depois.jpg` … `ad4_*`. Os HEIC convertem-se para JPG ao entrar.

**Medidas para o site:** largura 1600 px, JPG qualidade 80, sem metadados (o gerador fará as versões 800 e 400 para o telemóvel).

## O que a reportagem do Rodrigo tem (visto a 10/10 pelas miniaturas do Canva; 31 fotos de amostra, uma em cada nove)
O caminho que funciona: `download_link` do conector do Dropbox → `upload-asset-from-url` do Canva (os servidores do Canva vão buscar o
ficheiro, não o contentor) → `get-assets` devolve a miniatura e o Claude vê-a. As 31 estão na biblioteca do Canva do Diogo com o nome
`MCB Rodrigo DSC_NNNN`, prontas a arrastar para qualquer desenho de lá.
- **Pasta 2 (DSC_4182–4315):** exterior à hora dourada e de noite: a casa atrás da árvore grande (4182), a fachada com a barra azul (4190),
  o alpendre com a mesa posta ao pôr do sol (4201, 4224, 4262 — a melhor para «na nossa casa é assim»), o casão de frente (4213), a piscina
  ao entardecer com a casa atrás (4286 — candidata a capa), a casa sob a lua (4300), a piscina iluminada de noite (4310).
- **Pasta 3 (DSC_4316–4468):** a piscina de noite com o salão aceso (4316); porta do quarto a partir do pátio (4325); quarto com cabide e
  cadeira de vime (4413); casa de banho com espelho redondo (4434); **cozinha e mesa do casão** (4456); campos de restolho (4395); o castelo
  de Montemor visto da casa (4376) e o parque com bancos (4380).
- **Pasta 4 (DSC_4469–…):** a casa inteira à hora azul (4476, 4494); **o pôr do sol por trás da casa e da piscina** (4513, 4532, 4550, 4569 —
  as mais fortes de toda a reportagem; 4532 é a capa que eu escolhia).
- **Pasta 5 (DSC_4583–…):** mais pôr do sol com a piscina (4583); a casa entre as árvores velhas (4614); o casão de frente, limpo (4643);
  Montemor-o-Novo do alto (4663); **rua de Montemor com as casas de barra azul** (4694 — liga a casa à vila).
- Por ver: as outras oito em cada nove, a pasta `1` e o `HD`. A amostra chega para escolher a capa e as zonas; a página «Fotos» pede a volta completa.

## A biblioteca INTEIRA do Dropbox está no Canva (10/10, segunda metade da sessão)
Pedido do Diogo: «Tens de usar a biblioteca completa de fotos que está no Dropbox. É aí que está a verdade das fotos.» Feito pelo mesmo
caminho (`download_link` em lotes de 25 → `upload-asset-from-url`), sem código nem API na Amen.
- **`dropbox_manifest.json`** — a listagem recursiva de `7. Fotos/` (caminho relativo `p`, `id` do Dropbox, tamanho em kB, data).
- **`canva_assets.tsv`** — uma linha por imagem: `caminho no Dropbox · id do asset no Canva · nome no Canva`. **1 310 imagens, 1 032 enviadas**
  (uma por fotografia distinta); as **278 restantes são cópias byte a byte** de outra já enviada (mesmo tamanho, e `content_hash` quando o
  Dropbox o deu) e apontam para o asset da irmã, com `= caminho da irmã` na 3.ª coluna. Nada ficou de fora: a pasta `gallery/` (72 imagens)
  é o software de galeria X3 (php/js/css), não são fotos.
- **Por pasta:** `2. rodrigo` 499 (todas, inclusive a `HD/`) · `1. todas` 397 (com `Prontas/` 79) · `3. anuncios` 237 (Interior 61, V1, V2 verão,
  V3 inverno) · `4. telemovel` 81 · `5. dvm canon` 70 · `6. Antes e Depois` 25 · 1 PNG solto na raiz.
- **Nomes no Canva** (para procurar na biblioteca): `MCB Rodrigo <pasta> DSC_NNNN` · `MCB Anúncios Interior <sub> IMG_NNNN` · `MCB Anúncios V1 N`
  · `MCB Anúncios V2 verão N` · `MCB Anúncios V3 inverno N` · `MCB Antes e Depois aN` · `MCB Prontas <Sub> IMG_NNNN` · `MCB Canon IMG_NNNN` ·
  `MCB Telemóvel IMG_NNNN` · `MCB Todas IMG_NNNN` · `MCB raiz 78C345ED`. No Canva basta escrever «MCB» na procura dos Uploads.
- **Pasta no Canva:** «Monte Casa Branca · fotos (Dropbox)» (`FAHXoTImy4E`); os assets novos entram nos Uploads gerais e podem ser arrastados para lá.
- Para apanhar uma foto nova do Dropbox: linha nova no manifesto e no TSV; se o site vier a precisar de sincronização automática, aí sim
  entra código (uma porta na Amen a ler o Dropbox para `site/fotos/`), mas só quando o site existir.
