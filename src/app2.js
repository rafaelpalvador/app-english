
/* =========================================================
   Glosa · funcionalidades extra
   ========================================================= */

/* ---------- leitura contínua ---------- */
function isPend(sid,i){return !!(S.pend&&S.pend[sid+':'+i]);}
function pendList(){const ids=sentsOf(lessonById(cur)||LESSONS[0]);return Object.keys(S.pend||{}).filter(k=>ids.indexOf(k.split(':')[0])>=0);}
function togglePend(w){
  S.pend=S.pend||{};const k=w.dataset.s+':'+w.dataset.i;
  if(S.pend[k])delete S.pend[k];else S.pend[k]=1;
  w.classList.toggle('pend',!!S.pend[k]);save();renderPend();
}
function renderPend(){
  const b=$('#pend-btn');if(!b)return;const n=pendList().length;
  b.hidden=!S.settings.flow;b.innerHTML=`${I('note',15)} Marcadas <span class="badge" style="margin-left:2px">${n}</span>`;b.disabled=!n;
}
function pendModal(thenFinish){
  const seen={},rows=[];
  pendList().forEach(k=>{const p=k.split(':'),sid=p[0],i=+p[1];const t=TOK[sid]&&TOK[sid][i];if(!t||seen[t.l])return;seen[t.l]=1;rows.push({k:k,sid:sid,i:i,t:t});});
  const pick={};rows.forEach(r=>{const s=status(r.t.l);pick[r.t.l]=s>=1&&s<=4?s:1;});
  const draw=()=>{
    $('#pend-rows').innerHTML=rows.map(r=>{const e=info(r.t.l);return`<div class="card flat" style="padding:12px 14px;display:grid;gap:8px"><div class="row between"><span><b style="font:400 22px var(--f-d)">${esc(r.t.w)}</b> <span class="muted" style="font-size:14px">${esc(e.pt||'sem entrada na demo')}</span></span><button class="ibtn" data-ps="${esc(r.t.w)}" aria-label="Ouvir" style="width:34px;height:34px">${I('spk',16)}</button></div>
    <div class="g-ctx" style="font-size:15px">${sentMark(r.sid,r.i,r.i)}</div>
    <div class="seg" role="group" aria-label="Nível para ${esc(r.t.w)}">${[[1,'1'],[2,'2'],[3,'3'],[4,'4'],[5,'Conhecida']].map(b=>`<button class="${pick[r.t.l]===b[0]?'on':''}" data-pl="${esc(r.t.l)}" data-pv="${b[0]}">${b[1]}</button>`).join('')}</div></div>`;}).join('');
  };
  setModal(`<div class="mhead"><div><div class="eyebrow">Leitura contínua</div><h2 style="margin-top:6px">Palavras que marcaste</h2></div><button class="ibtn" data-close aria-label="Fechar">${I('x')}</button></div>
  <p class="muted" style="font-size:14px">Escolhe o nível de cada uma. 1 a 4 criam um cartão com a frase.</p>
  <div id="pend-rows" style="display:grid;gap:10px"></div>
  <div class="row" style="justify-content:flex-end"><button class="btn" id="pend-clear">Desmarcar todas</button><button class="btn pri" id="pend-ok">${I('check',16)} Guardar${thenFinish?' e terminar':''}</button></div>`,'Palavras marcadas');
  draw();
  $('#pend-rows').addEventListener('click',e=>{const b=e.target.closest('[data-pl]');if(b){pick[b.dataset.pl]=+b.dataset.pv;draw();return;}const s=e.target.closest('[data-ps]');if(s)say(s.dataset.ps);});
  const clear=()=>{rows.forEach(r=>{Object.keys(S.pend).forEach(k=>{const p=k.split(':');if(TOK[p[0]]&&TOK[p[0]][+p[1]]&&TOK[p[0]][+p[1]].l===r.t.l)delete S.pend[k];});});save();};
  $('#pend-clear').onclick=()=>{clear();closeModal();refreshWords();renderPend();};
  $('#pend-ok').onclick=()=>{rows.forEach(r=>setStatusFor(r.t.l,pick[r.t.l],{sid:r.sid,surf:r.t.w}));clear();refreshWords();renderPend();updateChrome();toast(rows.length+' palavras guardadas','cards');if(thenFinish)finishModal();else closeModal();};
}

