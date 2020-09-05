module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      // Model attributes are defined here
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      role_type: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return Role;
};
