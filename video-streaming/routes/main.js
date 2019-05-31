const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const videoLocation = process.env.VIDEO_PATH;

router.get('/', (req, res, next) => {
  fs.readdir(videoLocation, function(err, list) {
      if(err){
          throw err;
      }
      let videoList = [];

      list.forEach(function(fileName) {
        const fileExt = path.extname(fileName).toLowerCase();

        if(fileExt === '.mp4'){
          videoList.push(fileName);
        }
      });

      res.render('main', { filelist: videoList, ip: process.env.BASE_IP })
  });
});

module.exports = router;