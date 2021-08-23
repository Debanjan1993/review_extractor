const puppeteer = require('puppeteer');

let browser;
const launchPuppeteer = async() => {
    browser = await puppeteer.launch({
        args: [
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--disable-setuid-sandbox",
            "--no-sandbox",
        ],
        // headless: false
    });
    console.log(`Puppeteer Launched`);

    browser.on('disconnected', async() => {
        console.log(`Puppeteer browser crashed Restarting browser`);
        await browser.close();
        if (browser && browser.process() != null) browser.process().kill('SIGINT');
        await launchPuppeteer();
    })

}

const getBrowser = () => {
    return browser;
}

module.exports = { launchPuppeteer, getBrowser }