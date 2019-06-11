const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const Contentlist = require('../schemas/content');
const Categorylist = require('../schemas/category');
require('dotenv').config();

router.get('/', isLoggedIn, (req, res, next) => {
  res.redirect('/main/1');
});

router.get('/:page', isLoggedIn, async(req, res, next) => {
  try {
    const contentCount = await Contentlist.count();
    const skipNum = (Number(req.params.page) - 1) * 4;
    const contentlist = await Contentlist.find().skip(skipNum).limit(4).sort({ createdAt: -1 });
    const categorylist = await Categorylist.find();
    
    res.render('main', { user: req.user, contents: contentlist, lastPage: Math.ceil(contentCount/4), curPage: req.params.page, category: categorylist });
  } catch(err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;