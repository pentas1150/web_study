const express = require('express');
const router = express.Router();
require('dotenv').config();
const path = require('path');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, process.env.VIDEO_PATH);
    },
    filename: function(req, file, cb) {
        const extension = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extension);

        cb(null, basename + extension);
    }
});

const upload = multer({
    storage: storage,
});

router.post('/save', upload.single("videoFile"), (req, res, next) => {
    console.log(`file upload name: ${req.file.originalname}, size: ${req.file.size}`);
    res.redirect('/');
});

module.exports = router;