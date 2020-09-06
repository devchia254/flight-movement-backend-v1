const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.roles = require("./role.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.flights = require("./flight.model.js")(sequelize, Sequelize);

// Define FK (role_id) here with options
db.roles.hasMany(db.users, {
  foreignKey: {
    name: "role_id",
    allowNull: false,
    // defaultValue: 1,
  },
});
// Reference FK
db.users.belongsTo(db.roles, { foreignKey: "role_id" });

// Define FK (user_email) here with options
db.users.hasMany(db.flights, {
  foreignKey: {
    name: "user_email",
    allowNull: false,
    // defaultValue: 1,
  },
});
db.flights.belongsTo(db.users, {
  foreignKey: "user_email",
});

module.exports = db;
