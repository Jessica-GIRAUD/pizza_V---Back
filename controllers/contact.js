const connection = require("../db");

// get one contact
const getContact = (req, res) => {
  // get horaires associated to the contact
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
        // then get contact informations
        const query = "SELECT * FROM contact;";
        connection.query(query, [], (err, contact) => {
          if (err) {
            console.log(err);
            res
              .status(500)
              .send(
                "Une erreur est survenue lors de la récupération du contact."
              );
          }
          const data = [{ ...contact[0], horaires }];
          return res.status(200).send(data);
        });
      }
    }
  );
};

// update contact
const updateContact = (req, res) => {
  const { horaires, logo, address, post_code, city, phone } = req.body;
  const contact = { logo, address, post_code, city, phone };

  const newHoraires = horaires.map(({ jour, horaire }) => [jour, horaire]);

  const contact_id = req.params.id;
  const contactQuery = `UPDATE contact SET ? WHERE id = ?;`;
  const horairesQuery = `TRUNCATE horaires; INSERT INTO horaires (jour, horaire) VALUES ?;`;

  // update contact with values from form
  connection.query(
    contactQuery,
    [contact, contact_id],
    (updateContactError) => {
      if (updateContactError) {
        console.log(req.method, req.originalUrl, updateContactError.message);
        res
          .status(500)
          .send("Une erreur est survenue lors de la modification du contact.");
      }
      // then update horaires with new array of horaires
      connection.query(horairesQuery, [newHoraires], (updateHorairesError) => {
        if (updateHorairesError) {
          console.log(req.method, req.originalUrl, updateHorairesError.message);
          res
            .status(500)
            .send(
              "Une erreur est survenue lors de la modification du contact."
            );
        }

        // get horaires associated to the contact
        connection.query(
          "SELECT jour, horaire FROM horaires;",
          [],
          (getHorairesError, horairesResults) => {
            if (getHorairesError) {
              console.log(getHorairesError);
              res
                .status(500)
                .send(
                  "Une erreur est survenue lors de la récupération des horaires."
                );
            }

            // then get contact informations
            const query = "SELECT * FROM contact";
            connection.query(query, [], (getContactError, contactResults) => {
              if (getContactError) {
                console.log(getContactError);
                res
                  .status(500)
                  .send(
                    "Une erreur est survenue lors de la récupération du contact."
                  );
              }
              const data = [
                { ...contactResults[0], horaires: horairesResults },
              ];
              return res.status(200).send(data);
            });
          }
        );
      });
    }
  );
};

module.exports = {
  updateContact,
  getContact,
};
