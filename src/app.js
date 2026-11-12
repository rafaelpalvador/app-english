
/* =========================================================
   Glosa · demo v2
   Tudo corre no navegador. Traduções e explicações de IA dos
   5 textos de exemplo são pré-escritas.
   ========================================================= */
const $=(s,r)=>(r||document).querySelector(s);
const $$=(s,r)=>Array.from((r||document).querySelectorAll(s));
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const P={
 home:'<path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5H15v-6H9v6H5.5A1.5 1.5 0 0 1 4 19z"/>',
 read:'<path d="M3.5 5.5c2.8-1 5.8-.8 8.5 1 2.7-1.8 5.7-2 8.5-1v13c-2.8-1-5.8-.8-8.5 1-2.7-1.8-5.7-2-8.5-1z"/><path d="M12 6.5v13"/>',
 lib:'<rect x="4" y="4" width="3.5" height="16" rx="1"/><rect x="9.5" y="4" width="3.5" height="16" rx="1"/><path d="m15.4 5.6 3.2-.9 3.4 14.6-3.2.9z"/>',
 cards:'<rect x="3" y="7.5" width="14" height="12.5" rx="2.5"/><path d="M7 4.5h11.5A2.5 2.5 0 0 1 21 7v9.5"/>',
 words:'<path d="M3 18 7.5 6 12 18M4.8 14h5.4"/><path d="M14.5 11c.6-.9 1.6-1.4 2.8-1.4 1.8 0 2.7 1 2.7 2.8V18m0-3.4c-.9-.6-1.9-.9-3-.9-1.6 0-2.6.8-2.6 2.1s1 2.1 2.4 2.1c1.4 0 2.6-.8 3.2-1.9"/>',
 chart:'<path d="M5 20v-8M11 20V5M17 20v-5"/><path d="M3 20h18"/>',
 gear:'<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
 flame:'<path fill="currentColor" stroke="none" d="M12 21.5c-4 0-6.8-2.7-6.8-6.4 0-3.5 2.5-5.6 3.7-7.8.4 1.7 1.4 2.8 2.5 3.3.2-2.8 1.4-5.4 3.7-7.6.3 3.3 2 5 3.3 6.8.9 1.3 1.2 2.7 1.2 4.2 0 4.4-3.2 7.5-7.6 7.5z"/>',
 play:'<path d="M8.5 5.5v13l10-6.5z" fill="currentColor" stroke="none"/>',
 pause:'<rect x="7" y="5.5" width="3.5" height="13" rx="1" fill="currentColor" stroke="none"/><rect x="13.5" y="5.5" width="3.5" height="13" rx="1" fill="currentColor" stroke="none"/>',
 spk:'<path d="M4 9.5v5h3.5L12 18V6L7.5 9.5z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
 spark:'<path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7z"/><path d="M19 15.5c.2 1.4.9 2.1 2.3 2.3-1.4.2-2.1.9-2.3 2.3-.2-1.4-.9-2.1-2.3-2.3 1.4-.2 2.1-.9 2.3-2.3z"/>',
 x:'<path d="M6 6l12 12M18 6 6 18"/>',
 check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
 search:'<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
 upload:'<path d="M12 15V4m0 0L7.5 8.5M12 4l4.5 4.5"/><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
 link:'<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
 yt:'<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9.5 5 2.5-5 2.5z"/>',
 file:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
 clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
 head:'<path d="M4 16v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4.5" height="6.5" rx="1.5"/><rect x="16.5" y="14" width="4.5" height="6.5" rx="1.5"/>',
 note:'<path d="M5 4h14v11l-5 5H5z"/><path d="M14 20v-5h5M8.5 9h7M8.5 12.5h4"/>',
 tr:'<path d="M4 6h9M8.5 4v2M6 6c.8 3 3 5.2 6 6.5M12 6c-.8 3-3 5.2-6 6.5"/><path d="M12.5 20l3.5-8 3.5 8M13.8 17h4.4"/>',
 arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>',
 mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
 flip:'<path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5M20 4v4.5h-4.5"/><path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.5M4 20v-4.5h4.5"/>',
 cloze:'<rect x="3" y="8" width="18" height="8" rx="2"/><path d="M8.5 12h7" stroke-dasharray="1.5 2.2"/>',
 choice:'<circle cx="6" cy="7" r="2"/><circle cx="6" cy="17" r="2"/><path d="M11 7h9M11 17h9"/>',
 ear:'<path d="M7 9a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-6 0"/><path d="M10 9.5a2 2 0 0 1 4 0"/>',
 dl:'<path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5"/><path d="M4 17v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1"/>',
 target:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
 send:'<path d="M5 12h13M13 6l6 6-6 6"/>',
 kb:'<rect x="2.5" y="6" width="19" height="12" rx="2.5"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7.5 14h9"/>',
 eye:'<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 globe:'<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5s1.2-6.1 3.5-8.5z"/>',
 pen:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
 wave:'<path d="M3 12h2M7 8v8M11 5v14M15 9v6M19 7v10"/>',
 bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
 pausei:'<circle cx="12" cy="12" r="8.5"/><path d="M10 9v6M14 9v6"/>',
 cal:'<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'
};
function I(n,s){return`<svg viewBox="0 0 24 24" width="${s||20}" height="${s||20}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]||''}</svg>`;}
const reduced=(()=>{try{return window.matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){return false;}})();
const wide=()=>{try{return window.matchMedia('(min-width:1180px)').matches;}catch(e){return false;}};

