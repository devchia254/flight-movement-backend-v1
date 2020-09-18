// Routes for Authorisation
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/user/flights",
    [authJwt.verifyToken, authJwt.isAnyUser],
    controller.getFlights
  );

  app.post(
    "/api/user/flight/create",
    [authJwt.verifyToken, authJwt.isAnyUser],
    controller.createFlight
  );

  // app.put(
  //   "/api/user/flight/edit",
  //   [authJwt.verifyToken, authJwt.isAnyUser],
  //   controller.userBoard
  // );

  // app.delete(
  //   "/api/user/flight/delete",
  //   [authJwt.verifyToken, authJwt.isAnyUser],
  //   controller.userBoard
  // );
};

// app.get("/api/test/all", controller.allAccess);

// app.get(
//   "/api/test/user",
//   [authJwt.verifyToken, authJwt.isAnyUser],
//   controller.userBoard
// );

// app.get(
//   "/api/test/admin",
//   [authJwt.verifyToken, authJwt.isAdmin],
//   controller.adminBoard
// );
