var testFolder = './vue-todo';
var fs = require('fs');

fs.readdir(testFolder, function(err, filelist){
    if(err){
        console.log(err);
        return;
    }
    console.log(filelist);
});