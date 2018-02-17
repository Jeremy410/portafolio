'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    // secure:true for port 465, secure:false for port 587
    host: 'smtp.gmail.com', 
    port: 465,
    auth: {    
        user : 'jlopez.portafolio26@gmail.com',
        pass : 'Familia26'
    },
    secure : true
});

module.exports = transporter;