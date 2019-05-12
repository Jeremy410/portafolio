'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    // secure:true for port 465, secure:false for port 587
    host: 'smtp.gmail.com', 
    port: 587,
    auth: {    
        user : process.env.EMAIL,
        pass : process.env.EMAIL_PASSWORD
    },
    secure : false,
    requireTLS: true,
});

module.exports = transporter;