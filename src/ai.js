
/* =========================================================
   IA e voz reais
   - Dentro do Claude: IA do Claude (sample), vozes do Claude (tts),
     ditado pelo microfone (dictation) e downloads.
   - Fora do Claude (ex.: GitHub Pages): Gemini com a chave do próprio
     utilizador, voz do dispositivo e downloads normais.
   - Sem nada disto: respostas de exemplo pré-escritas.
   ========================================================= */
var CAP={sample:null,tts:null,dict:null,dl:null};
var AI_DENIED=false,TTS_DENIED=false;
function inClaude(){try{return !!(window.claude&&typeof window.claude.use==='function');}catch(e){return false;}}
function initCaps(){
  if(!inClaude())return;
  [['sample','sample'],['tts','tts'],['dictation','dict'],['downloads','dl']].forEach(p=>{
    try{window.claude.use(p[0]).then(ns=>{CAP[p[1]]=ns||null;onCapsChange();},()=>{});}catch(e){}
  });
}
function onCapsChange(){
  try{
    if(view==='read'&&G)renderGloss();
    if(view==='practice')renderPractice();
    if(modalOn==='Definições'){const a=document.activeElement;if(!a||!/INPUT|TEXTAREA|SELECT/.test(a.tagName))settingsModal();}
  }catch(e){}
}
function gemKey(){try{return localStorage.getItem('glosa-gemini-key')||'';}catch(e){return'';}}
function setGemKey(k){try{if(k)localStorage.setItem('glosa-gemini-key',k);else localStorage.removeItem('glosa-gemini-key');}catch(e){}}
function aiProvider(){if(CAP.sample&&!AI_DENIED)return'claude';if(!inClaude()&&gemKey())return'gemini';return null;}
function aiLabel(src){return src==='claude'?'Claude':src==='gemini'?'Gemini':'Glosa IA · exemplo';}
function ensureAI(){S.ai=S.ai||{};S.ai.d=S.ai.d||{};S.ai.x=S.ai.x||{};S.ai.s=S.ai.s||{};}
function trimCache(){ensureAI();const k=Object.keys(S.ai.x);if(k.length>400)k.slice(0,k.length-400).forEach(x=>delete S.ai.x[x]);}
function nat(){return langName(S.settings.native||'pt');}

