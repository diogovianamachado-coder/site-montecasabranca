#!/usr/bin/env python3
"""Folha de contacto de um álbum de design/fotos/galeria (para ver o álbum inteiro de uma vez).

Uso: folha_contacto.py <álbum> <saída.jpg> [--colunas 4] [--pares] [--raiz <repositório>]

  <álbum>     pasta em design/fotos/galeria (ex.: 03-a-quinta)
  --colunas   miniaturas por linha (4 por omissão)
  --pares     para o álbum «Antes e Depois»: cada linha da folha leva pares «antes | depois» lado a lado
              (os ficheiros chamam-se adNN_<espaço>_antes.jpg e adNN_<espaço>_depois.jpg)

A ordem é a do nome do ficheiro, que é a ordem do álbum. Por baixo de cada miniatura ficam o nome e as dimensões.
Só usa a biblioteca padrão e o Pillow. Não altera as fotografias.
"""
from __future__ import annotations

import argparse
import os
import re
import sys

from PIL import Image, ImageDraw, ImageFont, ImageOps

LARGURA = 1800
MARGEM = 28
FUNDO = (250, 248, 244)
TINTA = (40, 38, 34)
CINZA = (120, 114, 104)
TERRA = (150, 84, 40)
AZUL = (27, 77, 177)


def letra(tamanho: int, negrito: bool = False):
    for caminho in ('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if negrito else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
                    '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf' if negrito else '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf'):
        if os.path.isfile(caminho):
            return ImageFont.truetype(caminho, tamanho)
    return ImageFont.load_default(size=tamanho)


def titulo_do_lote(raiz: str, album: str) -> str:
    lote = os.path.join(raiz, 'demo', 'ferramentas', 'fotos', 'lotes', album + '.tsv')
    if os.path.isfile(lote):
        with open(lote, encoding='utf-8') as f:
            for linha in f:
                m = re.match(r'^#\s*título:\s*(.+)$', linha.rstrip('\n'))
                if m:
                    return m.group(1).strip()
    return album


def main() -> int:
    ap = argparse.ArgumentParser(description='Folha de contacto de um álbum')
    ap.add_argument('album')
    ap.add_argument('saida')
    ap.add_argument('--colunas', type=int, default=4)
    ap.add_argument('--pares', action='store_true')
    ap.add_argument('--raiz', default=os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))
    a = ap.parse_args()

    pasta = os.path.join(a.raiz, 'design', 'fotos', 'galeria', a.album)
    if not os.path.isdir(pasta):
        raise SystemExit(f'não existe design/fotos/galeria/{a.album}')
    nomes = sorted(n for n in os.listdir(pasta) if n.lower().endswith('.jpg'))
    if not nomes:
        raise SystemExit('álbum sem fotografias')

    colunas = max(1, a.colunas)
    if a.pares and colunas % 2:
        colunas += 1
    intervalo = 14
    celula_l = (LARGURA - 2 * MARGEM - (colunas - 1) * intervalo) // colunas
    celula_a = int(celula_l * 0.75)
    legenda_a = 46
    linhas = -(-len(nomes) // colunas)
    cabecalho = 92
    altura = cabecalho + linhas * (celula_a + legenda_a + intervalo) + MARGEM

    folha = Image.new('RGB', (LARGURA, altura), FUNDO)
    d = ImageDraw.Draw(folha)
    titulo = titulo_do_lote(a.raiz, a.album)
    d.text((MARGEM, 22), f'Monte Casa Branca · álbum «{titulo}»', font=letra(30, True), fill=TINTA)
    d.text((MARGEM, 62), f'{len(nomes)} fotografias · design/fotos/galeria/{a.album}/ · pela ordem do álbum', font=letra(17), fill=CINZA)

    pequena, pequena_n = letra(15), letra(15, True)
    for i, nome in enumerate(nomes):
        lin, col = divmod(i, colunas)
        x = MARGEM + col * (celula_l + intervalo)
        y = cabecalho + lin * (celula_a + legenda_a + intervalo)
        with Image.open(os.path.join(pasta, nome)) as im:
            im = ImageOps.exif_transpose(im).convert('RGB')
            dims = im.size
            im.thumbnail((celula_l, celula_a), Image.LANCZOS)
            d.rectangle([x, y, x + celula_l - 1, y + celula_a - 1], fill=(236, 232, 224))
            folha.paste(im, (x + (celula_l - im.size[0]) // 2, y + (celula_a - im.size[1]) // 2))
        cor = TINTA
        if a.pares:
            cor = TERRA if nome.endswith('_antes.jpg') else AZUL
        d.text((x, y + celula_a + 5), f'{i + 1}. {nome}', font=pequena_n, fill=cor)
        d.text((x, y + celula_a + 24), f'{dims[0]} × {dims[1]} px', font=pequena, fill=CINZA)

    os.makedirs(os.path.dirname(os.path.abspath(a.saida)), exist_ok=True)
    folha.save(a.saida, 'JPEG', quality=84, optimize=True, progressive=True)
    print(f'{a.saida}: {len(nomes)} fotografias, {folha.size[0]}×{folha.size[1]} px, {os.path.getsize(a.saida) // 1024} kB')
    return 0


if __name__ == '__main__':
    sys.exit(main())
