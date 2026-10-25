#!/usr/bin/env python3
"""Ferramenta da demo do Monte Casa Branca (Python 3, só biblioteca padrão).

    python3 demo/ferramentas/demo.py testar            verifica demo/site, demo/versao.json e a base sincronizada
    python3 demo/ferramentas/demo.py testar --design   verifica as páginas do ChatGPT em design/site contra o contrato (demo/base/CONTRATO.md)
    python3 demo/ferramentas/demo.py montar [--rev rN] [--titulo "…"] [--limpar] [--para pasta]
                                                        junta design/site + kit (demo/base) em demo/site (ou em «pasta», ensaio sem tocar na demo)
    python3 demo/ferramentas/demo.py revisao rN [--titulo "…"] [--porta 8789]
                                                        S35: montar --limpar --rev rN, testar, capturas jpg, artefacto e artefacto --fixa, num só comando
    python3 demo/ferramentas/demo.py construir         gera demo/_saida/ com o commit carimbado (e sincroniza demo/site/base)
    python3 demo/ferramentas/demo.py servir [porta] [--pasta p]   constrói e serve em http://127.0.0.1:8787 (ou serve «p» tal como está)
    python3 demo/ferramentas/demo.py empacotar         constrói e cria demo/_pacotes/demo-<rev>-<commit>.zip
    python3 demo/ferramentas/demo.py artefacto         constrói e gera demo/_saida/artefacto/ (variante para o claude.ai, ligação «mais recente»)
    python3 demo/ferramentas/demo.py artefacto --fixa  idem em demo/_saida/artefacto-<rev>/ (ligação fixa da revisão, S29)

Nada aqui toca em public/, src/, docs/ ou na app; de design/ só LÊ (design/site é do ChatGPT).
_saida/ e _pacotes/ são gerados e não se versionam. demo/site/base/ é gerado a partir de
demo/base/ (kit + dados) e versiona-se; o teste falha se estiver dessincronizado.
"""
import html.parser
import json
import os
import re
import shutil
import subprocess
import sys
import threading
import urllib.parse
import zipfile
from datetime import date, datetime, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
DEMO = os.path.join(RAIZ, "demo")
SITE = os.path.join(DEMO, "site")
SAIDA = os.path.join(DEMO, "_saida")
PACOTES = os.path.join(DEMO, "_pacotes")
VERSAO = os.path.join(DEMO, "versao.json")
REGISTO = os.path.join(DEMO, "REGISTO.md")
IMAGENS_JSON = os.path.join(DEMO, "imagens.json")
BASE = os.path.join(DEMO, "base")
KIT = os.path.join(BASE, "kit")
DADOS = os.path.join(BASE, "dados")
SITE_BASE = os.path.join(SITE, "base")
DESIGN_SITE = os.path.join(RAIZ, "design", "site")

ESTADOS = {"preparacao-tecnica", "rascunho", "aprovado", "rejeitado"}
HOSTS_EXTERNOS_PERMITIDOS = {"fonts.googleapis.com", "fonts.gstatic.com"}
# S34 (25/10): as ligações das plataformas vêm de demo/base/dados/factos.json («ligacoes»); na página escreve-se data-liga="…"
DOMINIOS_LIGA = {"airbnb": r"(^|\.)airbnb\.", "booking": r"(^|\.)booking\.com$", "vrbo": r"(^|\.)vrbo\.", "instagram": r"(^|\.)instagram\.com$"}


def ligacoes_oficiais():
    try:
        return json.load(open(os.path.join(DADOS, "factos.json"), encoding="utf-8")).get("ligacoes") or {}
    except (OSError, ValueError):
        return {}
VAZIOS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}
# nomes que pertencem à demo (Claude); o ChatGPT não os usa em design/site
RESERVADOS = {"revisao.html", "revisoes.html", "componentes.html", "desktop.html", "estilos.css", "demo.js", "versao.js", "base"}
# «imagens.json» NÃO é reservado em design/site: é o manifesto de origem que o contrato pede ao ChatGPT (secção 1); o montar
# lê-o e não o copia para demo/site (a demo tem o seu em demo/imagens.json). Até 25/10 estava nesta lista por engano e fazia
# o testar --design e o montar recusar uma entrega conforme (apontado pelo ChatGPT no handoff V1 de 24/10).
TECNICAS = {"revisao.html": "preparacao-tecnica", "revisoes.html": "preparacao-tecnica",
            "componentes.html": "preparacao-tecnica", "desktop.html": "preparacao-tecnica"}
