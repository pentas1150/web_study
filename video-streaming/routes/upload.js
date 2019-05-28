const express = require('express');
const router = express.Router();

const multer = require('multer');

let upload = multer({
    dest: 'upload/',
});

router.get('/', (req, res, next) => {
    res.render('board');
});

router.post('/create', upload.single("imgFile"), (req, res, next) => {
    const file = req.file;

    const result = {
        originalName: file.originalname,
        size: file.size,
    };

    res.json(result);
});