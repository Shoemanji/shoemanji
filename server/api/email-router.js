const emailRouter = require('express').Router();
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

emailRouter.post('/', (req, res, next) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Shoemanji',
      link: 'http://localhost:8080/',
    }
  });

  const createdOrderEmail = {
    body: {
        name: req.user.dataValues.email,
        intro: 'Thank you for your recent purchase!',
        action: {
            instructions: 'To review your order, please click here:',
            button: {
                color: '#1E90FF', // Optional action button color
                text: 'Check your order',
                link: `http://localhost:8080/user/${req.user.dataValues.id}/orders`
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
  };

  // Generate an HTML email with the provided contents
  const emailBody = mailGenerator.generate(createdOrderEmail);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PW,
    }
  });

  let mailOptions = {
    from: process.env.EMAIL_FROM,
    to: req.user.dataValues.email,
    subject: 'Order Confirmation',
    text: 'test',
    html: emailBody,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('error in /sendmail', { err: err });
    } else {
      console.log('sucess in /sendmail', { success: info });
    }
  })
});

emailRouter.post('/notify', (req, res, next) => {

  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Shoemanji',
      link: 'http://localhost:8080/',
    }
  });

  const createdOrderEmail = {
    body: {
        name: req.body.email,
        intro: `Order status: ${req.body.status}`,
        action: {
            instructions: 'To review your order, please click here:',
            button: {
                color: '#1E90FF', // Optional action button color
                text: 'Check your order',
                link: `http://localhost:8080/user/${req.user.dataValues.id}/orders`
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
  };

  // Generate an HTML email with the provided contents
  const emailBody = mailGenerator.generate(createdOrderEmail);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PW,
    }
  });

  let mailOptions = {
    from: process.env.EMAIL_FROM,
    to: req.body.email,
    subject: `Order Status: ${req.body.status}`,
    text: 'test',
    html: emailBody,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('error in /sendmail/notify', { err: err });
    } else {
      console.log('success in /sendmail/notify', { success: info });
    }
  })
});

module.exports = emailRouter;
