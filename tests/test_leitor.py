"""Leitor ao estilo LingQ: traduções por baixo das frases (pedidas à IA em lotes),
vista Frases/Página, botão Aa, barra flutuante e definições simplificadas."""
import asyncio, os, shutil
HERE=os.path.dirname(os.path.abspath(__file__))
APP=os.path.join(HERE,'..','index.html')
CHROME=shutil.which('google-chrome') or shutil.which('chromium') or None
os.chdir(HERE);os.makedirs('shots',exist_ok=True)
from playwright.async_api import async_playwright
TXT='The old lighthouse stood alone on the cliff. Every night its light swept across the dark sea. Sailors trusted it to bring them home safely. One winter, the keeper fell ill and the lamp went out.'
async def run(b,vp,tag):
    pg=await b.new_page(viewport={'width':vp[0],'height':vp[1]});pg.set_default_timeout(6000);errs=[]
    pg.on('pageerror',lambda e: errs.append(str(e)))
    await pg.goto('file://'+os.path.abspath(APP));await pg.wait_for_timeout(500)
    # IA falsa: responde com uma tradução numerada por linha
    await pg.evaluate("""()=>{setGemKey('AIzaTEST');window.__calls=0;askAI=function(p){window.__calls++;const n=(p.match(/^\\d+\\. /mg)||[]).length;return Promise.resolve(Array.from({length:n},(_,k)=>(k+1)+'. tradução '+(k+1)).join('\\n'));};}""")
    await pg.locator('[data-h="import"]').click();await pg.locator('#im-x').fill(TXT);await pg.locator('#im-ok').click();await pg.locator('#ip-ok').click()
    await pg.wait_for_timeout(900)
    r=await pg.evaluate("()=>({view:view,strs:[...document.querySelectorAll('#text .str')].map(x=>x.textContent),calls:window.__calls,tabbar:getComputedStyle(document.querySelector('.tabbar')).transform})")
    print(tag,'imported:',r)
    assert r['view']=='read' and all(s.startswith('tradução') for s in r['strs']) and r['calls']==1, r
    await pg.screenshot(path=f'shots/leitor_{tag}.png')
    # tocar na tradução abre a explicação da frase
    await pg.locator('#text .str').first.click();await pg.wait_for_timeout(300)
    k=await pg.evaluate("()=>G&&G.kind");print(tag,'tap translation ->',k);assert k=='sent'
    if vp[0]<1180: await pg.locator('[data-g="close"]').click()
    # dock: traduções off/on e leitura contínua
    await pg.locator('.dock [data-tb="trans"]').click()
    d=await pg.evaluate("()=>getComputedStyle(document.querySelector('#text .str')).display");assert d=='none',d
    await pg.locator('.dock [data-tb="trans"]').click()
    await pg.locator('.dock [data-tb="flow"]').click();await pg.locator('#text .w').nth(1).click()
    pend=await pg.evaluate("()=>[!document.getElementById('pend-btn').hidden,document.getElementById('pend-btn').textContent]");print(tag,'flow pend:',pend);assert pend[0]
    await pg.locator('.dock [data-tb="flow"]').click()
    # Aa: apagar texto importado
    await pg.locator('.rbar [data-tb="aa"]').click();await pg.locator('[data-aa="del"]').click();await pg.locator('[data-aa="del"]').click();await pg.wait_for_timeout(300)
    gone=await pg.evaluate("()=>LESSONS.filter(l=>l.imp).length");print(tag,'after delete imported:',gone);assert gone==0
    # definições: sem secções repetidas
    await pg.evaluate("()=>go('home')");await pg.locator('[data-open-settings]:visible').first.click();await pg.wait_for_timeout(300)
    h=await pg.evaluate("()=>[...document.querySelectorAll('#mcard .grp h4')].map(x=>x.textContent)");print(tag,'settings:',h)
    assert 'Leitura e voz' not in h and len(h)==len(set(h))
    await pg.locator('#g-r').fill('300');await pg.locator('#g-r').press('Tab')
    assert await pg.evaluate("()=>S.settings.goal.r")==300
    print(tag,'errors:',errs or 'none');await pg.close()
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path=CHROME,args=['--no-sandbox'])
        await run(b,(390,844),'m');await run(b,(1366,900),'d');await b.close()
asyncio.run(main())
