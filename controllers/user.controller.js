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
        flightData: flight,
      });
      // console.log("List of flights:", JSON.stringify(flight, null, 2));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

exports.createFlight = (req, res) => {
  // console.log("createFlight: ", req.body);

  Flight.create({
    // flight_id: req.body.flightId,
    flight_no: req.body.flightNo,
    ac_reg: req.body.acReg,
    date_time: req.body.dateTime,
    from: req.body.from,
    to: req.body.to,
    company: req.body.company,
    user_email: req.body.email,
  })
    .then((flight) => {
      // flight.getUser().then((user) => {
      //   console.log("getUser(): ", user);
      //   res.send({ message: "Testing getUser()" });
      // });

      res.send({
        message: `Flight was successfully created`,
        flightId: `${flight.dataValues.flight_id}`,
        user: `${req.body.email}`,
      });
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).send({ message: err.message });
    });
};

exports.editFlight = (req, res) => {
  const paramsId = req.params.id;

  Flight.update(
    {
      date_time: req.body.dateTime,
      flight_no: req.body.flightNo,
      from: req.body.from,
      to: req.body.to,
      ac_reg: req.body.acReg,
      company: req.body.company,
      updated_by: req.body.email,
    },
    {
      where: { flight_id: paramsId },
    }
  )
    .then((num) => {
      // Indicates 1 row was affected in MySQL db
      if (num == 1) {
        res.send({
          message: "Flight was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${paramsId}. Maybe Flight was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + paramsId,
      });
    });
};

exports.deleteFlight = (req, res) => {
  const paramsId = req.params.id;

  Flight.destroy({
    where: { flight_id: paramsId },
  })
    .then((num) => {
      // Indicates 1 row was affected in MySQL db
      if (num == 1) {
        res.send({
          message: "Flight was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot delete Flight with id=${paramsId}. Maybe Flight was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Flight with id=" + paramsId,
      });
    });
};

// exports.allAccess = (req, res) => {
//   res.status(200).send("Public Content.");
// };

// exports.userBoard = (req, res) => {
//   res.status(200).send("User or Admin Content.");
// };

// exports.adminBoard = (req, res) => {
//   res.status(200).send("Admin Content.");
// };
