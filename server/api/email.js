const Mailgen = require('mailgen');

const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Shoemanji',
    link: 'http://localhost:8080/home',
  }
});

const createdOrderEmail = {
  body: {
      name: 'John Appleseed',
      intro: `Thank you for your recent purchase! `,
      action: {
          instructions: 'To review your order, please click here:',
          button: {
              color: '#22BC66', // Optional action button color
              text: 'Confirm your account',
              link: `http://localhost:8080/user/4/orders`
          }
      },
      outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
  }
};

// Generate an HTML email with the provided contents
const emailBody = mailGenerator.generate(createdOrderEmail);
console.log('this is what emailBody looks like', typeof emailBody);

// Generate the plaintext version of the e-mail (for clients that do not support HTML)
const emailText = mailGenerator.generatePlaintext(createdOrderEmail);

// Optionally, preview the generated HTML e-mail by writing it to a local file
// require('fs').writeFileSync('preview.html', emailBody, 'utf8');

// `emailBody` now contains the HTML body,
// and `emailText` contains the textual version.
//
// It's up to you to send the e-mail.
// Check out nodemailer to accomplish this:
// https://nodemailer.com/

module.exports =  emailBody;
