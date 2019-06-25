const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const Content = require('../schemas/content');
const Comment = require('../schemas/comment');
const Category = require('../schemas/category');
require('dotenv').config();

router.get('/:id', isLoggedIn, async(req, res, next) => {
  const content = await Content.findById(req.params.id);
  const comments = await Comment.find({ content: req.params.id });
  const categorylist = await Category.find();

  res.render('content', { user: req.user, content: content, category: categorylist, comments: comments });
});

router.get('/write/get', isLoggedIn, async(req, res, next) => {
  try{
    const categorylist = await Category.find();
    return res.render('writeform', { user: req.user, category: categorylist });
  } catch(err) {
    console.error(err);
    return next(err);
  }
});

router.post('/write/post', isLoggedIn, async(req, res, next) => {
  try{
    const content = new Content({
      title: req.body.title,
      author: req.user[0].userid,
      content: req.body.content,
      category: req.body.category,
    });
    
    await content.save();

    return res.redirect('/main');
  } catch(err) {
    console.error(err);
    return next(err);
  }
});

router.get('/update/post/:id', isLoggedIn, async(req, res, next) => {
  try{
    const categorylist = await Category.find();
    const editContent = await Content.findById(req.params.id);
    return res.render('updateform', { user: req.user, category: categorylist, content: editContent });
  } catch(err) {
    console.error(err);
    return next(err);
  }
});

router.post('/update/post/:id', isLoggedIn, async(req, res, next) => {
  try {
    await Content.findByIdAndUpdate(req.params.id, { $set: {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
    } });
    return res.redirect(`/content/${req.params.id}`);
  } catch(err) {
    console.error(err);
    return next(err);
  }
});

router.get('/del/:id', isLoggedIn, async(req, res, next) => {
  try {
    await Comment.deleteMany({ content: req.params.id });
    await Content.findByIdAndDelete(req.params.id);

    return res.redirect('/main');
  } catch(err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;