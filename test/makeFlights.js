const data = require("./generateData");

exports.makeFlights = (Flight) => {
  const arr = [...data(20)]; // Change number for number of records

  const newArr = arr.map((flight) => {
    Flight.create({
      // flight_id: flight.id,
      flight_no: flight.flightNo,
      date_time: flight.dateTime, // Strict mode: ISO 8601 (Before conversion to readable format)
      from: flight.from,
      to: flight.to,
      ac_reg: flight.acReg,
      company: flight.company,
      user_email: flight.email,
    })
      // .then((flight) => {
      //   console.log(flight.dataValues);
      // })
      .catch((err) => console.log("Flight create error: ", err.parent));
  });

  return newArr;
};
