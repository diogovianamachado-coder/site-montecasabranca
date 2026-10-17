#!/usr/bin/env python3
"""Ferramenta da demo do Monte Casa Branca (Python 3, só biblioteca padrão).

    python3 demo/ferramentas/demo.py testar      verifica demo/site e demo/versao.json
    python3 demo/ferramentas/demo.py construir   gera demo/_saida/ com o commit carimbado
    python3 demo/ferramentas/demo.py servir      constrói e serve em http://127.0.0.1:8787
    python3 demo/ferramentas/demo.py empacotar   constrói e cria demo/_pacotes/demo-<rev>-<commit>.zip
    python3 demo/ferramentas/demo.py artefacto   constrói e gera demo/_saida/artefacto/ (variante para o claude.ai, ligação «mais recente»)
    python3 demo/ferramentas/demo.py artefacto --fixa   idem em demo/_saida/artefacto-<rev>/ (ligação fixa da revisão, S29)

Nada aqui toca em public/, src/, design/, docs/ ou na app. _saida/ e _pacotes/ são
gerados e não se versionam.
"""
import html.parser
import json
import os
import re
import shutil
import subprocess
import sys
import urllib.parse
import zipfile
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
DEMO = os.path.join(RAIZ, "demo")
SITE = os.path.join(DEMO, "site")
SAIDA = os.path.join(DEMO, "_saida")
PACOTES = os.path.join(DEMO, "_pacotes")
VERSAO = os.path.join(DEMO, "versao.json")
REGISTO = os.path.join(DEMO, "REGISTO.md")

ESTADOS = {"preparacao-tecnica", "rascunho", "aprovado", "rejeitado"}
HOSTS_EXTERNOS_PERMITIDOS = {"fonts.googleapis.com", "fonts.gstatic.com"}
VAZIOS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}


# ---------- utilidades ----------

def ler_versao():
    with open(VERSAO, encoding="utf-8") as f:
        return json.load(f)


def git(*args):
    try:
        return subprocess.run(["git", *args], cwd=RAIZ, capture_output=True, text=True, check=True).stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return ""


def commit_atual():
    completo = git("rev-parse", "HEAD")
    sujo = bool(git("status", "--porcelain", "--", "demo"))
    return completo, sujo


def versao_js(v, carimbar, fixa=False):
    dados = dict(v)
    dados["ligacao_fixa"] = bool(fixa)
    if carimbar:
        completo, sujo = commit_atual()
        dados["site_commit"] = completo[:12] if completo else None
        dados["site_commit_completo"] = completo or None
        dados["site_sujo"] = sujo
        dados["construido_em"] = datetime.now(timezone.utc).replace(microsecond=0).isoformat()
    else:
        dados["site_commit"] = None
        dados["site_sujo"] = False
        dados["construido_em"] = None
    corpo = json.dumps(dados, ensure_ascii=False, indent=2)
    return "/* GERADO por demo/ferramentas/demo.py a partir de demo/versao.json. Não editar à mão. */\nwindow.DEMO_VERSAO = " + corpo + ";\n"


# ---------- testar ----------

