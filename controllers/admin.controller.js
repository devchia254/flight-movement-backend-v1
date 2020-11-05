const db = require("../models");
const User = db.user;

exports.getUsers = (req, res) => {
  User.findAll()
    .then((users) => {
      const userInfo = users.map((user) => {
        const roleCheck = (role) => {
          switch (role) {
            case 1:
              return "user";
            case 2:
              return "admin";
            default:
              return null;
          }
        };

        return {
          user_id: user.user_id,
          user_email: user.user_email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: roleCheck(user.role_id),
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      });
      // console.log(userInfo);
      res.send({
        message: `All users retrieved!`,
        userData: userInfo,
      });
      // console.log("List of flights:", JSON.stringify(flight, null, 2));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

exports.editFlight = (req, res) => {
  const paramsId = req.params.id;

  // console.log("req.params: ", req.params);
  // console.log("req.body: ", req.body);

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
