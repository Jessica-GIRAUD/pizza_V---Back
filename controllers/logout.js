const connection = require("../db");

const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.token) return res.sendStatus(204); // No content to send back
  const refreshToken = cookies.token;

  // is valid refreshToken in db ?
  connection.query(
    "SELECT * FROM users WHERE refreshToken = ?;",
    [refreshToken],
    (err, result) => {
      if (result) {
        const user = result[0];

        if (!user) {
          res.clearCookie("token", { httpOnly: true });
          return res.sendStatus(204); // No content to send back
        }
        // delete no more valid refreshToken in DB
        connection.query("UPDATE users SET refreshToken = ? WHERE email = ?;", [
          null,
          user.email,
        ]);
      }
    }
  );
  res.clearCookie("token", { httpOnly: true });
  res.sendStatus(204); // No content to send back
};

module.exports = logout;
