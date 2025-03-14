const Users = require("../models/users.model");
const admin = require("./firebase-service");

const getAuthToken = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    console.warn("No token found", req.headers);
    req.authToken = null;
  }
  next();
};

// Check if authenticated user (from Firebase) exist in database
const getAuthUser = (req, res, next) => {
  return Users.findByEmail(req.authEmail, (err, data) => {
    if (err) {
      return res.status(401).send({ error: "You are not authorized to make this request" });
    }
    // Add database user in req 
    req.authUser = data;
    return next();
  });
};

// Verify authToken validity with Firebase
const checkIfAuthenticated = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      if (!authToken) {
        return res.status(401).send({ error: "You are not authorized to make this request" });
      }
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.authId = userInfo.uid;
      req.authEmail = userInfo.email;

      return next();
    } catch (e) {
      console.error(e);
      return res.status(401).send({ error: "An error occured. You are not authorized to make this request" });
    }
  });
};

module.exports = { checkIfAuthenticated, getAuthUser };
