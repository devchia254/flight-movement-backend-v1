const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

// NOTE: Below functions DOES NOT USE JWT but Sequalize functions to verify duplication
checkDuplicateEmail = (req, res, next) => {
  // Email
  User.findOne({
    where: {
      user_email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Email exists! Please use a different one",
      });
      return;
    }

    next();
  });
};

// checkRolesExisted = (req, res, next) => {
//   // Assuming req.body.roles is an array
//   if (req.body.roles) {
//     for (let i = 0; i < req.body.roles.length; i++) {
//       if (!ROLES.includes(req.body.roles[i])) {
//         res.status(400).send({
//           message: "Failed! Role does not exist = " + req.body.roles[i],
//         });
//         return;
//       }
//     }
//   }

//   next();
// };

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
  // checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
