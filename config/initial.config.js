const bcrypt = require("bcryptjs");
require("dotenv").config();

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
    password: bcrypt.hashSync(process.env.INTL_ADMIN_PWD, 8),
    role_id: 2,
  });

  User.create({
    user_email: "user@fma.com",
    first_name: "User",
    last_name: "Test",
    password: bcrypt.hashSync(process.env.INTL_USER_PWD, 8),
    role_id: 1,
  });
};
