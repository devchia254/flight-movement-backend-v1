const data = require("./generateData");

exports.makeFlights = (Flight) => {
  const arr = [...data(10)]; // Change number for number of records

  const newArr = arr.map((flight) => {
    Flight.create({
      // flight_id: flight.id,
      flight_no: flight.flightNo,
      company: flight.company,
      ac_reg: flight.acReg,
      destination: flight.destination,
      check_in: flight.checkIn,
      etd: flight.etd,
      eta: flight.eta,
      status: flight.status,
      user_email: flight.email,
    })
      // .then((flight) => {
      //   console.log(flight.dataValues);
      // })
      .catch((err) => console.log("Flight create error: ", err.parent));
  });

  return newArr;
};
