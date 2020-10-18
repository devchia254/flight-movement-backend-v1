const db = require("../models");
const Flight = db.flight;

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
    company: req.body.company,
    ac_reg: req.body.acReg,
    destination: req.body.destination,
    check_in: req.body.checkIn,
    etd: req.body.etd,
    eta: req.body.eta,
    status: req.body.status,
    user_email: req.body.userEmail,
  })
    .then((flight) => {
      res.send({
        message: `Flight was successfully created`,
        flight_id: `${flight.dataValues.flight_id}`,
        user: `${req.body.user_email}`,
      });
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).send({ message: err.message });
    });
};

exports.editFlight = (req, res) => {
  const paramsId = req.params.id;

  console.log("req.params: ", req.params);
  console.log("req.body: ", req.body);

  Flight.update(
    {
      flight_no: req.body.flightNo,
      company: req.body.company,
      ac_reg: req.body.acReg,
      destination: req.body.destination,
      check_in: req.body.checkIn,
      etd: req.body.etd,
      eta: req.body.eta,
      status: req.body.status,
      updated_by: req.body.updatedBy,
    },
    {
      where: { flight_id: paramsId },
    }
  )
    .then((num) => {
      // Indicates 1 row was affected in MySQL db
      if (num == 1) {
        res.status(200).send({
          message: `Flight was successfully updated.`,
        });
      } else {
        res.status(410).send({
          message: `Cannot update Flight with id=${paramsId} because it does not exist`,
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
