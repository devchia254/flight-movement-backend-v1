// Routes for Authorisation
const { authJwt } = require("../middlewares");
const controller = require("../controllers/admin.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Get all users
  app.get(
    "/api/admin/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getUsers
  );
  // // Update one user
  // app.put(
  //   "/api/admin/users/:id",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.editUser
  // );
  // // Delete one user
  // app.delete(
  //   "/api/admin/users/:id",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.deleteUser
  // );
};
