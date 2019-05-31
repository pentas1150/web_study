const fs = require('fs');
const path = require('path');

const videoPath = "/Users/jsh/Desktop/Movie";

function printExt(){
    fs.readdir(videoPath, function(err, file) {
        if(err)
            throw err;

        file.forEach(function(fileName) {
            console.log(`${fileName} ext is ${path.extname(fileName).toLowerCase()}.`);
        });
    });
}

printExt();