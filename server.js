require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
// const pool = require("./db");


//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//
const pg = require("pg")
const CLientClass = pg.Client;
const pgUrl = "postgres://rahuymnn:MRK7ZZxED7LDgbQFB2CYx9M9BrRDMVtn@kashin.db.elephantsql.com/rahuymnn";
const client = new CLientClass(pgUrl);

const connect = async (client) => {
  try {
    await client.connect();
    console.log('client connected.');

    const { rows } = await client.query('SELECT * FROM practiceSpots');
    console.table(rows);
    console.log(rows);
    // await client.end();

  } catch (error) {
    console.log(error)
  } 
  // finally {
  //     await client.end()
  // }
}

connect(client);
//create spot
// app.post("/spots", async (req, res) => {
//   try {
//     const { address } = req.body;
//     const newAddress = await pool.query("INSERT INTO practiceSpots (address) VALUES($1) RETURNING *", [address]);
//     console.log(res.json(newAddress.rows[0]));
    
//   } catch (error) {
//     console.log(error.message);
//   }
// })


//get all spots
// app.get("/spots", async (req, res) => {
//   try {
//     const allSpots = await pool.query("SELECT * FROM practiceSpots");
//     res.json(allSpots.rows);
//   } catch (error) {
//     console.log(error.message);
//   }
// })

//get 1 spot
// app.get("/spots/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const spot = await pool.query("SELECT * FROM practicespots WHERE spot_id = $1", [id]);
//     res.json(spot.rows[0]);
//   } catch (error) {
//     console.log(error.message);
//   }
// })


//update spot
// app.put("/spots/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { address } = req.body;
//     const updateAddress = await pool.query("UPDATE practiceSpots SET address = $1 WHERE spot_id = $2", [address, id]);
//     res.json("address updated");
//   } catch (error) {
//     console.log(error.message);
//   }
// })

//delete spot
// app.delete("/spots/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteAddress = await pool.query("DELETE FROM practiceSpots WHERE spot_id = $1", [id]);
//     res.json("address deleted");
//   } catch (error) {
//     console.log(error.message);
//   }
// })

const PORT = process.env.PORT || 4001
app.listen(PORT, () => {
  console.log("server has started on port" + PORT)
});