ENCAIXES = {"tempo", "calendario", "simulador", "pedido", "antes-depois"}
EXTENSOES_DESIGN = {".html", ".css", ".js", ".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg", ".woff", ".woff2", ".json", ".md", ".txt", ".ico"}
IMAGENS_EXT = (".jpg", ".jpeg", ".png", ".webp", ".avif")
FACTOS_PROIBIDOS = [
    (re.compile(r"962\s*800\s*626"), "telefone errado («962 800 626»); o certo é +351 962 802 626 (FACTOS.md)"),
    (re.compile(r"\b3,[26]\s*(ha|hectares?)\b|\bhectares?\b", re.I), "área do terreno (3,2 / 3,6 ha) não harmonizada: não entra até o Diogo decidir (FACTOS.md)"),
]
TEXTOS_PROIBIDOS = ("lorem ipsum", "disponível para reserva", "reserva confirmada")


# ---------- utilidades ----------

def ler_versao():
    with open(VERSAO, encoding="utf-8") as f:
        return json.load(f)


def gravar_versao(v):
    with open(VERSAO, "w", encoding="utf-8") as f:
        json.dump(v, f, ensure_ascii=False, indent=2)
        f.write("\n")


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


def ler(caminho):
    with open(caminho, encoding="utf-8") as f:
        return f.read()


def escrever(caminho, texto):
    os.makedirs(os.path.dirname(caminho), exist_ok=True)
    with open(caminho, "w", encoding="utf-8") as f:
        f.write(texto)


# ---------- base (kit + dados) → demo/site/base ----------

def dados_js():
    """window.MCB_DADOS com todos os JSON de demo/base/dados, para o kit funcionar do ficheiro (sem fetch)."""
    conj = {}
    for f in sorted(os.listdir(DADOS)):
        if f.endswith(".json"):
            conj[f[:-5]] = json.load(open(os.path.join(DADOS, f), encoding="utf-8"))
    corpo = json.dumps(conj, ensure_ascii=False, indent=1, sort_keys=True)
    return "/* GERADO por demo/ferramentas/demo.py a partir de demo/base/dados/*.json. Não editar à mão. */\nwindow.MCB_DADOS = " + corpo + ";\n"


def base_esperada():
    """{caminho relativo em demo/site/base: conteúdo em bytes}"""
    esperado = {}
    for f in sorted(os.listdir(KIT)):
        esperado[f] = open(os.path.join(KIT, f), "rb").read()
    for f in sorted(os.listdir(DADOS)):
        if f.endswith(".json"):
            esperado["dados/" + f] = open(os.path.join(DADOS, f), "rb").read()
    esperado["dados.js"] = dados_js().encode("utf-8")
    return esperado


def sincronizar_base():
    esperado = base_esperada()
    for rel, conteudo in esperado.items():
        destino = os.path.join(SITE_BASE, rel)
        os.makedirs(os.path.dirname(destino), exist_ok=True)
        with open(destino, "wb") as f:
            f.write(conteudo)
    for pasta, _, ficheiros in os.walk(SITE_BASE):
        for f in ficheiros:
            rel = os.path.relpath(os.path.join(pasta, f), SITE_BASE).replace(os.sep, "/")
            if rel not in esperado:
                os.remove(os.path.join(pasta, f))
    return sorted(esperado)


def verificar_base(falhas):
    if not os.path.isdir(SITE_BASE):
        falhas.append("demo/site/base não existe: correr «demo.py construir»")
        return
    esperado = base_esperada()
    for rel, conteudo in esperado.items():
        p = os.path.join(SITE_BASE, rel)
        if not os.path.exists(p) or open(p, "rb").read() != conteudo:
            falhas.append(f"demo/site/base/{rel} dessincronizado de demo/base: correr «demo.py construir»")
    for pasta, _, ficheiros in os.walk(SITE_BASE):
        for f in ficheiros:
            rel = os.path.relpath(os.path.join(pasta, f), SITE_BASE).replace(os.sep, "/")
            if rel not in esperado:
                falhas.append(f"demo/site/base/{rel} não vem de demo/base (apagar ou correr «demo.py construir»)")


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
        self.ligas = []         # (href, data-liga, linha) de cada <a>
        self.encaixes = []      # (tipo, linha, profundidade ao abrir)
        self._abertos = []      # encaixes ainda abertos: [tipo, linha, profundidade, tem_conteudo]
        self.texto = []

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
        if tag == "a" and (a.get("href") or a.get("data-liga") is not None):
            self.ligas.append((a.get("href") or "", a.get("data-liga"), self.getpos()[0]))
        for ab in self._abertos:
            ab[3] = True
        if a.get("data-base") is not None:
            self._abertos.append([a.get("data-base"), self.getpos()[0], len(self.pilha), False])
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
        while self._abertos and self._abertos[-1][2] >= len(self.pilha):
            tipo, linha, _, conteudo = self._abertos.pop()
            self.encaixes.append((tipo, linha, conteudo))

    def handle_data(self, data):
        if self.em_titulo:
            self.titulo_texto += data
        if data.strip():
            self.texto.append(data)
            for ab in self._abertos:
                ab[3] = True

    def fim(self):
        for t, linha in self.pilha:
            self.erros.append(f"linha {linha}: <{t}> nunca fechado")
        while self._abertos:
            tipo, linha, _, conteudo = self._abertos.pop()
            self.encaixes.append((tipo, linha, conteudo))


