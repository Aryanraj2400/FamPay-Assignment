const puppeteer = require('puppeteer');


async function run() {
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();


await page.goto('https://www.macrumors.com/', { waitUntil: 'networkidle2' });


await page.waitForSelector('.menu-icons');
const tabs = await page.$$('.menu-icons a');


if (tabs.length < 3) {
console.log('Could not find the third bottom tab.');
await browser.close();
return;
}


await tabs[2].click();
await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});


const content = await page.content();
const containsText = content.includes('iPadOS 26 Timeline');


if (containsText) {
console.log('Text "iPadOS 26 Timeline" found!');
} else {
console.log('Text "iPadOS 26 Timeline" NOT found.');
}


await browser.close();
}


run();