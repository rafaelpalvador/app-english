let started=false;
function start(d){
  if(started)return;started=true;d=d||{};
  if(d.cur&&lessonById(d.cur))cur=d.cur;
  applyTheme();applyAITranslations();initCaps();
  go(d.view||fromHash()||'home',true);
}
try{
  const H=window.claude&&window.claude.hot;
  if(H&&H.snapshot)H.snapshot(()=>({view:view,cur:cur}));
  if(H&&H.ready){H.ready(start);setTimeout(()=>start({}),1500);}
  else start((H&&H.data)||{});
}catch(e){start({});}