/* ---------- glossário antes de ler ---------- */
function renderPre(){
  const el=$('#r-pre');if(!el)return;const L=lessonById(cur);const f={};
  sentsOf(L).forEach(sid=>TOK[sid].forEach((t,i)=>{if(!t.w)return;const s=status(t.l);if(!(s>=0&&s<=4)||!DICT[t.l])return;if(!f[t.l])f[t.l]={n:0,sid:sid,i:i,w:t.w,s:s,o:Object.keys(f).length};f[t.l].n++;}));
  const top=Object.keys(f).map(l=>Object.assign({l:l},f[l])).sort((a,b)=>(a.s===0?0:1)-(b.s===0?0:1)||b.n-a.n||a.o-b.o).slice(0,5);
  if(!top.length){el.innerHTML='';el.hidden=true;return;}
  el.hidden=false;
  el.innerHTML=`<div class="row between" style="margin-bottom:10px"><span class="eyebrow">Antes de ler · 5 palavras úteis</span><span class="muted" style="font-size:12.5px">toca para ver no texto</span></div><div class="pre-chips">${top.map(x=>`<button class="pchip" data-pre="${x.sid}:${x.i}"><b>${esc(x.l)}</b><span>${esc(DICT[x.l].pt.split(/[;,]/)[0])}</span>${x.n>1?`<small>${x.n}×</small>`:''}</button>`).join('')}</div>`;
}

/* ---------- pausa na revisão ---------- */
function pauseHTML(){
  const left=R.q.length-R.i;
  return`<div class="wrap rv-wrap"><div class="card done-hero"><span style="display:grid;place-items:center;width:72px;height:72px;border-radius:22px;background:var(--hl3);color:#1C1400">${I('pausei',34)}</span>
  <h2>Que tal uma pausa?</h2><p class="muted" style="max-width:44ch">Falhaste ${R.recent.filter(x=>x===1).length} dos últimos ${R.recent.length} cartões. Acontece a todos, sobretudo ao fim do dia. Rever com a cabeça fresca rende mais, e os ${left} cartões que faltam esperam por ti.</p>
  <div class="row" style="justify-content:center"><button class="btn" data-r="cont">Continuar mesmo assim</button><button class="btn pri" data-r="rest">${I('check',16)} Fazer pausa</button></div></div></div>`;
}

