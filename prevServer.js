const db = require("./models");
const roleController = require("./controllers/role.controller");
const userController = require("./controllers/user.controller");
const flightController = require("./controllers/flight.controller");

const run = async () => {
  const role1 = await roleController.createRole({
    roleId: 1,
    roleType: "Standard",
  });
  const role2 = await roleController.createRole({
    roleId: 2,
    roleType: "Admin",
  });

  const user1 = await userController.createUser(role1.role_id, {
    userEmail: "chiaStd@email.com",
    firstName: "Alex",
    lastName: "Chia",
    password: "potato123",
  });

  const user2 = await userController.createUser(role2.role_id, {
    userEmail: "chiaAdm@email.com",
    firstName: "James",
    lastName: "Chia",
    password: "potato456",
  });

  const flight1 = await flightController.createFlight(user2.user_email, {
    flightId: 1,
    dateTime: "23/09/20 16:40",
    flightNo: "AN234",
    from: "KK",
    to: "SDK",
    acReg: "9M-SBO",
    company: "Sazma",
  });
};

// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  run();
});
