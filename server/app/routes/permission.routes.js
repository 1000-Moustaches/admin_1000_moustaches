module.exports = (app) => {
    const permission = require("../controllers/permission.controller.js");
    const { checkIfAuthenticated } = require("../auth/auth-middleware.js");
  
    var router = require("express").Router();
  
    // Select a permission
    router.get("/", checkIfAuthenticated, permission.getCurrentUserPermissions);
  
    app.use("/permission", router);
  };
  