require("dotenv").config();
const Pool = require("pg").Pool;

// PGHOST=localhost
// PGUSER=postgres
// PGDATABASE=sesh
// PGPASSWORD=dudeitzme3
// PGPORT=5432
const pool = new Pool({});

// const pool = new Pool({
//   user: "rahuymnn",
//   password: "MRK7ZZxED7LDgbQFB2CYx9M9BrRDMVtn",
//   host: "postgres://rahuymnn:MRK7ZZxED7LDgbQFB2CYx9M9BrRDMVtn@kashin.db.elephantsql.com/rahuymnn",
//   port: 5432,
//   database: "sesh"
// });

module.exports = pool;