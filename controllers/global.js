const connection = require("../db");

const getAllContacts = (req, res) => {
  connection.query("SELECT * FROM contact", [], (err, result) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send(
          "Une erreur est survenue lors de la récupération des contacts, contactez votre administrateur."
        );
    }
    if (result) {
      return res.status(200).json(result);
    }
  });
};

const getAllPizzas = (req, res) => {
  const query =
    "SELECT p.id, p.name, p.description, p.price, base.name AS base_name FROM pizza p LEFT JOIN base ON base_id = base.id";
  connection.query(query, [], (err, result) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send(
          "Une erreur est survenue lors de la récupération des pizzas, contactez votre administrateur."
        );
    }
    if (result) {
      return res.status(200).json(result);
    }
  });
};

// get all actus
const getAllActus = (req, res) => {
  connection.query(
    "SELECT * FROM actualites ORDER BY actualites.priority ASC",
    [],
    (err, result) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send(
            "Une erreur est survenue lors de la récupération des actualités, contactez votre administrateur."
          );
      }
      if (result) {
        return res.status(200).json(result);
      }
    }
  );
};

const getWelcome = (req, res) => {
  res.send("Bienvenue sur le serveur du site de Pizza Kika !");
};

module.exports = {
  getAllContacts,
  getAllPizzas,
  getAllActus,
  getWelcome,
};
