const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function sendEmailNotification(_to, _subject, _content) {
  
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'perfecteditortool@gmail.com',
               pass: '#Include1'
           },
        tls:{ rejectUnauthorized: false}
        });
    // send mail with defined transport object
  
    let info = await transporter.sendMail({
        from: '"perfect editor tool " <perfecteditortool@gmail.com>', // sender address
        to: _to, // list of receivers
        subject: _subject, // Subject line
        text: _content, // plain text body
         // html body
    });

    logger.debug('Message sent: %s', info.messageId);
  
}

sendEmailNotification('uma.s.shankar@gmail.com', 'test subject', "test content");