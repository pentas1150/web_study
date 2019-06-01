const express = require('express');
const router = express.Router();
const Videolist = require('../schemas/videolist');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const videoLocation = process.env.VIDEO_PATH;

router.get('/', async(req, res, next) => {
  try {
    const videolist = await Videolist.find();
    console.log(videolist);

    res.render('main', { filelist: videolist, ip: process.env.BASE_IP });
  } catch(err) {
    console.error(err);
    next(err);
  }
});

router.get('/updateDB', (req, res, next) => {
  fs.readdir(videoLocation, function(err, list) {
    if(err) {
        throw err;
    }

    list.forEach(async function(fileName) {
      try {
        const fileExt = path.extname(fileName).toLowerCase();
        if(fileExt === '.mp4'){
          const videoname = new Videolist({
            filename: fileName,
          });

          const result = await videoname.save();
          console.log(result);
        }
      } catch(error) {
        console.error(error);
        next(error);
      }
    });
  });

  res.send("<script>alert('update successfully'); window.location='/main';</script>");
});

module.exports = router;