const express = require("express");

const router = express.Router();
const {
  createPizza,
  updatePizza,
  deletePizza,
  getPizza,
} = require("../controllers/pizza");

router.post("/create", createPizza);
router.get("/:id", getPizza);
router.put("/update/:id", updatePizza);
router.delete("/delete/:id", deletePizza);

module.exports = router;
