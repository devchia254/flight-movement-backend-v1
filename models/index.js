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

db.role = require("./role.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.flight = require("./flight.model.js")(sequelize, Sequelize);

// Define FK (role_id) here with options
db.role.hasMany(db.user, {
  foreignKey: {
    name: "role_id",
    allowNull: false,
    // defaultValue: 1,
  },
});

// Reference FK
db.user.belongsTo(db.role, { foreignKey: "role_id" });

// Define FK (user_email) here with options
db.user.hasMany(db.flight, {
  foreignKey: {
    name: "user_email",
    allowNull: false,
    // defaultValue: 1,
  },
});

db.flight.belongsTo(db.user, { foreignKey: "user_email" });

module.exports = db;
