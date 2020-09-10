const db = require("../models");
const Role = db.roles;

// Initial roles to create before using the app
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
