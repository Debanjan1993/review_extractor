const { Router } = require('express');
const path = require('path');
const ReviewController = require('../controllers/reviewController');

class Routes {
    constructor() {
        this.router = Router();
        this.reviewController = new ReviewController();
    }

    init(app) {

        this.router.get('/', (req, res) => {
            return res.sendFile(path.join(__dirname, '../../public/index.html'))
        })

        this.router.get('/review', async(req, res) => {
            await this.reviewController.sendReview(req, res);
        })

        this.router.get('/test', (req, res) => {
            return res.status(200).json("Test Route");
        })

        app.use('/', this.router);

    }

}

module.exports = { Routes }