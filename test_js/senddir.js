const fs = require('fs');
const server = require('http').createServer();

server.on('request' , (req, res) => {
    fs.readdir('../vue-todo', function(err, filelist){
        if(err){
            console.log(err);
            return;
        }
        let list = [];

        for(let i=0; i<filelist.length; i++)
            list.push(JSON.parse(`{ filename: ${filelist[i]} }`));
        console.log(list);
        res.write(list);
    });
});

server.listen(8080);