def verificar_pagina(caminho, raiz_paginas, falhas, avisos, exigir_noindex=True):
    nome = os.path.relpath(caminho, raiz_paginas)
    texto = ler(caminho)
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
    if exigir_noindex and "noindex" not in p.metas.get("robots", ""):
        falhas.append(f"{nome}: a demo tem de levar <meta name=\"robots\" content=\"noindex, nofollow\">")
    if p.h1 != 1:
        falhas.append(f"{nome}: {p.h1} <h1> (devia ser 1)")
    repetidos = {i for i in p.ids if p.ids.count(i) > 1}
    if repetidos:
        falhas.append(f"{nome}: ids repetidos {sorted(repetidos)}")
    if "</body>" not in texto.lower() or "</head>" not in texto.lower():
        falhas.append(f"{nome}: precisa de </head> e </body> explícitos (a demo injeta aí o kit)")
    for tag, ref, linha in p.refs:
        u = urllib.parse.urlsplit(ref)
        if u.scheme in ("http", "https"):
            if u.netloc not in HOSTS_EXTERNOS_PERMITIDOS and tag in ("link", "script", "img", "source", "iframe"):
                falhas.append(f"{nome} linha {linha}: recurso externo não permitido {ref}")
            continue
        if u.scheme in ("mailto", "tel") or ref.startswith("#") or ref.startswith("data:"):
            continue
        alvo = os.path.normpath(os.path.join(os.path.dirname(caminho), u.path))
        if not os.path.exists(alvo):
            falhas.append(f"{nome} linha {linha}: {tag} aponta para ficheiro inexistente {ref}")
        if u.fragment and alvo.endswith(".html") and os.path.exists(alvo):
            if f'id="{u.fragment}"' not in ler(alvo):
                falhas.append(f"{nome} linha {linha}: âncora #{u.fragment} não existe em {u.path}")
    # ligações das plataformas (S34): oficiais em factos.json; na página usa-se data-liga="…" (CONTRATO §3.6)
    oficiais = ligacoes_oficiais()
    for href, liga, linha in p.ligas:
        chave = liga
        if not chave and href.startswith(("http://", "https://")):
            anf = urllib.parse.urlsplit(href).netloc.lower()
            chave = next((c for c, padrao in DOMINIOS_LIGA.items() if re.search(padrao, anf)), None)
            if chave:
                avisos.append(f"{nome} linha {linha}: ligação de {chave} escrita à mão ({href}); usa data-liga=\"{chave}\" (CONTRATO §3.6); na demo o kit põe a oficial")
            continue
        if chave:
            oficial = oficiais.get(chave)
            if not oficial:
                avisos.append(f"{nome} linha {linha}: data-liga=\"{chave}\" não existe em factos.json (há {sorted(oficiais)})")
            elif href and href != oficial:
                avisos.append(f"{nome} linha {linha}: data-liga=\"{chave}\" com href diferente do oficial; o kit substitui por {oficial}")
    # contrato dos encaixes (demo/base/CONTRATO.md)
    for tipo, linha, conteudo in p.encaixes:
        if tipo not in ENCAIXES:
            falhas.append(f"{nome} linha {linha}: data-base=\"{tipo}\" desconhecido (há {sorted(ENCAIXES)})")
        elif not conteudo and tipo != "antes-depois":
            avisos.append(f"{nome} linha {linha}: encaixe «{tipo}» sem conteúdo de exemplo (a página fica com um buraco quando o kit não está)")
    tipos = {t for t, _, _ in p.encaixes}
    texto_visivel = " ".join(p.texto)
    if "tempo" in tipos and "Open-Meteo" not in texto_visivel:
        falhas.append(f"{nome}: o encaixe «tempo» exige a linha «Dados: Open-Meteo» no exemplo (licença da fonte)")
    # factos
    for padrao, motivo in FACTOS_PROIBIDOS:
        m = padrao.search(texto_visivel)
        if m:
            falhas.append(f"{nome}: «{m.group(0)}» · {motivo}")
    if "[?]" in texto_visivel:
        avisos.append(f"{nome}: tem factos marcados «[?]» (por confirmar); não passam à produção assim")
    baixo = texto.lower()
    for proibido in TEXTOS_PROIBIDOS:
        if proibido in baixo:
            falhas.append(f"{nome}: contém «{proibido}»")


