// Import the Nodemailer library
const nodemailer = require('nodemailer');

module.exports.sendMail = (email, subject, content) => {
  const secure = process.env.EMAIL_SECURE == "true" ? true : false;
  
  // Create a transporter object
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: secure, // use false for STARTTLS; true for SSL on port 465
    auth: {
      user: process.env.EMAIL_USERNAME_NODEMAILER,
      pass: process.env.EMAIL_PASSWORD_NODEMAILER,
    }
  });

  // Configure the mailoptions object
  const mailOptions = {
    from: 'dtn06052005@gmail.com',
    to: email,
    subject: subject,
    html: content
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent: ', info.response);
    }
  });
}