
var nodemailer = require('nodemailer');
var mysql = require('mysql');
let express = require('express');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'emaillab'
});

let server=express();
server.listen(8834);
console.log('Server is running on port 8834');
server.use(express.static(__dirname));
server.use(express.static('public'));
server.use(express.static('files'));

server.get('/', function(req, res){
    // res.writeHead(200,{"Content-type": "text/html; charset=utf-8"});
    // res.write("<h1>Розсилка всім користувачам</h1>");
    // res.write("<input type='button' onclick='setText1()' value='Текст 1'>              ");
    // res.write("<input type='button' onclick='setText2()' value='Текст 2'>              ");
    // res.write("<input type='button' onclick='setText3()' value='Текст 3'>              ");
    // res.write("<input type='button' onclick='setText4()' value='Текст 4'>              ");
    // res.write("<input type='button' onclick='setText5()' value='Текст 5'>              ");
    // res.write("<input type='button' onclick='setText6()' value='Текст 6'>              ");
    //
    // //send to all user form
    // res.write("<br><form action='/sended' method='get'>");
    // res.write("<br><br><textarea style='width: 40%; height: 100px' " +
    //     "id='main_text' placeholder='Введіть ваш текст тут....' type='text' name='inp' ></textarea>" +
    //     "<br><br><input type='submit' value='Надіслати всім!' id='main_button'/>");
    // res.write("</form>");
    //
    // //add new user to db
    // res.write("<h1>Додати нового користувача</h1>");
    // res.write("<form action='/adduser' method='get'>");
    // res. write("<input type='text' placeholder='email...' name='useremail'>          ");
    // res. write("<input type='text' placeholder='name...' name='username'>          ");
    // res. write("<input type='text' placeholder='surname...' name='usersur'>          ");
    // res. write("<input type='text' placeholder='midname...' name='usermid'>          ");
    // res.write("<br><br><input type='submit' value='Додати користувача'/>");
    // res.write("</form>");
    //
    // res.write("<script src='main.js' type='text/javascript'></script>");
    // res.end();
});

server.get('/adduser', function(req, res) {
    res.writeHead(200,{"Content-type": "text/html; charset=utf-8"});
    var email = req.query.useremail;
    var name = req.query.username;
    var surname = req.query.usersur;
    var midname = req.query.usermid;
    if(email=="" || name=="" || surname==""){
        res.write("<h4>Щоб додати нового користувача необхідно заповнити поля: name, surname та email</h4>");
        res.write(getReturnButton());
        res.end();
    } else {
        // con.connect(function(err) {
        //     if(err){
        //         console.log(err);
        //     } else {
                con.query("SELECT * FROM users WHERE gmail='"+email+"';", function (err, result, fields) {
                    if(result.length<1){
                        con.query("INSERT INTO users VALUES ('"+email+"', '"+
                            name+"', '"+surname+"', '"+midname+"');",function (err, result, fields) {
                            if(err){
                                res.write("<h4>На сервері сталася невідома помилка</h4>");
                            } else {
                                res.write("<h4>Користувач успішно доданий!!!</h4>");
                            }
                            res.write(getReturnButton());
                            res.end();
                        })
                    } else{
                        res.write("<h4>Користувач з такою поштою вже є в базі даних</h4>");
                        res.write(getReturnButton());
                        res.end();
                    }
                });
            }
        // });
    // }


});

server.get('/sended', function(req, res) {
    res.writeHead(200,{"Content-type": "text/html; charset=utf-8"});
    res.write("Всі повідомлення успішно надіслані!!!");
    res.write(getReturnButton());
    res.end();

    sendToAllEmail(req.query.inp);
});

server.get('/delete', function (req, res) {
    res.writeHead(200,{"Content-type": "text/html; charset=utf-8"});
    con.query("DELETE FROM users WHERE gmail='"+req.query.email+"';", function (err, result, fields) {
        if(err){
            res.write("<h4>На сервері сталася невідома помилка</h4>");
        } else {
            res.write("<h4>Користувач <u>"+req.query.email+"</u> успішно видалений з бази даних</h4>");
        }
        res.write(getReturnEditButton());
        res.write("<br>");
        res.write(getReturnButton());
        res.end();
    });
});

server.get('/edituser', function (req, res) {
    res.writeHead(200,{"Content-type": "text/html; charset=utf-8"});
    con.query("UPDATE users SET gmail='"+req.query.email+"', name='"+req.query.name+"', " +
        "surname='"+req.query.surname+"', midname='"+req.query.midname+"' " +
        "WHERE gmail='"+req.query.email+"';", function (err, result, fields) {
        if(err){
            res.write("<h4>На сервері сталася невідома помилка</h4>");
        } else {
            res.write("<h4>Інформація про користувача <u>"+req.query.email+"</u> успішно змінена в базі даних</h4>");
        }
        res.write(getReturnEditButton());
        res.write("<br>");
        res.write(getReturnButton());
        res.end();
    });
});

server.get('/editdb', function (req, res) {
    res.writeHead(200,{"Content-type": "text/html; charset=utf-8"});

    con.query("SELECT * FROM users", function (err, result, fields) {
        if (err){
            res.write("<h2>Трапилася невідома помилка на сервері</h2>");
            res.write(getReturnButton());
            res.end();
        } else {
            res.write("<h2>Редагування бази даних</h2><br>");
            res.write("<table style='width:90%'>");
            res.write("<tr><th></th><th>Email</th><th>Name</th><th>Surname</th><th>Midname</th>" +
                "<th></th></tr>");
            for(var i=0; i<result.length; i++){
                res.write("<tr><form action='/delete' method='get'>" +
                    "<input type='text' value='"+result[i].gmail+"' name='email' style='display: none'>"+
                    "<th><input type='submit' value='Delete'></th></form>" +
                    "<form action='/edituser' method='get'>"+
                    "<th><input type='text' value='"+result[i].gmail+"' name='email'></th>" +
                    "<th><input type='text' value='"+result[i].name+"' name='name'></th>" +
                    "<th><input type='text' value='"+result[i].surname+"' name='surname'></th>" +
                    "<th><input type='text' value='"+result[i].midname+"' name='midname'></th>" +
                    "<th><input type='submit' value='Edit'></th></form>" +
                    "</tr>");
            }
            res.write("</table>");
            res.write(getReturnButton());
            res.end();
        }
    });


});

function sendToAllEmail(message){
    // con.connect(function(err) {
    //     if(err){
    //         console.log(err);
    //     } else {
            con.query("SELECT gmail FROM users", function (err, result, fields) {
                let res = "";
                for(var i=0; i<result.length; i++){
                    res += result[i].gmail + ", ";
                }
                res = res.substring(0, res.length - 2);
                send(res, message);
            });
    //     }
    // });
}

async function send(emailTo, text) {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'nata.shkarovska@gmail.com',
            pass: 'Nix_23032000'
        }
    });

    console.log(emailTo);
    var mailOptions = {
        from: 'nata.shkarovska@gmail.com',
        to: emailTo,
        subject: 'Sending Email using Node.js',
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function getReturnButton() {
    var text = "<br><form action='/' method='get'><br>" +
        "<br><input type='submit' value='Повернутись!'/></form>";
    return text;
}
function getReturnEditButton() {
    var text = "<br><form action='/editdb' method='get'><br>" +
        "<br><input type='submit' value='Продовжити редагування!'/></form>";
    return text;
}