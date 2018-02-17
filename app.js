var express = require('express');
var app = express();
//var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Message = require('./models/message');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
var mailSender = require('./helpers/mail-sender');
var config = require('./config').get(process.argv[2]);

app.get('/', (req, res) => {    
    res.render('index', {
        title : 'Jeremy López - Portafolio',
        currentYear: new Date().getFullYear()
    });
});

app.post('/message/send', (req, res) => {
    var message = new Message({
        name : req.body.name.trim(),
        email : req.body.email.trim(),
        description : req.body.description.trim()
    });

   /* message.save(function(err) {
        if (err) throw err;

        console.log('Message saved successfully!');
             
    });*/

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
        message: 'Mil gracias por su mensaje, pronto le estare contactanto'
    });
});


//Set up default mongoose connection
/*var mongoDb = 'mongodb://portafolio-db:I3FJcRpMIAWFNZ2t@cluster0-shard-00-00-zknnr.mongodb.net:27017,cluster0-shard-00-01-zknnr.mongodb.net:27017,cluster0-shard-00-02-zknnr.mongodb.net:27017/portafolio?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
mongoose.connect(mongoDb);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    
});
*/
var port = config.port;
app.listen(port, () => {
    console.log("Portafolio app running on port " + port);
});