const nodemailer = require('nodemailer');
require('dotenv').config();

const sendPasswordResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,  // Your Gmail address
            pass: "sopj qsfd stwf gein",  // App Password or Gmail password (if less secure apps enabled)
        }
    });

    const resetUrl = `http://localhost:3001/reset-password/${token}`;
    const mailOptions = {
        from: 'SLAB <christopher.ferraro34@gmail.com>',
        to: email,
        subject: 'Password Reset Request',
        html: `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f9;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            color: #333;
                            font-size: 24px;
                            text-align: center;
                        }
                        p {
                            color: #666;
                            font-size: 16px;
                            line-height: 1.6;
                        }
                        .button {
                            display: inline-block;
                            padding: 12px 24px;
                            background-color: tomato;
                            color: white;
                            font-size: 16px;
                            text-decoration: none;
                            border-radius: 4px;
                            text-align: center;
                        }
                        .button:hover {
                            background-color: #ff6347;
                        }
                        footer {
                            margin-top: 20px;
                            text-align: center;
                            font-size: 14px;
                            color: #888;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Password Reset</h1>
                        <p>Hi there,</p>
                        <p>We received a request to reset your password. Click the button below to reset your password:</p>
                        <a href="${resetUrl}" class="button">Reset Password</a>
                        <p>If you didn’t request this, you can ignore this email. Your password will not be changed.</p>
                    </div>
                    <footer>
                        <p>&copy; 2025 SLAB. All rights reserved.</p>
                    </footer>
                </body>
            </html>
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
