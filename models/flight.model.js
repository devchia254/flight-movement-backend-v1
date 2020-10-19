const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define("Flight", {
    // Model attributes are defined here
    flight_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    flight_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ac_reg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    check_in: {
      type: DataTypes.DATE, // The dateTime value from moment.js is a string
      allowNull: false,
    },
    etd: {
      type: DataTypes.DATE, // The dateTime value from moment.js is a string
      allowNull: false,
    },
    eta: {
      type: DataTypes.DATE, // The dateTime value from moment.js is a string
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Flight;
};
