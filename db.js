
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "dudeitzme3",
  host: "localhost",
  port: 5432,
  database: "sesh"
});

module.exports = pool;