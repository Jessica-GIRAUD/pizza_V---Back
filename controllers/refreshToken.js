const { verify, sign } = require("jsonwebtoken");
const connection = require("../db");
const { REFRESH_KEY, SECRET_KEY } = process.env;

const refreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies.token) return res.sendStatus(401);
  const refreshToken = cookies.token;

  connection.query(
    "SELECT * FROM users WHERE refreshToken = ?;",
    [refreshToken],
    (err, result) => {
      if (result) {
        const user = result[0];

        if (!user) return res.sendStatus(403); // Forbidden

        verify(refreshToken, REFRESH_KEY, (err, decoded) => {
          if (err || user.email !== decoded.user)
            return res.status(403).send(err);
          const accessToken = sign({ user: decoded.user.email }, SECRET_KEY, {
            expiresIn: "1h",
          });
          res.json({ accessToken });
        });
      }
    }
  );
};

module.exports = refreshToken;
