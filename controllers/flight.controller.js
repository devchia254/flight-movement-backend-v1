const db = require("../models");
const Flight = db.flights;

exports.createFlight = (userEmail, flight) => {
  return Flight.create({
    flight_id: flight.flightId,
    date_time: flight.dateTime,
    flight_no: flight.flightNo,
    from: flight.from,
    to: flight.to,
    ac_reg: flight.acReg,
    company: flight.company,
    user_email: userEmail,
  })
    .then((flight) => {
      console.log(">> Created flight: " + JSON.stringify(flight, null, 4));
      return flight;
    })
    .catch((err) => {
      console.log(">> Error while creating flight: ", err);
    });
};