def verificar_js(pasta, falhas, avisos):
    if not shutil.which("node"):
        avisos.append("node não encontrado: sintaxe JS não verificada")
        return
    for raiz_, _, ficheiros in os.walk(pasta):
        for f in ficheiros:
            if f.endswith(".js"):
                r = subprocess.run(["node", "--check", os.path.join(raiz_, f)], capture_output=True, text=True)
                if r.returncode:
                    falhas.append(f"{os.path.relpath(os.path.join(raiz_, f), RAIZ)}: erro de sintaxe JS\n{r.stderr.strip()}")


def testar(verboso=True):
    falhas, avisos = [], []
    v = ler_versao()
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
        texto_registo = ler(REGISTO)
        for h in hist:
            if f"| {h.get('revisao')} |" not in texto_registo:
                falhas.append(f"REGISTO.md: sem linha para {h.get('revisao')} do histórico")
        if f"| {v.get('revisao')} |" not in texto_registo:
            falhas.append(f"REGISTO.md: sem linha para a revisão {v.get('revisao')}")
    else:
        falhas.append("demo/REGISTO.md não existe")
    vjs = os.path.join(SITE, "versao.js")
    if not os.path.exists(vjs) or ler(vjs) != versao_js(v, carimbar=False):
        falhas.append("demo/site/versao.js desatualizado: correr «demo.py construir»")
    verificar_base(falhas)
    paginas = []
    for pasta, _, ficheiros in os.walk(SITE):
        for f in ficheiros:
            if f.endswith(".html"):
                paginas.append(os.path.join(pasta, f))
    if not paginas:
        falhas.append("demo/site sem páginas HTML")
    for pag in sorted(paginas):
        verificar_pagina(pag, SITE, falhas, avisos, exigir_noindex=True)
    for pag in paginas:
        rel = os.path.relpath(pag, SITE)
        if rel not in (v.get("paginas") or {}):
            falhas.append(f"versao.json: página {rel} existe mas não está listada em «paginas»")
    # imagens em demo/site: cada uma com origem em demo/imagens.json e o original citado no creditos.md
    creditos = os.path.join(RAIZ, "docs", "fotografia", "creditos.md")
    texto_creditos = ler(creditos) if os.path.exists(creditos) else ""
    mapa = json.load(open(IMAGENS_JSON, encoding="utf-8")) if os.path.exists(IMAGENS_JSON) else {}
    for pasta, _, ficheiros in os.walk(SITE):
        for f in ficheiros:
            if f.lower().endswith(IMAGENS_EXT):
                rel = os.path.relpath(os.path.join(pasta, f), SITE).replace(os.sep, "/")
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
                if not original:
                    avisos.append(f"imagem {rel}: sem origem declarada (o ChatGPT indica-a em design/site/imagens.json)")
                elif original not in texto_creditos:
                    # a demo é privada: a linha no creditos.md é a conformidade 8 (ChatGPT: ficheiro e zona; Diogo: autorização)
                    # e só trava a publicação em public/ (testes.mjs), não a revisão da demo. Até 25/10 era falha aqui por engano.
                    avisos.append(f"imagem {rel}: original «{original}» sem linha em docs/fotografia/creditos.md (conformidade 8; não trava a demo)")
                if not entrada.get("autorizacao_publica"):
                    avisos.append(f"imagem {rel}: sem autorização pública registada (serve só na demo privada)")
    verificar_js(SITE, falhas, avisos)
    if verboso:
        print(f"Páginas verificadas: {len(paginas)}")
        for a in avisos:
            print("AVISO:", a)
        for f in falhas:
            print("FALHA:", f)
        print("RESULTADO:", "OK" if not falhas else f"{len(falhas)} falha(s)")
    return not falhas


def paginas_design():
    if not os.path.isdir(DESIGN_SITE):
        return []
    return sorted(f for f in os.listdir(DESIGN_SITE) if f.endswith(".html"))


