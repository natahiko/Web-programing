//run in google chrome
var mysql = require('mysql');
let express = require('express');
const pug = require('pug');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2303',
    database: 'emaillab'
});

let server=express();
server.listen(8837);
console.log('Server is running on port 8837');
server.use(express.static(__dirname));
server.use(express.static('public'));
server.use(express.static('files'));

server.get('/', function(req, res){
    //
});

server.get('/admin', function(req, res){
    res.sendFile(__dirname+"/admin.html");
});

server.get('/user', function(req, res){
    res.sendFile(__dirname+"/client.html");
});

server.get('/addInfo', function(req, res){
    var cap = req.query.caption;
    var text = req.query.text;
    if (cap=="" && text=="") {
        res.sendFile(__dirname+"/error.html");
        return;
    }
    con.query("INSERT INTO blogs (caption,text) VALUES ('"+cap+"','"+text+"');", function (err, result, fields) {
        if(err==null){
            res.sendFile(__dirname+"/index.html");
        } else{
            res.sendFile(__dirname+"/error.html");
        }
    });
});

function updateUser(res) {
    con.query("SELECT caption,text FROM blogs;", function (err, result, fields) {
        if(err==null){
            res.writeHead(200,{"Content-type": "text/html; charset=utf-8"});
            res.write(pug.renderFile('client.pug',{blogs: result}));
            res.end();
        } else{
            res.sendFile(__dirname+"/error.html");
        }
    });

}