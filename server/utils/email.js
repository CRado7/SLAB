const nodemailer = require('nodemailer');
require('dotenv').config(); 

const sendPasswordResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,  // Your Gmail address
            pass: "sopj qsfd stwf gein"   // App Password or Gmail password (if less secure apps enabled)
        }
    });

    const resetUrl = `http://localhost:3001/reset-password/${token}`;
    const mailOptions = {
        from: 'SLAB <christopher.ferraro34@gmail.com>',
        to: email,
        subject: 'Password Reset Request',
        html: `
            <h1>Password Reset</h1>
            <p>Click the link below to reset your password:</p>
            <a href="${resetUrl}" style="padding: 10px; background: tomato; color: white; text-decoration: none;">Reset Password</a>
            <p>If you didn't request this, you can ignore this email.</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully');
    } catch (error) {
        console.error('Error sending password reset email:', error);
    }
};

module.exports = { sendPasswordResetEmail };