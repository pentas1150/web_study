const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const videoLocation = process.env.VIDEO_PATH;

router.get('/', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  console.log(`id: ${req.body.id}, pw: ${req.body.pw}`);
  if(req.body.id==='admin' && req.body.pw==='admin')
    res.redirect('/main');
  else
    res.send("<script>alert('unknown user'); window.location='/'</script>'");
});

module.exports = router;