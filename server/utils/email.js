const nodemailer = require('nodemailer');

const sendPasswordResetEmail = async (email, token) => {
// Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: "beec2dac75687c",
        pass: "9691e2287d0e9c"
        }
    });

  const resetUrl = `http://localhost:3001/reset-password/${token}`;
  const mailOptions = {
    from: 'Crater <no-reply@yourdomain.com>',
    to: email,
    subject: 'Password Reset Request',
    text: `Click on this link to reset your password: ${resetUrl}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendPasswordResetEmail };
