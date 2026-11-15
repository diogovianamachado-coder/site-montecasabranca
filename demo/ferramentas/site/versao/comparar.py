#!/usr/bin/env python3
"""Põe duas versões do site lado a lado, parte a parte, a partir das capturas de docs/versoes/v<N>/ (feitas por fotografar.sh).

Uso: python3 demo/ferramentas/site/versao/comparar.py <A> <B> [<pasta de saída>] [--pdf <ficheiro.pdf>]
     ex.: comparar.py 1 2            → docs/versoes/v1-v2/   (uma folha por parte: computador e telemóvel)
     --pdf junta todas as folhas num só PDF (uma por página), que é o mais cómodo para folhear no computador.

Serve para o Diogo dizer onde fomos melhores e que parte de uma versão anterior quer manter (docs/versoes/REGISTO.md).
As legendas de cada versão vêm de docs/versoes/versoes.json (número → data e estado)."""
import json
import os
import re
import sys

from PIL import Image, ImageDraw, ImageFont

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', '..'))
PARTES = {
    '00': 'A página inteira · a ordem das partes',
    '01': 'Capa',
    '02': 'A casa · a mensagem',
    '03': 'Os espaços da casa',
    '04': 'O fecho e a régua de fotografias',
    '05': 'Montemor-o-Novo, a N2 e onde estamos',
    '06': 'A galeria',
    '07': 'Antes de chegar · as perguntas',
    '08': 'Quem já ficou · as avaliações',
    '09': 'Contactos e rodapé',
    '10': 'O menu completo',
    '11': 'O painel das datas',
}
FUNDO, TINTA, SUAVE, LINHA = (250, 248, 244), (60, 48, 40), (125, 104, 90), (216, 205, 189)
M = 28          # margem
COLUNA = {'1280': 900, '390': 390}       # largura de cada versão na folha
ALTURA_MAX = 5200                        # uma coluna mais comprida do que isto fica pelo começo
NOME_APARELHO = {'1280': 'computador', '390': 'telemovel'}


def fonte(tamanho, negrito=False):
    for p in (f'/usr/share/fonts/truetype/dejavu/DejaVuSans{"-Bold" if negrito else ""}.ttf',
              '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf'):
        try:
            return ImageFont.truetype(p, tamanho)
        except OSError:
            pass
    return ImageFont.load_default()


def capturas(pasta, prefixo, aparelho):
    """Os ficheiros de uma parte (podem ser vários: os três momentos, os dois ecrãs do painel), pela ordem do nome."""
    if not os.path.isdir(pasta):
        return []
    return sorted(os.path.join(pasta, f) for f in os.listdir(pasta) if re.match(rf'^{prefixo}-.*-{aparelho}\.jpg$', f))


def coluna(ficheiros, largura):
    """Empilha as capturas de uma versão numa coluna com a largura dada; devolve None se não houver nenhuma."""
    ims = []
    for f in ficheiros:
        im = Image.open(f).convert('RGB')
        ims.append(im.resize((largura, max(1, round(im.height * largura / im.width))), Image.LANCZOS))
    if not ims:
        return None
    altura = sum(i.height for i in ims) + 10 * (len(ims) - 1)
    col = Image.new('RGB', (largura, altura), FUNDO)
    y = 0
    for i in ims:
        col.paste(i, (0, y)); y += i.height + 10
    if col.height > ALTURA_MAX:
        col = col.crop((0, 0, largura, ALTURA_MAX))
    return col


def legenda(versoes, n):
    v = versoes.get(str(n), {})
    return f'V{n}' + (f' · {v["data"]}' if v.get('data') else '') + (f' · {v["estado"]}' if v.get('estado') else '')


def main():
    args = sys.argv[1:]
    pdf = None
    if '--pdf' in args:
        i = args.index('--pdf'); pdf = args[i + 1]; del args[i:i + 2]
    if len(args) < 2:
        sys.exit(__doc__)
    a, b = args[0], args[1]
    base = os.path.join(RAIZ, 'docs', 'versoes')
    saida = args[2] if len(args) > 2 else os.path.join(base, f'v{a}-v{b}')
    os.makedirs(saida, exist_ok=True)
    try:
        versoes = json.load(open(os.path.join(base, 'versoes.json'), encoding='utf-8'))
    except OSError:
        versoes = {}
    f_titulo, f_legenda, f_falta = fonte(30, True), fonte(21, True), fonte(20)
    feitas = 0
    folhas = []
    for prefixo, titulo in PARTES.items():
        for aparelho in ('1280', '390'):
            largura = COLUNA[aparelho] if prefixo != '00' else 520
            ca = coluna(capturas(os.path.join(base, f'v{a}'), prefixo, aparelho), largura)
            cb = coluna(capturas(os.path.join(base, f'v{b}'), prefixo, aparelho), largura)
            if ca is None and cb is None:
                continue
            alt = max((c.height for c in (ca, cb) if c is not None), default=200)
            cabeca = M + 44 + 14 + 30 + 12
            folha = Image.new('RGB', (M * 3 + largura * 2, cabeca + alt + M), FUNDO)
            d = ImageDraw.Draw(folha)
            d.text((M, M), f'{titulo} · {"no computador" if aparelho == "1280" else "no telemóvel"}', font=f_titulo, fill=TINTA)
            for k, (n, c) in enumerate(((a, ca), (b, cb))):
                x = M + k * (largura + M)
                d.text((x, M + 44 + 14), legenda(versoes, n), font=f_legenda, fill=SUAVE)
                if c is None:
                    d.rectangle((x, cabeca, x + largura - 1, cabeca + 160), outline=LINHA)
                    d.text((x + 18, cabeca + 18), 'Esta parte não existia nesta versão', font=f_falta, fill=SUAVE)
                else:
                    folha.paste(c, (x, cabeca))
            nome = f'{prefixo}-{re.sub(r"[^a-z0-9]+", "-", titulo.lower().split(" · ")[0].translate(str.maketrans("áàâãéêíóôõúç", "aaaaeeiooouc"))).strip("-")}-{NOME_APARELHO[aparelho]}.jpg'
            folha.save(os.path.join(saida, nome), quality=78, optimize=True)
            folhas.append(os.path.join(saida, nome))
            feitas += 1
    print(f'{feitas} folhas em {saida}')
    if pdf and folhas:
        paginas = [Image.open(f).convert('RGB') for f in folhas]
        paginas[0].save(pdf, save_all=True, append_images=paginas[1:], resolution=110.0, quality=78)
        print(f'PDF com {len(paginas)} páginas: {pdf}')


if __name__ == '__main__':
    main()
