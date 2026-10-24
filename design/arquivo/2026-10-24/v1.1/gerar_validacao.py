"""Exporta o design como HTML direto: sem iframe, srcdoc ou renderização por JS."""
from pathlib import Path
import base64,re,zipfile,shutil
root=Path(__file__).resolve().parent
source=root/'design/site'
output=root/'validacao-v1-1';output.mkdir(exist_ok=True)
pages=[('index','Inicio'),('a-casa','A-casa'),('fotografias','Fotografias'),('precos','Precos-e-datas'),('localizacao','Localizacao'),('perguntas','Perguntas'),('contactos','Contactos')]
filenames={key+'.html':f'MCB-{i:02}-{label}.html' for i,(key,label) in enumerate(pages,1)}
css=(source/'estilos-site.css').read_text()
assets={f'imagens/{p.name}':'data:'+('image/png' if p.suffix=='.png' else 'image/jpeg')+';base64,'+base64.b64encode(p.read_bytes()).decode() for p in (source/'imagens').iterdir() if p.is_file()}
standalone=[]
for key,label in pages:
    html=(source/(key+'.html')).read_text()
    html=html.replace('<link rel="stylesheet" href="estilos-site.css">','<style>'+css+'</style>')
    html=html.replace('<script src="apresentacao.js" defer></script>','').replace('loading="lazy"','loading="eager"')
    # Conteúdo já presente no HTML: continua visível com JS e subdocumentos bloqueados.
    for original,uri in assets.items():html=html.replace(original,uri)
    for old,new in filenames.items():html=html.replace('href="'+old,'href="'+new)
    note='<div class="validation-tools"><a href="MCB-Todas-as-paginas.html">Índice das sete páginas</a><span>Validação de design · texto provisório · dados de exemplo</span></div>'
    extra='''.validation-tools{display:flex;gap:18px;justify-content:space-between;padding:12px 25px;background:#eee6db;color:#49362e;font:12px/1.5 Arial,sans-serif}.validation-tools a{text-decoration:underline}.validation-tools span{font-size:10px}.menu-toggle{display:none!important}@media(max-width:700px){.site-header{height:auto;min-height:86px;flex-wrap:wrap}.site-header nav{display:flex!important;position:static;flex-basis:100%;overflow:auto;max-height:none;padding:12px 0;box-shadow:none;gap:20px;font-size:13px}.site-header nav>a:not(.button){padding:7px 0;white-space:nowrap}.site-header .nav-cta{display:none}.home-hero .hero-photo{top:134px}.home-hero:before{top:134px}.validation-tools{display:block}.validation-tools span{display:block;margin-top:5px}}'''
    extra=extra.split('@media')[0]+'@media(max-width:700px){.site-header nav{display:none!important}.validation-tools{display:block}.validation-tools span{display:block;margin-top:5px}}'
    html=html.replace('</head>','<style>'+extra+'</style></head>')
    html=html.replace('<body data-page="'+key+'">','<body data-page="'+key+'">'+note)
    # No export estático, a galeria apresenta todas as fotografias e não oferece filtros inertes.
    if key=='fotografias':
        html=re.sub(r'<div class="gallery-filter".*?</div>','<p class="eyebrow">Casa e piscina · Sala e cozinha · Alpendre · Quartos</p>',html,flags=re.S)
        html=re.sub(r'<button class="open-photo"[^>]*>(.*?)</button>',r'<div class="open-photo">\1</div>',html,flags=re.S)
        html=html.replace('<span class="photo-expand" aria-hidden="true">↗</span>','')
        html=re.sub(r'<dialog.*?</dialog>','',html,flags=re.S)
    # O visitante está a validar o desenho: nenhum botão finge executar uma reserva.
    html=html.replace('type="submit"','type="button"')
    html=html.replace('Calcular estadia <span aria-hidden="true">→</span>','Exemplo de cálculo')
    html=html.replace('Enviar pedido <span aria-hidden="true">→</span>','Formulário de exemplo')
    html=html.replace('Pedir estas datas</button>','Pedido de exemplo</button>')
    html=html.replace('Estudo de design V1 ·','Estudo de design V1.1 ·')
    path=output/filenames[key+'.html'];path.write_text(html)
    standalone.append((key,label,html))

# Caderno contínuo: todas as páginas são HTML direto, já visível ao abrir.
toc='<nav class="validation-index" aria-label="Índice das páginas">'+''.join(f'<a href="#validacao-{k}">{i:02} · {label.replace("-"," ")}</a>' for i,(k,label) in enumerate(pages,1))+'</nav>'
parts=[]
for i,(key,label,html) in enumerate(standalone,1):
    body=re.search(r'<body[^>]*>(.*?)</body>',html,re.S).group(1)
    body=re.sub(r'<div class="validation-tools">.*?</div>','',body,flags=re.S)
    # IDs e referências únicas; navegação entre as páginas torna-se âncora interna.
    ids=re.findall(r'\bid="([^"]+)"',body)
    for ident in sorted(set(ids),key=len,reverse=True):
        body=body.replace('id="'+ident+'"','id="'+key+'-'+ident+'"').replace('href="#'+ident+'"','href="#'+key+'-'+ident+'"').replace('aria-controls="'+ident+'"','aria-controls="'+key+'-'+ident+'"')
    for old,new in filenames.items():
        target=old[:-5]
        body=re.sub(r'href="'+re.escape(new)+r'(?:#[^"]*)?"','href="#validacao-'+target+'"',body)
    parts.append(f'<article id="validacao-{key}" class="validation-article"><div class="validation-divider"><strong>{i:02} · {label.replace("-"," ")}</strong><a href="#validacao-indice">Voltar ao índice ↑</a></div>{body}</article>')
caderno='''<!doctype html><html lang="pt-PT"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Monte Casa Branca · sete páginas para validação</title><style>'''+css+extra+'''.validation-cover{padding:35px 25px;background:#f7f4ed}.validation-cover h1{font-size:32px}.validation-cover p{font-size:14px;max-width:750px;color:#7b7267}.validation-index{display:flex;flex-wrap:wrap;gap:10px 25px;padding:15px 0}.validation-index a{color:#a75532;border-bottom:1px solid #cebca9;padding:10px 0;font-size:14px}.validation-divider{padding:20px 25px;display:flex;justify-content:space-between;gap:20px;background:#e6d6c4;color:#49362e;font:14px Arial,sans-serif}.validation-divider a{text-decoration:underline;font-size:12px}.validation-article{border-top:4px solid #a75532;scroll-margin-top:0}.validation-article .skip-link{display:none}</style></head><body><section class="validation-cover" id="validacao-indice"><h1>Monte Casa Branca</h1><p>Sete páginas para validar o design. Escolhe uma página no índice ou percorre o documento. A largura adapta-se ao teu ecrã. Textos provisórios; preços, calendário e formulários apresentados como exemplos.</p>'''+toc+'</section>'+''.join(parts)+'</body></html>'
(output/'MCB-Todas-as-paginas.html').write_text(caderno)
with zipfile.ZipFile(root/'Monte-Casa-Branca-Validacao-V1-1.zip','w',zipfile.ZIP_DEFLATED) as z:
    for p in sorted(output.glob('*.html')):z.write(p,p.name)
for p in output.glob('*.html'):
    text=p.read_text();assert '<iframe' not in text and 'srcdoc=' not in text and '<script' not in text
    assert 'data:image/' in text and '<h1>' in text
    print(p.name,p.stat().st_size)
(root/'preview').mkdir(exist_ok=True)
shutil.copy2(output/'MCB-Todas-as-paginas.html',root/'preview/validacao.html')
