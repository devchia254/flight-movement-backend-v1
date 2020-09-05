module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    // Model attributes are defined here
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
  });
  return User;
};
