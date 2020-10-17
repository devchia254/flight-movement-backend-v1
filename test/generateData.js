// import namor from "namor";
const namor = require("namor");
const moment = require("moment"); // require

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

// Manipulate here only for fake data object
const generateFlight = () => {
  // Aircraft Reg Probability
  const acRegChance = Math.random();
  const fromChance = Math.random();
  const toChance = Math.random();
  const coChance = Math.random();
  // Random date generator
  function randomDate(start, end) {
    const genDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return moment(genDate).format(); // String format: ISO 8601
  }

  return {
    id: namor.generate({ words: 0, numbers: 0, saltLength: 10 }),
    flightNo: namor
      .generate({ words: 0, numbers: 0, saltLength: 5 })
      .toUpperCase(),
    acReg:
      acRegChance > 0.66 ? "9M-SBO" : acRegChance > 0.33 ? "9M-SBA" : "9M-SBM",
    // dateTime: randomDate(new Date(2020, 9, 10), new Date(2020, 9, 20)),
    dateTime: randomDate(moment().subtract(3, "d")._d, moment().add(3, "d")._d), // Gets random date between +-3 days of today
    from:
      fromChance > 0.66
        ? "SAA KK Base"
        : fromChance > 0.33
        ? "Terminal 2"
        : "Tg Aru Beach",
    to:
      toChance > 0.66
        ? "Miri Base 2"
        : toChance > 0.33
        ? "Semporna Resort"
        : "Layang Layang Resort",
    company: coChance > 0.66 ? "Sazma" : coChance > 0.33 ? "Weststar" : "SAA",
    email: "admin@fma.com",
  };
};

module.exports = function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...generateFlight(),
        // subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
};
