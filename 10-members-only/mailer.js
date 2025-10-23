const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

// Optional: verify connection
transport.verify(function(error, success) {
  if (error) {
    console.log("Mailer Error:", error);
  } else {
    console.log("Mailer ready to send messages");
  }
});

module.exports = transport;
