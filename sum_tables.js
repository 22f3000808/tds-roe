const { chromium } = require('playwright');

const urls = [
  "https://sanand0.github.io/tdsdata/js_table/?seed=82",
  "https://sanand0.github.io/tdsdata/js_table/?seed=83",
  "https://sanand0.github.io/tdsdata/js_table/?seed=84",
  "https://sanand0.github.io/tdsdata/js_table/?seed=85",
  "https://sanand0.github.io/tdsdata/js_table/?seed=86",
  "https://sanand0.github.io/tdsdata/js_table/?seed=87",
  "https://sanand0.github.io/tdsdata/js_table/?seed=88",
  "https://sanand0.github.io/tdsdata/js_table/?seed=89",
  "https://sanand0.github.io/tdsdata/js_table/?seed=90",
  "https://sanand0.github.io/tdsdata/js_table/?seed=91"
];

(async () => {
  const browser = await chromium.launch();
  let total = 0;
  for (const url of urls) {
    const page = await browser.newPage();
    await page.goto(url);
    const numbers = await page.$$eval('table td', tds =>
      tds.map(td => Number(td.innerText)).filter(x => !isNaN(x))
    );
    total += numbers.reduce((a, b) => a + b, 0);
    await page.close();
  }
  await browser.close();
  console.log("Total sum:", total);
})();
