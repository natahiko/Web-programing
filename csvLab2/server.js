let express = require('express');
const pug = require('pug');
let server=express();
let fs = require("fs");
server.listen(2223);
console.log('Server is running on port 2223');

server.use(express.static(__dirname));

server.get('/', function(req, res){
    array = getArray("file.csv");
    res.writeHead(200,{"Content-type": "text/html; charset=utf-8"});
    res.write(pug.renderFile('file.pug', {keys: array}));
    res.end();
});

server.get('/up', function(req, res){
    array = getArray("file.csv");
    array.sort(upFunc);
    res.writeHead(200,{"Content-type": "text/html; charset=utf-8"});
    res.write(pug.renderFile('file.pug', {keys: array}));
    res.end();
});

server.get('/down', function(req, res){
    array = getArray("file.csv");
    array.sort(downFunc);
    res.writeHead(200,{"Content-type": "text/html; charset=utf-8"});
    res.write(pug.renderFile('file.pug', {keys: array}));
    res.end();
});

function getArray(filename) {
    let studs = fs.readFileSync(filename, "utf-8").split(/\n/);
    array = [];
    for(let i=0; i<studs.length; i++){
        let vals = studs[i].split(';');
        array.push(vals.concat((+vals[1] + +vals[2] + +vals[3] + +vals[4])/4));
    }
    return array;
}

function downFunc(a, b) {
    return a[5]-b[5];
}
function upFunc(a, b) {
    return b[5]-a[5];
}