const express = require("express");
const router = express.Router();
const connection = require("../db");

// create pizza
const createPizza = async (req, res) => {
  const { name, description, price, base } = req.body;
  const query = `INSERT INTO pizza (name, description, price, base_idbase) VALUES ('${name}', '${description}', ${price}, (SELECT idbase FROM base WHERE name='${base}'));`;
  connection.query(query, [], (err, result) => {
    if (err) {
      console.log(req.method, req.originalUrl, err.message);
      res.status(500).send("Error while creating pizzas");
    }
    if (result) {
      res.status(200).send("Pizza succesfully saved !");
    }
  });
};

// update pizza
const updatePizza = (req, res) => {
  const { name, description, price, base } = req.body;
  const updated_pizza = { name, description, price };
  const query = `UPDATE pizza SET 
  base_idbase = (SELECT base_idbase FROM base WHERE base.name = '${base}' ),
  ? WHERE idpizza = ?`;
  const pizza_id = req.params.id;
  try {
    connection.query(query, [updated_pizza, pizza_id]).then(() => {
      res.status(200).send("Pizza succesfully updated !");
    });
  } catch (err) {
    console.log(req.method, req.originalUrl, err.message);
    res.status(500).send("Error while updating pizza");
  }
};

// delete pizza
const deletePizza = (req, res) => {
  try {
    const pizza_id = req.params.id;
    const query = "DELETE FROM pizza WHERE idpizza = ?";
    connection.query(query, [pizza_id]).then(() => {
      res.status(200).send("Pizza succesfully deleted !");
    });
  } catch (err) {
    console.log(req.method, req.originalUrl, err.message);
    res.status(500).send("Error while deleting pizza");
  }
};

module.exports = { createPizza, updatePizza, deletePizza };
