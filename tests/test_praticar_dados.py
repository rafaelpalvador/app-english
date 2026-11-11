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
    # practice
    await step('nav prac', f.locator('[data-nav="practice"]:visible').first.click()); await pg.wait_for_timeout(200); await shot('prac')
    await step('fill', f.locator('#pr-in').fill('It was a rainy day so Maya decide stay home'))
    await step('submit', f.locator('#pr-form button[type=submit]').click()); await pg.wait_for_timeout(200); await shot('prac_res')
    await step('next', f.locator('[data-pr="next"]').click())
    await step('dict', f.locator('[data-pr="mode"][data-v="dict"]').click())
    await step('hint', f.locator('[data-pr="hint"]').click())
    await step('fill2', f.locator('#pr-in').fill('hello world'))
    await step('sub2', f.locator('#pr-form button[type=submit]').click())
    await step('rep', f.locator('[data-pr="mode"][data-v="rep"]').click())
    await step('rnext', f.locator('[data-pr="rnext"]').click()); await shot('rep')
    await step('rtoggle', f.locator('[data-pr="rtoggle"]').click())
    # reader flow mode + glossary
    await step('lib', f.locator('[data-nav="lib"]:visible').first.click()); await pg.wait_for_timeout(200)
    await f.evaluate("()=>document.querySelector('[data-lesson=t6].book').scrollIntoView()"); await shot('lib_series')
    await step('open t6', f.locator('.book[data-lesson="t6"]').click()); await pg.wait_for_timeout(300); await shot('read_pre')
    await step('pre chip', f.locator('.pchip').first.click()); await pg.wait_for_timeout(200)
    if vp[0]<1180: await step('close', f.locator('[data-g="close"]').click())
    await step('flow', f.locator('[data-tb="flow"]').click()); await pg.wait_for_timeout(200)
    for k in [3,9,15]: await step('pend'+str(k), f.locator('#text .w').nth(k).click())
    await shot('flow')
    await step('pendbtn', f.locator('#pend-btn').click()); await pg.wait_for_timeout(200); await shot('pendmodal')
    await step('pick', f.locator('#pend-rows [data-pv="2"]').first.click())
    await step('pendok', f.locator('#pend-ok').click())
    await step('flow off', f.locator('[data-tb="flow"]').click())
    # review pause
    await step('rev', f.locator('[data-nav="review"]:visible').first.click())
    await step('go', f.locator('[data-r="go"]').click())
    for i in range(6):
        await step('show'+str(i), f.locator('[data-r="show"]').click())
        await step('g1'+str(i), f.locator('[data-r="g"][data-v="1"]').click())
        if await f.locator('[data-r="cont"]').count(): break
    await pg.wait_for_timeout(200); await shot('pause')
    await step('rest', f.locator('[data-r="rest"]').click())
    # progress
    await step('prog', f.locator('[data-nav="prog"]:visible').first.click()); await pg.wait_for_timeout(300)
    await f.evaluate("()=>document.querySelectorAll('.pgrid .card')[5].scrollIntoView()"); await shot('prog_new1')
    await f.evaluate("()=>document.querySelectorAll('.pgrid .card')[7].scrollIntoView()"); await shot('prog_new2')
    await f.evaluate("()=>window.scrollTo(0,0)")
    await step('report', f.locator('[data-pv="report"]').click()); await pg.wait_for_timeout(200); await shot('report')
    print(tag, errs or 'ok')
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path=CHROME,args=['--no-sandbox'])
        await run(b,(1366,900),'d'); await run(b,(390,844),'m'); await b.close()
asyncio.run(main())