async function askAI(prompt,o){
  o=o||{};const src=aiProvider();
  if(src==='claude'){
    try{
      if(o.json)return await CAP.sample.json(prompt,{modelTier:o.tier||'quick'});
      const r=await CAP.sample(prompt,{modelTier:o.tier||'quick',cache:false,onText:o.onText?(x=>o.onText(x.text)):undefined});
      return r.text;
    }catch(e){if(e&&e.code==='not_granted')AI_DENIED=true;throw e;}
  }
  if(src==='gemini'){
    const model=(S.settings.gemModel||'gemini-2.5-flash').trim();
    let res;
    try{res=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+encodeURIComponent(model)+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':gemKey()},body:JSON.stringify({contents:[{role:'user',parts:[{text:prompt}]}],generationConfig:o.json?{responseMimeType:'application/json'}:{}})});}
    catch(e){throw{code:'network'};}
    if(!res.ok)throw{code:'http_'+res.status};
    const j=await res.json();const parts=(((j.candidates||[])[0]||{}).content||{}).parts||[];
    const t=parts.map(p=>p.text||'').join('').trim();
    if(o.json){try{return JSON.parse(t.replace(/^```(?:json)?\s*|\s*```$/g,''));}catch(e){throw{code:'bad_json'};}}
    if(o.onText)o.onText(t);
    return t;
  }
  throw{code:'no_ai'};
}
function aiErrText(e){
  const c=e&&e.code||'';
  if(c==='not_granted')return'Não deste acesso à IA. As respostas de exemplo continuam disponíveis. Podes ligar a IA de novo nas definições do Claude.';
  if(c==='rate_limited')return'Muitos pedidos seguidos. Espera um minuto e tenta outra vez.';
  if(c==='http_400'||c==='http_401'||c==='http_403')return'A chave do Gemini não foi aceite. Confirma-a em Definições → IA e voz.';
  if(c==='http_404')return'Esse modelo do Gemini não existe. Muda o nome do modelo em Definições → IA e voz.';
  if(c==='http_429')return'Chegaste ao limite gratuito do Gemini por agora. Tenta mais tarde.';
  if(c==='network')return'Sem ligação à internet.';
  return'A IA não respondeu. Tenta outra vez daqui a pouco.';
}

/* ---------- contexto e pedidos ---------- */
function ctxPara(sid){
  const L=LESSONS.find(x=>sentsOf(x).indexOf(sid)>=0);if(!L)return SENT[sid].en;
  const p=L.paras.find(p=>p.indexOf(sid)>=0)||[sid];return p.map(s=>SENT[s].en).join(' ').slice(0,1200);
}
function lgOf(sid){return SENT_LANG[sid]||'en';}
function pWordExplain(){
  const tk=TOK[G.sid][G.i],lg=lgOf(G.sid);
  return`És um tutor paciente de ${langName(lg)} para alguém cuja língua materna é ${nat()}.
Explica a palavra «${tk.w}» (forma base: ${label(tk.l)}) no sentido que tem nesta frase.
Frase: «${SENT[G.sid].en}»
Parágrafo: «${ctxPara(G.sid)}»
Responde em ${nat()}, em texto simples sem markdown, com no máximo 90 palavras e três partes separadas por uma linha em branco:
1) o que quer dizer aqui;
2) uma nota útil de gramática ou de uso;
3) um exemplo curto e novo em ${langName(lg)}, com a tradução.`;
}
function pSentExplain(){
  const lg=lgOf(G.sid);
  return`És um tutor paciente de ${langName(lg)} para alguém cuja língua materna é ${nat()}.
Explica esta frase: «${SENT[G.sid].en}»
Contexto: «${ctxPara(G.sid)}»
Responde em ${nat()}, em texto simples sem markdown, com no máximo 110 palavras: a tradução natural, depois a estrutura gramatical mais importante e uma expressão ou palavra que valha a pena guardar.`;
}
function pFollow(k){
  const lg=lgOf(G.sid);
  if(G.kind==='word'){const tk=TOK[G.sid][G.i];
    if(k==='ex')return`Dá 2 frases novas e simples em ${langName(lg)} com a palavra «${label(tk.l)}» no mesmo sentido que em «${SENT[G.sid].en}». Depois de cada uma, a tradução para ${nat()}. Texto simples, sem markdown.`;
    if(k==='fam')return`Lista as formas principais da palavra «${label(tk.l)}» em ${langName(lg)} (conjugação, plural, género ou outras, conforme a classe) e 2 palavras da mesma família, cada uma com a tradução para ${nat()}. Texto simples, no máximo 80 palavras, sem markdown.`;
  }
  return null;
}
function pAsk(q){
  const lg=lgOf(G.sid);const what=G.kind==='word'?`a palavra «${TOK[G.sid][G.i].w}»`:G.kind==='phrase'?`a expressão «${phraseText(G.sid,G.a,G.b)}»`:'esta frase';
  return`És um tutor paciente de ${langName(lg)} para alguém cuja língua materna é ${nat()}. O aluno está a ler ${what}, na frase «${SENT[G.sid].en}» (contexto: «${ctxPara(G.sid)}»).
Pergunta do aluno: ${q}
Responde em ${nat()}, em texto simples sem markdown, com no máximo 120 palavras.`;
}

/* ---------- conversa no painel ---------- */
function realAI(prompt,q,key){
  const g=G;if(!g)return;if(q)g.chat.push({me:q});ensureAI();const src=aiProvider();
  if(key&&S.ai.x[key]){g.chat.push({ai:S.ai.x[key],state:'done',src:src,cached:true});renderGloss();scrollGloss();return;}
  const m={ai:'',state:'load',src:src,n:0};g.chat.push(m);renderGloss();scrollGloss();
  askAI(prompt,{onText:t=>{if(G!==g)return;m.ai=t;m.n=t.length;if(m.state==='load'){m.state='stream';renderGloss();}else{const el=document.getElementById('ai-typing');if(el)el.textContent=t;}scrollGloss();}})
  .then(t=>{m.ai=String(t||m.ai||'').trim();m.state='done';if(key&&m.ai){S.ai.x[key]=m.ai;trimCache();save();}if(G===g){renderGloss();scrollGloss();}})
  .catch(e=>{m.state='done';m.err=true;m.ai=aiErrText(e);if(G===g)renderGloss();});
}

/* ---------- traduções que faltam ---------- */
var LOOKING={},TRANSL={};
function autoLookup(l,sid,i){
  ensureAI();if(LOOKING[l]||S.ai.d[l]||!aiProvider())return;
  const tk=TOK[sid][i],lg=lgOf(sid);LOOKING[l]=1;
  askAI(`Palavra em ${langName(lg)}: «${tk.w}». Frase: «${SENT[sid].en}».
Responde só com JSON, sem texto à volta, neste formato:
{"pt":"tradução curta para ${nat()} com o sentido nesta frase","lemma":"forma base (de dicionário)","pos":"subst., verbo, adj., adv., prep., conj., pron. ou outro","reading":"pronúncia em IPA; para escritas não latinas, a romanização"}`,{json:true})
  .then(o=>{delete LOOKING[l];if(o&&o.pt){S.ai.d[l]={pt:String(o.pt),pos:o.pos?String(o.pos):null,ipa:o.reading?String(o.reading):null,lemma:o.lemma?String(o.lemma):null};save();}if(G&&G.kind==='word'&&TOK[G.sid][G.i].l===l)renderGloss();})
  .catch(e=>{delete LOOKING[l];LOOKING[l+'#err']=aiErrText(e);if(G)renderGloss();});
}
function translateSent(sid){
  ensureAI();if(TRANSL[sid]||SENT[sid].pt||!aiProvider())return;TRANSL[sid]=1;
  askAI(`Traduz para ${nat()} esta frase em ${langName(lgOf(sid))}, de forma natural. Responde só com a tradução, sem aspas nem notas.

${SENT[sid].en}`).then(t=>{delete TRANSL[sid];t=String(t||'').trim();if(t){S.ai.s[sid]=t;SENT[sid].pt=t;save();}if(G&&G.sid===sid)renderGloss();})
  .catch(e=>{delete TRANSL[sid];toast(aiErrText(e));});
}
function applyAITranslations(){ensureAI();Object.keys(S.ai.s).forEach(sid=>{if(SENT[sid]&&!SENT[sid].pt)SENT[sid].pt=S.ai.s[sid];});}

/* ---------- prática: correção pela IA ---------- */
function aiCheckPractice(){
  if(!aiProvider()||PR.mode!=='tr')return;
  const sd=SENT[PR.sid],lg=lgOf(PR.sid),val=PR.val,sid=PR.sid;PR.ai={state:'load'};
  askAI(`Um aluno de ${langName(lg)} (língua materna: ${nat()}) traduziu uma frase.
Frase em ${nat()}: «${sd.pt}»
Tradução de referência: «${sd.en}»
Resposta do aluno: «${val}»
Avalia o sentido e a gramática. Aceita traduções diferentes da referência se estiverem corretas e naturais.
Responde só com JSON: {"score": número de 0 a 100, "correct": true ou false, "feedback": "2 ou 3 frases em ${nat()} a explicar os erros, ou a confirmar que está certo", "better": "a resposta do aluno corrigida, mantendo as palavras dele sempre que possível"}`,{json:true,tier:'default'})
  .then(o=>{if(PR.sid!==sid)return;PR.ai={state:'done',d:o||{}};renderPractice();})
  .catch(e=>{if(PR.sid!==sid)return;PR.ai={state:'err',msg:aiErrText(e)};renderPractice();});
}
function aiPracticeHTML(){
  if(!PR.ai)return null;
  if(PR.ai.state==='load')return`<div class="ai-card" aria-busy="true"><div class="ai-tag">${I('spark',13)} ${aiLabel(aiProvider())} a corrigir</div><div style="display:grid;gap:8px"><div class="skel" style="width:90%"></div><div class="skel" style="width:70%"></div></div></div>`;
  if(PR.ai.state==='err')return`<div class="ai-card"><div class="ai-tag">${I('spark',13)} IA</div>${esc(PR.ai.msg)}</div>`;
  const d=PR.ai.d;const sc=Math.max(0,Math.min(100,Math.round(+d.score||0)));
  return`<div class="ai-card"><div class="row between"><div class="ai-tag" style="margin:0">${I('spark',13)} Correção de ${aiLabel(aiProvider())}</div><span class="pill ${d.correct?'p-k':'p-l2'}">${d.correct?'Certo':'A melhorar'} · ${sc}/100</span></div><p style="margin-top:8px">${esc(d.feedback||'')}</p>${d.better&&!d.correct?`<p style="margin-top:8px"><b>Versão corrigida:</b> <span dir="auto" style="font-family:var(--f-r);font-size:16px">${esc(d.better)}</span></p>`:''}</div>`;
}

/* ---------- voz do Claude ---------- */
function useClaudeVoice(){return !!(CAP.tts&&!TTS_DENIED&&S.settings.voiceSrc!=='device');}
function claudeSay(text,o){
  const opts={voice:S.settings.cvoice||'buttery',rate:Math.max(.7,Math.min(1.5,o.rate||S.settings.rate||1))};
  const L=lessonById(cur);if(L&&!L.imp&&!o.free)opts.language=(o.lang||tl());
  CAP.tts.speak(String(text).slice(0,2000),opts).then(()=>{if(o.end)o.end();},e=>{
    const c=e&&e.code;if(c==='not_granted'){TTS_DENIED=true;toast('Voz do Claude desligada. A usar a voz do dispositivo.');}
    else if(c==='rate_limited')toast('Muitos pedidos de voz seguidos. Espera um pouco.');
    if(o.err)o.err(e);
  });
  return true;
}
function stopClaudeVoice(){try{if(CAP.tts)CAP.tts.stop();}catch(e){}stopAndroidVoice();}

/* ---------- ditado ---------- */
var DICT_ON=false;
function startDictation(onFinal,onState){
  if(!CAP.dict)return false;
  try{CAP.dict.onFinal(({text})=>{if(text)onFinal(text);});CAP.dict.onState(({state,reason})=>{DICT_ON=state==='listening';if(onState)onState(state,reason);});}catch(e){}
  CAP.dict.start().catch(e=>{DICT_ON=false;if(e&&e.code==='not_granted')toast('Sem acesso ao microfone. Podes continuar a escrever.');else if(e&&e.code!=='dismissed')toast('O ditado não está disponível agora.');if(onState)onState('idle','error');});
  return true;
}
function stopDictation(){try{if(CAP.dict)return CAP.dict.stop();}catch(e){}return Promise.resolve();}

/* ---------- downloads ---------- */
function canDownload(){return !!CAP.dl||!inClaude()||inAndroid();}
function saveFile(name,data){
  if(inAndroid()){let r='error';try{r=window.GlosaAndroid.save(name,String(data));}catch(e){}toast(r==='ok'?'Guardado em Transferências':r==='shared'?'Escolhe onde guardar':'Não foi possível guardar o ficheiro.',r==='ok'?'check':null);return;}
  if(CAP.dl){CAP.dl.save({filename:name,data:data}).then(()=>toast('Ficheiro guardado','check'),e=>{if(e&&(e.code==='declined'))return;toast('Não foi possível descarregar aqui.');});return;}
  try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([data],{type:'text/plain'}));a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},500);}catch(e){toast('Não foi possível descarregar aqui.');}
}

