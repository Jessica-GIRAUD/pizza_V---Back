const express = require("express");
const router = express.Router();
const connection = require("../db");

// create pizza
const createPizza = async (req, res) => {
  const { name, description, price, base_name } = req.body;
  const query = `INSERT INTO pizza (name, description, price, base_id) VALUES ('${name}', '${description}', ${price}, (SELECT id FROM base WHERE name='${base_name}'));`;
  connection.query(query, [], (err, result) => {
    if (err) {
      console.log(req.method, req.originalUrl, err.message);
      res.status(500).send("Error while creating pizzas");
    }
    if (result) {
      connection.query(
        "SELECT p.id, p.name, p.description, p.price, base.name AS base_name FROM pizza p LEFT JOIN base ON base_id = base.id",
        [],
        (err, result) => {
          res.status(200).send(result);
        }
      );
    }
  });
};

// get pizza by id
const getPizza = (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT p.id, p.name, p.description, p.price, base.name AS base_name FROM pizza p LEFT JOIN base ON base_id = base.id WHERE p.id = ?";
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error while getting pizzas");
    }
    if (result) {
      return res.status(200).json(result);
    }
  });
};

// update pizza
const updatePizza = (req, res) => {
  const { name, description, price, base_name } = req.body;
  const updated_pizza = { name, description, price };
  const query = `UPDATE pizza SET 
  base_id = (SELECT base.id FROM base WHERE base.name = '${base_name}' ),
  ? WHERE id = ?`;
  const pizza_id = req.params.id;

  connection.query(query, [updated_pizza, pizza_id], (err, result) => {
    if (err) {
      console.log(req.method, req.originalUrl, err.message);
      res
        .status(500)
        .send("Une erreur est survenue lors de la modification de la pizza");
    }
    if (result) {
      connection.query(
        "SELECT p.id, p.name, p.description, p.price, base.name AS base_name FROM pizza p LEFT JOIN base ON base_id = base.id",
        [],
        (err, result) => {
          res.status(200).send(result);
        }
      );
    }
  });
};

// delete pizza
const deletePizza = (req, res) => {
  const pizza_id = req.params.id;
  const query = "DELETE FROM pizza WHERE id = ?";
  connection.query(query, [pizza_id], (err, result) => {
    if (err) {
      console.log(req.method, req.originalUrl, err.message);
      res.status(500).send("Error while deleting pizza");
    }
    if (result) {
      connection.query(
        "SELECT p.id, p.name, p.description, p.price, base.name AS base_name FROM pizza p LEFT JOIN base ON base_id = base.id",
        [],
        (err, result) => {
          res.status(200).send(result);
        }
      );
    }
  });
};

module.exports = { createPizza, updatePizza, deletePizza, getPizza };
