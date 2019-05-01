require('dotenv').config();
var Message = require('./models/message');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
var mailSender = require('./helpers/mail-sender');

app.get('/', (req, res) => {    
    res.render('index', {
        title : 'Jeremy López - Portafolio',
        currentYear: new Date().getFullYear()
    });
});

app.get('/login', (req, res) => {    
    res.render('login', {
        title : 'Jeremy López - Log In'
    });
});

app.post('/message/send', (req, res) => {
    var message = new Message(req.body.name.trim(), req.body.email.trim(), req.body.description.trim()); 
    let mailOptions = {
        from: message.email, // sender address
        to: 'jeremyandres.lopez@gmail.com', // list of receivers
        subject: message.name + ' has contacted you ✔', // subject line
        text: '', // plain text body
        html: message.description // html body
    };

    mailSender.sendMail(mailOptions, (error, info) => {
        if (error) {
            throw error;
        }
        console.log('Message has been sent to: ' + mailOptions.to);
    });

    res.render('index', {
        title : 'Jeremy López - Portafolio',
        currentYear: new Date().getFullYear(),
        message: 'Gracias por contactarme =)'
    });
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Portafolio app running on port " + port);
});