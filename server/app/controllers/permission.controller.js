const Permission = require("../models/permission.model.js");


// Find a single Animals with a id
exports.getCurrentUserPermissions = (req, res) => {
  const id = 1;

  Permission.findByUserId(id, (err, data) => { 
    if (err)
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving Permission with id ${id}.`,
          
      });
    else res.send(data);
  });
}


