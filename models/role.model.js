module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role", // DB Table name = Role -> roles
    {
      // Model attributes are defined here
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      role_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Role;
};
