import asyncio, os, shutil
HERE=os.path.dirname(os.path.abspath(__file__))
APP=os.path.join(HERE,'..','index.html')
CHROME=shutil.which('google-chrome') or shutil.which('chromium') or None
os.chdir(HERE)
os.makedirs('shots',exist_ok=True)
import json
from playwright.async_api import async_playwright
MOCK=r"""<script>
window.__calls=[];
(function(){
 function sample(input,opts){window.__calls.push(['sample',String(input).slice(0,60)]);const txt='Resposta real do Claude sobre: '+String(input).slice(0,40);
   return new Promise(res=>{let i=0;const iv=setInterval(()=>{i+=10;if(opts&&opts.onText)opts.onText({text:txt.slice(0,i),delta:''});if(i>=txt.length){clearInterval(iv);res({text:txt,truncated:false});}},20);});}
 sample.json=async function(input){window.__calls.push(['json',String(input).slice(0,40)]);const s=String(input);
   if(/Responde só com JSON, sem texto à volta/.test(s))return {pt:'traduzido pela IA',lemma:'base',pos:'subst.',reading:'/test/'};
   return {score:82,correct:false,feedback:'Quase certo: falta o artigo.',better:'The waiter already knows what she wants.'};};
 sample.limits=async()=>({images:false});
 const tts={speak:(t,o)=>{window.__calls.push(['tts',String(t).slice(0,30),JSON.stringify(o||{})]);return new Promise(r=>setTimeout(r,60));},stop(){},onState(){},setRate(){}};
 let fin=null,st=null;
 const dict={onFinal(f){fin=f},onState(f){st=f},onPartial(){},start(){window.__calls.push(['dict']);st&&st({state:'listening'});setTimeout(()=>{fin&&fin({text:'Cada mañana Lucía toma un café'});st&&st({state:'idle',reason:'stopped'});},150);return Promise.resolve();},stop(){return Promise.resolve();}};
 const dl={save:async(o)=>{window.__calls.push(['dl',o.filename,String(o.data).length]);return {status:'saved'};}};
 const m={sample:sample,tts:tts,dictation:dict,downloads:dl};
 window.claude={use:n=>new Promise(r=>setTimeout(()=>r(m[n]||null),30))};
})();
</script>"""
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path=CHROME,args=['--no-sandbox'])
    pg=await b.new_page(viewport={'width':1366,'height':900});errs=[]
    pg.on('pageerror',lambda e: errs.append('PAGEERR '+str(e)))
    html=open(APP).read().replace('<head>','<head>'+MOCK,1)
    await pg.set_content('<style>body{margin:0}</style><iframe id=f sandbox="allow-scripts allow-forms" style="width:100vw;height:100vh;border:0"></iframe>')
    await pg.evaluate("h=>{document.getElementById('f').srcdoc=h}",html)
    await pg.wait_for_timeout(1000); f=pg.frames[1]
    async def step(n,c):
      try: await c
      except Exception as e: errs.append(f'STEP {n}: {str(e)[:160]}')
    # reader: AI explanation streams for word
    await step('lib', f.locator('[data-nav="lib"]:visible').first.click())
    await step('open t3', f.locator('.book[data-lesson="t3"]').click()); await pg.wait_for_timeout(200)
    await step('word', f.locator('#text .w').nth(12).click())
    await step('ai tab', f.locator('[data-g="tab"][data-v="ai"]').click()); await pg.wait_for_timeout(1500)
    print('AI card:', (await f.locator('.ai-card').first.inner_text())[:90].replace('\n',' | '))
    await step('fu', f.locator('[data-g="fu"][data-v="ex"]').click()); await pg.wait_for_timeout(1500)
    await step('ask', f.locator('#g-ask-in').fill('Porque é que se usa o past perfect?')); await step('ask send', f.locator('#g-ask button').click()); await pg.wait_for_timeout(1500)
    await pg.screenshot(path='shots/ai_gloss.png')
    print('chat msgs:', await f.locator('.ai-card').count(), '| questions:', await f.locator('.ai-q').count())
    await step('say', f.locator('[data-g="say-w"]').click()); await pg.wait_for_timeout(200)
    # imported text with missing words -> auto lookup + sentence translate
    await step('imp', f.locator('[data-nav="lib"]:visible').first.click())
    await step('paste', f.locator('[data-li="paste"]').first.click())
    await step('fill', f.locator('#im-x').fill('The xylophone resonated through the cathedral. Everyone listened quietly.'))
    await step('ok', f.locator('#im-ok').click()); await step('ipok', f.locator('#ip-ok').click()); await pg.wait_for_timeout(300)
    await step('w xylo', f.locator('#text .w').nth(1).click()); await pg.wait_for_timeout(600)
    print('lookup tr:', await f.locator('.g-tr').first.inner_text())
    await step('trs', f.locator('[data-g="trs"]').click()); await pg.wait_for_timeout(1500)
    print('sent tr:', (await f.locator('.g-ctx .tr').first.inner_text())[:80])
    # practice with AI feedback + mic (Spanish)
    await step('lang', f.locator('#rail-lang').click()); await step('lq', f.locator('#lq').fill('espanhol')); await step('es', f.locator('[data-setlang="es"]').first.click())
    await step('prac', f.locator('[data-nav="practice"]:visible').first.click()); await pg.wait_for_timeout(300)
    await step('mic', f.locator('[data-pr="mic"]').click()); await pg.wait_for_timeout(500)
    print('dictated:', await f.locator('#pr-in').input_value())
    await step('sub', f.locator('#pr-form button[type=submit]').click()); await pg.wait_for_timeout(500)
    print('practice AI:', (await f.locator('.ai-card').first.inner_text())[:120].replace('\n',' | '))
    await pg.screenshot(path='shots/ai_prac.png')
    await step('rep', f.locator('[data-pr="mode"][data-v="rep"]').click())
    await step('rrec', f.locator('[data-pr="rrec"]').click()); await pg.wait_for_timeout(500)
    print('rep record:', (await f.locator('.verdict').first.inner_text()) if await f.locator('.verdict').count() else 'none')
    await pg.screenshot(path='shots/ai_rep.png')
    # export download + settings
    await step('rev', f.locator('[data-nav="review"]:visible').first.click()); await step('exp', f.locator('[data-r="export"]').click()); await step('dl', f.locator('#ex-dl').click()); await step('close', f.locator('#mcard [data-close]').first.click())
    await step('set', f.locator('[data-open-settings]:visible').first.click()); await pg.wait_for_timeout(300)
    await f.evaluate("()=>{const h=[...document.querySelectorAll('.set-sec h3')].find(x=>/IA e voz/.test(x.textContent));h&&h.scrollIntoView()}")
    await pg.screenshot(path='shots/ai_settings.png')
    calls=await f.evaluate("()=>window.__calls.map(c=>c[0])")
    from collections import Counter; print('calls:', dict(Counter(calls)))
    print('tts sample opts:', [c for c in await f.evaluate("()=>window.__calls") if c[0]=='tts'][:2])
    print('errors:', errs or 'none')
    await b.close()
asyncio.run(main())
