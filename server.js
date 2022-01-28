require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
// const pool = require("db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//
const pg = require("pg");
const client = new pg.Client(process.env.CLIENT);
client.connect((error) => {
  error ? console.log(error) : console.log("Client connected.");
});

//server homepage
app.get("/", (req,res) => {
  try {
    res.send("Sesh app backend server via NodeJS, Express, and PostgresSQL");
  } catch (error) {
    console.log(error);
  }
})

//create spot
app.post("/spots", async (req, res) => {
  try {
    const { address } = req.body;
    const newAddress = await client.query("INSERT INTO practiceSpots (address) VALUES($1) RETURNING *", [address]);
    res.json(newAddress.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
})


//get all spots
app.get("/spots", async (req, res) => {
  try {
    const allSpots = await client.query("SELECT * FROM practiceSpots");
    res.json(allSpots.rows);
    console.table(allSpots.rows);
  } catch (error) {
    console.log(error.message);
  }
})

//get 1 spot
app.get("/spots/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const spot = await client.query("SELECT * FROM practicespots WHERE spot_id = $1", [id]);
    res.json(spot.rows[0]);
    console.log(spot.rows);
  } catch (error) {
    console.log(error.message);
  }
})


//update spot
app.put("/spots/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { address, name, price, coord_lng, coord_lat, host } = req.body;
    const updateAddress = await client.query("UPDATE practiceSpots SET address = $2, name = $3, price = $4, coord_lng = $5, coord_lat = $6, host = $7 WHERE spot_id = $1", [id, address,  name, price, coord_lng, coord_lat, host]);
    res.json("address updated");
    console.log(`Address updated. ${updateAddress}`);
  } catch (error) {
    console.log(error.message);
  }
})

//delete spot
app.delete("/spots/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAddress = await client.query("DELETE FROM practiceSpots WHERE spot_id = $1", [id]);
    res.json("address deleted");
  } catch (error) {
    console.log(error.message);
  }
})

const PORT = process.env.PORT || 4001
app.listen(PORT, () => {
  console.log("server has started on port" + PORT)
});