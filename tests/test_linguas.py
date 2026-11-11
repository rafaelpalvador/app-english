import asyncio, os, shutil
HERE=os.path.dirname(os.path.abspath(__file__))
APP=os.path.join(HERE,'..','index.html')
CHROME=shutil.which('google-chrome') or shutil.which('chromium') or None
os.chdir(HERE)
os.makedirs('shots',exist_ok=True)
from playwright.async_api import async_playwright
async def run(b,vp,tag):
    pg=await b.new_page(viewport={'width':vp[0],'height':vp[1]});errs=[]
    pg.on('pageerror',lambda e: errs.append('PAGEERR '+str(e)))
    pg.on('console',lambda m: errs.append('console:'+m.text) if m.type=='error' and 'ERR_' not in m.text and 'autofocus' not in m.text else None)
    await pg.set_content('<style>body{margin:0}</style><iframe id=f sandbox="allow-scripts allow-forms" style="width:100vw;height:100vh;border:0"></iframe>')
    await pg.evaluate("h=>{document.getElementById('f').srcdoc=h}",open(APP).read())
    await pg.wait_for_timeout(800); f=pg.frames[1]
    async def step(n,c):
        try: await c
        except Exception as e: errs.append(f'STEP {n}: {str(e)[:160]}')
    async def shot(n): await pg.screenshot(path=f'shots/{tag}_{n}.png')
    lb='#rail-lang' if vp[0]>=1000 else '#tb-lang'
    await step('langbtn', f.locator(lb).click()); await pg.wait_for_timeout(200); await shot('langmodal')
    await step('search', f.locator('#lq').fill('jap'))
    await step('pick ja', f.locator('[data-setlang="ja"]').first.click()); await pg.wait_for_timeout(300); await shot('lib_ja')
    await step('open ja', f.locator('.book[data-lesson="ja1"]').click()); await pg.wait_for_timeout(300)
    await step('w ja', f.locator('#text .w').nth(2).click()); await pg.wait_for_timeout(200)
    await step('st2', f.locator('.st-row [data-v="2"]').click()); await shot('read_ja')
    await step('ai', f.locator('[data-g="tab"][data-v="ai"]').click()); await pg.wait_for_timeout(2500)
    if vp[0]<1180: await step('close', f.locator('[data-g="close"]').click())
    # arabic
    await step('lang2', f.locator(lb).click()); await step('s2', f.locator('#lq').fill('árabe'))
    await step('pick ar', f.locator('[data-setlang="ar"]').first.click()); await pg.wait_for_timeout(200)
    await step('open ar', f.locator('.book[data-lesson="ar1"]').click()); await pg.wait_for_timeout(300)
    await step('w ar', f.locator('#text .w').nth(1).click()); await pg.wait_for_timeout(200); await shot('read_ar')
    if vp[0]<1180: await step('close2', f.locator('[data-g="close"]').click())
    await step('finish', f.locator('[data-tb="finish"]').click()); await step('fin', f.locator('#fin-ok').click())
    await step('q', f.locator('#mcard .opt').first.click()); await step('qn', f.locator('#q-go').click())
    await step('q2', f.locator('#mcard .opt').first.click()); await step('qn2', f.locator('#q-go').click()); await shot('ar_done')
    await step('closem', f.locator('#q-lib').click())
    # spanish practice
    await step('lang3', f.locator(lb).click()); await step('s3', f.locator('#lq').fill('espanhol'))
    await step('pick es', f.locator('[data-setlang="es"]').first.click())
    await step('prac', f.locator('[data-nav="practice"]:visible').first.click()); await pg.wait_for_timeout(200)
    await step('fill', f.locator('#pr-in').fill('El camarero ya sabe lo que quiere'))
    await step('sub', f.locator('#pr-form button[type=submit]').click()); await pg.wait_for_timeout(200); await shot('prac_es')
    # review es (word set to level in es)
    await step('lib', f.locator('[data-nav="lib"]:visible').first.click())
    await step('open es', f.locator('.book[data-lesson="es1"]').click()); await pg.wait_for_timeout(200)
    await step('w es', f.locator('#text .w').nth(1).click()); await step('st1', f.locator('.st-row [data-v="1"]').click())
    if vp[0]<1180: await step('close3', f.locator('[data-g="close"]').click())
    await step('rev', f.locator('[data-nav="review"]:visible').first.click()); await step('go', f.locator('[data-r="go"]').click())
    await step('mode choice', f.locator('[data-r="quit"]').click())
    await step('rev2', f.locator('[data-nav="review"]:visible').first.click()); await step('m', f.locator('[data-r="mode"][data-v="choice"]').click()); await step('go2', f.locator('[data-r="go"]').click()); await shot('rev_es')
    await step('opt', f.locator('[data-r="opt"]').first.click()); await step('next', f.locator('[data-r="next"]').click())
    # language without texts: swahili, import
    await step('lang4', f.locator(lb).click()); await step('s4', f.locator('#lq').fill('sua'))
    await step('pick sw', f.locator('[data-setlang="sw"]').first.click()); await step('libsw', f.locator('[data-nav="lib"]:visible').first.click()); await pg.wait_for_timeout(200); await shot('lib_sw')
    await step('lang5', f.locator(lb).click()); await step('s5', f.locator('#lq').fill('tail'))
    await step('pick th', f.locator('[data-setlang="th"]').first.click()); await pg.wait_for_timeout(200)
    await step('imp', f.locator('[data-li="paste"]').first.click())
    await step('fill th', f.locator('#im-x').fill('ฉันชอบอ่านหนังสือทุกวัน วันนี้อากาศดีมาก'))
    await step('ok', f.locator('#im-ok').click()); await step('ipok', f.locator('#ip-ok').click()); await pg.wait_for_timeout(300)
    await step('w th', f.locator('#text .w').nth(1).click()); await pg.wait_for_timeout(200); await shot('read_th')
    print(tag,'words th:',await f.locator('#text .w').count())
    await step('prog', f.locator('[data-nav="prog"]:visible').first.click()); await pg.wait_for_timeout(300)
    await f.evaluate("()=>document.querySelector('.lgrid').scrollIntoView()"); await shot('prog_langs')
    await step('settings', f.locator('[data-open-settings]:visible').first.click()); await pg.wait_for_timeout(200)
    await step('native', f.locator('#s-l1').select_option('fr'))
    await step('close s', f.locator('#mcard [data-close]').first.click())
    print(tag, errs or 'ok')
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path=CHROME,args=['--no-sandbox'])
        await run(b,(1366,900),'d'); await run(b,(390,844),'m'); await b.close()
asyncio.run(main())
