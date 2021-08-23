const puppeteer = require('puppeteer');

let browser;
const launchPuppeteer = async() => {
    browser = await puppeteer.launch();
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