/* ---------- progresso: novos gráficos ---------- */
const CEFR=[[0,'A1'],[500,'A2'],[1000,'B1'],[2000,'B2'],[4000,'C1'],[8000,'C2']];
const GROW=()=>{const k=knownCount();return tl()==='en'?[470,505,538,561,590,612,628,k]:[.55,.62,.68,.74,.8,.87,.94,1].map(f=>Math.round(k*f));};
function etaHTML(){
  const k=knownCount();let idx=0;CEFR.forEach((x,i)=>{if(k>=x[0])idx=i;});const nx=CEFR[idx+1];if(!nx)return'';
  const g=GROW();const rate=Math.max(1,(g[g.length-1]-g[0])/(g.length-1));const wk=Math.ceil((nx[0]-k)/rate);
  const d=new Date((TD()+wk*7)*DAY);
  return`<div class="eta"><span class="si">${I('target')}</span><span><b>${nx[1]} em cerca de ${wk} semanas</b><br><span class="muted" style="font-size:13px">Ao teu ritmo de ~${Math.round(rate)} palavras novas por semana, por volta de ${MO[d.getUTCMonth()]} de ${d.getUTCFullYear()}.</span></span></div>`;
}
function forecastChart(){
  const t=TD();const c=[0,0,0,0,0,0,0];
  learningList().forEach(l=>{const v=S.vocab[l];if(!v.srs)return;const d=Math.max(0,v.srs.due-t);if(d<7)c[d]++;});
  const mx=Math.max(4,Math.max.apply(null,c));const x0=8,x1=600,y0=22,y1=128,bw=(x1-x0)/7;
  let s=`<svg class="ch" viewBox="0 0 610 150" role="img" aria-label="Cartões a rever nos próximos 7 dias">`;
  s+=`<line class="gl" x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}"/>`;
  c.forEach((v,i)=>{const h=(v/mx)*(y1-y0),x=x0+i*bw+8,w=bw-16;s+=`<rect class="${i===0?'bt':'b'}" x="${x.toFixed(1)}" y="${(y1-h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="5"/><text class="em" x="${(x+w/2).toFixed(1)}" y="${(y1-h-7).toFixed(1)}" text-anchor="middle">${v}</text><text x="${(x+w/2).toFixed(1)}" y="${y1+16}" text-anchor="middle">${i===0?'hoje':i===1?'amanhã':WD[dow(t+i)].slice(0,3)}</text>`;});
  return{svg:s+'</svg>',total:c.reduce((a,b)=>a+b,0),peak:c.indexOf(Math.max.apply(null,c))};
}
function forgetCurve(){
  const B=[[1,1,'1 dia'],[2,3,'2–3 dias'],[4,7,'4–7 dias'],[8,14,'1–2 sem.'],[15,999,'15+ dias']];
  const EB=[33,28,25,23,21];
  const st=B.map(b=>{let n=0,ok=0;(S.log||[]).forEach(r=>{if(r[1]>=b[0]&&r[1]<=b[1]){n++;ok+=r[2];}});return{n:n,p:n?Math.round(ok/n*100):null};});
  const x0=42,x1=590,y0=14,y1=150,X=i=>x0+i*(x1-x0)/(B.length-1),Y=p=>y1-(p/100)*(y1-y0);
  let s=`<svg class="ch" viewBox="0 0 610 178" role="img" aria-label="Percentagem de palavras lembradas por intervalo desde a última revisão">`;
  [0,25,50,75,100].forEach(v=>{s+=`<line class="gl" x1="${x0}" x2="${x1}" y1="${Y(v)}" y2="${Y(v)}"/><text x="${x0-8}" y="${Y(v)+3}" text-anchor="end">${v}%</text>`;});
  s+=`<path d="${EB.map((p,i)=>(i?'L':'M')+X(i).toFixed(1)+' '+Y(p).toFixed(1)).join(' ')}" fill="none" style="stroke:var(--muted)" stroke-width="1.8" stroke-dasharray="5 5"/>`;
  const pts=st.map((x,i)=>x.p==null?null:[X(i),Y(x.p),x]).filter(Boolean);
  if(pts.length>1)s+=`<path class="ar" style="fill:url(#ga2)" d="${pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ')} L${pts[pts.length-1][0].toFixed(1)} ${y1} L${pts[0][0].toFixed(1)} ${y1}Z"/><path class="ln" d="${pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ')}"/>`;
  pts.forEach(p=>{s+=`<circle class="pt" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4.5"/><text class="em" x="${p[0].toFixed(1)}" y="${(p[1]-11).toFixed(1)}" text-anchor="middle">${p[2].p}%</text>`;});
  B.forEach((b,i)=>{s+=`<text x="${X(i).toFixed(1)}" y="${y1+18}" text-anchor="${i===0?'start':i===B.length-1?'end':'middle'}">${b[2]}</text>`;});
  s+=`<defs><linearGradient id="ga2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="gs1"/><stop offset="1" class="gs2"/></linearGradient></defs></svg>`;
  const tot=st.reduce((a,b)=>a+b.n,0);
  const last=st.filter(x=>x.p!=null).slice(-1)[0];
  return{svg:s,tot:tot,last:last?last.p:0};
}
function themesHTML(){
  if(tl()!=='en')return`<p class="muted">Na demo, os temas só estão definidos para inglês. Na versão real, a IA agrupa o vocabulário de qualquer língua por tema.</p>`;
  let worst=null;
  const rows=Object.keys(THEMES).map(th=>{
    let k=0,l=0,n=0;THEMES[th].forEach(w=>{const s=status(w);if(s===5||s===-1)k++;else if(s>=1)l++;else n++;});
    const t=k+l+n||1;const p=Math.round(k/t*100);if(!worst||p<worst.p)worst={th:th,p:p};
    return`<div class="th-row"><div class="row between" style="font-size:13.5px"><span>${esc(th)}</span><span class="muted tnum">${p}% · ${k}/${t}</span></div><div class="meter" style="height:10px"><i class="m-k" style="width:${(k/t*100).toFixed(1)}%"></i><i class="m-l" style="width:${(l/t*100).toFixed(1)}%"></i><i class="m-n" style="width:${(n/t*100).toFixed(1)}%"></i></div></div>`;
  }).join('');
  return rows+`<div class="tip">${I('bulb',18)}<span>A maior lacuna é <b>${esc(worst.th.toLowerCase())}</b>. Procura na biblioteca um texto deste tema para a semana.</span></div>`;
}
function mistakesHTML(){
  const cat={};const add=(l,n)=>{const v=S.vocab[l];const c=v&&v.phrase?'expressão':(DICT[l]&&DICT[l].pos)||'outras';if(c==='prep.')return add2('adv.',n);cat[c]=(cat[c]||0)+n;};
  const add2=(c,n)=>{cat[c]=(cat[c]||0)+n;};
  Object.keys(S.vocab).forEach(l=>{const v=S.vocab[l];if(v.srs&&v.srs.lapses)add(l,v.srs.lapses);});
  (S.log||[]).forEach(r=>{if(!r[2])add(r[3],1);});
  const NM={'verbo':'Verbos','subst.':'Nomes','adj.':'Adjetivos','adv.':'Ligação e advérbios','expressão':'Expressões','outras':'Outras'};
  const keys=Object.keys(cat).filter(k=>cat[k]>0).sort((a,b)=>cat[b]-cat[a]);if(!keys.length)return'<p class="muted">Ainda não há erros suficientes para analisar.</p>';
  const mx=cat[keys[0]];const top=keys[0];
  const hard=Object.keys(S.vocab).filter(l=>S.vocab[l].srs&&S.vocab[l].srs.lapses).sort((a,b)=>S.vocab[b].srs.lapses-S.vocab[a].srs.lapses).slice(0,4);
  return`<div style="display:grid;gap:8px">${keys.slice(0,5).map(k=>`<div class="mk"><span>${NM[k]||k}</span><div class="bar"><i style="width:${(cat[k]/mx*100).toFixed(1)}%;background:${k===top?'var(--bad)':'var(--line-2)'}"></i></div><b class="tnum">${cat[k]}</b></div>`).join('')}</div>
  <div class="ai-card" style="margin-top:14px"><div class="ai-tag">${I('spark',13)} Mini-lição · ${NM[top]||top}</div>${esc(POS_TIPS[top]||'Revê estas palavras no modo Lacuna, dentro da frase.')}</div>
  ${hard.length?`<div class="row" style="gap:6px;margin-top:12px"><span class="muted" style="font-size:12.5px">Mais difíceis:</span>${hard.map(l=>`<button class="pill p-i" data-word="${esc(l)}">${esc(label(l))} · ${S.vocab[l].srs.lapses}</button>`).join('')}</div>`:''}
  <div class="row" style="margin-top:14px"><button class="btn sm" data-pv="cloze">${I('cloze',16)} Treinar no modo Lacuna</button></div>`;
}
function progExtra(){
  const f=forecastChart(),fc=forgetCurve();
  return`<div class="card"><div class="row between"><h3>Revisões nos próximos 7 dias</h3><span class="chip">${f.total} cartões</span></div><p class="muted" style="font-size:13px;margin:4px 0 12px">${f.peak===0?'O dia mais carregado é hoje.':'O dia mais carregado é '+(f.peak===1?'amanhã':WD[dow(TD()+f.peak)])+'.'} Inclui cartões em atraso.</p>${f.svg}</div>
  <div class="card"><div class="row between"><h3>A tua curva de esquecimento</h3><span class="chip">${fc.tot} revisões</span></div><p class="muted" style="font-size:13px;margin:4px 0 12px">Quantas palavras lembras, conforme o tempo desde a última revisão. A tracejado: a curva original de Ebbinghaus, sem revisões.</p>${fc.svg}<p class="muted" style="font-size:12.5px;margin-top:8px">Mesmo depois de 15+ dias lembras ${fc.last}%. Sem revisões, a curva de 1885 ficava perto de 21%.</p></div>
  <div class="card"><h3>Vocabulário por tema</h3><p class="muted" style="font-size:13px;margin:4px 0 14px">Palavras dos textos agrupadas por tema: conhecidas, a aprender e novas.</p><div style="display:grid;gap:12px">${themesHTML()}</div></div>
  ${langsCard()}
  <div class="card"><h3>Onde falhas mais</h3><p class="muted" style="font-size:13px;margin:4px 0 14px">Erros nas revisões, por tipo de palavra.</p>${mistakesHTML()}</div>`;
}
$('#v-prog').addEventListener('click',e=>{
  const b=e.target.closest('[data-pv]');if(!b)return;
  if(b.dataset.pv==='report')reportModal();
  else if(b.dataset.pv==='cloze'){R.mode='cloze';go('review');}
});
function reportModal(){
  const t=TD(),dt=new Date(t*DAY),m=dt.getUTCMonth(),y=dt.getUTCFullYear();
  const inM=d=>{const x=new Date(d*DAY);return x.getUTCMonth()===m&&x.getUTCFullYear()===y;};
  let w=0,l=0,r=0,act=0;Object.keys(S.days).forEach(d=>{if(inM(+d)){const v=S.days[d];w+=v.w||0;l+=v.l||0;r+=v.r||0;if(v.w||v.l||v.r)act++;}});
  const added=Object.keys(S.vocab).filter(k=>S.vocab[k].added&&inM(S.vocab[k].added)).length;
  const texts=Object.keys(S.texts).filter(k=>inM(S.texts[k])).length;
  const hard=Object.keys(S.vocab).filter(k=>S.vocab[k].srs&&S.vocab[k].srs.lapses).sort((a,b)=>S.vocab[b].srs.lapses-S.vocab[a].srs.lapses).slice(0,5);
  const gr=GROW();const gained=gr[gr.length-1]-gr[3];const mn=MO[m];
  const txt=`Glosa · relatório de ${mn} ${y}\nPalavras lidas: ${Math.round(w)}\nMinutos a ouvir: ${Math.round(l)}\nCartões revistos: ${Math.round(r)}\nDias com atividade: ${act}\nPalavras novas guardadas: ${added}\nPalavras conhecidas: ${knownCount()} (+${gained} em 4 semanas)\nTextos terminados: ${texts}\nMais difíceis: ${hard.map(label).join(', ')||'—'}`;
  setModal(`<div class="mhead"><div><div class="eyebrow">Relatório mensal</div><h2 style="margin-top:6px;text-transform:capitalize">${mn} ${y}</h2></div><button class="ibtn" data-close aria-label="Fechar">${I('x')}</button></div>
  <div class="rep-grid">${[[Math.round(w).toLocaleString('pt-PT'),'palavras lidas'],[Math.round(l),'minutos a ouvir'],[Math.round(r),'cartões revistos'],[act,'dias com atividade'],['+'+gained,'palavras conhecidas'],[added,'palavras guardadas']].map(x=>`<div class="stat"><div class="n tnum" style="font-size:32px">${x[0]}</div><div class="l">${x[1]}</div></div>`).join('')}</div>
  <div class="ai-card"><div class="ai-tag">${I('spark',13)} Resumo</div>Este mês leste em média ${Math.round(w/Math.max(1,dt.getUTCDate()))} palavras por dia${texts?` e terminaste ${texts} ${texts===1?'texto':'textos'}`:''}. ${hard.length?`As palavras que mais te custaram foram ${hard.slice(0,3).map(x=>'«'+label(x)+'»').join(', ')}: aparecem primeiro na próxima revisão.`:''}</div>
  <div class="row" style="justify-content:flex-end"><button class="btn" data-close>Fechar</button><button class="btn pri" id="rep-copy">Copiar relatório</button></div>`,'Relatório mensal');
  $('#rep-copy').onclick=()=>{try{navigator.clipboard.writeText(txt).then(()=>toast('Relatório copiado','check'),()=>toast('Não foi possível copiar aqui.'));}catch(e){toast('Não foi possível copiar aqui.');}};
}

