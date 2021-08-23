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

        if (!url.includes("www.tigerdirect.com")) {
            return res.status(500).json("Enter tigerdirect URL");
        }

        const page = await browser.newPage();
        try {
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
            await page.waitForSelector('#CustomerReviewsBlock', { timeout: 10000 });
            const reviewsArr = [];
            reviewsArr.push(...await this.extractReviews(page));

            await page.click("#reviewtab a");


            await page.click(".reviewsPagination .reviewPage a");


            // reviewsArr.push(...await this.extractReviews(page));

            // const checkClick = await page.$(".reviewsPagination .reviewPage #Next a")
            // while (checkClick) {
            //     console.log("a");
            //     await page.click(".reviewPage #Next a");
            //     const tempArr = await this.extractReviews(page);
            //     reviewsArr.push(...tempArr);
            // }




            // await page.close();
            return res.status(200).json(reviewsArr);
        } catch (e) {
            if (e.message.includes("waiting for selector `#CustomerReviewsBlock`")) {
                return res.status(200).json("No reviews present for this item");
            }
            console.log(`Exception occurred : ${e.message}`);
            await page.close();
            return res.status(500).json(e);
        }

    }

    async extractReviews(page) {
        const review = await page.evaluate(() => {
            const reviewsArr = [];
            const customerReviewBlock = document.querySelector("#CustomerReviewsBlock").childNodes[5].children;
            Array.from(customerReviewBlock).forEach(elem => {
                if (elem.id === "customerReviews") {

                    const rightBlockElem = (elem.getElementsByClassName("review")[0]).getElementsByClassName("rightCol")[0].children[0]
                    const title = rightBlockElem.children[0].textContent;
                    const description = rightBlockElem.children[1].textContent;
                    const review = `${title.toUpperCase()} ${description}`;

                    const leftBlockElem = (elem.getElementsByClassName("review")[0]).getElementsByClassName("leftCol")[0]
                    const rating = (leftBlockElem.getElementsByClassName("itemReview")[0]).getElementsByClassName('itemRating')[0].children[1].textContent

                    const reviewer = elem.getElementsByClassName("reviewer")[0].children[1].textContent;
                    const date = elem.getElementsByClassName("reviewer")[0].children[3].textContent;

                    reviewsArr.push({
                        "Review Comment": review,
                        "Ratings": rating,
                        "Review Date": date,
                        "Reviewer Name": reviewer
                    })
                }
            })
            return reviewsArr;
        })
        return review;
    }
}

module.exports = ReviewController