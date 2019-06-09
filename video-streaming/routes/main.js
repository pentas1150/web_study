const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const Contentlist = require('../schemas/content');
const Categorylist = require('../schemas/category');
require('dotenv').config();

router.get('/', isLoggedIn, async(req, res, next) => {
  try {
    const contentlist =await Contentlist.find();
    const categorylist = await Categorylist.find();

    res.render('main', { user: req.user, contents: contentlist, category: categorylist });
  } catch(err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;