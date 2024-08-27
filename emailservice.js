const nodemailer = require('nodemailer');

// Transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send email
const sendEmail = (from, to, subject, text) => {
    const mailOptions = {
        from: from, // Dynamic sender address
        to: to,    // Dynamic recipient address
        subject: subject, // Subject of the email
        text: text // Body of the email
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                resolve({ success: false, message: 'Failed to send email' });
            } else {
                console.log('Email sent: ' + info.response);
                resolve({ success: true, message: 'Email sent successfully' });
            }
        });
    });
};

module.exports = { sendEmail };
