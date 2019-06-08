const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const Videolist = require('../schemas/videolist');
require('dotenv').config();

router.get('/:target', isLoggedIn, async(req, res, next) => {
  try {
    const videolist = await Videolist.find({ filename: { $regex: req.params.target } }).sort({ filename: 1 });
    res.render('search', { user: req.user, filelist: videolist });
  } catch(err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;