const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

// Authorisation - Checks if JWT is provided, and whether legal or not
verifyToken = (req, res, next) => {
  // Access Token from frontend
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    // Validates the token
    req.email = decoded.email;
    next();
  });
};

isAnyUser = (req, res, next) => {
  User.findByPk(req.email)
    .then((user) => {
      user.getRole().then((role) => {
        if (role.role_type === "admin" || "user") {
          next();
          return;
        }

        res.status(403).send({
          message: "Require User or Admin Role!",
        });
        return;
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.email)
    .then((user) => {
      user.getRole().then((role) => {
        if (role.role_type === "admin") {
          next();
          return;
        }

        res.status(403).send({
          message: "Require Admin Role!",
        });
        return;
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const authJwt = {
  verifyToken: verifyToken,
  isAnyUser: isAnyUser,
  isAdmin: isAdmin,
};
module.exports = authJwt;
