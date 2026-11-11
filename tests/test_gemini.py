import asyncio, os, shutil
HERE=os.path.dirname(os.path.abspath(__file__))
APP=os.path.join(HERE,'..','index.html')
CHROME=shutil.which('google-chrome') or shutil.which('chromium') or None
os.chdir(HERE)
os.makedirs('shots',exist_ok=True)
import json
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path=CHROME,args=['--no-sandbox'])
    pg=await b.new_page(viewport={'width':390,'height':844});errs=[];seen=[]
    pg.on('pageerror',lambda e: errs.append('PAGEERR '+str(e)))
    async def gem(r):
      body=json.loads(r.request.post_data); seen.append(r.request.headers.get('x-goog-api-key'))
      txt='{"pt":"xilofone","lemma":"xylophone","pos":"subst.","reading":"/ˈzaɪləfəʊn/"}' if 'responseMimeType' in json.dumps(body) else 'OK do Gemini'
      await r.fulfill(status=200,headers={'Access-Control-Allow-Origin':'*','Content-Type':'application/json'},body=json.dumps({'candidates':[{'content':{'parts':[{'text':txt}]}}]}))
    await pg.route('https://generativelanguage.googleapis.com/**',gem)
    await pg.goto('file://'+os.path.abspath(APP)); await pg.wait_for_timeout(800)
    await pg.locator('#tb-set').click(); await pg.wait_for_timeout(200)
    await pg.locator('#s-gkey').fill('AIzaTESTKEY'); await pg.locator('#s-gsave').click(); await pg.wait_for_timeout(200)
    await pg.locator('#mcard [data-close]').first.click()
    await pg.locator('[data-nav="lib"]:visible').first.click()
    await pg.locator('[data-li="paste"]').first.click(); await pg.locator('#im-x').fill('The xylophone resonated through the cathedral.')
    await pg.locator('#im-ok').click(); await pg.locator('#ip-ok').click(); await pg.wait_for_timeout(300)
    await pg.locator('#text .w').nth(1).click(); await pg.wait_for_timeout(800)
    print('gemini lookup:', await pg.locator('.g-tr').first.inner_text(), '| key sent:', seen[:1])
    bk=await pg.evaluate("()=>JSON.stringify(JSON.parse(localStorage.getItem('glosa-v2')))")
    print('key in backup data?', 'AIzaTESTKEY' in bk)
    print('errors:', errs or 'none')
    await b.close()
asyncio.run(main())
