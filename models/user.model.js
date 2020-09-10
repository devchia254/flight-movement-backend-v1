module.exports = (sequelize, DataTypes, Role) => {
  const User = sequelize.define(
    "User", // DB Table name = User -> users ("User" also used for FK auto naming )
    {
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
      // role_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: Role,
      //     key: "role_id",
      //   },
      // },
    }
  );
  return User;
};
