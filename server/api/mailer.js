const nodemailer = require('nodemailer');
const emailBody = require('./email');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
  if (err) return console.log(err);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PW,
    }
  });

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });

  let mailOptions = {
    from: 'shoemanji.confirmation@gmail.com',
    to: 'alfonso.a.millan@gmail.com',
    subject: 'Order Confirmation1',
    text: 'testtt2',
    html: emailBody,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return console.log('err', err);
    console.log('info', info);
  })

});
