/* D03 · Casa ao sol · interação da entrega do ChatGPT (design/estudo-d03-2026-10-17/index.html, commit e066def).
   Única alteração do Claude: o mapa «assets» aponta para ficheiros em imagens/ em vez de data URIs. */
(()=>{
const root=document.getElementById('mcb-d03');const assets={"pool": "imagens/piscina-dia.jpg", "interior": "imagens/portas-abertas.jpg", "porch": "imagens/alpendre-copos.jpg", "logo": "imagens/logo.png"};
root.querySelectorAll("img[data-mcb-image]").forEach(im=>im.src=assets[im.dataset.mcbImage]);
let returnFocus=null;
function open(id){const target=document.getElementById(id);if(!target)return;const active=document.activeElement;returnFocus=active.closest('dialog')?root.querySelector(matchMedia('(max-width:760px)').matches?'.menu-button':'.site-head>.book-link'):active;root.querySelectorAll('dialog[open]').forEach(x=>x.close());target.showModal();document.documentElement.style.overflow='hidden';target.querySelector('[data-close]').focus()}
function close(d){d.close();document.documentElement.style.overflow='';if(returnFocus&&returnFocus.isConnected)returnFocus.focus()}
root.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();open(b.dataset.open)}));
root.querySelectorAll('dialog').forEach(d=>{d.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>close(d)));d.addEventListener('cancel',e=>{e.preventDefault();close(d)});d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close(d)}})});
root.querySelector('[data-home]').addEventListener('click',()=>close(document.getElementById('menu-dialog')));
const scenes={pool:{src:assets.pool,alt:'Piscina de dia em frente à casa branca e azul',caption:'Lá fora, o programa pode ser só este.'},interior:{src:assets.interior,alt:'Portas abertas para o interior contemporâneo da casa',caption:'Cá dentro, o conforto de casa.'},porch:{src:assets.porch,alt:'Duas cadeiras e copos de vinho à sombra do alpendre',caption:'O resto dos planos pode esperar.'}};
root.querySelectorAll('[data-scene]').forEach(b=>b.addEventListener('click',()=>{const s=scenes[b.dataset.scene];const im=document.getElementById('scene-photo');im.src=s.src;im.alt=s.alt;document.getElementById('scene-caption').textContent=s.caption;root.querySelectorAll('[data-scene]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)))}));
const form=document.getElementById('stay-form'),error=document.getElementById('stay-error'),summary=document.getElementById('stay-summary');
form.addEventListener('input',()=>{summary.hidden=true;summary.textContent='';error.hidden=true;error.textContent=''});
form.addEventListener('submit',e=>{e.preventDefault();summary.hidden=true;summary.textContent='';const fd=new FormData(form),a=String(fd.get('entry')||''),b=String(fd.get('exit')||'');if(!a||!b||b<=a){error.textContent='Escolham uma saída posterior à entrada.';error.hidden=false;return}error.hidden=true;const fmt=s=>new Date(s+'T12:00:00').toLocaleDateString('pt-PT',{day:'numeric',month:'long',year:'numeric'});summary.textContent=fd.get('guests')+' pessoas · de '+fmt(a)+' a '+fmt(b)+'. Casa inteira. O Diogo terá de confirmar a disponibilidade e o valor.';summary.hidden=false});
})();
