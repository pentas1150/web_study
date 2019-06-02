const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../schemas/user');
const bcrypt = require('bcryptjs');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
require('dotenv').config();


router.get('/', isNotLoggedIn, (req, res, next) => {
  res.render('login');
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if(authError) {
      console.error(authError);
      return next(authError);
    }
    if(!user) {
      return res.send("<script>alert('ID 또는 PW가 맞지 않습니다.'); window.location='/';</script>");
    }
    return req.login(user, (loginError) => {
      if(loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("<script>alert('로그아웃 완료'); window.location='/';</script>");
});

module.exports = router;