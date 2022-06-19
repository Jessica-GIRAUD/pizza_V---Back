const express = require("express");

const router = express.Router();
const {
  createActu,
  updateActu,
  deleteActu,
  getActu,
} = require("../controllers/actu");

router.get("/:id", getActu);
router.post("/create", createActu);
router.put("/update/:id", updateActu);
router.delete("/delete/:id", deleteActu);

module.exports = router;