/* ---------- datas ---------- */
const DAY=864e5;
function TD(){const d=new Date();return Math.floor((d.getTime()-d.getTimezoneOffset()*60000)/DAY);}
const WD=['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
const MO=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
function dow(i){return new Date(i*DAY).getUTCDay();}
function dateLabel(i){const d=new Date(i*DAY);return WD[d.getUTCDay()]+', '+d.getUTCDate()+' de '+MO[d.getUTCMonth()];}
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function hashStr(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}

/* ---------- estado ---------- */
const KEY='glosa-v2';
function defaults(){
  const t=TD(),days={},r=rng(11);
  for(let o=104;o>=1;o--){
    const x=r();
    if(o<=9||x>0.24){days[t-o]={w:Math.round((70+r()*250)*(o<35?1.15:.8)),l:Math.round(r()*14*10)/10,r:Math.round(5+r()*24)};}
  }
  days[t]={w:120,l:3.5,r:0};
  const LP={cliff:3,guess:2,struggle:2,stick:2,however:1,wander:1,context:1};
  const sd=(st,sid,surf,due,ivl,reps)=>({st:st,ctx:{sid:sid,surf:surf},srs:{ivl:ivl,ease:2.4,reps:reps,lapses:LP[surf.toLowerCase()]||LP[{decided:'decide'}[surf]]||0,due:t+due,last:t+due-ivl},added:t-6-reps-(reps*3)});
  return{
    vocab:{
      decide:sd(4,'t1s1','decided',0,6,3),empty:sd(4,'t1s3','empty',0,5,3),enjoy:sd(3,'t2s3','enjoy',0,3,2),guess:sd(3,'t2s4','guess',-1,3,2),
      memory:sd(3,'t2s5','memory',0,3,2),habit:sd(3,'t3s3','habit',0,3,2),context:sd(2,'t2s4','context',0,1,1),cliff:sd(2,'t3s1','cliff',-2,1,1),
      difference:sd(2,'t2s3','difference',0,1,1),stick:sd(1,'t2s5','stick',2,0,0),struggle:sd(1,'t2s1','struggle',3,0,0),
      fresh:sd(2,'t4s2','fresh',0,1,1),wander:sd(3,'t4s3','wander',1,3,2),however:sd(1,'t5s3','However',0,0,0),
      'phrase:little by little':{st:2,phrase:true,pt:'pouco a pouco',ctx:{sid:'t2s7',surf:'Little by little'},srs:{ivl:1,ease:2.5,reps:1,lapses:0,due:t},added:t-2},
      mistake:{st:5},afraid:{st:5},process:{st:5},notice:{st:5}
    },
    days:days,texts:{t2:t-3},pos:{t1:0.36},imported:[],last:'t1',pend:{},log:seedLog(t),
    settings:{flow:false,fs:20,lh:1.95,rtheme:'paper',hl:'all',rate:1,voice:'',expr:true,sbtn:true,theme:'auto',goal:{r:250,l:10,c:20},engine:'deepl',llm:'gemini',prio:true}
  };
}
function seedLog(t){
  const r=rng(23),out=[],ws=['decide','empty','enjoy','guess','memory','habit','context','cliff','difference','stick','struggle','fresh','wander','however','mistake','afraid','process','notice'];
  const B=[1,1,2,3,3,5,6,8,10,13,17,22,28];
  for(let k=0;k<240;k++){const ivl=B[Math.floor(r()*B.length)];const p=0.93*Math.exp(-ivl/(16+r()*10))+0.08;out.push([t-1-Math.floor(r()*60),ivl,r()<p?1:0,ws[Math.floor(r()*ws.length)]]);}
  return out;
}
function load(){
  const d=defaults();
  try{
    const raw=localStorage.getItem(KEY);
    if(raw){const o=JSON.parse(raw);Object.assign(d,o);d.settings=Object.assign(defaults().settings,o.settings||{});d.settings.goal=Object.assign(defaults().settings.goal,(o.settings&&o.settings.goal)||{});}
  }catch(e){}
  return d;
}
let S=load();
function save(){try{if(S.log&&S.log.length>3000)S.log=S.log.slice(-3000);localStorage.setItem(KEY,JSON.stringify(S));return true;}catch(e){return false;}}
function logDay(k,n){const t=TD();const v=S.days[t]||(S.days[t]={w:0,l:0,r:0});v[k]=(v[k]||0)+n;save();updateChrome();}
function active(d){const v=S.days[d];return !!(v&&(v.w>0||v.l>0||v.r>0));}
function weekWords(){const t=TD(),wd=(dow(t)+6)%7;let a=0,b=0;const days=[];for(let o=wd;o>=0;o--){const v=(S.days[t-o]||{w:0}).w;a+=v;days.push(v);}while(days.length<7)days.push(null);for(let o=wd+7;o>=7;o--)b+=(S.days[t-o]||{w:0}).w;return{now:a,prev:b,days:days};}
function weekBars(days,h,on,off){const mx=Math.max.apply(null,days.map(x=>x||0).concat([1]));const L=['S','T','Q','Q','S','S','D'];return`<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:5px;align-items:end;height:${h}px">${days.map(v=>`<i style="display:block;border-radius:5px;height:${v==null?4:Math.max(4,Math.round((v/mx)*(h-4)))}px;background:${v==null?off:v>0?on:off}"></i>`).join('')}</div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:5px;margin-top:5px;font-size:10px;text-align:center;opacity:.7">${L.map(x=>`<span>${x}</span>`).join('')}</div>`;}
function streak(){let n=0,d=TD();if(!active(d))d--;while(active(d)){n++;d--;}return n;}

function registerImported(L){
  const lg=L.lang||'en';const ids=[];const paras=[];let curP=null;
  L.sents.forEach((s,k)=>{SENT[s.id]={en:s.en,pt:null};SENT_LANG[s.id]=lg;buildTokAny(s.id);ids.push(s.id);
    if(!curP||s.p||curP.length>=6||(s.p===undefined&&k%4===0)){curP=[];paras.push(curP);}curP.push(s.id);});
  LESSONS.push({id:L.id,gid:L.gid||null,book:L.book||null,lang:lg,title:L.title,level:'Meu',tag:L.fmt||'Importado',paras:paras,qs:[],imp:true});
  META[L.id]={coll:L.book||'Os meus textos',part:L.part||null,author:L.book?'Livro importado':'Importado por ti',blurb:(L.sents[0]&&L.sents[0].en)||''};
}
S.imported.forEach(registerImported);

/* ---------- palavras ---------- */
function status(l){const v=S.vocab[l];if(v)return v.st;return isBasic(l)?5:0;}
function stc(l){const s=status(l);return s===5?'k':s===-1?'i':String(s);}
function infoBase(l){const v=S.vocab[l];if(v&&v.phrase)return{pt:v.pt,pos:'expressão',ipa:null,ai:null};
  if(l.charAt(0)==='@'){const k=l.indexOf(':'),lg=l.slice(1,k),w=l.slice(k+1);const dd=DICTX[lg]&&DICTX[lg][w];return{pt:dd?dd.pt:(BASICX[lg]&&BASICX[lg][w])||null,pos:dd&&dd.pos,ipa:dd&&dd.ipa,ai:dd&&dd.ai};}
  return entry(l);}
function tl(){return S.settings.lang||'en';}
function inLang(l){return langOfKey(l)===tl();}
function lessonsOf(lg){return LESSONS.filter(L=>L.lang===lg&&L.id!=='rev');}
function label(l){return l.indexOf('phrase:')===0?l.slice(7):l.charAt(0)==='@'?l.slice(l.indexOf(':')+1):l;}
const ST_NAME={0:'Nova','1':'A aprender · 1','2':'A aprender · 2','3':'A aprender · 3','4':'A aprender · 4',5:'Conhecida','-1':'Ignorada'};
function stPill(s){const c=s===0?'p-new':s===5?'p-k':s===-1?'p-i':'p-l'+s;const t=s===0?'Nova':s===5?'Conhecida':s===-1?'Ignorada':'Nível '+s;return`<span class="pill ${c}">${t}</span>`;}
function bandColor(s){return s===0?'var(--new)':s===5?'var(--known)':s===-1?'var(--line-2)':'var(--hl'+s+')';}
function lvlDots(s){let h='<span class="lvl" aria-hidden="true">';for(let i=1;i<=4;i++)h+=`<i class="${s>=i&&s<5?'on':''}"></i>`;return h+'</span>';}
function newSrs(){return{ivl:0,ease:2.5,reps:0,lapses:0,due:TD()};}
function setStatusFor(l,v,ctx){
  const o=S.vocab[l];
  if(o&&o.phrase){if(v===0||v===-1)delete S.vocab[l];else{o.st=v;if(v<=4&&!o.srs)o.srs=newSrs();}save();return;}
  if(v===0){if(isBasic(l))S.vocab[l]=Object.assign(o||{},{st:0});else if(o&&o.note)o.st=0;else delete S.vocab[l];}
  else{const n=o||{};n.st=v;if(v>=1&&v<=4){if(!n.ctx&&ctx)n.ctx=ctx;if(!n.srs)n.srs=newSrs();if(!n.added)n.added=TD();}S.vocab[l]=n;}
  save();
}
function lessonById(id){return LESSONS.find(x=>x.id===id);}
function sentsOf(L){return L.paras.reduce((a,p)=>a.concat(p),[]);}
function lessonStats(L){
  let tot=0,k=0,lr=0,nw=0;const T={k:{},l:{},n:{}};
  sentsOf(L).forEach(sid=>TOK[sid].forEach(t=>{
    if(!t.w)return;tot++;const s=status(t.l);
    if(s===5||s===-1){k++;T.k[t.l]=1;}else if(s>=1){lr++;T.l[t.l]=1;}else{nw++;T.n[t.l]=1;}
  }));
  return{tot:tot,k:k,lr:lr,nw:nw,pct:tot?Math.round(k/tot*100):0,newTypes:Object.keys(T.n).length,learnTypes:Object.keys(T.l).length,knownTypes:Object.keys(T.k).length};
}
function lessonLemmas(id){const o={};const L=lessonById(id);if(!L)return o;sentsOf(L).forEach(sid=>TOK[sid].forEach(t=>{if(t.w)o[t.l]=1;}));return o;}
function meterHTML(st,thin){const p=x=>st.tot?(x/st.tot*100).toFixed(1):0;return`<div class="meter${thin?' thin':''}" role="img" aria-label="${st.pct}% das palavras conhecidas"><i class="m-k" style="width:${p(st.k)}%"></i><i class="m-l" style="width:${p(st.lr)}%"></i><i class="m-n" style="width:${p(st.nw)}%"></i></div>`;}
function diffLabel(p){return p>=95?'Fácil para ti':p>=88?'Nível ideal':p>=80?'Desafiante':'Difícil por agora';}
function minutes(st){return Math.max(1,Math.round(st.tot/110));}
function knownCount(){const lg=tl();const n=Object.keys(S.vocab).filter(l=>S.vocab[l].st===5&&!isBasic(l)&&!S.vocab[l].phrase&&inLang(l)).length;return lg==='en'?640+n:Object.keys(BASICX[lg]||{}).length+n;}
function learningList(){return Object.keys(S.vocab).filter(l=>{const v=S.vocab[l];return v.st>=1&&v.st<=4&&inLang(l);});}
function dueList(){
  const t=TD();const cl=S.settings.prio?lessonLemmas(cur):{};
  return Object.keys(S.vocab).filter(l=>{const v=S.vocab[l];return v.st>=1&&v.st<=4&&v.srs&&v.srs.due<=t&&v.ctx&&TOK[v.ctx.sid]&&inLang(l);})
    .sort((a,b)=>(cl[a]?0:1)-(cl[b]?0:1)||S.vocab[a].srs.due-S.vocab[b].srs.due);
}
function offsets(sid){let p=0;TOK[sid].forEach(t=>{t.o=p;p+=(t.w||t.p).length;});}
function ctxHTML(sid,surf,mode){
  const toks=TOK[sid];const target=String(surf).toLowerCase().split(/\s+/);
  const wi=[];toks.forEach((t,i)=>{if(t.w)wi.push(i);});
  let a=-1,b=-1;
  for(let k=0;k+target.length<=wi.length;k++){let ok=true;for(let j=0;j<target.length;j++){if(toks[wi[k+j]].w.toLowerCase()!==target[j]){ok=false;break;}}if(ok){a=wi[k];b=wi[k+target.length-1];break;}}
  let h='';
  toks.forEach((t,i)=>{
    const s=esc(t.w||t.p);
    if(a>=0&&i===a)h+=mode==='blank'?'<span class="blank" aria-label="palavra em falta"></span>':'<mark>';
    if(!(mode==='blank'&&a>=0&&i>=a&&i<=b))h+=s;
    if(a>=0&&i===b&&mode!=='blank')h+='</mark>';
  });
  return h;
}

/* ---------- capas geradas ---------- */
/* ---------- capas tipográficas ---------- */
const CVP=[['#1F2B44','#ECE7DA'],['#2E4A3B','#E9EEE5'],['#6E2F2A','#F4E9E2'],['#B58C3C','#1C1810'],['#3A3D44','#ECEAE4'],['#2A5870','#E7EFF3'],['#574866','#EFEAF3'],['#CDC7B8','#23211C'],['#8C5A3C','#F5ECE3'],['#16302B','#DDE9E2']];
const CVK={t1:0,t2:1,t3:5,t4:2,t5:3,t6:9,rev:7,es1:8,fr1:5,de1:4,ja1:6,ar1:1};
function motif(id){
  const S=(d)=>`<svg viewBox="0 0 100 64" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  let d='';
  if(id==='t1'){for(let i=0;i<9;i++){const x=6+i*11,y=6+(i%3)*8;d+=`<path d="M${x} ${y}l-4 14"/>`;}d+='<path d="M8 58h84"/><circle cx="74" cy="46" r="6"/>';}
  else if(id==='t2'){for(let r=6;r<=36;r+=8)d+=`<path d="M${50-r} 58a${r} ${r} 0 0 1 ${2*r} 0"/>`;d+='<circle cx="50" cy="58" r="1.6" fill="currentColor"/>';}
  else if(id==='t3'){d='<path d="M44 58l3-36h6l3 36"/><path d="M45 22h10l-5-7z"/><path d="M55 18l40-12M55 20l40 4" opacity=".7"/><path d="M4 58h92"/>';}
  else if(id==='t4'){for(let i=0;i<6;i++){const x=6+i*15;d+=`<path d="M${x} 20a7.5 7.5 0 0 0 15 0"/>`;}d+='<path d="M6 20h90M14 28v30M88 28v30M6 58h90"/><circle cx="32" cy="50" r="4"/><circle cx="44" cy="50" r="4"/><circle cx="56" cy="50" r="4"/>';}
  else if(id==='t5'){d='<path d="M4 58h92M4 6v52"/><path d="M8 10C16 40 22 46 30 48L30 14C38 38 46 42 56 44L56 18C66 34 76 38 92 40"/><circle cx="30" cy="14" r="2" fill="currentColor"/><circle cx="56" cy="18" r="2" fill="currentColor"/>';}
  else if(id==='t6'){d='<path d="M4 30h30l8 8h14l10 20"/><path d="M56 58h40"/><path d="M70 24l4-6 4 6M76 22l3-4 3 4"/><circle cx="20" cy="22" r="1.4" fill="currentColor"/>';}
  else if(id==='es1'){d='<path d="M30 30h36v12a14 14 0 0 1-14 14h-8a14 14 0 0 1-14-14z"/><path d="M66 34h6a6 6 0 0 1 0 12h-7"/><path d="M40 22c-3-4 3-6 0-10M50 22c-3-4 3-6 0-10M60 22c-3-4 3-6 0-10"/><path d="M20 60h60"/>';}
  else if(id==='fr1'){d='<circle cx="72" cy="18" r="9"/><path d="M8 58h84M16 58V40h22v18M44 58V32l12-8 12 8v26"/>';}
  else if(id==='de1'){d='<circle cx="34" cy="24" r="14"/><path d="M34 38v20M4 58h92"/><path d="M60 50h22M64 50v8M78 50v8"/><path d="M84 40c3 0 5 2 5 5"/>';}
  else if(id==='ja1'){for(let i=0;i<10;i++){const x=8+i*9;d+=`<path d="M${x} ${6+(i%2)*6}v10"/>`;}d+='<path d="M36 58V40h28v18M32 40h36l-18-10z"/>';}
  else if(id==='ar1'){d='<path d="M30 58V30a20 20 0 0 1 40 0v28"/><path d="M38 58V32a12 12 0 0 1 24 0v26"/><path d="M8 58h84"/>';}
  else if(id==='rev'){d='<path d="M6 12h70M6 26h84M6 40h56M6 54h76"/><path d="M40 22h24" stroke-width="5" opacity=".4"/>';}
  else{const h=hashStr(id);const a=h%3;if(a===0)d='<circle cx="50" cy="30" r="22"/><path d="M8 58h84"/>';else if(a===1)d='<path d="M8 58L50 10l42 48z"/>';else d='<rect x="24" y="8" width="52" height="50"/><path d="M24 33h52"/>';}
  return S(d);
}
function coverBox(L,cls,extra){
  const key=L.gid||L.id;const pi=CVK[key]!=null?CVK[key]:hashStr(key)%CVP.length;const p=CVP[pi];const t=L.book||L.title;
  const sub=L.level==='Meu'?langName(L.lang||'en'):L.level+' · '+langName(L.lang||'en');
  return`<div class="cover ${cls||''}" style="--cv:${p[0]};--cvi:${p[1]}"><div class="cv-in"><span class="cv-mark">${motif(key)}</span><span><span class="cv-title" dir="auto">${esc(t)}</span><span class="cv-sub" style="display:block">${esc(sub)}</span></span></div>${extra||''}</div>`;
}

/* ---------- anéis e gráficos ---------- */
function rings(list,size){
  const sz=size||120,c=sz/2,sw=Math.max(2.5,Math.round(sz*.035*10)/10),step=sw+Math.max(5,Math.round(sz*.06));let s=`<svg width="${sz}" height="${sz}" viewBox="0 0 ${sz} ${sz}" role="img" aria-label="Metas de hoje">`;
  list.forEach((it,i)=>{const r=c-sw/2-1-i*step,C=2*Math.PI*r,p=Math.max(0,Math.min(1,it.p));
    s+=`<circle cx="${c}" cy="${c}" r="${r}" fill="none" style="stroke:var(--line)" stroke-width="${sw}"/>`;
    s+=`<circle cx="${c}" cy="${c}" r="${r}" fill="none" style="stroke:${it.c}" stroke-width="${sw}" stroke-linecap="round" stroke-dasharray="${(C*p).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 ${c} ${c})"/>`;});
  return s+'</svg>';
}
function ring1(p,size,color,inner){const sz=size||140,c=sz/2,r=c-9,C=2*Math.PI*r;return`<div class="ring-wrap"><svg width="${sz}" height="${sz}" viewBox="0 0 ${sz} ${sz}" aria-hidden="true"><circle cx="${c}" cy="${c}" r="${r}" fill="none" style="stroke:var(--line)" stroke-width="3"/><circle cx="${c}" cy="${c}" r="${r}" fill="none" style="stroke:${color||'var(--ink)'}" stroke-width="3" stroke-linecap="round" stroke-dasharray="${(C*Math.max(0,Math.min(1,p))).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 ${c} ${c})"/></svg><div class="c">${inner||''}</div></div>`;}
function goals(){const t=S.days[TD()]||{w:0,l:0,r:0};const g=S.settings.goal;return[{k:'Ler',v:t.w,g:g.r,u:'palavras',c:'var(--ink)'},{k:'Ouvir',v:t.l,g:g.l,u:'min',c:'var(--accent)'},{k:'Rever',v:t.r,g:g.c,u:'cartões',c:'#C79A2B'}];}
function fmt(n){return(Math.round(n*10)/10).toLocaleString('pt-PT');}
function spark(vals,w,h){
  const mx=Math.max.apply(null,vals.concat([1])),mn=0;const pts=vals.map((v,i)=>[i*(w/(vals.length-1)),h-3-((v-mn)/(mx-mn||1))*(h-8)]);
  const d=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');const l=pts[pts.length-1];
  const gid='sg'+Math.floor(Math.random()*1e6);
  return`<svg class="ch" viewBox="0 0 ${w} ${h}" aria-hidden="true"><defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="gs1"/><stop offset="1" class="gs2"/></linearGradient></defs><path d="${d} L${w} ${h} L0 ${h}Z" fill="url(#${gid})"/><path class="ln" d="${d}" style="stroke-width:2"/><circle class="pt" cx="${l[0].toFixed(1)}" cy="${l[1].toFixed(1)}" r="3.2"/></svg>`;
}

/* ---------- UI genérica ---------- */
let toastT;
function toast(m,ic){const t=$('#toast');t.innerHTML=(ic?I(ic,18):'')+'<span>'+esc(m)+'</span>';t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),2400);}
let modalOn=null;
function setModal(h,label){$('#mcard').innerHTML=h;$('#mcard').setAttribute('aria-label',label||'Janela');$('#modal').hidden=false;modalOn=label||'m';const f=$('#mcard [autofocus]');if(f)try{f.focus();}catch(e){}}
function closeModal(){$('#modal').hidden=true;$('#mcard').innerHTML='';modalOn=null;}

/* ---------- navegação ---------- */
const NAV=[['home','Hoje','home'],['read','Ler','read'],['lib','Biblioteca','lib'],['review','Rever','cards'],['practice','Praticar','pen'],['words','Palavras','words'],['prog','Progresso','chart']];
const TABS=['home','lib','read','review','practice'];
const HASH={home:'hoje',read:'ler',lib:'biblioteca',review:'rever',practice:'praticar',words:'palavras',prog:'progresso'};
let view='home',cur=S.last&&lessonById(S.last)?S.last:'t1',G=null;
function renderNav(){
  const due=dueList().length;
  $('#rail-lang').innerHTML=`${I('globe',18)}<span class="grow">${esc(langName(tl()))}</span><span class="lcode">${esc(tl().toUpperCase())}</span>`;$('#tb-lang').textContent=tl().toUpperCase();
  $('#rnav').innerHTML=NAV.map((n,i)=>`${i===5?'<div class="sep"></div>':''}<button data-nav="${n[0]}" aria-current="${view===n[0]?'page':'false'}">${I(n[2])}<span>${n[1]}</span>${n[0]==='review'&&due?`<span class="badge">${due}</span>`:''}</button>`).join('');
  $('#tabbar').innerHTML=TABS.map(k=>{const n=NAV.find(x=>x[0]===k);return`<button data-nav="${k}" aria-current="${view===k?'page':'false'}"><span class="ti">${I(n[2],21)}</span>${n[1]}${k==='review'&&due?`<span class="badge">${due}</span>`:''}</button>`;}).join('');
  $('#rail-foot').innerHTML=`<button class="rail-set" data-open-settings aria-label="Definições" title="Definições">${I('gear',19)}</button>`;
  $('#tb-prog').innerHTML=I('chart');$('#tb-words').innerHTML=I('words');$('#tb-set').innerHTML=I('gear');
}
function updateChrome(){renderNav();}
function go(v,silent){
  if(!HASH[v])v='home';
  if(v!=='read'&&PL.on)stopPlay();
  if(v!=='practice'&&REP.on)stopRep();
  view=v;
  $$('.view').forEach(s=>{s.hidden=s.id!=='v-'+v;});
  document.body.classList.toggle('reading-open',v==='read'&&!!G);
  if(v==='home')renderHome();else if(v==='read')renderRead();else if(v==='lib')renderLib();else if(v==='review'){R.phase='start';renderReview();}else if(v==='words')renderWords();else if(v==='practice')renderPractice();else if(v==='prog')renderProg();
  renderNav();
  try{if(location.hash!=='#'+HASH[v])history.replaceState(null,'','#'+HASH[v]);}catch(e){try{location.hash=HASH[v];}catch(e2){}}
  if(!silent)window.scrollTo(0,0);
}
function fromHash(){const h=(location.hash||'').slice(1);return Object.keys(HASH).find(k=>HASH[k]===h)||null;}
function openLesson(id,word){
  if(!lessonById(id))return;
  cur=id;S.last=id;S.settings.lang=lessonById(id).lang||'en';save();G=null;if(PL.on)stopPlay();
  go('read');
  if(word){const i=TOK[word.sid]?TOK[word.sid].findIndex(t=>t.w&&t.l===word.l):-1;if(i>=0){openWord(word.sid,i);const el=$(`#text .w[data-s="${word.sid}"][data-i="${i}"]`);if(el)try{el.scrollIntoView({block:'center'});}catch(e){}}}
}

/* =========================================================
   HOJE
   ========================================================= */
function renderHome(){
  const t=TD(),h=new Date().getHours();const wk=weekWords();
  const greet=h<6?'Boa noite':h<13?'Bom dia':h<20?'Boa tarde':'Boa noite';
  const due=dueList().length;const own=lessonsOf(tl());const L=(lessonById(cur)&&lessonById(cur).lang===tl())?lessonById(cur):own[0]||null;const st=L?lessonStats(L):null;const m=L?META[L.id]||{}:{};
  const read=L?Math.round((S.pos[L.id]||0)*100):0;
  const g=goals();const done=g.filter(x=>x.v>=x.g).length;
  const ll=learningList().filter(l=>!S.vocab[l].phrase&&S.vocab[l].ctx&&TOK[S.vocab[l].ctx.sid]).sort();
  const wl=ll.length?ll[t%ll.length]:null;
  const recs=LESSONS.filter(x=>x.lang===tl()&&(!L||x.id!==L.id)&&x.id!=='rev').map(x=>({L:x,s:lessonStats(x)})).sort((a,b)=>Math.abs(90-a.s.pct)-Math.abs(90-b.s.pct)).slice(0,3);
  let strip='';for(let o=13;o>=0;o--){const d=t-o;strip+=`<i title="${dateLabel(d)}" style="flex:1;height:34px;border-radius:7px;background:${active(d)?'var(--hl1)':'var(--line)'};${o===0?'outline:2px solid var(--ink);outline-offset:1px':''}"></i>`;}
  let wod='';
  if(wl){const v=S.vocab[wl],e=info(wl);wod=`<div class="eyebrow">Palavra do dia</div><div class="w-big">${esc(label(wl))}</div><div class="row" style="gap:8px">${e.ipa?`<span class="muted" style="font-family:var(--f-r);font-size:15px">${esc(e.ipa)}</span>`:''}${stPill(v.st)}</div><div style="font:400 19px/1.25 var(--f-d);margin-top:10px">${esc(e.pt||'')}</div><q>${ctxHTML(v.ctx.sid,v.ctx.surf,'mark')}</q><div class="row" style="margin-top:14px"><button class="btn sm" data-h="say" data-v="${esc(v.ctx.surf)}">${I('spk',16)} Ouvir</button><button class="btn sm" data-word="${esc(wl)}">Ver palavra</button></div>`;}
  else wod=`<div class="eyebrow">Palavra do dia</div><p class="muted" style="margin-top:10px">Marca palavras no leitor (níveis 1 a 4) e aparece aqui uma por dia.</p>`;
  $('#v-home').innerHTML=`<div class="wrap">
  <div class="page-h"><div><div class="eyebrow">${esc(dateLabel(t))}</div><h1>${greet}.</h1><p>${due?`Tens <b style="color:var(--ink)">${due} cartões</b> para rever`:'Não tens cartões pendentes'} e ${L&&read>0&&read<100?`«${esc(L.title)}» a meio`:'um texto à tua espera'}. ${done===3?'Metas de hoje cumpridas.':`Faltam ${3-done} ${3-done===1?'meta':'metas'} para hoje.`}</p></div>
  <div class="row"><button class="btn" data-h="langs">${I('globe',18)} ${esc(langName(tl()))}</button><button class="btn" data-h="import">${I('upload',18)} Importar texto</button></div></div>
  <div class="home-grid">
    ${L?`<article class="card cont span-4">${coverBox(L)}<div class="body"><div class="eyebrow">Continuar a ler · ${esc(L.level)} · ${esc(L.tag)}</div><h2>${esc(L.title)}</h2><p class="blurb">${esc(m.blurb||'')}</p>
      <div style="margin-top:auto;display:grid;gap:8px"><div class="row between" style="font-size:13px"><span><b>${st.pct}%</b> <span class="muted">palavras conhecidas · ${diffLabel(st.pct)}</span></span><span class="muted tnum">${read}% lido</span></div>${meterHTML(st,true)}</div>
      <div class="row"><button class="btn pri" data-lesson="${L.id}">${I('read',18)} ${read>0?'Continuar':'Começar'}</button><span class="muted" style="font-size:13px">${I('clock',14)} ~${minutes(st)} min · ${st.newTypes} palavras novas</span></div></div></article>`:`<article class="card cont span-4" style="grid-template-columns:1fr"><div class="body"><div class="eyebrow">${esc(langName(tl()))}</div><h2>Ainda não há textos em ${esc(langName(tl()).toLowerCase())}</h2><p class="blurb">Importa um texto teu: o leitor separa as palavras, guarda estados e cartões e lê em voz alta se o teu dispositivo tiver voz para esta língua.</p><div class="row"><button class="btn pri" data-h="import">${I('upload',18)} Importar texto</button><button class="btn" data-h="langs">Mudar de língua</button></div></div></article>`}
    <article class="card span-2"><div class="row between"><h3>Metas de hoje</h3><span class="chip ${done===3?'ok':''}">${done}/3</span></div><div class="rings" style="margin-top:14px">${rings(g.map(x=>({p:x.v/x.g,c:x.c})),112)}<div class="gl grow">${g.map(x=>`<div><i class="sw" style="background:${x.c};border-radius:50%"></i>${x.k}<b>${fmt(x.v)}<span class="muted" style="font-weight:400">/${x.g}</span></b></div>`).join('')}</div></div></article>
    <article class="card due-card span-2"><div class="deck" aria-hidden="true"><i></i><i></i><i></i></div><div class="eyebrow muted">Para rever hoje</div><div class="n tnum" style="margin-top:12px">${due}</div><p class="muted" style="margin:6px 0 16px;max-width:24ch">${due?'Cartões com as frases onde encontraste cada palavra.':'Tudo em dia. Volta amanhã.'}</p><button class="btn" data-nav="review" ${due?'':'disabled'}>${I('cards',18)} Rever agora</button></article>
    <article class="card wod span-2">${wod}</article>
    <article class="card span-2"><div class="eyebrow">Esta semana</div><div class="row" style="gap:8px;margin-top:10px;align-items:baseline"><span style="font:400 48px/1 var(--f-d)" class="tnum">${Math.round(wk.now).toLocaleString('pt-PT')}</span><span class="muted">palavras lidas</span></div><p class="muted" style="font-size:13px;margin-top:6px">${wk.prev?`Semana passada: ${Math.round(wk.prev).toLocaleString('pt-PT')}.`:'Primeira semana.'}</p><div style="margin-top:14px;color:var(--muted)">${weekBars(wk.days,56,'var(--ink)','var(--line)')}</div><button class="btn sm" data-nav="prog" style="margin-top:16px">${I('chart',16)} Ver progresso</button></article>
  </div>
  ${recs.length?`<div class="sec-h"><h2>Para o teu nível</h2><button class="btn sm" data-nav="lib">Biblioteca ${I('arrow',16)}</button></div>
  <div class="mini-list">${recs.map(x=>`<button class="card mini flat" data-lesson="${x.L.id}">${coverBox(x.L)}<div style="display:grid;gap:6px;min-width:0"><span class="eyebrow">${esc(x.L.level)} · ${esc(x.L.tag)}</span><h4>${esc(x.L.title)}</h4><div class="row between" style="font-size:12.5px"><b>${x.s.pct}% conhecidas</b><span class="muted">${x.s.newTypes} novas</span></div>${meterHTML(x.s,true)}</div></button>`).join('')}</div>`:''}
  </div>`;
}
$('#v-home').addEventListener('click',e=>{
  const b=e.target.closest('[data-h]');if(!b)return;
  if(b.dataset.h==='import')importModal();
  else if(b.dataset.h==='langs')langModal();
  else if(b.dataset.h==='say')say(b.dataset.v);
});

/* =========================================================
   LEITOR
   ========================================================= */
function renderRead(){
  if(!(lessonById(cur)&&lessonById(cur).lang===tl())){const own=lessonsOf(tl());if(own.length)cur=own[0].id;else{$('#v-read').innerHTML=`<div class="wrap"><div class="card done-hero"><h2>Ainda não há textos em ${esc(langName(tl()).toLowerCase())}</h2><p class="muted" style="max-width:46ch">Importa um texto, PDF ou livro EPUB nesta língua para começares a ler.</p><div class="row" style="justify-content:center"><button class="btn" data-h2="langs">${I('globe',16)} Mudar de língua</button><button class="btn pri" data-imp>${I('upload',16)} Importar</button></div></div></div>`;return;}}
  const L=lessonById(cur)||LESSONS[0];cur=L.id;const m=META[L.id]||{};const st=lessonStats(L);const s=S.settings;
  $('#v-read').innerHTML=`<div class="wrap"><div class="reader">
  <article class="sheet" id="sheet" data-r="${s.rtheme}">
    <header class="r-head">${coverBox(L)}<div style="min-width:0"><div class="eyebrow">${esc(L.level)} · ${esc(L.tag)} · ${esc(m.coll||'')}</div><h1>${esc(L.title)}</h1><div class="r-meta"><span>${esc(m.author||'')}</span><span>${I('clock',14)} ~${minutes(st)} min</span><span>${st.tot} palavras</span><span>${I('head',14)} com voz</span>${L.imp?`<button class="linkbtn" data-tb="del">Apagar ${(META[L.id]||{}).part?'livro':'texto'}</button>`:''}</div></div></header>
    <div class="cov" id="r-cov"></div>
    <div class="pre" id="r-pre"></div>
    <div class="toolbar" id="toolbar">
      <div class="seg" role="group" aria-label="Tamanho do texto"><button data-tb="fsm" aria-label="Diminuir texto">A−</button><button data-tb="fsp" aria-label="Aumentar texto">A+</button></div>
      <div class="tdots" role="group" aria-label="Fundo da página">${['paper','sepia','night'].map(k=>`<button class="t-${k} ${s.rtheme===k?'on':''}" data-tb="rt" data-v="${k}" aria-label="${k==='paper'?'Papel':k==='sepia'?'Sépia':'Noite'}"></button>`).join('')}</div>
      <div class="seg" role="group" aria-label="Destaques">${[['all','Tudo'],['new','Só novas'],['none','Limpo']].map(k=>`<button class="${s.hl===k[0]?'on':''}" data-tb="hl" data-v="${k[0]}">${k[1]}</button>`).join('')}</div>
      <button class="btn xs flowbtn ${s.flow?'on':''}" data-tb="flow" aria-pressed="${s.flow}">${I('eye',15)} Leitura contínua</button>
      <button class="btn xs" data-tb="pend" id="pend-btn" ${s.flow?'':'hidden'}></button>
      <span class="tb-sp"></span>
      <div class="seg" role="group" aria-label="Velocidade">${[[.8,'0.8×'],[1,'1×'],[1.2,'1.2×']].map(k=>`<button class="${Math.abs(s.rate-k[0])<.01?'on':''}" data-tb="rate" data-v="${k[0]}">${k[1]}</button>`).join('')}</div>
      <button class="play" id="play" data-tb="play"></button>
      <div class="rprog" id="rprog"></div>
    </div>
    <div class="textwrap"><div id="text"></div>
      <div class="r-end"><p>Ao terminar, as palavras que não marcaste passam a <b style="color:var(--known)">conhecidas</b> e respondes a ${L.qs.length?L.qs.length+' perguntas de compreensão':'um resumo'}.</p><button class="btn pri" data-tb="finish">${I('check',18)} Terminar lição</button></div>
    </div>
  </article>
  <aside class="gloss" id="gloss" aria-label="Glosa"><div class="g-handle" id="g-handle" aria-hidden="true"><i></i></div><div class="g-scroll" id="gscroll"></div></aside>
  </div></div>`;
  renderText();applyReader();updateCov();renderPre();renderPend();renderPlay();renderGloss();bindHandle();
  const p=S.pos[L.id]||0;if(p>.02&&p<.98){requestAnimationFrame(()=>{const tw=$('.textwrap');if(tw){const top=tw.getBoundingClientRect().top+window.scrollY;window.scrollTo(0,top+(tw.offsetHeight-window.innerHeight)*p-80);}});}
}
function phraseWords(txt,sid){const lg=SENT_LANG[sid]||'en';return segWords(String(txt),lg).filter(t=>t.w).map(t=>lowerL(t.w,lg).replace(/’/g,"'"));}
function phraseRanges(sid){
  const toks=TOK[sid];if(!toks)return[];const lg=SENT_LANG[sid]||'en';const wi=[];toks.forEach((t,i)=>{if(t.w)wi.push(i);});
  const lw=wi.map(i=>lowerL(toks[i].w,lg).replace(/’/g,"'"));const found=[];
  Object.keys(S.vocab).forEach(k=>{
    if(k.indexOf('phrase:')!==0)return;const v=S.vocab[k];if(!v||v.st===-1||v.st===0)return;
    const pw=phraseWords(k.slice(7),sid);if(pw.length<2)return;
    for(let s=0;s+pw.length<=lw.length;s++){let ok=true;for(let j=0;j<pw.length;j++){if(lw[s+j]!==pw[j]){ok=false;break;}}if(ok)found.push({a:wi[s],b:wi[s+pw.length-1],k:k,st:v.st,n:pw.length});}
  });
  found.sort((x,y)=>y.n-x.n);const used={},out=[];
  found.forEach(f=>{for(let i=f.a;i<=f.b;i++)if(used[i])return;for(let i=f.a;i<=f.b;i++)used[i]=1;out.push(f);});
  return out;
}
function adjW(sid,i,d){const t=TOK[sid];for(let j=i+d;j>=0&&j<t.length;j+=d){if(t[j].w)return j;}return -1;}
function sentHTML(sid){
  let h='';const R=phraseRanges(sid),sA={},eA={};R.forEach(r=>{sA[r.a]=r;eA[r.b]=r;});
  TOK[sid].forEach((k,i)=>{
    if(sA[i])h+=`<span class="phr ph${sA[i].st}" title="${esc(label(sA[i].k))}">`;
    if(k.p){h+=esc(k.p);}
    else h+=`<span class="w st${stc(k.l)}${k.x!=null?' x':''}${isPend(sid,i)?' pend':''}" tabindex="0" role="button" data-s="${sid}" data-i="${i}">${esc(k.w)}</span>`;
    if(eA[i])h+='</span>';
  });
  return`<span class="sent" id="${sid}">${h}<button class="sbtn" data-sb="${sid}" aria-label="Traduzir frase" title="Traduzir frase">${I('tr',15)}</button></span>`;
}
function renderText(){const L=lessonById(cur);$('#text').innerHTML=L.paras.map(p=>`<p>${p.map(sentHTML).join(' ')}</p>`).join('');}
function applyReader(){
  const s=S.settings;const sh=$('#sheet');if(sh)sh.dataset.r=s.rtheme;
  const t=$('#text');if(t){t.style.setProperty('--fs',s.fs+'px');t.style.setProperty('--lh',s.lh);t.className='hl-'+(s.flow?'none':s.hl)+(s.flow?' flow':'');const lg=(lessonById(cur)||{}).lang||'en';t.setAttribute('lang',lg);t.setAttribute('dir',RTL[lg]?'rtl':'ltr');if(RTL[lg]||NOSPACE[lg]||lg==='ko')t.classList.add('nodrop');if(NOSPACE[lg])t.classList.add('cjk');}
  document.body.classList.toggle('noexpr',!s.expr);document.body.classList.toggle('nosbtn',!s.sbtn);
}
function updateCov(){
  const L=lessonById(cur);const st=lessonStats(L);const el=$('#r-cov');if(!el)return;
  el.innerHTML=`<div class="cov-top"><span><b>${st.pct}% conhecidas</b> · ${diffLabel(st.pct)}</span><span class="tnum">${st.learnTypes} a aprender · ${st.newTypes} novas</span></div>${meterHTML(st)}<div class="legend" style="margin-top:10px"><span><i class="sw" style="background:var(--new-bg);box-shadow:inset 0 -2px 0 var(--new)"></i>Nova</span><span><i class="sw" style="background:var(--hl1)"></i><i class="sw" style="background:var(--hl2);margin-left:-4px"></i><i class="sw" style="background:var(--hl3);margin-left:-4px"></i><i class="sw" style="background:var(--hl4);margin-left:-4px"></i>A aprender</span><span><i class="sw" style="border:1px solid var(--line-2)"></i>Conhecida</span><span><i class="sw" style="border-bottom:2px dotted var(--accent);border-radius:0;height:8px"></i>Expressão</span></div>`;
}
function refreshWords(){
  $$('#text .w').forEach(w=>{
    const tk=TOK[w.dataset.s][+w.dataset.i];const i=+w.dataset.i;
    let sel=false;
    if(G&&G.sid===w.dataset.s){if(G.kind==='word'&&G.i===i)sel=true;if(G.kind==='phrase'&&i>=G.a&&i<=G.b)sel=true;}
    w.className='w st'+stc(tk.l)+(tk.x!=null?' x':'')+(sel?' sel':'')+(isPend(w.dataset.s,i)?' pend':'');
  });
  updateCov();
}
function renderPlay(){const b=$('#play');if(b)b.innerHTML=`<span class="pc">${I(PL.on?'pause':'play',14)}</span>${PL.on?'Pausar':'Ouvir texto'}`;}

/* ----- glosa ----- */
let typeTimer=null;const AIC={};
function openWord(sid,i){if(PL.on)stopPlay();G={kind:'word',sid:sid,i:i,tab:G&&G.kind==='word'&&G.tab==='ai'?'ai':'mean',tr:false,chat:[]};refreshWords();renderGloss();if(G.tab==='ai')startAI();}
function openSent(sid){if(PL.on)stopPlay();G={kind:'sent',sid:sid,tab:'mean',tr:true,chat:[]};refreshWords();renderGloss();}
function openPhrase(sid,a,b){if(PL.on)stopPlay();G={kind:'phrase',sid:sid,a:a,b:b,tab:'mean',tr:true,chat:[]};refreshWords();renderGloss();}
function closeGloss(){G=null;clearInterval(typeTimer);refreshWords();renderGloss();}
function sentMark(sid,a,b){return TOK[sid].map((t,k)=>{const s=esc(t.w||t.p);if(k===a&&k===b)return`<mark>${s}</mark>`;if(k===a)return'<mark>'+s;if(k===b)return s+'</mark>';return s;}).join('');}
function phraseText(sid,a,b){return TOK[sid].slice(a,b+1).map(t=>t.w||t.p).join('').replace(/\s+/g,' ').trim();}
function phraseExpr(sid,a,b){const toks=TOK[sid].slice(a,b+1).filter(t=>t.w);const x=toks[0]&&toks[0].x;if(x==null)return null;if(!toks.every(t=>t.x===x))return null;return EXPR[x];}
function exprRange(sid,xi){let a=-1,b=-1;TOK[sid].forEach((t,i)=>{if(t.x===xi){if(a<0)a=i;b=i;}});return[a,b];}
function emptyGloss(){
  return`<div class="g-empty"><div class="eyebrow">A glosa</div>
  <h3 style="font:400 26px/1.1 var(--f-d)">Toca numa palavra para ver o significado neste texto.</h3>
  <div class="ill" aria-hidden="true"><div style="position:absolute;inset:18px 18px auto;font:400 18px/1.9 var(--f-r);color:var(--ink-2)">the crew <span style="background:var(--hl2);border-radius:4px;padding:0 3px;color:var(--ink)">spotted</span> the <span style="background:var(--ink);color:var(--surface);border-radius:4px;padding:0 3px">faint</span> beam and <span style="text-decoration:underline dotted var(--accent);text-decoration-thickness:2px;text-underline-offset:5px">steered away</span></div><div style="position:absolute;right:14px;bottom:12px;padding:6px 10px;border-radius:10px;background:var(--surface);border:1px solid var(--line);font:400 15px var(--f-d);box-shadow:var(--shadow)">ténue, fraco</div></div>
  <p class="muted" style="font-size:14px">Para juntar palavras como <i>put down</i>, mantém o dedo na primeira e arrasta até à última. No computador, arrasta com o rato ou usa Shift + clique. O ícone no fim de cada frase traduz a frase inteira.</p>
  <div class="keys"><div><span>Palavra anterior / seguinte</span><span><kbd>←</kbd> <kbd>→</kbd></span></div><div><span>Mudar o nível</span><span><kbd>1</kbd>–<kbd>4</kbd> <kbd>K</kbd> <kbd>N</kbd></span></div><div><span>Explicar com IA</span><span><kbd>E</kbd></span></div><div><span>Ouvir a palavra</span><span><kbd>P</kbd></span></div></div></div>`;
}
function chatHTML(){
  if(!G.chat.length)return'';
  return G.chat.map((m,k)=>{
    if(m.me)return`<div class="ai-q">${esc(m.me)}</div>`;
    if(m.state==='load')return`<div class="ai-card" aria-busy="true"><div class="ai-tag">${I('spark',14)} ${aiLabel(m.src)} a pensar</div><div style="display:grid;gap:8px"><div class="skel" style="width:94%"></div><div class="skel" style="width:80%"></div><div class="skel" style="width:58%"></div></div></div>`;
    const txt=(m.state==='type'||m.state==='stream')?`<p style="white-space:pre-line"><span id="ai-typing">${esc(m.ai.slice(0,m.n))}</span><span class="caret"></span></p>`:m.ai.split('\n\n').map(p=>`<p style="white-space:pre-line">${esc(p)}</p>`).join('');
    return`<div class="ai-card"><div class="ai-tag">${I('spark',14)} ${aiLabel(m.src)}${m.cached?' · guardado':''}</div>${txt}</div>`;
  }).join('');
}
function chipsHTML(){
  const busy=G.chat.some(m=>m.state==='load'||m.state==='type'||m.state==='stream');if(busy)return'';
  const list=G.kind==='word'?[['ex','Outro exemplo'],['pron','Pronúncia'],['fam','Formas da palavra'],['where','Onde aparece']]:G.kind==='phrase'?[['ex','Outro exemplo'],['pslow','Ouvir devagar']]:[['words','Palavras desta frase'],['slow','Ouvir devagar']];
  return`<div class="chips">${list.map(c=>`<button data-g="fu" data-v="${c[0]}">${c[1]}</button>`).join('')}</div>
  <form class="ask" id="g-ask"><input id="g-ask-in" type="text" placeholder="Pergunta algo sobre esta ${G.kind==='word'?'palavra':'frase'}…" aria-label="Pergunta à IA" autocomplete="off"><button class="btn xs blue" type="submit" aria-label="Enviar">${I('send',16)}</button></form>
  ${aiProvider()?`<p class="muted" style="font-size:12px">Respostas de ${aiLabel(aiProvider())}, guardadas para não repetir pedidos. Podem conter erros.</p>`:`<p class="muted" style="font-size:12px">Respostas de exemplo. ${inClaude()?'A IA do Claude liga-se sozinha quando estiver disponível.':'Para respostas reais, adiciona uma chave grátis do Gemini em Definições → IA e voz.'}</p>`}`;
}
function tabsHTML(){
  const t=[['mean','Contexto','eye'],['ai','Explicar com IA','spark']];if(G.kind==='word')t.push(['note','Nota','note']);
  return`<div class="g-tabs" role="tablist">${t.map(x=>`<button role="tab" aria-selected="${G.tab===x[0]}" class="${G.tab===x[0]?'on':''}" data-g="tab" data-v="${x[0]}">${I(x[2],15)}${x[1]}</button>`).join('')}</div>`;
}
function renderGloss(){
  const g=$('#gloss');if(!g)return;const el=$('#gscroll');
  document.body.classList.toggle('reading-open',!!G);
  if(!G){el.innerHTML=emptyGloss();g.classList.remove('open');return;}
  g.classList.add('open');
  const sd=SENT[G.sid];let h='';
  if(G.kind==='word'){
    const tk=TOK[G.sid][G.i],l=tk.l,e=info(l),s=status(l),v=S.vocab[l];
    const x=tk.x!=null?EXPR[tk.x]:null;
    h+=`<div class="g-band" style="background:${bandColor(s)}"></div>
    <div class="row between" style="flex-wrap:nowrap;align-items:flex-start"><div style="min-width:0"><div class="eyebrow">${ST_NAME[s]}</div><div class="g-word" dir="auto" style="margin-top:6px">${esc(tk.w)}</div></div>
    <div class="row" style="flex-wrap:nowrap;gap:6px"><button class="ibtn" data-g="say-w" aria-label="Ouvir palavra">${I('spk')}</button><button class="ibtn g-x" data-g="close" aria-label="Fechar">${I('x')}</button></div></div>
    <div class="g-sub">${e.ipa?`<span class="ipa">${esc(e.ipa)}</span>`:''}${e.pos?`<span class="pill p-i">${esc(e.pos)}</span>`:''}${label(l)!==lowerL(tk.w,tl())?`<span>forma de <b style="color:var(--ink)">${esc(label(l))}</b></span>`:''}</div>
    ${(S.settings.native||'pt').indexOf('pt')!==0&&e.pt?`<div class="muted" style="font-size:12px;margin-top:12px">Demo: tradução em português. Na versão real vem em ${esc(langName(S.settings.native).toLowerCase())}.</div>`:''}
    <div class="g-tr">${e.pt?esc(e.pt):noEntryHTML(tk.l,G.sid,G.i)}</div>
    ${(()=>{const R=phraseRanges(G.sid).find(r=>G.i>=r.a&&G.i<=r.b);return R?`<div class="g-expr"><div><b>Faz parte de</b> «${esc(label(R.k))}» <span class="muted">=</span> ${esc(info(R.k).pt||'…')}</div><div class="row" style="gap:6px"><button class="btn xs" data-g="phopen" data-a="${R.a}" data-b="${R.b}">Abrir a expressão</button></div></div>`:'';})()}
    <div class="g-join"><span>Juntar com a palavra</span><button class="btn xs" data-g="join" data-v="-1" ${adjW(G.sid,G.i,-1)<0?'disabled':''}>← anterior</button><button class="btn xs" data-g="join" data-v="1" ${adjW(G.sid,G.i,1)<0?'disabled':''}>seguinte →</button></div>
    ${x&&!(S.vocab['phrase:'+x.w.join(' ')])?`<div class="g-expr"><div><b>Expressão:</b> ${esc(x.w.join(' '))} <span class="muted">=</span> ${esc(x.pt)}</div><div class="row" style="gap:6px"><button class="btn xs" data-g="xsel">Ver a expressão</button><button class="btn xs" data-g="xsave">${I('plus',14)} Guardar como cartão</button></div></div>`:''}
    ${tabsHTML()}`;
    if(G.tab==='mean'){
      const n=lessonLemmas(cur)[l]?sentsOf(lessonById(cur)).reduce((a,sid)=>a+TOK[sid].filter(t=>t.w&&t.l===l).length,0):0;
      h+=`<div class="g-ctx" dir="auto">${sentMark(G.sid,G.i,G.i)}${G.tr?`<span class="tr">${sd.pt?esc(sd.pt):sentTrHTML(G.sid,true)}</span>`:''}</div>
      <div class="g-row"><button class="btn xs" data-g="trs">${I('tr',15)} ${G.tr?'Esconder tradução':'Traduzir frase'}</button><button class="btn xs" data-g="say-s">${I('spk',15)} Ouvir frase</button><button class="btn xs" data-g="say-slow">Devagar</button></div>
      <p class="muted" style="font-size:12.5px;margin-top:12px">${n>1?`Aparece ${n} vezes neste texto.`:'Aparece uma vez neste texto.'}${v&&v.srs&&s>=1&&s<=4?` Próxima revisão ${v.srs.due<=TD()?'hoje':'em '+(v.srs.due-TD())+' d'}.`:''}</p>`;
    }else if(G.tab==='ai'){h+=`<div class="ai">${chatHTML()}${chipsHTML()}</div>`;}
    else{h+=`<label class="flbl" for="g-note" style="display:block;margin-bottom:8px">A tua nota sobre «${esc(l)}»</label><textarea class="note-ta" id="g-note" placeholder="Ex.: lembra-me de «spotify»… aparece em histórias de mar.">${esc((v&&v.note)||'')}</textarea><p class="muted" style="font-size:12px;margin-top:6px">Guardada automaticamente e mostrada nos cartões.</p>`;}
    h+=`<div class="st-pick"><div class="row between" style="margin-bottom:8px"><span class="eyebrow">Estado da palavra</span>${s>=1&&s<=4?'<span class="chip y" style="height:24px">'+I('cards',14)+' Tem cartão</span>':''}</div>
    <div class="st-row" role="group" aria-label="Estado da palavra">${[[0,'Nova'],[1,'1'],[2,'2'],[3,'3'],[4,'4'],[5,'Conhecida']].map(b=>`<button class="b${b[0]} ${s===b[0]?'on':''}" data-g="st" data-v="${b[0]}" aria-pressed="${s===b[0]}">${b[1]}</button>`).join('')}</div>
    <div class="st-foot"><span>1–4 cria um cartão com esta frase</span><button class="linkbtn" data-g="st" data-v="-1">${s===-1?'Ignorada':'Ignorar palavra'}</button></div></div>`;
  }else if(G.kind==='sent'){
    h+=`<div class="g-band" style="background:var(--accent)"></div><div class="row between" style="flex-wrap:nowrap;align-items:flex-start"><div class="eyebrow">Frase</div><div class="row" style="flex-wrap:nowrap;gap:6px"><button class="ibtn" data-g="say-s" aria-label="Ouvir frase">${I('spk')}</button><button class="ibtn g-x" data-g="close" aria-label="Fechar">${I('x')}</button></div></div>
    <div dir="auto" style="font:400 21px/1.55 var(--f-r);margin-top:8px">${esc(sd.en)}</div>
    <div class="g-tr" style="font-size:21px">${sd.pt?esc(sd.pt):sentTrHTML(G.sid,false)}</div>${tabsHTML()}`;
    if(G.tab==='mean'){
      const ws={};TOK[G.sid].forEach(t=>{if(t.w){const s=status(t.l);if(s>=0&&s<=4)ws[t.l]=t.w;}});
      const keys=Object.keys(ws);
      h+=keys.length?`<div class="eyebrow" style="margin-bottom:10px">Palavras por aprender nesta frase</div><div style="display:grid;gap:8px">${keys.map(l=>`<button class="row between card flat" style="padding:10px 12px;text-align:left" data-g="goword" data-v="${esc(l)}"><span><b style="font:400 18px var(--f-d)">${esc(ws[l])}</b> <span class="muted" style="font-size:13.5px">${esc(info(l).pt||'')}</span></span>${stPill(status(l))}</button>`).join('')}</div>`:'<p class="muted">Já conheces todas as palavras desta frase.</p>';
      h+=`<div class="g-row"><button class="btn xs" data-g="say-slow">${I('spk',15)} Ouvir devagar</button></div>`;
    }else h+=`<div class="ai">${chatHTML()}${chipsHTML()}</div>`;
  }else{
    const txt=phraseText(G.sid,G.a,G.b);const x=phraseExpr(G.sid,G.a,G.b);const key='phrase:'+txt.toLowerCase();const v=S.vocab[key];const s=v?v.st:0;
    const pe=info(key);const pt=x?x.pt:(pe&&pe.pt)||'';
    h+=`<div class="row between" style="flex-wrap:nowrap;align-items:flex-start"><div style="min-width:0"><div class="eyebrow">${v?ST_NAME[s]:x?'Expressão':'Palavras juntas'}</div><div class="g-word" dir="auto" style="font-size:36px;margin-top:6px">${esc(txt)}</div></div><div class="row" style="flex-wrap:nowrap;gap:6px"><button class="ibtn" data-g="say-p" aria-label="Ouvir">${I('spk')}</button><button class="ibtn g-x" data-g="close" aria-label="Fechar">${I('x')}</button></div></div>
    <div class="g-tr">${pt?esc(pt):phraseTrHTML(key,txt,G.sid)}</div>
    <div class="g-join"><span>Ajustar</span><button class="btn xs" data-g="ext" data-v="l+" ${adjW(G.sid,G.a,-1)<0?'disabled':''}>← mais uma</button><button class="btn xs" data-g="ext" data-v="l-">− primeira</button><button class="btn xs" data-g="ext" data-v="r-">− última</button><button class="btn xs" data-g="ext" data-v="r+" ${adjW(G.sid,G.b,1)<0?'disabled':''}>mais uma →</button></div>
    ${tabsHTML()}`;
    if(G.tab==='ai')h+=`<div class="ai">${chatHTML()}${chipsHTML()}</div>`;
    else h+=`<div class="g-ctx" dir="auto">${sentMark(G.sid,G.a,G.b)}<span class="tr">${sd.pt?esc(sd.pt):sentTrHTML(G.sid,true)}</span></div>
      <div class="g-row"><button class="btn xs" data-g="say-p">Ouvir</button><button class="btn xs" data-g="say-slow">Ouvir a frase devagar</button></div>`;
    h+=`<div class="st-pick"><div class="row between" style="margin-bottom:8px"><span class="eyebrow">Estado da expressão</span>${s>=1&&s<=4?'<span class="chip y" style="height:24px">Tem cartão</span>':''}</div>
    <div class="st-row" role="group" aria-label="Estado da expressão">${[[0,'Nova'],[1,'1'],[2,'2'],[3,'3'],[4,'4'],[5,'Conhecida']].map(b=>`<button class="b${b[0]} ${s===b[0]?'on':''}" data-g="pst" data-v="${b[0]}" aria-pressed="${s===b[0]}">${b[1]}</button>`).join('')}</div>
    <div class="st-foot"><span>${v?'Fica marcada sempre que aparecer num texto':'Escolhe 1–4 para guardar como cartão'}</span>${v?'<button class="linkbtn" data-g="pst" data-v="0">Apagar expressão</button>':''}</div></div>`;
  }
  el.innerHTML=h;
  const ask=$('#g-ask');if(ask)ask.addEventListener('submit',ev=>{ev.preventDefault();const q=$('#g-ask-in').value.trim();if(q){if(aiProvider())realAI(pAsk(q),q);else runAI(askReply(q),q);}});
  const note=$('#g-note');if(note)note.addEventListener('input',()=>{const l=TOK[G.sid][G.i].l;const o=S.vocab[l]||(S.vocab[l]={st:status(l)});o.note=note.value;save();});
}
/* IA (pré-escrita) */
function aiMain(){
  if(G.kind==='phrase'){const txt=phraseText(G.sid,G.a,G.b),x=phraseExpr(G.sid,G.a,G.b),sd=SENT[G.sid];return x?`«${txt}» = ${x.pt}.\n\nÉ uma expressão: lê-a como um bloco, não palavra a palavra.`+(sd.ai?'\n\nSobre a frase: '+sd.ai:''):`Juntaste «${txt}». Esta combinação não tem explicação de exemplo. `+(inClaude()?'A IA do Claude explica-a quando estiver ligada.':'Para uma explicação real, adiciona uma chave grátis do Gemini em Definições → IA e voz.');}
  if(G.kind==='sent'){const sd=SENT[G.sid];return sd.ai?'Sobre esta frase: '+sd.ai:'Esta frase não tem explicação pré-escrita na demo. Na versão real, a IA recebe a frase e o parágrafo e explica a estrutura e o vocabulário aqui.';}
  const tk=TOK[G.sid][G.i],l=tk.l,e=info(l),x=tk.x!=null?EXPR[tk.x]:null;const sd=SENT[G.sid];
  if(!e.pt&&!x)return'Esta palavra não tem entrada na demo. Na versão real, a IA recebe a frase e o parágrafo à volta e explica aqui o sentido neste contexto, com um exemplo ao teu nível.';
  let t=e.pt?`Neste texto, «${tk.w}» quer dizer «${e.pt.split(';')[0]}».`:`«${tk.w}» faz parte de uma expressão.`;
  if(e.ai)t+='\n\n'+e.ai;
  else if(isBasic(l))t+='\n\nÉ uma palavra muito frequente. Vale a pena reconhecê-la sem traduzir.';
  if(!e.ai&&!isBasic(l)&&tl()!=='en')t+='\n\nNa versão real, a IA explica esta palavra em contexto para qualquer língua.';
  if(x)t+=`\n\nFaz parte da expressão «${x.w.join(' ')}» = ${x.pt}. Lê-a como um bloco.`;
  if(sd.ai)t+='\n\nSobre a frase: '+sd.ai;
  return t;
}
function aiFollow(k){
  if(G.kind==='phrase'){const txt=phraseText(G.sid,G.a,G.b);
    if(k==='pslow'){say(txt,{rate:.7});return`A ler «${txt}» devagar. Repete em voz alta: as expressões fixam-se melhor quando as dizes como um bloco.`;}
    const pw=phraseWords(txt,G.sid);const o=[];Object.keys(SENT).forEach(sid=>{if(sid===G.sid||!TOK[sid])return;const lw=TOK[sid].filter(t=>t.w).map(t=>lowerL(t.w,SENT_LANG[sid]||'en'));for(let s=0;s+pw.length<=lw.length;s++){if(pw.every((w,j)=>lw[s+j]===w)){o.push(sid);break;}}});
    return o.length?'Noutro texto da tua biblioteca:\n\n'+o.slice(0,2).map(sid=>`«${SENT[sid].en}»\n→ ${SENT[sid].pt||'(sem tradução)'}`).join('\n\n'):`«${txt}» só aparece neste texto. `+(aiProvider()?'':'Com a IA ligada, aparece aqui um exemplo novo.');}
  if(G.kind!=='word'){
    if(k==='words'){const o=[];TOK[G.sid].forEach(t=>{if(t.w&&status(t.l)!==5&&status(t.l)!==-1&&o.indexOf(t.l)<0)o.push(t.l);});return o.length?'Palavras que ainda estás a aprender nesta frase:\n'+o.map(l=>`• ${l}: ${info(l).pt||'sem entrada'}`).join('\n'):'Já conheces todas as palavras desta frase.';}
    if(k==='slow'){say(SENT[G.sid].en,{rate:.7});return'A ler a frase a 70% da velocidade. Repete em voz alta logo a seguir (shadowing): ajuda a fixar o ritmo.';}
  }
  const tk=TOK[G.sid][G.i],l=tk.l,e=info(l);
  if(k==='ex'){
    const o=[];Object.keys(SENT).forEach(sid=>{if(sid===G.sid||!TOK[sid])return;if(TOK[sid].some(t=>t.w&&t.l===l))o.push(sid);});
    if(!o.length)return`«${l}» só aparece neste texto. Na versão real, a IA cria uma frase nova com esta palavra e só com vocabulário que já conheces.`;
    return'Noutro texto da tua biblioteca:\n\n'+o.slice(0,2).map(sid=>`«${SENT[sid].en}»\n→ ${SENT[sid].pt||'(sem tradução)'}`).join('\n\n');
  }
  if(k==='pron'){say(tk.w,{rate:.7});return(e.ipa?`${tk.w} ${e.ipa}\n\n`:'')+(e.ipa&&e.ipa.indexOf('ˈ')>=0?'O sinal ˈ marca a sílaba tónica: a que se diz com mais força. ':'')+'Estás a ouvir a palavra devagar. Toca no altifalante para a velocidade normal.';}
  if(k==='fam'){const f={};Object.keys(TOK).forEach(sid=>TOK[sid].forEach(t=>{if(t.w&&t.l===l)f[t.w.toLowerCase()]=1;}));const forms=Object.keys(f);return`Forma base: ${l}.\nFormas que já encontraste: ${forms.join(', ')}.`+(e.pos==='verbo'?'\n\nComo verbo, repara nas terminações -s (presente), -ed (passado) e -ing.':'');}
  if(k==='where'){const o=LESSONS.map(L=>({L:L,n:sentsOf(L).reduce((a,sid)=>a+TOK[sid].filter(t=>t.w&&t.l===l).length,0)})).filter(x=>x.n);return'Onde aparece na tua biblioteca:\n'+o.map(x=>`• ${x.L.title}: ${x.n}×`).join('\n');}
  return'';
}
function askReply(q){const s=SENT[G.sid].en;return`Recebi a pergunta. Nesta demo as respostas são pré-escritas, por isso não consigo responder a perguntas livres.\n\nNa versão real, a pergunta segue para o modelo junto com a frase «${s}» e o parágrafo, e a resposta aparece aqui.`;}
function startAI(){if(!G.chat.length){const key=(G.kind==='word'?TOK[G.sid][G.i].l:G.kind==='phrase'?'P:'+phraseText(G.sid,G.a,G.b).toLowerCase():'S')+'|'+G.sid;if(aiProvider())realAI(G.kind==='word'?pWordExplain():G.kind==='phrase'?pPhraseExplain():pSentExplain(),null,'ai:'+(S.settings.native||'pt')+':'+key);else runAI(aiMain(),null,key);}}
function runAI(text,q,key){
  const g=G;if(q)g.chat.push({me:q});
  const cached=key&&AIC[key];const m={ai:text,state:'load',n:0,cached:!!cached};g.chat.push(m);renderGloss();scrollGloss();
  setTimeout(()=>{if(G!==g)return;if(key)AIC[key]=1;m.state='type';renderGloss();typeStep(g,m);},cached?120:650);
}
function typeStep(g,m){
  clearInterval(typeTimer);
  if(reduced){m.state='done';renderGloss();return;}
  typeTimer=setInterval(()=>{
    if(G!==g){clearInterval(typeTimer);return;}
    m.n+=5;if(m.n>=m.ai.length){m.state='done';clearInterval(typeTimer);renderGloss();scrollGloss();return;}
    const el=document.getElementById('ai-typing');if(el)el.textContent=m.ai.slice(0,m.n);
  },16);
}
function scrollGloss(){const s=$('#gscroll');if(s&&G&&G.tab==='ai')s.scrollTop=s.scrollHeight;}
function glossAct(a,b){
  if(!G)return;
  if(a==='close'){closeGloss();return;}
  if(a==='tab'){G.tab=b.dataset.v;renderGloss();if(G.tab==='ai')startAI();return;}
  if(a==='trs'){G.tr=!G.tr;renderGloss();return;}
  if(a==='say-w'){say(TOK[G.sid][G.i].w);return;}
  if(a==='say-s'){say(SENT[G.sid].en);return;}
  if(a==='say-slow'){say(SENT[G.sid].en,{rate:.7});return;}
  if(a==='say-p'){say(phraseText(G.sid,G.a,G.b));return;}
  if(a==='fu'){const pr=aiProvider()&&pFollow(b.dataset.v);if(pr)realAI(pr,b.textContent);else runAI(aiFollow(b.dataset.v),b.textContent);return;}
  if(a==='st'){setWordStatus(+b.dataset.v);return;}
  if(a==='xsel'){const tk=TOK[G.sid][G.i];const r=exprRange(G.sid,tk.x);openPhrase(G.sid,r[0],r[1]);return;}
  if(a==='xsave'){const tk=TOK[G.sid][G.i];const r=exprRange(G.sid,tk.x);savePhrase(G.sid,r[0],r[1]);renderText();refreshWords();renderGloss();return;}
  if(a==='psave'){savePhrase(G.sid,G.a,G.b);renderText();refreshWords();renderGloss();return;}
  if(a==='pst'){setPhraseStatus(+b.dataset.v);return;}
  if(a==='phopen'){openPhrase(G.sid,+b.dataset.a,+b.dataset.b);return;}
  if(a==='join'){const j=adjW(G.sid,G.i,+b.dataset.v);if(j>=0)openPhrase(G.sid,Math.min(G.i,j),Math.max(G.i,j));return;}
  if(a==='ext'){let A=G.a,B=G.b;const v=b.dataset.v;
    if(v==='l+'){const j=adjW(G.sid,A,-1);if(j>=0)A=j;}else if(v==='r+'){const j=adjW(G.sid,B,1);if(j>=0)B=j;}
    else if(v==='l-'){const j=adjW(G.sid,A,1);if(j>=0&&j<=B)A=j;}else if(v==='r-'){const j=adjW(G.sid,B,-1);if(j>=0&&j>=A)B=j;}
    if(A===B)openWord(G.sid,A);else openPhrase(G.sid,A,B);return;}
  if(a==='goword'){const l=b.dataset.v;const i=TOK[G.sid].findIndex(t=>t.w&&t.l===l);if(i>=0)openWord(G.sid,i);return;}
}
function setWordStatus(v){
  if(!G||G.kind!=='word')return;const tk=TOK[G.sid][G.i];const before=status(tk.l);
  setStatusFor(tk.l,v,{sid:G.sid,surf:tk.w});
  refreshWords();renderGloss();updateChrome();
  if(v>=1&&v<=4&&!(before>=1&&before<=4))toast('Cartão criado com esta frase','cards');
  else if(v===5&&before!==5)toast('«'+tk.l+'» marcada como conhecida','check');
}
function savePhrase(sid,a,b,quiet){
  const txt=phraseText(sid,a,b);const key='phrase:'+txt.toLowerCase();if(S.vocab[key])return;
  const x=phraseExpr(sid,a,b);const ai=S.ai&&S.ai.d&&S.ai.d[key];
  S.vocab[key]={st:1,phrase:true,pt:x?x.pt:(ai&&ai.pt)||'',ctx:{sid:sid,surf:txt},srs:newSrs(),added:TD()};
  save();updateChrome();if(!quiet)toast('Expressão guardada como cartão','cards');
}
function setPhraseStatus(v){
  if(!G||G.kind!=='phrase')return;const txt=phraseText(G.sid,G.a,G.b);const key='phrase:'+txt.toLowerCase();const had=!!S.vocab[key];
  if(!had){if(v===0)return;savePhrase(G.sid,G.a,G.b,true);}
  setStatusFor(key,v);
  if(v===0||v===-1)toast('Expressão apagada');else if(!had&&v<=4)toast('Expressão guardada como cartão','cards');else if(v===5)toast('Expressão marcada como conhecida','check');
  renderText();refreshWords();renderGloss();updateChrome();
}
function navWord(d){
  const all=$$('#text .w');if(!all.length)return;let k=-1;
  if(G&&G.kind==='word')k=all.findIndex(w=>w.dataset.s===G.sid&&+w.dataset.i===G.i);
  k=Math.max(0,Math.min(all.length-1,k+d));const w=all[k];openWord(w.dataset.s,+w.dataset.i);
  try{w.scrollIntoView({block:'nearest'});}catch(e){}
}
function bindHandle(){
  const h=$('#g-handle'),g=$('#gloss');if(!h)return;let y0=null,dy=0;
  h.addEventListener('pointerdown',e=>{y0=e.clientY;dy=0;try{h.setPointerCapture(e.pointerId);}catch(x){}g.style.transition='none';});
  h.addEventListener('pointermove',e=>{if(y0==null)return;dy=Math.max(0,e.clientY-y0);g.style.transform=`translateY(${dy}px)`;});
  const end=()=>{if(y0==null)return;g.style.transition='';g.style.transform='';y0=null;if(dy>70)closeGloss();};
  h.addEventListener('pointerup',end);h.addEventListener('pointercancel',end);
  h.addEventListener('click',()=>{if(dy<5)closeGloss();});
}

/* ----- eventos do leitor ----- */
let suppress=0;
$('#v-read').addEventListener('click',e=>{
  if(Date.now()-suppress<350)return;
  const w=e.target.closest('.w');if(w){if(S.settings.flow){togglePend(w);return;}if(e.shiftKey&&G&&G.kind==='word'&&G.sid===w.dataset.s&&G.i!==+w.dataset.i){const j=+w.dataset.i;openPhrase(G.sid,Math.min(G.i,j),Math.max(G.i,j));return;}openWord(w.dataset.s,+w.dataset.i);return;}
  const pw=e.target.closest('[data-pre]');if(pw){const p=pw.dataset.pre.split(':');openWord(p[0],+p[1]);const el=$(`#text .w[data-s="${p[0]}"][data-i="${p[1]}"]`);if(el)try{el.scrollIntoView({block:'center'});}catch(x){}return;}
  const sb=e.target.closest('[data-sb]');if(sb){openSent(sb.dataset.sb);return;}
  const g=e.target.closest('[data-g]');if(g){glossAct(g.dataset.g,g);return;}
  const tb=e.target.closest('[data-tb]');
  if(tb){
    const a=tb.dataset.tb,s=S.settings;
    if(a==='fsm'){s.fs=Math.max(16,s.fs-1);applyReader();}
    else if(a==='fsp'){s.fs=Math.min(28,s.fs+1);applyReader();}
    else if(a==='rt'){s.rtheme=tb.dataset.v;applyReader();$$('.tdots button').forEach(x=>x.classList.toggle('on',x.dataset.v===s.rtheme));}
    else if(a==='hl'){s.hl=tb.dataset.v;applyReader();$$('[data-tb="hl"]').forEach(x=>x.classList.toggle('on',x.dataset.v===s.hl));}
    else if(a==='rate'){s.rate=+tb.dataset.v;$$('[data-tb="rate"]').forEach(x=>x.classList.toggle('on',+x.dataset.v===s.rate));if(PL.on){stopPlay();PL.on=true;renderPlay();playFrom(PL.k);}}
    else if(a==='play'){if(PL.on)stopPlay();else{PL.on=true;renderPlay();playFrom(G&&G.sid&&sentsOf(lessonById(cur)).indexOf(G.sid)>=0?sentsOf(lessonById(cur)).indexOf(G.sid):PL.k||0);}}
    else if(a==='finish'){if(S.settings.flow&&pendList().length)pendModal(true);else finishModal();}
    else if(a==='del'){if(tb.dataset.sure!=='1'){tb.dataset.sure='1';tb.textContent='Toca outra vez para apagar';return;}deleteImport(cur);return;}
    else if(a==='flow'){s.flow=!s.flow;if(s.flow&&G)closeGloss();tb.classList.toggle('on',s.flow);tb.setAttribute('aria-pressed',s.flow);applyReader();refreshWords();renderPend();toast(s.flow?'Leitura contínua: toca nas palavras para as marcar e revê-as no fim':'Leitura contínua desligada',s.flow?'eye':null);}
    else if(a==='pend')pendModal(false);
    save();return;
  }
  if(!wide()&&G&&e.target.closest('#text'))closeGloss();
});
$('#v-read').addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.classList&&e.target.classList.contains('w')){e.preventDefault();openWord(e.target.dataset.s,+e.target.dataset.i);}});
/* juntar palavras: no telemóvel, premir e arrastar; no computador, arrastar com o rato */
const DR={on:false,sid:null,a:-1,b:-1,timer:null,x:0,y:0,md:null};
function drWord(x,y){const el=document.elementFromPoint(x,y);return el&&el.closest?el.closest('#text .w'):null;}
function drMark(){$$('#text .w.dr').forEach(w=>w.classList.remove('dr'));if(!DR.on)return;const lo=Math.min(DR.a,DR.b),hi=Math.max(DR.a,DR.b);$$(`#text .w[data-s="${DR.sid}"]`).forEach(w=>{const i=+w.dataset.i;if(i>=lo&&i<=hi)w.classList.add('dr');});}
function drStart(w){DR.on=true;DR.sid=w.dataset.s;DR.a=DR.b=+w.dataset.i;if(PL.on)stopPlay();drMark();try{if(navigator.vibrate)navigator.vibrate(12);}catch(e){}}
function drMove(x,y){const w=drWord(x,y);if(w&&w.dataset.s===DR.sid&&+w.dataset.i!==DR.b){DR.b=+w.dataset.i;drMark();}}
function drEnd(){if(!DR.on)return;const lo=Math.min(DR.a,DR.b),hi=Math.max(DR.a,DR.b);DR.on=false;drMark();suppress=Date.now();if(hi>lo)openPhrase(DR.sid,lo,hi);else openWord(DR.sid,lo);}
const VR=$('#v-read');
VR.addEventListener('touchstart',e=>{const w=e.target.closest&&e.target.closest('#text .w');if(!w||e.touches.length>1||S.settings.flow)return;const t=e.touches[0];DR.x=t.clientX;DR.y=t.clientY;clearTimeout(DR.timer);DR.timer=setTimeout(()=>drStart(w),350);},{passive:true});
VR.addEventListener('touchmove',e=>{const t=e.touches[0];if(DR.on){e.preventDefault();drMove(t.clientX,t.clientY);return;}if(Math.abs(t.clientX-DR.x)+Math.abs(t.clientY-DR.y)>10)clearTimeout(DR.timer);},{passive:false});
VR.addEventListener('touchend',e=>{clearTimeout(DR.timer);if(DR.on){e.preventDefault();drEnd();}},{passive:false});
VR.addEventListener('touchcancel',()=>{clearTimeout(DR.timer);if(DR.on){DR.on=false;drMark();}});
VR.addEventListener('contextmenu',e=>{if(e.target.closest&&e.target.closest('#text'))e.preventDefault();});
VR.addEventListener('mousedown',e=>{if(e.button!==0||S.settings.flow)return;const w=e.target.closest&&e.target.closest('#text .w');if(!w)return;DR.md=w;DR.x=e.clientX;DR.y=e.clientY;});
document.addEventListener('mousemove',e=>{if(!DR.md)return;if(!DR.on){if(Math.abs(e.clientX-DR.x)+Math.abs(e.clientY-DR.y)<6)return;drStart(DR.md);}drMove(e.clientX,e.clientY);});
document.addEventListener('mouseup',()=>{DR.md=null;if(DR.on)drEnd();});
let scrT=0;
window.addEventListener('scroll',()=>{
  if(view!=='read')return;const tw=$('.textwrap'),bar=$('#rprog');if(!tw||!bar)return;
  const r=tw.getBoundingClientRect();const p=Math.max(0,Math.min(1,(-r.top+120)/(r.height-window.innerHeight+120)));
  bar.style.width=(p*100).toFixed(1)+'%';
  clearTimeout(scrT);scrT=setTimeout(()=>{S.pos[cur]=Math.max(S.pos[cur]||0,p);save();},400);
},{passive:true});

