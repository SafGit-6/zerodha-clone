const nodemailer = require('nodemailer');
require('dotenv').config();

const email = process.env.EMAIL_USER;
const password = process.env.EMAIL_PASS;

// Use your credentials
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: email,
    pass: password, // Use App Password, NOT your Gmail password
  },
});

const sendMail = (to, otp) => {
  const mailOptions = {
    from: email,
    to,
    subject: 'Your OTP Code',
    html: `<h2>Your OTP is <strong>${otp}</strong></h2>`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
