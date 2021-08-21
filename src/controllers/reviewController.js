const validUrl = require('valid-url');
const { getBrowser } = require('../libs/headlessChrome');

class ReviewController {
    constructor() {
        this.browser = getBrowser();
    }


    async sendReview(req, res) {

        const { url } = req.body;
        if (!url) {
            return res.status(400).json("Please enter a URL");
        }

        if (!validUrl.isUri(url)) {
            return res.status(400).json("Please enter a valid URL");
        }


        const page = await this.browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto(url, { waitUntil: 'networkidle0' });
        await page.waitForSelector('#CustomerReviewsBlock', {
            timeout: 0
        });

        const review = await page.evaluate(() => {
            const customerReviewBlock = document.querySelector("#CustomerReviewsBlock").childNodes[5];
            const el = customerReviewBlock.getElementsByTagName('div')
            const chArr = Array.from(childNodes);
            return childNodes;

        })



        return res.status(200).json("hello");



    }

}

module.exports = ReviewController