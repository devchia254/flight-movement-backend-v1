const db = require("./models");
const roleController = require("./controllers/role.controller");

const run = async () => {
  const role1 = await roleController.createRole({
    roleId: 1,
    roleType: "Standard",
  });

  const role2 = await roleController.createRole({
    roleId: 2,
    roleType: "Admin",
  });
};

// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  run();
});
