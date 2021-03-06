const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes, Role) => {
  const User = sequelize.define(
    "User", // DB Table name = User -> users ("User" also used for FK auto naming )
    {
      // Model attributes are defined here
      user_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      user_email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }
  );
  return User;
};
