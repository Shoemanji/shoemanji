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
    if (err) res.sendStatus(401).json({ err: info });
    res.sendStatus(200).json({ success: true });
  })
});

emailRouter.post('/notify', (req, res, next) => {
  console.log('req body is in /notify', req.body);

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
    to: req.user.dataValues.email,
    subject: `Order Status: ${req.body.status}`,
    text: 'test',
    html: emailBody,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) res.sendStatus(401).json({ err: info });
    res.sendStatus(200).json({ success: true });
  })
});

module.exports = emailRouter;
