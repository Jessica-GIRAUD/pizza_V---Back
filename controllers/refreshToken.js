const { verify, sign } = require("jsonwebtoken");
const connection = require("../db");

const { REFRESH_KEY, SECRET_KEY } = process.env;

const refreshToken = (req, res) => {
  const { cookies } = req;
  if (!cookies.token) return res.sendStatus(401);
  const refreshedToken = cookies.token;

  connection.query(
    "SELECT * FROM users WHERE refreshToken = ?;",
    [refreshedToken],
    (err, result) => {
      if (result) {
        const user = result[0];

        if (!user) return res.sendStatus(403); // Forbidden

        verify(refreshToken, REFRESH_KEY, (err, decoded) => {
          if (err || user.email !== decoded.user)
            return res.status(403).send(err);
          const accessToken = sign({ user: decoded.email }, SECRET_KEY, {
            expiresIn: "1h",
          });
          res.status(200).send({
            loggedIn: true,
            accessToken,
            user: {
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
            },
          });
        });
      }
    }
  );
};

module.exports = refreshToken;
