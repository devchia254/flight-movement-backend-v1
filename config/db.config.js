// Heroku config vars
module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "mysql",
  timezone: "+08:00", // Malaysian Time
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
