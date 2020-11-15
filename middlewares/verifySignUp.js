const db = require("../models");
const User = db.user;

// NOTE: Below functions DOES NOT USE JWT but Sequalize to verify duplication
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

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;
