const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const Videolist = require('../schemas/videolist');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const videoLocation = process.env.VIDEO_PATH;

router.get('/', isLoggedIn, async(req, res, next) => {
  res.json(req.user);
});

router.get('/updateDB', isLoggedIn, async(req, res, next) => { //관리자용으로 뺄 예정
  try {
    const videolist = await Videolist.find();
    videolist.forEach(async(video) => {
      try{
        await Videolist.remove(video);
      } catch(err) {
        console.error(err);
        return next(err);
      }
    });
  } catch(err) {
    console.error(err);
    return next(err);
  }

  fs.readdir(videoLocation, (err, list) => {
    if(err) {
        throw err;
    }

    list.forEach(async(fileName) => {
      try {
        const fileExt = path.extname(fileName).toLowerCase();
        if(fileExt === '.mp4'){
          const videoname = new Videolist({
            filename: fileName,
          });

          await videoname.save();
        }
      } catch(error) {
        console.error(error);
        return next(error);
      }
    });
  });

  res.send("<script>alert('update successfully'); window.location='/main';</script>");
});

module.exports = router;