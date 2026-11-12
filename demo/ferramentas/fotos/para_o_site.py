#!/usr/bin/env python3
"""Da galeria (design/fotos/galeria/) para o site (site/fotos/), pela tabela site-albuns.tsv.

Uso: para_o_site.py [--conferir] [--raiz <repositório>]

Para cada linha da tabela: copia o ficheiro da galeria tal e qual para site/fotos/<álbum>/<nome>.jpg (já vem a 1 600 px e sem
metadados) e cria ao lado a variante de telemóvel <nome>-m.jpg, com 1 000 px de largura (nunca aumenta), JPEG 82 progressivo.
É a convenção que o site já usa (inc/util.php: se existir -m, o telemóvel carrega essa).

--conferir não escreve nada: diz o que falta ou está diferente e sai com 1 se houver diferenças (serve para o teste do site).
O ficheiro grande confere-se byte a byte com a galeria; a variante -m pela largura. Pode correr-se as vezes que for preciso:
só escreve o que mudou. Só usa a biblioteca padrão e o Pillow.
"""
from __future__ import annotations

import argparse
import filecmp
import io
import os
import shutil
import sys

from PIL import Image

LARGURA_M = 1000
QUALIDADE = 82


def ler_tabela(caminho: str) -> list[tuple[str, str]]:
    pares = []
    with open(caminho, encoding='utf-8') as f:
        for bruta in f:
            linha = bruta.rstrip('\n')
            if not linha.strip() or linha.startswith('#'):
                continue
            campos = linha.split('\t')
            if len(campos) != 2 or not campos[1].endswith('.jpg') or campos[1].endswith('-m.jpg'):
                raise SystemExit(f'linha mal formada na tabela: {linha!r}')
            pares.append((campos[0], campos[1]))
    destinos = [d for _, d in pares]
    if len(set(destinos)) != len(destinos):
        raise SystemExit('há destinos repetidos na tabela')
    return pares


def variante_m(origem: str) -> bytes:
    with Image.open(origem) as im:
        icc = im.info.get('icc_profile')
        im = im.convert('RGB')
        if im.size[0] > LARGURA_M:
            im = im.resize((LARGURA_M, round(im.size[1] * LARGURA_M / im.size[0])), Image.LANCZOS)
        saida = io.BytesIO()
        opcoes = {'quality': QUALIDADE, 'optimize': True, 'progressive': True}
        if icc:
            opcoes['icc_profile'] = icc
        im.save(saida, 'JPEG', **opcoes)
        return saida.getvalue()


def largura_certa(origem: str, destino_m: str) -> bool:
    """A variante existe e tem a largura esperada (1 000 px, ou a do original se for mais estreito)?
    Não se comparam bytes: o mesmo JPEG sai com bytes diferentes conforme a versão do Pillow."""
    if not os.path.isfile(destino_m):
        return False
    with Image.open(origem) as o, Image.open(destino_m) as m:
        return m.size[0] == min(LARGURA_M, o.size[0])


def main() -> int:
    ap = argparse.ArgumentParser(description='Galeria → site/fotos, pela tabela site-albuns.tsv')
    ap.add_argument('--conferir', action='store_true')
    ap.add_argument('--raiz', default=os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))
    a = ap.parse_args()

    pares = ler_tabela(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'site-albuns.tsv'))
    escritos, diferencas = 0, []
    for origem_rel, destino_rel in pares:
        origem = os.path.join(a.raiz, 'design', 'fotos', 'galeria', origem_rel)
        destino = os.path.join(a.raiz, 'site', 'fotos', destino_rel)
        destino_m = destino[:-4] + '-m.jpg'
        if not os.path.isfile(origem):
            raise SystemExit(f'não existe na galeria: {origem_rel}')
        igual = os.path.isfile(destino) and filecmp.cmp(origem, destino, shallow=False)
        igual_m = igual and largura_certa(origem, destino_m)   # se o ficheiro mudou, a variante refaz-se
        if igual and igual_m:
            continue
        if a.conferir:
            diferencas.append(destino_rel + ('' if igual else ' (ficheiro)') + ('' if igual_m else ' (variante -m)'))
            continue
        os.makedirs(os.path.dirname(destino), exist_ok=True)
        if not igual:
            shutil.copyfile(origem, destino)
        if not igual_m:
            m = variante_m(origem)
            with open(destino_m, 'wb') as f:
                f.write(m)
        escritos += 1
        print(f'{origem_rel} → site/fotos/{destino_rel}' + ('' if igual_m else ' (+ variante -m)'))

    if a.conferir:
        if diferencas:
            print('site/fotos não está igual à galeria:')
            for d in diferencas:
                print('  ' + d)
            return 1
        print(f'site/fotos igual à galeria nas {len(pares)} fotografias da tabela')
        return 0
    print(f'{escritos} fotografias escritas, {len(pares) - escritos} já estavam certas ({len(pares)} na tabela)')
    return 0


if __name__ == '__main__':
    sys.exit(main())
