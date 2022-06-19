const express = require("express");

const router = express.Router();
const { getProfile, updateProfile } = require("../controllers/profile");

router.get("/:id", getProfile);
router.put("/update/:id", updateProfile);

module.exports = router;
