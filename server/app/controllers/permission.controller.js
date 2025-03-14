const Permission = require("../models/permission.model.js");



exports.getCurrentUserPermissions = (req, res) => {
  if (req.authUser === null) {
    return res.status(401).send({ error: "You are not authorized to make this request" });
  }  
  const id = req.authUser.id;
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


