
/* =========================================================
   Importação: TXT, Markdown, HTML, legendas (SRT/VTT), RTF,
   EPUB, Word (DOCX), OpenDocument (ODT) e PDF.
   Deteção automática da língua e divisão de livros em partes.
   ========================================================= */
var IMPORT_ACCEPT='.txt,.text,.md,.markdown,.html,.htm,.xhtml,.srt,.vtt,.rtf,.epub,.docx,.odt,.pdf,text/plain,text/html,application/pdf,application/epub+zip';
var PART_SENTS=36,MAX_PARTS=80;
var PDFJS_BASE='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/';

/* ---------- deteção da língua ---------- */
var STOP={
 en:'the and of to is in that it was for on with you he she as at be this have from they his her not are but had',
 pt:'de que não uma para com os as do da em um se por mais mas foi como ao ele ela são está também',
 es:'de que el la los las y en un una por con para es lo como más pero sus le ya fue este muy también',
 fr:'le la les et des est un une du que dans pour pas qui sur au avec ce il elle sont mais aussi je',
 de:'der die das und ist nicht ein eine zu den mit sich auf für ich er sie es dem auch wird von',
 it:'il la che di e un una per non sono del della con si ma come anche più lo gli ha',
 nl:'de het een en van is dat niet in op te zijn met voor ik je hij ze maar ook',
 sv:'och att det som en är på för av med inte till den har jag de var om',
 pl:'i w nie się na to że z do jest jak ale co tak za po od czy',
 tr:'bir ve bu da de için ne ile çok daha gibi ama olarak var ben sen',
 id:'yang dan di ini itu dengan untuk tidak dari dalam akan pada ada juga saya',
 ro:'și în de la că nu un o este pe cu se mai din care sunt',
 cs:'a je se na v že to s z do jsem jako ale by pro',
 da:'og i det at en er til på de med for ikke som jeg der',
 no:'og i det er at en på til som for ikke med jeg de har',
 fi:'ja on ei se että hän oli mutta kun niin myös ovat',
 hu:'a az és hogy nem is egy van meg de csak volt már',
 sw:'na ya wa kwa ni la katika za kuwa hii yake lakini',
 vi:'và của là có không được những trong một cho các với người',
 tl:'ang ng sa na at mga ay si ko ako hindi ka',
 ca:'el la i de que els les un una per amb no és al també'
};
var STOPS={};Object.keys(STOP).forEach(k=>{STOPS[k]=new Set(STOP[k].split(' '));});
function detectLang(text){
  const t=String(text).slice(0,6000);const c={};
  const R=[['ja',/[\u3040-\u30ff]/g],['ko',/[\uac00-\ud7af]/g],['zh',/[\u4e00-\u9fff]/g],['ar',/[\u0600-\u06ff]/g],['he',/[\u0590-\u05ff]/g],['ru',/[\u0400-\u04ff]/g],['el',/[\u0370-\u03ff]/g],['th',/[\u0e00-\u0e7f]/g],['hi',/[\u0900-\u097f]/g],['bn',/[\u0980-\u09ff]/g],['ta',/[\u0b80-\u0bff]/g],['ka',/[\u10a0-\u10ff]/g],['hy',/[\u0530-\u058f]/g],['am',/[\u1200-\u137f]/g],['km',/[\u1780-\u17ff]/g],['lo',/[\u0e80-\u0eff]/g],['my',/[\u1000-\u109f]/g],['latin',/[A-Za-zÀ-ɏ]/g]];
  R.forEach(r=>{c[r[0]]=(t.match(r[1])||[]).length;});
  if(c.ja>5)return'ja';
  let best='latin',bv=0;Object.keys(c).forEach(k=>{if(c[k]>bv){bv=c[k];best=k;}});
  if(!bv)return'en';
  if(best==='ar'){if(/[پچژگ]/.test(t))return'fa';if(/[ٹڈڑںے]/.test(t))return'ur';return'ar';}
  if(best==='ru'){if(/[іїєґ]/i.test(t))return'uk';if(/[ўі]/i.test(t))return'be';return'ru';}
  if(best!=='latin')return best;
  const words=t.toLowerCase().split(/[^a-zà-ɏ']+/).filter(Boolean).slice(0,1500);const sc={};
  words.forEach(w=>{Object.keys(STOPS).forEach(k=>{if(STOPS[k].has(w))sc[k]=(sc[k]||0)+1;});});
  if(/[ãõ]/.test(t))sc.pt=(sc.pt||0)+5;if(/ñ|¿|¡/.test(t))sc.es=(sc.es||0)+5;if(/ß/.test(t))sc.de=(sc.de||0)+5;if(/[ğış]/.test(t))sc.tr=(sc.tr||0)+5;if(/[ąęłńśźż]/.test(t))sc.pl=(sc.pl||0)+5;
  let bl='en',bs=0;Object.keys(sc).forEach(k=>{if(sc[k]>bs){bs=sc[k];bl=k;}});
  return bl;
}

/* ---------- ZIP (EPUB, DOCX, ODT) sem bibliotecas ---------- */
async function unzip(buf){
  const dv=new DataView(buf);let e=-1;
  for(let i=buf.byteLength-22;i>=Math.max(0,buf.byteLength-65557);i--){if(dv.getUint32(i,true)===0x06054b50){e=i;break;}}
  if(e<0)throw new Error('O ficheiro não parece um arquivo válido (zip).');
  const n=dv.getUint16(e+10,true);let p=dv.getUint32(e+16,true);const files={};const td=new TextDecoder();
  for(let k=0;k<n;k++){
    if(dv.getUint32(p,true)!==0x02014b50)break;
    const method=dv.getUint16(p+10,true),csize=dv.getUint32(p+20,true),fl=dv.getUint16(p+28,true),xl=dv.getUint16(p+30,true),cl=dv.getUint16(p+32,true),lho=dv.getUint32(p+42,true);
    files[td.decode(new Uint8Array(buf,p+46,fl))]={method:method,csize:csize,lho:lho};p+=46+fl+xl+cl;
  }
  return{names:Object.keys(files),text:async function(name){
    const f=files[name];if(!f)return null;
    const ln=dv.getUint16(f.lho+26,true),lx=dv.getUint16(f.lho+28,true);const data=new Uint8Array(buf,f.lho+30+ln+lx,f.csize);
    let out;
    if(f.method===0)out=data;
    else if(f.method===8){
      if(typeof DecompressionStream==='undefined')throw new Error('Este navegador não consegue abrir ficheiros comprimidos. Atualiza-o ou usa o Chrome.');
      const st=new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'));out=new Uint8Array(await new Response(st).arrayBuffer());
    }else throw new Error('Compressão não suportada.');
    return new TextDecoder('utf-8').decode(out);
  }};
}
function xml(s,type){return new DOMParser().parseFromString(s,type||'application/xml');}
function blocksFromDoc(doc){
  doc.querySelectorAll('script,style,nav,header,footer,aside,noscript,svg,figure figcaption').forEach(n=>n.remove());
  const out=[];const B='p,h1,h2,h3,h4,h5,h6,li,blockquote,pre,dd,dt,td';
  const els=doc.querySelectorAll(B);
  if(els.length){els.forEach(el=>{if(el.querySelector(B))return;const t=el.textContent.replace(/\s+/g,' ').trim();if(t)out.push({t:t,h:/^H[1-3]$/.test(el.tagName.toUpperCase())});});}
  else{const t=(doc.body||doc.documentElement).textContent||'';t.split(/\n\s*\n/).forEach(x=>{x=x.replace(/\s+/g,' ').trim();if(x)out.push({t:x});});}
  return out;
}
function paraText(blocks){return blocks.map(b=>b.t).join('\n\n');}

/* ---------- extratores ---------- */
async function extEPUB(buf){
  const z=await unzip(buf);
  const cont=await z.text('META-INF/container.xml');if(!cont)throw new Error('EPUB sem container.xml.');
  const rf=xml(cont).getElementsByTagNameNS('*','rootfile')[0];const opfPath=rf&&rf.getAttribute('full-path');if(!opfPath)throw new Error('EPUB sem ficheiro OPF.');
  const opf=xml(await z.text(opfPath));const dir=opfPath.indexOf('/')>=0?opfPath.slice(0,opfPath.lastIndexOf('/')+1):'';
  const title=((opf.getElementsByTagNameNS('*','title')[0]||{}).textContent||'').trim();
  const langTag=((opf.getElementsByTagNameNS('*','language')[0]||{}).textContent||'').trim();
  const man={};Array.from(opf.getElementsByTagNameNS('*','item')).forEach(it=>{man[it.getAttribute('id')]={href:it.getAttribute('href'),props:it.getAttribute('properties')||'',type:it.getAttribute('media-type')||''};});
  const chapters=[];
  for(const ir of Array.from(opf.getElementsByTagNameNS('*','itemref'))){
    const m=man[ir.getAttribute('idref')];if(!m||/nav/.test(m.props)||!/html/.test(m.type))continue;
    const path=decodeURIComponent((dir+m.href).replace(/\/\.\//g,'/'));
    let src=await z.text(path);if(!src)continue;
    let doc=xml(src,'application/xhtml+xml');if(doc.getElementsByTagName('parsererror').length)doc=xml(src,'text/html');
    const bl=blocksFromDoc(doc);const txt=paraText(bl);if(txt.length<40)continue;
    const h=bl.find(b=>b.h);chapters.push({title:h?h.t.slice(0,80):'',text:txt});
  }
  if(!chapters.length)throw new Error('Não encontrei texto neste EPUB.');
  return{title:title,chapters:chapters,lang:langTag?langTag.split('-')[0].toLowerCase():null};
}
async function extDOCX(buf){
  const z=await unzip(buf);const s=await z.text('word/document.xml');if(!s)throw new Error('DOCX sem documento.');
  const d=xml(s);const out=[];
  Array.from(d.getElementsByTagNameNS('*','p')).forEach(p=>{let t='';p.querySelectorAll('*').forEach(n=>{if(n.localName==='t')t+=n.textContent;else if(n.localName==='tab')t+=' ';else if(n.localName==='br')t+=' ';});t=t.replace(/\s+/g,' ').trim();if(t)out.push(t);});
  const core=await z.text('docProps/core.xml');const title=core?((xml(core).getElementsByTagNameNS('*','title')[0]||{}).textContent||''):'';
  return{title:title.trim(),chapters:[{title:'',text:out.join('\n\n')}]};
}
async function extODT(buf){
  const z=await unzip(buf);const s=await z.text('content.xml');if(!s)throw new Error('ODT sem conteúdo.');
  const d=xml(s);const out=[];
  Array.from(d.getElementsByTagNameNS('*','p')).concat(Array.from(d.getElementsByTagNameNS('*','h'))).forEach(p=>{const t=p.textContent.replace(/\s+/g,' ').trim();if(t)out.push(t);});
  return{title:'',chapters:[{title:'',text:out.join('\n\n')}]};
}
function extHTML(s){const d=xml(s,'text/html');const t=(d.querySelector('title')||{}).textContent||'';return{title:t.trim(),chapters:[{title:'',text:paraText(blocksFromDoc(d))}]};}
function extSubs(s){
  const lines=s.replace(/\r/g,'').split('\n').filter(l=>{l=l.trim();return l&&!/^\d+$/.test(l)&&l.indexOf('-->')<0&&!/^WEBVTT/.test(l)&&!/^(NOTE|STYLE|REGION)\b/.test(l);});
  const txt=lines.map(l=>l.replace(/<[^>]+>/g,'').replace(/\{[^}]+\}/g,'').replace(/^-\s*/,'').trim()).filter(Boolean);
  const out=[];txt.forEach(l=>{if(out.length&&!/[.!?。！？…]["”']?$/.test(out[out.length-1]))out[out.length-1]+=' '+l;else out.push(l);});
  return{title:'',chapters:[{title:'',text:out.join('\n')}]};
}
function extMD(s){
  let fmTitle='';const fm=s.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);if(fm){const tm=fm[1].match(/^title:\s*["']?(.+?)["']?\s*$/m);if(tm)fmTitle=tm[1];s=s.slice(fm[0].length);}
  const t=s.replace(/```[\s\S]*?```/g,'').replace(/!\[[^\]]*\]\([^)]*\)/g,'').replace(/\[([^\]]+)\]\([^)]*\)/g,'$1').replace(/^#{1,6}\s*/gm,'').replace(/^\s*[-*+]\s+/gm,'').replace(/^\s*>\s?/gm,'').replace(/[*_`~]{1,3}/g,'');
  const h=s.match(/^#\s+(.+)$/m);return{title:fmTitle||(h?h[1].trim():''),chapters:[{title:'',text:t}]};
}
function extRTF(s){
  let t=s.replace(/\\'([0-9a-f]{2})/gi,(m,h)=>String.fromCharCode(parseInt(h,16))).replace(/\\u(-?\d+)\??/g,(m,n)=>String.fromCharCode((+n+65536)%65536));
  t=t.replace(/\{\\\*[^{}]*\}/g,'').replace(/\{\\(fonttbl|colortbl|stylesheet|info)[\s\S]*?\}\}/g,'').replace(/\\par[d]?\b/g,'\n\n').replace(/\\[a-z]+-?\d* ?/gi,'').replace(/[{}]/g,'');
  t=t.split('\n').filter(l=>!/^[\s;:,.]*$/.test(l)||l==='').join('\n');
  return{title:'',chapters:[{title:'',text:t}]};
}
function loadScriptMod(url){return import(url);}
async function loadPdfjs(){
  if(window.__pdfjs)return window.__pdfjs;
  let lib;
  try{lib=await loadScriptMod(PDFJS_BASE+'pdf.min.mjs');}catch(e){throw new Error('Não consegui carregar o leitor de PDF. Verifica a ligação à internet e tenta outra vez.');}
  try{globalThis.pdfjsWorker=await loadScriptMod(PDFJS_BASE+'pdf.worker.min.mjs');}catch(e){}
  lib.GlobalWorkerOptions.workerSrc=PDFJS_BASE+'pdf.worker.min.mjs';
  window.__pdfjs=lib;return lib;
}
async function extPDF(buf,progress){
  const lib=await loadPdfjs();
  const pdf=await lib.getDocument({data:new Uint8Array(buf),isEvalSupported:false,useSystemFonts:true}).promise;
  let meta={};try{meta=(await pdf.getMetadata()).info||{};}catch(e){}
  const n=Math.min(pdf.numPages,600);const paras=[];let chars=0;
  for(let i=1;i<=n;i++){
    if(progress)progress(i,n);
    const page=await pdf.getPage(i);const tc=await page.getTextContent();
    let line='',lastY=null,lastH=12,buf2=[];
    tc.items.forEach(it=>{
      if(!('str' in it))return;const y=it.transform?it.transform[5]:0;const h=Math.abs(it.height||(it.transform?it.transform[3]:12))||12;
      if(lastY!==null&&Math.abs(y-lastY)>h*1.9){if(line.trim())buf2.push(line.trim());buf2.push('');line='';}
      else if(lastY!==null&&Math.abs(y-lastY)>h*.5){line+=' ';}
      line+=it.str;if(it.hasEOL)line+=' ';lastY=y;lastH=h;
    });
    if(line.trim())buf2.push(line.trim());
    let cur2='';buf2.forEach(l=>{if(l===''){if(cur2.trim())paras.push(cur2.trim());cur2='';}else cur2+=(cur2&&!/-$/.test(cur2)?' ':'')+l.replace(/-$/,'');});
    if(cur2.trim())paras.push(cur2.trim());
    chars+=tc.items.reduce((a,it)=>a+((it.str||'').length),0);
  }
  if(chars<30)throw new Error('Este PDF parece digitalizado (só imagens). Ler texto em imagens (OCR) fica para a versão real.');
  const clean=paras.map(p=>p.replace(/\s+/g,' ').trim()).filter(p=>p&&!/^\d{1,4}$/.test(p));
  return{title:(meta.Title||'').trim(),chapters:[{title:'',text:clean.join('\n\n')}],pages:pdf.numPages};
}
function fmtOf(name){const m=String(name).toLowerCase().match(/\.([a-z0-9]+)$/);return m?m[1]:'txt';}
async function extractFile(f,progress){
  const ext=fmtOf(f.name);
  if(/^(png|jpe?g|webp|gif|heic|bmp|tiff?)$/.test(ext))throw new Error('Imagens precisam de OCR para extrair o texto. Fica para a versão real.');
  if(/^(mp3|m4a|wav|ogg|mp4|webm)$/.test(ext))throw new Error('Áudio e vídeo precisam de transcrição (Whisper). Fica para a versão real.');
  if(ext==='doc')throw new Error('O formato .doc antigo não é suportado. Guarda o ficheiro como .docx no Word e tenta outra vez.');
  if(ext==='mobi'||ext==='azw3')throw new Error('Ficheiros Kindle (.mobi/.azw3) não são suportados. Converte para EPUB com o Calibre e tenta outra vez.');
  if(ext==='pdf')return Object.assign(await extPDF(await f.arrayBuffer(),progress),{fmt:'PDF'});
  if(ext==='epub')return Object.assign(await extEPUB(await f.arrayBuffer()),{fmt:'EPUB'});
  if(ext==='docx')return Object.assign(await extDOCX(await f.arrayBuffer()),{fmt:'Word'});
  if(ext==='odt')return Object.assign(await extODT(await f.arrayBuffer()),{fmt:'OpenDocument'});
  const s=await f.text();
  if(ext==='html'||ext==='htm'||ext==='xhtml')return Object.assign(extHTML(s),{fmt:'HTML'});
  if(ext==='srt'||ext==='vtt')return Object.assign(extSubs(s),{fmt:'Legendas'});
  if(ext==='md'||ext==='markdown')return Object.assign(extMD(s),{fmt:'Markdown'});
  if(ext==='rtf')return Object.assign(extRTF(s),{fmt:'RTF'});
  return{title:'',chapters:[{title:'',text:s}],fmt:'Texto'};
}

/* ---------- frases e partes ---------- */
function splitSentences(text){
  const paras=String(text).replace(/\r/g,'').split(/\n\s*\n|\n(?=[A-ZÀ-Ý"“«—–-])/).map(p=>p.replace(/\s+/g,' ').trim()).filter(Boolean);
  const out=[];
  paras.forEach(p=>{
    const ss=(p.match(/[^.!?。！？؟…]+(?:[.!?。！？؟…]+["”’'»」』)]*|$)/g)||[p]).map(s=>s.trim()).filter(Boolean);
    const merged=[];ss.forEach(s=>{if(merged.length&&(s.length<3||/^(Mr|Mrs|Ms|Dr|Sr|Sra|St|vs|etc|No|p)\.$/i.test(merged[merged.length-1].split(' ').pop())))merged[merged.length-1]+=' '+s;else merged.push(s);});
    const LET=/[A-Za-z0-9\u00C0-\uFFFF]/;
    merged.filter(s=>LET.test(s)).forEach((s,i)=>{if(s.length>600){for(let k=0;k<s.length;k+=400)out.push({en:s.slice(k,k+400),p:i===0&&k===0?1:0});}else out.push({en:s,p:i===0?1:0});});
  });
  return out;
}
function planImport(parsed){
  const parts=[];
  parsed.chapters.forEach((ch,ci)=>{
    const ss=splitSentences(ch.text);if(!ss.length)return;
    for(let k=0;k<ss.length;k+=PART_SENTS){parts.push({title:ch.title,sents:ss.slice(k,k+PART_SENTS)});}
  });
  return parts.slice(0,MAX_PARTS);
}

/* ---------- interface de importação ---------- */
function readFile(f){
  if(!f)return;
  setModal(`<div class="mhead"><div><div class="eyebrow">Importar</div><h2 style="margin-top:6px">A ler o ficheiro…</h2></div><button class="ibtn" data-close aria-label="Fechar">${I('x')}</button></div>
  <p class="muted" id="imp-st">${esc(f.name)}</p><div class="rep-bar"><i id="imp-bar" style="width:8%;transition:width .2s"></i></div>`,'Importar');
  const bar=()=>$('#imp-bar'),st=()=>$('#imp-st');
  extractFile(f,(i,n)=>{if(bar())bar().style.width=Math.round(i/n*100)+'%';if(st())st().textContent=`${f.name} · página ${i} de ${n}`;})
    .then(p=>{const all=p.chapters.map(c=>c.text).join('\n\n');if(all.replace(/\s/g,'').length<10)throw new Error('Não encontrei texto neste ficheiro.');importPreview(p,f.name);})
    .catch(err=>{setModal(`<div class="mhead"><div><div class="eyebrow">Importar</div><h2 style="margin-top:6px">Não foi possível importar</h2></div><button class="ibtn" data-close aria-label="Fechar">${I('x')}</button></div><p>${esc(err&&err.message?err.message:'Erro ao ler o ficheiro.')}</p><p class="muted" style="font-size:13.5px">Formatos aceites: ${IMPORT_FMTS}.</p><div class="row" style="justify-content:flex-end"><button class="btn" data-close>Fechar</button><button class="btn pri" id="imp-paste">Colar texto</button></div>`,'Erro');const b=$('#imp-paste');if(b)b.onclick=()=>importModal();});
}
var IMPORT_FMTS='PDF, EPUB, Word (.docx), OpenDocument (.odt), HTML, Markdown, legendas (.srt, .vtt), RTF e texto (.txt)';
function importPreview(parsed,fname){
  const all=parsed.chapters.map(c=>c.text).join('\n\n');
  const lg=(parsed.lang&&LANGS.some(x=>x.code===parsed.lang))?parsed.lang:detectLang(all);
  const parts=planImport(parsed);const nS=parts.reduce((a,p)=>a+p.sents.length,0);
  const nW=segWords(all.slice(0,200000),lg).filter(t=>t.w).length;
  const title=parsed.title||String(fname||'').replace(/\.[^.]+$/,'')||'Texto importado';
  const cut=parsed.chapters.reduce((a,c)=>a+splitSentences(c.text).length,0)>nS;
  setModal(`<div class="mhead"><div><div class="eyebrow">Importar · ${esc(parsed.fmt||'Texto')}</div><h2 style="margin-top:6px">Pré-visualização</h2></div><button class="ibtn" data-close aria-label="Fechar">${I('x')}</button></div>
  <div class="rep-grid">${[[nW>=1000?(nW/1000).toFixed(nW>=10000?0:1)+' mil':nW,'palavras'],[nS,'frases'],[parts.length,parts.length===1?'parte':'partes']].map(x=>`<div class="stat"><div class="n tnum" style="font-size:30px">${x[0]}</div><div class="l">${x[1]}</div></div>`).join('')}</div>
  ${parsed.pages?`<p class="muted" style="font-size:13px">${parsed.pages} páginas${parsed.pages>600?' (importei as primeiras 600)':''}.</p>`:''}
  ${cut?`<p class="muted" style="font-size:13px">O texto é longo: importei as primeiras ${MAX_PARTS} partes (${nS} frases).</p>`:''}
  <div class="field"><label for="ip-t">Título</label><input type="text" id="ip-t" value="${esc(title)}"></div>
  <div class="field"><label for="ip-lg">Língua (detetada automaticamente)</label><select id="ip-lg">${LANGS.map(x=>`<option value="${x.code}" ${x.code===lg?'selected':''}>${esc(x.pt)} · ${esc(x.nat)}</option>`).join('')}</select></div>
  <div class="field"><span class="flbl">Início do texto</span><div class="card flat" dir="auto" style="padding:12px 14px;max-height:150px;overflow:auto;font:400 15.5px/1.6 var(--f-r);color:var(--ink-2)">${esc(all.slice(0,700))}${all.length>700?'…':''}</div></div>
  ${parts.length>1?`<p class="muted" style="font-size:13.5px">Os livros são divididos em partes de cerca de ${PART_SENTS} frases, para leres e terminares uma de cada vez.</p>`:''}
  <div class="row" style="justify-content:flex-end"><button class="btn" data-close>Cancelar</button><button class="btn pri" id="ip-ok">${I('check',16)} Importar e ler</button></div>`,'Pré-visualização');
  $('#ip-ok').onclick=()=>importParts($('#ip-t').value.trim()||title,parts,$('#ip-lg').value,parsed.fmt);
}
function importParts(title,parts,lg,fmt){
  const gid='u'+Date.now().toString(36);const made=[];
  parts.forEach((p,i)=>{
    const id=parts.length>1?gid+'p'+(i+1):gid;
    const L={id:id,gid:gid,lang:lg,fmt:fmt||'Texto',title:parts.length>1?(p.title&&p.title.length<70?p.title:title+' · parte '+(i+1)):title,book:parts.length>1?title:null,part:parts.length>1?i+1:null,sents:p.sents.map((s,k)=>({id:id+'s'+k,en:s.en,p:s.p}))};
    S.imported.push(L);registerImported(L);made.push(id);
  });
  S.settings.lang=lg;
  if(!save())toast('Sem espaço no navegador: este texto pode não ficar guardado depois de fechares a página.');
  closeModal();openLesson(made[0]);
  toast(parts.length>1?`Importado em ${parts.length} partes`:'Texto importado','check');
}
function importModal(title,text){
  setModal(`<div class="mhead"><div><div class="eyebrow">Importar</div><h2 style="margin-top:6px">Novo texto</h2></div><button class="ibtn" data-close aria-label="Fechar">${I('x')}</button></div>
  <label class="drop" id="im-drop" for="im-file" style="min-height:0;padding:18px"><span class="row" style="justify-content:center;gap:10px">${I('upload',20)}<b>Abrir ficheiro</b></span><span class="muted" style="font-size:13px">${IMPORT_FMTS}</span><input type="file" id="im-file" accept="${IMPORT_ACCEPT}" hidden></label>
  <div class="field"><label for="im-t">Título</label><input type="text" id="im-t" placeholder="Ex.: Um artigo de que gosto" value="${esc(title||'')}"></div>
  <div class="field"><label for="im-x">Ou cola o texto</label><textarea id="im-x" dir="auto" placeholder="Cola aqui o texto, em qualquer língua…">${esc(text||'')}</textarea><span class="hint" id="im-det">A língua é detetada automaticamente.</span></div>
  <div class="row" style="justify-content:flex-end"><button class="btn" data-close>Cancelar</button><button class="btn pri" id="im-ok">Continuar ${I('arrow',16)}</button></div>`,'Importar texto');
  const x=$('#im-x'),det=$('#im-det');
  const upd=()=>{const v=x.value.trim();det.textContent=v.length>15?'Língua detetada: '+langName(detectLang(v))+'. Podes mudar no passo seguinte.':'A língua é detetada automaticamente.';};
  x.addEventListener('input',upd);upd();
  $('#im-file').addEventListener('change',e=>{const f=e.target.files&&e.target.files[0];if(f)readFile(f);});
  const dz=$('#im-drop');['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('over');}));['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove('over');}));
  dz.addEventListener('drop',e=>{const f=e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files[0];if(f)readFile(f);});
  $('#im-ok').onclick=()=>{const v=x.value.trim();if(v.replace(/\s/g,'').length<8){toast('Cola um texto ou abre um ficheiro.');return;}importPreview({title:$('#im-t').value.trim(),chapters:[{title:'',text:v}],fmt:'Texto colado'},'');};
}
function deleteImport(id){
  const L=lessonById(id);if(!L)return;const gid=(S.imported.find(x=>x.id===id)||{}).gid||id;
  const ids=S.imported.filter(x=>(x.gid||x.id)===gid).map(x=>x.id);
  S.imported=S.imported.filter(x=>ids.indexOf(x.id)<0);
  for(let i=LESSONS.length-1;i>=0;i--){if(ids.indexOf(LESSONS[i].id)>=0)LESSONS.splice(i,1);}
  ids.forEach(i=>{delete S.texts[i];delete S.pos[i];});
  save();const own=lessonsOf(tl());cur=own.length?own[0].id:'t1';G=null;closeModal();go('lib');toast(ids.length>1?'Livro apagado':'Texto apagado','check');
}

/* ---------- cópia de segurança ---------- */
function backupModal(){
  let data='';try{data=JSON.stringify(Object.assign({app:'glosa',v:2,date:new Date().toISOString()},S));}catch(e){}
  const kb=Math.round(data.length/1024);
  setModal(`<div class="mhead"><div><div class="eyebrow">Os teus dados</div><h2 style="margin-top:6px">Cópia de segurança</h2></div><button class="ibtn" data-close aria-label="Fechar">${I('x')}</button></div>
  <p class="muted" style="font-size:14px">Na demo, tudo fica só neste navegador. Copia a cópia e guarda-a num ficheiro .json (por exemplo, numa nota ou no teu PC) para a restaurares noutro dispositivo. Na versão real, a conta sincroniza sozinha.</p>
  <div class="field"><label for="bk-t">Cópia atual · ${kb} KB</label><textarea id="bk-t" class="inp" style="height:120px;padding:12px;font:12px/1.5 ui-monospace,Menlo,monospace" readonly>${esc(data)}</textarea></div>
  <div class="row"><button class="btn pri" id="bk-copy">Copiar cópia</button></div>
  <div class="set-sec"><h3>Restaurar</h3><p class="muted" style="font-size:13.5px">Abre um ficheiro .json ou cola a cópia abaixo. Substitui os dados atuais.</p>
  <label class="btn sm" for="bk-file" style="justify-self:start">${I('upload',16)} Abrir ficheiro .json<input type="file" id="bk-file" accept=".json,application/json,text/plain" hidden></label>
  <textarea id="bk-in" class="inp" style="height:90px;padding:12px;font:12px/1.5 ui-monospace,Menlo,monospace" placeholder="Cola aqui uma cópia…" aria-label="Cópia para restaurar"></textarea>
  <div class="row"><button class="btn" id="bk-restore">Restaurar cópia</button></div></div>`,'Cópia de segurança');
  $('#bk-copy').onclick=()=>{const ta=$('#bk-t');const fb=()=>{ta.focus();ta.select();toast('Selecionado. Copia com Ctrl+C.');};try{navigator.clipboard.writeText(ta.value).then(()=>toast('Cópia copiada','check'),fb);}catch(e){fb();}};
  $('#bk-file').addEventListener('change',e=>{const f=e.target.files&&e.target.files[0];if(f)f.text().then(t=>{$('#bk-in').value=t;toast('Ficheiro carregado. Toca em «Restaurar cópia».');});});
  $('#bk-restore').onclick=()=>restoreBackup($('#bk-in').value);
}
function restoreBackup(txt){
  let o;try{o=JSON.parse(txt);}catch(e){toast('Este texto não é uma cópia válida do Glosa.');return;}
  if(!o||typeof o!=='object'||!o.vocab||!o.settings||!o.days){toast('Esta cópia não tem os dados do Glosa.');return;}
  for(let i=LESSONS.length-1;i>=0;i--){if(/^(u|rev)/.test(LESSONS[i].id))LESSONS.splice(i,1);}
  const d=defaults();delete o.app;delete o.v;delete o.date;S=Object.assign(d,o);S.settings=Object.assign(defaults().settings,o.settings||{});
  (S.imported||[]).forEach(registerImported);
  cur=lessonById(S.last)?S.last:'t1';G=null;save();applyTheme();closeModal();go('home');toast('Cópia restaurada','check');
}
