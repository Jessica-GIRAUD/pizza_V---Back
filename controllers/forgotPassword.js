const { sign } = require("jsonwebtoken");
const connection = require("../db");
const sendEmail = require("./sendMail");

const { RESET_KEY } = process.env;

const forgotPassword = (req, res) => {
  const { email } = req.body;

  // check if email is already registered and if passwords are same
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        res.status(500).send({ message: err.message });
      }
      // if result.length = 0, user does'nt exist
      if (results.length === 0) {
        // 409 => conflicts
        return res.status(409).send({
          message:
            "Il n'existe aucun utilisateur associé à cette adresse e-mail.",
        });
        // else if password and confirmed password are differents, send feedback
      } else {
        const user = results[0];
        const accessToken = sign({ user: user.email }, RESET_KEY, {
          expiresIn: "15m",
        });

        const sentMail = sendEmail(email, accessToken, user.firstname);

        if (sentMail !== "0") {
          const query = "UPDATE users SET refreshToken = ? WHERE email = ?";
          connection.query(query, [accessToken, email], (error, results) => {
            if (error) {
              console.log("error:", error);
              return res.status(500).send({
                message:
                  "Un problème est survenu lors de la demande de réinitialisation du mot de passe, contactez votre administrateur.",
              });
            }
            return res
              .status(200)
              .send(
                "Votre demande de réinitialisation a bien été demandée. Veuillez consulter vos e-mails."
              );
          });
        } else {
          // 502 bad_gateway
          return res.status(502).send({
            message:
              "Une erreur est survenue lors de l'envoi de l'email, contactez votre administrateur.",
          });
        }
      }
    }
  );
};

module.exports = forgotPassword;
