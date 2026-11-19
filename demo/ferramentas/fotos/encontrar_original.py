"""Encontrar o original de uma fotografia mostrada em pouca resolução (processo «separador - número de fotos», 19/11/2026).

O Diogo escolhe as fotografias de cada separador offline, numa pasta por separador, e mostra-as em pouca resolução (capturas, miniaturas).
Este guião compara cada imagem com as fotografias que já estão no repositório e diz qual é o original:
  python3 demo/ferramentas/fotos/encontrar_original.py imagem1.jpg imagem2.png pasta-com-recortes/ ...
Compara com design/fotos/galeria/ (a coleção, 1 600 px) e site/fotos/ (as do site, sem as variantes -m). Para cada imagem escreve os
três candidatos mais parecidos, com a distância (0 = igual; até cerca de 8, a mesma fotografia; acima de 20, provavelmente outra).
Várias com distância quase igual são a mesma fotografia guardada em dois sítios (por exemplo, num álbum e no site).

Como compara: uma «impressão digital» da imagem reduzida (diferenças de luz numa grelha de 17 × 16, em cinzento) e as cores médias numa
grelha de 4 × 4. Cada fotografia do repositório conta também recortada ao quadrado (as miniaturas de muitos programas são quadradas).
As que não aparecerem com distância baixa não estão no repositório: procuram-se no Dropbox («7. Fotos») pelo nome ou pela via do
GitHub (.github/workflows/fotos-dropbox.yml). Só a biblioteca PIL.
"""
import os
import sys
from PIL import Image

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
CATALOGO = [os.path.join(RAIZ, 'design', 'fotos', 'galeria'), os.path.join(RAIZ, 'site', 'fotos')]
EXT = ('.jpg', '.jpeg', '.png', '.webp')


def _pontos(im):
    f = getattr(im, 'get_flattened_data', None)        # Pillow 12+; getdata() nas mais antigas
    return list(f() if f else im.getdata())


def assinatura(im):
    im = im.convert('RGB')
    g = im.convert('L').resize((17, 16), Image.LANCZOS)
    px = _pontos(g)
    bits = [px[y * 17 + x] > px[y * 17 + x + 1] for y in range(16) for x in range(16)]
    cor = _pontos(im.resize((4, 4), Image.LANCZOS))
    return bits, cor


def quadrado(im):
    w, h = im.size
    l = min(w, h)
    return im.crop(((w - l) // 2, (h - l) // 2, (w - l) // 2 + l, (h - l) // 2 + l))


def distancia(a, b):
    ham = sum(x != y for x, y in zip(a[0], b[0])) / len(a[0]) * 64
    cor = sum(abs(p - q) for c1, c2 in zip(a[1], b[1]) for p, q in zip(c1, c2)) / (16 * 3 * 255) * 64
    return ham + cor


def ficheiros(caminhos):
    for c in caminhos:
        if os.path.isdir(c):
            for raiz, _, nomes in os.walk(c):
                for n in sorted(nomes):
                    if n.lower().endswith(EXT):
                        yield os.path.join(raiz, n)
        elif c.lower().endswith(EXT):
            yield c


def main(args):
    if not args:
        print(__doc__)
        return 1
    cat = []
    for f in ficheiros(CATALOGO):
        if os.path.splitext(f)[0].endswith('-m'):
            continue
        try:
            im = Image.open(f)
            cat.append((os.path.relpath(f, RAIZ), assinatura(im), assinatura(quadrado(im))))
        except Exception as e:
            print('não abri', f, e, file=sys.stderr)
    print(f'{len(cat)} fotografias no repositório para comparar\n')
    for f in ficheiros(args):
        a = assinatura(Image.open(f))
        notas = sorted((min(distancia(a, s1), distancia(a, s2)), nome) for nome, s1, s2 in cat)
        print(os.path.basename(f))
        for d, nome in notas[:3]:
            print(f'   {d:5.1f}  {nome}')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
