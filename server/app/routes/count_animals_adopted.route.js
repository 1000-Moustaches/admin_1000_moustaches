module.exports = (app) => {
    const CountAnimalsAdopted = require("../controllers/count_animal_adopted.controller.js");
    const { checkIfAuthenticated } = require("../auth/auth-middleware.js");
  
    const router = require("express").Router();
  
    router.get("/", checkIfAuthenticated, CountAnimalsAdopted.findAll);
  
    app.use("/countAnimalsAdopted", router);
  };
  