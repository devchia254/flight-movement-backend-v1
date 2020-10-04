const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op; // Access SQL operators

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
// CONTROLLER FOR TESTING AUTHENTICATION
exports.signup = (req, res) => {
  // Refers type of role to respective table id attribute

  console.log("Signgup Route: ", req.body);

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
      const role = req.body.role;
      const capitaliseRole = role.charAt(0).toUpperCase() + role.slice(1);

      res.send({ message: `${capitaliseRole} was registered successfully!` });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  // MySQL: SELECT * FROM users WHERE username = 'req.body.username'
  User.findOne({
    where: {
      user_email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User email was not found" });
      }
      // passwordIsValid returns either true or false
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password! Please try again",
        });
      }

      var token = jwt.sign({ email: user.user_email }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      // user.getRole().then((role) => {
      //   console.log("getRole(): ", role.role_type);
      //   res.send({ message: "Testing something" });
      // });

      user.getRole().then((role) => {
        const authority = "ROLE_" + role.role_type.toUpperCase();

        res.status(200).send({
          email: user.user_email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: authority,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
