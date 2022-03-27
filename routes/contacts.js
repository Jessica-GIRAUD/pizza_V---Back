const express = require("express");
const router = express.Router();
const { updateContact, getContact } = require("../controllers/contact");

router.get("/:id", getContact);
router.put("/update/:id", updateContact);

module.exports = router;
