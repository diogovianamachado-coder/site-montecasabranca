/* Interações de apresentação. Tempo, preços, calendário e pedidos pertencem ao kit do Claude. */
(() => {
  const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#site-menu');
  function closeMenu(){document.body.classList.remove('menu-open');toggle?.setAttribute('aria-expanded','false');}
  toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();}});
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  /* Evita qualquer envio do HTML de estudo quando o kit ainda não foi injetado. */
  document.addEventListener('submit',e=>{if(e.target.closest('[data-base]'))e.preventDefault();});
  document.addEventListener('click',e=>{if(e.target.closest('.b-sim-prereservar')){const wrap=document.querySelector('details.home-request');if(wrap)wrap.open=true;const pedido=document.querySelector('#pedido');pedido?.scrollIntoView({behavior:'smooth',block:'start'});}});
  const filters=[...document.querySelectorAll('[data-filter]')],items=[...document.querySelectorAll('.gallery-item')];
  function filter(zone){filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===zone)));items.forEach(f=>f.hidden=zone!=='todos'&&f.dataset.zone!==zone);const status=document.querySelector('#gallery-status');if(status)status.textContent=items.filter(x=>!x.hidden).length+' fotografias';}
  filters.forEach(b=>b.addEventListener('click',()=>filter(b.dataset.filter)));
  function fromHash(){const zone=decodeURIComponent(location.hash.slice(1));if(filters.some(b=>b.dataset.filter===zone))filter(zone);}
  fromHash();addEventListener('hashchange',fromHash);
  const dialog=document.querySelector('#lightbox'),photos=[...document.querySelectorAll('.open-photo')];let current=0,opener,sequence=photos;
  function show(i){current=(i+sequence.length)%sequence.length;const p=sequence[current],img=document.querySelector('#lightbox-image');img.src=p.dataset.photo;img.alt=p.dataset.caption;document.querySelector('#lightbox-caption').textContent=p.dataset.caption;document.querySelector('#lightbox-count').textContent=(current+1)+' / '+sequence.length;}
  photos.forEach(p=>p.addEventListener('click',()=>{opener=p;sequence=photos.filter(x=>!x.closest('.gallery-item').hidden);show(sequence.indexOf(p));dialog.showModal();document.body.classList.add('photo-open');}));
  document.querySelector('.close-photo')?.addEventListener('click',()=>dialog.close());
  document.querySelector('#previous-photo')?.addEventListener('click',()=>show(current-1));
  document.querySelector('#next-photo')?.addEventListener('click',()=>show(current+1));
  dialog?.addEventListener('close',()=>{document.body.classList.remove('photo-open');opener?.focus();});
  dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  dialog?.addEventListener('keydown',e=>{if(e.key==='ArrowRight')show(current+1);if(e.key==='ArrowLeft')show(current-1);});
})();
