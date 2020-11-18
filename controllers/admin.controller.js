const db = require("../models");
const User = db.user;

exports.getUsers = (req, res) => {
  User.findAll()
    .then((users) => {
      const userInfo = users.map((user) => {
        // Convert Role Id to Role name
        const convertRoleId = (id) => {
          switch (id) {
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
          role: convertRoleId(user.role_id),
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      });
      res.send({
        message: `All users retrieved!`,
        userData: userInfo,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

exports.editUser = (req, res) => {
  const paramsId = req.params.id;

  // Convert Role name to respective Role Id
  const assignRole = (role) => {
    switch (role) {
      case "admin":
        return 2;
      case "user":
        return 1;
      default:
        return null;
    }
  };

  User.update(
    {
      user_email: req.body.email,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      role_id: assignRole(req.body.role),
    },
    {
      where: { user_id: paramsId },
    }
  )
    .then((num) => {
      // Indicates 1 row was affected in MySQL db
      if (num == 1) {
        res.status(200).send({
          message: `User was successfully updated.`,
        });
      } else {
        res.status(410).send({
          message: `Cannot update User with id=${paramsId} because it does not exist`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + paramsId,
      });
    });
};

exports.deleteUser = (req, res) => {
  const paramsId = req.params.id;

  User.destroy({
    where: { user_id: paramsId },
  })
    .then((num) => {
      // Indicates 1 row was affected in MySQL db
      if (num == 1) {
        res.send({
          message: "User was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${paramsId}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting User with id=" + paramsId,
      });
    });
};
