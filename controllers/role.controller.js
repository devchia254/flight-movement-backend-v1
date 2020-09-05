const db = require("../models");
// const User = db.users;
const Role = db.roles;

exports.createRole = (role) => {
  return Role.create({
    role_id: role.roleId,
    role_type: role.roleType,
  })
    .then((role) => {
      console.log(">> Created role: " + JSON.stringify(role, null, 4));
      return role;
    })
    .catch((err) => {
      console.log(">> Error while creating role: ", err);
    });
};
