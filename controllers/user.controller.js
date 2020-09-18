const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Flight = db.flight;

const Op = db.Sequelize.Op; // Access SQL operators

exports.getFlights = (req, res) => {
  Flight.findAll()
    .then((flight) => {
      res.send({
        message: `All flights retrieved!`,
        data: flight,
      });
      // console.log("List of flights:", JSON.stringify(flight, null, 2));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

exports.createFlight = (req, res) => {
  Flight.create({
    flight_id: req.body.flightId,
    date_time: req.body.dateTime,
    flight_no: req.body.flightNo,
    from: req.body.from,
    to: req.body.to,
    ac_reg: req.body.acReg,
    company: req.body.company,
    user_email: req.body.email,
  })
    .then((flight) => {
      res.send({
        message: `Flight_id: ${req.body.flightId} was created successfully by ${req.body.email}`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

exports.editFlight = (req, res) => {};

exports.deleteFlight = (req, res) => {};

// exports.allAccess = (req, res) => {
//   res.status(200).send("Public Content.");
// };

// exports.userBoard = (req, res) => {
//   res.status(200).send("User or Admin Content.");
// };

// exports.adminBoard = (req, res) => {
//   res.status(200).send("Admin Content.");
// };
