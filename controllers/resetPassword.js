const connection = require("../db");
const bcrypt = require("bcrypt");
const { RESET_KEY } = process.env;

const resetPassword = (req, res) => {
  const { confirmedPassword, password, token } = req.body;
  console.log("req.body", req.body);

  connection.query(
    "SELECT * FROM users WHERE refreshToken = ?;",
    [token],
    (err, result) => {
      if (error) {
        return res.status(500).send({
          message:
            "Un problème est survenu lors de la vérification du token, contactez votre administrateur.",
        });
      }

      const user = result[0];

      verify(token, RESET_KEY, async (err, decoded) => {
        if (err || user.email !== decoded.user) {
          // if err, token expired or not exists
          return res.status(401).send({
            message: "Le lien utilisé n'est plus valide. Veuillez réessayer.",
          });
        }

        if (password !== confirmedPassword) {
          // 409 => conflicts
          return res.status(409).send({
            message: "Les mots de passe doivent être identiques.",
            input: "password",
          });
        } else {
          const hashedPassword = await bcrypt.hash(password, 10);
          // then, insert user in DB
          const query = "UPDATE users SET passwordHash = ?  WHERE email = ?";
          connection.query(
            query,
            [hashedPassword, user.email],
            (error, results) => {
              if (error) {
                console.log("error:", error);
                return res.status(500).send({
                  message:
                    "Un problème est survenu lors de la modification du compte, contactez votre administrateur.",
                });
              }
              return res.status(200).send("Votre compte a bien été modifié");
            }
          );
        }
      });
    }
  );
};

module.exports = resetPassword;
