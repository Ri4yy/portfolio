const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const SITES = [
  {
    slug: 'traktor-agromash',
    url: 'https://traktor-agromash.ru/',
    subUrl: 'https://traktor-agromash.ru/catalog/',
  },
  {
    slug: 'crafer-pro',
    url: 'https://crafer.pro/',
    subUrl: 'https://crafer.pro/catalog/',
  },
  {
    slug: 'ivekta',
    url: 'https://ivekta.ru/',
    subUrl: 'https://ivekta.ru/produktsiya/',
  },
  {
    slug: 'yarkaya-ptitsa',
    url: 'https://xn--80aaxg0adr7a4ed.xn--p1ai/',
    subUrl: 'https://xn--80aaxg0adr7a4ed.xn--p1ai/catalog/',
  },
  {
    slug: 'centr-sily',
    url: 'https://xn----itbkmhsif7azd.xn--p1ai/',
    subUrl: 'https://xn----itbkmhsif7azd.xn--p1ai/gallery/',
  },
  {
    slug: 'ngpodarki21',
    url: 'https://ngpodarki21.ru/',
    subUrl: 'https://ngpodarki21.ru/catalog/',
  },
  {
    slug: 'trud-rf',
    url: 'https://dev.trud-rf.ru/',
    subUrl: 'https://dev.trud-rf.ru/catalog/',
  },
];

async function capture() {
  const outputDir = path.join(__dirname, '..', 'public', 'projects');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--ignore-certificate-errors',
      '--ignore-ssl-errors',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--allow-running-insecure-content',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  for (const site of SITES) {
    try {
      console.log(`Navigating to ${site.url} ...`);
      await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 30000 }).catch(async (e) => {
        console.warn(`Timeout networkidle2 on ${site.url}, trying domcontentloaded: ${e.message}`);
        await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
      });

      // Small delay for animations/fonts
      await new Promise(r => setTimeout(r, 1500));

      const file1 = path.join(outputDir, `${site.slug}-1.webp`);
      await page.screenshot({ path: file1, type: 'webp', quality: 85 });
      console.log(`Saved: ${file1}`);

      // Now capture sub-page/catalog or scrolled section for gallery
      if (site.subUrl) {
        console.log(`Navigating to sub-page: ${site.subUrl} ...`);
        await page.goto(site.subUrl, { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(async () => {
          // If sub-page fails, scroll down main page instead
          await page.goto(site.url, { waitUntil: 'domcontentloaded' }).catch(() => {});
          await page.evaluate(() => window.scrollBy(0, 800));
        });
        await new Promise(r => setTimeout(r, 1500));
        const file2 = path.join(outputDir, `${site.slug}-2.webp`);
        await page.screenshot({ path: file2, type: 'webp', quality: 85 });
        console.log(`Saved: ${file2}`);
      }

      // Also capture scrolled detail view for 3rd slide in gallery
      await page.evaluate(() => window.scrollBy(0, 700));
      await new Promise(r => setTimeout(r, 800));
      const file3 = path.join(outputDir, `${site.slug}-3.webp`);
      await page.screenshot({ path: file3, type: 'webp', quality: 85 });
      console.log(`Saved: ${file3}`);

    } catch (err) {
      console.error(`Error processing ${site.slug}:`, err.message);
    }
  }

  await browser.close();
  console.log('Capture complete!');
}

capture().catch(console.error);
