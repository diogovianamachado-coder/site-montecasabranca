"""HTML de validação direto, com fotos incorporadas e navegação sem JavaScript."""
from pathlib import Path
from bs4 import BeautifulSoup as B
import base64,re,zipfile,shutil
root=Path(__file__).resolve().parent
source=root/'design/site'; output=root/'validacao-v1-3-1';output.mkdir(exist_ok=True)
pages=[('index','Início'),('a-casa','A casa'),('fotografias','Fotografias'),('precos','Datas e estadia'),('localizacao','Montemor e N2'),('perguntas','Perguntas'),('contactos','Contactos')]
slugs=['Inicio','A-casa','Fotografias','Datas-e-estadia','Montemor-e-N2','Perguntas','Contactos']
filenames={key+'.html':f'MCB-{i:02}-{slugs[i-1]}.html' for i,(key,label) in enumerate(pages,1)}
css=(source/'estilos-site.css').read_text()
assets={f'imagens/{p.name}':'data:'+('image/png' if p.suffix=='.png' else 'image/jpeg')+';base64,'+base64.b64encode(p.read_bytes()).decode() for p in (source/'imagens').iterdir() if p.is_file()}
extra='''.validation-tools{padding:9px 25px;background:#eee6db;color:#49362e;font:11px/1.5 Arial,sans-serif;display:flex;justify-content:space-between;gap:15px}.validation-tools a{text-decoration:underline}.menu-toggle{display:none!important}@media(max-width:700px){.site-header nav{display:none!important}.validation-tools span{display:none}}'''
standalone=[]
for key,label in pages:
    b=B((source/(key+'.html')).read_text(),'html.parser')
    b.select_one('link[rel="stylesheet"]').replace_with(B('<style>'+css+extra+'</style>','html.parser'))
    for x in b.select('script'):x.decompose()
    for x in b.select('img'):x['loading']='eager'
    if key=='fotografias':
        b.select_one('.gallery-filter').replace_with(B('<p class="eyebrow">Casa e piscina · Sala e cozinha · Alpendre · Quartos</p>','html.parser'))
        for x in b.select('.open-photo'):
            x.name='div';x.attrs={'class':['open-photo']}
        for x in b.select('.photo-expand,dialog'):x.decompose()
        for zone in ['piscina','sala','alpendre','quartos']:
            x=b.select_one('[data-zone="'+zone+'"]')
            if x:x['id']=zone
    for x in b.select('[type="submit"]'):x['type']='button'
    for selector,text in [('.b-sim-calcular','Exemplo de cálculo'),('.b-pedido-enviar','Formulário de exemplo'),('.b-sim-prereservar','Pedido de exemplo')]:
        for x in b.select(selector):x.clear();x.string=text
    note=B('<div class="validation-tools"><a href="MCB-Todas-as-paginas.html#validacao-indice">Escolher página</a><span>Estudo de design · textos provisórios · dados de exemplo</span></div>','html.parser')
    b.body.insert(0,note)
    html=str(b)
    for original,uri in assets.items():html=html.replace(original,uri)
    for old,new in filenames.items():html=html.replace('href="'+old,'href="'+new)
    (output/filenames[key+'.html']).write_text(html)
    standalone.append((key,label,html))
# IDs efetivamente presentes nas páginas de exportação (inclui âncoras da galeria estática).
page_ids={key:set(re.findall(r'\bid="([^"]+)"',html)) for key,_,html in standalone}
toc='<nav class="validation-index" aria-label="Escolher página">'+''.join(f'<a href="#validacao-{key}">{label}</a>' for key,label in pages)+'</nav>'
parts=[]
for key,label,html in standalone:
    b=B(html,'html.parser')
    for x in b.select('.validation-tools,.mobile-dock,.reading-progress'):x.decompose()
    body=''.join(str(x) for x in b.body.contents)
    ids=page_ids[key]
    for ident in sorted(ids,key=len,reverse=True):
        body=body.replace('id="'+ident+'"','id="'+key+'-'+ident+'"').replace('href="#'+ident+'"','href="#'+key+'-'+ident+'"').replace('aria-controls="'+ident+'"','aria-controls="'+key+'-'+ident+'"')
    for old,new in filenames.items():
        target=old[:-5]
        body=re.sub(r'href="'+re.escape(new)+r'(?:#([^"]*))?"',lambda m:'href="#'+(target+'-'+m.group(1) if m.group(1) in page_ids[target] else 'validacao-'+target)+'"',body)
    parts.append(f'<article id="validacao-{key}" class="validation-article" aria-label="{label}"><div class="validation-divider"><span>{label} · design V1.3.1</span><a href="#validacao-indice">Escolher página</a></div>{body}</article>')
