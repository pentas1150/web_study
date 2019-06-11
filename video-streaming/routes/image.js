const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const fs = require('fs');
require('dotenv').config();

router.get('/:img', isLoggedIn, (req, res, next) => {
    const img = fs.createReadStream(`/Users/jsh/git/video-streaming/public/images/${req.params.img}`);
    img.pipe(res);
});

module.exports = router;