/* =========================================================
   PRATICAR
   ========================================================= */
const PR={mode:'tr',sid:null,res:null,val:'',hide:false};
const REP={on:false,k:0,stage:'',timer:null};
function practicePool(){
  const lids=Object.keys(S.texts).concat([cur]).concat(lessonsOf(tl()).map(L=>L.id));const out=[];
  LESSONS.forEach(L=>{if(lids.indexOf(L.id)<0||L.lang!==tl())return;sentsOf(L).forEach(sid=>{const s=SENT[sid];if(!s||!s.pt)return;const n=TOK[sid].filter(t=>t.w).length;if(n>=5&&n<=20&&out.indexOf(sid)<0)out.push(sid);});});
  if(!out.length)lessonsOf(tl()).forEach(L=>sentsOf(L).forEach(sid=>{if(SENT[sid].pt&&out.length<20)out.push(sid);}));
  const ll=learningList();out.sort((a,b)=>(TOK[b].some(t=>t.w&&ll.indexOf(t.l)>=0)?1:0)-(TOK[a].some(t=>t.w&&ll.indexOf(t.l)>=0)?1:0));
  return out;
}
function norm(s){const lg=tl();return segWords(String(s).replace(/[’‘]/g,"'"),lg).filter(t=>t.w).map(t=>lowerL(t.w,lg));}
function diff(target,input){
  const A=norm(target),B=norm(input);const n=A.length,m=B.length;const dp=[];
  for(let i=0;i<=n;i++){dp.push(new Array(m+1).fill(0));}
  for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)dp[i][j]=A[i]===B[j]?dp[i+1][j+1]+1:Math.max(dp[i+1][j],dp[i][j+1]);
  const okA=new Array(n).fill(false),okB=new Array(m).fill(false);let i=0,j=0;
  while(i<n&&j<m){if(A[i]===B[j]){okA[i]=okB[j]=true;i++;j++;}else if(dp[i+1][j]>=dp[i][j+1])i++;else j++;}
  return{A:A,B:B,okA:okA,okB:okB,score:n?Math.round(dp[0][0]/n*100):0};
}
function diffHTML(d){
  return`<div class="dlab">A tua resposta</div><div class="diff" dir="auto">${d.B.length?d.B.map((w,k)=>`<span class="${d.okB[k]?'ok':'extra'}">${esc(w)}</span>`).join(' '):'<span class="muted">(vazio)</span>'}</div>
  <div class="dlab">Frase original</div><div class="diff" dir="auto">${d.A.map((w,k)=>`<span class="${d.okA[k]?'ok':'miss'}">${esc(w)}</span>`).join(' ')}</div>`;
}
function verdict(p){return p>=95?['Perfeito','ok']:p>=75?['Quase lá','ok']:p>=45?['Bom começo','warn']:['Vamos rever','bad'];}
function feedback(d,sid){
  const miss=[];d.A.forEach((w,k)=>{if(!d.okA[k]&&miss.indexOf(w)<0)miss.push(w);});
  const lem=w=>{const t=TOK[sid].find(t=>t.w&&lowerL(t.w,tl()).replace(/’/g,"'")===w);return t?t.l:w;};
  const lines=miss.slice(0,5).map(w=>{const l=lem(w);const e=info(l);return`• ${w}${e.pt?' = '+e.pt.split(';')[0]:''}`;});
  let t=d.score>=95?'Está certíssimo. A frase está igual à original.':miss.length?`Faltaram ${miss.length} ${miss.length===1?'palavra':'palavras'} da frase original:\n${lines.join('\n')}`:'Tens todas as palavras, mas há palavras a mais ou fora de ordem.';
  return t;
}
function renderPractice(){
  const pool=practicePool();
  if(!PR.sid||(SENT_LANG[PR.sid]||'en')!==tl()){PR.sid=pool.length?pool[TD()%pool.length]:null;PR.res=null;PR.val='';}
  if(!PR.sid){$('#v-practice').innerHTML=`<div class="wrap rv-wrap"><div class="page-h"><div><div class="eyebrow">Praticar</div><h1>Escrever e falar</h1></div></div><div class="card done-hero"><h2>Sem frases em ${esc(langName(tl()).toLowerCase())}</h2><p class="muted" style="max-width:46ch">A prática usa frases com tradução. Na demo, os textos importados ainda não têm tradução; na versão real, qualquer texto serve.</p><div class="row" style="justify-content:center"><button class="btn" data-h2="langs">${I('globe',16)} Mudar de língua</button></div></div></div>`;return;}
  const M=[['tr','Tradução inversa','pen','Lês em português e escreves em '+langName(tl()).toLowerCase()+'.'],['dict','Ditado','ear','Ouves a frase e escreves o que ouviste.'],['rep','Ouvir e repetir','wave','Ouves e repetes em voz alta (shadowing).']];
  const sd=SENT[PR.sid];
  let body='';
  if(PR.mode==='tr'||PR.mode==='dict'){
    const isTr=PR.mode==='tr';const L=LESSONS.find(x=>sentsOf(x).indexOf(PR.sid)>=0);
    body=`<div class="face" style="margin-top:0;min-height:0">
      <div class="row between"><span class="eyebrow">${isTr?(PR.daily?'Frase do dia · ':'')+'Tradução inversa':'Escreve o que ouves'}</span><span class="muted" style="font-size:12.5px">${esc(L?L.title:'')}</span></div>
      ${isTr?`<div style="font:400 clamp(24px,3.4vw,30px)/1.3 var(--f-d)">${esc(sd.pt)}</div><span class="muted" style="font-size:13px">Escreve em ${esc(langName(tl()).toLowerCase())}</span>`:`<div class="row" style="gap:12px"><button class="play" data-pr="say" style="height:56px;padding:0 22px 0 10px;font-size:15px"><span class="pc" style="width:36px;height:36px">${I('play',16)}</span>Ouvir frase</button><button class="btn sm" data-pr="slow">Devagar</button></div>`}
      ${PR.res?'':`<form id="pr-form" class="pr-form"><textarea id="pr-in" dir="auto" lang="${tl()}" rows="3" placeholder="${isTr?'A tua tradução em inglês…':'Escreve a frase…'}" aria-label="Resposta" spellcheck="false" autocapitalize="off">${esc(PR.val)}</textarea><div class="row between"><button type="button" class="btn sm" data-pr="hint">${I('bulb',16)} Pista</button><button class="btn blue" type="submit">Verificar ${I('arrow',16)}</button></div><div id="pr-hint"></div></form>`}
      ${PR.res?(()=>{const v=verdict(PR.res.score);return`<div class="row between"><span class="verdict ${v[1]==='bad'?'bad':v[1]==='warn'?'':'ok'}" style="${v[1]==='warn'?'color:var(--warn)':''}">${I(v[1]==='bad'?'x':'check',18)} ${v[0]}</span><span class="score tnum">${PR.res.score}%</span></div>${diffHTML(PR.res)}
        <div class="ai-card"><div class="ai-tag">${I('spark',13)} Glosa IA</div><p style="white-space:pre-line">${esc(feedback(PR.res,PR.sid))}</p><p class="muted" style="font-size:12.5px;margin-top:8px">${isTr?'Na demo comparo com a frase original, palavra a palavra. Na versão real, a IA aceita outras traduções corretas e explica cada diferença.':'Ditado comparado com a frase original, palavra a palavra.'}</p></div>
        ${isTr?'':`<div class="fsub">${esc(sd.pt||'')}</div>`}
        <div class="row"><button class="btn sm" data-pr="say">${I('spk',16)} Ouvir original</button><button class="btn sm" data-pr="retry">Tentar outra vez</button><span class="grow"></span><button class="btn pri" data-pr="next">Outra frase ${I('arrow',16)}</button></div>`;})():''}
    </div>`;
  }else{
    const L=(lessonById(cur)&&lessonById(cur).lang===tl())?lessonById(cur):lessonsOf(tl())[0];if(L&&L.id!==cur)cur=L.id;const ids=sentsOf(L);const k=Math.min(REP.k,ids.length-1);const s=SENT[ids[k]];
    body=`<div class="face" style="margin-top:0;min-height:0">
      <div class="row between"><span class="eyebrow">${esc(L.title)} · frase ${k+1} de ${ids.length}</span><label class="tog" style="gap:10px;font-size:13px"><span>Esconder texto</span><span class="sw-t"><input type="checkbox" id="pr-hide" ${PR.hide?'checked':''} aria-label="Esconder texto"><span></span></span></label></div>
      <div class="rep-stage ${REP.stage}"><div class="rep-txt" dir="auto" style="${PR.hide&&REP.stage!=='done'?'filter:blur(9px)':''}">${esc(s.en)}</div><div class="fsub">${esc(s.pt||'')}</div></div>
      <div class="rep-bar"><i id="rep-bar"></i></div>
      <div class="row between"><span class="rep-lbl" id="rep-lbl">${REP.on?(REP.stage==='repeat'?'Agora repete em voz alta':'A ouvir…'):'Pronto para começar'}</span>
      <div class="row"><button class="btn sm" data-pr="rprev" aria-label="Frase anterior">←</button><button class="play" data-pr="rtoggle"><span class="pc">${I(REP.on?'pause':'play',14)}</span>${REP.on?'Pausar':'Começar'}</button><button class="btn sm" data-pr="rnext" aria-label="Frase seguinte">→</button></div></div>
      <p class="muted" style="font-size:12.5px">Depois de cada frase há uma pausa do tamanho da frase para a repetires. A gravação da tua voz para comparar fica para a versão real: o navegador não deixa este demo usar o microfone.</p>
    </div>`;
  }
  $('#v-practice').innerHTML=`<div class="wrap rv-wrap">
  <div class="page-h"><div><div class="eyebrow">Praticar</div><h1>Escrever e falar</h1><p>Usa as frases dos textos que já leste, com prioridade para as que têm palavras que estás a aprender.</p></div></div>
  <div class="modes pmodes" style="margin:22px 0 16px">${M.map(m=>`<button class="mode ${PR.mode===m[0]?'on':''}" data-pr="mode" data-v="${m[0]}" aria-pressed="${PR.mode===m[0]}"><span class="mi">${I(m[2])}</span><b>${m[1]}</b><small>${m[3]}</small></button>`).join('')}</div>
  ${body}</div>`;
  const f=$('#pr-form');
  if(f){const ta=$('#pr-in');ta.addEventListener('input',()=>{PR.val=ta.value;});
    ta.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();f.requestSubmit?f.requestSubmit():f.dispatchEvent(new Event('submit'));}});
    f.addEventListener('submit',e=>{e.preventDefault();PR.res=diff(SENT[PR.sid].en,PR.val);logDay('r',0);renderPractice();});}
  const h=$('#pr-hide');if(h)h.onchange=()=>{PR.hide=h.checked;renderPractice();};
}
function stopRep(){REP.on=false;clearTimeout(REP.timer);try{speechSynthesis.cancel();}catch(e){}REP.stage='';}
function repRun(){
  if(!REP.on)return;const ids=sentsOf(lessonById(cur));
  if(REP.k>=ids.length){stopRep();REP.k=0;REP.stage='done';renderPractice();toast('Chegaste ao fim do texto','check');return;}
  REP.stage='listen';renderPractice();const s=SENT[ids[REP.k]];const t0=Date.now();
  const ok=say(s.en,{end:()=>{
    if(!REP.on)return;logDay('l',(Date.now()-t0)/60000);
    const dur=Math.max(1800,(Date.now()-t0)*1.15);REP.stage='repeat';renderPractice();
    const bar=$('#rep-bar');if(bar){bar.style.transition='none';bar.style.width='0';requestAnimationFrame(()=>{requestAnimationFrame(()=>{bar.style.transition=`width ${dur}ms linear`;bar.style.width='100%';});});}
    REP.timer=setTimeout(()=>{if(!REP.on)return;REP.k++;repRun();},dur);
  },err:()=>{stopRep();renderPractice();}});
  if(!ok){stopRep();renderPractice();}
}
$('#v-practice').addEventListener('click',e=>{
  const b=e.target.closest('[data-pr]');if(!b)return;const a=b.dataset.pr;
  if(a==='mode'){stopRep();PR.mode=b.dataset.v;PR.res=null;renderPractice();}
  else if(a==='say')say(SENT[PR.sid].en);
  else if(a==='slow')say(SENT[PR.sid].en,{rate:.7});
  else if(a==='hint'){const ws=TOK[PR.sid].filter(t=>t.w);const k=ws.filter(t=>status(t.l)>=0&&status(t.l)<=4&&DICT[t.l]).slice(0,3);$('#pr-hint').innerHTML=`<p class="muted" style="font-size:13.5px;margin-top:8px">${ws.length} palavras. Começa por «${esc(ws[0].w)}…»${k.length?'. Usa: '+k.map(t=>'<b>'+esc(t.w)+'</b>').join(', '):''}.</p>`;}
  else if(a==='retry'){PR.res=null;renderPractice();}
  else if(a==='next'){const p=practicePool().filter(x=>x!==PR.sid);PR.sid=p[Math.floor(Math.random()*p.length)]||PR.sid;PR.res=null;PR.val='';PR.daily=false;renderPractice();if(PR.mode==='dict')setTimeout(()=>say(SENT[PR.sid].en),200);}
  else if(a==='rtoggle'){if(REP.on){stopRep();renderPractice();}else{REP.on=true;repRun();}}
  else if(a==='rnext'||a==='rprev'){const n=sentsOf(lessonById(cur)).length;const was=REP.on;stopRep();REP.k=Math.max(0,Math.min(n-1,REP.k+(a==='rnext'?1:-1)));if(was){REP.on=true;repRun();}else renderPractice();}
});
PR.daily=true;

