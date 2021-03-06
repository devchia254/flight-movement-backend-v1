// Routes for Authorisation
// const { authJwt } = require("../middlewares");
const controller = require("../controllers/public.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Get all flights (+-3 days)
  app.get("/api/public", controller.todaysFlight);
};
