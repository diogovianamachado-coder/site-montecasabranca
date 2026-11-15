#!/usr/bin/env python3
"""Reduz a captura da página inteira a uma miniatura (520 px de largura): serve só para se ver a ordem das partes de uma versão.
Uso: miniatura.py <ficheiro.jpg> [largura]      (sem Pillow nesta máquina, deixa o ficheiro como está)"""
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit(0)

Image.MAX_IMAGE_PIXELS = None
ficheiro = sys.argv[1]
largura = int(sys.argv[2]) if len(sys.argv) > 2 else 520
im = Image.open(ficheiro).convert('RGB')
if im.width > largura:
    im.resize((largura, round(im.height * largura / im.width)), Image.LANCZOS).save(ficheiro, quality=70, optimize=True)