/* =========================================================
   LÍNGUAS
   ========================================================= */
function setLang(lg){
  S.settings.lang=lg;const own=lessonsOf(lg);
  if(!(lessonById(cur)&&lessonById(cur).lang===lg)&&own.length)cur=own[0].id;
  save();PR.sid=null;REP.k=0;
}
function langStats(lg){
  let k=0,l=0;Object.keys(S.vocab).forEach(key=>{if(langOfKey(key)!==lg)return;const v=S.vocab[key];if(v.st===5&&!isBasic(key))k++;else if(v.st>=1&&v.st<=4)l++;});
  return{k:k,l:l,lessons:lessonsOf(lg).length};
}
function langsCard(){
  const used={};LESSONS.forEach(L=>{used[L.lang]=1;});Object.keys(S.vocab).forEach(k=>{used[langOfKey(k)]=1;});used[tl()]=1;
  const rows=Object.keys(used).map(lg=>({lg:lg,s:langStats(lg)})).sort((a,b)=>(b.lg===tl())-(a.lg===tl())||(b.s.l+b.s.k)-(a.s.l+a.s.k));
  return`<div class="card pspan"><div class="row between"><h3>As tuas línguas</h3><button class="btn sm" data-h2="langs">${I('globe',16)} Todas as línguas</button></div><p class="muted" style="font-size:13px;margin:4px 0 14px">Os gráficos desta página mostram a língua que estás a aprender agora: ${esc(langName(tl()).toLowerCase())}.</p>
  <div class="lgrid">${rows.map(r=>`<button class="lcard ${r.lg===tl()?'on':''}" data-setlang="${r.lg}"><span class="ln" lang="${r.lg}" dir="auto">${esc(langNat(r.lg))}</span><span class="muted" style="font-size:12.5px">${esc(langName(r.lg))}</span><span class="lst"><span><b>${r.s.l}</b> a aprender</span><span><b>${r.s.k}</b> conhecidas</span><span><b>${r.s.lessons}</b> textos</span></span></button>`).join('')}</div></div>`;
}
function langBadges(lg){
  const b=[];const n=lessonsOf(lg).length;
  if(n)b.push(`<span class="pill p-k">${n} ${n===1?'texto':'textos'} na demo</span>`);
  if(ALLV.length)b.push(voicesFor(lg).length?`<span class="pill p-new">${I('spk',12)} voz neste dispositivo</span>`:`<span class="pill p-i">sem voz neste dispositivo</span>`);
  if(RTL[lg])b.push('<span class="pill p-i">da direita para a esquerda</span>');
  if(NOSPACE[lg])b.push('<span class="pill p-i">palavras separadas automaticamente</span>');
  return b.join('');
}
let LQ='';
function langModal(){
  const demo=[...new Set(LESSONS.map(L=>L.lang))].map(c=>langName(c).toLowerCase());
  setModal(`<div class="mhead"><div><div class="eyebrow">${LANGS.length} línguas</div><h2 style="margin-top:6px">Que língua queres aprender?</h2></div><button class="ibtn" data-close aria-label="Fechar">${I('x')}</button></div>
  <p class="muted" style="font-size:14px">Qualquer língua funciona no leitor: importas um texto e o Glosa separa as palavras, guarda estados e cartões e lê em voz alta se o teu dispositivo tiver voz. Na versão real, a tradução e a IA cobrem todas as línguas da lista. Na demo há textos de exemplo em ${demo.slice(0,-1).join(', ')} e ${demo.slice(-1)}.</p>
  <label class="search" style="max-width:none">${I('search',18)}<input id="lq" type="search" placeholder="Procurar língua" aria-label="Procurar língua" value="${esc(LQ)}"></label>
  <div id="lq-list" class="llist"></div>`,'Línguas');
  const draw=()=>{const q=LQ.trim().toLowerCase();
    const list=LANGS.filter(x=>!q||x.pt.toLowerCase().indexOf(q)>=0||x.nat.toLowerCase().indexOf(q)>=0||x.code.toLowerCase()===q).sort((a,b)=>(lessonsOf(b.code).length?1:0)-(lessonsOf(a.code).length?1:0)||a.pt.localeCompare(b.pt,'pt'));
    $('#lq-list').innerHTML=list.length?list.map(x=>`<button class="lrow ${x.code===tl()?'on':''}" data-setlang="${x.code}"><span style="min-width:0"><span class="ln" lang="${x.code}" dir="auto">${esc(x.nat)}</span> <span class="muted" style="font-size:13px">${esc(x.pt)}</span><span class="lb">${langBadges(x.code)}</span></span>${x.code===tl()?`<span class="chip ok">${I('check',14)} A aprender</span>`:I('arrow',18)}</button>`).join(''):'<div class="empty">Nenhuma língua encontrada.</div>';};
  draw();const q=$('#lq');q.addEventListener('input',()=>{LQ=q.value;draw();});
}
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-setlang]');
  if(b){const lg=b.dataset.setlang;setLang(lg);closeModal();toast('A aprender: '+langName(lg),'globe');go(['prog','words','review','practice'].indexOf(view)>=0?view:'lib');return;}
  const h=e.target.closest('[data-h2="langs"]');if(h)langModal();
});