class Analisador(html.parser.HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.pilha = []
        self.erros = []
        self.titulo = False
        self.lang = None
        self.metas = {}
        self.refs = []
        self.h1 = 0
        self.ids = []
        self.em_titulo = False
        self.titulo_texto = ""

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = a.get("lang")
        if tag == "meta" and a.get("name"):
            self.metas[a["name"]] = a.get("content", "")
        if tag == "title":
            self.titulo = True
            self.em_titulo = True
        if tag == "h1":
            self.h1 += 1
        if "id" in a:
            self.ids.append(a["id"])
        for chave in ("href", "src"):
            if a.get(chave):
                self.refs.append((tag, a[chave], self.getpos()[0]))
        if tag not in VAZIOS:
            self.pilha.append((tag, self.getpos()[0]))

    def handle_endtag(self, tag):
        if tag == "title":
            self.em_titulo = False
        if tag in VAZIOS:
            return
        if self.pilha and self.pilha[-1][0] == tag:
            self.pilha.pop()
        else:
            abertos = [t for t, _ in self.pilha]
            if tag in abertos:
                while self.pilha and self.pilha[-1][0] != tag:
                    t, linha = self.pilha.pop()
                    self.erros.append(f"linha {linha}: <{t}> fechado implicitamente por </{tag}>")
                self.pilha.pop()
            else:
                self.erros.append(f"linha {self.getpos()[0]}: </{tag}> sem abertura")

    def handle_data(self, data):
        if self.em_titulo:
            self.titulo_texto += data

    def fim(self):
        for t, linha in self.pilha:
            self.erros.append(f"linha {linha}: <{t}> nunca fechado")


def verificar_pagina(caminho, v, falhas, avisos):
    nome = os.path.relpath(caminho, SITE)
    with open(caminho, encoding="utf-8") as f:
        texto = f.read()
    if not texto.lstrip().lower().startswith("<!doctype html>"):
        falhas.append(f"{nome}: falta <!doctype html>")
    p = Analisador()
    p.feed(texto)
    p.fim()
    for e in p.erros:
        falhas.append(f"{nome}: {e}")
    if p.lang not in ("pt", "pt-PT") and not nome.startswith("en/"):
        falhas.append(f"{nome}: <html lang> devia ser «pt» ou «pt-PT» (está {p.lang!r})")
    if not p.titulo or not p.titulo_texto.strip():
        falhas.append(f"{nome}: sem <title>")
    if "viewport" not in p.metas:
        falhas.append(f"{nome}: sem meta viewport")
    robots = p.metas.get("robots", "")
    if "noindex" not in robots:
        falhas.append(f"{nome}: a demo tem de levar <meta name=\"robots\" content=\"noindex, nofollow\">")
    if p.h1 != 1:
        falhas.append(f"{nome}: {p.h1} <h1> (devia ser 1)")
    repetidos = {i for i in p.ids if p.ids.count(i) > 1}
    if repetidos:
        falhas.append(f"{nome}: ids repetidos {sorted(repetidos)}")
    for tag, ref, linha in p.refs:
        u = urllib.parse.urlsplit(ref)
        if u.scheme in ("http", "https"):
            if u.netloc not in HOSTS_EXTERNOS_PERMITIDOS:
                falhas.append(f"{nome} linha {linha}: recurso externo não permitido {ref}")
            continue
        if u.scheme in ("mailto", "tel") or ref.startswith("#"):
            continue
        alvo = os.path.normpath(os.path.join(os.path.dirname(caminho), u.path))
        if not os.path.exists(alvo):
            falhas.append(f"{nome} linha {linha}: {tag} aponta para ficheiro inexistente {ref}")
        if u.fragment and alvo.endswith(".html") and os.path.exists(alvo):
            with open(alvo, encoding="utf-8") as f2:
                if f'id="{u.fragment}"' not in f2.read():
                    falhas.append(f"{nome} linha {linha}: âncora #{u.fragment} não existe em {u.path}")
    # texto que não devia aparecer na demo
    for proibido in ("lorem ipsum", "disponível para reserva", "reserva confirmada"):
        if proibido in texto.lower():
            falhas.append(f"{nome}: contém «{proibido}»")


def testar(verboso=True):
    falhas, avisos = [], []
    v = ler_versao()
    # versao.json
    for chave in ("revisao", "estado", "data", "titulo", "design", "paginas"):
        if chave not in v:
            falhas.append(f"versao.json: falta «{chave}»")
    if not re.fullmatch(r"r\d+", str(v.get("revisao", ""))):
        falhas.append("versao.json: «revisao» devia ser r0, r1, …")
    if v.get("estado") not in ESTADOS:
        falhas.append(f"versao.json: «estado» {v.get('estado')!r} fora de {sorted(ESTADOS)}")
    for pag, est in (v.get("paginas") or {}).items():
        if est not in ESTADOS:
            falhas.append(f"versao.json: página {pag} com estado {est!r} fora de {sorted(ESTADOS)}")
        if not os.path.exists(os.path.join(SITE, pag)):
            falhas.append(f"versao.json: página {pag} não existe em demo/site")
    if v.get("estado") in ("rascunho", "aprovado") and not (v.get("design") or {}).get("commit"):
        falhas.append("versao.json: estado rascunho/aprovado exige «design.commit»")
    # histórico (S29): a revisão atual tem de estar no histórico; as anteriores com commit e ligação
    hist = v.get("historico") or []
    revs = [h.get("revisao") for h in hist]
    if v.get("revisao") not in revs:
        falhas.append("versao.json: a revisão atual não está em «historico»")
    for h in hist:
        if h.get("estado") not in ESTADOS:
            falhas.append(f"versao.json: histórico {h.get('revisao')} com estado {h.get('estado')!r} inválido")
        if h.get("revisao") != v.get("revisao") and not (h.get("site_commit") and h.get("endereco")):
            falhas.append(f"versao.json: histórico {h.get('revisao')} sem «site_commit» ou «endereco»")
    if os.path.exists(REGISTO):
        texto_registo = open(REGISTO, encoding="utf-8").read()
        for h in hist:
            if f"| {h.get('revisao')} |" not in texto_registo:
                falhas.append(f"REGISTO.md: sem linha para {h.get('revisao')} do histórico")
    # REGISTO.md menciona a revisão
    if os.path.exists(REGISTO):
        with open(REGISTO, encoding="utf-8") as f:
            if f"| {v.get('revisao')} |" not in f.read():
                falhas.append(f"REGISTO.md: sem linha para a revisão {v.get('revisao')}")
    else:
        falhas.append("demo/REGISTO.md não existe")
    # versao.js versionado tem de corresponder a versao.json (sem carimbo)
    vjs = os.path.join(SITE, "versao.js")
    if not os.path.exists(vjs) or open(vjs, encoding="utf-8").read() != versao_js(v, carimbar=False):
        falhas.append("demo/site/versao.js desatualizado: correr «demo.py construir»")
    # páginas
    paginas = []
    for pasta, _, ficheiros in os.walk(SITE):
        for f in ficheiros:
            if f.endswith(".html"):
                paginas.append(os.path.join(pasta, f))
    if not paginas:
        falhas.append("demo/site sem páginas HTML")
    for pag in sorted(paginas):
        verificar_pagina(pag, v, falhas, avisos)
    for pag in paginas:
        rel = os.path.relpath(pag, SITE)
        if rel not in (v.get("paginas") or {}):
            falhas.append(f"versao.json: página {rel} existe mas não está listada em «paginas»")
    # imagens em demo/site: cada uma com origem em demo/imagens.json e o original citado no creditos.md
    creditos = os.path.join(RAIZ, "docs", "fotografia", "creditos.md")
    texto_creditos = open(creditos, encoding="utf-8").read() if os.path.exists(creditos) else ""
    mapa_imagens = os.path.join(DEMO, "imagens.json")
    mapa = json.load(open(mapa_imagens, encoding="utf-8")) if os.path.exists(mapa_imagens) else {}
    for pasta, _, ficheiros in os.walk(SITE):
        for f in ficheiros:
            if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp", ".avif")):
                rel = os.path.relpath(os.path.join(pasta, f), SITE)
                entrada = mapa.get(rel)
                if not entrada:
                    falhas.append(f"imagem {rel} em demo/site sem entrada em demo/imagens.json")
                    continue
                origem = os.path.join(RAIZ, entrada.get("ficheiro_repo", ""))
                if not os.path.exists(origem):
                    falhas.append(f"imagem {rel}: «ficheiro_repo» {entrada.get('ficheiro_repo')} não existe")
                elif open(origem, "rb").read() != open(os.path.join(pasta, f), "rb").read():
                    falhas.append(f"imagem {rel}: difere de {entrada.get('ficheiro_repo')} (a demo não retoca imagens)")
                original = entrada.get("original", "")
                if original and original not in texto_creditos:
                    falhas.append(f"imagem {rel}: original {original} sem linha em docs/fotografia/creditos.md")
                if not entrada.get("autorizacao_publica"):
                    avisos.append(f"imagem {rel}: sem autorização pública registada (serve só na demo privada)")
    # sintaxe JS: só se houver node
    if shutil.which("node"):
        for pasta, _, ficheiros in os.walk(SITE):
            for f in ficheiros:
                if f.endswith(".js"):
                    r = subprocess.run(["node", "--check", os.path.join(pasta, f)], capture_output=True, text=True)
                    if r.returncode:
                        falhas.append(f"{f}: erro de sintaxe JS\n{r.stderr.strip()}")
    else:
        avisos.append("node não encontrado: sintaxe JS não verificada")
    if verboso:
        print(f"Páginas verificadas: {len(paginas)}")
        for a in avisos:
            print("AVISO:", a)
        for f in falhas:
            print("FALHA:", f)
        print("RESULTADO:", "OK" if not falhas else f"{len(falhas)} falha(s)")
    return not falhas


# ---------- construir ----------

def construir():
    v = ler_versao()
    with open(os.path.join(SITE, "versao.js"), "w", encoding="utf-8") as f:
        f.write(versao_js(v, carimbar=False))
    # limpa _saida/ mas conserva capturas/ e artefacto*/ da execução anterior
    if os.path.isdir(SAIDA):
        for nome in os.listdir(SAIDA):
            if nome != "capturas" and not nome.startswith("artefacto"):
                alvo = os.path.join(SAIDA, nome)
                shutil.rmtree(alvo) if os.path.isdir(alvo) else os.remove(alvo)
    shutil.copytree(SITE, SAIDA, dirs_exist_ok=True)
    with open(os.path.join(SAIDA, "versao.js"), "w", encoding="utf-8") as f:
        f.write(versao_js(v, carimbar=True))
    completo, sujo = commit_atual()
    print(f"Construído demo/_saida/ · revisão {v['revisao']} · commit {completo[:12] or '?'}{' (sujo)' if sujo else ''}")
    return v


# ---------- servir ----------

class Servidor(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=SAIDA, **k)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Robots-Tag", "noindex, nofollow")
        super().end_headers()

    def log_message(self, fmt, *args):
        sys.stderr.write("%s %s\n" % (self.address_string(), fmt % args))


def servir(porta):
    construir()
    with ThreadingHTTPServer(("127.0.0.1", porta), Servidor) as s:
        print(f"A servir demo/_saida/ em http://127.0.0.1:{porta}/  (Ctrl-C para parar)")
        try:
            s.serve_forever()
        except KeyboardInterrupt:
            pass


# ---------- empacotar ----------

def empacotar():
    v = construir()
    completo, _ = commit_atual()
    os.makedirs(PACOTES, exist_ok=True)
    nome = f"demo-{v['revisao']}-{completo[:7] or 'local'}.zip"
    caminho = os.path.join(PACOTES, nome)
    with zipfile.ZipFile(caminho, "w", zipfile.ZIP_DEFLATED) as z:
        for pasta, _, ficheiros in os.walk(SAIDA):
            for f in ficheiros:
                p = os.path.join(pasta, f)
                z.write(p, os.path.relpath(p, SAIDA))
    print("Pacote:", os.path.relpath(caminho, RAIZ))
    return caminho


# ---------- artefacto (variante para a página privada do claude.ai) ----------

def artefacto(fixa=False):
    """A página do claude.ai embrulha o ficheiro num esqueleto próprio; por isso a
    entrada é entregue como fragmento (título, metas e corpo) e as restantes
    páginas como ficheiros completos. Com fixa=True gera a variante da ligação
    própria da revisão (S29): pasta artefacto-<rev>, título com a revisão e
    versao.js com ligacao_fixa."""
    v = construir()
    destino = os.path.join(SAIDA, "artefacto-" + v["revisao"] if fixa else "artefacto")
    if os.path.isdir(destino):
        shutil.rmtree(destino)
    shutil.copytree(SAIDA, destino, ignore=shutil.ignore_patterns("artefacto*", "capturas"))
    with open(os.path.join(destino, "versao.js"), "w", encoding="utf-8") as f:
        f.write(versao_js(v, carimbar=True, fixa=fixa))
    entrada = os.path.join(destino, "index.html")
    texto = open(entrada, encoding="utf-8").read()
    titulo = re.search(r"<title>(.*?)</title>", texto, re.S).group(1)
    if fixa:
        titulo = "Monte Casa Branca · demo " + v["revisao"]
    cabeca = re.search(r"<head>(.*?)</head>", texto, re.S).group(1)
    corpo = re.search(r"<body>(.*?)</body>", texto, re.S).group(1)
    links = "\n".join(l for l in cabeca.splitlines() if "<link" in l or 'name="robots"' in l)
    fragmento = (f"<title>{titulo}</title>\n<meta name=\"claude:viewport-fit-sides\" content=\"cover\">\n{links}\n{corpo}")
    with open(entrada, "w", encoding="utf-8") as f:
        f.write(fragmento)
    print(f"Variante para artefacto em {os.path.relpath(destino, RAIZ)}/ (index.html como fragmento{', ligação fixa ' + v['revisao'] if fixa else ''})")


# ---------- principal ----------

def principal(argv):
    if len(argv) < 2 or argv[1] in ("-h", "--help"):
        print(__doc__)
        return 0
    cmd = argv[1]
    if cmd == "testar":
        return 0 if testar() else 1
    if cmd == "construir":
        construir(); return 0
    if cmd == "servir":
        porta = int(argv[2]) if len(argv) > 2 else 8787
        servir(porta); return 0
    if cmd == "empacotar":
        empacotar(); return 0
    if cmd == "artefacto":
        artefacto(fixa="--fixa" in argv[2:]); return 0
    print("comando desconhecido:", cmd)
    print(__doc__)
    return 2


if __name__ == "__main__":
    sys.exit(principal(sys.argv))
