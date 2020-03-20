//run in google chrome
var mysql = require('mysql');
let express = require('express');
const pug = require('pug');
var nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
let config = require('./json/conf.json');
let confText = require('./json/text.json');
var crypto = require('crypto');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'emaillab'
});

let server=express();
server.listen(7777);
console.log('Server is running on port 7777');
server.use(express.static(__dirname));
server.use(express.static('public'));
server.use(express.static('files'));
server.use('/book', express.static(path.join(__dirname, 'build')));

server.get('/', function(req, res){
    res.write(getHeader(req.query.lang, "home"));
    var data1 = {};
    var data2 = {};
    if(req.query.lang=='en'){
        data1 = confText.en.home;
        data2 = confText.en.form;
    } else{
        data1 = confText.ua.home;
        data2 = confText.ua.form;
    }
    res.write(pug.renderFile("pugs/home.pug",data1));
    res.write(pug.renderFile("pugs/form.pug",data2));
    res.end();
});

server.get('/getbooks',function (req,res) {
    con.query("SELECT * FROM books;",function (err, result, fields) {
        res.write(JSON.stringify(result));
        res.end();
    });
});

// server.get('/books', function(req, res){
//     res.write(getHeader(req.query.lang, "books"));
//     var data1 = {};
//     var data2 = {};
//     var databook = {};
//     if(req.query.lang=='en'){
//         data2 = confText.en.form;
//         data1 = confText.en.error;
//         databook = confText.en.books;
//     } else{
//         data2 = confText.ua.form;
//         data1 = confText.ua.error;
//         databook = confText.ua.books;
//     }
//     con.query("SELECT * FROM books;",function (err, result, fields) {
//         if(err){
//             res.write(pug.renderFile("pugs/error.pug",data1));
//         } else {
//             //TODO
//         }
//         res.end();
//     });
//     res.write(pug.renderFile("pugs/form.pug",data2));
//     res.end();
// });

server.get('/addUser', function(req, res){
    var data1 = {};
    var data2 = {};
    var emdata = {};
    if(req.query.lang=='en'){
        data1 = confText.en.confirm;
        data2 = confText.en.error;
        emdata = confText.en.email;
    } else{
        data1 = confText.ua.confirm;
        data2 = confText.ua.error;
        emdata = confText.ua.email;
    }
    res.write(getHeader(req.query.lang, ""));

    var surname = req.query.input_surname;
    var email = req.query.input_email;
    var comment = req.query.input_comment;
    var name = surname+"*-*"+email;
    var code = crypto.createHash('md5').update(name).digest('hex');
    con.query("INSERT INTO proposals (name, email, comment, code) VALUES ('"+surname+"', '"+email+"', '"+comment+"', '"
        +code+"');",function (err, result, fields) {
        if(err){
            res.write(pug.renderFile("pugs/error.pug",data2));
        } else {
            send(email, emdata, surname, code, req.query.lang);
            res.write(pug.renderFile("pugs/thanks.pug",data1));
        }
        res.end();
    });

});

server.get('/confirm_email', function(req, res){
    res.write(getHeader(req.query.lang, ""));
    if(req.query.code==""){
        res.end();
        return;
    }
    con.query("UPDATE proposals SET registered=1 WHERE code='"+req.query.code+"';", function (err, result, fields) {
        if(err){
            res.write(pug.renderFile("pugs/error.pug",data2));
            res.end();
        } else {
            res.write(pug.renderFile("pugs/thanks.pug",data1));
            res.end();
        }
    });
});

server.get('/proposals', function(req, res){
    var data1 = {};
    var data2 = {};
    if(req.query.lang=='en'){
        data1 = confText.en.proposals;
        data2 = confText.en.error;
    } else{
        data1 = confText.ua.proposals;
        data2 = confText.ua.error;
    }
    res.write(getHeader(req.query.lang, ""));
    con.query("SELECT name, email, comment FROM proposals WHERE registered=1;", function (err, result, fields) {
        if(err){
            res.write(pug.renderFile("pugs/error.pug",data2));
            res.end();
        } else {
            var defComm = data1.nonedesc;
            for(var i=0; i<result.length; i++){
                if(result[i]['comment']==""){
                    result[i]['comment'] = defComm;
                }
            }
            data1['data'] = result;
            res.write(pug.renderFile("pugs/proposals.pug",data1));
            res.end();
        }
    });
});

server.get('/aboutus', function(req, res){
    res.write(getHeader(req.query.lang, "aboutus"));
    var data1 = {};
    var data2 = {};
    if(req.query.lang=='en'){
        data1 = confText.en.aboutus;
        data2 = confText.en.form;
    } else{
        data1 = confText.ua.aboutus;
        data2 = confText.ua.form;
    }
    res.write(pug.renderFile("pugs/aboutus.pug",data1));
    res.write(pug.renderFile("pugs/form.pug",data2));
    res.end();
});

function getHeader(lang, page) {
    var data = {
        color: config.maincolor,
        logo:  config.picture,
        www: config.www
    };
    if(page=='books'){
        data['activebooks'] = "active";
    } else if (page=='aboutus'){
        data['activeaboutus'] = "active";
    } else if(page=='home'){
        data['activehome'] = "active";
    }

    if(lang=='en'){
        data['text'] = config.en;
    } else {
        data['text'] = config.ua;
    }
    return pug.renderFile("pugs/header.pug",data);
}

async function send(emailTo, text, name, code, lang) {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'nata.shkarovska@gmail.com',
            pass: 'Nix_23032000'
        }
    });
    var mailOptions = {
        from: 'nata.shkarovska@gmail.com',
        to: emailTo,
        subject: 'Sending Email using Node.js',
        html: "<h1>"+text.header+" "+name+"</h1><p>"+text.text+"</p><form action='http://localhost:7777/confirm_email' method='get'>" +
            "<input style='display:none;' type='text' name='code' value='"+code.substring(0,10)+"'>" +
            "<input style='display:none;' type='text' name='lang' value='"+lang+"'>" +
            "<button type='submit'>"+text.button+"</button></form>"
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}