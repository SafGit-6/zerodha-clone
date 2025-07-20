const express = require('express');
const router = express.Router();
const sendMail = require('../util/mailer');

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP

  try {
    await sendMail(email, otp);
    res.status(200).json({ message: 'OTP sent successfully', otp }); // You can omit `otp` in production
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
}); 

module.exports = router;
