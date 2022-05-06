const connection = require("../db");
const bcrypt = require("bcrypt");

const resetPassword = (req, res) => {
  const { confirmedPassword, password, token } = req.body;
  connection.query(
    "SELECT * FROM users WHERE refreshToken = ?",
    [token],
    async (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
      }
      // if result.length = 0, token expired or does'nt exist
      if (results.length === 0) {
        // 409 => conflicts
        return res.status(401).send({
          message: "Le lien utilisé n'est plus valide. Veuillez réessayer.",
        });
      } else {
        if (password !== confirmedPassword) {
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
            [hashedPassword, results[0].email],
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
      }
    }
  );
};

module.exports = resetPassword;
