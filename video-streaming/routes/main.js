const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const Videolist = require('../schemas/videolist');
require('dotenv').config();

router.get('/', isLoggedIn, async(req, res, next) => {
  console.log('[debug]'+req.session.id);
  try {
    const videolist = await Videolist.find().sort({ filename: 1 });
    res.render('index', { user: req.user, filelist: videolist });
  } catch(err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;