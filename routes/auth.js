const express = require("express");
const router = express.Router();
const login = require("../controllers/login");
const logout = require("../controllers/logout");
const forgotPassword = require("../controllers/forgotPassword");
const resetPassword = require("../controllers/resetPassword");

router.post("/reset-password-email", forgotPassword);
router.post("/update-password", resetPassword);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
