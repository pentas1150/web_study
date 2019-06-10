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
    const start = (Number(req.params.page) - 1) * 4;
    const end = Number(req.params.page) * 4;
    const contentlist = await Contentlist.find();
    const categorylist = await Categorylist.find();

    const result = contentlist.slice(start, end);
    res.render('main', { user: req.user, contents: result, lastPage: Math.ceil(contentlist.length/4), curPage: req.params.page, category: categorylist });
  } catch(err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;