const express = require("express");
const router = express.Router();
const login = require("../controllers/login");
const logout = require("../controllers/logout");
const register = require("../controllers/register");
const { verifyJWT } = require("../middlewares/jwt");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
