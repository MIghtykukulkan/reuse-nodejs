const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function sendEmailNotification(_to, _subject, _content) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
   // testAccount.user = "perfecteditortool@gmail.com";

    // create reusable transporter object using the default SMTP transport
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

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendEmailNotification('uma.s.shankar@gmail.com', 'test subject', "test content");