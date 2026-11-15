#!/usr/bin/env python3
"""Marca de água do Monte Casa Branca numa fotografia (o logótipo, a branco, por cima da imagem).

Uso: marca_de_agua.py <entrada.jpg> <saída.jpg> [--modo canto|centro|repetida] [--forca 0.0-1.0]

Modos (amostras em docs/fotografia/2026-11-15_marca_de_agua/, para o Diogo escolher por olho):
  canto     o logótipo pequeno no canto inferior direito; quase não se nota, identifica a origem, corta-se com facilidade
  centro    o logótipo ao centro, translúcido, como nas galerias de fotógrafos; não se corta sem estragar a fotografia
  repetida  o logótipo repetido em diagonal por toda a imagem, muito leve; a que mais protege e a que mais se vê

A marca fica gravada na imagem (não é uma camada da página): quem guardar a fotografia leva-a com a marca. Só protege as cópias
que o site serve; os originais limpos ficam na galeria (design/fotos/galeria/), que não vai para o servidor.
Só usa a biblioteca padrão e o Pillow. Grava JPEG 82 progressivo, sem metadados, com o perfil de cor da entrada.
"""
from __future__ import annotations

import argparse
import os
import sys

from PIL import Image, ImageFilter

LOGO = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'site', 'assets', 'img', 'logotipo.png')
FORCA = {'canto': 0.55, 'centro': 0.28, 'repetida': 0.14}


def logotipo(largura: int) -> Image.Image:
    """O logótipo como máscara (canal alfa do PNG), à largura pedida."""
    with Image.open(LOGO) as im:
        alfa = im.convert('RGBA').getchannel('A')
    return alfa.resize((largura, round(alfa.size[1] * largura / alfa.size[0])), Image.LANCZOS)


def carimbar(base: Image.Image, mascara: Image.Image, x: int, y: int, forca: float) -> None:
    """Põe o logótipo a branco em (x, y), com uma sombra muito leve para se ler sobre zonas claras."""
    sombra = mascara.filter(ImageFilter.GaussianBlur(max(1, mascara.size[0] // 160)))
    base.paste(Image.new('RGB', mascara.size, (0, 0, 0)), (x + 1, y + 1), sombra.point(lambda v: int(v * forca * 0.45)))
    base.paste(Image.new('RGB', mascara.size, (255, 255, 255)), (x, y), mascara.point(lambda v: int(v * forca)))


def marcar(im: Image.Image, modo: str, forca: float | None) -> Image.Image:
    im = im.convert('RGB')
    L, A = im.size
    f = FORCA[modo] if forca is None else forca
    if modo == 'canto':
        m = logotipo(max(110, round(min(L, A * 1.5) * 0.13)))
        margem = round(min(L, A) * 0.03)
        carimbar(im, m, L - m.size[0] - margem, A - m.size[1] - margem, f)
    elif modo == 'centro':
        m = logotipo(round(min(L, A * 1.5) * 0.42))
        carimbar(im, m, (L - m.size[0]) // 2, (A - m.size[1]) // 2, f)
    else:
        m = logotipo(round(min(L, A * 1.5) * 0.2)).rotate(24, expand=True, resample=Image.BICUBIC)
        passo_x, passo_y = round(m.size[0] * 1.55), round(m.size[1] * 1.25)
        for i, y in enumerate(range(-m.size[1] // 2, A, passo_y)):
            for x in range(-m.size[0] // 2 + (passo_x // 2 if i % 2 else 0), L, passo_x):
                carimbar(im, m, x, y, f)
    return im


def main() -> int:
    ap = argparse.ArgumentParser(description='Marca de água do Monte Casa Branca')
    ap.add_argument('entrada'); ap.add_argument('saida')
    ap.add_argument('--modo', choices=list(FORCA), default='canto')
    ap.add_argument('--forca', type=float, default=None, help='0 a 1; por omissão a do modo')
    a = ap.parse_args()
    with Image.open(a.entrada) as im:
        icc = im.info.get('icc_profile')
        saida = marcar(im, a.modo, a.forca)
    op = {'quality': 82, 'optimize': True, 'progressive': True}
    if icc:
        op['icc_profile'] = icc
    os.makedirs(os.path.dirname(os.path.abspath(a.saida)), exist_ok=True)
    saida.save(a.saida, 'JPEG', **op)
    print(f'{a.saida} · {a.modo} · {saida.size[0]}x{saida.size[1]}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
