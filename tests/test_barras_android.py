"""As barras do sistema no Android acompanham o tema da app (sem faixas brancas)."""
import asyncio, os, shutil
HERE=os.path.dirname(os.path.abspath(__file__));APP=os.path.join(HERE,'..','index.html')
CHROME=shutil.which('google-chrome') or shutil.which('chromium') or None
from playwright.async_api import async_playwright
MOCK="""window.__bars=[];window.GlosaAndroid={ready:()=>true,hasLang:()=>true,speak:()=>'ok',stop:()=>{},save:()=>true,
setBars:(t,b,lt,lb)=>window.__bars.push([t,b,lt,lb])};"""
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path=CHROME,args=['--no-sandbox'])
    for scheme in ['light','dark']:
      ctx=await b.new_context(viewport={'width':390,'height':844},color_scheme=scheme);await ctx.add_init_script(MOCK)
      pg=await ctx.new_page();pg.set_default_timeout(6000);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
      await pg.goto('file://'+os.path.abspath(APP));await pg.wait_for_timeout(500)
      last=lambda: pg.evaluate("()=>window.__bars[window.__bars.length-1]")
      r={'start':await last()}
      await pg.evaluate("()=>{S.settings.theme='"+('light' if scheme=='dark' else 'dark')+"';applyTheme();}");await pg.wait_for_timeout(200);r['forced other']=await last()
      await pg.evaluate("()=>{S.settings.theme='auto';applyTheme();go('read')}");await pg.wait_for_timeout(300);r['reader']=await last()
      await pg.evaluate("()=>{S.settings.rtheme='sepia';applyReader();}");await pg.wait_for_timeout(200);r['sepia']=await last()
      await pg.evaluate("()=>{S.settings.rtheme='paper';applyReader();go('home')}");await pg.wait_for_timeout(200);r['home']=await last()
      for k,v in r.items():print(scheme,k,v)
      exp_light=scheme=='light'
      assert r['start'][2]==exp_light and r['forced other'][2]!=exp_light and r['sepia'][0].lower().startswith('#f') and r['home']==r['start'],r
      print(scheme,'errors:',errs or 'none');await ctx.close()
    await b.close()
asyncio.run(main())
