const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const bcrypt = require('bcryptjs');
require('dotenv').config();

router.get('/', (rqe, res, next) => {
  res.render('signup_tem');
});

router.post('/', async(req, res, next) => {
  if(req.body.code === process.env.INVITE_CODE) {
    try {
      const exUser = await User.find({ userid: req.body.id });
      if(exUser.length) {
        return res.send("<script>alert('이미 가입된 아이디입니다.'); window.location='/signup';</script>");
      }

      const hashpw = await bcrypt.hash(req.body.pw, 12);

      const user = new User({
        userid: req.body.id,
        userpw: hashpw,
      });
    
      await user.save();
      
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