const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const Comment = require('../schemas/comment');
require('dotenv').config();

router.post('/:id', isLoggedIn, async(req, res, next) => {
    try{
        const comment = new Comment({
          comment: req.body.comment,
          author: req.user[0].userid,
          content: req.params.id,
        });

        await comment.save();
    } catch(err) {
        console.error(err);
        next(err);
    }

    res.redirect(`/content/${req.params.id}`);
});

module.exports = router;