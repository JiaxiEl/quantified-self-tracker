import dotenv from 'dotenv';
dotenv.config();

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',  // Assuming you're using Gmail
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'chris07181994@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email.',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.error('Error sending email:', error);
    }
    console.log('Email sent:', info.response);
});
