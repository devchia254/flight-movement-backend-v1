const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "https://devchia254-fma-v1.herokuapp.com", // This is to restrict which domain(s) can access this server
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

// In development, you may need to drop existing tables and re-sync database. So you can use force: true as code below.
// force: true actually rewrites the records after every server restart
db.sequelize.sync().then(() => {
  console.log("Starting to sync production db");
});
// For production, just insert these rows manually and use sync() without parameters to avoid dropping data:
// db.sequelize.sync();

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the fma-backend-v1 application." });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/admin.routes")(app);
require("./routes/public.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
