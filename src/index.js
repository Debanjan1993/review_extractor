const express = require('express');
const path = require('path');
const { Routes } = require('./routes/routes');
const { launchPuppeteer } = require('../src/libs/headlessChrome');

(async function() {
    try {
        /**
         * Launching puppeteer 
         */

        await launchPuppeteer();

        const app = express();
        const port = process.env.PORT || 4000;

        app.use(express.static(path.join(__dirname, '../public')));
        app.use(express.json());

        const routes = new Routes();
        routes.init(app);

        app.listen(port, () => console.log(`Server Running on port ${port}`));
    } catch (e) {
        console.log(e);
    }

})();