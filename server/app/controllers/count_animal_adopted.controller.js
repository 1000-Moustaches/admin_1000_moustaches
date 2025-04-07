const CountAnimalsAdopted = require("../models/count_animals_adopted.model.js");

exports.findAll = (req, res) => {
  CountAnimalsAdopted.getAll((err, data) => {
    if (err) {
      console.error("count_animal_adopted.controller Error", err);
      res.status(200).send(0);
    }
    else {
      res.status(200).send(data);
    }
  });
}
