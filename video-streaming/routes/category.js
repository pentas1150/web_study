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
    const skipNum = (Number(req.params.page) - 1) * 4;
    const contentCount = await Contentlist.count({ category: req.params.category });
    const contentlist = await Contentlist.find({ category: req.params.category }).skip(skipNum).limit(4);
    const categorylist = await Categorylist.find();

    res.render('category', { user: req.user, contents: contentlist, category: categorylist, lastPage: Math.ceil(contentCount/4), curCategory: req.params.category, curPage: req.params.page });
  } catch(err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;