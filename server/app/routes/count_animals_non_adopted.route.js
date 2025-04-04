module.exports = (app) => {
    const CountAnimalsNonAdopted = require("../controllers/count_animal_non_adopted.controller.js");
    const { checkIfAuthenticated } = require("../auth/auth-middleware.js");
  
    const router = require("express").Router();
  
    router.get("/", checkIfAuthenticated, CountAnimalsNonAdopted.findAll);
  
    app.use("/countAnimalsNonAdopted", router);
  };
  