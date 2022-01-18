
const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "postgres",
//   password: "dudeitzme3",
//   host: "localhost",
//   port: 5432,
//   database: "sesh"
// });

const pool = new Pool({
  user: "rahuymnn",
  password: "MRK7ZZxED7LDgbQFB2CYx9M9BrRDMVtn",
  host: "postgres://rahuymnn:MRK7ZZxED7LDgbQFB2CYx9M9BrRDMVtn@kashin.db.elephantsql.com/rahuymnn",
  port: 5432,
  database: "sesh"
});

module.exports = pool;