/* ----- voz ----- */
let VOICES=[];
function loadVoices(){try{ALLV=speechSynthesis.getVoices()||[];VOICES=ALLV.filter(v=>/^en/i.test(v.lang));}catch(e){}}
var ALLV=[];
function voicesFor(lg){const b=(lg||'en').split('-')[0].toLowerCase();return ALLV.filter(v=>String(v.lang).toLowerCase().replace('_','-').split('-')[0]===b);}
try{loadVoices();speechSynthesis.onvoiceschanged=loadVoices;}catch(e){}
function pickVoice(lg){lg=lg||'en';if(lg!=='en'){const vs=voicesFor(lg);const pref=BCP[lg];return vs.find(v=>pref&&String(v.lang).replace('_','-').toLowerCase()===pref.toLowerCase())||vs[0]||null;}if(S.settings.voice){const v=VOICES.find(x=>x.name===S.settings.voice);if(v)return v;}return VOICES.find(v=>/en[-_]GB/i.test(v.lang))||VOICES[0]||null;}
function say(text,o){
  o=o||{};
  if(useClaudeVoice())return claudeSay(text,o);
  if(inAndroid())return androidSay(text,o);
  try{
    if(!('speechSynthesis' in window))throw new Error('no tts');
    const lg=o.lang||tl();const u=new SpeechSynthesisUtterance(text);u.lang=BCP[lg]||lg;u.rate=o.rate||S.settings.rate||1;const v=pickVoice(lg);if(v)u.voice=v;else if(lg!=='en'&&ALLV.length&&!o.quiet)toast('Este dispositivo não tem voz para '+langName(lg).toLowerCase()+'. Instala uma nas definições do sistema.');
    u.onend=()=>{if(o.end)o.end();};u.onerror=()=>{if(o.err)o.err();};if(o.bd)u.onboundary=o.bd;
    speechSynthesis.cancel();speechSynthesis.speak(u);return true;
  }catch(e){toast('A voz não está disponível neste navegador.');return false;}
}
const PL={on:false,k:0};
function clearMarks(){$$('#text .sent.playing').forEach(x=>x.classList.remove('playing'));$$('#text .w.spk').forEach(x=>x.classList.remove('spk'));}
function stopPlay(){PL.on=false;try{speechSynthesis.cancel();}catch(e){}stopClaudeVoice();clearMarks();renderPlay();}
function playFrom(k){
  if(!PL.on)return;const ids=sentsOf(lessonById(cur));
  if(k>=ids.length){stopPlay();PL.k=0;toast('Chegaste ao fim do texto','check');return;}
  PL.k=k;clearMarks();const sid=ids[k];offsets(sid);
  const sp=document.getElementById(sid);if(sp){sp.classList.add('playing');const r=sp.getBoundingClientRect();if(r.top<80||r.bottom>window.innerHeight-120)try{sp.scrollIntoView({block:'center',behavior:reduced?'auto':'smooth'});}catch(e){}}
  const t0=Date.now();
  const ok=say(SENT[sid].en,{end:()=>{if(!PL.on)return;logDay('l',(Date.now()-t0)/60000);playFrom(k+1);},err:()=>{if(PL.on)stopPlay();},bd:ev=>{
    if(ev.name&&ev.name!=='word')return;const toks=TOK[sid];let idx=-1;for(let i=0;i<toks.length;i++){if(toks[i].w&&toks[i].o<=ev.charIndex)idx=i;}
    $$('#text .w.spk').forEach(x=>x.classList.remove('spk'));if(idx>=0){const el=$(`#text .w[data-s="${sid}"][data-i="${idx}"]`);if(el)el.classList.add('spk');}}});
  if(!ok)stopPlay();
}

