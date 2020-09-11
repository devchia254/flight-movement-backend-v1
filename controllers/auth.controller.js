const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const Role = db.ROLES;

const Op = db.Sequelize.Op; // Access SQL operators

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
// CONTROLLER FOR TESTING AUTHENTICATION
exports.signup = (req, res) => {
  // Save User to Database
  // MySQL: INSERT INTO users(username, email, password) VALUES ('req.body.username', 'req.body.email', 'bcrypt.hashSync(req.body.password, 8)')
  User.create({
    user_email: req.body.email,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, 8),
    role_id: req.body.roleId,
  })
    .then((user) => {
      if (req.body.roles) {
        // If req.body.roles = 'admin'
        // MySQL: SELECT * FROM roles WHERE name = 'admin' OR name = .....
        Role.findAll({
          where: {
            name: {
              // Op.or is OR in MySQL
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          console.log("Logging roles: ", roles);
          // This actually UPDATES the junction table -  user_roles (Many-to-many relationship)
          // When the user is created, the roleId is updated at the junction table by referencing the roles table
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
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
