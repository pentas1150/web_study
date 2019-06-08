const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const Videolist = require('../schemas/videolist');
require('dotenv').config();

router.get('/', isLoggedIn, async(req, res, next) => {
  res.redirect('/main/1');
});

router.get('/:page', isLoggedIn, async(req, res, next) => {
  try {
    const start = (Number(req.params.page) - 1) * 4;
    const end = Number(req.params.page) * 4;
    const videolist = await Videolist.find().sort({ filename: 1 });
    const result = videolist.slice(start, end);

    console.log(result.length);
    res.render('main', { user: req.user, filelist: result, totalSize: videolist.length, curPage: req.params.page });
  } catch(err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;