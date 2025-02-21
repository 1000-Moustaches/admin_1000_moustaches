module.exports = (app) => {
    const permission = require("../controllers/permission.controller.js");
    const { checkIfAuthenticated, getAuthUser } = require("../auth/auth-middleware.js");
  
    var router = require("express").Router();
  
    // Select a permission
    router.get("/", checkIfAuthenticated, getAuthUser,permission.getCurrentUserPermissions);
  
    app.use("/permissions", router);
  };
  