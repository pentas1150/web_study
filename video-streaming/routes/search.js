const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const Contentlist = require('../schemas/content');
const Categorylist = require('../schemas/category');
require('dotenv').config();

router.get('/:target', isLoggedIn, async(req, res, next) => {
  try {
    const contentlist = await Contentlist.find({ title: { $regex: req.params.target } }).sort({ filename: 1 });
    const categorylist = await Categorylist.find();

    res.render('search', { user: req.user, contents: contentlist, category: categorylist });
  } catch(err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;