const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const Contentlist = require('../schemas/content');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const videoLocation = process.env.VIDEO_PATH;
function videoContent(file) {
    return `<video controls><source src="http://${process.env.BASE_IP}/videoplay/show/${file}" type="video/mp4"></video>`
};

router.get('/', isLoggedIn, async(req, res, next) => {
    if(req.user[0].userid !== process.env.ADMIN) {
        return res.send("<script>alert('관리자가 아닙니다.'); window.location='/main';</script>");
    }
    res.render('admin', { user: req.user });
});

router.get('/updateDB', isLoggedIn, async(req, res, next) => {
    if(req.user[0].userid !== process.env.ADMIN) {
        return res.send("<script>alert('관리자가 아닙니다.'); window.location='/main';</script>");
    }
    try {
        const contents = await Contentlist.find();
        await Contentlist.deleteMany(contents);
    } catch(err) {
        console.error(err);
        next(err);
    }

    fs.readdir(videoLocation, (err, list) => {
        if(err) {
            throw err;
        }

        list.forEach(async(fileName) => {
            try {
                const fileExt = path.extname(fileName).toLowerCase();
                if(fileExt === '.mp4'){
                const videoname = new Contentlist({
                    title: fileName,
                    author: 'beewol',
                    content: videoContent(fileName),
                    category: 'video',
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