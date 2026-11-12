#!/usr/bin/env python3
"""Fotografias do Dropbox para design/fotos/galeria/<álbum>/ (corre no workflow «Fotografias do Dropbox»).

Uso: processar.py <álbum> <posições> <pasta-dos-originais> [--raiz <repositório>] [--resultado <ficheiro.json>]

  <álbum>      pasta em design/fotos/galeria, com um lote em demo/ferramentas/fotos/lotes/<álbum>.tsv
  <posições>   linhas do lote a que os ficheiros descarregados correspondem, pela mesma ordem: «1-17», «3,7,9», «2»
  <pasta>      onde o passo de descarga deixou os ficheiros: 000.bin, 001.bin, … (um por ligação, pela ordem das posições)

Para cada fotografia: confere os bytes com o lote, aplica a orientação do EXIF, reduz para 1 600 px no lado maior
(nunca aumenta), grava JPEG de qualidade 82, progressivo, sem metadados (fica só o perfil de cor), com o nome do lote.
É a convenção das duas primeiras entregas (álbuns 01 e 02, GPT, 7/11/2026).

Retoques de privacidade: a 6.ª coluna do lote, quando existe, leva «desfocar=x0,y0,x1,y1» (frações da largura e da
altura da imagem já endireitada; várias zonas separadas por «|»). Essa zona fica em mosaico grosso na cópia web, de
forma que não se recupera (matrículas, por exemplo). O original no Dropbox nunca é tocado.

Sai com 1 se alguma falhar; as que correram bem ficam gravadas na pasta do álbum. Nunca escreve ligações nem caminhos
fora do repositório. Só usa a biblioteca padrão e o Pillow.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys

from PIL import Image, ImageFilter, ImageOps

LADO_MAIOR = 1600
QUALIDADE = 82
ALBUM_VALIDO = re.compile(r'^[0-9]{2}-[a-z0-9-]+$')
NOME_VALIDO = re.compile(r'^[a-z0-9_-]+\.jpg$')


def ler_lote(caminho: str) -> tuple[str, dict[int, dict]]:
    """Devolve o título do álbum e as linhas do lote por posição."""
    titulo, linhas = '', {}
    with open(caminho, encoding='utf-8') as f:
        for bruta in f:
            linha = bruta.rstrip('\n')
            if not linha.strip():
                continue
            if linha.startswith('#'):
                m = re.match(r'^#\s*título:\s*(.+)$', linha)
                if m:
                    titulo = m.group(1).strip()
                continue
            campos = linha.split('\t')
            if len(campos) < 4:
                raise SystemExit(f'lote mal formado (esperava 4 colunas separadas por tabulação): {linha!r}')
            pos, origem, tamanho, final = int(campos[0]), campos[1], int(campos[2]), campos[3]
            if not NOME_VALIDO.match(final):
                raise SystemExit(f'nome final inválido no lote: {final!r}')
            if pos in linhas:
                raise SystemExit(f'posição repetida no lote: {pos}')
            linhas[pos] = {'posicao': pos, 'origem': origem, 'bytes': tamanho, 'final': final,
                           'zonas': ler_zonas(campos[5]) if len(campos) > 5 else []}
    if not linhas:
        raise SystemExit('lote vazio')
    return titulo, linhas


def ler_zonas(texto: str) -> list[tuple[float, float, float, float]]:
    """«desfocar=0.19,0.75,0.23,0.77|…» → lista de zonas em frações (x0, y0, x1, y1). Texto vazio → lista vazia."""
    texto = texto.strip()
    if not texto:
        return []
    if not texto.startswith('desfocar='):
        raise SystemExit(f'retoque desconhecido no lote: {texto!r}')
    zonas = []
    for parte in texto[len('desfocar='):].split('|'):
        try:
            x0, y0, x1, y1 = (float(v) for v in parte.split(','))
        except ValueError:
            raise SystemExit(f'zona a desfocar mal escrita no lote: {parte!r}')
        if not (0 <= x0 < x1 <= 1 and 0 <= y0 < y1 <= 1):
            raise SystemExit(f'zona a desfocar fora da imagem: {parte!r}')
        zonas.append((x0, y0, x1, y1))
    return zonas


def desfocar(im: Image.Image, zonas: list[tuple[float, float, float, float]]) -> Image.Image:
    """Mosaico grosso e alisado em cada zona: não fica nada que se leia nem que se recupere."""
    for x0, y0, x1, y1 in zonas:
        caixa = (int(x0 * im.size[0]), int(y0 * im.size[1]), max(int(x1 * im.size[0]), int(x0 * im.size[0]) + 2),
                 max(int(y1 * im.size[1]), int(y0 * im.size[1]) + 2))
        zona = im.crop(caixa)
        l, a = zona.size
        blocos = (max(2, l // max(8, a // 2)), 2)          # dois blocos de altura: nenhuma letra sobrevive
        zona = zona.resize(blocos, Image.BOX).resize((l, a), Image.BILINEAR).filter(ImageFilter.GaussianBlur(max(1.0, a / 8)))
        im.paste(zona, caixa[:2])
    return im


def expandir_posicoes(texto: str) -> list[int]:
    """«1-3,7» → [1, 2, 3, 7]."""
    saida: list[int] = []
    for parte in texto.replace(' ', '').split(','):
        if not parte:
            continue
        m = re.match(r'^(\d+)-(\d+)$', parte)
        if m:
            a, b = int(m.group(1)), int(m.group(2))
            if a > b:
                raise SystemExit(f'intervalo ao contrário: {parte}')
            saida.extend(range(a, b + 1))
        elif parte.isdigit():
            saida.append(int(parte))
        else:
            raise SystemExit(f'posições inválidas: {texto!r}')
    if not saida or len(set(saida)) != len(saida):
        raise SystemExit(f'posições vazias ou repetidas: {texto!r}')
    return saida


def tratar(origem: str, destino: str, zonas: list | None = None) -> tuple[tuple[int, int], tuple[int, int]]:
    """Abre o original, endireita, aplica os retoques de privacidade, reduz e grava. Devolve (dimensões de origem, finais)."""
    with Image.open(origem) as im:
        im.load()
        icc = im.info.get('icc_profile')
        im = ImageOps.exif_transpose(im)
        antes = im.size
        if im.mode not in ('RGB', 'L'):
            im = im.convert('RGB')
        if zonas:
            im = desfocar(im, zonas)
        if max(im.size) > LADO_MAIOR:
            im.thumbnail((LADO_MAIOR, LADO_MAIOR), Image.LANCZOS)
        opcoes = {'quality': QUALIDADE, 'optimize': True, 'progressive': True}
        if icc:
            opcoes['icc_profile'] = icc
        im.save(destino, 'JPEG', **opcoes)
        return antes, im.size


def main() -> int:
    ap = argparse.ArgumentParser(description='Fotografias descarregadas → design/fotos/galeria/<álbum>/')
    ap.add_argument('album')
    ap.add_argument('posicoes')
    ap.add_argument('originais')
    ap.add_argument('--raiz', default=os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))
    ap.add_argument('--resultado', default='')
    a = ap.parse_args()

    if not ALBUM_VALIDO.match(a.album):
        raise SystemExit(f'álbum inválido: {a.album!r}')
    lote = os.path.join(a.raiz, 'demo', 'ferramentas', 'fotos', 'lotes', a.album + '.tsv')
    if not os.path.isfile(lote):
        raise SystemExit(f'não há lote para o álbum {a.album} (esperava {os.path.relpath(lote, a.raiz)})')
    titulo, linhas = ler_lote(lote)
    posicoes = expandir_posicoes(a.posicoes)
    desconhecidas = [p for p in posicoes if p not in linhas]
    if desconhecidas:
        raise SystemExit(f'posições que não existem no lote: {desconhecidas}')

    pasta = os.path.join(a.raiz, 'design', 'fotos', 'galeria', a.album)
    os.makedirs(pasta, exist_ok=True)
    gravadas, falhas = [], []
    for indice, pos in enumerate(posicoes):
        item = linhas[pos]
        origem = os.path.join(a.originais, f'{indice:03d}.bin')
        rotulo = f'{pos:>2}. {item["final"]}'
        if not os.path.isfile(origem):
            falhas.append({**item, 'motivo': 'não foi descarregada'})
            print(f'FALHOU {rotulo}: não foi descarregada')
            continue
        recebidos = os.path.getsize(origem)
        if recebidos != item['bytes']:
            falhas.append({**item, 'motivo': f'tamanho diferente do lote ({recebidos} em vez de {item["bytes"]} bytes)'})
            print(f'FALHOU {rotulo}: {recebidos} bytes recebidos, o lote diz {item["bytes"]}')
            continue
        destino = os.path.join(pasta, item['final'])
        try:
            antes, depois = tratar(origem, destino, item['zonas'])
        except Exception as e:  # ficheiro que não é imagem, truncado, etc.
            if os.path.exists(destino):
                os.remove(destino)
            falhas.append({**item, 'motivo': f'não se abre como imagem ({type(e).__name__})'})
            print(f'FALHOU {rotulo}: não se abre como imagem ({type(e).__name__})')
            continue
        final_bytes = os.path.getsize(destino)
        gravadas.append({**item, 'px_origem': list(antes), 'px_final': list(depois), 'bytes_final': final_bytes})
        retoque = f' · {len(item["zonas"])} zona(s) desfocada(s)' if item['zonas'] else ''
        print(f'OK     {rotulo}: {antes[0]}×{antes[1]} ({recebidos // 1024} kB) → {depois[0]}×{depois[1]} ({final_bytes // 1024} kB){retoque}')

    resumo = {'album': a.album, 'titulo': titulo or a.album, 'posicoes': a.posicoes, 'gravadas': gravadas, 'falhas': falhas}
    if a.resultado:
        with open(a.resultado, 'w', encoding='utf-8') as f:
            json.dump(resumo, f, ensure_ascii=False, indent=1)
    sumario = os.environ.get('GITHUB_STEP_SUMMARY')
    if sumario:
        with open(sumario, 'a', encoding='utf-8') as f:
            f.write(f'### Álbum {resumo["titulo"]} · posições {a.posicoes}\n\n')
            f.write(f'{len(gravadas)} gravadas · {len(falhas)} falhadas\n\n')
            if gravadas:
                f.write('| Posição | Ficheiro | Origem | Final |\n|---:|---|---|---|\n')
                for g in gravadas:
                    f.write(f'| {g["posicao"]} | `{g["final"]}` | {g["px_origem"][0]}×{g["px_origem"][1]} · {g["bytes"] // 1024} kB | '
                            f'{g["px_final"][0]}×{g["px_final"][1]} · {g["bytes_final"] // 1024} kB'
                            f'{" · zona desfocada" if g["zonas"] else ""} |\n')
            for x in falhas:
                f.write(f'\n- **Falhou** a posição {x["posicao"]} (`{x["final"]}`): {x["motivo"]}\n')
    print(f'\n{len(gravadas)} gravadas em design/fotos/galeria/{a.album}/ · {len(falhas)} falhadas')
    return 1 if falhas else 0


if __name__ == '__main__':
    sys.exit(main())
