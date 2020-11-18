const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

// Connects to MySQL DB by passing parameters
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  timezone: dbConfig.timezone,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {}; // Store all DB models & operations in an object

db.Sequelize = Sequelize; // Access to Sequelize dependency like DataTypes and Operators
db.sequelize = sequelize; // Consolidates the DB model configured above from line 5

db.role = require("./role.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.flight = require("./flight.model.js")(sequelize, Sequelize);

// Role model has a One-To-Many relationship with User model
db.role.hasMany(db.user, {
  // Define FK (role_id) here with options
  foreignKey: {
    name: "role_id",
    allowNull: false,
  },
});

// Define and reference FK of User model from Role model
db.user.belongsTo(db.role, { foreignKey: "role_id" });

// User model has a One-To-Many relationship with Flight model
db.user.hasMany(db.flight, {
  // Define FK (user_email) here with options
  foreignKey: {
    name: "user_email",
    allowNull: false,
  },
});

// Define and reference FK of Flight model from Role model
db.flight.belongsTo(db.user, { foreignKey: "user_email" });

module.exports = db;
