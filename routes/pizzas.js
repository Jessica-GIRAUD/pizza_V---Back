const express = require("express");
const router = express.Router();
const {
  createPizza,
  updatePizza,
  deletePizza,
} = require("../controllers/pizza");

router.post("/create", createPizza);
router.put("/update/:id", updatePizza);
router.delete("/delete/:id", deletePizza);

module.exports = router;
