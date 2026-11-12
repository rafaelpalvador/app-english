import asyncio, os, shutil
HERE=os.path.dirname(os.path.abspath(__file__))
APP=os.path.join(HERE,'..','index.html')
CHROME=shutil.which('google-chrome') or shutil.which('chromium') or None
from playwright.async_api import async_playwright
MOCK="""<script>window.__a=[];window.GlosaAndroid={ready:()=>true,hasLang:()=>true,speak:(t,l,r,id)=>{window.__a.push(['speak',t.slice(0,20),l]);setTimeout(()=>window.__glosaTTS(id,'done'),40);return 'ok';},stop:()=>window.__a.push(['stop']),save:(n,d)=>{window.__a.push(['save',n,d.length]);return 'ok';}};</script>"""
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path=CHROME,args=['--no-sandbox'])
    pg=await b.new_page(viewport={'width':390,'height':844});errs=[]
    pg.on('pageerror',lambda e: errs.append(str(e)))
    await pg.set_content(open(APP).read().replace('<head>','<head>'+MOCK,1)); await pg.wait_for_timeout(700)
    await pg.locator('[data-nav="read"]:visible').first.click(); await pg.wait_for_timeout(200)
    await pg.locator('[data-tb="play"]').click(); await pg.wait_for_timeout(1200)
    await pg.locator('[data-tb="play"]').click()
    await pg.locator('[data-nav="review"]:visible').first.click(); await pg.locator('[data-r="export"]').click(); await pg.locator('#ex-dl').click(); await pg.wait_for_timeout(200)
    a=await pg.evaluate("()=>window.__a")
    print('speak calls:',sum(1 for x in a if x[0]=='speak'),'| first:',a[0],'| save:',[x for x in a if x[0]=='save'],'| stop:',sum(1 for x in a if x[0]=='stop'))
    print('errors:',errs or 'none'); await b.close()
asyncio.run(main())
