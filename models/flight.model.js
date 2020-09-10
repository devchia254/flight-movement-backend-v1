module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define("Flight", {
    // Model attributes are defined here
    flight_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    date_time: {
      type: DataTypes.STRING, // The dateTime value from moment.js is a string
      allowNull: false,
    },
    flight_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ac_reg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Flight;
};
