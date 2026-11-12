import asyncio, os, shutil
HERE=os.path.dirname(os.path.abspath(__file__))
APP=os.path.join(HERE,'..','index.html')
CHROME=shutil.which('google-chrome') or shutil.which('chromium') or None
os.chdir(HERE)
os.makedirs('shots',exist_ok=True)
from playwright.async_api import async_playwright
async def center(pg,loc):
  b=await loc.bounding_box();return b['x']+b['width']/2,b['y']+b['height']/2
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path=CHROME,args=['--no-sandbox'])
    # ---------- mobile: long-press and drag ----------
    ctx=await b.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True,device_scale_factor=2)
    pg=await ctx.new_page();errs=[];pg.on('pageerror',lambda e: errs.append(str(e)))
    await pg.goto('file://'+os.path.abspath(APP));await pg.wait_for_timeout(700)
    await pg.locator('[data-nav="read"]:visible').first.click();await pg.wait_for_timeout(300)
    put=pg.locator('#text .w[data-s="t1s5"]',has_text='put').first; down=pg.locator('#text .w[data-s="t1s5"]',has_text='down').first
    await put.scroll_into_view_if_needed();await pg.wait_for_timeout(200)
    x1,y1=await center(pg,put);x2,y2=await center(pg,down)
    cdp=await ctx.new_cdp_session(pg)
    await cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x1,'y':y1}]})
    await pg.wait_for_timeout(500)
    for k in range(1,6):
      await cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x1+(x2-x1)*k/5,'y':y1+(y2-y1)*k/5}]});await pg.wait_for_timeout(40)
    await pg.screenshot(path='shots/j_drag.png')
    await cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});await pg.wait_for_timeout(400)
    print('mobile drag ->',await pg.locator('#gscroll .g-word').first.inner_text())
    await pg.screenshot(path='shots/j_phrase_m.png')
    await pg.locator('[data-g="pst"][data-v="2"]').click();await pg.wait_for_timeout(300)
    print('phrase marked in text:',await pg.locator('#text .phr').count(),'| title:',await pg.locator('#text .phr').first.get_attribute('title'))
    await pg.locator('[data-g="close"]').click()
    # quick tap still opens single word
    w=pg.locator('#text .w').nth(3);await w.tap();await pg.wait_for_timeout(300)
    print('tap ->',await pg.locator('#gscroll .g-word').first.inner_text())
    # join buttons
    await pg.locator('[data-g="join"][data-v="1"]').click();await pg.wait_for_timeout(200)
    print('join next ->',await pg.locator('#gscroll .g-word').first.inner_text())
    await pg.locator('[data-g="ext"][data-v="r+"]').click();await pg.wait_for_timeout(200)
    print('ext r+ ->',await pg.locator('#gscroll .g-word').first.inner_text())
    await pg.locator('[data-g="ext"][data-v="l-"]').click();await pg.wait_for_timeout(200)
    print('ext l- ->',await pg.locator('#gscroll .g-word').first.inner_text())
    # tapping word inside saved phrase shows membership
    await pg.locator('[data-g="close"]').click()
    await put.tap();await pg.wait_for_timeout(300)
    print('membership box:', await pg.locator('[data-g="phopen"]').count())
    await pg.screenshot(path='shots/j_member_m.png')
    # saved phrase appears in Palavras > Expressões
    await pg.locator('[data-g="close"]').click()
    await pg.locator('#tb-words').click();await pg.locator('[data-wf="phrase"]').click();await pg.wait_for_timeout(200)
    print('words/phrases list:',(await pg.locator('#w-list').inner_text())[:120].replace('\n',' | '))
    print('mobile errors:',errs or 'none');await ctx.close()
    # ---------- desktop: mouse drag + shift click ----------
    pg=await b.new_page(viewport={'width':1366,'height':900});errs=[];pg.on('pageerror',lambda e: errs.append(str(e)))
    await pg.goto('file://'+os.path.abspath(APP));await pg.wait_for_timeout(700)
    await pg.locator('[data-nav="lib"]:visible').first.click();await pg.locator('.book[data-lesson="t3"]').click();await pg.wait_for_timeout(300)
    a=pg.locator('#text .w[data-s="t3s5"]',has_text='steered').first;c=pg.locator('#text .w[data-s="t3s5"]',has_text='away').first
    await a.scroll_into_view_if_needed();x1,y1=await center(pg,a);x2,y2=await center(pg,c)
    await pg.mouse.move(x1,y1);await pg.mouse.down();await pg.mouse.move(x2,y2,steps=8);await pg.mouse.up();await pg.wait_for_timeout(400)
    print('mouse drag ->',await pg.locator('#gscroll .g-word').first.inner_text())
    await pg.locator('[data-g="tab"][data-v="ai"]').click();await pg.wait_for_timeout(2500)
    print('phrase AI:',(await pg.locator('.ai-card').first.inner_text())[:100].replace('\n',' | '))
    w1=pg.locator('#text .w[data-s="t3s4"]',has_text='fishing').first;w2=pg.locator('#text .w[data-s="t3s4"]',has_text='boat').first
    await w1.click();await w2.click(modifiers=['Shift']);await pg.wait_for_timeout(300)
    print('shift-click ->',await pg.locator('#gscroll .g-word').first.inner_text())
    await pg.screenshot(path='shots/j_desktop.png')
    print('desktop errors:',errs or 'none');await b.close()
asyncio.run(main())
