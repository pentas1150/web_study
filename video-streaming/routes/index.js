const express = require('express');
const router = express.Router();
const fs = require('fs');
require('dotenv').config();

const videoLocation = process.env.VIDEO_PATH;

router.get('/', (req, res, next) => {
  fs.readdir(videoLocation, function(err, list) {
      if(err){
          throw err;
      }
      list.forEach(function(fileName) {
        const nameLen = fileName.length;
        const lastDot = fileName.lastIndexOf('.');
        const fileExt = fileName.substring(lastDot, nameLen).toLowerCase();

        if(fileExt!=='.mp4')
            list.splice(list.indexOf(fileName), 1);
      });

      res.render('index', { filelist: list, ip: process.env.BASE_IP })
  });
});

router.get('/:video', (req, res, next) => {
    res.render('video', { ip: process.env.BASE_IP, videoname: req.params.video });
});

router.get('/player/:video', function(req, res, next) {
    const path = `${videoLocation}/${req.params.video}`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
        const chunksize = (end-start)+1;
        const file = fs.createReadStream(path, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
         const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
});

module.exports = router;
