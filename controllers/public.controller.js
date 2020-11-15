const db = require("../models");
const Op = db.Sequelize.Op; // Access SQL operators
const Flight = db.flight;
const moment = require("moment");

// Fetch flights for homepage
exports.todaysFlight = (req, res) => {
  const minusThreeDays = moment().subtract(3, "d").format("YYYY-MM-DD", true);

  const plusThreeDays = moment().add(4, "d").format("YYYY-MM-DD", true); // Because I want to include the 3rd day

  Flight.findAll({
    where: {
      check_in: {
        [Op.between]: [minusThreeDays, plusThreeDays],
      },
    },
  })
    .then((flight) => {
      res.send({
        message: `Flights +-3 Days from today, was received.`,
        flightData: flight,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};