/* ----- terminar lição ----- */
function finishModal(){
  const L=lessonById(cur);const st=lessonStats(L);if(PL.on)stopPlay();
  setModal(`<div class="mhead"><div><div class="eyebrow">Terminar lição</div><h2 style="margin-top:6px">${esc(L.title)}</h2></div><button class="ibtn" data-close aria-label="Fechar">${I('x')}</button></div>
  <div class="stats3" style="margin-top:0"><div class="stat"><div class="n" style="color:var(--new)">${st.newTypes}</div><div class="l">novas passam a conhecidas</div></div><div class="stat"><div class="n" style="color:#B58900">${st.learnTypes}</div><div class="l">continuam com cartão</div></div><div class="stat"><div class="n">${st.tot}</div><div class="l">palavras lidas</div></div></div>
  <p class="muted" style="font-size:14px">Se alguma palavra nova não for mesmo conhecida, volta ao texto e marca-a com 1 a 4 antes de terminar.</p>
  <div class="row" style="justify-content:flex-end"><button class="btn" data-close>Voltar ao texto</button><button class="btn pri" id="fin-ok">${L.qs.length?'Terminar e responder':'Terminar'} ${I('arrow',16)}</button></div>`,'Terminar lição');
  $('#fin-ok').onclick=()=>doFinish(L,st);
}
function doFinish(L,st0){
  let moved=0;sentsOf(L).forEach(sid=>TOK[sid].forEach(t=>{if(t.w&&status(t.l)===0){S.vocab[t.l]={st:5};moved++;}}));
  const first=!S.texts[L.id];S.texts[L.id]=TD();S.pos[L.id]=1;
  if(first)logDay('w',st0.tot);else save();
  refreshWords();updateChrome();quiz(L,0,0,st0.newTypes);
}
function quiz(L,i,ok,moved){
  const qs=L.qs||[];
  if(i>=qs.length){
    const st=lessonStats(L);
    setModal(`<div style="display:grid;justify-items:center;text-align:center;gap:14px;padding:6px 0">${ring1(st.pct/100,150,'var(--known)',`<div style="font:400 40px/1 var(--f-d)">${st.pct}%</div><div class="muted" style="font-size:12px">conhecidas</div>`)}
    <h2>Lição concluída</h2><p class="muted" style="max-width:40ch">${moved?`+${moved} palavras conhecidas. `:''}${qs.length?`Acertaste ${ok} de ${qs.length} perguntas. `:''}Hoje já leste ${fmt((S.days[TD()]||{w:0}).w)} palavras.</p>
    <div class="row" style="justify-content:center"><button class="btn" id="q-lib">Escolher outro texto</button><button class="btn pri" id="q-rev">${I('cards',16)} Rever cartões (${dueList().length})</button></div></div>`,'Lição concluída');
    $('#q-lib').onclick=()=>{closeModal();go('lib');};$('#q-rev').onclick=()=>{closeModal();go('review');};return;
  }
  const q=qs[i];
  setModal(`<div class="mhead"><div class="eyebrow">Compreensão · ${i+1} de ${qs.length}</div><button class="ibtn" data-close aria-label="Fechar">${I('x')}</button></div><h2 style="font-size:27px">${esc(q.q)}</h2>
  <div class="qopt">${q.o.map((o,k)=>`<button class="opt" data-k="${k}"><kbd>${k+1}</kbd>${esc(o)}</button>`).join('')}</div><div id="q-next" class="row" style="justify-content:flex-end"></div>`,'Pergunta');
  $$('#mcard .opt').forEach(b=>b.onclick=()=>{
    if($('#q-next').innerHTML)return;const k=+b.dataset.k,good=k===q.a;
    $$('#mcard .opt').forEach((x,n)=>{if(n===q.a)x.classList.add('right');else if(x===b)x.classList.add('wrong');});
    $('#q-next').innerHTML=`<span class="verdict ${good?'ok':'bad'}">${I(good?'check':'x',18)} ${good?'Certo':'Não é essa'}</span><span class="grow"></span><button class="btn pri" id="q-go">${i+1<qs.length?'Seguinte':'Ver resultado'} ${I('arrow',16)}</button>`;
    $('#q-go').onclick=()=>quiz(L,i+1,ok+(good?1:0),moved);
  });
}

