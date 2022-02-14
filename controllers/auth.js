const connection = require("../db");
const bcrypt = require("bcrypt");

exports.register = (req, res) => {
  const { password, firstname, lastname, email, confirmedPassword } = req.body;

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results.length > 0) {
        console.log("results", results);
        return res
          .status(409)
          .send({ input: "email", message: "Cet email est déjà utilisé." });
      } else if (password !== confirmedPassword) {
        console.log("are same ?", password === confirmedPassword);
        return res.status(409).send({
          input: "password",
          message: "Les mots de passe doivent être identiques.",
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hash", hashedPassword);

        const query =
          "INSERT INTO users (firstname, lastname, email, passwordHash) VALUES (?,?,?,?)";
        connection
          .promise()
          .query(
            query,
            [firstname, lastname, email, hashedPassword],
            (error, results) => {
              if (error) {
                console.log("error:", error);
                return res.status(500).send({
                  message:
                    "Un problème est survenu, contactez votre administrateur.",
                });
              } else {
                console.log("results", results);
                res.status(200).send({ message: `Bienvenue ${firstname}` });
              }
            }
          );
      }
    }
  );
};
