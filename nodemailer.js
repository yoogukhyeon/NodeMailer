process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const nodemailer = require('nodemailer');
const ejs = require('ejs');


const app = express();
const port = 3000;
const router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/', router);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

router.route('/').get((req, res) => {
    res.render('mail')
})

router.route('/mail_ok').post((req, res) => {
    const userid = req.body.userid;
    const sendmail = req.body.sendmail;
    const touserid = req.body.touserid;
    const tomail = req.body.tomail;
    const title = req.body.title;
    const content = req.body.content;

    const fmtfrom = `${userid}<${sendmail}>`;
    const fmtto = `${touserid}<${tomail}`;

    const transpoter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user : 'rnrgus5897@gmail.com',
            pass: 'dkswoah589318'
        },
        host: 'smtp.mail.com',
        port: '465'
    });

    const mailOption = {
        from: fmtfrom,
        to: fmtto,
        subject: title,
        Text: content
    };


    transpoter.sendMail(mailOption , (err, infor) => {
        if(err){
            console.log(err);
        }else{
            console.log(infor)        
        }
    })


    const userinfo = {userid : userid, sendmail : sendmail, touserid : touserid , tomail : tomail , title : title, content : content}

        fs.readFile('./views/mail_ok.ejs' , 'utf-8' , (err, data) => {
            if(err){
                console.log(err);
            }else{
                res.writeHead(200, {'content-type' : 'text/html'});
                res.end(ejs.render(data , userinfo));
            }
    });



})







            







app.listen(port, () => {
    console.log(`${port}포트로 포트이동중.....`)

})


