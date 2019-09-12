var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

// POST route from contact form
app.post('/email', (req, res) => {
  console.log("Here is req: ", req.body)
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
  });
  mailOpts = {
    from: req.body.email,
    to: "htb320@lehigh.edu",
    subject: req.body.name + 'sent you a new message from your website',
    text: `${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts, function(error, info){
    if (error) {
      console.log(error);
      res.redirect(__dirname + "public/index.html")
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect(__dirname + "public/index.html")
    }
  });
});

app.listen(PORT, (err) => {
  if(err) console.log(err)
  else console.log('Server is running on PORT:',PORT);
});