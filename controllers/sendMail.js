const { GMAIL_PASSWORD, GMAIL_EMAIL, CLIENT_URL } = process.env;
const mailContent = require("./mailContent");
const nodemailer = require("nodemailer");

// send email
const sendEmail = (email, token) => {
  const mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_EMAIL, // Your email id
      pass: GMAIL_PASSWORD, // Your password
    },
  });
  const emailContent = mailContent(token, CLIENT_URL);

  const mailOptions = {
    from: GMAIL_EMAIL,
    to: email,
    subject: "Demande de réinitialisation du mot de passe - Pizza Kika",
    html: emailContent,
  };

  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("error", error);
      return error;
    } else {
      console.log("Email correctement envoyé.");
      return 0;
    }
  });
};

module.exports = sendEmail;
