const db = require("../models");
const User = db.users;

// Initial users to create before using the app
exports.createUser = (roleId, user) => {
  return User.create({
    user_email: user.userEmail,
    first_name: user.firstName,
    last_name: user.lastName,
    password: user.password,
    role_id: roleId,
  })
    .then((user) => {
      console.log(">> Created user: " + JSON.stringify(user, null, 4));
      return user;
    })
    .catch((err) => {
      console.log(">> Error while creating user: ", err);
    });
};
