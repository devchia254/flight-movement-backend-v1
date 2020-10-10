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

  // Get all flights
  app.get(
    "/api/user/flights",
    [authJwt.verifyToken, authJwt.isAnyUser],
    controller.getFlights
  );
  // Create one flight
  app.post(
    "/api/user/flights",
    [authJwt.verifyToken, authJwt.isAnyUser],
    controller.createFlight
  );
  // Update one flight
  app.put(
    "/api/user/flights/:id",
    [authJwt.verifyToken, authJwt.isAnyUser],
    controller.editFlight
  );
  // Delete one flight
  app.delete(
    "/api/user/flights/:id",
    [authJwt.verifyToken, authJwt.isAnyUser],
    controller.deleteFlight
  );
};
