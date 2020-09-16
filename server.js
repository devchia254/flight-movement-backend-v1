const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3031", // This is to restrict which domains or wbesites can access this server
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const initial = require("./config/initial.config");
const Role = db.role;
const User = db.user;

// In development, you may need to drop existing tables and re-sync database. So you can use force: true as code below.
// force: true actually rewrites the records after every server restart
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial.admin(Role, User);
});
// For production, just insert these rows manually and use sync() without parameters to avoid dropping data:
// db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  // console.log("Console logging the DB: ", db.Sequelize.Op);
});