/* ---------- definições ---------- */
function aiSettingsHTML(){
  const s=S.settings,src=aiProvider(),ic=inClaude();
  const aiState=src==='claude'?['Claude','Ligada · traduções, explicações, perguntas e correções reais','ok']:src==='gemini'?['Gemini','Ligada com a tua chave','ok']:[ic?'A ligar ao Claude…':'Sem IA',ic?(AI_DENIED?'Não deste acesso. Ativa-a nas definições do Claude.':'Pode demorar alguns segundos.'):'Respostas de exemplo. Adiciona uma chave grátis do Gemini abaixo.',''];
  const vState=useClaudeVoice()?['Voz do Claude','4 vozes naturais, em várias línguas','ok']:inAndroid()?['Voz do Android','Instala mais vozes em Definições → Sistema → Idiomas → Texto para voz.','ok']:['Voz do dispositivo',CAP.tts?'Escolheste a voz do dispositivo':'As vozes do Claude não estão disponíveis aqui (Safari e apps móveis).',''];
  return`<div class="set-sec"><h3>IA e voz</h3>
  <div class="src"><span class="si">${I('spark')}</span><span class="grow"><b>IA: ${esc(aiState[0])}</b><small>${esc(aiState[1])}</small></span>${aiState[2]?`<span class="chip ok">${I('check',14)} Ativa</span>`:''}</div>
  <div class="src"><span class="si">${I('spk')}</span><span class="grow"><b>${esc(vState[0])}</b><small>${esc(vState[1])}</small></span>${vState[2]?`<span class="chip ok">${I('check',14)} Ativa</span>`:''}</div>
  ${CAP.tts?`<div class="grid2"><div class="field"><label for="s-vsrc">Voz</label><select id="s-vsrc"><option value="claude" ${s.voiceSrc!=='device'?'selected':''}>Voz do Claude</option><option value="device" ${s.voiceSrc==='device'?'selected':''}>Voz do dispositivo</option></select></div><div class="field"><label for="s-cvoice">Voz do Claude</label><select id="s-cvoice">${[['buttery','Buttery'],['airy','Airy'],['glassy','Glassy'],['rounded','Rounded']].map(v=>`<option value="${v[0]}" ${(s.cvoice||'buttery')===v[0]?'selected':''}>${v[1]}</option>`).join('')}</select></div></div><button class="btn sm" id="s-vtest" style="justify-self:start">${I('spk',16)} Ouvir a voz</button>`:''}
  ${CAP.dict?`<p class="muted" style="font-size:13px">${I('mic',14)} Ditado pelo microfone ativo na secção Praticar.</p>`:''}
  ${!ic?`<details class="card flat" style="padding:12px 14px" ${gemKey()?'':'open'}><summary style="cursor:pointer;font-weight:600">Chave do Gemini (grátis)</summary>
    <div style="display:grid;gap:10px;margin-top:10px"><p class="muted" style="font-size:13px">1. Abre <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a> com a tua conta Google.<br>2. Cria uma chave e cola-a aqui.<br>Fica só neste navegador e não entra na cópia de segurança.</p>
    <div class="field"><label for="s-gkey">Chave de API</label><input type="password" id="s-gkey" placeholder="AIza…" value="${esc(gemKey())}" autocomplete="off"></div>
    <div class="field"><label for="s-gmodel">Modelo</label><input type="text" id="s-gmodel" value="${esc(s.gemModel||'gemini-2.5-flash')}"><span class="hint">Se o Google mudar o nome do modelo, atualiza aqui.</span></div>
    <div class="row"><button class="btn sm pri" id="s-gsave">Guardar</button><button class="btn sm" id="s-gtest">Testar</button>${gemKey()?'<button class="btn sm" id="s-gdel">Apagar chave</button>':''}</div></div></details>`:''}
  </div>`;
}
function bindAISettings(){
  const s=S.settings;const on=(id,ev,fn)=>{const el=document.getElementById(id);if(el)el.addEventListener(ev,fn);};
  on('s-vsrc','change',e=>{s.voiceSrc=e.target.value;save();settingsModal();});
  on('s-cvoice','change',e=>{s.cvoice=e.target.value;save();});
  on('s-vtest','click',()=>say(tl()==='en'?'Hello! This is how I sound when I read to you.':(SENT[sentsOf(lessonsOf(tl())[0]||LESSONS[0])[0]]||{}).en||'Hello!'));
  on('s-gsave','click',()=>{setGemKey($('#s-gkey').value.trim());s.gemModel=$('#s-gmodel').value.trim()||'gemini-2.5-flash';save();toast('Guardado','check');settingsModal();});
  on('s-gdel','click',()=>{setGemKey('');toast('Chave apagada');settingsModal();});
  on('s-gtest','click',()=>{setGemKey($('#s-gkey').value.trim());s.gemModel=$('#s-gmodel').value.trim()||'gemini-2.5-flash';save();toast('A testar…');askAI('Responde só com a palavra OK.').then(t=>toast('A IA respondeu: '+String(t).slice(0,40),'check'),e=>toast(aiErrText(e)));});
}

