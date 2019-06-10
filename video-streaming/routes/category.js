const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const Contentlist = require('../schemas/content');
const Categorylist = require('../schemas/category');
require('dotenv').config();

router.get('/:category', isLoggedIn, (req, res, next) => {
  res.redirect(`/category/${req.params.category}/1`);
});

router.get('/:category/:page', isLoggedIn, async(req, res, next) => {
  try {
    const start = (Number(req.params.page) - 1) * 4;
    const end = Number(req.params.page) * 4;
    const contentlist = await Contentlist.find({ category: req.params.category }).sort({ filename: 1 });
    const categorylist = await Categorylist.find();
    const result = contentlist.slice(start, end);

    console.log(result.length);
    res.render('category', { user: req.user, contents: result, category: categorylist, lastPage: Math.ceil(contentlist.length/4), curCategory: req.params.category, curPage: req.params.page });
  } catch(err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;