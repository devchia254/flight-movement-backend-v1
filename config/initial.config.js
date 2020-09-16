const bcrypt = require("bcryptjs");
// Starting data when project is running
exports.admin = (Role, User) => {
  Role.create({
    role_id: 1,
    role_type: "user",
  });

  Role.create({
    role_id: 2,
    role_type: "admin",
  });

  User.create({
    user_email: "admin@fma.com",
    first_name: "Alexander",
    last_name: "Chia",
    password: bcrypt.hashSync("admin", 8),
    role_id: 2,
  });
};