def testar_design(verboso=True):
    """As páginas do ChatGPT em design/site contra o contrato, sem tocar na demo."""
    falhas, avisos = [], []
    pags = paginas_design()
    if not os.path.isdir(DESIGN_SITE):
        falhas.append("design/site não existe (é aí que o ChatGPT põe as páginas; ver demo/base/CONTRATO.md)")
    elif not pags:
        falhas.append("design/site sem páginas .html")
    for f in os.listdir(DESIGN_SITE) if os.path.isdir(DESIGN_SITE) else []:
        if f in RESERVADOS:
            falhas.append(f"design/site/{f}: nome reservado à demo (ver CONTRATO.md); escolhe outro nome")
        if f.endswith(".html") and not re.fullmatch(r"[a-z0-9-]+\.html", f):
            avisos.append(f"design/site/{f}: usa só minúsculas, dígitos e hífen no nome das páginas")
    if "index.html" not in pags and pags:
        falhas.append("design/site sem index.html (a página de entrada tem de se chamar index.html)")
    for pag in pags:
        verificar_pagina(os.path.join(DESIGN_SITE, pag), DESIGN_SITE, falhas, avisos, exigir_noindex=False)
    mapa_img = {}
    mj = os.path.join(DESIGN_SITE, "imagens.json")
    if os.path.exists(mj):
        try:
            mapa_img = json.load(open(mj, encoding="utf-8"))
        except ValueError as e:
            falhas.append(f"design/site/imagens.json inválido: {e}")
    for pasta, _, ficheiros in os.walk(DESIGN_SITE):
        if os.path.basename(pasta) == "base":
            continue
        for f in ficheiros:
            rel = os.path.relpath(os.path.join(pasta, f), DESIGN_SITE).replace(os.sep, "/")
            ext = os.path.splitext(f)[1].lower()
            if ext not in EXTENSOES_DESIGN:
                avisos.append(f"design/site/{rel}: extensão fora da lista do contrato; não é copiada para a demo")
            if ext in IMAGENS_EXT and rel not in mapa_img and os.path.basename(rel) not in mapa_img:
                avisos.append(f"design/site/{rel}: imagem sem entrada em design/site/imagens.json (origem, autor)")
    verificar_js(DESIGN_SITE, falhas, avisos)
    if verboso:
        print(f"Páginas do design verificadas: {len(pags)}")
        for a in avisos:
            print("AVISO:", a)
        for f in falhas:
            print("FALHA:", f)
        print("RESULTADO:", "OK" if not falhas else f"{len(falhas)} falha(s)")
    return not falhas


# ---------- montar: design/site + kit → demo/site ----------

INJECAO_HEAD = '<link rel="stylesheet" href="base/base.css">'
INJECAO_BODY = ('<script src="versao.js"></script>\n<script src="demo.js"></script>\n'
                '<script src="base/dados.js"></script>\n<script src="base/base.js" defer></script>')
META_ROBOTS = '<meta name="robots" content="noindex, nofollow">'


def injetar(texto):
    """Mete na página do ChatGPT o que a demo precisa, sem tocar no resto. Idempotente."""
    if 'name="robots"' not in texto:
        if re.search(r"<meta charset[^>]*>", texto, re.I):
            texto = re.sub(r"(<meta charset[^>]*>)", lambda m: m.group(1) + "\n" + META_ROBOTS, texto, count=1, flags=re.I)
        else:
            texto = texto.replace("</head>", META_ROBOTS + "\n</head>", 1)
    if "base/base.css" not in texto:
        texto = texto.replace("</head>", INJECAO_HEAD + "\n</head>", 1)
    if "base/base.js" not in texto:
        texto = texto.replace("</body>", INJECAO_BODY + "\n</body>", 1)
    return texto


