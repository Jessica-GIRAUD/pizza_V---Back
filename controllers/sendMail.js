const { GMAIL_PASSWORD, GMAIL_EMAIL } = process.env;
const mailContent = require("./EmailTemplate/mailContent");
const nodemailer = require("nodemailer");

// send email
const sendEmail = (email, token, name) => {
  const mail = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: GMAIL_EMAIL, // Your email id
      pass: GMAIL_PASSWORD, // Your password
    },
  });
  const emailContent = mailContent(token, name);

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
      return res.status(200).send("Email correctement envoyé.");
    }
  });
};

module.exports = sendEmail;
