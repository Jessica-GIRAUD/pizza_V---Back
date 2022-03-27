const connection = require("../db");

const getContactQuery = "SELECT * FROM contact";

// get one contact
const getContact = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM contact WHERE id = ? ";
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send("Une erreur est survenue lors de la récupération du contact");
    }
    if (result) {
      return res.status(200).json(result);
    }
  });
};

// update contact
const updateContact = (req, res) => {
  const contact_id = req.params.id;
  const query = `UPDATE contact SET ? WHERE id = ?`;

  connection.query(query, [req.body, contact_id], (err, result) => {
    if (err) {
      console.log(req.method, req.originalUrl, err.message);
      res
        .status(500)
        .send("Une erreur est survenue lors de la modification du contact");
    }
    if (result) {
      connection.query(getContactQuery, [], (err, result) => {
        res.status(200).send(result);
      });
    }
  });
};

module.exports = {
  updateContact,
  getContact,
};