def montar(argv):
    rev = titulo = para = None
    limpar = False
    i = 0
    while i < len(argv):
        a = argv[i]
        if a == "--rev" and i + 1 < len(argv):
            rev = argv[i + 1]; i += 1
        elif a == "--titulo" and i + 1 < len(argv):
            titulo = argv[i + 1]; i += 1
        elif a == "--para" and i + 1 < len(argv):
            para = os.path.abspath(argv[i + 1]); i += 1
        elif a == "--limpar":
            limpar = True
        else:
            print("opção desconhecida em montar:", a); return 2
        i += 1
    if rev and not re.fullmatch(r"r\d+", rev):
        print("--rev devia ser r2, r3, …"); return 2
    pags = paginas_design()
    if not pags:
        print("design/site sem páginas .html: nada a montar (ver demo/base/CONTRATO.md)"); return 1
    for f in os.listdir(DESIGN_SITE):
        if f in RESERVADOS:
            print(f"FALHA: design/site/{f} usa um nome reservado à demo; não monto."); return 1
    destino = para or SITE
    ensaio = bool(para)
    if ensaio:
        if os.path.isdir(destino):
            shutil.rmtree(destino)
        os.makedirs(destino)
        for f in ("estilos.css", "demo.js", "revisao.html", "revisoes.html", "componentes.html", "desktop.html"):
            if os.path.exists(os.path.join(SITE, f)):
                shutil.copy2(os.path.join(SITE, f), os.path.join(destino, f))
    copiados, injetadas = [], []
    for pasta, pastas, ficheiros in os.walk(DESIGN_SITE):
        pastas[:] = [d for d in pastas if d != "base"]
        for f in ficheiros:
            origem = os.path.join(pasta, f)
            rel = os.path.relpath(origem, DESIGN_SITE).replace(os.sep, "/")
            ext = os.path.splitext(f)[1].lower()
            if ext not in EXTENSOES_DESIGN or rel in ("imagens.json", "LEIA-ME.md", "README.md"):
                continue
            alvo = os.path.join(destino, rel)
            os.makedirs(os.path.dirname(alvo), exist_ok=True)
            if ext == ".html":
                escrever(alvo, injetar(ler(origem)))
                injetadas.append(rel)
            else:
                shutil.copy2(origem, alvo)
            copiados.append(rel)
    # imagens do design: origem em design/site/imagens.json (opcional), entrada em demo/imagens.json
    mapa_design = {}
    mj = os.path.join(DESIGN_SITE, "imagens.json")
    if os.path.exists(mj):
        try:
            mapa_design = json.load(open(mj, encoding="utf-8"))
        except ValueError:
            mapa_design = {}
    if not ensaio:
        mapa = json.load(open(IMAGENS_JSON, encoding="utf-8")) if os.path.exists(IMAGENS_JSON) else {}
        for rel in copiados:
            if rel.lower().endswith(IMAGENS_EXT):
                info = mapa_design.get(rel) or mapa_design.get(os.path.basename(rel)) or {}
                existente = mapa.get(rel) or {}
                if existente.get("ficheiro_repo") != "design/site/" + rel or info:
                    mapa[rel] = {
                        "ficheiro_repo": "design/site/" + rel,
                        "original": info.get("original", existente.get("original", "")),
                        "autor": info.get("autor", existente.get("autor", "")),
                        "autorizacao_publica": bool(info.get("autorizacao_publica", existente.get("autorizacao_publica", False))),
                        "nota": "copiada de design/site pelo demo.py montar",
                    }
        removidos = []
        if limpar:
            manter = set(copiados) | set(RESERVADOS) | set(TECNICAS)
            for pasta, pastas, ficheiros in os.walk(SITE, topdown=True):
                pastas[:] = [d for d in pastas if d != "base"]
                for f in ficheiros:
                    rel = os.path.relpath(os.path.join(pasta, f), SITE).replace(os.sep, "/")
                    if rel not in manter and rel.split("/")[0] not in RESERVADOS:
                        os.remove(os.path.join(pasta, f)); removidos.append(rel)
                        mapa.pop(rel, None)
            for pasta, pastas, _ in os.walk(SITE, topdown=False):
                for d in pastas:
                    p = os.path.join(pasta, d)
                    if not os.listdir(p):
                        os.rmdir(p)
        with open(IMAGENS_JSON, "w", encoding="utf-8") as f:
            json.dump(mapa, f, ensure_ascii=False, indent=2); f.write("\n")
        # versao.json
        v = ler_versao()
        sha = git("log", "-1", "--format=%H", "--", "design/site") or None
        d = v.get("design") or {}
        v["design"] = {
            "entrega": f"design/site/ (ChatGPT) · {len(pags)} página(s) · commit {sha[:7] if sha else 'por fazer'}",
            "commit": sha,
            "estado": d.get("estado") or "rascunho, nenhuma aprovação estética",
            "ficheiros": copiados,
        }
        hoje = date.today().isoformat()
        if rev:
            v["revisao"] = rev; v["data"] = hoje; v["estado"] = "rascunho"
            v["titulo"] = titulo or f"design/site do ChatGPT ({len(pags)} páginas), rascunho para apreciação"
            hist = v.setdefault("historico", [])
            if rev not in [h.get("revisao") for h in hist]:
                hist.append({"revisao": rev, "data": hoje, "estado": "rascunho", "titulo": v["titulo"],
                             "design_commit": sha, "site_commit": None, "endereco": None})
            if os.path.exists(REGISTO) and f"| {rev} |" not in ler(REGISTO):
                linhas = ler(REGISTO).split("\n")
                idx = max(i for i, l in enumerate(linhas) if re.match(r"^\| r\d+ \|", l))
                linha = (f"| {rev} | {hoje} | **rascunho** | {v['titulo']} | design/site/ ({(sha or '')[:7]}) | "
                         f"commit «SITE · demo {rev}» | por publicar | `testar` e capturas por correr |")
                linhas.insert(idx + 1, linha)
                linhas.append(f"\n## {rev} · {hoje} · rascunho · design/site do ChatGPT\n\n- **Origem:** design/site/ (commit {(sha or '')[:7]}), montado por `demo.py montar`.\n- **Páginas:** {', '.join(pags)}.\n- **Validação:** por correr.\n")
                escrever(REGISTO, "\n".join(linhas))
        pagina_estados = {p: "rascunho" for p in pags}
        pagina_estados.update(TECNICAS)
        v["paginas"] = pagina_estados
        gravar_versao(v)
        sincronizar_base()
        escrever(os.path.join(SITE, "versao.js"), versao_js(v, carimbar=False))
        print(f"Montado em demo/site: {len(pags)} página(s) do design {pags}; {len(copiados)} ficheiro(s) copiados; kit injetado em {len(injetadas)}.")
        if removidos:
            print("Removidos (--limpar):", ", ".join(removidos))
        print(f"versao.json: revisão {v['revisao']} · design.commit {(sha or 'por fazer')[:7]} · correr «demo.py testar» e depois as capturas.")
    else:
        os.makedirs(os.path.join(destino, "base"), exist_ok=True)
        for rel, conteudo in base_esperada().items():
            p = os.path.join(destino, "base", rel); os.makedirs(os.path.dirname(p), exist_ok=True)
            open(p, "wb").write(conteudo)
        escrever(os.path.join(destino, "versao.js"), versao_js(ler_versao(), carimbar=True))
        print(f"Ensaio montado em {os.path.relpath(destino, RAIZ)}: {len(pags)} página(s) {pags}; a demo não foi tocada.")
        print("PAGINAS=" + ",".join(pags))
    return 0


