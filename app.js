(() => {
 'use strict';
 const $ = (q,root=document)=>root.querySelector(q);
 const $$ = (q,root=document)=>Array.from(root.querySelectorAll(q));
 const original=JSON.parse(JSON.stringify(window.PRESENTATION_CONFIG));
 const key='neumatica-preliminar-20261009:'+location.pathname;
 let config=JSON.parse(JSON.stringify(original));
 function mergeConfig(c){return {...original,...c,caso:{...original.caso,...(c.caso||{})}}}
 let current=0, motion=!matchMedia('(prefers-reduced-motion: reduce)').matches;
 let cyclePhase=0,cycleAuto=false,cycleClock=0,speed=1,progress=0,pieceProgress=0,target=0,direction=false,last=performance.now(),visualTime=0,order=false,remembered=false;
 const stage=$('#stage');
 const total=SLIDES.length;
 function title(i){return SLIDES[i].kind==='case' ? config.caso.titulo||'Caso de estudio':SLIDES[i].title}
 function render(){
  stage.innerHTML=SLIDES.map((s,i)=>`<section class="slide ${s.dark?'dark':''} ${s.layout==='cover'?'cover-slide':''}" data-slide="${i+1}" data-kind="${s.kind}" data-original="${s.originalNumber||0}" aria-label="${i+1}. ${esc(title(i))}" aria-hidden="true">${s.layout==='cover'?'':`<header><p class="eyebrow">${esc(s.section)}</p><h2>${esc(title(i))}</h2>${s.subtitle?`<p class="subtitle">${esc(s.subtitle)}</p>`:''}</header>`}<div class="body">${s.body(config)}</div><footer class="foot"><div class="sources">Sistemas Automatizados de Manufactura</div><span class="pageno">${String(i+1).padStart(2,'0')} / ${total}</span></footer></section>`).join('');
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
  $('#slideTime').textContent=`${SLIDES[current].seconds} s · ${Math.floor(SLIDES.reduce((a,s)=>a+s.seconds,0)/60)}:${String(SLIDES.reduce((a,s)=>a+s.seconds,0)%60).padStart(2,'0')} estimados`;
  $('#prev').disabled=current===0;$('#next').disabled=current===total-1;
  $('#progress i').style.width=`${(current+1)/total*100}%`;
  $('#announcer').textContent=`Diapositiva ${current+1} de ${total}: ${title(current)}`;
  document.title=`${current+1} · ${title(current)} · Sistemas neumáticos`;
  cycleAuto=false;cycleClock=0;progress=0;pieceProgress=0;target=0;direction=false;cyclePhase=0;speed=1;order=false;remembered=false;
  setCycle(0,false);setValve(0);updateOrder();resetCylinders();
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

 const demoStates={single:{p:0,target:0},double:{p:0,target:0}};
 function resetCylinders(){for(const [id,s] of Object.entries(demoStates)){s.p=0;s.target=0;drawCylinder(id,s)}}
 function setCylinder(id,t){const s=demoStates[id];if(!s)return;s.target=t;if(!motion)s.p=t;drawCylinder(id,s)}
 function drawCylinder(id,s){
  const root=$('[data-cylinder="'+id+'"]');if(!root)return;
  const dx=s.p*140;
  $('[data-demo-piston]',root).setAttribute('transform','translate('+dx+' 0)');
  const left=$('[data-demo-left]',root),right=$('[data-demo-right]',root);
  left.setAttribute('width',58+dx);right.setAttribute('x',123+dx);right.setAttribute('width',208-dx);
  left.style.fill=s.target?'#087cb533':'#c0592f22';right.style.fill=id==='double'&&!s.target?'#087cb533':'#c0592f22';
  $('[data-demo-in]',root).style.stroke=s.target?'#087cb5':'#c0592f';
  if(id==='single'){
   const start=125+dx,end=328;let d='M'+start+' 149';for(let i=1;i<11;i++)d+='L'+(start+(end-start)*i/11)+' '+(i%2?137:161);d+='L328 149';$('[data-demo-spring]',root).setAttribute('d',d);
  }else $('[data-demo-out]',root).style.stroke=s.target?'#c0592f':'#087cb5';
  $('[data-demo-state]',root).textContent=id==='single'?(s.target?'Aire entra; el resorte se comprime':'Aire sale; el resorte produce el retorno'):(s.target?'Aire entra por A y sale por B':'Aire entra por B y sale por A');
  $$('[data-cylinder-target]',root).forEach(b=>b.classList.toggle('selected',Number(b.dataset.cylinderTarget)===s.target));
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
 function openDialog(id){$(id).showModal()}
 function fullscreen(){if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});else document.documentElement.requestFullscreen().catch(()=>openDialog('#helpDialog'))}
 function stepAction(){if(SLIDES[current].kind==='cycle')setCycle((cyclePhase+1)%3);else if(SLIDES[current].kind==='valves')setValve(1-valvePosition);else if(SLIDES[current].kind==='orders'){if(!order&&!remembered){order=true;remembered=true}else if(order){order=false}else{remembered=false}updateOrder()}}
 document.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.matches('[data-close]'))b.closest('dialog').close();
  if(b.hasAttribute('data-go')){go(Number(b.dataset.go));$('#indexDialog').close()}
  if(b.hasAttribute('data-next'))go(current+1);
  if(b.hasAttribute('data-cylinder-id'))setCylinder(b.dataset.cylinderId,Number(b.dataset.cylinderTarget));
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
 $('#fullscreenBtn').onclick=fullscreen;
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
  else if(e.key.toLowerCase()==='f')fullscreen();
  else if(e.key.toLowerCase()==='o')openDialog('#indexDialog');else if(e.key==='?')openDialog('#helpDialog');
  else if(e.key.toLowerCase()==='p'){motion=!motion;updateMotion()}
  else if(e.key.toLowerCase()==='a')stepAction();else if(e.key.toLowerCase()==='b')$('#blackout').hidden=false;
 });
 let touchStart=null;
 $('#viewport').addEventListener('touchstart',e=>{if(!e.target.closest('button,a,input'))touchStart={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY};else touchStart=null},{passive:true});
 $('#viewport').addEventListener('touchend',e=>{if(!touchStart)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)go(current+(dx<0?1:-1));touchStart=null},{passive:true});
 window.addEventListener('resize',fit);window.addEventListener('hashchange',()=>{const n=parseInt(location.hash.slice(1),10);if(Number.isFinite(n))go(n-1,false)});
 document.addEventListener('fullscreenchange',fit);
 window.addEventListener('beforeprint',()=>{motion=false;updateMotion();$$('.slide').forEach(s=>s.inert=false)});
 window.addEventListener('afterprint',()=>$$('.slide').forEach((s,i)=>s.inert=i!==current));
 function tick(now){
  const dt=Math.min(.05,(now-last)/1000);last=now;
  if(motion&&!document.hidden){
   visualTime+=dt;
   for(const [id,s] of Object.entries(demoStates)){const delta=s.target-s.p;s.p+=Math.sign(delta)*Math.min(Math.abs(delta),dt*.7);drawCylinder(id,s)}
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
