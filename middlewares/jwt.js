const { sign, verify } = require("jsonwebtoken");
const { SECRET_KEY, REFRESH_KEY } = process.env;

// generate token
const createJWT = (user) => {
  const accessToken = sign({ user: user.email }, SECRET_KEY, {
    expiresIn: "15m",
  });
  return accessToken;
};
// refresh token
const refreshJWT = (user) => {
  const refreshToken = sign({ user: user.email }, REFRESH_KEY, {
    expiresIn: "1d",
  });
  return refreshToken;
};

// validate token

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  // console.log(authHeader); // Bearer token
  const token = authHeader.split(" ")[1];
  verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    req.user = decoded.user;
    next();
  });
};

module.exports = { createJWT, refreshJWT, verifyJWT };