# ---------- construir ----------

def construir():
    v = ler_versao()
    sincronizar_base()
    escrever(os.path.join(SITE, "versao.js"), versao_js(v, carimbar=False))
    if os.path.isdir(SAIDA):
        for nome in os.listdir(SAIDA):
            if nome != "capturas" and not nome.startswith("artefacto") and not nome.startswith("ensaio"):
                alvo = os.path.join(SAIDA, nome)
                shutil.rmtree(alvo) if os.path.isdir(alvo) else os.remove(alvo)
    shutil.copytree(SITE, SAIDA, dirs_exist_ok=True)
    escrever(os.path.join(SAIDA, "versao.js"), versao_js(v, carimbar=True))
    completo, sujo = commit_atual()
    print(f"Construído demo/_saida/ · revisão {v['revisao']} · commit {completo[:12] or '?'}{' (sujo)' if sujo else ''}")
    return v


# ---------- servir ----------

def criar_servidor(porta, pasta, silencioso=False):
    class Servidor(SimpleHTTPRequestHandler):
        def __init__(self, *a, **k):
            super().__init__(*a, directory=pasta, **k)

        def end_headers(self):
            self.send_header("Cache-Control", "no-store")
            self.send_header("X-Robots-Tag", "noindex, nofollow")
            super().end_headers()

        def log_message(self, fmt, *args):
            if not silencioso:
                sys.stderr.write("%s %s\n" % (self.address_string(), fmt % args))

    return ThreadingHTTPServer(("127.0.0.1", porta), Servidor)


def servir(porta, pasta=None):
    if pasta is None:
        construir()
        pasta = SAIDA
    with criar_servidor(porta, pasta) as s:
        print(f"A servir {os.path.relpath(pasta, RAIZ)}/ em http://127.0.0.1:{porta}/  (Ctrl-C para parar)")
        try:
            s.serve_forever()
        except KeyboardInterrupt:
            pass


# ---------- revisao (S35, 25/10): uma entrega do ChatGPT vira revisão num só comando ----------

def revisao(argv):
    """montar --limpar --rev rN → testar → capturas (Chromium, jpg) → artefacto + artefacto --fixa; imprime os passos que ficam à mão."""
    rev = argv[0] if argv and re.fullmatch(r"r\d+", argv[0]) else None
    if not rev:
        print('uso: demo.py revisao rN [--titulo "…"] [--porta 8789]'); return 2
    titulo, porta, i = None, 8789, 1
    while i < len(argv):
        if argv[i] == "--titulo" and i + 1 < len(argv):
            titulo = argv[i + 1]; i += 2; continue
        if argv[i] == "--porta" and i + 1 < len(argv):
            porta = int(argv[i + 1]); i += 2; continue
        print("opção desconhecida em revisao:", argv[i]); return 2
    v = ler_versao()
    if not titulo and v.get("revisao") == rev:
        titulo = v.get("titulo")  # repetir a mesma revisão não lhe apaga o título
    args = ["--limpar", "--rev", rev] + (["--titulo", titulo] if titulo else [])
    print("[1/5] montar", " ".join(args))
    rc = montar(args)
    if rc:
        return rc
    print("[2/5] testar")
    if not testar():
        print("revisao: o testar falhou; corrige e repete"); return 1
    print(f"[3/5] capturas em demo/capturas/{rev}/ (Chromium, jpg)")
    construir()
    servidor = criar_servidor(porta, SAIDA, silencioso=True)
    threading.Thread(target=servidor.serve_forever, daemon=True).start()
    try:
        env = dict(os.environ)
        if "NODE_PATH" not in env:
            try:
                env["NODE_PATH"] = subprocess.run(["npm", "root", "-g"], capture_output=True, text=True, check=True).stdout.strip()
            except (OSError, subprocess.CalledProcessError):
                pass
        rc = subprocess.call(["node", os.path.join(DEMO, "ferramentas", "captura.cjs"), "--base", f"http://127.0.0.1:{porta}", "--formato", "jpg"], env=env)
    except OSError as e:
        print("revisao: não consegui correr o node com captura.cjs:", e); rc = 1
    finally:
        servidor.shutdown(); servidor.server_close()
    if rc:
        print("revisao: capturas com problemas (ver acima); os artefactos geram-se na mesma")
    print("[4/5] artefacto (ligação principal) e artefacto --fixa")
    artefacto(False); artefacto(True)
    print(f"[5/5] fica à mão: 1) publicar demo/_saida/artefacto-{rev}/ como ligação fixa (página nova); 2) escrever o endereço em versao.json "
          f"(historico → {rev} → endereco) e na linha de {rev} do REGISTO.md; 3) correr outra vez «artefacto» e «artefacto --fixa» e publicar os dois "
          f"(principal: https://claude.ai/artifact/DdiLqNNHdNeJnF61d4cr3S); 4) validação e notas no REGISTO.md; 5) commit «SITE · demo {rev} · …».")
    return 1 if rc else 0


