const express = require('express');
const router = express.Router();
require('dotenv').config();
const path = require('path');
const multer = require('multer');
const Contentlist = require('../schemas/content');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, process.env.VIDEO_PATH);
    },
    filename(req, file, cb) {
        const extension = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extension);

        cb(null, basename + extension);
    },
});

const upload = multer({
    storage: storage,
    async fileFilter(req, file, cb) {
        let isInList;
        try {
            isInList = await Contentlist.findOne({ title: file.originalname });
        } catch(err) {
            console.error(err);
            return cb(new Error(err));
        }

        if(isInList) {
            console.log("이미 존재하는 파일입니다.");
            return cb(new Error('이미 존재하는 파일입니다.'));
        }
        else if(file.mimetype !== 'video/mp4') {
            console.log('지원되지 않는 파일 형식입니다.');
            return cb(new Error('지원되지 않는 파일 형식입니다.'));
        }
        cb(null, true);
    },
}).single('videoFile');

router.post('/save', (req, res, next) => {
    upload(req, res, async(err) => {
        if(err) {
            res.statusCode = 403;
            return res.send("<script>alert('지원되지 않는 형식이거나 중복된 파일입니다.'); window.location='/admin';</script>");
        }
        try{
            const newVideo = new Contentlist({
                title: req.file.originalname,
                category: 'video',
            });
            await newVideo.save();
            res.send("<script>alert('업로드 완료'); window.location='/admin';</script>");
        } catch(err) {
            console.error(err);
            next(err);
        }
    });
});

module.exports = router;