module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "password",
  DB: "fma_v1",
  dialect: "mysql",
  timezone: "+08:00",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