# ---------- empacotar ----------

def empacotar():
    v = construir()
    completo, _ = commit_atual()
    os.makedirs(PACOTES, exist_ok=True)
    nome = f"demo-{v['revisao']}-{completo[:7] or 'local'}.zip"
    caminho = os.path.join(PACOTES, nome)
    with zipfile.ZipFile(caminho, "w", zipfile.ZIP_DEFLATED) as z:
        for pasta, pastas, ficheiros in os.walk(SAIDA):
            pastas[:] = [d for d in pastas if d != "capturas" and not d.startswith("artefacto") and not d.startswith("ensaio")]
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
    shutil.copytree(SAIDA, destino, ignore=shutil.ignore_patterns("artefacto*", "capturas", "ensaio*"))
    escrever(os.path.join(destino, "versao.js"), versao_js(v, carimbar=True, fixa=fixa))
    entrada = os.path.join(destino, "index.html")
    texto = ler(entrada)
    titulo = re.search(r"<title>(.*?)</title>", texto, re.S).group(1)
    if fixa:
        titulo = "Monte Casa Branca · demo " + v["revisao"]
    # <head> e <body> podem trazer atributos e vir numa só linha (é o caso das páginas do ChatGPT desde 24/10)
    m_cab = re.search(r"<head[^>]*>(.*?)</head>", texto, re.S | re.I)
    m_corpo = re.search(r"<body([^>]*)>(.*?)</body>", texto, re.S | re.I)
    if not m_cab or not m_corpo:
        raise SystemExit("artefacto: a página de entrada não tem <head>…</head> e <body>…</body> reconhecíveis")
    cabeca, atributos_corpo, corpo = m_cab.group(1), m_corpo.group(1).strip(), m_corpo.group(2)
    # do <head> passam folhas, o robots e os scripts (a apresentação do ChatGPT vem no <head> com defer)
    etiquetas = re.findall(r"<link\b[^>]*>|<meta\s+name=\"robots\"[^>]*>|<script\b[^>]*>.*?</script>|<style\b[^>]*>.*?</style>", cabeca, re.S | re.I)
    links = "\n".join(etiquetas)
    # os atributos do <body> (ex.: data-page) não sobrevivem ao esqueleto do claude.ai: repõem-se por script
    repor = ""
    pares = re.findall(r"([a-zA-Z][\w-]*)=\"([^\"]*)\"", atributos_corpo)
    if pares:
        repor = "<script>(function(){var b=document.body;" + "".join(f"b.setAttribute({json.dumps(k)},{json.dumps(v)});" for k, v in pares) + "})();</script>\n"
    fragmento = (f"<title>{titulo}</title>\n<meta name=\"claude:viewport-fit-sides\" content=\"cover\">\n{links}\n{repor}{corpo}")
    escrever(entrada, fragmento)
    print(f"Variante para artefacto em {os.path.relpath(destino, RAIZ)}/ (index.html como fragmento{', ligação fixa ' + v['revisao'] if fixa else ''})")


# ---------- principal ----------

def principal(argv):
    if len(argv) < 2 or argv[1] in ("-h", "--help"):
        print(__doc__)
        return 0
    cmd = argv[1]
    if cmd == "testar":
        if "--design" in argv[2:]:
            return 0 if testar_design() else 1
        return 0 if testar() else 1
    if cmd == "montar":
        return montar(argv[2:])
    if cmd == "revisao":
        return revisao(argv[2:])
    if cmd == "construir":
        construir(); return 0
    if cmd == "servir":
        resto = argv[2:]
        pasta = None
        if "--pasta" in resto:
            k = resto.index("--pasta"); pasta = os.path.abspath(resto[k + 1]); del resto[k:k + 2]
        porta = int(resto[0]) if resto else 8787
        servir(porta, pasta); return 0
    if cmd == "empacotar":
        empacotar(); return 0
    if cmd == "artefacto":
        artefacto(fixa="--fixa" in argv[2:]); return 0
    print("comando desconhecido:", cmd)
    print(__doc__)
    return 2


if __name__ == "__main__":
    sys.exit(principal(sys.argv))
