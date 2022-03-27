const connection = require("../db");
const bcrypt = require("bcrypt");

// get profile by id
const getProfile = (req, res) => {
  const { id } = req.params;
  const query = "SELECT id, firstname, lastname, email FROM users WHERE id = ?";
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send(
          "Une erreur est survenue lors de la récupération de l'utilisateur"
        );
    }
    if (result) {
      return res.status(200).json(result);
    }
  });
};

// update profile
const updateProfile = (req, res) => {
  const { id } = req.params;
  const {
    firstname,
    lastname,
    email,
    password,
    confirmedPassword,
    newPassword,
  } = req.body;
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [id],
    async (err, result) => {
      if (err) {
        console.log(req.method, req.originalUrl, err.message);
        res
          .status(500)
          .send(
            "Une erreur est survenue lors de la récupération de l'utilisateur"
          );
      }
      if (result && password && confirmedPassword && newPassword) {
        const hashedPassword = await bcrypt.hash(confirmedPassword, 10);
        const user = result[0];
        bcrypt
          .compare(password, user.passwordHash.toString())
          .then((isMatch) => {
            if (!isMatch) {
              return res.status(401).send({
                message: "Votre mot de passe initial est incorrect.",
              });
            } else if (newPassword !== confirmedPassword) {
              return res.status(409).send({
                message: "Les nouveaux mots de passe doivent être identiques.",
              });
            } else {
              const query = `UPDATE users SET firstname = ?, lastname = ?, email = ?, passwordHash = ? WHERE id = ?`;
              connection.query(
                query,
                [firstname, lastname, email, hashedPassword, id],
                (err, result) => {
                  if (err) {
                    console.log(req.method, req.originalUrl, err.message);
                    res
                      .status(500)
                      .send(
                        "Une erreur est survenue lors de la modification du profile."
                      );
                  }
                  if (result) {
                    connection.query(
                      "SELECT id, firstname, lastname, email FROM users",
                      [],
                      (err, result) => {
                        res.status(200).send(result);
                      }
                    );
                  }
                }
              );
            }
          });
      } else if (result) {
        const query = `UPDATE users SET firstname = ?, lastname = ?, email = ? WHERE id = ?`;
        connection.query(
          query,
          [firstname, lastname, email, id],
          (err, result) => {
            if (err) {
              console.log(req.method, req.originalUrl, err.message);
              res
                .status(500)
                .send(
                  "Une erreur est survenue lors de la modification du profile"
                );
            }
            if (result) {
              connection.query(
                "SELECT id, firstname, lastname, email FROM users",
                [],
                (err, result) => {
                  res.status(200).send(result);
                }
              );
            }
          }
        );
      }
    }
  );
};
module.exports = {
  getProfile,
  updateProfile,
};
