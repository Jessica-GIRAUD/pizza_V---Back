const connection = require("../db");

const getAllContacts = (req, res) => {
  connection.query(
    "SELECT jour, horaire FROM horaires;",
    [],
    (error, horaires) => {
      if (error) {
        console.log(error);
        res
          .status(500)
          .send(
            "Une erreur est survenue lors de la récupération des horaires."
          );
      }
      if (horaires) {
        const query = "SELECT * FROM contact WHERE id = 1 ";
        connection.query(query, [], (err, contact) => {
          if (err) {
            console.log(err);
            res
              .status(500)
              .send(
                "Une erreur est survenue lors de la récupération du contact."
              );
          }

          return res.status(200).send({ ...contact[0], horaires });
        });
      }
    }
  );
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
    return res.status(200).json(result);
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
      return res.status(200).json(result);
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
