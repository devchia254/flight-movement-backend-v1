// Routes for Authentication
const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    // "x-access-token" is the only attribute set from the routes
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Sign up user - ADMIN privilege
  app.post(
    "/api/auth/signup",
    // [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkDuplicateEmail],
    [verifySignUp.checkDuplicateEmail],
    controller.signup
  );
  // Sign in user
  app.post("/api/auth/signin", controller.signin);
};
