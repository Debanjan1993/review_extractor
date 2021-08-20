const express = require('express');
const path = require('path');
const { Router } = require('express');

(function() {


    const app = express();
    const port = process.env.PORT || 4000;

    app.use(express.static(path.join(__dirname, '../public')));


    const router = Router();
    router.get('/test', (req, res) => {
        return res.status(200).json("Test Route");
    })

    app.use('/', router);
    app.listen(port, () => console.log(`Server Running on port ${port}`));

})();