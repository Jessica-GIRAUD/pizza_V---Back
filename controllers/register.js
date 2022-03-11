const connection = require("../db");
const bcrypt = require("bcrypt");

const register = (req, res) => {
  const { password, firstname, lastname, email, confirmedPassword } = req.body;

  // check if email is already registered and if passwords are same
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
      }
      // if result, user already exist
      if (results.length > 0) {
        // 409 => conflicts
        return res
          .status(409)
          .send({ input: "email", message: "Cet email est déjà utilisé." });
        // else if password and confirmed password are differents, send feedback
      } else if (password !== confirmedPassword) {
        return res.status(409).send({
          input: "password",
          message: "Les mots de passe doivent être identiques.",
        });
        // else (if everything is ok), bcrypt password
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        // then, insert user in DB
        const query =
          "INSERT INTO users (firstname, lastname, email, passwordHash) VALUES (?,?,?,?)";
        connection.query(
          query,
          [firstname, lastname, email, hashedPassword],
          (error, results) => {
            if (error) {
              console.log("error:", error);
              return res.status(500).send({
                message:
                  "Un problème est survenu, contactez votre administrateur.",
              });
            }
            return res.status(201).send({
              message: "User successfully registred",
            });
          }
        );
      }
    }
  );
};

module.exports = register;
