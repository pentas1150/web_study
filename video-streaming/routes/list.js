var express = require('express');
var router = express.Router();
var fs=require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readdir('./', function(err, list) {
      if(err){
          throw err;
      }
      console.log(list);
      res.render('list', { filelist: list})
  });
});

router.get('/:video', function(req, res, next) {
    console.log(req.params.video);
    res.render('msg', { msg: `${req.params.video} is received.`})
})

module.exports = router;
