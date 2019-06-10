const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const Contentlist = require('../schemas/content');
const Comment = require('../schemas/comment');
const Categorylist = require('../schemas/category');
require('dotenv').config();

router.get('/:id', isLoggedIn, async(req, res, next) => {
  const content = await Contentlist.findById(req.params.id);
  const comments = await Comment.find({ content: req.params.id });
  const categorylist = await Categorylist.find();

  res.render('content', { user: req.user, content: content, category: categorylist, comments: comments });
});

module.exports = router;