/* ---------- traduções em falta no painel ---------- */
function info(l){
  const r=infoBase(l);
  if(!r.pt&&S.ai&&S.ai.d&&S.ai.d[l]){const a=S.ai.d[l];return{pt:a.pt,pos:a.pos,ipa:a.ipa,ai:null,byAI:true};}
  return r;
}
function noEntryHTML(l,sid,i){
  const src=aiProvider();
  if(src){
    if(LOOKING[l+'#err'])return`<span class="muted" style="font:400 15px/1.5 var(--f-u)">${esc(LOOKING[l+'#err'])}</span>`;
    setTimeout(()=>autoLookup(l,sid,i),0);
    return`<span class="muted" style="font:400 15px/1.5 var(--f-u)">${I('spark',14)} A traduzir com ${aiLabel(src)}…</span>`;
  }
  return`<span class="muted" style="font:400 15px/1.5 var(--f-u)">Sem tradução para esta palavra. ${inClaude()?'A IA do Claude traduz automaticamente quando estiver ligada.':'Adiciona uma chave grátis do Gemini em Definições → IA e voz para traduzir qualquer palavra.'}</span>`;
}
function sentTrHTML(sid,small){
  const src=aiProvider();
  if(src){setTimeout(()=>translateSent(sid),0);return`<span class="muted" style="font:400 ${small?14:15}px/1.5 var(--f-u)">${I('spark',14)} A traduzir com ${aiLabel(src)}…</span>`;}
  return`<span class="muted" style="font:400 ${small?14:15}px/1.5 var(--f-u)">Sem tradução para esta frase. ${inClaude()?'A IA do Claude traduz quando estiver ligada.':'Adiciona uma chave do Gemini em Definições → IA e voz.'}</span>`;
}

/* ---------- app Android (window.GlosaAndroid) ---------- */
var TTSN=0,TTSCB={};
function inAndroid(){try{return !!window.GlosaAndroid;}catch(e){return false;}}
window.__glosaTTS=function(id,st){const o=TTSCB[id];delete TTSCB[id];if(!o)return;if(st==='done'){if(o.end)o.end();}else if(o.err)o.err();};
function androidSay(text,o){
  const lg=o.lang||tl();const id='u'+(++TTSN);TTSCB[id]=o;
  let r='error';try{r=window.GlosaAndroid.speak(String(text),BCP[lg]||lg,Math.max(.5,Math.min(2,o.rate||S.settings.rate||1)),id);}catch(e){}
  if(r==='ok')return true;
  delete TTSCB[id];
  if(r==='nolang')toast('O Android não tem voz para '+langName(lg).toLowerCase()+'. Instala-a em Definições → Sistema → Idiomas → Texto para voz.');
  else if(r==='loading')toast('A voz ainda está a carregar. Tenta outra vez.');
  else toast('A voz não está disponível.');
  return false;
}
function stopAndroidVoice(){try{if(inAndroid())window.GlosaAndroid.stop();}catch(e){}}
