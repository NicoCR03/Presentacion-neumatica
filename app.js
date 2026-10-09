(() => {
 'use strict';
 const $ = (q,root=document)=>root.querySelector(q);
 const $$ = (q,root=document)=>Array.from(root.querySelectorAll(q));
 const original=JSON.parse(JSON.stringify(window.PRESENTATION_CONFIG));
 const key='neumatica-presentation-v1:'+location.pathname;
 let config=JSON.parse(JSON.stringify(original));
 try {const saved=JSON.parse(localStorage.getItem(key)||'null');if(saved)config=mergeConfig(saved);}catch{}
 function mergeConfig(c){return {...original,...c,caso:{...original.caso,...(c.caso||{})}}}
 let current=0, motion=!matchMedia('(prefers-reduced-motion: reduce)').matches;
 let cyclePhase=0,cycleAuto=false,cycleClock=0,speed=1,progress=0,pieceProgress=0,target=0,direction=false,last=performance.now(),visualTime=0,order=false,remembered=false;
 const stage=$('#stage');
 const total=SLIDES.length;
 function title(i){return i===17 ? config.caso.titulo||'Caso de estudio':SLIDES[i].title}
 function render(){
  stage.innerHTML=SLIDES.map((s,i)=>`<section class="slide ${s.dark?'dark':''} ${s.layout==='cover'?'cover-slide':''}" data-slide="${i+1}" aria-label="${i+1}. ${esc(title(i))}" aria-hidden="true">${s.layout==='cover'?'':`<header><p class="eyebrow">${esc(s.section)}</p><h2>${esc(title(i))}</h2>${s.subtitle?`<p class="subtitle">${esc(s.subtitle)}</p>`:''}</header>`}<div class="body">${s.body(config)}</div><footer class="foot"><div class="sources">${i===17&&config.caso.solucion?(safeUrl(config.caso.fuenteUrl)?`<a href="${esc(safeUrl(config.caso.fuenteUrl))}" target="_blank" rel="noopener">${esc(config.caso.fuenteNombre||'Fuente del caso')}</a>`:esc(config.caso.fuenteNombre||'Completar la fuente del caso')):s.sources||'Sistemas Automatizados de Manufactura'}</div><span class="pageno">${String(i+1).padStart(2,'0')} / 20</span></footer></section>`).join('');
  $('#indexList').innerHTML=SLIDES.map((s,i)=>`<button data-go="${i}">${String(i+1).padStart(2,'0')} · ${esc(title(i))}</button>`).join('');
  go(current,false);updateCalc();updateMotion();
 }
 function fit(){const v=$('#viewport');const scale=Math.min(v.clientWidth/1600,v.clientHeight/900);document.documentElement.style.setProperty('--stage-scale',scale)}
 function active(){return $('.slide.active')}
 function go(n,hash=true){
  current=Math.max(0,Math.min(total-1,n));
  $$('.slide').forEach((s,i)=>{s.classList.toggle('active',i===current);s.setAttribute('aria-hidden',String(i!==current));s.inert=i!==current});
  $$('#indexList button').forEach((b,i)=>b.classList.toggle('active',i===current));
  $('#counter').textContent=`${String(current+1).padStart(2,'0')} / ${total}`;
  $('#slideTime').textContent=`${SLIDES[current].seconds} s · 12:25 total`;
  $('#prev').disabled=current===0;$('#next').disabled=current===total-1;
  $('#progress i').style.width=`${(current+1)/total*100}%`;
  $('#notesTitle').textContent=`${current+1}. ${title(current)}`;
  $('#notesBody').textContent=typeof SLIDES[current].notes==='function'?SLIDES[current].notes(config):SLIDES[current].notes;
  $('#announcer').textContent=`Diapositiva ${current+1} de ${total}: ${title(current)}`;
  document.title=`${current+1} · ${title(current)} · Sistemas neumáticos`;
  cycleAuto=false;cycleClock=0;progress=0;pieceProgress=0;target=0;direction=false;cyclePhase=0;speed=1;order=false;remembered=false;
  setCycle(0,false);setValve(0);updateOrder();
  $$('[data-speed]',active()).forEach(b=>b.classList.toggle('selected',b.dataset.speed==='1'));
  if(hash&&location.hash!==`#${current+1}`)history.replaceState(null,'',`#${current+1}`);
  fit();
 }
 function setCycle(phase,stop=true){
  if(phase===0||(phase===1&&cyclePhase!==1))pieceProgress=0;
  cyclePhase=phase;target=phase===1?1:0;direction=phase===1;
  if(stop){cycleAuto=false;cycleClock=0;}
  $$('[data-cycle]',active()).forEach(b=>b.classList.toggle('selected',Number(b.dataset.cycle)===phase));
  $$('[data-cycle-steps] li',active()).forEach((li,i)=>li.classList.toggle('current',i===phase));
  $$('[data-auto-cycle]',active()).forEach(b=>b.textContent=cycleAuto?'Detener ciclo':'Reproducir ciclo');
  if(!motion)progress=target;
  drawMachine(active(),progress,direction);
 }
 function drawMachine(root,p,advancing){
  $$('[data-piston]',root).forEach(g=>g.setAttribute('transform',`translate(${p*200} 0)`));
  if(advancing)pieceProgress=Math.max(pieceProgress,p);
  $$('[data-piece]',root).forEach(g=>g.setAttribute('transform',`translate(${Math.max(0,pieceProgress-.73)*200} 0)`));
  $$('[data-chamber-left]',root).forEach(r=>{r.setAttribute('width',46+p*200);r.style.fill=advancing?'#087cb52b':'#c0592f22'});
  $$('[data-chamber-right]',root).forEach(r=>{r.setAttribute('x',248+p*200);r.setAttribute('width',278-p*200);r.style.fill=advancing?'#c0592f22':'#087cb52b'});
  $$('[data-left-pipe]',root).forEach(p=>p.style.stroke=advancing?'#087cb5':'#c0592f');
  $$('[data-right-pipe]',root).forEach(p=>p.style.stroke=advancing?'#c0592f':'#087cb5');
  $$('[data-left-flow]',root).forEach(p=>p.style.animationDirection=advancing?'normal':'reverse');
  $$('[data-right-flow]',root).forEach(p=>p.style.animationDirection=advancing?'normal':'reverse');
  $$('[data-valve-state]',root).forEach(t=>t.textContent=advancing?'AVANCE':'RETORNO');
  $$('[data-valve-in]',root).forEach(p=>p.setAttribute('d',advancing?'M289 340L315 311':'M289 340L443 311'));
  $$('[data-valve-out]',root).forEach(p=>p.setAttribute('d',advancing?'M443 311L470 340':'M315 311L470 340'));
  root.classList.toggle('air-moving',Math.abs(target-progress)>.001);
  $$('.flow',root).forEach(p=>{const moving=Math.abs(target-progress)>.001;p.style.opacity=moving?'1':'0';p.style.animationPlayState=moving?'running':'paused'});
 }
 let valvePosition=0;
 function setValve(n){
  valvePosition=n;
  $$('[data-routing-a]',active()).forEach(g=>g.style.display=n?'none':'');
  $$('[data-routing-b]',active()).forEach(g=>g.style.display=n?'':'none');
  $$('[data-valve-position]',active()).forEach(b=>b.classList.toggle('selected',Number(b.dataset.valvePosition)===n));
  const d3=$('[data-valve-desc="3"]',active()),d5=$('[data-valve-desc="5"]',active());
  if(d3)d3.textContent=n?'Accionada: 1 alimenta 2; 3 bloqueada.':'Reposo NC: 2 descarga a 3; 1 bloqueada.';
  if(d5)d5.textContent=n?'Posición 2: 1 alimenta 4; 2 descarga a 3.':'Posición 1: 1 alimenta 2; 4 descarga a 5.';
 }
 function updateOrder(){
  const mono=$('[data-state-block="mono"]',active()),bi=$('[data-state-block="bi"]',active());
  if(mono)mono.setAttribute('x',order?220:45);if(bi)bi.setAttribute('x',remembered?220:45);
  const ml=$('[data-mono-label]',active()),bl=$('[data-bi-label]',active());
  if(ml)ml.textContent=order?'Orden presente: posición 2.':'Sin orden: vuelve a posición 1.';
  if(bl)bl.textContent=remembered?'Posición 2 conservada.':'Posición 1 conservada.';
 }
 const num=(n,d=0)=>Number(n).toLocaleString('es',{maximumFractionDigits:d,minimumFractionDigits:d});
 function updateCalc(){
  const pi=$('#pressure'),di=$('#diameter');if(!pi||!di)return;
  const p=Number(pi.value),d=Number(di.value),area=Math.PI*d*d/4,force=p*.1*area;
  $('#pValue').textContent=num(p,1);$('#dValue').textContent=num(d);$('#forceValue').textContent=num(force);
  $('#calcDetail').textContent=`${num(p*.1,2)} N/mm² × ${num(area)} mm² ≈ ${num(force)} N`;
 }
 function updateMotion(){document.body.classList.toggle('motion-paused',!motion);$('#motionBtn').setAttribute('aria-pressed',String(motion));$('#motionBtn').textContent=motion?'Pausar animación':'Activar animación'}
 function notesToggle(){const n=$('#notes');n.hidden=!n.hidden;$('#notesBtn').setAttribute('aria-expanded',String(!n.hidden))}
 function openDialog(id){$(id).showModal()}
 function fullscreen(){if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});else document.documentElement.requestFullscreen().catch(()=>openDialog('#helpDialog'))}
 function stepAction(){if([3,12,13].includes(current))setCycle((cyclePhase+1)%3);else if(current===6)setValve(1-valvePosition);else if(current===7){if(!order&&!remembered){order=true;remembered=true}else if(order){order=false}else{remembered=false}updateOrder()}}
 document.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.matches('[data-close]'))b.closest('dialog').close();
  if(b.hasAttribute('data-go')){go(Number(b.dataset.go));$('#indexDialog').close()}
  if(b.hasAttribute('data-next'))go(current+1);
  if(b.hasAttribute('data-cycle'))setCycle(Number(b.dataset.cycle));
  if(b.hasAttribute('data-valve-position'))setValve(Number(b.dataset.valvePosition));
  if(b.hasAttribute('data-auto-cycle')){cycleAuto=!cycleAuto;cycleClock=0;if(cycleAuto){motion=true;updateMotion();setCycle(1,false)}else setCycle(cyclePhase,false)}
  if(b.hasAttribute('data-speed')){speed=Number(b.dataset.speed);$$('[data-speed]',active()).forEach(el=>el.classList.toggle('selected',el===b));if(!cycleAuto){cycleAuto=true;cycleClock=0;motion=true;updateMotion();setCycle(1,false)}}
  if(b.hasAttribute('data-order')){if(b.dataset.order==='on'){order=true;remembered=true}else if(b.dataset.order==='off'){order=false}else{order=false;remembered=false}updateOrder()}
  if(b.hasAttribute('data-reset-calc')){$('#pressure').value=6;$('#diameter').value=20;updateCalc()}
 });
 document.addEventListener('input',e=>{if(['pressure','diameter'].includes(e.target.id))updateCalc()});
 $('#prev').onclick=()=>go(current-1);$('#next').onclick=()=>go(current+1);
 $('#indexBtn').onclick=()=>openDialog('#indexDialog');$('#helpBtn').onclick=()=>openDialog('#helpDialog');
 $('#notesBtn').onclick=notesToggle;$('#closeNotes').onclick=notesToggle;$('#fullscreenBtn').onclick=fullscreen;
 $('#motionBtn').onclick=()=>{motion=!motion;updateMotion()};
 $('#printBtn').onclick=()=>{$('#helpDialog').close();window.print()};
 $('#unblank').onclick=()=>$('#blackout').hidden=true;
 document.addEventListener('keydown',e=>{
  if(e.target.closest('input,textarea,select')||e.ctrlKey||e.metaKey||e.altKey)return;
  if($('dialog[open]'))return;
  if(!$('#blackout').hidden){if(e.key.toLowerCase()==='b'||e.key==='Escape')$('#blackout').hidden=true;return}
  if(e.target.closest('button,a')&&[' ','Enter'].includes(e.key))return;
  if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();go(current+1)}
  else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(current-1)}
  else if(e.key==='Home'){e.preventDefault();go(0)}else if(e.key==='End'){e.preventDefault();go(total-1)}
  else if(e.key.toLowerCase()==='n')notesToggle();else if(e.key.toLowerCase()==='f')fullscreen();
  else if(e.key.toLowerCase()==='o')openDialog('#indexDialog');else if(e.key==='?')openDialog('#helpDialog');
  else if(e.key.toLowerCase()==='p'){motion=!motion;updateMotion()}
  else if(e.key.toLowerCase()==='a')stepAction();else if(e.key.toLowerCase()==='b')$('#blackout').hidden=false;
 });
 let touchStart=null;
 $('#viewport').addEventListener('touchstart',e=>{if(!e.target.closest('button,a,input'))touchStart={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY};else touchStart=null},{passive:true});
 $('#viewport').addEventListener('touchend',e=>{if(!touchStart)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)go(current+(dx<0?1:-1));touchStart=null},{passive:true});
 function readForm(){const form=$('#editForm');const data=new FormData(form);const c={...config,caso:{...config.caso}};for(const [k,v] of data){if(k.startsWith('caso.'))c.caso[k.slice(5)]=v.trim();else c[k]=v.trim()}return c}
 function fillForm(){for(const el of $$('#editForm [name]'))el.value=el.name.startsWith('caso.')?config.caso[el.name.slice(5)]||'':config[el.name]||''}
 $('#editBtn').onclick=()=>{fillForm();$('#editStatus').textContent='';$('#configFallback').hidden=true;openDialog('#editDialog')};
 $('#editForm').addEventListener('submit',e=>{e.preventDefault();config=readForm();try{localStorage.setItem(key,JSON.stringify(config))}catch{}render();$('#editDialog').close()});
 $('#showConfig').onclick=()=>{if(!$('#editForm').reportValidity())return;$('#configFallback').hidden=false;$('#configCode').value='// Datos de la presentación\nwindow.PRESENTATION_CONFIG = '+JSON.stringify(readForm(),null,2)+';\n';$('#configCode').focus();$('#configCode').select();$('#editStatus').textContent='Texto seleccionado. Usa Ctrl+C y pégalo en el archivo config.js.'};
 $('#resetConfig').onclick=()=>{config=JSON.parse(JSON.stringify(original));try{localStorage.removeItem(key)}catch{}fillForm();render();$('#editStatus').textContent='Restaurados los datos del archivo config.js.'};
 window.addEventListener('resize',fit);window.addEventListener('hashchange',()=>{const n=parseInt(location.hash.slice(1),10);if(Number.isFinite(n))go(n-1,false)});
 document.addEventListener('fullscreenchange',fit);
 window.addEventListener('beforeprint',()=>{motion=false;updateMotion();$$('.slide').forEach(s=>s.inert=false)});
 window.addEventListener('afterprint',()=>$$('.slide').forEach((s,i)=>s.inert=i!==current));
 function tick(now){
  const dt=Math.min(.05,(now-last)/1000);last=now;
  if(motion&&!document.hidden){
   visualTime+=dt;
   if(cycleAuto){cycleClock+=dt*speed;const t=cycleClock%6.5;const phase=t<2.6?1:t<5.2?2:0;if(phase!==cyclePhase)setCycle(phase,false)}
   const delta=target-progress;progress+=Math.sign(delta)*Math.min(Math.abs(delta),dt*.52*speed);
   drawMachine(active(),progress,direction);
   const q=(Math.sin(visualTime*1.4)+1)/2;
   $$('[data-rotor]',active()).forEach(g=>g.setAttribute('transform',`rotate(${q*90} 187 95)`));
   $$('[data-jaw-left]',active()).forEach(g=>g.setAttribute('transform',`translate(${-q*20} 0)`));
   $$('[data-jaw-right]',active()).forEach(g=>g.setAttribute('transform',`translate(${q*20} 0)`));
  }
  requestAnimationFrame(tick);
 }
 const initial=parseInt(location.hash.slice(1),10);current=Number.isFinite(initial)?Math.max(0,Math.min(total-1,initial-1)):0;
 render();requestAnimationFrame(tick);
})();
