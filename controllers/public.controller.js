const db = require("../models");
const Flight = db.flight;

const Op = db.Sequelize.Op; // Access SQL operators
const moment = require("moment"); // require

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
      // console.log(
      //   `Dates between ${moment(minusThreeDays).format(
      //     "MM-DD-YYYY HH:mm"
      //   )} and ${moment(plusThreeDays).format("MM-DD-YYYY HH:mm")}`
      // );

      const mapFlights = flight.map((flight) => {
        return flight.dataValues;
      });
      // console.log("All of today's flight: ", mapFlights);

      res.send({
        message: `Flights that are +-3 Days from today was received.`,
        flightData: mapFlights,
      });
      // console.log("List of flights:", JSON.stringify(flight, null, 2));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};
