const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getAllPizzas,
  getAllActus,
  getWelcome
} = require("../controllers/global");

router.get("/", getWelcome);
router.get("/contact", getAllContacts);
router.get("/pizzas", getAllPizzas);
router.get("/actus", getAllActus);

module.exports = router;
