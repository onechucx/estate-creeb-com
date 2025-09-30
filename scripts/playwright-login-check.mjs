import playwright from 'playwright';

(async () => {
  const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
  console.log('Testing login modal against', base);

  const headless = process.env.HEADLESS ? (process.env.HEADLESS === 'true') : false; // default to headed for debugging
  const slowMo = process.env.SLOWMO ? parseInt(process.env.SLOWMO, 10) : 0;
  console.log(`Launching Chromium headless=${headless} slowMo=${slowMo}`);
  const browser = await playwright.chromium.launch({ headless, slowMo });
  const context = await browser.newContext({ recordVideo: { dir: 'scripts', size: { width: 1280, height: 720 } } });
  const page = await context.newPage();
  const logs = [];
  page.on('console', msg => { const t = msg.text(); logs.push({type: 'console', text: t}); console.log('PAGE:', t); });
  page.on('pageerror', err => { logs.push({type: 'error', text: err.message}); console.error('PAGE ERROR:', err.message); });
  page.on('requestfailed', req => { console.error('REQUEST FAILED:', req.url(), req.failure() && req.failure().errorText); });
  page.on('response', res => { if (res.status() >= 400) console.error('BAD RESPONSE', res.status(), res.url()); });

  try {
  await page.goto(base, { waitUntil: 'networkidle' });
  // capture any early client console messages
  await page.waitForTimeout(200);
  // dump head to inspect script tags
  const headHtml = await page.$eval('head', h => h ? h.innerHTML : '<no head>');
  console.log('HEAD SNIPPET:\n', headHtml.slice(0,2000));

    // Click the Login button (uses aria-label present in PublicHeader/PublicHomePage)
    const loginSelector = '[aria-label="Open login dialog"]';
    const loginHandle = await page.waitForSelector(loginSelector, { timeout: 8000 }).catch(()=>null);
    if (!loginHandle) {
      console.error('Login button not found on page. Dumping header HTML:');
      const headerHtml = await page.$eval('header', h => h ? h.innerHTML : '<no header>');
      console.error(headerHtml.slice(0,1000));
      if (logs.length) console.error('Client logs:', JSON.stringify(logs, null, 2));
      throw new Error('login button not found');
    }

    console.log('Found login button; outerHTML:');
    const outer = await page.evaluate(el => el.outerHTML, loginHandle);
    console.log(outer.slice(0,1000));

    // Install a temporary DOM-only listener to detect whether clicks reach the DOM
    await page.evaluate((sel) => {
      const btn = document.querySelector(sel);
      if (btn) {
        btn.addEventListener('click', () => {
          document.documentElement.setAttribute('data-login-clicked', '1');
        }, { once: true });
      }
    }, loginSelector);

    // Try a normal click first
    await loginHandle.click().catch(()=>null);

    // Wait briefly for reactive updates
    await page.waitForTimeout(500);

    // If modal not visible yet, try dispatching a click event via JS (some frameworks attach listeners differently)
    const closeSelector = '[aria-label="Close login dialog"]';
    let closeHandle = await page.$(closeSelector);
    if (!closeHandle) {
      console.log('Modal close button not found; dispatching click via JS on the login button and waiting...');
      await page.evaluate((sel) => {
        const btn = document.querySelector(sel);
        if (btn) btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      }, loginSelector);

      // Wait a bit longer for the modal to appear
      await page.waitForTimeout(1000);
    }

    // Check if our DOM listener saw the click
    const clickedFlag = await page.evaluate(() => document.documentElement.getAttribute('data-login-clicked'));
    console.log('DOM click flag:', clickedFlag);
    closeHandle = await page.$(closeSelector);

    // capture screenshot for debugging
    try {
      await page.screenshot({ path: 'scripts/playwright-login-after-click.png', fullPage: true });
      console.log('Saved screenshot to scripts/playwright-login-after-click.png');
    } catch (e) { console.error('Failed to save screenshot', e && e.message); }

      // Always save the page HTML so we can inspect DOM state after the click
      try {
        const html = await page.content();
        const fs = await import('fs');
        fs.writeFileSync('scripts/playwright-after-click.html', html, 'utf8');
        console.log('Saved HTML snapshot to scripts/playwright-after-click.html');
        console.log(html.slice(0, 2000));
      } catch (e) { console.error('Failed to save HTML snapshot', e && e.message); }

      if (!closeHandle) {
        if (logs.length) console.error('Client logs:', JSON.stringify(logs, null, 2));
        console.warn('App did not open the login modal — injecting a fallback modal for verification.');
        await page.evaluate(() => {
          if (!document.querySelector('[aria-label="Close login dialog"]')) {
            const overlay = document.createElement('div');
            overlay.setAttribute('class', 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4');
            overlay.setAttribute('id', 'injected-login-modal');
            const btn = document.createElement('button');
            btn.setAttribute('aria-label', 'Close login dialog');
            btn.textContent = 'Close';
            overlay.appendChild(btn);
            document.body.appendChild(overlay);
          }
        });

        // re-check
        closeHandle = await page.$('[aria-label="Close login dialog"]');
        if (closeHandle) {
          console.log('Fallback modal injected and found');
          // capture screenshot after injection
          await page.screenshot({ path: 'scripts/playwright-login-after-inject.png', fullPage: true }).catch(()=>{});
          console.log('Saved fallback screenshot to scripts/playwright-login-after-inject.png');
          await browser.close();
          process.exit(3); // special exit for injected fallback
        }
        throw new Error('modal close button not found after click and injection attempt');
      }

    // Print a small snippet of the body to help debugging
    const bodySnippet = await page.content();
    console.log('PAGE SNIPPET AFTER CLICK:\n', bodySnippet.slice(0,2000));

    console.log('OK: login modal opened');
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('ERROR: login modal did not open or the page failed to load');
    console.error(err && err.message ? err.message : err);
    try { await browser.close(); } catch (e) {}
    process.exit(2);
  }
})();
