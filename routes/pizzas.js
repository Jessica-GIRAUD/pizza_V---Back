const express = require("express");
const router = express.Router();
const connection = require("../db");

// get all pizzas
router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM pizza";
    res.setHeader("Access-Control-Allow-Origin", "*");
    const [rows] = await connection.promise().query(query);
    res.status(200).json(rows);
  } catch (err) {
    console.log(req.method, req.originalUrl, err.message);
    res.status(500).send("Error while getting tomato pizzas");
  }
});

// create pizza
router.post("/create", async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const { name, description, price, base } = req.body;
    const query = `INSERT INTO pizza (name, description, price, base_idbase) VALUES ('${name}', '${description}', ${price}, (SELECT idbase FROM base WHERE name='${base}'));`;
    connection
      .promise()
      .query(query)
      .then(() => {
        res.status(200).send("Pizza succesfully saved !");
      });
  } catch (err) {
    console.log(req.method, req.originalUrl, err.message);
    res.status(500).send("Error while creating pizzas");
  }
});

// update pizza
router.put("/update/:id", (req, res) => {
  const { name, description, price, base } = req.body;
  const updated_pizza = { name, description, price };
  const query = `UPDATE pizza SET 
  base_idbase = (SELECT base_idbase FROM base WHERE base.name = '${base}' ),
  ? WHERE idpizza = ?`;
  const pizza_id = req.params.id;
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    connection
      .promise()
      .query(query, [updated_pizza, pizza_id])
      .then(() => {
        res.status(200).send("Pizza succesfully updated !");
      });
  } catch (err) {
    console.log(req.method, req.originalUrl, err.message);
    res.status(500).send("Error while updating pizza");
  }
});

// delete pizza
router.delete("/delete/:id", (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const pizza_id = req.params.id;
    const query = "DELETE FROM pizza WHERE idpizza = ?";
    connection
      .promise()
      .query(query, [pizza_id])
      .then(() => {
        res.status(200).send("Pizza succesfully deleted !");
      });
  } catch (err) {
    console.log(req.method, req.originalUrl, err.message);
    res.status(500).send("Error while deleting pizza");
  }
});

module.exports = router;
