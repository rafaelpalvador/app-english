import asyncio, os, shutil
HERE=os.path.dirname(os.path.abspath(__file__))
APP=os.path.join(HERE,'..','index.html')
CHROME=shutil.which('google-chrome') or shutil.which('chromium') or None
os.chdir(HERE)
os.makedirs('shots',exist_ok=True), os
from playwright.async_api import async_playwright
# pdf.js local (npm i pdfjs-dist) para testar sem internet; se não existir, usa a rede
PJ=os.environ.get('PDFJS_DIR','node_modules/pdfjs-dist/legacy/build/')
FILES=['book.pdf','book.epub','book.docx','book.odt','book.html','book.rtf','book.md','subs.srt','fr.txt','ja.txt','long.txt']
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path=CHROME,args=['--no-sandbox'])
    pg=await b.new_page(viewport={'width':1366,'height':900});errs=[]
    pg.on('pageerror',lambda e: errs.append('PAGEERR '+str(e)))
    pg.on('console',lambda m: errs.append('console:'+m.text) if m.type=='error' and 'ERR_' not in m.text and 'autofocus' not in m.text else None)
    async def route(r):
      name=r.request.url.split('/')[-1]
      await r.fulfill(path=PJ+name,headers={'Access-Control-Allow-Origin':'*','Content-Type':'text/javascript'})
    if os.path.isdir(PJ): await pg.route('**/cdnjs.cloudflare.com/ajax/libs/pdf.js/**',route)
    await pg.set_content('<style>body{margin:0}</style><iframe id=f sandbox="allow-scripts allow-forms" style="width:100vw;height:100vh;border:0"></iframe>')
    await pg.evaluate("h=>{document.getElementById('f').srcdoc=h}",open(APP).read())
    await pg.wait_for_timeout(800); f=pg.frames[1]
    for fn in FILES:
      try:
        await f.locator('[data-nav="lib"]:visible').first.click(); await pg.wait_for_timeout(150)
        await f.locator('#lib-file').set_input_files('fixtures/'+fn)
        try:
          await f.locator('#ip-ok').wait_for(timeout=20000)
        except Exception:
          print(fn,'NO PREVIEW:',(await f.locator('#mcard').inner_text())[:200].replace('\n',' | ')); 
          await f.locator('#mcard [data-close]').first.click(); continue
        stats=(await f.locator('.rep-grid').inner_text()).replace('\n',' ')
        lg=await f.locator('#ip-lg').input_value(); title=await f.locator('#ip-t').input_value()
        if fn=='book.pdf': await pg.screenshot(path='shots/imp_preview.png')
        await f.locator('#ip-ok').click(); await pg.wait_for_timeout(300)
        nw=await f.locator('#text .w').count(); t=await f.locator('.r-head h1').inner_text()
        print(f'{fn}: lang={lg} title="{title}" stats=[{stats}] words_in_part1={nw} reader="{t}"')
      except Exception as e: print(fn,'ERR',str(e)[:200])
    await f.locator('[data-nav="lib"]:visible').first.click(); await pg.wait_for_timeout(200)
    await f.locator('[data-li="langs"]').first.click(); await f.locator('#lq').fill('ingl'); await f.locator('[data-setlang="en"]').first.click()
    await f.locator('[data-nav="lib"]:visible').first.click(); await pg.wait_for_timeout(200)
    await f.evaluate("()=>{const h=[...document.querySelectorAll('.sec-h h2')].find(x=>/Garden/.test(x.textContent));if(h)h.scrollIntoView()}")
    await pg.screenshot(path='shots/imp_shelf.png')
    # backup
    await f.locator('[data-open-settings]:visible').first.click(); await f.locator('#s-backup').click(); await pg.wait_for_timeout(200)
    data=await f.locator('#bk-t').input_value(); print('backup KB',len(data)//1024)
    await f.locator('#bk-in').fill(data); await f.locator('#bk-restore').click(); await pg.wait_for_timeout(300)
    print('after restore lessons in lib:', await f.evaluate("()=>1"))
    # delete imported book
    await f.locator('[data-nav="lib"]:visible').first.click(); await pg.wait_for_timeout(200)
    print('errors:',errs or 'none')
    await b.close()
asyncio.run(main())
