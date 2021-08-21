const puppeteer = require('puppeteer');

let browser;
const launchPuppeteer = async() => {
    browser = await puppeteer.launch();
    console.log(`Puppeteer Launched`);
}

const getBrowser = () => {
    return browser;
}

module.exports = { launchPuppeteer, getBrowser }