/* =========================================================
   BIBLIOTECA
   ========================================================= */
let LF={lvl:'Todos',q:''};
function renderLib(){
  const pool=lessonsOf(tl()).map(x=>({L:x,s:lessonStats(x)}));
  const fe=pool.filter(x=>!S.texts[x.L.id]).sort((a,b)=>Math.abs(90-a.s.pct)-Math.abs(90-b.s.pct))[0]||pool[0];
  const m=fe?META[fe.L.id]||{}:{};
  $('#v-lib').innerHTML=`<div class="wrap">
  <div class="page-h"><div><div class="eyebrow">Biblioteca · ${esc(langName(tl()))}</div><h1>O que vais ler hoje?</h1><p>Cada texto mostra quanto já conheces. Entre 88% e 95% é o ponto ideal: entendes a história e aprendes palavras novas.</p></div><button class="btn" data-li="langs">${I('globe',18)} ${esc(langName(tl()))} · mudar</button></div>
  ${fe?`<article class="card feat">${coverBox(fe.L)}<div class="fb"><div class="row"><span class="chip acc">Recomendado para ti</span><span class="chip">${esc(fe.L.level)}</span></div><h2>${esc(fe.L.title)}</h2><p class="blurb">${esc(m.blurb||'')}</p>
  <div style="display:grid;gap:8px"><div class="row between" style="font-size:13.5px"><b>${fe.s.pct}% conhecidas · ${diffLabel(fe.s.pct)}</b><span class="muted">${fe.s.newTypes} novas · ~${minutes(fe.s)} min</span></div>${meterHTML(fe.s)}</div>
  <div class="row"><button class="btn pri" data-lesson="${fe.L.id}">${I('read',18)} Ler agora</button></div></div></article>`:`<article class="card" style="margin-top:26px;padding:28px;display:grid;gap:12px"><div class="eyebrow">${esc(langNat(tl()))}</div><h2 style="font:400 clamp(28px,4vw,40px)/1.05 var(--f-d)">Ainda não há textos de exemplo em ${esc(langName(tl()).toLowerCase())}</h2><p class="muted" style="max-width:60ch">Importa um texto teu abaixo. O leitor separa as palavras (mesmo em línguas sem espaços), guarda estados e cartões e lê em voz alta se o teu dispositivo tiver uma voz para esta língua. Na versão real, a tradução e a IA cobrem todas as línguas da lista.</p><div class="row"><button class="btn pri" data-li="paste">${I('upload',18)} Importar texto</button><button class="btn" data-li="langs">Escolher outra língua</button></div></article>`}
  <div class="lib-tools"><label class="search">${I('search',18)}<input id="lib-q" type="search" placeholder="Procurar textos" aria-label="Procurar textos" value="${esc(LF.q)}"></label>
  <div class="seg" role="group" aria-label="Nível">${['Todos','A2','B1','B2','Meus'].map(f=>`<button data-lf="${f}" class="${LF.lvl===f?'on':''}">${f}</button>`).join('')}</div></div>
  <div id="lib-shelves"></div>
  <div class="sec-h"><h2>Trazer o teu texto</h2></div>
  <div class="imp">
    <label class="drop" id="drop" for="lib-file"><span style="display:grid;place-items:center;width:52px;height:52px;border-radius:16px;background:var(--surface);border:1px solid var(--line)">${I('upload',24)}</span><span class="big">Larga aqui um ficheiro</span><span class="muted" style="font-size:14px">PDF, EPUB, Word, HTML, legendas ou texto. Toca para escolher ou cola o texto.</span><input type="file" id="lib-file" accept="${IMPORT_ACCEPT}" hidden><span class="row" style="justify-content:center"><button type="button" class="btn sm" data-li="paste">Colar texto</button></span></label>
    <div class="srcs">
      ${[['file','PDF com texto','Carrega o leitor de PDF na primeira vez (precisa de internet)',true],['read','EPUB (livros)','Divide o livro em partes por capítulo',true],['note','Word (.docx), OpenDocument (.odt), RTF','Documentos de texto',true],['link','HTML, Markdown e texto (.txt)','Páginas guardadas e notas',true],['yt','Legendas (.srt, .vtt)','De filmes, séries ou YouTube',true],['eye','PDF digitalizado e imagens (OCR)','Versão real',false],['mic','Áudio e vídeo com transcrição (Whisper)','Versão real',false],['globe','Página web por link (extensão do browser)','Versão real',false]].map(x=>`<div class="src"><span class="si">${I(x[0])}</span><span class="grow"><b>${x[1]}</b><small>${x[2]}</small></span>${x[3]?`<span class="chip ok">${I('check',14)} Ativo</span>`:'<span class="chip">Em breve</span>'}</div>`).join('')}
    </div>
  </div></div>`;
  renderShelves();
  const q=$('#lib-q');q.addEventListener('input',()=>{LF.q=q.value;renderShelves();});
  const dz=$('#drop');
  ['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('over');}));
  ['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove('over');}));
  dz.addEventListener('drop',e=>{const f=e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files[0];if(f)readFile(f);});
  $('#lib-file').addEventListener('change',e=>{const f=e.target.files&&e.target.files[0];if(f)readFile(f);});
}
function renderShelves(){
  const q=LF.q.trim().toLowerCase();
  const list=LESSONS.filter(L=>L.id!=='rev'&&L.lang===tl()&&(LF.lvl==='Todos'||L.level===LF.lvl||(LF.lvl==='Meus'&&L.level==='Meu'))&&(!q||L.title.toLowerCase().indexOf(q)>=0||((META[L.id]||{}).blurb||'').toLowerCase().indexOf(q)>=0));
  const by={};list.forEach(L=>{const c=(META[L.id]||{}).coll||'Outros';(by[c]=by[c]||[]).push(L);});
  const keys=Object.keys(by);
  if(!lessonsOf(tl()).length){$('#lib-shelves').innerHTML='';return;}
  $('#lib-shelves').innerHTML=keys.length?keys.map(c=>`<div class="sec-h"><h2>${esc(c)}</h2><span class="muted" style="font-size:13px">${by[c].length} ${by[c].length===1?'texto':'textos'}</span></div><div class="shelf">${by[c].map(L=>{const st=lessonStats(L);const done=S.texts[L.id];return`<button class="book" data-lesson="${L.id}">${coverBox(L,'',`<span class="cv-l"><span class="chip" style="height:24px">${esc(L.level)}</span></span>${done?`<span class="done chip ok" style="height:24px;background:var(--surface)">${I('check',13)} Lido</span>`:''}`)}<h4>${esc(L.title)}</h4>${(META[L.id]||{}).ep||(META[L.id]||{}).gen||(META[L.id]||{}).part?`<div class="row" style="gap:6px">${(META[L.id]||{}).part?`<span class="chip" style="height:24px">Parte ${(META[L.id]||{}).part}</span>`:''}${(META[L.id]||{}).ep?`<span class="chip" style="height:24px">Episódio ${(META[L.id]||{}).ep}</span>`:''}${(META[L.id]||{}).gen?`<span class="chip acc" style="height:24px">${I('spark',13)} Escrito para ti</span>`:''}</div>`:''}<div class="bm"><span><b style="color:var(--ink)">${st.pct}%</b> conhecidas</span><span>~${minutes(st)} min</span></div>${meterHTML(st,true)}</button>`;}).join('')}</div>`).join(''):`<div class="empty">Nenhum texto encontrado.${LF.lvl==='Meus'?' Importa o teu primeiro texto abaixo.':''}</div>`;
}
$('#v-lib').addEventListener('click',e=>{
  const f=e.target.closest('[data-lf]');if(f){LF.lvl=f.dataset.lf;$$('[data-lf]').forEach(x=>x.classList.toggle('on',x.dataset.lf===LF.lvl));renderShelves();return;}
  const li=e.target.closest('[data-li]');if(li){e.preventDefault();if(li.dataset.li==='langs')langModal();else importModal();}
});
function reviewText(){
  const sids=[];learningList().filter(l=>{const v=S.vocab[l];return v.ctx&&(SENT_LANG[v.ctx.sid]||'en')===tl();}).forEach(l=>{const v=S.vocab[l];if(v.ctx&&TOK[v.ctx.sid]&&sids.indexOf(v.ctx.sid)<0)sids.push(v.ctx.sid);});
  if(sids.length<2){toast('Guarda mais palavras para criar o texto.');return;}
  const i=LESSONS.findIndex(x=>x.id==='rev');if(i>=0)LESSONS.splice(i,1);
  const paras=[];for(let k=0;k<sids.length;k+=3)paras.push(sids.slice(k,k+3));
  LESSONS.push({id:'rev',lang:tl(),title:'As tuas frases',level:'Meu',tag:'Revisão',paras:paras,qs:[]});
  META.rev={coll:'Os meus textos',author:'Gerado a partir dos teus cartões',blurb:'Todas as frases onde guardaste palavras, juntas para reler em contexto.'};
  openLesson('rev');
}

/* =========================================================
   REVER
   ========================================================= */
const R={phase:'start',q:[],i:0,mode:'flip',rev:false,res:null,opts:null,done:0,ok:0,total:0,promo:[],turn:false};
const MODES=[['flip','Virar','flip','Vês a palavra e a frase, lembras-te do significado.'],['cloze','Lacuna','cloze','Escreves a palavra que falta na frase.'],['choice','Escolha','choice','Escolhes a tradução certa entre quatro.'],['listen','Ouvir','ear','Ouves a palavra e escreves o que ouviste.']];
function startReview(){R.recent=[];R.pauseShown=false;R.q=dueList();R.i=0;R.rev=false;R.res=null;R.opts=null;R.done=0;R.ok=0;R.total=R.q.length;R.promo=[];R.phase=R.q.length?'card':'end';renderReview();}
function applyGrade(c,g){
  if(g===1){c.lapses++;c.reps=0;c.ivl=0;c.ease=Math.max(1.3,c.ease-0.2);c.due=TD();return;}
  if(g===2){c.ivl=Math.max(1,Math.round((c.ivl||1)*1.2));c.ease=Math.max(1.3,c.ease-0.15);}
  else if(g===3){c.ivl=c.reps===0?1:c.reps===1?3:Math.round(c.ivl*c.ease);}
  else{c.ivl=c.reps===0?3:Math.max(4,Math.round((c.ivl||1)*c.ease*1.3));c.ease+=0.1;}
  c.reps++;c.due=TD()+c.ivl;
}
function ivlLabel(c,g){const k=JSON.parse(JSON.stringify(c));applyGrade(k,g);return g===1?'<10 min':k.ivl+(k.ivl===1?' dia':' dias');}
function grade(g){
  const l=R.q[R.i];const v=S.vocab[l];
  const since=v.srs.last!=null?Math.max(0,TD()-v.srs.last):(v.srs.ivl||0);
  (S.log=S.log||[]).push([TD(),since,g>=2?1:0,l]);v.srs.last=TD();
  R.recent=(R.recent||[]).concat([g]).slice(-6);
  applyGrade(v.srs,g);
  if(g===1){R.q.push(l);if(v.st>1)v.st--;}
  else if(g>=3&&v.srs.ivl>=3){v.st=Math.min(5,v.st+1);if(v.st===5){R.promo.push(l);toast('«'+label(l)+'» passou a conhecida','check');}}
  R.done++;if(g>=3)R.ok++;R.i++;R.rev=false;R.res=null;R.opts=null;
  logDay('r',1);
  if(R.i>=R.q.length)R.phase='end';
  else if(!R.pauseShown&&R.recent.length>=5&&R.recent.filter(x=>x===1).length>=4){R.pauseShown=true;R.phase='pause';}
  renderReview();
}
function distractors(correct){
  const pool=[];const src=tl()==='en'?DICT:Object.assign({},...Object.keys(DICTX).map(k=>DICTX[k]));Object.keys(src).forEach(k=>{const p=src[k].pt;if(p)pool.push(p.split(/[;,(]/)[0].trim());});
  const c=String(correct||'—').split(/[;,(]/)[0].trim();const out=[];let guard=0;
  while(out.length<3&&guard++<300){const p=pool[Math.floor(Math.random()*pool.length)];if(p&&p!==c&&out.indexOf(p)<0)out.push(p);}
  const all=out.concat([c]);for(let i=all.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));const t=all[i];all[i]=all[j];all[j]=t;}
  return{c:c,all:all};
}
function renderReview(){
  const el=$('#v-review');
  if(R.phase==='start'){
    const due=dueList(),learn=learningList(),today=Object.keys(S.vocab).filter(l=>S.vocab[l].added===TD()).length;
    const next=learn.map(l=>S.vocab[l].srs&&S.vocab[l].srs.due).filter(Boolean).sort((a,b)=>a-b).find(d=>d>TD());
    el.innerHTML=`<div class="wrap rv-wrap">
    <div class="page-h"><div><div class="eyebrow">Rever</div><h1>Cartões de hoje</h1><p>Cada cartão traz a frase onde encontraste a palavra. Quanto melhor te lembras, mais tempo demora a voltar.</p></div></div>
    <div class="stats3"><div class="stat"><div class="n">${due.length}</div><div class="l">para rever hoje</div></div><div class="stat"><div class="n">${learn.length}</div><div class="l">a aprender</div></div><div class="stat"><div class="n">${today}</div><div class="l">novos hoje</div></div></div>
    <div class="sec-h" style="margin-top:28px"><h2 style="font-size:22px">Modo</h2></div>
    <div class="modes" style="margin-top:0">${MODES.map(m=>`<button class="mode ${R.mode===m[0]?'on':''}" data-r="mode" data-v="${m[0]}" aria-pressed="${R.mode===m[0]}"><span class="mi">${I(m[2])}</span><b>${m[1]}</b><small>${m[3]}</small></button>`).join('')}</div>
    <div class="card flat row between" style="margin-top:16px"><div class="tog grow"><span><b style="font-weight:600">Primeiro as palavras do texto atual</b><br><span class="muted" style="font-size:13px">«${esc((lessonById(cur)||{}).title||'')}»</span></span><label class="sw-t"><input type="checkbox" id="rv-prio" ${S.settings.prio?'checked':''} aria-label="Priorizar palavras do texto atual"><span></span></label></div></div>
    <div class="row" style="margin-top:18px"><button class="btn pri" data-r="go" ${due.length?'':'disabled'}>${I('cards',18)} ${due.length?`Começar · ${due.length} cartões`:'Sem cartões para hoje'}</button><button class="btn" data-r="export">${I('dl',18)} Exportar para Anki</button>${due.length?'':`<span class="muted" style="font-size:13.5px">${next?`Próximo cartão em ${next-TD()} ${next-TD()===1?'dia':'dias'}.`:'Marca palavras no leitor para criar cartões.'}</span>`}</div>
    </div>`;
    const p=$('#rv-prio');if(p)p.onchange=()=>{S.settings.prio=p.checked;save();};
    return;
  }
  if(R.phase==='pause'){el.innerHTML=pauseHTML();return;}
  if(R.phase==='end'){
    const acc=R.done?Math.round(R.ok/R.done*100):0;
    const next=learningList().map(l=>S.vocab[l].srs&&S.vocab[l].srs.due).filter(Boolean).sort((a,b)=>a-b).find(d=>d>TD());
    el.innerHTML=`<div class="wrap rv-wrap"><div class="card done-hero">${ring1(acc/100,160,'var(--known)',`<div style="font:400 44px/1 var(--f-d)">${acc}%</div><div class="muted" style="font-size:12px">de acertos</div>`)}
    <h2>${R.done?'Sessão concluída':'Tudo em dia'}</h2><p class="muted" style="max-width:42ch">${R.done?`Reviste ${R.done} cartões.`:'Não há cartões para hoje.'} ${next?`O próximo volta daqui a ${next-TD()} ${next-TD()===1?'dia':'dias'}.`:''}</p>
    ${R.promo.length?`<div class="eyebrow">Passaram a conhecidas</div><div class="promo">${R.promo.map(l=>`<span class="pill p-k">${I('check',13)} ${esc(label(l))}</span>`).join('')}</div>`:''}
    <div class="row" style="justify-content:center;margin-top:6px"><button class="btn" data-nav="words">Ver palavras</button><button class="btn pri" data-nav="read">${I('read',18)} Voltar a ler</button></div></div></div>`;
    return;
  }
  const l=R.q[R.i],v=S.vocab[l],e=info(l),sid=v.ctx.sid,surf=v.ctx.surf,sd=SENT[sid];
  const segs=R.q.map((_,k)=>`<i class="${k<R.i?'d':k===R.i?'c':''}"></i>`).join('');
  const inText=lessonLemmas(cur)[l];
  const top=`<div class="rv-top"><button class="ibtn" data-r="quit" aria-label="Terminar sessão">${I('x')}</button><div class="segs" aria-hidden="true">${segs}</div><span class="tnum muted" style="font-size:13px">${R.i+1}/${R.q.length}</span></div>`;
  const meta=`<div class="row" style="gap:6px">${stPill(v.st)}${inText?'<span class="chip acc" style="height:24px">No texto atual</span>':''}${v.phrase?'<span class="chip" style="height:24px">Expressão</span>':''}</div>`;
  const grades=`<div class="grades">${[[1,'Outra vez'],[2,'Difícil'],[3,'Bem'],[4,'Fácil']].map(g=>`<button class="g${g[0]}" data-r="g" data-v="${g[0]}">${g[1]}<small>${ivlLabel(v.srs,g[0])}</small><small><kbd>${g[0]}</kbd></small></button>`).join('')}</div>`;
  const tip=e.ai?((e.ai.match(/^.*?\.(?=\s|$)/)||[e.ai])[0]):'';
  const backBody=`${meta}<div class="ftr">${esc(e.pt||'Sem tradução na demo')}</div><div class="fctx" dir="auto">${ctxHTML(sid,surf,'mark')}</div><div class="fsub">${esc(sd.pt||'')}</div>${tip?`<div class="ai-card" style="font-size:14px"><div class="ai-tag">${I('spark',13)} Dica</div>${esc(tip)}</div>`:''}${v.note?`<div class="g-expr"><b>A tua nota</b>${esc(v.note)}</div>`:''}`;
  let h='';
  if(R.mode==='flip'){
    h=`<div class="flip ${R.rev?'turn':''}" id="flip"><div class="flip-in">
      <div class="face front" aria-hidden="${R.rev}">${meta}<div class="fw" dir="auto">${esc(surf)}</div><div class="fctx" dir="auto">${ctxHTML(sid,surf,'mark')}</div><div class="foot"><button class="btn sm" data-r="say">${I('spk',16)} Ouvir</button><span><kbd>Espaço</kbd> para virar</span></div></div>
      <div class="face back" aria-hidden="${!R.rev}">${backBody}</div></div></div>
      ${R.rev?grades:`<button class="btn pri wide" data-r="show" style="margin-top:14px;height:50px">${I('flip',18)} Mostrar resposta</button>`}`;
  }else if(R.mode==='cloze'){
    h=`<div class="face" style="margin-top:18px">${meta}<div class="fctx" dir="auto">${R.rev?ctxHTML(sid,surf,'mark'):ctxHTML(sid,surf,'blank')}</div><div class="fsub">Pista: ${esc(e.pt||'')}</div>
    ${R.rev?`<span class="verdict ${R.res?'ok':'bad'}">${I(R.res?'check':'x',18)} ${R.res?'Certo':'Resposta: '+esc(surf)}</span><div class="fsub">${esc(sd.pt||'')}</div>`:`<form class="ans" id="rv-form"><input id="rv-in" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="A palavra em falta" aria-label="Resposta"><button class="btn blue" type="submit" style="height:50px">Verificar</button></form>`}</div>${R.rev?grades:''}`;
  }else if(R.mode==='choice'){
    if(!R.opts)R.opts=distractors(e.pt);
    h=`<div class="face" style="margin-top:18px">${meta}<div class="fw" dir="auto" style="font-size:48px">${esc(surf)}</div><div class="fctx" dir="auto">${ctxHTML(sid,surf,'mark')}</div>
    <div class="opts">${R.opts.all.map((o,k)=>`<button class="opt ${R.rev?(o===R.opts.c?'right':(R.res===o?'wrong':'')):''}" data-r="opt" data-k="${k}" ${R.rev?'disabled':''}><kbd>${k+1}</kbd>${esc(o)}</button>`).join('')}</div>
    ${R.rev?`<div class="row between"><span class="verdict ${R.res===R.opts.c?'ok':'bad'}">${I(R.res===R.opts.c?'check':'x',18)} ${R.res===R.opts.c?'Certo':'Era: '+esc(R.opts.c)}</span><button class="btn pri" data-r="next">Seguinte ${I('arrow',16)}</button></div>`:''}</div>`;
  }else{
    h=`<div class="face" style="margin-top:18px">${meta}<div class="row" style="gap:14px"><button class="play" data-r="say" style="height:56px;padding:0 22px 0 10px;font-size:15px"><span class="pc" style="width:36px;height:36px">${I('play',16)}</span>Ouvir</button><button class="btn sm" data-r="sayslow">Devagar</button></div>
    ${R.rev?`<span class="verdict ${R.res?'ok':'bad'}">${I(R.res?'check':'x',18)} ${R.res?'Certo':'Era: '+esc(surf)}</span><div class="ftr">${esc(e.pt||'')}</div><div class="fctx" dir="auto">${ctxHTML(sid,surf,'mark')}</div>`:`<form class="ans" id="rv-form"><input id="rv-in" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Escreve o que ouves" aria-label="Resposta"><button class="btn blue" type="submit" style="height:50px">Verificar</button></form>`}</div>${R.rev?grades:''}`;
  }
  el.innerHTML=`<div class="wrap rv-wrap">${top}${h}</div>`;
  const f=$('#rv-form');if(f){f.addEventListener('submit',ev=>{ev.preventDefault();const val=($('#rv-in').value||'').trim().toLowerCase();R.res=val===surf.toLowerCase()||val===label(l);R.rev=true;renderReview();});const inp=$('#rv-in');if(inp&&!('ontouchstart' in window))try{inp.focus();}catch(e){}}
  if(R.mode==='listen'&&!R.rev&&!R.spoke){R.spoke=true;setTimeout(()=>say(surf),250);}
}
$('#v-review').addEventListener('click',e=>{
  const b=e.target.closest('[data-r]');if(!b)return;const a=b.dataset.r;const l=R.q[R.i];const v=l&&S.vocab[l];
  if(a==='mode'){R.mode=b.dataset.v;renderReview();}
  else if(a==='go'){startReview();}
  else if(a==='export')exportModal();
  else if(a==='quit'){R.phase='end';renderReview();}
  else if(a==='show'){R.rev=true;renderReview();}
  else if(a==='say')say(v.ctx.surf);
  else if(a==='sayslow')say(v.ctx.surf,{rate:.65});
  else if(a==='g'){R.spoke=false;grade(+b.dataset.v);}
  else if(a==='cont'){R.phase='card';renderReview();}
  else if(a==='rest'){R.phase='end';renderReview();}
  else if(a==='opt'){if(R.rev)return;const o=R.opts.all[+b.dataset.k];R.res=o;R.rev=true;renderReview();}
  else if(a==='next'){const good=R.res===R.opts.c;R.spoke=false;grade(good?3:1);}
});
function exportModal(){
  const rows=Object.keys(S.vocab).filter(l=>{const v=S.vocab[l];return v.st>=1&&v.st<=4&&v.ctx&&TOK[v.ctx.sid];}).map(l=>{const v=S.vocab[l];const sd=SENT[v.ctx.sid];return[v.ctx.surf,info(l).pt||'',sd.en,sd.pt||'',v.note||''].join('\t');});
  setModal(`<div class="mhead"><div><div class="eyebrow">Exportar</div><h2 style="margin-top:6px">Para o Anki</h2></div><button class="ibtn" data-close aria-label="Fechar">${I('x')}</button></div>
  <p class="muted" style="font-size:14px">${rows.length} cartões, separados por tabulações: palavra, tradução, frase, tradução da frase e nota. No Anki: Ficheiro → Importar e escolhe o ficheiro .txt.</p>
  <textarea id="ex-t" class="inp" style="height:220px;padding:12px;font:13px/1.5 ui-monospace,Menlo,monospace" readonly>${esc(rows.join('\n'))}</textarea>
  <div class="row" style="justify-content:flex-end"><button class="btn" data-close>Fechar</button>${canDownload()?'<button class="btn" id="ex-dl">Descarregar .txt</button>':''}<button class="btn pri" id="ex-c">Copiar tudo</button></div>`,'Exportar');
  const dlb=$('#ex-dl');if(dlb)dlb.onclick=()=>saveFile('glosa-anki.txt',$('#ex-t').value);
  $('#ex-c').onclick=()=>{const ta=$('#ex-t');const fb=()=>{ta.focus();ta.select();toast('Selecionado. Copia com Ctrl+C.');};try{navigator.clipboard.writeText(ta.value).then(()=>toast('Copiado','check'),fb);}catch(e){fb();}};
}

/* =========================================================
   PALAVRAS
   ========================================================= */
const WF={f:'learn',q:''};
function wordsIn(f){
  return Object.keys(S.vocab).filter(l=>{const v=S.vocab[l];if(!inLang(l))return false;
    if(f==='learn')return v.st>=1&&v.st<=4;if(f==='phrase')return !!v.phrase;if(f==='known')return v.st===5&&!isBasic(l);if(f==='ign')return v.st===-1;return v.st!==0||v.note;});
}
function renderWords(){
  const F=[['learn','A aprender'],['phrase','Expressões'],['known','Conhecidas'],['ign','Ignoradas'],['all','Todas']];
  $('#v-words').innerHTML=`<div class="wrap">
  <div class="page-h"><div><div class="eyebrow">Palavras</div><h1>O teu vocabulário</h1><p>Tudo o que marcaste ao ler, com a frase onde encontraste cada palavra.</p></div><div class="row"><button class="btn" data-wv="text">${I('read',18)} Texto com as tuas frases</button><button class="btn" data-wv="export">${I('dl',18)} Anki</button></div></div>
  <div class="lib-tools"><label class="search">${I('search',18)}<input id="w-q" type="search" placeholder="Procurar palavra ou tradução" aria-label="Procurar palavra" value="${esc(WF.q)}"></label>
  <div class="seg" role="group" aria-label="Filtro" style="overflow-x:auto;max-width:100%">${F.map(f=>`<button data-wf="${f[0]}" class="${WF.f===f[0]?'on':''}">${f[1]} <span class="muted tnum">${wordsIn(f[0]).length}</span></button>`).join('')}</div></div>
  <div id="w-list"></div></div>`;
  renderWordList();
  const q=$('#w-q');q.addEventListener('input',()=>{WF.q=q.value;renderWordList();});
}
function renderWordList(){
  const q=WF.q.trim().toLowerCase();
  const list=wordsIn(WF.f).filter(l=>!q||label(l).indexOf(q)>=0||(info(l).pt||'').toLowerCase().indexOf(q)>=0)
    .sort((a,b)=>{const va=S.vocab[a],vb=S.vocab[b];const da=va.srs?va.srs.due:1e9,db=vb.srs?vb.srs.due:1e9;return da-db||label(a).localeCompare(label(b));});
  const t=TD();
  $('#w-list').innerHTML=list.length?`<div class="wl">${list.map(l=>{const v=S.vocab[l],e=info(l);const sd=v.ctx&&SENT[v.ctx.sid];
    const due=v.srs&&v.st>=1&&v.st<=4?(v.srs.due<=t?'<span style="color:var(--accent);font-weight:600">rever hoje</span>':'rever em '+(v.srs.due-t)+' d'):'';
    return`<button class="wr" data-word="${esc(l)}"><span style="min-width:0"><span class="ww" dir="auto">${esc(v.ctx?v.ctx.surf:label(l))}</span>${label(l)!==(v.ctx?v.ctx.surf.toLowerCase():'')&&!v.phrase?` <span class="muted" style="font-size:12.5px">${esc(label(l))}</span>`:''}<div class="wt" style="margin-top:3px">${esc(e.pt||'—')}</div></span>
    <span class="mid" style="min-width:0">${sd?`<div class="wc" dir="auto">${esc(sd.en)}</div>`:''}${v.note?`<div class="muted" style="font-size:12.5px;margin-top:3px">${I('note',13)} ${esc(v.note)}</div>`:''}</span>
    <span class="wd">${stPill(v.st)}${v.st>=1&&v.st<=4?lvlDots(v.st):''}<span>${due}</span></span></button>`;}).join('')}</div>`:`<div class="card flat empty" style="margin-top:14px"><div style="font:400 24px var(--f-d);color:var(--ink)">Nada por aqui</div><p style="margin-top:6px">${WF.f==='learn'?'Toca numa palavra no leitor e escolhe um nível de 1 a 4.':WF.f==='phrase'?'Arrasta sobre várias palavras no leitor e guarda a expressão.':'Experimenta outro filtro.'}</p></div>`;
}
$('#v-words').addEventListener('click',e=>{
  const f=e.target.closest('[data-wf]');if(f){WF.f=f.dataset.wf;$$('[data-wf]').forEach(x=>x.classList.toggle('on',x.dataset.wf===WF.f));renderWordList();return;}
  const b=e.target.closest('[data-wv]');if(b){if(b.dataset.wv==='export')exportModal();else reviewText();}
});
function wordModal(l){
  const v=S.vocab[l];const e=info(l);const s=v?v.st:status(l);
  const ctxs=[];Object.keys(SENT).forEach(sid=>{if(!TOK[sid])return;if(v&&v.phrase){if(v.ctx.sid===sid)ctxs.push([sid,v.ctx.surf]);return;}const t=TOK[sid].find(t=>t.w&&t.l===l);if(t)ctxs.push([sid,t.w]);});
  const lessonOf=sid=>LESSONS.find(L=>sentsOf(L).indexOf(sid)>=0);
  setModal(`<div class="mhead"><div style="min-width:0"><div class="eyebrow">${v&&v.phrase?'Expressão':esc(e.pos||'Palavra')}</div><div class="g-word" dir="auto" style="margin-top:6px">${esc(v&&v.ctx?v.ctx.surf:label(l))}</div><div class="g-sub">${e.ipa?`<span class="ipa">${esc(e.ipa)}</span>`:''}${stPill(s)}</div></div><div class="row" style="flex-wrap:nowrap;gap:6px"><button class="ibtn" id="wm-say" aria-label="Ouvir">${I('spk')}</button><button class="ibtn" data-close aria-label="Fechar">${I('x')}</button></div></div>
  <div class="g-tr" style="margin-top:0">${esc(e.pt||'Sem tradução na demo')}</div>
  ${e.ai?`<div class="ai-card"><div class="ai-tag">${I('spark',13)} Glosa IA</div>${esc(e.ai)}</div>`:''}
  <div><div class="eyebrow" style="margin-bottom:8px">Estado</div><div class="st-row" id="wm-st">${[[0,'Nova'],[1,'1'],[2,'2'],[3,'3'],[4,'4'],[5,'Conhecida']].map(b=>`<button class="b${b[0]} ${s===b[0]?'on':''}" data-v="${b[0]}" aria-pressed="${s===b[0]}">${b[1]}</button>`).join('')}</div>${v&&v.srs&&s>=1&&s<=4?`<p class="muted" style="font-size:12.5px;margin-top:8px">Próxima revisão: ${v.srs.due<=TD()?'hoje':'daqui a '+(v.srs.due-TD())+' dias'} · ${v.srs.reps} revisões · ${v.srs.lapses} falhas</p>`:''}</div>
  <div><div class="eyebrow" style="margin-bottom:8px">Onde aparece</div><div style="display:grid;gap:8px">${ctxs.slice(0,4).map(c=>{const L=lessonOf(c[0]);return`<div class="card flat" style="padding:12px 14px"><div class="g-ctx" style="font-size:16px">${ctxHTML(c[0],c[1],'mark')}</div><div class="row between" style="margin-top:8px"><span class="muted" style="font-size:12.5px">${esc(L?L.title:'')}</span>${L?`<button class="btn xs" data-wm-open="${L.id}" data-wm-sid="${c[0]}">Abrir no texto ${I('arrow',14)}</button>`:''}</div></div>`;}).join('')||'<p class="muted">Sem contexto guardado.</p>'}</div></div>
  ${v&&v.note?`<div class="g-expr"><b>A tua nota</b>${esc(v.note)}</div>`:''}`,'Palavra');
  $('#wm-say').onclick=()=>say(v&&v.ctx?v.ctx.surf:label(l));
  $$('#wm-st button').forEach(b=>b.onclick=()=>{const ctx=v&&v.ctx?v.ctx:(ctxs[0]?{sid:ctxs[0][0],surf:ctxs[0][1]}:null);setStatusFor(l,+b.dataset.v,ctx);updateChrome();if(view==='words')renderWords();if(S.vocab[l]||isBasic(l)||+b.dataset.v!==0)wordModal(l);else closeModal();});
  $$('#mcard [data-wm-open]').forEach(b=>b.onclick=()=>{closeModal();openLesson(b.dataset.wmOpen,v&&v.phrase?null:{sid:b.dataset.wmSid,l:l});});
}

/* =========================================================
   PROGRESSO
   ========================================================= */
function barChart(){
  const t=TD();const vals=[];for(let o=13;o>=0;o--)vals.push((S.days[t-o]||{w:0}).w);
  const mx=Math.max(300,Math.ceil(Math.max.apply(null,vals)/100)*100);const x0=34,x1=600,y0=10,y1=150,bw=(x1-x0)/14;
  let s=`<svg class="ch" viewBox="0 0 610 172" role="img" aria-label="Palavras lidas nos últimos 14 dias">`;
  for(let v=0;v<=mx;v+=100){const y=y1-(v/mx)*(y1-y0);s+=`<line class="gl" x1="${x0}" x2="${x1}" y1="${y}" y2="${y}"/><text x="${x0-8}" y="${y+3}" text-anchor="end">${v}</text>`;}
  const gl=S.settings.goal.r;const gy=y1-(Math.min(gl,mx)/mx)*(y1-y0);
  vals.forEach((v,i)=>{const hh=(v/mx)*(y1-y0),x=x0+i*bw+5,w=bw-10,last=i===13;s+=`<rect class="${last?'bt':'b'}" x="${x.toFixed(1)}" y="${(y1-hh).toFixed(1)}" width="${w.toFixed(1)}" height="${Math.max(hh,0).toFixed(1)}" rx="4"/><text x="${(x+w/2).toFixed(1)}" y="${y1+16}" text-anchor="middle">${WD[dow(t-13+i)].charAt(0).toUpperCase()}</text>`;if(last)s+=`<text class="em" x="${(x+w/2).toFixed(1)}" y="${(y1-hh-7).toFixed(1)}" text-anchor="middle">${Math.round(v)}</text>`;});
  s+=`<line x1="${x0}" x2="${x1}" y1="${gy}" y2="${gy}" style="stroke:var(--known)" stroke-dasharray="4 4" stroke-width="1.5"/><text x="${x1}" y="${gy-6}" text-anchor="end" style="fill:var(--known);font-weight:600">meta ${gl}</text>`;
  return s+'</svg>';
}
function lineChart(){
  const vals=[470,505,538,561,590,612,628,knownCount()];
  const mn=Math.floor((Math.min.apply(null,vals)-30)/50)*50,mx=Math.ceil((Math.max.apply(null,vals)+20)/50)*50;
  const x0=40,x1=596,y0=14,y1=150;
  const pts=vals.map((v,i)=>[x0+i*(x1-x0)/(vals.length-1),y1-((v-mn)/(mx-mn))*(y1-y0)]);
  const d=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');const last=pts[pts.length-1];
  let s=`<svg class="ch" viewBox="0 0 610 176" role="img" aria-label="Palavras conhecidas nas últimas 8 semanas"><defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="gs1"/><stop offset="1" class="gs2"/></linearGradient></defs>`;
  for(let v=mn;v<=mx;v+=50){const y=y1-((v-mn)/(mx-mn))*(y1-y0);s+=`<line class="gl" x1="${x0}" x2="${x1}" y1="${y.toFixed(1)}" y2="${y.toFixed(1)}"/><text x="${x0-8}" y="${(y+3).toFixed(1)}" text-anchor="end">${v}</text>`;}
  s+=`<path class="ar" d="${d} L${x1} ${y1} L${x0} ${y1}Z"/><path class="ln" d="${d}"/>`;
  pts.forEach((p,i)=>{if(i<pts.length-1)s+=`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="2.5" style="fill:var(--accent)"/>`;});
  s+=`<circle class="pt" cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="5"/><text class="em" x="${(last[0]-10).toFixed(1)}" y="${(last[1]-12).toFixed(1)}" text-anchor="end">${vals[vals.length-1]}</text>`;
  ['há 7 sem.','','','','','','','hoje'].forEach((l,i)=>{if(l)s+=`<text x="${pts[i][0].toFixed(1)}" y="${y1+18}" text-anchor="${i?'end':'start'}">${l}</text>`;});
  return s+'</svg>';
}
function heatmap(){
  const t=TD();const wd=(dow(t)+6)%7;const start=t-wd-14*7;let s='';
  const vals=[];for(let d=start;d<=t;d++)vals.push((S.days[d]||{w:0}).w);
  for(let d=start;d<=t-wd+6;d++){
    if(d>t){s+='<i style="background:transparent"></i>';continue;}
    const w=(S.days[d]||{w:0}).w;const c=w<=0?'':w<120?'h1':w<220?'h2':w<300?'h3':'h4';
    s+=`<i class="${c} ${d===t?'td':''}" title="${dateLabel(d)}: ${Math.round(w)} palavras"></i>`;
  }
  return`<div class="heat" role="img" aria-label="Atividade das últimas 15 semanas">${s}</div>`;
}
function heatStats(){
  const t=TD();let act=0,best=0,run=0,tot=0;
  for(let d=t-104;d<=t;d++){if(active(d)){act++;run++;best=Math.max(best,run);}else run=0;tot+=(S.days[d]||{w:0}).w;}
  return [[act,'dias ativos em 15 semanas'],[Object.keys(S.texts).length+11,'textos lidos'],[Math.round(tot/105),'palavras por dia, em média']].map(x=>`<div><div class="n tnum">${x[0]}</div><div class="l">${x[1]}</div></div>`).join('');
}
function cefr(){
  const k=knownCount();const th=[[0,'A1'],[500,'A2'],[1000,'B1'],[2000,'B2'],[4000,'C1'],[8000,'C2']];
  let idx=0;th.forEach((x,i)=>{if(k>=x[0])idx=i;});
  const lo=th[idx][0],hi=(th[idx+1]||[16000])[0];const p=(k-lo)/(hi-lo);
  return{idx:idx,html:`<div class="cefr">${th.map((x,i)=>`<div class="${i<idx?'past':i===idx?'now':''}">${x[1]}</div>`).join('')}</div><div class="cefr-bar"><i style="width:${((idx+p)/6*100).toFixed(1)}%"></i></div><p class="muted" style="font-size:13px;margin-top:10px">${k} palavras conhecidas. Faltam cerca de ${hi-k} para ${(th[idx+1]||['','C2'])[1]}. Estimativa a partir do vocabulário, não substitui um teste.</p>`};
}
function renderProg(){
  const t=TD();const sum=(k,n)=>{let s=0;for(let o=0;o<n;o++)s+=(S.days[t-o]||{})[k]||0;return s;};
  const series=(k,n)=>{const a=[];for(let o=n-1;o>=0;o--)a.push((S.days[t-o]||{})[k]||0);return a;};
  const learn=learningList();const c=cefr();
  const dist=[[0,'Novas no texto atual'],[1,''],[2,''],[3,''],[4,''],[5,'']];
  const cnt=[1,2,3,4].map(n=>learn.filter(l=>S.vocab[l].st===n).length);const tot=cnt.reduce((a,b)=>a+b,0)||1;
  const g=goals();
  $('#v-prog').innerHTML=`<div class="wrap">
  <div class="page-h"><div><div class="eyebrow">Progresso</div><h1>O teu inglês, em números</h1><p>Leitura, escuta e revisão dos últimos meses. Os valores anteriores a hoje são dados de exemplo.</p></div><button class="btn" data-pv="report">${I('cal',18)} Relatório de ${MO[new Date(TD()*DAY).getUTCMonth()]}</button></div>
  <div class="kpis">
    <div class="card kpi"><span class="l">Palavras conhecidas</span><span class="n tnum">${knownCount()}</span><span class="dl">+${knownCount()-612} em 2 semanas</span>${spark([470,505,538,561,590,612,628,knownCount()],200,40)}</div>
    <div class="card kpi"><span class="l">Palavras lidas · 30 dias</span><span class="n tnum">${Math.round(sum('w',30)).toLocaleString('pt-PT')}</span><span class="dl" style="color:var(--muted)">${Math.round(sum('w',30)/30)} por dia</span>${spark(series('w',30),200,40)}</div>
    <div class="card kpi"><span class="l">Cartões revistos · 30 dias</span><span class="n tnum">${Math.round(sum('r',30))}</span><span class="dl" style="color:var(--muted)">${learn.length} a aprender agora</span>${spark(series('r',30),200,40)}</div>
    <div class="card kpi"><span class="l">Minutos a ouvir · 30 dias</span><span class="n tnum">${Math.round(sum('l',30))}</span><span class="dl" style="color:var(--muted)">${fmt(sum('l',30)/30)} min por dia</span>${spark(series('l',30),200,40)}</div>
  </div>
  <div class="pgrid">
    <div class="card pspan"><div class="row between"><h3>Atividade</h3><span class="hl-leg">menos <i style="background:var(--line)"></i><i class="h1" style="background:color-mix(in srgb,var(--accent) 25%,var(--surface))"></i><i style="background:color-mix(in srgb,var(--accent) 50%,var(--surface))"></i><i style="background:color-mix(in srgb,var(--accent) 75%,var(--surface))"></i><i style="background:var(--accent)"></i> mais</span></div><p class="muted" style="font-size:13px;margin:4px 0 16px">Palavras lidas por dia nas últimas 15 semanas. Cada coluna é uma semana, de segunda a domingo.</p><div class="heat-row">${heatmap()}<div class="heat-st">${heatStats()}</div></div></div>
    <div class="card"><h3>Palavras lidas por dia</h3><p class="muted" style="font-size:13px;margin:4px 0 12px">Últimos 14 dias</p>${barChart()}</div>
    <div class="card"><h3>Vocabulário conhecido</h3><p class="muted" style="font-size:13px;margin:4px 0 12px">Últimas 8 semanas</p>${lineChart()}</div>
    <div class="card"><h3>Nível estimado</h3><p class="muted" style="font-size:13px;margin-top:4px">Escala europeia (QECR)</p>${c.html}${etaHTML()}</div>
    <div class="card"><h3>Metas de hoje</h3><div class="goalrow" style="margin-top:14px">${g.map(x=>{const p=Math.min(100,x.v/x.g*100);return`<div class="gbar"><div class="gt"><span>${x.k}</span><b class="tnum">${fmt(x.v)} / ${x.g} ${x.u}</b></div><div class="bar ${p>=100?'ok':''}"><i style="width:${p}%"></i></div></div>`;}).join('')}</div>
      <div style="margin-top:22px"><div class="row between"><span class="eyebrow">Palavras a aprender por nível</span><span class="muted tnum" style="font-size:12.5px">${learn.length}</span></div><div class="meter" style="height:14px;margin-top:10px">${cnt.map((n,i)=>`<i style="width:${(n/tot*100).toFixed(1)}%;background:var(--hl${i+1})"></i>`).join('')}</div><div class="legend" style="margin-top:8px">${cnt.map((n,i)=>`<span><i class="sw" style="background:var(--hl${i+1})"></i>Nível ${i+1}: ${n}</span>`).join('')}</div></div></div>
    ${progExtra()}
  </div></div>`;
  let col=0;$$('#v-prog .pgrid>.card').forEach(c=>{if(c.classList.contains('pspan')){col=0;return;}c.classList.add(col?'pr':'pl');col^=1;});
}

/* =========================================================
   DEFINIÇÕES
   ========================================================= */
function tog(id,label,on,hint){return`<div class="tog"><span>${label}${hint?`<br><span class="muted" style="font-size:12.5px">${hint}</span>`:''}</span><label class="sw-t"><input type="checkbox" id="${id}" ${on?'checked':''} aria-label="${esc(label)}"><span></span></label></div>`;}
function settingsModal(){
  const s=S.settings;
  setModal(`<div class="mhead"><div><div class="eyebrow">Glosa</div><h2 style="margin-top:6px">Definições</h2></div><button class="ibtn" data-close aria-label="Fechar">${I('x')}</button></div>
  <div class="set-sec" style="border:0;padding:0"><h3>Aparência</h3><div class="seg" role="group" aria-label="Tema">${[['auto','Automático'],['light','Claro'],['dark','Escuro']].map(t=>`<button class="${s.theme===t[0]?'on':''}" data-th="${t[0]}">${t[1]}</button>`).join('')}</div></div>
  <div class="set-sec"><h3>Línguas</h3><div class="grid2"><div class="field"><label for="s-l1">Língua materna</label><select id="s-l1">${LANGS.map(x=>`<option value="${x.code}" ${x.code===(s.native||'pt')?'selected':''}>${esc(x.pt)}</option>`).join('')}</select></div><div class="field"><label for="s-l2">A aprender</label><select id="s-l2">${LANGS.map(x=>`<option value="${x.code}" ${x.code===tl()?'selected':''}>${esc(x.pt)}</option>`).join('')}</select></div></div>
    <div class="field"><label for="s-ui">Língua da interface</label><select id="s-ui"><option>Português (Portugal)</option>${LANGS.filter(x=>x.code!=='pt').map(x=>`<option disabled>${esc(x.pt)} · versão real</option>`).join('')}</select><span class="hint">${(s.native||'pt').indexOf('pt')===0?'':'Na demo as traduções vêm em português. Na versão real vêm na tua língua materna. '}Na versão real, a interface fica traduzida para todas as línguas da lista.</span></div>
    <button class="btn sm" id="s-langs" style="justify-self:start">${I('globe',16)} Ver todas as línguas</button></div>
  ${aiSettingsHTML()}
  <div class="set-sec"><h3>Leitura e voz</h3>
    <div class="grid2"><div class="field"><label for="s-fs">Tamanho do texto · <span id="s-fs-v">${s.fs}px</span></label><input type="range" id="s-fs" min="16" max="28" value="${s.fs}"></div><div class="field"><label for="s-lh">Espaçamento · <span id="s-lh-v">${s.lh}</span></label><input type="range" id="s-lh" min="1.6" max="2.3" step="0.05" value="${s.lh}"></div></div>
    <div class="field"><label for="s-voice">Voz do dispositivo (inglês)</label><select id="s-voice"><option value="">Automática (inglês britânico)</option>${VOICES.map(v=>`<option value="${esc(v.name)}" ${s.voice===v.name?'selected':''}>${esc(v.name)} · ${esc(v.lang)}</option>`).join('')}</select>${VOICES.length?'':'<span class="hint">Este navegador ainda não listou vozes em inglês.</span>'}</div>
    ${tog('s-ex','Sublinhar expressões e phrasal verbs',s.expr)}${tog('s-sb','Botão de traduzir frase',s.sbtn)}</div>
  <div class="set-sec"><h3>Metas diárias</h3><div class="grid3"><div class="field"><label for="g-r">Palavras</label><input type="number" id="g-r" min="10" step="10" value="${s.goal.r}"></div><div class="field"><label for="g-l">Minutos a ouvir</label><input type="number" id="g-l" min="1" value="${s.goal.l}"></div><div class="field"><label for="g-c">Cartões</label><input type="number" id="g-c" min="1" value="${s.goal.c}"></div></div></div>
  <div class="set-sec"><h3>Conta e dados</h3><div class="src"><span class="si">${I('link')}</span><span class="grow"><b>Entrar com Google</b><small>Sincroniza telemóvel e PC (Supabase) · versão real</small></span><span class="chip">Em breve</span></div>
    <div class="road">
      <div>${I('check',18)}<span><b>Já funciona na demo:</b> leitor com estados de palavras, expressões, seleção de frases e leitura contínua, glossário antes de ler, prática (tradução inversa, ditado, ouvir e repetir), IA em contexto (pré-escrita), voz com destaque palavra a palavra, cartões em 4 modos com repetição espaçada, importação de PDF, EPUB, Word, ODT, HTML, Markdown, legendas, RTF e texto (com deteção da língua e livros divididos em partes), cópia de segurança, vocabulário, metas, estatísticas e exportação para Anki.</span></div>
      <div>${I('clock',18)}<span><b>Falta para a versão real:</b> tradução e IA reais com cache (incluindo correção livre das tuas traduções e histórias novas), gravação de voz no shadowing, widget para Android, conta e sincronização, modo offline (PWA), extensão do browser, OCR de PDFs digitalizados e imagens, YouTube por link, áudio sincronizado com Whisper, algoritmo FSRS e lematização completa.</span></div></div>
    <div class="row"><button class="btn sm" id="s-backup">${I('dl',16)} Cópia de segurança</button><button class="btn sm" id="s-reset">Repor dados da demo</button></div></div>`,'Definições');
  const on=(id,ev,fn)=>{const el=document.getElementById(id);if(el)el.addEventListener(ev,fn);};
  $$('#mcard [data-th]').forEach(b=>b.onclick=()=>{s.theme=b.dataset.th;applyTheme();save();$$('#mcard [data-th]').forEach(x=>x.classList.toggle('on',x===b));});
  on('s-l1','change',e=>{s.native=e.target.value;save();settingsModal();});
  on('s-l2','change',e=>{setLang(e.target.value);settingsModal();});
  on('s-langs','click',()=>langModal());
  on('s-en','change',e=>{s.engine=e.target.value;save();});on('s-ai','change',e=>{s.llm=e.target.value;save();});
  on('s-fs','input',e=>{s.fs=+e.target.value;$('#s-fs-v').textContent=s.fs+'px';applyReader();save();});
  on('s-lh','input',e=>{s.lh=+e.target.value;$('#s-lh-v').textContent=s.lh;applyReader();save();});
  on('s-voice','change',e=>{s.voice=e.target.value;save();say('Hello! This is how I sound.');});
  on('s-ex','change',e=>{s.expr=e.target.checked;applyReader();save();});on('s-sb','change',e=>{s.sbtn=e.target.checked;applyReader();save();});
  on('g-r','input',e=>{s.goal.r=Math.max(10,+e.target.value||10);save();updateChrome();});
  on('g-l','input',e=>{s.goal.l=Math.max(1,+e.target.value||1);save();updateChrome();});
  on('g-c','input',e=>{s.goal.c=Math.max(1,+e.target.value||1);save();updateChrome();});
  on('s-backup','click',()=>backupModal());
  bindAISettings();
  on('s-reset','click',()=>{
    const b=$('#s-reset');if(b.dataset.sure!=='1'){b.dataset.sure='1';b.textContent='Tens a certeza? Toca outra vez';return;}
    try{localStorage.removeItem(KEY);}catch(e){}
    S=defaults();for(let i=LESSONS.length-1;i>=0;i--){if(/^(u|rev)/.test(LESSONS[i].id))LESSONS.splice(i,1);}
    cur='t1';G=null;applyTheme();closeModal();go('home');toast('Demo reposta','check');
  });
}
function applyTheme(){const t=S.settings.theme;if(t==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',t);}

/* =========================================================
   eventos globais e arranque
   ========================================================= */
document.addEventListener('click',e=>{
  let el;
  if((el=e.target.closest('[data-close]'))){closeModal();return;}
  if((el=e.target.closest('[data-nav]'))){e.preventDefault();if(!$('#modal').hidden)closeModal();go(el.dataset.nav);return;}
  if((el=e.target.closest('[data-lesson]'))){e.preventDefault();openLesson(el.dataset.lesson);return;}
  if((el=e.target.closest('[data-open-settings]'))){settingsModal();return;}
  if((el=e.target.closest('[data-imp]'))){importModal();return;}
  if((el=e.target.closest('[data-word]'))){wordModal(el.dataset.word);return;}
});
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal();});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){if(!$('#modal').hidden){closeModal();return;}if(view==='read'&&G){closeGloss();return;}}
  if(!$('#modal').hidden){const m=$('#mcard .opt[data-k="'+(+e.key-1)+'"]');if(m&&/^[1-4]$/.test(e.key))m.click();return;}
  const tag=(e.target.tagName||'').toLowerCase();if(tag==='input'||tag==='textarea'||tag==='select'||e.metaKey||e.ctrlKey||e.altKey)return;
  if(view==='read'){
    if(S.settings.flow){}
    else if(e.key==='ArrowRight'){e.preventDefault();navWord(1);}
    else if(e.key==='ArrowLeft'){e.preventDefault();navWord(-1);}
    else if(G&&G.kind==='word'){
      const k=e.key.toLowerCase();
      if(/^[1-4]$/.test(k))setWordStatus(+k);else if(k==='k')setWordStatus(5);else if(k==='n')setWordStatus(0);else if(k==='x')setWordStatus(-1);
      else if(k==='e'){G.tab='ai';renderGloss();startAI();}else if(k==='p')say(TOK[G.sid][G.i].w);else if(k==='t'){G.tr=!G.tr;G.tab='mean';renderGloss();}
    }
  }else if(view==='review'&&R.phase==='card'){
    if((e.key===' '||e.key==='Enter')&&R.mode==='flip'&&!R.rev){e.preventDefault();R.rev=true;renderReview();}
    else if(/^[1-4]$/.test(e.key)){
      if(R.mode==='choice'&&!R.rev){const b=$(`#v-review [data-r="opt"][data-k="${+e.key-1}"]`);if(b)b.click();}
      else if(R.rev&&R.mode!=='choice'){const b=$(`#v-review [data-r="g"][data-v="${e.key}"]`);if(b)b.click();}
    }else if(e.key==='Enter'&&R.mode==='choice'&&R.rev){const b=$('#v-review [data-r="next"]');if(b)b.click();}
  }
});
window.addEventListener('hashchange',()=>{const v=fromHash();if(v&&v!==view)go(v);});

