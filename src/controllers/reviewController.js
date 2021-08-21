const validUrl = require('valid-url');
const { getBrowser } = require('../libs/headlessChrome');

class ReviewController {

    async sendReview(req, res) {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json("Please enter a URL");
        }

        if (!validUrl.isUri(url)) {
            return res.status(400).json("Please enter a valid URL");
        }

        const browser = getBrowser();
        if (!browser) {
            return res.status(500).json("Browser has crashed please try after some time");
        }

        const page = await browser.newPage();
        try {
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
            await page.waitForSelector('#CustomerReviewsBlock', { timeout: 60000 });

            const review = await page.evaluate(() => {
                const customerReviewBlock = document.querySelector("#CustomerReviewsBlock").childNodes[5];
                const el = customerReviewBlock.getElementsByTagName('div')
                const chArr = Array.from(childNodes);
                return childNodes;
            })

            await page.close();
            return res.status(200).json(review);
        } catch (e) {
            await page.close();
            return res.status(500).json("Error Occurred");
        }

    }
}

module.exports = ReviewController