require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports = function sendEmail(email, subject, header, text, link) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject,
    text: '',
    html: `
        <h2>${header}</h2>
        <p>${text}</p>
        <a href="${link}">${link}</a>
        `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};
