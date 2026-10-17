(function(){
  'use strict';
  const scope=document.getElementById('monte-comparacao')||document;
  const euro=new Intl.NumberFormat('pt-PT',{style:'currency',currency:'EUR',maximumFractionDigits:0});
  function parseDate(s){if(!/^\d{4}-\d{2}-\d{2}$/.test(s))return null;const d=new Date(s+'T12:00:00Z');return Number.isNaN(+d)||d.toISOString().slice(0,10)!==s?null:d;}
  function rate(d){const y=d.getUTCFullYear(),m=d.getUTCMonth()+1,day=d.getUTCDate();if(y!==2026&&y!==2027)return null;return m<=2?250:m===3||m===4||(m===5&&day===1)?280:m===5?330:m===6||(m===7&&day<=17)?(y===2026?380:390):m===7||m===8?(y===2026?405:410):m===9?(y===2026?330:340):m<=11?250:330;}
  scope.querySelectorAll('.mcb').forEach(page=>{
    const toggle=page.querySelector('[data-menu-button]'),menu=page.querySelector('[data-menu]');
    if(toggle&&menu){toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));menu.hidden=!open;toggle.textContent=open?'Fechar −':'Menu +';});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.textContent='Menu +';}));}
    const form=page.querySelector('[data-calculator]');if(!form)return;
    const result=page.querySelector('[data-quote]'),error=page.querySelector('[data-error]'),amount=page.querySelector('[data-total]'),calc=page.querySelector('[data-calculation]'),period=page.querySelector('[data-period]');
    function calculate(e){if(e)e.preventDefault();const a=parseDate(form.elements.entrada.value),b=parseDate(form.elements.saida.value);let msg='';
      if(!a||!b||b<=a)msg='Escolham uma saída posterior à entrada.';
      const nights=a&&b?Math.round((b-a)/86400000):0;if(!msg&&(nights<2||nights>60))msg='Este exemplo permite estadias de 2 a 60 noites.';
      let sum=0,summer=false;const rates=[];
      if(!msg){for(let t=+a;t<+b;t+=86400000){const d=new Date(t),r=rate(d);if(r===null){msg='Para estas datas, peçam o valor por contacto.';break;}sum+=r;rates.push(r);if((d.getUTCMonth()===6&&d.getUTCDate()>=18)||d.getUTCMonth()===7)summer=true;}}
      if(!msg&&a.getUTCFullYear()!==b.getUTCFullYear())msg='Para estadias que atravessam o ano, peçam o valor por contacto.';
      if(!msg&&summer&&(nights<7||nights%7!==0||a.getUTCDay()!==6||b.getUTCDay()!==6))msg='No verão de 18 de julho a 31 de agosto: semanas de sábado a sábado.';
      if(!msg&&nights>=28)msg='Para estadias de 28 noites ou mais, peçam a tarifa aplicável por contacto.';
      error.hidden=!msg;error.textContent=msg;result.hidden=Boolean(msg);if(msg)return;
      const cleaning=a.getUTCFullYear()===2026?170:180,total=sum+cleaning;
      amount.textContent=euro.format(total);period.textContent=nights+' noites · casa inteira';
      const groups=[];for(const n of rates){const last=groups.at(-1);if(last&&last.rate===n)last.n++;else groups.push({n:1,rate:n});}
      calc.textContent=groups.map(g=>g.n+' × '+euro.format(g.rate)).join(' + ')+' + '+euro.format(cleaning)+' de limpeza';
      const dates=new Intl.DateTimeFormat('pt-PT',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
      const text='Olá, Diogo. Gostávamos de saber se o Monte Casa Branca está disponível de '+dates.format(a)+' a '+dates.format(b)+', para '+form.elements.pax.value+' pessoas. O estudo do site mostrou '+euro.format(total)+' como valor indicativo para a casa. Podem confirmar o total e as condições?';
      const wa=page.querySelector('[data-whatsapp]'),mail=page.querySelector('[data-email]');
      if(wa)wa.href='https://wa.me/351962802626?text='+encodeURIComponent(text);
      if(mail)mail.href='mailto:geral@montecasabranca.pt?subject='+encodeURIComponent('Pedido de datas · Monte Casa Branca')+'&body='+encodeURIComponent(text);
    }
    form.addEventListener('submit',calculate);form.addEventListener('change',calculate);calculate();
    const pre=page.querySelector('[data-prereserva]'),note=page.querySelector('[data-pre-note]');
    if(pre&&note)pre.addEventListener('click',()=>{note.hidden=false;pre.setAttribute('aria-expanded','true');});
  });
  scope.querySelectorAll('.mcb').forEach(page=>{
    const state=page.querySelector('[data-weather-state]'),main=page.querySelector('[data-weather-main]'),stay=page.querySelector('[data-weather-stay]'),form=page.querySelector('[data-calculator]');
    if(!state||!main||!stay||!form)return;
    const title=stay.querySelector('[data-weather-title]'),demo=stay.querySelector('.weather-demo'),sunset=stay.querySelector('.weather-sunset');
    function updateWeather(){
      const selection=state.value;
      main.hidden=selection==='none';stay.hidden=selection==='none';if(selection==='none')return;
      const entrance=new Date(form.elements.entrada.value+'T12:00:00Z'),departure=new Date(form.elements.saida.value+'T12:00:00Z');
      if(Number.isNaN(+entrance)||Number.isNaN(+departure))return;
      const lead=(entrance-new Date('2026-10-17T12:00:00Z'))/86400000;
      const historical=selection==='history'||(selection==='auto'&&lead>16);
      title.textContent=historical?'Média dos últimos 10 anos':'Previsão · exemplo de apresentação';
      demo.textContent=historical?'Exemplo visual · médias fictícias; não é uma previsão':'Exemplo visual · previsão fictícia; não consultar como tempo real';
      const fmt=new Intl.DateTimeFormat('pt-PT',{weekday:'short',day:'numeric',timeZone:'UTC'});
      stay.querySelectorAll('[data-weather-day]').forEach((el,i)=>{el.textContent=fmt.format(new Date(+entrance+i*86400000));});
      sunset.hidden=![0,6].includes(departure.getUTCDay());
    }
    state.addEventListener('change',updateWeather);form.addEventListener('change',updateWeather);updateWeather();
  });
})();
