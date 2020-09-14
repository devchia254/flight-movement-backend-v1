const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

// Checks if JWT is provided, and whether legal or not
verifyToken = (req, res, next) => {
  // Token stored in HTTP Header
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
    // console.log(decoded);
    req.email = decoded.email;
    next();
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
  isAdmin: isAdmin,
};
module.exports = authJwt;
