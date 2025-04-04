const CountAnimalsNonAdopted = require("../models/count_animals_non_adopted.model.js");

exports.findAll = (req, res) => {
  CountAnimalsNonAdopted.getAll((err, data) => {
    if (err) {
      console.error("count_animal_non_adopted.controller Error", err);
      res.status(200).send(0);
    }
    else {
      res.status(200).send(data);
    }
  });
}
