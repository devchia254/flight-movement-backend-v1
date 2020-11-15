require("dotenv").config();

// Your personal secret string for JWT Token
module.exports = {
  secret: process.env.JWT_SECRET,
};
