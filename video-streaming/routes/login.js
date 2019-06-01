const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
require('dotenv').config();

router.get('/', (req, res, next) => {
  res.render('login');
});

router.post('/login', async(req, res, next) => {
  console.log(`id: ${req.body.id}, pw: ${req.body.pw}`);

  try {
    const result = await User.findOne({ userid: req.body.id, userpw: req.body.pw });
    console.log(result);

    if(result) {
      res.redirect('/main');
    } else {
      res.send("<script>alert('unknown user'); window.location='/';</script>'");  
    }
  } catch(err) {
    console.error(err);
    next(err);
  }
});

router.get('/signup', (rqe, res, next) => {
  res.render('signup');
});

router.post('/signup', async(req, res, next) => {
  console.log(`signup id: ${req.body.id}, signup pw: ${req.body.pw}`);

  if(req.body.code === process.env.INVITE_CODE) {
    try {
      const user = new User({
        userid: req.body.id,
        userpw: req.body.pw,
      });
    
      const result = await user.save();
      console.log(result);
      
      res.send("<script>alert('Sign Up!!'); window.location='/';</script>");
    } catch(err) {
      console.error(err);
      next(err);
    }
  } else {
    res.send("<script>alert('초대코드가 맞지 않습니다.'); window.location='/signup';</script>");
  }
});

module.exports = router;