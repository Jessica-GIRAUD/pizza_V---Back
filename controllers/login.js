const connection = require("../db");
const bcrypt = require("bcrypt");
const { createJWT, refreshJWT } = require("../middlewares/jwt");

const login = async (req, res) => {
  const { email, password } = req.body;

  // check if fields are filled
  if (req.body.email.trim() === "" || req.body.password.trim() === "") {
    return res
      .status(400)
      .send({ message: "Veuillez renseigner tous les champs." });
  }

  // check if user with this email exists or not in DB
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        return res.status(400).send({
          message: err,
        });
      }
      // if there is no user with this email return feedback
      if (result.length === 0) {
        return res.status(401).send({
          input: "email",
          message: "Cet identifiant n'existe pas/est incorrect.",
        });
      }

      // if there is existing user => check password
      else {
        const user = result[0];
        bcrypt
          .compare(password, user.passwordHash.toString())
          .then((isMatch) => {
            if (isMatch === false) {
              return res.status(401).send({
                input: "password",
                message: "Votre mot de passe est incorrect.",
              });
            }
          });

        const accessToken = createJWT(user);
        const refreshedToken = refreshJWT(user);

        // saving refresh token in DB
        connection.query("UPDATE users SET refreshToken = ? WHERE email = ?;", [
          refreshedToken,
          email,
        ]);
        // saving refresh token in cookie
        res.cookie("token", refreshedToken, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true,
        });

        // send access token to front end
        return res.status(200).send({
          loggedIn: true,
          accessToken,
          user: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
          },
        });
      }
    }
  );
};

module.exports = login;
