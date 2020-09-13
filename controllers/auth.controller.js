const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op; // Access SQL operators

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
// CONTROLLER FOR TESTING AUTHENTICATION
exports.signup = (req, res) => {
  // Save User to Database
  const roleCheck = (role) => {
    switch (role) {
      case "admin":
        return 2;
      case "user":
        return 1;
      default:
        return null;
    }
  };

  User.create({
    user_email: req.body.email,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, 8),
    role_id: roleCheck(req.body.role),
  })
    .then((user) => {
      res.send({ message: `${req.body.role} was registered successfully!` });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  // MySQL: SELECT * FROM users WHERE username = 'req.body.username'
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      // passwordIsValid returns either true or false
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
