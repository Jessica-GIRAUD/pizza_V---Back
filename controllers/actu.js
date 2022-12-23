const connection = require("../db");

const getAllQuery = "SELECT * FROM actualites;";

// create actu
const createActu = async (req, res) => {
  const { name, description, priority } = req.body;
  const query = `INSERT INTO actualites (name, description, priority) VALUES (?, ?, ?);`;

  connection.query(query, [name, description, priority], (err, result) => {
    if (err) {
      console.log(req.method, req.originalUrl, err.message);
      res
        .status(500)
        .send("Une erreur est survenue lors de la création de l'actualité");
    }
    if (result) {
      connection.query(getAllQuery, [], (error, actu) => {
        res.status(200).send(actu);
      });
    }
  });
};

// get actu by id
const getActu = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM actualites WHERE id = ?";
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send("Une erreur est survenue lors de la récupération de l'actualité");
    }
    if (result) {
      return res.status(200).json(result);
    }
  });
};

// update actu
const updateActu = (req, res) => {
  const actu_id = req.params.id;
  const query = `UPDATE actualites SET ? WHERE id = ?`;

  connection.query(query, [req.body, actu_id], (error, results) => {
    if (error) {
      console.log(req.method, req.originalUrl, error.message);
      res
        .status(500)
        .send("Une erreur est survenue lors de la modification de l'actualité");
    }
    if (results) {
      connection.query(getAllQuery, [], (err, result) => {
        res.status(200).send(result);
      });
    }
  });
};

// delete pizza
const deleteActu = (req, res) => {
  const actu_id = req.params.id;
  const query = "DELETE FROM actualites WHERE id = ?";
  connection.query(query, [actu_id], (err, result) => {
    if (err) {
      console.log(req.method, req.originalUrl, err.message);
      res
        .status(500)
        .send("Une erreur est survenue lors de la suppression de l'actualité");
    }
    if (result) {
      connection.query(getAllQuery, [], (error, results) => {
        res.status(200).send(results);
      });
    }
  });
};

module.exports = { createActu, updateActu, deleteActu, getActu };
