const connection = require("../db");
const bcrypt = require("bcrypt");

const register = (req, res) => {
  const { password, firstname, lastname, email, confirmedPassword } = req.body;

  // check if email is already registered and if passwords are same
  connection.query(
    "SELECT * FROM users WHERE email = ? AND firstname = ? AND lastname = ?",
    [email, firstname, lastname],
    async (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
      }
      // if result, user already exist
      if (results.length === 0) {
        // 409 => conflicts
        return res.status(409).send({
          message: "Il n'existe aucun utilisateur associé à ces informations.",
        });
        // else if password and confirmed password are differents, send feedback
      } else if (password !== confirmedPassword) {
        return res.status(409).send({
          message: "Les mots de passe doivent être identiques.",
          input: "password",
        });
        // else (if everything is ok), bcrypt password
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        // then, insert user in DB
        const query =
          "UPDATE users SET passwordHash = ?  WHERE email = ? AND firstname = ? AND lastname = ?";
        connection.query(
          query,
          [hashedPassword, email, firstname, lastname],
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
  );
};

module.exports = register;