# Um único acesso permanente, fora das páginas. O menu abre o índice por âncora.
idx=B((source/'index.html').read_text(),'html.parser');dock=idx.select_one('.mobile-dock')
menu=dock.select_one('details');summary=menu.select_one('summary');a=idx.new_tag('a',href='#validacao-indice');a.extend(list(summary.contents));menu.replace_with(a)
for a in dock.select('a[href]'):
    a['href']={'index.html':'#validacao-index','precos.html#calendario':'#precos-calendario'}.get(a['href'],a['href'])
viewer='''.validation-cover{padding:12px 25px;background:#eee6db}.validation-cover h1{font-size:24px;margin-bottom:8px}.validation-cover p{font:11px/1.5 Arial,sans-serif;color:#7b7267;margin:8px 0 0}.validation-index{display:flex;flex-wrap:wrap;gap:10px 25px}.validation-index a{font-size:13px;padding:9px 0;border-bottom:1px solid #cdb7a3}.validation-divider{padding:8px 25px;background:#f0ebe3;display:flex;justify-content:space-between;gap:15px;font:11px/1.5 Arial,sans-serif}.validation-divider a{text-decoration:underline}.validation-article .skip-link{display:none}.validation-article{scroll-margin-top:0}
@supports selector(body:has(article:target)){.validation-article{display:none}#validacao-index{display:block}body:has(.validation-article:target,.validation-article :target) #validacao-index{display:none}.validation-article:target,.validation-article:has(:target){display:block!important}body:has(#validacao-indice:target) .validation-article{display:none!important}}
@media(max-width:700px){.validation-cover{padding:30px 25px}.validation-cover h1{font-size:30px}.validation-index{display:grid;grid-template-columns:1fr 1fr;gap:12px 24px;margin-top:25px}.validation-index a{font-size:16px;padding:16px 0}.validation-cover p{margin-top:25px;font-size:12px}.validation-cover{display:none}body:has(#validacao-indice:target) .validation-cover{display:block}.validation-divider{padding:6px 25px;font-size:10px}}
@media print{.mobile-dock,.reading-progress{display:none!important}.validation-cover,.validation-article,#validacao-index{display:block!important}.validation-article{break-before:page}body{padding-bottom:0}}
'''
caderno='<!doctype html><html lang="pt-PT"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex,nofollow"><title>Monte Casa Branca · páginas V1.3.1</title><style>'+css+extra+viewer+'</style></head><body><section class="validation-cover" id="validacao-indice"><h1>Monte Casa Branca</h1>'+toc+'<p>Escolhe uma página. O desenho adapta-se ao ecrã. Textos provisórios; calendário, preços e formulários de exemplo.</p></section>'+''.join(parts)+str(dock)+'<div class="reading-progress" aria-hidden="true"></div></body></html>'
(output/'MCB-Todas-as-paginas.html').write_text(caderno)
with zipfile.ZipFile(root/'Monte-Casa-Branca-Validacao-V1-3-1.zip','w',zipfile.ZIP_DEFLATED) as z:
    for p in sorted(output.glob('*.html')):z.write(p,p.name)
for p in output.glob('*.html'):
    text=p.read_text();assert '<iframe' not in text and 'srcdoc=' not in text and '<script' not in text
    assert 'data:image/' in text and '<h1>' in text
    print(p.name,p.stat().st_size)
(root/'preview').mkdir(exist_ok=True)
shutil.copy2(output/'MCB-Todas-as-paginas.html',root/'preview/validacao.html')
