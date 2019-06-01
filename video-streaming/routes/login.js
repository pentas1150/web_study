const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  console.log(`id: ${req.body.id}, pw: ${req.body.pw}`);
  if(req.body.id==='admin' && req.body.pw==='admin')
    res.redirect('/main');
  else
    res.send("<script>alert('unknown user'); window.location='/';</script>'");
});

router.get('/signup', (rqe, res, next) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  console.log(`signup id: ${req.body.id}, signup pw: ${req.body.pw}`);

  if(req.body.code===process.env.INVITE_CODE)
    res.send("<script>alert('Sign Up!!'); window.location='/';</script>");
  else
    res.send("<script>alert('초대코드가 맞지 않습니다.'); window.location='/signup';</script>");
});

module.exports = router;